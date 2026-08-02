import { Phone, Mail } from "lucide-react";
import { NAVY, PHONE_HREF, PHONE_DISPLAY, EMAIL } from "../lib/constants";

export default function ContactChoice({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const linkClass = light
    ? "flex items-center gap-2 text-sm font-bold px-5 py-3 rounded border-2 border-white/40 text-white hover:border-white transition-colors"
    : "flex items-center gap-2 text-sm font-bold px-5 py-3 rounded border-2 hover:opacity-90 transition-opacity";
  const linkStyle = light ? undefined : { borderColor: NAVY, color: NAVY };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={PHONE_HREF} aria-label={`Call us at ${PHONE_DISPLAY}`} className={linkClass} style={linkStyle}>
        <Phone className="w-3.5 h-3.5" />
        Call
      </a>
      <a href={`mailto:${EMAIL}`} aria-label="Email us" className={linkClass} style={linkStyle}>
        <Mail className="w-3.5 h-3.5" />
        Email
      </a>
    </div>
  );
}
