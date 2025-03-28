import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css"; 

const App = () => {
  const products = [
    {
      id: 1,
      name: "Smartphone",
      imageUrl: "./images/smartphone.jpeg",
      price: 49999,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      imageUrl: "/images/headphones.jpg",
      price: 149,
    },
    {
      id: 3,
      name: "Smartwatch",
      imageUrl: "/images/smartwatch.jpg",
      price: 500,
    },
    {
      id: 4,
      name: "Gaming Laptop",
      imageUrl: "/images/laptop.jpg",
      price: 70000,
    },
  ];


  const [cart, setCart] = useState([]);

  
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="container">
      <h1 className="title">E-Commerce Product Listing</h1>
      <Cart cart={cart} />
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default App;
