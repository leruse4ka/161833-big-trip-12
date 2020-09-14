import TripEditView from "../view/trip-edit.js";
import TripView from "../view/trip.js";
import {remove, renderElement, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Waypoint {
  constructor(tripListComponent, changeData, changeMode) {
    this._tripListComponent = tripListComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._tripComponent = null;
    this._tripEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(trip) {
    this._trip = trip;

    const prevTripComponent = this._tripComponent;
    const prevTripEditComponent = this._tripEditComponent;

    this._tripComponent = new TripView(trip);
    this._tripEditComponent = new TripEditView(trip);

    this._tripComponent.setEditClickHandler(this._editClickHandler);
    this._tripEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._tripEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);

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

  _formSubmitHandler(trip) {
    this._changeData(trip);
    this._replaceFormToTrip();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._tripEditComponent.reset(this._trip);
      this._replaceFormToTrip();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _handleFavoriteClick() {
    this._changeData(
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
