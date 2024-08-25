"use client";
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProductDetail = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    image: ''
  });

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const productData = await res.json();
        setProduct(productData);
        setUpdatedProduct(productData); // Initialize modal form with product data
      } catch (error) {
        console.error('Failed to fetch product', error);
        setError('Product not found.');
      }
    };

    // Check if user is a seller
    const checkUserRole = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token to get user info
        setIsSeller(decodedToken.role === 'seller'); // Adjust this according to your token structure
      }
    };

    fetchProduct();
    checkUserRole();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (response.ok) {
        toast.success('Product added to cart successfully!');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to add product to cart');
      }
    } catch (err) {
      console.error('Error adding product to cart:', err);
      toast.error('An error occurred while adding to cart.');
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Product deleted successfully!');
        router.push('/'); // Redirect to product list
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error('An error occurred while deleting the product.');
    }
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        toast.success('Product updated successfully!');
        setIsModalOpen(false);
        // Refresh product details
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        const productData = await res.json();
        setProduct(productData);
        setUpdatedProduct(productData);
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      toast.error('An error occurred while updating the product.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (error) {
    return (
      <div>
        <main className="container mx-auto my-8 p-6">
          <ToastContainer />
          <p>{error}</p>
        </main>
      </div>
    );
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <main className="container mx-auto my-8 p-6">
        <ToastContainer />
        <div className="border-2 border-gray-300 rounded-lg p-4">
          <Image
            src={product.image || '/path/to/placeholder-image.png'}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover mb-4"
          />
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-gray-600 mb-4">
            <span className="line-through">${product.price}</span>
            <span className="text-red-500 ml-2">
              ${(parseFloat(product.price) - parseFloat(product.discount)).toFixed(2)}
            </span>
          </p>
          {!isSeller && 
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
          }
          {isSeller && (
            <div className="mt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mr-2"
              >
                Update Product
              </button>
              <button
                onClick={handleDeleteProduct}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Delete Product
              </button>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg"  style={{ width: '60%' }}>
              <h2 className="text-2xl font-bold mb-4">Update Product</h2>
              <form onSubmit={handleUpdateProduct}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={updatedProduct.description}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-gray-700">Price:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="discount" className="block text-gray-700">Discount:</label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={updatedProduct.discount}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className="block text-gray-700">Image URL:</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={updatedProduct.image}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    // required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;
