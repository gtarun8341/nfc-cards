"use client"; // Marking this as a Client Component

const Benefits = ({ benefitsData }) => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefitsData.map((benefit) => (
          <div key={benefit.id} className="border rounded-lg p-4 shadow-lg">
            <h3 className="text-xl font-semibold text-center mb-2">{benefit.title}</h3>
            <p className="text-center text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
