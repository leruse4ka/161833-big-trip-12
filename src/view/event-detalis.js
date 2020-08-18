export const createEventDetalis = (waypoints = {}) => {
  const {
    destinationInfo,
    offers
  } = waypoints;

  return (
    `<section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">

        ${(offers) ? Object.entries(offers).map((item) =>
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item[1].type}-1" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-${item[1].type}-1">
            <span class="event__offer-title">${item[1].name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${item[1].price}</span>
          </label>
        </div>`
    ).join(``) : `` }
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationInfo.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          <img class="event__photo" src="${destinationInfo.photos}" alt="Event photo">
        </div>
      </div>
    </section>
  </section>`
  );
};
