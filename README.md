# 消息通知

管理端登录后，显示通知数，点击通知数显示通知详情。点击详情可跳转相关页面。

注意：本插件后端提供了java和php两个参考实现。

## 设计

示例应用：在车辆出厂检测时，若发现缺陷问题，则质量人员登录系统时应得到消息通知，来分析处理缺陷问题。这就相当于用户的待办事项列表。

后端接口设计：

	Notify.queryCnt() -> {cnt}
	Notify.query() -> tbl(type, tm, name, relId)

- type: 一般就用表的名字。比如`Issue`表示缺陷。
- name: 通知的标题。
- relId: 关联的对象编号。与type合在一起就能定位到一个具体的对象了。

query接口返回列表格式，可以是 `{h, d}`或`[{type, tm, ...}]`或`{list: [{type, tm, ...}]}`，前端均可识别。

前端在登录后，调用queryCnt接口显示通知数。用户查看详情时，调用Notify.query接口获取待办项列表。点一项可跳转相关对象。

## 用法

### 安装插件jdcloud-plugin-notify

使用git clone下载插件后，假定插件路径与jdcloud项目路径相同。进入jdcloud项目下，打开git-bash运行命令安装插件：

	./tool/jdcloud-plugin.sh add ../jdcloud-plugin-notify

若要删除插件可以用

	./tool/jdcloud-plugin.sh del jdcloud-plugin-notify

添加或更新的文件将自动添加到git库中，插件安装信息保存在文件plugin.dat中。

根据需要可删除或调整文件位置。

### 后端实现

后端去修改AC2_Notify类的两个接口实现。

- WebApi.java: java后端接口实现参考。
- AC_Notify.php: php后端接口实现参考。

### 前端实现

先检查web/store.html中是否开放了消息提醒，查找以下内容，确保没有被注释掉：

				<span class="header-user-message ">
					<i class="fa fa-bell"></i>
					<span class="msgNum"></span>
				</span>

实现在登录后检查消息，在store.js文件中找到handleLogin方法中添加`Notify.init()`：

	function handleLogin(data)
	{
		WUI.handleLogin(data);
		...
		Notify.init();
	}

然后根据业务需求修改 web/page/dlgNotify.js 中的通知显示和页面跳转逻辑。

