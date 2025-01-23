import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./CrimeTypesListPage.css";
import { Button, Form, Accordion, Modal, Pagination } from "react-bootstrap";
import api from "../api";
import { baseURL } from "../api";
import capitalizeFirstLetter from "../services/capitalizeFirstLetter";

const CrimeTypesListPage = () => {
  const [connection, setConnection] = useState(null);
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [isEditingType, setIsEditingType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmDeleteType, setConfirmDeleteType] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    color: "#1E90FF",
    count: 0
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 10;
  const [totalItems, setTotalItems] = useState(1);
  const [search, setSearch] = useState("");

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
      console.error("Ошибка при загрузке типов преступлений:", error.response);
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

  const handleSave = () => {
    if (isEditingType) {
      handleUpdateCrimeType(isEditingType.id);
    } else {
      handleAddCrimeType();
    }
    handleCloseModal();
  };

  const handleAddCrimeType = async () => {
    const newCrimeType = await fetchAddCrimeType(formData);
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
    await connection.invoke("AddingType", newCrimeType);
    setFormData({ title: "", description: "", link: "", color: "#1E90FF" });
  };

  const fetchAddCrimeType = async (crimeType) => {
    try {
      crimeType.title = capitalizeFirstLetter(crimeType.title);
      const payload ={
        title: crimeType.title,
        description: crimeType.description || null,
        link: crimeType.link || null,
        color: crimeType.color || null
      }
      const response = await api.post("/api/crime-types", payload);
      console.log(response.data.message);
    
      return {
        id: response.data.id,
        ...payload,
        count: 0,
      };

    } catch(error) {
      console.error("Ошибка при добавлении типа преступления:", error.response);
    }
  };

  const handleUpdateCrimeType = async (id) => {
    const updateCrimeType = await fetchUpdateCrimeType(id, formData);
    setCrimeTypes((prev) =>
      prev.map((ct) => (ct.id === updateCrimeType.id ? updateCrimeType : ct))
    );
    await connection.invoke("UpdatingType", updateCrimeType);
    setFormData({ title: "", description: "", link: "", color: "#1E90FF" });
    setIsEditingType(null);
  };

  const fetchUpdateCrimeType = async (id, crimeType) => {
    try {
      crimeType.title = capitalizeFirstLetter(crimeType.title);
      const payload = {
        id: id,
        title: crimeType.title,
        description: crimeType.description || null,
        link: crimeType.link || null,
        color: crimeType.color || null,
      }
      const response = await api.patch("/api/crime-types", payload);
      console.log(response.data.message);

      return { ...payload, count: isEditingType.count };
    } catch(error) {
      console.error("Ошибка при редактировании типа преступления:", error.response);
    }
  };

  const handleDeleteCrimeType = async (id) => {
    await fetchDeleteCrimeType(id);
    if(isEditingType !== null && isEditingType.id === id){
      setIsEditingType(null);
      setFormData({ title: "", description: "", link: "" });
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
    await connection.invoke("DeletingType", id);
  };

  const fetchDeleteCrimeType = async (id) => {
    try {
      await api.delete(`/api/crime-types/${id}`);
    } catch(error) {
      console.error("Ошибка при удалении типа преступления:", error.response);
    }
  }

  const handleEdit = (crimeType) => {
    setIsEditingType(crimeType);
    setFormData({
      title: crimeType.title,
      description: crimeType.description || "",
      link: crimeType.link || "",
      color: crimeType.color || "#1E90FF",
    });
    setShowModal(true);
  };

  const handleOpenModal = () => {
    setIsEditingType(null);
    setFormData({ title: "", description: "", link: "", color: "#1E90FF" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setIsEditingType(null);
    setFormData({ title: "", description: "", link: "", color: "#1E90FF" });
    setShowModal(false);
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

  return (
    <div className="crime-types-list-page">
      <header className="crime-types-header">
        <h2>Типы преступлений</h2>
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
        </div>

        <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Button
              variant="link"
              className="w-100 text-start text-decoration-none d-flex justify-content-start align-items-center"
              onClick={handleOpenModal}
            >
              Добавить тип преступления
            </Button>
          </Accordion.Header>
        </Accordion.Item>
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
                <Button variant="primary" size="sm" onClick={() => handleEdit(crimeType)}>
                    Изменить
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(crimeType)}>
                    Удалить
                </Button>
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
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
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
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Сохранить
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Отменить
          </Button>
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
          <Button variant="danger" onClick={confirmDeleteClick}>
            Удалить
          </Button>
          <Button variant="secondary" onClick={cancelDeleteClick}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CrimeTypesListPage;
