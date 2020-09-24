import {FilterType} from "../const.js";

export const filter = {
  [FilterType.EVERYTHING]: (waypoints) => waypoints.slice().sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((item) => new Date(item.startDate) > Date.now()),
  [FilterType.PAST]: (waypoints) => waypoints.filter((item) => new Date(item.startDate) < Date.now())
};
