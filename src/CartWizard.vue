<template>
  <div>
    <div class="mb-4">
      <a
        class="text-reset"
        style="text-decoration: underline;"
        v-if="!infoOpen"
        @click="infoOpen = true"
        >Learn more.</a
      >
      <div v-else>
        <p><strong>WHY IT IS SPECIAL</strong><br /></p>
        <ul>
          <li>
            Made with 100% organic cotton top sheet for maximum comfort and
            protection.
          </li>
          <li>
            Features thousands of natural micro pores to let your skin breathe.
          </li>
          <li>
            Perfume and deodorant free, making them suitable for sensitive skin.
          </li>
        </ul>
        <p><strong>GOOD TO KNOW</strong></p>
        <div class="">
          <div class="d-flex align-items-center mb-2">
            <img :src="imageUrls.organic_cotton" class="gtk-image mr-2" />
            <p class="mb-0">Certified organic by GOTS</p>
          </div>
          <div class="d-flex align-items-center mb-2">
            <img :src="imageUrls.chlorine_free" class="gtk-image mr-2" />
            <p class="mb-0">Chlorine-free processing</p>
          </div>
          <div class="d-flex align-items-center mb-2">
            <img :src="imageUrls.bioplastic" class="gtk-image mr-2" />
            <p class="mb-0">Biodegradable wrapper &amp; backing</p>
          </div>
          <div class="d-flex align-items-center mb-2">
            <img :src="imageUrls.recycled_boxes" class="gtk-image mr-2" />
            <p class="mb-0">Fully-recycled boxes</p>
          </div>
        </div>
        <br />
        <a
          class="text-reset"
          style="text-decoration: underline;"
          @click="infoOpen = false"
          >See less</a
        >
      </div>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <b>Pilih siklus menstruasi kamu</b>
        <div class="d-flex">
          <b-button
            variant="primary"
            class="text-uppercase mr-1 flex-grow-1"
            pill
            @click="
              recommendationChoice.days = '<4days';
              recommendationChoice.flow = null;
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
            "
            :pressed="recommendationChoice.days === '<5days'"
          >
            5 Days or more
          </b-button>
        </div>
      </div>
      <div class="mb-1">
        <b>Pilih tingkat flow kamu</b>
        <div class="d-flex">
          <b-button
            variant="primary"
            class="text-uppercase mr-1 flex-grow-1"
            pill
            @click="updateVariantQty('light')"
            :pressed="recommendationChoice.flow === 'light'"
            :disabled="!recommendationChoice.days"
          >
            Light
          </b-button>
          <b-button
            variant="primary"
            class="text-uppercase mr-1 flex-grow-1"
            pill
            @click="updateVariantQty('medium')"
            :pressed="recommendationChoice.flow === 'medium'"
            :disabled="!recommendationChoice.days"
          >
            Medium
          </b-button>
          <b-button
            variant="primary"
            class="text-uppercase mr-1 flex-grow-1"
            pill
            @click="updateVariantQty('heavy')"
            :pressed="recommendationChoice.flow === 'heavy'"
            :disabled="!recommendationChoice.days"
          >
            Heavy
          </b-button>
        </div>
      </div>
    </div>

    <b-modal id="modal1" ok-disabled cancel-disabled="">
      <p class="lead">PILIH JUMLAH SESUAI KEBUTUHAN KAMU</p>
      <form @submit.prevent="handleAssortmentForm">
        <table>
          <tr>
            <td><p value="OPR10SBP1">10 REGULAR</p></td>
            <td>
              <b-form-spinbutton
                id="Quantity-OPR10SBP1"
                name="OPR10SBP1"
                :value="variantQty.OPR10SBP1"
                min="0"
                max="100"
                data-quantity-input
              ></b-form-spinbutton>
            </td>
          </tr>
          <tr>
            <td><p value="OPH10SBP1">10 HEAVY</p></td>
            <td>
              <b-form-spinbutton
                id="Quantity-OPH10SBP1"
                name="OPH10SBP1"
                :value="variantQty.OPH10SBP1"
                min="0"
                max="100"
                data-quantity-input
              ></b-form-spinbutton>
            </td>
          </tr>
        </table>

        <p>
          Cheat sheet: <br />
          Regular pads = 24cm. Heavy pads = 29 cm.
        </p>
        <b-button type="submit" name="submit" block>Change</b-button>
      </form>

      <template v-slot:modal-footer>
        <div>&nbsp;</div>
      </template>
    </b-modal>

    <div v-if="assortmentCopy" class="mb-4">
      <div style="border: 2px solid black">
        <div class="d-flex align-items-center">
          <b-button class="invisible"> edit </b-button>
          <h4 class="text-uppercase text-center lead flex-grow-1 m-0">
            Your 3-month subscription:
          </h4>
          <b-button v-b-modal.modal1 variant="link">
            edit
          </b-button>
        </div>
        <!-- <h2>{{ assortmentCopy }}</h2> -->
        <div class="d-flex px-2 justify-content-around mb-2">
          <div
            v-if="variantQty[VARIANT_SKU.REGULAR] > 0"
            class="d-flex align-items-center"
          >
            <div class="circle mr-1"></div>
            <p>
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
            <div class="circle mr-1"></div>
            <p>
              <span class="h3">HEAVY</span> ({{
                variantQty[VARIANT_SKU.HEAVY] * 10
              }}
              counts)
            </p>
          </div>
        </div>
        <div class="d-flex">
          <div class="d-flex align-items-center">
            <div class="circle"></div>
            <p class="small text-uppercase">Free shipping nationwide</p>
          </div>
          <div class="d-flex align-items-center">
            <div class="circle"></div>
            <p class="small text-uppercase">Renewed every 3 months</p>
          </div>
          <div class="d-flex align-items-center">
            <div class="circle"></div>
            <p class="small text-uppercase">No unauthorized charges</p>
          </div>
          <div class="d-flex align-items-center">
            <div class="circle"></div>
            <p class="small text-uppercase">Adjust, skip, or cancel anytime</p>
          </div>
        </div>
      </div>

      <b-form-checkbox type="checkbox" v-model="notSubscribeCheckbox">
        I'd like to opt out from subscription
      </b-form-checkbox>
    </div>

    <b-button block @click="addToCart" :disabled="!assortmentCopy || loading">
      <b-spinner v-if="loading" small></b-spinner>

      PROCEED
      <span v-if="assortmentCopy"
        >- IDR {{ (totalPrice / 100) | numeral("0,0.00") }}
      </span>
    </b-button>
    <div
      id="sealsubscriptions-default-widget-target-element"
      style="display: none"
    ></div>
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
  components: { BButton, BModal, BSpinner, BFormCheckbox, BFormSpinbutton },
  data() {
    return {
      infoOpen: true,
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
      variantDetail: {
        OPR10SBP1: { regular: 10, heavy: 0 }, // 10 REGULAR
        OPH10SBP1: { regular: 0, heavy: 10 }, // 10 HEAVY
      },
      skuMap: {
        // TODO change skuMap to update from the live JSON
        // SKU MAP is mapping from SKU -> variant Id for adding to cart
        OPR10SBP1: "34520384569497", // 10 REGULAR
        OPH10SBP1: "34520384602265", // 8 HEAVY
      },
      product: {},
      loading: false,
      notSubscribeCheckbox: false,
      imageUrls: {},
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
    assortmentCopy() {
      const totalCount = { regular: 0, heavy: 0 };
      Object.keys(this.variantQty).map((sku) => {
        totalCount.regular +=
          this.variantDetail[sku].regular * this.variantQty[sku];
        totalCount.heavy +=
          this.variantDetail[sku].heavy * this.variantQty[sku];
      });

      const totalArray = [];

      totalCount.regular
        ? totalArray.push(`${totalCount.regular} regular`)
        : null;
      totalCount.heavy ? totalArray.push(`${totalCount.heavy} heavy`) : null;

      return totalArray.join(" + ");
    },
  },
  methods: {
    updateVariantQty(flow) {
      this.recommendationChoice.flow = flow;
      this.variantQty = {
        ...this.recommendation[this.recommendationChoice.days][flow],
      };
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
        newQty[sku] = formContent[sku].value;
      });
      this.variantQty = { ...newQty };
      this.$bvModal.hide("modal1");
    },
  },
  mounted() {
    this.VARIANT_SKU = Object.freeze(VARIANT_SKU);
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.updateProducts();
        this.updateImageUrls();
      }
    };
  },
});
</script>
<style>
.circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: black;
}
.gtk-image {
  height: 4em;
}
</style>
