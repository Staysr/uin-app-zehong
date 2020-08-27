<template>
  <view style="background-color: #F0F0F0;">
    <cu-custom bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">设备记录</block>
    </cu-custom>
    <view>
      <view class="cu-timeline" v-for="(item,index) in devicedata" :key="index">
        <view class="cu-item">
          <view class="content">
            <view class="cu-capsule radius">
              <view class="cu-tag bg-cyan">时间</view>
              <view class="cu-tag line-cyan">{{ item.time | timeStamp }}</view>
            </view>
            <view class="margin-top">
              <view>用户ID:{{ item.user_id }}</view>
              <view>值:{{ item.value }}</view>
              <view>设备状态:<text :style="item.device_status != 1 ? 'color:red' : 'color:green;'">{{ item.device_status != 1 ? '异常' : '正常' }}</text></view>
              <view>设备编号:{{ item.device_num }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 返回首页 -->
    <view v-if="ishome">
      <view @click="hoishome">
        <image class="ishome" src="../../static/ishome.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
  import http from '@/components/utils/http.js';
  export default {
    data() {
      return {
        devicedata: [],
        ishome: false,
      }
    },
    methods: {
      deviceinfo(total, device_num) {
        uni.showLoading({
          title: '加载数据中...'
        });
        let data = {
          currentPage: 1,
          deviceNum: device_num,
          deviceStatus: 0,
          pageSize: total,
          timeRange: '',
          total: 1,
        };
        let opts = {
          url: 'devices/detedevice',
          method: 'post'
        };
        http.httpRequest(opts, data).then(res => {
          this.devicedata = res.data.data.list
          uni.hideLoading();
        }, error => {
          console.log(error);
        })
      },
      hoishome() {
        uni.reLaunch({
          url: '../main/main',
        });
      },
    },
    filters: {
      timeStamp: function(str) {
        if (!str) return '';
        var result;
        var reg = /[a-zA-Z]+/;
        while (result = str.match(reg)) {
          str = str.replace(result[0], ' ');
        }
        return str;
      },
    },
    onLoad(e) {
      var data = JSON.parse(e.data);
      this.deviceinfo(data.total, data.list[0].device_num);
    },
    onShow() {
      let pages = getCurrentPages(); //当前页面栈
      if (pages.length >= 4) {
        this.ishome = true;
      }
    },
  }
</script>

<style>
  .ishome{
    width: 90upx;
    height: 90upx;
    position:fixed;
    z-index: 99999;
    left: 640upx;
    bottom: 200upx;
  }
</style>
