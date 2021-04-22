const express = require("express");
const router = express.Router();

// Load in the profile validation
const validateProfileInput = require("../validation/profile");

// Load in clientInfo model
const Client = require("../models/ClientInfo")

router.post("/", function(req, res) {
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
    const username_id = req.body.username_id;

    const clientProfile = new Client ({
        fullname,
        addressOne,
        addressTwo,
        city,
        state,
        zipcode,
        username_id
    });

    clientProfile.save()
        .then(client => res.json(client))
        .catch(err => console.log(err));
        
});

module.exports = router;