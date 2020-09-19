import moment from "moment";
export const sortTripTime = (tripA, tripB) => {
  return (tripB.endDate - tripB.startDate) - (tripA.endDate - tripA.startDate);
};

export const sortTripPrice = (tripA, tripB) => {
  return tripB.price - tripA.price;
};

export const currentAction = (type) => {
  let action = ``;
  switch (type) {
    case `check-in`:
    case `sightseeing`:
    case `restaurant`:
      action = `in`;
      break;
    default:
      action = `to`;
  }
  return action;
};

export const isDateEqual = (dateA, dateB) => {
  return moment(dateA).isSame(dateB, `day`);
};
