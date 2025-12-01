// src/data/announcements.js
export const announcements = [
  {
    id: 'orders-close-tonight',
    message: 'ORDERS FOR THIS WEEK CLOSE TONIGHT (MONDAY) AT MIDNIGHT - ORDER NOW!🍰✨',
    type: 'warning',
    daysOfWeek: [1], // Monday (0 = Sunday)
  },
  {
    id: 'spring-menu',
    message: 'Spring specials are live — rhubarb tarts and pistachio rolls available this month.',
    start: '2026-03-01',
    end: '2026-03-31',
    type: 'info',
  },
  {
    id: 'black-friday',
    message: 'Black Friday: 25% off boxes — add code SWEET25 at checkout.',
    start: '11-25', // recurring every year (MM-DD)
    end: '11-30',
    type: 'warning',
  },
  {
    id: 'sold-out',
    message: 'Oops... THIS WEEKEND IS SOLD OUT! FOR NEXT WEEK - ORDER BY MONDAY NIGHT',
    type: 'error',
  },
];
