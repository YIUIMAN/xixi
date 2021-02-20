<template>
	<view>
        <!-- 收货信息区域 -->
        <view v-if="address" class="address-box" @click="chooseAddress">
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
            <button type="primary" size="mini" @click="chooseAddress">{{auth ? '请选择收货地址 +' : '请到设置面板打开[通讯地址]'}}</button>
        </view>
        
        
		
        <!-- 分割线 -->
        <image class="separateline" src="../../static/cart_border@2x.png" mode=""></image>
	</view>
</template>

<script>
    import { mapState, mapMutations, mapGetters } from 'vuex'
    
	export default {
		data() {
			return {
                auth: true
				// address: null
			};
		},
        computed: {
            ...mapState('m_user', ['address']),
            ...mapGetters('m_user', ['addressText'])
        },
        methods: {
            ...mapMutations('m_user', ['setAddress']),
            async chooseAddress() {
                if (this.auth) {
                    const [err, info] = await uni.chooseAddress();
                    
                    if (info) {
                        // this.address = info;
                        this.setAddress(info)
                        console.log(this.address)
                    } else if (err && err.errMsg.includes('fail auth')) {
                        uni.showToast({
                            title: '请先打开通讯地址的权限',
                            icon: 'none'
                        })
                        this.auth = false;
                    }
                } else {
                    uni.openSetting({
                        success: res => {
                            this.auth = res.authSetting['scope.address'] // true | false  -> auth
                            // this.auth = true
                        }
                    })
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
