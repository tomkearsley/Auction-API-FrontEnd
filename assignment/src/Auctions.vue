<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>
    <div id="auction-search">
      <input v-model="searchText" placeholder="Search Auction Name">
      <select v-model="auctionId">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button v-on:click="getAuctions()">Search</button>
    </div>
      <div id="auctions">
        <table>
          <tr v-for="auction in auctions">
            <div v-if= "Date.now() < auction.endDateTime">
            <td>{{ auction.title }}</td>
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
          searchText: "",
          auctionId:""
        }
      },
      mounted: function () {
        this.getAuctions();

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
        }
      }
    }
</script>

<style scoped>

</style>
