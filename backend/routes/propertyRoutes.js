const express = require("express");
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const router = express.Router();

// Get all properties
router.get("/", getAllProperties);

// Get a property by ID
router.get("/:id", getPropertyById);

// Create a new property
router.post("/", createProperty);

// Update a property
router.put("/:id", updateProperty);

// Delete a property
router.delete("/:id", deleteProperty);

module.exports = router;
