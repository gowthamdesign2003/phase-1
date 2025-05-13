const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();



// Storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
}); 

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const extname = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowed.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, jpeg, png, gif) are allowed!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send(`
    <h2>Upload an Image</h2>
    <form method="POST" action="/upload" enctype="multipart/form-data">
      <input type="file" name="image" accept="image/*" required><br><br>
      <button type="submit">Upload</button>
    </form>
  `);
});

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.send(`<h3>Error: No file uploaded.</h3><a href="/">Try again</a>`);
  } 

  res.send(`
    <h2>Upload Successful!</h2>
    <p><strong>Filename:</strong> ${req.file.filename}</p>
    <p><strong>Type:</strong> ${req.file.mimetype}</p>
    <p><strong>Size:</strong> ${(req.file.size / 1024).toFixed(2)} KB</p>
    <img src="/uploads/${req.file.filename}" style="max-width:300px;"><br><br>
    <a href="/">Upload another</a>
  `);
});

app.use((err, req, res, next) => {
  res.status(400).send(`
    <h2>Upload Failed</h2>
    <p>${err.message}</p>
    <a href="/">Go Back</a>
  `);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
