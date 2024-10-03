// src/app/our-products/page.js
import AllCards from '../components/AllCards'; // Import the AllCards component
import AllFooter from '../components/AllFooter'; // Import the AllFooter component

const productsData = [
    {
      id: 1,
      icon: 'https://via.placeholder.com/150',
      title: 'Product 1',
      description: '$10.00',
    },
    {
      id: 2,
      icon: 'https://via.placeholder.com/150',
      title: 'Product 2',
      description: '$15.00',
    },
    {
      id: 3,
      icon: 'https://via.placeholder.com/150',
      title: 'Product 3',
      description: '$20.00',
    },
    // Add more products as needed
];

export default function OurProductsPage() {
    return (
        <div>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p>Here is a list of our products:</p>
        <h2 className="text-3xl font-bold mb-4 text-center">More Products</h2>
        <AllCards cardsData={productsData} full={true} /> {/* Use full prop for full-width images */}
        
      </div>
      <AllFooter /> {/* Add the AllFooter component at the end */}

      </div>
    );
}
