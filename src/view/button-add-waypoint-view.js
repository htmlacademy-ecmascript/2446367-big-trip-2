import { createElement } from '../render.js';

function createButtonAddWaypointTemplate () {
  return (`
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `);
}

export default class ButtonAddWaypointView {
  getTemplate() {
    return createButtonAddWaypointTemplate;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
