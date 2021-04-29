const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
    /*
    clientInfo: {
        type: Schema.Types.ObjectId,
        ref: 'clientInfo'
    }
    */
});

module.exports = User = mongoose.model("users", userSchema);