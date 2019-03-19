<template>
  <el-dialog class="dialogClass" :title="dialogTit" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form :model="formObject.model" :ref="formObject.ref" :rules="formObject.rules">
      <el-form-item v-for="item in formObject.arr" :key="item.index" :label="item.tit + ' :'" :prop="item.prop">
        <el-select v-if="item.select" v-model="formObject.model[item.prop]">
          <el-option v-for="sel in selectOptions" :key="sel.index" :label="sel.name" :value="sel.id"></el-option>
        </el-select>
        <el-input v-else v-model="formObject.model[item.prop]"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <div class="form-tip">注：所有信息均为必填项</div>
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="saveSubmitInfo">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      objId: '',
      dialogFormVisible: false,
      selectOptions: [
        {
          id: '1',
          name: '普通用户'
        },
        {
          id: '2',
          name: '厂商'
        },
        {
          id: '3',
          name: '经销售'
        },
        {
          id: '4',
          name: '超级管理员'
        }
      ],
      formObject: {
        ref: 'formName',
        model: {
          username: '',
          name: '',
          password: '',
          roleId: ''
        },
        rules: {
          name: [{ required: true, message: '请输入用戶姓名', trigger: 'blur' }],
          username: [{ required: true, message: '请输入用戶账户', trigger: 'blur' }],
          password: [{ required: true, message: '请输入用戶密码', trigger: 'blur' }],
          roleId: [{ required: true, message: '请选择用戶类型', trigger: 'blur' }],
        },
        arr: [
          {
            prop: 'username',
            tit: '用户账户'
          },
          {
            prop: 'password',
            tit: '用户密码'
          },
          {
            prop: 'name',
            tit: '用户姓名'
          },
          {
            prop: 'roleId',
            tit: '用户类型',
            select: true
          }
        ]
      }
    };
  },
  computed: {
    dialogTit() {
      return !this.deviceId ? '新建用户' : '编辑用户'
    }
  },
  methods: {
    openDiag(val) {
      var that = this
      if (val) {
        this.objId = val.id
        this.formObject.model = {
          test: val.test
        }
      } else {
        this.formObject.model = {
          test: ''
        }
      }
      setTimeout(() => {
        that.dialogFormVisible = true
      }, 1)
    },
    saveSubmitInfo() {
      var that = this
      this.$refs[that.formObject.ref].validate(valid => {
        if (valid) {
          const paramsData = {
            test: that.formObject.model.test
          }
          that.$http.post('/test/save', paramsData, function(res) {
            if (res.success) {
              that.$message({
                message: '信息保存成功',
                type: 'success'
              })
              that.closeDialog()
              that.$parent.qureyInfoList()
            }
          })
        }
      })
    },
    closeDialog() {
      this.$refs[this.formObject.ref].resetFields()
      this.dialogFormVisible = false
    }
  }
};
</script>
