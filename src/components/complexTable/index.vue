<template>
  <div class="tableClass">
    <el-table
      ref="tableBody"
      border
      :data="tableObject.data"
      :height="(tableH? tableH: tableHeight)+'rem'"
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
          <div>{{scope.row[item.prop] || '--'}}</div>
          <div v-if="item.operate && typeof scope.row === 'object'">
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
    <div class="pagination-container" v-if="tableObject.pageNo">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="tableObject.pageNo"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="tableObject.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableObject.total"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  name: 'complexTable',
  props: {
    tableObject: {
      type: Object
    },
    tableH: {
      type: Number
    }
  },
  data() {
    return {
      tableHeight: 9.6
    };
  },
  mounted() {
    this.$nextTick(() => {
      this._reHeight()
    });
    window.addEventListener('resize', this._reHeight)
  },
  methods: {
    _reHeight() {
      this.tableHeight = (window.innerHeight - this.$refs.tableBody.$el.offsetTop - 150) * 0.025;
    },
    handleSizeChange(val) {
      this.$emit('pageSizeFun', val)
    },
    handleCurrentChange(val) {
      this.$emit('pageCurFun', val);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return 'even-row';
      } else {
        return 'odd-row';
      }
    },
    tableThClassName({ row, rowIndex }) {
      return 'even-row';
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._reHeight)
  }
};
</script>
