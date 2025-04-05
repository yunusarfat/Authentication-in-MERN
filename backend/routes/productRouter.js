const router = require("express").Router();
const ensureAuthenticated = require("../middlewares/auth");
let products = [
  {
    name: "mobile",
    price: "10000",
  },
  {
    name: "laptop",
    price: "50000",
  },
];
router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json(products);
});
router.post("/", ensureAuthenticated, (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  // Add the new product to the list (replace with DB insertion logic in production)
  const newProduct = { name, price };
  products.push(newProduct);

  // Send the updated product list back
  res.status(201).json(newProduct);
});

module.exports = router;
