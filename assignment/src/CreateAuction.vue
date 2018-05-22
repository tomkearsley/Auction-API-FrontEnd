<template>
    <form @submit.prevent="createAuction">
      <select id="category">
        <option value="" selected disabled hidden>Pick a Category</option>
        <option v-for="category in categories" :value="category.categoryId">{{category.categoryTitle}}</option>
      </select>
      Title:<input type="text" v-model="auction.title">
      Description:<input type="text" v-model="auction.description">
      Start Time: <input type="datetime-local" v-model="auction.startDate">
      End Time: <input type="datetime-local" v-model="auction.endDate">
      Reserve Price: <input type="number" v-model="auction.reservePrice">
      Starting Bid:<input type="number" v-model="auction.startingBid">
      <button type="submit">Create Auction</button>
    </form>
</template>

<script>
    export default {
      data() {
        return {
          auction:{
            categoryId:1,
            title:"",
            startDate:-1,
            endDate:-1,
            description:"",
            startingBid:0,
            reservePrice:0

          },
          categories:[],
          error: "",
          errorFlag: false,
        }
      },
      mounted: function () {
        this.getCategories();
      },
      methods: {
        getCategories: function () {
          this.$http.get('http://localhost:4941/api/v1/categories')
            .then(function (response) {
              this.categories = response.data;
            }, function (error) {
              this.error = error;
              this.errorFlag = true;
            });
        },
        createAuction: function(){
          let requestBody = {
            "categoryId": parseInt(document.getElementById("category").value),
            "title": this.auction.title,
            "description": this.auction.description,
            "startDateTime": Date.parse(this.auction.startDate),
            "endDateTime": Date.parse(this.auction.endDate),
            "reservePrice": parseInt(this.auction.reservePrice),
            "startingBid": parseInt(this.auction.startingBid)
          };

          this.$http.post('http://localhost:4941/api/v1/auctions',JSON.stringify(requestBody),{headers:{'X-Authorization':localStorage.getItem('token')}})
            .then(function (response) {
              console.log(response.data);
            }, function (error) {
              this.error = error;
              this.errorFlag = true;
          });
        }
      }
    }
</script>

<style scoped>

</style>
