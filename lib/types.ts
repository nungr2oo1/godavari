export type District = "East Godavari" | "West Godavari" | "Konaseema" | "Eluru" | "Kakinada";

export type PlaceType = "nature" | "temple" | "beach" | "village" | "heritage" | "river";

export type LocalContact = {
  name: string;
  role: string;
  phone: string;
};

export type Place = {
  id: string;
  slug: string;
  name: string;
  district: District;
  type: PlaceType;
  shortDescription: string;
  overview: string;
  bestTime: string;
  thingsToDo: string[];
  foodToTry: string[];
  travelTips: string[];
  images: string[];
  contacts: LocalContact[];
  featured?: boolean;
};

export type Event = {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO
  endDate?: string;
  location: string;
  district: District;
  description: string;
  image: string;
  tags: string[];
};

export type FoodCategory = "Street food" | "Traditional meals" | "Seafood" | "Sweets" | "Tribal";

export type FoodItem = {
  id: string;
  slug: string;
  name: string;
  category: FoodCategory;
  location: string;
  district: District;
  description: string;
  image: string;
};

export type ItineraryStop = {
  time: string;
  title: string;
  detail: string;
};

export type Itinerary = {
  id: string;
  slug: string;
  title: string;
  duration: string;
  type: "1-day" | "Weekend" | "Budget";
  estimatedCost: string;
  summary: string;
  image: string;
  stops: ItineraryStop[];
  placesCovered: string[];
};

export type UserRole = "traveler" | "partner" | "admin";

export type LeadStatus = "new" | "contacted" | "closed";

export type Lead = {
  id: string;
  userId?: string;
  userName: string;
  userPhone: string;
  placeId?: string;
  placeName?: string;
  contactName?: string;
  message: string;
  createdAt: string; // ISO
  status: LeadStatus;
};

export type ServiceType = "Guide" | "Boat Operator" | "Homestay" | "Food Experience";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export type PartnerApplication = {
  id: string;
  userId?: string;
  fullName: string;
  phone: string;
  whatsapp?: string;
  district: District;
  serviceType: ServiceType;
  description: string;
  yearsExperience: number;
  languages: string[];
  createdAt: string; // ISO
  status: ApplicationStatus;
};

export type SubmissionStatus = "pending" | "approved" | "rejected";

export type SubmissionKind = "place" | "event" | "food";

type SubmissionMeta = {
  id: string;
  partnerId: string;
  partnerName: string;
  status: SubmissionStatus;
  createdAt: string;
  reviewedAt?: string;
  rejectionNote?: string;
};

export type PlaceSubmission = SubmissionMeta & {
  kind: "place";
  payload: Place;
};

export type EventSubmission = SubmissionMeta & {
  kind: "event";
  payload: Event;
};

export type FoodSubmission = SubmissionMeta & {
  kind: "food";
  payload: FoodItem;
};

export type Submission = PlaceSubmission | EventSubmission | FoodSubmission;
