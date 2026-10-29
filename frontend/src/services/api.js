export const locations = [
  { name: 'Delhi, India', latitude: 28.6139, longitude: 77.209 },
  { name: 'Mumbai, India', latitude: 19.076, longitude: 72.8777 },
  { name: 'Bengaluru, India', latitude: 12.9716, longitude: 77.5946 },
  { name: 'Chennai, India', latitude: 13.0827, longitude: 80.2707 },
  { name: 'Kolkata, India', latitude: 22.5726, longitude: 88.3639 },
]

export async function fetchSafetyData(location) {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code',
    hourly: 'precipitation_probability',
    timezone: 'auto',
    forecast_days: '1',
  })

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
  if (!response.ok) throw new Error(`Weather service returned ${response.status}`)

  const data = await response.json()
  return calculateSafetyData(location, data)
}

function weatherLabel(code) {
  if (code === 0) return 'Clear sky'
  if (code <= 3) return 'Partly cloudy'
  if (code <= 48) return 'Foggy'
  if (code <= 67) return 'Rainy'
  if (code <= 77) return 'Snowy'
  if (code <= 82) return 'Rain showers'
  if (code <= 99) return 'Thunderstorm'
  return 'Unknown'
}

function calculateSafetyData(location, data) {
  const current = data.current
  const temperature = current.temperature_2m
  const humidity = current.relative_humidity_2m
  const apparent = current.apparent_temperature
  const wind = current.wind_speed_10m
  const precipitation = current.precipitation
  const weatherCode = current.weather_code

  let score = 8
  if (apparent >= 35 || apparent <= 7) score += 32
  else if (apparent >= 30 || apparent <= 12) score += 18
  if (humidity >= 85 || humidity <= 20) score += 15
  else if (humidity >= 75) score += 8
  if (wind >= 35) score += 20
  else if (wind >= 25) score += 10
  if (precipitation >= 4) score += 20
  else if (precipitation > 0) score += 10
  if ([95, 96, 99].includes(weatherCode)) score += 20

  score = Math.min(score, 100)
  const status = score >= 55 ? 'High' : score >= 30 ? 'Medium' : 'Low'

  return {
    location: location.name,
    temperature: Math.round(temperature),
    apparent: Math.round(apparent),
    humidity,
    wind: Math.round(wind),
    precipitation,
    weather: weatherLabel(weatherCode),
    status,
    score,
    updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
}
