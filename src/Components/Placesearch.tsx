import { useState } from "react";
import axios from "axios";

const PlaceSearchAndScore = () => {
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchPlaces = async () => {
    setScoreData(null);
    setSelectedPlace(null);
    setLoading(true);
    try {
      const res = await axios.get("/api/places", {
        params: { query: search },
      });
      setPlaces(res.data.results);
    } catch (err) {
      console.error("Search error:", err.message);
    }
    setLoading(false);
  };

  const fetchScore = async (placeName: string) => {
    setLoading(true);
    try {
      const res = await axios.get("/api/score", {
        params: { query: placeName },
      });
      setScoreData(res.data);
      setSelectedPlace(placeName);
    } catch (err) {
      console.error("Score fetch error:", err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Search Accessible Places</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter place name"
          className="border p-2 rounded w-full"
        />
        <button onClick={searchPlaces} className="bg-blue-600 text-white px-4 rounded">
          Search
        </button>
      </div>

      <ul className="mb-6 space-y-3">
        {places.map((place, idx) => (
          <li
            key={`${place.name}-${idx}`}
            onClick={() => fetchScore(place.name)}
            className={`cursor-pointer border p-3 rounded hover:bg-blue-50 flex justify-between items-center ${
              selectedPlace === place.name ? "border-blue-600" : "border-gray-300"
            }`}
          >
            <div>
              <p className="font-semibold">{place.name}</p>
              <p className="text-sm text-gray-600">{place.address}</p>
            </div>
            <span className="text-gray-600 text-lg">{place.accessibilityIcon}</span>
          </li>
        ))}
      </ul>

      {loading && <p className="text-gray-500">Loading score...</p>}

      {scoreData && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Accessibility Score: {scoreData.placeName}</h3>
          <p className="text-sm text-gray-600 mb-2">{scoreData.address}</p>
          <p className="mb-2 font-bold">{scoreData.overallScore}</p>

          <ul className="space-y-2">
            {scoreData.features.map((f, idx) => (
              <li key={idx}>
                <div className="flex justify-between">
                  <span>{f.feature}</span>
                  <span className="text-sm text-gray-500">Status: {f.status}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 mt-1 rounded">
                  <div
                    className={`h-2 ${
                      f.accessible === 100 ? "bg-green-500" : "bg-red-400"
                    } rounded`}
                    style={{ width: `${f.accessible}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlaceSearchAndScore;
