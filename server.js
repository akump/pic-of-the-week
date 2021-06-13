const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs-extra')
const multer = require("multer");

let currentWeek = 1;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    currentWeek += 1;
    const dir = `./images/${currentWeek}`;
    fs.ensureDir(path.join(__dirname, dir), err => {
      cb(null, path.join(__dirname, dir))
    })
  },
  filename: function (req, file, cb) {
    cb(null, 'image.png')
  }
});

const upload = multer({ storage: storage })

app.use(express.static('public'));

app.get("/image/:week", (req, res) => {
  const { week } = req.params;
  res.sendFile(path.join(__dirname, `./images/${week}/image.png`));
});

app.get("/currentWeek", (req, res) => {
  res.send(currentWeek.toString());
});

// app.post('/upload', upload.single('file'), function (req, res, next) {
//   const file = req.file
//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//   res.send('File upload successful')
// });

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});