// backend/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const { Customer } = require('/home/rtr/Desktop/temp/models/Mongo.js');

router.post("/customer", async (req, res) => {
  try {
    const {
      companyName,
      contactName,
      contactEmail,
      contactPhone,
      industry,
      location,
      createdDate,
      notes
    } = req.body;

    const customer = new Customer({
      CompanyName: companyName,
      ContactName: contactName,
      ContactEmail: contactEmail,
      ContactPhone: contactPhone,
      Industry: industry,
      Location: location,
      CreatedDate: createdDate,
      Notes: notes
    });

    await customer.save();

    console.log("Customer added to the database:", customer);
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
