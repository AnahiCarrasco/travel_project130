module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Phase 2 Search API",
    version: "1.0.0",
    description: "Search APIs for flights, accommodations, activities, and budget-based trip recommendations",
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
    },

    "/api/trips/recommendations": {
      get: {
        summary: "Get budget-based trip recommendations",
        description:
          "Combines available flight and accommodation options, calculates total trip cost, and returns only combinations within the user's budget.",
        parameters: [
          {
            name: "destination",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "LON"
          },
          {
            name: "departDate",
            in: "query",
            required: true,
            schema: { type: "string", format: "date" },
            example: "2026-06-10"
          },
          {
            name: "returnDate",
            in: "query",
            required: true,
            schema: { type: "string", format: "date" },
            example: "2026-06-17"
          },
          {
            name: "travelers",
            in: "query",
            required: true,
            schema: { type: "integer" },
            example: 1
          },
          {
            name: "guests",
            in: "query",
            required: true,
            schema: { type: "integer" },
            example: 1
          },
          {
            name: "budget",
            in: "query",
            required: true,
            schema: { type: "number" },
            example: 1500
          }
        ],
        responses: {
          200: {
            description: "Trip recommendations found or no trips found within budget"
          },
          400: {
            description: "Invalid request parameters"
          },
          500: {
            description: "Server error"
          }
        }
      }
    }
  }
};