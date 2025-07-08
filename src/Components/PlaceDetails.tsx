import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PlaceDetails = () => {
  const { placeName } = useParams();
  const [scoreData, setScoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await axios.get("/api/score", {
          params: { query: placeName },
        });
        setScoreData(res.data);
      } catch (err) {
        console.error("Error fetching score:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, [placeName]);

  if (loading) return <p>Loading accessibility score...</p>;
  if (!scoreData) return <p>Could not load score for {placeName}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{scoreData.placeName}</h2>
      <p className="text-gray-600 mb-4">{scoreData.address}</p>

      <div className="mb-4">
        <p className="font-semibold">Overall Score:</p>
        <div className="w-full h-3 bg-gray-200 rounded">
          <div
            className="h-3 bg-green-500 rounded"
            style={{ width: scoreData.overallScore }}
          ></div>
        </div>
        <p className="text-sm mt-1">{scoreData.overallScore}</p>
      </div>

      <h3 className="text-lg font-semibold mb-2">Feature Breakdown:</h3>
      <ul className="space-y-2">
        {scoreData.features.map((f: any, idx: number) => (
          <li key={idx} className="border p-2 rounded">
            <p className="font-medium">{f.feature}</p>
            <div className="w-full bg-gray-100 h-3 rounded mt-1">
              <div
                className={`h-3 ${
                  f.accessible === 100 ? "bg-green-400" : "bg-red-400"
                } rounded`}
                style={{ width: `${f.accessible}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">Status: {f.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceDetails;
