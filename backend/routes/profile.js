const express = require("express");
const router = express.Router();

// Load in the profile validation
const validateProfileInput = require("../validation/profile");

// Load in clientInfo model
const Client = require("../models/ClientInfo")
const User = require("../models/User")

router.post("/:id", function(req, res) {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const fullname = req.body.fullname;
    const addressOne = req.body.addressOne;
    const addressTwo = req.body.addressTwo;
    const city = req.body.city;
    const state = req.body.state;
    const zipcode = req.body.zipcode;
    const username = req.body.username;

    const clientProfile = new Client ({
        fullname,
        addressOne,
        addressTwo,
        city,
        state,
        zipcode,
        username
    });

    clientProfile.save()
        .then(client => res.json(client))
        .catch(err => console.log(err));
        
});

module.exports = router;