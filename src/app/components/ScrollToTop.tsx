import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if ((location.state as { scrollTo?: string } | null)?.scrollTo) return;
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}
