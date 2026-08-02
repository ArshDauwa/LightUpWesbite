import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { HF, TEAL } from "../lib/constants";

type Testimonial = {
  name: string;
  location: string;
  stars: number;
  text: string;
};

const ROTATE_MS = 30000;

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const pages: Testimonial[][] = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    pages.push(testimonials.slice(i, i + 3));
  }
  const pageCount = pages.length;

  const [page, setPage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (pageCount <= 1) return;
    timerRef.current = setInterval(() => {
      setPage((p) => (p + 1) % pageCount);
    }, ROTATE_MS);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount]);

  const goTo = (i: number) => {
    setPage(i);
    startTimer();
  };

  return (
    <div
      onMouseEnter={() => timerRef.current && clearInterval(timerRef.current)}
      onMouseLeave={startTimer}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ width: `${pageCount * 100}%`, transform: `translateX(-${(100 / pageCount) * page}%)` }}
        >
          {pages.map((group, gi) => (
            <div
              key={gi}
              className="grid md:grid-cols-3 gap-6 flex-shrink-0"
              style={{ width: `${100 / pageCount}%` }}
            >
              {group.map((t, i) => (
                <div key={i} className="bg-card rounded-lg border border-border p-7 flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" style={{ color: "#F5A623" }} />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed flex-1 mb-5">"{t.text}"</p>
                  <div>
                    <div className="font-bold text-sm text-foreground" style={{ fontFamily: HF }}>{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.location}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Show reviews ${i + 1} of ${pageCount}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === page ? "24px" : "8px",
                backgroundColor: i === page ? TEAL : "#D8DEE6",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
