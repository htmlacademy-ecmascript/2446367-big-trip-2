import TripInfoView from '../view/trip-info-view.js';
import ListFilterView from '../view/list-filter-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class HeaderPresenter {
  headerComponent = new TripInfoView();
  listFilterComponent = new ListFilterView();

  constructor({ headerContainer, listFiltersContainer }) {
    this.headerContainer = headerContainer;
    this.listFiltersContainer = listFiltersContainer;
  }

  init() {
    render(this.headerComponent, this.headerContainer, RenderPosition.AFTERBEGIN);
    render(this.listFilterComponent, this.listFiltersContainer);
  }
}
