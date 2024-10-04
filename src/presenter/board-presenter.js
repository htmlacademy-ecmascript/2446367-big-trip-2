import { render } from '../render.js';
import ListView from '../view/list-view.js';
import ListItemView from '../view/list-item-view';
import ListSortView from '../view/list-sort-view.js';
import TripEdit from '../view/trip-edit.js';

export default class BoardPresenter {
  listContainer = new ListView();
  listItemElement = new ListItemView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new ListSortView(), this.boardContainer);

    render(this.listContainer, this.boardContainer);
    render(new TripEdit(), this.listContainer.getElement());

    render(new ListItemView(), this.listContainer.getElement());
    render(new ListItemView(), this.listContainer.getElement());
    render(new ListItemView(), this.listContainer.getElement());
  }
}
