module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/api/v1/token') {
    const { username, password } = req.body;

    // Test credentials
    if (username === 'geoffrey.johns' && password === '1234') {
      return res.json({ token: 'mock-jwt-token-abc123' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }
  next();
};