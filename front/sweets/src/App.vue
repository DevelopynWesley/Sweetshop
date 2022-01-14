<template>
  <div id="app">
    <table class="main-table">
      <ul class="list-sweets">
        <li class="sweet-li" v-bind:key="skuObj.skuID" v-for="skuObj in SKU">
          <skuComp class="sku-comp" :SKUobj="skuObj" @Refresh="getStock" />
        </li>
      </ul>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import skuComp from "./components/SKU.vue";
export default {
  name: "App",
  components: {
    skuComp,
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

    //   SKU2: {type: Array, default: () => [

    //     {
    //       type: Object,
    //       default: () => ({
    //         skuID: 1,
    //         skuName: "Trifle",
    //         skuOHQ: 7,
    //         skuPrice: 3.5,
    //         skuDesc: "Naught but a Trifle.",
    //       }),
    //     },
    //   ],
    // },
  },

  data: function () {
    return {
      firstNum: "",
      secondNum: "",
      operator: null,
      answer: null,
    };
  },
  mounted() {
    //   console.log(this.test);
    console.log(this.SKU);

    axios
      .get("http://localhost:5000/stock")
      .then(
        (response) =>
          // (this.info = Object.keys(response.data.results).map((name) => {
          //   return response.data.results[name];
          // })) //JSON.parse(response.data)
          (this.SKU = response.data)
      )

      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          this.lastError = error.response.status;
        } else if (error.request) {
          // The request was made but no response was received
          this.lastError = error.request;
        } else {
          // Something happened in setting up the request that triggered an Error
          this.lastError = error.message;
        }
      });
  },

  methods: {
    getStock() {

      axios
      .get("http://localhost:5000/stock")
      .then(
        (response) =>
          // (this.info = Object.keys(response.data.results).map((name) => {
          //   return response.data.results[name];
          // })) //JSON.parse(response.data)
          (this.SKU = response.data)
      )

      .catch(function (error) {
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
</style>
