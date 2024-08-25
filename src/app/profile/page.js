"use client";

import { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Replace with your auth token retrieval method
          }
        });
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        const data = await res.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [apiUrl]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-center">No user data found.</div>;
  }

  return (
    <main className="container mx-auto my-8 p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <p><strong>User Id:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Role:</strong> {user.role}</p>

        {/* Add more user details as needed */}
        {/* Example: */}
        {/* <p><strong>Address:</strong> {user.address}</p> */}
      </div>
    </main>
  );
};

export default ProfilePage;
