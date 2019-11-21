<template>
	<view>
		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->

		<form @submit="formSubmitToAddCheckOutApply" report-submit="true">
			<input name="user_id" :value="UserBedAllInfo.apply_type" disabled="true" style="display: none;"></input>
			<view class="cu-form-group">
				<view class="title">用户工号</view>
				<input name="user_id" :value="UserBedAllInfo.user_id" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">用户姓名</view>
				<input name="user_name" :value="UserBedAllInfo.user_name" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">公寓</view>
				<input name="apa_name" :value="UserBedAllInfo.apa_name" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">房间</view>
				<input name="roo_name" :value="UserBedAllInfo.roo_name" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">床位</view>
				<input name="bed_name" :value="UserBedAllInfo.bed_name" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">搬出日期</view>
				<picker mode="date" name="date_move_out" @change="DateChange" start="2015-01-01" end="2025-12-31">
					<view class="picker">
						{{date_move_out}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">搬出原因</view>
				<picker @change="PickerChange" :value="index" name="out_reason" :range="checkOutReason">
					<view class="picker">
						{{checkOutReason[index]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">是否订阅本次申请的审批消息</view>
				<button class="cu-btn round  bg-blue margin-tb-sm" @click="subscribe" :disabled="subscribeDisabled">{{subscribeText}}</button>
			</view>
			<view class="padding">
				<button class="cu-btn round block bg-blue margin-tb-sm lg shadow" @tap="showModal" data-target="DialogModal1">搬出</button>
			</view>
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">请确认</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						确定搬出吗
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
							<button class="cu-btn bg-green margin-left" form-type="submit" >确定</button>
						</view>
					</view>
				</view>
			</view>
		</form>

		<view class="padding">
			搬出注意事项
		</view>
	</view>
</template>

<script>
	var _this;
	export default {


		data() {
			return {
				index: 0,
				UserBedAllInfo: {
					user_id: '',
					user_name: '',
					apa_id: '',
					apa_name: '',
					room_id: '',
					room_name: '',
					bed_id: '',
					bed_name: '',
					out_reasonL: '',
					date_move_out: '',
					apply_type: 1
				},
				subscribeText: "点击授权订阅",
				subscribeDisabled:false,
				modalName: null,
				date_move_out: '',
				checkOutReason: ['到期', '离职', '其他'],
			}
		},
		mounted() {
			_this = this;

			var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			_this.date_move_out = year + seperator1 + month + seperator1 + strDate;
			let USERID = uni.getStorageSync("USERID");
			_this.UserBedAllInfo.user_id = USERID;
			/* 判断用户是否存在已经提交但没审批的申请*/
			var allParams = {
				url: 'checkUserIsHaveAApplyNotAdopt',
				setUpUrl: true,
				type: 'get',
				data: {
					user_id: USERID
				},
				sCallback: function(data) {
					console.log(data);
					if (data.code == 1) {
						uni.showToast({
							title: '是否已提交但未审批的申请数据异常',
							icon: 'none'
						})
					} else if (data.code == 0) {
						if (data.info != 0) {
							uni.showModal({
								content: "存在未审批的请求(" + data.info + ")，请等待审批结束",
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
						}else{
							
							//根据用户工号获取用户当前的床位信息
							/**......**/
							var allParams = {
								url: 'getUserCheckInInfo',
								setUpUrl: true,
								type: 'get',
								data: {
									user_id: _this.UserBedAllInfo.user_id,
								},
								sCallback: function(data) {
									console.log(data);
									console.log(data.code);
									console.log(data.info);
									if (data.code == 1) {
										uni.showToast({
											title: data.info,
											icon: 'none'
										})
									} else {
										if (data.info.length == 0 || data.info[0].bed_id == null || data.info[0].bed_id == "") {
											uni.showModal({
												content: "获取用户的床位信息异常",
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
										_this.UserBedAllInfo = data.info[0];
										_this.UserBedAllInfo.out_reason = _this.checkOutReason[0];
										_this.UserBedAllInfo.date_move_out = _this.date_move_out;
									}
								}
							};
							_this.$base.request(allParams, _this);
							
						}
					}
				}
			};
			_this.$base.request(allParams, _this);


		},
		onLoad() {
			_this = this;
		},
		methods: {
			subscribe(e) {
				wx.requestSubscribeMessage({
					tmplIds: ['JS2pyrbT1miKHnSfHbLwtha0GbioKnqtkA2cJ-ksEf4'],
					success(res) {
						var length=0,agree=false;
						for(var ever in res) {
							if(ever=='JS2pyrbT1miKHnSfHbLwtha0GbioKnqtkA2cJ-ksEf4'){
								console.log("ever:"+ever+",res:"+res[ever]);
								if(res[ever]=='accept'){
									_this.subscribeText='已订阅本次推送';
									_this.subscribeDisabled='disabled';
								}
							}
								
						    length++;
						}
					}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
			//设置搬出日期
			DateChange(e) {
				_this.date_move_out = e.detail.value;
				_this.UserBedAllInfo.date_move_out = _this.date_move_out;
			},
			formSubmitToAddCheckOutApply: function(e) {
				this.modalName = null;
				//用户确定搬出，提交搬出信息
				/**......**/
				var allParams = {
					url: 'addApplyInfoToOut',
					setUpUrl: true,
					type: 'get',
					data: {
						user_id: _this.UserBedAllInfo.user_id,
						apa_id: _this.UserBedAllInfo.apa_id,
						roo_id: _this.UserBedAllInfo.roo_id,
						bed_id: _this.UserBedAllInfo.bed_id,
						out_reason: _this.UserBedAllInfo.out_reason,
						date_move_out: _this.UserBedAllInfo.date_move_out,
						apply_type: 1
					},
					sCallback: function(data) {
						console.log(data);
						if (data.code == 1) {
							uni.showToast({
								title: data.message,
								icon: 'none'
							})
						} else {
							uni.redirectTo({
								url: '../main/main',
								success() {
									uni.showToast({
										title: data.message,
										icon: 'none'
									})
								}
							})
						}
					}
				};
				_this.$base.request(allParams, _this);
			},
			PickerChange(e) {
				_this.UserBedAllInfo.out_reason = _this.checkOutReason[e.detail.value];
			}
		}
	}
</script>

<style>

</style>
