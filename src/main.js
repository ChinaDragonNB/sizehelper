import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AntDesignVue from 'ant-design-vue'

Vue.use(AntDesignVue)
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
