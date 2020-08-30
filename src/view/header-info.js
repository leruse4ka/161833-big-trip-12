import AbstractView from "./abstract";


const createHeaderInfo = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
    <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
    </p>
  </section>`
  );
};

export default class HeaderInfo extends AbstractView {
  getTemplate() {
    return createHeaderInfo();
  }
}
