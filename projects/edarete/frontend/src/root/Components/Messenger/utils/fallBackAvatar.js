// Helper: get initial and random color for fallback avatar
export const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");
export const getColor = (name) => {
  if (!name) return "#6c757d";
  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#3f51b5",
    "#2196f3",
    "#009688",
    "#4caf50",
    "#ff9800",
    "#795548",
    "#607d8b",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};
