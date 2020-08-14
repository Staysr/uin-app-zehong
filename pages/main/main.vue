<template>
  <view>
    <basics v-if="PageCur=='basics'"></basics>
    <components v-if="PageCur=='component'"></components>
    <plugin v-if="PageCur=='plugin'"></plugin>
    <adddevice v-if="PageCur=='adddevice'"></adddevice>
    <userme v-if="PageCur=='userme'"></userme>
    <!-- <view class="action" @click="NavChange" data-cur="basics">
    	<view class='cuIcon-cu-image'>
    		<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
    	</view>
    	<view :class="PageCur=='basics'?'text-green':'text-gray'">元素</view>
    </view> -->
    <view class="cu-bar tabbar bg-black shadow foot">
      <view :class="PageCur=='basics'?'action text-green':'action text-gray'" @click="NavChange" data-cur="basics">
        <view class="cuIcon-homefill"></view> 首页
      </view>  
      <view :class="PageCur=='component'?'action text-green':'action text-gray'" @click="NavChange" data-cur="component">
        <view class="cuIcon-similar"></view> 设备状态
      </view>
      <view :class="PageCur=='adddevice'?'action text-green add-action':'action text-gray add-action'">
        <button class="cu-btn cuIcon-add bg-green shadow" @click="NavChange" data-cur="adddevice"></button>
        添加设备
      </view>
      <view class="action text-gray">
        <view class="cuIcon-search">
        </view>
        搜索设备
      </view>
      <view :class="PageCur=='userme'?'action text-green':'action text-gray'" @click="NavChange" data-cur="userme">
        <view class="cuIcon-my">
          <view class="cu-tag badge"></view>
        </view>
        我的
      </view>
    </view>
    <!-- <view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">元素</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'component'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">组件</view>
			</view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">扩展</view>
			</view>
		</view> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        PageCur: 'basics'
      }
    },
    methods: {
      NavChange: function(e) {
        this.PageCur = e.currentTarget.dataset.cur
      }
    }
  }
</script>

<style>

</style>
