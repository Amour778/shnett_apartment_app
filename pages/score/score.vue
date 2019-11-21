<template>
	<view>
		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->

		<form @submit="submitScore">
			<view class="cu-form-group">
				<view class="title">公寓ID</view>
				<input name="apa_id" :value="ScoreInfo.apa_id" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">公寓名称</view>
				<input name="apa_name" :value="ScoreInfo.apa_name" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">用户工号</view>
				<input name="user_id" :value="ScoreInfo.user_id" disabled="true"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">评分</view>
			</view>
			<block v-if="starConfig.defaultStar>=0">
				<sunui-star :defaultStar="starConfig.defaultStar" :maxStar="starConfig.maxStar" :iconName="starConfig.iconName"
				 :starSize='starConfig.starSize' :isTips="starConfig.isTips" :disabledStar="starConfig.disabledStar" @changeStar="changeStar"
				 class='sunui-star' />
			</block>
			<view class="cu-form-group" v-if="modalName">
				<view class="title">备注</view>
				<textarea maxlength="255" @input="textareaBInput" placeholder="请输入评分原因"></textarea>
			</view>
			<view class="cu-form-group" v-if="!modalName">
				<view class="title">备注</view>
				<text>{{ScoreInfo.remark}}</text>
			</view>
			<view class="padding">
				<button class="cu-btn round block bg-blue margin-tb-sm lg" :disabled="!modalName" form-type="submit">{{btnText}}</button>
			</view>
		</form>
	</view>
</template>

<script>
	var _this;
	import sunuiStar from '@/components/sunui-star/sunui-star.vue';
	export default {
		components: {
			'sunui-star': sunuiStar
		},
		data() {
			return {
				starConfig: {
					defaultStar: -1,
					maxStar: 5,
					starSize: '3em',
					isTips: false,
					iconName: 'icon-aixin',
					disabledStar: false
				},
				ScoreInfo: {
					apa_id: '',
					apa_name: '',
					user_id: '',
					score: -1,
					remark: ''
				},
				modalName: true,
				btnText: '提交数据'
			}
		},
		mounted() {
			_this = this;
			let USERID = uni.getStorageSync("USERID");

			//根据用户工号获取用户当前的床位信息
			/**......**/
			var allParams = {
				url: 'checkUserScoreIsHave',
				setUpUrl: true,
				type: 'get',
				data: {
					user_id: USERID,
				},
				sCallback: function(data) {
					if (data.code == 1) {
						if (data.info == 'NO') { //用户未入住，不可评价
							uni.showModal({
								content: "未入住，不可评价",
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
						} else { //用户做过评价了，直接展示评价内容
							_this.ScoreInfo = data.info[0];
							if (_this.ScoreInfo.remark == null || _this.ScoreInfo.remark == "null" || _this.ScoreInfo.remark ==
								"undefined") {
								_this.ScoreInfo.remark = '';
							}
							_this.starConfig.disabledStar = true;
							_this.starConfig.defaultStar = _this.ScoreInfo.score;
							_this.btnText = '已提交过评价';
						_this.modalName = false;
						}
					} else if (data.code == 0) { //用户未做过评价
						_this.ScoreInfo = data.info[0];
						_this.ScoreInfo.score = 0;
						_this.starConfig.disabledStar = false;
						_this.starConfig.defaultStar = 0;
						_this.modalName = true;
					} else {
						uni.showModal({
							content: "获取数据异常",
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
					}
					console.log(_this.starConfig.disabledStar);
					console.log(_this.starConfig.defaultStar);
				}
			};
			_this.$base.request(allParams, _this);
		},
		methods: {
			changeStar: function(e) {
				_this.ScoreInfo.score = e.curStar;
				console.log(e.curStar);
				console.log(_this.ScoreInfo.score);
			},
			textareaBInput(e) {
				_this.ScoreInfo.remark = e.detail.value
			},
			submitScore: function(e) {
				//var formdata = e.detail.value
				var allParams = {
					url: 'addNewScore',
					setUpUrl: true,
					type: 'get',
					data: {
						apa_id: _this.ScoreInfo.apa_id,
						user_id: _this.ScoreInfo.user_id,
						score: _this.ScoreInfo.score,
						remark: _this.ScoreInfo.remark,
					},
					sCallback: function(data) {
						if (data.code == 0) {
							uni.showToast({
								title: '提交评价成功',
								success() {
									uni.navigateBack({
										delta: 1
									});
								}
							});
						} else {
							uni.showToast({
								title: '提交评价异常'
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
