# Ubhaya Godavari Living Guide — Feature Audit

A complete inventory of features currently implemented in the frontend (Next.js 14 App Router, TypeScript, Tailwind, shadcn/ui). Mock-data driven; no backend wired up.

---

## 1. Global / App Shell

### 1.1 Root Layout & Metadata
- File: [app/layout.tsx](app/layout.tsx)
- Site-wide `<Navbar>` + `<main>` + `<Footer>` shell.
- Inter (sans) and Playfair Display (serif) fonts loaded via `next/font/google` with CSS variables `--font-sans` and `--font-serif`.
- Metadata: default title `Ubhaya Godavari Living Guide`, title template `%s · Ubhaya Godavari Living Guide`, region-targeted SEO description and keywords (Ubhaya Godavari, East Godavari, West Godavari, Konaseema, Papikondalu, Antarvedi, Rajamahendravaram).
- `suppressHydrationWarning` on `<html>` for theme provider compatibility.
- Min-height flex column layout so the footer sticks to the bottom on short pages.

### 1.2 Theme System (Light / Dark)
- File: [components/theme-provider.tsx](components/theme-provider.tsx), [components/theme-toggle.tsx](components/theme-toggle.tsx)
- `next-themes` provider with `attribute="class"`, `defaultTheme="light"`, system theme detection enabled.
- Theme toggle button in navbar (sun/moon icon, swaps on click).
- Hydration-safe: renders an invisible placeholder until mounted to avoid SSR/CSR mismatch.
- Full dark-mode CSS variables defined in [app/globals.css](app/globals.css) for background, foreground, card, primary, secondary, muted, accent, destructive, border, input, ring.

### 1.3 Design System / Theme Tokens
- File: [tailwind.config.ts](tailwind.config.ts), [app/globals.css](app/globals.css)
- Custom brand color palettes (50–900 scales): `river` (blues), `forest` (greens), `saffron` (warm tones).
- shadcn/ui design tokens via CSS variables (HSL).
- Centered container, padding `1rem`, max-width `1280px` (`2xl`).
- Custom radii bound to `--radius` (1rem default).
- Custom utilities: `.text-balance`, `.gradient-river`, `.gradient-sunset`, `.shadow-soft`, `.shadow-lift`.
- Custom keyframes/animations: `fade-in-up`, `accordion-down`, `accordion-up`.
- Smooth scroll behavior on `html`.

### 1.4 Navbar (Sticky, Responsive)
- File: [components/navbar.tsx](components/navbar.tsx)
- Sticky top-of-page header with `z-40`.
- Scroll-aware styling: transparent at top, switches to blurred background + soft shadow + bottom border once `window.scrollY > 12`.
- Brand logo: gradient river circle with `Waves` icon, 6° hover rotation; two-line wordmark `Ubhaya Godavari` / `Living Guide`.
- Desktop nav (`lg+`) with 6 links: Home, Places, Events, Plan a Trip, Food, Ask a Local.
- Active link highlighting via `usePathname`.
- Theme toggle button.
- "Plan a Trip" CTA button (visible `md+`).
- Mobile hamburger menu (`lg-`) with toggle to `X` icon when open.
- Mobile drawer panel with full-width nav links.
- Auto-closes mobile menu on route change.

### 1.5 Footer
- File: [components/footer.tsx](components/footer.tsx)
- Brand block with logo, tagline, and contact email (`hello@ubhayagodavari.guide`).
- Three link columns:
  - **Discover**: Places, Events, Food, Plan a Trip
  - **By Region**: East Godavari, West Godavari, Konaseema, Eluru (deep-links to filtered places page via `?district=` query param)
  - **Help**: Ask a Local, About, Privacy
- Bottom strip with dynamic `© {year}` copyright and "Crafted with ♥ for the two Godavaris" line.

### 1.6 404 / Not-Found Page
- File: [app/not-found.tsx](app/not-found.tsx)
- Themed compass icon, "Lost on the river" eyebrow, narrative copy ("wandered off into the backwaters").
- Two CTAs: Back home, Browse places.

