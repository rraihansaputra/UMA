export default {
  assortmentButton: {
    default: "Loading..",
    active: "Loading..",
  },
  subscriptionLink: "Loading..",
  quizModal: {
    daysQuestion: "Loading..",
    daysRadioChoices: [
      { text: "Loading..", value: "Loading.." },
      { text: "Loading..", value: "Loading.." },
    ],
    flowQuestion: "Loading..",
    assortment: "Loading..",
    submitButton: {
      proceed: "Loading..",
      adjust: "Loading..",
    },
  },
  recommendationDisplay: {
    assortment: "Loading..",
    subscribe: "Loading..",
    subscriptionLink: "Loading..",
    notReady: "Loading..",
    bestValue: "Loading..",
    perMonth: "Loading..",
    perSet: "Loading..",
    displayMeta: {
      trial: {
        title: "Loading..",
        description: (price) =>
          `Total ${price}k for 10 Regular and 10 Heavy pads`,
        subLength: 1,
        productAttributeCopy: (qtyString) =>
          `An assortment of UMA pads. Includes ${qtyString} pads.`,
      },
      "3m": {
        title: "Loading..",
        description: (price) =>
          `Total ${price}k for three months, shipped upfront`,
        subLength: 3,
        productAttributeCopy: (qtyString) =>
          `Three-month supply for your flow. Includes ${qtyString} pads.`,
      },
      "6m": {
        title: "Loading..",
        description: (price) =>
          `Total ${price}k for six-months, shipped upfront`,
        subLength: 6,
        productAttributeCopy: (qtyString) =>
          `Six-month supply for your flow. Includes ${qtyString} pads.`,
      },
    },
  },
  subscribeNow: "Loading..",
};
