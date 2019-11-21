<template>
	<view>
		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>基础信息
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">工号</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.user_id}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="text-grey">姓名</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.user_name}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view class="content">
						<text class="text-grey">手机号码</text>
					</view>
					<!-- <view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text>完整信息请到网页端查看</view> -->
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.user_tel}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="text-grey">所属网点</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.user_point}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="text-grey">用工类型</text>
				</view>
				<view class="action">
					<text class="text-black" v-if="ApplyInfo.user_type==0">社招</text>
					<text class="text-black" v-else-if="ApplyInfo.user_type==1">实习生</text>
					<text class="text-black" v-else-if="ApplyInfo.user_type==2">非新工</text>
					<text class="text-red" v-else>数据异常，未知类型</text>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>退租申请信息
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item" style="display: none;">
				<view class="content">
					<text class="text-grey">流程ID</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.id}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">公寓名称</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.apa_name}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="text-grey">房间名称</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.roo_name}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="text-grey">床位名称</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.bed_name}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="text-grey">退租时间</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.date_move_out}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="text-grey">退租原因</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.out_reason}}</text>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>审批信息
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">审批结果</text>
				</view>
				<view class="action">
					<text class="text-grey" v-if="ApplyInfo.sta==0">未审批</text>
					<text class="text-green" v-else-if="ApplyInfo.sta==1">通过</text>
					<text class="text-red" v-else-if="ApplyInfo.sta==2">驳回</text>
					<text class="text-red" v-else>未知状态</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey" v-if="ApplyInfo.sta==0">待审批</text>
					<text class="text-grey" v-else-if="ApplyInfo.sta==1">结果</text>
					<text class="text-grey" v-else-if="ApplyInfo.sta==2">驳回原因</text>
					<text class="text-grey" v-else>未知状态</text>
				</view>
				<view class="action">
					<text class="text-grey" v-if="ApplyInfo.sta==0">未审批</text>
					<text class="text-green" v-else-if="ApplyInfo.sta==1">通过</text>
					<text class="text-red" v-else-if="ApplyInfo.sta==2">{{ApplyInfo.apply_remarks}}</text>
					<text class="text-red" v-else>未知状态</text>
				</view>
			</view>
		</view>

		<form v-if="showRemarks">
			<view class="cu-form-group margin-top">
				<view class="title">驳回原因</view>
				<input placeholder="驳回原因" name="apply_remarks" v-model="ApplyInfo.apply_remarks"></input>
			</view>
		</form>

		<view class="padding flex  p-xs margin-bottom-sm mb-sm" v-if="staIsOne">
			<form @submit="reject" report-submit="true" class="cu-btn round block bg-red margin-tb-sm lg flex-sub  padding-sm margin-xs radius">
				<button class="cu-btn round block bg-red margin-tb-sm lg flex-sub  padding-sm margin-xs radius" type="" form-type="submit">驳回</button>
			</form>
			<form @submit="agree" report-submit="true" class="cu-btn round block bg-blue margin-tb-sm lg flex-twice  padding-sm margin-xs radius"><button class="cu-btn round block bg-blue margin-tb-sm lg flex-twice  padding-sm margin-xs radius"
				 type="" form-type="submit">同意</button>
			</form>
		</view>



	</view>
</template>

