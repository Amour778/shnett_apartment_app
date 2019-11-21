<template>
	<view>
		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->

		<form @submit="uploadRoomAndBedInfo"  report-submit="true">
			<view class="cu-form-group" style="display: none;">
				<view class="title">公寓</view>
				<input placeholder="公寓ID" name="admin_arrange" :value="admin_arrange" disabled="lsDisabled"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">公寓</view>
				<input placeholder="公寓ID" name="apa_name" :value="apa_name" disabled="lsDisabled"></input>
			</view>

			<view class="cu-form-group" v-if="roomList.length!=0">
				<view class="title">房间</view>
				<view style="width: 80%;">
					<xfl-select :list="roomList" :clearable="false" :showItemNum="5" :disabled="disabled_room" :style_Container="'height: 50px; font-size: 16px;'"
					 :placeholder="placeholder_room" :selectHideType="'hideAll'" @change="roomSelect">
					</xfl-select>
				</view>
			</view>

			<view class="cu-form-group" v-if="bedList.length!=0">
				<view class="title">床位</view>
				<view style="width: 80%;">
					<xfl-select :list="bedList" :clearable="false" :showItemNum="5" :disabled="disabled_bed" :style_Container="'height: 50px; font-size: 16px;'"
					 :placeholder="placeholder_bed" :selectHideType="'hideAll'" @change="bedSelect">
					</xfl-select>
				</view>
			</view>
			<view class="padding">
				<button class="cu-btn round block bg-blue margin-tb-sm lg" type="" :disabled="btnDisabled" form-type="submit" >提交房间及床位信息</button>
			</view>
		</form>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				apa_name:null,//公寓名称
				admin_arrange: null, //公寓ID
				roomId: null, //房间ID
				bedId: null, //床位ID
				disabled_room: true, //是否禁用
				placeholder_room: '请选择入住的房间',
				disabled_bed: true, //是否禁用
				placeholder_bed: '请选择入住的床位',
				roomList: [],
				bedList: [],
				bedTempList: [],
				user_id:null,
				apply_id:null,
				btnDisabled:true,
			}
		},
		onLoad: function(option) {
			_this = this;
			console.log(option.adminArrange);
			_this.admin_arrange = option.adminArrange;
			_this.apa_name = option.apa_name;
			_this.apply_id = option.apply_id;
			let USERID = uni.getStorageSync("USERID");
			_this.user_id = USERID;
			if (_this.admin_arrange == null || _this.admin_arrange == "" || typeof(_this.admin_arrange) == "undefined") {
				uni.showModal({
					content: "获取管理员分配的公寓信息异常",
					confirmText: "返回",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.navigateBack({
								delta: 1
							});
						}
					}
				});
			}
		},
		mounted() {
			_this = this;
			/**......**/
			//通过公寓ID获取该公寓下所有的房间
			var allParams = {
				url: 'getAllApartmentRoomByApaId',
				setUpUrl: true,
				type: 'get',
				data: {
					apa_id: _this.admin_arrange
				},
				sCallback: function(data) {
					console.log(data);
					console.log(data.code);
					console.log(data.data);
					if (data.code == 1) {
						uni.showToast({
							title: data.info,
							icon: 'none',
							duration: 2000
						});
					} else {
						_this.disabled_room = false;
						_this.roomList = data.data;
						console.log('_this.roomList=>');
						console.log(_this.roomList);
					}
				}
			};
			_this.$base.request(allParams, _this);

		},
		methods: {
			roomSelect({
				index,
				newVal,
				oldVal,
				orignItem
			}) {
				console.log(index + "---" + newVal + "---" + oldVal + "---" + orignItem);
				//根据选择的房间，获取该房间的床位
				/**......**/
				console.log(_this.roomList[index].id);
				_this.roomId = _this.roomList[index].id;
				_this.bedList=[];
				_this.bedId =null;
				var allParams = {
					url: 'getAllApartmentBedByRoomId',
					setUpUrl: true,
					type: 'get',
					data: {
						roo_id: _this.roomId
					},
					sCallback: function(data) {
						console.log(data);
						if (data.code == 1) {
							uni.showToast({
								title: data.info,
								icon: 'none',
								duration: 2000
							});
						} else if (data.code ==0) {
							_this.bedList = data.data;
							_this.disabled_bed = false;
						}else{
							uni.showModal({
								content: "获取床位信息异常",
								confirmText: "确定",
								showCancel: false
							});
						}
					}
				};
				_this.$base.request(allParams, _this);

			},
			bedSelect({
				index,
				newVal,
				oldVal,
				orignItem
			}) {
				console.log(index + "---" + newVal + "---" + oldVal + "---" + orignItem);
				_this.bedId = _this.bedList[index].id;
				_this.btnDisabled=false;
			},
			uploadRoomAndBedInfo(e) {
				//提交入住信息
				/**......**/
				if (_this.roomId == null || _this.bedId == null) {
					uni.showToast({
						title: '请选择房间或床位信息',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (_this.user_id == null || _this.user_id == null) {
					uni.showToast({
						title: '用户工号获取异常',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				var allParams = {
					url: 'checkInWithUserIdAndBedId',
					setUpUrl: true,
					type: 'get',
					data: {
						bed_id: _this.bedId,
						user_id:_this.user_id,
						apply_id:_this.apply_id
					},
					sCallback: function(data) {
						console.log(data);
						if (data.code == 1) {
							uni.showToast({
								title: data.info,
								icon: 'none',
								duration: 2000
							});
						} else if (data.code ==0) {
							uni.navigateBack({
							    delta: 3,
								success:function(){
									uni.showToast({
										title: data.info,
										icon: 'none',
										duration: 2000
									});
								}
							});
						}
					}
				};
				_this.$base.request(allParams, _this);
			}

		}
	}
</script>

<style>

</style>
