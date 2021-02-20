const ADDRESS_KEY = 'ADDRESS';

export default {
    namespaced: true,
    
    state(){
        return {
            address: uni.getStorageSync(ADDRESS_KEY) || null
        }
    },
    
    getters: {
        addressText({ address }){
            let text = '';
            
            if (address) {
                // 先取数据，改名。
                const { provinceName: p, cityName: c, countyName: a, detailInfo: d } = address;
                
                text = `${p} ${c} ${a} ${d}`;
            }
            
            return text;
        }
    },
    
    mutations: {
        // 地址信息持久化存储。
        save({ address }){
            uni.setStorageSync(ADDRESS_KEY, address);
        },
        setAddress(state, address){
            state.address = address;
            
            // 持久化保存。
            this.commit('m_user/save')
        }
    }
}