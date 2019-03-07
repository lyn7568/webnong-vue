<template>
  <el-dialog title="商品类别" :visible.sync="typeInfoDialog" width="720px">
    <el-form :model="typeObj" ref="typeObj" :rules="rulesTypeObj" label-width="66px" class="form-type-demo" v-loading="typeLoading">
      <el-row :gutter="25">
        <el-col :span="item.span||''" v-for="item in formItem" :key="item.index">
          <el-form-item v-if="item.prop" :label="item.tit" :prop="item.prop">
            <uploadFile v-if="item.upload" :upImgsStr="typeObj[item.prop]" :uploadImg="uploadImg" @uploadfun="uploadfun"></uploadFile>
            <el-input v-else-if="item.float" type="number" v-model="typeObj[item.prop]" :placeholder="`请填写商品${item.tit}`" @keyup.native="handleInput" class="number__input"></el-input>
            <el-input v-else v-model="typeObj[item.prop]" :placeholder="`请填写商品${item.tit}`"></el-input>
          </el-form-item>
          <el-form-item v-else class="space-form-item"></el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-button
              size="middle" type="primary"
              @click="handleSaveType('typeObj')">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
  import { requiredTip, checkFloatNum } from '@/utils/validator'
  import uploadFile from '@/components/UploadFile'

  export default {
    data() {
      return {
        editId: false,
        formItem: [
          {
            span: 12,
            prop: 'colorname',
            tit: '颜色',
            required: true
          },
          {
            span: 12,
            prop: 'stock',
            tit: '库存',
            required: true
          },
          {
            span: 12,
            prop: 'unit',
            tit: '单位',
            required: true
          },
          {
            span: 12
          },
          {
            span: 12,
            prop: 'bid',
            tit: '进价',
            float: true,
            required: true
          },
          {
            span: 12,
            prop: 'price',
            tit: '售价',
            float: true,
            required: true
          },
          {
            span: 12,
            prop: 'separationprice',
            tit: '分润价',
            float: true,
            required: true
          },
          {
            span: 12,
            prop: 'marketprice',
            tit: '市场价',
            float: true,
            required: true
          },
          {
            span: 24,
            prop: 'imgBig',
            tit: '图片',
            required: true,
            upload: true
          }
        ],
        typeInfoDialog: false,
        typeLoading: false,
        typeObj: {
          id: '',
          colorname: '',
          stock: '',
          unit: '',
          bid: '',
          price: '',
          separationprice: '',
          marketprice: '',
          imgBig: '',
          img: ''
        },
        rulesTypeObj: {},
        uploadImg: {
          url: '/sm/file/upload.do',
          tip: '上传商品图片',
          width: '280px',
          height: '200px'
        }
      }
    },
    components: {
      uploadFile
    },
    watch: {
      typeInfoDialog(val) {
        !val && setTimeout(() => {
          this.$refs['typeObj'].clearValidate()
        }, 0)
      }
    },
    created() {
      this.pushRulesFn()
    },
    methods: {
      pushRulesFn() {
        const formItem = this.formItem
        const rulesTypeObj = this.rulesTypeObj
        for (let i = 0; i < formItem.length; ++i) {
          const ru = []
          if (formItem[i].required) {
            ru.push({ required: true, message: requiredTip(formItem[i].tit), trigger: 'blur' })
          }
          rulesTypeObj[formItem[i].prop] = ru
        }
      },
      showFormInfo(row, index) {
        var that = this
        if (row) {
          that.typeObj = row
          that.editId = true
          that.editIndex = index
        } else {
          that.editId = false
          that.typeObj = {
            id: '',
            colorname: '',
            stock: '',
            unit: '',
            bid: '',
            price: '',
            separationprice: '',
            marketprice: '',
            imgBig: '',
            img: ''
          }
        }
        setTimeout(function() {
          that.typeInfoDialog = true
        }, 100)
      },
      handleSaveType(formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.typeLoading = true
            const specsItm = {
              id: that.typeObj.id,
              colorname: that.typeObj.colorname,
              stock: that.typeObj.stock,
              unit: that.typeObj.unit,
              bid: that.typeObj.bid,
              price: that.typeObj.price,
              separationprice: that.typeObj.separationprice,
              marketprice: that.typeObj.marketprice,
              imgBig: that.typeObj.imgBig,
              img: that.typeObj.img
            }
            setTimeout(function() {
              if (that.editId) {
                that.$parent.formObj.specs[that.editIndex] = specsItm
              } else {
                that.$parent.formObj.specs.push(specsItm)
              }
              that.$refs[formName].resetFields()
              that.typeLoading = false
              that.typeInfoDialog = false
            }, 100)
          }
        })
      },
      uploadfun(value) {
        this.typeObj.imgBig = value
        this.typeObj.img = value
      },
      handleInput(e) {
        // 通过正则过滤小数点后两位
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      }
    }
  }
</script>
<style>
  /** 去除input输入框样式 */
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
</style>
