import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Database connected!'.green.inverse);
  } catch (error) {
    console.log(error.message.red.inverse);

    // halt with failure
    process.exit(1);
  }
};

export default connectDB;
