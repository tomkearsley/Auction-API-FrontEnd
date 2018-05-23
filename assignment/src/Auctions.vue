<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>
    <div id="auction-search">
      <input v-model="searchText" placeholder="Search Auction Name">
      <select id="category-list">
        <option value="" selected disabled hidden>Pick a Category</option>
        <option v-for="category in categories" :value="category.categoryId">{{category.categoryTitle}}</option>
      </select>
      <select id="auction-status">
        <option value="" selected disabled hidden>Auction Status</option>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="expired">Expired</option>
        <option value="won">Won</option>
        <option value="upcoming">Upcoming</option>
      </select>
      <button v-on:click="getAuctions()">Search</button>
    </div>
      <div id="auctions" style="margin-bottom: 50px">
        <table>
          <tr v-for="auction in auctions">
            <td style="font-size: medium">{{ auction.title }}</td>
              <img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos' "
                   style="height:100%; width:50%;margin: auto" alt="no project image">
              <!--onerror="this.src='https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png'"> -->
            <td style="font-size: medium"><router-link :to="{name: 'auction', params: {auctionId: auction.id}}">View</router-link></td>
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
          let category = document.getElementById("category-list").value;
          let status = document.getElementById("auction-status").value;
          let params = {
            q: this.searchText
          };
          params['category-id'] = category;
          params['status'] = status;
          this.$http.get('http://localhost:4941/api/v1/auctions',{params})

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
        }
      }
    }
</script>

<style scoped>

</style>
