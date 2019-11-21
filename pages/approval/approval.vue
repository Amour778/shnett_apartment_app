<template>
	<view>
		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<form @submit="formSubmit" report-submit="true">
				<view class="cu-form-group margin-top" style="display: none;">
					<view class="title">流程ID</view>
					<input name="id" :value="applyInfoId" disabled="true"></input>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">入住日期</view>
					<picker mode="date" name="date_check_in" @change="DateCheckIn" :value="date_check_in" start="2015-01-01" end="2025-12-31">
						<view class="picker">
							{{date_check_in}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">结束日期</view>
					<picker mode="date" name="date_move_out" @change="DateExpireChange" :value="date_move_out" start="2015-01-01" end="2025-12-31">
						<view class="picker">
							{{date_move_out}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">审批结果</view>
					<radio-group class="block" @change="SetApplySta" name="apply_sta">
						<label class="margin-left-sm">
							<radio class="radio" value="1" checked=""></radio>
							<text class="margin-left-sm">通过</text>
						</label>
						<label class="margin-left-sm">
							<radio class='red margin-left-sm' value="2"></radio>
							<text class="margin-left-sm">驳回</text>
						</label>
					</radio-group>
				</view>
				<view v-show="!applySta" class="cu-form-group">
					<view class="title">驳回理由</view>
					<input name="apply_remarks" :value="apply_remarks" placeholder='请输入驳回理由'></input>
				</view>
				<view v-show="applySta" class="cu-form-group">
					<view class="title">公寓安排</view>
					<input name="admin_arrange" :value="admin_arrange" style="display:none"></input>
					<input :value="apa_name" disabled="disabled"></input>
					<button class='cu-btn round bg-green shadow' :disabled="selectApartmentBtnDisabled" @tap="showModal" data-target="viewModal">{{selectApartmentBtnText}}</button>
				</view>

				<view class="padding">
					<button class="cu-btn round block bg-blue margin-tb-sm lg" form-type="submit" type="">提交审批结果</button>
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
	export default {
		data() {
			return {
				applySta: true,
				applyInfoId: null, //申请记录的ID
				apply_remarks: '',
				apply_sta: 1,
				admin_arrange: '',
				apartmentList: [],
				userSelectApartmentId: null,
				date_check_in: '', //入住日期
				date_move_out: '', //结束日期

				//公寓数据
				apa_name: '', //选中的公寓名称
				modalName: null,
				selectApartmentBtnDisabled: true,
				selectApartmentBtnText: '无数据',
			}
		},
		onLoad: function(option) {
			_this = this;
			console.log(option.id);
			_this.applyInfoId = option.id;
			_this.date_check_in = option.date_check_in; //入住日期
			_this.date_move_out = option.date_move_out; //结束日期
			if (_this.applyInfoId == null || _this.applyInfoId == "" || typeof(_this.applyInfoId) == "undefined") {
				uni.showModal({
					content: "获取审批流程的ID异常",
					confirmText: "确定",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.navigateBack({
								delta: 1
							});
						}
					}
				})
				return;
			}
		},
		mounted() {
			_this = this;

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
			SetApplySta(e) {
				_this.apply_remarks = '';
				_this.admin_arrange = '';
				if (e.detail.value == 1) {
					_this.applySta = true;
				}
				if (e.detail.value == 2) {
					_this.applySta = false;
				}
			},
			formSubmit: function(e) {
				//提交审批结果
				/**......**/
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				if (formdata.apply_sta == 1) {
					if (formdata.admin_arrange == "" || formdata.admin_arrange == null) {
						uni.showToast({
							title: "请选择公寓",
							icon: "none"
						})
						return;
					}
				} else {
					if (formdata.apply_remarks == "" || formdata.apply_remarks == null) {
						uni.showToast({
							title: "请输入驳回理由",
							icon: "none"
						})
						return;
					}
				}
				var allParams = {
					url: 'applicationForExaminationAndApprovalByApplyIdToCheckIn',
					setUpUrl: true,
					type: 'get',
					data: {
						id: _this.applyInfoId,
						sta: formdata.apply_sta,
						apply_remarks: formdata.apply_remarks,
						admin_arrange: formdata.admin_arrange,
						date_check_in: formdata.date_check_in,
						date_move_out: formdata.date_move_out
					},
					sCallback: function(data) {
						console.log(data);
						console.log(data.message);
						if (data.code == 1) {
							uni.showToast({
								title: data.message,
								icon: 'none'
							})
						} else {
							uni.navigateBack({
								delta: 2,
								success: function() {
									uni.showToast({
										title: data.message,
										icon: 'none'
									})
								}
							});
						}
					}
				};
				_this.$base.request(allParams, _this);
			},
			//设置入住日期
			DateCheckIn(e) {
				_this.date_check_in = e.detail.value;
			},
			//设置结束日期
			DateExpireChange(e) {
				_this.date_move_out = e.detail.value;
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
				_this.admin_arrange = apa_id;
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
