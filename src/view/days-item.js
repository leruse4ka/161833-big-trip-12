import AbstractView from "./abstract";


const createDaysItem = (date, dayNumber) => {
  return `<li class="trip-days__item  day">
      <div class="day__info">
      <span class="day__counter">${dayNumber ? dayNumber : ``}</span>
      <time class="day__date" datetime="${date ? date.toDateString() : ``}">${date ? date.toDateString().substr(4, 6) : ``}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`;
};

export default class DaysItem extends AbstractView {
  constructor(date, dateNumber) {
    super();
    this._date = date;
    this._dateNumber = dateNumber;
  }

  getTemplate() {
    return createDaysItem(this._date, this._dateNumber);
  }
}
