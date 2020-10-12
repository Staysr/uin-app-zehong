<template>
  <view>
    <view class="UCenter-bg" catchtap='toMy_detail'>
      <image src="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" class="png"></image>
      <view class="text-xl">
        <!-- <text>Amibition</text>   -->
      </view>
      <view class="margin-top-sm">
        <text class="radius text-center shadow-blur bg-black">{{ username }}</text>
      </view>
      <!-- <image src="https://raw.githubusercontent.com/weilanwl/ColorUI/master/demo/images/wave.gif" mode="scaleToFill"
        class="gif-wave"></image> -->
    </view>
    <!-- 用户信息end -->

    <view class="padding flex text-center text-grey bg-white shadow-warp">

      <view class="flex flex-sub flex-direction solid-right" bindtap='toPraise'>
        <view class="text-xxl text-orange">{{ userdata.devicepolice }}</view>
        <view class="margin-top-sm">
          <text class="cuIcon-attentionfill"></text> 报警数量</view>
      </view>
      <view class="flex flex-sub flex-direction solid-right" bindtap='toAttention'>
        <view class="text-xxl text-blue">{{ userdata.devicecount }}</view>
        <view class="margin-top-sm">
          <text class="cuIcon-favorfill"></text>设备数量</view>
      </view>
      <view class="flex flex-sub flex-direction" bindtap='toFans'>
        <view class="text-xxl text-green" :style="devicetype > 0 ? 'color:red;' : 'color:green;' ">{{ devicetype < 20 ? '良好' :( devicetype < 50 ? '较差' : (devicetype < 70 ? '极差' : (devicetype < 99 ? '危险' : '正常')) ) }}</view>
        <view class="margin-top-sm">
          <text class="cuIcon-fork"></text>设备分析</view>
      </view>

    </view>


    <!-- 设置详细 -->
    <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
      <view class="cu-item arrow">
        <navigator class="content" hover-class="none" @click="ligoin" url='/pages/userme/userpolice'>
          <text class="cuIcon-moneybagfill text-red"></text>
          <text class="text-grey">报警记录</text>
        </navigator>
      </view>
      <view class="cu-item arrow">
        <navigator class="content" hover-class="none" @click="ligoin" :url="isurl? '': url">
          <text class="cuIcon-locationfill text-grey"></text>
          <text class="text-grey">用户列表</text>
        </navigator>
      </view>
      <!-- 设置 -->
      <view class="cu-item arrow">
        <navigator class="content" hover-class="none" @click="ligoin" url="/pages/userme/setup">
          <text class="cuIcon-settingsfill text-grey"></text>
          <text class="text-grey">设置</text>
        </navigator>
      </view>
      <view class="cu-item">
        <view class="content" bindtap="toCollect" @click="service">
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
  import http from '@/components/utils/http.js';
  export default {
    data() {
      return {
        username: uni.getStorageSync('islogin').name,
        userdata: [],
        devicetype: '',
        url: '/pages/userme/userlist',
        isurl: false,
      }
    },
    methods: {
      userinfo() {
        let opts = {
          url: 'homepagecount/homepagecount',
          method: 'get'
        };
        http.httpRequest(opts).then(res => {
          this.userdata = res.data.data;
          this.devicetype = this.devicestatus(res.data.data);
        }, error => {
          console.log(error);
        })
      },
      // 处理分析
      devicestatus(data) {
        var devicecount = data.devicecount; //设备数量
        var devicepolice = data.devicepolice; // 报警数量
        devicepolice = parseFloat(devicepolice);
        devicecount = parseFloat(devicecount);
        if (isNaN(devicepolice) || isNaN(devicecount)) {
          return "-";
        }
        return devicecount <= 0 ? "0" : (Math.round(devicepolice / devicecount * 10000) / 100.00);
      },
      //客服
      service() {

      },
      //处理加载
      ligoin() {
        uni.showLoading({
          title: '加载中'
        });
        setTimeout(function() {
          uni.hideLoading();
          this.isurl = true;
        }, 500);
      },
    },
    created() {
      // 获取信息
      this.userinfo();
    },
  }
</script>

<style>
  .UCenter-bg {
    background-image: url(../../static/zaizai-login/userbage.png);
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
