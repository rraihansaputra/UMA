export default {
  en: {
    assortmentButton: {
      default: "Subscribe now",
      active: "Adjust my assortment"
    },
    subscriptionLink: "What is subscription?",
    quizModal: {
      daysQuestion: "How long does your average period last?",
      daysRadioChoices: [
        { text: "4 days or less", value: "<4days" },
        { text: "5 days or more", value: ">5days" },
      ],
      flowQuestion: "How would you describe your flow?",
      assortment: "Your monthly assortment",
      submitButton: {
        proceed: "Proceed",
        adjust: "Adjust"
      }
    },
    recommendationDisplay: {
      assortment: "Your average monthly assortment",
      subscribe: "Subscribe and save",
      subscriptionLink: "What is subscription?",
      notReady: "Not ready for subscription?",
      bestValue: "Best value",
      perMonth: "k/month",
      perSet: "k/set",
      displayMeta: {
        trial: {
          title: "Trial set",
          description: (price) =>
            `Total ${price}k for 10 Regular and 10 Heavy pads`,
          subLength: 1,
          productAttributeCopy: (qtyString) =>
            `An assortment of UMA pads. Includes ${qtyString} pads.`,
        },
        "3m": {
          title: "Every 3 month",
          description: (price) =>
            `Total ${price}k for three months, shipped upfront`,
          subLength: 3,
          productAttributeCopy: (qtyString) =>
            `Three-month supply for your flow. Includes ${qtyString} pads.`,
        },
        "6m": {
          title: "Every 6 month",
          description: (price) =>
            `Total ${price}k for six-months, shipped upfront`,
          subLength: 6,
          productAttributeCopy: (qtyString) =>
            `Six-month supply for your flow. Includes ${qtyString} pads.`,
        },
      },
    },
    subscribeNow: "Add to cart"
  },
  id: {
    assortmentButton: {
      default: "Subscribe now",
      active: "Adjust my assortment"
    },
    subscriptionLink: "Apa itu subscription?",
    quizModal: {
      daysQuestion: "Berapa hari menstruasi kamu berlangsung?",
      daysRadioChoices: [
        { text: "4 hari atau kurang", value: "<4days" },
        { text: "5 hari atau lebih", value: ">5days" },
      ],
      flowQuestion: "Bagaimana flow kamu?",
      assortment: "Assortment pembalut per bulan",
      submitButton: {
        proceed: "Proceed",
        adjust: "Adjust"
      }
    },
    recommendationDisplay: {
      assortment: "Assortment pembalut per bulan",
      subscribe: "Hemat dengan subscription:",
      subscriptionLink: "Apa itu subscription?",
      notReady: "Belum siap untuk subscribe?",
      bestValue: "Best value",
      perMonth: "rb/bulan",
      perSet: "rb/set",
      displayMeta: {
        trial: {
          title: "Trial set",
          description: (price) =>
            `Total ${price}k untuk pembalut 10 Regular dan 10 Heavy`,
          subLength: 1,
          productAttributeCopy: (qtyString) =>
            `An assortment of UMA pads. Includes ${qtyString} pads.`,
        },
        "3m": {
          title: "Setiap 3 bulan",
          description: (price) =>
            `Total ${price}rb untuk tiga bulan, dikirim dimuka`,
          subLength: 3,
          productAttributeCopy: (qtyString) =>
            `Three-month supply for your flow. Includes ${qtyString} pads.`,
        },
        "6m": {
          title: "Setiap 6 bulan",
          description: (price) =>
            `Total ${price}rb untuk enam bulan, dikirim dimuka`,
          subLength: 6,
          productAttributeCopy: (qtyString) =>
            `Six-month supply for your flow. Includes ${qtyString} pads.`,
        },
      },
    },
    subscribeNow: "Add to cart"
  }
}
