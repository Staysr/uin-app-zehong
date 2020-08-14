<template name="basics">
  <view style="overflow:scroll;height: auto;">
    <!-- 顶部操作条 -->
    <view class="cu-bar bg-white">
      <!-- 加载 -->
      <view class="action" v-if="isshowLoad">
        <view class="cu-load load-cuIcon" :class="!isLoad?'loading':'over'"></view>
      </view>
      <view class="action" v-if="isshoename">
        <text class="cuIcon-homefill text-gray"></text> 首页
      </view>
      <view class="content text-bold">
        泽宏云科技平台
      </view>
      <view class="action">
        <text class="cuIcon-add  text-grey" @click="adddevive"></text>
        <text class="cuIcon-my text-red"></text>
      </view>


    </view>
    <view>
      <!-- 设置主体内容uin -->
      <view style="margin-top: 20rpx; background-color: #FFFFFF;height: 230rpx;">
        <!-- 主体内容 -->
        <view class="bg-grey padding-sm radius margin-top-sm  text-sm" style="width: 35%; margin-left: 50rpx;display: inline-block;">
          <view class="flex">
            <view class="flex-sub">用户数量:<span style="color: #007AFF; margin-left: 15rpx;">{{deviceisusernum.usercount}}</span></view>
          </view>
        </view>
        <view class="bg-grey padding-sm radius margin-top-sm  text-sm" style="width: 35%; margin-left: 95rpx;display: inline-block;">
          <view class="flex">
            <view class="flex-sub">设备数量:<span style="color: #007AFF; margin-left: 15rpx;">{{deviceisusernum.devicecount}}</span></view>
          </view>
        </view>
        <view class="bg-grey padding-sm radius margin-top-sm  text-sm" style="width: 35%; margin-left: 50rpx;display: inline-block;">
          <view class="flex">
            <view class="flex-sub">报警数量:<span style="color: red; margin-left: 15rpx;">{{deviceisusernum.devicepolice}}</span></view>
          </view>
        </view>
        <view class="bg-grey padding-sm radius margin-top-sm  text-sm" style="width: 35%; margin-left: 95rpx;display: inline-block;">
          <view class="flex">
            <view class="flex-sub">今日报警:<span style="color: #F43F3B; margin-left: 15rpx;">{{deviceisusernum.timedevicepolice}}</span></view>
          </view>
        </view>
      </view>
      <!-- 图形表 -->
      <view>
        <canvas id="myChart" style="width: 100%;height: 400upx;"></canvas>
      </view>
      <!-- 设备分类 -->
      <view style="margin-top: 20upx;">
        <scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
          <view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in devicetype" :key="item.tid"
            @tap="tabSelect" :data-id="index" :data-tname="item.tname" :data-tid="item.tid">
            {{item.tname}}
          </view>
        </scroll-view>
      </view>
      <view style="background-color: #FFFFFF;">
        <view class="cu-bar bg-white solid-bottom" style="margin-top: 10upx;">
          <view class="action">
            <text class="cuIcon-title text-orange "></text> {{devicename}}
            <view class="cu-capsule radius" style="margin-left: 15upx;margin-top: 5upx;">
              <view class='cu-tag bg-brown sm'>
                <text class='cuIcon-likefill'></text>
              </view>
              <view class="cu-tag line-brown sm">
                {{countdevice}}
              </view>
            </view>
          </view>
        </view>
        <!-- 设备列表开始 -->
        <view class="cu-list menu-avatar" style="margin-bottom: 130upx;">
          <view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in deviceList"
            :key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
            <view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
            <view class="content">
              <view class="text-grey">{{item.usernickname}}</view>
              <view class="text-gray text-sm" @tap="showModal" data-target="DialogModal1" :data-devicenum="item.devicenum">设备编号:{{item.devicenum}}</view>
            </view>
            <view class="action" :style="item.status_name.length === 5 ? 'margin-right:60upx;' : (item.status_name.length === 4 ? 'margin-right:30upx;' : '')" style="margin-top:25upx;">
              <view :class="item.status_name === '正常'? 'cu-tag bg-green' : 'cu-tag bg-red' ">{{item.status_name}}</view>
            </view>
            <view class="move">
              <view class="bg-grey">查详情</view>
              <view class="bg-red">查记录</view>
            </view>
          </view>
        </view>
        <!-- 模态框 -->
        <view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
          <view class="cu-dialog">
            <view class="cu-bar bg-white justify-end">
              <view class="content">正在复制设备号</view>
              <view class="action" @tap="hideModal">
                <text class="cuIcon-close text-red"></text>
              </view>
            </view>
            <view class="padding-xl">
              设备标号:{{devicenum}}
            </view>
            <view class="cu-bar bg-white justify-end">
              <view class="action">
                <button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
                <button class="cu-btn bg-green margin-left" @tap="okhideModal">确定</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 加载 -->
  </view>
</template>

