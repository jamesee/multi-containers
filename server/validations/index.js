const ApiError = require("../errors/api-error");
const ValidateDto = require("../middlewares/validate-dto");

module.exports = (schema) => {
  validations = {};

  validations.register = ValidateDto(schema.register, ApiError);
  validations.login = ValidateDto(schema.login, ApiError);

  validations.insertUserDetails = ValidateDto(schema.insertUserDetails, ApiError);
  validations.getUserDetails = ValidateDto(schema.getUserDetails, ApiError);


  return validations;
};
