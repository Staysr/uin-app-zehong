<template>
  <view>
    <cu-custom bgColor="bg-gradual-blue" :isBack="false">
      <block slot="content">添加设备</block>
    </cu-custom>
    <!-- 表单开始 -->
    <view style="z-index: 9999999999;overflow:scroll;height: 100%;margin-bottom: 140upx;">
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
          <input placeholder="请输入设备坐标" name="input" :value="longitisdata.longitude +',' + longitisdata.latitude"></input>
          <button class='cu-btn bg-green shadow' @click="addnpm()">拾取坐标</button>
        </view>
        <view class="cu-form-group">
          <view class="title">设备安装位置</view>
          <input placeholder="请输入安装位置" name="input" :value="longitisdata.address">{{  }}</input>
        </view>
        <view class="cu-form-group align-start">
          <view class="title">设备备注</view>
          <textarea maxlength="-1" :disabled="modalName1!=null" @input="textareaBInput" placeholder="请输入设备备注"></textarea>
        </view>
        <button class="cu-btn bg-grey lg" style="width: 90%;height: 80upx;margin-left: 40upx;margin-top: 20upx;z-index: 999;">提交</button>
      </form>
    </view>
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
        longitisdata: [],
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
      },
      //跳转拾取地图页面
      addnpm() {
        uni.navigateTo({
          url: '/pages/adddevice/mpnaddlink',
        });
      },
      //
      issetinfo(){
        const value = uni.getStorageSync('longitislongir');
        if(value === '' || value === undefined) return false;
        this.longitisdata = value;
      },
    },
    created() {
      this.issetinfo();
    }
  }
</script>

<style>
</style>
