// src/components/FlightParameters.tsx
import { useState, FormEvent } from 'react';

interface FlightParams {
  glideRatio: number;
  speed: number;
  sinkRate: number;
}

interface FlightParametersProps {
  onSubmit: (params: FlightParams) => void;
}

function FlightParameters({ onSubmit }: FlightParametersProps) {
  const [glideRatio, setGlideRatio] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [sinkRate, setSinkRate] = useState<number>(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ glideRatio, speed, sinkRate });
  };

  return (
    <form onSubmit={handleSubmit} className="flight-form">
      <div>
        <label>Glide Ratio: </label>
        <input
          type="number"
          value={glideRatio}
          onChange={(e) => setGlideRatio(parseFloat(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Speed (km/h): </label>
        <input
          type="number"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Sink Rate (m/s): </label>
        <input
          type="number"
          value={sinkRate}
          onChange={(e) => setSinkRate(parseFloat(e.target.value))}
          required
        />
      </div>
      <button className="bg-black text-white w-fit p-3 rounded-md" type="submit">Submit Parameters</button>
    </form>
  );
}

export default FlightParameters;
