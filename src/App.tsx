import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AccessibilityScore from "./components/AccessibilityScore"


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App
