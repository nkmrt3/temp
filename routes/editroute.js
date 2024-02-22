// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { Users } = require('../models/Mongo.js');

// Endpoint to check if the username exists and retrieve user information
router.get('/check-username/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await Users.findOne({ Username: username });

    if (user) {
      // Exclude sensitive information like password
      const { Password, ...userData } = user._doc;
      res.json({ exists: true, userData });
    } else {
      res.json({ exists: false, userData: null });
    }
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ exists: false, userData: null });
  }
});

// Endpoint to update user information
router.post('/edit-user', async (req, res) => {
  const updatedUserData = req.body;

  try {
    // Update user information in the database based on the username
    const updatedUser = await Users.findOneAndUpdate(
      { Username: updatedUserData.Username },
      { $set: updatedUserData },
      { new: true }
    );

    if (updatedUser) {
      res.json({ success: true, message: 'User information updated successfully' });
    } else {
      res.json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
