<template>
	<view>
		<!-- 轮播图区域 -->
        <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
            <swiper-item v-for="(i, idx) in swiperList" :key="idx">
                <navigator class="swiper-item" :url="i.goods_id | detailUrl">
                    <image :src="i.image_src"></image>
                </navigator>
            </swiper-item>
        </swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: []
			};
		},
        filters:{
            detailUrl(id){
                return '/sub/goods_detail/goods_detail?id=' + id
            }
        },
        // 页面一加载执行。
        onLoad(){
            // 获取轮播图数据。
            this.getSwiperList();
        },
        methods: {
            async getSwiperList(){
                const { data: res } = await uni.$http.get('/home/swiperdata')
                console.log(res)
                res.meta.status === 200 && (this.swiperList = res.message);
            }
        }
	}
</script>

<style lang="less">
.swiper {
    height: 340rpx;
    
    .swiper-item,
    image {
        width: 100%;
        height: 100%;
    }
}
</style>
