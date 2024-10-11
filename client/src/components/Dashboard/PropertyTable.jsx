import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { getProperties, deleteProperty } from "../../services/api";
import AddPropertyModal from "./AddPropertyModal";

const PropertyTable = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProperties();
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError("Failed to fetch properties. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(id);
        fetchProperties(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting property:", error);
        setError("Failed to delete property. Please try again later.");
      }
    }
  };

  if (isLoading)
    return <div className="text-center py-4">Loading properties...</div>;
  if (error)
    return <div className="text-center py-4 text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow mb-8">
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold">Property Occupancy Overview</h2>
          <p className="text-sm text-gray-500">Detailed occupancy breakdown</p>
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
                Occupancy Rate
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Maintenance Date
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="p-3 whitespace-nowrap">{property.owner_name}</td>
                <td className="p-3 whitespace-nowrap">
                  {property.property_name}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {property.total_units}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {property.filled_units}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {property.vacant_units}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {property.occupancy_rate}%
                </td>
                <td className="p-3 whitespace-nowrap">
                  {property.last_maintenance_date}
                </td>
                <td className="p-3 whitespace-nowrap">
                  <button className="text-blue-600 mr-2">
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
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
      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onPropertyAdded={fetchProperties}
      />
    </div>
  );
};

export default PropertyTable;