---

## 2. Home Page (`/`)
File: [app/page.tsx](app/page.tsx)

### 2.1 Hero Section
- Full-bleed Unsplash background image (Godavari at golden hour) with three-stop dark gradient overlay.
- Priority image loading (`priority` prop on `next/image`).
- Min-height 88vh.
- Pill-style eyebrow: `Ubhaya Godavari · Living Guide` with saffron dot indicator.
- Animated heading (`animate-fade-in-up`): "The two Godavaris, told the way they deserve."
- Sub-copy describing temples, villages, festivals.
- Embedded `SearchBar` (hero variant).
- Three quick-link CTAs: Explore places, Plan a trip, Eat your way through.

### 2.2 Value Propositions Section
- 4-up responsive grid (1 / 2 / 4 columns).
- Each card: icon-in-rounded-square, serif title, muted description.
- Hover lift effect (`hover:shadow-lift hover:-translate-y-1`).
- Items: "Two Godavaris, one guide", "Stories, not just listings", "Plans that respect your time", "Food worth the journey".

### 2.3 Featured Places Section
- `SectionHeading` with eyebrow "Featured", CTA "See all places" → `/places`.
- 3-column responsive grid of `PlaceCard`s, populated by `getFeaturedPlaces()`.

### 2.4 Festivals & Gatherings Section
- Tinted background band (`bg-secondary/40`).
- 3 upcoming events from `getUpcomingEvents(3)` rendered as `EventCard`s.
- CTA "See all events" → `/events`.

### 2.5 Itineraries Section
- 3 popular itineraries from `getPopularItineraries(3)` as `ItineraryCard`s.
- Each card links to `/plan#<slug>` (deep-link to detail block).
- CTA "Build your trip" → `/plan`.

### 2.6 Food Highlights Section
- Tinted background band.
- 4-up grid of first 4 `FoodCard`s.
- CTA "See the food guide" → `/food`.

### 2.7 Plan-a-Trip CTA Section
- Two-column card: copy + actions on the left, full-bleed Konaseema backwaters image on the right.
- Two buttons: "Plan a Trip" (primary) → `/plan`, "Ask a Local" (outline) → `/contact`.

---

## 3. Explore Places Page (`/places`)
File: [app/places/page.tsx](app/places/page.tsx)

### 3.1 Page Structure
- Eyebrow + serif H1 ("Wander the two Godavaris") + supporting paragraph.
- React `Suspense` wrapper (required because the inner component reads URL params).

### 3.2 URL-Driven Initial State
- Reads `?district=` and `?q=` from the URL via `useSearchParams` for deep-linking from navbar/footer/search-bar.

### 3.3 Filter Bar (Card Surface)
- Free-text search across name, short description, and district (`Search` icon, `Input`).
- District `Select` dropdown: All, East Godavari, West Godavari, Konaseema, Eluru, Kakinada.
- Type `Select` dropdown: All, Nature, Temple, Beach, Village, Heritage, Riverside.
- "Clear" ghost button appears when any filter is active.
- Idle counter chip (`Filter` icon + "{N} places") when no filters applied.

### 3.4 Loading & Empty States
- Skeleton loader: 6 `SkeletonCard`s shown for ~350ms on first mount.
- Empty state: "No places match those filters." copy + Clear button.

### 3.5 Results Grid
- "Showing X of Y places" count line.
- Responsive grid of `PlaceCard`s (1 / 2 / 3 columns).

---

## 4. Place Detail Page (`/place/[slug]`)
File: [app/place/[slug]/page.tsx](app/place/%5Bslug%5D/page.tsx)

### 4.1 Routing & SEO
- Dynamic route with static params generated for all places via `generateStaticParams`.
- Per-place metadata via `generateMetadata` (title = place name, description = short description).
- 404 fallback via `notFound()` for unknown slugs.

### 4.2 Header
- Breadcrumb-style "← All places" back link.
- Type badge (color-coded via variant) + district label with map-pin icon.
- Large serif H1 with name, sub-paragraph with short description.

