import type { Place } from "@/lib/types";

// Curated Unsplash imagery (nature / temple / coastal / village vibe).
// Replace freely once you have original photography.
const img = {
  river1: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop",
  river2: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1600&q=80&auto=format&fit=crop",
  forest1: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80&auto=format&fit=crop",
  forest2: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1600&q=80&auto=format&fit=crop",
  temple1: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=80&auto=format&fit=crop",
  temple2: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&q=80&auto=format&fit=crop",
  temple3: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1600&q=80&auto=format&fit=crop",
  beach1: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop",
  beach2: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&q=80&auto=format&fit=crop",
  village1: "https://images.unsplash.com/photo-1604542030959-1cb98b7d92e0?w=1600&q=80&auto=format&fit=crop",
  village2: "https://images.unsplash.com/photo-1602797244232-e4dde6efb9d8?w=1600&q=80&auto=format&fit=crop",
  heritage1: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80&auto=format&fit=crop",
  bridge: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1600&q=80&auto=format&fit=crop",
  paddy: "https://images.unsplash.com/photo-1530077630330-5cd1bd1a30ad?w=1600&q=80&auto=format&fit=crop",
  sunset: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1600&q=80&auto=format&fit=crop",
};

export const places: Place[] = [
  {
    id: "papikondalu",
    slug: "papikondalu",
    name: "Papikondalu",
    district: "East Godavari",
    type: "river",
    shortDescription:
      "Forested hill ranges hugging the Godavari — best seen from a slow launch boat at golden hour.",
    overview:
      "Papikondalu (literally ‘Papi Hills’) is a stretch of the Eastern Ghats where the Godavari narrows between dense, evergreen ridges. The classic experience is a day-long launch from Rajamahendravaram or Bhadrachalam: the river goes silent, the hills lean in, and the only sound is the chug of the boat and the occasional flute from a tribal hamlet on the bank.",
    bestTime: "October to February — cool air, calm river, clearest skies.",
    thingsToDo: [
      "Day cruise from Rajamahendravaram to Pattiseema",
      "Stop at Perantapalli ashram for filter coffee on the river bank",
      "Lunch on the boat: hot rice, gongura pachadi, fish curry",
      "Sunset photography from the upper deck",
    ],
    foodToTry: ["Pulasa fish curry (in season)", "Bamboo chicken", "Gongura mutton"],
    travelTips: [
      "Carry sunscreen and a light cap — the deck has limited shade",
      "Cruises are seasonal; book a day in advance during peak winter",
      "Network drops in the gorge — download your maps and music",
    ],
    images: [img.river1, img.forest1, img.river2, img.forest2, img.sunset],
    contacts: [
      { name: "APTDC Cruise Desk, Rajamahendravaram", role: "Boat bookings", phone: "+91 88330 11122" },
      { name: "Ravi Anna", role: "Local guide (Telugu/English)", phone: "+91 98480 33112" },
    ],
    featured: true,
  },
  {
    id: "annavaram",
    slug: "annavaram",
    name: "Annavaram",
    district: "East Godavari",
    type: "temple",
    shortDescription:
      "The hilltop abode of Sri Veera Venkata Satyanarayana Swamy — known across Andhra for the Satyanarayana Vratam.",
    overview:
      "Set on the Ratnagiri hill above the Pampa river, Annavaram is one of the most-visited temples in coastal Andhra. Families travel here to perform the Satyanarayana Vratam — a quiet, intimate puja remembered by generations. The hill is approachable by stairs or by ghat road; sunrise from the eastern parapet is genuinely tender.",
    bestTime: "Year-round; weekdays are far calmer than weekends.",
    thingsToDo: [
      "Perform the Satyanarayana Vratam (book a slot in advance)",
      "Walk the 460-step path up Ratnagiri at dawn",
      "Visit Pampa Sarovaram at the foot of the hill",
      "Pick up prasadam and small brass kalashas as keepsakes",
    ],
    foodToTry: ["Pulihora (tamarind rice prasadam)", "Daddojanam (curd rice)", "Filter coffee at the base"],
    travelTips: [
      "Wear traditional attire if you plan the puja — strictly enforced",
      "Carry a small cloth bag for footwear at the temple gate",
      "Stay overnight at AP Tourism’s Haritha for an unhurried morning darshan",
    ],
    images: [img.temple1, img.temple3, img.heritage1, img.sunset],
    contacts: [
      { name: "Annavaram Devasthanam Office", role: "Puja & accommodation", phone: "+91 88683 36500" },
      { name: "Haritha Hotel, AP Tourism", role: "Stay", phone: "+91 88683 35700" },
    ],
    featured: true,
  },
  {
    id: "antarvedi",
    slug: "antarvedi",
    name: "Antarvedi",
    district: "Konaseema",
    type: "temple",
    shortDescription:
      "Where the Vasishta Godavari meets the Bay of Bengal — a quiet temple town wrapped in coconut groves.",
    overview:
      "Antarvedi sits at the sangamam of the Vasishta branch of the Godavari and the sea. The Sri Lakshmi Narasimha Swamy temple here is centuries old; the beach beside it is wide, flat and ideal for slow walks at dusk. The annual Kalyanam in Phalguna draws thousands but the rest of the year you’ll have stretches of sand mostly to yourself.",
    bestTime: "November to February — pleasant breeze and calm sea.",
    thingsToDo: [
      "Darshan at Sri Lakshmi Narasimha Swamy temple",
      "Walk to the sangamam point where river and sea braid together",
      "Sunset on the beach with hot pakodi from the stalls",
      "Coconut grove cycling along the village lanes",
    ],
    foodToTry: ["Crab curry", "Royyala iguru (prawn fry)", "Tender coconut straight from the tree"],
    travelTips: [
      "Carry cash — village eateries rarely use UPI",
      "Watch the tides at the sangamam; lifeguards are scarce",
      "Combine with a Konaseema houseboat the next morning",
    ],
    images: [img.beach1, img.temple2, img.village1, img.sunset, img.beach2],
    contacts: [
      { name: "Antarvedi Temple Office", role: "Darshan & sevas", phone: "+91 88625 52349" },
      { name: "Konaseema Cabs", role: "Transport from Amalapuram", phone: "+91 99852 11220" },
    ],
    featured: true,
  },
  {
    id: "draksharamam",
    slug: "draksharamam",
    name: "Draksharamam",
    district: "East Godavari",
    type: "temple",
    shortDescription:
      "One of the Pancharama Kshetras — a granite-and-time temple where devotion feels heavier than air.",
    overview:
      "The Bhimeswara Swamy temple at Draksharamam is among the five sacred Shiva shrines (Pancharamas) of the Telugu lands. The two-storey sanctum and the surrounding stone corridors are quietly imposing; you can hear the soft slap of bare feet on cool stone long before you see anyone. It’s a temple to be lingered at — not photographed in a hurry.",
    bestTime: "Maha Shivaratri week and the cool months between November and February.",
    thingsToDo: [
      "Circumambulate the inner prakaram twice — slowly",
      "Visit the Saptha Godavari Koneru (sacred tank)",
      "Pause at the smaller shrines around the perimeter",
      "Speak to the temple priests about the Pancharama legend",
    ],
    foodToTry: ["Pulihora prasadam", "Garelu and upma at the morning stalls"],
    travelTips: [
      "Photography inside the sanctum is restricted",
      "Dress modestly — shoulders and knees covered",
      "Pair with Ramachandrapuram for a half-day temple loop",
    ],
    images: [img.temple1, img.temple3, img.heritage1, img.village1],
    contacts: [
      { name: "Draksharamam Temple Office", role: "Sevas & queries", phone: "+91 88575 23210" },
    ],
  },
  {
    id: "maredumilli",
    slug: "maredumilli",
    name: "Maredumilli",
    district: "East Godavari",
    type: "nature",
    shortDescription:
      "A cool, green pocket of the Eastern Ghats — bamboo chicken, waterfalls, and the slow, careful quiet of a forest.",
    overview:
      "Maredumilli is the Godavari you don’t expect — pine-fresh air, narrow ghat roads, tribal hamlets, and a forest that hums with cicadas long after dusk. The eco-tourism camps here are basic but lovely; the bamboo chicken (chicken cooked inside a green bamboo over open coals) is the meal you’ll talk about for months.",
    bestTime: "July to February — monsoon for waterfalls, winter for trekking.",
    thingsToDo: [
      "Visit Jalatarangini and Amruthadhara waterfalls",
      "Eat bamboo chicken at the forest camp kitchens",
      "Trek the short Valamuru nature trail with a Forest Dept. guide",
      "Stay overnight at the eco camp — wake to birdcalls",
    ],
    foodToTry: ["Bamboo chicken", "Pachi pulusu (raw tamarind rasam)", "Forest honey on hot rotis"],
    travelTips: [
      "Last fuel pump is at Rampachodavaram — top up there",
      "Carry warm layers — the forest gets surprisingly cold at night",
      "Eco-camp bookings should be confirmed by phone, not just online",
    ],
    images: [img.forest1, img.forest2, img.village2, img.river2],
    contacts: [
      { name: "Maredumilli Eco Tourism", role: "Camp bookings", phone: "+91 94910 24668" },
      { name: "Forest Range Office", role: "Trek permissions", phone: "+91 88573 23044" },
    ],
    featured: true,
  },
  {
    id: "konaseema-backwaters",
    slug: "konaseema-backwaters",
    name: "Konaseema Backwaters",
    district: "Konaseema",
    type: "village",
    shortDescription:
      "Coconut-fringed canals, lazy houseboats, and a way of life that has not been in a hurry for two hundred years.",
    overview:
      "Often called the ‘Kerala of Andhra’, Konaseema is a delta of the Godavari laced with palm groves, paddy fields and slow brackish canals. The villages — Dindi, Razole, Mukteswaram — are quietly photogenic; mornings begin with temple bells and end with the smell of woodsmoke and frying chillies.",
    bestTime: "October to March — humidity drops, canals look glassy.",
    thingsToDo: [
      "Stay overnight on a houseboat at Dindi",
      "Cycle through the coconut groves at sunrise",
      "Visit Mukteswaram and Ainavilli temples",
      "Take a country boat ride through narrow canals",
    ],
    foodToTry: ["Ulava charu (horsegram broth)", "Pootharekulu", "Konaseema fish curry"],
    travelTips: [
      "Houseboats book out for weekends — plan ahead",
      "Mosquito repellent is non-negotiable after dark",
      "Cash is king at village stalls; ATM density is low",
    ],
    images: [img.river2, img.village1, img.village2, img.paddy, img.sunset],
    contacts: [
      { name: "Coconut Country Houseboats, Dindi", role: "Stays", phone: "+91 99496 51122" },
      { name: "Razole Tourism Desk", role: "Boat & cycle hire", phone: "+91 88564 22117" },
    ],
    featured: true,
  },
  {
    id: "rajamahendravaram",
    slug: "rajamahendravaram",
    name: "Rajamahendravaram",
    district: "East Godavari",
    type: "heritage",
    shortDescription:
      "The cultural capital of the Telugus — Nannaya’s town, the Godavari arch bridge, and an evening promenade you’ll remember.",
    overview:
      "Rajamahendravaram (Rajahmundry) is where Andhra’s literary and musical heart still beats. Adi Kavi Nannaya translated the Mahabharata here; the Pushkar Ghats turn into a small festival every twelve years. Pushkar Park at sunset, with the road–rail bridge framing the river, is the kind of view that makes locals quietly proud.",
    bestTime: "October to February; Godavari Pushkaralu (every 12 years) is a once-in-a-generation experience.",
    thingsToDo: [
      "Walk the Pushkar Ghats at sunset",
      "Visit ISKCON and the Markandeya temple",
      "See the road–rail bridges from the Kotipalli bus stand viewpoint",
      "Day trip to Kadiyapulanka nursery village (the ‘plant town’)",
    ],
    foodToTry: ["Pulasa pulusu (in season, June–August)", "Pootharekulu from Atreyapuram", "Filter coffee at Sai Ram cafés"],
    travelTips: [
      "Trains to Rajahmundry junction are frequent and reliable",
      "Saturdays bring weekend crowds at the ghats — go on a weekday",
      "Boats from Bhadrachalam Road jetty operate seasonally",
    ],
    images: [img.bridge, img.river1, img.heritage1, img.village1, img.sunset],
    contacts: [
      { name: "APTDC Rajahmundry", role: "Tours & cruises", phone: "+91 88330 11122" },
      { name: "Sri Lakshmi Travels", role: "City cabs", phone: "+91 99634 22189" },
    ],
  },
  {
    id: "pattiseema",
    slug: "pattiseema",
    name: "Pattiseema",
    district: "West Godavari",
    type: "river",
    shortDescription:
      "A small island temple where the Godavari turns dramatic — a lovely lunch stop on the Papikondalu cruise.",
    overview:
      "Pattiseema is a small hilltop temple to Sri Veerabhadra Swamy, set on an island that the Godavari curls around. The cruise boats from Rajamahendravaram pause here for darshan and lunch; on a clear afternoon you can see the river plunging towards Polavaram in the distance.",
    bestTime: "November to February.",
    thingsToDo: [
      "Climb the short stairway to the temple",
      "Lunch on banana leaves under the rain trees",
      "Photograph the Papikondalu range from the western edge",
      "Watch the lift-irrigation pump house from the viewpoint",
    ],
    foodToTry: ["Banana leaf meals", "Hot vada and chutney at the temple stall"],
    travelTips: [
      "Footwear stalls at the jetty cost ₹10 — keep small change",
      "The climb is steep but short; older travellers can use the side path",
      "Plastic is restricted on the island",
    ],
    images: [img.river1, img.temple3, img.river2, img.forest1],
    contacts: [
      { name: "Pattiseema Devasthanam", role: "Darshan info", phone: "+91 88198 23110" },
    ],
  },
  {
    id: "kakinada-beach",
    slug: "kakinada-beach",
    name: "Kakinada Beach Road",
    district: "Kakinada",
    type: "beach",
    shortDescription:
      "The longest beach promenade on the Andhra coast — sea breeze, masala corn, and one of India’s prettiest port skylines after dark.",
    overview:
      "Kakinada’s beach road is wide, palm-lined and surprisingly under-rated. Evenings here are a small ritual: families on the lawns, kids on the small Ferris wheels, vendors selling roasted corn and karam mixture. The deep-water port lights up after dusk, and the sea is calm enough for long walks even in the warmer months.",
    bestTime: "Year-round, evenings are best between 5 and 8 pm.",
    thingsToDo: [
      "Walk the 8-km beach road promenade",
      "Try Kakinada Kaja from Kotaiah Sweets (a local institution)",
      "Day trip to Hope Island via the Kakinada port jetty",
      "Eat seafood at the small lanes off Beach Road",
    ],
    foodToTry: ["Kakinada Kaja", "Royyala vepudu (prawn fry)", "Pootharekulu", "Karam mixture"],
    travelTips: [
      "Hope Island boats run only in good weather — check the morning of",
      "Beach is unguarded; deeper currents past sundown",
      "Saturday evenings are the busiest",
    ],
    images: [img.beach2, img.beach1, img.sunset, img.river1],
    contacts: [
      { name: "Kakinada Beach Watch", role: "Tourism info", phone: "+91 88420 22118" },
      { name: "Hope Island Boats", role: "Day trips", phone: "+91 99488 36621" },
    ],
  },
  {
    id: "pithapuram",
    slug: "pithapuram",
    name: "Pithapuram",
    district: "Kakinada",
    type: "temple",
    shortDescription:
      "The Padagaya Kshetram — a quiet, deeply atmospheric temple town tied to Sri Datta and the Kuntimadhava Swamy shrine.",
    overview:
      "Pithapuram is one of the eighteen Maha Shakti Peethas (Puruhutika Devi) and is also revered as the birthplace of Sri Pada Sri Vallabha. The Kukkuteswara Swamy temple, the Pada Gaya pushkarini and the small Datta Mahasamsthanam together form an unhurried half-day pilgrimage that most travellers miss.",
    bestTime: "November to February; Datta Jayanti in December is special.",
    thingsToDo: [
      "Darshan at Kukkuteswara Swamy and Puruhutika Devi",
      "Pind pradaan at Pada Gaya Sarovaram (priests guide the ritual)",
      "Visit Sri Pada Sri Vallabha Mahasamsthanam",
      "Walk the old streets behind the temple — beautiful traditional houses",
    ],
    foodToTry: ["Pulihora prasadam", "Bobbatlu at Sankranti time", "Filter coffee at the small temple cafés"],
    travelTips: [
      "Pada Gaya rituals require advance booking with a temple priest",
      "Wear traditional attire to access the inner sanctum",
      "Best clubbed with Annavaram (45 minutes away)",
    ],
    images: [img.temple3, img.heritage1, img.temple1, img.village2],
    contacts: [
      { name: "Sri Pada Sri Vallabha Mahasamsthanam", role: "Sevas & accommodation", phone: "+91 88598 22202" },
    ],
  },
  {
    id: "kolleru-lake",
    slug: "kolleru-lake",
    name: "Kolleru Lake",
    district: "Eluru",
    type: "nature",
    shortDescription:
      "One of India’s largest freshwater lakes — a winter home for painted storks, pelicans and patient bird-watchers.",
    overview:
      "Kolleru sits between the Krishna and Godavari deltas, fed by their seasonal flows. Between November and March, the wetlands fill with migratory birds — Siberian cranes, openbill storks, glossy ibis. The Atapaka Bird Sanctuary on the eastern fringe is the easiest entry; bring binoculars and a slow morning.",
    bestTime: "November to February — peak bird migration.",
    thingsToDo: [
      "Bird-watching at Atapaka and Kaikaluru sanctuaries",
      "Country boat ride into the wetland channels",
      "Sunrise photography from the watchtower",
      "Visit the small fishing villages along the lake bund",
    ],
    foodToTry: ["Fresh-water fish curry", "Korameenu (pearl spot) fry", "Aaku pacchadi with hot rice"],
    travelTips: [
      "Carry binoculars and a long lens — birds are skittish",
      "Wear neutrals; bright colours scare flocks away",
      "Boats are best arranged through the Forest Dept. office",
    ],
    images: [img.river2, img.paddy, img.forest2, img.sunset],
    contacts: [
      { name: "Atapaka Sanctuary Office", role: "Boat & permits", phone: "+91 88123 24456" },
    ],
  },
  {
    id: "ainavilli",
    slug: "ainavilli",
    name: "Ainavilli Ganapati Temple",
    district: "Konaseema",
    type: "temple",
    shortDescription:
      "A small but deeply loved Vinayaka temple tucked among the Konaseema paddies — a must on any temple loop.",
    overview:
      "Sri Siddhi Vinayaka Swamy at Ainavilli is among the older Ganapati shrines of coastal Andhra. The temple is small, the queues are friendly, and the surrounding paddy fields glow gold at golden hour. A favourite first stop on weddings and naming ceremonies for families across the two Godavaris.",
    bestTime: "Year-round, especially Sankashti Chaturthi.",
    thingsToDo: [
      "Sankalpa puja for new beginnings",
      "Walk the small village lanes around the temple",
      "Pair with Mukteswaram and Antarvedi for a one-day Konaseema circuit",
    ],
    foodToTry: ["Modakam prasadam", "Pulihora", "Hot bondas at the temple gate"],
    travelTips: [
      "Mornings are calmest; weekends fill up with wedding parties",
      "Photography inside is allowed but flash is not",
    ],
    images: [img.temple2, img.paddy, img.village1, img.temple3],
    contacts: [
      { name: "Ainavilli Devasthanam", role: "Pujas & sevas", phone: "+91 88564 24412" },
    ],
  },
];

export const getPlaceBySlug = (slug: string) => places.find((p) => p.slug === slug);
export const getFeaturedPlaces = () => places.filter((p) => p.featured);
