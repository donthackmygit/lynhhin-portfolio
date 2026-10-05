export const VIETNAM = { x: 796, y: 205 };

export const flights = [
  {
    id: "north-america",
    origin: [294, 137],
    path: "M294 137 C455 18 676 50 796 205",
    mobile: false,
  },
  {
    id: "europe",
    origin: [506, 114],
    path: "M506 114 C614 58 735 102 796 205",
    mobile: true,
  },
  {
    id: "east-asia",
    origin: [888, 151],
    path: "M888 151 Q832 116 796 205",
    mobile: true,
  },
  {
    id: "australia",
    origin: [920, 344],
    path: "M920 344 C839 340 780 289 796 205",
    mobile: true,
  },
  {
    id: "south-asia",
    origin: [714, 171],
    path: "M714 171 Q770 136 796 205",
    mobile: false,
  },
] as const;

export type Flight = (typeof flights)[number];
