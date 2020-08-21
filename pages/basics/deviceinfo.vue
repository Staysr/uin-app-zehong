<template>
  <view>
    <cu-custom bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">{{ devicedata.devicenum }}设备详情</block>
    </cu-custom>
    <!-- 设备详情开始 -->
    <view class="cu-list menu" style="margin-top: 20upx;">
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-titles text-grey"></text>
          <text class="text-grey">ID:<text style="color: black;">{{ devicedata.id  }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-similar text-grey"></text>
          <text class="text-grey">设备号:<text style="color: black;"> {{ devicedata.devicenum  }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-newsfill text-grey"></text>
          <text class="text-grey">设备名称: <text style="color: black;">{{ devicedata.username  }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-profile text-grey"></text>
          <text class="text-grey">用户名称:<text style="color: black;">{{ devicedata.nameh  }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-btn text-grey"></text>
          <text class="text-grey">设备类型:<text style="color: black;">{{ devicedata.tname  }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-post text-grey"></text>
          <text class="text-grey">设备介质:<text style="color: black;">{{ devicedata.gas  }}/{{ devicedata.nd }}/{{ devicedata.danwei }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-sort text-grey"></text>
          <text class="text-grey">设备单位:<text style="color: black;">{{ devicedata.gas  }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-title text-grey"></text>
          <text class="text-grey">实时设备状态:<text :style="devicedata.status_name === '正常' ? 'color:green;' : 'color:red;' ">{{ devicedata.status_name  }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-deletefill text-grey"></text>
          <text class="text-grey">是否被丢弃废纸篓:<text :style="devicedata.delete === 1 ? 'color:red' : 'color:green'">{{ devicedata.delete === 1 ? '设备丢弃' : '设备正常' }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-ellipse text-grey"></text>
          <text class="text-grey">设备所属:<text style="color: black;">{{ devicedata.isadmin === 1 ? '设备所属管理员' : "设备所属用户" }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-usefull text-grey"></text>
          <text class="text-grey">设备联系人:<text style="color: black;">{{ devicedata.devicelinkman }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-shake text-grey"></text>
          <text class="text-grey">设备手机号:<text style="color: black;" @click="phonect(devicedata.devicephone)">{{ devicedata.devicephone }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-infofill text-grey"></text>
          <text class="text-grey">设备详情:<text style="color: black;">{{ devicedata.deviceinfo }}</text></text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-timefill text-grey"></text>
          <text class="text-grey">添加时间:<text style="color: black;">{{ devicedata.deviceaddtime | timeStamp }}</text></text>
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
      //拨打电话
      phonect(phone){
        if (!phone) return '';
        uni.makePhoneCall({
            phoneNumber: phone,  //仅为示例
        });
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
      var data = JSON.parse(e.data);
      this.devicedata = data;
    }
  }
</script>

<style>
</style>
