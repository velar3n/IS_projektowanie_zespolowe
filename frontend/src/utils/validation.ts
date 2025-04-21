import { TFunction } from 'i18next';

export const isValidDate = (t: TFunction, date: string) => {
  const parsedDate = new Date(date);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return parsedDate >= currentDate || t('dateInThePast');
};

export const checkIfSecondDateBigger = (
  t: TFunction,
  firstDate: string,
  secondDate: string,
  destination: string,
) => {
  const firstDateParsed = new Date(firstDate);
  const secondDateParsed = new Date(secondDate);

  return (
    firstDateParsed >= secondDateParsed || t('laterDate', { name: destination })
  );
};
