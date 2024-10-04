import { render, RenderPosition } from './render.js';
import TripInfoView from './view/trip-info-view.js';
import ListFilterView from './view/list-filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render (new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
render (new ListFilterView(), filtersContainer);

const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement});

boardPresenter.init();
