
export default class {
  constructor(appID, perms){
    this.appID = appID;
    this.perms = perms;
  }

  login() {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: this.appID
      })

      VK.Auth.login((response) => {
        if (response.session) {
          resolve(response)
        } else {
          reject(new Error('fail auth'))
        }
      }, this.perms)
    })
  }

  callApi(method, params) {
    params.v = params.v || '5.124';

    return new Promise((resolve, reject) => {
      VK.api(method, params, (response) => {
        if (response.error) {
          reject(new Error(response.error.error.msg))
        } else {
          resolve(response.response)
        }
      }) 
    })
  }

  getUser(params= {}) {
    return this.callApi('users.get', params);
  }

  getFriends(params= {}) {
    return this.callApi('friends.get', params)
  }
}