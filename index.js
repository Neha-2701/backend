const express = require("express");
const cors = require("cors");
const User = require("./model/user");
const env = require("dotenv").config();
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", ""],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const mongoose = require("mongoose");

console.log(process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:` + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));

app.post("/signup", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  console.log(req.body);
  let user = await User.findOne(req.body);
  if (user) {
    resp.send(user);
  }
});

app.get("/", async (req, resp) => {
  resp.send("DONE!!!!!!");
});

// app.listen(process.env.PORT);
