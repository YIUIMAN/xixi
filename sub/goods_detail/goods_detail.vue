<template>
    <view class="goods-container" v-if="detailInfo.goods_price">
        <!-- 轮播图区域 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
            <swiper-item v-for="(i, idx) in previewImageList" :key="idx">
                <image :src="i" @click="preview(idx)"></image>
            </swiper-item>
        </swiper>
        <!-- 商品信息区域 -->
        <view class="info-container">
            <view class="price">
                ￥{{detailInfo.goods_price}}
            </view>
            <view class="title">
                <view class="name">
                    {{detailInfo.goods_name}}
                </view>
                <view class="favorite">
                    <uni-icons type="star"></uni-icons>
                    收藏
                </view>
            </view>
            <view class="express">
                邮费：免运费
            </view>
        </view>
        <!-- 图文详情 -->
        <rich-text :nodes="detailInfo.goods_introduce | parseIntroduce"></rich-text>
        <!-- 商品导航条 -->
        <view class="goods-nav-bar">
            <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onNavClick" @buttonClick="buttonClick" />
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                // 商品详情的对象。
                detailInfo: {},
                // 商品导航。
                options: [{
                    icon: 'cart',
                    text: '购物车',
                    info: 2
                }],
                buttonGroup: [{
                        text: '加入购物车',
                        backgroundColor: '#ff0000',
                        color: '#fff'
                    }
                ]
            };
        },
        computed: {
            previewImageList() {
                return (this.detailInfo.pics || []).map(i => i.pics_big_url);
            }
        },
        filters: {
            parseIntroduce(origin) {
                return origin
                    .replace(/<img/g, '<img style="display: block;"')
                    .replace(/80q.webp/g, '75p.jpg');
            }
        },
        onLoad({
            id
        }) {
            // 页面加载获取ID。
            this.getGoodsDetail(id);
        },
        methods: {
            // 请求数据的方法。
            async getGoodsDetail(id) {
                const {
                    data: res
                } = await uni.$http.get('/goods/detail', {
                    goods_id: id
                });
                res.meta.status === 200 && (this.detailInfo = res.message);
            },
            preview(current) {
                uni.previewImage({
                    current,
                    urls: this.previewImageList
                })
            },
            onNavClick({ index }){
                switch (index) {
                    case 0:
                        uni.switchTab({
                            url: '/pages/cart/cart'
                        });
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>

<style lang="less">
    .goods-container {
        padding-bottom: 50px;
    }
    
    swiper {
        height: 750rpx;

        image {
            width: 100%;
            height: 100%;
        }
    }

    .info-container {
        font-size: 12px;
        padding: 10px;
        box-sizing: border-box;

        .price {
            font-size: 18px;
            color: #f00;
        }

        .title {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;

            .favorite {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #333;
                width: 80px;
                margin-left: 10px;
                border-left: 1px solid #eee;
            }
        }

        .express {
            margin: 10px 0;
            color: #666;
        }
    }
    
    .goods-nav-bar {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
    }
</style>
