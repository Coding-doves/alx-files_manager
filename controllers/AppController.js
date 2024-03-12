const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  async getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive();
    const status = { redis: redisAlive, db: dbAlive };

    res.status(200).json(status);
  }

  async getStats(req, res) {
    const userCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
    const stats = { users: userCount, files: filesCount };

    res.status(200).json(stats);
  }
}

module.exports = new AppController();
