// Material Design 500
export function getColorByIndex(index) {
  const module = index % 16;
  switch (module) {
    case 0:
      return "#2196F3"; // Blue
    case 1:
      return "#03A9F4"; // Light Blue
    case 2:
      return "#00BCD4"; // Cyan
    case 3:
      return "#009688"; // Teal
    case 4:
      return "#4CAF50"; // Green
    case 5:
      return "#8BC34A"; // Light Green
    case 6:
      return "#CDDC39"; // Lime
    case 7:
      return "#FFEB3B"; // Yellow
    case 8:
      return "#FFC107"; // Amber
    case 9:
      return "#FFB74D"; // Orange
    case 10:
      return "#FF5722"; // Deep Orange
    case 11:
      return "#F44336"; // Red
    case 12:
      return "#E91E63"; // Pink
    case 13:
      return "#9C27B0"; // Purple
    case 14:
      return "#673AB7"; // Deep Purple
    case 15:
      return "#3F51B5"; // Indigo
  }
}
