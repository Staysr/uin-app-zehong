<template>
  <view>
    <view class="UCenter-bg" catchtap='toMy_detail'>
      <image src="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" class="png"></image>
      <view class="text-xl">
        <!-- <text>Amibition</text>   -->
      </view>
      <view class="margin-top-sm">
        <text>My左</text>
      </view>
      <image src="https://raw.githubusercontent.com/weilanwl/ColorUI/master/demo/images/wave.gif" mode="scaleToFill"
        class="gif-wave"></image>
    </view>
    <!-- 用户信息end -->

    <view class="padding flex text-center text-grey bg-white shadow-warp">

      <view class="flex flex-sub flex-direction solid-right" bindtap='toPraise'>
        <view class="text-xxl text-orange">0</view>
        <view class="margin-top-sm">
          <text class="cuIcon-attentionfill"></text> 报警数量</view>
      </view>
      <view class="flex flex-sub flex-direction solid-right" bindtap='toAttention'>
        <view class="text-xxl text-blue">5</view>
        <view class="margin-top-sm">
          <text class="cuIcon-favorfill"></text>设备数量</view>
      </view>
      <view class="flex flex-sub flex-direction" bindtap='toFans'>
        <view class="text-xxl text-green">0</view>
        <view class="margin-top-sm">
          <text class="cuIcon-fork"></text>设备分析</view>
      </view>

    </view>


    <!-- 设置详细 -->
    <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
      <view class="cu-item arrow">
        <view class="content" @tap="toIssue_page">
          <text class="cuIcon-moneybagfill text-red"></text>
          <text class="text-grey">报警设备</text>
          <text class='num'>19</text>
        </view>
      </view>

      <view class="cu-item arrow">
        <navigator class="content" hover-class="none" url='/pages/my/my_sale/my_sale'>
          <text class="cuIcon-titles text-green"></text>
          <text class="text-grey">我的设备</text>
          <text class='num'>99</text>
        </navigator>
      </view>
      <view class="cu-item arrow">
        <navigator class="content" hover-class="none" url="/pages/my/my_buy/my_buy">
          <text class="cuIcon-formfill text-green"></text>
          <text class="text-grey">用户设备</text>
          <text class='num'>1</text>
        </navigator>
      </view>
      <view class="cu-item arrow">
        <view class="content" bindtap="CopyLink" data-link="https://github.com/weilanwl/ColorUI">
          <text class="cuIcon-locationfill text-grey"></text>
          <text class="text-grey">用户列表</text>
        </view>
      </view>
      <view class="cu-item arrow">
        <view class="content" bindtap="toCollect">
          <text class="cuIcon-appreciatefill text-red"></text>
          <text class="text-grey">客服</text>
        </view>
      </view>
    </view>
    <view class="cu-tabbar-height"></view>
    <!-- 设置详细end -->
  </view>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style>
  /* pages/my/my.wxss */
  /* 用户信息 */


  .UCenter-bg {
    background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
    background-size: cover;
    height: 450rpx;
    display: flex;
    justify-content: center;
    padding-top: 40rpx;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-weight: 300;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }

  .UCenter-bg text {
    opacity: 0.8;
  }

  .UCenter-bg image {
    width: 200rpx;
    height: 200rpx;
  }

  .UCenter-bg .gif-wave {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 99;
    mix-blend-mode: screen;
    height: 100rpx;
  }

  map,
  .mapBox {
    left: 0;
    z-index: 99;
    mix-blend-mode: screen;
    height: 100rpx;
  }

  map,
  .mapBox {
    width: 750rpx;
    height: 300rpx;
  }

  .text-xl image {
    height: 100rpx;
    width: 100rpx;
  }

  .png {

    border-radius: 100%;
  }


  .num {
    direction: rtl;
    margin-left: 58%;
    font-size: 25rpx;
  }
</style>
