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
                                v-model="auction.title"
                                placeholder="Enter New Auction Name">
                  </b-form-input>
                  <b-form-input type="text"
                                v-model="auction.description"
                                placeholder="Enter New Auction Description">
                  </b-form-input>
                  <b-form-file label="Image" v-model="file" :state="Boolean(file)" placeholder="Choose a photo..."></b-form-file>
                  <div class="mt-3">Selected file: {{file && file.name}}</div>
                  <b-form-input type="datetime-local"
                                v-model="auction.startDateTime">
                  </b-form-input>
                  <b-form-input type="datetime-local"
                                v-model="auction.endDateTime">
                  </b-form-input>
                  <b-form-input type="number"
                                v-model="auction.reservePrice">
                  </b-form-input>
                  <b-form-input type="number"
                                v-model="auction.startingBid">
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
        auction_patch:[],
        file:null
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
          "categoryId": this.auction.categoryId,
          "title": this.auction.title,
          "description": this.auction.description,
          "startDateTime": Date.parse(this.auction.startDateTime),
          "endDateTime": Date.parse(this.auction.endDateTime),
          "reservePrice": parseInt(this.auction.reservePrice),
          "startingBid": parseInt(this.auction.startingBid)
        };
        this.$http.patch(`http://localhost:4941/api/v1/auctions/${this.auctionId}`,JSON.stringify(requestBody),{headers:{'X-Authorization':localStorage.getItem('token')}})
          .then(function (response) {
            this.addPhoto();
            location.reload();

          }, function (error) {
            this.error = error;
            this.errorFlag = true;
          });
      },
      addPhoto: function () {
        if(this.file === null){
          return;
        }
        let requestBody = this.file.type;
        let requestConfig = {
          emulateJSON: false,
          headers: {
            'Content-Type': this.file.type,
            'X-Authorization': localStorage.getItem("token")
          }
        };
        this.$http.post(`http://localhost:4941/api/v1/auctions/${this.auctionId}/photos`, requestBody, requestConfig)
          .then(function (response) {
            alert('photo uploaded');
          }, function (error) {
            alert('photo upload failed');
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
