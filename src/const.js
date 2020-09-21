export const Types = {
  TAXI: `taxi`,
  BUS: `bus`,
  TRAIN: `train`,
  SHIP: `ship`,
  TRANSPORT: `transport`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
  CHECK_IN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`
};

export const TYPES = Object.values(Types);

export const DESTINATION_CITIES = [`Amsterdam`, `Chamonix`, `Geneva`, `Saint Petersburg`];
export const OFFERS = [
  {
    name: `Add luggage`,
    type: `luggage`,
    price: 30,
    checked: true
  },
  {
    name: `Switch to comfort class`,
    type: `comfort`,
    price: 100,
    checked: true
  },
  {
    name: `Add meal`,
    type: `meal`,
    price: 15,
    checked: false
  },
  {
    name: `Choose seats`,
    type: `seats`,
    price: 5,
    checked: false
  },
  {
    name: `Travel by train`,
    type: `train`,
    price: 40,
    checked: false
  },
];

export const DESTINATION_DESC = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
];

export const SortType = {
  DEFAULT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const UserAction = {
  UPDATE_TRIP: `UPDATE_TRIP`,
  ADD_TRIP: `ADD_TRIP`,
  DELETE_TRIP: `DELETE_TRIP`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const MenuItem = {
  NEW_EVENT: `New event`,
  TABLE: `Table`,
  STATS: `Stats`
};

export const WaypointEditMode = {
  ADD_NEW: `ADD NEW`,
  EDIT: `EDIT`
};
