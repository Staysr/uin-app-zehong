<template>
  <view>
    <basics v-if="PageCur=='basics'"></basics>
    <components v-if="PageCur=='component'"></components>
    <adddevice v-if="PageCur=='adddevice'"></adddevice>
    <userme v-if="PageCur=='userme'"></userme>
    <search v-if="PageCur=='search'"></search>
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
      <view :class="PageCur=='search'?'action text-green':'action text-gray'" @click="NavChange" data-cur="search">
        <view class="cuIcon-search">
        </view>
        搜索设备
      </view>
      <view :class="PageCur=='userme'?'action text-green':'action text-gray'" @click="NavChange" data-cur="userme">
        <view class="cuIcon-my">
        </view>
        我的
      </view>
    </view>
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
        this.iswifi(e);
      },
      //监测网络状态
      iswifi(e) {
        let that = this;
        uni.getNetworkType({
          success: function(res) {
            if (res.networkType === "none") {
              uni.navigateTo({
                url: '../wifiisin/home'
              });
            } else {
              that.PageCur = e.currentTarget.dataset.cur;
            }
          }
        });
      }
    }
  }
</script>

<style>

</style>
