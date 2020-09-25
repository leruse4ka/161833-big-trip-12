import {
  capitalize
} from "../utils/common.js";
import {
  WaypointEditMode
} from "../const.js";
import SmartView from "./smart.js";
import {
  currentAction
} from "../utils/trip.js";
import flatpickr from "flatpickr";
import StoreModel from "../model/store.js";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const WAYPOINT_BLANK = {
  typeWaypoint: `bus`,
  destination: {},
  offers: [],
  startDate: Date.now(),
  endDate: Date.now(),
  price: 100,
  isFavorite: true,
};

const createOffers = (offers, checkedOffers, isDisabled) => {
  const {title, price} = offers;
  const isChecked = checkedOffers.some((checkedOffer) => checkedOffer.title === title);
  return `<div class="event__offer-selector">
           <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}" ${isChecked ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
           <label class="event__offer-label" for="event-offer-${title}-1">
             <span class="event__offer-title">${title}</span>
             &plus;
             &euro;&nbsp;<span class="event__offer-price">${price}</span>
           </label>
         </div>`;
};

const createEventDetalis = (data, offersAll) => {
  const {
    offers,
    destination,
    isDisabled
  } = data;

  let {typeWaypoint} = data;
  const offersElement = offersAll[typeWaypoint].map((it) => createOffers(it, offers, isDisabled)).join(``);
  return `<section class="event__details">
  ${offers || offersAll ? `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${offersElement}
  </div>
  </section>` : ``}
  ${Object.keys(destination).length > 0 ? `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description ? destination.description : ``}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${destination.pictures ? destination.pictures.map((item) =>
    `<img class="event__photo" src="${item.src}" alt="${item.description}"></img>`
  ).join(``) : ``}

      </div>
    </div>
  </section>` : ``}
</section>`;
};

const createTripEdit = (data, mode, destinations, offers) => {
  const {
    destination,
    price,
    startDate,
    endDate,
    typeWaypoint,
    isFavorite,
    isDisabled,
    isDeleting,
    isSaving
  } = data;

  const deleteButton = isDeleting ? `Deleting...` : `Delete`;

  const uniqCity = destinations ? new Set(destinations.map((item) => item.name)) : null;

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

  return `${mode === WaypointEditMode.EDIT ? `<li class="trip-events__item">` : `<div>`}
  <form class="trip-events__item  event  event--edit" action="#" method="post" >
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
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${typeWaypoint === `taxi` ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${typeWaypoint === `bus` ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${typeWaypoint === `train` ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${typeWaypoint === `ship` ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${typeWaypoint === `transport` ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${typeWaypoint === `drive` ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${typeWaypoint === `flight` ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${typeWaypoint === `check-in` ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${typeWaypoint === `sightseeing` ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${typeWaypoint === `restaurant` ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${typeWaypoint ? capitalize(typeWaypoint) : ``} ${currentAction(typeWaypoint)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name ? destination.name : ``}" list="destination-list-1" ${isDisabled ? `disabled` : ``}>
        <datalist id="destination-list-1">
        ${uniqCity ? Array.from(uniqCity).map((city) => `<option value="${city}"></option>`).join(``) : ``}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${currentDateStart ? currentDateStart : ``}" ${isDisabled ? `disabled` : ``}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${currentDateEnd ? currentDateEnd : ``}" ${isDisabled ? `disabled` : ``}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${mode === WaypointEditMode.EDIT ? price : ``}" ${isDisabled ? `disabled` : ``}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>${isSaving ? `Saving...` : `Save`}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>${mode === WaypointEditMode.EDIT ? deleteButton : `Cancel`}</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
                      <label class="event__favorite-btn" for="event-favorite-1">
                        <span class="visually-hidden">Add to favorite</span>
                        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                        </svg>
                      </label>

      ${mode === WaypointEditMode.EDIT ? `<button class="event__rollup-btn" type="button" ${isDisabled ? `disabled` : ``}>
                        <span class="visually-hidden">Open event</span>
                      </button>` : ``}
    </header>
    ${destination ? createEventDetalis(data, offers, isDisabled) : ``}

  </form>
  ${mode === WaypointEditMode.EDIT ? `</li>` : `</div>`}`;
};

export default class TripEdit extends SmartView {
  constructor(waypoint, mode) {
    super();
    if (waypoint === null) {
      waypoint = WAYPOINT_BLANK;
    }
    this._data = TripEdit.parseTripToData(waypoint);
    this._datepicker = null;
    this._mode = mode;
    this._destinations = StoreModel.getDestination();
    this._offers = {};

    StoreModel.getOffers().forEach((it) => {
      this._offers[it.type] = it.offers;
    });

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._isFavoriteChangeHandler = this._isFavoriteChangeHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._cityChangeHandler = this._cityChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  reset(waypoint) {
    this.updateData(
        TripEdit.parseTripToData(waypoint)
    );
  }

  getTemplate() {
    return createTripEdit(this._data, this._mode, this._destinations, this._offers);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setDeleteClickHandler(this._callback.deleteClick);

    if (this._mode === WaypointEditMode.EDIT) {
      this.setCloseClickHandler(this._callback.closeClick);
    }
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`), {
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.startDate,
          onChange: this._dateStartChangeHandler
        }
    );

    this._datepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`), {
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.endDate,
          onChange: this._dateEndChangeHandler
        }
    );
  }

  _setInnerHandlers() {
    if (this._offers) {
      const offers = this.getElement().querySelectorAll(`.event__offer-checkbox`);
      offers.forEach((offer) => {
        offer.addEventListener(`change`, this._offerChangeHandler);
      });
    }
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._priceChangeHandler);
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._typeChangeHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._cityChangeHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(TripEdit.parseDataToTrip(this._data));
  }

  _isFavoriteChangeHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      typeWaypoint: evt.target.value,
      offers: [],
    }, false);
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: Number(evt.target.value)
    }, true);
  }

  _offerChangeHandler(evt) {
    evt.preventDefault();
    const title = evt.target.id.slice(12, -2);
    this.updateData({
      offers: !evt.target.checked ?
        [...this._data.offers.filter((offer) => offer.title !== title)] :
        [...this._data.offers, ...this._offers[this._data.typeWaypoint].filter((offer) => offer.title === title)]
    }, true);
  }

  _dateStartChangeHandler([userDate]) {
    this.updateData({
      startDate: userDate
    });
  }

  _dateEndChangeHandler([userDate]) {
    this.updateData({
      endDate: userDate
    });
  }

  _cityChangeHandler(evt) {
    const updateDestination = this._destinations.filter((item) => item.name === evt.target.value);
    const newDestination = updateDestination.reduce((acc, item) => {
      acc = item;
      return acc;
    }, {});
    this.updateData({
      destination: newDestination
    }, false);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._isFavoriteChangeHandler);
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeClickHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(TripEdit.parseDataToTrip(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  static parseTripToData(waypoint) {
    return Object.assign(
        {},
        waypoint,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        });
  }

  static parseDataToTrip(data) {
    data = Object.assign({}, data);
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;
    return data;
  }
}
