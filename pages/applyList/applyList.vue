<template>
	<view>
		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>条件
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">申请类型</view>
			<radio-group class="inner" @change="changeAppType">
				<label class="margin-left-sm">
					<radio class="blue radio" value="0"></radio>
					<text class="margin-left-sm">入住</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="1"></radio>
					<text class="margin-left-sm">退租</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="2" checked=""></radio>
					<text class="margin-left-sm">全部</text>
				</label>
			</radio-group>
		</view>
		<view class="cu-form-group">
			<view class="title">状态</view>
			<radio-group class="inner" @change="changeAppSta">
				<label class="margin-left-sm">
					<radio class="blue radio" value="0" checked=""></radio>
					<text class="margin-left-sm">待审</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="1"></radio>
					<text class="margin-left-sm">通过</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="2"></radio>
					<text class="margin-left-sm">驳回</text>
				</label>
				<label class="margin-left-sm">
					<radio class="blue radio" value="3"></radio>
					<text class="margin-left-sm">全部</text>
				</label>
			</radio-group>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>申请信息
			</view>
		</view>
		<view v-if="applyHistortArray.length!=0" class="margin-top">
			<view class="cu-list menu-avatar" v-for="(item, index) in applyHistortArray" :key="index">
				<view class="cu-item" @click="openDetail(item.id,item.sta,item.apply_type)">
					<view v-if="item.sta === 0" class="cu-avatar round lg text-gray cuIcon-info" style="color: #0066CC;background-color: #fff;"></view>
					<view v-else-if="item.sta === 1" class="cu-avatar round lg text-gray cuIcon-check" style="color: #0190A0;background-color: #fff;"></view>
					<view v-else-if="item.sta === 2" class="cu-avatar round lg text-gray cuIcon-roundclose" style="color: #F1505C;background-color: #fff;"></view>
					<view class="content">
						<view class="text-black">{{item.user_id}}-{{item.user_name}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								原因:{{item.in_reason=="undefined"?"":item.in_reason}}{{item.out_reason=="undefined"?"":item.out_reason}}
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.create_date.substring(2,10)}}</view>
						<view class="cu-tag round bg-grey sm">{{item.apply_type==0?"入住":"退租"}}</view>
					</view>
				</view>
			</view>
			<view class="solids-bottom padding-xs flex align-center">
				<view class="flex-sub text-center">
					<view class="solid-bottom text-sm padding" @click="getnewsList">
						<text v-if="LoadSta==0" class="text-grey">滑动或点击加载更多</text>
						<text v-else-if="LoadSta==1" class="text-grey">加载中...</text>
						<text v-else-if="LoadSta==2" class="text-grey">没有更多数据了</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="flex align-center" style="height: 100%">
				<view class="padding-xl text-black">
					<view class="padding-xs text-xxl text-bold">
						无数据...
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import uniLoadMore from "../../components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				applyHistortArray: [],
				apply_sta: 0,
				apply_type: 2,
				LoadSta: 0, //0默认状态），1加载中），2没有了）
				page: 1,
				limit: 10,
				USERID: '',
				USERROLE: '',
				USERMAIN: '',

			};
		},
		mounted() {
			_this = this;
		},
		onLoad: function(options) {
			_this = this;
			//如果是管理员权限，则直接获取所有申请
			let USERROLE = uni.getStorageSync("USERROLE");
			_this.USERROLE = USERROLE;
		
			let USERID = uni.getStorageSync("USERID");
			_this.USERID = USERID;
		
			let USERMAIN = uni.getStorageSync("USERMAIN");
			_this.USERMAIN = USERMAIN;
			_this.getApplyListBySta();
		},
		onPullDownRefresh() {
			_this.getApplyListBySta();
		},
		onReachBottom() {
			//触底函数
			this.getnewsList();
		},
		onShow() {
			_this.getApplyListBySta();
		},
		methods: {
			openDetail(id, sta, type) {
				if (type == 0) {
					uni.navigateTo({
						url: '/pages/applyCheckInInfo/applyCheckInInfo?id=' + id + '&sta=' + sta+ '&apply_type=' + type
					});
				} else if (type == 1) {
					uni.navigateTo({
						url: '/pages/applyCheckOutInfo/applyCheckOutInfo?id=' + id + '&sta=' + sta+ '&apply_type=' + type
					});
				} else {
					uni.showToast({
						title: '获取申请类型异常，请退出后重试',
						icon: 'none'
					})
				}

			},
			changeAppType(e) {
				_this.LoadSta = 0;
				var type = e.detail.value;
				_this.apply_type = type;
				_this.getApplyListBySta();
			},
			//审批状态条件变更
			changeAppSta(e) {
				_this.LoadSta = 0;
				var sta = e.detail.value;
				_this.apply_sta = sta;
				_this.getApplyListBySta();
			},
			//下拉刷新
			getApplyListBySta() {
				_this.LoadSta = 0;
				_this.page = 1;
				_this.applyHistortArray = [];
				if (_this.USERROLE == 1) {
					var allParams = {
						url: 'queryApplyInfoByLimitAndUserIdWithRoleAdmin',
						setUpUrl: true,
						type: 'get',
						data: {
							user_main: _this.USERMAIN,
							apply_type: _this.apply_type,
							apply_sta: _this.apply_sta,
							page: _this.page,
							limit: _this.limit
						},
						sCallback: function(data) {
							if (data.code == 1) {
								uni.showToast({
									title: data.info,
									icon: 'none'
								})
							} else {
								_this.applyHistortArray = data.data;
								_this.page++;
							}
						}
					};
				} else {
					var allParams = {
						url: 'queryApplyInfoByLimitAndUserIdWithRoleUser',
						setUpUrl: true,
						type: 'get',
						data: {
							apply_type: _this.apply_type,
							apply_sta: _this.apply_sta,
							user_id: _this.USERID,
							page: _this.page,
							limit: _this.limit
						},
						sCallback: function(data) {
							console.log(data);
							if (data.code == 1) {
								uni.showToast({
									title: data.info,
									icon: 'none'
								})
							} else {
								if (data.count == 0) {
									uni.showToast({
										title: data.info,
										icon: 'none'
									});
								}
								_this.applyHistortArray = data.data;
								_this.page++;
							}
						}
					};
				}
				_this.$base.request(allParams, _this);

			},
			//加载更多
			getnewsList() {
				console.log('_this.page=' + _this.page);
				if (_this.LoadSta == 2) {
					uni.showToast({
						title: '没有更多数据了',
						icon: 'none'
					});
					return;
				}
				_this.LoadSta = 1;
				var sta = _this.apply_type;
				var type = _this.apply_sta;
				if (_this.USERROLE == 1) {
					var allParams = {
						url: 'queryApplyInfoByLimitAndUserIdWithRoleAdmin',
						setUpUrl: true,
						type: 'get',
						data: {
							user_main: _this.USERMAIN,
							apply_type: _this.apply_type,
							apply_sta: _this.apply_sta,
							page: _this.page,
							limit: _this.limit
						},
						sCallback: function(data) {
							console.log(data);
							if (data.code == 1) {
								_this.LoadSta = 0;
								uni.showToast({
									title: data.info,
									icon: 'none'
								})
							} else if (data.code == 0) {
								if (data.count == 0) {
									uni.showToast({
										title: '没有更多数据了',
										icon: 'none'
									});
									_this.LoadSta = 2;
									return;
								}
								_this.LoadSta = 0;
								_this.applyHistortArray = _this.applyHistortArray.concat(data.data);
								_this.page++;
							}
						}
					};
				} else {
					var allParams = {
						url: 'queryApplyInfoByLimitAndUserIdWithRoleUser',
						setUpUrl: true,
						type: 'get',
						data: {
							apply_type: _this.apply_type,
							apply_sta: _this.apply_sta,
							user_id: _this.USERID,
							page: _this.page,
							limit: _this.limit
						},
						sCallback: function(data) {
							console.log(data);
							if (data.code == 1) {
								_this.LoadSta = 0;
								uni.showToast({
									title: data.info,
									icon: 'none'
								})
							} else {
								if (data.count == 0) {
									uni.showToast({
										title: '没有更多数据了',
										icon: 'none'
									});
									_this.LoadSta = 2;
									return;
								}
								_this.LoadSta = 0;
								_this.applyHistortArray = _this.applyHistortArray.concat(data.data);
								_this.page++;
								console.log(_this.applyHistortArray);
							}
						}
					};
				}
				_this.$base.request(allParams, _this);
				console.log(_this.applyHistortArray);
			}
		}
	}
</script>

<style>

</style>
