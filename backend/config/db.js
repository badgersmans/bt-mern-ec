import mongoose from 'mongoose';

const connectDB = async() => {

    try {
        await mongoose.connect(process.env.dbURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('Database connected!'.green.bold.underline);
    } catch (error) {
        console.log(error.message.red.bold.underline);

        // halt with failure
        process.exit(1);
    }
}

export default connectDB;
