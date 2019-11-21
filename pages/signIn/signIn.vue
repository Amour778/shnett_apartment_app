<template>
	<view class="bg-white">
		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->
		<view class="cu-bar solid-bottom" v-if="date!=null">
			<view class="section">
				<fl-signin :date="date" :list="list" @signin_fun="signin_fun" @repair_fun="repair_fun" @date_change="date_change"></fl-signin>
			</view>
		</view>
		<view class="solids-bottom padding-xs flex align-center">
			<view class="padding"><text class="lg text-red cuIcon-locationfill"></text>{{address}}{{recommend}}</view>
			<view class="padding flex flex-wrap justify-between align-center" @click="getLocation()">
				<button class="cu-btn cuIcon">
					<text class="cuIcon-refresh text-green"></text>
				</button>
			</view>
		</view>

	</view>
</template>

<script>
	var _this;
	var QQMapWX = require('@/components/qqmap/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	import flSignin from '../../components/fl-signin/fl-signin.vue'
	export default {
		components: {
			flSignin,
		},
		data() {
			return {
				recommend: '获取中',
				address: '...',
				// 当前日期
				date: null,
				// 签到成功列表
				list: [],
				user_id: null,
				user_lat: null, //纬度
				user_lng: null, //经度
			}
		},
		mounted() {
			_this = this;
			let USERID = uni.getStorageSync("USERID");
			_this.user_id = USERID;
			var allParams = {
				url: 'getDateAndSignInfo',
				setUpUrl: true,
				type: 'get',
				data: {
					user_id: _this.user_id
				},
				sCallback: function(data) {
					console.log(data);
					if (data.code == 0) {
						_this.date = data.sign_year + "-" + data.sign_month;
						_this.list = data.list;
					} else {
						uni.redirectTo({
							url: '../main/main',
							success() {
								uni.showModal({
									title: '获取数据异常',
									content: data.info
								})
							}
						})
					}
				}
			};
			_this.$base.request(allParams, _this);

		},
		methods: {
			//获取用户当前地址
			getLocation() {
				_this.recommend = '获取中';
				_this.address = '...';
				_this.user_lat = null;
				_this.user_lng = null;
				wx.getLocation({
					type: 'gcj02',
					isHighAccuracy:true,
					highAccuracyExpireTime:3000,
					success: function(res) {
						_this.user_lat = res.latitude;
						_this.user_lng = res.longitude;
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							success: function(addressRes) {
								var addressRes = addressRes.result;
								console.log(addressRes.address)
								_this.address = addressRes.address;
								_this.recommend = addressRes.formatted_addresses.recommend;
							},
							fail: function(error) {
								uni.showModal({
									title: '获取位置异常',
									content: error.status + "|" + error.message
								});

							},
							components: function() {

							}
						})
					}
				})
			},
			// 签到时触发
			signin_fun(res) {
				if (_this.user_lat == null || _this.user_lng == null) {
					uni.showToast({
						title: '位置数据获取异常，请刷新当前位置',
						icon: 'none',
						duration: 4000
					})
					return;
				}
				if (_this.user_id == null || _this.user_id == '') {
					uni.showToast({
						title: '用户工号获取失败，请退出后重试',
						icon: 'none',
						duration: 3000
					})
					return;
				}
				var allParams = {
					url: 'addSignInWithUserAndDate',
					setUpUrl: true,
					type: 'get',
					data: {
						user_lat: _this.user_lat,
						user_lng: _this.user_lng,
						user_id: _this.user_id,
						sign_year: null, //使用服务器的年份
						sign_month: null, //使用服务器的月份
						sign_day: null, //使用服务器的日期
						//sign_day: res.day
					},
					sCallback: function(data) {
						console.log(data);
						if (data.code == 0) {
							_this.list.push(res.day);
							uni.showToast({
								title: "签到成功",
								icon: "none"
							})
						} else {
							uni.showModal({
								title: '签到异常',
								content: data.info
							})
						}
					}
				};
				_this.$base.request(allParams, _this);


			},

		},
		onLoad: function() {
			_this = this;
			qqmapsdk = new QQMapWX({
				key: 'UQ6BZ-3E3K6-JTBSX-EKVZC-4BTRO-DDBTE'
			});

		},
		onShow: function() {
			_this = this;
			this.getLocation();
		}
	}
</script>
<style>
</style>
