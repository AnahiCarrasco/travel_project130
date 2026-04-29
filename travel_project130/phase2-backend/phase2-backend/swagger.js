module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Phase 2 Search API",
    version: "1.0.0",
    description: "Search APIs for flights, accommodations, and activities",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    "/api/flights/search": {
      get: {
        summary: "Search flights",
        parameters: [
          { name: "destination", in: "query", required: true, schema: { type: "string" } },
          { name: "departDate", in: "query", required: true, schema: { type: "string", format: "date" } },
          { name: "returnDate", in: "query", required: true, schema: { type: "string", format: "date" } },
          { name: "travelers", in: "query", required: true, schema: { type: "integer" } },
          { name: "budget", in: "query", required: false, schema: { type: "number" } }
        ],
        responses: {
          200: { description: "Flights found" },
          400: { description: "Invalid request" },
          500: { description: "Server error" }
        }
      }
    },
    "/api/accommodations/search": {
      get: {
        summary: "Search accommodations",
        parameters: [
          { name: "destination", in: "query", required: true, schema: { type: "string" } },
          { name: "checkIn", in: "query", required: true, schema: { type: "string", format: "date" } },
          { name: "checkOut", in: "query", required: true, schema: { type: "string", format: "date" } },
          { name: "guests", in: "query", required: true, schema: { type: "integer" } },
          { name: "budget", in: "query", required: false, schema: { type: "number" } }
        ],
        responses: {
          200: { description: "Accommodations found" },
          400: { description: "Invalid request" },
          500: { description: "Server error" }
        }
      }
    },
    "/api/activities/search": {
      get: {
        summary: "Search activities",
        parameters: [
          { name: "destination", in: "query", required: true, schema: { type: "string" } },
          {
            name: "priceFilter",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["free", "under25", "25to75", "75plus"]
            }
          }
        ],
        responses: {
          200: { description: "Activities found" },
          400: { description: "Invalid request" },
          500: { description: "Server error" }
        }
      }
    }
  }
};