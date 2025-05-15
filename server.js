const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/otpservice', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 5sim.net API integration
const FIVESIM_API_KEY = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzY1NjQ0NzUsImlhdCI6MTc0NTAyODQ3NSwicmF5IjoiNGZlMDA5NDNiNGJkZTM0MmU4MmUyZjc2MTgwMzM5YzkiLCJzdWIiOjEzODc4NDl9.IDyzfgHXtn-W9tehRzcLPU6_X9XYxcGYGyia1f689GwLUauCuKwkYKrOCkMIPo9ecYbCBz4_xUupINotD5nXTAs4ALei_B0BT9m7Fedb4oz2T13N3BXrFG8d_MbyZAesLmgFZgxswPXUD1td1rd8rTA1F1fPeOboEOC5qLNgewZirtvA2pKewgnLnZxQTEApWgsuMYwLnvYcH3LVeKaNWs81lwySo2CKsjlSheNsz92SmlHUGWot_Ks6E_DqIjzM7AU9MXc4KeKy8pzOm6zJ7ksbF6IdAjqBlFG_vcHQ69qEWAPLRND4o_an7zo3pxDr8W05vqAHB9Ca2zETkoubtg';
const FIVESIM_BASE_URL = 'https://5sim.net/v1';

// Routes will go here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
