const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require("path");
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce');


mongoose.connect(process.env.SECRET_DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());  

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(helmet());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;