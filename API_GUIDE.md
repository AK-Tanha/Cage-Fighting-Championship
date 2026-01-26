# API Fetching & Proxy Documentation

This project uses a **Next.js API Route Proxy** to connect to the backend. This approach solves the `AxiosError: Network Error` (CORS) by moving the connection from the browser to the server.

## 1. How the Proxy Works

Instead of calling the backend directly, the frontend calls an internal route:

- **Frontend Calls**: `/api/proxy/fighters/`
- **Next.js Proxy Fetches**: `https://cfc-backend-ten.vercel.app/fighters/`

This bypasses browser CORS security because server-to-server communication is not restricted.

## 2. Global API Client (`src/lib/api.ts`)

Always use the centralized `api` instance for calls.

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: "/api/proxy", // Pointing to local proxy
});
```

## 3. Implementation Patterns

### Fetching Data (Read)

**In `api.ts`:**

```typescript
export const getAllFighters = async () => {
  const response = await api.get("/fighters/");
  return response.data;
};
```

### Creating Data (Create)

1. Create a proxy route: `src/app/api/proxy/fighters/route.ts`
2. Add a `POST` method to the route:

```typescript
export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch("BACKEND_URL/fighters/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json());
}
```

3. Use in `api.ts`:

```typescript
export const createFighter = async (data: any) => {
  const response = await api.post("/fighters/", data);
  return response.data;
};
```

### Updating Data (Update)

1. Add `PUT` or `PATCH` to the proxy route.
2. The proxy handles the URL with ID: `BACKEND_URL/fighters/${id}`.
3. Use in `api.ts`:

```typescript
export const updateFighter = async (id: string, data: any) => {
  const response = await api.put(`/fighters/${id}/`, data);
  return response.data;
};
```

---

## 4. Why Use trailing Slashes?

The FastAPI backend is strict. Always ensure your endpoints end with a `/` (e.g., `/fighters/` not `/fighters`) to avoid 405 Method Not Allowed errors.
