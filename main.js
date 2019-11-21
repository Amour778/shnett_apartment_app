import Vue from 'vue'
import App from './App'

/*  @/components/graceChecker 验证表单函数  */

/* request组件 */
import {Base} from './components/request/base.js'
Vue.prototype.$base =  new Base()


/* 下拉选择框  */
import xflSelect from '@/components/xfl-select/xfl-select.vue';
Vue.component('xfl-select',xflSelect);

/* loading组件 */
import loading from '@/components/xuan-loading/xuan-loading'
Vue.component('loading', loading)


/*  ColorUI  */
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

/*  公告  */
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
Vue.component('uni-notice-bar',uniNoticeBar)



/******************************/
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
