<template name="basics">
  <view style="overflow:scroll;height: auto;">
    <!-- 顶部操作条 -->
    <view class="cu-bar bg-white cu-bar fixed nav fixed">
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
      <view style="margin-top: 120rpx; background-color: #FFFFFF;height: 230rpx;">
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
        <view class="qiun-charts">
          <!--#ifdef MP-ALIPAY -->
          <canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
          <!--#endif-->
          <!--#ifndef MP-ALIPAY -->
          <canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas>
          <!--#endif-->
        </view>
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
            <view class="cu-avatar round lg" :style="item.status_name === '正常' ? icon_device_li_green :  icon_device_li "></view>
            <view class="content">
              <view class="text-grey">{{item.usernickname}}</view>
              <view class="text-gray text-sm" @tap="showModal" data-target="DialogModal1" :data-devicenum="item.devicenum">设备编号:{{item.devicenum}}</view>
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
          <view class="loadingjiazai" v-if="loadingjiazai || countdevice > 10">
            <view class="cu-load bg-grey" v-if="overs" :class="!isLoad?'loading':'over'"></view>
            <view class="cu-load bg-grey" v-if="isover" @click="adddevivelist">点击加载</view>
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
  import uCharts from '@/components/u-charts/u-charts.js';
  var canvaColumn = null;
  var _self;
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
        loadingjiazai: false,
        isover: true,
        overs: false,
        icon_device_li_green: 'background-image: url(../../static/img/icon_device_li_green.png)',
        icon_device_li: 'background-image:url(../../static/img/icon_device_li.png)',
        page: 1,
        limit: 10,
        devicename: '工业探测器',
        deviceisusernum: [],
        devicetype: [], // 设备类型
        deviceList: [], //设备列表
        countdevice: 0,
        devicenum: '', //复制设备编号
        tid: '',
        // 统计图
        cWidth: '',
        cHeight: '',
        pixelRatio: 1,
        serverData: ''
      };
    },
    methods: {
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
        this.page = 1;
        this.isover = true;
        this.overs = false;
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
      touchColumn(e) {
        canvaColumn.touchLegend(e);
        canvaColumn.showToolTip(e, {
          format: function(item, category) {
            return category + ' ' + item.name + ':' + item.data
          }
        });
      },
      //取消模态框
      hideModal(e) {
        this.modalName = null
      },
      // 跳转添加设备
      adddevive() {
        uni.navigateTo({
          url: '../main/adddevice',
        });
      },
      //获取设备详情
      devicedatainfo(id) {
        this.isshow();
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
          this.isnone();
        }, error => {
          console.log(error);
        })
      },
      devicerecording(id) {
        this.isshow();
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
          this.isnone();
        }, error => {
          console.log(error);
        })
      },
      //复制设备号
      okhideModal() {
        var that = this;
        uni.getSystemInfo({
          success: function(res) {
            if (res.model === undefined) {
              that.hideModal(),
                uni.showToast({
                  title: '当前设备不支持复制',
                  duration: 2000
                });
            } else {
              uni.setClipboardData({
                data: this.devicenum,
                success: () => {
                  that.hideModal();
                  uni.showToast({
                    title: '复制成功'
                  })
                }
              });
            }
          }
        });
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
      // 分页加载
      adddevivelist() {
        this.isshow();
        ++this.page;
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
          var isLoadding = res.data.data.devicelist.length >= 1 ? true : false;
          let arr = res.data.data.devicelist
          arr.map((val, index, arr) => {
            this.deviceList.push(val);
          })
          if (res.data.data.devicelist.length != 0) {
            this.isover = true; //点击加载
            this.overs = false;
          } else {
            this.isover = false; //点击加载
            this.overs = true;
          }
          this.isnone();
        }, error => {
          console.log(error);
        })
      },
      //监测是否是app
      isapp() {
        _self = this;
        //#ifdef MP-ALIPAY
        uni.getSystemInfo({
          success: function(res) {
            if (res.pixelRatio > 1) {
              //正常这里给2就行，如果pixelRatio=3性能会降低一点
              //_self.pixelRatio =res.pixelRatio;
              _self.pixelRatio = 2;
            }
          }
        });
        //#endif
        this.cWidth = uni.upx2px(750);
        this.cHeight = uni.upx2px(500);
        this.getServerData();
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
      showColumn(canvasId, chartData) {
        canvaColumn = new uCharts({
          $this: _self,
          canvasId: canvasId,
          type: 'column',
          legend: true,
          fontSize: 11,
          background: '#FFFFFF',
          pixelRatio: _self.pixelRatio,
          animation: true,
          categories: chartData.categories,
          series: chartData.series,
          xAxis: {
            disableGrid: true,
          },
          yAxis: {},
          dataLabel: true,
          width: _self.cWidth * _self.pixelRatio,
          height: _self.cHeight * _self.pixelRatio,
          extra: {
            column: {
              type:'group',
              width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
            }
          }
        });
      },
      changeData() {
        canvaColumn.updateData({
          series: _self.serverData.ColumnB.series,
          categories: _self.serverData.ColumnB.categories
        });
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

      // 统计图

      getServerData() {
        const xData = (function() {
          const data = [];
          const date = new Date();
          for (let i = 1; i < date.getMonth() + 1 + 1; i++) {
            data.push(i + '月');
          }
          return data;
        }());
        let opts = {
          url: 'homepagecount/devicemonthcount',
          method: 'get'
        };
        http.httpRequest(opts).then(res => {
          _self.serverData = res.data.data;
          let Column = {
            categories: xData,
            series: [{
              name: '设备数量',
              type: 'column',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1,
                },
              },
              data: res.data.data.devicedata,
            }, {
              name: '用户数量',
              type: 'column',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1,
                },
              },
              data:res.data.data.policedata
            }, {
              name: '报警数量',
              type: 'column',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1,
                },
              },
              data: res.data.data.devicepolice,
            }]
          };
          _self.showColumn("canvasColumn", Column);
        }, error => {
          console.log(error);
        })
      },
    },
    onReachBottom() {
      console.log("我执行了");
    },
    mounted() {},
    created() {
      // 监测登入状态
      this.deviceinfo();
      this.islogin();
      this.devicetypes();
      this.devicelist();
      this.isapp();
    },
    onLaunch() {
      console.log("success")
    },
  };
</script>

<style>
  .qiun-charts {
    width: 750upx;
    height: 470upx;
    margin-top: 20upx;
  }

  .loadingjiazai {
    margin-top: 20rpx;
    filter: alpha(Opacity=60);
    -moz-opacity: 0.6;
    opacity: 0.6;
  }

  .charts {
    width: 750upx;
    height: 500upx;
  }
</style>
