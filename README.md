# Node Mysql 封装库
本库是基于node-mysql模块的简单封装。<br>
为了方便在SAE上的使用，本库还加入了自动判断是否在SAE环境下，会自动切换到SAE的配置信息上。<br>
填写完数据库信息之后，在本地测试和上传到SAE上，不用修改任何配置，可兼容运行。

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