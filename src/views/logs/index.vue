<template>
  <div class="app-container">
    <div class="content-container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="1">
          <complex-table :tableData="tableData" :tableItem="tableItem" :pageTotal="pageTotal" @pageCurFun="currentPageChange"></complex-table>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="2">
          
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import complexTable from '@/components/complexTable'

  export default {
    data() {
      return {
        activeName: '1',
        tableData: [],
        pageTotal: 0,
        tableItem: [
          {
            prop: 'LogsID',
            tit: '设备编码'
          },
          {
            prop: 'Logs_Date',
            tit: '操作时间'
          },
          {
            prop: 'Control_Type',
            tit: '操作类型'
          },
          {
            prop: 'Control_Way',
            tit: '操作方式'
          },
          {
            prop: 'Control_Man',
            tit: '操作人'
          }
        ]
      }
    },
    components: {
      complexTable
    },
    computed: {
    },
    created() {
      this.queryInfoList()
    },
    methods: {
      queryInfoList() {
        var that = this
        this.$http.get('/static/json/contol.txt', {
        }, (res) => {
          console.log(res)
          var obj = res.data
          that.tableData = res.data.rows
          that.pageTotal = res.data.total
        })
      },
      currentPageChange(val) {
        this.pageNo = val
        this.queryInfoList()
      },
      handleClick(val) {
        this.activeName = val
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
