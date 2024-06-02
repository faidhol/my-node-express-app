const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

// models
const Place = require('./models/place');

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test')
  .then((result) => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.json({"msg": "Hello world"});
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})