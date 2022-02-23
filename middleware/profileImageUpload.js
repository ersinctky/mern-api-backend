const multer = require("multer");
const path = require("path");

// storage, Filefilter

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, "/public/uploads"));
  },
  filename: function (req, file, cb) {
    // const extension = file.mimetype.split("/")[1];
    // req.savedImage2 = "image_" + Date.now() + "." + extension;
    // cb(null, req.savedImage2);

    cb(null, req.body.name);
    console.log(req.body.name);
  },
});

const fileFilter = (req, file, cb) => {
  let allowedMimeType = ["image/jpg", "image/gif", "image/jpeg", "image/png"];
  if (!allowedMimeType.includes(file.mimetype)) {
    return cb("please provide a valid image file");
  }
  return cb(null, true);
};

const uploadImage = multer({ storage, fileFilter });

module.exports = { uploadImage };
