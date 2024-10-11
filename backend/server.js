// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const propertyRoutes = require("./routes/propertyRoutes");
const financialRoutes = require("./routes/financialRoutes");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your client's domain
    methods: "GET, POST, PUT, DELETE",
  })
);

app.use(bodyParser.json());

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/financials", financialRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
