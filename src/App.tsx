import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import PlaceDetails from "./Components/PlaceDetails";
import AccessibilityScore from "./components/AccessibilityScore"



const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/place/:placeName" element={<PlaceDetails />} />
    </Routes>
  );
}

export default App;
