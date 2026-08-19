import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import GeneratorCatalogPage from "./pages/GeneratorCatalogPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";

const PAGE_METADATA: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Light Up Generators | Houston Generator Sales, Installation & Service",
    description: "Houston generator sales, installation, repair, and maintenance for homes and businesses across Greater Houston.",
  },
  "/generators/residential-standby": {
    title: "Residential Standby Generators | Light Up Generators",
    description: "Shop residential standby generators from 10kW to 28kW. Light Up Generators provides sizing, installation, and service in Greater Houston.",
  },
  "/generators/commercial-standby": {
    title: "Commercial Standby Generators | Light Up Generators",
    description: "Commercial standby generators from 40kW to 150kW with load sizing, installation, monitoring, and service across Greater Houston.",
  },
  "/generators/portable": {
    title: "Portable Generators | Light Up Generators",
    description: "Portable generator solutions for job sites, events, and backup power in Greater Houston.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Light Up Generators",
    description: "Privacy Policy for the Light Up Generators website.",
  },
  "/terms-of-service": {
    title: "Terms of Service | Light Up Generators",
    description: "Terms of Service for the Light Up Generators website.",
  },
};

function SiteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = PAGE_METADATA[pathname] || PAGE_METADATA["/"];
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://lightupgenerators.com${pathname}`);
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    document.getElementById("root")?.classList.remove("prerender-shell");
  }, []);

  return (
    <BrowserRouter>
      <SiteMetadata />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generators/:slug" element={<GeneratorCatalogPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      </Routes>
    </BrowserRouter>
  );
}
