// components/ProductCard.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from '@/utils/formatCurrency';

const ProductCard = ({ product }) => {
  // Assuming you have a placeholder image for products without images
  const imageSrc = product.image || '/path/to/placeholder-image.png';
  
  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
      {/* <Image
        src={imageSrc}
        alt={product.name}
        width={200}
        height={200}
        className="object-cover mb-4"
      /> */}
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-600">
        <span className="line-through">{formatCurrency(product.price)}</span>
        <span className="text-red-500 ml-2">
          {formatCurrency((parseFloat(product.price) - parseFloat(product.discount)).toFixed(2))}
        </span>
      </p>
      <Link href={`/products/${product.id}`} className="text-blue-500 mt-2 inline-block">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
