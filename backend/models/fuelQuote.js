const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fuelQuoteSchema = new Schema({
    numOfGallons: {
        type: Number,
        required: true
    },
    deliveryAddress: {
        type: String
    },
    deliveryDate: {
        type: date
    },
    suggestedPrice: {
        type: Number
    },
    totalAmountDue: {
        type: Number
    }
});

module.exports = Quote = mongoose.model("fuelQuote", fuelQuoteSchema);