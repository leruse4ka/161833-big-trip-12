import HeaderInfoView from "./view/header-info.js";
import HeaderMenuView from "./view/header-menu.js";
import FilterPresenter from "./presenter/filter.js";
import BoardPresenter from "./presenter/board.js";
import TripInfoView from "./view/trip-info.js";
import {waypoints} from "./mock/mock.js";
import {remove, renderElement} from "./utils/render.js";
import WaypointsModel from "./model/waypoint.js";
import FilterModel from "./model/filter.js";
import {MenuItem} from "./const.js";
import StatsView from "./view/stats.js";

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.page-header`);
const headerMain = siteHeaderElement.querySelector(`.trip-main`);
const headerControls = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEvents = siteMainElement.querySelector(`.trip-events`);
const bodyContainer = siteMainElement.querySelector(`.page-body__container`);
const headerMenuComponent = new HeaderMenuView();

renderElement(headerMain, new HeaderInfoView(), `afterbegin`);
renderElement(headerControls, headerMenuComponent, `afterbegin`);

const tripHeaderInfo = headerMain.querySelector(`.trip-main__trip-info`);

renderElement(tripHeaderInfo, new TripInfoView(waypoints), `afterbegin`);

const getFullPrice = waypoints.reduce((acc, item) => acc + item.price, 0);

document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;

let statsComponent = null;

const handleHeaderMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.destroy();
      tripPresenter.init();
      remove(statsComponent);
      break;
    case MenuItem.STATS:
      remove(statsComponent);
      tripPresenter.destroy();
      statsComponent = new StatsView(waypointsModel.getWaypoints());
      renderElement(bodyContainer, statsComponent, `beforeend`);
      break;
  }
};

headerMenuComponent.setMenuClickHandler(handleHeaderMenuClick);

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
