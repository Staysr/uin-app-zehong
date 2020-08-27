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
        :data-id="index" :data-tagname="item">
        {{item}}
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        TabCur: 0,
        tagdata: ['危化监测','消防监测'],
        tagname: '危化监测',
      };
    },
    methods: {
      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id;
        this.tagname = e.currentTarget.dataset.tagname;
      }
    },
    created() {
      // this.
    },
  }
</script>

<style>
</style>
