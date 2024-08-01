const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.send(`File uploaded successfully: ${req.file.path}`);
  } catch (err) {
    res.sendStatus(400);
  }
});

app.use((error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
