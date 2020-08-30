export const sortTripTime = (tripA, tripB) => {
  tripA = new Date(tripA.startDate).getTime();
  tripB = new Date(tripB.startDate).getTime();
  return tripB - tripA;
};

export const sortTripPrice = (tripA, tripB) => {
  return tripB.price - tripA.price;
};
