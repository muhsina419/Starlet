
import React, { useState } from "react"
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
} from "lucide-react"
import { Link } from "react-router-dom"

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
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log("Searching for:", searchQuery, "in", location)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-blue-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">
                <span className="sr-only">AccessiblePlaces - </span>
                Saarthi
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4" aria-label="Main navigation">
              <button
                type="button"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium px-4 py-2 rounded transition"
                aria-label="Sign in to your account"
                style={{ background: "none", border: "none" }}
              >
                Sign In
              </button>
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
                aria-label="Create new account"
              >
                Sign Up
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="p-2 rounded hover:bg-blue-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                style={{ background: "none", border: "none" }}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
                <button
                  type="button"
                  className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium justify-start px-4 py-2 rounded transition"
                  aria-label="Sign in to your account"
                  style={{ background: "none", border: "none" }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
                  aria-label="Create new account"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero/Search Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 sm:text-5xl">Find Accessible Places Near You</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover restaurants, shops, and venues that welcome everyone. Search for places with wheelchair access,
              hearing loops, and other accessibility features.
            </p>

            <form onSubmit={handleSearch} className="space-y-4 sm:space-y-0 sm:flex sm:gap-4 max-w-2xl mx-auto">
              <div className="flex-1">
                <label htmlFor="search-places" className="sr-only">
                  Search for places (restaurants, shops, etc.)
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                    aria-hidden="true"
                  />
                  <input
                    id="search-places"
                    type="text"
                    placeholder="Search for places (restaurants, shops, etc.)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded"
                    aria-describedby="search-help"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg sm:w-auto w-full rounded transition"
                aria-label="Search for accessible places"
              >
                Search
              </button>
            </form>

            <p id="search-help" className="text-sm text-gray-500 mt-4">
              Find places with wheelchair access, accessible parking, hearing loops, and more accessibility features.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Accessibility Features We Track</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We help you find places that meet your specific accessibility needs, so you can explore with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                )
              })}
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-gray-700 mb-6">
                Can't find what you're looking for? Help us improve by adding places you know.
              </p>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded transition"
                type="button"
              >
                Add a Review of a place
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">AccessiblePlaces</h3>
              <p className="text-gray-300 mb-4 max-w-md">
                Making the world more accessible, one place at a time. Find and share information about accessible
                venues in your community.
              </p>
              <p className="text-sm text-gray-400">© 2024 AccessiblePlaces. All rights reserved.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <nav aria-label="Footer navigation">
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-place" className="text-gray-300 hover:text-white transition-colors">
                      Add a Place
                    </Link>
                  </li>
                  <li>
                    <Link to="/accessibility" className="text-gray-300 hover:text-white transition-colors">
                      Accessibility Statement
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <nav aria-label="Support navigation">
                <ul className="space-y-2">
                  <li>
                    <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              Built with accessibility in mind. If you encounter any barriers using this site, please{" "}
              <Link to="/contact" className="text-blue-400 hover:text-blue-300 underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}