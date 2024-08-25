"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import ProductCard from '@/components/ProductCard';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const suggestedKeywords = ["electronics", "fashion", "clothes"];

  useEffect(() => {
    const fetchProducts = async () => {
      if (query) {
        try {
          console.log(`Fetching products for query: ${query}`); // Debugging
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/searching?query=${encodeURIComponent(query)}`);
          if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
          }
          const data = await res.json();
          console.log("Fetched products:", data); // Debugging
          setProducts(data);
        } catch (error) {
          console.error('Failed to fetch products:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No query provided, setting loading to false.'); // Debugging
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
    <main className="container mx-auto my-8 p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for &quot;{query}&quot;</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div>
            <p>No products found for &quot;{query}&quot;.</p>
            <p className="mt-4">Try searching with these keywords:</p>
            <ul className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
              {suggestedKeywords.map((keyword, index) => (
                <li key={index} className="mb-2">
                  <a
                    href={`/search?query=${encodeURIComponent(keyword)}`}
                    className="block text-lg text-blue-600 font-medium py-2 px-4 rounded-md bg-white hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 ease-in-out"
                  >
                    {keyword}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
    </Suspense>
  );
};

export default SearchPage;
