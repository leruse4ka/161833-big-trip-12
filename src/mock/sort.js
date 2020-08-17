const waypointsToSortMap = {
  event: (waypoints) => waypoints.length,
  time: (waypoints) => waypoints.slice(waypoints.sort((a, b) => {
    return b - a;
  })),
  price: (waypoints) => waypoints.slice(waypoints.sort((a, b) => {
    return b - a;
  })),
};

export const generateSort = (waypoints) => {
  return Object.entries(waypointsToSortMap).map(([sortName, amountWaypoints]) => {
    return {
      name: sortName,
      amount: amountWaypoints(waypoints),
    };
  });
};
