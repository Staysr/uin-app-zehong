<template>
  <view>
    <cu-custom bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">拾取坐标</block>
    </cu-custom>
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        url: "http://api.map.baidu.com/lbsapi/getpoint/",
      }
    },
    methods: {},
    mounted() {
      plus.screen.lockOrientation('landscape-secondary');
      plus.screen.lockOrientation('landscape-primary');
    }
  }
</script>

<style>

</style>
