const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 3000;

// models
const Place = require('./models/place');

// connect to mongodb
mongoose.connect('mongodb+srv://faidholanwar17:CzgoJU9KgRv8vbAC@cluster0.zo8y7jl.mongodb.net/')
  .then((result) => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/seed/place', async (req, res) => {
  const place = new Place({
    title: 'The Great Wall of China',
    price: '1000000000',
    description: 'A great building',
    location: 'China'
  })
  await place.save();
  res.send(place);
})

app.get('/api', (req, res) => {
  res.json({"msg": "Hello world"});
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})