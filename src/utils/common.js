import moment from "moment";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getDuration = (end, start) => {
  const startDate = moment(start);
  const endDate = moment(end);
  const duration = moment.duration(endDate.diff(startDate));
  return {
    d: Math.floor(duration.asDays()),
    h: Math.floor(duration.asHours() % 24),
    m: Math.floor(duration.asMinutes() % 60)
  };
};

export const getDurationMs = (end, start) => {
  const startDate = moment(start);
  const endDate = moment(end);
  const duration = moment.duration(endDate.diff(startDate));
  return Math.floor(duration.asHours());
};

export const capitalize = (el) => {
  el = el[0].toUpperCase() + el.substring(1);
  return el;
};
