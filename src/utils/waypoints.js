import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { DateFormat,
  MILLISECONDS_IN_MINUTES,
  SECONDS_IN_MINUTES,
  HOURS_IN_DAY } from '../data.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

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

const isWaypointFuture = (date) => date && dayjs().isAfter(date);
const isWaypointPast = (date) => date && dayjs().isBefore(date);
const isWaypointPastAndFuture = (dateFrom, dateTo) => dayjs().isSameOrBefore(dateFrom) && dayjs().isSameOrAfter(dateTo);

export {
  humanizeDate,
  getDifferenceInTime,
  isWaypointFuture,
  isWaypointPast,
  isWaypointPastAndFuture,
};
