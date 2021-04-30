const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateQuoteInput(data) {
    let errors = {};

    
    data.numOfGallons = !isNaN(data.numOfGallons) ? data.numOfGallons : 0;


    // Check that the gallons requested is not empty
    if (isNaN(data.numOfGallons)) {
        errors.numOfGallons = "Number of Gallons requested is required.";
    }
    
    
    // Return our errors object with any and all errors containted as well as an
    // isValid boolean that checks to see if we have any errors
    return {
        errors,
        isValid: isEmpty(errors)
    }; 
};


