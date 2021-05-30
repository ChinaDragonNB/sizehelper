<template>
  <div>
    <a-page-header :title="title" @back="back()"/>
    <div style="padding: 20px">
      <a-form-model :model="clothesInfo">
        <a-form-model-item label="服装类别">
          <a-select v-model="clothesInfo.category" placeholder="选择服装类别" style="width: 90%">
            <a-select-option value="1">上装</a-select-option>
            <a-select-option value="2">下装</a-select-option>
            <a-select-option value="3">鞋子</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="服装名称">
          <a-input v-model="clothesInfo.name" style="width: 90%"/>
        </a-form-model-item>
        <a-row :gutter="10">
          <a-col :span="8">
            <a-form-model-item label="尺码">
              <a-input v-model="clothesInfo.size" style="width: 90px"/>
            </a-form-model-item>
          </a-col>
          <div v-show="clothesInfo.category==1">
            <a-col :span="8">
              <a-form-model-item label="衣长(CM)">
                <a-input-number :min="0" v-model="clothesInfo.clothesLen"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="肩宽(CM)">
                <a-input-number :min="0" v-model="clothesInfo.shoulderWidth"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="胸围(CM)">
                <a-input-number :min="0" v-model="clothesInfo.bustCir"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="袖长(CM)">
                <a-input-number :min="0" v-model="clothesInfo.sleeveLen"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="袖口(CM)">
                <a-input-number :min="0" v-model="clothesInfo.cuff"/>
              </a-form-model-item>
            </a-col>
          </div>
          <div v-show="clothesInfo.category==2">
            <a-col :span="8">
              <a-form-model-item label="裤长(CM)">
                <a-input-number :min="0" v-model="clothesInfo.pantsLen"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="腰围(CM)">
                <a-input-number :min="0" v-model="clothesInfo.waistCir"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="臀围(CM)">
                <a-input-number :min="0" v-model="clothesInfo.hipsCir"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="脚围/口(CM)">
                <a-input-number :min="0" v-model="clothesInfo.footCir"/>
              </a-form-model-item>
            </a-col>
          </div>
        </a-row>
        <a-form-model-item label="穿着描述">
          <a-input v-model="clothesInfo.desc" type="textarea" style="width: 90%"/>
        </a-form-model-item>
        <a-form-model-item label="商品图片">
          <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
            <img v-if="clothesInfo.goodsImg" :src="getImg()" alt="avatar" width="104" height="104"/>
            <div v-else>
              <a-icon type="plus"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="back()">返回</a-button>
          <a-button style="margin-left: 10px;" type="primary" @click="onSubmit">保存</a-button>
        </a-form-model-item>
      </a-form-model>

    </div>
  </div>
</template>
<script>

import mapper from '@/api/clothes'

export default {
  data () {
    return {
      title: '新服装',
      clothesInfo: {
        peopleId: null,
        // 服装类别 1上装 2下装 3鞋子
        category: null,
        // 服装名称
        name: '',
        // 穿着描述
        desc: '',
        // 尺码
        size: '',
        // 商品图片
        goodsImg: '',
        /**
         * 上装参数
         */
        // 衣长
        clothesLen: null,
        // 肩宽
        shoulderWidth: null,
        // 胸围
        bustCir: null,
        // 袖长
        sleeveLen: null,
        // 袖口
        cuff: null,
        /**
         * 下装参数
         */
        // 腰围
        waistCir: null,
        // 臀围
        hipsCir: null,
        // 裤长
        pantsLen: null,
        // 脚围/口
        footCir: null
      }
    }
  },
  created () {
    this.clothesInfo.peopleId = this.$route.query.peopleId
    if (!this.clothesInfo.peopleId) {
      this.$router.push('/')
    }
    const id = this.$route.query.id
    if (id) {
      this.info(id)
    }
  },
  methods: {
    back () {
      this.$router.push({
        path: '/clothes',
        query: { peopleId: this.clothesInfo.peopleId }
      })
    },
    getImg () {
      return require('@/assets/clothes/' + this.clothesInfo.goodsImg)
    },
    info (id) {
      mapper.findById(id, result => {
        this.clothesInfo = result
        this.clothesInfo.id = parseInt(id)
        this.title = this.clothesInfo.name
      })
    },
    onSubmit () {
      const category = this.clothesInfo.category
      if (!category || category == 0) {
        this.$message.error('选择服装类别')
        return
      }
      const name = this.clothesInfo.name
      if (!name || name == '') {
        this.$message.error('输入服装名称')
        return
      }
      const size = this.clothesInfo.size
      if (!size || name == '') {
        this.$message.error('输入服装尺码')
        return
      }
      const id = this.clothesInfo.id
      console.log('提交参数: ', this.clothesInfo)
      delete this.clothesInfo.id
      if (id) {
        mapper.update(id, this.clothesInfo)
      } else {
        mapper.insert(this.clothesInfo)
      }
      this.$message.success('保存成功')
      this.back()
    },
  },
}
</script>

<style scoped>
.gutter-row {
  margin-top: 5px;
}
</style>
