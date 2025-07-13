import { useEffect, useState } from "react";
import axios from "axios";

interface Feature {
  feature: string;
  accessible: number;
  status: string;
}

interface ScoreData {
  placeName: string;
  address: string;
  overallScore: string;
  features: Feature[];
}

const AccessibilityScore = ({ query }: { query: string }) => {
  const [data, setData] = useState<ScoreData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/score", {
          params: { query },
        });
        setData(res.data);
      } catch (err) {
        setError("Error fetching score");
        console.error(err);
      }
    };

    if (query) fetchScore();
  }, [query]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>Loading score...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-2">{data.placeName}</h2>
      <p className="text-gray-600 mb-4">{data.address}</p>
      <div className="mb-4">
        <p className="text-lg font-semibold">Overall Score:</p>
        <div className="w-full bg-gray-200 rounded h-4 mt-1">
          <div
            className="bg-green-500 h-4 rounded"
            style={{ width: data.overallScore }}
          ></div>
        </div>
        <p className="text-sm mt-1 text-gray-700">{data.overallScore}</p>
      </div>

      <h3 className="text-lg font-semibold mb-2">Feature Breakdown:</h3>
      <ul className="space-y-2">
        {data.features.map((f, idx) => (
          <li key={idx} className="border p-2 rounded-md">
            <p className="font-medium">{f.feature}</p>
            <div className="w-full bg-gray-100 h-3 rounded mt-1">
              <div
                className={`h-3 rounded ${
                  f.accessible === 100 ? "bg-green-500" : "bg-red-400"
                }`}
                style={{ width: `${f.accessible}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">Status: {f.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccessibilityScore;
