<template>
	<view class="goods-item" @click="goodsClickHandler">
	    <view class="image-box">
            <radio v-if="showRadio" color="#d81e06" :checked="goods.checked" @click="radioChangeHandler"></radio>
	        <image :src="goods.goods_small_logo || '/static/no-image.png'"></image>
	    </view>
	    <view class="info-box">
	        <view class="name">
	            {{goods.goods_name}}
	        </view>
	        <view class="price">
	            <text class="price-value">￥{{goods.goods_price | money}}</text>
                <uni-number-box v-if="showCount" :min="1" :value="goods.count" @change="numberChangeHandler"></uni-number-box>
	        </view>
	    </view>
	</view>
</template>

<script>
	export default {
        props:{
            goods: {
                type: Object,
                default: {}
            },
            // 外界使用 show-radio
            showRadio: {
                type: Boolean,
                default: false
            },
            // 外界使用 show-count
            showCount: {
                type: Boolean,
                default: false
            }
        },
		data() {
			return {
				
			};
		},
        filters: {
            money(value){
                return value.toFixed(2)
            }
        },
        methods: {
            goodsClickHandler(){
                this.$emit('click')
            },
            radioChangeHandler(){
                const { goods_id: id, checked } = this.goods;
                
                this.$emit('check-change', { id, checked: !checked });
            },
            numberChangeHandler(count) {
                const { goods_id: id } = this.goods;
                
                this.$emit('count-change', { id, count: + count })
            }
        }
	}
</script>

<style lang="less">
    .goods-item {
        display: flex;
        box-sizing: border-box;
        padding: 10px;
        border-bottom: 1px solid #eee;
        .image-box {
            display: flex;
            align-items: center;
            
            image {
                width: 100px;
                height: 100px;
            }
        }
        
        .info-box {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
            
            .name {
                font-size: 13px;
            }
            
            .price {
                display: flex;
                align-items: center;
                justify-content: space-between;
                
                text.price-value {
                    color: #f00;
                }
            }
        }
    }
</style>
