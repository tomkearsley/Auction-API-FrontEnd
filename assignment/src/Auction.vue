<template>
<div>
  <div v-if="errorFlag" style="color: red;">
    {{ error }}
  </div>
  <div id="auction">
          {{auction.title}}
          {{auction.seller.username}}
          {{formatDate(auction.startDateTime)}}
          {{auction.description}}
          {{auction.currentBid}}
          <table style="width:100%">
            <tr>
              <th>Buyer Username</th>
              <th>Bid Amount</th>
              <th>Bid Time</th>
            </tr>
            <tr v-for="bid in auction.bids">
              <td>{{bid.buyerUsername}}</td>
              <td>{{bid.amount}}</td>
              <td>{{formatDate(bid.datetime)}}</td>
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
        auctionId: this.$route.params.auctionId,
        searchText: "",
        auction: []
      }
    },
    mounted: function () {
      this.getAuctions();

    },
    methods: {
      getAuctions: function () {
        this.$http.get(`http://localhost:4941/api/v1/auctions/${this.auctionId}`)
          .then(function (response) {
            this.auction = response.data;
          }, function (error) {
            this.error = error;
            this.errorFlag = true;
          });
      },
      formatDate: function(date){
        return Date(date)
      }
    }
  }
</script>

<style scoped>

</style>
