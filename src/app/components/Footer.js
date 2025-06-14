"use client";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#EECCCC80] text-black p-4 ">
      <div className="container mx-auto text-center">
        <p>
          &copy; {currentYear} Shiven NFC Cards, all rights reserved Designed
          and Developed by Shiven Enterprises
        </p>
      </div>
    </footer>
  );
};

export default Footer;
