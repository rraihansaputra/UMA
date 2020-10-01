<template>
  <div class="mt-3 stack-3" id="container" style="margin-bottom: 1.5em;">
    <div>
      <b-button
        v-if="!this.recommendationSubmitted.flow"
        v-b-modal.modal1
        id="assortment-button"
        class=""
        block
        pill
        dark
      >
        Subscribe now
      </b-button>
      <b-button
        v-else
        v-b-modal.modal1
        id="assortment-button__active"
        class=""
        block
        pill
        dark
      >
        Adjust my assortment
      </b-button>
      <p
        style="text-align: center; margin-top: 0.5em;"
        v-if="!recommendationDisplay"
      >
        <a
          href="#subscription"
          class="text-info"
          style="text-decoration: underline;"
          @click="openSubscriptionDetails"
        >
          What is subscription?
        </a>
      </p>

      <p></p>
    </div>

    <div id="modal-style-target">
      <b-modal
        id="modal1"
        ok-disabled
        cancel-disabled
        centered
        static
        @show="resetModal"
        @hide="resetModal"
        @hidden="scrollToRecommendationDisplay"
      >
        <template v-slot:modal-header="{ close }">
          <div
            :class="[
              'progress-bullet',
              recommendationIntroButton ? 'active' : null,
            ]"
          ></div>
          <div
            :class="[
              'progress-bullet',
              recommendationChoice.days ? 'active' : null,
            ]"
          ></div>
          <div
            :class="[
              'progress-bullet',
              recommendationChoice.flow ? 'active' : null,
            ]"
          ></div>
          <button type="button" aria-label="Close" class="close" @click="close">
            ×
          </button>
        </template>
        <form @submit.prevent="handleAssortmentForm" class="px-4">
          <transition-group name="modal-form" tag="div" class="stack-4">
            <div
              key="intro"
              class="mt-2"
              v-if="!recommendationIntroButton && !recommendationChoice.days"
            >
              <p>
                <b>
                  To get started, let's find the perfect assortment for you.
                </b>
              </p>
              <b-button
                variant="info"
                dark
                block
                pill
                @click="recommendationIntroButton = true"
                style="font-size: 1.25em;"
              >
                Let's go
              </b-button>
            </div>
            <div
              key="days"
              v-if="recommendationIntroButton || recommendationChoice.days"
              class="modal-form-item"
            >
              <b>How long does your average period last?</b>
              <b-form-radio-group
                v-model="recommendationChoice.days"
                stacked
                buttons
                :options="daysRadioChoices"
                name="assortment_days"
                class="mt-2 stack-2 c-radio-stacked-buttons"
                button-variant="outline-info"
              >
              </b-form-radio-group>
            </div>
            <div
              v-if="recommendationChoice.days"
              class="mb-1 modal-form-item"
              key="flow"
            >
              <b>How would you describe your flow?</b>
              <b-form-radio-group
                v-model="recommendationChoice.flow"
                stacked
                buttons
                :options="flowRadioChoices"
                name="assortment_flow"
                class="mt-2 stack-2 c-radio-stacked-buttons"
                button-variant="outline-info"
              >
              </b-form-radio-group>
            </div>

            <div
              v-if="modalMonthlyAssortment"
              key="monthlyAssortment"
              class="modal-form-item"
            >
              <b>Your monthly assortment</b>
              <div class="d-flex stack-h-3">
                <span
                  class="d-flex align-items-center monthly-assortment-pill-text"
                >
                  <div class="monthly-assortment-pill regular mr-2"></div>
                  {{ modalMonthlyAssortment.regular }} Regular
                </span>
                <span
                  class="d-flex align-items-center monthly-assortment-pill-text"
                >
                  <div class="monthly-assortment-pill heavy mr-2"></div>
                  {{ modalMonthlyAssortment.heavy }} Heavy
                </span>
              </div>
            </div>

            <div
              class="d-flex justify-content-center modal-form-item"
              v-if="recommendationChoice.flow"
              key="button"
            >
              <b-button
                type="submit"
                name="submit"
                block
                pill
                variant="info"
                style="border-width: 2px;"
                :disabled="!!recommendationDisplay ? modalIsNotChanged : false"
              >
                <b>
                  <span v-show="!recommendationDisplay">Proceed</span>
                  <span v-show="!!recommendationDisplay">Adjust</span>
                </b>
              </b-button>
            </div>
          </transition-group>
        </form>

        <template v-slot:modal-footer>
          <div>&nbsp;</div>
        </template>
      </b-modal>
    </div>

    <div
      class="stack-3"
      v-if="recommendationDisplay"
      id="recommendation-display"
    >
      <div class="mb-3" v-if="recommendationMonthlyAssortment">
        <b>Your average monthly assortment</b>
        <div class="d-flex stack-h-3">
          <span class="d-flex align-items-center mt-1">
            <div class="monthly-assortment-pill regular mr-2"></div>
            {{ recommendationMonthlyAssortment.regular }} Regular
          </span>
          <span class="d-flex align-items-center">
            <div class="monthly-assortment-pill heavy mr-2"></div>
            {{ recommendationMonthlyAssortment.heavy }} Heavy
          </span>
        </div>
      </div>

      <div>
        <b>Subscribe and save</b>
        <span
          style="float: right; text-decoration: underline; cursor: pointer;"
          class="text-muted"
        >
          <!-- <a @click="isQtyDisplayed = !isQtyDisplayed">
            <span v-if="!isQtyDisplayed">What is included?</span>
            <span v-else>Show less</span>
          </a> -->
          <a
            href="#subscription"
            class="text-info"
            style="text-decoration: underline;"
            @click="openSubscriptionDetails"
          >
            What is subscription?
          </a>
        </span>
      </div>

      <div class="stack-3">
        <div
          v-for="(sku, key) in recommendationDisplay"
          :key="key"
          :class="key === 'trial' ? 'mt-n1' : ''"
        >
          <b v-if="key === 'trial'">Not ready to subscribe?</b>
          <div v-if="key === '6m'" class="d-flex justify-content-end mt-n2">
            <p
              class="px-3 mb-n3"
              style="
                color: white;
                background: #4854AD;
                z-index: 1;
                margin-right: 0.25em;
                font-size: 0.95em;
                "
            >
              Best value
            </p>
          </div>

          <div
            @click="selectVariant(sku, key)"
            :class="[
              'p-3',
              'border',
              'd-flex',
              'stack-h-3',
              'sku-select',
              selectedVariant === sku ? 'sku-select__active' : null,
              key === 'trial' ? 'mt-2' : null,
            ]"
            style="cursor: pointer;"
          >
            <div class="flex-grow-1">
              <span>{{ displayMeta[key].title }}</span
              ><br />
              <span class="text-muted">
                {{ displayMeta[key].description(getSkuPrice(sku)) }} </span
              ><br />
              <span v-show="isQtyDisplayed" class="text-muted">
                {{ getQtyString(sku) }}
              </span>
            </div>

            <div>
              <p v-if="key === 'trial'" class="h5">
                {{ getSkuPrice(sku) / displayMeta[key].subLength }}k/set
              </p>
              <p v-else class="h5">
                {{ getSkuPrice(sku) / displayMeta[key].subLength }}k/month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-button
      v-show="recommendationDisplay"
      block
      pill
      variant="info"
      @click="addToCart"
      :disabled="!selectedVariant || loading"
    >
      <b-spinner v-if="loading" small></b-spinner>
      <b>Subscribe now</b>
    </b-button>

    <!-- <div v-show="recommendationDisplay">
      <p class="text-center text-reset">
        <a
          href="#subscription"
          class="text-secondary"
          style="text-decoration: underline;"
          @click="openSubscriptionDetails"
          >What is subscription?</a
        >
      </p>
    </div> -->

    <div
      id="sealsubscriptions-default-widget-target-element"
      style="display: none"
    />
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Axios from "axios";
import {
  BButton,
  BModal,
  VBModal,
  ModalPlugin,
  BSpinner,
  BFormRadio,
  BFormRadioGroup,
} from "bootstrap-vue";

