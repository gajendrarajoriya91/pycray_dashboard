import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { getFinancials, deleteFinancial } from "../../services/api";

const FinancialTable = () => {
  const [financials, setFinancials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchFinancials();
  }, []);

  const fetchFinancials = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getFinancials();
      setFinancials(response.data);
    } catch (error) {
      console.error("Error fetching financials:", error);
      setError("Failed to fetch properties. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this finance?")) {
      try {
        await deleteFinancial(id);
        fetchFinancials(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting financial record:", error);
        setError("Failed to delete financial record. Please try again later.");
      }
    }
  };

  if (isLoading)
    return <div className="text-center py-4">Loading financial record...</div>;
  if (error)
    return <div className="text-center py-4 text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow mb-8">
      {/* ... (header remains the same) ... */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold">Financial Overview</h2>
          <p className="text-sm text-gray-500">
            Financial status for each property, summarizing income, expenses,
            and net profit.
          </p>
        </div>
        <div className="flex items-center">
          {/* <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle size={20} className="mr-2" /> Add new
          </button> */}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner Name
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property Name
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Units
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Filled Units
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vacant Units
              </th>

              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {financials.map((finance) => (
              <tr key={finance.id}>
                <td className="p-3 whitespace-nowrap">{finance.owner_name}</td>
                <td className="p-3 whitespace-nowrap">
                  {finance.property_name}
                </td>
                <td className="p-3 whitespace-nowrap">{finance.income}</td>
                <td className="p-3 whitespace-nowrap">{finance.expenses}</td>
                <td className="p-3 whitespace-nowrap">{finance.net_profit}</td>
                <td className="p-3 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(finance.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialTable;
