import React, { useEffect, useState } from "react";
import SpaceTravelApi from "../src/services/SpaceTravelApi";

function Spacecrafts() {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpacecrafts() {
      const response = await SpaceTravelApi.getSpacecrafts();
      if (!response.isError) setSpacecrafts(response.data);
      setLoading(false);
    }
    fetchSpacecrafts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Spacecrafts</h1>
      {spacecrafts.map((sc) => (
        <div key={sc.id} style={{ 
          background: 'white', 
          padding: '20px', 
          margin: '10px 0', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>{sc.name}</h3>
          <p>Capacity: {sc.capacity}</p>
          <a href={`/spacecraft/${sc.id}`}>View Details</a> | 
          <a href={`/destroy/${sc.id}`}>Destroy</a>
        </div>
      ))}
      <a href="/construct" style={{
        display: 'inline-block',
        backgroundColor: '#1a73e8',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '4px',
        textDecoration: 'none',
        marginTop: '20px'
      }}>Build New Spacecraft</a>
    </div>
  );
}

export default Spacecrafts;