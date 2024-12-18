const mongoose = require("mongoose");

// Load the environment variable
const url = process.env.MONGO_URL;

const connect = async () => {
  try {
    if (!url) {
      throw new Error("MONGO_URL environment variable is not set.");
    }

    // Connect to the database
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected successfully to Database.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

connect();
