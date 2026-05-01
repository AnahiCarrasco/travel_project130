# Phase 2 API Documentation

## Base URL
`http://localhost:3000`

---

## Auth

### POST /api/auth/signup
Registers a new user under an existing tenant. The tenant must exist in the database before signup (identified by `tenantDomain`).

**Body:** `email`, `password`, `name`, `tenantDomain`
**Returns:** JWT token + user info
**Errors:** 400 if fields missing or unknown domain, 409 if email already registered

### POST /api/auth/login
Authenticates an existing user within their tenant and returns a JWT token used for all protected endpoints.

**Body:** `email`, `password`, `tenantDomain`
**Returns:** JWT token + user info
**Errors:** 400 if fields missing or unknown domain, 401 if credentials invalid

---

## Flights

### GET /api/flights/search
Searches available flights by destination and travel dates. Optionally filters by total budget.

**Query params:** `destination` (required), `departDate` (required), `returnDate` (required), `travelers` (required), `budget` (optional)
**Returns:** Array of matching flights with price per traveler
**Errors:** 400 if required fields missing or budget invalid

---

## Accommodations

### GET /api/accommodations/search
Searches available accommodations by destination and check-in/check-out dates. Optionally filters by budget.

**Query params:** `destination` (required), `checkIn` (required), `checkOut` (required), `guests` (required), `budget` (optional)
**Returns:** Array of matching accommodations with total price for the stay
**Errors:** 400 if required fields missing or budget invalid

---

## Activities

### GET /api/activities/search
Searches activities for a destination, with optional price filtering.

**Query params:** `destination` (required), `priceFilter` (optional: `free`, `under25`, `25to75`, `75plus`)
**Returns:** Array of activities with price label
**Errors:** 400 if destination missing or priceFilter value invalid

---

## Trips

### GET /api/trips/recommendations
Aggregates flights and accommodations into combined trip packages filtered by total budget. Returns combinations sorted cheapest first. Returns a message if no combinations fit the budget (AC 1.4).

**Query params:** `destination`, `departDate`, `returnDate`, `travelers`, `guests`, `budget` (all required, budget must be $1–$100,000)
**Returns:** Array of trip combinations with `flightCost`, `accommodationCost`, `combinedTotal`, `remainingBudget`
**Errors:** 400 if any field missing or budget out of range

---

## Tenants

### GET /api/tenants/:domain/branding
Returns the branding configuration for a tenant by domain. If the tenant has no logo or color configured, returns `null` for logoUrl and a default color (AC 4.3). Used by the frontend to apply per-tenant theme.

**Path param:** `domain` (e.g. `agency-a.com`)
**Returns:** `{ name, logoUrl, themeColor }`
**Errors:** 404 if domain not found

---

## Bookings (Protected — requires JWT)

All booking endpoints require an `Authorization: Bearer <token>` header. Tenant isolation is enforced on every request — users can only access bookings that belong to their own tenant (AC 4.2, TC-07).

### POST /api/bookings
Creates a new booking for the authenticated user. Calculates total cost from flight price + (nightly rate × nights).

**Body:** `flightId` (optional), `accommodationId` (optional), `startDate`, `endDate`
**Returns:** Created booking with status `Pending`
**Errors:** 400 if dates invalid or IDs not found, 401 if not authenticated

### GET /api/bookings
Returns all bookings belonging to the authenticated user within their tenant.

**Returns:** Array of bookings
**Errors:** 401 if not authenticated

### GET /api/bookings/:id
Returns a single booking by ID. Returns 404 if the booking belongs to a different tenant.

**Returns:** Booking object
**Errors:** 401 if not authenticated, 404 if not found or wrong tenant

### PATCH /api/bookings/:id/cancel
Cancels a booking by setting its status to `Cancelled`.

**Returns:** Updated booking
**Errors:** 401 if not authenticated, 404 if not found
