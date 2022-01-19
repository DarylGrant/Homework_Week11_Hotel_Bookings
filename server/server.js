const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const createRouter = require('./helpers/create_router.js')

const cors = require("cors");
app.use(cors())
app.use(express.json());

// Connect to db
// Create router and pass db collection to it

MongoClient.connect('mongodb://127.0.0.1:27017', {useUnifiedTopology: true})
  .then((client) => {
    const db = client.db('hotel_checkins');
    const bookingsCollection = db.collection('bookings');
    const bookingsRouter = createRouter(bookingsCollection);
    app.use('/api/bookings', bookingsRouter);

  })
    .catch(console.error);

app.listen(5000, function () {
  console.log('App running on port 5000');
});
