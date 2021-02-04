<template>
	<view>
		<!-- 商品列表区域 -->
        <view class="goods-list">
            <!-- 没每一件商品 -->
            <view class="goods-item" v-for="(i, idx) in goodsList" :key="idx">
                <view class="image-box">
                    <image :src="i.goods_small_logo" mode=""></image>
                </view>
                <view class="info-box">
                    <view class="name">
                        {{i.goods_name}}
                    </view>
                    <view class="price">
                        ￥{{i.goods_price}}
                    </view>
                </view>
            </view>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				query: '',
                cid: '',
                pagenum: 1,
                pagesize: 10,
                
                goodsList: [],
                total: 0
			};
		},
        onLoad({ cid = '', query = '' }){
            this.cid = cid;
            this.query = query;
            
            this.getGoodsList()
        },
        methods: {
            async getGoodsList(){
                // 拿到基本数据。
                const { query, cid, pagenum, pagesize } = this;
                
                // 发送请求获取数据。
                const {data: res} = await uni.$http.get('/goods/search', { query, cid, pagenum, pagesize });
                
                if (res.meta.status === 200) {
                    this.goodsList = res.message.goods;
                    this.total = res.message.total;
                }
            }
        }
	}
</script>

<style lang="less">

</style>
