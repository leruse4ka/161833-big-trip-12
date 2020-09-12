import {
  renderElement
} from "../utils/render.js";
import SortView from "../view/sort.js";
import TripDaysListView from "../view/trip-days.js";
import DaysItemView from "../view/days-item.js";
import NoTripView from "../view/no-trip.js";
import {
  SortType
} from "../const.js";
import {
  sortTripTime,
  sortTripPrice
} from "../utils/trip.js";
import WaypointPresenter from "./waypoint.js";
import {updateItem} from "../utils/common.js";

export default class WaypointBoard {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripDaysListComponent = new TripDaysListView();
    this._sortComponent = new SortView();
    this._noTripComponent = new NoTripView();
    this._currentSortType = SortType.DEFAULT;
    this._waypointPresenter = {};

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleTripChange = this._handleTripChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(trips) {
    this._trips = trips.slice();

    this._renderWaypoint();
  }

  _handleModeChange() {
    Object
      .values(this._waypointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleTripChange(updatedTrip) {
    this._trips = updateItem(this._trips, updatedTrip);
    this._waypointPresenter[updatedTrip.id].init(updatedTrip);
  }

  _sortTrips(sortType) {
    let sortedTrips = [];
    let isDefaultSorting = false;
    switch (sortType) {
      case SortType.TIME:
        sortedTrips = this._trips.slice().sort(sortTripTime);
        break;
      case SortType.PRICE:
        sortedTrips = this._trips.slice().sort(sortTripPrice);
        break;
      case SortType.DEFAULT:
        sortedTrips = this._trips.slice();
        isDefaultSorting = true;
    }
    this._currentSortType = sortType;
    this._renderTripDaysList(sortedTrips, isDefaultSorting);
  }

  _handleSortTypeChange(sortType) {
    this._clearTripList();
    this._sortTrips(sortType);
  }

  _renderSort() {
    renderElement(this._tripContainer, this._sortComponent, `beforeend`);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTrip(tripListElement, trip) {
    const waypointPresenter = new WaypointPresenter(tripListElement, this._handleTripChange, this._handleModeChange);
    waypointPresenter.init(trip);
    this._waypointPresenter[trip.id] = waypointPresenter;
  }

  _renderTrips(date, day, isDefaultSorting, trips) {
    trips
      .filter((trip) => {
        return isDefaultSorting ? new Date(trip.startDate).toDateString() === date : trip;
      })
      .forEach((trip) => {
        this._renderTrip(day.querySelector(`.trip-events__list`), trip);
      });
  }

  _renderNoTrip() {
    const bodyContainer = document.querySelector(`.page-main .page-body__container`);

    renderElement(bodyContainer, this._noTripComponent, `afterbegin`);
  }

  _renderTripDays(trips, isDefaultSorting = true) {

    const dates = isDefaultSorting
      ? [...new Set(trips.map((item) => new Date(item.startDate).toDateString()))]
      : [true];


    dates.forEach((date, dateIndex) => {
      const day = isDefaultSorting
        ? new DaysItemView(new Date(date), dateIndex + 1).getElement()
        : new DaysItemView().getElement();
      this._renderTrips(date, day, isDefaultSorting, trips);

      renderElement(this._tripDaysListComponent, day, `beforeend`);
    });
  }

  _clearTripList() {
    Object
      .values(this._waypointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._waypointPresenter = {};
  }

  _renderTripDaysList(trips, isDefaultSorting) {
    renderElement(this._tripContainer, this._tripDaysListComponent, `beforeend`);

    this._renderTripDays(trips, isDefaultSorting);
  }

  _renderWaypoint() {
    if (!this._trips.length) {
      this._renderNoTrip();
    } else {
      this._renderSort();
      this._renderTripDaysList(this._trips);
    }

  }
}
