import {createElement} from "../util.js";

const getRoute = (waypoints) => {
  if (!waypoints.length) {
    return ``;
  }
  const names = [
    ...new Set(waypoints.map((item) => {
      return item.destinationCity;
    }))
  ];

  return (
    (names.length > 3) ? `${names[0]} &mdash; ... &mdash; ${names[names.length - 1]}` : `${names[0]} &mdash; ${names[1]} &mdash; ${names[2]}`
  );
};

const getRouteDates = (waypoints) => {
  if (!waypoints.length) {
    return ``;
  }

  const startDates = [
    ...new Set(waypoints.map((item) => new Date(item.startDate).toDateString()))
  ];

  const endDates = [
    ...new Set(waypoints.map((item) => new Date(item.endDate).toDateString()))
  ];

  const dates = [startDates[0], endDates[endDates.length - 1]];

  return `${dates[0].substr(4, 6)}&nbsp;&mdash;&nbsp;${dates[1].substr(4, 6)}`;
};

const createTripInfo = (waypoints) => {
  return (
    `<div class="trip-info__main">
    <h1 class="trip-info__title">${getRoute(waypoints)}</h1>

    <p class="trip-info__dates">${getRouteDates(waypoints)}</p>
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
