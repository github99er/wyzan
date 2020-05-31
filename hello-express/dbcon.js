var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_murphyr2',
  password        : '6470',
  database        : 'cs290_murphyr2'
});

module.exports.pool = pool;
