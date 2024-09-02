import dayjs, { Dayjs } from 'dayjs';

export const calculateAmount = (depositAmount: number, dateRange: [Dayjs | null, Dayjs | null]) => {
  if (dateRange[0] && dateRange[1]) {
    const days = dateRange[1].diff(dateRange[0], 'day') + 1;
    return days * depositAmount;
  }
  return 0;
};

export const formatDate = (date: Dayjs) => {
  return date.format('MMMM D');
};

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
  }).format(amount);
};