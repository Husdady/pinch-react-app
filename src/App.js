// Components
import AppContent from "./components/AppContent";

// Hooks
import useWix from "./hooks/useWix";

// Styles
import "./styles.css";

export default function App() {
  const { apiProfile, wixResponse } = useWix();

  if (typeof wixResponse.token !== "string") {
    return <span>Loading</span>;
  }

  return (
    <div className="app">
      <AppContent api={apiProfile} wixResponse={wixResponse} />
    </div>
  );
}
