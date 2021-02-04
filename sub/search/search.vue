<template>
	<view>
		<view class="search-bar-box">
		    <uni-search-bar ref="searchBar" @confirm="searchGoods" @input="textChange" :radius="50" cancelButton="none" :focus="true" />
		</view>
        
        <!-- 建议列表 -->
        <view v-if="showSuggestList" class="suggest-list">
            <navigator class="item" v-for="(i, idx) in suggestList" :key="idx" :url="i.goods_id | detailUrl">
                {{i.goods_name}}
            </navigator>
        </view>
        
        <!-- 历史区域 -->
        <view v-else class="history-box">
            <!-- 标题 + 清除 -->
            <view v-if="historyList.length" class="history-title">
                <text>搜索历史</text>
                <uni-icons type="trash" :size="17" @click="clearHistory"></uni-icons>
            </view>
            <!-- 历史列表 -->
            <view class="history-list">
                <uni-tag v-for="(i, idx) in historyList" :key="idx" :text="i" type="primary" :inverted="true" @click="goGoodsList(i)"></uni-tag>
            </view>
        </view>
	</view>
</template>

<script>
    const HISTORY_KEY = 'HISTORY';
    
	export default {
		data() {
			return {
                timer: 0,
				text: '',
                suggestList: [],
                historyList: []
			};
		},
        onLoad(){
            // 从本地存储读出历史列表。
            this.historyList = uni.getStorageSync(HISTORY_KEY) || [];
        },
        computed: {
            showSuggestList(){
                return !!this.text.trim()
            }
        },
        filters: {
            detailUrl(id) {
                return '/sub/goods_detail/goods_detail?id=' + id
            }
        },
        methods: {
            textChange({ value }){
                this.text = value;
                
                // 清理快速打字产生的定时器。
                clearTimeout(this.timer);
                // 每次打字产生新的定时器。
                this.timer = setTimeout(() => this.getSuggestList(), 700)
            },
            searchGoods(){
                const clearKeyword = this.text.trim()
                this.historyList = [...new Set([clearKeyword, ...this.historyList])].slice(0, 5);
                
                // 数据持久化存储。
                uni.setStorageSync(HISTORY_KEY, this.historyList);
                
                // 搜索商品（商品列表）。
                this.goGoodsList(clearKeyword)
            },
            clearHistory(){
                uni.showModal({
                    title: '警告',
                    content: '确认清除搜索历史吗？',
                    success: res => {
                        if (res.confirm) {
                            this.historyList = [];
                            uni.setStorageSync(HISTORY_KEY, this.historyList);
                        }
                    }
                })
            },
            goGoodsList(query){
                // 强行修改文本框的值。
                this.$refs.searchBar.setText(query);
                
                uni.navigateTo({
                    url: '/sub/goods_list/goods_list?query=' + query
                });
            },
            async getSuggestList(){
                // 清理文本左右的不需要的空格。
                const clearKeyword = this.text.trim();
                
                // 判断用户是否真正输入关键字。
                if (clearKeyword) {
                    const { data: res } = await uni.$http.get('/goods/qsearch', { query: clearKeyword });
                    res.meta.status === 200 && (this.suggestList = res.message);
                } else {
                    this.suggestList = []
                }
            }
        }
	}
</script>

<style lang="less">
    .search-bar-box {
        position: sticky;
        top: 0;
    }
    
    .uni-searchbar {
        background-color: #d81e06 !important;
    }
    
    .suggest-list {
        .item {
            box-sizing: border-box;
            // display: flex;
            // justify-content: center;
            line-height: 18px;
            padding: 10px;
            border-bottom: 1px solid #eee;
            font-size: 12px;
            
            // 超出部分文本遮挡效果。
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    
    .history-box {
        padding: 10px;
        
        .history-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }
        
        .history-list {
            display: flex;
            flex-wrap: wrap;
            
            view.uni-tag {
                margin: 10px 10px 0 0;
            }
        }
    }
</style>
