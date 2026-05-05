# 🧠 Project Instruction for Claude — Godavari Living Guide (Frontend Only)

## 🎯 Objective

Build a modern, responsive, production-ready frontend for a travel + culture platform called:

👉 **“Godavari Living Guide”**

This platform helps users:

* Discover places in Godavari districts
* Explore cultural events & festivals
* Find local food spots
* Plan trips with ready-made itineraries
* Access verified local contacts

⚠️ This is NOT a static informational site. It should feel like a **living, dynamic platform** similar to Airbnb Experiences or TripAdvisor, but focused on Godavari.

---

## 🧩 Tech Stack Requirements

* Framework: **Next.js (App Router)**
* Language: **TypeScript**
* Styling: **Tailwind CSS**
* UI Components: **shadcn/ui**
* Icons: **lucide-react**
* State Management: React hooks (no Redux)
* Data: Use **mock JSON data** (API integration later)
* Design: Clean, minimal, modern

---

## 🎨 Design Guidelines

* Mobile-first design (very important)
* Use grid-based layouts
* Soft shadows, rounded-2xl cards
* Good spacing (padding ≥ p-4)
* Subtle animations (hover, transitions)
* Avoid clutter — keep it premium

Color vibe:

* Greens (nature)
* Blues (river/water)
* Warm tones (culture)

---

## 📄 Pages to Build

### 1. 🏠 Home Page

Sections:

* Hero section (search bar + tagline)
* Featured places
* Upcoming events
* Popular itineraries
* Food highlights
* CTA: “Plan your trip”

---

### 2. 🗺️ Explore Places Page

* Grid of places (cards)
* Filters:

  * District
  * Type (nature, temple, beach, village)
* Each card:

  * Image
  * Title
  * Short description
  * “View Details”

---

### 3. 📍 Place Detail Page

Dynamic route: `/place/[slug]`

Sections:

* Image gallery
* Overview
* Best time to visit
* Things to do
* Food to try
* Travel tips
* Local contacts (cards)

---

### 4. 📅 Events Page

* List of upcoming events
* Filters by date / district
* Event cards:

  * Title
  * Date
  * Location
  * Short description

---

### 5. 🧭 Plan Your Trip Page

* Pre-built itineraries:

  * 1-day trip
  * Weekend trip
  * Budget trip
* Each itinerary:

  * Timeline view
  * Places covered
  * Estimated cost

---

### 6. 🍛 Food Guide Page

* List of food experiences
* Categories:

  * Street food
  * Traditional meals
  * Seafood
* Card:

  * Dish name
  * Location
  * Description

---

### 7. 📞 Contact / Ask Local Page

* Simple form:

  * Name
  * Question
  * Location
* UI only (no backend logic)

---

## 🧱 Components to Create

* Navbar (sticky, responsive)
* Footer
* Card components (reusable)
* Filters (dropdowns)
* Search bar
* Image gallery
* Tabs (for place details)
* Timeline (for itineraries)

---

## 📦 Data Structure (Mock)

Use JSON like:

```ts
type Place = {
  id: string
  name: string
  district: string
  type: string
  description: string
  images: string[]
}

type Event = {
  id: string
  title: string
  date: string
  location: string
}

type Itinerary = {
  id: string
  title: string
  duration: string
  stops: string[]
}
```

---

## ⚡ UX Requirements

* Fast loading UI
* Skeleton loaders for cards
* Hover effects on cards
* Smooth transitions
* Fully responsive (mobile, tablet, desktop)

---

## 🚫 Avoid

* Over-complicated UI
* Too many colors
* Cluttered layouts
* Dummy lorem ipsum text (use realistic content)

---

## 🔥 Extra (if possible)

* Dark mode toggle
* Map preview (static)
* Bookmark/favorite UI (no backend)

---

## 📌 Output Expectation

* Full Next.js frontend structure
* Clean folder structure
* Reusable components
* Ready for backend API integration

---

## 🧠 Mindset

Think like you're building:
👉 A premium travel product for real users
NOT a college project

---

Generate complete frontend code accordingly.
