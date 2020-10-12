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
      <view class="action" v-if="showpahk" @click="deletedevice">
        <text class="cuIcon-deletefill text-gray"></text>清空历史
      </view>
    </view>
    <view class="cu-bar search bg-white margin-top">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <text class="cuIcon-close" v-if="cuIconde" style="position: absolute;left:500upx;z-index: 99999;" @click="nonecuIconde"></text>
        <input @focus="InputFocus" :value="searchdata" @blur="InputBlur" @input="devicedata" :adjust-position="false"
          type="text" :placeholder="devicedatasetshow === '' ? '搜索设备号、名称 ' : devicedatasetshow " confirm-type="search"></input>
      </view>
      <!-- 搜索设备号、名称 -->
      <view class="action">
        <button class="cu-btn bg-green shadow-blur round" @click="postseachdata">搜索</button>
      </view>
    </view>
    <view class="cu-list menu-avatar" style="margin-top: 12upx;" :style="bottom">
      <view class="cu-item" v-for="(item,index) in seardevicedata" :key="index" @click="devicceinfo(item.id)">
        <view class="cu-avatar round lg" :style="item.status_name === '正常' ? icon_device_li_green :  icon_device_li "></view>
        <view class="content">
          <view class="text-grey">{{item.username}}</view>
          <view class="text-gray text-sm">设备编号:{{item.devicenum}}</view>
        </view>
        <view class="action" :style="item.status_name.length === 5 ? 'margin-right:60upx;' : (item.status_name.length === 4 ? 'margin-right:30upx;' : '')"
          style="margin-top:25upx;">
          <view :class="item.status_name === '正常'? 'cu-tag bg-green' : 'cu-tag bg-red' ">{{item.status_name}}</view>
        </view>
      </view>
    </view>
    <view class="history" v-if="showpahk">
      <view class="cu-tag bg-grey" style="margin-top: 20upx;margin-left: 12upx;" v-for="(item,index) in showdevicedata"
        :key="index" @click="postseachdataset(item)">{{ item }}</view>
    </view>
  </view>
</template>

<script>
  import http from '@/components/utils/http.js';
  export default {
    data() {
      return {
        InputBottom: 0,
        searchdata: '',
        setsearchdata: '',
        seardevicedata: [],
        cuIconde: false,
        showpahk: false,
        devicedatasetshow: '',
        showdevicedata: '',
        icon_device_li_green: 'background-image: url(../../static/img/icon_device_li_green.png)',
        icon_device_li: 'background-image:url(../../static/img/icon_device_li.png)',
        bottom: 'margin-bottom:120upx',
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
        //监听搜索框空值
        this.isinputnull();
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
          if (res.data.data.length > 0) {
            this.seardevicedata = res.data.data;
            this.noewpa();
          } else {
            uni.showToast({
              title: '暂无数据',
              duration: 2000
            });
            let that = this;
            setTimeout(function() {
              that.seardevicedata = [];
              that.isinputnull();
              that.searchdata = '';
            }, 2000)
          }
          this.setseachdata();
          this.chatshowsetdevice();
        }, error => {
          console.log(error);
        })
      },
      //缓存搜索历史
      setseachdata() {
        const value = uni.getStorageSync('setseachdata');
        if (value === undefined || value === '') {
          uni.setStorageSync('setseachdata', this.searchdata.split(','));
        } else {
          if (value.length <= 30) {
            this.setsearchdata = value;
            if (this.searchdata != '') {
              this.setsearchdata.push(this.searchdata);
              uni.setStorageSync('setseachdata', this.setsearchdata);
            }
          }
        }
      },
      //判断是否安卓或者ios
      judgePlatForm() {
        let platform = uni.getSystemInfoSync().platform;
        console.log(platform);
        if (platform == 'ios') {
          this.bottom = 'margin-bottom:180upx';
        } else {
         // #ifdef MP
          this.bottom = 'margin-bottom:180upx';
         // #endIf
        }
      },
      //获取缓存搜索
      chatshowsetdevice() {
        this.showdevicedata = uni.getStorageSync('setseachdata');
      },
      // 显示隐藏框
      shownoew() {
        this.showpahk = true;
      },
      noewpa() {
        this.showpahk = false;
      },
      //模糊列表
      imitation() {
        this.devicedatasetshow = '';
        let opts = {
          url: 'huinapphome/imitation',
          method: 'post'
        };
        let data = {
          imitationdata: this.searchdata,
        };
        http.httpRequest(opts, data).then(res => {
          if (res.data.data.length > 0) {
            this.seardevicedata = res.data.data;
            this.noewpa();
          } else {
            this.seardevicedata = [];
            this.isinputnull();
          }
        }, error => {
          console.log(error);
        })
      },
      //跳转设备详情
      devicceinfo(id) {
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
      //删除搜索历史记录
      deletedevice() {
        uni.removeStorageSync('setseachdata');
        this.noewpa();
      },
      postseachdataset(devicedataset) {
        this.cuIconde = true;
        let opts = {
          url: 'huinapphome/imitation',
          method: 'post'
        };
        let data = {
          imitationdata: devicedataset,
        };
        this.searchdata = devicedataset,
          http.httpRequest(opts, data).then(res => {
            if (res.data.data.length > 0) {
              this.seardevicedata = res.data.data;
              this.noewpa();
            } else {
              uni.showToast({
                title: '暂无数据',
                duration: 2000
              });
              let that = this;
              setTimeout(function() {
                that.seardevicedata = [];
                that.isinputnull();
                that.searchdata = '';
                that.cuIconde = false;
              }, 2000)
            }
          }, error => {
            console.log(error);
          })
      },
      //监听搜索框空值
      isinputnull() {
        if (this.searchdata === '') {
          this.chatshowsetdevice();
          this.shownoew();
          this.seardevicedata = [];
        }
      },
      //删除
      nonecuIconde() {
        this.cuIconde = false;
        this.searchdata = '';
        this.seardevicedata = [];
        this.isinputnull();
      },
    },
    created() {
      this.seardevicedata = [];
      this.chatshowsetdevice();
      this.judgePlatForm();
      if (uni.getStorageSync('setseachdata').length > 0) {
        this.shownoew();
      }
    },
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
