<template>
  <view>
    <cu-custom bgColor="bg-gradual-pink" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">报警设备</block>
    </cu-custom>
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-titles text-orange "></text> 报警记录
      </view>
    </view>
    <view class="cu-card dynamic">
      <view class="cu-item shadow">
        <view class="cu-list menu-avatar comment solids-top">
          <view class="cu-item" v-for="(item,index) in policedata" :key="index" @click="deviceinfo(item.deid)">
            <view class="cu-avatar round" :style="item.status === 1 ? icon_device_li : icon_device_li_green"></view>
            <view class="content">
              <view class="text-grey" @click="deviceclone(item.devicenumber)">设备号:{{ item.devicenumber }}</view>
              <view class="text-gray text-content text-df">
                <view class="text-gray text-df">开始报警时间:   {{ item.starttime | timeStamp}}</view>
              </view>
              <view class="text-gray text-content text-df">
                报警浓度: {{ item.concentration }}
              </view>
              <view class="text-gray text-content text-df">
                报警位置: {{ item.location }}
              </view>
              <view class="padding-sm radius margin-top-sm  text-sm shadow-blur" :class="item.status === 1 ? 'bg-red' :'bg-green' ">
                <view class="flex">
                  <view class="flex-sub">当前设备状态:{{ item.status === 1 ? ' 报警 ' : ' 正常 '}}</view>
                </view>
                <view class="flex">
                  <view class="flex-sub">设备是否当前报警:{{ item.status === 1 ? ' 当前正在报警 ' : ' 已结束报警 ' }}</view>
                </view>
              </view>
              <view class="margin-top-sm flex justify-between" v-if="item.endtime != '' ">
                <view class="text-gray text-df">报警结束时间:   {{ item.endtime | timeStamp}}</view>
              </view>
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
        policedata: [],
        icon_device_li_green: 'background-image: url(../../static/img/icon_device_li_green.png)',
        icon_device_li: 'background-image:url(../../static/img/icon_device_li.png)',
      }
    },
    methods: {
      //获取报警
      police() {
        let opts = {
          url: 'devices/police',
          method: 'get'
        };
        http.httpRequest(opts).then(res => {
          this.policedata = res.data.data
        }, error => {
          console.log(error);
        })
      },
      //复制设备号
      deviceclone(data) {
        uni.getSystemInfo({
          success: function(res) {
            if (res.model === undefined) {
                uni.showToast({
                  title: '当前设备不支持复制',
                  duration: 2000
                });
            } else {
              uni.setClipboardData({
                data: data,
                success: () => {
                  uni.showToast({
                    title: '复制成功'
                  })
                }
              });
            }
          }
        });
      },
      deviceinfo(deid){
        let opts = {
          url: 'huinapphome/devicedatainfo/' + deid,
          method: 'get'
        };
        http.httpRequest(opts).then(res => {
          if (res.data.code === 200) {
            uni.navigateTo({
              url: '/pages/basics/deviceinfo?data=' + JSON.stringify(res.data.data),
            });
          }
        }, error => {
          console.log(error);
        })
      },
    },
    computed: {

    },
    filters: {
      timeStamp: function(value) {
        if (!value) return '';
        var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var sdate = ("0" + date.getDate()).slice(-2);
        var hour = ("0" + date.getHours()).slice(-2);
        var minute = ("0" + date.getMinutes()).slice(-2);
        var second = ("0" + date.getSeconds()).slice(-2);
        // 拼接
        var result = year + "." + month + "." + sdate + " " + hour + ":" + minute //+ ":" + second;
        // 返回
        return result;
      },
    },
    created() {
      //获取报警记录
      this.police();
    },
  }
</script>
<style>

</style>
