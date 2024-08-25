"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Example context import
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toastify

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn, logout, role } = useAuth(); // Use context to get auth state and logout function
  const router = useRouter();
  const [isSeller, setIsSeller] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    discount: 0,
    image: '', // Image URL field
  });

  useEffect(() => {
    // Check if user is a seller
    const checkUserRole = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token to get user info
        setIsSeller(decodedToken.role === 'seller'); // Adjust this according to your token structure
      }
    };
    checkUserRole();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login'); // Redirect to login after logout
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/auth/login');
        return;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setNewProduct({
          name: '',
          category: '',
          description: '',
          price: '',
          discount: 0,
          image: '', // Reset image field
        });
        toast.success('Product added successfully!'); // Success message
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add product.'); // Error message
      }
    } catch (error) {
      console.error('Failed to add product:', error);
      toast.error('An error occurred while adding the product.'); // Error message
    }
  };

  return (
    <header className="bg-gray-800 w-full text-white p-4">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-lg font-bold">My E-Commerce Site</Link>
          <nav className="hidden md:flex space-x-4">
            {/* <Link href="/about" className="hover:text-gray-400">About</Link>
            <Link href="/contact" className="hover:text-gray-400">Contact</Link> */}
          </nav>
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-1/3 lg:w-1/4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full p-2 rounded-lg bg-gray-700 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-2 mr-2 text-blue-500"
          >
            🔍
          </button>
        </form>

        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <Link href="/auth/login" className="hover:text-gray-400">Login</Link>
          ) : (
            <>
              {isSeller && <Link href="#" onClick={() => setIsModalOpen(true)} className="hover:text-gray-400">Add Product</Link>}
              {!isSeller && <Link href="/cart" className="hover:text-gray-400">Cart</Link>}
              <Link href="/profile" className="hover:text-gray-400">Profile</Link>
              <button onClick={handleLogout} className="hover:text-gray-400 focus:outline-none">Logout</button>
            </>
          )}
        </div>
      </div>

      {/* Modal for adding a product */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="discount" className="block text-gray-700">Discount:</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={newProduct.discount}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full text-black"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700">Image URL:</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full text-black"
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
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </header>
  );
};

export default Header;
