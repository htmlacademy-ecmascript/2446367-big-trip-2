import TripInfoView from '../view/trip-info-view.js';
import ListFilterView from '../view/list-filter-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { FilterType, UpdateType } from '../data.js';
import { filter } from '../utils/filter.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #listFiltersContainer = null;

  #waypointModel = null;
  #filterModel = null;

  #filterComponent = null;
  #headerComponent = new TripInfoView();

  constructor({ headerContainer, listFiltersContainer, waypointModel, filterModel }) {
    this.#headerContainer = headerContainer;
    this.#listFiltersContainer = listFiltersContainer;

    this.#waypointModel = waypointModel;
    this.#filterModel = filterModel;

    this.#waypointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const waypoints = this.#waypointModel.waypoints;

    return Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](waypoints).length
    }));
  }

  init() {
    render(this.#headerComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);

    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new ListFilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#listFiltersContainer);
      remove(prevFilterComponent);
    }
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
