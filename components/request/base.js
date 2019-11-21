import { Token } from './token.js';
import { Config } from './config.js';
class Base {
    constructor() {
        "use strict";
        this.baseRestUrl = Config.restUrl;
    }

    //http 请求类, 当noRefech为true时，不做未授权重试机制
    request(params,_this, noRefetch) {
		_this.$refs.loading.open();
		_this.SubmitButtonDisabled = "disabled";
		/* uni.showLoading({
			title: '加载中',
			mask:true
		}) */
        var that = this,
            url=this.baseRestUrl + params.url;
        if(!params.type){
            params.type='get';
        }
        /*不需要再次组装地址*/
        if(params.setUpUrl==false){
            url = params.url;
        }
        uni.request({
            url: url,
            data: params.data,
            method:params.type,
            header: {
                'content-type': 'application/json',
                'Authorization': uni.getStorageSync('USERTOKEN')
            },
            success: function (res) {
                // 判断以2（2xx)开头的状态码为正确
                var code = res.statusCode.toString();
                var startChar = code.charAt(0);
                if (startChar == '2') {
                    params.sCallback && params.sCallback(res.data);
                } else {
                    if (code == '401') {//无权限，token可能失效或者无效，需要重新获取
						uni.reLaunch({
							url:'/pages/login/login',
							success() {
								uni.showToast({
									title:'登陆状态失效',
									icon:'none'
								})
							}
						});
						return;
                        /* if (!noRefetch) {//初次请求失败才会进行第二次请求，防止进入死循环无限制请求
                            that._refetch(params);
                        } */
                    }
                    if (code == '404') {//请求路径不存在
                       uni.showToast({
                       	title:'请求路径不存在404',icon:'none'
                       })
                       return;
                    }
                    if (code == '500') {//服务器异常
                       uni.showToast({
                       	title:'服务器异常500',icon:'none'
                       })
                       return;
                    }
					
                    that._processError(res);
                    params.eCallback && params.eCallback(res.data);
                }
				//uni.hideLoading();
				_this.SubmitButtonDisabled = false;
				_this.$refs.loading.close();
            },
            fail: function (err) {
               /* uni.hideLoading(); */
				_this.SubmitButtonDisabled = false;
				_this.$refs.loading.close();
				console.log('err',err);
                that._processError(err);
                //params.eCallback && params.eCallback(err);
            },
			complete() {
				_this.$refs.loading.close();
				uni.stopPullDownRefresh();
			}
        });
    }

    _processError(err){
		if(err.errMsg.indexOf("request:fail")!=-1){
			uni.showToast({
				title:'网络异常',icon:'none'
			})
			return;
		}
		uni.showToast({
			title: '异常信息:'+err.errorMsg,
			icon: "none",
		})
    }

    _refetch(param) {//重新登陆获取最新token
        var token = new Token();
        token.getTokenFromServer((token) => {
            this.request(param, true);
        });
    }
};

export {Base};
