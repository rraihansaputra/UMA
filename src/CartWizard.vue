<template>
  <div class="my-4 stack-3" id="container">
    <div>
      <p class="m-0">
        Ultra soft period pads for maximum comfort andprotection.
      </p>
    </div>

    <b-button
      v-if="!this.recommendationChoice.flow"
      v-b-modal.modal1
      id="assortment-button"
      class="text-uppercase"
      block
      pill
      dark
    >
      Find the perfect assortment
    </b-button>
    <b-button
      v-else
      v-b-modal.modal1
      id="assortment-button__active"
      class="text-uppercase"
      block
      pill
      dark
    >
      Customize my assortment
    </b-button>

    <b-modal
      id="modal1"
      ok-disabled
      cancel-disabled
      centered
      static
      @show="loadParams"
      @hide="loadParams"
    >
      <form @submit.prevent="handleAssortmentForm" class="px-4 lead">
        <div class="mb-3">
          <b>Select your cycle:</b>
          <div class="mt-2">
            <div class="form-cycle d-flex align-items-center">
              <input
                type="radio"
                name="assortment_days"
                value="<4days"
                id="form_<4days"
                v-model="recommendationChoice.days"
              /><label for="form_<4days" class="mb-0 ml-1"
                >4 days or fewer</label
              >
            </div>
            <div class="form-cycle d-flex align-items-center">
              <input
                type="radio"
                name="assortment_days"
                value=">5days"
                id="form_>5days"
                v-model="recommendationChoice.days"
              /><label for="form_>5days" class="mb-0 ml-1"
                >5 days or more</label
              >
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div
            v-show="recommendationChoice.days"
            :class="['mb-1', recommendationChoice.days ? false : 'text-muted']"
          >
            <b>Select your flow:</b>
            <div class="d-flex justify-content-around text-uppercase lead mt-2">
              <div
                class="d-flex flex-column align-items-center radio-thing"
                style="flex:0 1 33%"
              >
                <input
                  type="radio"
                  value="light"
                  name="assortment_flow"
                  v-model="recommendationChoice.flow"
                  id="form_light"
                  :disabled="!recommendationChoice.days"
                />
                <label for="form_light">Light</label>
              </div>
              <div
                class="d-flex flex-column align-items-center radio-thing"
                style="flex:0 1 33%"
              >
                <input
                  type="radio"
                  value="medium"
                  name="assortment_flow"
                  v-model="recommendationChoice.flow"
                  id="form_medium"
                  :disabled="!recommendationChoice.days"
                />
                <label for="form_medium">Medium</label>
              </div>
              <div
                class="d-flex flex-column align-items-center radio-thing"
                style="flex:0 1 33%"
              >
                <input
                  type="radio"
                  value="heavy"
                  name="assortment_flow"
                  v-model="recommendationChoice.flow"
                  id="form_heavy"
                  :disabled="!recommendationChoice.days"
                />
                <label for="form_heavy">Heavy</label>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <b-button
            type="submit"
            name="submit"
            class="px-4 text-uppercase"
            :disabled="!recommendationChoice.flow"
          >
            <span v-show="!this.recommendationDisplay">Find out</span>
            <span v-show="!!this.recommendationDisplay">Adjust</span>
          </b-button>
        </div>
      </form>

      <template v-slot:modal-footer>
        <div>&nbsp;</div>
      </template>
    </b-modal>

    <div class="stack-2" v-if="recommendationDisplay">
      <div>
        <b>Subscribe and save</b>
        <span
          style="float: right; text-decoration: underline"
          class="text-muted"
        >
          <a @click="isQtyDisplayed = !isQtyDisplayed">
            <span v-if="!isQtyDisplayed">What is included?</span>
            <span v-else>Show less</span>
          </a>
        </span>
      </div>

      <div class="stack-3">
        <div
          v-for="(sku, key) in recommendationDisplay"
          :key="key"
          @click="selectVariant(sku, key)"
          :class="[
            'p-3',
            'border',
            'd-flex',
            'stack-h-3',
            selectedVariant === sku ? 'border-secondary bg-primary' : null,
          ]"
          style="cursor: pointer;"
        >
          <div class="flex-grow-1">
            <b>{{ displayMeta[key].title }}</b
            ><br />
            <span class="text-muted">
              {{ displayMeta[key].description(getSkuPrice(sku)) }} </span
            ><br />
            <span v-show="isQtyDisplayed" class="text-muted text-uppercase">
              {{ getQtyString(sku) }}
            </span>
          </div>
          <div>
            <p class="h5">
              {{ getSkuPrice(sku) / displayMeta[key].subLength }}k/month
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- TODO Move into 6mo -->
    <div v-if="false" class="d-flex justify-content-end">
      <p
        class="px-3 mb-n2"
        style="color: #F9F7F3; background: #B8C3CC; z-index: 1"
      >
        <i>Free shipping!</i>
      </p>
    </div>

    <b-button
      v-show="recommendationDisplay"
      block
      @click="addToCart"
      :disabled="!selectedVariant || loading"
    >
      <b-spinner v-if="loading" small></b-spinner>
      PROCEED
    </b-button>

    <div v-show="recommendationDisplay">
      <p class="text-center text-reset">
        <a
          href="#subscription"
          class="text-secondary"
          style="text-decoration: underline;"
          @click="openSubscriptionDetails"
          >What is subscription?</a
        >
      </p>
    </div>

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
import { BButton, BModal, VBModal, ModalPlugin, BSpinner } from "bootstrap-vue";

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

