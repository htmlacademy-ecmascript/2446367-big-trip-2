import dayjs from 'dayjs';
import { DateFormat,
  MILLISECONDS_IN_MINUTES,
  SECONDS_IN_MINUTES,
  HOURS_IN_DAY } from '../data.js';

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDifferenceInTime(start, end) {
  const difference = dayjs(end).diff(start) / MILLISECONDS_IN_MINUTES;

  switch (difference) {
    case difference < SECONDS_IN_MINUTES:
      return dayjs(difference).format(DateFormat.MINUTES_WITH_POSTFIX);

    case difference > SECONDS_IN_MINUTES && difference < SECONDS_IN_MINUTES * HOURS_IN_DAY:
      return dayjs(difference).format(DateFormat.HOUR_MINUTES_WITH_POSTFIX);

    default:
      return dayjs(difference).format(DateFormat.DAY_HOUR_MINUTES_WITH_POSTFIX);
  }
}

export { humanizeDate, getDifferenceInTime };
