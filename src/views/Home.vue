<template>
  <div>
    <a-layout-header style="background: #389FD6;color: #fff;text-align: center">
      <a-button shape="circle" icon="plus" @click="addPeople()"/>
    </a-layout-header>
    <div class="box">
      <a-list item-layout="horizontal" :data-source="peoples">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a slot="actions">
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-icon type="down"/>
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="view" @click="size(item)">尺码</a-menu-item>
                <a-menu-item key="view" @click="info(item)">信息</a-menu-item>

                <a-menu-item key="del" @click="del(item)">删除</a-menu-item>

              </a-menu>
            </a-dropdown>
          </a>
          <a-list-item-meta :description="item.desc">
            <span slot="title" class="title">{{ item.name }}</span>
            <a-avatar slot="avatar" :src="getAvatar(item.gender,item.scope)" :size="40"/>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <a-modal :title="modal.title" :visible="modal.visible" :footer="{}" centered @cancel="close" :maskClosable="false">
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
          <a-textarea placeholder="描述" :rows="4" v-model="peopleInfo.desc"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import male from '@/assets/people/male.png'
import female from '@/assets/people/female.png'
import child from '@/assets/people/child.png'

const peoples = [
  {
    id: 1,
    name: '王小龙',
    desc: '常用的服装尺码',
    gender: 1,
    scope: 1
  },
  {
    id: 3,
    name: '王小美',
    desc: '女常用的服装尺码',
    gender: 2,
    scope: 1
  },
  {
    id: 2,
    name: '王八蛋',
    desc: '小孩常用的服装尺码',
    gender: 1,
    scope: 2
  },

]
export default {
  data () {
    return {
      peoples,
      modal: {
        title: '',
        visible: false
      },
      peopleInfo: {
        id: null,
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

  },
  methods: {
    addPeople () {
      Object.keys(this.peopleInfo).forEach(key => (this.peopleInfo[key] = ''))
      this.modal.visible = true
    },
    info (item) {
      this.modal.visible = true
      this.peopleInfo = item
    },
    del (info) {
      const _self = this
      this.$confirm({
        title: '确定删除“' + info.name + '”的尺码信息？',
        content: '数据删除后不可恢复',
        okText: '是',
        cancelText: '否',
        onOk () {
          _self.peoples.forEach(function (item, index, array) {
            if (item.id == info.id) {
              _self.$message.success('删除成功')
              _self.peoples.splice(index, 1)
            }
          })
        }
      })
    },
    close (e) {
      this.modal.visible = false
      const temp = this.peopleInfo
      const _self = this
      this.peoples.forEach(function (item, index, array) {
        if (item.id == temp.id) {
          _self.peoples[index] = temp
        }
      })
    },
    size (info) {
      this.$router.push('/clothes')
    },
    getAvatar (gender, scope) {
      if (scope == 2) {
        return child
      }
      switch (gender) {
        case 1 :
          return male
        case 2 :
          return female
      }
    }
  }
}
</script>
<style>
.box {
  padding: 10px;
}

.title {
  font-size: 16px;
  color: #000;
  font-weight: bold;
}


</style>
