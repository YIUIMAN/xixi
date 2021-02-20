export default {
    namespaced: true,
    
    state(){
        return {
            address: null
        }
    },
    
    getters: {
        
    },
    
    mutations: {
        setAddress(state, address){
            state.address = address;
        }
    }
}