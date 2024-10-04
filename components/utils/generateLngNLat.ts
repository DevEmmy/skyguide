const EARTH_RADIUS = 6371000; // Earth radius in meters

// Helper function to convert degrees to radians
function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Helper function to convert radians to degrees
function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

// Define a TypeScript type for latitude/longitude objects
interface LatLng {
  lat: number;
  lng: number;
}

// Generate a random number between min and max
function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Function to generate scattered random lat/lng points around a central location
export function generateRandomLatLngAround(
  lat: number,
  lng: number,
  radiusInMeters: number = 10000,
  pointsCount: number = 500
): LatLng[] {
  const latInRadians = degreesToRadians(lat);
  const lngInRadians = degreesToRadians(lng);

  const locations: LatLng[] = [];

  for (let i = 0; i < pointsCount; i++) {
    // Generate a random angle between 0 and 2π (full circle)
    const angle = randomBetween(0, 2 * Math.PI);

    // Generate a random distance within the radius
    const randomRadius = randomBetween(0, radiusInMeters);

    // Calculate new latitude
    const newLat = lat + (randomRadius / EARTH_RADIUS) * Math.cos(angle) * (180 / Math.PI);

    // Calculate new longitude
    const newLng = lng + (randomRadius / (EARTH_RADIUS * Math.cos(latInRadians))) * Math.sin(angle) * (180 / Math.PI);

    locations.push({ lat: newLat, lng: newLng });
  }

  return locations;
}

