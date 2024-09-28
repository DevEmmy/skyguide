// src/components/FlightSimulation.tsx

interface FlightParams {
    glideRatio: number;
    speed: number;
    sinkRate: number;
  }
  
  interface FlightSimulationProps {
    waypoints: [number, number][];
    flightParams: FlightParams | null;
  }
  
  function FlightSimulation({ waypoints, flightParams }: FlightSimulationProps) {
    // Helper function to calculate distance between two points using Haversine formula
    const calculateDistance = (point1: [number, number], point2: [number, number]): number => {
      const [lat1, lon1] = point1;
      const [lat2, lon2] = point2;
      const R = 6371; // Radius of Earth in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
    };
  
    const calculateTotalDistance = (): number => {
      let totalDistance = 0;
      if (waypoints.length > 1) {
        for (let i = 1; i < waypoints.length; i++) {
          totalDistance += calculateDistance(waypoints[i - 1], waypoints[i]);
        }
      }
      return totalDistance;
    };
  
    const calculateFlightTime = (totalDistance: number, speed: number): number => {
      return totalDistance / speed; // time in hours
    };
  
    if (!flightParams) return null;
  
    const totalDistance = calculateTotalDistance();
    const flightTime = calculateFlightTime(totalDistance, flightParams.speed);
  
    return (
      <div className="flight-stats">
        <h3>Flight Simulation Results</h3>
        <p>Total Distance: {totalDistance.toFixed(2)} km</p>
        <p>Estimated Flight Time: {flightTime.toFixed(2)} hours</p>
      </div>
    );
  }
  
  export default FlightSimulation;
  