const baseUrl = 'http://36.148.1.58:81/api/';
const httpRequest = (opts, data) => {
  let httpDefaultOpts = {
    url: baseUrl + opts.url,
    data: data,
    method: opts.method,
    header: opts.method == 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer' + ' ' + uni.getStorageSync('Authorization'),
    } : {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      "Authorization": 'Bearer' + ' ' + uni.getStorageSync('Authorization'),
    },
    dataType: 'json',
  }
  let promise = new Promise(function(resolve, reject) {
    uni.request(httpDefaultOpts).then(
      (res) => {
        resolve(res[1])
      }
    ).catch(
      (response) => {
        reject(response)
      }
    )
  })
  return promise
};
//登入请求
const httpTokenRequest = (opts, data) => {
  let token = "";
  uni.getStorage({
    key: 'token',
    success: function(ress) {
      token = ress.data
    }
  });
  //此token是登录成功后后台返回保存在storage中的
  let httpDefaultOpts = {
    url: baseUrl + opts.url,
    data: data,
    method: opts.method,
    header: opts.method == 'get' ? {
      'Token': token,
      'X-Requested-With': 'XMLHttpRequest',
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    } : {
      'Token': token,
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    dataType: 'json',
  }
  let promise = new Promise(function(resolve, reject) {
    uni.request(httpDefaultOpts).then(
      (res) => {
        resolve(res[1])
      }
    ).catch(
      (response) => {
        reject(response)
      }
    )
  })
  return promise
};

export default {
  baseUrl,
  httpRequest,
  httpTokenRequest
}
