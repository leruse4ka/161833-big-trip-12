export const sortTripTime = (tripA, tripB) => {
  return (tripB.endDate - tripB.startDate) - (tripA.endDate - tripA.startDate);
};

export const sortTripPrice = (tripA, tripB) => {
  return tripB.price - tripA.price;
};
