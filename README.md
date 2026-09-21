# BrewCraft

BrewCraft is a premium coffee e-commerce storefront built with Next.js, TypeScript, Tailwind, Prisma, and Stripe-ready architecture. The app follows the warm editorial vibe of the original reference while turning it into a shoppable storefront with real product pages, cart, checkout flow, and account/admin structure.

## Stack
- Next.js 15 App Router
- TypeScript + Tailwind CSS
- Framer Motion
- Prisma + PostgreSQL
- NextAuth.js
- Stripe-ready checkout flow
- Zustand cart state
- Zod validation
- Resend-ready transactional email setup

## Features
- Premium landing page and product catalog
- Product detail pages and filtering
- Cart persistence with Zustand
- Checkout and order confirmation pages
- Account, login, register, and password reset flows
- Admin dashboard concept for inventory and revenue summary
- SEO metadata, sitemap, and robots configuration
- Prisma schema and seed file for product catalog data

## Quick start

1. Install dependencies:
   npm install

2. Copy the environment file:
   cp .env.example .env.local

3. Update the database and auth credentials in `.env.local`.

4. Generate the Prisma client and apply the schema:
   npx prisma generate
   npx prisma db push
   npx prisma db seed

5. Start the app:
   npm run dev

## Environment variables

See `.env.example` for the full list of required variables.

## Notes

This app is designed as a production-ready foundation for a coffee store. Stripe and Auth.js are wired for a real implementation but require valid credentials to enable live payments and OAuth.
