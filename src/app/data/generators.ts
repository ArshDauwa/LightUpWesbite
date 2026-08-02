import portableGeneratorImg from "../../assets/images/generator-portable.jpg";
import commercialGeneratorImg from "../../assets/images/generator-commercial-standby.jpg";
import commercialGeneratorCompactImg from "../../assets/images/generator-commercial-standby-compact.jpg";
import residentialGeneratorImg from "../../assets/images/generator-residential-standby.jpg";

export type GeneratorSpecs = {
  output: string;
  voltage: string;
  fuel: string;
  sound: string;
  transferSwitch: string;
  coverage: string;
  warranty: string;
};

export type GeneratorModel = {
  id: string;
  brand: string;
  model: string;
  kw: string;
  img: string;
  imgPosition: string;
  tagline: string;
  bullets: string[];
  specs: GeneratorSpecs;
};

export type GeneratorCategory = {
  slug: string;
  label: string;
  range: string;
  img: string;
  imgPosition: string;
  desc: string;
  bullets: string[];
  models: GeneratorModel[];
};

export const SPEC_LABELS: Record<keyof GeneratorSpecs, string> = {
  output: "Power Output",
  voltage: "Voltage",
  fuel: "Fuel Type",
  sound: "Sound Level",
  transferSwitch: "Transfer Switch",
  coverage: "Typical Coverage",
  warranty: "Warranty",
};

const RESIDENTIAL_IMG = residentialGeneratorImg;
const COMMERCIAL_IMG = commercialGeneratorImg;
const COMMERCIAL_IMG_COMPACT = commercialGeneratorCompactImg;
const PORTABLE_IMG = portableGeneratorImg;

// Residential standby: single-phase, natural gas or LP.
function residentialSpecs(kw: number): GeneratorSpecs {
  const transferAmp = kw <= 14 ? 50 : kw <= 20 ? 100 : 200;
  const sound = 61 + Math.round((kw - 10) * 0.4);
  const coverage = kw * 250;
  return {
    output: `${(kw * 1000).toLocaleString()} Watts`,
    voltage: "120/240V Single-Phase",
    fuel: "Natural Gas or Liquid Propane",
    sound: `${sound} dB @ 23 ft`,
    transferSwitch: `${transferAmp}A automatic transfer switch included`,
    coverage: `Up to ~${coverage.toLocaleString()} sq ft`,
    warranty: "5-Year Limited (10-Year available)",
  };
}

// Commercial standby: three-phase, natural gas, LP, or diesel.
function commercialSpecs(kw: number): GeneratorSpecs {
  const transferAmp = kw <= 48 ? 200 : kw <= 60 ? 225 : kw <= 80 ? 300 : kw <= 100 ? 400 : kw <= 130 ? 600 : 800;
  const sound = 66 + Math.round((kw - 40) * 0.08);
  const coverage =
    kw <= 60
      ? "Small retail or single-tenant office"
      : kw <= 80
      ? "Mid-size retail, restaurants, or light industrial"
      : kw <= 100
      ? "Medical offices, multi-tenant buildings"
      : "Larger commercial facilities & restaurant chains";
  return {
    output: `${(kw * 1000).toLocaleString()} Watts`,
    voltage: "277/480V Three-Phase",
    fuel: "Natural Gas, LP, or Diesel",
    sound: `${sound} dB @ 23 ft`,
    transferSwitch: `${transferAmp}A automatic transfer switch`,
    coverage,
    warranty: "2-Year Standard (extended plans available)",
  };
}

const RESIDENTIAL_MODELS: { kw: number; tagline: string; bullets: string[] }[] = [
  {
    kw: 10,
    tagline: "Essential-circuit standby backup for smaller homes and condos.",
    bullets: ["Covers fridge, sump pump, lighting & Wi-Fi", "Compact footprint", "Wi-Fi remote monitoring included"],
  },
  {
    kw: 14,
    tagline: "A popular size for covering most of a smaller home.",
    bullets: ["Covers essential circuits plus more", "Compact footprint, quiet operation", "Wi-Fi remote monitoring included"],
  },
  {
    kw: 18,
    tagline: "Steps up coverage for larger homes with central air.",
    bullets: ["Handles HVAC plus most household circuits", "2-line LCD status display", "Wi-Fi remote monitoring included"],
  },
  {
    kw: 20,
    tagline: "Handles bigger HVAC loads with room to spare.",
    bullets: ["Handles HVAC plus most household circuits", "2-line LCD status display", "Wi-Fi remote monitoring included"],
  },
  {
    kw: 22,
    tagline: "Whole-home standby coverage, including AC and well pump.",
    bullets: ["Runs AC and well pump together", "2-line LCD status display", "Wi-Fi remote monitoring included"],
  },
  {
    kw: 24,
    tagline: "Whole-home standby coverage for larger homes.",
    bullets: ["Runs 2 A/C units simultaneously", "Corrosion-resistant aluminum enclosure", "Wi-Fi remote monitoring included"],
  },
  {
    kw: 26,
    tagline: "Handles larger HVAC and full-kitchen loads together.",
    bullets: ["Runs 2 A/C units simultaneously", "Corrosion-resistant aluminum enclosure", "10-year extended warranty available"],
  },
  {
    kw: 28,
    tagline: "Our largest home standby unit — for the biggest homes and heaviest loads.",
    bullets: ["Runs multiple A/C units simultaneously", "Corrosion-resistant aluminum enclosure", "10-year extended warranty available"],
  },
];

