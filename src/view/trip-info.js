import {createElement} from "../util.js";

const createTripInfo = (waypoints) => {
  const names = [
    ...new Set(waypoints.map((item) => {
      return item.destinationCity;
    }))
  ];

  const getRoute = () => {
    if (!names) {
      return ``;
    }
    return (
      (names.length > 3) ? `${names[0]} &mdash; ... &mdash; ${names[names.length - 1]}` : `${names[0]} &mdash; ${names[1]} &mdash; ${names[2]}`
    );
  };

  const startDates = [
    ...new Set(waypoints.map((item) => new Date(item.startDate).toDateString()))
  ];

  const endDates = [
    ...new Set(waypoints.map((item) => new Date(item.endDate).toDateString()))
  ];

  const dates = [startDates[0], endDates[endDates.length - 1]];

  const getRouteDates = () => {
    return dates ? `${dates[0].substr(4, 6)}&nbsp;&mdash;&nbsp;${dates[1].substr(4, 6)}` : ``;
  };

  return (
    `<div class="trip-info__main">
    <h1 class="trip-info__title">${getRoute()}</h1>

    <p class="trip-info__dates">${getRouteDates()}</p>
  </div>`
  );
};

export default class TripInfo {
  constructor(waypoints) {
    this._waypoints = waypoints;
    this._element = null;
  }

  getTemplate() {
    return createTripInfo(this._waypoints);
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
