const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  getStatus(req, res) {
    if (redisClient.isAlive() && dbClient.isAlive()) {
      res.status(200).send('{ "redis": true, "db": true }');
    }
  }

  async getStat(req, res) {
    const userCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();

    res.status(200).json({ users: userCount, files: filesCount });
  }
}

module.exports = new AppController();
