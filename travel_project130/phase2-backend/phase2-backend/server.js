const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

const flightsRoutes = require("./routes/flights");
const accommodationsRoutes = require("./routes/accommodations");
const activitiesRoutes = require("./routes/activities");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Phase 2 Search API is running" });
});

app.use("/api/flights", flightsRoutes);
app.use("/api/accommodations", accommodationsRoutes);
app.use("/api/activities", activitiesRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs on http://localhost:${PORT}/api-docs`);
});