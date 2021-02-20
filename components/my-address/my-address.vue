<template>
	<view>
        <!-- 收货信息区域 -->
        <view v-if="address" class="address-box">
            <uni-icons type="location" size="18"></uni-icons>
            <view class="info">
                <view>
                    <text class="name">{{address.userName}}</text>
                    {{address.telNumber}}
                </view>
                <view class="">
                    {{addressText}}
                </view>
            </view>
            <uni-icons type="arrowright" size="18"></uni-icons>
        </view>
        
        <!-- 选择收货地址 -->
        <view v-else class="address-choose">
            <button type="primary" size="mini" @click="chooseAddress">请选择收货地址 +</button>
        </view>
        
        
		
        <!-- 分割线 -->
        <image class="separateline" src="../../static/cart_border@2x.png" mode=""></image>
	</view>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    
	export default {
		data() {
			return {
				// address: null
			};
		},
        computed: {
            ...mapState('m_user', ['address']),
            addressText(){
                let text = '';
                
                if (this.address) {
                    // 先取数据，改名。
                    const { provinceName: p, cityName: c, countyName: a, detailInfo: d } = this.address;
                    
                    text = `${p} ${c} ${a} ${d}`;
                }
                
                return text;
            }
        },
        methods: {
            ...mapMutations('m_user', ['setAddress']),
            async chooseAddress() {
                const [err, info] = await uni.chooseAddress();
                
                if (info) {
                    // this.address = info;
                    this.setAddress(info)
                    console.log(this.address)
                } else {
                    
                }
            }
        }
	}
</script>

<style lang="less">
    .address-choose {
        display: flex;
        justify-content: center;
        align-items: center;
        
        height: 80px;
    }
    
    .address-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        uni-icons {
            width: 40px;
            text-align: center;
        }
        
        .info {
            flex-grow: 1;
            font-size: 13px;
            
            > view {
                margin: 10px 0;
            }
            
            .name {
                font-size: 15px;
                font-weight: bold;
                margin-right: 5px;
            }
        }
    }
    
    .separateline {
        display: block;
        width: 750rpx;
        height: 15rpx;
    }
</style>