import Client from "shopify-buy";
const client = Client.buildClient({
  domain: "umawomen.myshopify.com",
  storefrontAccessToken: "eb9af665e31356249e1a3eb3be18754e",
});

Vue.use(VueRouter);
Vue.use(ModalPlugin);
Vue.directive("b-modal", VBModal);

const SKU_INFO = {
  "TRIAL-SET": { regular: 1, heavy: 1 },
  "3M-4D-L": { regular: 3, heavy: 1 },
  "6M-4D-L": { regular: 6, heavy: 2 },
  "3M-4D-M": { regular: 2, heavy: 2 },
  "6M-4D-M": { regular: 4, heavy: 4 },
  "3M-4D-H": { regular: 1, heavy: 3 },
  "6M-4D-H": { regular: 2, heavy: 6 },
  "3M-5D-L": { regular: 4, heavy: 2 },
  "6M-5D-L": { regular: 8, heavy: 4 },
  "3M-5D-M": { regular: 3, heavy: 3 },
  "6M-5D-M": { regular: 6, heavy: 6 },
  "3M-5D-H": { regular: 2, heavy: 4 },
  "6M-5D-H": { regular: 4, heavy: 8 },
};

const AVG_MONTHLY_ASSORTMENT = {
  "<4days": {
    light: { regular: 10, heavy: 3 },
    medium: { regular: 7, heavy: 6 },
    heavy: { regular: 3, heavy: 10 },
  },
  ">5days": {
    light: { regular: 14, heavy: 6 },
    medium: { regular: 10, heavy: 10 },
    heavy: { regular: 6, heavy: 14 },
  },
};

