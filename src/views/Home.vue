<template>
  <div>
    <a-layout-header style="background: #389FD6;color: #fff;text-align: center">
      <a-button shape="circle" icon="plus" @click="addPeople()"/>
    </a-layout-header>
    <div class="box">
      <a-list item-layout="horizontal" :data-source="peoples">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a slot="actions">
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-icon type="down"/>
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="size" @click="size(item)">尺码</a-menu-item>
                <a-menu-item key="info" @click="info(item)">信息</a-menu-item>
                <a-menu-item key="del" @click="del(item)"> 删除</a-menu-item>
              </a-menu>
            </a-dropdown>
          </a>
          <a-list-item-meta :description="item.desc">
            <span slot="title" class="title">{{ item.name }}</span>
            <a-avatar slot="avatar" :src="getAvatar(item.gender,item.scope)" :size="45"/>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>
<script>
import male from '@/assets/people/male.png'
import female from '@/assets/people/female.png'
import child from '@/assets/people/child.png'
import mapper from '@/api/people'

export default {
  data () {
    return {
      peoples: [],
    }
  },
  created () {
    this.listPeople()
  },
  methods: {
    listPeople () {
      mapper.findAll(result => {
        this.peoples = result
      })
    },
    addPeople () {
      this.$router.push({
        path: '/peopleDetail'
      })
    },
    info (item) {
      this.$router.push({
        path: '/peopleDetail',
        query: { id: item.id }
      })
    },
    del (info) {
      const _this_ = this
      this.$confirm({
        title: '确定删除“' + info.name + '”吗？',
        okText: '是',
        cancelText: '否',
        onOk () {
          mapper.delete(info.id)
          _this_.peoples.forEach(function (item, index, array) {
            if (item.id === info.id) {
              _this_.$message.success('删除成功')
              _this_.peoples.splice(index, 1)
            }
          })
        }
      })
    },
    size (info) {
      this.$router.push({
        path: '/clothes',
        query: {
          peopleId: info.id
        }
      })
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
