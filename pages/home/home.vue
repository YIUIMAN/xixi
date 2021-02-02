<template>
    <view>
        <view class="search-bar-box">
            <my-search-bar @click="searchBarClickHandler"></my-search-bar>
        </view>
        <!-- 轮播图区域 -->
        <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
            <swiper-item v-for="(i, idx) in swiperList" :key="idx">
                <navigator class="swiper-item" :url="i.goods_id | detailUrl">
                    <image :src="i.image_src"></image>
                </navigator>
            </swiper-item>
        </swiper>
        
        <!-- 分类按钮区域 -->
        <view class="cate-list">
            <image v-for="(i, idx) in cateList" :key="idx" :src="i.image_src" @click="goCate(i)"></image>
        </view>
        
        <!-- 楼层区域 -->
        <view class="floor-list">
            <!-- 每一层楼 -->
            <view class="floor-item" v-for="(i, idx) in floorList" :key="idx">
                <!-- 楼层标题 -->
                <image class="floor-title" :src="i.floor_title.image_src"></image>
                <!-- 楼层小图 -->
                <view class="floor-image-container">
                    <image v-for="(i2, idx2) in i.product_list" :src="i2.image_src" :style="{width: i2.image_width + 'rpx'}" @click="goGoodsList(i2.navigator_url)"></image>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                swiperList: [],
                cateList: [],
                floorList: []
            };
        },
        filters: {
            detailUrl(id) {
                return '/sub/goods_detail/goods_detail?id=' + id
            }
        },
        // 页面一加载执行。
        onLoad() {
            // 获取轮播图数据。
            // this.getSwiperList();
            this.getList('swiperList', '/home/swiperdata');
            this.getList('cateList', '/home/catitems');
            this.getList('floorList', '/home/floordata');
        },
        methods: {
            searchBarClickHandler(){
                uni.navigateTo({
                    url: '/sub/search/search'
                })
            },
            async getList(name, partialUrl) {
                const { data: res } = await uni.$http.get(partialUrl);
                console.log(res);
                res.meta.status === 200 && (this[name] = res.message);
            },
            goCate({ name }){
                switch (name) {
                    case '分类':
                        uni.switchTab({
                            url: '/pages/cate/cate'
                        })
                        break;
                    default:
                        uni.showToast({
                            title: '建设中...',
                            icon: 'none'
                        })
                        break;
                }
            },
            goGoodsList(url) {
                uni.navigateTo({
                    url: '/sub/goods_list/goods_list?query=' + url.split('=')[1]
                })
            }
            // async getSwiperList(){
            //     const { data: res } = await uni.$http.get('/home/swiperdata')
            //     console.log(res)
            //     res.meta.status === 200 && (this.swiperList = res.message);
            // },
            // async getCateList(){
            //     const { data: res } = await uni.$http.get('/home/catitems')
            //     res.meta.status === 200 && (this.cateList = res.message);
            // }
        }
    }
</script>

<style lang="less">
    .search-bar-box {
        position: sticky;
        top: 0;
        z-index: 2;
    }
    
    .swiper {
        height: 340rpx;

        .swiper-item,
        image {
            width: 100%;
            height: 100%;
        }
    }
    
    .cate-list {
        display: flex;
        justify-content: space-around;
        padding: 15px 0;
        
        image {
            width: 128rpx;
            height: 140rpx;
        }
    }
    
    .floor-list {
        .floor-item {
            .floor-title {
                display: block;
                width: 750rpx;
                height: 59rpx;
            }
            
            .floor-image-container {
                margin-left: 15rpx;
                image {
                    float: left;
                    height: 188rpx;
                    margin: 0 10rpx 10rpx 0;
                    
                    &:first-child {
                        height: 386rpx;
                    }
                }
            }
        }
    }
</style>
