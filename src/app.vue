<template>
  <div>
    <table>
      <tr>
        <th width="15%">代码</th>
        <th width="15%">名称</th>
        <th width="15%">总股本</th>
        <th width="15%">每股收益</th>
        <th width="15%">每股净资</th>
        <th width="15%">市净率</th>
      </tr>
      <tr v-for="item in list | orderBy 'code'">
        <td v-text='item.code' v-link="{name:'Chat',params:{id:item.code}}"></td>
        <td v-text='item.name'></td>
        <td v-text='item.totals'></td>
        <td v-text='item.esp'></td>
        <td v-text='item.bvps'></td>
        <td v-text='item.pb'></td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
  td{
    border:1px solid #ccc;
    margin:2px;
    text-align:center;
    font-size:13px;
    color:#666;
    padding: 5px 0;
  }
</style>
<script>
  export default {
    ready(){
      for(;this.page<=13;this.page++){
        this.getList();
      }    
    },
    data(){
        return{
          page:1,
          list:[]
        }
    },
    methods:{
      getList(){
        this.$http.get('/api/stock/all/'+this.page).then((res)=>{
          this.list=this.list.concat(res.data.list);
        },()=>{})
      }
    }
  }
</script>