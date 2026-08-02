import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import GeneratorSpecModal from "../components/GeneratorSpecModal";
import ContactChoice from "../components/ContactChoice";
import { CheckCircle, Info, ArrowRight, ArrowLeft } from "lucide-react";
import { NAVY, TEAL, GREEN, HF, BF } from "../lib/constants";
import { GENERATOR_CATEGORIES, getCategoryBySlug } from "../data/generators";

export default function GeneratorCatalogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const category = getCategoryBySlug(slug);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  useEffect(() => {
    const modelParam = searchParams.get("model");
    if (modelParam && category?.models.some((m) => m.id === modelParam)) {
      setSelectedModelId(modelParam);
    } else {
      setSelectedModelId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, searchParams.get("model")]);

  const openModel = (id: string | null) => {
    setSelectedModelId(id);
    const next = new URLSearchParams(searchParams);
    if (id) next.set("model", id);
    else next.delete("model");
    setSearchParams(next, { replace: true });
  };

  const requestQuote = () => {
    setSelectedModelId(null);
    navigate("/", { state: { scrollTo: "contact" } });
  };

  if (!category) {
    return (
      <div className="bg-background text-foreground min-h-screen flex flex-col" style={{ fontFamily: BF }}>
        <SiteHeader />
        <div className="flex-1 max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: HF }}>Catalog Not Found</h1>
          <p className="text-muted-foreground mb-8">{"We couldn't find that generator category."}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded"
            style={{ backgroundColor: TEAL }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const selectedModel = category.models.find((m) => m.id === selectedModelId) || null;

  return (
    <div className="bg-background text-foreground" style={{ fontFamily: BF }}>
      <SiteHeader />

      {/* ── CATEGORY HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <img src={category.img} alt={category.label} style={{ objectPosition: category.imgPosition }} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(105deg, ${NAVY}F0 45%, ${NAVY}80 100%)` }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            All Generator Types
          </Link>
          <span
            className="inline-block text-xs font-bold text-white px-2.5 py-1 rounded mb-4"
            style={{ backgroundColor: TEAL }}
          >
            {category.range}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: HF }}>
            {category.label}
          </h1>
          <p className="text-white/75 leading-relaxed max-w-2xl mb-6">{category.desc}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {category.bullets.map((b) => (
              <span key={b} className="flex items-center gap-1.5 text-sm text-white/70 font-semibold">
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: GREEN }} />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODEL CATALOG ────────────────────────────────────── */}
      <section className="bg-card py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: TEAL }}>Available Sizes</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10" style={{ fontFamily: HF }}>
            {category.models.length > 0 ? `${category.models.length} Models in This Range` : "Ask Us About Current Inventory"}
          </h2>

          {category.models.length === 0 && (
            <div className="bg-white rounded-lg border border-border p-8 mb-10 max-w-2xl">
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Our portable generator inventory changes regularly. Call us or request a free quote and we'll help you pick the right unit for your job site, event, or backup power needs.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={requestQuote}
                  className="flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded transition-opacity hover:opacity-90"
                  style={{ backgroundColor: TEAL }}
                >
                  Request a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
                <ContactChoice />
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.models.map((m) => (
              <button
                key={m.id}
                onClick={() => openModel(m.id)}
                className="text-left bg-white rounded-lg overflow-hidden border border-border flex flex-col group cursor-pointer transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={m.img}
                    alt={`${m.brand} ${m.model}`}
                    style={{ objectPosition: m.imgPosition }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                  <span
                    className="absolute top-3 right-3 text-[11px] font-bold text-white px-2.5 py-1 rounded"
                    style={{ backgroundColor: TEAL }}
                  >
                    {m.kw}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/70">{m.brand}</p>
                    <h3 className="text-lg font-bold text-white leading-tight" style={{ fontFamily: HF }}>{m.model}</h3>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{m.tagline}</p>
                  <ul className="space-y-1.5 mb-5">
                    {m.bullets.slice(0, 2).map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: GREEN }} />
                        <span className="text-foreground/80">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto flex items-center gap-1.5 text-xs font-bold" style={{ color: TEAL }}>
                    <Info className="w-3.5 h-3.5" />
                    View Full Specs
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Other categories */}
          <div className="mt-16 pt-10 border-t border-border">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Browse Other Types</p>
            <div className="flex flex-wrap gap-3">
              {GENERATOR_CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
                <Link
                  key={c.slug}
                  to={`/generators/${c.slug}`}
                  className="text-sm font-semibold px-4 py-2 rounded border border-border bg-white hover:border-current transition-colors"
                  style={{ color: NAVY }}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE CTA ────────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${GREEN} 100%)` }} className="py-14 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight" style={{ fontFamily: HF }}>
              {"Not sure which size is right for you?"}
            </h2>
            <p className="text-white/80 mt-2 text-base">
              A certified technician will size it for you — free, no obligation.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 flex-shrink-0">
            <button
              onClick={requestQuote}
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

      <SiteFooter />

      <GeneratorSpecModal
        model={selectedModel}
        onClose={() => openModel(null)}
        onRequestQuote={requestQuote}
      />
    </div>
  );
}