<script>
	var _this, apply_type;;
	export default {
		data() {
			return {
				ApplyInfo: {
					//用户基础信息
					user_id: '',
					user_name: '',
					user_tel: '',
					user_point: '',
					user_sex: '',
					user_type: '',

					//申请信息：退租
					id: '',
					apa_name: '',
					roo_name: '',
					bed_name: '',
					date_move_out: '',
					out_reason: '',

					//其他信息
					sta: '',
					apply_remarks: ''
				},
				staIsOne: false,
				showRemarks: false //显示驳回备注输入框
			}
		},
		mounted() {
			_this = this;
		},
		onLoad: function(option) {
			_this = this;
			_this.applyInfoId = option.id;
			apply_type = option.apply_type;
			var sta = option.sta;
			if (_this.applyInfoId == null || _this.applyInfoId == "" || typeof(_this.applyInfoId) == "undefined") {
				uni.showModal({
					content: "获取申请流程的ID异常",
					confirmText: "确定",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.navigateBack({
								delta: 1
							});
						}
					}
				});
				return;
			}
			_this.getApplyInfoById();
		},
		methods: {
			navigatorToApproval() {
				uni.navigateTo({
					url: '../approval/approval?id=' + _this.applyInfoId + '&date_check_in=' + _this.ApplyInfo.date_check_in +
						'&date_move_out=' + _this.ApplyInfo.date_move_out
				});
			},
			agree: function(e) {
				var allParams = {
					url: 'applicationForExaminationAndApprovalByApplyIdToCheckout',
					setUpUrl: true,
					type: 'get',
					data: {
						id: _this.ApplyInfo.id,
						user_id: _this.ApplyInfo.user_id,
						bed_id: _this.ApplyInfo.bed_id,
						sta: 1,
						apply_remarks: null
					},
					sCallback: function(data) {
						if (data.code == 1) {
							uni.showToast({
								title: data.message,
								icon: 'none'
							})
						} else if (data.code == 0) {
							uni.navigateBack({
								delta: 1,
								success() {
									uni.showToast({
										title: data.message,
										icon: 'none'
									})
								}
							});
						} else {
							uni.showToast({
								title: '返回的数据异常',
								icon: 'none'
							})
						}
					}
				};
				_this.$base.request(allParams, _this);
			},
			reject: function(e) {
				_this.showRemarks = true;
				if (_this.ApplyInfo.apply_remarks == '' || _this.ApplyInfo.apply_remarks == null || _this.ApplyInfo.apply_remarks ==
					"null") {
					uni.showToast({
						title: '请输入驳回备注',
						icon: 'none'
					})
				} else {
					var allParams = {
						url: 'applicationForExaminationAndApprovalByApplyIdToCheckout',
						setUpUrl: true,
						type: 'get',
						data: {
							id: _this.ApplyInfo.id,
							//user_id: _this.ApplyInfo.user_id,
							//bed_id: _this.ApplyInfo.bed_id,
							sta: 2,
							apply_remarks: _this.ApplyInfo.apply_remarks

						},
						sCallback: function(data) {
							if (data.code == 1) {
								uni.showToast({
									title: data.message,
									icon: 'none'
								})
							} else if (data.code == 0) {
								uni.navigateBack({
									delta: 1,
									success() {
										uni.showToast({
											title: data.message,
											icon: 'none'
										})
									}
								});

							} else {
								uni.showToast({
									title: '返回的数据异常',
									icon: 'none'
								})
							}
						}
					};
					_this.$base.request(allParams, _this);
				}
			},
			getApplyInfoById() {
				//通过审批ID获取审批信息
				/**......**/
				var allParams = {
					url: 'queryApplyInfoById',
					setUpUrl: true,
					type: 'get',
					data: {
						id: _this.applyInfoId,
						apply_type: apply_type
					},
					sCallback: function(data) {
						console.log(data);
						if (data.code == 1) {
							uni.showModal({
								content: "获取数据ID异常:" + data.info,
								confirmText: "确定",
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.navigateBack({
											delta: 1
										});
									}
								}
							});
						} else {
							if (data.count == 0) {
								uni.showModal({
									content: "获取数据ID异常",
									confirmText: "确定",
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											uni.navigateBack({
												delta: 1
											});
										}
									}
								});
								return;
							}
							//将后台返回值赋值
							_this.ApplyInfo = data.info[0];
							//赋值入住用的临时管理员分配的公寓ID
							_this.temp_admin_arrange = _this.ApplyInfo.admin_arrange.split("_")[1];
							_this.ApplyInfo.admin_arrange = _this.ApplyInfo.admin_arrange.split("_")[0];

							//获取登录用户的权限1：管理员，0为普通用户
							let USERROLE = uni.getStorageSync("USERROLE");
							console.log('USERROLE', USERROLE)
							if (USERROLE == 1) {
								if (_this.ApplyInfo.sta == 0) {
									_this.staIsOne = true;
								}
							} else {
								if (_this.ApplyInfo.sta == 1) {
									_this.staIsOne = false;
								}
							}
						}
					}
				};
				_this.$base.request(allParams, _this);

			}
		},
		onPullDownRefresh() {
			_this.getApplyInfoById();
		}
	}
</script>

<style>
	.action {
		font-color: #3B4144
	}
</style>
