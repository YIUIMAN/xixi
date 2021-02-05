import { mapGetters } from 'vuex'

export default {
    onShow(){
        this.setTabBadge();
    },
    computed: {
        ...mapGetters('m_cart', ['total'])
    },
    methods: {
        setTabBadge(){
            uni.setTabBarBadge({
                index: 2, text: '' + this.total
            })
        }
    }
}