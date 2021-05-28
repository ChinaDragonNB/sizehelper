<template style="height: 100%">
  <div style="height: 100%">
    <a-page-header title="服装列表" @back="() => this.$router.push('/')" style="background-color: #389FD6;"/>
    <div class="box">
      <a-row :gutter="8" align="middle" class="row" v-for="item in clothesList">
        <a-col class="gutter-row" :span="8">
          <div class="gutter-box">
            <a-card class="card" hoverable>
              <img slot="cover" :src="item.goodsImg"/>
            </a-card>
          </div>
        </a-col>
      </a-row>

    </div>
  </div>

</template>

<script>


export default {
  data () {
    return {
      clothesList: [
        {
          category: 1,
          goodsName: '白糖玫瑰39℃防晒衣',
          clothesLen: 70,
          shoulderWidth: 57.5,
          bust: 130,
          sleeveLen: 60,
          goodsImg: require('../assets/clothes/img1.jpg')
        }
      ],
      clothesInfo: {
        // 服装类别 1外套 2上衣 3裤子
        category: 0,
        // 商品名
        goodsName: '',
        // 尺码
        size: 'L',
        // 衣长
        clothesLen: '',
        // 肩宽
        shoulderWidth: '',
        // 胸围
        bust: '',
        // 袖长
        sleeveLen: '',
        // 商品图片
        goodsImg: '',
      }
    }
  }
}

</script>

<style scoped>
.box {
  padding: 5px;
  height: 497px;
  background-color: #F5F5F5;
}

.card {
  padding: 5px;
  border-radius: 5%;
  overflow: hidden;
  background-color: #FFF;
}

.card img {
  border-radius: 5%;
}

.gutter-row {
  margin-top: 5px;
}
</style>
