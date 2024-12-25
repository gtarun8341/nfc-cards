"use client"; // Next.js Client Component

import React, { useEffect, useState } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const EnquiriesPage = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State to store search term

    useEffect(() => {
        const fetchEnquiries = async () => {
            const token = localStorage.getItem('authToken');

            try {
                const response = await api.get('/api/enquiry/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the request header
                    },
                });
                setEnquiries(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, []);

    // Filter enquiries based on search term
    const filteredEnquiries = enquiries.filter(enquiry => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return (
            enquiry.name.toLowerCase().includes(lowercasedSearchTerm) ||
            enquiry.email.toLowerCase().includes(lowercasedSearchTerm) ||
            enquiry.phone.toLowerCase().includes(lowercasedSearchTerm)
        );
    });

    if (loading) {
        return <p className="text-center text-lg">Loading enquiries...</p>;
    }

    if (error) {
        return <p className="text-center text-lg text-red-500">Error: {error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Enquiries</h1>
            
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Name, Email, or Phone"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold">Name</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold">Email</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold">Phone</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEnquiries.map((enquiry) => (
                            <tr key={enquiry._id} className="hover:bg-gray-100 transition duration-150">
                                <td className="border-t py-2 px-4">{enquiry.name}</td>
                                <td className="border-t py-2 px-4">{enquiry.email}</td>
                                <td className="border-t py-2 px-4">{enquiry.phone}</td>
                                <td className="border-t py-2 px-4">{enquiry.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnquiriesPage;
