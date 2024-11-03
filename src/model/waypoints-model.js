import { mockWaypoints } from '../mock/mock-waypoints.js';
import { mockOffers } from '../mock/mock-offers.js';
import { mockDestinations } from '../mock/mock-destinations.js';

export default class WaypointsModel {
  #waypoints = mockWaypoints;
  #offers = mockOffers;
  #destinations = mockDestinations;

  get waypoints() {
    return this.#waypoints;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
