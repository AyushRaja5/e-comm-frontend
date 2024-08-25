"use client"; 
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductsPage from "./products/page";
import Footer from "@/components/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);

  // // Fetch products
  // useEffect(() => {
  //   async function fetchProducts() {
  //     try {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`); 
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Failed to fetch products", error);
  //     }
  //   }
  //   fetchProducts();
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <br/>
      <ProductsPage/>
      <br/>

      <Footer />
    </main>
  );
}
