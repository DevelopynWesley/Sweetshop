<template>
  <div>
    <table class="main-table">
      <tr>
        <h1>{{ SKUobj.skuName }}</h1>
        <h2>{{ SKUobj.skuDesc }}</h2>
        <h3>Price: £{{ SKUobj.skuPrice }}</h3>
        <h3>In Stock: {{ SKUobj.skuOHQ }}</h3>
      </tr>
      <tr>
        <button @click="reduceStock">-</button>
        {{
          SKUobj.skuOHQ
        }}
        <button @click="incStock">+</button>
      </tr>
      <tr>
        <button @click="delStock">Delete</button>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SkuVue",
  props: { SKUobj: { type: Object }, propCheck: String },
  methods: {
    logSku() {
      console.log(this.SKUobj);
    },

    refreshStock() {
      this.$emit("Refresh");
    },
    reduceStock() {
      axios
        .put(
          "http://localhost:5000/stock/update/" +
            this.SKUobj.skuID +
            "/minus/1",
          { skuID: this.SKUobj.skuID, amount: 1, oper: "minus" }
        )

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

      this.refreshStock();
    },

    incStock() {
      axios
        .put("http://localhost:5000/stock/update/", {
          skuID: this.SKUobj.skuID,
          amount: 1,
          oper: "add",
        })

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

      this.refreshStock();
    },

    delStock() {
      axios
        .delete("http://localhost:5000/stock/delete/", {
          skuID: this.SKUobj.skuID,
          amount: 1,
          oper: "add",
        })

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

      this.refreshStock();
    },
    // incStock() {
    //   axios
    //     .put(
    //       "http://localhost:5000/stock/update/" + this.SKUobj.skuID + "/add/1"
    //     )

    //     .catch( (error) => {
    //       if (error.response) {
    //         // Request made and server responded
    //         console.log(error.response.status);
    //       } else if (error.request) {
    //         // The request was made but no response was received
    //         console.log(error.request);
    //       } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log(error.message);
    //       }
    //     });

    //   this.refreshStock();
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-table {
  text-align: center;
  background-color: aqua;
  min-width: 100%;
}
</style>
