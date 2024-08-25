"use client";
import Image from 'next/image';
import { formatCurrency } from '@/utils/formatCurrency'; // Utility function for formatting currency

const CartItem = ({ item }) => {
  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-300">
      <div className="w-24 h-24 flex-shrink-0 relative">
        <Image
          src={item.image} // Assuming item has an image field
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">Price: {formatCurrency(item.price)}</p>
        <p className="text-gray-600">Quantity: {item.quantity}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">{formatCurrency(item.price * item.quantity)}</p>
      </div>
    </div>
  );
};

export default CartItem;
