import AbstractView from '../framework/view/abstract-view.js';

function createButtonAddWaypointTemplate () {
  return (`
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `);
}

export default class ButtonAddWaypointView extends AbstractView {
  get template() {
    return createButtonAddWaypointTemplate;
  }
}
