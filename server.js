const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from web-build
app.use(express.static(path.join(__dirname, 'web-build')));

// SPA fallback: serve index.html for all unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web-build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

