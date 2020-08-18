import {
  getRandomInteger
} from "../util.js";

const OFFERS_AMOUNT = 3;
const WAYPOINTS_AMOUNT = 20;

const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const getRandomArrayItem = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

const destinationsCity = [`Amsterdam`, `Chamonix`, `Geneva`, `Saint Petersburg`];

const offers = [
  {
    name: `Add luggage`,
    type: `luggage`,
    price: 30,
    checked: true
  },
  {
    name: `Switch to comfort class`,
    type: `comfort`,
    price: 100,
    checked: true
  },
  {
    name: `Add meal`,
    type: `meal`,
    price: 15,
    checked: false
  },
  {
    name: `Choose seats`,
    type: `seats`,
    price: 5,
    checked: false
  },
  {
    name: `Travel by train`,
    type: `train`,
    price: 40,
    checked: false
  },
];

const destinationDesc = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
];

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
    typeWaypoint: getRandomArrayItem(types),
    destinationCity: getRandomArrayItem(destinationsCity),
    offers: shuffleArray(offers).slice(0, OFFERS_AMOUNT),
    destinationInfo: {
      description: getRandomArrayItem(destinationDesc),
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
