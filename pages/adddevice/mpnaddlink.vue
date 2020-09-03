<template>
  <view class="content">
    <!-- <view class="address">
      <view class="">纬度：{{positionObj.latitude}}</view>
      <view class="">经度：{{positionObj.longitude}}</view>
      <view class="">具体地址：{{positionObj.address}}</view>
    </view> -->
    <mi-map v-if="mapShow" ref="miMap" @updateAddress="updateAddress">
    </mi-map>
  </view>
</template>

<script>
  import miMap from '../../components/mi-map/mi-map.vue'
  export default {
    components: {
      miMap
    },
    data() {
      return {
        mapShow: true,
        positionObj: {},
      }
    },
    onLoad() {

    },
    methods: {
      // 更新地址并关闭地图
      updateAddress(addressObj) {
        this.mapShow = false
        this.positionObj = addressObj
      },
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .address {
    margin-top: 1rem;
  }
</style>
