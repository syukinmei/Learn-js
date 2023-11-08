const PubSub = require("./index");

const pid_1 = PubSub.subscribe("pay", (data) => {
  console.log("用户下单了，商家接到订单", data);
});

const pid_2 = PubSub.subscribe("pay", (data) => {
  console.log("用户下单了，骑手抢到订单", data);
});

const pid_3 = PubSub.subscribe("cancel", (data) => {
  console.log("商家收到了取消订单的请求，很难过", data);
});

PubSub.publish("pay", {
  userName: "syukinmei",
  goods: "黄焖鸡",
  price: 28,
  pos: "杭州市xxx小区",
});

PubSub.unsubscribe("pay");

console.log(PubSub, { pid_1, pid_2, pid_3 });
