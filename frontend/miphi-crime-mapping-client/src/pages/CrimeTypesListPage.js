import React, { useState, useEffect } from "react";
import "./CrimeTypesListPage.css";
import { Button, Form, Accordion, Modal, Pagination } from "react-bootstrap";
import api from "../api";
import capitalizeFirstLetter from "../services/capitalizeFirstLetter";

const CrimeTypesListPage = () => {
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
  const [pageSize, setpageSize] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [search, setSearch] = useState("");

  const fetchGetAllCrimeTypes = async (page = 1, pageSize = 10) => {
    try {
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
      setpageSize(pageSize);
      setTotalItems(totalItems);

    } catch(error) {
      console.error("Ошибка при загрузке типов преступлений:", error.response);
    }
  };

  useEffect(() => {
      fetchGetAllCrimeTypes(currentPage);
  }, [currentPage]);

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
    
      return payload;
    } catch(error) {
      console.error("Ошибка при редактировании типа преступления:", error.response);
    }
  };

  const fetchDeleteCrimeType = async (id) => {
    try {
      await api.delete(`/api/crime-types/${id}`);
    } catch(error) {
      console.error("Ошибка при удалении типа преступления:", error.response);
    }
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
    if(updatedcrimeTypes.length <= pageSize) {
      setCrimeTypes(updatedcrimeTypes);
    }
    else {
      const newTotalItems = totalItems + 1;
      const updatedTotalPages = Math.ceil(newTotalItems / pageSize);
      console.log(newTotalItems);
      console.log(updatedTotalPages);
      setTotalPages(updatedTotalPages);
      setTotalItems(newTotalItems);
    }
    setFormData({ title: "", description: "", link: "", color: "#1E90FF" });
  };

  const handleUpdateCrimeType = async (id) => {
    const updateCrimeTypes = await fetchUpdateCrimeType(id, formData);
    setCrimeTypes(
      crimeTypes.map((crimeType) =>
        crimeType.id === id ? { ...crimeType, ...updateCrimeTypes } : crimeType
      )
    );
    setFormData({ title: "", description: "", link: "", color: "#1E90FF" });
    setIsEditingType(null);
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
      const updatedTotalPages = Math.ceil(newTotalItems / pageSize);
      setTotalPages(updatedTotalPages);
      setTotalItems(newTotalItems);
      await fetchGetAllCrimeTypes(currentPage);
    }
  };

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
