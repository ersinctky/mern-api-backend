const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => console.log(`Server started at port ${port}`));
