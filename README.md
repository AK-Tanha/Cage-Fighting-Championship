# Cage Fighting Championship (CFC)

A modern, high-performance web application for the global leader in elite MMA competition. Built with Next.js, this platform provides features for fans to view events and fighter profiles, and includes a secure admin panel for staff to manage the site.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching:** [Axios](https://axios-http.com/)
- **Icons:** FontAwesome

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the main site.

### Authentication

The site includes a secure staff administration portal located at `/admin`.
To access this dashboard during development, use the following default credentials:

- **Email:** `admin@cfc.com`
- **Password:** `admin123`

## 📁 Project Structure

```
├── package.json
├── src/
│   ├── app/                  # Next.js App Router root
│   │   ├── admin/            # Secure admin dashboard routes
│   │   ├── api/              # API routes (Auth, Proxy)
│   │   ├── events/           # Public event pages
│   │   └── fighters/         # Public fighter profiles
│   ├── components/           # Reusable React components
│   │   ├── admin/            # Admin-specific components (Sidebar, Topbar)
│   │   └── ...               # Public UI components (Navbar, Footer, Event Cards)
│   └── lib/                  # Utilities and API configurations
└── tailwind.config.ts        # Tailwind configuration and theme
```

## 🎨 Design System

The application utilizes a bold, aggressive design system fitting for a premier MMA organization:

- **Primary Colors:** Black (`#000000`), White (`#FFFFFF`), and CFC Red (`#FE0002`)
- **Typography:**
  - Primary/Display headers: `Montserrat`
  - Body/Sans text: `Rubik`
- **Aesthetic focus:** Sharp edges, heavy uppercase usage, clean borders, and high contrast.

## 📝 Key Features

- **Public Site**
  - Fighter Rankings & detailed Profile pages
  - Live Event Schedules & Fight Cards
  - Fully responsive, modern frontend UI
  - Optimized SEO with pre-configured Metadata, robots.txt, and sitemap.ts

- **Admin Portal**
  - Secured via HTTP-Only cookies inside Next.js Server Components
  - Metrics Dashboard overview
  - Fighter Roster Management interface
  - Event Scheduling Interface
  - Settings and Site Configurations

## 🔧 Scripts

- `npm run dev`: Starts the local Next.js development server
- `npm run build`: Builds the production-ready application
- `npm run start`: Runs the production server
- `npm run lint`: Runs ESLint for code formatting and standard checking
