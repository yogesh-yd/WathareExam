//creating a web server

const bodyParser = require("body-parser");
const cors = require("cors");
const { json } = require("express");
const express = require("express"); // (1)require is similar to import
const server = express(); // now add dependency as npm install express
const mongoose = require("mongoose"); // this is nodejs library. it works as a ORM tool. not related with mongodb. it connects with mongodb database server

//(8) connecting nodejs with mongodb using mongoose
main().catch((err) => console.log(err)); //(9) directly copied from website

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/mylivechart"); //mongodb databse connectivity link
  console.log("DB Connected");
}

//(10) schema is copied from website. it save data to the database.
const userSchema = new mongoose.Schema({
  country: String,
  median_age: String, //it is a type of validation
});

//(11) now create a class from above schema. this is called Model
const User = mongoose.model("users", userSchema); // this name User in the argument is the same name of collection in the database
// the const User variable acts as a class
server.use(cors()); //(6) this .use is called middleware
server.use(bodyParser.json());

//(14) now create a GET method
server.get("/mylivechart", async (req, res) => {
  const docs = await User.find({}, { _id: 0 });
  res.json(docs);
});

//(3) now create API
server.post("/mylivecharts", async (req, res) => {
  //(12)the data which was randomly send to render, is now directly send to database by following function
  //whatever changes you want to perform, do this on this user object. it will be reflected back in the database

  let user = new User();
  user.country = req.body.country; //req.body has come from frontend.
  user.median_age = req.body.median_age;
  const doc = await user.save();

  console.log(doc); //express doesnt process this bodydata. hence import bodyparser
  res.json(doc);
});

//(2) now creating server
server.listen(8080, () => {
  console.log("Server has started"); // this call back function is written to check the server has started or not
});

{
  /*code is not live updating. developer has to restart the server everytime.
to avoid this issue give command as npm install -g nodemon (g means globally installing on whole system*/
}
