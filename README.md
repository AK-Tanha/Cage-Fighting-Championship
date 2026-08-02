<div align="center">

# Cage Fighting Championship (CFC)

A full-stack web platform for an elite MMA organization — pairing a **Next.js** fan-facing site with a **FastAPI** admin backend.

**TypeScript · Next.js · React · Tailwind CSS · Python · FastAPI · MongoDB**

</div>

---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Scripts](#scripts)

---

## About

**Cage Fighting Championship (CFC)** is a production-quality web application for a global leader in MMA competition. It's split into two sides:

- A **modern, responsive public site** where fight fans browse ranked fighters, upcoming events, and full fight cards.
- A **secure admin panel** where staff manage fighters, events, and site content through a role-protected dashboard.

The product is built with a bold, aggressive visual language — fitting for a premier cage-fighting brand — and is optimized for performance and SEO.

---

## Tech Stack

| Layer            | Technology                                        |
| ---------------- | ------------------------------------------------- |
| Frontend         | Next.js (App Router) · React · TypeScript         |
| Styling          | Tailwind CSS                                      |
| Data Fetching    | Axios + TanStack Query                            |
| Tables           | TanStack Table                                    |
| Icons            | Lucide React                                      |
| Backend          | FastAPI (Python)                                  |
| Database         | MongoDB (Motor, async)                            |
| Auth             | JWT (HTTP-Only cookies)                           |

---

## Key Features

### Public Site

- **Fighter rankings & detailed profile pages** — data-driven fighter cards.
- **Event schedules & fight cards** — upcoming bouts and full matchups in one place.
- **Fully responsive, modern UI** built on a hand-crafted design system.
- **SEO-ready** — pre-configured Metadata API, `robots.txt`, `sitemap.ts`, and dynamic Open Graph images for social sharing.

### Admin Panel

- **Secure staff portal** at `/admin`; protected with HTTP-Only cookies inside Next.js Server Components.
- **Metrics dashboard** — at-a-glance key numbers for the organization.
- **Fighter & referee roster management** — add and manage talent.
- **Event scheduling & fight card builder**.
- **Flexible site settings & content config** (hero slides, uploads, and more).

---

## Getting Started

### Prerequisites

- Node.js 18.17+ (LTS recommended)

### Run locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> The app expects the CFC backend running on `http://localhost:8000`. See the [backend README](../cfc-backend/readme.md) for setup.

### Admin access (development)

The secure staff portal lives at `/admin`. To try it during development:

- **Email:** `admin@cfc.com`
- **Password:** `admin123`

---

## Project Structure

```
Cage-Fighting-Championship/
├── package.json
├── src/
│   ├── app/                  # Next.js App Router root
│   │   ├── admin/            # Secure admin dashboard routes
│   │   ├── api/              # API routes (auth proxy, image proxy)
│   │   ├── events/           # Public event pages
│   │   ├── fighters/         # Public fighter profile pages
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage
│   │   ├── robots.ts         # SEO robots config
│   │   └── sitemap.ts        # SEO sitemap
│   ├── components/           # Reusable React components
│   │   ├── admin/            # Admin components (Sidebar, Topbar, Tables)
│   │   └── ...               # Public UI (Navbar, Footer, Event/Fighter Cards)
│   └── lib/                  # Utilities & API configuration
└── tailwind.config.ts        # Tailwind configuration and theme
```

---

## Design System

The interface uses a **bold, aggressive aesthetic** that matches the brand:

- **Primary palette:** Black `#000000`, White `#FFFFFF`, CFC Red `#FE0002`
- **Typography:** `Montserrat` for display/headers, `Rubik` for body text
- **Aesthetic:** sharp edges, heavy uppercase, clean borders, high contrast

---

## Scripts

| Command         | Description                            |
| --------------- | -------------------------------------- |
| `npm run dev`   | Start the Next.js dev server (webpack) |
| `npm run build` | Build the app for production           |
| `npm run start` | Run the production server              |
| `npm run lint`  | Run ESLint                             |

---

**Built with TypeScript, Next.js, and a passion for clean, scalable front-end architecture.**
