<template>
  <div class="app-container">
    <div class="form-filter">
      <filter-form v-show="activeName==='1'" :formObject="formObjectFirst" @editOpenDialogFun="editOpenDialogFun"></filter-form>
    </div>
    <div class="list-tabs-show">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="用户列表明细" name="1">
          <complex-table ref="tableChildObj"
            :tableObject="tableObjectFirst"
            @pageCurFun="currentPageChangeFirst"
            @pageSizeFun="pageSizeChangeFirst"
            @editOpenDialogFun="editOpenDialogFun"></complex-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <add-user ref="openUserDialog"></add-user>
  </div>
</template>

<script>
  import { dateFormat } from '@/utils'
  import filterForm from '@/components/FilterForm'
  import complexTable from '@/components/ComplexTable'
  import addUser from './addUser'

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
              prop: 'id',
              tit: '用户ID'
            },
            {
              prop: 'name',
              tit: '用户姓名'
            },
            {
              prop: 'username',
              tit: '登录账户'
            },
            {
              prop: 'roleName',
              tit: '用户类型'
            },
            {
              prop: 'status',
              tit: '用户状态'
            },
            {
              prop: 'updateTime',
              tit: '最后登录时间'
            },
            {
              operate: true,
              tit: '操作',
              width: '200'
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
            },
            {
              icon: 'reset_password',
              event: 'deleteFun'
            }
          ]
        },
        formObjectFirst: {
          ref: 'userForm',
          model: {
            Logs_Date: '',
            Control_Type: ''
          },
          arr: [
            {
              prop: 'Logs_Date',
              tit: '登录账户'
            },
            {
              prop: 'Control_Type',
              tit: '用户名称'
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
      addUser
    },
    computed: {
    },
    created() {
      this.queryInfoList()
    },
    methods: {
      queryInfoList() {
        var that = this
        this.$http.post('/user/getUserList', {
          where: {'parentId': sessionStorage.getItem('UID')},
          curpage: that.pageNo,
          pagesize: that.pageSize
        }, function(res) {
          that.$refs.tableChildObj.tableLoading = false
          const obj = res.data.rows
          const objData = res.data.rows
          for(let i = 0; i < obj.length; ++i) {
            if (obj[i].Logs_Date) {
              obj[i].Logs_Date = dateFormat(obj[i].Logs_Date)
            }
            if(obj[i].status=="0"){
              objData[i].status='正常';
            }else if(obj[i].status=="1"){
              objData[i].status='已锁定';
            }
            objData[i].roleName=obj[i].roleList[0].name
          }
          that.tableObjectFirst.data = objData
          that.tableObjectFirst.total = res.data.sumcount
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
        this.$refs.openUserDialog.openDiag(val)
      }
    }
  }
</script>
