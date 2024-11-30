import WaypointListView from '../view/waypoint-list-view.js';
import ListSortView from '../view/list-sort-view.js';
import NoWaypointView from '../view/no-waypoint-view.js';
import WaypointPresenter from './waypoint-presenter.js';
import { remove, render } from '../framework/render.js';
import { FilterType, SortType, UpdateType, UserAction } from '../data.js';
import { filter } from '../utils/filter.js';
import { sortByTime, sortByPrice } from '../utils/waypoints.js';

export default class BoardPresenter {
  #boardContainer = null;
  #sortComponent = null;

  #waypointModel = null;
  #filterModel = null;

  #waypointListComponent = new WaypointListView();
  #noWaypointComponent = new NoWaypointView();

  #boardOffers = [];
  #boardDestinations = [];

  #waypointPresenters = new Map();

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({ boardContainer, waypointModel, filterModel }) {
    this.#boardContainer = boardContainer;
    this.#waypointModel = waypointModel;
    this.#filterModel = filterModel;

    this.#waypointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get waypoints() {
    this.#filterType = this.#filterModel.filter;
    const waypoints = this.#waypointModel.waypoints;
    const filterWaypoint = filter[this.#filterType](waypoints);

    switch(this.#currentSortType) {
      case SortType.TIME:
        return filterWaypoint.sort(sortByTime);
      case SortType.PRICE:
        return filterWaypoint.sort(sortByPrice);
    }

    return filterWaypoint;
  }

  init() {
    this.#boardOffers = [...this.#waypointModel.offers];
    this.#boardDestinations = [...this.#waypointModel.destinations];

    this.#renderBoard();
  }

  #renderWaypointItem({ waypoint, offers, destinations }) {
    const waypointPresenter = new WaypointPresenter({
      waypointListContainer: this.#waypointListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    waypointPresenter.init(waypoint, offers, destinations);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  #renderBoard() {
    if (this.waypoints.length === 0) {
      this.#renderNoWaypoint();
      return;
    }

    this.#renderSort();

    render(this.#waypointListComponent, this.#boardContainer);

    this.waypoints.map((waypoint) => this.#renderWaypointItem({
      waypoint: waypoint,
      offers: this.#boardOffers,
      destinations: this.#boardDestinations,
    }));
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_WAYPOINT:
        this.#waypointModel.updateWaypoint(updateType, update);
        break;
      case UserAction.ADD_WAYPOINT:
        this.#waypointModel.addWaypoint(updateType, update);
        break;
      case UserAction.DELETE_WAYPOINT:
        this.#waypointModel.deleteWaypoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#waypointPresenters.get(data.id).init(data, this.#boardOffers, this.#boardDestinations);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#waypointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #clearBoard({ resetSortType = false } = {}) {
    this.#waypointPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noWaypointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderSort() {
    this.#sortComponent = new ListSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#boardContainer);
  }

  #renderNoWaypoint() {
    render(this.#noWaypointComponent, this.#boardContainer);
  }
}
