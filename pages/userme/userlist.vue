<template>
  <view>
    <cu-custom bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">用户列表</block>
    </cu-custom>
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-orange "></text> 用户列表
      </view>
    </view>
    <view class="cu-bar search bg-white">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input @focus="InputFocus" @blur="InputBlur" @input="value" :adjust-position="false" type="text" placeholder="用户名称"
          confirm-type="search"></input>
      </view>
      <view class="action">
        <button class="cu-btn bg-green shadow-blur round" @click="userSeek">搜索</button>
      </view>
    </view>
    <view class="cu-list menu-avatar margin-top">
      <view class="cu-item" v-for="(item,index) in userlistdata" :key="index" @click="userdevicelist(item.id,item.username)">
        <view class="cu-avatar round lg" style="background-image: url(../../static/user.png);">
        </view>
        <view class="content">
          <view class="text-grey">
            <view class="text-cut">{{ item.username }}</view>
            <view class="cu-tag round bg-orange sm" :class="item.state === 1 ? 'bg-red' : (item.state === 2 ? 'bg-green' : 'bg-red')">{{ item.state === 1 ? '禁用' : (item.state === 2 ? '正常' : '逻辑删除') }}</view>
          </view>
          <view class="text-gray text-sm flex">
            用户邮箱:{{ item.email }}
          </view>
          <view class="text-gray text-sm flex">
            用户地址:{{ item.province }}-{{ item.area }}-{{ item.city}}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import http from '@/components/utils/http.js';
  export default {
    data() {
      return {
        userlistdata: [],
        page: 1,
        limit: 10,
        InputBottom: 0,
        userpront: '',
      }
    },
    methods: {
      //获取报警
      userlist() {
        let opts = {
          url: 'user/HUserList',
          method: 'get'
        };
        let data = {
          page: this.page,
          limit: this.limit
        };
        http.httpRequest(opts, data).then(res => {
          this.userlistdata = res.data.data.users;
        }, error => {
          console.log(error);
        })
      },
      //用户搜索
      userSeek() {
        let opts = {
          url: 'user/userSeek',
          method: 'post'
        };
        let data = {
          page: this.page,
          limit: this.limit,
          name: this.userpront,
        };
        http.httpRequest(opts, data).then(res => {
          if (res.data.data.users.length < 1) {
            uni.showToast({
              title: '搜索暂无数据!',
              duration: 2000
            });
          } else {
            this.userlistdata = res.data.data.users;
          }
        }, error => {
          console.log(error);
        })
      },
      InputFocus(e) {
        this.InputBottom = e.detail.height
      },
      InputBlur(e) {
        this.InputBottom = 0
      },
      value(e) {
        this.userpront = e.detail.value
      },
      //跳转到用户设备列表
      userdevicelist(id, name) {
        uni.navigateTo({
          url: '/pages/userme/userdevicelist?id=' + id + '&name=' + name,
        });
      }
    },
    computed: {},
    //下拉加载
    onReachBottom() {
      ++this.page;
      let opts = {
        url: 'user/HUserList',
        method: 'get'
      };
      let data = {
        page: this.page,
        limit: this.limit
      };
      http.httpRequest(opts, data).then(res => {
        var isLoadding = res.data.data.users.length >= 1 ? true : false;
        let arr = res.data.data.users
        arr.map((val, index, arr) => {
          this.userlistdata.push(val);
        })
      }, error => {
        console.log(error);
      })
    },
    filters: {
      timeStamp: function(value) {
        if (!value) return '';
        var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var sdate = ("0" + date.getDate()).slice(-2);
        var hour = ("0" + date.getHours()).slice(-2);
        var minute = ("0" + date.getMinutes()).slice(-2);
        var second = ("0" + date.getSeconds()).slice(-2);
        // 拼接
        var result = year + "." + month + "." + sdate //+ " " + hour + ":" + minute //+ ":" + second;
        // 返回
        return result;
      },
    },
    created() {
      //获取报警记录
      this.userlist();
    },
  }
</script>

<style>
</style>