const COMMERCIAL_MODELS: { kw: number; tagline: string; bullets: string[] }[] = [
  {
    kw: 40,
    tagline: "Entry point for small retail or single-tenant office standby power.",
    bullets: ["Compact pad-mount footprint", "Sound-attenuated enclosure", "Remote monitoring app included"],
  },
  {
    kw: 48,
    tagline: "A step up for slightly larger commercial loads.",
    bullets: ["Compact pad-mount footprint", "Sound-attenuated enclosure", "Remote monitoring app included"],
  },
  {
    kw: 60,
    tagline: "Sized for restaurants and mid-size retail locations.",
    bullets: ["Sound-attenuated enclosure", "Programmable load management", "Remote diagnostics & alerts"],
  },
  {
    kw: 80,
    tagline: "Covers larger single-tenant buildings and light industrial use.",
    bullets: ["Programmable load management", "Remote diagnostics & alerts", "Sound-attenuated enclosure"],
  },
  {
    kw: 100,
    tagline: "Built for healthcare and multi-tenant load profiles.",
    bullets: ["Meets NFPA 110 emergency standards", "Programmable load shedding", "Remote diagnostics & alerts"],
  },
  {
    kw: 130,
    tagline: "Sized for larger multi-tenant buildings and restaurants.",
    bullets: ["Meets NFPA 110 emergency standards", "Programmable load shedding", "Paralleling-ready for future expansion"],
  },
  {
    kw: 150,
    tagline: "Our largest commercial standby unit, for high-demand facilities.",
    bullets: ["Paralleling-ready for future expansion", "Programmable load shedding", "Remote monitoring available"],
  },
];

export const GENERATOR_CATEGORIES: GeneratorCategory[] = [
  {
    slug: "residential-standby",
    label: "Residential Standby",
    range: "10kW – 28kW",
    img: RESIDENTIAL_IMG,
    imgPosition: "center",
    desc: "Whole-home automatic standby backup, powered by Generac. Kicks on within seconds of an outage — no manual start, no extension cords.",
    bullets: [
      "Automatic transfer switch included",
      "Generac Guardian Series",
      "Quiet operation — neighborhood-friendly",
      "10-year warranty options available",
    ],
    models: RESIDENTIAL_MODELS.map((m) => ({
      id: `res-${m.kw}kw`,
      brand: "Generac",
      model: `Guardian ${m.kw}kW`,
      kw: `${m.kw} kW`,
      img: RESIDENTIAL_IMG,
      imgPosition: "center",
      tagline: m.tagline,
      bullets: m.bullets,
      specs: residentialSpecs(m.kw),
    })),
  },
  {
    slug: "commercial-standby",
    label: "Commercial Standby",
    range: "40kW – 150kW",
    img: COMMERCIAL_IMG,
    imgPosition: "53% 48%",
    desc: "Business continuity standby generators, powered by Generac, for retail, medical offices, restaurants, and multi-tenant buildings. We handle load calculations to size the right unit for your facility.",
    bullets: [
      "Load bank testing included",
      "Remote monitoring available",
      "On-site load assessment included",
      "Flexible service agreements",
    ],
    models: COMMERCIAL_MODELS.map((m) => ({
      id: `comm-${m.kw}kw`,
      brand: "Generac",
      model: `Protector ${m.kw}kW`,
      kw: `${m.kw} kW`,
      img: m.kw <= 48 ? COMMERCIAL_IMG_COMPACT : COMMERCIAL_IMG,
      imgPosition: m.kw <= 48 ? "center" : "53% 48%",
      tagline: m.tagline,
      bullets: m.bullets,
      specs: commercialSpecs(m.kw),
    })),
  },
  {
    slug: "portable",
    label: "Portable Generators",
    range: "2kW – 12kW",
    img: PORTABLE_IMG,
    imgPosition: "61% 43%",
    desc: "Flexible power for job sites, events, and backup power. Contact us for current availability and to find the right unit for your needs.",
    bullets: [
      "Inverter models for clean power",
      "Dual-fuel options available",
      "Setup & orientation included",
      "Contact us for current inventory",
    ],
    models: [],
  },
];

export function getCategoryBySlug(slug: string | undefined) {
  return GENERATOR_CATEGORIES.find((c) => c.slug === slug);
}
