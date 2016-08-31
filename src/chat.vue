<template>
  <p>{{content.code}}</p>
  <p>{{content.area}}</p>

</template>
<style scoped>
  .msg {
    width:30%;
    height:200px;
    color:#ccc;
  }
</style>
<script>
  export default {
    ready(){
    },
    data(){
        return{
          content:{}
        }
    },
    methods:{
    },
    route: {
          data ({ to: { params: { id }}}) {
              this.$set('id',id);
              this.$http.get('/api/stockInfo/'+id).then((res)=>{
                console.log(res)
                this.content=res.data[0];
              },()=>{})
          }
      }
  }
</script>