import { filter } from '../utils/filter.js';

function generateFilter(waypoints) {
  return Object.entries(filter).map(
    ([filterType, filterWaypoints]) => ({
      type: filterType,
      count: filterWaypoints(waypoints).length,
    }),
  );
}

export { generateFilter };
