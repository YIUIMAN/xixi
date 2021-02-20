<template>
	<view class="cart">
        <my-address></my-address>
		<!-- 购物车列表 -->
        <view class="cart-title">
            <uni-icons type="shop"></uni-icons>
            <text class="title-text">可结算商品</text>
        </view>
        <view class="cart-list">
            <uni-swipe-action>
                <uni-swipe-action-item v-for="(i, idx) in cart" :key="idx" :right-options="options" @click="swipeClickHandler(i.goods_id, $event)">
                    <my-goods-item :goods="i" show-radio show-count @check-change="checkChangeHandler" @count-change="countChangeHandler"></my-goods-item>
                </uni-swipe-action-item>
            </uni-swipe-action>
        </view>
	</view>
</template>

<script>
    import mixCart from '../../mixins/mixCart'
    import { mapState, mapMutations } from 'vuex'
    
	export default {
        mixins: [mixCart],
		data() {
			return {
				options:[
                    {
                        text: '删除',
                        style: {
                            backgroundColor: '#f00'
                        }
                    }, {
                        text: '收藏',
                        style: {
                            backgroundColor: '#e90'
                        }
                    }
                ]
			};
		},
        computed: {
            ...mapState('m_cart', ['cart'])
        },
        methods: {
            ...mapMutations('m_cart', ['changeGoodsChecked', 'changeGoodsCount', 'removeGoods']),
            checkChangeHandler(e){
                this.changeGoodsChecked(e)
            },
            countChangeHandler(e) {
                this.changeGoodsCount(e)
            },
            swipeClickHandler(id, { index }){
                switch (index) {
                    case 0:
                        this.removeGoods({ id })
                        break;
                    case 1:
                        console.log('收藏商品ID：' + id)
                        break;
                    default:
                        break;
                }
                
            }
        }
	}
</script>

<style lang="less">
    .cart {
        my-goods-item {
            width: 100%
        }
        
        .cart-title {
            padding: 10px;
            font-size: 13px;
            border-bottom: 1px solid #eee;
            
            .title-text {
                margin-left: 5px;
                color: #666;
            }
        }
    }
</style>
