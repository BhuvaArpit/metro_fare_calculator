import React, { useState } from "react";
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer
import './MetroFareCalculator.css'; // Import the CSS

const MetroFareCalculator = () => {
  const [fromStation, setFromStation] = useState("Vastral Gam");
  const [toStation, setToStation] = useState("Kalupur Railway Station");
  const [fareDetails, setFareDetails] = useState({ fare: 0, stations: 0, interchange: 0, interchangeStation: "" });

  // Red and Blue Line Station Data
  const redLineStations = [
    "APMC", "Jivaraj Park", "Ravinagar", "Shreyas", "Paldi", "Gandhigram", 
    "Old High Court", "Usmanpura", "Vijayanagar", "Vadaj", "Ranip", 
    "Sabarmati Railway Station", "AEC", "Sabarmati", "Motera Stadium"
  ];

  const blueLineStations = [
    "Nirant Cross Road", "Vastral Gam", "Rabari Colony", "Amraiwadi", 
    "Apparel Park", "Kankaria East", "Kalupur Railway Station", "Ghee Kanta", 
    "Shahpur", "Old High Court", "Stadium", "Commerce Six Road", 
    "Gujarat University", "Gurukul Road", "Doordarshan Kendra", "Thaltej"
  ];

  const commonStations = ["Old High Court", "Apparel Park"];

  const stationData = {
    "Vastral Gam": { fare: { "Kalupur Railway Station": 15, "Apparel Park": 10 }, interchange: 0 },
    "Kalupur Railway Station": { fare: { "Vastral Gam": 15, "Old High Court": 20 }, interchange: 0 },
    "Old High Court": { fare: { 
        "Kalupur Railway Station": 20, 
        "Vastral Gam": 15, 
        "Apparel Park": 25, 
        "APMC": 25 
      }, interchange: 1 },
    "Apparel Park": { fare: { 
        "Kalupur Railway Station": 12, 
        "Vastral Gam": 10, 
        "Old High Court": 25 
      }, interchange: 0 },
    "APMC": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Jivaraj Park": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Ravinagar": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Shreyas": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Paldi": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Gandhigram": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Usmanpura": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Vijayanagar": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Vadaj": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Ranip": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Sabarmati Railway Station": { fare: { "Old High Court": 15 }, interchange: 0 },
    "AEC": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Sabarmati": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Motera Stadium": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Nirant Cross Road": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Rabari Colony": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Amraiwadi": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Kankaria East": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Ghee Kanta": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Shahpur": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Stadium": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Commerce Six Road": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Gujarat University": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Gurukul Road": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Doordarshan Kendra": { fare: { "Old High Court": 15 }, interchange: 0 },
    "Thaltej": { fare: { "Old High Court": 15 }, interchange: 0 }
  };

  const handleCalculateFare = () => {
    if (fromStation === toStation) {
      setFareDetails({ fare: 0, stations: 0, interchange: 0, interchangeStation: "" });
      return;
    }

    const fromIsRedLine = redLineStations.includes(fromStation);
    const toIsRedLine = redLineStations.includes(toStation);
    const fromIsBlueLine = blueLineStations.includes(fromStation);
    const toIsBlueLine = blueLineStations.includes(toStation);

    let interchange = 0;
    let interchangeStation = "None";

    // Logic for interchange based on station combinations
    if ((fromIsRedLine && toIsBlueLine) || (fromIsBlueLine && toIsRedLine)) {
      interchange = 1; // Interchange needed
      interchangeStation = commonStations.find(station => 
        (fromStation in stationData && stationData[fromStation].fare[station]) || 
        (toStation in stationData && stationData[toStation].fare[station])
      ) || "None";
    } else if ((fromIsRedLine && toIsRedLine) || (fromIsBlueLine && toIsBlueLine)) {
      interchange = 0; // No interchange needed
    }

    const fromData = stationData[fromStation];

    // Check if fromData exists before accessing fare
    if (fromData && toStation in fromData.fare) {
      const toFare = fromData.fare[toStation];
      
      setFareDetails({
        fare: toFare || 0,
        stations: Object.keys(fromData.fare).length,
        interchange,
        interchangeStation: interchangeStation || "None",
      });
    } else {
      // Handle case where fare data is not found
      setFareDetails({
        fare: 0,
        stations: 0,
        interchange: 0,
        interchangeStation: "None",
      });
    }
  };

  return (
    <div className="container">
      <Header />
      <h2>Metro Fare Calculator</h2>
      <div className="fare-box">
        <label>From</label>
        <select value={fromStation} onChange={(e) => setFromStation(e.target.value)}>
          {blueLineStations.concat(redLineStations).map((station) => (
            <option key={station} value={station}>
              {station}
            </option>
          ))}
        </select>

        <label>To</label>
        <select value={toStation} onChange={(e) => setToStation(e.target.value)}>
          {blueLineStations.concat(redLineStations).map((station) => (
            <option key={station} value={station}>
              {station}
            </option>
          ))}
        </select>

        <button onClick={handleCalculateFare}>Show me Fare</button>
      </div>

      <div className="output">
        <div>₹ Fare - {fareDetails.fare}</div>
        <div>Between Stations - {fareDetails.stations}</div>
        <div>Interchange - {fareDetails.interchange}</div>
        {fareDetails.interchangeStation && <div>Common Station: {fareDetails.interchangeStation}</div>}
      </div>
      <Footer />
    </div>
  );
};

export default MetroFareCalculator;
