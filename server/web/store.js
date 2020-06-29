window.Notify = {
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
		this.tmr_ = setTimeout(this.refresh.bind(this), 60000*5);
	}
};

