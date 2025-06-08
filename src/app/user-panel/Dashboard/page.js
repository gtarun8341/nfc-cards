"use client"; // Next.js Client Component

const Dashboard = () => {
  // Dummy data
  const stats = {
    totalCards: 120,
    activeCards: 95,
    inactiveCards: 25,
  };

  const recentActivity = [
    { id: 1, action: "Created NFC Card", timestamp: "2024-10-01 10:30 AM" },
    { id: 2, action: "Updated NFC Card", timestamp: "2024-10-01 09:15 AM" },
    { id: 3, action: "Deleted NFC Card", timestamp: "2024-09-30 05:45 PM" },
  ];

  const nfcCards = [
    { id: 1, name: "Card A", status: "Active", dateCreated: "2024-09-15" },
    { id: 2, name: "Card B", status: "Inactive", dateCreated: "2024-08-10" },
    { id: 3, name: "Card C", status: "Active", dateCreated: "2024-07-20" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold">
              {key.replace(/([A-Z])/g, " $1")}
            </h2>
            <p className="text-4xl font-bold text-green-600">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <ul>
          {recentActivity.map(({ id, action, timestamp }) => (
            <li key={id} className="border-b last:border-0 py-2">
              <span className="font-semibold">{action}</span> -{" "}
              <span className="text-gray-500">{timestamp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* NFC Cards Table */}
      <h2 className="text-2xl font-bold mb-4">NFC Cards</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Created
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {nfcCards.map(({ id, name, status, dateCreated }) => (
              <tr key={id}>
                <td className="px-6 py-4 whitespace-nowrap">{name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dateCreated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
