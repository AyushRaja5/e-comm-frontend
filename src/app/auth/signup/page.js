// src/app/auth/signup/page.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('buyer'); // Default role
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        // Handle successful signup (e.g., redirect to login)
        router.push('/auth/login');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      setError('An error occurred');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors">Sign Up</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/auth/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
