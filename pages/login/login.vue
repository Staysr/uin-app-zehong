<template>
  <view class="zai-box" @touchmove.prevent>
    <image src="../../static/zaizai-login/login.png" class="zai-logo"></image>
    <!-- <view class="zai-title">LOGO区域</view> -->
    <form @submit="formSubmit">
      <view class="zai-form">
        <input class="zai-input" placeholder="请输入用户名" name="email" />
        <input class="zai-input" password placeholder="请输入密码" name="password" />
        <view class="zai-label">忘记密码？</view>
        <button class="zai-btn" form-type="submit">立即登录</button>
      </view>
    </form>
    <!-- 加载 -->
    <view class="loading-white" v-if="loadingwhite">
      <image src="/static/loading-white.gif" mode="aspectFit"></image>
    </view>
  </view>
</template>

<script>
  import http from '@/components/utils/http.js';
  export default {
    data() {
      return {
        loadingwhite: false,
      }
    },
    methods: {
      formSubmit(e) {
        let that = this;
        var email = e.detail.value.email;
        var password = e.detail.value.password;
        if (email === '' || password === '') {
          uni.showToast({
            icon: 'none',
            title: '请填写账号和密码',
            duration: 2000
          });
        } else {
          let opts = {
            url: 'auth/login',
            method: 'post'
          };
          let param = {
            email: email,
            password: password
          };
          that.loadingwhite = true;
          http.httpTokenRequest(opts, param).then(res => {
            if (res.data.success === undefined) {
              uni.setStorage({
                key: 'Authorization',
                data: res.header.Authorization,
                success: function() {
                  uni.setStorage({
                    key: 'islogin',
                    data: res.data,
                    success: function() {
                      that.loadingwhite = false
                      uni.reLaunch({
                        url: '../main/main',
                      });
                    }
                  });
                }
              });
            } else {
              uni.showToast({
                icon: 'none',
                title: res.data.error,
                duration: 2000
              });
            }
            //打印请求返回的数据
          }, error => {
            console.log(error);
          })
        }
      },
      //监测登录
      islogin(type) {
        if (type) {
          uni.reLaunch({
            url: '../login/login',
          });
        } else {
          uni.reLaunch({
            url: '../main/main',
          });
        }
 // uni.getStorage({
 //          key: 'islogin',
 //          success: function(res) {

 //          },
 //          fail: function(re) {

 //          }
 //        });
      },
      showislogin() {
        let that = this;
        var loginis = uni.getStorageSync('Authorization');
        if (loginis === '' || loginis === undefined) {
          that.islogin(true);
        } else {
          that.islogin(false);
        }
      },
    },
    mounted() {},
    onLoad() {
      let that = this;
      // 监测登入
      that.showislogin();
    }
  }
</script>

<style>
  .zai-box {
    /* padding: 0  0 100upx; */
    /* position: relative; */
  }

  .zai-logo {
    width: 100%;
    height: 580upx;
    /* margin-top: 174upx; */
  }

  .zai-title {
    position: absolute;
    top: 0;
    line-height: 360upx;
    font-size: 68upx;
    color: #fff;
    text-align: center;
    width: 100%;
    margin-left: -100upx;
    margin-top: 150upx;
  }

  .zai-form {
    margin-top: 100upx;
  }

  .zai-input {
    margin-top: 30upx;
    border-radius: 100upx;
    padding: 20upx 40upx;
    font-size: 36upx;
    height: 150upx;
    margin-left: 30upx;
  }

  .input-placeholder,
  .zai-input {
    color: #94afce;
  }

  .zai-label {
    padding: 60upx 0;
    text-align: center;
    font-size: 30upx;
    color: #a7b6d0;
  }

  .zai-btn {
    background-image: linear-gradient(#41D8DD, #5583EE);
    color: #fff;
    border: 0;
    border-radius: 100upx;
    font-size: 36upx;
    width: 90%;
  }

  .zai-btn:after {
    border: 0;
  }

  /*按钮点击效果*/
  .zai-btn.button-hover {
    transform: translate(1upx, 1upx);
  }

  .loading-white {
    position: fixed;
    top: 25%;
    left: 50upx;
  }
</style>
