import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { HF, BF, EMAIL, PHONE_DISPLAY } from "../lib/constants";

const SECTIONS = [
  {
    title: "Information We Collect",
    body: [
      "When you request a quote, contact us, or use the zip code checker on this site, we collect the information you provide directly — such as your name, email address, phone number, property address, and details about the service you're interested in.",
      "We do not automatically collect detailed browsing analytics beyond standard, aggregated web server logs (such as pages visited and general location derived from IP address) used to keep the site running securely.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "We use the information you provide to respond to quote requests, schedule appointments, provide service and maintenance, process financing applications with our lending partners, and communicate with you about your generator system.",
      "We do not use your information for automated marketing profiling, and we do not sell your personal information to third parties.",
    ],
  },
  {
    title: "Sharing Your Information",
    body: [
      "We share information only where necessary to provide our services — for example, with financing partners if you apply for a payment plan, with utility companies or permitting offices as part of an installation, or with service providers who help us operate this website.",
      "We do not sell, rent, or trade your personal information to third parties for their own marketing purposes.",
    ],
  },
  {
    title: "Cookies & Maps",
    body: [
      "This site uses OpenStreetMap to display your service-area coverage map when you check a zip code. Loading the map may involve a request to OpenStreetMap's tile servers. We do not use tracking or advertising cookies on this site.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We take reasonable technical and organizational steps to protect the information you share with us. No method of transmission or storage is 100% secure, so we can't guarantee absolute security, but we work to protect your information appropriately.",
    ],
  },
  {
    title: "Your Rights",
    body: [
      `You can ask us to access, correct, or delete the personal information we hold about you at any time by contacting us at ${EMAIL} or ${PHONE_DISPLAY}.`,
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      "This website and our services are intended for adults. We do not knowingly collect personal information from children.",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices. The date of the most recent revision is shown below.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground" style={{ fontFamily: BF }}>
      <SiteHeader />
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3" style={{ fontFamily: HF }}>
            Privacy Policy
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
                Questions about this Privacy Policy? Reach us at{" "}
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
