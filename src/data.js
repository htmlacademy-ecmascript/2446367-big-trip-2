const WAYPOINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaraunt'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const MILLISECONDS_IN_HOUR = 3600000;

const MILLISECONDS_IN_DAY = 86400000;

const DateFormat = {
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM D',
  HOUR_MINUTES: 'HH:mm',
  DAY_MONTH_YEAR: 'DD/MM/YY[&nbsp;]HH:mm',
  MINUTES_WITH_POSTFIX: 'mm[M]',
  HOUR_MINUTES_WITH_POSTFIX: 'HH[H] mm[M]',
  DAY_HOUR_MINUTES_WITH_POSTFIX: 'DD[D] HH[H] mm[M]',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export {
  WAYPOINT_TYPE,
  FilterType,
  DateFormat,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_DAY,
  Mode,
  SortType
};
