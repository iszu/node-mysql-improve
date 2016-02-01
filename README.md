# Node Mysql 封装库
基于node-mysql模块的简单封装

##使用说明

####select 查询数据
```javascript
mysql.select('tableName', '*', "where `id` = 1", function (result) {
	console.log(result);
});
```

####insert 插入数据
```javascript
mysql.insert('tableName', {'user':'abc','pass':'123'}, function (result) {
	console.log(result);
});
```

####delete 删除数据
```javascript
mysql.delete('tableName', "where `id` = 1", function (result) {
	console.log(result);
});
```

####update 更新数据
```javascript
mysql.update('tableName', {'user':'abc','pass':'123'}, "where `id` = 1", function (result) {
	console.log(result);
});
```

####query 直接执行SQL语句
```javascript
mysql.query('tableName', function (result) {
	console.log(result);
});
```