export default Vue.extend({
  components: {
    BButton,
    BModal,
    BSpinner,
    BFormRadio,
    BFormRadioGroup,
  },
  data() {
    return {
      recommendationIntroButton: false,
      daysRadioChoices: [
        { text: "4 days or less", value: "<4days" },
        { text: "5 days or more", value: ">5days" },
      ],
      flowRadioChoices: [
        { text: "Light", value: "light" },
        { text: "Medium", value: "medium" },
        { text: "Heavy", value: "heavy" },
      ],
      recommendationChoice: {
        days: null,
        flow: null,
      },
      recommendation: {
        "<4days": {
          light: { "3m": "3M-4D-L", "6m": "6M-4D-L", trial: "TRIAL-SET" },
          medium: { "3m": "3M-4D-M", "6m": "6M-4D-M", trial: "TRIAL-SET" },
          heavy: { "3m": "3M-4D-M", "6m": "6M-4D-M", trial: "TRIAL-SET" },
        },
        ">5days": {
          light: { "3m": "3M-5D-L", "6m": "6M-5D-L", trial: "TRIAL-SET" },
          medium: { "3m": "3M-5D-M", "6m": "6M-5D-M", trial: "TRIAL-SET" },
          heavy: { "3m": "3M-5D-H", "6m": "6M-5D-H", trial: "TRIAL-SET" },
        },
      },
      recommendationDisplay: null,
      recommendationMonthlyAssortment: null,
      recommendationSubmitted: { days: null, flow: null },

      isQtyDisplayed: false,
      selectedVariant: null,
      selectedSubLength: null,
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
      productAttributeCopy: null,

      // Updated to the GraphQL ID on mounted (updateProducts())
      skuMap: {},
      product: {},
      checkoutData: null,
      loading: false,
      dataLoaded: false,
    };
  },
  methods: {
    handleAssortmentForm(event) {
      const formContent = event.currentTarget;

      const days = formContent["assortment_days"].value;
      const flow = formContent["assortment_flow"].value;

      this.recommendationSubmitted = { days, flow };
      this.recommendationDisplay = this.recommendation[days][flow];
      this.recommendationMonthlyAssortment = AVG_MONTHLY_ASSORTMENT[days][flow];
      this.selectedVariant = null;

      // this.$router.push({
      //   query: { ...this.$route.query, days, flow, sku: null },
      // });

      this.$bvModal.hide("modal1");
    },
    resetModal() {
      if (!this.recommendationChoice.days)
        this.recommendationIntroButton = false;
      this.recommendationChoice = { ...this.recommendationSubmitted };
    },
    scrollToRecommendationDisplay() {
      this.$nextTick(() => {
        const assortmentButtonElement = document.getElementById(
          "assortment-button__active"
        );

        if (assortmentButtonElement)
          assortmentButtonElement.scrollIntoView({ behavior: "smooth" });
      });
    },
    getSkuPrice(sku) {
      if (!this.dataLoaded) return 0;
      return (
        this.product.variants.find((variant) => variant.sku === sku).price /
        1000
      );
    },
    getSkuGraphQLID(sku) {
      if (!this.dataLoaded) return 0;
      return this.product.variants.find((variant) => variant.sku === sku).id;
    },
    getQtyString(sku) {
      const qty = SKU_INFO[sku];

      return `${qty.regular * 10} Regular + ${qty.heavy * 10} Heavy`;
    },
    selectVariant(sku, key) {
      // this.$router.push({ query: { ...this.$route.query, sku: sku } });
      this.selectedVariant = sku;
    },
    productAttributeCopyFunction(sku) {
      let key = "";

      if (sku.startsWith("TRIAL")) key = "trial";
      else if (sku.startsWith("3M")) key = "3m";
      else if (sku.startsWith("6M")) key = "6m";
      else {
        window.alert(
          "Something went wrong. Please notify the store owner. (Copy function)"
        );
        return;
      }

      return this.displayMeta[key].productAttributeCopy;
    },
    async addToCart() {
      // Prepare information
      const sku = this.selectedVariant;

      if (!Object.keys(SKU_INFO).includes(sku)) {
        console.error("sku doesn't exist");
        window.alert(
          "Something went wrong. Please notify the store owner. (SKU Mismatch)"
        );
        return;
      }

      const variantId = this.getSkuGraphQLID(sku);
      const productAttributeCopy = this.productAttributeCopyFunction(sku)(
        this.getQtyString(sku)
      );

      const cartItems = [
        {
          variantId,
          quantity: 1,
          customAttributes: [
            { key: "Description", value: productAttributeCopy },
          ],
        },
      ];

      // save state on query
      this.$router.push({
        query: {
          ...this.$route.query,
          days: this.recommendationSubmitted.days,
          flow: this.recommendationSubmitted.flow,
          sku,
        },
      });

      // Actually adding to cart
      this.loading = true;

      try {
        this.checkoutData = await client.checkout.create();

        this.checkoutData = await client.checkout.addLineItems(
          this.checkoutData.id,
          cartItems
        );

        window.location.href = this.checkoutData.webUrl;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.error(e);
        window.alert("Something went wrong. Please notify the store owner.");
      }
    },
    async updateProducts() {
      this.product = await client.product.fetchByHandle("organic-pads");
      this.dataLoaded = true;
    },
    openSubscriptionDetails() {
      // TODO scrollIntoView with center?
      document.getElementById("subscription").open = true;
    },
    loadParams() {
      const { days, flow, sku } = this.$route.query;
      if (sku) this.selectedVariant = sku;
      else this.selectedVariant = null;
      if (days && flow) {
        this.recommendationSubmitted = { days, flow };
        this.recommendationDisplay = this.recommendation[days][flow];
        this.recommendationMonthlyAssortment =
          AVG_MONTHLY_ASSORTMENT[days][flow];
      } else {
        this.recommendationSubmitted = { days: null, flow: null };
        this.recommendationDisplay = null;
        this.recommendationMonthlyAssortment = null;
      }
    },
  },
  async created() {
    await this.updateProducts();
  },
  computed: {
    modalMonthlyAssortment() {
      if (!this.recommendationChoice.days || !this.recommendationChoice.flow)
        return null;
      return AVG_MONTHLY_ASSORTMENT[this.recommendationChoice.days][
        this.recommendationChoice.flow
      ];
    },
    modalIsNotChanged() {
      if (!this.recommendationSubmitted || !this.recommendationChoice)
        return false;

      return (
        JSON.stringify(this.recommendationSubmitted) ===
        JSON.stringify(this.recommendationChoice)
      );
    },
  },
  watch: {
    "$route.query": {
      handler() {
        this.loadParams();
      },
      immediate: true,
    },
  },
});
</script>
<style lang="scss" scoped>
$primary: #f5ede4;
$secondary: #463a23;
$info: #12212b;
$gray-300: #eaeaea;

