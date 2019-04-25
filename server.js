const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Require in API routes here

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Ser static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set up port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
