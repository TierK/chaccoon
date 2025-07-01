const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  // Check if the request is a POST to /accounts (login endpoint)
  if (req.method === 'POST' && req.path === '/accounts') {
    // Log the request body for debugging purposes
    console.log('Incoming login request body:', req.body);
    const { username, password } = req.body;

    // Define the path to the JSON database file
    const dbPath = path.join(__dirname, 'public', 'assets', 'db.json');
    console.log('DB Path:', dbPath);

    // Read the JSON database file asynchronously
    fs.readFile(dbPath, 'utf-8', (err, data) => {
      if (err) {
        // Handle file reading errors
        console.error('Failed to read DB file:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      let users;
      try {
        // Parse the JSON data
        const dbData = JSON.parse(data);
        // Extract the array of user accounts
        users = dbData.accounts;
        // Verify that users is an array
        if (!Array.isArray(users)) {
          throw new Error('accounts is not an array');
        }
      } catch (parseErr) {
        // Handle JSON parsing errors
        console.error('Failed to parse DB file or invalid format:', parseErr);
        return res.status(500).json({ message: 'Invalid DB format' });
      }

      // Find a user matching the provided username and password
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        // If user is found, return a mock token
        return res.json({ token: `mock-token-${user.id}` });
      } else {
        // If credentials are invalid, return 401 Unauthorized
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    });

    // Do not call next() to avoid passing the request further
    return;
  }

  // For all other requests, continue to the next middleware or route handler
  next();
};
