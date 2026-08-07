import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import ContactChoice from "../components/ContactChoice";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  CheckCircle,
  XCircle,
  ArrowRight,
  Search,
  Shield,
  Wrench,
  Zap,
  Award,
  Info,
  Percent,
  Facebook,
  Instagram,
} from "lucide-react";
import { NAVY, TEAL, GREEN, HF, BF, PHONE_HREF, PHONE_DISPLAY, EMAIL } from "../lib/constants";
import { GENERATOR_CATEGORIES } from "../data/generators";
import { lookupServiceZip, getServiceCityById, SERVICE_CITIES, type ServiceCity } from "../data/serviceAreas";

// ── Data ────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: "Maria C.",
    location: "Sugar Land, TX",
    stars: 5,
    text: "After a storm left us without power for almost a week, we called Light Up. They walked us through the whole process and had a Generac installed and inspected shortly after. We have not lost power since.",
  },
  {
    name: "Tom B.",
    location: "The Woodlands, TX",
    stars: 5,
    text: "The installation crew was on time, professional, and cleaned up after themselves. Generator ran through two storm seasons without a single issue. Their annual maintenance is quick and thorough. Highly recommend to anyone in the Houston area.",
  },
  {
    name: "Patricia W.",
    location: "Pearland, TX",
    stars: 5,
    text: "We needed reliable backup power for our small office and Light Up's commercial team sized and installed everything without disrupting our day-to-day. Reliable and responsive whenever we call.",
  },
  {
    name: "James R.",
    location: "Katy, TX",
    stars: 5,
    text: "Every step was explained up front — what to expect on installation day, how everything would work. No surprises along the way. The generator has run flawlessly since day one.",
  },
  {
    name: "Angela P.",
    location: "League City, TX",
    stars: 5,
    text: "We financed through Light Up and the process was painless — no pressure, no hidden fees. Our technician sized the unit correctly the first time.",
  },
  {
    name: "Ricardo M.",
    location: "Missouri City, TX",
    stars: 5,
    text: "I called three companies for quotes. Light Up was the only one that actually walked the property and calculated our real load before recommending a size.",
  },
  {
    name: "Dana K.",
    location: "Spring, TX",
    stars: 5,
    text: "Our annual service visit takes less than an hour and they always explain what they checked. Straightforward company, no upselling.",
  },
  {
    name: "Mike D.",
    location: "Baytown, TX",
    stars: 5,
    text: "Downtime isn't an option for our shop. Light Up sized and installed our commercial unit and made the whole process painless.",
  },
  {
    name: "Wendy S.",
    location: "Galveston, TX",
    stars: 5,
    text: "Called about a repair and had a technician out within two days. Fair pricing, and they explained exactly what was wrong before fixing it.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What generator brands do you carry?",
    a: "We're a Generac Authorized Dealer and currently focus exclusively on Generac generators. Our team will recommend the right model and size based on your load requirements and budget.",
  },
  {
    q: "How long does a home installation take?",
    a: "It varies — installation timelines depend on your property, the generator size, and any permitting or utility coordination needed. We'll give you a specific timeline as part of your free quote.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes. We work with several lenders to offer flexible payment plans including promotional 0% interest periods for qualified buyers. Ask about current offers when you request your quote.",
  },
  {
    q: "How often should I service my generator?",
    a: "Residential standby generators should be serviced once a year. Commercial units under heavier loads benefit from bi-annual maintenance. Regular service also keeps your manufacturer warranty valid.",
  },
  {
    q: "Is the free quote really free?",
    a: "Completely free — no obligation, no pressure. One of our certified technicians visits your property, assesses your needs, and sends you a detailed written estimate within 24 hours. That's it.",
  },
  {
    q: "What if my generator needs a repair?",
    a: "Call us and we'll get a technician scheduled as soon as possible. Service plan customers receive priority scheduling.",
  },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const location = useLocation();
  const [zip, setZip] = useState("");
  const [zipResult, setZipResult] = useState<null | { ok: boolean; city?: ServiceCity }>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const staticFormsAccessKey = import.meta.env.VITE_STATICFORMS_ACCESS_KEY as string | undefined;

  useEffect(() => {
    const state = location.state as { scrollTo?: string; presetCity?: string } | null;
    if (state?.presetCity) {
      const city = getServiceCityById(state.presetCity);
      if (city) {
        setZip(city.zips[0]);
        setZipResult({ ok: true, city });
      }
    }
    if (state?.scrollTo) {
      requestAnimationFrame(() => {
        const el = document.getElementById(state.scrollTo!);
        if (!el) return;
        const headerHeight = 96;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    }
  }, [location.state]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerHeight = 96;
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const checkZip = () => {
    if (zip.length !== 5) return;
    const result = lookupServiceZip(zip);
    setZipResult(result.ok ? { ok: true, city: result.city } : { ok: false });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);

    if (!staticFormsAccessKey) {
      setError("Contact form is not configured. Add VITE_STATICFORMS_ACCESS_KEY to your build environment.");
      setSending(false);
      return;
    }

    try {
      const response = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          accessKey: staticFormsAccessKey,
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
          subject: `Website contact request from ${form.name}`,
          replyTo: form.email,
          honeypot: "",
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message || `Request failed (${response.status})`);
      }

      setSent(true);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-background text-foreground" style={{ fontFamily: BF }}>
      <SiteHeader />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&h=900&fit=crop&auto=format"
            alt="Light Up Generators certified technician at work"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(105deg, ${NAVY}F0 45%, ${NAVY}80 100%)` }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-36 md:py-36">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full border border-white/20 text-white/80"
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: TEAL }} />
              Serving Houston & Greater Houston
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: HF }}
            >
              Power When
              <br />
              <span style={{ color: TEAL }}>It Matters Most</span>
            </h1>

            <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-xl">
              {"Houston's trusted generator company. We sell, install, and service generators for homes and businesses across the greater Houston area."}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => go("contact")}
                className="flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded text-base transition-opacity hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <ContactChoice light />
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Licensed & Insured",
                "Generac Authorized Dealer",
                "Financing Available",
                "Free, No-Pressure Quotes",
              ].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-sm text-white/70 font-semibold">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: GREEN }} />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES STRIP ───────────────────────────────────── */}
      <section id="services" className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Zap className="w-8 h-8" style={{ color: TEAL }} />,
              title: "Generator Sales",
              desc: "We're a Generac Authorized Dealer. We match you with the right unit and size for your specific needs — no upselling, just honest guidance.",
            },
            {
              icon: <Wrench className="w-8 h-8" style={{ color: TEAL }} />,
              title: "Professional Installation",
              desc: "Licensed and insured installation crews handle everything from the transfer switch to final inspection, start to finish.",
            },
            {
              icon: <Shield className="w-8 h-8" style={{ color: TEAL }} />,
              title: "Maintenance & Repair",
              desc: "Annual service plans and repairs when you need them. Factory-certified technicians keep your generator running at peak condition and your warranty intact.",
            },
          ].map((s, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex-shrink-0 mt-1">{s.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: HF }}>{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GENERATORS ───────────────────────────────────────── */}
      <section id="generators" className="bg-card py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: TEAL }}>What We Carry</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: HF }}>
              Generator Solutions for Every Need
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Pick a category to browse the specific models, sizes, and specs we carry.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {GENERATOR_CATEGORIES.map((g) => (
              <Link
                key={g.slug}
                to={`/generators/${g.slug}`}
                className="text-left bg-white rounded-lg overflow-hidden border border-border flex flex-col group cursor-pointer transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={g.cardImg ?? g.img}
                    alt={g.label}
                    style={{
                      objectPosition: g.cardImgPosition ?? g.imgPosition,
                      transform: g.cardImgScale ? `scale(${g.cardImgScale})` : undefined,
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                  <span
                    className="absolute top-3 right-3 text-[10px] font-bold text-white px-2 py-1 rounded"
                    style={{ backgroundColor: TEAL }}
                  >
                    {g.range}
                  </span>
                  <h3 className="absolute bottom-3 left-3 right-3 text-base font-bold text-white leading-tight" style={{ fontFamily: HF }}>
                    {g.label}
                  </h3>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{g.desc}</p>
                  <span
                    className="mt-auto flex items-center gap-1.5 text-xs font-bold"
                    style={{ color: TEAL }}
                  >
                    <Info className="w-3.5 h-3.5" />
                    {g.models.length > 0 ? `Browse ${g.models.length} Models` : "View Options"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <div style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "10kW – 150kW", label: "Sizes We Install" },
            { num: "Licensed", label: "& Insured" },
            { num: "Financing", label: "Available" },
            { num: "Free", label: "No-Obligation Quotes" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold text-white mb-1" style={{ fontFamily: HF, color: TEAL }}>{s.num}</div>
              <div className="text-sm text-white/60 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY US ───────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative rounded-lg overflow-hidden bg-muted h-80 lg:h-auto lg:min-h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=900&h=600&fit=crop&auto=format"
              alt="Light Up Generators service technician"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-6 left-6 right-6 bg-white rounded-lg px-5 py-4 shadow-lg flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                style={{ backgroundColor: TEAL }}
              >
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-foreground text-sm" style={{ fontFamily: HF }}>Generac-Certified Technicians</div>
                <div className="text-xs text-muted-foreground">Factory-trained specialists, not generalists</div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: TEAL }}>Why Light Up Generators</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: HF }}>
              We Actually Pick Up the Phone
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {"We're not a national franchise routing your call through a dispatch center, and we don't spread ourselves across a dozen brands. We specialize in Generac, and the same team sizes, installs, and services your system — start to finish."}
            </p>
            <div className="space-y-5">
              {[
                {
                  icon: <Zap className="w-5 h-5" style={{ color: TEAL }} />,
                  title: "Generac Specialists",
                  desc: "We focus on one manufacturer instead of spreading thin — our technicians know Generac systems inside and out.",
                },
                {
                  icon: <Wrench className="w-5 h-5" style={{ color: TEAL }} />,
                  title: "One Team, Start to Finish",
                  desc: "The same company sizes, installs, and services your generator — no subcontractors passing your job around.",
                },
                {
                  icon: <Percent className="w-5 h-5" style={{ color: TEAL }} />,
                  title: "Flexible Financing Available",
                  desc: "0% interest promotions and flexible payment plans for qualified buyers — ask when you request your quote.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <div className="font-bold text-foreground text-sm mb-0.5" style={{ fontFamily: HF }}>{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ─────────────────────────────────────── */}
      <section id="service-area" className="bg-card py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: TEAL }}>Coverage</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight" style={{ fontFamily: HF }}>
              Do We Service Your Area?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We cover the greater Houston metro area. Enter your zip code below to check coverage in seconds.
            </p>

            <div className="flex rounded overflow-hidden border border-border shadow-sm mb-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="Enter zip code"
                  value={zip}
                  onChange={(e) => { setZip(e.target.value.replace(/\D/g, "")); setZipResult(null); }}
                  onKeyDown={(e) => e.key === "Enter" && checkZip()}
                  className="w-full pl-11 pr-4 py-3.5 text-sm bg-white focus:outline-none placeholder:text-muted-foreground"
                />
              </div>
              <button
                onClick={checkZip}
                disabled={zip.length !== 5}
                className="flex items-center gap-2 font-bold text-sm text-white px-6 disabled:opacity-40 transition-opacity"
                style={{ backgroundColor: TEAL }}
              >
                <Search className="w-4 h-4" />
                Check
              </button>
            </div>

            {zipResult && (
              <div className={`flex gap-3 p-4 rounded border text-sm ${zipResult.ok ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                {zipResult.ok
                  ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
                  : <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />}
                <div>
                  {zipResult.ok ? (
                    <>
                      <div className="font-bold text-green-800">{"Great — we service your area!"}</div>
                      <div className="text-green-700 mt-0.5">
                        {zipResult.city?.city}, TX is within our service zone.{" "}
                        <button onClick={() => go("contact")} className="underline font-semibold">Request your free quote now.</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-bold text-red-700">Outside our current coverage area</div>
                      <div className="text-red-600 mt-0.5">{"We're growing! Contact us — we may be able to refer a trusted partner near you."}</div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg border border-border p-8">
            <h3 className="font-bold text-foreground text-lg mb-5" style={{ fontFamily: HF }}>Coverage Map</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Enter your zip code to highlight your service radius around Houston on the map.
            </p>

            <div className="h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden border border-border mb-6">
              {zipResult?.ok && zipResult.city ? (
                <MapContainer
                  key={zipResult.city.id}
                  center={zipResult.city.center}
                  zoom={zipResult.city.radius > 15000 ? 10 : 11}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Circle
                    center={zipResult.city.center}
                    radius={zipResult.city.radius}
                    pathOptions={{ color: TEAL, fillColor: TEAL, fillOpacity: 0.18 }}
                  />
                </MapContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground px-4 text-center">
                  Enter a zip code to see coverage on the map.
                </div>
              )}
            </div>

            <h3 className="font-bold text-foreground text-lg mb-5" style={{ fontFamily: HF }}>Cities We Serve</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-3 gap-x-6 mb-6">
              {SERVICE_CITIES.map((city) => (
                <div key={city.id} className="flex items-center gap-2 text-sm text-foreground/80">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: TEAL }} />
                  {city.city}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground border-t border-border pt-4">
              Expanding our service area. Contact us to verify coverage for a specific address outside these cities.
            </p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section id="reviews" className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: TEAL }}>Customer Reviews</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: HF }}>
              What Our Customers Say
            </h2>
          </div>
          <TestimonialsCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* ── QUOTE CTA ────────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${GREEN} 100%)` }} className="py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: HF }}>
              Free Quote — No Obligation, No Pressure
            </h2>
            <p className="text-white/80 mt-2 text-base">
              A certified technician comes to you, assesses your needs, and gives you a written estimate. Zero cost.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 flex-shrink-0">
            <button
              onClick={() => go("contact")}
              className="flex items-center gap-2 font-bold px-7 py-3.5 rounded text-sm bg-white transition-opacity hover:opacity-90"
              style={{ color: NAVY }}
            >
              Request My Free Quote
              <ArrowRight className="w-4 h-4" />
            </button>
            <ContactChoice light />
          </div>
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="bg-card py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: TEAL }}>FAQ</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: HF }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-border bg-white rounded-lg border border-border overflow-hidden">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-card transition-colors"
                >
                  <span className={`font-semibold text-sm leading-snug ${openFaq === i ? "" : "text-foreground"}`} style={openFaq === i ? { color: TEAL } : {}}>
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 text-muted-foreground ${openFaq === i ? "rotate-180" : ""}`}
                    style={openFaq === i ? { color: TEAL } : {}}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border">
                    <div className="pt-4">{item.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section id="contact" className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: TEAL }}>Get in Touch</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: HF }}>
              {"Let's Talk About Your Power Needs"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Fill out the form and one of our team members will reach out within one business day to schedule your free assessment. Prefer to call? {"We're"} real humans who actually pick up.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: <Phone className="w-5 h-5" style={{ color: TEAL }} />, label: "Phone", val: PHONE_DISPLAY, href: PHONE_HREF },
                { icon: <Mail className="w-5 h-5" style={{ color: TEAL }} />, label: "Email", val: EMAIL, href: `mailto:${EMAIL}` },
                { icon: <MapPin className="w-5 h-5" style={{ color: TEAL }} />, label: "Address", val: "9800 Richmond Ave Suite 480, Houston, TX 77042", href: null },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded border border-border flex items-center justify-center flex-shrink-0">{c.icon}</div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="text-sm font-semibold hover:underline" style={{ color: NAVY }}>{c.val}</a>
                    ) : (
                      <span className="text-sm font-semibold text-foreground">{c.val}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Follow Us</div>
              <div className="flex gap-3">
                {[
                  { icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
                  { icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="w-10 h-10 rounded border border-border flex items-center justify-center transition-colors hover:text-white"
                    style={{ color: NAVY }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = TEAL; (e.currentTarget as HTMLAnchorElement).style.borderColor = TEAL; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = ""; (e.currentTarget as HTMLAnchorElement).style.borderColor = ""; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center min-h-[420px] text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${GREEN}20` }}
                >
                  <CheckCircle className="w-8 h-8" style={{ color: GREEN }} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: HF }}>Message Received!</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {"We'll reach out within one business day to schedule your free on-site assessment."}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: HF }}>Request a Free Quote</h3>
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white border border-border rounded px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                        style={{ "--tw-ring-color": TEAL } as React.CSSProperties}
                        onFocus={(e) => (e.target.style.borderColor = TEAL)}
                        onBlur={(e) => (e.target.style.borderColor = "")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Phone</label>
                      <input
                        type="tel"
                        placeholder="(305) 555-0100"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white border border-border rounded px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                        onFocus={(e) => (e.target.style.borderColor = TEAL)}
                        onBlur={(e) => (e.target.style.borderColor = "")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white border border-border rounded px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                      onFocus={(e) => (e.target.style.borderColor = TEAL)}
                      onBlur={(e) => (e.target.style.borderColor = "")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">I Need Help With</label>
                    <div className="relative">
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full appearance-none bg-white border border-border rounded px-3.5 py-2.5 text-sm text-foreground focus:outline-none transition-colors cursor-pointer"
                        onFocus={(e) => (e.target.style.borderColor = TEAL)}
                        onBlur={(e) => (e.target.style.borderColor = "")}
                      >
                        <option value="">Select a service...</option>
                        <option>Residential Generator — Purchase & Install</option>
                        <option>Commercial Generator — Purchase & Install</option>
                        <option>Portable Generator</option>
                        <option>Generator Service / Annual Maintenance</option>
                        <option>Emergency Repair</option>
                        <option>Service Plan Inquiry</option>
                        <option>General Question</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your property or power needs..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white border border-border rounded px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors resize-none"
                      onFocus={(e) => (e.target.style.borderColor = TEAL)}
                      onBlur={(e) => (e.target.style.borderColor = "")}
                    />
                  </div>
                  {error ? (
                    <p className="text-sm text-red-600 text-center">{error}</p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full font-bold text-sm text-white py-3.5 rounded flex items-center justify-center gap-2 transition-opacity hover:opacity-90 group disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: TEAL }}
                  >
                    {sending ? "Sending..." : "Send My Request"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <p className="text-center text-xs text-muted-foreground">No obligation. We respond within one business day.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
