export function getWindDirection(degrees) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(degrees / 45) % 8];
}

export function getWindDirectionArrow(degrees) {
  const arrows = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"];
  return arrows[Math.round(degrees / 45) % 8];
}

export function getContrastColor(hexcolor) {
  // Convert hex to RGB
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white depending on luminance
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

export function getTemperatureColor(temp) {
  if (temp <= 0) return "#1E90FF"; // Dodger Blue for freezing
  if (temp <= 10) return "#00CED1"; // Dark Turquoise for cold
  if (temp <= 20) return "#32CD32"; // Lime Green for mild
  if (temp <= 30) return "#FFA500"; // Orange for warm
  return "#FF4500"; // Orange Red for hot
}
