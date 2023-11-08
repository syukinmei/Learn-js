class PubSub {
  constructor() {
    // 订阅唯一id
    this.id = 1;

    // 频道与回调保存容器
    this.callbacks = {
      //   channeName_1: {
      //     flag_1: () => {},
      //     flag_2: () => {},
      //   },
      //   channeName_2: {
      //     flag_3: () => {},
      //     flag_4: () => {},
      //   },
    };
  }

  /**
   * 订阅频道
   * @param {String} channel
   * @param {Function} callback
   */
  subscribe(channel, callback) {
    // 创建唯一编号
    let token = "token_" + this.id++;
    // 判断 callbacks 属性是否存在此频道
    if (this.callbacks[channel]) {
      this.callbacks[channel][token] = callback;
    } else {
      this.callbacks[channel] = {
        [token]: callback,
      };
    }

    // 返回频道订阅的id，用于后续取消订阅。
    return token;
  }

  /**
   * 发布消息
   * @param {String} channel
   * @param {*} data
   */
  publish(channel, data) {
    // 获取当前频道中的所有回调
    if (this.callbacks[channel]) {
      Object.values(this.callbacks[channel]).forEach((callback) => {
        callback(data);
      });
    } else {
      return console.error(
        "发布消息失败，没有订阅该频道或频道回调为空",
        channel
      );
    }
  }

  /**
   * 取消订阅
   *  1.没有传值，flage 为 undefined
   *  2.传入 token 字符串
   *  3.传入 msgName 字符串
   * @param {String|undefined} flag
   */
  unsubscribe(flag) {
    if (flag === void 0) {
      // 清空所有订阅
      this.callbacks = {};
    } else if (typeof flag === "string") {
      if (flag.indexOf("token_") === 0) {
        // 删除指定订阅id
        let callBackObj = Object.values(this.callbacks).find((channelObj) =>
          channelObj.hasOwnProperty(flag)
        );

        // 存在则删除
        callBackObj && delete callBackObj[flag];
      } else {
        // 删除指定频道
        delete this.callbacks[flag];
      }
    }
  }
}

module.exports = new PubSub();
