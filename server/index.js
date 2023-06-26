const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB Connected Successfully");
}).catch(error => {
  console.log(error.message);
});

app.use("/api/auth", authRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${ process.env.PORT }`);
});
