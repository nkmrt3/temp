// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { Users } = require('/home/rtr/Desktop/temp/models/Mongo.js');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request:', { username, password });

  try {
    const user = await Users.findOne({ Username: username, Password: password });
    console.log('User found:', user);

    if (user) {
      // Exclude sensitive information like password
      const { Password, ...userData } = user._doc;

      // Set the username as a cookie in the response
      res.cookie('username', username, { maxAge: 900000, httpOnly: true });

      res.json({
        success: true,
        message: 'User successfully logged in',
        role: user.Role,
        userData,
      });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
