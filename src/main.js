import HeaderInfoView from "./view/header-info.js";
import HeaderMenuView from "./view/header-menu.js";
import HeaderFilterView from "./view/header-filter.js";
import TripEditView from "./view/trip-edit.js";
import SortView from "./view/sort.js";
import EventDetalisView from "./view/event-detalis.js";
import TripDaysListView from "./view/trip-days.js";
import DaysItemView from "./view/days-item.js";
import TripView from "./view/trip.js";
import TripInfoView from "./view/trip-info.js";
import {waypoints} from "./mock/mock.js";
import {renderElement} from "./util.js";
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

const TripDaysListComponent = new TripDaysListView();

renderElement(headerMain, new HeaderInfoView().getElement(), `afterbegin`);
renderElement(headerControls, new HeaderMenuView().getElement(), `afterbegin`);
renderElement(headerControls, new HeaderFilterView(filters).getElement(), `beforeend`);

renderElement(tripEvents, new SortView(sorts).getElement(), `beforeend`);


const tripHeaderInfo = headerMain.querySelector(`.trip-main__trip-info`);

renderElement(tripHeaderInfo, new TripInfoView(waypoints).getElement(), `afterbegin`);
renderElement(tripEvents, TripDaysListComponent.getElement(), `beforeend`);


const renderWaypoint = (tripListElement, waypoint) => {
  const tripComponent = new TripView(waypoint);
  const tripEditComponent = new TripEditView(waypoint);

  const eventDetalisComponent = new EventDetalisView(waypoint);

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

  tripComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceTripToForm();
    renderElement(tripEditComponent.getElement(), eventDetalisComponent.getElement(), `beforeend`);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToTrip();
    eventDetalisComponent.getElement().remove();
    eventDetalisComponent.removeElement();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(tripListElement, tripComponent.getElement(), `beforeend`);
};

dates.forEach((date, dateIndex) => {
  const day = new DaysItemView(new Date(date), dateIndex + 1).getElement();

  waypoints
    .filter((waypoint) => new Date(waypoint.startDate).toDateString() === date)
    .forEach((waypoint) => {
      renderWaypoint(day.querySelector(`.trip-events__list`), waypoint);
    });
  renderElement(TripDaysListComponent.getElement(), day, `beforeend`);
});

const getFullPrice = waypoints.reduce((acc, item) => acc + item.price, 0);

document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;


