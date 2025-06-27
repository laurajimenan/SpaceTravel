import React, { useState } from "react";
import SpaceTravelApi from "../src/services/SpaceTravelApi";

function Construct() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !capacity || !description) {
      setError("All fields (name, capacity, description) are required!");
      return;
    }
    setError("");
    const response = await SpaceTravelApi.buildSpacecraft({
      name,
      capacity: parseInt(capacity),
      description,
    });
    if (response.isError) setError("Failed to build spacecraft!");
    else alert("Spacecraft built successfully!");
  };

  return (
    <div className="container">
      <h1>Build Spacecraft</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Capacity"
          type="number"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows="4"
        />
        <button type="submit">Build</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <a href="/spacecrafts">Back to Spacecrafts</a>
    </div>
  );
}

export default Construct;