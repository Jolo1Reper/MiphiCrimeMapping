import React, { useState, useEffect } from "react";
import "./WantedPersonsPage.css";
import { Button, Form, Accordion, Pagination } from "react-bootstrap";
import api from "../api";
import capitalizeFirstLetter from "../services/capitalizeFirstLetter";
import { Modal } from "react-bootstrap";

const WantedPersonsPage = () => {
  const [wantedPersons, setWantedPersons] = useState([]);
  const [isEditingPerson, setIsEditingPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmDeletePerson, setConfirmDeletePerson] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    birthDate: "",
    address: "",
    addInfo: "",
    count: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [search, setSearch] = useState("");

  const fetchAllWantedPersons = async (page = 1, pageSize = 10) => {
    try {
      const searchQuery = search;
      const response = await api.get(`/api/wanted-persons?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
      const { items, totalItems, totalPages } = response.data;
      const loadedWantedPersons = items.map((item) => ({
        id: item.id,
        name: item.name,
        surname: item.surname,
        patronymic: item.patronymic,
        birthDate: item.birthDate?.split("T")[0] || "",
        address: item.registrationAddress,
        addInfo: item.addInfo,
        count: item.count
      }));

      setWantedPersons(loadedWantedPersons);
      setTotalPages(totalPages);
      setCurrentPage(page);
      setpageSize(pageSize);
      setTotalItems(totalItems);

    } catch(error) {
      console.error("Ошибка при загрузке информации об преступниках:", error.response);
    }
  };

  useEffect(() => {
    fetchAllWantedPersons(currentPage);
  }, [currentPage]);

  const fetchAddWantedPerson = async (wantedPerson) => {
    try {
      wantedPerson.name = capitalizeFirstLetter(wantedPerson.name);
      wantedPerson.surname = capitalizeFirstLetter(wantedPerson.surname);
      wantedPerson.patronymic = capitalizeFirstLetter(wantedPerson.patronymic);

      const payload = {
        name: wantedPerson.name,
        surname: wantedPerson.surname,
        patronymic: wantedPerson.patronymic !== "" ? wantedPerson.patronymic : null,
        birthDate: wantedPerson.birthDate,
        registrationAddress: wantedPerson.address !== "" ? wantedPerson.address : null,
        addInfo: wantedPerson.addInfo !== "" ? wantedPerson.addInfo : null,
      }
      const response = await api.post("/api/wanted-persons", payload);
      console.log(response.data.message);
    
      return {
        id: response.data.id,
        name: wantedPerson.name,
        surname: wantedPerson.surname,
        patronymic: wantedPerson.patronymic,
        birthDate: wantedPerson.birthDate,
        registrationAddress: wantedPerson.address,
        addInfo: wantedPerson.addInfo,
        count: 0
      };

    } catch(error) {
      console.error("Ошибка при добавлении преступника:", error.response);
    }
  };

  const fetchUpdateWantedPerson = async (id, wantedPerson) => {
    try {
      wantedPerson.name = capitalizeFirstLetter(wantedPerson.name);
      wantedPerson.surname = capitalizeFirstLetter(wantedPerson.surname);
      wantedPerson.patronymic = capitalizeFirstLetter(wantedPerson.patronymic);

      const payload = {
        id: id,
        name: wantedPerson.name,
        surname: wantedPerson.surname,
        patronymic: wantedPerson.patronymic !== "" ? wantedPerson.patronymic : null,
        birthDate: wantedPerson.birthDate,
        registrationAddress: wantedPerson.address !== "" ? wantedPerson.address : null,
        addInfo: wantedPerson.addInfo !== "" ? wantedPerson.addInfo : null,
      }

      const response = await api.patch("/api/wanted-persons", payload);
      console.log(response.data.message);
    
      return {
        id: id,
        name: wantedPerson.name,
        surname: wantedPerson.surname,
        patronymic: wantedPerson.patronymic,
        birthDate: wantedPerson.birthDate,
        address: wantedPerson.address,
        addInfo: wantedPerson.addInfo
      };

    } catch(error) {
      console.error("Ошибка при редактировании преступника:", error.response);
    }
  };

  const fetchDeleteWantedPerson = async (id) => {
    try {
      await api.delete(`/api/wanted-persons/${id}`);
    } catch(error) {
      console.error("Ошибка при удалении преступления:", error.response);
    }
  }

  const handleSave = () => {
    if (isEditingPerson) {
      handleUpdateWantedPerson(isEditingPerson.id);
    } else {
      handleAddWantedPerson();
    }
    handleCloseModal();
  };

  const handleAddWantedPerson = async() => {
    const newWantedPerson = await fetchAddWantedPerson(formData);
    const updatedWantedPersons = [...wantedPersons, newWantedPerson];
    if(updatedWantedPersons.length <= pageSize) {
      setWantedPersons(updatedWantedPersons);
    }
    else {
      const newTotalItems = totalItems + 1;
      const updatedTotalPages = Math.ceil(newTotalItems / pageSize);
      setTotalPages(updatedTotalPages);
      setTotalItems(newTotalItems);
    }
    setFormData({ name: "", surname: "", patronymic: "", birthDate: "",  address: "", addInfo: "" });
  };

  const handleUpdateWantedPerson = async(id) => {
    const updateWantedPerson = await fetchUpdateWantedPerson(id, formData);
    setWantedPersons(
      wantedPersons.map((wantedPerson) =>
        wantedPerson.id === id ? { ...wantedPerson, ...updateWantedPerson } : wantedPerson
      )
    );
    setFormData({ name: "", surname: "", patronymic: "", birthDate: "",  address: "", addInfo: "" });
    setIsEditingPerson(null);
  };

  const handleDeleteWantedPerson = async (id) => {
    await fetchDeleteWantedPerson(id);
     if(isEditingPerson !== null && isEditingPerson.id === id){
       setIsEditingPerson(null);
       setFormData({ name: "", surname: "", patronymic: "", birthDate: "",  address: "", addInfo: "" });
     }
    
    const updatedWantedPersons = wantedPersons.filter((wantedPerson) => wantedPerson.id !== id);
    
    if(updatedWantedPersons.length === 0) {
      setCurrentPage(currentPage-1);
    }
    else {
      const newTotalItems = totalItems - 1;
      const updatedTotalPages = Math.ceil(newTotalItems / pageSize);
      setTotalPages(updatedTotalPages);
      setTotalItems(newTotalItems);
      await fetchAllWantedPersons(currentPage);
    }
  };

  const handleEdit = (person) => {
    setIsEditingPerson(person);
    setFormData({
      name: person.name,
      surname: person.surname,
      patronymic: person.patronymic,
      birthDate: person.birthDate,
      address: person.address,
      addInfo: person.addInfo
    });
    setShowModal(true);
  };

  const handleOpenModal = () => {
    setIsEditingPerson(null);
    setFormData({ name: "", surname: "", patronymic: "", birthDate: "",  address: "", addInfo: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setIsEditingPerson(null);
    setFormData({ name: "", surname: "", patronymic: "", birthDate: "",  address: "", addInfo: "" });
    setShowModal(false);
  };

  const handleDeleteClick = (person) => {
    setConfirmDeletePerson(person);
    setShowConfirm(true);
  };

  const cancelDeleteClick = () => {
    setConfirmDeletePerson(null);
    setShowConfirm(false);
  };

  const confirmDeleteClick = async () => {
    await handleDeleteWantedPerson(confirmDeletePerson.id);
    setConfirmDeletePerson(null);
    setShowConfirm(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchAllWantedPersons(newPage);
    }
  };

  const handleSearch = async(e) => {
    e.preventDefault();
    setCurrentPage(1);
    await fetchAllWantedPersons(1);
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  return (
    <div className="wanted-persons-page">
      <header className="wanted-persons-header">
        <h2>Разыскиваемые лица</h2>
      </header>
      <div className="wanted-persons-content">
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
                Добавить разыскиваемого
              </Button>
            </Accordion.Header>
          </Accordion.Item>
          {wantedPersons.length > 0 ? (wantedPersons.map((wantedPerson) => (
          <Accordion.Item eventKey={wantedPerson.id} key={wantedPerson.id}>
            <Accordion.Header>
              <div className="d-flex justify-content-between w-100">
                <span>{wantedPerson.surname} {wantedPerson.name} {wantedPerson.patronymic} {wantedPerson.birthDate}</span>
                <span className="wanted-count">({wantedPerson.count} преступления на карте)</span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <p><strong>Фамилия:</strong> {wantedPerson.surname}</p>
              <p><strong>Имя:</strong> {wantedPerson.name} </p>
              <p><strong>Отчество:</strong> {wantedPerson.patronymic === null || wantedPerson.patronymic === "" ? "-" : wantedPerson.patronymic}</p>
              <p><strong>Дата рождения:</strong> {wantedPerson.birthDate}</p>
              <p><strong>Адрес регистрации: </strong> {wantedPerson.address === null || wantedPerson.address === "" ? "-" : wantedPerson.address}</p>
              <strong>Описание:</strong> {wantedPerson.addInfo === null || wantedPerson.addInfo === "" ? "-" : <p> {wantedPerson.addInfo} </p>}
              <p><strong>Количество совершенных преступлений:</strong> {wantedPerson.count}</p>
              <div className="button-group">
                <Button variant="primary" size="sm" onClick={() => handleEdit(wantedPerson)}>
                  Изменить
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(wantedPerson)}>
                  Удалить
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          )))
        : (
          <Accordion.Item eventKey="999">
          <Accordion.Header>
          <div className="d-flex justify-content-between w-100">
                <span>Преступники не определены.</span>
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
              {isEditingPerson 
              ? `Изменение для разыскиваемого "${isEditingPerson.name } ${isEditingPerson.surname} ${isEditingPerson.birthDate}"`
              : "Добавление разыскиваемого"}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              value={formData.surname}
              onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Отчество (при наличии)</Form.Label>
            <Form.Control
              type="text"
              value={formData.patronymic}
              onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Адрес регистрации (необязательно)</Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Описание (необязательно)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.addInfo}
              onChange={(e) => setFormData({ ...formData, addInfo: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="me-2" onClick={handleSave}>
            Сохранить
          </Button>
          <Button className="btn btn-secondary me-2" onClick={handleCloseModal}>
            Отменить
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirm} onHide={cancelDeleteClick}>
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите удаление</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы уверены, что хотите удалить разыскиваемого {confirmDeletePerson?.surname} {confirmDeletePerson?.name} {confirmDeletePerson?.patronymic} {confirmDeletePerson?.birthDate}?
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

export default WantedPersonsPage;
