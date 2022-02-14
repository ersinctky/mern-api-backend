const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/categories", require("./routes/category"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started at port ${port}`));
