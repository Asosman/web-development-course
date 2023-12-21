const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

const router = express.Router();
 
router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {
  //Getting user data.....
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;
  // console.log(enteredPassword);
 //Checking for the user validation form for registration......
  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    !enteredPassword.trim() ||
    enteredPassword.length < 6 ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    console.log(enteredPassword);
    console.log('Enteredn incorrect data');
    return res.redirect("/signup");
  }

  const userExist = await db.getDb().collection('user').findOne({email:enteredEmail })

  if(userExist){
    console.log('user already exist!!!!');
    return res.redirect("/signup");
  }
  //hashing of password ......
  const hashedPassword = await bcrypt.hash(enteredPassword, 12);
  //Creating the object for database........
  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };
  //Sending user data to database......
  await db.getDb().collection("user").insertOne(user);
  //Redirecting to login page for the user to login with created account.....
  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;

  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const userExist = await db
    .getDb()
    .collection("user")
    .findOne({ email: enteredEmail });
  // console.log(userExist);
  if (!userExist) {
    console.log("The user does not exist!!!!");
    return res.redirect("/login");
  }

  const passwordIsEqual = await bcrypt.compare(
    enteredPassword,
    userExist.password
  );
  //  console.log(passwordIsEqual,'am here');
  if (!passwordIsEqual) {
    console.log("incorrect username or password!!!");
    return res.redirect("/login");
  }

  console.log("You login succussive!!!!!!");
  res.redirect("/admin");
});

router.get("/admin", function (req, res) {
  res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;
