<template>
  <div class="app-container">
    <div class="form-filter">
      <filter-form v-show="activeName==='1'" :formObject="formObjectFirst"></filter-form>
      <filter-form v-show="activeName==='2'" :formObject="formObjectTwo"></filter-form>
    </div>
    <div class="list-tabs-show">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="设备控制日志列表" name="1">
          <complex-table :tableObject="tableObjectFirst" @pageCurFun="currentPageChangeFirst"></complex-table>
        </el-tab-pane>
        <el-tab-pane label="预警日志列表" name="2">
          <complex-table :tableObject="tableObjectTwo" @pageCurFun="currentPageChangeTwo"></complex-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { dateFormat } from '@/utils'
  import filterForm from '@/components/FilterForm'
  import complexTable from '@/components/ComplexTable'

  export default {
    data() {
      return {
        activeName: '1',
        tableObjectFirst: {
          el: 'tableFirst',
          data: [],
          pageNo: 1,
          total: 0,
          pageSize: 10,
          arr: [
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
        },
        tableObjectTwo: {
          el: 'tableTwo',
          data: [],
          pageNo: 1,
          total: 0,
          pageSize: 10,
          arr: [
            {
              prop: 'LogsID',
              tit: '预警触发地块'
            },
            {
              prop: 'Logs_Date',
              tit: '触发/解除时间'
            },
            {
              prop: 'Control_Way',
              tit: '预警方式'
            },
            {
              prop: 'Control_Man',
              tit: '预警内容'
            }
          ]
        },
        formObjectFirst: {
          model: {
            Logs_Date: '',
            Control_Type: '',
            Control_Way: '',
            Control_Man: ''
          },
          arr: [
            {
              prop: 'Logs_Date',
              tit: '操作时间',
              date: true,
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
          ],
          fun: 'submitFirstFun'
        },
        formObjectTwo: {
          model: {
            Logs_Date: '',
            Control_Type: '',
            Control_Way: '',
            Control_Man: ''
          },
          arr: [
            {
              prop: 'Logs_Date',
              tit: '触发时间',
              date: true,
            },
            {
              prop: 'Control_Type',
              tit: '触发地块'
            },
            {
              prop: 'Control_Way',
              tit: '预警方式'
            }
          ],
          fun: 'submitTwoFun'
        }
      }
    },
    components: {
      filterForm,
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
        this.$http.get('/static/json/contol.txt?t='+new Date().getTime(), {
        }, function(res) {
          for(let i = 0; i < res.rows.length; ++i) {
            if (res.rows[i].Logs_Date) {
              res.rows[i].Logs_Date = dateFormat(res.rows[i].Logs_Date)
            }
          }
          that.tableObjectFirst.data = res.rows
          that.tableObjectFirst.total = res.total
        })
      },
      currentPageChangeFirst(val) {
        this.tableObjectFirst.pageNo = val
        this.queryInfoList()
      },
      currentPageChangeTwo(val) {
        this.tableObjectTwo.pageNo = val
        this.queryInfoList()
      },
      // handleClick(val) {
      //   console.log(val)
      //   this.activeName = val
      // },
      submitFirstFun() {
        console.log(123)
      }
    }
  }
</script>
