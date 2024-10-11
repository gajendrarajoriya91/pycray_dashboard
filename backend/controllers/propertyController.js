const Property = require("../models/property");
const { convertUTCToIST } = require("../utils/dateUtils");
const Financial = require("../models/financial");

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.getAllProperties();

    const propertiesWithISTDates = properties.map((property) => {
      return {
        ...property,
        last_maintenance_date: convertUTCToIST(property.last_maintenance_date),
      };
    });

    res.json(propertiesWithISTDates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.getPropertyById(id);
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

const createProperty = async (req, res) => {
  const propertyData = req.body;

  try {
    const newProperty = await Property.createProperty(propertyData);

    const income = calculateIncome(propertyData);
    const expenses = calculateExpenses(propertyData);
    const netProfit = income - expenses;

    await Financial.createFinancialRecord({
      property_id: newProperty.id,
      income,
      expenses,
      net_profit: netProfit,
    });

    res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

const calculateIncome = (propertyData) => {
  // Example: Assume total potential income is $1,200 per filled unit per year
  const totalPotentialIncome = propertyData.total_units * 1200;
  return (propertyData.occupancy_rate / 100) * totalPotentialIncome;
};

const calculateExpenses = (propertyData) => {
  // Example: Assume fixed expenses are $2,000 plus $100 per unit
  const fixedExpenses = 2000;
  const variableExpenses = propertyData.total_units * 100;
  return fixedExpenses + variableExpenses;
};

const updateProperty = async (req, res) => {
  const { id } = req.params;
  const propertyData = req.body;

  try {
    const updatedProperty = await Property.updateProperty(id, propertyData);
    if (updatedProperty) {
      res.json(updatedProperty);
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Property.deleteProperty(id);
    if (deleted) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
