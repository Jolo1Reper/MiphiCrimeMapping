import * as Yup from "yup";

// Схема валидации с использованием Yup
const validationSchema = Yup.object().shape({
  crimeTypeId: Yup.string().required("Выберите тип преступления"),
  wantedPersonId: Yup.string(),
  wantedPersonName: Yup.string().when("wantedPersonId", {
    is: (value) => !value,
    then: Yup.string().required("Введите имя преступника"),
  }),
  wantedPersonSurname: Yup.string().when("wantedPersonId", {
    is: (value) => !value,
    then: Yup.string().required("Введите фамилию преступника"),
  }),
  wantedPersonBirthDate: Yup.date()
    .nullable()
    .when("wantedPersonId", {
      is: (value) => !value,
      then: Yup.date()
        .required("Введите дату рождения")
        .max(new Date(), "Дата рождения не может быть в будущем"),
    }),
  crimeDate: Yup.date()
    .required("Введите дату совершения преступления")
    .max(new Date(), "Дата преступления не может быть в будущем"),
  location: Yup.string().required("Введите место совершения преступления"),
});

export default validationSchema;