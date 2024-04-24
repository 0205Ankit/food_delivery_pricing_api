import { Zones } from "@prisma/client";

type PricingType = {
  zone: Zones;
  base_distance_in_km: number;
  fix_price_in_cents: number;
  itemId: number;
  km_price_in_cents: number;
};

export const organizations = [
  {
    name: "Organization 1",
  },
  {
    name: "Organization 2",
  },
  {
    name: "Organization 3",
  },
  {
    name: "Organization 4",
  },
  {
    name: "Organization 5",
  },
];

export const getPricings = (id1: number, id2: number): PricingType[] => {
  return [
    {
      zone: "central",
      base_distance_in_km: 5,
      fix_price_in_cents: 1000,
      itemId: id1,
      km_price_in_cents: 150,
    },
    {
      zone: "central",
      base_distance_in_km: 5,
      fix_price_in_cents: 1000,
      itemId: id2,
      km_price_in_cents: 100,
    },
    {
      zone: "east",
      base_distance_in_km: 5,
      fix_price_in_cents: 1000,
      itemId: id1,
      km_price_in_cents: 150,
    },
    {
      zone: "east",
      base_distance_in_km: 5,
      fix_price_in_cents: 1000,
      itemId: id2,
      km_price_in_cents: 100,
    },
    {
      zone: "west",
      base_distance_in_km: 5,
      fix_price_in_cents: 1000,
      itemId: id1,
      km_price_in_cents: 150,
    },
    {
      zone: "west",
      base_distance_in_km: 5,
      fix_price_in_cents: 1000,
      itemId: id2,
      km_price_in_cents: 100,
    },
    {
      zone: "north",
      base_distance_in_km: 5,
      fix_price_in_cents: 1000,
      itemId: id1,
      km_price_in_cents: 150,
    },
    {
      zone: "north",
      base_distance_in_km: 5,
      fix_price_in_cents: 1000,
      itemId: id2,
      km_price_in_cents: 100,
    },
    {
      zone: "south",
      base_distance_in_km: 5,
      fix_price_in_cents: 1000,
      itemId: id1,
      km_price_in_cents: 150,
    },
    {
      zone: "south",
      base_distance_in_km: 5,
      fix_price_in_cents: 1000,
      itemId: id2,
      km_price_in_cents: 100,
    },
  ];
};
