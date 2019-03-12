<template>
  <el-dialog class="dialogClass" :title="dialogTit" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form :model="formObject.model" :ref="formObject.model">
      <el-form-item v-for="item in formObject.arr" :key="item.index" :label="item.tit + ' :'">
        <el-input v-model="formObject.model[item.prop]"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <div class="form-tip">注：所有信息均为必填项</div>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      deviceId: '',
      dialogFormVisible: false,
      formObject: {
        model: {
          Logs_Date: '',
          Control_Type: ''
        },
        arr: [
          {
            prop: 'Logs_Date',
            tit: '设备名称'
          },
          {
            prop: 'Control_Type',
            tit: '设备类型'
          },
          {
            prop: 'Control_Type',
            tit: '设备类型'
          },
          {
            prop: 'Control_Type',
            tit: '设备类型'
          },
          {
            prop: 'Control_Type',
            tit: '设备类型'
          }
        ]
      } 
    };
  },
  computed: {
    dialogTit() {
      return !this.deviceId ? '新建设备信息' : '设备信息编辑'
    }
  },
  methods: {
    openDiag(val) {
      var that = this
      console.log(val)
      if (val) {
        this.demandId = val
      }
      this.dialogFormVisible = true
      setTimeout(() => {
        that.$refs[that.formObject.model].resetFields()
      }, 1)
    }
  }
};
</script>
