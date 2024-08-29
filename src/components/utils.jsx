const colors = ['#ff0000', '#00ff00', '#0000ff']; // Example colors

export default function generateRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}