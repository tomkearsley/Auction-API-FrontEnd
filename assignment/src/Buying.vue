<template>
  <div id="activeAuctions">
    <table>
      <h2>Active Auctions</h2>
      <tr v-for="auction in auctions">
        <td>{{ auction.title }}</td>
        <img v-bind:src="'http://localhost:4941/api/v1/auctions/' + auction.id + '/photos' "
             style="height:100%; width:50%;margin: auto" alt="no project image">
        <!--onerror="this.src='https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png'"> -->
        <td><router-link :to="{name: 'auction', params: {auctionId: auction.id}}">View</router-link></td>
      </tr>
    </table>
  </div>

</template>

<script>
    export default {
        data(){
          return{
            error:"",
            errorFlag:false,
            auctions:[],
            userId: this.$route.params.userId
          }
        },
        mounted: function () {
          this.getBuyingAuctions();

        },
        methods:{
          getBuyingAuctions: function () {
            let params = {
              bidder: this.userId
            };
            this.$http.get('http://localhost:4941/api/v1/auctions',{params})

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
