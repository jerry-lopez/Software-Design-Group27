const express = require("express");
const router = express.Router();

const validateQuoteInput = require("../validation/quoteForm");

const FuelQuote = require("../models/fuelQuote");
const Client = require("../models/ClientInfo");

router.post("/:id", function(req, res) {
    const { errors, isValid } = validateQuoteInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    res.send("Quote Form Received");

    Client.findOne({ username: req.body.username })
      .then(client => { if (client) {
          const numOfGallons = Number(req.body.numOfGallons)
          const deliveryAddress = req.body.deliveryAddress
          const deliveryDate = Date.parse(req.body.deliveryDate)
          const username = req.body.username

          const quoteForm = new FuelQuote ({
              numOfGallons,
              deliveryAddress,
              deliveryDate,
              username
          });
           
          quoteForm.save()
            .then(quoteForm => res.json(quoteForm))
            .catch(err => console.log(err));
        } else {
            return res.status(400).json("Not found");
        }
    });
});

module.exports = router;