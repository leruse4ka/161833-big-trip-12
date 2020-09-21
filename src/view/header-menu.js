import {MenuItem} from "../const";
import AbstractView from "./abstract";


const createHeaderMenu = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" href="#">${MenuItem.TABLE}</a>
      <a class="trip-tabs__btn" href="#">${MenuItem.STATS}</a>
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
    this._callback.menuClick(evt.target.textContent);
    this.getElement().querySelector(`.trip-tabs__btn--active`).classList.remove(`trip-tabs__btn--active`);
    evt.target.classList.add(`trip-tabs__btn--active`);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`.${menuItem}`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
