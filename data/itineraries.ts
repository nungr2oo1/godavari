import type { Itinerary } from "@/lib/types";

const img = {
  river: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop",
  village: "https://images.unsplash.com/photo-1604542030959-1cb98b7d92e0?w=1600&q=80&auto=format&fit=crop",
  forest: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80&auto=format&fit=crop",
  beach: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&q=80&auto=format&fit=crop",
  bridge: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1600&q=80&auto=format&fit=crop",
  temple: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=80&auto=format&fit=crop",
};

export const itineraries: Itinerary[] = [
  {
    id: "rajahmundry-classic-day",
    slug: "rajahmundry-classic-day",
    title: "A Classic Day in Rajamahendravaram",
    duration: "1 day · 8 hours",
    type: "1-day",
    estimatedCost: "₹1,200 – ₹1,800 / person",
    summary:
      "Wake up to the river, wander Pushkar Ghats, taste pootharekulu in the village they were born in, and end at the road–rail bridge at golden hour.",
    image: img.bridge,
    placesCovered: ["Pushkar Ghats", "ISKCON Rajahmundry", "Atreyapuram", "Kotipalli viewpoint"],
    stops: [
      { time: "6:30 AM", title: "Sunrise at Pushkar Ghats", detail: "Walk the steps as the river turns silver. Hot coffee from the small ghat-side stalls." },
      { time: "8:30 AM", title: "Breakfast at Sai Ram Café", detail: "Idli, ghee podi and one filter coffee that will set the mood for the day." },
      { time: "10:00 AM", title: "ISKCON & Markandeya Temple", detail: "Quiet morning darshan and a slow walk through the temple lanes." },
      { time: "12:00 PM", title: "Atreyapuram Pootharekulu", detail: "Watch the rice paper being made by hand on a hot earthen tawa. Buy a box." },
      { time: "2:00 PM", title: "Andhra meals at Subbayya Hotel", detail: "Banana leaf, gongura mamsam, ulava charu — the canonical Konaseema meal." },
      { time: "4:30 PM", title: "Damerla Rama Rao Art Gallery", detail: "An unhurried hour with the works of one of Andhra’s most loved early painters." },
      { time: "6:00 PM", title: "Sunset at the Road–Rail Bridge", detail: "From the Kotipalli bus stand viewpoint, watch trains crawl across the second-longest road–rail bridge in India." },
      { time: "8:00 PM", title: "Mirchi bajji on the ghats", detail: "End the day where you started — but with chillies and a cup of chai this time." },
    ],
  },
  {
    id: "konaseema-weekend",
    slug: "konaseema-weekend",
    title: "A Slow Konaseema Weekend",
    duration: "2 days · 1 night",
    type: "Weekend",
    estimatedCost: "₹4,500 – ₹6,500 / person",
    summary:
      "Houseboat on the backwaters, dawn cycle through coconut groves, temple-loop in the afternoon — and a sunset at Antarvedi where the river meets the sea.",
    image: img.village,
    placesCovered: ["Dindi", "Mukteswaram", "Ainavilli", "Antarvedi"],
    stops: [
      { time: "Day 1 · 11:00 AM", title: "Check in at Dindi Houseboat", detail: "Board your houseboat at the Dindi resort. Welcome drink: tender coconut." },
      { time: "Day 1 · 1:00 PM", title: "Konaseema lunch on board", detail: "Ulava charu, kobbari annam, korameenu fry, gongura pachadi." },
      { time: "Day 1 · 4:00 PM", title: "Country boat ride", detail: "Down the narrow palm-lined canals where bigger boats can’t reach." },
      { time: "Day 1 · 6:30 PM", title: "Sunset on the deck", detail: "Tea, fritters, and an unhurried hour as the sky turns saffron." },
      { time: "Day 2 · 6:00 AM", title: "Cycle through coconut groves", detail: "Borrow bicycles from the resort. The light at this hour is the whole point." },
      { time: "Day 2 · 9:00 AM", title: "Mukteswaram & Ainavilli temples", detail: "Two of Konaseema’s most loved smaller shrines." },
      { time: "Day 2 · 1:00 PM", title: "Lunch at a Razole village mess", detail: "Locals only know it. Ask for the meals plate." },
      { time: "Day 2 · 5:00 PM", title: "Antarvedi sangamam", detail: "Watch the Vasishta Godavari pour into the Bay of Bengal at dusk." },
    ],
  },
  {
    id: "papikondalu-budget",
    slug: "papikondalu-budget-cruise",
    title: "Papikondalu on a Budget",
    duration: "1 day · 12 hours",
    type: "Budget",
    estimatedCost: "₹1,500 – ₹2,200 / person",
    summary:
      "The complete Papikondalu launch experience — including transfers, lunch on board, two riverside stops and a sunset return to Rajamahendravaram.",
    image: img.river,
    placesCovered: ["Rajamahendravaram jetty", "Perantapalli", "Pattiseema", "Papikondalu gorge"],
    stops: [
      { time: "6:30 AM", title: "Pickup from your hotel", detail: "APTDC bus to the Bhadrachalam Road jetty." },
      { time: "8:00 AM", title: "Boarding & breakfast on the boat", detail: "Idli, vada, hot coffee. Find a seat on the upper deck." },
      { time: "10:30 AM", title: "Pattiseema temple stop", detail: "Short climb, brief darshan, photographs of the Papikondalu approach." },
      { time: "1:00 PM", title: "Lunch on banana leaves", detail: "Vegetarian Andhra meals served on board." },
      { time: "3:00 PM", title: "Perantapalli ashram & swim", detail: "An hour at the riverside ashram. Coffee, calm, and a quick dip if the river is gentle." },
      { time: "6:00 PM", title: "Return cruise — sunset deck", detail: "The hills go indigo. The river goes pink. Nobody talks much." },
      { time: "7:30 PM", title: "Drop back at Rajahmundry", detail: "Bus drops you at the city. Mirchi bajji on the ghats if you still have room." },
    ],
  },
  {
    id: "temple-trail-2-day",
    slug: "temple-trail-2-day",
    title: "Two-Day Pancharama Temple Trail",
    duration: "2 days · 1 night",
    type: "Weekend",
    estimatedCost: "₹3,500 – ₹5,000 / person",
    summary:
      "Annavaram, Pithapuram and Draksharamam in two unhurried days — three of the most spiritually charged temple towns of the East Godavari.",
    image: img.temple,
    placesCovered: ["Annavaram", "Pithapuram", "Draksharamam"],
    stops: [
      { time: "Day 1 · 6:00 AM", title: "Sunrise darshan at Annavaram", detail: "Climb Ratnagiri before the queues. The eastern parapet at first light is special." },
      { time: "Day 1 · 11:00 AM", title: "Satyanarayana Vratam", detail: "Pre-book a slot. Traditional attire is required." },
      { time: "Day 1 · 3:00 PM", title: "Drive to Pithapuram", detail: "Lunch en route at a Tuni mess." },
      { time: "Day 1 · 5:30 PM", title: "Sri Pada Sri Vallabha darshan", detail: "Evening aarti at the Mahasamsthanam." },
      { time: "Day 2 · 7:00 AM", title: "Pada Gaya Sarovaram", detail: "Pind pradaan rituals with a temple priest (book the day before)." },
      { time: "Day 2 · 11:00 AM", title: "Drive to Draksharamam", detail: "About 90 minutes through paddy country." },
      { time: "Day 2 · 1:00 PM", title: "Bhimeswara Swamy darshan", detail: "Walk the inner prakaram twice — slowly. This is the kind of temple to be lingered at." },
      { time: "Day 2 · 4:00 PM", title: "Filter coffee in old Ramachandrapuram", detail: "An honest cup of South Indian coffee before the drive home." },
    ],
  },
  {
    id: "maredumilli-forest-budget",
    slug: "maredumilli-forest-budget",
    title: "Maredumilli — Forest on a Budget",
    duration: "2 days · 1 night",
    type: "Budget",
    estimatedCost: "₹2,800 – ₹3,800 / person",
    summary:
      "Bus to Rampachodavaram, shared jeep to Maredumilli, eco-camp tents, two waterfalls and the famous bamboo chicken — for the price of a city dinner.",
    image: img.forest,
    placesCovered: ["Rampachodavaram", "Jalatarangini Falls", "Amruthadhara Falls", "Valamuru trail"],
    stops: [
      { time: "Day 1 · 7:00 AM", title: "APSRTC bus to Rampachodavaram", detail: "From Rajahmundry RTC complex. About 3 hours, ₹150." },
      { time: "Day 1 · 11:00 AM", title: "Shared jeep to Maredumilli", detail: "Park yourself at the Forest Dept. eco-camp." },
      { time: "Day 1 · 1:00 PM", title: "Bamboo chicken lunch", detail: "Slow-cooked in green bamboo at the camp kitchen." },
      { time: "Day 1 · 4:00 PM", title: "Jalatarangini Falls", detail: "Short trail, layered cascades, refreshing water." },
      { time: "Day 1 · 8:00 PM", title: "Bonfire & tribal music", detail: "Optional camp activity. Worth staying up for." },
      { time: "Day 2 · 7:00 AM", title: "Valamuru nature trail", detail: "Forest Department guide, ~2 hours, easy gradient." },
      { time: "Day 2 · 12:00 PM", title: "Amruthadhara Falls", detail: "Bigger, taller, louder. Carry a change of clothes." },
      { time: "Day 2 · 4:00 PM", title: "Return to Rajahmundry", detail: "Same shared jeep + bus combo. Home before dark." },
    ],
  },
];

export const getItineraryBySlug = (slug: string) =>
  itineraries.find((i) => i.slug === slug);
export const getPopularItineraries = (limit?: number) =>
  typeof limit === "number" ? itineraries.slice(0, limit) : itineraries;
