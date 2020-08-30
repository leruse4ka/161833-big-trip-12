import TripEditView from "../view/trip-edit.js";
import TripView from "../view/trip.js";
import {
  renderElement
} from "../utils/render.js";
import SortView from "../view/sort.js";
import TripDaysListView from "../view/trip-days.js";
import DaysItemView from "../view/days-item.js";
import NoTripView from "../view/no-trip.js";
import {SortType} from "../const.js";
import {sortTripTime, sortTripPrice} from "../utils/trip.js";

export default class Waypoint {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripDaysListComponent = new TripDaysListView();
    this._sortComponent = new SortView();
    this._daysItemComponent = new DaysItemView();
    this._noTripComponent = new NoTripView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._currentSortType = SortType.DEFAULT;
  }

  init(trips) {
    this._trips = trips.slice();
    this._sourcedTrip = trips.slice();

    this._renderWaypoint();
  }

  _sortTrips(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._trips.sort(sortTripTime);
        break;
      case SortType.PRICE:
        this._trips.sort(sortTripPrice);
        break;
      default:
        this._trips = this._sourcedTrip.slice();
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTrips(sortType);
    this._clearTripList();
    this._renderTripDaysList();
  }

  _renderSort() {
    renderElement(this._tripContainer, this._sortComponent, `beforeend`);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTrip(tripListElement, trip) {
    const tripComponent = new TripView(trip);
    const tripEditComponent = new TripEditView(trip);

    const replaceTripToForm = () => {
      tripListElement.replaceChild(tripEditComponent.getElement(), tripComponent.getElement());
    };

    const replaceFormToTrip = () => {
      tripListElement.replaceChild(tripComponent.getElement(), tripEditComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToTrip();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    tripComponent.setEditClickHandler(() => {
      replaceTripToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    tripEditComponent.setFormSubmitHandler(() => {
      replaceFormToTrip();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    renderElement(tripListElement, tripComponent, `beforeend`);
  }

  _renderTrips(date, day) {
    this._trips
      .filter((trip) => new Date(trip.startDate).toDateString() === date)
      .forEach((trip) => {
        this._renderTrip(day.querySelector(`.trip-events__list`), trip);
      });
  }

  _renderNoTrip() {
    const bodyContainer = document.querySelector(`.page-main .page-body__container`);

    renderElement(bodyContainer, this._noTripComponent, `afterbegin`);
  }

  _renderTripDays(trips) {
    const dates = [
      ...new Set(trips.map((item) => new Date(item.startDate).toDateString()))
    ];

    dates.forEach((date, dateIndex) => {
      const day = new DaysItemView(new Date(date), dateIndex + 1).getElement();
      this._renderTrips(date, day);

      renderElement(this._tripDaysListComponent, day, `beforeend`);
    });
  }

  _clearTripList() {
    this._tripDaysListComponent.getElement().innerHTML = ``;
  }

  _renderTripDaysList() {
    renderElement(this._tripContainer, this._tripDaysListComponent, `beforeend`);

    this._renderTripDays(this._trips);
  }

  _renderWaypoint() {
    if (!this._trips.length) {
      this._renderNoTrip();
    } else {
      this._renderSort();
      this._renderTripDaysList();
    }

  }
}