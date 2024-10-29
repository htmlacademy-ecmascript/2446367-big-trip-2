import { render } from '../render.js';
import WaypointListView from '../view/waypoint-list-view.js';
import WaypointItemView from '../view/waypoint-item-view.js';
import ListSortView from '../view/list-sort-view.js';
import WaypointEdit from '../view/waypoint-edit-view.js';

export default class BoardPresenter {
  listContainer = new WaypointListView();
  listSortView = new ListSortView();

  constructor({ boardContainer, waypointModel }) {
    this.boardContainer = boardContainer;
    this.waypointModel = waypointModel;
  }

  init() {
    const waypoints = this.waypointModel.getWaypoints();
    const offers = this.waypointModel.getOffers();
    const destinations = this.waypointModel.getDestinations();

    this.boardWaypoints = [...waypoints];

    render(this.listSortView, this.boardContainer);

    render(this.listContainer, this.boardContainer);
    render(new WaypointEdit({
      waypoints: this.boardWaypoints[0],
      offers: offers,
      destinations: destinations,
    }), this.listContainer.getElement());

    for (let i = 1; i < this.boardWaypoints.length; i++) {
      render (new WaypointItemView({
        waypoints: this.boardWaypoints[i],
        offers: offers,
        destinations: destinations,
      }), this.listContainer.getElement());
    }
  }
}
