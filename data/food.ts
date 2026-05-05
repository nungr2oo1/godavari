import type { FoodItem } from "@/lib/types";

const img = {
  curry: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=1200&q=80&auto=format&fit=crop",
  thali: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=1200&q=80&auto=format&fit=crop",
  street: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=80&auto=format&fit=crop",
  sweets: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1200&q=80&auto=format&fit=crop",
  fish: "https://images.unsplash.com/photo-1611599538835-b69d7e5497a8?w=1200&q=80&auto=format&fit=crop",
  prawns: "https://images.unsplash.com/photo-1625944525200-f3e4dde36ed7?w=1200&q=80&auto=format&fit=crop",
  bamboo: "https://images.unsplash.com/photo-1604908554049-29c0e3c8e2d4?w=1200&q=80&auto=format&fit=crop",
  rice: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=80&auto=format&fit=crop",
  chai: "https://images.unsplash.com/photo-1571115332113-0289d49d9c41?w=1200&q=80&auto=format&fit=crop",
};

export const food: FoodItem[] = [
  {
    id: "pulasa-pulusu",
    slug: "pulasa-pulusu",
    name: "Pulasa Pulusu",
    category: "Seafood",
    location: "Rajamahendravaram & Konaseema",
    district: "East Godavari",
    description:
      "‘Pustelu ammi ayina pulasa tinali’ — even if you have to sell your wedding chain, eat pulasa. The legendary monsoon Hilsa of the Godavari, slow-cooked in tamarind, gongura and patience. June through August only.",
    image: img.fish,
  },
  {
    id: "pootharekulu",
    slug: "pootharekulu",
    name: "Pootharekulu",
    category: "Sweets",
    location: "Atreyapuram village",
    district: "East Godavari",
    description:
      "Paper-thin rice starch sheets, layered with ghee, powdered sugar and crushed dry fruits. Made by hand in Atreyapuram for over a century — light enough to carry home, generous enough to share.",
    image: img.sweets,
  },
  {
    id: "kakinada-kaja",
    slug: "kakinada-kaja",
    name: "Kakinada Kaja",
    category: "Sweets",
    location: "Kotaiah Sweets, Kakinada",
    district: "Kakinada",
    description:
      "Layered, flaky pastry soaked in sugar syrup until each fold drinks its fill. The original Kotaiah shop on Main Road has been making them the same way since 1891.",
    image: img.sweets,
  },
  {
    id: "bamboo-chicken",
    slug: "bamboo-chicken",
    name: "Bamboo Chicken",
    category: "Tribal",
    location: "Maredumilli forest camps",
    district: "East Godavari",
    description:
      "Marinated chicken stuffed inside a green bamboo stem and slow-roasted over an open wood fire. Served with hot rice and forest leaf chutney. The smoke is part of the recipe.",
    image: img.bamboo,
  },
  {
    id: "royyala-iguru",
    slug: "royyala-iguru",
    name: "Royyala Iguru",
    category: "Seafood",
    location: "Kakinada coastal lanes",
    district: "Kakinada",
    description:
      "Plump prawns roasted dry with red chillies, curry leaves and a generous hand of garlic. Best eaten with hot rice and a side of mango pickle.",
    image: img.prawns,
  },
  {
    id: "ulavacharu",
    slug: "ulavacharu",
    name: "Ulava Charu",
    category: "Traditional meals",
    location: "Konaseema homes & Subbayya Hotel, Kakinada",
    district: "Konaseema",
    description:
      "A slow-simmered horsegram broth — earthy, slightly sweet, and revered in Konaseema kitchens. Traditionally paired with a spoon of cream and a hot rice mound.",
    image: img.curry,
  },
  {
    id: "gongura-mamsam",
    slug: "gongura-mamsam",
    name: "Gongura Mamsam",
    category: "Traditional meals",
    location: "Across both Godavaris",
    district: "East Godavari",
    description:
      "Sour-leaf gongura cooked with mutton until the flavours fold into each other. The Andhra classic — what every aunt at every wedding makes a little differently.",
    image: img.curry,
  },
  {
    id: "kobbari-annam",
    slug: "kobbari-annam",
    name: "Kobbari Annam",
    category: "Traditional meals",
    location: "Konaseema",
    district: "Konaseema",
    description:
      "Coconut rice the way Konaseema makes it — fresh-grated coconut, urad dal, curry leaves, a hint of asafoetida, and the creaminess of just-pressed coconut milk.",
    image: img.rice,
  },
  {
    id: "punugulu",
    slug: "punugulu",
    name: "Punugulu",
    category: "Street food",
    location: "Beach Road, Kakinada",
    district: "Kakinada",
    description:
      "Crispy fritters made from leftover idli/dosa batter, fried golden and served with hot allam pachadi (ginger chutney). The official 6 p.m. snack of the Andhra coast.",
    image: img.street,
  },
  {
    id: "mirchi-bajji",
    slug: "mirchi-bajji",
    name: "Mirchi Bajji",
    category: "Street food",
    location: "Pushkar Ghats, Rajamahendravaram",
    district: "East Godavari",
    description:
      "Long green chillies dipped in besan, fried, slit, and stuffed with tamarind-onion masala. Perfect with filter coffee on a cool ghat evening.",
    image: img.street,
  },
  {
    id: "korameenu-fry",
    slug: "korameenu-fry",
    name: "Korameenu Fry",
    category: "Seafood",
    location: "Kolleru lake-side dhabas, Eluru",
    district: "Eluru",
    description:
      "Pearl-spot fish, marinated in red chilli, ginger and garlic, then shallow-fried whole. Sweet, white, flaky meat — peak Kolleru cuisine.",
    image: img.fish,
  },
  {
    id: "bobbatlu",
    slug: "bobbatlu",
    name: "Bobbatlu",
    category: "Sweets",
    location: "Sankranti homes across the deltas",
    district: "West Godavari",
    description:
      "Stuffed flatbread of jaggery and chana dal, ghee-roasted till the crust is lacy and gold. Sankranti without a stack of bobbatlu would not be Sankranti at all.",
    image: img.sweets,
  },
];
