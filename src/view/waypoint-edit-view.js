import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { WAYPOINT_TYPE, DateFormat } from '../data.js';
import { getElementById, getElementByType, capitalizeFirstLetter } from '../utils/common.js';
import { humanizeDate } from '../utils/waypoints.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createTypeTemplate (type, checkedType, id) {
  const isChecked = checkedType === type ? 'checked' : false;

  return (`
    <div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${capitalizeFirstLetter(type)}</label>
    </div>
  `);
}

function createOfferTemplate (offer, checkedOffers) {
  const { id, title, price } = offer;
  const isChecked = checkedOffers.includes(id) ? 'checked' : '';

  return (`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${id}" ${isChecked}>
      <label class="event__offer-label" for="${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `);
}

function createOffersListTemplate ({offers}, checkedOffers) {
  if (offers.length !== 0) {
    return (`
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offers.map((offer) => createOfferTemplate(offer, checkedOffers)).join('')}
        </div>
      </section>
    `);
  }

  return '';
}

function createPhotoTemplate (photo) {
  const { src, description } = photo;
  return (`
    <img class="event__photo" src=${src} alt=${description}>
  `);
}

function createPhotoContainerTemplate (pictures) {
  if (pictures.length > 0) {
    return (`
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((item) => createPhotoTemplate(item)).join('')}
        </div>
      </div>
    `);
  }

  return '';
}

function createDestinationTemplate (destination) {
  const { description, pictures } = destination || {};

  if (description.length > 0 || pictures.length > 0) {
    return (`
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        ${createPhotoContainerTemplate(pictures)}
      </section>
    `);
  }

  return '';
}

function createWaypointEditTemplate (waypoints, offers, destinations) {
  const { id, type, dateFrom, dateTo, basePrice, offers: checkedOffers, destination: waypointDestination } = waypoints;
  const filterOfferByType = getElementByType(offers, type);
  const filterDestinationById = getElementById(destinations, waypointDestination);
  const { name } = filterDestinationById;

  return (`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">

          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${WAYPOINT_TYPE.map((item) => createTypeTemplate(item, type, id)).join('')}
              </fieldset>
            </div>
          </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-${id}">
                ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}">
              <datalist id="destination-list-${id}">
                  ${destinations.map((destination) => `<option value=${destination.name}></option>`).join('')}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-${id}">From</label>
              <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value=${humanizeDate(dateFrom, DateFormat.DAY_MONTH_YEAR)}>
              &mdash;
              <label class="visually-hidden" for="event-end-time-${id}">To</label>
              <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value=${humanizeDate(dateTo, DateFormat.DAY_MONTH_YEAR)}>
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-${id}">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          <section class="event__details">
            ${createOffersListTemplate(filterOfferByType, checkedOffers)}
            ${createDestinationTemplate(filterDestinationById)}
          </section>
        </form>
      </li>
  `);
}

export default class WaypointEditView extends AbstractStatefulView {
  #waypoint = null;
  #offers = null;
  #destinations = null;

  #handleFormSubmit = null;
  #closeEditClick = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ waypoint, offers, destinations, onFormSubmit, onCloseEditClick }) {
    super();

    this._setState(WaypointEditView.parceWaypointToState(waypoint));
    this.#offers = offers;
    this.#destinations = destinations;

    this.#handleFormSubmit = onFormSubmit;
    this.#closeEditClick = onCloseEditClick;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeEditClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change',this.#changeOffersCheckedHandler);

    this.#setDatePicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(WaypointEditView.parceWaypointToState(this._state));
  };

  #closeEditClickHandler = (evt) => {
    evt.preventDefault();
    this.#closeEditClick();
  };

  #changeTypeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
    });
  };

  #destinationInputHandler = (evt) => {
    this.updateElement({
      destination: this.#destinations.find((destination) => destination.name === evt.target.value).id
    });
  };

  #changeOffersCheckedHandler = () => {
    this._setState({
      offers: Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked')).map((item) => item.id),
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatePicker() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        locale: { firstDayOfWeek: 1 },
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#dateFromChangeHandler,
      });

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        locale: { firstDayOfWeek: 1 },
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      });
  }

  static parceWaypointToState(waypoint) {
    return {...waypoint};
  }

  static parceStateToWaypoint(waypoint) {
    return {...waypoint};
  }

  get template() {
    return createWaypointEditTemplate(this._state, this.#offers, this.#destinations);
  }

  reset (waypoint) {
    this.updateElement(
      WaypointEditView.parceWaypointToState(waypoint),
    );
  }

  removeElement() {
    super.removeElement();

    if(this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }
}
