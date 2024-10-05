// src/app/layout.js
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'NFC Card Website',
  description: 'NFC card management and information website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow"> {/* Adjust padding to match navbar height */}
          {children}
        </main>
        <Footer className="mt-auto" /> {/* Footer sticks to the bottom */}
      </body>
    </html>
  );
}
