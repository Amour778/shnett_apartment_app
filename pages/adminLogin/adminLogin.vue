<template>
	<view>

		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->


		<form @submit="adminLoginSubmit" report-submit="true" >
			<view class="cu-form-group margin-top">
				<view class="title">用户名</view>
				<input name="user_id" maxlength="15"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input name="user_password" type="password"></input>
			</view>
			<view class="padding">
				<button class="cu-btn round block bg-blue margin-tb-sm lg" form-type="submit">管理员登陆</button>
			</view>
		</form>
	</view>
</template>

<script>
	var _this;
	var sha1 = require("../../components/sha1/sha1.js");
	var graceChecker = require("../../components/graceChecker/graceChecker.js");
	export default {
		data() {
			return {

			};
		},
		mounted() {
			_this = this;
			//this.isLogin();
		},
		methods: {
			adminLoginSubmit: function(e) {
				//管理员登录
				/**......**/
				var rule = [{
						name: "user_id",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "用户名不可为空"
					},
					{
						name: "user_password",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "密码不可为空"
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				var USERNAME = formData.user_id;
				var PASSWORD = sha1.hex_sha1(formData.user_password);
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					var allParams = {
						url: 'login/admin',
						setUpUrl: true,
						type: 'get',
						data: {
							username: USERNAME,
							password: PASSWORD
						},
						sCallback: function(data) {
							console.log(data);
							if (data.code == 1) {
								uni.showToast({
									title: data.message,
									icon: 'none'
								})
							} else {
								uni.setStorage({
									key: 'USERNAME',
									data: USERNAME
								});
								uni.setStorage({
									key: 'PASSWORD',
									data: PASSWORD
								});
								uni.setStorage({
									key: 'USERROLE',
									data: '1'
								});
								uni.setStorage({
									key: 'USERTOKEN',
									data: data.info
								});
								uni.setStorage({
									key: 'USERMAIN',
									data: data.openid,
									success: function() {
										uni.reLaunch({
											url: "../main/main"
										});
									}
								});
							}
						}
					}
					_this.$base.request(allParams, _this);
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
		}
	}
</script>

<style>
</style>
