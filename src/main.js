import {createHeaderInfo} from "./view/header-info.js";
import {createHeaderMenu} from "./view/header-menu.js";
import {createHeaderFilter} from "./view/header-filter.js";
import {createTripEdit} from "./view/trip-edit.js";
import {createSort} from "./view/sort.js";
import {createEventDetalis} from "./view/event-detalis.js";
import {createTripDays} from "./view/trip-days.js";
import {createDaysItem} from "./view/days-item.js";
import {createWaypointTemplate} from "./view/waypoint.js";
import {createTripInfo} from "./view/trip-info.js";
import {waypoints} from "./mock/mock.js";
import {createElement, renderElement} from "./util.js";
import {generateFilter} from "./mock/filter.js";
import {generateSort} from "./mock/sort.js";

const dates = [
  ...new Set(waypoints.map((item) => new Date(item.startDate).toDateString()))
];

const filters = generateFilter(waypoints);
const sorts = generateSort(waypoints);

const siteHeaderElement = document.querySelector(`.page-header`);
const headerMain = siteHeaderElement.querySelector(`.trip-main`);
const headerControls = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEvents = siteMainElement.querySelector(`.trip-events`);

renderElement(headerMain, createElement(createHeaderInfo()), `afterbegin`);
renderElement(headerControls, createElement(createHeaderMenu()), `afterbegin`);
renderElement(headerControls, createElement(createHeaderFilter(filters)), `beforeend`);

renderElement(tripEvents, createElement(createSort(sorts)), `beforeend`);
renderElement(tripEvents, createElement(createTripEdit(waypoints[0])), `beforeend`);

const tripItem = tripEvents.querySelector(`.trip-events__item`);

renderElement(tripItem, createElement(createEventDetalis(waypoints[0])), `beforeend`);

const tripHeaderInfo = headerMain.querySelector(`.trip-main__trip-info`);

renderElement(tripHeaderInfo, createElement(createTripInfo(waypoints)), `afterbegin`);
renderElement(tripEvents, createElement(createTripDays()), `beforeend`);

const tripDays = tripEvents.querySelector(`.trip-days`);


dates.forEach((date, dateIndex) => {
  const day = createElement(createDaysItem(new Date(date), dateIndex + 1));

  waypoints
    .filter((waypoint) => new Date(waypoint.startDate).toDateString() === date)
    .forEach((waypoint) => {
      renderElement(day.querySelector(`.trip-events__list`), createElement(createWaypointTemplate(waypoint)), `beforeend`);
    });
  renderElement(tripDays, day, `beforeend`);
});

const getFullPrice = waypoints.reduce((acc, item) => acc + item.price, 0);

document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;

