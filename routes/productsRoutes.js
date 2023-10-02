import express from "express";
import Product from "../models/product.js";
const router = express.Router();
router.get("/", (req, res) => {
  Product.find().then((data) => {
    res.render("products", { products: data });
  });
});
// addProduct page route
router.get("/add-product", (req, res) => {
  res.render("addProduct");
});
// addProduct route
router.post("/add-product", (req, res) => {
  const data = req.body;
  const product = new Product(data);
  product.save();
  res.redirect("/products");
});
// delete product route
router.delete("/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.send(err);
    });
});
// retrive updated product data
router.get("/product/:id", (req, res) => {
  const id = req.params.id;
  Product.find({ _id: id }).then((data) => {
    res.json(data);
  });
});
// update product route
router.put("/product/:id", (req, res) => {
  Product.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((data) => {
      res.redirect("/products");
    })
    .catch((err) => {
      res.send(err);
    });
});
// search
router.post("/search", (req, res) => {
  const query = req.body.query;
  Product.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      {
        category: { $regex: query, $options: "i" },
      },
      {
        description: { $regex: query, $options: "i" },
      },
    ],
  })
    .then((data) => {
      res.render("products", { products: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

export default router;
