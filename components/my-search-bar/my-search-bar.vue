<template>
	<view class="search-container">
		<view class="search-box" @click="boxClick">
		    <uni-icons class="icon" type="search" size="17"></uni-icons>
            <text>{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
        props:{
            title: {
                type: String,
                default: '搜索'
            }
        },
		data() {
			return {
				
			};
		},
        methods:{
            boxClick(){
                this.$emit('click')
            }
        }
	}
</script>

<style lang="less">
    .search-container {
        height: 50px;
        box-sizing: border-box;
        padding: 7px 10px;
        background-color: #d81e06;
        
        .search-box {
            height: 36px;
            background-color: #fff;
            border-radius: 18px;
            
            display: flex;
            justify-content: center;
            align-items: center;
            .icon {
                margin-right: 5px;
            }
        }
    }
</style>
