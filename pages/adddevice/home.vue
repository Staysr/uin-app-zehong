<template>
  <view>
    <scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
      <cu-custom bgColor="bg-gradual-blue" :isBack="false">
        <block slot="content">添加设备</block>
      </cu-custom>
      <!-- 表单开始 -->
      <view style="z-index: 9999999999;overflow:scroll;height: 100%;">
        <form>
          <view class="cu-form-group margin-top">
            <view class="title">设备名称</view>
            <input placeholder="请输入设备名称" name="input"></input>
          </view>
          <view class="cu-form-group">
            <view class="title">设备编号</view>
            <input placeholder="请输入设备编号" name="input"></input>
          </view>
          <view class="cu-form-group">
            <view class="title">设备联系人</view>
            <input placeholder="请输入设备联系人" name="input"></input>
          </view>
          <view class="cu-form-group">
            <view class="title">设备联系人手机号</view>
            <input placeholder="联系人手机号" name="input"></input>
            <view class="cu-capsule radius">
              <view class='cu-tag bg-blue '>
                +86
              </view>
              <view class="cu-tag line-blue">
                中国大陆
              </view>
            </view>
          </view>
          <!-- 设备类型 -->
          <view class="cu-form-group">
            <view class="title">设备类型</view>
            <picker @change="PickerChange" :value="index" :range="picker">
              <view class="picker">
                {{index>-1?picker[index]:'请选择设备类型'}}
              </view>
            </picker>
          </view>
          <!-- 检测介质 -->
          <view class="cu-form-group">
            <view class="title">监测介质</view>
            <picker @change="PickerChange" :value="index" :range="picker">
              <view class="picker">
                {{index>-1?picker[index]:'请选择监测介质'}}
              </view>
            </picker>
          </view>
          <view class="cu-form-group">
            <view class="title">设备单位</view>
            <picker @change="PickerChange" :value="index" :range="picker">
              <view class="picker">
                {{index>-1?picker[index]:'请选择设备单位'}}
              </view>
            </picker>
          </view>
          <view class="cu-form-group">
            <view class="title">选择用户</view>
            <picker @change="PickerChange" :value="index" :range="picker">
              <view class="picker">
                {{index>-1?picker[index]:'请选择用户'}}
              </view>
            </picker>
          </view>
          <view class="cu-form-group">
            <view class="title">设备坐标</view>
            <input placeholder="请输入设备坐标" name="input"></input>
            <button class='cu-btn bg-green shadow' @tap="showModal" data-target="viewModal">拾取坐标</button>
          </view>
          <view class="cu-form-group">
            <view class="title">设备安装位置</view>
            <input placeholder="请输入安装位置" name="input"></input>
          </view>
          <view class="cu-form-group align-start">
            <view class="title">设备备注</view>
            <textarea maxlength="-1" :disabled="modalName1!=null" @input="textareaBInput" placeholder="请输入设备备注"></textarea>
          </view>
          <button class="cu-btn bg-grey lg" style="width: 90%;height: 80rpx;margin-left: 40rpx;margin-top: 20rpx;z-index: 999;">提交</button>
        </form>
      </view>
    </scroll-view>
    <view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal" style="padding-bottom: 150rpx;">
      <text class="cuIcon-pullright"></text>
    </view>
    <scroll-view scroll-y class="DrawerWindow" style="padding: 0;" :class="modalName=='viewModal'?'show':''">
      <map style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers" iconPath="../pyadd.png"
        @markertap="larces">
      </map>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        modalName: null,
        modalName1: null,
        picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
        index: -1,
        id: 0,
        textareaBValue: '',
        latitude: 39.909,
        longitude: 116.39742,
        covers: [{
          latitude: 39.909,
          longitude: 116.39742,
          iconPath: '../pyadd.png'
        }, {
          latitude: 39.90,
          longitude: 116.39,
          iconPath: '../pyadd.png'
        }]
      };
    },
    methods: {
     PickerChange(e) {
        this.index = e.detail.value
      },
      textareaBInput(e) {
        this.textareaBValue = e.detail.value
      },
      showModal(e) {
        this.modalName = e.currentTarget.dataset.target
      },
      hideModal(e) {
        this.modalName = null
      },
      larces(e) {
        console.log(e);
      },
      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id;
        this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60 
      }
    },
  }
</script>

<style>
  page {
    background-image: var(--gradualBlue);
    width: 100vw;
    overflow: hidden;
  }

  .DrawerPage {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0vw;
    background-color: #f1f1f1;
    transition: all 0.4s;
  }

  .DrawerPage.show {
    transform: scale(0.9, 0.9);
    left: 85vw;
    box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
    transform-origin: 0;
  }

  .DrawerWindow {
    position: absolute;
    width: 85vw;
    height: 100vh;
    left: 0;
    top: 0;
    transform: scale(0.9, 0.9) translateX(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s;
    padding: 100upx 0;
  }

  .DrawerWindow.show {
    transform: scale(1, 1) translateX(0%);
    opacity: 1;
    pointer-events: all;
  }

  .DrawerClose {
    position: absolute;
    width: 40vw;
    height: 100vh;
    right: 0;
    top: 0;
    color: transparent;
    padding-bottom: 30upx;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
    letter-spacing: 5px;
    font-size: 50upx;
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s;
  }

  .DrawerClose.show {
    opacity: 1;
    pointer-events: all;
    width: 15vw;
    color: #fff;
  }

  .DrawerPage .cu-bar.tabbar .action button.cuIcon {
    width: 64upx;
    height: 64upx;
    line-height: 64upx;
    margin: 0;
    display: inline-block;
  }

  .DrawerPage .cu-bar.tabbar .action .cu-avatar {
    margin: 0;
  }

  .DrawerPage .nav {
    flex: 1;
  }

  .DrawerPage .nav .cu-item.cur {
    border-bottom: 0;
    position: relative;
  }

  .DrawerPage .nav .cu-item.cur::after {
    content: "";
    width: 10upx;
    height: 10upx;
    background-color: currentColor;
    position: absolute;
    bottom: 10upx;
    border-radius: 10upx;
    left: 0;
    right: 0;
    margin: auto;
  }

  .DrawerPage .cu-bar.tabbar .action {
    flex: initial;
  }
</style>
