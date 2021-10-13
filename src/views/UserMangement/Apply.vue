<template>
  <div class="app-container">
      <p>施工中 ，敬请期待！！</p>
  <el-row class="notice"><img src="@/assets/under_construction.png" alt=""></el-row>
 

  </div>
</template>

<script>
export default {
    name:"apply"

}
</script>

<style scoped lang="scss">
.app-container{
    .notice{
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background: #fff;
    }
    img{
        position:absolute;
        width:500px;
        top: 10px;
    }
    p{ 
        margin-top:100px;
        font-size: 30px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        text-align: center;
        font-weight:1000;
        color:#293241;
        text-align: center;

    }
}


</style>