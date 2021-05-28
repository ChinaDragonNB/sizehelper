<template>
  <div>
    <div style="padding:0px 20px 20px;width: 90%;border: 1px solid red;margin: 0 auto">
      <a-form-model :model="form">
        <a-form-model-item label="名称">
          <a-input v-model="form.name"/>
        </a-form-model-item>
        <a-form-model-item label="性别">
          <a-radio-group v-model="form.resource">
            <a-radio value="1"> 男</a-radio>
            <a-radio value="2"> 女</a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      labelCol: { span: 10 },
      wrapperCol: { span: 10 },
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!', this.form)
    },
  },
}
</script>

<style>
.element::-webkit-scrollbar {
  display: none
}
</style>
