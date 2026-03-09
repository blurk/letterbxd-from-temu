# Project Overview

## Purpose
Next.js dashboard application (ACME) with invoice and customer management features.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Database**: (configured via env)
- **Authentication**: Login form implemented

## Directory Structure
- `app/` - Next.js app directory
  - `dashboard/` - Main dashboard pages
  - `ui/` - React UI components
  - `lib/` - Utilities and helpers (formatCurrency, generatePagination, etc.)
  - `page.tsx` - Home page
  - `layout.tsx` - Root layout

## Code Conventions
- Arrow functions for exports and utilities
- TypeScript throughout
- Component structure: `export default function ComponentName() { ... }`
- Utilities as exported constants/functions in `app/lib/utils.ts`
