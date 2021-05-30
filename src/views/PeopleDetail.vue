<template>
  <div>
    <a-page-header :title="title" @back="$router.go(-1)"/>
    <div style="padding: 20px">
      <a-form-model :model="peopleInfo">
        <a-form-model-item label="名称">
          <a-input v-model="peopleInfo.name" placeholder="名称"/>
        </a-form-model-item>
        <a-form-model-item label="性别">
          <a-radio-group v-model="peopleInfo.gender">
            <a-radio :value="1">男</a-radio>
            <a-radio :value="2">女</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="范围">
          <a-radio-group v-model="peopleInfo.scope">
            <a-radio :value="1">成人</a-radio>
            <a-radio :value="2">孩童</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-textarea placeholder="描述" :rows="3" v-model="peopleInfo.desc"/>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="onSubmit">保存</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>
<script>

import mapper from '@/api/people'

export default {
  data () {
    return {
      title: '新人',
      peopleInfo: {
        name: '',
        desc: '',
        // 性别 1男 2女
        gender: 1,
        // 范围 1成人 2孩童
        scope: 1,
      }
    }
  },
  created () {
    const peopleId = this.$route.query.id
    if (peopleId) {
      this.info(peopleId)
    }
    // console.log(peopleId)
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    onSubmit () {
      const peopleName = this.peopleInfo.name
      if (!peopleName) {
        this.$message.error('请输入名称')
        return
      }
      const peopleId = this.peopleInfo.id
      delete this.peopleInfo.id
      if (peopleId) {
        mapper.update(peopleId, this.peopleInfo)
      } else {
        mapper.insert(this.peopleInfo, result => {
        })
      }
      this.$message.success('保存成功')
      this.$router.go(-1)
    },
    info (id) {
      mapper.findById(id, result => {
        this.peopleInfo = result
        this.peopleInfo.id = parseInt(id)
        this.title = this.peopleInfo.name
      })
    }
  },
}
</script>

<style>
.element::-webkit-scrollbar {
  display: none
}
</style>
