import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./CrimeTypesListPage.css";
import { Form, Accordion, Modal, Pagination } from "react-bootstrap";
import api from "../api";
import { baseURL } from "../api";
import capitalizeFirstLetter from "../services/capitalizeFirstLetter";

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

const resetFormData = () => {
  return { title: "", description: "", link: "", color: getRandomColor() };

}
const CrimeTypesListPage = () => {
  const [connection, setConnection] = useState(null);
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [isEditingType, setIsEditingType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmDeleteType, setConfirmDeleteType] = useState(null);
  const [formData, setFormData] = useState({
    ...resetFormData(),
    count: 0
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 10;
  const [totalItems, setTotalItems] = useState(1);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchGetAllCrimeTypes(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchConnect();
  }, []);

  useEffect(() => {
    if (connection) {
      const setupConnection = async () => {
        try {
          await connection.start();
          console.log("Connected to RealHub");
          
          connection.on("Error", (error) => console.log(error));
          connection.on("AddedType", realTypeAdded);
          connection.on("UpdatedType", realTypeUpdated);
          connection.on("DeletedType", realTypeDeleted);
        } catch (error) {
          console.error("Connection failed:", error);
        }
      };
  
      setupConnection();
    } else {
      console.log("No connection established yet");
    }
  
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection]);

  const fetchGetAllCrimeTypes = async (page = 1, pageSize = PAGE_SIZE) => {
    try {
      console.log(page);
      const searchQuery = search;
      const response = await api.get(`/api/crime-types?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
      const { items, totalItems, totalPages } = response.data;
      const loadedCrimeTypes = items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        link: item.link,
        color: item.color,
        count: item.count
      }));

      setCrimeTypes(loadedCrimeTypes);
      setTotalPages(totalPages);
      setCurrentPage(page);
      setTotalItems(totalItems);

    } catch(error) {
      console.error("Ошибка при загрузке типов преступлений:", error);
    }
  };

  const fetchConnect = async () => {
    if (!connection) {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${baseURL}/realhub`)
        .withAutomaticReconnect()
        .build();
  
      setConnection(newConnection);
    }
  };

  const realTypeAdded = (newType) => {
    setCrimeTypes((prevCrimeTypes) => {
      const countItem = prevCrimeTypes.length + 1;
  
      if (currentPage === totalPages && countItem <= PAGE_SIZE) {
        return [...prevCrimeTypes, newType];
      }
  
      return prevCrimeTypes;
    });
  
    setTotalItems((prevTotalItems) => {
      const newTotalItems = prevTotalItems + 1;
  
      setTotalPages(Math.ceil(newTotalItems / PAGE_SIZE));
  
      return newTotalItems;
    });
  };
  
    const realTypeUpdated = (updatedType) => {
      setCrimeTypes((prev) =>
        prev.map((ct) => (ct.id === updatedType.id ? updatedType : ct))
      );
    }

  const realTypeDeleted = (deletedTypeId) => {
    setCrimeTypes((prev) => prev.filter((crimeType) => crimeType.id !== deletedTypeId));
    setTotalItems((prevTotalItems) => {
      const newTotalItems = prevTotalItems - 1;
  
      setTotalPages(Math.ceil(newTotalItems / PAGE_SIZE));
  
      return newTotalItems;
    });
  }

  const handleSave = async() => {
    let success;
    if (isEditingType) {
      success = await handleUpdateCrimeType(isEditingType.id);
    } else {
      success = await handleAddCrimeType();
    }
    if(success) handleCloseModal();
  };

  const handleAddCrimeType = async () => {
    const valid = validateForm();
    if (!valid) {
      console.log("No valid");
      return false;
    }
    
    const payload = {
      title: formData.title || null,
      description: formData.description || null,
      link: formData.link || null,
      color: formData.color || null,
    };

    const newCrimeType = await fetchAddCrimeType(payload);
    if(!newCrimeType) return false;
    const updatedcrimeTypes = [...crimeTypes, newCrimeType];
    if(updatedcrimeTypes.length <= PAGE_SIZE) {
      setCrimeTypes(updatedcrimeTypes);
    }
    else {
      const newTotalItems = totalItems + 1;
      const updatedTotalPages = Math.ceil(newTotalItems / PAGE_SIZE);
      setTotalPages(updatedTotalPages);
      setTotalItems(newTotalItems);
    }
    if(connection?.state === "Connected") await connection.invoke("AddingType", newCrimeType);
    setFormData(resetFormData());
    return true;
  };

  const fetchAddCrimeType = async (crimeType) => {
    try {
      crimeType.title = capitalizeFirstLetter(crimeType.title);

      const response = await api.post("/api/crime-types", crimeType);
      console.log(response.data.message);
    
      if (response.status >= 400) {
        return;
      }

      return {
        id: response.data.id,
        ...crimeType,
        count: 0,
      };

    } catch(error) {
      console.error("Ошибка при запросе на добавление типа преступления:", error);
    }
  };

  const handleUpdateCrimeType = async (id) => {
    const valid = validateForm();
    if (!valid) {
      console.log("No valid");
      return false;
    }
    
    const payload = {
      id: id,
      title: formData.title || null,
      description: formData.description || null,
      link: formData.link || null,
      color: formData.color || null,
    }

    const updateCrimeType = await fetchUpdateCrimeType(payload);
    if(!updateCrimeType) return false;
    setCrimeTypes((prev) =>
      prev.map((ct) => (ct.id === updateCrimeType.id ? updateCrimeType : ct))
    );
    if(connection?.state === "Connected") await connection.invoke("UpdatingType", updateCrimeType);
    setFormData(resetFormData());
    setIsEditingType(null);
    return true;
  };

  const fetchUpdateCrimeType = async (crimeType) => {
    try {
      crimeType.title = capitalizeFirstLetter(crimeType.title);

      const response = await api.patch("/api/crime-types", crimeType);
      console.log(response.data.message);
      if (response.status >= 400) {
        return;
      }

      return { ...crimeType, count: isEditingType.count };
    } catch(error) {
      console.error("Ошибка при редактировании типа преступления:", error);
    }
  };

  const handleDeleteCrimeType = async (id) => {
    await fetchDeleteCrimeType(id);
    if(isEditingType !== null && isEditingType.id === id){
      setIsEditingType(null);
      setFormData(resetFormData());
    }
    const updateCrimeTypes = crimeTypes.filter((crimeType) => crimeType.id !== id);

    if(updateCrimeTypes.length === 0) {
      setCurrentPage(currentPage-1);
    }
    else {
      const newTotalItems = totalItems - 1;
      const updatedTotalPages = Math.ceil(newTotalItems / PAGE_SIZE);
      setTotalPages(updatedTotalPages);
      setTotalItems(newTotalItems);
      await fetchGetAllCrimeTypes(currentPage);
    }
    if(connection?.state === "Connected") await connection.invoke("DeletingType", id);
  };

  const fetchDeleteCrimeType = async (id) => {
    try {
      await api.delete(`/api/crime-types/${id}`);
    } catch(error) {
      console.error("Ошибка при удалении типа преступления:", error);
    }
  }

  const handleEdit = (crimeType) => {
    setIsEditingType(crimeType);
    setFormData({
      title: crimeType.title || "",
      description: crimeType.description || "",
      link: crimeType.link || "",
      color: crimeType.color,
    });
    setShowModal(true);
  };

  const handleOpenModal = () => {
    setIsEditingType(null);
    setFormData(resetFormData());
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setIsEditingType(null);
    setFormData((prev) => ({...resetFormData(), color: prev.color}));
    setShowModal(false);
    setErrors({});
  };

  const handleDeleteClick = (type) => {
    setConfirmDeleteType(type);
    setShowConfirm(true);
  };

  const cancelDeleteClick = () => {
    setConfirmDeleteType(null);
    setShowConfirm(false);
  };

  const confirmDeleteClick = async () => {
    await handleDeleteCrimeType(confirmDeleteType.id);
    setConfirmDeleteType(null);
    setShowConfirm(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchGetAllCrimeTypes(newPage);
    }
  };

  const handleSearch = async(e) => {
    e.preventDefault();
    setCurrentPage(1);
    await fetchGetAllCrimeTypes(1);
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = "Название типа преступления обязательно.";
    }
    if (!formData.color) {
      newErrors.color = "Цвет обязателен.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="crime-types-list-page">
      <header className="crime-types-header">
        <h2>Информация о типах преступлений</h2>
      </header>
      <div className="crime-types-content">
      <div className="filter-section">
          <div className="search-container">
            <input
              type="text"
              id="search"
              className="filter-input"
              value={search}
              onChange={handleSearchChange}
              placeholder="Поиск..."
            />
            <button className="search-button" onClick={(e) => handleSearch(e)}>
              <img
                src="/icons/search.png"
                alt="Поиск"
                className="search-icon"
              />
            </button>
          </div>
          <button className="refresh-button" onClick={() => fetchGetAllCrimeTypes(currentPage)}>
            Обновить
          </button>
        </div>

        <div className="add-block">
          <button className="add-button" onClick={handleOpenModal}>
            Добавить тип преступления
          </button>
        </div>

        <Accordion>
        {crimeTypes.length > 0 ? (crimeTypes.map((crimeType) => (
        <Accordion.Item eventKey={crimeType.id} key={crimeType.id}>
          <Accordion.Header>
              <div className="d-flex justify-content-between w-100">
                <span>{crimeType.title}</span>
                  <span className="crime-count">
                    ({crimeType.count} преступлений на карте)
                  </span>
              </div>
          </Accordion.Header>
          <Accordion.Body>
              <p>
                <strong>Название:</strong> {crimeType.title}
              </p>
              <strong>Описание: </strong> 
              {crimeType.description === null || crimeType.description === "" 
              ? "-" 
              : <p> {crimeType.description} </p>}
              <p>
                <strong>Количество совершенных преступлений:</strong> {crimeType.count}
              </p>
              <p>
                {crimeType.link === null || crimeType.link === "" 
                ? "Ссылка на статью отсутствует" 
                : <a href={crimeType.link} target="_blank" rel="noreferrer">Ссылка на статью</a>}
              </p>
              <p>
                <strong>Цвет:</strong>{" "}
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    border: "1px solid #000",
                    backgroundColor: crimeType.color
                  }}
                ></span>
              </p>
              <div className="button-group">
                <button className="apply-button" onClick={() => handleEdit(crimeType)}>
                    Изменить
                </button>
                <button className="reset-button" onClick={() => handleDeleteClick(crimeType)}>
                    Удалить
                </button>
              </div>
          </Accordion.Body>
        </Accordion.Item>
        ))) :
        (
          <Accordion.Item eventKey="999">
          <Accordion.Header>
          <div className="d-flex justify-content-between w-100">
                <span>Типы преступлений не определены.</span>
              </div>
          </Accordion.Header>
        </Accordion.Item>
        )}
        </Accordion>
        
        <div className="pagination-container mt-3">
          {totalPages > 1 && (
            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Предыдущая
              </Pagination.Prev>

              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Следующая
              </Pagination.Next>
            </Pagination>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditingType 
            ? `Изменение типа "${isEditingType.title}"` 
            : "Добавление нового типа"}
          </Modal.Title>
        </Modal.Header>
          <Modal.Body>
          <Form.Group>
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              isInvalid={!!errors.title}
            />
            {errors.title && <Form.Text className="text-danger">{errors.title}</Form.Text>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Ссылка на статью (необязательно)</Form.Label>
            <Form.Control
              type="text"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Описание (необязательно)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="add-type-color">
            <Form.Label>Цвет</Form.Label>
            <Form.Control
              type="color"
              value={formData.color}
              onChange={(e) => handleInputChange("color", e.target.value)}
              isInvalid={!!errors.color}
            />
            {errors.color && <Form.Text className="text-danger">{errors.color}</Form.Text>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button className="apply-button" onClick={handleSave}>
            Сохранить
          </button>
          <button className="cansel-button" onClick={handleCloseModal}>
            Отменить
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirm} onHide={cancelDeleteClick}>
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите удаление</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы уверены, что хотите удалить тип преступления <strong>{confirmDeleteType?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <button className="reset-button" onClick={confirmDeleteClick}>
            Удалить
          </button>
          <button className="cansel-button" onClick={cancelDeleteClick}>
            Отмена
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CrimeTypesListPage;
