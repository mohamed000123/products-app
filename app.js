import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import productsRouter from "./routes/productsRoutes.js"
import authRouter from "./routes/authRoutes.js"
import authCheck from "./middleware/authMiddelware.js";
// creating express app & middleware
const app = express();
app.use(express.json()); // to access request.body data
// connecting to data base
mongoose
  .connect("mongodb://127.0.0.1:27017/egyStores")
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });

// setting template engine
app.set("view engine", "ejs");
// setting static folder
app.use(express.static("public"));
// to access request.body data
app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
// parsing cookies 
app.use(cookieParser());
//home route
app.get("/", authCheck, (req, res) => {
  res.render("home");
});
//products routes
app.use("/products", authCheck, productsRouter);
//auth routes
app.use("/", authRouter);