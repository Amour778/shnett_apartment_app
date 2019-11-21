import {
	Config
} from './config.js';

class Token {
	constructor() {
		this.tokenUrl = Config.restUrl + 'token/user'; //生成新的Token
	}

	//重新登陆获取token
	getTokenFromServer(callBack) {
		
		if(1==1){
			uni.navigateTo({
				url:'/pages/login/login'
			});
			return;
		}
		
		
		var that = this;
		let USERNAME = uni.getStorage('USERNAME');
		let PASSWORD = uni.getStorage('PASSWORD');
		//用户没有使用账号密码登陆过，则调用微信的login方法获取新的token
		if (USERNAME == null && PASSWORD == null) {
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					uni.request({
						url: Config.restUrl + 'login/user',
						method: 'get',
						data: {
							wxcode: loginRes.code
						},
						success: function(data) {
							if (data.code == 1) {
								let openid = data.openid;
								if (data.info == "BIND") {
									uni.redirectTo({
										url: '/pages/bind/bind?openid=' + openid,
										success() {
											uni.showModal({
												content: '刷新令牌失败，请重新绑定工号信息',
												showCancel: false
											})
										}
									});
								} else if (data.info == "DISABLED") {
									uni.redirectTo({
										url: '/pages/login/login',
										success() {
											uni.showModal({
												content: '刷新令牌失败，账号已被禁用',
												showCancel: false
											})
										}
									});

								} else {
									uni.redirectTo({
										url: '/pages/login/login',
										success() {
											uni.showModal({
												content: '刷新令牌失败，异常信息:' + data.info,
												showCancel: false
											})
										}
									});
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
									data: '0'
								});
								callBack && callBack(data.info);
							}
						}
					})
				},
				fail(err) {
					if (err.errMsg.indexOf("request:fail") != -1) {
						uni.redirectTo({
							url: '/pages/login/login',
							success() {
								uni.showModal({
									title: '刷新令牌失败，网络异常',
									showCancel: false
								})
							}
						});
						return;
					}
					uni.redirectTo({
						url: '/pages/login/login',
						success() {
							uni.showModal({
								title: '刷新令牌失败，异常信息:' + err.errMsg,
								showCancel: false
							})
						}
					});
				}
			})
		} else {
			try { //初次登陆时就在本地存储登陆方式以及登陆凭证
				let USERNAME = uni.getStorage('USERNAME');
				let PASSWORD = uni.getStorage('PASSWORD');
				uni.request({
					url: Config.restUrl + 'login/admin',
					data: {
						username: USERNAME,
						password: PASSWORD
					},
					method: 'get',
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						uni.setStorage('USERTOKEN', res.info);
						callBack && callBack(res.info);
					},
					fail(err) {
						if (err.errMsg.indexOf("request:fail") != -1) {
							uni.redirectTo({
								url: '/pages/login/login',
								success() {
									uni.showModal({
										title: '刷新令牌失败，网络异常',
										showCancel: false
									})
								}
							});
							return;
						}
						uni.redirectTo({
							url: '/pages/login/login',
							success() {
								uni.showModal({
									title: '刷新令牌失败，异常信息:' + err.errorMsg,
									showCancel: false
								})
							}
						});
					}
				})
			} catch (e) {
				uni.redirectTo({
					url: '/pages/login/login',
					success() {
						uni.showModal({
							title: '刷新令牌失败，异常信息:' + e,
							showCancel: false
						})
					}
				});
				console.log(e)
			}
		}
	}
}

export {
	Token
};
