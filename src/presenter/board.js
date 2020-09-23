import {
  remove,
  renderElement
} from "../utils/render.js";
import SortView from "../view/sort.js";
import TripDaysListView from "../view/trip-days.js";
import DaysItemView from "../view/days-item.js";
import NoTripView from "../view/no-trip.js";
import {
  SortType,
  UpdateType,
  UserAction,
  FilterType
} from "../const.js";
import {
  sortTripTime,
  sortTripPrice
} from "../utils/trip.js";
import WaypointPresenter from "./waypoint.js";
import {filter} from "../utils/filter.js";
import WaypointNewPresenter from "./waypoint-new.js";
import LoadingView from "../view/loading.js";

export default class WaypointBoard {
  constructor(tripContainer, waypointsModel, filterModel, api) {
    this._tripContainer = tripContainer;
    this._waypointsModel = waypointsModel;
    this._filterModel = filterModel;
    this._isLoading = true;
    this._api = api;
    this._destination = this._waypointsModel.getDestinations();
    this._offers = this._waypointsModel.getOffers();

    this._tripDaysListComponent = new TripDaysListView();
    this._sortComponent = null;
    this._noTripComponent = new NoTripView();
    this._currentSortType = SortType.DEFAULT;
    this._waypointPresenter = {};
    this._loadingComponent = new LoadingView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init() {
    this._renderWaypoint();

    this._waypointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearBoard({resetSortType: true});

    remove(this._tripDaysListComponent);

    this._waypointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createWaypoint() {
    if (this._waypointsModel.getWaypoints().length < 1) {
      this._waypointNewPresenter = new WaypointNewPresenter(this._tripContainer, this._handleViewAction, `afterbegin`, this._destination, this._offers);
    } else {
      this._waypointNewPresenter = new WaypointNewPresenter(this._tripDaysListComponent, this._handleViewAction, `beforebegin`, this._destination, this._offers);
    }

    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    this._waypointNewPresenter.init();
  }

  _getWaypoints() {
    const filterType = this._filterModel.getFilter();
    const waypoints = this._waypointsModel.getWaypoints();
    const filteredWaypoint = filter[filterType](waypoints);
    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredWaypoint.sort(sortTripTime);
      case SortType.PRICE:
        return filteredWaypoint.sort(sortTripPrice);
    }

    return filteredWaypoint;
  }

  _handleModeChange() {
    if (this._waypointNewPresenter) {
      this._waypointNewPresenter.destroy();
    }
    Object
      .values(this._waypointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this._api.updateWaypoint(update).then((response) => {
          this._waypointsModel.updateWaypoint(updateType, response);
        });
        break;
      case UserAction.ADD_TRIP:
        this._api.addWaypoint(update).then((response) => {
          this._waypointsModel.addWaypoint(updateType, response);
        });
        break;
      case UserAction.DELETE_TRIP:
        this._api.deleteWaypoint(update).then(() => {
          this._waypointsModel.deleteWaypoint(updateType, update);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._waypointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderWaypoint();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderWaypoint();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderWaypoint();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderWaypoint();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    renderElement(this._tripContainer, this._sortComponent, `beforeend`);
  }

  _renderTrip(tripListElement, trip) {
    const waypointPresenter = new WaypointPresenter(tripListElement, this._handleViewAction, this._handleModeChange, this._waypointsModel.getDestinations(), this._waypointsModel.getOffers());
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

  _renderLoading() {
    renderElement(this._tripContainer, this._loadingComponent, `afterbegin`);
  }

  _renderNoTrip() {
    renderElement(this._tripContainer, this._noTripComponent, `afterbegin`);
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

  _renderTripDaysList(trips, isDefaultSorting) {
    if (this._currentSortType !== SortType.DEFAULT) {
      isDefaultSorting = false;
    }

    renderElement(this._tripContainer, this._tripDaysListComponent, `beforeend`);
    this._renderTripDays(trips, isDefaultSorting);
  }

  _clearBoard({resetSortType = false} = {}) {
    if (this._waypointNewPresenter) {
      this._waypointNewPresenter.destroy();
    }

    Object
      .values(this._waypointPresenter)
      .forEach((presenter) => presenter.destroy());

    remove(this._tripDaysListComponent);
    remove(this._sortComponent);
    remove(this._noTripComponent);
    remove(this._loadingComponent);

    this._waypointPresenter = {};

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderWaypoint() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const waypoints = this._getWaypoints();

    if (!waypoints.length) {
      this._renderNoTrip();
    } else {
      this._renderSort();
      this._renderTripDaysList(waypoints);
    }
  }
}