<script>
  import http from '@/components/utils/http.js';
  const F2 = require('@antv/f2')
  export default {
    name: "basics",
    data() {
      return {
        listTouchStart: 0,
        listTouchDirection: null,
        modalName: null,
        scrollLeft: 0,
        TabCur: 0,
        isLoad: true,
        isshowLoad: false,
        isshoename: true,
        page: 1,
        limit: 10,
        devicename: '工业探测器',
        deviceisusernum: [],
        devicetype: [], // 设备类型
        deviceList: [], //设备列表
        countdevice: 0,
        devicenum: '', //复制设备编号
        tid: '',
        data: [{
          time: '周一',
          tem: 6.9,
          city: '设备数量'
        }, {
          time: '周二',
          tem: 9.5,
          city: '设备数量'
        }, {
          time: '周三',
          tem: 14.5,
          city: '设备数量'
        }, {
          time: '周四',
          tem: 18.2,
          city: '设备数量'
        }, {
          time: '周五',
          tem: 21.5,
          city: '设备数量'
        }, {
          time: '周六',
          tem: 25.2,
          city: '设备数量'
        }, {
          time: '周日',
          tem: 26.5,
          city: '设备数量'
        }, {
          time: '周一',
          tem: -10.8,
          city: '用户数量'
        }, {
          time: '周二',
          tem: -5.7,
          city: '用户数量'
        }, {
          time: '周三',
          tem: -11.3,
          city: '用户数量'
        }, {
          time: '周四',
          tem: -17,
          city: '用户数量'
        }, {
          time: '周五',
          tem: -22,
          city: '用户数量'
        }, {
          time: '周六',
          tem: -24.8,
          city: '用户数量'
        }, {
          time: '周日',
          tem: -24.1,
          city: '用户数量'
        }, {
          time: '周一',
          tem: 2.6,
          city: '报警数量'
        }, {
          time: '周二',
          tem: 3.5,
          city: '报警数量'
        }, {
          time: '周三',
          tem: 8.4,
          city: '报警数量'
        }, {
          time: '周四',
          tem: 13.5,
          city: '报警数量'
        }, {
          time: '周五',
          tem: 17,
          city: '报警数量'
        }, {
          time: '周六',
          tem: -18.6,
          city: '报警数量'
        }, {
          time: '周日',
          tem: 17.9,
          city: '报警数量'
        }]
      };
    },
    methods: {
      // ListTouch触摸开始
      ListTouchStart(e) {
        this.listTouchStart = e.touches[0].pageX
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
      //加载
      LoadProgress(e) {
        this.loadProgress = this.loadProgress + 3;
        if (this.loadProgress < 100) {
          setTimeout(() => {
            this.LoadProgress();
          }, 100)
        } else {
          this.loadProgress = 0;
        }
      },
      // 设备分类方法
      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id;
        this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
        this.devicename = e.currentTarget.dataset.tname;
        this.tid = e.currentTarget.dataset.tid;
        this.devicelist();
      },
      //打开模拟框
      showModal(e) {
        this.modalName = e.currentTarget.dataset.target;
        this.devicenum = e.currentTarget.dataset.devicenum;
      },
      //取消模态框
      hideModal(e) {
        this.modalName = null
      },
      // 跳转添加设备
      adddevive() {
        uni.navigateTo({
          url: '/pages/adddevice/home',
        });
      },
      //复制设备号
      okhideModal() {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.hideModal();
          uni.showToast({
            title: '当前设备不支持复制',
            duration: 2000
          });
        } else {
          uni.setClipboardData({
            data: "2131",
            success: () => {
              this.hideModal();
              uni.showToast({
                title: '复制成功'
              })
            }
          });
        }
      },
      //获取设备详情信息
      deviceinfo() {
         this.isshow();
        let opts = {
          url: 'homepagecount/homepagecount',
          method: 'get'
        };
        http.httpRequest(opts).then(res => {
          this.deviceisusernum = res.data.data;
          this.isnone();
        }, error => {
          console.log(error);
        })
      },
      islogin() {
        uni.getStorage({
          key: 'islogin',
          success: function(res) {},
          fail: function(re) {
            uni.redirectTo({
              url: '../login/login',
            });
          }
        });
      },
      //获取设备详情信息
      devicetypes() {
        this.isshow();
        let opts = {
          url: 'devices/devicetype',
          method: 'get'
        };
        http.httpRequest(opts).then(res => {
          this.devicetype = res.data.data.devicetype;
          this.isnone();
        }, error => {
          console.log(error);
        })
      },
      devicelist() {
        this.isshow();
        let data = {
          page: this.page,
          limit: this.limit,
          type: this.tid
        };
        let opts = {
          url: 'devices/devicelist',
          method: 'get'
        };
        http.httpRequest(opts, data).then(res => {
          this.deviceList = res.data.data.devicelist;
          this.countdevice = res.data.data.count;
          this.isnone();
        }, error => {
          console.log(error);
        })
      },
      //加载显示
      isshow() {
        this.isshoename = false;
        this.isLoad = false;
        this.isshowLoad = true;
      },
      //加载关闭
      isnone() {
        this.isshoename = true;
        this.isLoad = true;
        this.isshowLoad = false;
      },
    },
    mounted() {
      let el = document.querySelector('#myChart')
      let canvas = el.querySelector('canvas')
      let chart = new F2.Chart({
        el: canvas,
        id: 'container',
        pixelRatio: window.devicePixelRatio
      })
      chart.source(this.data)
      chart.interval().position('time*tem').color('city')
      chart.render()
    },
    created() {
      // 监测登入状态
      this.deviceinfo();
      this.islogin();
      this.devicetypes();
      this.devicelist();
    },
    onLaunch() {
      console.log("success")
    },
  };
</script>

<style>
  .page {
    height: 100vh;
  }
</style>
