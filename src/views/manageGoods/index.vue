<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="box-operate clearfix">
        <el-button type="primary" @click="handleAdd">添加商品</el-button>
        <div class="box-filter">
          <el-input class="box-input" placeholder="请输入商品名称" v-model="searchText" @keyup.enter.native="pageQueryList"></el-input>
          <el-select v-model="selectedCategorycode" placeholder="请选择商品分类">
            <el-option
              v-for="item in selectCategory"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
          <el-button type="primary" @click="pageQueryList">搜索</el-button>
        </div>
      </div> 
    </div>
    <el-table :data="tableData" height="680" v-loading="tableLoading">
      <el-table-column type="index" width="40" align="center"></el-table-column>
      <el-table-column type="expand" width="20">
        <template slot-scope="props">
          <el-table :data="props.row.specs" :row-class-name="tableRowClassName" :header-row-class-name="tableRowClassName" border>
            <el-table-column v-for="item in tableItem" :key="item.index" :prop="item.prop ? item.prop : ''" :label="item.tit ? item.tit : ''"
              :width="item.width ? item.width : ''" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row[item.prop]">
                  <span>{{scope.row[item.prop]}}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" prop="sn"></el-table-column>
      <el-table-column label="商品名称" align="center" prop="name"></el-table-column>
      <el-table-column label="商品分类" align="center" prop="categorycode"></el-table-column>
      <!-- <el-table-column label="前台是否显示" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isShow"></el-checkbox>
        </template>
      </el-table-column> -->
      <el-table-column label="是否为推荐" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isRecommend" @change="setRecommond(scope.row.id, $event)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="是否为奖品" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isPrice" @change="setPrize(scope.row.id, $event)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="是否展示" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isShow" @change="setShow(scope.row.id, $event)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column align="center" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini" type="primary"
            @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
            size="mini" type="danger"
            @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { strToArr } from '@/utils'
export default {
  data() {
    return {
      searchText: '',
      selectedCategorycode: '',
      pageSize: 15,
      pageNo: 1,
      total: 0,
      selectCategory: [],
      goodsCategory: [],
      tableData: [],
      tableLoading: true,
      tableItem: [
        {
          prop: 'colorname',
          tit: '颜色'
        },
        {
          prop: 'stock',
          tit: '库存'
        },
        {
          prop: 'unit',
          tit: '单位'
        },
        {
          prop: 'bid',
          tit: '进价'
        },
        {
          prop: 'price',
          tit: '售价'
        },
        {
          prop: 'separationprice',
          tit: '分润价'
        },
        {
          prop: 'marketprice',
          tit: '市场价'
        },
        {
          prop: 'img',
          tit: '图片',
          width: '320'
        }
      ]
    }
  },
  created() {
    var that = this
    this.getCategory()
    setTimeout(function() {
      that.pageQueryList()
    }, 100)
  },
  methods: {
    getCategory() {
      var that = this
      this.$http.post('/sm/goods/getCategory.do', {}, function(res) {
        if (res.meta.state === '000000') {
          that.selectCategory = res.data
          res.data.map(item => {
            that.goodsCategory[item.code] = item.name
          })
        }
      })
    },
    pageQueryList() {
      var that = this
      this.tableLoading = true
      const paramsD = JSON.stringify({
        'categorycode': that.selectedCategorycode,
        'name': that.searchText,
        'createuser': sessionStorage.getItem('UID') === '1' ? '' : sessionStorage.getItem('UID'),
        'curPage': that.pageNo,
        'pageSize': that.pageSize
      })
      this.$http.post('/sm/goods/list.do', paramsD, function(res) {
        that.tableLoading = false
        if (res.meta.state === '000000') {
          const $data = res.data
          for (let i = 0; i < $data.list.length; ++i) {
            if ($data.list[i].img) {
              $data.list[i].img = strToArr($data.list[i].img)
            }
            if ($data.list[i].categorycode) {
              $data.list[i].categorycode = that.goodsCategory[$data.list[i].categorycode]
            }
            if ($data.list[i].isRecommend === 'true') {
              $data.list[i].isRecommend = true
            } else {
              $data.list[i].isRecommend = false
            }
            if ($data.list[i].isPrice === 'true') {
              $data.list[i].isPrice = true
            } else {
              $data.list[i].isPrice = false
            }
          }
          that.tableData = $data.list
          that.total = $data.total
        }
      })
    },
    setRecommond(id, val) {
      var url = ''
      if (!val) {
        url = '/sm/goods/cancleRecommend.do'
      } else {
        url = '/sm/goods/setRecommend.do'
      }
      this.$http.post(url, { id: id }, function(res) {
        console.log(res)
      })
    },
    setPrize(id, val) {
      var url = ''
      if (!val) {
        url = '/sm/goods/canclePrice.do'
      } else {
        url = '/sm/goods/setPrice.do'
      }
      this.$http.post(url, { id: id }, function(res) {
        console.log(res)
      })
    },
    setShow(id, val) {
      var url = ''
      if (!val) {
        url = '/sm/goods/cancleShow.do'
      } else {
        url = '/sm/goods/setShow.do'
      }
      this.$http.post(url, { id: id }, function(res) {
        console.log(res)
      })
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.pageQueryList()
    },
    handleAdd() {
      this.$router.replace({
        name: 'addGoods'
      })
    },
    handleEdit(id) {
      this.$router.replace({
        name: 'addGoods',
        query: {
          id: id
        }
      })
    },
    handleDel(id) {
      var that = this
      this.$confirm('确认删除该商品吗?', '提示', {
        type: 'warning'
      }).then(() => {
        that.$http.post('/sm/goods/delete.do', {
          id: id
        }, function(res) {
          if (res.meta.state === '000000') {
            that.pageQueryList()
          }
        })
      }).catch(() => {})
    },
    tableRowClassName({ row, rowIndex }) {
      return 'bg-expand-table'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-table__expanded-cell .el-table .bg-expand-table{
    background:#f0fbfd;
    th{
      background-color: transparent;
    }
  }
  .el-table__expanded-cell[class*=cell]{
    padding: 6px 20px 6px 40px;
  }
  .el-table__expanded-cell[class*=cell] .el-table th{
    color: #8aa1a5;
  }
  .box-operate{
    overflow: hidden;
    margin-bottom: 20px;
    .box-filter{
      float: right;
    }
    .box-input{
      width: 200px;
    }
  }
</style>
