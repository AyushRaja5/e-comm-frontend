// src/app/seller/manage-products.js
import { useEffect, useState } from 'react';

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Manage Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - <a href={`/products/${product.id}`}>Edit</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProductsPage;
