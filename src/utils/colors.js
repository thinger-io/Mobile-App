export function getColorByIndex(index) {
  const module = index % 16;
  switch (module) {
    case 0:
      return "#90CAF9"; // Blue
    case 1:
      return "#81D4FA"; // Light Blue
    case 2:
      return "#4DD0E1"; // Cyan
    case 3:
      return "#80CBC4"; // Teal
    case 4:
      return "#A5D6A7"; // Green
    case 5:
      return "#AED581"; // Light Green
    case 6:
      return "#DCE775"; // Lime
    case 7:
      return "#FFF176"; // Yellow
    case 8:
      return "#FFD54F"; // Amber
    case 9:
      return "#FFB74D"; // Orange
    case 10:
      return "#FF8A65"; // Deep Orange
    case 11:
      return "#EF9A9A"; // Red
    case 12:
      return "#F48FB1"; // Pink
    case 13:
      return "#E1BEE7"; // Purple
    case 14:
      return "#D1C4E9"; // Deep Purple
    case 15:
      return "#9FA8DA"; // Indigo
    default:
      return "#C5CAE9";
  }
}
