import mongoose from 'mongoose';

export default () => {
  mongoose.connect(process.env.DB_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((data) => {
    console.log(`mongodb is connected with server: ${data.connection.host}`);
  }).catch((error) => console.log(error));
};
