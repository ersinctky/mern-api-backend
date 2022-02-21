const express = require("express");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

const multer = require("multer");
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();

// Connecting MongoDB
connectDB();

app.use(cors());

// express - body middleware

app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "/public")));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("File has been uploaded");
// });

// Routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/categories", require("./routes/category"));

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started at port ${port}`));
