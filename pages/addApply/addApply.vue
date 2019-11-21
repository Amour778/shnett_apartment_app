<template>
	<view>
		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<form @submit="formSubmitToAddApply">
				<view style="display: none;">
					<input name="apply_type" :value="AddApplyInfo.apply_type" disabled="true"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">用户工号</view>
					<input name="user_id" :value="AddApplyInfo.user_id" disabled="true"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">入住事由</view>
					<input name="in_reason" placeholder='请输入入住事由' :value="AddApplyInfo.in_reason"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">入住日期</view>
					<picker mode="date" name="date_check_in" @change="DateCheckIn" :value="AddApplyInfo.date_check_in" start="2015-01-01"
					 end="2025-12-31">
						<view class="picker">
							{{AddApplyInfo.date_check_in}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">结束日期</view>
					<picker mode="date" name="date_move_out" @change="DateExpireChange" :value="AddApplyInfo.date_move_out" start="2015-01-01"
					 end="2025-12-31">
						<view class="picker">
							{{AddApplyInfo.date_move_out}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">申请类型</view>
					<radio-group class="block" @change="SetCheckInType" name="check_in_type">
						<label class="margin-left-sm">
							<radio class="blue radio" value="0"></radio>
							<text class="margin-left-sm">新住</text>
						</label>
						<label class="margin-left-sm">
							<radio class="blue radio" value="1"></radio>
							<text class="margin-left-sm">续住</text>
						</label>
					</radio-group>
				</view>
				<view class="cu-form-group">
					<view class="title">公寓意向</view>
					<input name="user_intention" :value="AddApplyInfo.user_intention" style="display:none"></input>
					<input :value="apa_name" disabled="disabled"></input>
					<button class='cu-btn round bg-green shadow' :disabled="selectApartmentBtnDisabled" @tap="showModal" data-target="viewModal">{{selectApartmentBtnText}}</button>
				</view>

				<view class="cu-form-group margin-top">
					<view class="title">是否订阅本次申请的审批消息</view>
					<button class="cu-btn round bg-green shadow" @click="subscribe" :disabled="subscribeDisabled">{{subscribeText}}</button>
				</view>

				<view class="padding">
					<button :disabled="SubmitButtonDisabled" class="cu-btn round block bg-blue margin-tb-sm lg shadow" form-type="submit">提交申请</button>
				</view>
			</form>

		</scroll-view>
		<view class="bg-gradual-blue">
			<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
				<text class="cuIcon-pullright"></text>
			</view>
			<scroll-view scroll-y class="DrawerWindow" :class="modalName=='viewModal'?'show':''">
				<view class="cu-bar bg-white search fixed">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input type="text" placeholder="搜索公寓" confirm-type="search" @input="searchIcon"></input>
					</view>
				</view>
				<view class="cu-list grid col-1">
					<view class="cu-item" v-for="(item,index) in apartmentList" :key="index" v-if="item.isShow" @click="clickItem(item.apa_name,item.apa_id)">
						<text>{{item.apa_name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	var _this;

	let USERID = uni.getStorageSync("USERID");
	console.log('USERID=' + USERID)
	var graceChecker = require("../../components/graceChecker/graceChecker.js");
	export default {
		data() {
			return {
				AddApplyInfo: {
					user_id: '',
					user_intention: '',
					check_in_type: '',
					in_reason: '',
					date_check_in: '',
					date_move_out: '',
					apply_type: 0,
				},
				//授权订阅按钮
				subscribeText: "点击授权订阅",
				subscribeDisabled: false,
				//公寓数据
				apa_name: '', //选中的公寓名称
				modalName: null,
				apartmentList: [], //公寓列表
				selectApartmentBtnDisabled: true,
				selectApartmentBtnText: '无数据',

				//form表单提交数据按钮禁用状态
				SubmitButtonDisabled: this.SubmitButtonDisabled,




			}
		},
		onLoad() {

		},
		mounted() {
			_this = this;
			let USERID = uni.getStorageSync("USERID");
			_this.AddApplyInfo.user_id = USERID;
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
			_this.AddApplyInfo.date_check_in = year + seperator1 + month + seperator1 + strDate;
			_this.AddApplyInfo.date_move_out = _this.AddApplyInfo.date_check_in;
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
						uni.showModal({
							content: "获取已提交但未审批的申请数据异常",
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
						}
					}
				}
			};
			_this.$base.request(allParams, _this);
			//获取所有公寓
			/**......**/
			var allParams = {
				url: 'queryAllApartmentInfoForList',
				setUpUrl: true,
				type: 'get',
				sCallback: function(data) {
					if (data.code == 1) {
						uni.showToast({
							title: '获取公寓数据异常',
							icon: 'none'
						})
					} else {
						if (data.data.length == 0) {
							uni.showToast({
								title: '公寓数据为空',
								icon: 'none'
							})
						} else {
							_this.selectApartmentBtnText = "选择公寓";
							_this.selectApartmentBtnDisabled = false;
							_this.apartmentList = data.data;
						}

					}
				}
			};
			_this.$base.request(allParams, _this);

		},
		methods: {
			subscribe(e) {
				wx.requestSubscribeMessage({
					tmplIds: ['JS2pyrbT1miKHnSfHbLwtha0GbioKnqtkA2cJ-ksEf4'],
					success(res) {
						var length = 0,
							agree = false;
						for (var ever in res) {
							if (ever == 'JS2pyrbT1miKHnSfHbLwtha0GbioKnqtkA2cJ-ksEf4') {
								console.log("ever:" + ever + ",res:" + res[ever]);
								if (res[ever] == 'accept') {
									_this.subscribeText = '已订阅本次推送';
									_this.subscribeDisabled = 'disabled';
								}
							}

							length++;
						}
					}
				})
			},
			//提交入住申请
			/**......**/
			formSubmitToAddApply: function(e) {
				var rule = [{
						name: "user_id",
						checkType: "string",
						checkRule: "6,12",
						errorMsg: "工号应为6-12个字符"
					},
					{
						name: "in_reason",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "入住事由不可为空"
					},
					{
						name: "date_check_in",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "入住日期不可为空"
					},
					{
						name: "date_move_out",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "结束日期不可为空"
					},
					{
						name: "check_in_type",
						checkType: "in",
						checkRule: "0,1",
						errorMsg: "请选择住宿类型"
					},
					{
						name: "user_intention",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择公寓意向"
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var allParams = {
						url: 'addApplyInfoToIn',
						setUpUrl: true,
						type: 'get',
						data: {
							user_id: formData.user_id,
							user_intention: formData.user_intention,
							check_in_type: formData.check_in_type,
							in_reason: formData.in_reason,
							date_check_in: formData.date_check_in,
							date_move_out: formData.date_move_out,
							apply_type: formData.apply_type
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
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			//设置住宿类型
			SetCheckInType(e) {
				_this.AddApplyInfo.check_in_type = e.detail.value;
			},
			//根据用户输入的内容显示公寓信息
			showTheApartmentData(e) {
				console.log(e);
				//用户输入或删除任何数据，都清空用户意向input的值，防止误触提交
				_this.AddApplyInfo.user_intention = "";
				if (!e.value) {
					e.callback(_this.apartmentList)
				} else {
					let data = []
					_this.apartmentList.forEach(item => {
						if (item.apa_name.indexOf(e.value) > -1) {
							data.push(item)
						}
					})
					e.callback(data)
				}
			},
			//用户选择的意向公寓
			selectedTheApartmentData(value) {
				_this.AddApplyInfo.user_intention = value.apa_id;

			},
			//设置入住日期
			DateCheckIn(e) {
				_this.AddApplyInfo.date_check_in = e.detail.value;
			},
			//设置结束日期
			DateExpireChange(e) {
				_this.AddApplyInfo.date_move_out = e.detail.value;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			searchIcon(e) {
				let key = e.detail.value.toLowerCase();
				let list = _this.apartmentList;
				for (let i = 0; i < list.length; i++) {
					let a = key;
					let b = list[i].apa_name.toLowerCase();
					if (b.search(a) != -1) {
						list[i].isShow = true
					} else {
						list[i].isShow = false
					}
				}
				_this.apartmentList = list
			},
			clickItem(apa_name, apa_id) {
				_this.apa_name = apa_name;
				_this.AddApplyInfo.user_intention = apa_id;
				_this.hideModal();
			}
		}
	}
</script>

<style>
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}

	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}

	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}

	.DrawerPage .nav {
		flex: 1;
	}

	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}

	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
</style>
