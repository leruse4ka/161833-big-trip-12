export const createDaysItem = (date, dayNumber) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
      <span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime="${date.toDateString()}">${date.toDateString().substr(4, 6)}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};
