<template>
<div style="padding-left: 10px">
  <div v-if="errorFlag" style="color: red;">
    {{ error }}
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
          <div v-if="isOwner">
            <hr>
            <b-btn v-b-toggle.collapse1 variant="primary">Edit Auction</b-btn>
            <b-collapse id="collapse1" class="mt-2">
              <b-card>
                <b-form @submit.prevent="editAuction">
                  <select id="category">
                    <option value="" selected disabled hidden>Pick a Category</option>
                    <option v-for="category in categories" :value="category.categoryId">{{category.categoryTitle}}</option>
                  </select>

                  <b-form-input type="text"
                                v-model="auction_patch.title"
                                placeholder="Enter New Auction Name">
                  </b-form-input>
                  <b-form-input type="text"
                                v-model="auction_patch.description"
                                placeholder="Enter New Auction Description">
                  </b-form-input>
                  <b-form-input type="datetime-local"
                                v-model="auction_patch.startDate">
                  </b-form-input>
                  <b-form-input type="datetime-local"
                                v-model="auction_patch.endDate">
                  </b-form-input>
                  <b-form-input type="number"
                                v-model="auction_patch.reservePrice">
                  </b-form-input>
                  <b-form-input type="number"
                                v-model="auction_patch.startingBid">
                  </b-form-input>
                  <b-button type="submit" variant="primary">Edit </b-button>
                </b-form>
              </b-card>
            </b-collapse>
          </div>
          <hr>
          <h2>Bid History</h2>
          <table style="width:100%;margin-bottom: 20px;">
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
        bidAmount:"",
        auction_patch:[]
      }
    },
    mounted: function () {
      this.getAuctions();
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
      getAuctions: function () {
        this.$http.get(`http://localhost:4941/api/v1/auctions/${this.auctionId}`)
          .then(function (response) {
            this.auction = response.data;
            if(parseInt(localStorage.getItem("user_id")) === parseInt(this.auction.seller.id) && JSON.stringify(this.auction.bids) === JSON.stringify([])){
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

      },
      editAuction: function(){
        let requestBody = {
          "categoryId": parseInt(document.getElementById("category").value),
          "title": this.auction_patch.title,
          "description": this.auction_patch.description,
          "startDateTime": Date.parse(this.auction_patch.startDate),
          "endDateTime": Date.parse(this.auction_patch.endDate),
          "reservePrice": parseInt(this.auction_patch.reservePrice),
          "startingBid": parseInt(this.auction_patch.startingBid)
        };
        this.$http.patch(`http://localhost:4941/api/v1/auctions/${this.auctionId}`,JSON.stringify(requestBody),{headers:{'X-Authorization':localStorage.getItem('token')}})
          .then(function (response) {
            location.reload();

          }, function (error) {
            this.error = error;
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
