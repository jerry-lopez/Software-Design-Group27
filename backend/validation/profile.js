const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProfileInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we may use validator functions
    data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
    data.addressOne = !isEmpty(data.addressOne) ? data.addressOne : "";
    data.city = !isEmpty(data.city) ? data.city : "";
    data.stateOne = !isEmpty(data.state) ? data.stateOne : "";
    data.zipCode = !isEmpty(data.zipcode) ? data.zipCode : "";


    // Fullname check
    if (Validator.isEmpty(data.fullname)) {
        errors.fullname = "Fullname is required.";
    }
    
    // Address check
    if (Validator.isEmpty(data.addressOne)) {
        errors.addressOne = "Address is required";
    }

    // City check
    if (Validator.isEmpty(data.city)) {
        errors.city = "City is required";
    }

    // State check
    if (Validator.isEmpty(data.state)) {
        errors.stateOne = "State is required";
    }

    // Zipcode check
    if (Validator.isEmpty(data.zipcode)) {
        errors.zipCode = "Zipcode is required";
    }
    // Return our errors object with any and all errors containted as well as an
    // isValid boolean that checks to see if we have any errors
    return {
        errors,
        isValid: isEmpty(errors)
    };
};