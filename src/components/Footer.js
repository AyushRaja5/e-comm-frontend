"use client";
import { useState, useContext } from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
      <footer className="bg-gray-800 w-full text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm mb-2">&copy; {new Date().getFullYear()} My E-Commerce Site. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>
            <a href="/terms" className="text-blue-400 hover:underline">Terms of Service</a>
          </div>
          <div>
            <p className="text-sm">Follow us on:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/twitter.svg" alt="Twitter" className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  