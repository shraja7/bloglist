const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  const url = process.env.MONGODB_URI;

  console.log("Connecting to", url);

  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToDatabase;
