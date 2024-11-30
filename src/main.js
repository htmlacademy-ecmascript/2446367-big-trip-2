import HeaderPresenter from './presenter/header-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import WaypointsModel from './model/waypoints-model.js';
import FilterModel from './model/filter-model.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const waypointModel = new WaypointsModel();
const filterModel = new FilterModel();

const headerPresenter = new HeaderPresenter({
  headerContainer:  tripInfoContainer,
  listFiltersContainer: filtersContainer,
  waypointModel,
  filterModel,
});

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  onNewWaypointDestroy: handleAddWaypointFormClose,
  waypointModel,
  filterModel,
});

const addWaypointButton = document.querySelector('.trip-main__event-add-btn');
addWaypointButton.addEventListener('click', handleAddWaypointButtonClick);

function handleAddWaypointFormClose() {
  addWaypointButton.disabled = false;
}

function handleAddWaypointButtonClick() {
  boardPresenter.createWaypoint();
  addWaypointButton.disabled = true;
}

headerPresenter.init();
boardPresenter.init();
