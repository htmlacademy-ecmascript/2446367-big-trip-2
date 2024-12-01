import { UpdateType, UserAction } from '../data.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import WaypointEditView from '../view/waypoint-edit-view.js';

export default class NewWaypointPresenter {
  #waypointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #waypointEditComponent = null;
  #waypointModel = null;

  #offers = null;
  #destinations = null;

  constructor({ waypointListContainer, waypointModel, onDataChange, onDestroy }) {
    this.#waypointListContainer = waypointListContainer;
    this.#waypointModel = waypointModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    this.#offers = this.#waypointModel.offers;
    this.#destinations = this.#waypointModel.destinations;

    if (this.#waypointEditComponent !== null) {
      return;
    }

    this.#waypointEditComponent = new WaypointEditView({
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onResetClick: this.#handleResetClick,
    });

    render(this.#waypointEditComponent, this.#waypointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#waypointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#waypointEditComponent);
    this.#waypointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (waypoint) => {
    this.#handleDataChange(
      UserAction.ADD_WAYPOINT,
      UpdateType.MINOR,
      waypoint,
    );

    this.destroy();
  };

  #handleResetClick = () => {
    this.destroy();
  };
}
