// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { Users } = require('/home/rtr/Desktop/temp/models/Mongo.js'); // Update the path

let nextUserID = 10020; // Initialize the starting user ID

router.post('/add-user', async (req, res) => {
    const {
      Username,
      Password,
      Email,
      FirstName,
      LastName,
      JobTitle,
      Department,
      Phone,
      HireDate,
      Role,
    } = req.body;

    function generateUserID() {
      const currentID = nextUserID;
      nextUserID += 21; // Increment by 21 for the next user
      return currentID.toString();
    }

    const UserID = generateUserID();

    try {
      const user = new Users({
        UserID,
        Username,
        Password,
        Email,
        FirstName,
        LastName,
        JobTitle,
        Department,
        Phone,
        HireDate,
        Role,
      });

      const savedUser = await user.save();
      console.log('User added successfully:', savedUser);
      res.json({ success: true, message: 'User added successfully' });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
