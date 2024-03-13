const dbClient = require('../utils/db');
const crypto = require('crypto');

class UsersController {
  async postNew(req, res) {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      // Check if the email already exists
      const userExists = await dbClient.userExists(email);
      if (userExists) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash the password using SHA1
      const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

      // Create the user object
      const newUser = {
        email: email,
        password: hashedPassword // Store the hashed password
      };

      // Insert the user into the database
      const result = await dbClient.insertUser(newUser);

      // Respond with the new user's information
      res.status(201).json({ email: result.ops[0].email, id: result.ops[0]._id });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UsersController();
