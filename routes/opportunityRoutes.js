// backend/routes/opportunityRoutes.js
const express = require('express');
const router = express.Router();
const { Opportunity } = require('/home/azureuser/project/Deve/backend/models/Mongo.js');

router.post("/opportunity", async (req, res) => {
  try {
    const {
      opportunityName,
      contactName,
      stage,
      value,
      closeDate,
      createdDate,
      notes
    } = req.body;

    const opportunity = new Opportunity({
      OpportunityName: opportunityName,
      ContactName: contactName,
      Stage: stage,
      Value: value,
      CloseDate: closeDate,
      CreatedDate: createdDate,
      Notes: notes
    });

    await opportunity.save();

    console.log("Opportunity added to the database:", opportunity);
    res.status(201).json({ success: true, data: opportunity });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
