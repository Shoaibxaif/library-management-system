const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

connectToDatabase();
