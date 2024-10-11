const pool = require("../config/db");

const getAllProperties = async () => {
  const result = await pool.query("SELECT * FROM properties");
  return result.rows;
};

const getPropertyById = async (id) => {
  const result = await pool.query("SELECT * FROM properties WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

const createProperty = async (data) => {
  const result = await pool.query(
    "INSERT INTO properties (owner_name, property_name, total_units, filled_units, vacant_units, occupancy_rate, last_maintenance_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [
      data.owner_name,
      data.property_name,
      data.total_units,
      data.filled_units,
      data.vacant_units,
      data.occupancy_rate,
      data.last_maintenance_date,
    ]
  );
  return result.rows[0];
};

const updateProperty = async (id, data) => {
  const result = await pool.query(
    "UPDATE properties SET owner_name = $1, property_name = $2, total_units = $3, filled_units = $4, vacant_units = $5, occupancy_rate = $6, last_maintenance_date = $7 WHERE id = $8 RETURNING *",
    [
      data.owner_name,
      data.property_name,
      data.total_units,
      data.filled_units,
      data.vacant_units,
      data.occupancy_rate,
      data.last_maintenance_date,
      id,
    ]
  );
  return result.rows[0];
};

const deleteProperty = async (id) => {
  const result = await pool.query(
    "DELETE FROM properties WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rowCount > 0;
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
