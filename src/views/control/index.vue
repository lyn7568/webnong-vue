<template>
  <div class="app-container">
    <div class="content-container">
      <div class="main-info">
        <el-form :model="formObj" ref="formObj" :rules="rulesObj" label-width="100px" class="update-wrapper demo-ruleForm" v-loading="formLoading">
          <el-row :gutter="25">
            <el-col :lg="14" :md="18" :xs="24">
              <el-col :lg="12" :md="12" :xs="24">
                <el-form-item label="商品名称" prop="name">
                  <el-input v-model="formObj.name" placeholder="请填写商品名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="12" :md="12" :xs="24" v-if="goodsId">
                <el-form-item label="商品编号" prop="sn">
                  <span>{{formObj.sn}}</span>
                  <!-- <el-input v-if="!goodsId" v-model="formObj.sn" placeholder="请填写商品编号"></el-input>  -->
                </el-form-item>
              </el-col>
              <el-col :lg="12" :md="12" :xs="24">
                <el-form-item label="商品分类" prop="categorycode">
                  <el-select style="width:100%" v-model="formObj.categorycode" placeholder="请选择商品分类">
                    <el-option
                      v-for="item in goodsCategory"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :lg="12" :md="12" :xs="24">
                <el-form-item label="商品限购" prop="limitNum">
                  <el-input-number v-model="formObj.limitNum" @change="handleChangeNum" label="设置限购数量"></el-input-number>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :lg="24" :md="24" :xs="24">
              <el-col :span="24">
                <el-form-item prop="specs" label-width="0">
                  <el-form :model="typeObj" ref="typeObj" :rules="rulesTypeObj" class="form-type-demo" v-loading="typeLoading">
                    <el-row :gutter="25">
                      <el-col :span="24">
                        <el-form-item>
                          <el-button
                            size="middle" type="primary" @click="handleAdd">添加商品类别</el-button>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-table :data="formObj.specs" height="300px" border class="table-show" @row-dblclick="handleEdit">
                          <el-table-column v-for="item in tableItem" :key="item.index" :prop="item.prop ? item.prop : ''" :label="item.tit ? item.tit : ''"
                            :width="item.width ? item.width : ''" align="center">
                            <template slot-scope="scope">
                              <img v-if="item.image" :src="scope.row[item.prop]" width="160">
                              <div v-else-if="scope.row[item.prop]">{{scope.row[item.prop]}}</div>
                              <div class="operate-row" v-if="item.operate && typeof scope.row === 'object'">
                                <el-button type="text"
                                  @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
                                <el-button
                                  size="mini" type="text"
                                  @click="handleDel(scope.$index)">移除</el-button>
                              </div>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item style="margin-top: 20px;" label-width="0">
                  <el-button type="primary" @click="submitSaveForm('formObj')">保存</el-button>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
        <editType ref="typeInfoDialog"></editType>
      </div>
    </div>
  </div>
</template>

<script>
  import { requiredTip } from '@/utils/validator'

  import { urlParse } from '@/utils'
  import uploadFile from '@/components/UploadFile'
  import editType from './editType'

  export default {
    data() {
      // var validSN = (rule, value, callback) => {
      //   if (!value) {
      //     callback(new Error('请填写商品编号'))
      //   } else {
      //     if (!this.goodsId) {
      //       this.$http.post('/sm/goods/isNameExist.do', { sn: value }, function(res) {
      //         if (res.meta.state === '000000') {
      //           if (res.data) {
      //             callback(new Error('该商品编号已存在，请重新填写'))
      //           } else {
      //             callback()
      //           }
      //         }
      //       })
      //     } else {
      //       callback()
      //     }
      //   }
      // }
      return {
        goodsId: '',
        goodsCategory: [],
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
            tit: '图片路径',
            image: true,
            width: 300
          },
          {
            operate: true,
            tit: '操作',
            width: 100
          }
        ],
        formLoading: false,
        formObj: {
          name: '',
          sn: '',
          categorycode: '',
          limitNum: 0,
          specs: []
        },
        rulesObj: {
          name: [{ required: true, message: requiredTip('商品名称'), trigger: 'blur' }]
          // sn: [{ required: true, validator: validSN, trigger: 'blur' }]
        },
        typeObj: {
          id: '',
          colorname: '',
          stock: '',
          unit: '',
          bid: '',
          price: '',
          separationprice: '',
          marketprice: '',
          img: ''
        },
        typeLoading: false,
        rulesTypeObj: {}
      }
    },
    components: {
      uploadFile,
      editType
    },
    computed: {
    },
    created() {
      this.getCategory()
      if (urlParse('id')) {
        this.goodsId = urlParse('id')
        this.queryGoodInfo()
      }
    },
    methods: {
      getCategory() {
        var that = this
        this.$http.post('/sm/goods/getCategory.do', {}, function(res) {
          if (res.meta.state === '000000') {
            that.goodsCategory = res.data
          }
        })
      },
      queryGoodInfo() {
        var that = this
        this.$http.post('/sm/goods/getById.do', {
          id: that.goodsId
        }, function(res) {
          that.formLoading = false
          if (res.meta.state === '000000') {
            const obj = res.data
            that.formObj = obj
          }
        })
      },
      handleAdd() {
        this.$refs.typeInfoDialog.showFormInfo()
      },
      handleEdit(row, index) {
        this.$refs.typeInfoDialog.showFormInfo(row, index)
      },
      handleDel(index) {
        var that = this
        this.$confirm('确认移除此条数据?', '提示', {
          type: 'warning',
          callback: action => {
            if (action === 'confirm') {
              that.typeLoading = true
              setTimeout(function() {
                that.formObj.specs.splice(index, 1)
                that.typeLoading = false
              }, 100)
            }
          }
        })
      },
      handleChangeNum(val) {
        console.log(val)
        this.formObj.limitNum = val
      },
      submitSaveForm(formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const form = that.formObj
            if (!form.specs.length) {
              that.$message({
                type: 'warning',
                message: '请添加商品分类'
              })
              return
            }
            that.formLoading = true
            var params = {
              name: form.name,
              sn: form.sn,
              limitNum: form.limitNum,
              isShow: true,
              categorycode: form.categorycode,
              specs: form.specs
            }
            if (that.goodsId) {
              params = {
                id: that.goodsId,
                name: form.name,
                limitNum: form.limitNum,
                isShow: true,
                sn: form.sn,
                categorycode: form.categorycode,
                specs: form.specs
              }
            }
            that.$http.post('/sm/goods/save.do', JSON.stringify(params), function(res) {
              that.formLoading = false
              if (res.meta.state === '000000') {
                that.$message({
                  message: '商品信息保存成功！',
                  type: 'success'
                })
                that.$refs[formName].resetFields()
                that.$router.replace({ name: 'manageGoods' })
              } else {
                that.$error(res.data)
                return
              }
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-form-item .el-form-item{
    margin-bottom: 22px;
  }
  .form-type-demo{
    border: 1px dashed #d0d0d0;
    border-radius: 6px;
    padding: 20px;
  }
  .space-form-item{
    height:40px;
  }
  .main-info{
    background-color: #ffffff;
    padding:20px;
  }
</style>
