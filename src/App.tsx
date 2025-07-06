import Home from "./Components/Home";

function App() {
import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"


const App: React.FC = () => {
  return (
    <>
      <Home />
    </>
  );
    <Routes>
      <Route path="/" element={<HomePage />} />
  
    </Routes>
  )
}

export default App;

export default App
