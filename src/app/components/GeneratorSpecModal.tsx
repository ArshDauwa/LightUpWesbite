import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { CheckCircle, ArrowRight } from "lucide-react";
import { NAVY, TEAL, GREEN, HF, BF } from "../lib/constants";
import { SPEC_LABELS, type GeneratorModel } from "../data/generators";
import { SPEC_ICONS } from "../lib/specIcons";
import ContactChoice from "./ContactChoice";

export default function GeneratorSpecModal({
  model,
  onClose,
  onRequestQuote,
}: {
  model: GeneratorModel | null;
  onClose: () => void;
  onRequestQuote: () => void;
}) {
  return (
    <Dialog open={model !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[calc(100%-2rem)] sm:max-w-3xl lg:max-w-5xl sm:h-[660px] sm:max-h-[88vh] max-h-[90vh] overflow-hidden p-0 gap-0 sm:flex sm:flex-row"
        style={{ fontFamily: BF }}
      >
        {model && (
          <>
            <div className="relative h-56 sm:h-full sm:w-[42%] flex-shrink-0 overflow-hidden">
              <img
                src={model.img}
                alt={`${model.brand} ${model.model}`}
                style={{ objectPosition: model.imgPosition }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(0deg, ${NAVY}90 0%, transparent 35%, transparent 100%)` }} />
              <span className="absolute top-4 left-4 text-xs font-bold text-white px-2.5 py-1 rounded" style={{ backgroundColor: TEAL }}>
                {model.kw}
              </span>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: TEAL }}>{model.brand}</p>
              <DialogTitle className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: HF }}>
                {model.model}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed mb-6">
                {model.tagline}
              </DialogDescription>

              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Key Features</h4>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-7">
                {model.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: GREEN }} />
                    <span className="text-foreground/80">{b}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Specifications</h4>
              <dl className="grid sm:grid-cols-2 gap-3 mb-7">
                {Object.entries(model.specs).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-3 p-3 rounded border border-border bg-card">
                    <div className="flex-shrink-0 mt-0.5" style={{ color: TEAL }}>
                      {SPEC_ICONS[key as keyof typeof SPEC_ICONS]}
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        {SPEC_LABELS[key as keyof typeof SPEC_LABELS]}
                      </dt>
                      <dd className="text-sm font-semibold text-foreground mt-0.5">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onRequestQuote}
                  className="flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded transition-opacity hover:opacity-90"
                  style={{ backgroundColor: TEAL }}
                >
                  Get a Quote for This Unit
                  <ArrowRight className="w-4 h-4" />
                </button>
                <ContactChoice />
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
