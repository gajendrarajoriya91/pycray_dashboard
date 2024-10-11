import React, { useState } from "react";
import { createProperty } from "../../services/api";

const AddPropertyModal = ({ isOpen, onClose, onPropertyAdded }) => {
  const [propertyData, setPropertyData] = useState({
    ownerName: "",
    propertyName: "",
    totalUnits: 0,
    filledUnits: 0,
    vacantUnits: 0,
    lastMaintenanceDate: "",
  });

  const handleChange = (e) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProperty(propertyData);
      onPropertyAdded();
      onClose();
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add New Property</h2>
        <form onSubmit={handleSubmit}>
          {/* Add form fields here */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;
