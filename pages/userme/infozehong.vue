<template>
  <view>
    <cu-custom bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">{{ strname }}</block>
    </cu-custom>
    <!-- 主体开始 -->

    <!-- 问题反馈开始  -->
    <view v-if="showtype == 1">
      <view class="cu-form-group">
        <view class="title">问题和意见</view>
      </view>
      <view class="cu-form-group">
        <textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请详细描述你的问题和意见"></textarea>
      </view>
      <view class="cu-form-group">
        <view class="title">邮箱</view>
      </view>
      <view class="cu-form-group">
      	<input placeholder="方便我们联系到你" name="input"></input>
      </view>
      <view class="padding flex flex-direction">
      	<button class="cu-btn bg-grey lg">提交</button>
      </view>
    </view>
  </view>
</template>

<script>
  import http from '@/components/utils/http.js';
  export default {
    data() {
      return {
        strname: '',
        showtype: '', // 显示控制
        modalName: null,
        textareaAValue: '',
      };
    },
    methods: {
      textareaAInput(e) {
      	this.textareaAValue = e.detail.value
      },
    },
    onLoad(e) {
      var type = e.type;
      this.showtype = type;
      if (type == 1) {
        this.strname = "问题反馈";
      } else if (type == 2) {
        this.strname = "关于泽宏";
      }
    }
  }
</script>

<style>
</style>
