import AbstractView from "./abstract";


const createTripDaysListTemplate = () => {
  return `<ul class="trip-days">
  </ul>`;
};

export default class TripDaysList extends AbstractView {
  getTemplate() {
    return createTripDaysListTemplate();
  }
}
