export const retryLazy = (fn, retriesLeft = 5, interval = 500) => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch(error => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retryLazy(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
};
