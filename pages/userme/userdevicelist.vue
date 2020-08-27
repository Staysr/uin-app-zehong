<template>
  <view>
    <cu-custom bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">{{ username }}设备列表</block>
    </cu-custom>
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-orange "></text> 用户设备列表
      </view>
    </view>

    <view class="cu-list menu-avatar">
      <view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in userlistdata"
        :key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
        <view class="cu-avatar round lg" :style="item.status_name === '正常' ? icon_device_li_green :  icon_device_li "></view>
        <view class="content">
          <view class="text-grey">位置:{{item.deviceinfo}}</view>
          <view class="text-gray text-sm">设备编号:{{item.devicenum}}</view>
          <view class="text-gray text-sm">值:{{item.nd}}</view>
        </view>
       <view class="action" :style="item.status_name.length === 5 ? 'margin-right:60upx;' : (item.status_name.length === 4 ? 'margin-right:30upx;' : '')"
          style="margin-top:25upx;">
          <view :class="item.status_name === '正常'? 'cu-tag bg-green' : 'cu-tag bg-red' ">{{item.status_name}}</view>
        </view>
        <view class="move">
          <view class="bg-grey" @click="devicedatainfo(item.id)">查详情</view>
          <view class="bg-red" @click="devicerecording(item.devicenum)">查记录</view>
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
        username: '',
        icon_device_li_green: 'background-image: url(../../static/img/icon_device_li_green.png)',
        icon_device_li: 'background-image:url(../../static/img/icon_device_li.png)',
        uid: '',
        userlistdata: [],
        modalName: null,
        listTouchStart: 0,
      }
    },
    methods: {
      userlist() {
        uni.showLoading({
            title: '加载数据中...'
        });
        let opts = {
          url: 'devices/deviceLocation',
          method: 'get'
        };
        let data = {
          uid: this.uid,
        };
        http.httpRequest(opts, data).then(res => {
          this.userlistdata = res.data.data;
          uni.hideLoading();
        }, error => {
          console.log(error);
        })
      },
      //获取设备详情
      devicedatainfo(id) {
        let opts = {
          url: 'huinapphome/devicedatainfo/' + id,
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
      devicerecording(id) {
        let data = {
          currentPage: 1,
          deviceNum: id,
          deviceStatus: 0,
          pageSize: 1,
          timeRange: '',
          total: 1,
        };
        let opts = {
          url: 'devices/detedevice',
          method: 'post'
        };
        http.httpRequest(opts, data).then(res => {
          if (res.data.data.total > 0) {
            if (res.data.code === 200) {
              uni.navigateTo({
                url: '/pages/basics/devicerecording?data=' + JSON.stringify(res.data.data),
              });
            }
          } else {
            uni.showToast({
              icon: 'none',
              title: '暂无记录',
              duration: 2000
            });
          }
        }, error => {
          console.log(error);
        })
      },
      // ListTouch触摸开始
      ListTouchStart(e) {
        this.listTouchStart = e.touches[0].pageX - 120
      },
      // ListTouch计算方向
      ListTouchMove(e) {
        this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
      },

      // ListTouch计算滚动
      ListTouchEnd(e) {
        if (this.listTouchDirection == 'left') {
          this.modalName = e.currentTarget.dataset.target
        } else {
          this.modalName = null
        }
        this.listTouchDirection = null
      },
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
    onLoad(e) {
      this.uid = e.id;
      this.username = e.name;
    },
    created() {
      //获取报警记录
      this.userlist();
    },
  }
</script>

<style>
</style>
