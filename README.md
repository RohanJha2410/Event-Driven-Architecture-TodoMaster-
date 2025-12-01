# 🧠 Event-Driven Architecture – TodoMaster

A production-style **event-driven** Todo application built with **Next.js (App Router)**, **TypeScript**, **Prisma**, and **Clerk authentication**.

Users can:

- Create and manage todos
- Add **up to 3 tasks for free**
- Unlock **unlimited tasks** by subscribing  
- Experience a clean, responsive UI with a scalable backend architecture

---

## 🚀 Features

- ✅ **Authentication with Clerk**
  - Secure sign-up, sign-in, and session handling
  - sign-in only after giving the verification code which will be sent to your email address.
- 📝 **Task Management**
  - Create, update, complete, and delete todos
- 🎯 **Free Tier Limit**
  - Non-subscribed users can only create **3 tasks**
- 💳 **Subscription-Gated Access**
  - Once the free limit is hit, users are prompted to **subscribe** to add more
- 🧩 **Event-Driven Architecture**
  - Core flows are modeled as **events** (e.g. `TASK_CREATED`, `TASK_LIMIT_REACHED`, `SUBSCRIPTION_UPDATED`)
  - Handlers react to these events to:
    - Enforce task limits
    - Update subscription status
    - Keep the system extensible
- 🗄️ **Prisma ORM + Relational Database**
  - Strongly-typed database access using Prisma models
- 🎨 **Modern UI**
  - Built with **TypeScript**, **CSS/Tailwind-style utility classes**, and reusable components
- 🧱 **Clean Project Structure**
  - `app` router, `components`, `lib`, `prisma`, and `types` organized for scalability

---

## 🧰 Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** Any Prisma-compatible relational DB (e.g. PostgreSQL)
- **Auth:** Clerk
- **Styling:** CSS + utility-first styling (with component configs via `components.json`)
- **Tooling:** ESLint, PostCSS, TypeScript

---

## 📁 Project Structure

```txt
Event-Driven-Architecture-TodoMaster-
├── app/                 # Next.js app router pages & API routes
│   ├── (auth)/          # Auth-related routes (sign in / sign up) [via Clerk]
│   ├── (dashboard)/     # Main todo dashboard for authenticated users
│   ├── api/             # API endpoints (tasks, subscription, webhooks, etc.)
│   └── layout.tsx       # Root layout
├── components/          # Reusable UI components (buttons, cards, forms, etc.)
├── lib/                 # Helpers (db, event bus, utilities)
├── prisma/              # Prisma schema & migrations
├── public/              # Static assets
├── types/               # Shared TypeScript types
├── components.json      # UI component configuration (e.g. shadcn)
├── proxy.ts             # Local dev proxy / tunneling config (e.g. for webhooks)
├── package.json
├── tsconfig.json
└── README.md
```
📌 Note: The exact folders inside app, components, lib, and types may evolve, but the idea is to keep UI, business logic, and infrastructure clearly separated.

🧱 Event-Driven Architecture Overview
TodoMaster is not just a simple CRUD app — it models important flows as events:

 Example Event Flows
1. Task Creation Flow
   1.User hits “Create Task”

   2.Backend creates a task in DB via Prisma

   3.Emits TASK_CREATED

   4.Event handler:

    -Increments user’s task count

   -Checks if free limit (3 tasks) is reached

    -If limit reached → emits TASK_LIMIT_REACHED

2. Task Limit Reached

  1.TASK_LIMIT_REACHED is emitted

  2.Handler:

   -Marks user as “at limit” in DB

   -UI can show a “Subscribe to add more tasks” CTA

3. Subscription Activation

   1.User subscribes (via payment flow)

   2.Webhook / API updates subscription in DB

   3.Emits SUBSCRIPTION_UPDATED

   4.Handler:

    -Lifts task limit for that user

    -UI now allows unlimited task creation

This kind of design makes it easy to add more reactions later — e.g. send emails, log analytics, or integrate notifications — without rewriting the core logic.

🛠️ Getting Started
1️⃣ Clone the repo
```
bash
git clone https://github.com/RohanJha2410/Event-Driven-Architecture-TodoMaster-.git
cd Event-Driven-Architecture-TodoMaster-
```
2️⃣ Install dependencies
```
bash

npm install
# or
pnpm install
# or
yarn install
```
3️⃣ Configure environment variables
Create a .env file in the root with values from your Clerk dashboard and database provider:
```
env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database (e.g. PostgreSQL / Neon / Supabase)
DATABASE_URL=your_database_connection_string

# Optional: webhook / subscription secrets
# WEBHOOK_SECRET=your_webhook_secret
(Adjust variable names to exactly match what you’re using in the code.)
```
4️⃣ Set up the database (Prisma)
bash
Copy code
npx prisma db push
# or, if you are using migrations:
# npx prisma migrate dev
To inspect your data in a UI:
```
bash
npx prisma studio
5️⃣ Run the development server
bash
Copy code
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open:
```
text
http://localhost:3000
```
🔐 Authentication (Clerk)
This project uses Clerk for authentication:

 - Only authenticated users can:

   -Access the main todo dashboard

   -Create/manage tasks

-Auth UI (Sign-in / Sign-up) is powered by Clerk components

Make sure your Clerk URLs & JWT templates match your local and deployed environments.

💳 Subscription & Limits
Free Users:

- Can create 3 tasks total

- After that, the app shows a Subscribe CTA

Subscribed Users:

- Can create unlimited tasks (logic enforced on the backend)

Payment integration (e.g. Razorpay / Stripe / Paytm / PhonePe) can be wired into:

- A /api/subscription endpoint

- A webhook endpoint to listen for successful payments

- Emitting SUBSCRIPTION_UPDATED events to update user status

🧪 Scripts
Common scripts (from package.json):
```
bash

npm run dev       # Start dev server
npm run build     # Create production build
npm run start     # Run production server
npm run lint      # Lint the project
```
(If you add more scripts like tests, migrations, or seeders, list them here.)

🧭 Roadmap / Ideas
Potential improvements you can add next:

- ✅ Integrate a real payment gateway (Stripe / Razorpay / etc.)

- 📊 Add analytics for events (e.g. number of tasks, upgrade conversion)

- 👥 Team workspaces / shared todo boards

- 🔔 Email / in-app notifications triggered by events

- 📱 Mobile-friendly enhancements and PWA support


