// backend/routes/interactionRoutes.js
const express = require('express');
const router = express.Router();
const { Interaction } = require('../models/Mongo.js');

router.post("/interaction", async (req, res) => {
  try {
    const {
      contactName,
      type,
      interactionDate,
      participants,
      notes
    } = req.body;

    const interaction = new Interaction({
      ContactName: contactName,
      Type: type,
      InteractionDate: interactionDate,
      Participants: participants,
      Notes: notes
    });

    await interaction.save();

    console.log("Interaction added to the database:", interaction);
    res.status(201).json({ success: true, data: interaction });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
