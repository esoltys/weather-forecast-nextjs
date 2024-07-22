import { WindDirectionType } from "@/types/weather";

export function getWindDirection({ degrees }: WindDirectionType): string {
  const directions: string[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(degrees / 45) % 8];
}

export function getWindDirectionArrow({ degrees }: WindDirectionType): string {
  const arrows = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"];
  return arrows[Math.round(degrees / 45) % 8];
}

export function getTemperatureColor(temp: number): string {
  if (temp <= 0) return "#1E90FF"; // Dodger Blue for freezing
  if (temp <= 10) return "#00CED1"; // Dark Turquoise for cold
  if (temp <= 20) return "#32CD32"; // Lime Green for mild
  if (temp <= 30) return "#FFA500"; // Orange for warm
  return "#FF4500"; // Orange Red for hot
}
