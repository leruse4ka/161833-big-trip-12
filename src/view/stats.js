import SmartView from "./smart";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {durationWaypoints, sumPriceTypes, transportUsing, typesWithImg} from "../utils/stats";

const renderMoneyChart = (moneyCtx, waypoints) => {
  const typesPrices = sumPriceTypes(waypoints);
  const uniqTypes = Object.keys(typesPrices).slice().sort((a, b) => {
    return typesPrices[b] - typesPrices[a];
  });
  const emojiTypes = uniqTypes.map((type) => typesWithImg[type]);
  const sumPrice = Object.values(typesPrices).slice().sort((a, b) => {
    return b - a;
  });

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: emojiTypes,
      datasets: [{
        data: sumPrice,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, data) => {
  const useTransport = transportUsing(data);
  const transport = Object.keys(useTransport).slice().sort((a, b) => {
    return useTransport[b] - useTransport[a];
  });
  const transportLabels = transport.map((type) => typesWithImg[type]);
  const countUseTransport = Object.values(useTransport).slice().sort((a, b) => {
    return b - a;
  });

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: transportLabels,
      datasets: [{
        data: countUseTransport,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpendChart = (timeSpendCtx, data) => {
  const timeSpendDuration = durationWaypoints(data);
  const timeSpend = Object.keys(timeSpendDuration).slice().sort((a, b) => {
    return timeSpendDuration[b] - timeSpendDuration[a];
  });
  const timeSpendLabels = timeSpend.map((type) => typesWithImg[type]);
  const duration =
  Object
    .values(timeSpendDuration)
    .slice()
    .sort((a, b) => {
      if (b === `undefined` || a === `undefined`) {
        return 0;
      }
      return b - a;
    })
    .filter((item) => item !== undefined);

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: timeSpendLabels,
      datasets: [{
        data: duration,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}h`
        }
      },
      title: {
        display: true,
        text: `TIME SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatsTemplate = () => {
  return `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`;
};

export default class Stats extends SmartView {
  constructor(waypoints) {
    super();
    this._data = waypoints;

    this._setCharts();

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;
  }

  removeElement() {
    super.removeElement();
  }

  getTemplate() {
    return createStatsTemplate(this._data);
  }

  _setCharts() {
    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    timeSpendCtx.height = BAR_HEIGHT * 4;

    this._moneyChart = renderMoneyChart(moneyCtx, this._data);
    this._transportChart = renderTransportChart(transportCtx, this._data);
    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, this._data);
  }
}
