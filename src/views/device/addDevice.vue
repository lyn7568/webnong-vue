<template>
  <el-dialog class="dialogClass" :title="dialogTit" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
    <el-form :model="formObject.model" :ref="formObject.ref" :rules="formObject.rules">
      <el-form-item v-for="item in formObject.arr" :key="item.index" :label="item.tit + ' :'" :prop="item.prop">
        <el-select v-if="item.select" v-model="formObject.model[item.prop]">
          <el-option v-for="sel in selectOptionsAddress" :key="sel.index" :label="sel.name" :value="sel.id"></el-option>
        </el-select>
        <el-input v-else v-model="formObject.model[item.prop]"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <div class="form-tip">注：所有信息均为必填项</div>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
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
      selectOptionsAddress: [],
      formObject: {
        ref: 'formName',
        model: {
          test: ''
        },
        rules: {
          test: [{ required: true, message: '请输入设备名称', trigger: 'blur' }]
        },
        arr: [
          {
            prop: 'name',
            tit: '设备名称'
          },
          {
            prop: 'ip',
            tit: '设备地址'
          },
          {
            prop: 'type',
            tit: '设备类型'
          },
          {
            prop: 'address',
            tit: '使用地点',
            select:true
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
          }
        ]
      }
    };
  },
  computed: {
    dialogTit() {
      return  '新建设备'
    },
    UID() {
      return this.$store.getters.userid
    }
  },
  created() {
    this.queryUserAreaList()
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
          // const paramsData = {
          //   test: that.formObject.model.test
          // }
          // that.$http.post('/test/save', paramsData, function(res) {
          //   if (res.success) {
          //     that.$message({
          //       message: '信息保存成功',
          //       type: 'success'
          //     })
          //     that.$refs[that.formObject.ref].resetFields()
          //     that.dialogFormVisible = false
          //     that.$parent.qureyInfoList()
          //   }
          // })
        }
      })
    },
    queryUserAreaList(){
      var that = this
      that.$http.post('/esn/getUserAreaByUserId', {
        'userId': that.UID
      }, function(res) {
        if (res.success) {
          that.selectOptionsAddress=res.data;
        }
      })
    }
  }
};
</script>
