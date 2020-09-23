import TripEditView from "../view/trip-edit.js";
import {remove, renderElement} from "../utils/render.js";
import {UserAction, UpdateType, WaypointEditMode} from "../const.js";

export default class WaypointNew {
  constructor(waypointListContainer, changeData, renderPosition, destination, offers) {
    this._waypointListContainer = waypointListContainer;
    this._changeData = changeData;
    this._renderPosition = renderPosition;
    this._waypoint = null;
    this._offers = offers;
    this._destination = destination;

    this._tripEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init() {
    if (this._tripEditComponent !== null) {
      return;
    }

    this._tripEditComponent = new TripEditView(this._waypoint, WaypointEditMode.ADD_NEW, this._destination, this._offers);
    this._tripEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._tripEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    renderElement(this._waypointListContainer, this._tripEditComponent, this._renderPosition);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._tripEditComponent === null) {
      return;
    }

    remove(this._tripEditComponent);
    this._tripEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(waypoint) {
    this._changeData(
        UserAction.ADD_TRIP,
        UpdateType.MINOR,
        waypoint
    );

    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _closeClickHandler() {
    this.destroy();
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
}
