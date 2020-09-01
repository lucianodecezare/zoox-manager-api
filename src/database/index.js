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
    this.mongoConnection = mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
