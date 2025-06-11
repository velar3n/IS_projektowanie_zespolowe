const pastelColors = [
  '#FFB3BA', // Light Pink
  '#FFDFBA', // Light Orange
  '#FFFFBA', // Light Yellow
  '#BAFFC9', // Light Green
  '#BAE1FF', // Light Blue
  '#E0BBE4', // Lavender
  '#D5AAFF', // Soft Purple
  '#A0E7E5', // Mint
  '#B5EAD7', // Aquamarine
  '#C7CEEA', // Periwinkle
];

export function getRandomPastelColor() {
  const randomIndex = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[randomIndex];
}
