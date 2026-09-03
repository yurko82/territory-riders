export type TerritoryOwner = "you" | "mila" | "denys" | "olha";

export type Territory = {
  id: string;
  owner: TerritoryOwner;
  ownerName: string;
  areaKm2: number;
  color: string;
  borderColor: string;
  coordinates: Array<{ latitude: number; longitude: number }>;
  updatedAt: string;
};

export type ActivityEvent = {
  id: string;
  type: "cut" | "claim" | "record";
  title: string;
  detail: string;
  time: string;
  accent: string;
  read: boolean;
};

export const MAP_CENTER = {
  latitude: 50.4501,
  longitude: 30.5234,
};

export const DEMO_TERRITORIES: Territory[] = [
  {
    id: "territory-you",
    owner: "you",
    ownerName: "Ти",
    areaKm2: 12.8,
    color: "rgba(184,243,107,0.42)",
    borderColor: "#B8F36B",
    updatedAt: "сьогодні, 08:40",
    coordinates: [
      { latitude: 50.4637, longitude: 30.4864 },
      { latitude: 50.4708, longitude: 30.5271 },
      { latitude: 50.4537, longitude: 30.5662 },
      { latitude: 50.4262, longitude: 30.5544 },
      { latitude: 50.4214, longitude: 30.5122 },
      { latitude: 50.4396, longitude: 30.4824 },
    ],
  },
  {
    id: "territory-mila",
    owner: "mila",
    ownerName: "Міла К.",
    areaKm2: 8.4,
    color: "rgba(95,224,207,0.28)",
    borderColor: "#5FE0CF",
    updatedAt: "сьогодні, 07:55",
    coordinates: [
      { latitude: 50.4758, longitude: 30.5472 },
      { latitude: 50.4884, longitude: 30.5792 },
      { latitude: 50.4666, longitude: 30.6067 },
      { latitude: 50.4487, longitude: 30.5742 },
    ],
  },
  {
    id: "territory-denys",
    owner: "denys",
    ownerName: "Денис Р.",
    areaKm2: 5.7,
    color: "rgba(171,126,255,0.26)",
    borderColor: "#AB7EFF",
    updatedAt: "вчора, 19:20",
    coordinates: [
      { latitude: 50.4214, longitude: 30.4688 },
      { latitude: 50.4404, longitude: 30.4784 },
      { latitude: 50.4312, longitude: 30.5175 },
      { latitude: 50.4083, longitude: 30.5045 },
    ],
  },
  {
    id: "territory-olha",
    owner: "olha",
    ownerName: "Ольга С.",
    areaKm2: 3.1,
    color: "rgba(255,200,87,0.24)",
    borderColor: "#FFC857",
    updatedAt: "вчора, 17:44",
    coordinates: [
      { latitude: 50.4561, longitude: 30.4952 },
      { latitude: 50.4621, longitude: 30.5207 },
      { latitude: 50.4442, longitude: 30.5321 },
      { latitude: 50.4371, longitude: 30.5096 },
    ],
  },
];

export const DEMO_EVENTS: ActivityEvent[] = [
  {
    id: "event-1",
    type: "cut",
    title: "Денис відрізав 1,6 км²",
    detail: "Твоя південна межа змінилася",
    time: "12 хв тому",
    accent: "#FF6B6B",
    read: false,
  },
  {
    id: "event-2",
    type: "claim",
    title: "Ти захопив зону Ольги",
    detail: "+2,4 км² до твоєї території",
    time: "сьогодні, 08:40",
    accent: "#39D98A",
    read: false,
  },
  {
    id: "event-3",
    type: "record",
    title: "Новий особистий рекорд",
    detail: "24,6 км за одну поїздку",
    time: "вчора, 19:02",
    accent: "#FFC857",
    read: true,
  },
];

export const PLAYER_STATS = {
  totalArea: "12,8",
  weeklyArea: "+4,2",
  rides: "18",
  rank: "#07",
  streak: "6 днів",
};
