import { SortType } from '../data.js';
import AbstractView from '../framework/view/abstract-view.js';

// создание шаблона списка элементов сортировки
function createSorListTemplate(currentSortType) {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(SortType).map((item) => createSortItemTemplate(item, currentSortType)).join('')}
    </form>
  `);
}

// создание шаблона элемента сортировки
function createSortItemTemplate(type, currentSortType) {
  const isChecked = currentSortType === type ? 'checked' : '';
  const isDisabled = type === SortType.EVENT || type === SortType.OFFERS ? 'disabled' : '';

  return (`
      <div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${type}" value="sort-${type}" ${isChecked} ${isDisabled} >
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>
  `);
}

export default class ListSortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();

    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSorListTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
