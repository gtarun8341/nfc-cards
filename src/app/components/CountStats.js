"use client";

const CountStats = ({ stats }) => {
  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((item, index) => (
          <div key={index}>
            <p className="text-3xl md:text-4xl font-bold text-black">
              {item.count}
            </p>
            <p className="text-gray-600 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountStats;
