<template>
	<view>
		<!-- 商品列表区域 -->
        <view class="goods-list">
            <!-- 没每一件商品 -->
            <my-goods-item v-for="(i, idx) in goodsList" :key="idx" :goods="i" @click="goGoodsDetail(i.goods_id)"></my-goods-item>
        </view>
        <view class="full-tips" v-if="isFull">
            我是有底线的，没有更多了~
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
                total: 1,
                
                isLoading: false
			};
		},
        computed:{
            isFull(){
                return this.goodsList.length >= this.total;
            }
        },
        onLoad({ cid = '', query = '' }){
            this.cid = cid;
            this.query = query;
            
            this.getGoodsList()
        },
        onReachBottom(){
            if (this.isLoading || this.isFull) return;
            // 页码值自增加一。
            this.pagenum = this.pagenum + 1;
            
            // 获取新的列表。
            this.getGoodsList();
        },
        onPullDownRefresh(){
            // 重置数据。
            this.pagenum = 1;
            this.goodsList = [];
            this.isLoading = false;
            
            // 重新获取商品列表。
            this.getGoodsList(true);
        },
        methods: {
            goGoodsDetail(id){
                uni.navigateTo({
                    url: '/sub/goods_detail/goods_detail?id=' + id
                })
            },
            async getGoodsList(isRefresh = false){
                // 拿到基本数据。
                const { query, cid, pagenum, pagesize } = this;
                this.isLoading = true;
                
                // try ... catch ... finally
                try {
                    // 发送请求获取数据。
                    const {data: res} = await uni.$http.get('/goods/search', { query, cid, pagenum, pagesize });
                    
                    if (res.meta.status === 200) {
                        this.goodsList = this.goodsList.concat(res.message.goods);
                        this.total = res.message.total;
                    }
                } finally {
                    this.isLoading = false;
                    isRefresh && uni.stopPullDownRefresh();
                }
            }
        }
	}
</script>

<style lang="less">
    .full-tips {
        text-align: center;
        line-height: 28px;
        background-color: #f1f1f1;
        color: #ccc;
        font-size: 12px;
    }
</style>
