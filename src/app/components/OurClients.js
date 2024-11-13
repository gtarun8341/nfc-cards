// src/app/components/OurClients.js
"use client"; // Next.js Client Component
import Image from 'next/image';

const OurClients = ({ clients }) => {
    return (
        <section className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-4">Our Clients</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {clients.map((client, index) => (
                    <div className="flex items-center" key={index}>
                        <Image src={client.icon} alt={client.name} className="w-16 h-16 mr-2" /> {/* Decreased icon size */}
                        <span className="text-center">{client.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurClients;
