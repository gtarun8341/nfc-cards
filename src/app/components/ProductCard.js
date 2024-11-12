"use client"; // Marking this as a Client Component
import { useState } from 'react'; // Import useState for state management

const ProductCard = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(0); // State to manage quantity

    const handleIncrease = () => {
        setQuantity(prev => {
            const newQuantity = prev + 1; // Increase quantity
            onAddToCart(product.id, newQuantity); // Update cart with new quantity
            return newQuantity; // Return new quantity
        });
    };

    const handleDecrease = () => {
        setQuantity(prev => {
            if (prev === 1) {
                onAddToCart(product.id, 0); // Remove from cart if quantity is 0
                return 0; // Reset quantity
            }
            const newQuantity = prev - 1; // Decrease quantity
            onAddToCart(product.id, newQuantity); // Update cart with new quantity
            return newQuantity; // Return new quantity
        });
    };

    const handleAdd = () => {
        const newQuantity = 1; // Set initial quantity to 1
        setQuantity(newQuantity); // Set state to new quantity
        onAddToCart(product.id, newQuantity); // Add to cart
    };

    return (
        <div className="border rounded-lg p-4 shadow-lg">
            <img
                src={product.icon}
                alt={product.title}
                className="mx-auto mb-4 w-full h-32 object-cover" // Full-width image
            />
            <h3 className="text-xl font-semibold text-center mb-2">{product.title}</h3>
            <p className="text-gray-600 text-center mb-2">{product.description}</p>
            <p className="text-lg font-bold text-center mb-2">{`Price: ${product.price}`}</p>
            {product.discount && (
                <p className="text-red-600 font-bold text-center">{`Discount: ${product.discount}`}</p> // Display discount if it exists
            )}
            
            {quantity > 0 ? (
                <div className="flex items-center justify-center mt-4">
                    <button onClick={handleDecrease} className="bg-gray-300 text-black py-1 px-2 rounded">-</button>
                    <span className="mx-4">{quantity}</span>
                    <button onClick={handleIncrease} className="bg-gray-300 text-black py-1 px-2 rounded">+</button>
                </div>
            ) : (
                <button onClick={handleAdd} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full">Add</button> // Button to add product
            )}
        </div>
    );
};

export default ProductCard;
