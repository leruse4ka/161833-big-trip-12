import HeaderInfoView from "./view/header-info.js";
import HeaderMenuView from "./view/header-menu.js";
import HeaderFilterView from "./view/header-filter.js";
import TripPresenter from "./presenter/trip.js";
import TripInfoView from "./view/trip-info.js";
import {waypoints} from "./mock/mock.js";
import {renderElement} from "./utils/render.js";
import {generateFilter} from "./mock/filter.js";

const filters = generateFilter(waypoints);

const siteHeaderElement = document.querySelector(`.page-header`);
const headerMain = siteHeaderElement.querySelector(`.trip-main`);
const headerControls = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEvents = siteMainElement.querySelector(`.trip-events`);

renderElement(headerMain, new HeaderInfoView(), `afterbegin`);
renderElement(headerControls, new HeaderMenuView(), `afterbegin`);
renderElement(headerControls, new HeaderFilterView(filters), `beforeend`);

const tripHeaderInfo = headerMain.querySelector(`.trip-main__trip-info`);

renderElement(tripHeaderInfo, new TripInfoView(waypoints), `afterbegin`);

const getFullPrice = waypoints.reduce((acc, item) => acc + item.price, 0);

document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;

const tripPresenter = new TripPresenter(tripEvents);

tripPresenter.init(waypoints);
