import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { HF, BF, EMAIL, PHONE_DISPLAY } from "../lib/constants";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: [
      "By using this website, you agree to these Terms of Service. If you do not agree, please do not use this site.",
    ],
  },
  {
    title: "Use of This Website",
    body: [
      "This website is provided to help you learn about our generator sales, installation, and service offerings, check service-area coverage, and request a quote. You agree to use the site only for lawful purposes and not to misuse the contact forms or zip code checker.",
    ],
  },
  {
    title: "Quotes & Pricing",
    body: [
      "Generator models, specifications, and ranges shown on this site are for general reference and are subject to change and availability. A quote provided through this website is an estimate only — final pricing, sizing, and scope are confirmed after a technician assesses your property.",
      "Financing, where offered, is provided through third-party lenders and is subject to their approval and terms.",
    ],
  },
  {
    title: "No Warranty on Website Content",
    body: [
      "We make reasonable efforts to keep information on this site accurate and up to date, but we do not guarantee that all content, specifications, or availability details are error-free at all times.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "The content, design, and branding on this site belong to Light Up Generators LLC unless otherwise noted, and may not be copied or reused without permission.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "To the extent permitted by law, Light Up Generators LLC is not liable for indirect or incidental damages arising from your use of this website. This does not limit any liability related to services performed under a separate service agreement or contract.",
    ],
  },
  {
    title: "Third-Party Links & Services",
    body: [
      "This site may link to or use third-party services (such as mapping providers or social media). We aren't responsible for the content or practices of those third-party services.",
    ],
  },
  {
    title: "Governing Law",
    body: [
      "These terms are governed by the laws of the State of Texas.",
    ],
  },
  {
    title: "Changes to These Terms",
    body: [
      "We may update these Terms of Service from time to time. Continued use of the site after changes means you accept the updated terms.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="bg-background text-foreground" style={{ fontFamily: BF }}>
      <SiteHeader />
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3" style={{ fontFamily: HF }}>
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: {new Date().getFullYear()}</p>

          <div className="space-y-10">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: HF }}>{s.title}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3">{p}</p>
                ))}
              </div>
            ))}

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: HF }}>Contact Us</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Questions about these Terms? Reach us at{" "}
                <a href={`mailto:${EMAIL}`} className="underline font-semibold text-foreground">{EMAIL}</a> or{" "}
                {PHONE_DISPLAY}.
              </p>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
