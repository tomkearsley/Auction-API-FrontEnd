<template>
<div>
  <div v-if="errorFlag" style="color: red;">
    {{ error }}
  </div>
  <div id="auction">
          Title: {{auction.title}} <br>
          Seller: {{auction.seller.username}}  <br>
          Starting Time: {{formatDate(auction.startDateTime)}} <br>
          Description: {{auction.description}} <br>
          Current Bid: {{auction.currentBid}}
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
          <form @submit.prevent="placeBid">
            Bid<input v-model="bidAmount" type="number">
            <input type="submit" value="Place Bid">
          </form>

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
        auction: [],
        bidAmount:""
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
      },
      placeBid: function(){
        if (! localStorage.getItem('token')) {
          this.error = "not logged in!";
          this.errorFlag=true;
        }
        console.log(localStorage.getItem('token'));
          this.$http.post(`http://localhost:4941/api/v1/auctions/${this.auctionId}/bids`, {params: {q:this.bidAmount},headers: {'X-Authorization': localStorage.getItem('token')}})
            .then(function (response) {
          },function(error){
            this.error = error.bodyText;
            this.errorFlag = true;
          });

      }
    }
  }
</script>

<style scoped>

</style>
