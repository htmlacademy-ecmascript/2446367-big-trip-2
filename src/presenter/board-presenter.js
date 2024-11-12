import { render } from '../framework/render.js';
import WaypointListView from '../view/waypoint-list-view.js';
import ListSortView from '../view/list-sort-view.js';
import NoWaypointView from '../view/no-waypoint-view.js';
import WaypointPresenter from './waypoint-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #waypointModel = null;

  #waypointListContainer = new WaypointListView();
  #listSortView = new ListSortView();
  #noWaypointView = new NoWaypointView();

  #boardWaypoints = [];
  #boardOffers = [];
  #boardDestinations = [];
  #waypointPresenters = new Map();

  constructor({ boardContainer, waypointModel }) {
    this.#boardContainer = boardContainer;
    this.#waypointModel = waypointModel;
  }

  init() {
    this.#boardWaypoints = [...this.#waypointModel.waypoints];
    this.#boardOffers = [...this.#waypointModel.offers];
    this.#boardDestinations = [...this.#waypointModel.destinations];

    this.#renderBoard();
  }

  #renderWaypointItem({ waypoint, offers, destinations }) {
    const waypointPresenter = new WaypointPresenter({ waypointListContainer: this.#waypointListContainer.element });

    waypointPresenter.init(waypoint, offers, destinations);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  #renderWaypoints() {
    render(this.#waypointListContainer, this.#boardContainer);

    for (let i = 0; i < this.#boardWaypoints.length; i++) {
      this.#renderWaypointItem({
        waypoint: this.#boardWaypoints[i],
        offers: this.#boardOffers,
        destinations: this.#boardDestinations,
      });
    }
  }

  #renderSort() {
    render(this.#listSortView, this.#boardContainer);
  }

  #renderNoWaypoint() {
    render(this.#noWaypointView, this.#boardContainer);
  }

  #clearWaypointList() {
    this.#waypointPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointPresenters.clear();
  }

  #renderBoard() {
    if (this.#boardWaypoints.length === 0) {
      this.#renderNoWaypoint();
      return;
    }

    this.#renderSort();
    this.#renderWaypoints();
  }
}
