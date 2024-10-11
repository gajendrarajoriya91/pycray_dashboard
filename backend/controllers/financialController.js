const Financial = require("../models/financial");

const getFinancialsByPropertyId = async (req, res) => {
  const { id } = req.params;
  try {
    const financialRecords = await Financial.getFinancialsByPropertyId(id);
    res.json(financialRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

const getAllFinancials = async (req, res) => {
  try {
    const financialRecords = await Financial.getAllFinancials();
    res.json(financialRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

const updateFinancial = async (req, res) => {
  const { id } = req.params;
  const { income, expenses, net_profit } = req.body;

  try {
    const updatedRecord = await Financial.updateFinancial(id, {
      income,
      expenses,
      net_profit,
    });

    if (updatedRecord) {
      res.json(updatedRecord);
    } else {
      res.status(404).json({ error: "Financial record not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

const deleteFinancial = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecord = await Financial.deleteFinancial(id);

    if (deletedRecord) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Financial record not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = {
  getFinancialsByPropertyId,
  getAllFinancials,
  updateFinancial,
  deleteFinancial,
};
