<template>
  <view class="zai-box" @touchmove.prevent>
    <image src="../../static/zaizai-login/login.png" class="zai-logo"></image>
    <!-- <view class="zai-title">LOGO区域</view> -->
    <form @submit="formSubmit">
      <view class="zai-form">
        <input class="zai-input" placeholder="请输入用户名" name="email" />
        <input class="zai-input" password placeholder="请输入密码" name="password" />
        <view class="zai-label" @click="mypassword">忘记密码？</view>
        <button class="zai-btn" form-type="submit">立即登录</button>
      </view>
    </form>
    <!-- 加载 -->
    <view class="loading-white" v-if="loadingwhite">
      <image src="/static/loading-white.gif" mode="aspectFit"></image>
    </view>
    <!-- 忘记密码 -->
    <view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
      <view class="cu-dialog" style="height: 90%;">
        <view class="cu-bar bg-white">
          <view :class="oktoletuetype === 3 ? 'action text-red' : 'action text-green' " v-if="isok" :data-type="oktoletuetype"
            @click="topasswordok">{{ oktoletue }}</view>
          <view class="action text-blue" @tap="hideModal">取消</view>
        </view>
        <view>
          <view class="cu-form-group" v-if="topassword">
            <view class="title">邮箱:</view>
            <input placeholder="请输入邮箱" name="email" :value="infutvalue" :disabled="infutdisabled" @input="toemail"></input>
          </view>
        </view>
        <view class="cu-form-group" v-if="iscode">
          <view class="title">验证码</view>
          <input placeholder="请输入邮箱验证码" @input="isvcode" name="vcode"></input>
          <button class='cu-btn bg-green shadow' :disabled="disabled" @click="vcode">{{ countdown }}<text v-if="timestatus">秒重获</text></button>
        </view>
        <view>
          <view class="cu-form-group" v-if="ispassword">
            <view class="title">密码:</view>
            <input placeholder="请输入密码" name="password" @input="ckpassword" data-password="1" type="text"></input>
          </view>
        </view>
        <view>
          <view class="cu-form-group" v-if="ispassword">
            <view class="title">确认密码:</view>
            <input placeholder="请输入密码" name="password1" @input="ckpassword" data-password="2" password></input>
          </view>
        </view>
        <!-- 重置操作 -->
        <button v-if="reset" class="cu-btn round bg-green shadow" @click="isreset" style="float:right;margin-top: 300upx; margin-right: 20upx;">重置</button>
      </view>
    </view>
  </view>
</template>

