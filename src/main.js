import HeaderInfoView from "./view/header-info.js";
import HeaderMenuView from "./view/header-menu.js";
import FilterPresenter from "./presenter/filter.js";
import BoardPresenter from "./presenter/board.js";
import TripInfoView from "./view/trip-info.js";
import {waypoints} from "./mock/mock.js";
import {renderElement} from "./utils/render.js";
import WaypointsModel from "./model/waypoint.js";
import FilterModel from "./model/filter.js";

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.page-header`);
const headerMain = siteHeaderElement.querySelector(`.trip-main`);
const headerControls = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEvents = siteMainElement.querySelector(`.trip-events`);

renderElement(headerMain, new HeaderInfoView(), `afterbegin`);
renderElement(headerControls, new HeaderMenuView(), `afterbegin`);

const tripHeaderInfo = headerMain.querySelector(`.trip-main__trip-info`);

renderElement(tripHeaderInfo, new TripInfoView(waypoints), `afterbegin`);

const getFullPrice = waypoints.reduce((acc, item) => acc + item.price, 0);

document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;

const waypointsModel = new WaypointsModel();
waypointsModel.setWaypoints(waypoints);

const tripPresenter = new BoardPresenter(tripEvents, waypointsModel, filterModel);
const filterPresenter = new FilterPresenter(headerControls, filterModel, waypointsModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createWaypoint();
});
