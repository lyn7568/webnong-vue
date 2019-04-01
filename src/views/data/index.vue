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
        <div class="data-btn" :class="{'current-data':flagArr[index]}" v-for="(item,index) in videoList"  @click="showAreaEsnClk(index)" :key="item.index">{{item.name}}</div>
      </div>
      <div class="n-dataCount" ref="conBody" :style="'height:' + bodyH + 'rem'">
        <el-row>
          <el-col :span="8" class="colLi" v-for="areaItem in videoList" :key="areaItem.index">
            <div class="dataArea">
              <h3>{{areaItem.name}}</h3>
            </div>
            <el-row class="datalist">
              <el-col :span="12" v-for="(esnItem,index) in esnList" :key="esnItem.index" >
                <span v-show="areaItem.id==esnItem.userArea.id">{{esnItem.name}}</span>
                <em v-show="areaItem.id==esnItem.userArea.id"><i>{{esnItem.nowData}}</i>{{esnItem.unit}}</em>
              </el-col>
              <!--<el-col :span="12">-->
                <!--<span>室外温度</span>-->
                <!--<em><i>17.2</i> ℃ </em>-->
              <!--</el-col>-->
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
      flagArr:[],
      esnList:[],
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
      bodyH: 12
    };
  },
  computed: {
    UID() {
      return this.$store.getters.userid
    }
  },
  created() {
    this.queryAreaInfoList();
    this.queryEsnInfoList();
  },
  mounted() {
    var that = this;
    setTimeout(() => {
      that.tableHeight = (window.innerHeight - that.$refs.conBody.offsetTop - 150) * 0.025;
    }, 100);
    window.addEventListener('resize', () => {
      that.tableHeight = (window.innerHeight - that.$refs.conBody.offsetTop - 150) * 0.025;
    })
  },
  methods: {
    queryAreaInfoList() {
      var that = this;
      this.$http.post('/data/getUserAreaByUserId', {
        userId: that.UID,
      }, function (res) {
        const obj = res.data
        if (obj.length != 0) {
          that.videoList = obj
         for (let i=0;i<that.videoList.length;i++){
            that.flagArr.push(true)
          }
        }
      })
    },
    queryEsnInfoList() {
      var that = this;
      this.$http.post('/data/getUserEsnByUserIdAndType', {
        userId: that.UID,
        type:'NTT无线传感器'
      }, function (res) {
        const obj = res.data
        if (obj.length != 0) {
          that.esnList = obj
        }
      })
    },
    clickShowBtn(val) {
      this.showActive = val
    },
    showAreaEsnClk(index){
      alert(index)
      alert(this.flagArr[index])
      this.flagArr[index]=!(this.flagArr[index])
      alert(this.flagArr[index])
      this.$set(this.flagArr,index,this.flagArr[index])
      // Vue.set( this.flagArr,index,this.flagArr[index])
    }
  }
};
</script>