### 4.3 Image Gallery
- Component: [components/image-gallery.tsx](components/image-gallery.tsx)
- 4×2 mosaic on desktop: large feature image (col-span-2 row-span-2) + up to 4 secondary thumbnails.
- "+N more" overlay on the last visible thumbnail when extra images exist.
- Click any image → fullscreen lightbox modal.
- Lightbox: prev/next arrow buttons, close `X`, dot pagination indicator (active dot widened), keyboard nav (`ArrowLeft`, `ArrowRight`, `Escape`).
- Backdrop blur + 85% black overlay.
- Hover scale on tiles (1.03–1.05).

### 4.4 Tabbed Content
Built on `@radix-ui/react-tabs`. Four tabs:
- **Overview**: About card + Best time to visit card.
- **Things to do**: bulleted list with primary-colored bullets.
- **Food**: saffron badge chips for each dish.
- **Travel tips**: bulleted list with accent-colored bullets.

### 4.5 Static Map Preview
- Gradient placeholder block (river / forest / saffron tri-tone, dark-mode aware).
- "Open in Google Maps" outline button → `https://www.google.com/maps/search/?api=1&query=<name>, <district>` in a new tab (`rel="noopener noreferrer"`).

### 4.6 Sidebar (Sticky on Desktop)
- **Local contacts** card: name, role, and `tel:` phone link for each contact.
- **"Need a hand planning?"** secondary CTA card → `/contact`.

### 4.7 Related Places
- Up to 3 other places from the same district rendered as `PlaceCard`s.
- Section hidden when there are no related entries.

---

## 5. Events Page (`/events`)
File: [app/events/page.tsx](app/events/page.tsx)

### 5.1 Header
- Eyebrow "Events" + serif H1 + supporting copy.

### 5.2 Filter Bar
- Free-text search across title, location, description.
- District `Select`: All + 5 districts.
- Month `Select`: "Any month" + 12 months (rendered with `Intl` localization).
- Clear button + idle "{N} upcoming" counter.

### 5.3 Filtering & Sort Logic
- Hides events whose `endDate ?? date` is before the reference "today" (`2026-05-04`).
- Sorts surviving events ascending by start date.

### 5.4 Results
- Empty state with Clear button.
- Responsive 1/2/3 column grid of `EventCard`s.

---

## 6. Plan-a-Trip Page (`/plan`)
File: [app/plan/page.tsx](app/plan/page.tsx)

### 6.1 Header
- Eyebrow + serif H1 ("Trips that respect your time.") + intro copy.

### 6.2 Type Filter Tabs
- Tabs: All, 1-day, Weekend, Budget.

### 6.3 Itinerary Cards Grid
- Each card is an in-page anchor link to its detail block (`#<slug>`).

### 6.4 Itinerary Detail Sections
- For each filtered itinerary, a two-column block:
  - **Left** (sticky on desktop): cover image + type badge, summary card with stats (Duration / Estimate / Stops) and `placesCovered` chips.
  - **Right**: serif heading "The day, hour by hour" + `Timeline` component.
- Smooth-scroll target with `scroll-mt-24` to clear the sticky header.

### 6.5 Timeline Component
- File: [components/timeline.tsx](components/timeline.tsx)
- Vertical dashed left border with numbered circular markers.
- Each stop shows time eyebrow, serif title, detail paragraph.

---

## 7. Food Guide Page (`/food`)
File: [app/food/page.tsx](app/food/page.tsx)

### 7.1 Header
- Eyebrow "Food guide" + serif H1 + intro paragraph.

### 7.2 Filters
- Category tabs: All, Street food, Traditional meals, Seafood, Sweets, Tribal.
- Free-text search across name, location, description (compact `Input` with search icon).

### 7.3 Results
- Responsive 1/2/3/4 column grid of `FoodCard`s.
- Empty state with Clear filters button.

---

## 8. Contact / Ask-a-Local Page (`/contact`)
File: [app/contact/page.tsx](app/contact/page.tsx)

