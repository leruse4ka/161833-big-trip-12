import {Types} from "../const";
import { getDurationMs } from "./common";

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

export const sumPriceTypes = (waypoints) => {
  const typeBus = waypoints.filter((waypoint) => waypoint.typeWaypoint === `bus`).reduce((acc, item) => acc + item.price, 0);
  const typeCheckIn = waypoints.filter((waypoint) => waypoint.typeWaypoint === `check-in`).reduce((acc, item) => acc + item.price, 0);
  const typeDrive = waypoints.filter((waypoint) => waypoint.typeWaypoint === `drive`).reduce((acc, item) => acc + item.price, 0);
  const typeFlight = waypoints.filter((waypoint) => waypoint.typeWaypoint === `flight`).reduce((acc, item) => acc + item.price, 0);
  const typeRestaurant = waypoints.filter((waypoint) => waypoint.typeWaypoint === `restaurant`).reduce((acc, item) => acc + item.price, 0);
  const typeShip = waypoints.filter((waypoint) => waypoint.typeWaypoint === `ship`).reduce((acc, item) => acc + item.price, 0);
  const typeSightseeing = waypoints.filter((waypoint) => waypoint.typeWaypoint === `sightseeing`).reduce((acc, item) => acc + item.price, 0);
  const typeTaxi = waypoints.filter((waypoint) => waypoint.typeWaypoint === `taxi`).reduce((acc, item) => acc + item.price, 0);
  const typeTrain = waypoints.filter((waypoint) => waypoint.typeWaypoint === `train`).reduce((acc, item) => acc + item.price, 0);
  const typeTransport = waypoints.filter((waypoint) => waypoint.typeWaypoint === `transport`).reduce((acc, item) => acc + item.price, 0);

  return {
    [Types.BUS]: typeBus,
    [Types.CHECK_IN]: typeCheckIn,
    [Types.DRIVE]: typeDrive,
    [Types.FLIGHT]: typeFlight,
    [Types.RESTAURANT]: typeRestaurant,
    [Types.SHIP]: typeShip,
    [Types.SIGHTSEEING]: typeSightseeing,
    [Types.TAXI]: typeTaxi,
    [Types.TRAIN]: typeTrain,
    [Types.TRANSPORT]: typeTransport
  };
};

export const transportUsing = (waypoints) => {
  const typeBus = waypoints.filter((waypoint) => waypoint.typeWaypoint === `bus`).length;
  const typeDrive = waypoints.filter((waypoint) => waypoint.typeWaypoint === `drive`).length;
  const typeFlight = waypoints.filter((waypoint) => waypoint.typeWaypoint === `flight`).length;
  const typeShip = waypoints.filter((waypoint) => waypoint.typeWaypoint === `ship`).length;
  const typeTaxi = waypoints.filter((waypoint) => waypoint.typeWaypoint === `taxi`).length;
  const typeTrain = waypoints.filter((waypoint) => waypoint.typeWaypoint === `train`).length;
  const typeTransport = waypoints.filter((waypoint) => waypoint.typeWaypoint === `transport`).length;

  return {
    [Types.BUS]: typeBus,
    [Types.DRIVE]: typeDrive,
    [Types.FLIGHT]: typeFlight,
    [Types.SHIP]: typeShip,
    [Types.TAXI]: typeTaxi,
    [Types.TRAIN]: typeTrain,
    [Types.TRANSPORT]: typeTransport
  };
};

export const durationWaypoints = (waypoints) => {
  const typeBus = waypoints.filter((waypoint) => waypoint.typeWaypoint === `bus`);
  const typeCheckIn = waypoints.filter((waypoint) => waypoint.typeWaypoint === `check-in`);
  const typeDrive = waypoints.filter((waypoint) => waypoint.typeWaypoint === `drive`);
  const typeFlight = waypoints.filter((waypoint) => waypoint.typeWaypoint === `flight`);
  const typeRestaurant = waypoints.filter((waypoint) => waypoint.typeWaypoint === `restaurant`);
  const typeShip = waypoints.filter((waypoint) => waypoint.typeWaypoint === `ship`);
  const typeSightseeing = waypoints.filter((waypoint) => waypoint.typeWaypoint === `sightseeing`);
  const typeTaxi = waypoints.filter((waypoint) => waypoint.typeWaypoint === `taxi`);
  const typeTrain = waypoints.filter((waypoint) => waypoint.typeWaypoint === `train`);
  const typeTransport = waypoints.filter((waypoint) => waypoint.typeWaypoint === `transport`);
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

  typeBus.forEach((item) => {
    durationTimeBus = getDurationMs(item.endDate, item.startDate);
  });

  typeCheckIn.forEach((item) => {
    durationTimeCheckIn = getDurationMs(item.endDate, item.startDate);
  });

  typeDrive.forEach((item) => {
    durationTimeDrive = getDurationMs(item.endDate, item.startDate);
  });

  typeFlight.forEach((item) => {
    durationTimeFlight = getDurationMs(item.endDate, item.startDate);
  });

  typeRestaurant.forEach((item) => {
    durationTimeRestaurant = getDurationMs(item.endDate, item.startDate);
  });

  typeShip.forEach((item) => {
    durationTimeShip = getDurationMs(item.endDate, item.startDate);
  });

  typeSightseeing.forEach((item) => {
    durationTimeSightSeeing = getDurationMs(item.endDate, item.startDate);
  });

  typeTaxi.forEach((item) => {
    durationTimeTaxi = getDurationMs(item.endDate, item.startDate);
  });

  typeTrain.forEach((item) => {
    durationTimeTrain = getDurationMs(item.endDate, item.startDate);
  });

  typeTransport.forEach((item) => {
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
