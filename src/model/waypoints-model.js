import { mockWaypoints } from '../mock/mock-waypoints.js';
import { mockOffers } from '../mock/mock-offers.js';
import { mockDestinations } from '../mock/mock-destinations.js';

export default class waypointsModel {
  waypoints = mockWaypoints;
  offers = mockOffers;
  destinations = mockDestinations;

  getWaypoints() {
    return this.waypoints;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
