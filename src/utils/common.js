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
