<template>
  <view>
    <cu-custom bgColor="bg-gradual-blue" :isBack="false">
      <block slot="content">添加设备</block>
    </cu-custom>
    <!-- 表单开始 -->
    <view style="z-index: 9999999999;overflow:scroll;height: 100%;margin-bottom: 140upx;">
      <form @submit="formSubmit">
        <view class="cu-form-group margin-top">
          <view class="title">设备名称</view>
          <input placeholder="请输入设备名称" name="username"></input>
        </view>
        <view class="cu-form-group">
          <view class="title">设备编号</view>
          <input placeholder="请输入设备编号" name="devicenum"></input>
        </view>
        <view class="cu-form-group">
          <view class="title">设备联系人</view>
          <input placeholder="请输入设备联系人" name="devicelinkman"></input>
        </view>
        <view class="cu-form-group">
          <view class="title">设备联系人手机号</view>
          <input placeholder="联系人手机号" name="devicephone"></input>
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
          <picker @change="PickerChange" data-type="1" :value="index1" :range="devicetype" :range-key="'tname'">
            <view class="picker">
              {{index1>-1?devicetype[index1].tname:'请选择设备类型'}}
            </view>
          </picker>
        </view>
        <!-- 检测介质 -->
        <view class="cu-form-group">
          <view class="title">监测介质</view>
          <picker @change="PickerChange" data-type="2" :value="index2" :range="gas" :range-key="'gas'">
            <view class="picker">
              {{index2>-1?gas[index2].gas:'请选择监测介质'}}
            </view>
          </picker>
        </view>
        <view class="cu-form-group">
          <view class="title">设备单位</view>
          <picker @change="PickerChange" data-type="3" :value="index3" :range="danwei" :range-key="'danwei'">
            <view class="picker">
              {{index3>-1?danwei[index3].danwei:'请选择设备单位'}}
            </view>
          </picker>
        </view>
        <view class="cu-form-group">
          <view class="title">选择用户</view>
          <picker @change="PickerChange" data-type="4" :value="index4" :range="addUserDevice" :range-key="'name'">
            <view class="picker">
              {{index4>-1?addUserDevice[index4].name:'请选择用户'}}
            </view>
          </picker>
        </view>
        <view class="cu-form-group">
          <view class="title">设备坐标</view>
          <input placeholder="请输入设备坐标" name="devicecoord" :value="longitisdata.longitude == undefined ? '' : longitisdata.longitude +',' + longitisdata.latitude"></input>
          <button class='cu-btn bg-green shadow' @tap="showModal" data-target="bottomModal">拾取坐标</button>
        </view>
        <view class="cu-form-group">
          <view class="title">设备安装位置</view>
          <input placeholder="请输入安装位置" name="deviceinfo" :value="longitisdata.address"></input>
        </view>
        <view class="cu-form-group align-start">
          <view class="title">设备备注</view>
          <textarea maxlength="-1" :disabled="modalName1!=null" @input="textareaBInput" placeholder="请输入设备备注" name='deviceremark'></textarea>
        </view>
        <button form-type="submit" class="cu-btn bg-grey lg" style="width: 90%;height: 80upx;margin-left: 40upx;margin-top: 20upx;z-index: 999;">提交</button>
      </form>
      <view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
        <view class="cu-dialog" style="border-radius: 1;height: 92%;">
          <view class="cu-bar bg-white">
            <view class="action text-green">确定</view>
            <view class="action text-blue" @tap="hideModal">取消</view>
          </view>
          <scroll-view class="padding-xl">
            <scroll-view class="content">
              <mi-map @miMap="miMap" @hideModalmap='hideModalmap' v-if="mapShow" ref="miMap" @updateAddress="updateAddress">
              </mi-map>
            </scroll-view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import http from '@/components/utils/http.js';
  import miMap from '../../components/mi-map/mi-map.vue';
  export default {
    components: {
      miMap,
    },
    data() {
      return {
        modalName: null,
        modalName1: null,
        picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
        index1: -1,
        index2: -1,
        index3: -1,
        index4: -1,
        id: 0,
        textareaBValue: '',
        longitisdata: [],
        devicetypetid: '',
        devicetype: [],
        addUserDevice: [],
        addUserDeviceid: '',
        danwei: [],
        danweiid: '',
        gas: [],
        gasid: '',
        mapShow: true,
        positionObj: {},
      };
    },
    methods: {
      PickerChange(e) {
        switch (parseInt(e.currentTarget.dataset.type)) {
          case 1:
            this.index1 = e.detail.value;
            this.datadeviceid(1, e.detail.value);
            break;
          case 2:
            this.index2 = e.detail.value;
            this.datadeviceid(2, e.detail.value);
            break;
          case 3:
            this.index3 = e.detail.value;
            this.datadeviceid(3, e.detail.value);
            break;
          case 4:
            this.index4 = e.detail.value;
            this.datadeviceid(4, e.detail.value);
            break;
          default:
        }
      },
      datadeviceid(type, indexpot) {
        switch (type) {
          case 1:
            this.devicetypetid = this.devicetype[indexpot].tid;
            break;
          case 2:
            this.gasid = this.gas[indexpot].id;
            break;
          case 3:
            this.danweiid = this.danwei[indexpot].id;
            break;
          case 4:
            this.addUserDeviceid = this.addUserDevice[indexpot].id;
            break;
          default:
        }
      },
      formSubmit(e) {
        let data = {
          devicecoord: e.detail.value.devicecoord,
          deviceinfo: e.detail.value.deviceinfo,
          devicelinkman: e.detail.value.devicelinkman,
          devicenum: e.detail.value.devicenum,
          devicephone: e.detail.value.devicephone,
          deviceremark: e.detail.value.deviceremark,
          username: e.detail.value.username,
          dtype: this.devicetypetid,
          status: this.gasid,
          devicemonad: this.danweiid,
          uid: this.addUserDeviceid,
        }
        if (this.isdatadevice(data)) {
          let opts = {
            url: 'devices/adddevice',
            method: 'post'
          };
          http.httpRequest(opts, data).then(res => {
            console.log(res);
            if (res.data.code === 200) {
              uni.removeStorageSync('longitislongir');
              uni.navigateTo({
                url: '/pages/main/main',
              });
            }
          }, error => {
            console.log(error);
          })
        }
      },
      // 更新地址并关闭地图
      updateAddress(addressObj) {
        this.mapShow = false
        this.positionObj = addressObj
      },
      textareaBInput(e) {
        this.textareaBValue = e.detail.value
      },
      showModal(e) {
        this.modalName = e.currentTarget.dataset.target
      },
      //点击组件的触发这个方法
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
      issetinfo() {
        const value = uni.getStorageSync('longitislongir');
        if (value === '' || value === undefined) return false;
        this.longitisdata = value;
      },
      devicetypes() {
        let opts = {
          url: 'devices/devicetype',
          method: 'get'
        };
        http.httpRequest(opts).then(res => {
          this.devicetype = res.data.data.devicetype;
          this.danwei = res.data.data.danwei;
          this.gas = res.data.data.gas;
        }, error => {
          console.log(error);
        })
      },
      addUserDevices() {
        let opts = {
          url: 'devices/addUserDevice',
          method: 'get'
        };
        http.httpRequest(opts).then(res => {
          this.addUserDevice = Array.from(res.data.data);
        }, error => {
          console.log(error);
        })
      },
      hideModalmap(e) {
        if (e === '') {
          this.issetinfo();
        } else {
          this.longitisdata = e;
        }
        this.hideModal();
      },
      //验证用户提交表单内容
      isdatadevice(data) {
        console.log(data);
        if (data.devicecoord === '') {
          this.onshowToast('设备坐标不能为空');
        } else if (data.deviceinfo === '') {
          this.onshowToast('设备安装位置不能为空');
        } else if (data.devicelinkman === '') {
          this.onshowToast('设备联系人不能为空');
        } else if (data.devicelinkman.length > 5 || data.devicelinkman.length < 2) {
          this.onshowToast('设备联系人长度 2~5位');
        } else if (data.devicemonad === '') {
          this.onshowToast('设备单位不能为空');
        } else if (data.devicenum === '') {
          this.onshowToast('设备编号不能为空');
        } else if (data.devicenum.length > 25 || data.devicenum.length < 4) {
          this.onshowToast('设备编号长度有误');
        } else if (data.devicephone === '') {
          this.onshowToast('设备手机号不能为空');
        } else if (!(/^1[3456789]\d{9}$/.test(data.devicephone))) {
          this.onshowToast('设备手机号格式有误');
        } else if (data.deviceremark === '') {
          this.onshowToast('设备备注不能为空');
        } else if (data.dtype === '') {
          this.onshowToast('设备类型不能为空');
        } else if (data.status === '') {
          this.onshowToast('设备介质不能为空');
        } else if (data.uid === '') {
          this.onshowToast('请选择用户');
        } else if (data.username === '') {
          this.onshowToast('设备名称不能为空');
        } else {
          return true;
        }
      },
      //显示提示信息
      onshowToast(data) {
        uni.showToast({
          title: data,
          duration: 2000
        });
      }
    },
    created() {
      this.issetinfo();
      this.devicetypes();
      this.addUserDevices();
    },
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20upx;
  }

  .address {
    margin-top: 1rem;
  }
</style>
