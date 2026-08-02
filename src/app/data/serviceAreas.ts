export type ServiceCity = {
  id: string;
  city: string;
  region: "North" | "West" | "Central" | "South" | "East";
  zips: string[];
  center: [number, number];
  radius: number;
};

// Representative cities across the service footprint: Houston core, north to
// Willis, west to El Campo, south to Galveston, east to Beaumont.
export const SERVICE_CITIES: ServiceCity[] = [
  // North
  { id: "willis", city: "Willis", region: "North", zips: ["77318", "77378"], center: [30.4327, -95.4805], radius: 12000 },
  { id: "conroe", city: "Conroe", region: "North", zips: ["77301", "77302", "77303", "77304", "77306"], center: [30.3119, -95.4561], radius: 13000 },
  { id: "woodlands", city: "The Woodlands", region: "North", zips: ["77380", "77381", "77382", "77384", "77385", "77386"], center: [30.1658, -95.4613], radius: 13000 },
  { id: "spring", city: "Spring", region: "North", zips: ["77373", "77379", "77388", "77389"], center: [30.0799, -95.4172], radius: 12000 },
  { id: "humble", city: "Humble", region: "North", zips: ["77338", "77339", "77346", "77396"], center: [29.9988, -95.2622], radius: 12000 },
  { id: "tomball", city: "Tomball", region: "North", zips: ["77375", "77377"], center: [30.0972, -95.6161], radius: 12000 },

  // West
  { id: "katy", city: "Katy", region: "West", zips: ["77449", "77450", "77493", "77494"], center: [29.7858, -95.8244], radius: 13000 },
  { id: "cypress", city: "Cypress", region: "West", zips: ["77429", "77433"], center: [29.9691, -95.6972], radius: 12000 },
  { id: "sugarland", city: "Sugar Land", region: "West", zips: ["77478", "77479", "77498"], center: [29.6196, -95.6349], radius: 12000 },
  { id: "richmond", city: "Richmond", region: "West", zips: ["77406", "77407", "77469"], center: [29.5822, -95.7602], radius: 12000 },
  { id: "rosenberg", city: "Rosenberg", region: "West", zips: ["77471"], center: [29.5572, -95.8088], radius: 12000 },
  { id: "elcampo", city: "El Campo", region: "West", zips: ["77437"], center: [29.1966, -96.2705], radius: 12000 },

  // Central
  { id: "houston", city: "Houston (Downtown)", region: "Central", zips: ["77002", "77003", "77004", "77006", "77007", "77008", "77009", "77019"], center: [29.7604, -95.3698], radius: 20000 },
  { id: "bellaire", city: "Bellaire", region: "Central", zips: ["77401"], center: [29.7058, -95.4588], radius: 11000 },
  { id: "missouricity", city: "Missouri City", region: "Central", zips: ["77459", "77489"], center: [29.6186, -95.5377], radius: 12000 },

  // South
  { id: "pearland", city: "Pearland", region: "South", zips: ["77581", "77584", "77588"], center: [29.5636, -95.2861], radius: 12000 },
  { id: "friendswood", city: "Friendswood", region: "South", zips: ["77546"], center: [29.5294, -95.2010], radius: 11000 },
  { id: "leaguecity", city: "League City", region: "South", zips: ["77573", "77574"], center: [29.5075, -95.0949], radius: 12000 },
  { id: "texascity", city: "Texas City", region: "South", zips: ["77590", "77591"], center: [29.3838, -94.9027], radius: 12000 },
  { id: "galveston", city: "Galveston", region: "South", zips: ["77550", "77551", "77554"], center: [29.3013, -94.7977], radius: 13000 },
  { id: "alvin", city: "Alvin", region: "South", zips: ["77511"], center: [29.4238, -95.2441], radius: 12000 },

  // East
  { id: "pasadena", city: "Pasadena", region: "East", zips: ["77502", "77503", "77504", "77505", "77506"], center: [29.6911, -95.2091], radius: 12000 },
  { id: "baytown", city: "Baytown", region: "East", zips: ["77520", "77521", "77523"], center: [29.7355, -94.9774], radius: 13000 },
  { id: "deerpark", city: "Deer Park", region: "East", zips: ["77536"], center: [29.7080, -95.1188], radius: 11000 },
  { id: "laporte", city: "La Porte", region: "East", zips: ["77571"], center: [29.6658, -95.0194], radius: 11000 },
  { id: "beaumont", city: "Beaumont", region: "East", zips: ["77701", "77702", "77703", "77705", "77706", "77708", "77713"], center: [30.0802, -94.1266], radius: 14000 },
];

export const SERVICE_REGIONS: { name: string; cities: ServiceCity[] }[] = ["North", "West", "Central", "South", "East"].map(
  (name) => ({ name, cities: SERVICE_CITIES.filter((c) => c.region === name) })
);

// Fallback: any zip in these 3-digit prefixes that isn't an exact match above
// still resolves to the nearest representative city for that part of the metro.
const PREFIX_FALLBACK: Record<string, string> = {
  "770": "houston",
  "772": "houston",
  "773": "woodlands",
  "774": "katy",
  "775": "pasadena",
  "777": "beaumont",
};

export function lookupServiceZip(zip: string): { ok: true; city: ServiceCity } | { ok: false } {
  const exact = SERVICE_CITIES.find((c) => c.zips.includes(zip));
  if (exact) return { ok: true, city: exact };

  const prefix = zip.slice(0, 3);
  const fallbackId = PREFIX_FALLBACK[prefix];
  const fallbackCity = fallbackId ? SERVICE_CITIES.find((c) => c.id === fallbackId) : undefined;
  if (fallbackCity) return { ok: true, city: fallbackCity };

  return { ok: false };
}

export function getServiceCityById(id: string | undefined) {
  return SERVICE_CITIES.find((c) => c.id === id);
}
