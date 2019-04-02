<template>
  <div class="app-container">
    <div class="list-tabs-show">
      <div class="n-dataFiter">
        <h3>传感器数据总览</h3>
        <div class="showbtn">
          <span :class="{'active': item.tab === showActive}" v-for="item in showbtnList" :key="item.index" @click="clickShowBtn(item.tab)">{{item.name}}</span>
        </div>
      </div>
      <div class="n-dataList" v-show="showTab">
        <div class="data-btn" :class="{'current-data':flagArr[index]}" v-for="(item,index) in videoList"  @click="showAreaEsnClk(index)" :key="item.index">{{item.name}}</div>
      </div>
      <div class="n-dataList" v-show="!showTab">
        <div class="data-btn" :class="{'current-data':flagTypeArr[index]}" v-for="(item,index) in videoTypeList"  @click="showEsnTypeClk(index)" :key="item.index">{{item.name}}</div>
      </div>
      <div class="n-dataCount" ref="conBody" :style="'height:' + bodyH + 'rem'">
        <el-row v-show="showTab">
          <el-col :span="8" class="colLi" v-for="(areaItem,index) in videoList" v-show="flagArr[index]" :key="areaItem.index">
            <div class="dataArea">
              <h3>{{areaItem.name}}</h3>
            </div>
            <el-row class="datalist">
              <el-col :span="12" v-for="(esnItem,index) in esnList" :key="esnItem.index" v-show="areaItem.id==esnItem.userArea.id">
                <span>{{esnItem.name}}</span>
                <em><i>{{esnItem.nowData}}</i>{{esnItem.unit}}</em>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row v-show="!showTab">
          <el-col :span="8" class="colLi" v-for="(typeItem,index) in videoTypeList" v-show="flagTypeArr[index]" :key="typeItem.index">
            <div class="dataArea">
              <h3>{{typeItem.name}}</h3>
            </div>
            <el-row class="datalist">
              <el-col :span="12" v-for="(esnItem,index) in esnList" :key="esnItem.index"  v-show="typeItem.id==esnItem.cgData">
                <span>{{esnItem.userArea.name}}>{{esnItem.name}}</span>
                <em><i>{{esnItem.nowData}}</i>{{esnItem.unit}}</em>
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
      showTab:true,
      flagArr:[],
      flagTypeArr:[],
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
      videoTypeList: [
        {
          id:'光照度',
          name:'光照度'
        },
        {
          id:'湿度',
          name:'湿度'
        },
        {
          id:'土壤湿度',
          name:'土壤湿度'
        },
        {
          id:'温度',
          name:'温度'
        },
        {
          id:'土壤温度',
          name:'土壤温度'
        },
      ],
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
      this.showTab=!this.showTab
      for (let i=0;i<this.videoTypeList.length;i++){
        this.$set(this.flagTypeArr,i,true)
      }
      for (let i=0;i<this.videoList.length;i++){
        this.$set(this.flagArr,i,true)
      }
    },
    showAreaEsnClk(index){
      let value=this.flagArr[index]
      this.$set(this.flagArr,index,!value)
    },
    showEsnTypeClk(index){
      let value=this.flagTypeArr[index]
      this.$set(this.flagTypeArr,index,!value)
    }
  }
};
</script>
