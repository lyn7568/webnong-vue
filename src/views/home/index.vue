<template>
  <div>
    <div class="article-left">
      <div class="n-datas">
        <div class="n-datamodel">
          <ul>
            <li>
              <div class="n-dataimg img4"></div>
              <div class="n-datanum">
                触发警报
                <span class="ng-binding">0</span>
              </div>
            </li>
            <li>
              <div class="n-dataimg img1"></div>
              <div class="n-datanum">
                控制设备
                <span class="ng-binding">156</span>
              </div>
            </li>
            <li>
              <div class="n-dataimg img2"></div>
              <div class="n-datanum">
                传感器数
                <span class="ng-binding">92</span>
              </div>
            </li>
            <li>
              <div class="n-dataimg img3"></div>
              <div class="n-datanum">
                在线数量
                <span class="ng-binding">223</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="swiper-carousel">
      <el-carousel indicator-position="outside">
        <el-carousel-item>
          <img src="/src/assets/home_bg.jpg" width="100%" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="/src/assets/page_bg.jpg" width="100%" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="/src/assets/logo_bg.jpg" width="100%" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
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
              background-image: url("/src/assets/data-44.gif");
            }
            &.img3 {
              background-image: url("/src/assets/data-3.png");
            }
            &.img2 {
              background-image: url("/src/assets/data-2.png");
            }
            &.img1 {
              background-image: url("/src/assets/data-1.png");
            }
          }
          .n-datanum {
            margin: 0.55rem auto 0;
            width: 2.55rem;
            height: 0.95rem;
            background: url("/src/assets/data-bg.png");
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


</style>
