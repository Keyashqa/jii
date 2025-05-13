const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorhandler');
const path = require('path');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: 'https://jii-1.onrender.com/', // Replace with your frontend URL
  credentials: true,
}));
// Connect to MongoDB
connectDB();




// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalsCRUD'));
app.use('/api/users', require('./routes/userRoutes'));


// Serve static files from the React frontend app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
  });
}


// ❗ Error handler should be after all routes
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
