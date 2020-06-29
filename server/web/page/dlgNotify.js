function initDlgNotify()
{
	var jdlg = $(this);
	var jtbl = jdlg.find("#tblNotify");
	var firstTime = true;

	jtbl.datagrid({
		url: WUI.makeUrl("Notify.query"),
		pagination: false,
		fitColumns: true
	});
	jdlg.on("show", onShow);

	function onShow(ev, formMode, opt) 
	{
		if (firstTime) {
			firstTime = false;
		}
		else {
			jtbl.datagrid('reload');
		}
	}
}

var NotifyColumns = {
	TypeMap: {
		Issue: "缺陷问题待处理"
	},
	name: function (value, row) {
		if (row.type == "Issue") {
			value = (IssueStatusMap[row.status] || row.status) + ": " + row.name;
		}
		return WUI.makeLink(value, function () {
			if (row.type == "Issue") {
				WUI.showPage('pageIssue');
				return;
			}
		});
	}
}
