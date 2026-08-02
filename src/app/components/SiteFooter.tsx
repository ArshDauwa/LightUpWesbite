import { Link, useLocation, useNavigate } from "react-router";
import logoSrc from "../../assets/images/logo.png";
import generacDealerBadge from "../../assets/images/generac-authorized-dealer.webp";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { NAVY, NAV_LINKS, PHONE_DISPLAY, PHONE_HREF, EMAIL } from "../lib/constants";

export default function SiteFooter() {
  const location = useLocation();
  const navigate = useNavigate();

  const go = (id: string) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <footer style={{ backgroundColor: NAVY }} className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <img src={logoSrc} alt="Light Up Generators" className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {"Houston's trusted generator specialists. Sales, installation, and service — all in-house, no subcontractors."}
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: <Facebook className="w-4 h-4" />, label: "Facebook", url: "https://www.facebook.com/LightUpGenerators" },
                { icon: <Instagram className="w-4 h-4" />, label: "Instagram", url: "https://www.instagram.com/lightupgenerators/" },
                { icon: <Youtube className="w-4 h-4" />, label: "YouTube", url: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url === "#" ? undefined : "_blank"}
                  rel={s.url === "#" ? undefined : "noreferrer"}
                  aria-label={s.label}
                  className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="inline-block bg-white rounded-lg p-2.5 mt-6">
              <img src={generacDealerBadge} alt="Generac Authorized Dealer" className="h-16 w-auto" />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Navigation</div>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contact</div>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><a href={PHONE_HREF} className="hover:text-white transition-colors">{PHONE_DISPLAY}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a></li>
              <li>9800 Richmond Ave Suite 480</li>
              <li>Houston, TX 77042</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Light Up Generators LLC. All rights reserved. Licensed & Insured · TX License #TX-0001234</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
