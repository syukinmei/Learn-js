/**
 * 依次顺序执行一系列任务
 * 所有任务完成后可以得到每个任务的执行结果
 * 需要返回两个方法，start 用于启动任务，pause 用于暂停任务
 * 每个任务具有原子性，即不可中断，只能在两个任务之间中断
 * @param  {...any} tasks
 * @returns
 */

function processTasks(...tasks) {
  let isRunning = false;
  const result = [];
  let i = 0; // 当前执行的任务索引
  return {
    async start() {
      return new Promise(async (resolve, reject) => {
        if (isRunning) return;
        isRunning = true;
        // 依次执行任务
        while (i < tasks.length) {
          console.log(`任务 ${i} 开始`);
          result.push(await tasks[i]());
          console.log(`任务 ${i} 结束`);
          i++;
          // 如果任务执行期间暂停了，则不再执行下一个任务
          if (!isRunning) return;
        }
        // 所有任务均已完成
        isRunning = false;
        resolve(result);
      });
    },
    pause() {
      isRunning = false;
    },
  };
}
