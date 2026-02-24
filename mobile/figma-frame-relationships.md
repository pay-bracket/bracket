# Bracket Mobile App - Frame Relationships

## Overview

Bracket is a mobile banking/fintech app. The design consists of 17 screens (402x874px) organized around a persistent bottom navigation bar with 5 tabs: **Home**, **Send & Receive**, **Cards**, **Transactions**, and **Help**.

---

## Navigation Structure

```
Bottom Navigation Bar
├── Home
├── Send & Receive
├── Cards
├── Transactions
└── Help
```

Each tab leads to a top-level screen. Sub-screens are accessed via interactions within those top-level screens and use a back chevron for return navigation.

---

## Screens by Tab

### 1. Home (root)

**Home** is the dashboard and entry point. It displays:
- Account balance ($1,234.56) with 30-day trend (+$440.33)
- Quick action buttons: Send, Receive, Deposit Check, Documents
- Recent transactions list
- Cards summary

**Home navigates to:**
- **Statements** (via Documents quick action or similar entry point)
- **Send & Receive** (via Send/Receive quick actions or bottom nav)
- **Cards** (via cards summary section or bottom nav)
- **Transactions** (via recent transactions section or bottom nav)

---

### 2. Send & Receive Tab

**Send & Receive** is the hub for all payment operations. It shows:
- Balance ($1,234.56)
- Action buttons: Deposit Check, Send, Request, Transfer
- "Link External Account" button
- Requests section (with Open/Filled/Declined statuses)
- Scheduled payments section

From here, two major flows branch out:

#### Send Money Flow

```
Send & Receive
  └── Contacts (select recipient)
        ├── New Contacts (add a new recipient)
        └── Contact Selected Payment Details (enter amount)
              └── Send Confirm (confirmation dialog)
                    └── Send Confirmed (success screen)
```

| Step | Screen | Purpose |
|------|--------|---------|
| 1 | **Contacts** | Browse/search alphabetical contact list. Option to add new contact. |
| 2 | **New Contacts** | Form to add a contact (name, email, routing/account numbers, notes). Returns to Contacts after save. |
| 3 | **Contact Selected Payment Details** | Enter payment amount via number pad. Set memo ("What is this for?"), toggle "Send ASAP". |
| 4 | **Send Confirm** | Modal overlay on top of Contact Selected: "You are about to send $200 to Adam White. This action cannot be undone." Options: Send or Cancel. |
| 5 | **Send Confirmed** | Success overlay with green checkmark, amount, recipient, transaction ID with copy button. Close returns to Send & Receive. |

#### Request / Invoice Flow

```
Send & Receive
  └── Contacts (select who to request from)
        └── Request Invoice (1) ─or─ Request Invoice (2)
              └── Invoice Preview
                    └── Invoice Confirmed (success screen)
```

| Step | Screen | Purpose |
|------|--------|---------|
| 1 | **Contacts** | Select the contact to request money from. |
| 2a | **Request Invoice (1)** | Build an itemized invoice with line items (item name + price), number pad for amounts, "Add Item" to add rows. Shows running total. |
| 2b | **Request Invoice (2)** | Simpler request — single amount with a large description text area. No line items. |
| 3 | **Invoice Preview** | Full invoice document preview with sender/recipient info, bank details (account/routing numbers), line items table, total, and signature. "Send" button to finalize. |
| 4 | **Invoice Confirmed** | Success overlay on Home-like background: "Invoice for $300 sent to Adam White" with green checkmark. Close dismisses. |

> **Note:** Request Invoice (1) and (2) appear to be two variants of the same step — (1) is for itemized invoices, (2) is for simple single-amount requests.

---

### 3. Cards Tab

```
Cards (list all cards)
  └── Card Selected (card detail + transactions)
```

