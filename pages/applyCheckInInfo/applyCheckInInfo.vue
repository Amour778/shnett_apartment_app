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
						<text class="text-grey">身份证号</text>
					</view>
					<!-- <view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text>完整信息请到网页端查看</view> -->
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.user_cardid}}</text>
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
					<text class="text-grey">入职日期</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.date_entry}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="text-grey">性别</text>
				</view>
				<view class="action">
					<text class="text-black" v-if="ApplyInfo.user_sex==0">女</text>
					<text class="text-black" v-else-if="ApplyInfo.user_sex==1">男</text>
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
				<text class="cuIcon-title text-orange"></text>申请信息
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
					<text class="text-grey">入住事由</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.in_reason}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="text-grey">入住日期</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.date_check_in}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="text-grey">结束日期</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.date_move_out}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="text-grey">申请类型</text>
				</view>
				<view class="action">
					<text class="text-black" v-if="ApplyInfo.apply_type==0">新住</text>
					<text class="text-black" v-if="ApplyInfo.apply_type==1">续住</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="text-grey">公寓意向</text>
				</view>
				<view class="action">
					<text class="text-black">{{ApplyInfo.user_intention}}</text>
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
					<text class="text-grey" v-else-if="ApplyInfo.sta==1">分配的公寓</text>
					<text class="text-grey" v-else-if="ApplyInfo.sta==2">驳回原因</text>
					<text class="text-grey" v-else>未知状态</text>
				</view>
				<view class="action">
					<text class="text-grey" v-if="ApplyInfo.sta==0"></text>
					<text class="text-green" v-else-if="ApplyInfo.sta==1">{{ApplyInfo.admin_arrange}}</text>
					<text class="text-red" v-else-if="ApplyInfo.sta==2">{{ApplyInfo.apply_remarks}}</text>
					<text class="text-red" v-else>未知状态</text>
				</view>
			</view>
			
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">是否入住</text>
					</view>
					<view class="action">
						<text class="text-grey" v-if="ApplyInfo.is_check==0">未入住</text>
						<text class="text-green" v-else-if="ApplyInfo.sta==1">已入住</text>
						<text class="text-red" v-else>未知状态</text>
					</view>
				</view>
		</view>

		<view class="padding" v-if="showCheckIn">
			<button class="cu-btn round block bg-blue margin-tb-sm lg" type="" @click="navigatorToCheckIn">入住登记</button>
		</view>
		<view class="padding" v-if="showApplyBtn">
			<button class="cu-btn round block bg-blue margin-tb-sm lg" type="" @click="navigatorToApproval">审批</button>
		</view>


	</view>
</template>

<script>
	var _this,apply_type;
	export default {
		data() {
			return {
				ApplyInfo: {
					//用户基础信息
					user_id: '',
					user_name: '',
					user_cardid: '',
					user_tel: '',
					user_point: '',
					date_entry: '',
					user_sex: '',
					user_type: '',
					//申请信息
					id: '',
					in_reason: '',
					date_check_in: '',
					date_move_out: '',
					apply_type: '',
					apa_name: '',
					user_intention:'',
					//其他信息
					sta: '',
					admin_arrange: '',
					apply_remarks: '',
					is_check: ''
				},
				applyInfoId: null, //申请记录的ID
				temp_admin_arrange: null, //申请记录的ID
				showCheckIn: false, //显示用户入住登记按钮
				showApplyBtn: false, //显示管理员审批按钮
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
			navigatorToCheckIn() {
				uni.navigateTo({
					url: '../checkIn/checkIn?adminArrange=' + _this.temp_admin_arrange+ '&apa_name=' + _this.ApplyInfo.admin_arrange+'&apply_id='+ _this.applyInfoId
				});
			},
			getApplyInfoById(){
				
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
									_this.showApplyBtn = true;
								}
							} else {
								if (_this.ApplyInfo.sta == 1 && _this.ApplyInfo.is_check==0) {
									_this.showCheckIn = true;
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
