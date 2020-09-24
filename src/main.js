import HeaderInfoView from "./view/header-info.js";
import HeaderMenuView from "./view/header-menu.js";
import FilterPresenter from "./presenter/filter.js";
import BoardPresenter from "./presenter/board.js";
import {remove, renderElement} from "./utils/render.js";
import WaypointsModel from "./model/waypoint.js";
import FilterModel from "./model/filter.js";
import {MenuItem, UpdateType} from "./const.js";
import StatsView from "./view/stats.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic kTy9gIdsz231yyD`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.page-header`);
const headerMain = siteHeaderElement.querySelector(`.trip-main`);
const headerControls = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEvents = siteMainElement.querySelector(`.trip-events`);
const bodyContainer = siteMainElement.querySelector(`.page-body__container`);
const headerMenuComponent = new HeaderMenuView();

const api = new Api(END_POINT, AUTHORIZATION);

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

const waypointsModel = new WaypointsModel();


const tripPresenter = new BoardPresenter(tripEvents, waypointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(headerControls, filterModel, waypointsModel);


filterPresenter.init();
tripPresenter.init();


api.getAll()
.then((waypoints) => {
  waypointsModel.setWaypoints(UpdateType.INIT, waypoints);
  renderElement(headerMain, new HeaderInfoView(waypoints), `afterbegin`);
  renderElement(headerControls, headerMenuComponent, `afterbegin`);
  headerMenuComponent.setMenuClickHandler(handleHeaderMenuClick);
})
.catch(() => {
  waypointsModel.setWaypoints(UpdateType.INIT, []);
  renderElement(headerMain, new HeaderInfoView([]), `afterbegin`);
  renderElement(headerControls, headerMenuComponent, `afterbegin`);
  headerMenuComponent.setMenuClickHandler(handleHeaderMenuClick);
});

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createWaypoint();
});
