import { HashRouter, Routes, Route } from "react-router";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import GeneratorCatalogPage from "./pages/GeneratorCatalogPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generators/:slug" element={<GeneratorCatalogPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      </Routes>
    </HashRouter>
  );
}
