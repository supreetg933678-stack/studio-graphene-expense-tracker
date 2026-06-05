import { endOfMonth, startOfMonth, subMonths } from 'date-fns';

export function getRangeBounds(range, customRange) {
  const now = new Date();

  if (range === 'Last Month') {
    const lastMonth = subMonths(now, 1);
    return {
      from: startOfMonth(lastMonth),
      to: endOfMonth(lastMonth),
    };
  }

  if (range === 'Custom Range') {
    return {
      from: customRange.from ? new Date(customRange.from) : null,
      to: customRange.to ? new Date(customRange.to) : null,
    };
  }

  return {
    from: startOfMonth(now),
    to: endOfMonth(now),
  };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
