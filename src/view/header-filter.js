const createHeaderFilterItemTemplate = (filter, isChecked) => {
  const name = filter.name;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

export const createHeaderFilter = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createHeaderFilterItemTemplate(filter, index === 0)).join(``);
  return (
    `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
};
