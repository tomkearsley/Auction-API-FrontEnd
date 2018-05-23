<template>
<div style="padding-left: 10px">
  <div v-if="errorFlag" style="color: red;">
    {{ error }}
  </div>
  <div v-if="isOwner">
  </div>
  <div id="image" align="left">
      <h1>{{auction.title}} </h1>
      <img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auctionId + '/photos' ">

  </div>
  <div id="auction" align="left">
          <h2>
            Current Bid: {{auction.currentBid}} <br>
            Starting Time: {{formatDate(auction.startDateTime)}} <br>
            Ending Time: {{formatDate(auction.endDateTime)}}<br>
          </h2>
          <hr>
          <form @submit.prevent="placeBid">
            Bid <input v-model="bidAmount" type="number">
            <b-button variant="primary" type="submit">Submit</b-button>
          </form>
          <h3>{{auction.description}} <br></h3>
          <h4>Seller: {{auction.seller.username}}  <br></h4>
          <hr>
          <h2>Bid History</h2>
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
        isOwner:false,
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
            if(parseInt(localStorage.getItem("user_id")) === parseInt(this.auction.seller.id)){
              this.isOwner = true;
            }
          }, function (error) {
            this.error = error;
            this.errorFlag = true;
          });
      },
      formatDate: function(date){
        let result = new Date(date);

        return result.toUTCString();
      },
      placeBid: function(){
        if (! localStorage.getItem('token')) {
          this.error = "not logged in!";
          this.errorFlag=true;
        }
        let request = {
          params:{
            amount:this.bidAmount
          },
          headers: {
            'X-Authorization': localStorage.getItem('token')
          }
        };
          this.$http.post(`http://localhost:4941/api/v1/auctions/${this.auctionId}/bids`, {},request)
            .then(function (response) {
              location.reload();
          },function(error){
            this.error = error.bodyText;
            this.errorFlag = true;
          });

      }
    }
  }
</script>

<style scoped>
  table, th, td {
    border: 1px solid black;
  }
</style>
