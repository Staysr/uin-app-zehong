<template>
  <view style="margin-left: 10%;vertical-align: middle;position: absolute;top: 10%;">
    <image src="/static/togif/iswifinone.gif"></image>
    <view style="margin-top: 450upx;">
      <button @click="iswifi" class="cu-btn block bg-blue margin-tb-sm lg">刷新</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      //监测网络状态
      iswifi() {
        let that = this;
        uni.getNetworkType({
          success: function(res) {
            if (res.networkType != "none") {
              uni.navigateBack({
                delta: 1,
              });
            }
          }
        });
      }
    }
  }
</script>

<style>
  page {
    background-color: #FFFFFF;
  }

  .imgtogif {}
</style>
