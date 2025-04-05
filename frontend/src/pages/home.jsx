import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "../styles/home.css"; // Assuming you have the modern styling as discussed earlier

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
  });

  const navigate = useNavigate();

  // Fetch the logged-in user
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
  }, []);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/products", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const result = await response.json();
        setProducts(result);
      } catch (err) {
        handleError(err);
      }
    };
    fetchProducts();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logout successful");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  // Handle form change for adding a new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name, price } = newProduct;
    if (!name || !price) {
      handleError("Please fill all the fields");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(newProduct),
      });
      const result = await response.json();
      if (response.status === 201) {
        handleSuccess("Product added successfully");
        setProducts([...products, result]);
        setNewProduct({
          name: "",
          price: "",
        });
      } else {
        handleError(result.message || "failed to add product");
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>User name:{loggedInUser}</h1>
      </div>
      <div className="products-section">
        <h1>Products</h1>
        {products.length === 0 ? (
          <h2>No products found</h2>
        ) : (
          <ul className="product-list">
            {products.map((item, index) => (
              <li className="product-item" key={index}>
                <strong>{item.name}</strong> - ${item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="productsadd">
        <h5>Add Product</h5>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <ToastContainer />
    </div>
  );
}

export default Home;
