<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>
    <div id="auction-search">
      <input v-model="searchText" placeholder="Search Auction Name">
      <select>
        <option v-for="category in categories">{{category.categoryTitle}}</option>
      </select>
      <button v-on:click="getAuctions()">Search</button>
    </div>
      <div id="auctions">
        <table>
          <tr v-for="auction in auctions">
            <div v-if= "Date.now() < auction.endDateTime">
            <td>{{ auction.title }}</td>
              <!--<img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos' "-->
              <!--onerror="this.src='https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png'"> -->
            <td><router-link :to="{name: 'auction', params: {auctionId: auction.id}}">View</router-link></td>
            </div>
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          error: "",
          errorFlag: false,
          auctions: [],
          categories:[],
          searchText: "",
          auctionId:"",
        }
      },
      mounted: function () {
        this.getAuctions();
        this.getCategories();

      },
      methods: {
        getAuctions: function () {

          this.$http.get('http://localhost:4941/api/v1/auctions',{params: {q:this.searchText}})

            .then(function (response) {
              this.auctions = response.data;
            }, function (error) {
              this.error = error;
              this.errorFlag = true;
            });
        },
        getCategories: function () {
          this.$http.get('http://localhost:4941/api/v1/categories')
            .then(function (response) {
              this.categories = response.data;
            }, function (error) {
              this.error = error;
              this.errorFlag = true;
            });
        },
        getPhoto: function(){
          this.$http.get('http://localhost:4941/api/v1/')
        }
      }
    }
</script>

<style scoped>

</style>
