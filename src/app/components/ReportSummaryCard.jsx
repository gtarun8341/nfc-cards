export default function ReportSummaryCard({
  title,
  label,
  value,
  color = "text-green-600",
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
      <h2 className="text-gray-600 font-semibold">{title}</h2>
      {label && <p className="text-gray-800 font-medium mt-1">{label}</p>}
      <p className={`text-lg font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}
