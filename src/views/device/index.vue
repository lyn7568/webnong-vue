<template>
  <div class="app-container">
    <div class="form-filter">
      <filter-form v-show="activeName==='1'" :formObject="formObjectFirst" @addOpenDialogFun="addOpenDialogFun" @search="search"></filter-form>
    </div>
    <div class="list-tabs-show">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="设备列表明细" name="1">
          <complex-table v-loading="tableLoading"
                         :tableObject="tableObjectFirst"
                         @pageCurFun="currentPageChangeFirst"
                         @pageSizeFun="pageSizeChangeFirst"
                         @deleteFun="deleteFun"
                         @editOpenDialogFun="editOpenDialogFun"></complex-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <add-device ref="openUserEsnDialog"></add-device>
    <update-device ref="openUserEsnUpdateDialog"></update-device>
  </div>
</template>

<script>
  import { dateFormat } from '@/utils'
  import filterForm from '@/components/FilterForm'
  import complexTable from '@/components/ComplexTable'
  import addDevice from './addDevice'
  import updateDevice from './updateDevice'

  export default {
    data() {
      return {
        activeName: '1',
        tableLoading: false,
        tableObjectFirst: {
          el: 'tableDevice',
          data: [],
          pageNo: 1,
          total: 0,
          pageSize: 20,
          arr: [
            {
              prop: 'name',
              tit: '设备名称'
            },
            {
              prop: 'type',
              tit: '设备类型'
            },
            {
              prop: 'address',
              tit: '使用地点'
            },
            {
              prop: 'company',
              tit: '所属企业'
            },
            {
              prop: 'cgData',
              tit: '传感数据项'
            },
            {
              prop: 'unit',
              tit: '数值单位'
            },
            {
              prop: 'owner',
              tit: '设备属于者'
            },
            {
              prop: 'nowData',
              tit: '实时读数'
            },
            {
              prop: 'nowDataTime',
              tit: '数据抓取时间'
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
            name: '',
            company: ''
          },
          arr: [
            {
              prop: 'name',
              tit: '设备名称',
            },
            {
              prop: 'company',
              tit: '所属企业'
            }
          ],
          oFun: [
            {
              name: '新增',
              event: 'addOpenDialogFun'
            },
            {
              name: '查询',
              event: 'search'
            }
          ]
        }
      }
    },
    components: {
      filterForm,
      complexTable,
      addDevice,
      updateDevice
    },
    computed: {
      UID() {
        return this.$store.getters.userid
      }
    },
    created() {
      this.queryInfoList()
    },
    methods: {
      queryInfoList() {
        var that = this
        that.tableLoading = true
        var whereObj={'userId': that.UID}
        if(this.formObjectFirst.model.name!=''){
          whereObj.name=this.formObjectFirst.model.name
        }
        if(this.formObjectFirst.model.company!=''){
          whereObj.company=this.formObjectFirst.model.company
        }
        this.$http.post('/esn/getUserEsnList', {
          where: whereObj,
          curpage: that.tableObjectFirst.pageNo,
          pagesize: that.tableObjectFirst.pageSize,
          sortField:'ip,cip',
          orderBy:'asc'
        }, function(res) {
          that.tableLoading = false
          const obj = res.data.rows
          for(let i = 0; i < obj.length; ++i) {
            obj[i].address=obj[i].userArea.name
            obj[i].addressId=obj[i].userArea.id
          }
          that.tableObjectFirst.data = obj
          that.tableObjectFirst.total = res.data.sumcount
        })
      },
      search(){
        this.resetInfo()
      },
      deleteFun(val){
        var that=this
        this.$http.post('/esn/delete', {
          id: val.id
        }, function(res) {
          if (res.success) {
            that.$message({
              message: "删除成功",
              type: 'success'
            })
            that.$parent.qureyInfoList()
          }
        })
      },
      resetInfo() {
        this.tableObjectFirst.data = []
        this.tableObjectFirst.pageNo = 1
        this.tableObjectFirst.total = 0
        this.tableObjectFirst.pageSize = 10
        this.queryInfoList()
      },
      deleteFun(val){
        var that=this
        this.$http.post('/esn/delete', {
          id: val.id
        }, function(res) {
          if (res.success) {
            that.$message({
              message: "删除成功",
              type: 'success'
            })
            that.resetInfo()
          }
        })
      },
      pageSizeChangeFirst(val) {
        this.tableObjectFirst.pageSize = val
        this.queryInfoList()
      },
      currentPageChangeFirst(val) {
        this.tableObjectFirst.pageNo = val
        this.queryInfoList()
      },
      editOpenDialogFun(val) {
        this.$refs.openUserEsnUpdateDialog.openDiag(val)
      },
      addOpenDialogFun(val) {
        this.$refs.openUserEsnDialog.openDiag(val)
      }
    }
  }
</script>
