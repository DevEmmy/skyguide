interface WeatherCondition {
    temp_c: number;
    condition: string; // e.g., "Clear", "Rain", "Fog"
    wind_kph: number;
    humidity: number;
  }
  
  export function rateParaglidingSuitability(weather: WeatherCondition): { suitability: string, rating: number } {
    let rating = 5;
  
    // Evaluate wind speed (Ideal wind speed is between 8-20 kph)
    if (weather.wind_kph < 8) {
      rating -= 2; // Too weak for paragliding
    } else if (weather.wind_kph > 20) {
      rating -= 2; // Too strong, dangerous for paragliding
    }
  
    // Evaluate weather conditions
    if (weather.condition.includes("Rain") || weather.condition.includes("Storm")) {
      rating -= 3; // Dangerous, poor visibility and strong winds
    } else if (weather.condition.includes("Fog")) {
      rating -= 2; // Poor visibility
    } else if (weather.condition.includes("Clear") || weather.condition.includes("Cloudy")) {
      rating += 1; // Good weather for paragliding
    }
  
    // Evaluate temperature (best paragliding conditions are between 10°C to 25°C)
    if (weather.temp_c < 10 || weather.temp_c > 25) {
      rating -= 1; // Less ideal temperature
    }
  
    // Evaluate humidity (high humidity > 80% can indicate poor weather stability)
    if (weather.humidity > 80) {
      rating -= 1; // High humidity might lead to fog or storms
    }
  
    // Ensure rating is within bounds (0-5)
    rating = Math.max(0, Math.min(rating, 5));
  
    // Provide suitability message
    let suitability;
    if (rating >= 4) {
      suitability = "Great for paragliding";
    } else if (rating >= 3) {
      suitability = "Good for paragliding";
    } else if (rating >= 2) {
      suitability = "Risky for paragliding";
    } else {
      suitability = "Not safe for paragliding";
    }
  
    return { suitability, rating };
  }
  