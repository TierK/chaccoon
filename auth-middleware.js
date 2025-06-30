const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/api/v1/token') {
    const { username, password } = req.body;

    // Route to the JSON database file

    const dbPath = path.join(__dirname, 'public', 'assets', 'db.json');
    console.log('DB Path:', dbPath);
    // Read the JSON database file
    fs.readFile(dbPath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Failed to read DB file:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      let users;
      try {
        users = JSON.parse(data);
      } catch (parseErr) {
        console.error('Failed to parse DB file:', parseErr);
        return res.status(500).json({ message: 'Invalid DB format' });
      }

      // find user by username and password
      const user = users.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        // return a mock token
        return res.json({ token: `mock-token-${user.id}` });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    });

    return;
  }

  next();
};
