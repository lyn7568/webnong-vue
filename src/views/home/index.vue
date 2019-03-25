<template>
  <div>
    <div class="article-left">
      <div class="n-datas">
        <div class="n-datamodel">
          <ul>
            <li>
              <div class="n-dataimg img4"></div>
              <div class="n-datanum">触发警报<span>0</span></div>
            </li>
            <li>
              <div class="n-dataimg img1"></div>
              <div class="n-datanum">控制设备<span>156</span></div>
            </li>
            <li>
              <div class="n-dataimg img2"></div>
              <div class="n-datanum">传感器数<span>92</span></div>
            </li>
            <li>
              <div class="n-dataimg img3"></div>
              <div class="n-datanum">在线数量<span>223</span></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="swiper-carousel">
      <el-carousel indicator-position="outside">
        <el-carousel-item>
          <img src="/static/img/home_bg.jpg" width="100%" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <div class="map-con" ref="mapContainer">{{weatherInfo}}</div>
        </el-carousel-item>
        <el-carousel-item>
          <img src="/static/img/logo_bg.jpg" width="100%" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="operate-right">
      <div class="n_icon">
        <div class="n-i" @click="showEyes">
          <svg-icon icon-class="eye" v-show="!flag" />
          <svg-icon icon-class="eye-open" v-show="flag" />
        </div>
        <div class="n-i">
          <el-popover ref="popover" placement="left-start"
            width="400" trigger="manual" v-model="visible">
            <div class="swiper-container swiper-video-nav" ref="videoNavSwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in navList" :key="item.index">{{item.name}}</div>
              </div>
              <div class="swiper-button-prev" ref="prevVideo">
                <svg-icon icon-class="arrow-left" />
              </div>
              <div class="swiper-button-next" ref="nextVideo">
                <svg-icon icon-class="arrow-right" />
              </div>
            </div>
            <div class="n-video-show">

            </div>
          </el-popover>
          <el-button v-popover:popover @click="visible = !visible"><svg-icon icon-class="video" /></el-button>
        </div>
        <div class="n-i"><svg-icon icon-class="farmland" /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      flag: false,
      weatherInfo: {},
      navList: [
        {
          tab: 1,
          name: '视频一'
        },
        {
          tab: 2,
          name: '视频二'
        },{
          tab: 3,
          name: '视频一'
        },
        {
          tab: 4,
          name: '视频二'
        }, {
          tab: 5,
          name: '视频一'
        },
        {
          tab: 6,
          name: '视频二'
        }
      ]
    };
  },
  mounted() {
    this.mapContainer = new AMap.Map(this.$refs.mapContainer, {
      resizeEnable: true,
      center: [116.397428, 39.90923],
      zoom: 13
    })
    this.videoNavSwiper = new Swiper(this.$refs.videoNavSwiper, {
      slidesPerView: 4,
      slidesPerGroup : 4,
      navigation: {
        nextEl: this.$refs.nextVideo,
        prevEl: this.$refs.prevVideo
      },
      observer: true,
      observeParents: true
    })
    this.showCityInfo()
  },
  methods: {
    showEyes() {
      this.flag = !this.flag
    },
    showCityInfo() {
      //实例化城市查询类
      var citysearch = new AMap.CitySearch()
      //自动获取用户IP，返回当前城市
      citysearch.getLocalCity(function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.city && result.bounds) {
            var cityinfo = result.city
            var citybounds = result.bounds
            //地图显示当前城市
            map.setBounds(citybounds)
          }
        }
      })
    // async getWeather() {
    //   let $self = this
    //   let countyInfo = await $self.getMap()
    //   AMap.plugin('AMap.Weather', () => {
    //     var weather = new AMap.Weather()
    //     weather.getLive(countyInfo, (err, data) => {
    //       console.log(data)
    //       if (!err) {
    //         $self.weatherInfo = data
    //       }
    //     })
    //   })
    }
  },
  beforeDestroy() {
    this.videoNavSwiper.destroy()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.article-left {
  position: fixed;
  .n-datas {
    margin-top: 0.875rem;
    width: 3.3rem;
    height: 14.05rem;
    border-radius: 0.125rem;
    margin-left: 0.9rem;
    border: 1px solid $--color-primary;
    .n-datamodel {
      width: 2.95rem;
      height: 13.675rem;
      border-radius: 0.125rem;
      margin: 0.175rem auto;
      background: rgba(255, 255, 255, 0.3);
      ul {
        padding-top: 0.35rem;
        li {
          cursor: pointer;
          list-style: none;
          margin-top: 0.375rem;
          &:first-child {
            margin-top: 0;
          }
          .n-dataimg {
            margin: 0 auto;
            width: 1.5rem;
            height: 1.5rem;
            background-size: 100%;
            &.img4 {
              background-image: url("/static/img/data-44.gif");
            }
            &.img3 {
              background-image: url("/static/img/data-3.png");
            }
            &.img2 {
              background-image: url("/static/img/data-2.png");
            }
            &.img1 {
              background-image: url("/static/img/data-1.png");
            }
          }
          .n-datanum {
            margin: 0.55rem auto 0;
            width: 2.55rem;
            height: 0.95rem;
            background: url("/static/img/data-bg.png");
            background-size: 100%;
            line-height: 1rem;
            text-align: center;
            position: relative;
            font-size: 0.4rem;
            span {
              position: absolute;
              font-size: 0.55rem;
              left: 50%;
              transform: translateX(-50%);
              top: -0.45rem;
              font-weight: bold;
            }
          }
          &:hover{
            .img3 {
              background-image: url("/static/img/data-33.gif");
            }
            .img2 {
              background-image: url("/static/img/data-22.gif");
            }
            .img1 {
              background-image: url("/static/img/data-11.gif");
            }
          }
        }
      }
    }
  }
}

.swiper-carousel{
  position: fixed;
  overflow: hidden;
  width: 12rem;
  height: 9rem;
  right: 0.5rem;
  top: 0.5rem;
  box-sizing: border-box;
  .map-con{
    width: 100%;
    height: 100%;
  }
  .el-carousel {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    .el-carousel__container{
      width: 100%;
      height: 90%;
      .el-carousel__item {
        border: 1px solid $--color-primary;
        padding: 0.25rem;
      }
    }
    .el-carousel__indicator{
      height: 10%;
      .el-carousel__button{
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: $--color-primary;
      }
    }
  }
  
}


.operate-right{
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translate(-50%);
  .n_icon {
    .n-i{
      .el-button{
        background: none;
        padding: 0;
        border:none;
        line-height: 0;
      }
      .svg-icon{
        margin-bottom: 0.5rem;
        background: rgba(0,0,0,.4);
        border: 2px solid $--color-primary;
        border-radius: 50%;
        color: $--color-primary;
        padding: 0.25rem;
        width: 1.5rem;
        height: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        &:hover{
          background: $--color-primary;
          color: #fff;
        }
      }
    }
  }
}

.n_content{
  // position: relative;
  // z-index: 2;
  // padding: 0rem 6rem 0rem;
  // .farm-lang-img {
  //   width: 80%;
  //   padding: 0.25rem;
  //   border-radius: 0.2rem;
  //   border: 1px solid $--color-primary;
  //   box-shadow: 1px 1px 10px rgba(0,0,0,0.8);
  // }
  .n_fieldNum{
    .n_fielditem{
      left: 32rem;
      top: 11.9rem;
      width: 1.175rem;
      height: 1.975rem;
      position: absolute;
      cursor: pointer;
      z-index: 1000;
      .fieldnum {
        background: url('/static/img/farm-icon.png') 0 0 no-repeat;
        background-size: 100%;
        height: 100%;
        position: relative;
        &.el-button{
          border:none;
          line-height: 0;
        }
        em {
          font-style: normal;
          color: $--color-primary;
          font-size: .5rem;
          font-weight: bold;
          top: .5rem;
          left: 50%;
          transform: translateX(-50%);
          position: absolute;
        }
      }
      .n-numtxt {
          height: .85rem;
          position: absolute;
          line-height: .85rem;
          text-align: center;
          left: -4.125rem;
          font-size: .45rem;
          padding: 0 .5rem 0 .6rem;
          border-radius: .425rem;
          background-color: rgba(255,255,255,.75);
      }
    }
  }
}

.el-popover{
  .swiper-video-nav{
    .swiper-wrapper{
      .swiper-slide{
        line-height: 0.75rem;
        font-size: 0.45rem;
        padding: 0 0.1rem;
        color: $--color-primary;
        border:1px solid $--color-primary;
        cursor: pointer;
      }
    }
    .swiper-button-prev, .swiper-button-next{
      background: none;
      width: auto;
      height: 0.8rem;
      top: 0;
      font-size: 0.35rem;
      line-height: 1rem;
      margin-top: 0;
      box-shadow: 1px 1px 10px rgba(255,255,255,0.4);
      background: $--color-sub;
      box-sizing: border-box;
      z-index: 100;
      .svg-icon{
        width: 0.6rem;
        height: 0.6rem;
        color: #fff;
        cursor: pointer;
      }
    }
    .swiper-button-prev{
      left: 0.05rem;
    }
    .swiper-button-next{
      right: 0.05rem;
    }
  }
  .n-video-show{
    height: 200px;
  }
}
.fog__img--first {
  -webkit-animation: marqueeOut 3s ease-in 1 forwards;
  animation: marqueeOut 3s ease-in 1 forwards;
}
.fog__img--second {
  -webkit-animation: marqueeOut2 3s ease-in 1 forwards;
  animation: marqueeOut2 3s ease-in 1 forwards;
}
</style>
