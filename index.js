/**
 * Mysql封装模块
 * @author Jason
 */
var config = {
		"mysql" : {
			"host" : "localhost",
			"port" : 3306,
			"user" : "root",
			"pass" : "",
			"db" : ""
		}
    },//引入配置文件
	mysql = require("mysql");

if (typeof process.env.MYSQL_HOST == 'undefined') {
	//非SAE环境
	var pool = mysql.createPool({
		host     : config.mysql.host,
		port     : config.mysql.port,
		user     : config.mysql.user,
		password : config.mysql.pass,
		database : config.mysql.db
	});
} else {
	//SAE环境
	var pool = mysql.createPool({
	    host     : process.env.MYSQL_HOST,
	    port     : process.env.MYSQL_PORT,
	    user     : process.env.ACCESSKEY,
	    password : process.env.SECRETKEY,
	    database : 'app_' + process.env.APPNAME
	});
}

exports.select = function (table, col, suffix, callback) {
	var suffix = suffix || '';
	if (!table || !col) {
		callback('Empty Param');
		return;
	}

	var sql = 'SELECT ' + col + ' from `' + table + '` ' + suffix;

	pool.getConnection(function(err, conn) {
		if (err) {
			callback(err);
			return;
		}

		conn.query(sql, function(err, rows) {
			if (err) {
				callback(err);
				return;
			}
			conn.release();
			callback(JSON.stringify(rows));
		});
	});
}

exports.insert = function (table, data, callback) {
	if (!table || !data) return false;

	var sql = 'INSERT INTO `' + table + '` SET ?';

	pool.getConnection(function(err, conn) {
		if (err) {
			callback(err);
			return;
		}

		conn.query(sql, [data], function(err, result) {
			if (err) {
				callback(err);
				return;
			}
			conn.release();
			if (result) {
				callback(true);
				return;
			} else {
				callback(false);
				return;
			}
		});
	});
}

exports.delete = function (table, condition, callback) {
	if (!table || !condition) return false;

	pool.getConnection(function(err, conn) {
		if (err) {
			callback(err);
			return;
		}

		var sql = 'SELECT * from `' + table + '` ' + condition;
		conn.query(sql, function(err, rows) {
			if (err) {
				callback(err);
				return;
			}

			if (rows) {
				sql =  'DELETE from `' + table + '` ' + condition;
				conn.query(sql, function(err, result) {
					if (err) {
						callback(err);
						return;
					}

					conn.release();

					if (result) {
						callback(true);
						return;
					} else {
						callback(false);
						return;
					}
				});
			} else {
				callback(false);
				return;
			}
		});
	});
}

exports.update = function (table, data, condition, callback) {
	if (!table || !data || !condition) return false;

	pool.getConnection(function(err, conn) {
		if (err) {
			callback(err);
			return;
		}

		var sql = 'Update `' + table + '` SET ? ' + condition;
		conn.query(sql, [data], function(err, result) {
			if (err) {
				callback(err);
				return;
			}
			conn.release();
			if (result) {
				callback(true);
				return;
			} else {
				callback(false);
				return;
			}
		});
	});
}

exports.query = function (sql, callback) {
	if (!sql) return false;

	pool.getConnection(function(err, conn) {
		if (err) {
			callback(err);
			return;
		}

		conn.query(sql, function(err, result) {
			if (err) {
				callback(err);
				return;
			}
			conn.release();
			if (result) {
				callback(JSON.stringify(result));
				return;
			} else {
				callback(false);
				return;
			}
		});
	});
}