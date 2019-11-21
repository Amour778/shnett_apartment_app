<template>
	<view>

		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->
		
		<form @submit="formSubmitBind" report-submit="true">
			<input name="user_wechat_apartment" :value="UserInfoArray.user_wechat_apartment" disabled style="display: none;"></input>
			<input name="user_main" :value="UserInfoArray.user_main" disabled style="display: none;"></input>

			<view class="cu-form-group">
				<view class="title">工号</view>
				<input placeholder="如没有工号,请点击右侧按钮生成" name="user_id" :value="UserInfoArray.user_id" :disabled="lsDisabled"></input>
				<button class='cu-btn bg-green shadow' @click="getTempUserId" :disabled="lsDisabled">临时工号</button>
			</view>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input name="user_name" :value="UserInfoArray.user_name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">身份证号</view>
				<input name="user_cardid" maxlength="18" :value="UserInfoArray.user_cardid"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input name="user_tel" :value="UserInfoArray.user_tel" maxlength="11"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">网点代码</view>
				<input placeholder="不清楚可咨询同网点同事" name="user_point" :value="UserInfoArray.user_point"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">入职日期</view>
				<picker mode="date" name="date_entry" @change="DateEntryChange" :value="UserInfoArray.date_entry" start="2015-01-01"
				 end="2025-12-31">
					<view class="picker">
						{{UserInfoArray.date_entry}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<radio-group class="block" @change="SetUserSex" name="user_sex">
					<label class="margin-left-sm">
						<radio class="blue radio" value="0"></radio>
						<text class="margin-left-sm">女</text>
					</label>
					<label class="margin-left-sm">
						<radio class="blue radio" value="1"></radio>
						<text class="margin-left-sm">男</text>
					</label>
				</radio-group>
			</view>
			<view class="cu-form-group">
				<view class="title">用工类型</view>
				<radio-group class="inner" @change="SetUserType" name="user_type">
					<label class="margin-left-sm">
						<radio class="blue radio" value="0"></radio>
						<text class="margin-left-sm">社招</text>
					</label>
					<label class="margin-left-sm">
						<radio class="blue radio" value="1"></radio>
						<text class="margin-left-sm">实习生</text>
					</label>
					<label class="margin-left-sm">
						<radio class="blue radio" value="2"></radio>
						<text class="margin-left-sm">非新工</text>
					</label>
				</radio-group>
			</view>
			<view class="padding">
				<button class="cu-btn round block bg-blue margin-tb-sm lg" form-type="submit" type="">绑定当前微信</button>
			</view>
		</form>
	</view>
</template>

<script>
	var _this;
	var graceChecker = require("../../components/graceChecker/graceChecker.js");
	export default {
		data() {
			return {
				lsDisabled: false,
				UserInfoArray: {
					user_id: '',
					user_name: '',
					user_cardid: '',
					user_tel: '',
					user_point: '',
					date_entry: '',
					user_sex: '',
					user_type: '',
					user_wechat_apartment: '',
					user_main: ''
				},
				SubmitButtonDisabled: this.SubmitButtonDisabled, //提交按钮disabled状态
			}
		},
		onLoad: function(option) {
			_this = this;
			_this.UserInfoArray.user_wechat_apartment = option.openid;
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
			_this.UserInfoArray.date_entry = year + seperator1 + month + seperator1 + strDate;
		},
		methods: {
			//提交数据
			/**......**/
			formSubmitBind: function(e) {
				var rule = [{
						name: "user_id",
						checkType: "string",
						checkRule: "6,12",
						errorMsg: "工号应为6-12个字符"
					},
					{
						name: "user_name",
						checkType: "string",
						checkRule: "2,10",
						errorMsg: "姓名应为2-10个字符"
					},
					{
						name: "user_cardid",
						checkType: "string",
						checkRule: "18",
						errorMsg: "请输入18位身份证号码"
					},
					{
						name: "user_tel",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请输入11位手机号码"
					},
					{
						name: "user_point",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "所属网点不可为空"
					},
					{
						name: "user_sex",
						checkType: "in",
						checkRule: "0,1",
						errorMsg: "请选择性别"
					},
					{
						name: "user_type",
						checkType: "in",
						checkRule: "0,1,2",
						errorMsg: "请选择新工类型"
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				console.log(formData.user_id)
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var allParams = {
						url: 'bindUserInfoByUserInputs',
						setUpUrl: true,
						//data: JSON.stringify(formData),
						data:{
							date_entry: formData.date_entry,
							user_cardid: formData.user_cardid,
							user_id: formData.user_id,
							user_main: formData.user_main,
							user_name: formData.user_name,
							user_point: formData.user_point,
							user_sex: formData.user_sex,
							user_tel: formData.user_tel,
							user_type: formData.user_type,
							user_wechat_apartment: formData.user_wechat_apartment
						},
						type: 'get', //请求类型
						sCallback: function(data) {
							console.log(data);
							console.log(data.message);
							if (data.code == 0) {
								uni.redirectTo({
									url: '/pages/login/login',
									success() {
										uni.showToast({
											title: data.message,
											icon: 'none'
										});
									}
								});
							} else {
								uni.showToast({
									title: data.messsage,
									icon: 'none'
								})
							}
						}
					};
					_this.$base.request(allParams,_this);
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			//获取临时工号
			/**......**/
			getTempUserId() {
				var allParams = {
					url: 'getTemporaryGenerationUserId', //地址为Config.restUrl拼接地址 
					setUpUrl: true, //不需要拼接请设置为false 
					type: 'post', //请求类型
					sCallback: function(data) {
						console.log(data);
						if (data.code == 0) {
							_this.UserInfoArray.user_id = data.message;
							_this.lsDisabled = true;
						} else {
							uni.showToast({
								title: '获取临时工号异常',
								icon: 'none'
							})
						}
					},
					eCallback: function() {}
				};
				_this.$base.request(allParams,_this);

			},
			//设置用户性别
			SetUserSex(e) {
				_this.UserInfoArray.user_sex = e.detail.value;
			},
			//设置用户用工类型
			SetUserType(e) {
				_this.UserInfoArray.user_type = e.detail.value;
			},
			//设置入职日期
			DateEntryChange(e) {
				_this.UserInfoArray.date_entry = e.detail.value;
			}
		}
	}
</script>

<style>

</style>
