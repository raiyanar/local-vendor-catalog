const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Product = require("./models/Product");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
