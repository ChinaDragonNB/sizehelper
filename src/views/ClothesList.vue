<template style="height: 100%">
  <div style="height: 100%">
    <a-page-header title="服装列表" @back="() => $router.push('/')" :ghost="false"/>
    <a-icon type="plus" style="position: absolute;right: 40px;top: 25px;cursor: pointer" @click="addClothes()"/>
    <div class="box">
      <a-row :gutter="10" align="middle" class="row">
        <a-col class="gutter-row" :span="12" v-for="item in clothesList" :key="item.id">
          <div class="gutter-box">
            <a-card class="card" hoverable>
              <img slot="cover" alt="example" :src="getGoodsImg(item.goodsImg)"/>
              <template slot="actions" class="ant-card-actions">
                <a-icon key="setting" type="setting" @click="edit(item)"/>
                <a-icon key="ellipsis" type="delete" @click="del(item)"/>
              </template>
              <a-card-meta :title="item.name" :description="item.desc" style="height: 50px"></a-card-meta>
            </a-card>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>

</template>

<script>


import mapper from '@/api/clothes'

export default {
  data () {
    return {
      peopleId: null,
      clothesList: []
    }
  },
  created () {
    this.peopleId = this.$route.query.peopleId
    if (!this.peopleId) {
      this.$router.push('/')
    }
    this.listClothes()
  },
  methods: {
    listClothes () {
      mapper.findAll(this.peopleId, result => {
        this.clothesList = result
      })
    },
    getGoodsImg (img) {
      if (!img || img === '') {
        return require('../assets/clothes/loading.png')
      }
      return img
    },
    addClothes () {
      this.$router.push({
        path: '/clothesDetail',
        query: {
          peopleId: this.peopleId
        }
      })
    },
    edit (item) {
      this.$router.push({
        path: '/clothesDetail',
        query: {
          peopleId: this.peopleId,
          id: item.id
        }
      })
    },
    del (info) {
      const _this_ = this
      this.$confirm({
        title: '确定删除“' + info.name + '”的尺码信息吗？',
        okText: '是',
        cancelText: '否',
        onOk () {
          mapper.delete(info.id)
          _this_.clothesList.forEach(function (item, index, array) {
            if (item.id === info.id) {
              _this_.$message.success('删除成功')
              _this_.clothesList.splice(index, 1)
            }
          })
        }
      })
    }
  }
}

</script>

<style scoped>
.box {
  padding: 5px;
  height: 90%;
  /*background-color: #F5F5F5;*/
}

.card {
  /*padding: 5px;*/
  border-radius: 5%;
  overflow: hidden;
  background-color: #FFF;

}

.card img {
  /*border-radius: 5%;*/
}

.gutter-row {
  margin-top: 5px;
}

.extra {
  display: inline;
  padding-top: 12px;
  float: right;
}

</style>
