<template>
  <view>
    <cu-custom bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">系统设置</block>
    </cu-custom>
    <!-- 名称 -->
    <view class="cu-list menu card-menu margin-top-xl  shadow-lg radius">
      <view class="cu-item arrow">
        <navigator class="content" hover-class="none">
          <text class="cuIcon-my text-grey"></text>
          <text class="text-grey">名称:</text><text style="float:right">{{ my.name }}</text>
        </navigator>
      </view>
    </view>
    <!-- 报警通知设置 -->
    <view class="cu-list menu card-menu margin-top-xl  shadow-lg radius">
      <view class="cu-item arrow">
        <navigator class="content" hover-class="none">
          <text class="cuIcon-settings text-grey"></text>
          <text class="text-grey">报警通知设置</text>
        </navigator>
      </view>
    </view>

    <!-- 系统版本 -->
    <view class="cu-list menu card-menu margin-top-xl  shadow-lg radius">
      <view class="cu-item arrow">
        <navigator class="content" hover-class="none">
          <text class="cuIcon-info text-grey"></text>
          <text class="text-grey">系统版本:</text><text style="float:right">1.0</text>
        </navigator>
      </view>
    </view>
    <!-- 问题反馈 -->
    <view class="cu-list menu card-menu margin-top-xl  shadow-lg radius">
      <view class="cu-item arrow">
        <navigator class="content" hover-class="none" url="../userme/infozehong?type=1">
          <text class="cuIcon-question text-grey"></text>
          <text class="text-grey">问题反馈</text>
        </navigator>
      </view>
    </view>
    <!-- 关于泽宏 -->
    <view class="cu-list menu card-menu margin-top-xl  shadow-lg radius">
      <view class="cu-item arrow">
        <navigator class="content" hover-class="none" url="../userme/infozehong?type=2">
          <text class="cuIcon-like text-grey"></text>
          <text class="text-grey">关于泽宏</text>
        </navigator>
      </view>
    </view>
    <!-- 退出 -->
    <view class="cu-list menu card-menu  margin-bottom-xl shadow-lg radius">
      <view class="cu-item arrow">
        <navigator class="content" hover-class="none" @click="ligoin">
          <text class="cuIcon-lock text-grey"></text>
          <text class="text-grey">退出</text>
        </navigator>
      </view>
    </view>
    <!--  -->

  </view>
</template>

<script>
  import http from '@/components/utils/http.js';
  export default {
    data() {
      return {
        my: uni.getStorageSync('islogin'),
      }
    },
    methods: {
      //退出
      ligoin() {
        //清楚缓存
        uni.removeStorageSync('islogin');
        uni.removeStorageSync('Authorization');
        uni.redirectTo({
          url: '../login/login',
        });
      },
      //监听设备的变化
      onUIStyle() {
        uni.onUIStyleChange(function(res) {});
      },
    },
    created() {
      this.onUIStyle();
    },
  }
</script>

<style>
</style>
