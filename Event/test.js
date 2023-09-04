const eventBus = require("./index");

// 订阅
eventBus.on("on_duty", (name) => {
  console.log(`员工${name}上班了`);
});
eventBus.on("on_duty", (name) => {
  console.log(`用户${name}上班订阅了两次`);
});

eventBus.on("off_duty", () => {
  console.log("下班啦");
});

// 发布
eventBus.emit("on_duty", "syukinmei");
eventBus.emit("on_duty", "ebiebi");

eventBus.emit("fk", "syukinmei");

// 解绑

eventBus.off("on_duty");

console.log(eventBus.eventList);
