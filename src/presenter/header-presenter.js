import TripInfoView from '../view/trip-info-view.js';
import ListFilterView from '../view/list-filter-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #listFiltersContainer = null;

  #filters = [];

  #headerComponent = new TripInfoView();

  constructor({ headerContainer, listFiltersContainer, filters }) {
    this.#headerContainer = headerContainer;
    this.#listFiltersContainer = listFiltersContainer;
    this.#filters = filters;
  }

  init() {
    render(this.#headerComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
    render(new ListFilterView({filters: this.#filters}), this.#listFiltersContainer);
  }
}
