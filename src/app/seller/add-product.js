// src/app/seller/add-product.js
"use client";
import { useState } from 'react';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // Handle add product logic
  };

  return (
    <form onSubmit={handleAddProduct}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <label>
        Discount:
        <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductPage;
