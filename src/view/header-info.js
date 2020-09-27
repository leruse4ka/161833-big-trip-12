import AbstractView from "./abstract.js";

const MAX_DAYS_COUNT = 3;

const getRoute = (waypoints) => {
  if (!waypoints.length) {
    return ``;
  }

  const namesToStartDate = [
    ...new Set(waypoints.slice().sort((a, b) => new Date(a.startDate) - new Date(b.startDate)).map((item) => {
      return item.destination.name;
    }))
  ];

  const namesToEndDate = [
    ...new Set(waypoints.slice().sort((a, b) => new Date(b.endDate) - new Date(a.endDate)).map((item) => {
      return item.destination.name;
    }))
  ];

  return (
    (namesToStartDate.length > MAX_DAYS_COUNT) ? `${namesToStartDate[0]} &mdash; ... &mdash; ${namesToEndDate[0]}` : `${namesToStartDate[0]} &mdash; ${namesToStartDate[1]} &mdash; ${namesToEndDate[0]}`
  );
};

const getRouteDates = (waypoints) => {
  if (!waypoints.length) {
    return ``;
  }

  const startDates = [
    ...new Set(waypoints.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)).map((item) => new Date(item.startDate).toDateString()))
  ];

  const endDates = [
    ...new Set(waypoints.sort((a, b) => new Date(a.endDate) - new Date(b.endDate)).map((item) => new Date(item.endDate).toDateString()))
  ];

  const dates = [startDates[0], endDates[endDates.length - 1]];

  return `${dates[0].substr(4, 6)}&nbsp;&mdash;&nbsp;${dates[1].substr(4, 6)}`;
};


const createHeaderInfo = (waypoints) => {
  const offers = waypoints.map((item) => item.offers);
  const getFullPriceOffers = offers.map((it) => {
    return it.reduce((acc, item) => acc + item.price, 0);
  });
  const getFullPrice = waypoints.reduce((acc, item) => acc + item.price, 0) + getFullPriceOffers.reduce((acc, item) => acc + item, 0);
  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
    <h1 class="trip-info__title">${getRoute(waypoints)}</h1>

    <p class="trip-info__dates">${getRouteDates(waypoints)}</p>
    </div>
    <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getFullPrice}</span>
    </p>
  </section>`
  );
};

export default class HeaderInfo extends AbstractView {
  constructor(waypoints) {
    super();
    this._waypoints = waypoints;
  }

  getTemplate() {
    return createHeaderInfo(this._waypoints);
  }
}
