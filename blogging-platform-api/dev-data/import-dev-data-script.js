// Run this file seperatly for importing or deleting all data from collection in DB.

const mongoose = require('mongoose');
const fs = require('fs');
const Post = require('./../models/postModel');

require('dotenv').config(); // Load environment variables

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

// Read JSON file into JS object
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/posts-data.json`, 'utf-8')
);

const importData = async () => {
  try {
    // Import all data into DB into posts collection
    await Post.create(data);
    console.log('Data successfully imported');
  } catch (err) {
    console.error('Error importing data:', err);
  }
  process.exit(); // Exit the process
};

const deleteData = async () => {
  try {
    // Delete all data from posts collection
    await Post.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// CLI
console.log(process.argv); // Print the command line arguments
if (process.argv.includes('--import')) {
  importData();
} else if (process.argv.includes('--delete')) {
  deleteData();
}
