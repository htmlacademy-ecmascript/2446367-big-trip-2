import WaypointListView from '../view/waypoint-list-view.js';
import WaypointItemView from '../view/waypoint-item-view.js';
import ListSortView from '../view/list-sort-view.js';
import { render } from '../framework/render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #waypointModel = null;

  #listContainer = new WaypointListView();
  #listSortView = new ListSortView();

  #boardWaypoints = [];

  constructor({ boardContainer, waypointModel }) {
    this.#boardContainer = boardContainer;
    this.#waypointModel = waypointModel;
  }

  init() {
    const waypoints = this.#waypointModel.waypoints;
    const offers = this.#waypointModel.offers;
    const destinations = this.#waypointModel.destinations;

    this.#boardWaypoints = [...waypoints];

    render(this.#listSortView, this.#boardContainer);

    render(this.#listContainer, this.#boardContainer);

    for (let i = 0; i < this.#boardWaypoints.length; i++) {
      this.#renderWaypointItem({
        waypoints: this.#boardWaypoints[i],
        offers: offers,
        destinations: destinations,
      });
    }
  }

  #renderWaypointItem({waypoints, offers, destinations}) {
    const waypointItemComponent = new WaypointItemView({
      waypoints,
      offers,
      destinations,
    });

    render(waypointItemComponent, this.#listContainer.element);
  }
}
