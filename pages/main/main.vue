<template name="basics">
	<view>
		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->
		
		<scroll-view scroll-y class="page">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<view class="bg-img bg-mask flex align-center" style="height: 414upx;background-image: url('https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg')">
						<view class="padding-xl text-white">
							<view class="padding-xs text-xxl text-bold">
								{{item.title}}
							</view>
							<!-- <view class="padding-xs text-lg">
								Only the guilty need fear me.
							</view> -->
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="margin-top">
				 <uni-notice-bar @getmore="getMore" :show-get-more="true" more-text="查看更多" single="true" :text="notice"></uni-notice-bar>
			</view>
			<view v-if="USER_ROLE==0">
				<view class="nav-list">
					<navigator hover-class="none" :url="'/pages/'+item.name+'/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
					 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in Menu_User" :key="index">
						<view class="nav-title">{{item.title}}</view>
						<view class="nav-name">{{item.name}}</view>
						<text :class="'cuIcon-' + item.cuIcon"></text>
					</navigator>
				</view>
			</view>
			<view v-else-if="USER_ROLE==1">
				<view class="nav-list">
					<navigator hover-class="none" :url="'/pages/'+item.name+'/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
					 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in Menu_Admin" :key="index">
						<view class="nav-title">{{item.title}}</view>
						<view class="nav-name">{{item.name}}</view>
						<text :class="'cuIcon-' + item.cuIcon"></text>
					</navigator>
				</view>
			</view>
			<!-- <view else>
				<view class="nav-list">
					<navigator hover-class="none" :url="'/pages/'+item.name+'/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
					 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in No_Login" :key="index">
						<view class="nav-title">{{item.title}}</view>
						<view class="nav-name">{{item.name}}</view>
						<text :class="'cuIcon-' + item.cuIcon"></text>
					</navigator>
				</view>
			</view> -->
		</scroll-view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				USER_ROLE: null,
				Menu_User: this.Menu_User,
				Menu_Admin: this.Menu_Admin,
				No_Login : [{
					title: '用户确认',
					name: 'noLogin',
					color: 'pink',
					cuIcon: 'same'
				}, {
					title: '测试页',
					name: 'testPage',
					color: 'mauve',
					cuIcon: 'exit'
				}],
				dotStyle: false,
				swiperList: [{
					id: 0,
					type: 'image',
					main_img_url:"",
					title: '浙北智慧公寓'
				}],
				notice:'暂无公告'
			}
		},
		mounted() {
			_this = this;
			_this.USER_ROLE = uni.getStorageSync("USERROLE");
			var allParams = {
				url: 'queryAllNoticeInfoByLimit',
				setUpUrl: true,
				data:{
					page:1,
					limit:1
				},
				type: 'get',
				sCallback: function(data) {
					if (data.code == 1) {
						uni.showToast({
							title: '获取公告数据失败',
							icon: 'none'
						})
					} else {
						if (data.data==null || data.data.length == 0) {
							_this.notice='暂无公告';
						} else {
							_this.notice=data.data[0].info;
						}
			
					}
				}
			};
			_this.$base.request(allParams, _this);
		},
		methods: {
			getMore(){
				uni.navigateTo({
				    url: '../notice/notice'
				});
			},
		}
	}
</script>

<style>
</style>