export default Vue.extend({
  components: {
    BButton,
    BModal,
    BSpinner,
  },
  data() {
    return {
      recommendationChoice: {
        days: null,
        flow: null,
      },
      recommendation: {
        "<4days": {
          light: { trial: "TRIAL-SET", "3m": "3M-4D-L", "6m": "6M-4D-L" },
          medium: { trial: "TRIAL-SET", "3m": "3M-4D-M", "6m": "6M-4D-M" },
          heavy: { trial: "TRIAL-SET", "3m": "3M-4D-M", "6m": "6M-4D-M" },
        },
        ">5days": {
          light: { trial: "TRIAL-SET", "3m": "3M-5D-L", "6m": "6M-5D-L" },
          medium: { trial: "TRIAL-SET", "3m": "3M-5D-M", "6m": "6M-5D-M" },
          heavy: { trial: "TRIAL-SET", "3m": "3M-5D-H", "6m": "6M-5D-H" },
        },
      },
      recommendationDisplay: null,
      isQtyDisplayed: false,
      selectedVariant: null,
      selectedSubLength: null,
      displayMeta: {
        trial: {
          title: "Trial set",
          description: (price) =>
            `Total ${price}k for an assortment of UMA pads`,
          subLength: 1,
          productAttributeCopy: (qtyString) =>
            `An assortment of UMA pads. Includes ${qtyString} pads.`,
        },
        "3m": {
          title: "Quarterly",
          description: (price) =>
            `Total ${price}k for three-month supply, shipped upfront`,
          subLength: 3,
          productAttributeCopy: (qtyString) =>
            `Three-month supply for your flow. Includes ${qtyString} pads.`,
        },
        "6m": {
          title: "Semi-anually",
          description: (price) =>
            `Total ${price}k for six-month supply, shipped upfront`,
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

      this.$router.push({
        query: { ...this.$route.query, days, flow, sku: null },
      });

      this.$bvModal.hide("modal1");
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
      this.$router.push({ query: { ...this.$route.query, sku: sku } });
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

      // Actually adding to cart
      this.loading = true;

      try {
        this.checkoutData = await client.checkout.create();

        this.checkoutData = await client.checkout.addLineItems(
          this.checkoutData.id,
          cartItems
        );

        window.location.href = this.checkoutData.webUrl;
      } catch (e) {
        this.loading = false;
        console.error(e);
        window.alert("Something went wrong. Please notify the store owner.");
      }
    },
    async updateProducts() {
      this.product = await client.product.fetchByHandle("organic-period-pads");
      this.dataLoaded = true;
    },
    openSubscriptionDetails() {
      document.getElementById("subscription").open = true;
    },
    loadParams() {
      const { days, flow, sku } = this.$route.query;
      if (sku) this.selectedVariant = sku;
      else this.selectedVariant = null;
      if (days && flow) {
        this.recommendationChoice = { days, flow };
        this.recommendationDisplay = this.recommendation[days][flow];
      } else {
        this.recommendationChoice = { days: null, flow: null };
        this.recommendationDisplay = null;
      }
    },
  },
  async created() {
    await this.updateProducts();
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

// Add stack-* to have automatic margins
// for children nodes in vertical stacks.
@each $size, $value in $spacers {
  .stack-#{$size} {
    > *:not(:last-child) {
      margin-bottom: $value !important;
    }
  }
}

@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";

b,
strong {
  font-weight: bold;
}

// inject deep to enable modals
// TODO cleanup only inject modal related instead of all
#container::v-deep {
  @import "~bootstrap";
  @import "~bootstrap-vue";

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

  .btn {
    font-size: inherit;
  }

  .btn-primary {
    color: #463a23;
  }
}

#assortment-button {
  color: $secondary !important;
  background-color: $gray-200 !important;
  border-color: $gray-200 !important;
  box-shadow: 0 0.2rem 0.3rem rgba(37, 40, 43, 0.32) !important;
  font-weight: bold !important;
  transition: unset !important;
  &__active {
    color: $white !important;
    background-color: $gray-500 !important;
    border-color: $gray-500 !important;
    box-shadow: 0 0.2rem 0.3rem rgba(37, 40, 43, 0.32) !important;
    font-weight: bold !important;
    transition: unset !important;
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

  &___BV_modal_footer_ {
    display: none !important;
  }

  &___BV_modal_header_ {
    border-bottom: 0px solid red !important;
    padding: 1rem 1rem 0 1rem !important;
  }

  &___BV_modal_content_ {
    background: #f9f7f3 !important;
  }
}
</style>