### 8.1 Two-Column Layout
- **Left**: marketing copy with eyebrow, serif H1, intro paragraph, and two trust icons:
  - "Replies in 24–48 hours"
  - "No spam, no upsell"
- **Right**: form card.

### 8.2 Form Fields
- Name (`Input`, required).
- Email or phone (`Input`, required).
- Where are you headed? (`Select` with 5 districts + "Not sure yet").
- Your question (`Textarea`, required).
- Submit button with `Send` icon, full-width, large size.

### 8.3 Submission UX (UI Only)
- 700ms simulated send with disabled "Sending…" button state.
- Success state: checkmark icon, "Got it. Thank you." heading, confirmation paragraph, "Send another message" outline button.
- Disclaimer: "UI-only for now — real backend hook-up coming soon."

---

## 9. Reusable Components

### 9.1 SearchBar
- File: [components/search-bar.tsx](components/search-bar.tsx)
- Two variants: `hero` (large pill with map-pin and Discover button) and `compact` (slim search input).
- On submit: navigates to `/places?q=<term>` (or `/places` if empty).
- Configurable placeholder.

### 9.2 SectionHeading
- File: [components/section-heading.tsx](components/section-heading.tsx)
- Reusable section header with optional eyebrow, title, description, CTA link, and `left | center` alignment.

### 9.3 Cards
- `PlaceCard` ([components/place-card.tsx](components/place-card.tsx)) — color-coded type badge, hover lift + image scale, arrow-up-right hover affordance, district line, "View details" CTA.
- `EventCard` ([components/event-card.tsx](components/event-card.tsx)) — up to 2 saffron tag badges, formatted date range, location + district line.
- `FoodCard` ([components/food-card.tsx](components/food-card.tsx)) — saffron category badge with utensils icon, location line.
- `ItineraryCard` ([components/itinerary-card.tsx](components/itinerary-card.tsx)) — forest type badge, duration / estimate / stops stats grid.
- `SkeletonCard` ([components/skeleton-card.tsx](components/skeleton-card.tsx)) — loading placeholder mirroring card shape with pulse animation.

### 9.4 ImageGallery
- See §4.3.

### 9.5 Timeline
- See §6.5.

### 9.6 shadcn/ui Primitives
Located under [components/ui/](components/ui/):
- `Button` — variant + size system via `class-variance-authority`.
- `Card` — surface container.
- `Input` — text input.
- `Textarea` — multi-line input.
- `Label` — accessible form label (Radix).
- `Select` — dropdown built on `@radix-ui/react-select`.
- `Tabs` — built on `@radix-ui/react-tabs`.
- `DropdownMenu` — built on `@radix-ui/react-dropdown-menu`.
- `Badge` — 7 variants: default, accent, outline, muted, river, forest, saffron (each with light + dark color pairs).

---

## 10. Mock Data Layer
Folder: [data/](data/), types in [lib/types.ts](lib/types.ts)

### 10.1 Places ([data/places.ts](data/places.ts))
- 12 fully populated `Place` records spanning all 5 districts and all 6 types.
- Each place: id, slug, name, district, type, short description, overview, best-time-to-visit, things-to-do list, food-to-try list, travel-tips list, image array, local contacts (name + role + phone), optional `featured` flag.
- Helpers: `getPlaceBySlug(slug)`, `getFeaturedPlaces()`.
- Curated Unsplash imagery library with 15 named keys (river, forest, temple, beach, village, heritage, bridge, paddy, sunset).

### 10.2 Events ([data/events.ts](data/events.ts))
- 9 `Event` records (Antarvedi Kalyanam, Maha Shivaratri at Draksharamam, Pushkar Ghats Lamp Festival, Konaseema Coconut Festival, Annavaram Kalyanotsavam, Sankranti Bhogi & Kanuma, Maredumilli Monsoon Trek Series, Godavari Sangeetha Sammelanam, Kakinada Old-Town Food Walk).
- Each: id, slug, title, ISO date (and optional endDate), location, district, description, image, tags.
- Helper: `getUpcomingEvents(limit?)`.

