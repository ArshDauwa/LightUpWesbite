import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import logoSrc from "../../assets/images/logo.png";
import { Phone, Mail, Menu, X, ChevronDown, Facebook, Instagram } from "lucide-react";
import { NAVY, TEAL, NAV_LINKS, PHONE_DISPLAY, PHONE_HREF, EMAIL } from "../lib/constants";
import { GENERATOR_CATEGORIES } from "../data/generators";
import { SERVICE_REGIONS } from "../data/serviceAreas";

function useHoverMenu() {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openNow = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const closeDelayed = () => {
    timer.current = setTimeout(() => setOpen(false), 150);
  };
  return { open, openNow, closeDelayed, setOpen };
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileGenOpen, setMobileGenOpen] = useState(false);
  const [mobileAreaOpen, setMobileAreaOpen] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const genMenu = useHoverMenu();
  const areaMenu = useHoverMenu();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setNavSolid(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const goToCity = (cityId: string) => {
    setMenuOpen(false);
    navigate("/", { state: { scrollTo: "service-area", presetCity: cityId } });
  };

  return (
    <>
      {/* ── TOP BAR ─────────────────────────────────────────── */}
      <div style={{ backgroundColor: NAVY }} className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6 text-xs text-white/70">
            <a href={PHONE_HREF} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3 h-3" />
              {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3 h-3" />
              {EMAIL}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/LightUpGenerators" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-white/60 hover:text-white transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
            <a href="https://www.instagram.com/lightupgenerators/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/60 hover:text-white transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${navSolid ? "shadow-md" : "border-b border-border"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-24">
          <Link to="/" className="flex-shrink-0">
            <img src={logoSrc} alt="Light Up Generators" className="h-16 md:h-20 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => {
              if (l.id === "generators") {
                return (
                  <div
                    key={l.id}
                    className="relative"
                    onMouseEnter={genMenu.openNow}
                    onMouseLeave={genMenu.closeDelayed}
                  >
                    <button
                      onClick={() => go(l.id)}
                      className="flex items-center gap-1 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors py-8"
                    >
                      {l.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${genMenu.open ? "rotate-180" : ""}`} />
                    </button>

                    {genMenu.open && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                        onMouseEnter={genMenu.openNow}
                        onMouseLeave={genMenu.closeDelayed}
                      >
                        <div className="w-[560px] bg-white rounded-lg border border-border shadow-xl p-6 grid grid-cols-3 gap-6">
                          {GENERATOR_CATEGORIES.map((cat) => (
                            <div key={cat.slug}>
                              <Link
                                to={`/generators/${cat.slug}`}
                                onClick={() => genMenu.setOpen(false)}
                                className="block text-sm font-bold text-foreground hover:text-foreground mb-1"
                                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                              >
                                {cat.label}
                              </Link>
                              <p className="text-[11px] font-semibold mb-2" style={{ color: TEAL }}>{cat.range}</p>
                              {cat.models.length > 0 ? (
                                <ul className="space-y-1.5 mb-2">
                                  {cat.models.slice(0, 4).map((m) => (
                                    <li key={m.id}>
                                      <Link
                                        to={`/generators/${cat.slug}?model=${m.id}`}
                                        onClick={() => genMenu.setOpen(false)}
                                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                      >
                                        {m.brand} {m.model}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-xs text-muted-foreground mb-2">Ask us about current inventory</p>
                              )}
                              <Link
                                to={`/generators/${cat.slug}`}
                                onClick={() => genMenu.setOpen(false)}
                                className="text-xs font-bold hover:underline"
                                style={{ color: NAVY }}
                              >
                                {cat.models.length > 4 ? `View all ${cat.models.length} sizes →` : "View all →"}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (l.id === "service-area") {
                return (
                  <div
                    key={l.id}
                    className="relative"
                    onMouseEnter={areaMenu.openNow}
                    onMouseLeave={areaMenu.closeDelayed}
                  >
                    <button
                      onClick={() => go(l.id)}
                      className="flex items-center gap-1 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors py-8"
                    >
                      {l.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${areaMenu.open ? "rotate-180" : ""}`} />
                    </button>

                    {areaMenu.open && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                        onMouseEnter={areaMenu.openNow}
                        onMouseLeave={areaMenu.closeDelayed}
                      >
                        <div className="w-[840px] bg-white rounded-lg border border-border shadow-xl p-6">
                          <div className="grid grid-cols-5 gap-6 mb-4">
                            {SERVICE_REGIONS.map((region) => (
                              <div key={region.name}>
                                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: TEAL }}>
                                  {region.name}
                                </p>
                                <ul className="space-y-1.5">
                                  {region.cities.map((city) => (
                                    <li key={city.id}>
                                      <button
                                        onClick={() => { areaMenu.setOpen(false); goToCity(city.id); }}
                                        className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left"
                                      >
                                        {city.city}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="pt-4 border-t border-border flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">{"Don't see your city? Check your zip code."}</p>
                            <button
                              onClick={() => { areaMenu.setOpen(false); go("service-area"); }}
                              className="text-xs font-bold hover:underline"
                              style={{ color: NAVY }}
                            >
                              Check your zip code →
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
                >
                  {l.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="hidden md:flex items-center gap-2 text-sm font-bold border-2 px-4 py-2 rounded transition-colors hover:opacity-90"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              <Phone className="w-3.5 h-3.5" />
              Call Us
            </a>
            <button
              onClick={() => go("contact")}
              className="hidden md:block text-sm font-bold text-white px-5 py-2 rounded transition-opacity hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              Free Quote
            </button>
            <button className="lg:hidden p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-white px-6 py-4 flex flex-col gap-1 max-h-[75vh] overflow-y-auto">
            {NAV_LINKS.map((l) => {
              if (l.id === "generators") {
                return (
                  <div key={l.id} className="border-b border-border">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => go(l.id)}
                        className="flex-1 text-left py-3 text-sm font-semibold text-foreground"
                      >
                        {l.label}
                      </button>
                      <button
                        onClick={() => setMobileGenOpen(!mobileGenOpen)}
                        aria-label="Toggle generator types"
                        className="p-3"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileGenOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {mobileGenOpen && (
                      <div className="pb-3 pl-2 space-y-4">
                        {GENERATOR_CATEGORIES.map((cat) => (
                          <div key={cat.slug}>
                            <Link
                              to={`/generators/${cat.slug}`}
                              onClick={() => setMenuOpen(false)}
                              className="block text-sm font-bold mb-1.5"
                              style={{ color: NAVY }}
                            >
                              {cat.label}
                            </Link>
                            {cat.models.length === 0 && (
                              <p className="text-xs text-muted-foreground">Ask us about current inventory</p>
                            )}
                            <ul className="space-y-1.5">
                              {cat.models.slice(0, 4).map((m) => (
                                <li key={m.id}>
                                  <Link
                                    to={`/generators/${cat.slug}?model=${m.id}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-xs text-muted-foreground"
                                  >
                                    {m.brand} {m.model}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            {cat.models.length > 4 && (
                              <Link
                                to={`/generators/${cat.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className="text-xs font-bold mt-1.5 inline-block"
                                style={{ color: NAVY }}
                              >
                                View all {cat.models.length} sizes →
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (l.id === "service-area") {
                return (
                  <div key={l.id} className="border-b border-border">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => go(l.id)}
                        className="flex-1 text-left py-3 text-sm font-semibold text-foreground"
                      >
                        {l.label}
                      </button>
                      <button
                        onClick={() => setMobileAreaOpen(!mobileAreaOpen)}
                        aria-label="Toggle service areas"
                        className="p-3"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileAreaOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {mobileAreaOpen && (
                      <div className="pb-3 pl-2 space-y-4">
                        {SERVICE_REGIONS.map((region) => (
                          <div key={region.name}>
                            <p className="text-xs font-bold mb-1.5" style={{ color: NAVY }}>{region.name}</p>
                            <ul className="space-y-1.5">
                              {region.cities.map((city) => (
                                <li key={city.id}>
                                  <button
                                    onClick={() => goToCity(city.id)}
                                    className="text-xs text-muted-foreground text-left"
                                  >
                                    {city.city}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-left py-3 text-sm font-semibold text-foreground border-b border-border last:border-0"
                >
                  {l.label}
                </button>
              );
            })}
            <button
              onClick={() => go("contact")}
              className="mt-3 py-3 text-sm font-bold text-white rounded"
              style={{ backgroundColor: TEAL }}
            >
              Get a Free Quote
            </button>
          </div>
        )}
      </header>
    </>
  );
}
