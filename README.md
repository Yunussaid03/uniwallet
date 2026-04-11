# UniWallet — The One-Tap Kill Switch for Zombie Subscriptions

## Overview

UniWallet Lite is a mobile-first web app designed to be the financial command center for modern consumers. It empowers users to manage, track, and instantly cancel unwanted recurring subscriptions while allocating funds into categorized virtual debit cards.

This MVP is built around a clean, premium interface and a robust, lightweight architecture that foregrounds one-click financial control, subscription accountability, and persistence across sessions.

## Tech Stack

- HTML5
- CSS3 (Vanilla Grid / Flexbox)
- Vanilla JavaScript
- LocalStorage
- Chart.js

## Key Features

- Real-time subscription tracking and analytics
- Simulated "One-Tap Kill Switch" for cancelling recurring payments
- Virtual card fund allocation (SaaS, Entertainment, Utilities)
- Persistent state management using LocalStorage

## Development Roadmap

1. **UI Shell**
   - Build the dashboard layout, balance cards, quick actions, and virtual card tiles
   - Create a mobile-first experience with responsive card-based navigation

2. **State Management**
   - Implement subscription tracking and allocation logic
   - Model recurring payments, virtual card budgets, and transaction categories

3. **LocalStorage Integration**
   - Persist user settings, subscription state, and allocation balances across refreshes
   - Keep the app feel reliable and session-ready without a backend

4. **Data Visualization**
   - Add spending habit charts, trend lines, and allocation breakdowns
   - Surface actionable insights to help users cut waste and optimize budgets

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Yunussaid03/uniWallet.git
   ```
2. Open the project folder in your editor.
3. Launch the app in a browser using a local file server or built-in editor preview.
4. If using a static server:
   ```bash
   npx serve .
   ```

## Vision

UniWallet Lite is built to feel like a fintech control dashboard for a new era of subscription-first spending. It is designed to help users stop zombie subscriptions, route funds into purpose-driven cards, and make every monthly expense intentional.
