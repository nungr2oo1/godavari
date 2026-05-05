import type { Event } from "@/lib/types";

const img = {
  festival1: "https://images.unsplash.com/photo-1604608672516-f1b9b1d1f4a2?w=1600&q=80&auto=format&fit=crop",
  festival2: "https://images.unsplash.com/photo-1609257860007-cf3b2cba7d18?w=1600&q=80&auto=format&fit=crop",
  temple: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&q=80&auto=format&fit=crop",
  river: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop",
  village: "https://images.unsplash.com/photo-1604542030959-1cb98b7d92e0?w=1600&q=80&auto=format&fit=crop",
  food: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=1600&q=80&auto=format&fit=crop",
  music: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80&auto=format&fit=crop",
};

export const events: Event[] = [
  {
    id: "antarvedi-kalyanam",
    slug: "antarvedi-kalyanam-2026",
    title: "Antarvedi Sri Lakshmi Narasimha Swamy Kalyanam",
    date: "2026-03-04",
    endDate: "2026-03-08",
    location: "Antarvedi",
    district: "Konaseema",
    description:
      "The annual divine wedding of Sri Lakshmi Narasimha Swamy. Five days of processions, sea-side abhishekams and the whole town smelling of jasmine, ghee lamps and fried snacks.",
    image: img.temple,
    tags: ["Temple festival", "Family"],
  },
  {
    id: "draksharama-shivaratri",
    slug: "draksharama-shivaratri-2026",
    title: "Maha Shivaratri at Draksharamam",
    date: "2026-02-15",
    location: "Draksharamam",
    district: "East Godavari",
    description:
      "Night-long abhishekams to Bhimeswara Swamy, recitations of the Rudram in the inner prakaram, and the cool stone of the temple under your feet at 3 a.m. — one of the Pancharama Kshetras at its most devout.",
    image: img.temple,
    tags: ["Temple festival", "Spiritual"],
  },
  {
    id: "rajamahendravaram-pushkar-utsav",
    slug: "rajamahendravaram-pushkar-utsav-2026",
    title: "Pushkar Ghats Lamp Festival",
    date: "2026-11-04",
    endDate: "2026-11-05",
    location: "Pushkar Ghats, Rajamahendravaram",
    district: "East Godavari",
    description:
      "Karthika Pournami evening at the ghats — thousands of small lamps floated downstream as families chant slokas. Quiet, gentle, and unforgettable. Arrive by 5 p.m. for a good spot.",
    image: img.river,
    tags: ["Karthika Masam", "Riverside"],
  },
  {
    id: "konaseema-coconut-fest",
    slug: "konaseema-coconut-festival-2026",
    title: "Konaseema Coconut Festival",
    date: "2026-12-12",
    endDate: "2026-12-14",
    location: "Amalapuram",
    district: "Konaseema",
    description:
      "A three-day celebration of all things coconut — toddy tappers’ contests, coconut-leaf weaving, traditional Konaseema cuisine demos, and a cycling tour of the palm groves.",
    image: img.village,
    tags: ["Cultural", "Food"],
  },
  {
    id: "annavaram-kalyanotsavam",
    slug: "annavaram-kalyanotsavam-2026",
    title: "Annavaram Kalyanotsavam",
    date: "2026-04-11",
    location: "Annavaram",
    district: "East Godavari",
    description:
      "The Kalyanotsavam of Sri Veera Venkata Satyanarayana Swamy. Devotees from across Andhra and Telangana climb Ratnagiri before dawn; the puja-priests chant for hours, the air smells of ghee and incense.",
    image: img.temple,
    tags: ["Temple festival", "Spiritual"],
  },
  {
    id: "godavari-sankranti",
    slug: "godavari-sankranti-2026",
    title: "Godavari Sankranti — Bhogi & Kanuma",
    date: "2026-01-13",
    endDate: "2026-01-16",
    location: "Across both Godavari districts",
    district: "East Godavari",
    description:
      "The biggest harvest festival of coastal Andhra. Muggu (rangoli) on every doorstep, Gangireddu performers in the streets, kite competitions on the terraces, and bobbatlu by the kilo. The villages of Konaseema are especially beautiful.",
    image: img.festival2,
    tags: ["Harvest", "Cultural"],
  },
  {
    id: "maredumilli-monsoon-trek",
    slug: "maredumilli-monsoon-trek-2026",
    title: "Maredumilli Monsoon Trek Series",
    date: "2026-08-08",
    endDate: "2026-08-10",
    location: "Maredumilli",
    district: "East Godavari",
    description:
      "Forest Department–led monsoon treks through Valamuru and Jalatarangini. Slippery, glorious, and ending with hot bamboo chicken at the eco camp.",
    image: img.village,
    tags: ["Adventure", "Nature"],
  },
  {
    id: "rajamahendri-music-fest",
    slug: "rajamahendri-music-fest-2026",
    title: "Godavari Sangeetha Sammelanam",
    date: "2026-09-19",
    endDate: "2026-09-21",
    location: "Rajamahendravaram",
    district: "East Godavari",
    description:
      "A three-day Carnatic music festival on the banks of the Godavari, hosted in the historic Damerla Rama Rao Art Gallery. Tickets are free; arrive an hour early.",
    image: img.music,
    tags: ["Music", "Cultural"],
  },
  {
    id: "kakinada-food-walk",
    slug: "kakinada-monthly-food-walk",
    title: "Kakinada Old-Town Food Walk",
    date: "2026-05-23",
    location: "Kakinada Old Town",
    district: "Kakinada",
    description:
      "A monthly community food walk through Kakinada’s old market lanes — Kotaiah Kaja, hot karam mixture, port-side prawn fry. Hosted on the third Saturday of every month.",
    image: img.food,
    tags: ["Food", "Walk"],
  },
];

export const getUpcomingEvents = (limit?: number) => {
  const today = new Date("2026-05-04");
  const sorted = [...events]
    .filter((e) => new Date(e.endDate ?? e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
};
