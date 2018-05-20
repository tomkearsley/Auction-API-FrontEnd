<template>
    <form @submit.prevent="createAuction">
      <select>
        <option value="" selected disabled hidden>Pick a Category</option>
        <option v-for="category in categories" :value="category.categoryId">{{category.categoryTitle}}</option>
      </select>
      Title:<input type="text" v-model="auction.title">
      Description:<input type="text" v-model="auction.description">
      Start Time: <input type="date" v-model="auction.startDateTime">
      End Time: <input type="date" v-model="auction.endDateTime">
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
            categoryId:2,
            title:"",
            description:"",
            startDateTime:"",
            endDateTime:"",
            reservePrice:"",
            startingBid:""

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
          this.$http.post('http://localhost:4941/api/v1/auctions',this.auction,{headers:{'X-Authorization':localStorage.getItem('token')}})
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
