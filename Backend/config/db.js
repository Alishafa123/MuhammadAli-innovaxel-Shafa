const mongoose = require('mongoose');
MONGO_URI="mongodb+srv://Ali:Ali%4012345@cluster0.omeb9ay.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;