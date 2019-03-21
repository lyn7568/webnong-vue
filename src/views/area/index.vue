<template>
  <div class="app-container">
    <div class="form-filter">
      <filter-form v-show="activeName==='1'" :formObject="formObjectFirst" @editOpenDialogFun="showOpenDialogFun" @search="search"></filter-form>
    </div>
    <div class="list-tabs-show">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="区域列表明细" name="1">
          <complex-table ref="tableChildObj"
                         :tableObject="tableObjectFirst"
                         @pageCurFun="currentPageChangeFirst"
                         @pageSizeFun="pageSizeChangeFirst"
                         @deleteFun="deleteFun"
                         @editOpenDialogFun="editOpenDialogFun"></complex-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <add-user ref="openUserDialog"></add-user>
    <update-user ref="openUserUpdateDialog"></update-user>
  </div>
</template>

<script>
  import { dateFormat } from '@/utils'
  import filterForm from '@/components/FilterForm'
  import complexTable from '@/components/ComplexTable'
  import addArea from './addArea'

  export default {
    data() {
      return {
        activeName: '1',
        tableObjectFirst: {
          el: 'tableArea',
          data: [],
          pageNo: 1,
          total: 0,
          pageSize: 10,
          arr: [
            {
              prop: 'sn',
              tit: '区域编码'
            },
            {
              prop: 'name',
              tit: '区域名称'
            },
            {
              prop: 'imageUrl',
              tit: '区域图片Url'
            },
            {
              prop: 'imageParam',
              tit: '配置参数'
            },
            {
              prop: 'type',
              tit: '区域类别'
            },
            {
              prop: 'qkSn',
              tit: '所属区域'
            },
            {
              prop: 'description',
              tit: '备注'
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
            Control_Type: ''
          },
          arr: [
            {
              prop: 'name',
              tit: '区域名称'
            }
          ],
          oFun: [
            {
              name: '新增',
              event: 'editOpenDialogFun'
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
      addArea
    },
    computed: {
    },
    created() {
      this.queryInfoList()
    },
    methods: {
      queryInfoList() {
        var that = this
        var whereObj={'userId': sessionStorage.getItem('UID')}
        if(this.formObjectFirst.model.name!=''){
          whereObj.name=this.formObjectFirst.model.name
        }
        this.$http.post('/userArea/getUserAreaList', {
          where: whereObj,
          curpage: that.pageNo,
          pagesize: that.pageSize
        }, function(res) {
          that.$refs.tableChildObj.tableLoading = false
          const obj = res.data.rows
          // for(let i = 0; i < obj.length; ++i) {
          //   if (obj[i].Logs_Date) {
          //     obj[i].Logs_Date = dateFormat(obj[i].Logs_Date)
          //   }
          // }
          that.tableObjectFirst.data = obj
          that.tableObjectFirst.total = res.data.sumcount
        })
      },
      search(){
        this.queryInfoList()
      },
      deleteFun(val){
        var that=this
        this.$http.post('/user/delete', {
          userId: val.id
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
      pageSizeChangeFirst(val) {
        this.tableObjectFirst.pageSize = val
        this.queryInfoList()
      },
      currentPageChangeFirst(val) {
        this.tableObjectFirst.pageNo = val
        this.queryInfoList()
      },
      editOpenDialogFun(val) {
        this.$refs.openUserUpdateDialog.openDiag(val)
      },
      showOpenDialogFun(val) {
        this.$refs.openUserDialog.openDiag(val)
      }
    }
  }
</script>
