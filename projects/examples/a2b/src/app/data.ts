import { Trip } from './types';

export const cities = ['Kookshavn', 'Nejork', 'Johanburgh', 'Tookiou'];

export const trips: Trip[] = [
  {
    from: 'Kookshavn',
    to: 'Nejork',
    directions: [
      {
        type: 'walk',
        amount: 500,
        unit: 'miles',
        duration: {
          amount: 166,
          unit: 'hours',
        },
      },
      {
        type: 'flight',
        departure: {
          airport: 'Kookshavn Intl',
          gate: 'A38 (probably wrong)',
          date: '2020-12-15 13:37:00',
        },
        arrival: {
          airport: 'KFJ Airport',
          gate: undefined,
          date: '2020-12-16 08:15:00',
        },
        checkinUrl:
          'https://www.google.com/search?rlz=1C1CHBF_deDE908DE908&biw=1920&bih=1089&ei=0GnVX_3_D-_jkgWd9Qc&q=cuxhaven+to+new+york+flight&oq=cuxhaven+to+new+york+flight&gs_lcp=CgZwc3ktYWIQA1AAWABgpihoAXAAeACAAQCIAQCSAQCYAQCqAQdnd3Mtd2l6wAEB&sclient=psy-ab&ved=0ahUKEwj9p9ju4sntAhXvsaQKHZ36AQAQ4dUDCA0&uact=5',
      },
      {
        type: 'walk',
        amount: 500,
        unit: 'miles',
        duration: {
          amount: 210,
          unit: 'hours',
        },
      },
    ],
  },
  {
    from: 'Johanburgh',
    to: 'Tookiou',
    directions: [
      {
        type: 'cab',
        price: '>9000',
      },
    ],
  },
  {
    from: 'Nejork',
    to: 'Johanburgh',
    directions: [
      {
        type: 'walk',
        amount: 1,
        unit: 'maze',
        duration: {
          amount: 42,
          unit: 'minutes',
        },
      },
      {
        type: 'train',
        operator: 'DeutschBahn',
      },
    ],
  },
];
