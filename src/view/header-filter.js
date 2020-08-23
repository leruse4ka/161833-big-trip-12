import {createElement} from "../util.js";

const createHeaderFilterItemTemplate = (filter, isChecked) => {
  const name = filter.name;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const createHeaderFilter = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createHeaderFilterItemTemplate(filter, index === 0)).join(``);
  return (
    `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
};

export default class HeaderFilter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createHeaderFilter(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
