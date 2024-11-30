import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import duration from 'dayjs/plugin/duration';
import {
  DateFormat,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_DAY,
} from '../data.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDifferenceInTime(start, end) {
  const difference = dayjs(end).diff(dayjs(start));

  switch (true) {
    case difference < MILLISECONDS_IN_HOUR:
      return dayjs.duration(difference).format(DateFormat.MINUTES_WITH_POSTFIX);

    case difference >= MILLISECONDS_IN_HOUR && difference < MILLISECONDS_IN_DAY:
      return dayjs.duration(difference).format(DateFormat.HOUR_MINUTES_WITH_POSTFIX);

    case difference >= MILLISECONDS_IN_DAY:
      return dayjs.duration(difference).format(DateFormat.DAY_HOUR_MINUTES_WITH_POSTFIX);
  }
}

const isWaypointFuture = (date) => date && dayjs(date).isAfter(dayjs().format());
const isWaypointPast = (date) => date && dayjs().isBefore(dayjs().format());
const isWaypointPastAndFuture = (dateFrom, dateTo) => dayjs(dateFrom).isSameOrBefore(dayjs().format()) && dayjs(dateTo).isSameOrAfter(dayjs().format());
const sortByTime = (a, b) => dayjs(a.dateFrom).diff(a.dateTo) - dayjs(b.dateFrom).diff(b.dateTo);
const sortByPrice = (a, b) => b.basePrice - a.basePrice;


export {
  humanizeDate,
  getDifferenceInTime,
  isWaypointFuture,
  isWaypointPast,
  isWaypointPastAndFuture,
  sortByTime,
  sortByPrice,
};
