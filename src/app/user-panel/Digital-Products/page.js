"use client"; // Next.js Client Component

import React from 'react';

const DigitalProductsPage = () => {
  // Sample data for digital products
  const digitalProducts = [
    { id: 1, title: 'Physical Card' },
    { id: 2, title: 'NFC Card' },
    { id: 3, title: 'PDF Digital Visiting Card' },
    { id: 4, title: 'Mini Website' },
  ];

  const handleView = (product) => {
    console.log(`View ${product.title}`);
    // Implement your view logic here
  };

  const handleEdit = (product) => {
    console.log(`Edit ${product.title}`);
    // Implement your edit logic here
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {digitalProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg p-4 transition-transform duration-300 hover:scale-105"
        >
          <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
          <div className="flex justify-between">
            <button
              onClick={() => handleView(product)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              View
            </button>
            <button
              onClick={() => handleEdit(product)}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DigitalProductsPage;
