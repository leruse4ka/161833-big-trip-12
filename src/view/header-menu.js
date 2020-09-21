import {MenuItem} from "../const";
import AbstractView from "./abstract";


const createHeaderMenu = (currentItem) => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn" ${currentItem === MenuItem.TABLE ? `trip-tabs__btn--active` : ``} href="#">${MenuItem.TABLE}</a>
      <a class="trip-tabs__btn" ${currentItem === MenuItem.STATS ? `trip-tabs__btn--active` : ``} href="#">${MenuItem.STATS}</a>
  </nav>`
  );
};

export default class HeaderMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createHeaderMenu();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}
