module.exports = function (files, count, done) {
  count = parseInt(count, 10);
  const result = [];
  for (let i = 0; i < count; i++) {
    result[i] = [];
  }
  let j = 0;
  for (let i = 0; i < files.length; i++) {
    result[j].push(files[i]);
    j++;
    if (j >= count) {
      j = 0;
    }
  }
  done(null, result);
};
