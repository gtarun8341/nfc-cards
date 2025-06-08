"use client";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4 border-t border-gray-700">
      <div className="container mx-auto text-center">
        <p>
          &copy; {currentYear} Designed and Developed by Shiven Enterprises.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
