import { SortType } from '../data.js';
import AbstractView from '../framework/view/abstract-view.js';

// создание шаблона списка элементов сортировки
function createSorListTemplate() {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(SortType).map((item) => createSortItemTemplate(item)).join('')}
    </form>
  `);
}

// создание шаблона элемента сортировки
function createSortItemTemplate(type) {
  const isChecked = SortType.DAY === type ? 'checked' : '';
  const isDisabled = type === SortType.EVENT || type === SortType.OFFERS ? 'disabled' : '';

  return (`
      <div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${type}" value="sort-${type}" ${isChecked} ${isDisabled} >
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>
  `);
}

export default class ListSortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();

    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSorListTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
