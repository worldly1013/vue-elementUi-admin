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
      scenicData: [{
          'url': 'http://dev.fenzhitech.com/res/218c5e4e3809e3f77d9c49e3cf581756.jpg',
          'name': '东方明珠',
          'intro':'东方明珠广播电视塔（The Oriental Pearl Radio & TV Tower）是上海的标志性文化景观之一，位于浦东新区陆家嘴，塔高约468米。',
          'price':999.00,
          'coordinate': [121.499809, 31.239666],
          'flag': false
        },
        {
          'url': 'http://dev.fenzhitech.com/res/9f51093effeb8be58a5327e6bcb65357.png',
          'name': '豫园',
          'intro':'豫园（Yu Garden）位于上海市老城厢的东北部，北靠福佑路，东临安仁街，西南与上海老城隍庙毗邻[1]  ，是江南古典园林，始建于明代嘉靖、万历年间，占地三十余亩。',
          'price':199.00,
          'coordinate': [121.491983, 31.227029],
          'flag': false
        },
        {
          'url': 'http://dev.fenzhitech.com/res/67a28bb99586b227cb177750fef4b58e.jpg',
          'name': '上海科技馆',
          'intro':'上海科技馆是上海市人民政府为贯彻落实科教兴国战略，提高城市综合竞争力和市民科学文化素养而投资兴建的具有中国特色、时代特征、上海特点的综合性的自然科学技术博物馆。',
          'price':222.00,
          'coordinate': [121.542492, 31.219134],
          'flag': false
        },
        {
          'url': 'http://dev.fenzhitech.com/res/41d00e38d1c8df3be22a83989a340ea7.jpg',
          'name': '金茂大厦',
          'intro':'金茂大厦（Jinmao Tower），又称金茂大楼，竣工于1999年，曾经是中国大陆最高的大楼，位于上海市浦东新区黄浦江畔的陆家嘴金融贸易区，楼高420.5米。',
          'price':188.00,
          'coordinate': [121.505823, 31.235315],
          'flag': false
        },
      ]
    }
  },
  components: {
    panelTitle
  },
  mounted() {
    this.showAddress(this.scenicData[0],0)
  },
  methods: {
    showInfoWindow(title,intro,price,coordinate) {
      var map = new AMap.Map('amap-container', {
        resizeEnable: true,
        zoom: 15,
        center: coordinate,
        pitch: 20,
        mapStyle: 'amap://styles/blue'
      });

      var marker = new AMap.Marker({
        map:map,
        position:coordinate
      })

      //构建自定义信息窗体
      function createInfoWindow(title,intro,price){
        var info =   '<div class="info-container">' +
            '<div class="top">' +
              '<p>' + title + '</p>' +
              '<img src="http://dev.fenzhitech.com/res/218c5e4e3809e3f77d9c49e3cf581756.jpg" alt="关闭图片">' +
            '</div>' +
            '<div class="middle">' +
              '<p class="intro">' + intro + '</p>' +
              '<p class="price">价格：<span>' + price + '</span>元</p>' +
            '</div>' +
            '<div class="arrow">' +
              '<img src="https://webapi.amap.com/images/sharp.png">' +
            '</div>' +
           '</div>'

        return info
      }
      //关闭信息窗体
      function closeInfoWindow() {
        map.clearInfoWindow();
      }
      //实例化信息窗体
      function showInfo(title,intro,price,coordinate){
        var infoWindow = new AMap.InfoWindow({
          isCustom: true, //使用自定义窗体
          content: createInfoWindow(title,intro,price),
          offset: new AMap.Pixel(10, -55)
        });
        infoWindow.open(map,coordinate);
      }

      return showInfo(title,intro,price,coordinate)
    },
    showAddress(item, index) {
      this.scenicData.forEach((el, i) => {
        if (i === index) {
          this.scenicData[i]['flag'] = true
        }
        if (i !== index) {
          this.scenicData[i]['flag'] = false
        }
      })
      // 展示信息窗口
      this.showInfoWindow(item.name,item.intro,item.price,item.coordinate)
    }
  }
}
</script>

<style lang="scss">
.scenic-container {
    float: left;
    width: 234px;
    height: 518px;
    overflow-y: scroll;
    padding: 0 10px;
    .scenic-item {
        width: 234px;
        margin-bottom: 10px;
        border: 1px solid #fff;
        box-sizing: border-box;
        img {
            display: block;
            width: 100%;
            height: 130px;
        }
        p {
            line-height: 20px;
            padding: 8px;
            text-align: center;
        }
    }
    .scenic-item.active {
        border: 1px solid #accaea;
        box-shadow: 0 0 6px rgba(172, 202, 234, 1);
    }

}
.info-container{
  width: 300px;
  background-color: #fff;
  box-sizing:border-box;
  border: 1px solid #accaea;
  box-shadow: 0 0 6px rgba(172, 202, 234, 1);
  .top{
    position: relative;
    height:30px;
    line-height: 30px;
    background-color:#72AAE3 ;
    padding: 0 10px;
    color:white;
    img{
      position: absolute;
      right:10px;
      top:50%;
      transform: translate(0,-50%);
      width: 20px;
      height: 20px;
    }
  }
  .middle{
    padding: 5px 10px;
    font-size: 12px;
    line-height: 22px;
    .intro{
      color:#999;
    }
    .price{
      color:#EE1C14;
    }
  }
  .arrow{
    width: 100%;
    height:0px;
    clear:both;
    text-align: center;
    img{
      position: relative;
      z-index: 100;
    }
  }
}

#amap-container {
    float: right;
    width: 700px;
    height: 518px;
    margin: 0 auto;
}
</style>
