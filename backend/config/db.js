import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDb Connected: ${conn.connection.host}`.green.underline);
  } catch (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  }
};

export default connectDB;
