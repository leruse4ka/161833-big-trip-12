import AbstractView from "./abstract";
import {getDuration, capitalize} from "../utils/common.js";
import {currentAction} from "../utils/trip.js";

const createTripTemplate = (waypoint, offers) => {
  const {
    destination,
    price,
    startDate,
    endDate,
    typeWaypoint,
  } = waypoint;
  const durationTime = getDuration(endDate, startDate);
  const currentDateStart = new Date(startDate).toLocaleString(`en-GB`, {
    hour: `numeric`,
    minute: `numeric`
  });
  const currentDateEnd = new Date(endDate).toLocaleString(`en-GB`, {
    hour: `numeric`,
    minute: `numeric`
  });

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${typeWaypoint}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${capitalize(typeWaypoint)} ${currentAction(typeWaypoint)} ${destination.name}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${currentDateStart}">${currentDateStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${currentDateEnd}">${currentDateEnd}</time>
        </p>
        <p class="event__duration">${durationTime.d > 0 ? `${durationTime.d}D` : ``} ${durationTime.h > 0 ? `${durationTime.h}H` : ``} ${durationTime.m > 0 ? `${durationTime.m}M` : ``}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers ? offers.slice(0, 3).map((item) => `<li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
        </li>`).join(``) : ``}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Trip extends AbstractView {
  constructor(waypoint) {
    super();
    this._waypoint = waypoint;

    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createTripTemplate(this._waypoint, this._waypoint.offers);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
