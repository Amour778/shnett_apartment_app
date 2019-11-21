<template>
	<view>
		<!-- loading -->
		<loading ref="loading" :custom="false" :shadeClick="false" :type="2"></loading>
		<!-- loading -->
		<view>
			<view  class="cu-timeline" v-if="NoticeList.length==0">
				<view class="cu-time"></view>
				<view class="cu-item">
					<view class="content">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">日期</view>
							<view class="cu-tag line-cyan">时间</view>
						</view>
						<view class="margin-top">无数据</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="cu-timeline" v-for="(item, index) in NoticeList" :key="index">
					<view class="cu-item  cur cuIcon-noticefill">
						<view class="content shadow-blur">
							<view class="cu-capsule radius">
								<view class="cu-tag bg-cyan">{{item.create_date.substring(0, 10)}}</view>
								<view class="cu-tag line-cyan">{{item.create_date.substring(11, 16)}}</view>
							</view>
							<view class="margin-top">{{item.info}}</view>
						</view>
					</view>
				</view>
				<view class="solids-bottom padding-xs flex align-center">
					<view class="flex-sub text-center">
						<view class="solid-bottom text-sm padding" @click="getnewsList">
							<text v-if="LoadSta==0" class="text-grey">点击加载更多</text>
							<text v-else-if="LoadSta==1" class="text-grey">加载中...</text>
							<text v-else-if="LoadSta==2" class="text-grey">没有更多数据了</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				NoticeList: [],
				LoadSta: 0, //0默认状态），1加载中），2没有了）
				page: 1,
				limit: 10,
			}
		},
		mounted() {
			_this = this;
			_this.getnewsList();
		},
		methods: {
			//加载更多
			getnewsList() {
				if (_this.LoadSta == 2) {
					uni.showToast({
						title: '没有更多数据了',
						icon: 'none'
					});
					return;
				}
				_this.LoadSta = 1;
				var allParams = {
					url: 'queryAllNoticeInfoByLimit',
					setUpUrl: true,
					data: {
						page: _this.page,
						limit: _this.limit
					},
					type: 'get',
					sCallback: function(res) {
						if (res.code == 1) {
							_this.NoticeList = [];
							_this.LoadSta = 2;
							uni.showToast({
								title: '获取公告数据失败',
								icon: 'none'
							})
						} else if (res.code == 0) {
							console.log("res.data.length == 0 ： ", res.data.length == 0);
							if (res.data.length == 0) {
								_this.LoadSta = 2;
								//_this.NoticeList = [];
							} else {
								_this.page++;
								_this.LoadSta = 0;
								_this.NoticeList = _this.NoticeList.concat(res.data);
							}
							console.log("_this.LoadSta ： ", _this.LoadSta);

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
