const CART_KEY = 'CART'

export default {
    namespaced: true,
    
    // 状态。
    state() {
        return {
            // 拿到本地存储持久化的数据（默认没有就为空数组[]）。
            cart: uni.getStorageSync(CART_KEY) || []
        }
    },
    // 计算属性。
    getters: {
        // 购物车商品总数量。
        // 参数1： state
        total({ cart }) {
            // reduce 两个参数：1. 循环回调；2. 初始值；
            // 1.1 循环回调参数（上一次加好的值【第一次循环为初始值】，当前循环项， 循环索引，原始数组）
            // 1.2 回调中返回每一次加好的值，供给下一次循环作为 prev 的值。
            // 1.3 最后一次循环的返回累加结果，则为 reduce 方法的最终求和的值。
            return cart.reduce((prev, i) => i.count + prev, 0)
        }
    },
    // 方法。
    mutations: {
        // 持久化存储。
        save({ cart }){
            uni.setStorageSync(CART_KEY, cart);
        },
        // 参数1： state；参数2：传递的对象。没有后续形参！
        // 添加到购物车。
        addToCart({ cart }, goods) {
            // 1. 找商品，如果找不到，那么就添加；
            // 2. 如果找得到，那么修改数量值。
            // 顺便修改法。
            cart.some(i => i.goods_id === goods.goods_id && i.count++) || cart.push({ ...goods, count: 1, checked: true });
        
            // 持久化保存。
            this.commit('m_cart/save');
        },
        // 修改购物车勾选状态。
        changeGoodsChecked({ cart }, { id, checked }){
            // 找到对应 ID 的商品，并且修改对应商品的最新的勾选值。
            cart.find(i => i.goods_id === id).checked = checked;
            
            // 持久化保存。
            this.commit('m_cart/save');
        },
        // 修改购物车数量。
        changeGoodsCount({ cart }, { id, count }) {
            // 找到对应 ID 的商品，并且修改对应商品的最新的数量值。
            cart.find(i => i.goods_id === id).count = count;
            
            // 持久化保存。
            this.commit('m_cart/save');
        },
        // 删除购物车中商品。
        removeGoods({ cart }, { id }) {
            // 找到对应商品并进行删除。
            // 顺便删除法。（splice 返回的永远是数组 []，数组永远为【真】）
            cart.some((i, idx, arr) => i.goods_id === id && arr.splice(idx, 1));
            
            // 持久化保存。
            this.commit('m_cart/save');
        }
    }
}