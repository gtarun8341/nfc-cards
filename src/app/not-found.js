// src/app/not-found.js

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <Image
        src="/images/404.jpg" // Make sure this image is in your public folder
        alt="404 Not Found"
        width={400}
        height={300}
        className="mb-6"
      />
      <h1 className="text-4xl font-bold mb-2 text-gray-800">Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or may have
        been moved.
      </p>
      <Link href="/">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
