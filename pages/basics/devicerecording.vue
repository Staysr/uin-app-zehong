<template>
  <view style="background-color: #F0F0F0;">
    <cu-custom bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">设备记录</block>
    </cu-custom>
    <view>
      <view class="cu-timeline" v-for="(item,index) in devicedata">
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
  </view>
</template>

<script>
  import http from '@/components/utils/http.js';
  export default {
    data() {
      return {
        devicedata: [],
      }
    },
    methods: {
      deviceinfo(total, device_num) {
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
        }, error => {
          console.log(error);
        })
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
    }
  }
</script>

<style>
</style>
