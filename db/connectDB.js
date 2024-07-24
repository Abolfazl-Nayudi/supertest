const mongoose = require("mongoose");

const connect = async (URI) => {
  await mongoose.connect(URI);
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connect, disconnectDB };
