// src/app/components/AllFooter.js
const AllFooter = () => {
    return (
        <footer className="bg-gray-800 text-white p-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Column 1 */}
                <div>
                    <h5 className="font-bold">Shiven</h5>
                    <p>Company Details</p>
                </div>
                {/* Column 2 */}
                <div>
                    <h5 className="font-bold">Products</h5>
                    <ul>
                        <li>Our Products</li>
                        <li>NFC Cards</li>
                        <li>PDF Cards</li>
                        <li>Physical Visiting Cards</li>
                    </ul>
                </div>
                {/* Column 3 */}
                <div>
                    <h5 className="font-bold">Company</h5>
                    <ul>
                        <li>About Us</li>
                        <li>Our Services</li>
                    </ul>
                </div>
                {/* Column 4 */}
                <div>
                    <h5 className="font-bold">Resources</h5>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                {/* Column 5 */}
                <div>
                    <h5 className="font-bold">Support</h5>
                    <ul>
                        <li>Payment and Refund Policy</li>
                        <li>Privacy Policy</li>
                        <li>Terms and Conditions</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default AllFooter;
