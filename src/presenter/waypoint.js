import TripEditView from "../view/trip-edit.js";
import TripView from "../view/trip.js";
import {remove, renderElement, replace} from "../utils/render.js";
import {UserAction, UpdateType, WaypointEditMode} from "../const.js";
import {isDateEqual} from "../utils//trip.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Waypoint {
  constructor(tripListComponent, changeData, changeMode, destinations, offers) {
    this._tripListComponent = tripListComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._destinations = destinations;
    this._offers = offers;

    this._tripComponent = null;
    this._tripEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(trip) {
    this._trip = trip;

    const prevTripComponent = this._tripComponent;
    const prevTripEditComponent = this._tripEditComponent;

    this._tripComponent = new TripView(trip);
    this._tripEditComponent = new TripEditView(trip, WaypointEditMode.EDIT, this._destinations, this._offers);
    this._tripComponent.setEditClickHandler(this._editClickHandler);
    this._tripEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._tripEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._tripEditComponent.setCloseClickHandler(this._closeClickHandler);
    this._tripEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevTripComponent === null || prevTripEditComponent === null) {
      renderElement(this._tripListComponent, this._tripComponent, `beforeend`);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripComponent, prevTripComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripEditComponent, prevTripEditComponent);
    }
  }

  destroy() {
    remove(this._tripComponent);
    remove(this._tripEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToTrip();
    }
  }

  _editClickHandler() {
    this._replaceTripToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _formSubmitHandler(update) {
    const isMinorUpdate = !isDateEqual(this._trip.startDate, update.startDate);
    this._changeData(
        UserAction.UPDATE_TRIP,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        update);
    this._replaceFormToTrip();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleDeleteClick(waypoint) {
    this._changeData(
        UserAction.DELETE_TRIP,
        UpdateType.MINOR,
        waypoint
    );
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._tripEditComponent.reset(this._trip);
      this._replaceFormToTrip();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _closeClickHandler() {
    this._tripEditComponent.reset(this._trip);
    this._replaceFormToTrip();
    document.removeEventListener(`click`, this._closeClickHandler);
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_TRIP,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._trip,
            {
              isFavorite: !this._trip.isFavorite
            }
        )
    );
  }

  _replaceTripToForm() {
    replace(this._tripEditComponent, this._tripComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToTrip() {
    replace(this._tripComponent, this._tripEditComponent);
    this._mode = Mode.DEFAULT;
  }

}
