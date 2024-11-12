// pages/contact-developer.js

import { useEffect, useState } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const ContactDeveloperPage = () => {
  const [complaints, setComplaints] = useState([]);

  // Function to fetch complaints from the server
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };

      const response = await api.get('/api/contact-developer', config); // Fetch complaints
      setComplaints(response.data); // Set the fetched complaints
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  // Fetch complaints when the component mounts
  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Contact Developer</h2>

      <ul className="mt-5">
        {complaints.map((complaint) => (
          <li key={complaint._id} className="py-2 border-b">
            <div className="flex justify-between">
              <div>
                <strong>{complaint.about}-{complaint.complaint}</strong> {/* Display the complaint */}
                <p className="text-sm text-gray-600">
                  Submitted by: {complaint.userId.name} ({complaint.userId.email}) {/* Display user name and email */}
                </p>
              </div>
              {/* You can include delete button if needed */}
              {/* <button
                onClick={() => deleteComplaint(complaint._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactDeveloperPage;
