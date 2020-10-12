<template name="components">
  <view>
    <cu-custom bgColor="bg-gradual-blue" :isBack="false">>
      <block slot="content">设备记录</block>
    </cu-custom>
    <view class="cu-bar bg-white  solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-orange"></text>{{ tagname }}
      </view>
    </view>
    <scroll-view scroll-x class="bg-white nav text-center">
      <view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tagdata" :key="index" @tap="tabSelect"
        :data-id="index" :data-tagname="item.name" :data-type="item.type">
        {{item.name}}
      </view>
    </scroll-view>
    <view class="cu-list menu-avatar" style="margin-top: 12upx;" :style="bottom">
      <view class="cu-item" v-for="(item,index) in devicelist" :key="index" @click="devicceinfo(item.id)">
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
        <view class="loadingjiazai" v-if="loadingjiazai || count > 10">
          <view class="cu-load bg-grey" style="border-radius: 35upx;" v-if="overs" :class="!isLoad?'loading':'over'"></view>
          <view class="cu-load bg-grey" style="border-radius: 35upx;" v-if="isover" @click="adddevivelist">点击加载<text v-if="isloading" class="cuIcon-loading2 cuIconfont-spin"></text></view>
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
        TabCur: 0,
        icon_device_li_green: 'background-image: url(../../static/img/icon_device_li_green.png)',
        icon_device_li: 'background-image:url(../../static/img/icon_device_li.png)',
        tagdata: [{
          'name': '危化监测',
          'type': 2,
        }, {
          'name': '消防监测',
          'type': 1
        }],
        tagname: '危化监测',
        page: 1,
        limit: 10,
        devicelist: [],
        count: '',
        loadingjiazai: false,
        isover: true,
        overs: false,
        type: '',
        isLoad: false,
        bottom: 'margin-bottom:120upx',
        isloading: false,
      };
    },
    methods: {
      tabSelect(e) {
        this.page = 1;
        this.isover = true;
        this.overs = false;
        this.TabCur = e.currentTarget.dataset.id;
        this.tagname = e.currentTarget.dataset.tagname;
        this.type = e.currentTarget.dataset.type;
        this.control(e.currentTarget.dataset.type)
      },
      control(type) {
        uni.showLoading({
          title: '加载数据中...'
        });
        let opts = {
          url: 'devices/control',
          method: 'get'
        };
        let data = {
          page: this.page,
          limit: this.limit,
          type: type === undefined ? '2' : type
        };
        http.httpRequest(opts, data).then(res => {
          uni.hideLoading();
          this.devicelist = res.data.data.devicelist;
          this.count = res.data.data.count;
        }, error => {
          console.log(error);
        })
      },
      //跳转设备详情
      devicceinfo(id) {
        uni.showLoading({
          title: '加载中...'
        });
        let opts = {
          url: 'huinapphome/devicedatainfo/' + id,
          method: 'get'
        };
        http.httpRequest(opts).then(res => {
          if (res.data.code === 200) {
            uni.navigateTo({
              url: '/pages/basics/deviceinfo?data=' + JSON.stringify(res.data.data),
            });
            uni.hideLoading();
          }
        }, error => {
          console.log(error);
        })
      },
      adddevivelist() {
        ++this.page;
        let data = {
          page: this.page,
          limit: this.limit,
          type: this.type,
        };
        let opts = {
          url: 'devices/control',
          method: 'get'
        };
        this.isloading = true;
        http.httpRequest(opts, data).then(res => {
          var isLoadding = res.data.data.devicelist.length >= 1 ? true : false;
          let arr = res.data.data.devicelist
          arr.map((val, index, arr) => {
            this.devicelist.push(val);
          })
          if (res.data.data.devicelist.length != 0) {
            this.isover = true; //点击加载
            this.overs = false;
          } else {
            this.isover = false; //点击加载
            this.overs = true;
            this.isLoad = true;
          }
          this.isloading = false;
        }, error => {
          console.log(error);
        })
      },
    },
    created() {
      this.control();
    },
  }
</script>

<style>
  .loadingjiazai {
    /* margin-top: 20rpx;
    filter: alpha(Opacity=60);
    -moz-opacity: 0.6;
    opacity: 0.6; */
    width: 30%;
    position:fixed;
    z-index: 99999;
    bottom: 200upx;
    right: 12upx;
  }
</style>
