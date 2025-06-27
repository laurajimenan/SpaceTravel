import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Spacecrafts from "../../pages/Spacecrafts";
import Spacecraft from "../../pages/Spacecraft";
import Construct from "../../pages/Construct";
import Planets from "../../pages/Planets";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spacecrafts" element={<Spacecrafts />} />
        <Route path="/spacecraft/:id" element={<Spacecraft />} />
        <Route path="/construct" element={<Construct />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;