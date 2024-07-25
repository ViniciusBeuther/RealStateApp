//import fs from 'fs'
const fs = require('fs')

// config/uploadConfig.js
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
      const splitPath = req.originalUrl.split('/');
      const propertyId = splitPath[3];
      
      const path = './uploads/' + propertyId;
      fs.mkdirSync(path, { recursive: true })
    return cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, 'image' + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, 
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array('images', 10);

module.exports = upload;
 