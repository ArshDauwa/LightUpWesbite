import fs from "node:fs/promises";
import path from "node:path";

const dist = path.resolve("dist");
const siteUrl = "https://lightupgenerators.com";
const routes = [
  {
    path: "/",
    title: "Light Up Generators | Houston Generator Sales, Installation & Service",
    description: "Houston generator sales, installation, repair, and maintenance for homes and businesses across Greater Houston.",
    heading: "Power When It Matters Most",
    body: "Light Up Generators sells, installs, and services Generac standby and portable generators for homes and businesses across Greater Houston.",
    sections: [
      ["Generator Sales", "We're a Generac Authorized Dealer. We match you with the right unit and size for your specific needs - no upselling, just honest guidance."],
      ["Professional Installation", "Licensed and insured installation crews handle everything from the transfer switch to final inspection, start to finish."],
      ["Maintenance & Repair", "Annual service plans and repairs keep your generator running at peak condition and your warranty intact."],
      ["Generator Solutions for Every Need", "Browse residential standby, commercial standby, and portable generator solutions from Light Up Generators."],
      ["Residential Standby", "10kW - 28kW whole-home automatic standby backup powered by Generac."],
      ["Commercial Standby", "40kW - 150kW business continuity standby generators for retail, medical offices, restaurants, and multi-tenant buildings."],
      ["Portable Generators", "Flexible power for job sites, events, and backup power. Contact us for current inventory."],
      ["Why Light Up Generators", "We specialize in Generac. The same team sizes, installs, and services your system from start to finish, with flexible financing available for qualified buyers."],
      ["Service Area", "We serve the greater Houston metro area, including Houston, The Woodlands, Katy, Sugar Land, Pearland, League City, Galveston, Baytown, Beaumont, and surrounding communities."],
      ["What Our Customers Say", "Customers describe our installation crews as professional, responsive, thorough, and straightforward."],
      ["Free Quote", "A certified technician assesses your needs and provides a written estimate at no cost and with no obligation."],
      ["Frequently Asked Questions", "We carry Generac generators, provide residential and commercial installation, offer financing for qualified buyers, and provide annual maintenance and repair service."],
      ["Contact Light Up Generators", "Request a free quote by calling (832) 488-7706 or emailing contact@lightupgenerators.com. Our address is 9800 Richmond Ave Suite 480, Houston, TX 77042."],
    ],
    testimonials: [
      ["Maria C.", "Sugar Land, TX", "After a storm left us without power for almost a week, we called Light Up. They walked us through the whole process and had a Generac installed and inspected shortly after. We have not lost power since."],
      ["Tom B.", "The Woodlands, TX", "The installation crew was on time, professional, and cleaned up after themselves. Generator ran through two storm seasons without a single issue. Their annual maintenance is quick and thorough. Highly recommend to anyone in the Houston area."],
      ["Patricia W.", "Pearland, TX", "We needed reliable backup power for our small office and Light Up's commercial team sized and installed everything without disrupting our day-to-day. Reliable and responsive whenever we call."],
      ["James R.", "Katy, TX", "Every step was explained up front - what to expect on installation day and how everything would work. No surprises along the way. The generator has run flawlessly since day one."],
      ["Angela P.", "League City, TX", "We financed through Light Up and the process was painless - no pressure, no hidden fees. Our technician sized the unit correctly the first time."],
      ["Ricardo M.", "Missouri City, TX", "I called three companies for quotes. Light Up was the only one that actually walked the property and calculated our real load before recommending a size."],
      ["Dana K.", "Spring, TX", "Our annual service visit takes less than an hour and they always explain what they checked. Straightforward company, no upselling."],
      ["Mike D.", "Baytown, TX", "Downtime is not an option for our shop. Light Up sized and installed our commercial unit and made the whole process painless."],
      ["Wendy S.", "Galveston, TX", "Called about a repair and had a technician out within two days. Fair pricing, and they explained exactly what was wrong before fixing it."],
    ],
    cities: ["Willis", "Conroe", "The Woodlands", "Spring", "Humble", "Tomball", "Katy", "Cypress", "Sugar Land", "Richmond", "Rosenberg", "El Campo", "Houston", "Bellaire", "Missouri City", "Pearland", "Friendswood", "League City", "Texas City", "Galveston", "Alvin", "Pasadena", "Baytown", "Deer Park", "La Porte", "Beaumont"],
    extra: [
      "Licensed & Insured",
      "Generac Authorized Dealer",
      "Financing Available",
      "Free, No-Pressure Quotes",
      "10kW - 150kW Sizes We Install",
      "Licensed & Insured",
      "Financing Available",
      "Free No-Obligation Quotes",
      "Generac-Certified Technicians",
      "Factory-trained specialists, not generalists",
      "Generac Specialists",
      "One Team, Start to Finish",
      "Flexible Financing Available",
      "Coverage Map",
      "Enter a zip code to see coverage on the map.",
      "Expanding our service area. Contact us to verify coverage for a specific address outside these cities.",
      "Get in Touch",
      "Let's Talk About Your Power Needs",
      "Fill out the form and one of our team members will reach out within one business day to schedule your free assessment.",
      "Phone: (832) 488-7706",
      "Email: contact@lightupgenerators.com",
      "Address: 9800 Richmond Ave Suite 480, Houston, TX 77042",
      "Follow Us",
      "Request a Free Quote",
      "Name",
      "Phone",
      "Email",
      "I Need Help With",
      "Select a service",
      "Message",
      "Tell us about your property or power needs",
      "Send My Request",
      "Privacy Policy",
      "Terms of Service",
    ],
    faq: [
      ["What generator brands do you carry?", "We're a Generac Authorized Dealer and focus exclusively on Generac generators."],
      ["How long does a home installation take?", "The timeline depends on property conditions, generator size, permitting, and utility coordination. A specific timeline is provided with your quote."],
      ["Do you offer financing?", "Yes. Flexible payment plans and promotional offers are available for qualified buyers."],
      ["How often should I service my generator?", "Residential standby generators should be serviced once a year. Commercial units under heavier loads benefit from bi-annual maintenance."],
      ["Is the free quote really free?", "Yes. The quote has no obligation or pressure and includes a property assessment and written estimate."],
      ["What if my generator needs a repair?", "Contact us to schedule a technician. Service plan customers receive priority scheduling."],
    ],
  },
  {
    path: "/generators/residential-standby",
    title: "Residential Standby Generators | Light Up Generators",
    description: "Shop residential standby generators from 10kW to 28kW. Light Up Generators provides sizing, installation, and service in Greater Houston.",
    heading: "Residential Standby Generators",
    body: "Whole-home automatic standby backup powered by Generac. Browse 10kW to 28kW models and request a free installation quote.",
    benefits: ["Automatic transfer switch included", "Generac Guardian Series", "Quiet operation - neighborhood-friendly", "10-year warranty options available"],
    models: [
      ["Guardian 10kW", "Essential-circuit standby backup for smaller homes and condos."],
      ["Guardian 14kW", "A popular size for covering most of a smaller home."],
      ["Guardian 18kW", "Steps up coverage for larger homes with central air."],
      ["Guardian 20kW", "Handles bigger HVAC loads with room to spare."],
      ["Guardian 22kW", "Whole-home standby coverage, including AC and well pump."],
      ["Guardian 24kW", "Whole-home standby coverage for larger homes."],
      ["Guardian 26kW", "Handles larger HVAC and full-kitchen loads together."],
      ["Guardian 28kW", "Our largest home standby unit for the biggest homes and heaviest loads."],
    ],
  },
  {
    path: "/generators/commercial-standby",
    title: "Commercial Standby Generators | Light Up Generators",
    description: "Commercial standby generators from 40kW to 150kW with load sizing, installation, monitoring, and service across Greater Houston.",
    heading: "Commercial Standby Generators",
    body: "Business continuity standby power for retail, medical offices, restaurants, and multi-tenant buildings. Light Up Generators handles load calculations and installation.",
    benefits: ["Load bank testing included", "Remote monitoring available", "On-site load assessment included", "Flexible service agreements"],
    models: [
      ["Protector 40kW", "Entry point for small retail or single-tenant office standby power."],
      ["Protector 48kW", "A step up for slightly larger commercial loads."],
      ["Protector 60kW", "Sized for restaurants and mid-size retail locations."],
      ["Protector 80kW", "Covers larger single-tenant buildings and light industrial use."],
      ["Protector 100kW", "Built for healthcare and multi-tenant load profiles."],
      ["Protector 130kW", "Sized for larger multi-tenant buildings and restaurants."],
      ["Protector 150kW", "Our largest commercial standby unit, for high-demand facilities."],
    ],
  },
  {
    path: "/generators/portable",
    title: "Portable Generators | Light Up Generators",
    description: "Portable generator solutions for job sites, events, and backup power in Greater Houston.",
    heading: "Portable Generators",
    body: "Flexible generator power for job sites, events, and backup power. Contact Light Up Generators for current inventory and recommendations.",
    benefits: ["Inverter models for clean power", "Dual-fuel options available", "Setup and orientation included", "Contact us for current inventory"],
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Light Up Generators",
    description: "Privacy Policy for the Light Up Generators website.",
    heading: "Privacy Policy",
    body: "Learn how Light Up Generators collects, uses, and protects information submitted through this website.",
    sections: [
      ["Information We Collect", "When you request a quote, contact us, or use the zip code checker on this site, we collect the information you provide directly, such as your name, email address, phone number, property address, and service details. We use standard aggregated web server logs to keep the site secure."],
      ["How We Use Your Information", "We use submitted information to respond to quote requests, schedule appointments, provide service and maintenance, process financing applications with lending partners, and communicate about your generator system. We do not sell personal information."],
      ["Sharing Your Information", "We share information only where necessary to provide services, including with financing partners, utility companies, permitting offices, or service providers who help operate this website."],
      ["Cookies and Maps", "This site uses OpenStreetMap to display service-area coverage. We do not use tracking or advertising cookies."],
      ["Data Security", "We take reasonable technical and organizational steps to protect information you share. No method of transmission or storage is completely secure."],
      ["Your Rights", "You can ask us to access, correct, or delete personal information by contacting contact@lightupgenerators.com or (832) 488-7706."],
      ["Children's Privacy", "This website and our services are intended for adults. We do not knowingly collect personal information from children."],
      ["Changes to This Policy", "We may update this Privacy Policy from time to time to reflect changes in our practices."],
    ],
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service | Light Up Generators",
    description: "Terms of Service for the Light Up Generators website.",
    heading: "Terms of Service",
    body: "Terms governing use of the Light Up Generators website, generator information, quotes, and third-party services.",
    sections: [
      ["Acceptance of Terms", "By using this website, you agree to these Terms of Service. If you do not agree, please do not use this site."],
      ["Use of This Website", "This website helps you learn about generator sales, installation, and service, check service-area coverage, and request a quote. You agree to use it only for lawful purposes."],
      ["Quotes and Pricing", "Generator models, specifications, ranges, and availability are subject to change. Website quotes are estimates; final pricing, sizing, and scope are confirmed after a technician assesses your property. Financing is subject to third-party lender approval and terms."],
      ["No Warranty on Website Content", "We work to keep information accurate and current, but do not guarantee that all content, specifications, or availability details are error-free at all times."],
      ["Intellectual Property", "The content, design, and branding belong to Light Up Generators LLC unless otherwise noted and may not be copied or reused without permission."],
      ["Limitation of Liability", "To the extent permitted by law, Light Up Generators LLC is not liable for indirect or incidental damages arising from use of this website."],
      ["Third-Party Links and Services", "This site may link to or use mapping providers or social media. We are not responsible for the content or practices of those third-party services."],
      ["Governing Law", "These terms are governed by the laws of the State of Texas."],
      ["Changes to These Terms", "We may update these Terms of Service from time to time. Continued use after changes means you accept the updated terms."],
      ["Contact Us", "Questions about these Terms? Contact contact@lightupgenerators.com or (832) 488-7706."],
    ],
  },
];

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const renderSeoContent = (route) => {
  const benefits = route.benefits?.length
    ? `<ul>${route.benefits.map((benefit) => `<li>${escapeHtml(benefit)}</li>`).join("")}</ul>`
    : "";
  const models = route.models?.length
    ? `<section><h2>Available Generator Models</h2><div>${route.models
        .map(([model, description]) => `<article><h3>${escapeHtml(model)}</h3><p>${escapeHtml(description)}</p><p>Automatic transfer switch, remote monitoring, and professional installation available.</p></article>`)
        .join("")}</div></section>`
    : "";
  const sections = route.sections?.length
    ? `<section>${route.sections.map(([title, body]) => `<article><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p></article>`).join("")}</section>`
    : "";
  const faq = route.faq?.length
    ? `<section><h2>Frequently Asked Questions</h2>${route.faq.map(([question, answer]) => `<article><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></article>`).join("")}</section>`
    : "";
  const testimonials = route.testimonials?.length
    ? `<section><h2>What Our Customers Say</h2>${route.testimonials.map(([name, location, text]) => `<article><blockquote>${escapeHtml(text)}</blockquote><p><strong>${escapeHtml(name)}</strong> - ${escapeHtml(location)}</p></article>`).join("")}</section>`
    : "";
  const cities = route.cities?.length
    ? `<section><h2>Cities We Serve</h2><p>${route.cities.map(escapeHtml).join(", ")}</p></section>`
    : "";
  const extra = route.extra?.length
    ? `<section><h2>More Information</h2>${route.extra.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</section>`
    : "";

  return `<main><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.body)}</p>${benefits}${models}${sections}${testimonials}${cities}${faq}${extra}<p><a href="/">Light Up Generators</a> serves Houston and Greater Houston with generator sales, installation, and service.</p></main>`;
};
const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
const appScript = template.match(/<script type="module"[^>]+><\/script>/)?.[0] ?? "";
const styles = [...template.matchAll(/<link rel="stylesheet"[^>]+>/g)].map((match) => match[0]).join("\n      ");

for (const route of routes) {
  const canonical = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta name="robots" content=".*?" \/>/, `<meta name="robots" content="index, follow" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<div id="root"[^>]*><\/div>/, `<div id="root" class="prerender-shell">${renderSeoContent(route)}</div>`)
    .replace(/<script type="module"[^>]+><\/script>/, appScript);

  const outputDirectory = path.join(dist, route.path.slice(1));
  await fs.mkdir(outputDirectory, { recursive: true });
  await fs.writeFile(path.join(outputDirectory, "index.html"), html);
}

await fs.writeFile(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${siteUrl}${route.path === "/" ? "/" : route.path}</loc></url>`).join("\n")}\n</urlset>\n`);
console.log(`Prerendered ${routes.length} routes and generated sitemap.xml`);
