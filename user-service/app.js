const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, PATCH, DELETE,OPTIONS"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "X-Requested-With,content-typeAccept, Authorization,authKey"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// });

const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/users';
console.log(mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for User Service'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use('/users', userRoutes);

// Route not found (404) handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`);
});

