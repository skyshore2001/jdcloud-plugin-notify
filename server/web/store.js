window.Notify = {
	UPDATE_INTERVAL: 5*60, // 默认5分钟刷新一次消息；单位：秒。
	jo_: null,
	jmsgNum_: null,
	tmr_: null,
	init: function (jo) {
		var that = this;
		if (! jo)
			jo = $(".header-user-message");
		jo.click(function () {
			that.refresh();
			WUI.showDlg("#dlgNotify", {modal:false});
		});
		this.jo_ = jo;
		this.jmsgNum_ = jo.find(".msgNum");
		this.refresh();
	},

	updateCnt: function (cnt) {
		if (cnt == 0)
			cnt = "";
		this.jmsgNum_.html(cnt);
	},
	refresh: function () {
		var that = this;
		callSvr("Notify.queryCnt", function (data) {
			that.updateCnt(data.cnt);
		});
		if (this.tmr_)
			clearInterval(this.tmr_);
		this.tmr_ = setTimeout(this.refresh.bind(this), this.UPDATE_INTERVAL * 1000);
	}
};

