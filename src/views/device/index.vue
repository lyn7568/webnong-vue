<template>
  <div class="app-container">
    <div class="form-filter">
      <filter-form v-show="activeName==='1'" :formObject="formObjectFirst" @editOpenDialogFun="editOpenDialogFun"></filter-form>
    </div>
    <div class="list-tabs-show">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="设备列表明细" name="1">
          <complex-table :tableObject="tableObjectFirst" @pageCurFun="currentPageChangeFirst" @editOpenDialogFun="editOpenDialogFun"></complex-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <add-device ref="openDeviceDialog"></add-device>
  </div>
</template>

<script>
  import { dateFormat } from '@/utils'
  import filterForm from '@/components/FilterForm'
  import complexTable from '@/components/ComplexTable'
  import addDevice from './addDevice'

  export default {
    data() {
      return {
        activeName: '1',
        tableObjectFirst: {
          el: 'tableDevice',
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
              tit: '设备名称'
            },
            {
              prop: 'Control_Type',
              tit: '设备类型'
            },
            {
              prop: 'Control_Way',
              tit: '使用地方'
            },
            {
              prop: 'Control_Way',
              tit: '所属企业'
            },
            {
              operate: 'edit',
              tit: '操作',
              width: '100'
            }
          ],
          oFun: [
            {
              icon: 'edit',
              event: 'editOpenDialogFun'
            },
            {
              icon: 'delete',
              event: 'deleteFun'
            }
          ]
        },
        formObjectFirst: {
          ref: 'first',
          model: {
            Logs_Date: '',
            Control_Type: ''
          },
          arr: [
            {
              prop: 'Logs_Date',
              tit: '设备名称',
              date: true,
            },
            {
              prop: 'Control_Type',
              tit: '所属企业'
            }
          ],
          oFun: [
            {
              name: '新增',
              event: 'editOpenDialogFun'
            },
            {
              name: '查询',
              event: 'edit'
            }
          ]
        }
      }
    },
    components: {
      filterForm,
      complexTable,
      addDevice
    },
    computed: {
    },
    created() {
      this.queryInfoList()
    },
    methods: {
      queryInfoList() {
        var that = this
        // this.$http.get('/static/json/contol.txt?t='+new Date().getTime(), {
        // }, function(res) {
        //   for(let i = 0; i < res.rows.length; ++i) {
        //     if (res.rows[i].Logs_Date) {
        //       res.rows[i].Logs_Date = dateFormat(res.rows[i].Logs_Date)
        //     }
        //   }
        //   that.tableObjectFirst.data = res.rows
        //   that.tableObjectFirst.total = res.total
        // })
      },
      currentPageChangeFirst(val) {
        this.tableObjectFirst.pageNo = val
        this.queryInfoList()
      },
      editOpenDialogFun(val) {
        this.$refs.openDeviceDialog.openDiag(val)
      }
    }
  }
</script>
