import React, { useState, useEffect } from "react";
import "./WantedPersonsPage.css";
import { Button, Form, Accordion } from "react-bootstrap";
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

  const fetchAllWantedPersons = async () => {
    try {
      const response = await api.get("/api/wanted-persons");
      const loadedWantedPersons = response.data.map((item) => ({
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
    } catch(error) {
      console.error("Ошибка при загрузке информации об преступниках:", error.response);
    }
  };

  useEffect(() => {
    fetchAllWantedPersons();
  });

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
        surname: wantedPerson.surname,
        patronymic: wantedPerson.patronymic,
        birthDate: wantedPerson.birthDate,
        registrationAddress: wantedPerson.address,
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

  const handleAddWantedPerson = () => {
    const newWantedPerson = fetchAddWantedPerson(formData);
    setWantedPersons([...wantedPersons, newWantedPerson]);
    setFormData({ name: "", surname: "", patronymic: "", birthDate: "",  address: "", addInfo: "" });
  };

  const handleUpdateWantedPerson = (id) => {
    const updateWantedPerson = fetchUpdateWantedPerson(id, formData);
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
    setWantedPersons(wantedPersons.filter((wantedPerson) => wantedPerson.id !== id));
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

  return (
    <div className="wanted-persons-page">
      <header className="wanted-persons-header">
        <h2>Разыскиваемые лица</h2>
      </header>
      <div className="wanted-persons-content">
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
          {wantedPersons.map((wantedPerson) => (
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
          ))}
        </Accordion>
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
