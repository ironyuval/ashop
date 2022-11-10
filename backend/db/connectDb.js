import mongoose from 'mongoose';

export const connectDb = () => {
  mongoose.connect(process.env.DB_CLOUD_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((data) => {
    console.log(`mongodb is connected with server: ${data.connection.host}`);
  }).catch((error) => console.log(error));
};
