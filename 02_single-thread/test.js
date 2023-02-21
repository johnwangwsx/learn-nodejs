//node是单线程的，第一个timeout的回调会阻塞第二个timeout的回调
const start = Date.now();

setTimeout(() => {
  console.log(Date.now() - start);
  let sum = 0;
  for (let i = 0; i < 1000000000000; ++i) {
    sum += i; // 非常大的计算应该采用异步 避免占用线程
  }
}, 1000);

setTimeout(() => {
  console.log(Date.now() - start);
}, 2000);