<script>
  import http from '@/components/utils/http.js';
  import until from '@/components/utils/util.js';
  export default {
    data() {
      return {
        loadingwhite: false,
        modalName: '',
        isok: false,
        oktoletue: '',
        ispassword: false,
        topassword: true,
        oktoletuetype: 1, // 1 邮箱验证 2 更改密码提交 // 3代表不可用状态
        emails: '',
        lkemails: '', //原始邮箱
        password: '', //确认密码
        password1: '', //输入密码
        iscode: false, //邮箱验证码,
        countdown: '验证码',
        clear: '',
        disabled: false,
        timestatus: false,
        isvcodes: '', //验证码
        infutdisabled: false, //禁用验证码
        reset: false, // 重置操作
        infutvalue: '',
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
              that.loadingwhite = false
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
      showislogin() {
        let that = this;
        var loginis = uni.getStorageSync('islogin');
        if (loginis !== '') {
          uni.reLaunch({
            url: '../main/main',
          });
        }
      },
      // 忘记密码
      mypassword() {
        this.modalName = 'bottomModal';
      },
      hideModal(e) {
        this.modalName = null;
      },
      //进行邮箱验证
      toemail(e) {
        this.oktoletue = '点击邮箱验证';
        this.emails = e.detail.value;
        this.isok = true;
        if (e.detail.value === '') {
          this.isok = false;
          this.oktoletuetype = 1;
        }
        if (e.detail.value != this.lkemails) {
          this.isok = true;
          this.oktoletuetype = 1;
        }
      },
      // 密码提交 //以及邮箱验证
      topasswordok(e) {
        let type = e.currentTarget.dataset.type
        if (type == 1) { // 邮箱验证
          var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          if (this.emails === '') {
            this.oktoletue = '邮箱不能为空';
            this.oktoletuetype = 3;
          } else if (!until.checkEmail(this.emails)) {
            this.oktoletue = '邮箱格式错误';
            this.oktoletuetype = 3;
            this.lkemails = this.emails;
          } else {
            this.oktoletue = '邮箱认证中';
            let opts = {
              url: 'huinapphome/isemail',
              method: 'post'
            };
            let data = {
              email: this.emails,
            };
            http.httpRequest(opts, data).then(res => {
              if (res.data.data === 1) {
                // this.topassword = false;
                this.ispassword = false;
                this.iscode = true;
                this.infutdisabled = true;
                this.reset = true;
                this.oktoletue = '邮箱认证成功';
              } else {
                this.oktoletue = '邮箱认证错误请重试';
                this.oktoletuetype = 3;
              }
            }, error => {
              console.log(error);
            })
          }
        } else if (type == 2) { //密码提交
          if (this.password === '' || this.password1 === '') {
            this.oktoletuetype = 3;
            this.oktoletue = '密码不能为空';
          } else if (this.password != this.password1) {
            this.oktoletuetype = 3;
            this.oktoletue = '输入密码不一致';
          } else {
            this.oktoletue = '提交中';
            let opts = {
              url: 'huinapphome/ispassword',
              method: 'post'
            };
            let data = {
              email: this.emails,
              password: this.password1,
            };
            http.httpRequest(opts, data).then(res => {
              if (res.data.data === 1) {
                this.hideModal();
                this.isok = false;
                this.oktoletue = '';
                this.ispassword = false;
                this.topassword = true;
                this.oktoletuetype = 1; // 1 邮箱验证 2 更改密码提交 // 3代表不可用状态  //4 验证验证码操作
                this.emails = '';
                this.lkemails = ''; //原始邮箱
                this.password = ''; //确认密码
                this.password1 = ''; //输入密码
                uni.removeStorageSync('vcode');
              } else {
                this.oktoletue = '更改失败';
                this.oktoletuetype = 3;
              }
            }, error => {
              console.log(error);
            })
          }
        } else if (type == 4) { //验证验证码
          if (this.isvcodes != uni.getStorageSync('vcode')) {
            this.oktoletue = '验证码错误';
            this.oktoletuetype = 3;
          } else {
            this.ispassword = true;
            this.topassword = false;
            this.iscode = false;
          }
        }
      },
      //密码操作
      ckpassword(e) {
        if (e.currentTarget.dataset.password == 1) { //密码操作
          this.oktoletuetype = 2;
          this.oktoletue = '输入确认密码';
          this.password = e.detail.value;
        } else if (e.currentTarget.dataset.password == 2) { //确认密码操作
          this.oktoletuetype = 2;
          this.oktoletue = '确认';
          this.password1 = e.detail.value;
        }
      },
      //获取邮箱验证码操作
      vcode() {
        let opts = {
          url: 'huinapphome/mails',
          method: 'post'
        };
        let data = {
          email: this.emails,
        };
        http.httpRequest(opts, data).then(res => {
          if (res.data.code === 200) {
            this.countdown = 60;
            this.disabled = true;
            this.timestatus = true;
            this.clear = setInterval(this.countDown, 1000);
            uni.setStorageSync('vcode', res.data.data);
          }
        }, error => {
          console.log(error);
        })
      },
      //倒计时
      countDown() {
        var that = this;
        if (!that.countdown) {
          that.disabled = false;
          that.timestatus = false;
          that.countdown = '验证码';
          clearInterval(that.clear);
        } else {
          --that.countdown;
        }
      },
      //验证验证码
      isvcode(e) {
        var value = e.detail.value;
        if (value != '') {
          this.isvcodes = value;
          this.oktoletuetype = 4; //验证验证码
          this.oktoletue = '请验证验证码';
        }
      },
      //重置操作
      isreset() {
        this.isok = false;
        this.oktoletue = '';
        this.ispassword = false;
        this.topassword = true;
        this.oktoletuetype = 1; // 1 邮箱验证 2 更改密码提交 // 3代表不可用状态  //4 验证验证码操作
        this.emails = '';
        this.lkemails = ''; //原始邮箱
        this.password = ''; //确认密码
        this.password1 = ''; //输入密码
        this.infutdisabled = false; //是否禁用input
        this.infutvalue = ''; //使用input为空
        this.iscode = false;
        this.reset = false;
      },
      //监测网络状态
      ifwifi() {
        let that = this;
        uni.getNetworkType({
          success: function(res) {
            if (res.networkType === "none") {
              uni.navigateTo({
                url: '../wifiisin/home'
              });
            }else{
              // 监测登入
              that.showislogin();
            }
          }
        });
      }
    },
    mounted() {},
    onLoad() {
      let that = this;
      that.ifwifi();
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
