const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});


// Start the server
const server = app.listen(process.env.PORT, '127.0.0.1', () => {
  console.log(`Server is running on http://127.0.0.1:${process.env.PORT}`);
});
