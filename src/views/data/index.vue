<template>
  <div class="app-container">
    <div class="form-filter">
      <div class="h3 float-l">传感器数据总览</div>
      <div class="ntt_showbtn float-r" ng-init="AcquisitionMode='Point'">
        <span
          ng-click="AcquisitionMode = 'Point';QueryData('F')"
          ng-class="{nowjiance: AcquisitionMode == 'Point'}"
          class="nowjiance"
        >按采集点显示</span>
        <span
          ng-click="AcquisitionMode = 'data';QueryData('S')"
          ng-class="{nowjiance: AcquisitionMode == 'data'}"
        >按采集数据显示</span>
      </div>
    </div>
    <div class="list-tabs-show">
      <div class="ntt-dataList">
        <div class="data-btn" :class="{'current-data':item.flag}" v-for="item in videoList" :key="item.index">{{item.type}}</div>
      </div>
      <div class="ntt-dataCount">
        <el-row>
          <el-col :span="8" class="colLi">
            <div class="dataArea">
              <h3>华御气象站</h3>
            </div>
            <div class="datalist">
                            
            </div>
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
      videoList: []
    };
  },
  created() {
    this.queryInfoList();
  },
  methods: {
    queryInfoList() {
      var that = this;
      this.$http.get(
        "/static/json/video.txt?t=" + new Date().getTime(),
        {},
        function(res) {
          var $data = res.rows;
          that.videoList = $data;
        }
      );
    }
  }
};
</script>
