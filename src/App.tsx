import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { LocaleProvider } from "@/i18n/LocaleContext";
import { detectLocale, isLocale } from "@/i18n/locales";
import Home from "@/pages/Home";

function LocalisedHome() {
  const { lang } = useParams();
  if (!isLocale(lang)) return <Navigate to="/en" replace />;
  return (
    <LocaleProvider locale={lang}>
      <Home />
    </LocaleProvider>
  );
}

/**
 * Language lives in the URL, not in component state.
 *
 * That gives every language a linkable, bookmarkable, indexable address and
 * lets `<html lang>` and `hreflang` be correct — none of which was true on the
 * previous site, where the choice reset to English on every reload.
 */
export default function App() {
  const initial = detectLocale(navigator.languages ?? [navigator.language]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${initial}`} replace />} />
      <Route path="/:lang" element={<LocalisedHome />} />
      <Route path="*" element={<Navigate to={`/${initial}`} replace />} />
    </Routes>
  );
}
