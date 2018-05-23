<template>
  <div>
    <h1>Create Auction</h1>
    <b-form @submit.prevent="createAuction">
      <select id="category">
        <option value="" selected disabled hidden>Pick a Category</option>
        <option v-for="category in categories" :value="category.categoryId">{{category.categoryTitle}}</option>
      </select>


      <b-form-input type="text"
                    v-model="auction.title"
                    required
                    placeholder="Enter Auction Name">
      </b-form-input>
      <b-form-input type="text"
                    v-model="auction.description"
                    required
                    placeholder="Enter Auction Description">
      </b-form-input>
      <b-form-file label="Image" v-model="file" :state="Boolean(file)" placeholder="Choose a photo..."></b-form-file>
      <div class="mt-3">Selected file: {{file && file.name}}</div>
      <br>
      <label>Start Date</label>
      <b-form-input type="datetime-local"
                    v-model="auction.startDate"
                    required>
      </b-form-input>
      <label>End Date</label>
      <b-form-input type="datetime-local"
                    v-model="auction.endDate"
                    required>
      </b-form-input>
      <label>Reserve Price</label>
      <b-form-input type="number"
                    v-model="auction.reservePrice"
                    required>
      </b-form-input>
      <label>Starting Bid</label>
      <b-form-input type="number"
                    v-model="auction.startingBid"
                    required>
      </b-form-input>
      <b-button type="submit" variant="primary">Create Auction</b-button>
    </b-form>
  </div>
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
          file:null,
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
        createAuction: function () {
          let requestBody = {
            "categoryId": parseInt(document.getElementById("category").value),
            "title": this.auction.title,
            "description": this.auction.description,
            "startDateTime": Date.parse(this.auction.startDate),
            "endDateTime": Date.parse(this.auction.endDate),
            "reservePrice": parseInt(this.auction.reservePrice),
            "startingBid": parseInt(this.auction.startingBid)
          };
          this.$http.post('http://localhost:4941/api/v1/auctions', JSON.stringify(requestBody), {headers: {'X-Authorization': localStorage.getItem('token')}})
            .then(function (response) {
              this.auctionId = response.data.id;
              this.addPhoto();
              this.$router.push('/auctions');
            }, function (error) {
              this.error = error;
              this.errorFlag = true;
            });
        },
        addPhoto: function () {
          let requestBody = this.file.type;
          let requestConfig = {
            emulateJSON: false,
            headers: {
              'Content-Type': this.file.type,
              'X-Authorization': localStorage.getItem("token")
            }
          };
          console.log("photo: " + JSON.stringify(this.file));
          this.$http.post(`http://localhost:4941/api/v1/auctions/${this.auctionId}/photos`, requestBody, requestConfig)
            .then(function (response) {
              alert('photo uploaded');
            }, function (error) {
              alert('photo upload failed');
              this.error = error;
              this.errorFlag = true;
            });
        },

      }
    }
</script>

<style>

</style>
