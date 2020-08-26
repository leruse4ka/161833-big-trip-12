import {createElement} from "../util";

const createTripTemplate = (waypoint) => {
  const {
    destinationCity,
    offers,
    price,
    startDate,
    endDate,
    typeWaypoint
  } = waypoint;

  const currentDateStart = new Date(startDate).toLocaleTimeString().slice(0, -3);
  const currentDateEnd = new Date(endDate).toLocaleTimeString().slice(0, -3);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${typeWaypoint}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${typeWaypoint} to ${destinationCity}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${currentDateStart}">${currentDateStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${currentDateEnd}">${currentDateEnd}</time>
        </p>
        <p class="event__duration">1H 30M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${(offers) ? Object.entries(offers).map((item) => `<li class="event__offer">
        <span class="event__offer-title">${item[1].name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${item[1].price}</span>
        </li>`).join(``) : ``}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class Trip {
  constructor(waypoint) {
    this._waypoint = waypoint;
    this._element = null;
  }

  getTemplate() {
    return createTripTemplate(this._waypoint);
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
