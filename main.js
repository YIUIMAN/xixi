import Vue from 'vue'
import App from './App'
import {
    API
} from './utils/api'

Vue.config.productionTip = false

uni.$http = new API(
    'https://www.uinav.com/api/public/v1',
    () => uni.showLoading(),
    () => uni.hideLoading()
);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
