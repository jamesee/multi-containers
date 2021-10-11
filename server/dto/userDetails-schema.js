const yup = require("yup");

const insertUserDetails = yup.object({
  body: yup.object({
    company: yup.string().trim().required("Company is required"),
    designation: yup.string().trim().required("Designation is required"),
    department: yup.string().trim().required("Department is required")
  }),
});

const getUserDetails = yup.object({
  params: yup.object({
    id: yup
      .number("id must be a number")
      .integer("id must be an integer")
      .positive("id must be positive")
      .required("id is required"),
  }),
});



module.exports = {
  insertUserDetails,
  getUserDetails,
};
