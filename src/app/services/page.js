// src/pages/services.js
"use client"; // Next.js Client Component

export default function Services() {
    return (
      <section className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Our Services</h1>
        <ul>
          <li>Service 1: NFC card issuance</li>
          <li>Service 2: Card data management</li>
          <li>Service 3: Security audits for NFC transactions</li>
        </ul>
      </section>
    );
  }
  