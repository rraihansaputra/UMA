<template>
  <div class="my-4">
    <div class="mb-4">
      <p>
        Get maximum comfort and protection from these ultra-soft, organic pads.
        Available in Regular and Heavy variant.
      </p>
    </div>

    <div class="mb-3">
      <div class="mb-3">
        <b>Pilih siklus menstruasi kamu</b>
        <div class="d-flex mt-3">
          <b-button
            variant="primary"
            class="text-uppercase mr-1 flex-grow-1"
            pill
            @click="
              recommendationChoice.days = '<4days';
              recommendationChoice.flow = null;
              resetVariantQty();
            "
            :pressed="recommendationChoice.days === '<4days'"
          >
            4 Days or less
          </b-button>
          <b-button
            variant="primary"
            class="text-uppercase mr-1 flex-grow-1"
            pill
            @click="
              recommendationChoice.days = '>5days';
              recommendationChoice.flow = null;
              resetVariantQty();
            "
            :pressed="recommendationChoice.days === '>5days'"
          >
            5 Days or more
          </b-button>
        </div>
      </div>
      <div :class="['mb-1', recommendationChoice.days ? false : 'text-muted']">
        <b>Pilih tingkat flow kamu</b>
        <div class="d-flex justify-content-around text-uppercase lead mt-3">
          <div
            class="d-flex flex-column align-items-center radio-thing"
            style="flex:0 1 33%"
          >
            <input
              type="radio"
              value="light"
              @change="updateVariantQty('light')"
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
              v-model="recommendationChoice.flow"
              @change="updateVariantQty('medium')"
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
              @change="updateVariantQty('heavy')"
              v-model="recommendationChoice.flow"
              id="form_heavy"
              :disabled="!recommendationChoice.days"
            />
            <label for="form_heavy">Heavy</label>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="modal1"
      ok-disabled
      cancel-disabled
      centered
      @show="resetModalQty"
      @hide="resetModalQty"
    >
      <p class="lead text-center"><b>Select minimum three boxes:</b></p>
      <form @submit.prevent="handleAssortmentForm">
        <table class="mb-4">
          <tr>
            <td class="border-0">
              <div class="d-flex align-items-center">
                <div class="circle regular-color mr-1"></div>
                <p class="m-0"><span class="h3">REGULAR</span> (10 counts)</p>
              </div>
            </td>
            <td class="border-0">
              <b-form-spinbutton
                id="Quantity-OPR10SBP1"
                name="OPR10SBP1"
                :value="variantQty.OPR10SBP1"
                @change="updateModalQtyRegular"
                min="0"
                max="100"
                data-quantity-input
              ></b-form-spinbutton>
            </td>
          </tr>
          <tr>
            <td class="border-0">
              <div class="d-flex align-items-center">
                <div class="circle heavy-color mr-1"></div>
                <p class="m-0"><span class="h3">HEAVY</span> (10 counts)</p>
              </div>
            </td>
            <td class="border-0">
              <b-form-spinbutton
                id="Quantity-OPH10SBP1"
                name="OPH10SBP1"
                :value="variantQty.OPH10SBP1"
                @change="updateModalQtyHeavy"
                min="0"
                max="100"
                data-quantity-input
              ></b-form-spinbutton>
            </td>
          </tr>
        </table>

        <div
          v-show="!modalIsEligibleForFreeShipping"
          class="text-danger text-center"
        >
          <p><i>You'll lose free shipping if you select less than three</i></p>
        </div>

        <div class="d-flex justify-content-center">
          <b-button
            type="submit"
            name="submit"
            class="px-4"
            :disabled="this.totalModalQty < 1"
            >Change</b-button
          >
        </div>
      </form>

      <template v-slot:modal-footer>
        <div>&nbsp;</div>
      </template>
    </b-modal>

    <div v-show="totalAssortmentQuantity" class="mb-3">
      <div class="p-3 py-4 border border-secondary">
        <h4 class="text-uppercase text-center lead flex-grow-1 mb-2">
          Your 3-month subscription:
        </h4>
        <div class="d-flex justify-content-around mb-2">
          <div
            v-if="variantQty[VARIANT_SKU.REGULAR] > 0"
            class="d-flex align-items-center mr-2"
          >
            <div class="circle regular-color mr-1"></div>
            <p class="mb-0">
              <span class="h3">REGULAR</span> ({{
                variantQty[VARIANT_SKU.REGULAR] * 10
              }}
              counts)
            </p>
          </div>
          <div
            v-if="variantQty[VARIANT_SKU.HEAVY] > 0"
            class="d-flex align-items-center"
          >
            <div class="circle heavy-color mr-1"></div>
            <p class="mb-0">
              <span class="h3">HEAVY</span> ({{
                variantQty[VARIANT_SKU.HEAVY] * 10
              }}
              counts)
            </p>
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <a
            v-b-modal.modal1
            variant="link-secondary"
            class="text-reset text-center"
            style="text-decoration: underline;"
          >
            customize your assortment
          </a>
        </div>
      </div>
    </div>

    <b-button
      block
      @click="addToCart"
      :disabled="!totalAssortmentQuantity || loading"
    >
      <b-spinner v-if="loading" small></b-spinner>
      PROCEED
      <span v-if="totalAssortmentQuantity"
        >- IDR {{ (totalPrice / 100) | numeral("0,0.00") }}
      </span>
    </b-button>
    <p v-show="isEligibleForFreeShipping"><i>Free shipping!</i></p>

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
  BFormCheckbox,
  BFormSpinbutton,
} from "bootstrap-vue";
import vueNumeralFilterInstaller from "vue-numeral-filter";

