<template>
  <div class="my-4" id="container">
    <div class="mb-3">
      <p class="m-0">
        Get maximum comfort and protection from these ultra-soft, organic pads.
        Available in Regular and Heavy variant.
      </p>
    </div>

    <b-button v-b-modal.modal1 class="text-uppercase mb-2" block
      >Find the perfect assortment</b-button
    >

    <b-modal id="modal1" ok-disabled cancel-disabled centered static>
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
            >Adjust</b-button
          >
        </div>
      </form>

      <template v-slot:modal-footer>
        <div>&nbsp;</div>
      </template>
    </b-modal>

    <!-- TODO refactor
      - cleanup into v-for component (includes decomposing copy into object)
      - add stack to CSS
      - cleanup stack
    -->
    <div class="mb-3" v-if="recommendationDisplay">
      <b>Your subscription:</b>

      <div
        @click="selectVariant(recommendationDisplay['trial'])"
        :class="[
          'p-3',
          'border',
          'd-flex',
          'mb-3',
          selectedVariant === recommendationDisplay['trial']
            ? 'border-secondary bg-primary'
            : null,
        ]"
      >
        <div class="flex-grow-1">
          <b>Trial Set</b><br />
          <span class="text-muted">
            Try an assortment of UMA pads for
            {{ getSkuPrice(recommendationDisplay["trial"]) }}k </span
          ><br />
          <span class="text-muted text-uppercase">
            {{ getQtyString(recommendationDisplay["trial"]) }}
          </span>
        </div>
        <div>
          <p class="h5">
            {{ getSkuPrice(recommendationDisplay["trial"]) / 1 }}k/month
          </p>
        </div>
      </div>

      <div
        @click="selectVariant(recommendationDisplay['3m'])"
        :class="[
          'p-3',
          'border',
          'd-flex',
          'mb-3',
          selectedVariant === recommendationDisplay['3m']
            ? 'bg-primary border-secondary'
            : null,
        ]"
      >
        <div class="flex-grow-1">
          <b>3-month</b><br />
          <span class="text-muted">
            IDR {{ getSkuPrice(recommendationDisplay["3m"]) }}k total, all
            shipped upfront</span
          ><br />
          <span class="text-muted text-uppercase">
            {{ getQtyString(recommendationDisplay["3m"]) }}
          </span>
        </div>
        <div>
          <p class="h5">
            {{ getSkuPrice(recommendationDisplay["3m"]) / 3 }}k/month
          </p>
        </div>
      </div>

      <div
        @click="selectVariant(recommendationDisplay['6m'])"
        :class="[
          'p-3',
          'border',
          'd-flex',
          selectedVariant === recommendationDisplay['6m']
            ? 'bg-primary border-secondary'
            : null,
        ]"
      >
        <div class="flex-grow-1">
          <b>6-month</b><br />
          <span class="text-muted">
            IDR {{ getSkuPrice(recommendationDisplay["6m"]) }}k paid upfront,
            delivered every three months </span
          ><br />
          <span class="text-muted text-uppercase">
            {{ getQtyString(recommendationDisplay["6m"]) }}
          </span>
        </div>
        <div>
          <p class="h5">
            {{ getSkuPrice(recommendationDisplay["6m"]) / 6 }}k/month
          </p>
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

    <div class="pt-2" v-show="recommendationDisplay">
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
import Axios from "axios";
import {
  BButton,
  BModal,
  VBModal,
  ModalPlugin,
  BSpinner,
} from "bootstrap-vue";

import Client from "shopify-buy";
const client = Client.buildClient({
  domain: "umawomen.myshopify.com",
  storefrontAccessToken: "eb9af665e31356249e1a3eb3be18754e",
});

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
      selectedVariant: null,

      // Updated to the GraphQL ID on mounted (updateProducts())
      skuMap: {},
      product: {},
      checkoutData: null,
      loading: false,
    };
  },
  methods: {
    handleAssortmentForm(event) {
      const formContent = event.currentTarget;

      const days = formContent["assortment_days"].value;
      const flow = formContent["assortment_flow"].value;

      this.recommendationDisplay = this.recommendation[days][flow];
      this.$bvModal.hide("modal1");
    },
    getSkuPrice(sku) {
      return (
        this.product.variants.find((variant) => variant.sku === sku)?.price /
        1000
      );
    },
    getSkuGraphQLID(sku) {
      return this.product.variants.find((variant) => variant.sku === sku)?.id;
    },
    getQtyString(sku) {
      const qty = SKU_INFO[sku];

      return `${qty.regular * 10} Regular + ${qty.heavy * 10} Heavy`;
    },
    selectVariant(sku) {
      this.selectedVariant = sku;
    },
    async addToCart() {
      const cartItems = [
        {
          variantId: this.getSkuGraphQLID(this.selectedVariant),
          quantity: 1,
          customAttributes: [
            {
              key: "Contents",
              value: this.getQtyString(this.selectedVariant),
            },
          ],
        },
      ];

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
    },
    openSubscriptionDetails() {
      document.getElementById("subscription").open = true;
    },
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.updateProducts();
      }
    };
  },
});
</script>
<style lang="scss" scoped>
// TODO might have to switch out primary and secondary..
$primary: #f5ede4;
$secondary: #463a23;

$body-color: $secondary;

// inject deep to enable modals
#container::v-deep {
  @import "~bootstrap";
  @import "~bootstrap-vue";

  .btn {
    font-size: inherit;
  }

  .btn-primary {
    color: #463a23;
  }
}

.subscription-box {
  padding: 1 rem;
  border: 1px solid #dee2e6;
  display: flex;
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
