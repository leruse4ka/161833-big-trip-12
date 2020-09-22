import {Types} from "../const";
import {getDurationMs} from "./common";

export const typesWithImg = {
  [Types.BUS]: `🚌 BUS`,
  [Types.CHECK_IN]: `🏨 CHECK-IN`,
  [Types.DRIVE]: `🚗 DRIVE`,
  [Types.FLIGHT]: `✈️ FLIGHT`,
  [Types.RESTAURANT]: `🍴 RESTAURANT`,
  [Types.SHIP]: `🚢 SHIP`,
  [Types.SIGHTSEEING]: `🏛️ SIGHTSEEING`,
  [Types.TAXI]: `🚕 TAXI`,
  [Types.TRAIN]: `🚂 TRAIN`,
  [Types.TRANSPORT]: `🚊 TRANSPORT`
};

const filterWaypoints = (waypoints) => {
  return {
    typeBus: waypoints.filter((waypoint) => waypoint.typeWaypoint === `bus`),
    typeCheckIn: waypoints.filter((waypoint) => waypoint.typeWaypoint === `check-in`),
    typeDrive: waypoints.filter((waypoint) => waypoint.typeWaypoint === `drive`),
    typeFlight: waypoints.filter((waypoint) => waypoint.typeWaypoint === `flight`),
    typeRestaurant: waypoints.filter((waypoint) => waypoint.typeWaypoint === `restaurant`),
    typeShip: waypoints.filter((waypoint) => waypoint.typeWaypoint === `ship`),
    typeSightseeing: waypoints.filter((waypoint) => waypoint.typeWaypoint === `sightseeing`),
    typeTaxi: waypoints.filter((waypoint) => waypoint.typeWaypoint === `taxi`),
    typeTrain: waypoints.filter((waypoint) => waypoint.typeWaypoint === `train`),
    typeTransport: waypoints.filter((waypoint) => waypoint.typeWaypoint === `transport`),
  };
};

export const sumPriceTypes = (waypoints) => {
  const filtered = filterWaypoints(waypoints);

  return {
    [Types.BUS]: filtered.typeBus.reduce((acc, item) => acc + item.price, 0),
    [Types.CHECK_IN]: filtered.typeCheckIn.reduce((acc, item) => acc + item.price, 0),
    [Types.DRIVE]: filtered.typeDrive.reduce((acc, item) => acc + item.price, 0),
    [Types.FLIGHT]: filtered.typeFlight.reduce((acc, item) => acc + item.price, 0),
    [Types.RESTAURANT]: filtered.typeRestaurant.reduce((acc, item) => acc + item.price, 0),
    [Types.SHIP]: filtered.typeShip.reduce((acc, item) => acc + item.price, 0),
    [Types.SIGHTSEEING]: filtered.typeSightseeing.reduce((acc, item) => acc + item.price, 0),
    [Types.TAXI]: filtered.typeTaxi.reduce((acc, item) => acc + item.price, 0),
    [Types.TRAIN]: filtered.typeTrain.reduce((acc, item) => acc + item.price, 0),
    [Types.TRANSPORT]: filtered.typeTransport.reduce((acc, item) => acc + item.price, 0)
  };
};

export const transportUsing = (waypoints) => {
  const filtered = filterWaypoints(waypoints);

  return {
    [Types.BUS]: filtered.typeBus.length,
    [Types.DRIVE]: filtered.typeDrive.length,
    [Types.FLIGHT]: filtered.typeFlight.length,
    [Types.SHIP]: filtered.typeShip.length,
    [Types.TAXI]: filtered.typeTaxi.length,
    [Types.TRAIN]: filtered.typeTrain.length,
    [Types.TRANSPORT]: filtered.typeTransport.length
  };
};

export const durationWaypoints = (waypoints) => {
  const filtered = filterWaypoints(waypoints);
  let durationTimeBus;
  let durationTimeCheckIn;
  let durationTimeDrive;
  let durationTimeFlight;
  let durationTimeRestaurant;
  let durationTimeShip;
  let durationTimeSightSeeing;
  let durationTimeTaxi;
  let durationTimeTrain;
  let durationTimeTransport;

  filtered.typeBus.forEach((item) => {
    durationTimeBus = getDurationMs(item.endDate, item.startDate);
  });

  filtered.typeCheckIn.forEach((item) => {
    durationTimeCheckIn = getDurationMs(item.endDate, item.startDate);
  });

  filtered.typeDrive.forEach((item) => {
    durationTimeDrive = getDurationMs(item.endDate, item.startDate);
  });

  filtered.typeFlight.forEach((item) => {
    durationTimeFlight = getDurationMs(item.endDate, item.startDate);
  });

  filtered.typeRestaurant.forEach((item) => {
    durationTimeRestaurant = getDurationMs(item.endDate, item.startDate);
  });

  filtered.typeShip.forEach((item) => {
    durationTimeShip = getDurationMs(item.endDate, item.startDate);
  });

  filtered.typeSightseeing.forEach((item) => {
    durationTimeSightSeeing = getDurationMs(item.endDate, item.startDate);
  });

  filtered.typeTaxi.forEach((item) => {
    durationTimeTaxi = getDurationMs(item.endDate, item.startDate);
  });

  filtered.typeTrain.forEach((item) => {
    durationTimeTrain = getDurationMs(item.endDate, item.startDate);
  });

  filtered.typeTransport.forEach((item) => {
    durationTimeTransport = getDurationMs(item.endDate, item.startDate);
  });

  return {
    [Types.BUS]: durationTimeBus,
    [Types.CHECK_IN]: durationTimeCheckIn,
    [Types.DRIVE]: durationTimeDrive,
    [Types.FLIGHT]: durationTimeFlight,
    [Types.RESTAURANT]: durationTimeRestaurant,
    [Types.SHIP]: durationTimeShip,
    [Types.SIGHTSEEING]: durationTimeSightSeeing,
    [Types.TAXI]: durationTimeTaxi,
    [Types.TRAIN]: durationTimeTrain,
    [Types.TRANSPORT]: durationTimeTransport
  };
};
