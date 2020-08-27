<template>
  <view>
    <cu-custom bgColor="bg-gradual-blue" :isBack="false">
      <block slot="content">搜索设备</block>
    </cu-custom>
    <view class="cu-bar bg-white">
      <view class="action">
        <text class="cuIcon-title text-green"></text>
        <text>搜索设备</text>
      </view>
      <view class="action">
        <text class="cuIcon-deletefill text-gray"></text>清空历史
      </view>
    </view>
    <view class="cu-bar search bg-white margin-top">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input @focus="InputFocus" @blur="InputBlur" @input="devicedata" :adjust-position="false" type="text"
          placeholder="搜索设备号、名称" confirm-type="search"></input>
      </view>
      <view class="action">
        <button class="cu-btn bg-green shadow-blur round" @click="postseachdata">搜索</button>
      </view>
    </view>
    <view class="cu-list menu-avatar" style="margin-top: 12upx;margin-bottom: 120upx;">
      <view class="cu-item" v-for="(item,index) in seardevicedata" :key="index" @click="devicceinfo(item.id)">
        <view class="cu-avatar round lg" :style="item.status_name === '正常' ? icon_device_li_green :  icon_device_li "></view>
        <view class="content">
          <view class="text-grey">{{item.usernickname}}</view>
          <view class="text-gray text-sm">设备编号:{{item.devicenum}}</view>
        </view>
        <view class="action" :style="item.status_name.length === 5 ? 'margin-right:60upx;' : (item.status_name.length === 4 ? 'margin-right:30upx;' : '')"
          style="margin-top:25upx;">
          <view :class="item.status_name === '正常'? 'cu-tag bg-green' : 'cu-tag bg-red' ">{{item.status_name}}</view>
        </view>
      </view>
    </view>
    <!-- <view class="history">
      <view class="cu-tag bg-grey" style="margin-top: 20upx;margin-left: 12upx;" v-for="(item,index) in 30" :key="index">324324</view>
    </view> -->
  </view>
</template>

<script>
  import http from '@/components/utils/http.js';
  export default {
    data() {
      return {
        InputBottom: 0,
        searchdata: '',
        seardevicedata: [],
        icon_device_li_green: 'background-image: url(../../static/img/icon_device_li_green.png)',
        icon_device_li: 'background-image:url(../../static/img/icon_device_li.png)',
      };
    },
    methods: {
      InputFocus(e) {
        this.InputBottom = e.detail.height
      },
      InputBlur(e) {
        this.InputBottom = 0
      },
      //设备搜索
      devicedata(e) {
        this.searchdata = e.detail.value;
        this.imitation();
      },
      //请求搜索
      postseachdata() {
        let opts = {
          url: 'huinapphome/setseachdata',
          method: 'post'
        };
        let data = {
          setseachdata: this.searchdata,
        };
        http.httpRequest(opts, data).then(res => {
          if(res.data.data.length >= 1){
            this.seardevicedata = res.data.data
          }
        }, error => {
          console.log(error);
        })
        // this.setseachdata();
      },
      //缓存搜索历史
      setseachdata() {
        const value = uni.getStorageSync('setseachdata');
        if (value === undefined || value === '') {
          uni.setStorageSync('setseachdata', this.searchdata);
        } else {
          // arr.map((val, index, value) => {
          //   this.deviceList.push(val);
          // })
        }
        uni.setStorageSync('setseachdata', []);
      },
      //模糊列表
      imitation() {
        let opts = {
          url: 'huinapphome/imitation',
          method: 'post'
        };
        let data = {
          imitationdata: this.searchdata,
        };
        http.httpRequest(opts, data).then(res => {
          if(res.data.data.length >= 1){
            this.seardevicedata = res.data.data
          }
        }, error => {
          console.log(error);
        })
      },
      //跳转设备详情
      devicceinfo(id){
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
      }
    }
  }
</script>

<style>
  .history {
    width: 90%;
    height: 550upx;
    margin-left: 32upx;
    margin-top: 70upx;
  }
</style>
