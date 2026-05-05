# 🧠 Claude Instruction — Godavari Living Guide (Frontend Auth & User Flows)

## 🎯 Objective

Enhance the existing **Godavari Living Guide frontend** by adding:

* Authentication (UI + state only)
* User-specific features (save, contact, personalize)
* Clean, frictionless UX
* Backend-ready structure (but no actual API integration)

⚠️ Important:

* Do NOT rebuild the app
* Do NOT add backend logic
* Work on top of the existing system

---

## 🧩 Existing App Context

The app already includes:

* Pages: Home, Places, Place Detail, Events, Plan, Food, Contact
* Advanced UI: filters, search, gallery, timeline, tabs
* Mock data system
* Fully responsive design

👉 Your job is to **add user interaction layer**, not change core structure.

---

## 👤 User Model (Frontend Only)

```ts
type User = {
  id: string
  name: string
  email?: string
}
```

---

## 🔐 Authentication (Frontend Only)

### Requirements

* Simulate authentication using React context
* No real API calls
* No password system

---

### Behavior

* User is either:

  * `null` (not logged in)
  * `User` object (logged in)

---

### Login Flow

* Use a **modal-based login UI**
* Trigger login when user tries restricted actions

---

### Login Modal UI

Fields:

* Name
* Email (optional)

Buttons:

* Continue

On submit:

* Set user in context
* Close modal
* Resume action

---

## 🚫 Do NOT Require Login For

* Browsing pages
* Viewing places/events/food
* Searching/filtering

---

## ✅ Require Login For

| Feature        | Login Required |
| -------------- | -------------- |
| Save place     | ✅              |
| Save itinerary | ✅              |
| Save food      | ✅              |
| Contact local  | ✅              |
| Submit query   | ✅              |

---

## 🧱 Features to Implement

---

### ⭐ 1. Save / Bookmark System

#### Add to:

* PlaceCard
* Place Detail Page
* FoodCard
* ItineraryCard

---

#### Behavior:

* Heart icon toggle (♡ → ❤️)
* If not logged in → open login modal
* If logged in → toggle saved state

---

#### State Structure:

```ts
type SavedState = {
  places: string[]
  itineraries: string[]
  food: string[]
}
```

---

#### UX:

* Instant UI update (optimistic)
* Optional toast: “Saved”

---

### 📄 2. Saved Page

Route: `/saved`

Sections:

* Saved Places
* Saved Itineraries
* Saved Food

---

#### Empty State:

> “You haven’t saved anything yet.”

---

### 📞 3. Contact Local (Callback Flow)

Update Place Detail Page:

---

#### Existing:

* Direct phone call

---

#### Add:

👉 Button: **“Request Callback”**

---

#### Flow:

1. Click button
2. If not logged in → login modal
3. If logged in → open callback modal

---

#### Callback Modal Fields:

* Name (prefilled if available)
* Phone
* Message

---

#### On Submit:

* Simulate success (no API)
* Show success message:

> “Local partner will contact you shortly.”

---

### 🧭 4. Save Itinerary

On Plan Page:

* Add “Save itinerary” button
* Same logic as bookmark

---

### 🍛 5. Save Food

* Add heart icon to FoodCard
* Same save logic

---

### 📩 6. Upgrade Contact Page

Convert into:

👉 “Ask a Local Expert”

---

#### Changes:

* Require login before submit
* Prefill user name
* On submit → show success state

---

## 🧠 State Management

Use React Context (no external libraries)

---

### Create:

```
/context/auth-context.tsx
/context/saved-context.tsx
```

---

### Auth Context Responsibilities

* Store user
* Login
* Logout

---

### Saved Context Responsibilities

* Store saved items
* Toggle save
* Check if saved

---

## 🎨 New Components

Create:

```
/components/auth/LoginModal.tsx
/components/modals/CallbackModal.tsx
/components/ui/SaveButton.tsx
```

---

### SaveButton

Props:

* `isSaved`
* `onToggle`

---

### LoginModal

* Controlled open/close
* Simple form
* Clean UI

---

### CallbackModal

* Form UI
* Success state after submit

---

## ⚡ UX Requirements

* No full page reloads
* Smooth modal transitions
* Keep interactions fast
* Maintain current design system
* Use existing Tailwind + shadcn styles

---

## 📁 Folder Additions

```
/context/
/components/auth/
/components/modals/
```

---

## 🚫 Avoid

* Backend/API implementation
* Complex auth flows
* Payment systems
* Role dashboards

---

## 🔥 Expected Outcome

* Seamless login experience
* Personalized UI (saved items)
* Action-based login (not forced)
* Clean integration with existing UI

---

## 🧠 Mindset

Think like you're adding:

👉 **User layer on top of a content platform**

Not building auth from scratch.

---

## 🚀 Final Instruction

Enhance the current frontend by:

* Adding auth simulation
* Enabling save/contact flows
* Keeping everything modular and scalable
