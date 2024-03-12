import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE  || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }
  
  isConnected() {
    return !!this.client && this.client.isConnected();
  }

  async nbUsers() {
    if (!this.isConnected()) {
      return 0;
    }
    return this.client.db().collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.isConnected()) {
      return 0;
    }
    return this.client.db().collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
