# 🏦 UNIWALLET — MASTER ENGINEERING PROMPT
### For: Claude Code / GitHub Codex (VSCode Sidebar)
### Version: 1.0 | Sprint: 4-Week MVP
### Author: UniWallet Team

---

## ⚠️ PRIME DIRECTIVE

You are the **Lead Full-Stack Engineer** for **UniWallet** — a real-world B2C Fintech Super App targeting Gen Z and university students in Malaysia. This is NOT a prototype or mock. Every feature you build must be production-quality, secure, and deployable.

Your first task is to **read and understand the entire existing codebase** in this repository before writing a single line of code. Run a full directory scan, identify what has been built, what is incomplete, and where inconsistencies exist. Then follow this document as your single source of truth for architecture, design, and sprint planning.

---

## 🧭 PRODUCT VISION

**UniWallet** is a B2C Fintech Super App for Malaysian Gen Z / university students. The core innovation is a **categorized virtual debit card system** — users hold one Master Wallet funded via FPX, and automatically distribute money into four virtual spending categories:

| Card | Category | Purpose |
|---|---|---|
| 💙 SaaS | Subscriptions (apps, tools) | Adobe, Notion, ChatGPT |
| 💜 Entertainment | Streaming & leisure | Netflix, Spotify, Disney+ |
| 💚 Utilities | Bills & essentials | Telco, Wi-Fi, electricity |
| 🧡 Others / Gym | Health & misc | Gym memberships, etc. |

**Revenue Model:** UniWallet charges a flat **RM 2.00 service fee per transaction** deducted from the Master Wallet at the point of each card charge. This is displayed transparently in the transaction history as a paired line item.

**Secondary Revenue (V2 — B2B Marketplace):** A "Marketplace (Beta)" section sells micro-duration software licenses (day passes, weekend passes) to students who cannot afford full monthly subscriptions.

**AI Layer:** Claude AI integration provides proactive financial insights, detecting unused subscriptions and prompting the user to pause them via the Kill Switch.

---

## 🎨 DESIGN SYSTEM

