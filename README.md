# 消息通知

管理端登录后，显示通知数，点击通知数显示通知详情。点击详情可跳转相关页面。

示例：在车辆出厂检测时，若发现缺陷问题，则质量人员登录系统时应得到消息通知，来分析处理缺陷问题。这就相当于用户的待办事项列表。

后端接口设计：

	Notify.queryCnt() -> {cnt}
	Notify.query() -> [{type, tm, name, relId}]

- type: 一般就用表的名字。比如`Issue`表示缺陷。
- name: 通知的标题。
- relId: 关联的对象编号。与type合在一起就能定位到一个具体的对象了。

前端在登录后，调用queryCnt接口显示通知数。用户查看详情时，调用Notify.query接口获取待办项列表。点一项可跳转相关对象。

安装插件jdcloud-plugin-notify，后端去修改AC2_Notify类的两个接口实现。

前端在handleLogin方法中添加调用(store.js)

	function handleLogin(data)
	{
		WUI.handleLogin(data);
		...
		Notify.init();
	}

前端修改 web/page/dlgNotify.js 中的显示和跳转逻辑。

