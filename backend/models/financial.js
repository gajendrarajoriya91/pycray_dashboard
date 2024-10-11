const pool = require("../config/db");

const getFinancialsByPropertyId = async (propertyId) => {
  const result = await pool.query(
    "SELECT * FROM financial_records WHERE property_id = $1",
    [propertyId]
  );
  return result.rows;
};

const createFinancialRecord = async (data) => {
  const result = await pool.query(
    `INSERT INTO financial_records (property_id, income, expenses, net_profit)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [data.property_id, data.income, data.expenses, data.net_profit]
  );
  return result.rows[0];
};

const getAllFinancials = async () => {
  const result = await pool.query(`
    SELECT 
      fr.id,
      fr.property_id,
      fr.income,
      fr.expenses,
      fr.net_profit,
      p.owner_name,
      p.property_name
    FROM 
      financial_records fr
    JOIN 
      properties p ON fr.property_id = p.id
  `);
  return result.rows;
};

const updateFinancial = async (id, data) => {
  const { income, expenses, net_profit } = data;
  const result = await pool.query(
    "UPDATE financial_records SET income = $1, expenses = $2, net_profit = $3 WHERE id = $4 RETURNING *",
    [income, expenses, net_profit, id]
  );
  return result.rows[0];
};

const deleteFinancial = async (id) => {
  const result = await pool.query(
    "DELETE FROM financial_records WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rowCount > 0;
};

module.exports = {
  getFinancialsByPropertyId,
  getAllFinancials,
  updateFinancial,
  deleteFinancial,
  createFinancialRecord,
};
