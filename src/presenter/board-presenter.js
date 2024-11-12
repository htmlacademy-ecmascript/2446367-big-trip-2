import { render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { sortByTime, sortByPrice } from '../utils/waypoints.js';
import WaypointListView from '../view/waypoint-list-view.js';
import ListSortView from '../view/list-sort-view.js';
import NoWaypointView from '../view/no-waypoint-view.js';
import WaypointPresenter from './waypoint-presenter.js';
import { SortType } from '../data.js';

export default class BoardPresenter {
  #boardContainer = null;
  #waypointModel = null;
  #sortComponent = null;

  #waypointListContainer = new WaypointListView();
  #noWaypointView = new NoWaypointView();

  #boardWaypoints = [];
  #boardOffers = [];
  #boardDestinations = [];
  #waypointPresenters = new Map();
  #sourcedWaypoints = [];

  #currentSortType = SortType.DAY;

  constructor({ boardContainer, waypointModel }) {
    this.#boardContainer = boardContainer;
    this.#waypointModel = waypointModel;
  }

  init() {
    this.#boardWaypoints = [...this.#waypointModel.waypoints];
    this.#boardOffers = [...this.#waypointModel.offers];
    this.#boardDestinations = [...this.#waypointModel.destinations];
    this.#sourcedWaypoints = [...this.#waypointModel.waypoints];

    this.#renderBoard();
  }

  #renderWaypointItem({ waypoint, offers, destinations }) {
    const waypointPresenter = new WaypointPresenter({
      waypointListContainer: this.#waypointListContainer.element,
      onDataChange: this.#handleWaypointChange,
      onModeChange: this.#handleModeChange,
    });

    waypointPresenter.init(waypoint, offers, destinations);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  #handleWaypointChange = (updatedWaypoint) => {
    this.#boardWaypoints = updateItem(this.#boardWaypoints, updatedWaypoint);
    this.#waypointPresenters.get(updatedWaypoint.id).init(updatedWaypoint, this.#boardOffers, this.#boardDestinations);
  };

  #handleModeChange = () => {
    this.#waypointPresenters.forEach((waypointPresenter) => waypointPresenter.resetView());
  };

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

  #sortWaypoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#boardWaypoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#boardWaypoints.sort(sortByPrice);
        break;
      default:
        this.#boardWaypoints = [...this.#sourcedWaypoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#sortWaypoints(sortType);
    this.#clearWaypointList();
    this.#renderWaypoints();
  };

  #renderSort() {
    this.#sortComponent = new ListSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#boardContainer);
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
