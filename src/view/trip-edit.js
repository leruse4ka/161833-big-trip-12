import {
  getRandomInteger
} from "../utils/common.js";
import {
  TYPES,
  DESTINATION_CITIES,
  OFFERS,
  DESTINATION_DESC
} from "../const.js";
import AbstractView from "./abstract.js";

const OFFERS_AMOUNT = 3;

const WAYPOINT_BLANK = {
  typeWaypoint: TYPES[0],
  destinationCity: DESTINATION_CITIES[0],
  offers: OFFERS.slice(0, OFFERS_AMOUNT),
  destinationInfo: {
    description: DESTINATION_DESC[0],
    photos: `http://picsum.photos/248/152?r=${Math.random()}`
  },
  startDate: Date.now(),
  endDate: Date.now() + 10000000,
  price: getRandomInteger(10, 300)
};

const createEventDetalis = (offers, destinationInfo) => {
  return `<section class="event__details">
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">

      ${(offers) ? Object.entries(offers).map((item) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item[1].type}-1" type="checkbox" name="event-offer-luggage" checked>
        <label class="event__offer-label" for="event-offer-${item[1].type}-1">
          <span class="event__offer-title">${item[1].name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${item[1].price}</span>
        </label>
      </div>`
  ).join(``) : `` }
    </div>
  </section>

  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destinationInfo.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        <img class="event__photo" src="${destinationInfo.photos}" alt="Event photo">
      </div>
    </div>
  </section>
</section>`;
};

const createTripEdit = (waypoint) => {
  const {
    offers,
    destinationInfo,
    destinationCity,
    price,
    startDate,
    endDate,
    typeWaypoint
  } = waypoint;

  const currentDateStart = new Date(startDate).toLocaleString(`en-GB`, {
    day: `numeric`,
    month: `numeric`,
    year: `2-digit`,
    hour: `numeric`,
    minute: `numeric`
  });
  const currentDateEnd = new Date(endDate).toLocaleString(`en-GB`, {
    day: `numeric`,
    month: `numeric`,
    year: `2-digit`,
    hour: `numeric`,
    minute: `numeric`
  });

  const currentAction = (type) => {
    let action = ``;
    switch (type) {
      case `Check-in`:
      case `Sightseeing`:
      case `Restaurant`:
        action = `in`;
        break;
      default:
        action = `to`;
    }
    return action;
  };

  return `<li class="trip-events__item">
  <form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${typeWaypoint ? typeWaypoint : ``}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" checked>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${typeWaypoint ? typeWaypoint : ``} ${currentAction(typeWaypoint)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationCity ? destinationCity : ``}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="Saint Petersburg"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${currentDateStart ? currentDateStart : ``}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${currentDateEnd ? currentDateEnd : ``}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price ? price : ``}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    ${destinationCity ? createEventDetalis(offers, destinationInfo) : ``}

  </form>
  </li>`;
};

export default class TripEdit extends AbstractView {
  constructor(waypoint) {
    super();
    this._waypoint = waypoint || WAYPOINT_BLANK;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createTripEdit(this._waypoint);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }
}
