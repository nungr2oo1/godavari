# 🧠 Claude Prompt — Add Partner Onboarding & Admin Dashboard (Frontend Only)

## 🎯 Objective

Enhance the existing **Godavari Living Guide frontend** by adding:

1. **Local Partner Onboarding Flow (Form + UI)**
2. **Admin Dashboard (UI only)**
3. **Basic role-based UI structure (no backend)**

⚠️ Important:

* This is still **frontend-only**
* Do NOT implement real authentication or APIs
* Extend existing architecture — do NOT rebuild

---

## 🧩 Context

The app already has:

* Auth simulation (user context)
* Pages: Places, Events, Plan, Food, Contact
* Save/bookmark system
* Callback (lead) flow

👉 Now we are adding **supply-side (partners) + admin view**

---

## 👤 User Roles (Frontend Simulation)

```ts
type User = {
  id: string
  name: string
  email?: string
  role?: "traveler" | "partner" | "admin"
}
```

### Rules:

* Default role = `"traveler"`
* Role is stored in Auth Context
* Role switching can be simulated manually (no backend)

---

## 🧑‍🌾 1. Partner Onboarding Page

### Route:

`/partner/apply`

---

### Purpose:

Allow locals (guides, boat operators, homestays, etc.) to apply to be listed.

---

### Form Fields:

* Full Name
* Phone Number
* District (Select)
* Service Type (Select):

  * Guide
  * Boat Operator
  * Homestay
  * Food Experience
* Description (Textarea)
* Years of Experience
* Languages Spoken
* Optional: WhatsApp Number

---

### Submit Behavior:

* No API call
* Store data in local state (or console log)
* Show success state:

> “Application submitted. We’ll review and get back to you.”

---

### UX:

* Clean card layout
* Proper labels
* Required field validation
* Success screen after submit

---

## 📊 2. Admin Dashboard (UI Only)

### Route:

`/admin`

---

### Access Rule:

* Only show if:

```ts
user?.role === "admin"
```

Otherwise:

* Show “Access Denied” UI

---

### Dashboard Sections

---

### 🧾 A. Partner Applications

* List of submitted partner forms (mock data)

* Each item shows:

  * Name
  * Service Type
  * District
  * Experience

* Actions (UI only):

  * Approve
  * Reject

---

### 📞 B. Leads (Callback Requests)

Use existing lead concept:

```ts
type Lead = {
  userId: string
  placeId: string
  message: string
  createdAt: string
}
```

---

Display:

* Place name
* User name
* Message
* Time

---

### 📈 C. Stats (Static UI)

Cards:

* Total Leads
* Total Partners
* Total Saved Items

---

## 🔁 3. Role Simulation (Important)

Since no backend:

Add temporary UI (dev-only):

* Small dropdown in Navbar (only in dev mode):

Options:

* Traveler
* Partner
* Admin

On change:

* Update `user.role`

---

## 🎨 UI Requirements

* Use existing design system (Tailwind + shadcn)
* Cards, tables, clean spacing
* Keep it minimal and readable
* Responsive layout

---

## 🧱 Components to Add

```plaintext
/components/partner/PartnerForm.tsx
/components/admin/AdminDashboard.tsx
/components/admin/ApplicationsList.tsx
/components/admin/LeadsTable.tsx
/components/admin/StatsCards.tsx
```

---

## 📁 Pages to Add

```plaintext
/app/partner/apply/page.tsx
/app/admin/page.tsx
```

---

## ⚡ UX Rules

* No page reloads
* Smooth transitions
* Clear success + empty states
* Keep flows simple and fast

---

## 🚫 Avoid

* Backend/API integration
* Real authentication logic
* Complex permissions system

---

## 🔥 Expected Outcome

* Partner onboarding flow ready
* Admin can view:

  * Applications
  * Leads
  * Stats
* Role-based UI working (simulated)

---

## 🧠 Mindset

Think like you're building:

👉 A **travel marketplace foundation**

Where:

* Travelers explore
* Partners supply services
* Admin controls quality

---

## 🚀 Final Instruction

Extend the current frontend by:

* Adding partner onboarding form
* Adding admin dashboard UI
* Supporting role-based rendering

Keep everything modular and ready for backend integration.
