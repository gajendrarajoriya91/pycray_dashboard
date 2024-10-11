import React from "react";

const OverviewCard = ({ title, value, color }) => {
  return (
    <div className={`p-4 rounded-lg ${color}`}>
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-500">Lorem ipsum</p>
    </div>
  );
};

export default OverviewCard;
