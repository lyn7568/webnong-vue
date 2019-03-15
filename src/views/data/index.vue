<template>
  <div class="app-container">
    <div class="list-tabs-show">
      <div class="n-dataFiter">
        <h3>传感器数据总览</h3>
        <div class="showbtn">
          <span :class="{'active': item.tab === showActive}" v-for="item in showbtnList" :key="item.index" @click="clickShowBtn(item.tab)">{{item.name}}</span>
        </div>
      </div>
      <div class="n-dataList">
        <div class="data-btn" :class="{'current-data':item.flag}" v-for="item in videoList" :key="item.index">{{item.type}}</div>
      </div>
      <div class="n-dataCount" :style="'height:' + bodyH + 'px'">
        <el-row>
          <el-col :span="8" class="colLi">
            <div class="dataArea">
              <h3>华御气象站</h3>
            </div>
            <el-row class="datalist">
              <el-col :span="12">
                <span>室外温度</span>
                <em><i>17.2</i> ℃ </em>
              </el-col>
              <el-col :span="12">
                <span>室外温度</span>
                <em><i>17.2</i> ℃ </em>
              </el-col>         
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showActive: '1',
      showbtnList: [
        {
          tab: '1',
          name: '按采集点显示'
        },
        {
          tab: '2',
          name: '按采集数据显示'
        }
      ],
      videoList: [],
      bodyH: 280
    };
  },
  created() {
    this.queryInfoList();
  },
  mounted() {
    var that = this;
    setTimeout(() => {
      that.bodyH = window.innerHeight - 320;
    }, 100);
    window.addEventListener("resize", () => {
      that.bodyH = window.innerHeight - 320;
    });
  },
  methods: {
    queryInfoList() {
      var that = this;
      // this.$http.get(
      //   "/static/json/video.txt?t=" + new Date().getTime(),
      //   {},
      //   function(res) {
      //     var $data = res.rows;
      //     that.videoList = $data;
      //   }
      // );
    },
    clickShowBtn(val) {
      this.showActive = val
    }
  }
};
</script>
