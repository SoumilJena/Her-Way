# HerWay — Verified, Community-First Safe Travel Ecosystem for Women

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwind-css&logoColor=white)
![Offline Ready](https://img.shields.io/badge/Architecture-Offline--First_Client-7A1C32)
![License](https://img.shields.io/badge/License-MIT-green)

**HerWay** is a women-only safe travel and community platform designed to make solo and group travel across India accessible, verified, and panic-proof. It bridges the gap between fragmented offline women-led tour operators, police-verified women-owned budget homestays, and zero-latency peer-to-peer emergency response.

---

## The Problem
* **Fragmented Supply:** Most women-only travel groups in India operate across unverified WhatsApp groups and social media pages with no structured background vetting or transparent booking flows.
* **The First-Timer Barrier:** Solo female travelers lack a high-trust network to discover vetted budget stays or reliable local female companions in unfamiliar cities.
* **High-Friction Emergencies:** Conventional safety apps require unlocking phones and navigating menus during acute panic—and fail when mobile data drops on highways or in hill stations.

---

## Core Architecture & Features

### 1. Two-Tier Onboarding & Layered Behavioural Trust
* **Invite-Only Fast Track:** Verified members can vouch for peers using an invite code (`HERWAY2026`) for immediate access.
* **Solo Traveler Onboarding:** First-time explorers verify through simulated DigiLocker ID/gender verification, live selfie liveness checks, and social profile linking.
* **First-Trip Probation Rule:** New users start as *New Explorers* and must complete verified group trips with positive peer ratings before unlocking *Local Guardian* privileges.
* **Mutual Blind Reviews & Social Vouching:** Two-way blind peer ratings and visible vouching chains tie real-world accountability to every interaction.

### 2. Zero-Manpower Automated SOS
* **Instant Trigger:** Accessible from every screen via the **SOS 112** pill or keyboard shortcut (`Shift + S`, simulating a 5x hardware power-button press).
* **4-Stage Automated Execution:**
  1. Bridges directly to **India's 112 (ERSS)** emergency helpline.
  2. Dispatches encrypted live GPS coordinates + **offline SMS fallback** to emergency contacts.
  3. Pings verified **HerWay Guardians** within a 3 km radius for immediate local check-in.
  4. Activates silent black-box audio/evidence recording with a live running timer.

### 3. Curated Women-Owned Marketplace & Local Guardians
* Real-time city and safety filtering across Indian destinations (*Jaipur, Rishikesh, Munnar, Gokarna, Shillong, Hampi*) for **Women-Owned Budget Stays**, **Women-Led Group Tours**, and **Police-Verified Hosts**.
* **Eye-Friendly Dual Theme:** Defaults to an Alabaster Cream (`#FAF8F6`) and Rich Maroon (`#7A1C32`) Light Mode with a low-glare Dark Mode toggle (`#141212` / `#C94A68`) for night transit.

---

## Interactive Demo Guide
The prototype runs **100% client-side** (using React state and `localStorage`) with zero external API keys or backend dependencies so every feature works instantaneously and offline:

* **Invite-Only Verification:** Open the **Profile** tab and enter `HERWAY2026` to unlock *Verified Explorer* status.
* **Solo Traveler Verification:** Enter any name, city, and social handle, then click **Run DigiLocker + Live Selfie Check** to preview the *New Explorer (Probation)* tier.
* **Role Switcher:** Use the 1-click **Presentation Mode Switcher** in the Profile tab to toggle between *Guest*, *New Explorer*, and *Verified Guardian* states.
* **Emergency SOS Simulation:** Click **SOS 112** in the top-right header (or press `Shift + S`) to preview the 3-second cancel countdown and live 4-stage emergency response overlay.

---

## Tech Stack
* **Frontend:** React, TypeScript / JavaScript, Tailwind CSS
* **Icons:** Lucide React
* **State & Persistence:** Client-side React Hooks + Browser `localStorage`

---

## Local Setup

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/herway.git](https://github.com/your-username/herway.git)

# 2. Navigate to the project directory
cd herway

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
