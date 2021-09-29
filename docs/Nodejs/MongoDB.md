# MongoDB

## 安装

```shell
brew tap mongodb/brew
brew install mongodb-community@4.4
```

### 安装信息

- 配置文件：`/usr/local/etc/mongod.conf`
- 日志文件路径：`/usr/local/var/log/mongodb`
- 数据存放路径：`/usr/local/var/mongodb`

### brew 启动和暂停

```shell
brew services start mongodb-community@4.4

brew services stop mongodb-community@4.4
```

#### mongod 命令后台进程方式

```js
mongod --config /usr/local/etc/mongod.conf

cd /usr/local/Cellar/mongodb-community@4.4/4.4.8/bin
./mongo

或者

mongo --version // 版本号
mongo // 默认端口号
```

## 连接

### 略

## 基本操作

### 创建和删除

```js
use testdb1 // 创建
db.testdb1.insert({"name":"testdb1数据库"}) // 插入数据
show dbs // 查看所有数据库

db.dropDatabase() // 删除数据库(进到当前数据库)
```

### 创建集合和删除集合

```js
db.createCollection('db1') // 创建
show tables // 查看
// 或者
db.db2.insert({"name" : "db1集合"})
db.db2.drop() // 删除集合(如果删除成功返回true，否则为false)
```

### 插入、更新、查看、删除文档

```js
// 插入
db.db1.insert({ title: "我是标题", description: "我是描述" });
// 或者
data1 = { title: "我是标题", description: "我是描述" };
db.db1.insert(data1);

// 更新
db.db1.update({ title: "我是标题" }, { $set: { title: "我是标题B" } });
// 以上语句只会修改第一条发现的文档，如果你要修改多条相同的文档，则需要设置 multi 参数为 true。
db.db1.update(
  { title: "我是标题" },
  { $set: { title: "我是标题B" } },
  { multi: true }
);

// 删除
db.db1.deleteMany({}); // 删除集合下全部文档
db.db1.deleteMany({ title: "A" }); // 删除 title 等于 A 的全部文档
db.db1.deleteOne({ title: "D" }); // 删除 title 等于 D 的一个文档

// 查询
db.db1.find();
db.db1.find().pretty(); // 以易读的方式来读取数据
```

#### AND、OR

```js
// MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔开
db.db1.find({ key1: value1, key2: value2 }).pretty();
db.col.find({ title: "我是标题", description: "我是描述" }).pretty();

// OR 条件语句使用了关键字 $or
db.db1..find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
db.db1.find({$or:[{"title":"我是标题"},{"description": "我是描述"}]}).pretty()

// and和or联合使用
db.db1.find({"likes": {$gt:50}, $or: [{"title":"我是标题"},{"description": "我是描述"}]}).pretty()
```

### 条件操作符

#### 条件语句

| 操作       | 格式                     | 范例                                |
| ---------- | ------------------------ | ----------------------------------- |
| 等于       | `{<key>:<value>}`        | `db.col.find({"title":"我是标题"})` |
| 小于       | `{<key>:{$lt:<value>}}`  | `db.col.find({"likes":{$lt:50}})`   |
| 小于或等于 | `{<key>:{$lte:<value>}}` | `db.col.find({"likes":{$lte:50}})`  |
| 大于       | `{<key>:{$gt:<value>}}`  | `db.col.find({"likes":{$gt:50}})`   |
| 大于或等于 | `{<key>:{$gte:<value>}}` | `db.col.find({"likes":{$gte:50}})`  |
| 不等于     | `{<key>:{$ne:<value>}}`  | `db.col.find({"likes":{$ne:50}})`   |

### Limit 和 Skip

- limit(NUMBER)方法从 MongoDB 中读取的记录条数。
- skip(NUMBER)方法来跳过指定数量的数据。

```js
db.db1.find({}, { title: 1, _id: 0 }).limit(2);
// 第一个 {} 放 where 条件，为空表示返回集合中所有文档。
// 第二个 {} 指定那些列显示和不,显示 （0表示不显示 1表示显示)。

db.db1
  .find()
  .skip(10)
  .limit(100);
// 读取从 10 条记录后 100 条记录
```

### 排序

```js
db.db1.find().sort({ KEY: 1 }); // 升序
db.db1.find().sort({ KEY: -1 }); // 降序
// skip(), limilt(), sort()三个放在一起执行的时候，
// 执行的顺序是先 sort(), 然后是 skip()，最后是显示的 limit()
```

### 索引

```js
db.collection.createIndex(keys, options); // 语法
// Key 值为你要创建的索引字段，1 为指升序创建索引，-1为指定降序创建索引。
db.db1.createIndex({ open: 1, close: 1 }, { background: true }); // 后台创建索引
```

### 聚合

#### 聚合(aggregate)主要用于处理数据(诸如统计平均值，求和等)，并返回计算后的数据结果

| 表达式      | 描述                                                                             | 实例                                                                                  |
| ----------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `$sum`      | 计算总和。                                                                       | `db.db1.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}])` |
| `$avg`      | 计算平均值                                                                       | `db.db1.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}])` |
| `$min`      | 获取集合中所有文档对应值得最小值                                                 | `db.db1.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}])` |
| `$max`      | 获取集合中所有文档对应值得最大值                                                 | `db.db1.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}])` |
| `$push`     | 将值加入一个数组中，不会判断是否有重复的值                                       | `db.db1.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}])`            |
| `$addToSet` | 将值加入一个数组中，会判断是否有重复的值，若相同的值在数组中已经存在了，则不加入 | `db.db1.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])`       |
| `$first`    | 根据资源文档的排序获取第一个文档数据                                             | `db.db1.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])`    |
| `$last`     | 根据资源文档的排序获取最后一个文档数据                                           | `db.db1.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}])`      |

#### 管道

- `$project`：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
- `$match`：用于过滤数据，只输出符合条件的文档。`$match` 使用 MongoDB 的标准查询操作。
- `$limit`：用来限制 `MongoDB` 聚合管道返回的文档数。
- `$skip`：在聚合管道中跳过指定数量的文档，并返回余下的文档。
- `$unwind`：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
- `$group`：将集合中的文档分组，可用于统计结果。
- `$sort`：将输入文档排序后输出。
- `$geoNear`：输出接近某一地理位置的有序文档。

#### NodeJs 中使用

[链接](https://www.runoob.com/nodejs/nodejs-mongodb.html)
[链接](https://docs.mongodb.com/drivers/node/current/quick-start/)

## 高教操作

1
2
3
