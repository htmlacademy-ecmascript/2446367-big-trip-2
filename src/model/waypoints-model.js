import { UpdateType } from '../data.js';
import Observable from '../framework/observable.js';

export default class WaypointsModel extends Observable {
  #waypointApiService = null;
  #waypoints = [];
  #offers = [];
  #destinations = [];

  constructor({ waypointApiService }) {
    super();

    this.#waypointApiService = waypointApiService;
  }

  async init() {
    try {
      const waypoints = await this.#waypointApiService.waypoints;

      this.#waypoints = waypoints.map(this.#adaptToClient);
      this.#offers = await this.#waypointApiService.offers;
      this.#destinations = await this.#waypointApiService.destinations;
    } catch (err) {
      this.#waypoints = [];
      this.#offers = [];
      this.destinations = [];
    }

    this._notify(UpdateType.INIT);
  }

  get waypoints() {
    return this.#waypoints;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  #adaptToClient(waypoint, isAddWaypoint) {
    const adaptedWaypoint = {
      ...waypoint,
      basePrice: waypoint['base_price'],
      dateFrom: waypoint['date_from'],
      dateTo: waypoint['date_to'],
      isFavorite: waypoint['is_favorite'],
    };

    if (isAddWaypoint) {
      delete adaptedWaypoint['id'];
    }
    delete adaptedWaypoint['base_price'];
    delete adaptedWaypoint['date_from'];
    delete adaptedWaypoint['date_to'];
    delete adaptedWaypoint['is_favorite'];

    return adaptedWaypoint;
  }

  async updateWaypoint(updateType, update) {
    const index = this.#waypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting waypoint');
    }

    try {
      const response = await this.#waypointApiService.updateWaypoint(update);
      const updatedWaypoint = this.#adaptToClient(response);

      this.#waypoints = [
        ...this.#waypoints.slice(0, index),
        updatedWaypoint,
        ...this.#waypoints.slice(index + 1),
      ];

      this._notify(updateType, updatedWaypoint);
    } catch (err) {
      throw new Error('Can\'t updated waypoint');
    }
  }

  async addWaypoint(updateType, update) {
    try {
      const response = await this.#waypointApiService.addWaypoint(update);
      const newWaypoint = this.#adaptToClient(response);

      this.#waypoints = [
        newWaypoint,
        ...this.#waypoints
      ];

      this._notify(updateType, newWaypoint);
    } catch (err) {
      throw new Error('Can\'t add new waypoint');
    }
  }

  async deleteWaypoint(updateType, update) {
    const index = this.#waypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting waypoint');
    }

    try {
      await this.#waypointApiService.deleteWaypoint(update);

      this.#waypoints = [
        ...this.#waypoints.slice(0, index),
        ...this.#waypoints.slice(index + 1),
      ];

      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete waypoint');
    }
  }
}
