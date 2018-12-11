const async = require('async');
const fs = require('fs');
module.exports = function (files, order, done) {
  if (order === 'size') {
    //order by files size
    const sizes = {};
    async.series([
      function(cb){
        //get files size
        async.each(files, function(item, cb2){
          fs.stat(item, function(err, stat){
            if (err) sizes[item] = 0;
            else sizes[item] = stat.size;
            cb2();
          });
        }, cb);
      },
      function(cb){
        //sort
        files = files.sort(function(a, b){
          return sizes[a] < sizes[b] ? -1 : 1;
        });
        cb();
      }
    ], function (err) {
      if (err) {
        done(err);
      } else {
        done(null, files);
      }
    });
  } else {
    //order by files name
    files = files.sort(function (a, b) {
      const ai = a.lastIndexOf('/');
      const bi = b.lastIndexOf('/');
      const an = ai < 0 ? a : a.substr(ai + 1);
      const bn = bi < 0 ? b : b.substr(bi + 1);
      return an.toLowerCase().localeCompare(bn.toLowerCase());
    });
    done(null, files);
  }
};
