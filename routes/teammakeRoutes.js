const express = require('express');
const router = express.Router();
const { Team, Users } = require('../models/Mongo.js'); // Update the path

router.post('/create-team', async (req, res) => {
  const { teamName, teamLead, teamMembers } = req.body;

  try {
    // Check if the provided teamLead exists in the Users collection
    const leadUser = await Users.findOne({ Username: teamLead.toString() });

    if (!leadUser) {
      return res.status(400).json({ success: false, message: 'Team Lead not found' });
    }

    // Extract the team member usernames from the comma-separated list and trim whitespace
    const membersArray = teamMembers.split(',').map(memberUsername => memberUsername.trim());

    // Check if all provided members exist in the Users collection
    const memberUsers = await Users.find({ Username: { $in: membersArray } });

    if (memberUsers.length !== membersArray.length) {
      return res.status(400).json({ success: false, message: 'One or more team members not found' });
    }

    // Create a new team using the Team model
    const newTeam = new Team({
      teamName: teamName,
      teamLead: leadUser,
      teamMembers: memberUsers,
    });

    // Save the new team to the database
    await newTeam.save();
    console.log('New team created:', newTeam);

    // Redirect to the /teammade route
    res.redirect('/teammade');
  } catch (error) {
    console.error('Error during team creation:', error);

    // Print detailed error information
    console.log(error.message); // Print the error message
    console.log(error.stack);   // Print the error stack trace

    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router; // Fix the typo in module.exports
