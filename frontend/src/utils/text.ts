export const snakeToTitleCase = (input: string): string => {
  return input
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const camelCaseToTitleCase = (input: string): string => {
  return input
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};
