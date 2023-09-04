// 封装一个超级简单的事件总线

class EventBus {
  constructor() {
    this.eventList = {};
  }

  /**
   * 订阅事件
   * 原理：先判断有无该对象的回调，有则直接 push 进去，无则赋值为数组再添加回调
   * @param {String} eventName
   * @param {Function} callBack
   */
  on(eventName, callBack) {
    if (!this.eventList[eventName]) {
      this.eventList[eventName] = [];
    }

    this.eventList[eventName].push(callBack);
  }

  /**
   * 发布事件
   * 原理：取出对应事件的回调数组，然后依次执行回调。需要判断有没有回调函数，以及回调数组是不是空数组
   * @param {String} eventName
   * @param {*} data
   */
  emit(eventName, data) {
    const callBacks = this.eventList[eventName];
    if (callBacks && callBacks.length > 0) {
      callBacks.forEach((cb) => {
        cb(data);
      });
    } else {
      return console.error(
        "发布事件失败，没有订阅该事件或事件回调为空",
        eventName
      );
    }
  }

  /**
   * 取消订阅
   * 取消订阅分为两种情况：没有传事件名，则清空所有的事件。传了事件名，删除该事件的全部回调。
   * @param {*} eventName
   */
  off(eventName) {
    if (eventName === void 0) {
      this.eventList = {};
      return;
    }

    if (this.eventList[eventName]) {
      delete this.eventList[eventName];
    } else {
      return console.error(
        "取消订阅失败，没有订阅该事件或事件回调为空",
        eventName
      );
    }
  }
}

module.exports = new EventBus();
