<template>
    <view class="">
        <my-search-bar title="点我搜索更多" @click="searchBarClickHandler"></my-search-bar>
        
        <view class="cate-container">
            <scroll-view scroll-y="true">
                <view :class="idx === active ? 'active' : undefined" v-for="(i, idx) in cateList" :key="i.cat_id" @click="oneChangeHandler(idx)">{{i.cat_name}}</view>
            </scroll-view>
            <scroll-view scroll-y="true" :scroll-top="scrollTop">
                <view v-for="(i, idx) in secondList" :key="idx">
                    <!-- 标题（二级分类） -->
                    <view class="second-title"><text space="emsp">/ {{i.cat_name}} /</text></view>
                    <!-- 三级列表图片 -->
                    <view class="third-list">
                        <view class="item" v-for="(i3, idx3) in i.children" :key="idx3" @click="goGoodsList(i3)">
                            <!-- 小图片 -->
                            <image :src="i3.cat_icon"></image>
                            <!-- 小标题 -->
                            <text>{{i3.cat_name}}</text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
    import mixCart from '../../mixins/mixCart'
    
    export default {
        mixins: [mixCart],
        data() {
            return {
                active: 0,
                cateList: [],
                scrollTop: 0
            };
        },
        computed:{
            secondList() {
                const one = this.cateList[this.active]
                return one ? one.children : [];
            }
        },
        onLoad() {
            this.getCateList();
        },
        methods: {
            oneChangeHandler(index){
                this.active = index;
                
                this.scrollTop = - (this.scrollTop + 1);
            },
            goGoodsList({ cat_id }){
                uni.navigateTo({
                    url: '/sub/goods_list/goods_list?cid=' + cat_id
                })
            },
            searchBarClickHandler(){
                uni.navigateTo({
                    url: '/sub/search/search'
                })
            },
            async getCateList() {
                const {
                    data: res
                } = await uni.$http.get('/categories');

                res.meta.status === 200 && (this.cateList = res.message)
            }
        }
    }
</script>

<style lang="less">
    .cate-container {
        display: flex;

        scroll-view {
            height: calc(100vh - 50px);

            &:first-child {
                width: 120px;

                view {
                    height: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #f9f9f9;
                    border-bottom: 1px solid #eee;
                    position: relative;

                    &.active {
                        background-color: #fff;

                        &::before {
                            content: ' ';
                            position: absolute;
                            left: 0;
                            top: 50%;
                            width: 3px;
                            height: 30px;
                            background-color: #d81e06;
                            transform: translateY(-50%);
                        }
                    }
                }
            }
            
            .second-title {
                text-align: center;
                font-size: 24rpx;
                font-weight: bold;
                margin: 20rpx 0;
            }
            
            .third-list {
                display: flex;
                flex-wrap: wrap;
                .item {
                    width: 33.33%;
                    font-size: 24rpx;
                    margin-bottom: 20rpx;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    
                    image {
                        width: 120rpx;
                        height: 120rpx;
                    }
                }
            }
        }
    }
</style>
