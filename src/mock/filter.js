const waypointsToFilterMap = {
  everything: (waypoints) => waypoints.length,
  future: (waypoints) => waypoints.filter((item) => new Date(item.startDate) > Date.now()),
  past: (waypoints) => waypoints.filter((item) => new Date(item.startDate) < Date.now())
};

export const generateFilter = (waypoints) => {
  return Object.entries(waypointsToFilterMap).map(([filterName, amountWaypoints]) => {
    return {
      name: filterName,
      amount: amountWaypoints(waypoints),
    };
  });
};
