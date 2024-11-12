import { render, replace, remove } from '../framework/render.js';
import WaypointItemView from '../view/waypoint-item-view.js';
import WaypointEditView from '../view/waypoint-edit-view.js';

export default class WaypointPresenter {
  #waypointListContainer = null;

  #waypointComponent = null;
  #waypointEditComponent = null;

  #waypoint = null;
  #offers = null;
  #destinations = null;

  constructor({waypointListContainer}) {
    this.#waypointListContainer = waypointListContainer;
  }

  init(waypoint, offers, destinations) {
    this.#waypoint = waypoint;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevWaypointComponent = this.#waypointComponent;
    const prevWaypointEditComponent = this.#waypointEditComponent;

    this.#waypointComponent = new WaypointItemView({
      waypoint: this.#waypoint,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: this.#handleEditClick,
    });

    this.#waypointEditComponent = new WaypointEditView({
      waypoint: this.#waypoint,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onCloseEditClick: this.#closeEditClick,
    });

    if (prevWaypointComponent === null || prevWaypointEditComponent === null) {
      render(this.#waypointComponent, this.#waypointListContainer);
      return;
    }

    if (this.#waypointListContainer.contains(prevWaypointComponent.element)) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#waypointListContainer.contains(prevWaypointEditComponent.element)) {
      replace(this.#waypointEditComponent, prevWaypointEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointEditComponent);
  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#waypointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm() {
    replace(this.#waypointEditComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#waypointComponent, this.#waypointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };

  #closeEditClick = () => {
    this.#replaceFormToCard();
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };
}
