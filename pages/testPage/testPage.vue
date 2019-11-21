<template>
	<view>
		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->

		<view class="qiun-columns">
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-dot-light">人员入住率</view>
			</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasUserRing" id="canvasUserRing" class="charts"></canvas>
			</view>
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
				<view class="qiun-title-dot-light">床位入住率</view>
			</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasBedRing" id="canvasBedRing" class="charts"></canvas>
			</view>
		</view>
		<view>{{errText}}</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaRing = null;

	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				errText:''
			}
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData() {
				var allParams = {
					url: 'getUserAndBedCheckInCounts',
					setUpUrl: true,
					type: 'POST', //请求类型
					sCallback: function(res) {
						console.log(res);
						if (res.code == 0) {
							console.log("user==>");
							console.log(res.user);
							console.log("bed==>");
							console.log(res.bed);
							let userRing = {series: []};
							//人
							userRing.series = res.user[0].series;
							var sumCount=0,inCount=0,per=0;
							 for (let i = 0; i < userRing.series.length; i++) {
								 sumCount+=userRing.series[i].data;
								 if(userRing.series[i].name=='已入住'){
									 inCount=userRing.series[i].data;
								 }
								userRing.series[i].format = () => {
									return userRing.series[i].name+":" + userRing.series[i].data
								};
							}
							console.log("user==>"+inCount);
							console.log("user==>"+sumCount);
							if(sumCount!=0){
								per = ((inCount / sumCount)*100).toFixed(0);
							}
							console.log("user==>"+inCount);
							_self.showRing("canvasUserRing", userRing,per);
							//床
							sumCount=0,inCount=0,per=0;
							let bedRing = {series: []};
							bedRing.series = res.bed[0].series;
							 for (let i = 0; i < bedRing.series.length; i++) {
								 sumCount+=bedRing.series[i].data;
								 if(bedRing.series[i].name=='已入住'){
									 inCount=bedRing.series[i].data;
								 }
								bedRing.series[i].format = () => {
									return bedRing.series[i].name+":" + bedRing.series[i].data
								};
							}
							console.log("bed==>"+inCount);
							console.log("bed==>"+sumCount);
							if(sumCount!=0){
								per = ((inCount / sumCount)*100).toFixed(0);
							}
							console.log("bed==>"+per);
							_self.showRing("canvasBedRing", bedRing,per);
						} else if (res.code == 0) {
							uni.showModal({
								title: '错误',
								content: res.info,
								showCancel: false
							})
						} else {
							this.errText=res.info;
							uni.showToast({
								title: '返回数据异常',
								icon: 'none'
							})
						}
					}
				};
				this.$base.request(allParams, this);

			},
			showRing(canvasId, chartData,per) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					colors:['#1890ff', '#f04864'],
					fontSize: 11,
					padding: [5, 5, 5, 5],
					legend: {
						show: true,
						position: 'right',
						float: 'center',
						itemGap: 10,
						padding: 5,
						lineHeight: 26,
						margin: 5,
						backgroundColor:'rgba(41,198,90,0.2)',
						borderColor :'rgba(41,198,90,0.5)',
						borderWidth: 1
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
					subtitle: {
						name: per+'%',
						color: '#7cb5ec',
						fontSize: 20 * _self.pixelRatio,
					},
					title: {
						name: '入住率',
						color: '#666666',
						fontSize: 10 * _self.pixelRatio,
					},
					extra: {
						pie: {
							offsetAngle: 0,
							ringWidth: 40 * _self.pixelRatio,
							labelWidth: 15
						}
					},
				});
			}
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