### 10.3 Food ([data/food.ts](data/food.ts))
- 12 `FoodItem` records across 5 categories (Pulasa Pulusu, Pootharekulu, Kakinada Kaja, Bamboo Chicken, Royyala Iguru, Ulava Charu, Gongura Mamsam, Kobbari Annam, Punugulu, Mirchi Bajji, Korameenu Fry, Bobbatlu).
- Each: id, slug, name, category, location, district, description, image.

### 10.4 Itineraries ([data/itineraries.ts](data/itineraries.ts))
- 5 `Itinerary` records: A Classic Day in Rajamahendravaram (1-day), A Slow Konaseema Weekend, Papikondalu on a Budget, Two-Day Pancharama Temple Trail, Maredumilli — Forest on a Budget.
- Each: id, slug, title, duration, type (`1-day` / `Weekend` / `Budget`), estimated cost, summary, image, ordered `stops[]` (time + title + detail), `placesCovered[]`.
- Helpers: `getItineraryBySlug(slug)`, `getPopularItineraries(limit?)`.

### 10.5 Type System ([lib/types.ts](lib/types.ts))
- `District`, `PlaceType`, `LocalContact`, `Place`, `Event`, `FoodCategory`, `FoodItem`, `ItineraryStop`, `Itinerary`.

### 10.6 Utilities ([lib/utils.ts](lib/utils.ts))
- `cn()` — `clsx` + `tailwind-merge` class merging.
- `formatDate()` — Indian-locale date formatter used by `EventCard`.

---

## 11. UX & Performance Behaviors

- Mobile-first responsive layouts (single column on phone → 2/3/4 columns at `sm`/`md`/`lg`/`xl`).
- Smooth scroll behavior on `<html>`.
- `next/image` everywhere with explicit `sizes` hints and remote Unsplash sources.
- `priority` loading on hero and gallery main image.
- `next/font` self-hosting for Inter and Playfair Display with `display: swap`.
- Skeleton loaders for the places grid (350ms simulated load).
- Hover micro-interactions on cards (lift, shadow, image scale, arrow affordance).
- `animate-fade-in-up` on hero copy.
- Focus-visible rings via `focus-visible:ring-2 focus-visible:ring-ring`.
- Sticky behaviors: header globally, in-page sidebars on `lg+` for place detail and itinerary detail.
- Deep-linking through query params (`/places?q=`, `/places?district=`) and hash anchors (`/plan#<slug>`).
- Date-aware filtering: events page hides past events relative to a fixed reference date (`2026-05-04`) and sorts by start date.

---

## 12. Tech Stack

- **Framework**: Next.js 14.2.15 (App Router).
- **Language**: TypeScript 5.6.
- **Styling**: Tailwind CSS 3.4 with `tailwindcss-animate`.
- **Component library**: shadcn/ui patterns, `class-variance-authority`, `clsx`, `tailwind-merge`.
- **Primitives**: `@radix-ui/react-tabs`, `react-select`, `react-dropdown-menu`, `react-label`, `react-slot`.
- **Icons**: `lucide-react` 0.441.
- **Theming**: `next-themes` 0.3.
- **State**: React hooks only — no Redux/Zustand.
- **Data**: in-memory TypeScript mocks under [data/](data/); no API layer wired up.

---

## 13. Known Gaps / Not-Yet-Implemented

The following appear in the project brief ([CLAUDE.md](CLAUDE.md)) but are not present in the current codebase:

- **Bookmark / favorite UI** — no UI present; brief lists it as optional.
- **Backend integration** — contact form is UI-only, all data is local mocks.
- **About / Privacy pages** — footer links point to `/` (placeholder).
- **Real map** — only a static gradient + Google Maps deep-link; no embedded map widget.
- **Event detail / dynamic event pages** — events are listed only; no `/event/[slug]` route.
- **Food detail pages** — same; food items are listed only.
