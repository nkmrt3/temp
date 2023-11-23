// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();

const PORT = 5000;

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/CRM", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(error => console.error('MongoDB Connection Error:', error));

// Body parser middleware
app.use(express.json());

// Routes
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
