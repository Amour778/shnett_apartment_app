<template>
	<view>
		
		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->
		
		<view class="header">
			<image :src="logoImage"></image>
		</view>
		<view class="text-black text-bold text-center text-shadow" style="font-size: 29px;">
			<text>浙北智慧公寓</text>
		</view>
		<view class="main">
			<form report-submit="true" @submit="userLogin" class="padding">
				<button :disabled="SubmitButtonDisabled" class="cu-btn round block bg-blue margin-tb-sm lg" form-type="submit"  type="">普通用户登陆</button>
			</form>
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="../adminLogin/adminLogin" open-type="navigate">管理员登陆</navigator>
			</view>

		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				logoImage: 'data:image/png;base64,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',
				SubmitButtonDisabled: this.SubmitButtonDisabled, //提交按钮disabled状态
			};
		},
		mounted() {
			_this = this;
			_this.checkUserToken();
		},
		methods: {
			checkUserToken: function() {
				//检查用户是否已经登录
				/**......**/
				try {
					const token = uni.getStorageSync('USETTOKEN');
					console.log('token', token)
					if (token) {
						console.log("Token未过期");
						uni.reLaunch({
							url: '../main/main',
						});
					}
				} catch (e) {}
			},
			userLogin: function(e) {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
						console.log(loginRes.code);
						//普通用户登录
						var allParams = {
							url: 'login/user', //地址为Config.restUrl拼接地址 
							setUpUrl: true, //不需要拼接请设置为false 
							type: 'get', //请求类型
							data: {
								wxcode: loginRes.code
							},
							sCallback: function(data) {
								console.log(data);
								if (data.code == 1) {
									let openid = data.openid;
									if (data.info == "BIND") {
										uni.navigateTo({
											url: '/pages/bind/bind?openid=' + openid,
											success() {
												uni.showToast({
													title: '请绑定工号信息',
													icon: 'none'
												})

											}
										});
									} else if (data.info == "DISABLED") {
										uni.showToast({
											title: '账号已被禁用',
											icon: 'none',
											success() {
												_this.SubmitButtonDisabled = false;
												_this.$refs.loading.close();
											}
										})
									} else {
										uni.showToast({
											title: data.info,
											icon: 'none'
										})
									}
								} else {
									uni.setStorage({
										key: 'USERTOKEN',
										data: data.info
									});
									uni.setStorage({
										key: 'USERID',
										data: data.userid
									});
									uni.setStorage({
										key: 'USERROLE',
										data: '0',
										success: function() {
											uni.reLaunch({
												url: '../main/main',
												success() {
													uni.showToast({
														title: '登陆成功',
														icon: 'none'
													})
												}
											})
										}
									});
								}
							}
						};
						_this.$base.request(allParams, _this);

					},
					fail: function(err) {
						_this.SubmitButtonDisabled = false;
						_this.$refs.loading.close();
					}
				});
			}
		}
	}
</script>

<style>
	.header {
		width: 161upx;
		height: 161upx;
		/* box-shadow:0upx 0upx 60upx 0upx rgba(0,0,0,0.1);
		border-radius:50%;
		background-color: #000000; */
		margin-top: 128upx;
		margin-bottom: 72upx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		/* 	width:161upx;
	height:161upx;
	border-radius:50%; */

		width: 180upx;
		height: 180upx;
	}

	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70upx;
		padding-right: 70upx;
	}

	/* 底部 */
	.footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		margin-top: 64upx;
		color: rgba(0, 0, 0, 0.7);
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}
</style>
