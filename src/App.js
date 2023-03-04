import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Weather from "./components/Weather/Weather";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<Weather />} />
        <Route path="*" element={<div>Page Not Found !!!</div>} />
      </Routes>
    </div>
  );
};

export default App;
