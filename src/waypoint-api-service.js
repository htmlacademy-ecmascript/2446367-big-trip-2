import ApiService from './framework/api-service';

const BaseUrl = {
  WAYPOINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

const ApiMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class WaypointApiService extends ApiService {
  get waypoints() {
    return this._load({
      url: BaseUrl.WAYPOINTS
    }).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({
      url: BaseUrl.OFFERS
    }).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({
      url: BaseUrl.DESTINATIONS
    }).then(ApiService.parseResponse);
  }

  async updateWaypoint (waypoint) {
    const response = await this._load({
      url: `${BaseUrl.WAYPOINTS}/${waypoint.id}`,
      method: ApiMethod.PUT,
      body: JSON.stringify(this.#adaptToServer(waypoint)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addWaypoint (waypoint) {
    const response = await this._load({
      url: BaseUrl.WAYPOINTS,
      method: ApiMethod.POST,
      body: JSON.stringify(this.#adaptToServer(waypoint)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteWaypoint (waypoint) {
    const response = await this._load({
      url: `${BaseUrl.WAYPOINTS}/${waypoint.id}`,
      method: ApiMethod.DELETE,
    });

    return response;
  }

  #adaptToServer(waypoint) {
    const adaptedWaypoint = {
      ...waypoint,
      'base_price': waypoint.basePrice,
      'date_from': waypoint.dateFrom,
      'date_to': waypoint.dateTo,
      'is_favorite': waypoint.isFavorite,
    };

    if (waypoint.id === 0) {
      delete adaptedWaypoint.id;
    }
    delete adaptedWaypoint.basePrice;
    delete adaptedWaypoint.dateFrom;
    delete adaptedWaypoint.dateTo;
    delete adaptedWaypoint.isFavorite;

    return adaptedWaypoint;
  }
}
