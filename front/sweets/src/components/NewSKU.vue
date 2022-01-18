<template>
  <div>
    <table class="main-table">
      <tr>
        <p>Name</p>
        <input type="text" id="latInput" v-model="newName" />
        <p>Description:</p>
        <input type="text" v-model="newDesc" />
        <p>Stock Qty</p>
        <input type="number" v-model="initialStock" />
        <p>Price</p>
        <input type="number" v-model="initialPrice" />

        <br />

        <button @click="addStockItem">Add To Stock</button>
      </tr>
      <tr></tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SkuVue",
  props: { SKUobj: { type: Object }, propCheck: String },
  methods: {
    addStockItem() {
      axios
        .post("http://localhost:5000/stock/add/", {
          name: this.newName,
          desc: this.newDesc,
          ohq: this.initialStock,
          price: this.initialPrice,
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

    refreshStock() {
      this.$emit("Refresh");
    },
  },

  data: function () {
    return {
      newName: "",
      newDesc: "",
      initialStock: 0,
      initialPrice: 0,
    };
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
