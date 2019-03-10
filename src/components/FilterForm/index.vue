<template>
  <el-form :inline="true" :model="formObject.model" class="form-class">
    <el-form-item v-for="item in formObject.arr" :key="item.index" :label="item.tit + ' :'">
      <el-date-picker v-if="item.date" v-model="formObject.model[item.prop]" type="date"></el-date-picker>
      <el-input v-else v-model="formObject.model[item.prop]"></el-input>
    </el-form-item>
    <el-form-item style="float:right">
      <el-button type="primary" @click="$emit(formObject.fun)">新建</el-button>
    </el-form-item>
    <el-form-item style="float:right">
      <el-button type="primary" @click="$emit(formObject.fun)">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// formObject: {
//   model: {}, //form表单的value
//   arr: [ // form-item数组
//     {
//       tit: '',
//       prop: ''
//     }
//   ],
//   fun: '' //提交函数
// }
export default {
  props: {
    formObject: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
.form-class{
  &.el-form {
    overflow: hidden;
    width: 100%;
    .el-form-item{
      border-radius: .125rem;
      background: #fff;
      .el-form-item__label {
          padding: 1px 0.3rem 0;
          line-height: 1rem;
          font-size: .4rem;
          border-radius: .125rem;
          background-color: $--color-sub;
          color: #fff;
          height: 100%;
      }
      .el-form-item__content{
        line-height: 1rem;
      }
      .el-input, .el-input__inner, .el-date-editor.el-input, .el-date-editor.el-input__inner{
        line-height: 1rem;
        height: 1rem;
        color: #000;
        width: 4.75rem;
        font-size: .4rem;
        border: none;
      }
      .el-input__icon{
        line-height: 1rem;
        color: $--color-sub;
      }
      .el-button{
        padding: 0 .85rem;
        line-height: 1rem;
        font-size: .4rem;
        border-color: $--color-primary;
        border-radius: .125rem;
      }
    }
  }
}
</style>
