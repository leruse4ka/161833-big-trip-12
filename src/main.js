import {createHeaderInfo} from "./view/header-info.js";
import {createHeaderMenu} from "./view/header-menu.js";
import {createHeaderFilter} from "./view/header-filter.js";
import {createEventForm} from "./view/event-form.js";
import {createSort} from "./view/sort.js";
import {createEventDetalis} from "./view/event-detalis.js";
import {createTripDays} from "./view/trip-days.js";
import {createDaysItem} from "./view/days-item.js";
import {createRoutePoint} from "./view/route-point.js";
import {createTotalPrice} from "./view/total-price.js";
import {createTripInfo} from "./view/trip-info.js";

const ROUTE_POINT_COUNT = 3;

const siteHeaderElement = document.querySelector(`.page-header`);
const headerMain = siteHeaderElement.querySelector(`.trip-main`);
const headerControls = siteHeaderElement.querySelector(`.trip-controls`);
const headerControlsFirstTitle = siteHeaderElement.querySelector(`h2`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEvents = siteMainElement.querySelector(`.trip-events`);

const render = function (container, template, place) {
  container.insertAdjacentHTML(place, template);
};

render(headerMain, createHeaderInfo(), `afterbegin`);
render(headerControlsFirstTitle, createHeaderMenu(), `afterend`);
render(headerControls, createHeaderFilter(), `beforeend`);

render(tripEvents, createSort(), `beforeend`);
render(tripEvents, createEventForm(), `beforeend`);

const tripItem = tripEvents.querySelector(`.trip-events__item`);

render(tripItem, createEventDetalis(), `beforeend`);

const tripHeaderInfo = headerMain.querySelector(`.trip-main__trip-info`);

render(tripHeaderInfo, createTripInfo(), `afterbegin`);
render(tripEvents, createTripDays(), `beforeend`);

const tripDays = tripEvents.querySelector(`.trip-days`);

render(tripDays, createDaysItem(), `beforeend`);

const eventsList = tripEvents.querySelector(`.trip-events__list`);

for (let i = 0; i < ROUTE_POINT_COUNT; i++) {
  render(eventsList, createRoutePoint(), `beforeend`);
}


const tripInfoCost = headerMain.querySelector(`.trip-info__cost`);

render(tripInfoCost, createTotalPrice(), `beforeend`);
