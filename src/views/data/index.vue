<template>
  <div class="ntt_videoPage">
    <div class="ntt_videoL">
      <div class="ntt_videoNumbox">
        <el-tree :data="videoList"></el-tree>
      </div>
      <div class="ntt_videoCtrolbox">
        <!-- <div class="ablePanel ng-hide" ng-show="channelNo!=''">
          <div class="ntt_ctrolPanel">
            <span
              class="up-video"
              ng-mouseup="StopCameraControl()"
              ng-mousedown="StartCameraControl('0')"
            ></span>
            <span
              class="down-video"
              ng-mouseup="StopCameraControl()"
              ng-mousedown="StartCameraControl('1')"
            ></span>
            <span
              class="prev-video"
              ng-mouseup="StopCameraControl()"
              ng-mousedown="StartCameraControl('2')"
            ></span>
            <span
              class="next-video"
              ng-mouseup="StopCameraControl()"
              ng-mousedown="StartCameraControl('3')"
            ></span>
            <span class="middle-video zoomIn"></span>
          </div>
          <div class="ntt_voice">
            <div
              class="ntt_upper"
              ng-mouseup="StopCameraControl()"
              ng-mousedown="StartCameraControl('8')"
            ></div>
            <div
              class="ntt_lower"
              ng-mouseup="StopCameraControl()"
              ng-mousedown="StartCameraControl('9')"
            ></div>
          </div>
        </div>
        <div class="unablePanel" ng-show="channelNo==''">
          <div class="ntt_ctrolPanel">
            <span class="up-video"></span>
            <span class="down-video"></span>
            <span class="prev-video"></span>
            <span class="next-video"></span>
            <em class="middle-video"></em>
          </div>
          <div class="ntt_voice">
            <div class="ntt_upper"></div>
            <div class="ntt_lower"></div>
          </div>
        </div>
         -->
      </div>
    </div>
    <!-- <div class="ntt_videoR float-l">
      <div class="ntt_videoshow">
        <ul class="clearfix">
        </ul>
      </div>
      <div class="ntt_videoOption">
        <span class="btn-one"></span>
        <span class="btn-four"></span>
        <span class="btn-nine"></span>
      </div>
    </div> -->
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
    this.queryInfoList()
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