| Step | Screen | Purpose |
|------|--------|---------|
| 1 | **Cards** | Shows card images and names (John's Debit 7890, John's Debit 2 4321). Actions: View Details, Lock Card, Change PIN. "Add to Apple Pay" button. |
| 2 | **Card Selected** | Enlarged card view with same actions, plus a transactions list filtered to that card, grouped by date with daily income/expense totals. |

---

### 4. Transactions Tab

```
Transactions (full history)
  └── Transaction Selected (transaction detail)
```

| Step | Screen | Purpose |
|------|--------|---------|
| 1 | **Transactions** | Searchable, date-grouped transaction history. Shows 30-day income/expense summary. Dates are expandable/collapsible. |
| 2 | **Transaction Selected** | Detailed view of a single transaction: merchant info, category, date/time, card used, transaction ID (copyable). Actions: Report an error, Dispute, Attach receipt. Sections for receipt image and notes. |

---

### 5. Help Tab

**Help** is a standalone screen (no sub-screens). It provides:
- Bracket logo
- Phone: +1 (555) 555-5555
- Fax: +1 (555) 000-0000
- Email: support@bracketcard.com
- Quick action buttons: "Lock a Card", "Report a Fraudulent Transaction"

---

### 6. Statements (accessed from Home)

**Statements** is a sub-screen of Home. It shows:
- Monthly statements list (Dec–Jul 2025)
- Yearly statement (2025)
- Search bar
- "Generate Custom Statement" link
- Back chevron returns to Home

```
Home
  └── Statements
```

---

## Complete Flow Map

```
┌─────────────────────────────────────────────────────────────────┐
│                     BOTTOM NAV BAR                              │
├──────────┬──────────────┬────────┬──────────────┬───────────────┤
│  Home    │ Send&Receive │ Cards  │ Transactions │     Help      │
│          │              │        │              │  (standalone) │
│  ┌────┐  │  ┌────────┐  │ ┌───┐  │  ┌────────┐  │               │
│  │Stmt│  │  │Contacts│  │ │Sel│  │  │  Sel   │  │               │
│  └────┘  │  ├────┬───┤  │ └───┘  │  └────────┘  │               │
│          │  │New  │Sel│  │        │              │               │
│          │  └────┐└─┬─┘  │        │              │               │
│          │       │  │    │        │              │               │
│          │       │ ┌┴──┐ │        │              │               │
│          │       │ │Cfm│ │        │              │               │
│          │       │ └─┬─┘ │        │              │               │
│          │       │ ┌─┴─┐ │        │              │               │
│          │       │ │OK!│ │        │              │               │
│          │       │ └───┘ │        │              │               │
│          │  ┌────┴───┐   │        │              │               │
│          │  │Req Inv │   │        │              │               │
│          │  └───┬────┘   │        │              │               │
│          │  ┌───┴────┐   │        │              │               │
│          │  │Preview │   │        │              │               │
│          │  └───┬────┘   │        │              │               │
│          │  ┌───┴────┐   │        │              │               │
│          │  │Inv OK! │   │        │              │               │
│          │  └────────┘   │        │              │               │
└──────────┴──────────────┴────────┴──────────────┴───────────────┘
```

---

## Cross-Screen Patterns

- **Bottom nav bar** is present on all 17 screens, providing persistent access to the 5 main tabs.
- **Back chevron** appears on all sub-screens for return navigation.
- **Search bars** appear on Contacts, Cards, and Transactions screens.
- **Confirmation pattern**: Destructive/important actions (Send, Invoice) use a two-step confirm flow — a modal overlay asks for confirmation before showing a success screen.
- **Success screens** (Send Confirmed, Invoice Confirmed) use a green checkmark icon and a "Close" button that returns the user to the parent tab.
- **User identity**: "John Smith" (initials "JS") is shown consistently as the logged-in user across Home, Invoice Preview, and Transaction Selected.
- **Contact reuse**: The Contacts screen serves both the Send and Request flows — after selecting a contact, the user is routed into either payment entry or invoice creation.
