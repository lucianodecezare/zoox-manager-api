import mongoose from 'mongoose';

export const connectDb = async () => {
  mongoose.connection.on('open', () => {
    console.log('Database is ready!');
  });
};

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose
      .connect(process.env.DB_HOST, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((error) => console.log(error));
  }
}

export default new Database();
