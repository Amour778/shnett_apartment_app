<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">图标</block></cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索cuIcon" confirm-type="search" @input="searchIcon"></input>
			</view>
		</view>
		<view class="cu-list grid col-1">
			<view class="cu-item" v-for="(item,index) in cuIcon" :key="index" v-if="item.isShow">
				<text class="lg text-gray" :class="'cuIcon-' + item.name"></text>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				
			}
		},
		mounted() {
			_this = this;
		},
		methods: {
			searchIcon(e) {
				let key = e.detail.value.toLowerCase();
				let list = this.cuIcon;
				for (let i = 0; i < list.length; i++) {
					let a = key;
					let b = list[i].name.toLowerCase();
					if (b.search(a) != -1) {
						list[i].isShow = true
					} else {
						list[i].isShow = false
					}
				}
				this.cuIcon = list
			}
		}
	}
</script>

<style>

</style>
