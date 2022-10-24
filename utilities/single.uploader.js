// => Uploader Function

const multer = require("multer");
const createError = require("http-errors");
const path = require("path");

function uploader(avatar, filetype, filesize, error) {
  const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${avatar}`;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const uniqueID =
        "Ettisaf_Rup" + Date.now() + "_" + Math.round(Math.random() * 1e6);
      cb(null, uniqueID + fileExt);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: filesize,
    },
    fileFilter: (req, file, cb) => {
      if (filetype.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error));
      }
    },
  });

  return upload;
}

module.exports = uploader;
