import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpaceTravelApi from "../src/services/SpaceTravelApi";

function Spacecraft() {
  const { id } = useParams();
  const [spacecraft, setSpacecraft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpacecraft() {
      const response = await SpaceTravelApi.getSpacecraftById({ id });
      if (!response.isError) setSpacecraft(response.data);
      setLoading(false);
    }
    fetchSpacecraft();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!spacecraft) return <div>Spacecraft not found</div>;

  return (
    <div className="container">
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h1>{spacecraft.name}</h1>
        <p><strong>Capacity:</strong> {spacecraft.capacity}</p>
        <p><strong>Description:</strong> {spacecraft.description}</p>
        <p><strong>Location:</strong> {spacecraft.currentLocation}</p>
      </div>
      <a href="/spacecrafts" style={{ marginTop: '20px', display: 'inline-block' }}>
        Back to Spacecrafts
      </a>
    </div>
  );
}

export default Spacecraft;