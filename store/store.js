import Vue from 'vue';
import Vuex from 'vuex';
import cartModule from './m_cart'

// 注册状态管理插件。
Vue.use(Vuex);

// 导出一个 存储 实例对象。
export default new Vuex.Store({
    modules: {
        m_cart: cartModule
    }
});
