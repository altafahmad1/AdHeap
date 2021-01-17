require('dotenv').config();
const cloudinary = require('cloudinary').v2;
 
 // cloudinary configuration
module.exports = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });