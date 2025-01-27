import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./WantedPersonsPage.css";
import { Form, Accordion, Pagination } from "react-bootstrap";
import api from "../api";
import { baseURL } from "../api";
import capitalizeFirstLetter from "../services/capitalizeFirstLetter";
import { Modal } from "react-bootstrap";

const resetFormData = () => {
  return { name: "", surname: "", patronymic: "", birthDate: "",  address: "", addInfo: "" };
}

const WantedPersonsPage = () => {
  const [connection, setConnection] = useState(null);
  const [wantedPersons, setWantedPersons] = useState([]);
  const [isEditingPerson, setIsEditingPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmDeletePerson, setConfirmDeletePerson] = useState(null);
  const [formData, setFormData] = useState({
    ...resetFormData(),
    count: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE  = 10;
  const [totalItems, setTotalItems] = useState(1);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllWantedPersons(currentPage);
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
            connection.on("AddedWantedPerson", realWantedPersonAdded);
            connection.on("UpdatedWantedPerson", realWantedPersonUpdated);
            connection.on("DeletedWantedPerson", realWantedPersonDeleted);
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

  const fetchAllWantedPersons = async (page = 1, pageSize = PAGE_SIZE) => {
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
      setTotalItems(totalItems);

    } catch(error) {
      console.error("Ошибка при загрузке информации об преступниках:", error.response);
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
  
  const realWantedPersonAdded = (newPerson) => {
    const addPerson = {...newPerson, birthDate: newPerson.birthDate?.split("T")[0] || ""}
    setWantedPersons((prevWantedPersons) => {
      const countItem = prevWantedPersons.length + 1;
  
      if (currentPage === totalPages && countItem <= PAGE_SIZE) {
        return [...prevWantedPersons, addPerson];
      }
  
      return prevWantedPersons;
    });
  
    setTotalItems((prevTotalItems) => {
      const newTotalItems = prevTotalItems + 1;
  
      setTotalPages(Math.ceil(newTotalItems / PAGE_SIZE));
  
      return newTotalItems;
    });
  };
  
    const realWantedPersonUpdated = (updatedPerson) => {
      setWantedPersons((prev) =>
        prev.map((wp) => (wp.id === updatedPerson.id ? updatedPerson : wp))
      );
    }

  const realWantedPersonDeleted = (deletedPersonId) => {
    setWantedPersons((prev) => prev.filter((wantedPerson) => wantedPerson.id !== deletedPersonId));
    setTotalItems((prevTotalItems) => {
      const newTotalItems = prevTotalItems - 1;
  
      setTotalPages(Math.ceil(newTotalItems / PAGE_SIZE));
  
      return newTotalItems;
    });
  }

  const handleSave = async() => {
    let success;
    if (isEditingPerson) {
      success = await handleUpdateWantedPerson(isEditingPerson.id);
    } else {
      success = await handleAddWantedPerson();
    }
    if(success) handleCloseModal();
  };

  const handleAddWantedPerson = async() => {
    const valid = validateForm();
    if (!valid) {
      console.log("No valid");
      return false;
    }
    
    const payload = {
      name: formData.name || null,
      surname: formData.surname || null,
      patronymic: formData.patronymic || null,
      birthDate: formData.birthDate || null,
      registrationAddress: formData.address || null,
      addInfo: formData.addInfo || null,
    }

    const newWantedPerson = await fetchAddWantedPerson(payload);
    if(!newWantedPerson) return false;
    const updatedWantedPersons = [...wantedPersons, newWantedPerson];
    if(updatedWantedPersons.length <= PAGE_SIZE) {
      setWantedPersons(updatedWantedPersons);
    }
    else {
      const newTotalItems = totalItems + 1;
      const updatedTotalPages = Math.ceil(newTotalItems / PAGE_SIZE);
      setTotalPages(updatedTotalPages);
      setTotalItems(newTotalItems);
    }
    await connection.invoke("AddingWantedPerson", newWantedPerson);
    setFormData(resetFormData());
    return true;
  };

  const fetchAddWantedPerson = async (wantedPerson) => {
    try {
      wantedPerson.name = capitalizeFirstLetter(wantedPerson.name);
      wantedPerson.surname = capitalizeFirstLetter(wantedPerson.surname);
      wantedPerson.patronymic = capitalizeFirstLetter(wantedPerson.patronymic);

      const response = await api.post("/api/wanted-persons", wantedPerson);
      console.log(response.data.message);

      if (response.status >= 400) {
        return;
      }

      return {
        id: response.data.id,
        name: wantedPerson.name,
        surname: wantedPerson.surname,
        patronymic: wantedPerson.patronymic,
        birthDate: wantedPerson.birthDate?.split("T")[0] || "",
        registrationAddress: wantedPerson.address,
        addInfo: wantedPerson.addInfo,
        count: 0
      };

    } catch(error) {
      console.error("Ошибка при добавлении преступника:", error.response);
    }
  };

  const handleUpdateWantedPerson = async(id) => {
    const valid = validateForm();
    if (!valid) {
      console.log("No valid");
      return false;
    }

    const payload = {
      id: id,
      name: formData.name || null,
      surname: formData.surname || null,
      patronymic: formData.patronymic || null,
      birthDate: formData.birthDate || null,
      registrationAddress: formData.address || null,
      addInfo: formData.addInfo || null,
    }

    const updateWantedPerson = await fetchUpdateWantedPerson(payload);
    if(!updateWantedPerson) return false;
    setWantedPersons((prev) =>
      prev.map((wp) => (wp.id === updateWantedPerson.id ? updateWantedPerson : wp))
    );
    await connection.invoke("UpdatingWantedPerson", updateWantedPerson);
    setFormData(resetFormData());
    setIsEditingPerson(null);
    return true;
  };

  const fetchUpdateWantedPerson = async (wantedPerson) => {
    try {
      wantedPerson.name = capitalizeFirstLetter(wantedPerson.name);
      wantedPerson.surname = capitalizeFirstLetter(wantedPerson.surname);
      wantedPerson.patronymic = capitalizeFirstLetter(wantedPerson.patronymic);

      const response = await api.patch("/api/wanted-persons", wantedPerson);
      console.log(response.data.message);
      if (response.status >= 400) {
        return;
      }

      return {
        id: response.data.id,
        name: wantedPerson.name,
        surname: wantedPerson.surname,
        patronymic: wantedPerson.patronymic,
        birthDate: wantedPerson.birthDate,
        address: wantedPerson.address,
        addInfo: wantedPerson.addInfo,
        count: isEditingPerson.count
      };

    } catch(error) {
      console.error("Ошибка при редактировании преступника:", error.response);
    }
  };

  const handleDeleteWantedPerson = async (id) => {
    await fetchDeleteWantedPerson(id);
     if(isEditingPerson !== null && isEditingPerson.id === id){
       setIsEditingPerson(null);
       setFormData(resetFormData());
     }
    
    const updatedWantedPersons = wantedPersons.filter((wantedPerson) => wantedPerson.id !== id);
    
    if(updatedWantedPersons.length === 0) {
      setCurrentPage(currentPage-1);
    }
    else {
      const newTotalItems = totalItems - 1;
      const updatedTotalPages = Math.ceil(newTotalItems / PAGE_SIZE);
      setTotalPages(updatedTotalPages);
      setTotalItems(newTotalItems);
      await fetchAllWantedPersons(currentPage);
    }
    await connection.invoke("DeletingWantedPerson", id);
  };

  const fetchDeleteWantedPerson = async (id) => {
    try {
      await api.delete(`/api/wanted-persons/${id}`);
    } catch(error) {
      console.error("Ошибка при удалении преступления:", error.response);
    }
  }

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
    setFormData(resetFormData());
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setIsEditingPerson(null);
    setFormData(resetFormData());
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

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.surname) {
      newErrors.surname = "Укажите фамилию преступника.";
    }
    if (!formData.name) {
      newErrors.name = "Укажите имя преступника.";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "Укажите дату рождения преступника.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="wanted-persons-page">
      <header className="wanted-persons-header">
        <h2>Информация о преступниках</h2>
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
          <button className="refresh-button" onClick={() => fetchAllWantedPersons(currentPage)}>
            Обновить
          </button>
        </div>

        <div className="add-block">
          <button className="add-button" onClick={handleOpenModal}>
            Добавить преступника
          </button>
        </div>
        
        <Accordion>
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
                <button className="apply-button" onClick={() => handleEdit(wantedPerson)}>
                  Изменить
                </button>
                <button className="reset-button" onClick={() => handleDeleteClick(wantedPerson)}>
                  Удалить
                </button>
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
              ? `Изменение для ${isEditingPerson.name } ${isEditingPerson.surname} ${isEditingPerson.birthDate}`
              : "Добавление преступника"}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              value={formData.surname}
              onChange={(e) => handleInputChange("surname", e.target.value)}
              isInvalid={!!errors.surname}
            />
            {errors.surname && <Form.Text className="text-danger">{errors.surname}<br/></Form.Text>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              isInvalid={!!errors.name}
            />
            {errors.name && <Form.Text className="text-danger">{errors.name}<br/></Form.Text>}
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
              onChange={(e) => handleInputChange("birthDate", e.target.value)}
              isInvalid={!!errors.birthDate}
            />
            {errors.birthDate && <Form.Text className="text-danger">{errors.birthDate}<br/></Form.Text>}
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
          Вы уверены, что хотите удалить {confirmDeletePerson?.surname} {confirmDeletePerson?.name} {confirmDeletePerson?.patronymic} {confirmDeletePerson?.birthDate}?
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

export default WantedPersonsPage;