### Visual Identity
- **Theme:** Vibrant Premium Dark Mode with glassmorphism
- **NOT:** Flat white Apple-clone. Think: deep dark backgrounds (#0A0A0F base) with rich, colorful gradient accents — electric blues, purples, teals, and warm oranges.
- **Glass Cards:** `backdrop-filter: blur(20px)`, semi-transparent white overlays (`rgba(255,255,255,0.08)`), subtle glowing colored borders
- **Shadows:** Colored drop shadows that match card accent colors (e.g., blue card → `box-shadow: 0 20px 60px rgba(59, 130, 246, 0.25)`)

### Color Tokens (CSS Variables)
```css
--color-bg-base: #0A0A0F;
--color-bg-surface: #13131A;
--color-bg-elevated: #1C1C28;
--color-glass: rgba(255, 255, 255, 0.06);
--color-glass-border: rgba(255, 255, 255, 0.12);

--color-saas: #3B82F6;          /* Blue */
--color-entertainment: #8B5CF6;  /* Purple */
--color-utilities: #10B981;      /* Emerald */
--color-others: #F59E0B;         /* Amber/Orange */

--color-primary: #6366F1;        /* Indigo — CTAs */
--color-accent: #F97316;         /* Orange — highlights, days-left */
--color-success: #22C55E;
--color-danger: #EF4444;

--color-text-primary: #F8FAFC;
--color-text-secondary: #94A3B8;
--color-text-muted: #475569;
```

### Typography
- **Display/Headings:** `Clash Display` or `Cal Sans` (Google Fonts / CDN)
- **Body:** `Geist` or `DM Sans`
- **Numbers/Monospace:** `JetBrains Mono` (for balances, card numbers)

### Motion Principles
- Entrance animations: `spring` physics (Framer Motion `spring` config)
- Page transitions: slide-up with fade
- Micro-interactions on all tappable elements: scale `0.97` on press
- Skeleton loaders on all async data

---

## 🏗️ TECH STACK (Production-Grade)

### Frontend (Mobile-First PWA)
```
Framework:      React Native (Expo) OR React + Vite PWA
State:          Zustand (global) + React Query (server state)
Styling:        NativeWind (RN) OR Tailwind CSS + custom CSS vars
Animation:      Framer Motion (web) / Reanimated 3 (RN)
Navigation:     Expo Router (file-based) OR React Router v6
Icons:          Lucide React / @expo/vector-icons
```

### Backend
```
Runtime:        Node.js + Express OR Bun + Hono
Database:       PostgreSQL (Supabase — managed, auth included)
ORM:            Drizzle ORM (type-safe, lightweight)
Auth:           Supabase Auth (email/OTP + social)
File Storage:   Supabase Storage
Real-time:      Supabase Realtime (live balance updates)
```

### Payments
```
Primary:        Billplz (FPX gateway — Malaysian, easy sandbox)
Fallback:       iPay88 or Curlec
Webhooks:       Verified HMAC signatures on all payment callbacks
Virtual Cards:  Stripe Issuing (for card infrastructure) OR
                partner with a local BIN sponsor (e.g. Merchantrade)
```

### AI Layer
```
Provider:       Anthropic Claude API (claude-sonnet-4-20250514)
Trigger:        Cron job (daily) + event-driven (post-transaction)
Use Cases:      Subscription analysis, spend coaching, kill-switch suggestions
```

### Infrastructure
```
Hosting:        Vercel (frontend) + Railway or Render (backend API)
CI/CD:          GitHub Actions
Monitoring:     Sentry (errors) + PostHog (analytics)
Secrets:        .env + Vercel/Railway env manager
```

---

## 📱 SCREEN ARCHITECTURE & FEATURE SPECS

### Bottom Navigation (5 Tabs)
```
[Home] [Cards] [Reload] [Rewards] [Profile]
```

---

### SCREEN 1: HOME — Master Wallet Dashboard

**Route:** `/` or `(tabs)/index`

**Components:**
1. **Header Bar** — Avatar (left), Notification bell (right), "Good morning, [Name]" greeting
2. **Master Balance Card** — Glassmorphic hero card
   - Balance: `RM 450.00` in large JetBrains Mono font
   - Sub-text: "Available Balance"
   - Colored glow border (rotating gradient animation)
3. **Quick Actions Row** — 4 pill buttons: Reload · Transfer · Analytics · AI Insights
4. **Virtual Cards Carousel** — Horizontal scroll, 1.3 cards visible at a time
   - Each card: gradient background (per category color), masked card number (`•••• •••• •••• 4521`), card holder name, balance, category icon
   - Tap → navigates to Card Detail screen
5. **Transaction History** — Recent 10 transactions
   - Grouped by date
   - Each transaction shows: merchant logo, name, amount, timestamp
   - **Paired fee display:** Netflix `-RM 55.00` → indented child row: `UniWallet Fee  -RM 2.00`
   - Pull-to-refresh

**Data Requirements:**
- `GET /api/wallet/balance` → master balance
- `GET /api/cards` → array of virtual cards with balances
- `GET /api/transactions?limit=20` → paginated transactions

---

### SCREEN 2: RELOAD — FPX Funding Flow

**Route:** `/reload` (bottom sheet modal)

**UX Flow:**
1. Bottom sheet slides up (70% screen height) over blurred home
2. **Amount Input** — Large numeric keypad, amount displayed as `RM 150.00`
3. **Bank Selection Grid** — Pill/card grid:
   - FPX logo (header)
   - Banks: Maybank · CIMB · RHB · Hong Leong · Public Bank · AmBank
   - Each with official colored logo on white rounded card
4. **CTA** — "Slide to Reload →" slider OR "Confirm Reload" pill button (double-tap confirm pattern)
5. **Processing State** — Lottie animation (spinning coin or checkmark)
6. **Success State** — Confetti burst + balance updated in real-time via Supabase Realtime

**Payment Logic:**
- Call Billplz API to create a bill
- Redirect to FPX gateway
- On callback webhook: verify HMAC, credit Master Wallet in DB, push Realtime event

---

### SCREEN 3: CARDS — Category Card Management

**Route:** `/(tabs)/cards`

**Layout (Vertical Scroll):**
1. **Section: My Cards** — Same carousel from Home (larger cards here)
2. **Section: Active Card Detail** (when card is selected/tapped)
   - Enlarged card at top with subtle 3D tilt on gyroscope (or mouse parallax on web)
   - Status badge: `● ACTIVE` (green pulse animation)
3. **Kill Switch Panel**
   - Label: "Card Controls"
   - Toggle (Apple-style, orange accent): `Card Active / Paused`
   - On toggle → **Pause Modal** (frosted glass bottom sheet):
     ```
     ⏸  Pause for 1 Month
     ⏸  Pause for 2 Months
     🔒  Freeze Indefinitely
     ❌  Cancel
     ```
4. **Live Subscriptions** (6 hardcoded → then dynamic)
   Each subscription card:
   - Logo + Name + Plan
   - Price per month (e.g., `RM 14.90/mo`)
   - Days left badge (orange, e.g., `12 Days Left`)
   - Individual toggle: pause THIS specific subscription only
   - On individual toggle → same Pause Modal but scoped to that subscription

   **Mock Data (hardcode for MVP then connect to API):**
   ```js
   const subscriptions = [
     { id: 1, name: "Spotify Premium",     price: 14.90,  daysLeft: 12, logo: "spotify" },
     { id: 2, name: "Netflix Standard",    price: 45.00,  daysLeft: 5,  logo: "netflix" },
     { id: 3, name: "Anytime Fitness",     price: 180.00, daysLeft: 20, logo: "gym" },
     { id: 4, name: "Notion Pro",          price: 40.00,  daysLeft: 2,  logo: "notion" },
     { id: 5, name: "ChatGPT Plus",        price: 95.00,  daysLeft: 15, logo: "openai" },
     { id: 6, name: "Amazon Prime Video",  price: 25.00,  daysLeft: 8,  logo: "amazon" },
   ];
   ```

5. **Marketplace (Beta) Section**
   - Bold sub-header: `Marketplace (Beta) 🧪`
   - Horizontal scroll carousel (shows 1.5 cards at a time)
   - Dark glass cards with glowing gradient borders

   **Marketplace Cards:**
   ```
   Card 1: Piktochart Pro       | 3-Day Studio Pass      | RM 8.00
   Card 2: AWS Dev Environment  | 5-Day Team License     | RM 25.00
   Card 3: Sooka Sports VIP     | 24-Hr Premier League   | RM 12.00
   Card 4: Semrush SEO Suite    | 1-Week Campaign Pass   | RM 45.00
   ```
   - Each has a "Get Pass" gradient button
   - On click → Modal: *"B2B Marketplace unlocking in V2. Join the waitlist."*
   - Waitlist modal has an email input field + "Notify Me" button (saves to `waitlist` table in DB)

---

### SCREEN 4: TRANSFER — Master Wallet → Category Card

**Route:** `/transfer` (modal or dedicated tab)

**UX:**
1. **From:** Master Wallet card (top) — shows available balance
2. **Arrow animation** (animated down-arrow with particle flow)
3. **To:** Category card selector (tap to cycle through 4 cards)
4. **Amount:** Drag slider OR numeric input (e.g., `RM 80.00`)
5. **Preview:** "After transfer: Master RM 370.00 | Utilities RM 80.00"
6. **Confirm button** → optimistic UI update + API call

---

### SCREEN 5: REWARDS — Gamification Engine

**Route:** `/(tabs)/rewards`

**Concept:** Users earn **UniPoints** for every RM spent on subscriptions. Points are redeemable for gift cards or subscription discounts.

**Earn Rate:** 1 UniPoint per RM 1.00 transacted through UniWallet cards

**Layout:**
1. **Points Hero Card** — Large glassmorphic card showing:
   - `1,240 UniPoints` (animated counter on load)
   - Tier badge: Bronze / Silver / Gold / Platinum
   - Progress bar to next tier
   - "Equivalent to RM 12.40 in rewards"

2. **Earn History** — List of point-earning events (e.g., "+ 45 pts — Netflix charge")

3. **Redeem Section — Two Tabs:**

   **Tab A: Gift Cards**
   ```
   - Grab RM 10 Voucher     (1,000 pts)
   - Touch 'n Go RM 10      (1,000 pts)
   - Shopee RM 5 Voucher    (500 pts)
   - McDonald's RM 10       (1,000 pts)
   - Lazada RM 15           (1,500 pts)
   ```

   **Tab B: Subscription Discounts**
   ```
   - 1 Month Spotify Free   (1,500 pts)  → pause fee waiver
   - Netflix 50% Off        (2,000 pts)
   - UniWallet Fee Waiver (3 months) (3,000 pts)
   ```

4. **Leaderboard Teaser** (gamification) — "You're in the Top 12% of UniWallet users this month 🏆"

5. **Streak Badge** — "7-Day Active Streak 🔥" (reward for daily app opens)

**Data Requirements:**
- `GET /api/rewards/balance` → points total + tier
- `GET /api/rewards/history` → earn events
- `POST /api/rewards/redeem` → redemption request

---

### SCREEN 6: AI INSIGHTS — Smart Financial Assistant

**Route:** `/insights` (accessible from Home quick action OR dedicated tab)

**Components:**
1. **Insights Feed** — List of AI-generated cards:
   - Each card: sparkle icon, insight text, action buttons
   
   **Example Insight Cards:**
   ```
   💡 "You haven't used Adobe Creative Cloud (SaaS) in 45 days.
       Pause it for 1 month and save RM 130.00?"
       [Pause Adobe] [Dismiss]

   📊 "Your Entertainment spending is 40% above your 3-month average.
       Want to set a monthly cap?"
       [Set Cap] [View Details]

   🎯 "You're RM 240 away from Gold tier this month.
       You'll unlock a 1-month Spotify fee waiver."
       [View Rewards]
   ```

2. **Monthly Spend Summary** — Donut chart (Recharts or Victory) broken down by card category

3. **Subscription Health Score** — `82/100` — with breakdown metrics

**AI Integration:**
```javascript
// Cron job: daily at 9AM
// Triggered by: POST /api/ai/analyze-user/:userId
// Calls Claude API with user's transaction history (last 30 days)
// Returns structured JSON: { insights: [...], recommendations: [...] }
// Stores in `ai_insights` table with expiry
```

---

## 🗄️ DATABASE SCHEMA (PostgreSQL / Supabase)

```sql
-- Users
users (id, email, full_name, phone, kyc_status, created_at)

-- Wallet
wallets (id, user_id, balance_rm, currency, status)

-- Virtual Cards
virtual_cards (id, user_id, category, balance_rm, card_number_masked,
               status [active|paused|frozen], paused_until, created_at)

-- Transactions
transactions (id, user_id, card_id, merchant_name, merchant_logo_url,
              amount_rm, type [debit|credit|fee], paired_transaction_id,
              created_at)

-- Subscriptions
subscriptions (id, user_id, card_id, service_name, logo_url,
               amount_rm, billing_cycle, next_billing_date,
               status [active|paused|cancelled], paused_until)

-- Rewards
rewards_ledger (id, user_id, points, event_type, reference_id, created_at)
rewards_redemptions (id, user_id, reward_type, points_spent, status, created_at)

-- AI Insights
ai_insights (id, user_id, insight_type, message, action_data jsonb,
             is_dismissed, expires_at, created_at)

-- Waitlist (Marketplace Beta)
waitlist (id, email, source, created_at)

-- Reload Transactions
reload_transactions (id, user_id, amount_rm, provider [billplz|ipay88],
                     bill_id, status [pending|success|failed],
                     fpx_bank_code, created_at)
```

---

## 📅 4-WEEK SPRINT PLAN

### ✅ WEEK 1 — Foundation & Auth
**Goal:** Working app shell + auth + database live

| Task | Owner | Days |
|---|---|---|
| Audit existing codebase, document what exists | You | 0.5 |
| Set up Supabase project (DB + Auth + Storage) | You | 0.5 |
| Apply design system: CSS variables, fonts, dark theme | You | 1 |
| Implement Auth flow: Sign Up / Login / OTP | You | 1 |
| Build bottom navigation shell (5 tabs, styled) | You | 0.5 |
| Build Home screen layout (static mock data) | You | 1 |
| Deploy to Vercel / Expo Go for testing | You | 0.5 |

**Exit Criteria:** App opens, user can sign up/login, Home screen renders with mock data.

---

### ✅ WEEK 2 — Core Wallet & Cards
**Goal:** Real wallet data, card management, FPX reload

| Task | Days |
|---|---|
| Build backend API: wallet balance, cards, transactions | 1.5 |
| Connect Home screen to live Supabase data | 1 |
| Build Cards screen: carousel, Kill Switch, pause modal | 1.5 |
| Build individual subscription toggle + pause modal | 1 |
| Integrate Billplz sandbox: reload flow end-to-end | 2 |
| Webhook handler: verify + credit wallet on payment | 1 |

**Exit Criteria:** User can fund wallet via FPX sandbox, see balance update in real-time.

---

### ✅ WEEK 3 — Rewards, AI & Marketplace
**Goal:** Gamification live, AI insights working, Marketplace teaser

| Task | Days |
|---|---|
| Build Rewards screen: points display, earn history | 1 |
| Build redemption catalog (gift cards + discounts) | 1 |
| Build points ledger logic (credit on transaction) | 1 |
| Build AI Insights screen layout | 0.5 |
| Integrate Claude API: daily cron + insight generation | 1.5 |
| Build Marketplace carousel + "Join Waitlist" modal | 1 |
| Connect waitlist form to DB | 0.5 |

**Exit Criteria:** Points accumulate on transactions, AI generates 3+ real insights for test user.

---

### ✅ WEEK 4 — Polish, Security & Launch Prep
**Goal:** Production-ready, tested, deployed

| Task | Days |
|---|---|
| Full UI polish pass (animations, spacing, transitions) | 1.5 |
| Error handling: empty states, loading skeletons everywhere | 1 |
| Input validation & API security (rate limiting, auth guards) | 1 |
| Sentry + PostHog integration | 0.5 |
| End-to-end testing (Playwright or Detox) | 1 |
| Production Billplz go-live (or keep sandbox + add disclaimer) | 0.5 |
| App Store / PWA deployment prep | 1 |
| Internal QA + bug fixes | 1 |

**Exit Criteria:** App is live at a public URL. All 5 screens functional. Zero critical bugs.

---

## 🔐 SECURITY REQUIREMENTS (Non-Negotiable)

1. **All API routes** must require valid Supabase JWT (`Authorization: Bearer <token>`)
2. **Payment webhooks** must verify HMAC signature before processing
3. **Card numbers** must never be stored in plaintext — use tokenization
4. **Row Level Security (RLS)** must be enabled on all Supabase tables
5. **Rate limiting** on all public endpoints (use `express-rate-limit` or Hono middleware)
6. **Environment variables** — NEVER commit API keys to git (use `.env.example` for documentation)
7. **Input sanitization** on all user-facing inputs (use `zod` for schema validation)
8. **HTTPS only** in production (enforced by Vercel/Railway)

---

## 🧠 AI INTEGRATION SPEC (Claude API)

```javascript
// File: /api/services/ai-insights.service.js

const generateInsights = async (userId) => {
  const transactions = await getLastNTransactions(userId, 30); // last 30 days
  const subscriptions = await getUserSubscriptions(userId);
  
  const prompt = `
    You are a financial wellness AI for UniWallet, a Malaysian fintech app.
    
    Analyze this user's spending data and generate 3 actionable insights.
    
    Transactions (last 30 days):
    ${JSON.stringify(transactions)}
    
    Active Subscriptions:
    ${JSON.stringify(subscriptions)}
    
    Return ONLY a JSON array with this structure:
    [
      {
        "type": "unused_subscription" | "overspend" | "rewards_tip" | "savings_opportunity",
        "title": "Short headline",
        "message": "Clear, friendly explanation (max 2 sentences)",
        "action": { "label": "Button text", "type": "pause_subscription" | "set_cap" | "view_rewards", "target_id": "..." },
        "savings_rm": 0.00
      }
    ]
  `;
  
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }]
  });
  
  return JSON.parse(response.content[0].text);
};
```

---

## 📁 RECOMMENDED FOLDER STRUCTURE

```
uniwallet/
├── apps/
│   └── mobile/                    # React Native (Expo) or React PWA
│       ├── app/                   # Expo Router (file-based routing)
│       │   ├── (tabs)/
│       │   │   ├── index.tsx      # Home
│       │   │   ├── cards.tsx      # Cards
│       │   │   ├── reload.tsx     # Reload
│       │   │   ├── rewards.tsx    # Rewards
│       │   │   └── profile.tsx    # Profile
│       │   ├── auth/
│       │   │   ├── login.tsx
│       │   │   └── signup.tsx
│       │   └── _layout.tsx
│       ├── components/
│       │   ├── cards/
│       │   ├── transactions/
│       │   ├── rewards/
│       │   ├── marketplace/
│       │   └── ui/                # Design system primitives
│       ├── stores/                # Zustand stores
│       ├── hooks/                 # React Query hooks
│       ├── constants/             # Colors, design tokens
│       └── assets/
│
├── apps/
│   └── api/                       # Node/Bun backend
│       ├── routes/
│       │   ├── wallet.ts
│       │   ├── cards.ts
│       │   ├── transactions.ts
│       │   ├── rewards.ts
│       │   ├── reload.ts          # Billplz integration
│       │   └── ai.ts              # Claude integration
│       ├── services/
│       │   ├── billplz.service.ts
│       │   ├── ai-insights.service.ts
│       │   └── rewards.service.ts
│       ├── middleware/
│       │   ├── auth.ts
│       │   └── rateLimit.ts
│       └── db/
│           ├── schema.ts          # Drizzle schema
│           └── migrations/
│
└── packages/
    └── shared/                    # Shared types, utils
        ├── types/
        └── utils/
```

---

## 🚀 FIRST COMMANDS TO RUN

After reading and auditing the existing code, run these to assess the current state:

```bash
# 1. Audit what exists
find . -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" | head -50
cat package.json

# 2. Check for existing env setup
cat .env.example 2>/dev/null || echo "No .env.example found"

# 3. Check DB connection
cat src/lib/supabase.ts 2>/dev/null || find . -name "supabase*"

# 4. Run the project
npm run dev
```

---

## 📌 CLAUDE CODE INSTRUCTIONS

When you begin working on this project:

1. **READ FIRST** — Scan the entire `/src` or `/app` directory. List all existing screens, components, and services.
2. **AUDIT** — Identify: what's complete, what's broken, what's missing.
3. **REPORT** — Give me a structured summary: `[DONE] / [INCOMPLETE] / [MISSING]` for each feature listed in this document.
4. **ASK** — If you find conflicting patterns (e.g., mixed styling approaches), ask before refactoring.
5. **BUILD** — Follow the sprint plan above. Complete Week 1 first before touching Week 2 features.
6. **NEVER** — Remove existing working functionality without asking.
7. **ALWAYS** — Apply the design system tokens. No hardcoded colors. No inline styles.
8. **COMMIT** — After each logical feature: `git commit -m "feat: [feature name]"`

---

*This document is the single source of truth for UniWallet development. All decisions should be validated against this spec.*