$body-color: $secondary;

$spacer: 1rem !default;
$spacers: () !default;
// stylelint-disable-next-line scss/dollar-variable-default
$spacers: map-merge(
  (
    0: 0,
    1: (
      $spacer * 0.25,
    ),
    2: (
      $spacer * 0.5,
    ),
    3: $spacer,
    4: (
      $spacer * 1.5,
    ),
    5: (
      $spacer * 3,
    ),
  ),
  $spacers
);

@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~bootstrap/scss/root";
@import "~bootstrap/scss/reboot";
@import "~bootstrap/scss/type";
@import "~bootstrap/scss/grid";
@import "~bootstrap/scss/forms";
@import "~bootstrap/scss/buttons";
@import "~bootstrap/scss/spinners";
@import "~bootstrap/scss/utilities";

@import "~bootstrap-vue/src/variables";
@import "~bootstrap-vue/src/utilities";
@import "~bootstrap-vue/src/components/form-tags";
@import "~bootstrap-vue/src/components/input-group";
@import "~bootstrap-vue/src/components/modal";
@import "~bootstrap-vue/src/icons";

// Add stack-* to have automatic margins
// for children nodes in vertical stacks.
@each $size, $value in $spacers {
  .stack-#{$size} {
    > *:not(:last-child) {
      margin-bottom: $value !important;
    }
  }
}

// Add stack-h-* to have automatic margins
// for children nodes in horizontal stacks.
@each $size, $value in $spacers {
  .stack-h-#{$size} {
    > *:not(:last-child) {
      margin-right: $value !important;
    }
  }
}

b,
strong {
  font-weight: bold;
}

