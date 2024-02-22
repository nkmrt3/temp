// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

const PORT = 5000;

// MongoDB Atlas connection URI (replace <username>, <password>, and <clustername> with your credentials)
const mongoURI = "mongodb+srv://dbuser:dbadmin@cluster0.phgdtmn.mongodb.net/CRM"; // Store your MongoDB Atlas URI in a .env file

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connected');
}).catch(error => {
  console.error('MongoDB Connection Error:', error);
  process.exit(1); // Exit the process if connection fails
});

// Body parser middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Initialize routes
const userRoutes = require('./routes/userRoutes');
const teamFormRoute = require('./routes/teammakeRoutes');
const userFormRoute = require('./routes/usermakeroute');
const opportunityRoutes = require('./routes/opportunityRoutes');
const interactionRoutes = require('./routes/interactionRoutes');
const customerRoutes = require('./routes/customerRoutes');
const delroute = require('./routes/delroute');
const editroute = require('./routes/editroute');

app.use('/api', userRoutes);
app.use('/api', teamFormRoute);
app.use('/api', userFormRoute);
app.use('/api', opportunityRoutes);
app.use('/api', interactionRoutes);
app.use('/api', customerRoutes);
app.use('/api', editroute)
app.use('/api', delroute)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
