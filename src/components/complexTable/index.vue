<template>
  <div>
    <el-table :data="tableData" :height="tableHeight" border ref="tableEle">
      <el-table-column
        v-for="item in tableItem"
        :key="item.index"
        :prop="item.prop ? item.prop : ''"
        :label="item.tit ? item.tit : ''"
        :width="item.width ? item.width : ''"
        align="center"
        :className="item.active"
      >
        <template slot-scope="scope">
          <div v-if="scope.row[item.prop]">{{scope.row[item.prop]}}</div>
          <div v-if="item.operate && typeof scope.row === 'object'">
            <el-button
              v-for="operating in operatingList"
              :key="operating.index "
              size="mini"
              :type="operating.icon"
              @click="$emit(operating.event, scope.row)"
            >{{operating.text}}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
// operatingList: [ // 在子组件中遍历事件
//           {
//             text: '删除',
//             event: 'deleteFun',
//             icon: 'danger'
//           }
//         ],
export default {
  name: "complexTable",
  props: {
    tableData: {
      type: Array
    },
    tableItem: {
      type: Array
    },
    operatingList: {
      type: Array
    },
    pageTotal: {
      type: Number,
      default: 0
    },
    spareDistance: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      tableHeight: 600
    };
  },
  mounted() {
    var that = this;
    setTimeout(() => {
      this.tableHeight =
        window.innerHeight -
        this.$refs.tableEle.$el.offsetTop -
        this.spareDistance;
    }, 100);
    window.addEventListener("resize", () => {
      that.tableHeight =
        window.innerHeight -
        that.$refs.tableEle.$el.offsetTop -
        that.spareDistance;
    });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$refs.tableEle.bodyWrapper.scrollTop = 0;
      this.pageNo = val;
      this.$emit("pageCurFun", val);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.el-table .cell {
  min-height: 23px;
}

.active {
  color: #409eff;
  cursor: pointer;
}
</style>