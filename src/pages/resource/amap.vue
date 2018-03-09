<template lang="html">
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <div class="ofh">
        <div class="scenic-container">
          <div class="scenic-item outer_shadow" :class="{active:item.flag}" @click="showAddress(item,index)" v-for="(item, index) in scenicData">
            <img :src="item.url"  alt="旅游景点图">
            <p>{{item.name}}</p>
          </div>
        </div>
        <div id="amap-container" tabindex="0"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  panelTitle
} from 'components'

export default {
  data() {
    return {
      scenicData:[
        {
          'url':'http://dev.fenzhitech.com/res/218c5e4e3809e3f77d9c49e3cf581756.jpg',
          'name':'东方明珠',
          'coordinate':[121.499809, 31.239666],
          'flag':false
        },
        {
          'url':'http://dev.fenzhitech.com/res/9f51093effeb8be58a5327e6bcb65357.png',
          'name':'豫园',
          'coordinate':[121.491983, 31.227029],
          'flag':false
        },
        {
          'url':'http://dev.fenzhitech.com/res/67a28bb99586b227cb177750fef4b58e.jpg',
          'name':'上海科技馆',
          'coordinate':[121.542492, 31.219134],
          'flag':false
        },
        {
          'url':'http://dev.fenzhitech.com/res/41d00e38d1c8df3be22a83989a340ea7.jpg',
          'name':'金茂大厦',
          'coordinate':[121.505823, 31.235315],
          'flag':false
        },
      ]
    }
  },
  components: {
    panelTitle
  },
  mounted() {
    this.initAMap()
  },
  methods: {
    initAMap() {
      var map = new AMap.Map('amap-container', {
        // 是否能调整地图缩放比例
        resizeEnable: true,
        // 地图比例
        zoom: 13,
        // 定位中心点
        center: [121.480983, 31.2258],
        // 视图模式
        // viewMode: '3D',
        // 3D视图角度
        pitch: 20,
        // 地图样式
        mapStyle: 'amap://styles/blue'
      });

      var lnglats = [
        [121.491983, 31.227029],    // 豫园
        [121.499809, 31.239666],    // 东方明珠
        [121.542492, 31.219134],    // 上海科技馆
        [121.505823, 31.235315]     // 金茂大厦
      ];

      //实例化信息窗体
var title='方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>',
    content=[];
content.push("电话：010 64733333");
content.push("<a target='_blank'>详细信息</a>");
var infoWindow = new AMap.InfoWindow({
    isCustom: true,  //使用自定义窗体
    content: createInfoWindow(title,content.join("<br>")),
    offset: new AMap.Pixel(16, -50)//-113, -140
});
infoWindow.open(map, [121.491983, 31.227029]);

//构建自定义信息窗体
function createInfoWindow(title, content) {
    var info = document.createElement("div");
    info.className = "info";

    //可以通过下面的方式修改自定义窗体的宽高
    //info.style.width = "400px";
    // 定义顶部标题
    var top = document.createElement("div");
    var titleD = document.createElement("div");
    var closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;
    closeX.src = "https://webapi.amap.com/images/close2.gif";
    closeX.onclick = closeInfoWindow;

    top.appendChild(titleD);
    top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    // 定义底部内容
    var bottom = document.createElement("div");
    bottom.className = "info-bottom";
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    var sharp = document.createElement("img");
    sharp.src = "https://webapi.amap.com/images/sharp.png";
    bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
}

//关闭信息窗体
function closeInfoWindow() {
    map.clearInfoWindow();
}

      //
      // var infoWindow = new AMap.InfoWindow({
      //   offset: new AMap.Pixel(0, -30)
      // });

    },
    showAddress(item,index){
      this.scenicData.forEach((el,i) => {
        if(i === index){ this.scenicData[i]['flag'] = true}
        if(i !== index){ this.scenicData[i]['flag'] = false}
      })
    }
  }
}
</script>

<style lang="scss">
  .scenic-container{
    float: left;
    width:234px;
    height: 518px;
    overflow-y: scroll;
    padding: 0 10px;
    .scenic-item{
      width: 234px;
      margin-bottom: 10px;
      border: 1px solid #fff;
      box-sizing: border-box;
      img{
        display: block;
        width:100%;
        height:130px;
      }
      p{
        line-height: 20px;
        padding: 8px;
        text-align: center;
      }
    }
    .scenic-item.active{
      border: 1px solid #accaea;
      box-shadow: 0 0 6px rgba(172, 202, 234, 1);
    }

  }
  #amap-container{
    float: right;
    width:700px;
    height: 518px;
    margin: 0 auto;
  }
</style>