Vue.use(vueNumeralFilterInstaller, { locale: "en-gb" });

Vue.use(ModalPlugin);
Vue.directive("b-modal", VBModal);

const VARIANT_SKU = {
  REGULAR: "OPR10SBP1",
  HEAVY: "OPH10SBP1",
};

export default Vue.extend({
  components: {
    BButton,
    BModal,
    BSpinner,
    BFormCheckbox,
    BFormSpinbutton,
  },
  data() {
    return {
      recommendationChoice: {
        days: null,
        flow: null,
      },
      recommendation: {
        "<4days": {
          light: {
            OPR10SBP1: 3,
            OPH10SBP1: 1,
          },
          medium: {
            OPR10SBP1: 2,
            OPH10SBP1: 2,
          },
          heavy: {
            OPR10SBP1: 1,
            OPH10SBP1: 3,
          },
        },
        ">5days": {
          light: {
            OPR10SBP1: 4,
            OPH10SBP1: 2,
          },
          medium: {
            OPR10SBP1: 3,
            OPH10SBP1: 3,
          },
          heavy: {
            OPR10SBP1: 2,
            OPH10SBP1: 4,
          },
        },
      },
      variantQty: {
        OPR10SBP1: 0, // 10 REGULAR
        OPH10SBP1: 0, // 10 HEAVY
      },
      // TODO a better way to do this is to have clean as null
      // instead of having a dirty property
      modalQty: {
        OPR10SBP1: {
          qty: 0,
          dirty: false,
        },
        OPH10SBP1: {
          qty: 0,
          dirty: false,
        },
      },
      variantDetail: {
        OPR10SBP1: { regular: 10, heavy: 0 }, // 10 REGULAR
        OPH10SBP1: { regular: 0, heavy: 10 }, // 10 HEAVY
      },
      skuMap: {
        // TODO change skuMap to update from the live JSON
        // SKU MAP is mapping from SKU -> variant Id for adding to cart
        OPR10SBP1: "34520384569497", // 10 REGULAR
        OPH10SBP1: "34520384602265", // 10 HEAVY
      },
      product: {},
      loading: false,
      imageUrls: {},
      VARIANT_SKU: VARIANT_SKU,
    };
  },
  computed: {
    totalPrice() {
      if (!this.product.variants) return 0;
      const variantPrices = Object.keys(this.variantQty).map((sku) => {
        const skuPrice = this.product.variants.filter((x) => x.sku === sku)[0]
          .price;
        const skuQty = this.variantQty[sku];
        return skuPrice * skuQty;
      });
      const total = variantPrices.reduce(
        (accumulator, cur) => accumulator + cur
      );
      return total;
    },
    totalAssortmentQuantity() {
      let totalCount = 0;

      // TODO use reduce...
      Object.keys(this.variantQty).map((sku) => {
        totalCount += this.variantQty[sku];
      });

      return totalCount > 0 ? totalCount : false;
    },
    isEligibleForFreeShipping() {
      return this.totalAssortmentQuantity >= 3;
    },
    totalModalQty() {
      const totalRegular = this.modalQty[VARIANT_SKU.REGULAR].dirty
        ? this.modalQty[VARIANT_SKU.REGULAR].qty
        : this.variantQty[VARIANT_SKU.REGULAR];
      const totalHeavy = this.modalQty[VARIANT_SKU.HEAVY].dirty
        ? this.modalQty[VARIANT_SKU.HEAVY].qty
        : this.variantQty[VARIANT_SKU.HEAVY];

      return totalRegular + totalHeavy;
    },
    modalIsEligibleForFreeShipping() {
      return this.totalModalQty >= 3;
    },
  },
  methods: {
    updateVariantQty(flow) {
      // TODO clear radio when length button is pressed again
      this.recommendationChoice.flow = flow;
      this.variantQty = {
        ...this.recommendation[this.recommendationChoice.days][flow],
      };
    },
    resetVariantQty() {
      this.variantQty = {
        OPR10SBP1: 0, // 10 REGULAR
        OPH10SBP1: 0, // 10 HEAVY
      };
    },
    updateModalQtyRegular(qty) {
      this.modalQty[VARIANT_SKU.REGULAR] = { qty, dirty: true };
    },
    updateModalQtyHeavy(qty) {
      this.modalQty[VARIANT_SKU.HEAVY] = { qty, dirty: true };
    },
    async addToCart() {
      const cartItems = Object.keys(this.variantQty).map((variantId) => ({
        id: this.skuMap[variantId],
        quantity: this.variantQty[variantId],
        // TODO make this dependent on subscription checkbox
        properties: {
          "Subscription interval": "3 months",
          _subscription_order: "",
          "Cycle Days": this.recommendationChoice.days,
          "Cycle Flow": this.recommendationChoice.flow,
        },
      }));

      this.loading = true;
      await Axios.post("/cart/update.js", {
        updates: {
          "34520384569497": 0,
          "34520384602265": 0,
        },
      });
      await Axios.post("/cart/add.js", {
        items: cartItems,
      });

      this.loading = false;
      window.location.href = "/cart";
    },
    updateProducts() {
      const productJsonData = document.getElementById("ProductJsonData")
        .innerText;
      this.product = JSON.parse(productJsonData);
    },
    updateImageUrls() {
      const imageUrlsData = document.getElementById("image-urls").innerText;
      this.imageUrls = JSON.parse(imageUrlsData);
    },
    handleAssortmentForm(event) {
      const formContent = event.currentTarget;
      const newQty = {};
      Object.keys(this.variantQty).map((sku) => {
        newQty[sku] = parseInt(formContent[sku].value);
      });
      this.variantQty = { ...newQty };
      this.$bvModal.hide("modal1");
    },
    resetModalQty() {
      this.modalQty = {
        OPR10SBP1: {
          qty: 0,
          dirty: false,
        },
        OPH10SBP1: {
          qty: 0,
          dirty: false,
        },
      };
    },
  },
  mounted() {
    // this.VARIANT_SKU = Object.freeze(VARIANT_SKU);
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.updateProducts();
        this.updateImageUrls();
      }
    };
  },
});
</script>
<style lang="scss">
// TODO might have to switch out primary and secondary..
$primary: #f5ede4;
$secondary: #463a23;

$body-color: $secondary;

.circle {
  min-width: 24px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: black;
}

.regular-color {
  background: #96bbd8 !important;
}

.heavy-color {
  background: #5f81b2 !important;
}

.gtk-image {
  height: 4em;
}

.icon-image {
  height: 2em;
}

#modal1___BV_modal_footer_ {
  display: none;
}

#modal1___BV_modal_header_ {
  border-bottom: 0px solid red;
  padding: 1rem 1rem 0 1rem !important;
}

#modal1___BV_modal_content_ {
  background: #f9f7f3;
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
