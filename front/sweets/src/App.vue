<template>
  <div id="app">
    <table class="main-table">
      <td>
        <h2>Total Stock Value: £{{ stockTotal }}</h2>
        <ul class="list-sweets">
          <li class="sweet-li" v-bind:key="skuObj.skuID" v-for="skuObj in SKU">
            <skuComp class="sku-comp" :SKUobj="skuObj" @Refresh="getStock" />
          </li>
        </ul>
      </td>
      <td>
        <h2>NEW STOCK ITEM:</h2>
        <newSKU class="new-sku" @Refresh="getStock" />
      </td>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import newSKU from "./components/NewSKU.vue";
import skuComp from "./components/SKU.vue";

export default {
  name: "App",
  components: {
    skuComp,
    newSKU,
  },

  props: {
    test: { type: String, default: "TEST" },

    SKU: {
      type: Array,
      default: () => [
        {
          skuID: 1,
          skuName: "Trifle",
          skuOHQ: 7,
          skuPrice: 3.5,
          skuDesc: "Naught but a Trifle.",
        },
      ],
    },
  },

  data: function () {
    return {
      firstNum: "",
      secondNum: "",
      operator: null,
      answer: null,
    };
  },

  computed: {
    stockTotal() {
      return this.SKU.reduce(function (total, item) {
        return total + item.skuPrice * item.skuOHQ;
      }, 0);
    },
  },
  mounted() {
    console.log(this.SKU);

    axios
      .get("http://localhost:5000/stock")
      .then((response) => (this.SKU = response.data.data))
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  },

  methods: {
    getStock() {
      axios
        .get("http://localhost:5000/stock")
        .then((response) => (this.SKU = response.data.data))

        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.status);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log(error.message);
          }
        });
    },
  },
};
</script>

<style>
#app {
  display: flex;
  flex: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  justify-content: center;
  color: #2c3e50;
  width: 100%;
}

.list-sweets {
  list-style: none;
  justify-content: center;
}
.main-table {
  background-color: burlywood;
  justify-content: center;
}

.sku-comp {
  width: 15rem;
  border: 3px solid olive;
  justify-content: center;
}

.new-sku {
  width: 15rem;
  border: 3px solid olive;
  justify-content: center;
}
</style>
