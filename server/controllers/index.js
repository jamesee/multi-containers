
const UserDetails = require("../models/userDetails");

module.exports = (db, authService, ApiError) => {
  const controllers = {
    ...require("./auth")(authService, ApiError),
    ...require("./userDetails")(db, UserDetails, ApiError)
  };

  return controllers;
};
