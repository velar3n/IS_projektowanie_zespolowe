export const formatDate = (dateInput: string) => {
  const date = new Date(dateInput);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
