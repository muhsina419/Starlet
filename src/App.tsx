import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import PlaceDetails from "./Components/PlaceDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/place/:placeName" element={<PlaceDetails />} />
    </Routes>
  );
}

export default App;
