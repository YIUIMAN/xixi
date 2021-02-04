<template>
	<view class="goods-item" @click="goodsClickHandler">
	    <view class="image-box">
	        <image :src="goods.goods_small_logo || '/static/no-image.png'"></image>
	    </view>
	    <view class="info-box">
	        <view class="name">
	            {{goods.goods_name}}
	        </view>
	        <view class="price">
	            ￥{{goods.goods_price | money}}
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
            
            .name {
                font-size: 13px;
            }
            
            .price {
                color: #f00;
            }
        }
    }
</style>
