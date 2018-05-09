<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>
    <div id="auctions">
      <table>
        <tr v-for="auction in auctions">
          <td>{{ auction.title }}</td>
          <td><!--- view link here --></td>
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
          auctions: []
        }
      },
      mounted: function () {
        this.getAuctions();
      },
      methods: {
        getAuctions: function () {
          this.$http.get('http://localhost:4941/api/v1/auctions')
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
