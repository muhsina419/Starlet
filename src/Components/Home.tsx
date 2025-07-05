
// src/components/SearchPlaces.tsx
import React, { useState } from "react";
import axios from "axios";

interface PlaceInfo {
  name: string;
  address: string;
  category: string;
  wheelchairAccessible: boolean;
  geometry: {
    type: string;
    coordinates: number[];
  };
}

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceInfo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:5000/api/places`, {
        params: { query },
      });
      setResults(res.data.results);
    } catch (err: any) {
      setError(err.response?.data?.error || "Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Find Accessible Places</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Enter a place name (e.g. Kochi, India)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {results.map((place, index) => (
          <li
            key={index}
            className="border rounded p-4 shadow-md bg-white"
          >
            <h2 className="font-semibold text-lg">{place.name}</h2>
            <p className="text-sm text-gray-700">{place.address}</p>
            <p className="text-sm text-gray-600">Category: {place.category}</p>
            <p
              className={`text-sm font-medium ${
                place.wheelchairAccessible ? "text-green-600" : "text-red-600"
              }`}
            >
              {place.wheelchairAccessible
                ? "Wheelchair Accessible ✅"
                : "Not Wheelchair Accessible ❌"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;


