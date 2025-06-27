import React, { useEffect, useState } from "react";
import SpaceTravelApi from "../src/services/SpaceTravelApi";

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [planetResponse, spacecraftResponse] = await Promise.all([
        SpaceTravelApi.getPlanets(),
        SpaceTravelApi.getSpacecrafts(),
      ]);
      if (!planetResponse.isError) setPlanets(planetResponse.data);
      if (!spacecraftResponse.isError) setSpacecrafts(spacecraftResponse.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSend = async (spacecraftId, targetPlanetId) => {
    const response = await SpaceTravelApi.sendSpacecraftToPlanet({
      spacecraftId,
      targetPlanetId,
    });
    if (response.isError) alert(response.data.message);
    else window.location.reload();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Planets</h1>
      {planets.map((planet) => (
        <div key={planet.id} style={{ 
          background: 'white', 
          padding: '20px', 
          margin: '10px 0', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>{planet.name} (Pop: {planet.currentPopulation})</h3>
          {spacecrafts
            .filter((sc) => sc.currentLocation === planet.id)
            .map((sc) => (
              <div key={sc.id} style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '10px', 
                margin: '10px 0',
                borderRadius: '4px'
              }}>
                <p>
                  <strong>{sc.name}</strong> (Capacity: {sc.capacity})
                </p>
                <select
                  onChange={(e) =>
                    handleSend(sc.id, parseInt(e.target.value))
                  }
                  style={{ marginTop: '5px' }}
                >
                  <option value="">Send to...</option>
                  {planets
                    .filter((p) => p.id !== planet.id)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>
            ))}
        </div>
      ))}
      <a href="/spacecrafts">Back to Spacecrafts</a>
    </div>
  );
}

export default Planets;