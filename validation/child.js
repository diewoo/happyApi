
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.names = !isEmpty(data.names) ? data.names : '';
  data.surname = !isEmpty(data.surname) ? data.surname : '';
  data.identityDocumentNumber = !isEmpty(data.identityDocumentNumber) ? data.identityDocumentNumber : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  if (!Validator.isLength(data.names, { min: 2, max: 30 })) {
    errors.names = 'Debe ser entre 2 y 30 caracteres';
  }

  if (!Validator.isLength(data.surname, { min: 2, max: 30 })) {
    errors.surname = 'Debe ser entre 2 y 30 caracteres';
  }
  if (Validator.isEmpty(data.names)) {
    errors.names = 'Nombres  son requeridos';
  }
  if (Validator.isEmpty(data.surname)) {
    errors.surname = 'Apellidos  son requeridos';
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Genero  es requerido';
  }
  if (Validator.isEmpty(data.identityDocumentNumber)) {
    errors.identityDocumentNumber = 'Dni es requerido';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
