// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { Users } = require('/home/azureuser/project/Deve/backend/models/Mongo.js');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Remove a user
router.delete('/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find user by ID and delete
    const deletedUser = await Users.findByIdAndDelete(userId);

    if (deletedUser) {
      console.log('User removed successfully');
      res.json({ success: true, message: 'User removed successfully' });
    } else {
      console.error('Error removing user: User not found');
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
