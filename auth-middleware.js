const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  console.log(`[Middleware] URL: ${req.originalUrl}, Path: ${req.path}`);

  // Login
  if (req.method === 'POST' && req.path === '/accounts') {
    const { username, password } = req.body;

    const dbPath = path.join(__dirname, 'public', 'assets', 'db.json');
    fs.readFile(dbPath, 'utf-8', (err, data) => {
      if (err) return res.status(500).json({ message: 'Internal server error' });

      try {
        const db = JSON.parse(data);
        const users = db.accounts;
        const user = users.find(u => u.username === username && u.password === password);
        if (user) return res.json({ token: `mock-token-${user.id}` });
        else return res.status(401).json({ message: 'Invalid credentials' });
      } catch {
        return res.status(500).json({ message: 'Invalid DB format' });
      }
    });
    return;
  }

  // Get current user (support both paths)
  if (
    req.method === 'GET' &&
    (req.originalUrl === '/accounts/my_account' || req.originalUrl === '/api/v1/accounts/my_account')
  ) {
    const authHeader = req.headers.authorization || '';
    console.log('Authorization header:', authHeader);

    const token = authHeader.split(' ')[1];
    if (!token || !token.startsWith('mock-token-')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = token.replace('mock-token-', '');
    const dbPath = path.join(__dirname, 'public', 'assets', 'db.json');

    try {
      const data = fs.readFileSync(dbPath, 'utf-8');
      const db = JSON.parse(data);
      const users = db.accounts;
      const user = users.find(u => u.id === userId);

      if (!user) return res.status(404).json({ message: 'User not found' });

      return res.json(user);
    } catch {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Pass all other requests
  next();
};
