const fs = require('fs');
module.exports = function (splitted, done) {
  let txt = '';
  for (let i = 0; i < splitted.length; i++) {
    const p = splitted[i].join(' ');
    if (p.length > 100000) {
      done(new Error('Too many file paths. Increase number of groups or decrease number of paths.'));
      return;
    }
    txt += 'BUDDY_SPLIT_' + (i + 1) + '="' + p + '"\n';
  }
  fs.writeFile('split.sh', txt, done);
};
