import Observer from "../utils/observer.js";

export default class Waypoints extends Observer {
  constructor() {
    super();
    this._waypoints = [];
    this._destination = [];
    this._offers = [];
  }

  setWaypoints(updateType, waypoints) {
    this._waypoints = waypoints.slice();

    this._notify(updateType);
  }

  setDestinations(updateType, destinations) {
    this._destination = destinations.slice();

    this._notify(updateType);
  }

  setOffers(updateType, offers) {
    this._offers = offers.slice();

    this._notify(updateType);
  }

  getWaypoints() {
    return this._waypoints;
  }

  getDestinations() {
    return this._destination;
  }

  getOffers() {
    return this._offers;
  }

  updateWaypoint(updateType, update) {
    const index = this._waypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting trip`);
    }

    this._waypoints = [
      ...this._waypoints.slice(0, index),
      update,
      ...this._waypoints.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addWaypoint(updateType, update) {
    this._waypoints = [
      update,
      ...this._waypoints
    ];

    this._notify(updateType, update);
  }

  deleteWaypoint(updateType, update) {
    const index = this._waypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting trip`);
    }

    this._waypoints = [
      ...this._waypoints.slice(0, index),
      ...this._waypoints.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(waypoint) {
    const adaptedWaypoint = Object.assign(
        {},
        waypoint,
        {
          price: waypoint.base_price,
          startDate: new Date(waypoint.date_from),
          endDate: new Date(waypoint.date_to),
          isFavorite: waypoint.is_favorite,
          typeWaypoint: waypoint.type
        }
    );

    delete adaptedWaypoint.base_price;
    delete adaptedWaypoint.date_from;
    delete adaptedWaypoint.date_to;
    delete adaptedWaypoint.is_favorite;
    delete adaptedWaypoint.type;

    return adaptedWaypoint;
  }

  static adaptToServer(waypoint) {
    const adaptedWaypoint = Object.assign(
        {},
        waypoint,
        {
          "base_price": waypoint.price,
          "date_from": new Date(waypoint.startDate),
          "date_to": new Date(waypoint.endDate),
          "is_favorite": waypoint.isFavorite,
          "type": waypoint.typeWaypoint
        }
    );

    delete adaptedWaypoint.price;
    delete adaptedWaypoint.startDate;
    delete adaptedWaypoint.endDate;
    delete adaptedWaypoint.isFavorite;
    delete adaptedWaypoint.typeWaypoint;

    return adaptedWaypoint;
  }
}
