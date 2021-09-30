<template>
  <div class="dashboard-editor-container">
  <el-row :gutter="20" style="margin-top:20px"> 
  <el-col  :xs="24" :lg="8">
      <div class="user-profile">
        <el-card>
            <pan-thumb :image="avatar"  style="floatleft">
       <div class="role-text"> 权限:
        <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span></div>
      </pan-thumb>
      <div class="info-container">
        <span class="display_name">{{ name }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">普通用户</span>
      </div>
        </el-card>
    
    </div>
  </el-col>
  <!-- 名言警句 -->
    <el-col :lg="16" :xs="24">
      <el-card class="verse">
        <h2>你知道嘛？</h2>
        <p>{{this.verse.hitokoto}}</p>
        <span> ——{{this.verse.from}}</span>
      </el-card>
    </el-col>
  </el-row>
  <el-row class="books" :gutter="20">
    <el-row :gutter="10">
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
		<el-card>
      	<div class="grid-content bg-purple">
		  <div class="row">
          <div class="column">
	     <el-carousel indicator-position="outside">
	        <el-carousel-item>
	          <div class="img">
				  <img src="@/assets/images/pfdsj.jpg">
			  </div>
	          		<div class="content">
	          		  <span class="title">路遥:平凡的世界</span>
	          		  <span class="meta">aporia</span>
	          		  <p class="abstract">谁让你读了那么些书，又知道了双水村之外还有一个大世界……如果你从小就在这个天地里日出而作，日落而息，那你现在就会和众乡亲抱同一理想：
					  经过几年的辛劳，像大哥一样娶个满意的媳妇，生个胖儿子，加上你的体魄，会成为一名相当出色的庄稼人。不幸的是，你知道得太多了，思考得太多了，因此才有了这种
					  不能为周围人所理解的苦恼…… </p>
	          </div>
	        </el-carousel-item>
			<el-carousel-item>
			  <div class="img">
				  <img src="@/assets/images/xyr.jpg">
			  </div>
			  		<div class="content">
			  		  <span class="title">(日)东野圭吾:嫌疑人X的献身</span>
			  		  <span class="meta">蓝色啤酒海</span>
			  		  <p class="abstract">她的目光停驻在工藤送的盒子上。打开盒盖，戒指发出夺目的光芒。 已经到如此地步，或许该照石神的意思，只考虑母女俩的幸福。诚如他写的，这
					  时如果退缩，他的苦心将付诸流水。 隐瞒真相何其痛苦。就算抓住了幸福，也不会有幸福的真正感受。只会终生抱着自责，终生得不到片刻安宁。但此时靖子觉得，忍受这种
					  煎熬，也算一种赎罪。 她试着将戒指戴上无名指。钻石真美，若能心中毫无阴霾地投入工藤的怀抱，不知该多幸福。但那是一个无法实现的梦，因为自己心中永无放晴之日。
					  心如明镜不带丝毫阴霾的，世上只有石神。 </p>
			  </div>
			</el-carousel-item> 
			<el-carousel-item>
	          <div class="img">
				  <img src="@/assets/images/bcsj.jpg">
			  </div>
	          		<div class="content">
	          		  <span class="title">(法)雨果:悲惨世界</span>
	          		  <span class="meta">亚比煞</span>
	          		  <p class="abstract">人靠肯定为生比靠面包更甚。我们谴责充满陰谋的教会，蔑视政权的教权，但是我们处处尊崇那种思考问题的人。我们向跪着的人致敬。信仰，为人
					  所必须。什么也不信的人不会有幸福。 人并不因为潜心静思而成为无所事事的人。有有形的劳动和无形的劳动。 静观，这是劳动，思想，这是行动。交叉着的胳膊能工作，合
					  拢了的手掌能有所作为。注视苍穹也是一种业绩。静修者不是游手好闲的人，违世遁俗的人也不是懒汉。神游窈冥昏默之乡是一件严肃的事。对坟墓念念不忘，这对世人是适
					  当的。生不忘死，那是先哲的法则，也是苦修僧的法则。</p>
	          </div>
	        </el-carousel-item>
			<el-carousel-item>
			  <div class="img">
				  <img src="@/assets/images/lryh.jpg">
			  </div>
			  		<div class="content">
			  		  <span class="title">(美)欧内斯特·海明威:老人与海</span>
			  		  <span class="meta">Notos</span>
			  		  <p class="abstract">他总是把海视为la mar，这是人们喜爱大海时用西班牙语对她的称呼。有时候喜爱大海的人也说她的坏话，不过说起来总是把她当作女性。有些年轻的渔
					  夫用浮标当钓绳的浮子，并把鲨鱼肝卖了好多钱置备了汽艇，都把大海称作男性的le mar。他们把大海说成是竞争对手，或者是一个去处，甚至是一个敌人。不过老人总是把大海
					  当作女性，当作赐予或不赐予大恩的主，她要是做出什么粗暴或可恶的事，那是因为她情不自禁。月亮撩动大海，就像撩动女人一样，他想。</p>
			  </div>
			</el-carousel-item>
	
	      </el-carousel>  
</div>
</div>
</div>
    </el-card >
	  <el-card style="margin-top:30px" @click.native="pathToBooks">
          <div class="card1">
      <div class="img1">
      	   <div><img src="@/assets/images/xmr.jpg">
		   <div class="desc"><span>作者:(法)雨果</span><br>书名:笑面人</div></div>
		   <div><img src="@/assets/images/atsth.jpg">
		   <div class="desc"><span>作者:(丹麦)汉·克·安徒生</span><br>书名:安徒生童话</div></div>
		   <div><img src="@/assets/images/byx.jpg">
		   <div class="desc"><span>作者:(日)东野圭吾</span><br>书名:白夜行</div></div>
		   <div><img src="@/assets/images/jrgw.jpg">
		   <div class="desc"><span>作者:(美)海伦·凯勒</span><br>书名:假如给我三天光明</div></div>
		   <div><img src="@/assets/images/mfdl.jpg">
		   <div class="desc"><span>作者:(美)阿瑟·布洛赫</span><br>书名:墨菲定律</div></div>
		   <div><img src="@/assets/images/ld.jpg">
		   <div class="desc"><span>作者:王宇</span><br>书名:狼道</div></div>
		   <div><img src="@/assets/images/lwm.jpg">
		   <div class="desc"><span>作者:沈石溪</span><br>书名:狼王梦</div></div>
		   <div><img src="@/assets/images/fs.jpg">
		   <div class="desc"><span>作者:(日)东野圭吾</span><br>书名:分身</div></div>
		   <div><img src="@/assets/images/hpdsw.jpg">
		   <div class="desc">作者:沈石溪<br>书名:红飘带狮王</div></div>
		   <div><img src="@/assets/images/rxdrd.jpg">
		   <div class="desc"><span>作者:(美)戴尔·卡耐基</span><br>书名:人性的弱点</div></div>
		   <div><img src="@/assets/images/fnj.jpg">
		   <div class="desc"><span>作者:(印)泰戈尔</span><br>书名:飞鸟集</div></div>
		   <div><img src="@/assets/images/fyz.jpg">
		   <div class="desc"><span>作者:(德)卜劳恩</span><br>书名:父与子</div></div>
		   <div><img src="@/assets/images/szbf.jpg">
		   <div class="desc"><span>作者:孙武</span><br>书名:孙子兵法</div></div>
		   <div><img src="@/assets/images/hyh.jpg">
		   <div class="desc"><span>作者:(法)司汤达</span><br>书名:红与黑</div></div>
		   <div><img src="@/assets/images/ja.jpg">
		   <div class="desc"><span>作者:(英)夏洛蒂·勃朗特</span><br>书名:简爱</div></div>
		   <div><img src="@/assets/images/zzyhp.jpg">
		   <div class="desc"><span>作者:(俄)列夫·托尔斯泰</span><br>书名:战争与和平</div></div>
		   <div><img src="@/assets/images/krrj.jpg">
		   <div class="desc"><span>作者:鲁迅</span><br>书名:狂人日记</div></div>
		   <div><img src="@/assets/images/zhxs.jpg">
		   <div class="desc"><span>作者:鲁迅</span><br>书名:朝花夕拾</div></div>
		   <div><img src="@/assets/images/tjhd.jpg">
		   <div class="desc"><span>作者:(西班牙)塞万提斯</span><br>书名:堂吉诃德</div></div>
		   <div><img src="@/assets/images/fxcs.jpg">
		   <div class="desc"><span>作者:冰心</span><br>书名:繁星春水</div></div>
		   <div><img src="@/assets/images/bngd.jpg">
		   <div class="desc"><span>作者:(哥)加西亚·马尔克斯</span><br>书名:百年孤独</div></div>
	
		</div>
    </div>
    </el-card>

</el-col>
  
<!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8"><div class="grid-content bg-purple">
    
  <div class="row">
  <div class="rightcolumn">
    <div class="card2">
      <h2>关于我</h2>
      <div class="fakeimg" style="height:100px;">图片</div>
      <p>关于我的一些信息..</p>
    </div>
    <div class="card3">
      <h3>热门文章</h3>
      <div class="fakeimg"><p>图片</p></div>
      <div class="fakeimg"><p>图片</p></div>
      <div class="fakeimg"><p>图片</p></div>
    </div>

    </div>
  </div>

</div></el-col> -->
</el-row>


  </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
export default {
  name: 'DashboardEditor',
  components: { PanThumb },
  data() {
    return {
       verse:{
        hitokoto:'',
        from:'',
      },
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  mounted(){
    this.getVerse()

  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  methods:{
     pathToBooks(){
       console.log("dawdw");
         this.$router.push({
           name:"books"
         })
     },
     getVerse(){
     fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      this.verse.hitokoto = data.hitokoto;
      this.verse.from = data.from;
    })
    .catch(console.error)
    }
  }
}
</script>

<style lang="scss" scoped>
.desc {
    padding-top: 0;
	padding-left: 0;
	padding-bottom: 0;
	font-size: 5px;
  font-size: 12px;
  span{
    color:#3377aa;
    font-size: 16px;
  }
}
.img1 {
    margin: 30px ;
	float: left;
	width: 100%;
}
.img1 div{
	
	width: 180px;
	border: 1px solid #fff;
	display: block;
	color: black;
    float: left;
	margin-right: 50px;
	margin-top: 20px;
}
.img1 img {
	width:178px;
	height: 250px;
}
/* 	 .el-col {
	    border-radius: 4px;
	  } */
/* 	  .bg-purple-dark {
	    background: #99a9bf;
	  } */
.bg-purple {
  border: 1px solid #aaa;
	background: #fff;
}
/* 	  .bg-purple-light {
	    background: #e5e9f2;
	  } */
.grid-content {
	   min-height: 250px;
}

* {
  box-sizing: border-box;
}
 
/* body {
  font-family: Arial;
  padding: 10px;
  background: #f1f1f1;
} */
/* 左侧栏 */
/* .column {   
  float: left;
} */
 
/* 右侧栏 */
/* .rightcolumn {
  background-color: #f1f1f1;

} */
/* 文章卡片效果 */
.card1 {
  overflow: hidden;
  width: 100%;
  background-color: white;
  padding: 20px;
}
/* .card2 {
  width: 100%;
  background-color: white;
  padding: 20px;
  
}
.card3 {
  width: 100%;
  background-color: white;
  padding: 20px;
  margin-top: 20px;
} */

 
/* 列后面清除浮动 */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* 走马灯样式 */
.title {
    line-height: 1.38;
    font-size: 30px;
    color: #37a;
}
.meta {
    display: block;
    color: #aaa;
    font-size: 15px;
    line-height: 1;
    margin-top: 8px;
}
.abstract {
	font-size: 20px;
	color: #000000;
}
.content {
     margin: 20px;
 }
	 
.column .img img{
	 float:right;
	 width: 150px;
     margin-top: 50px;
	 margin-left: 30px;
	 margin-right: 30px;
 }
  .emptyGif {
    display: block;
    width: 100%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #fff;
    min-height: 100vh;
    padding: 10px 20px 0px;
    .role-text{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .user-profile{
      position: relative;
    }
    .verse{
      text-align: center;
      height: 194px;
      padding: 20px;
      p{
        font-size: 18px;
        color:sliver;
      }
      span{
        border: 8px solid #eee;
        height: 80px;
        width: 200%;
        color: #212121;
        background:#eee;

      }
      .el-col-xs-24{
        margin-top: 20px;
      }
    }
    .pan-info-roles {
      font-size: 18px;
      text-align: center;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: absolute;
      top: 0px;
      left: 10px;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
    .books {
      margin-top: 50px;
    }
  }
</style>
