import React, { useState } from "react";
import axios from "axios";
import {
  Menu,
  X,
  Search,
  MapPin,
  ShipWheel,
  Ear,
  ParkingCircle,
  Eye,
  Heart,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: ShipWheel,
    title: "Wheelchair Accessible",
    description: "Find places with ramps, wide doorways, and accessible restrooms",
  },
  {
    icon: Ear,
    title: "Hearing Support",
    description: "Locations with hearing loops, sign language services, and quiet spaces",
  },
  {
    icon: ParkingCircle,
    title: "Accessible Parking",
    description: "Venues with designated accessible parking spaces nearby",
  },
  {
    icon: Eye,
    title: "Vision Friendly",
    description: "Places with braille menus, good lighting, and guide dog welcome",
  },
  {
    icon: Heart,
    title: "Sensory Friendly",
    description: "Quiet environments suitable for sensory sensitivities",
  },
  {
    icon: Users,
    title: "Staff Trained",
    description: "Businesses with disability awareness trained staff",
  },
];

interface PlaceInfo {
  name: string;
  address: string;
  category: string;
  wheelchairAccessibility: string;
  accessibilityIcon: string;
  color: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
}

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<PlaceInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/places", { params: { query } });
      setPlaces(res.data.results);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-blue-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-600">Saarthi</h1>

            <nav className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600">Sign In</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
            </nav>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
              <button className="w-full text-left text-gray-700">Sign In</button>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero & Search */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Find Accessible Places Near You</h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover shops, cafes, and venues with ramps, braille, and more.
            </p>

            <form onSubmit={handleSearch} className="space-y-4 sm:flex sm:gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="search-places"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for places (restaurants, shops, etc.)"
                  className="pl-10 h-12 border-2 border-gray-300 focus:border-blue-500 w-full rounded"
                />
              </div>
              <button
                type="submit"
                className="h-12 px-6 bg-blue-600 text-white font-semibold rounded"
              >
                Search
              </button>
            </form>
            {loading && <p className="mt-4 text-gray-500">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>

          {/* Render Results */}
          <div className="mt-12 max-w-3xl mx-auto space-y-4">
            {places.map((place, index) => (
              <div
                key={index}
                className="border rounded p-4 shadow-md bg-white flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold text-lg">{place.name}</h2>
                  <p className="text-sm text-gray-700">{place.address}</p>
                  <p className="text-sm text-gray-600">Category: {place.category}</p>
                </div>
                <span className={`text-${place.color}-600 text-xl`}>
                  {place.accessibilityIcon}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Accessibility Features We Track</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore with confidence by filtering for places with features that suit your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 rounded border hover:shadow-md transition"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">AccessiblePlaces</h3>
            <p className="text-gray-300 mb-4">
              Making the world more accessible, one place at a time.
            </p>
            <p className="text-sm text-gray-400">© 2025 Saarthi. All rights reserved.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:underline">How It Works</Link></li>
              <li><Link to="/add-place" className="hover:underline">Add a Place</Link></li>
              <li><Link to="/accessibility" className="hover:underline">Accessibility</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="hover:underline">Help Center</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
