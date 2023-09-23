import express from "express";
import User from "./../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
function createToken(id) {
  return jwt.sign({ id }, "moAminSecretKey", { expiresIn: 3600 });
}
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/signup", (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then(() => {
      //auth
      const token = createToken(newUser._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 3600,
        // secure: true,
      });
      res.status(201).json({ user: newUser._id });
    })
    .catch((e) => {
      // custom validation
      // console.log(e.errors.password.properties.message);
      // console.log(e.errors.email.properties.message);
      // console.log(e.message);
      let message = e.message;
      message.includes("duplicate key error")
        ? (message = "allready used mail")
        : message.includes("email")
        ? (message = "please provide a valid e-mail")
        : (message = "password must be greater than 6 characters");
      res.status(400).json({ message });
    });
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            const token = createToken(user._id);
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: 1000 * 3600,
              // secure: true,
            });
            res.status(201).json({ user: user._id });
          } else {
            res.status(500).json({ message: "incorrect password" });
          }
        });
      } else {
        res.status(401).json({ message: "invalid e-mail" });
      }
    })
    .catch((e) => {
      res.status(401).send(e);
    });
});
router.get("/logout", (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 1,
    // secure: true,
  });
  res.redirect("/login")
});
export default router;
