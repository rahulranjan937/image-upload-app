import mongoose from 'mongoose';
import { MONGODB_URI, NODE_ENV } from '@/config/index';

if (NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState) {
      console.log('Already connected to MongoDB');
      return;
    }

    await mongoose.connect(MONGODB_URI);

    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    setTimeout(() => {
      console.log('Trying to reconnect to MongoDB...');
      connectDB();
    }, 5000);
  }
};

export default connectDB;
