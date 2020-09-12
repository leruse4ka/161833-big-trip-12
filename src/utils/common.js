export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getDuration = (durationMs) => {
  return {
    m: Math.floor(durationMs / 60000 % 60),
    h: Math.floor(durationMs / 3600000 % 24),
    d: Math.floor(durationMs / 86400000)
  };
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const capitalize = (el) => {
  el = el[0].toUpperCase() + el.substring(1);
  return el;
};