// inject deep to enable modals
#modal-style-target::v-deep {
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/buttons";
  @import "~bootstrap/scss/transitions";
  @import "~bootstrap/scss/button-group";
  @import "~bootstrap/scss/close";
  @import "~bootstrap/scss/modal";
  @import "~bootstrap-vue/src/components/modal";

  // Add stack-* to have automatic margins
  // for children nodes in vertical stacks.
  @each $size, $value in $spacers {
    .stack-#{$size} {
      > *:not(:last-child) {
        margin-bottom: $value !important;
      }
    }
  }

  b,
  strong {
    font-weight: bold;
  }

  .btn {
    font-size: inherit;
    &.disabled {
      background: $gray-300 !important;
      border-color: $gray-300 !important;
    }
  }

  .progress-bullet {
    width: 0.6em;
    height: 0.6em;
    margin-right: 0.2em;
    display: inline-block;
    border-radius: 100%;
    border: 1px solid $info;
    background: transparent;

    &.active {
      background: $info;
    }
  }

  .c-radio-stacked-buttons {
    width: 100%;

    > .btn {
      border-radius: 50rem !important; // from .rounded-pill
      border: 1px solid $gray-500 !important;
      background-color: $white !important;
      width: 100%;
      letter-spacing: 0.04em;
      font-size: 1.25em;

      &:hover {
        color: $info !important;
      }

      &.active {
        color: $info !important;
        background-color: RGBA(64, 93, 133, 0.15) !important; // rgb is $info
      }
    }
  }

  .monthly-assortment-pill {
    width: 2em;
    height: 0.5em;
    border-radius: 50em;
    background: black;
    display: inline-block;

    &-text {
      font-size: 1.25em;
    }

    &.heavy {
      // background: $info;
      background: #405d85;
    }
    &.regular {
      background: #93bbd5;
    }
  }

  .modal-form-item {
    transition: all 0.5s;
    display: block;
  }

  .modal-form-enter,
  .modal-form-leave-to {
    opacity: 0;
    transform: translateY(-50px);
  }

  .modal-form-leave-active {
    position: absolute;
  }
}
.btn {
  &.disabled {
    background: $gray-300 !important;
    border-color: $gray-300 !important;
  }
}

// need to be synced with above
.monthly-assortment-pill {
  width: 2em;
  height: 0.5em;
  border-radius: 50em;
  background: black;
  display: inline-block;

  &.heavy {
    // background: $info;
    background: #405d85;
  }
  &.regular {
    background: #93bbd5;
  }
}

.sku-select {
  background: $white;
  &__active {
    // background: #b8c3cc;
    // background: #f4f6fa;
    background: #e6eff5;
  }
  & .text-muted {
    color: #7E7D79 !important;
  }
}

#assortment-button {
  color: $white;
  background-color: $info;
  border-color: $info;
  box-shadow: 0 0.2rem 0.3rem rgba(37, 40, 43, 0.32);
  font-weight: 600;
  transition: unset;
  letter-spacing: 0.06em;

  &__active {
    color: $info;
    background-color: white;
    border-color: $info;
    font-weight: bold;
    transition: unset;

    &:focus {
      box-shadow: 0 0 0 0.2rem #e6eff5;
      // box-shadow: 0 0 0 0.2rem #a5b8d3;
      // box-shadow: 0 0 0 0.2rem rgba(184, 195, 204, 0.5);
    }
  }
}

.form-cycle {
  input {
    appearance: none;
    border-radius: 50%;
    width: 16px;
    height: 16px;

    border: 1px solid $secondary;

    &:checked {
      border: 0.4em solid $secondary;
      & + label {
        font-weight: bold;
      }
    }
  }
}

.radio-thing {
  label {
    margin-top: 0.2em;
  }

  input {
    z-index: 1;
    appearance: none;

    border-radius: 50%;
    width: 16px;
    height: 16px;

    border: 1px solid $secondary;

    &:checked {
      border: 0.4em solid $secondary;

      & + label {
        font-weight: bold;
      }
    }
  }
}
.radio-thing:not(:last-child) {
  &:before {
    content: "";
    position: relative;
    height: 1px;
    width: 96%;
    background: $secondary;
    top: 0.4em;
    left: 50%;
    z-index: 0;
  }
}
</style>
<style lang="scss">
// modal override styles
#modal1 {
  opacity: 1;
  background: unset;
  transition: all 0.5s ease;

  &___BV_modal_footer_ {
    border-top: 0px solid red !important;
    padding: 0rem 1rem !important;
  }

  &___BV_modal_header_ {
    border-bottom: 0px solid red !important;
    padding: 1rem 1rem 0 1rem !important;
    align-items: center !important;
  }

  &___BV_modal_body_ {
    transition: all 1s;
  }

  &___BV_modal_content_ {
    background: #fafafa !important;
  }
}
</style>
