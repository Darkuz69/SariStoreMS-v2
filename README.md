# 🏪 SariStoreMS

**Welcome to SariStoreMS (v2)!**

A full-stack **Point-of-Sale & Management System** built specifically for Filipino sari-sari stores.
What started as a humble command-line project back in my first year (Part 1🤷‍♂️) college has now grown into a modern web application.

---

## 🔄 About v2

This isn’t a huge leap from **v1**—think of it as a **refined version** rather than a complete overhaul.

* The core idea remains the same.
* The difference lies in **style, structure, and principles**: cleaner code, better organization, and a more maintainable foundation.
* Essentially, v2 is about doing things “the right way” while still keeping it fun and practical.

So, while it may look familiar, under the hood it’s a step closer to being production-ready.

---

## 🎯 Core Features

* **POS System** – Faster, accurate transactions (goodbye mental math errors!)
* **Inventory Management** – Monitor stocks, get alerts for low inventory
* **Credit Management (Utang System)** – Track who owes what, with proper digital records
* **Reports & Analytics** – Insights on bestsellers, daily income, and store performance

---

## 💻 Tech Stack (STEP'N)

An acronym so stupid, but it's what I am using so... 😅

* **S**velte + TypeScript → Frontend (the looks)
* **T**ypeScript → For type safety (and maybe, fewer headaches)
* **E**xpress.js → Backend API (the logic)
* **P**ostgreSQL → Database (the vault)
* **'N**ode.js → Runtime (the engine)

*"Just STEPP’N through full-stack development!"* 🕺

> ⚠️ Currently **desktop-only** (best for store counters). Mobile support is in the roadmap.

---

## 🚀 Motivation

Why build this?

As a Filipino developer, I’ve seen sari-sari stores struggle with the same issues for decades:

* Piling notebooks for utang
* Guessing if there’s enough stock left
* No proper way to track daily sales

I wanted to create a system that not only solves these problems but also empowers small neighborhood businesses and make modern technology accesible to our fellow countrymen. 🇵🇭
Plus, it’s the perfect playground for learning full-stack development—practical and impactful.

---

## 🛠 Getting Started

### Requirements

* **Node.js** (v18+)
* **PostgreSQL**
* Terminal basics

### Installation

```bash
# Clone this repo
git clone https://github.com/Darkuz69/SariStoreMS.git
cd SariStoreMS

# Install dependencies (all-in-one)
npm run install:all

# Or install separately
npm run install:server
npm run install:client

# Setup environment
cd server
cp .env.example .env.development
cp .env.example .env.production
# Fill in your PostgreSQL credentials

# Initialize database and admin account (Please run this once, only!)
npm run init:server --setAdmin

# Run both frontend + backend
npm run dev
```

### 🎮 Commands

```bash
npm run dev                     # Start everything
npm run dev:server              # Backend only (API focus)
npm run dev:client              # Frontend only (UI focus)
npm run init:server             # Setup database schema
npm run init:server --setAdmin  # Setup database schema + admin account (Must be run once)
npm run install:all             # Install all dependencies
npm run install:server          # Install server dependecies
npm run install:client          # Install client dependecies
```

---

## 📂 Project Structure

```
SariStoreMS/
├── client/           # Svelte frontend
├── server/           # Express backend
├── docs/             # Documentation
└── README.md         # You are here
```

---

## 🛣 Roadmap

✅ **Phase 1 – Foundations (Done)**

* [x] Project setup (server + client structure)
* [x] Database initialization & migrations
* [x] Core models (Products, Users, Transactions, Utang, etc.)

🛠 **Phase 2 – Backend Core (In Progress)**

* [X] Authentication & Authorization (sessions, roles, permissions)
* [X] Middleware for validation, error handling, and logging
* [ ] API endpoints for POS, inventory, credit, and reports
* [ ] **Commenting & documenting backend code for clarity** ✍️

🎨 **Phase 3 – Frontend Development (Learning + Building)**

* [ ] Deep dive into Svelte & SvelteKit basics
* [ ] Core UI pages (Login, Dashboard, POS screen)
* [ ] Inventory management UI
* [ ] Utang tracking & customer records UI
* [ ] Reports dashboard (charts, tables, insights)
* [ ] **Add clear comments in Svelte components**

📦 **Phase 4 – Integration & Features**

* [ ] Connect frontend with backend APIs
* [ ] Real-time updates for transactions & inventory
* [ ] Receipt printing support
* [ ] Multi-store capability

📱 **Phase 5 – Expansion (Future Plans)**

* [ ] Mobile app (companion app for owners)
* [ ] Digital payments (GCash/QR code support)
* [ ] E-load & prepaid services integration
* [ ] Cloud sync / deployment for multiple branches

---

**Made with ❤️, ☕, and Filipino ingenuity.**
*AI provided some extra brainpower—like a second pair of eyes that never sleeps.* 🤖✨

---
