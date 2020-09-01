import {
  getRandomInteger
} from "../utils/common.js";
import {TYPES, DESTINATION_CITIES, OFFERS, DESTINATION_DESC} from "../const.js";

const OFFERS_AMOUNT = 3;
const WAYPOINTS_AMOUNT = 20;

const getRandomArrayItem = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

const shuffleArray = (arr) => {
  for (let i = 0; i > arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getRandomDate = () => {
  return (
    Date.now() +
    1 +
    Math.floor(Math.random() * 7) * 24 * getRandomInteger(0, 60) * 60 * 1000
  );
};

const generateWaypoint = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();
  return {
    typeWaypoint: getRandomArrayItem(TYPES),
    destinationCity: getRandomArrayItem(DESTINATION_CITIES),
    offers: shuffleArray(OFFERS).slice(0, OFFERS_AMOUNT),
    destinationInfo: {
      description: getRandomArrayItem(DESTINATION_DESC),
      photos: `http://picsum.photos/248/152?r=${Math.random()}`
    },
    startDate: Math.min(startDate, endDate),
    endDate: Math.max(startDate, endDate),
    price: getRandomInteger(10, 300)
  };
};

const generateWaypoints = (amount) => {
  return Array(amount)
    .fill(``)
    .map((_) => generateWaypoint())
    .sort((currentCard, nextCard) => currentCard.startDate - nextCard.startDate);
};

export const waypoints = generateWaypoints(WAYPOINTS_AMOUNT);
