const fs = require('fs');
module.exports = function (splitted, done) {
  let txt = '';
  for (let i = 0; i < splitted.length; i++) {
    txt += 'BUDDY_SPLIT_' + (i + 1) + '="' + splitted[i].join(' ') + '"\n';
  }
  fs.writeFile('split.sh', txt, done);
};
