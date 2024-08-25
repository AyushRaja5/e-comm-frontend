// src/app/cart/page.js
"use client"; 
import CartItem from '@/components/CartItem';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(''); // To handle errors

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Add the token to the headers
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        setError('Failed to fetch cart items');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 full-height">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
