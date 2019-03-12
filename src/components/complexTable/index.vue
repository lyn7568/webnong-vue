<template>
  <div class="tableClass">
    <el-table
      border
      :ref="tableObject.el"
      :data="tableObject.data"
      :height="tableHeight"
      :row-class-name="tableRowClassName"
      :header-row-class-name="tableThClassName"
    >
      <el-table-column
        v-for="item in tableObject.arr"
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
            <!-- <el-button circle
              v-for="operating in tableObject.operatingList"
              :key="operating.index"
              :icon="'el-icon-'+operating.icon"
              @click="$emit(operating.event, scope.row)"
            >-->
            <el-button
              type="text"
              v-for="operate in tableObject.oFun"
              :key="operate.index"
              @click="$emit(operate.event, scope.row)"
            >
              <span class="svg-container">
                <svg-icon :icon-class="operate.icon"/>
              </span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableObject.total"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  name: "complexTable",
  props: {
    tableObject: {
      type: Object
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
      tableHeight: 420
    };
  },
  mounted() {
    var that = this;
    setTimeout(() => {
      that.tableHeight =
        window.innerHeight -
        that.$refs[that.tableObject.el].$el.offsetTop -
        that.spareDistance;
    }, 100);
    window.addEventListener("resize", () => {
      that.tableHeight =
        window.innerHeight -
        that.$refs[that.tableObject.el].$el.offsetTop -
        that.spareDistance;
    });
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.$refs.tableEle.bodyWrapper.scrollTop = 0;
      this.pageNo = val;
      this.$emit("pageCurFun", val);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "even-row";
      } else {
        return "odd-row";
      }
    },
    tableThClassName({ row, rowIndex }) {
      return "even-row";
    }
  }
};
</script>
