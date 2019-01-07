const fs = require('fs');
const async = require('async');
const split = require('./split');
const glob = require('glob');
const order = require('./order');
const env = require('./env');
const args = process.argv;
if (args.length !== 5) {
  console.log('Wrong parameters');
  process.exit(1);
}
const c = args[2];
const o = args[3];
const p = args[4];
let isFile = false;
let isDir = false;
let files = [];
let splitted = [];

async.series([
  function (cb) {
    //check if path is file
    fs.stat(p, function (err, stats) {
      isFile = !err && stats.isFile();
      isDir = !err && stats.isDirectory();
      cb();
    });
  },
  function (cb) {
    if (isFile) {
      //read file
      fs.readFile(p, 'utf8', function (err, content) {
        if (err) {
          cb(new Error('Error while reading file contents'));
        } else {
          //split file contents as paths to split
          files = content.split(/\n/);
          cb();
        }
      });
    } else {
      //glob paths
      glob(p + (isDir ? '/*' : ''), {
        silent: true,
        strict: true,
        nodir: true
      }, function (err, data) {
        if (err) {
          cb(err);
        } else {
          files = data;
          cb();
        }
      })
    }
  },
  function (cb) {
    //sort
    order(files, o, function (err, data) {
      if (err) {
        cb(err);
      } else {
        files = data;
        cb();
      }
    });
  },
  function (cb) {
    //split files
    split(files, c, function (err, data) {
      if (err) {
        cb(err);
      } else {
        splitted = data;
        cb();
      }
    });
  },
  function(cb) {
    //export env
    env(splitted, cb);
  }
], function (err) {
  if (err) {
    //output error
    console.error(err.message);
    process.exit(1);
  } else {
    console.log('Files splitted');
    process.exit(0);
  }
});
