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
      plus.screen.lockOrientation('landscape-primary')
    },
    //监听安卓返回键
    onBackPress() {
      const that = this;
      var pages = getCurrentPages(); //当前页面栈  
      if (pages.length > 1) {
        var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象 
         console.log(beforePage);
        // beforePage.$vm.(); //触发父页面中的方法change()  
      }
    },
  }
</script>

<style>

</style>
