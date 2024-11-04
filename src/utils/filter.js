import { FilterType } from '../data.js';
import { isWaypointFuture,
  isWaypointPast,
  isWaypointPastAndFuture,
} from './waypoints.js';

const filter = {
  [FilterType.EVERYTHING]: (waypoints) => waypoints,
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isWaypointFuture(waypoint.dateFrom)),
  [FilterType.PRESENT]: (waypoints) => waypoints.filter((waypoint) => isWaypointPastAndFuture(waypoint.dateFrom, waypoint.dateTo)),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => isWaypointPast(waypoint.dateTo)),
};

export { filter };
