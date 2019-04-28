function equipLinkageModify() {
	var chatObject = myApp.views.main.history,
		urlLength = chatObject.length - 1,
		receiveUser = chatObject[urlLength].split("?")[1],
		msgArray = [];
	receiveUser ? msgArray = receiveUser.split("&") : "";

	var index = "";
	if(receiveUser) {
		var receiveUserArr = receiveUser.split("&");
		var equipName = receiveUserArr[0];
		var cType = receiveUserArr[1];
		var cSpot = receiveUserArr[2];
		var delayTime = receiveUserArr[3];
		var linkageEquip = receiveUserArr[4];
		var linkageOpt = receiveUserArr[5];
		var optCode = receiveUserArr[6];
		var remarks = receiveUserArr[7];
		var ID = receiveUserArr[8];
		$("#equipLinkageModifyId").attr("dataID", ID)
		index = receiveUserArr[9];
		if(equipName != " " && equipName != "undefined") {
			$("#equipTiggerName").val(equipName);
		}
		if(cType != " " && cType != "undefined") {
			$("#equipTiggerType").val(cType);
		}
		if(cSpot != " " && cSpot != "undefined") {
			$("#equipTiggerSpot").val(cSpot);
		}
		if(delayTime != " " && delayTime != "undefined") {
			$("#equipTiggerTime").val(delayTime);
		}else{
			$("#equipTiggerTime").val(0);
		}
		if(linkageEquip != " " && linkageEquip != "undefined") {
			$("#equipTigger_Link").val(linkageEquip);
		}
		if(linkageOpt != " " && linkageOpt != "undefined") {
			$("#equipTiggerCom").val(linkageOpt);
		}
		if(remarks != " " && remarks != "undefined") {
			$("#equipTiggerInfo").val(remarks);
		}
	}

	$("#equipLinkageModifyId").unbind('click').bind('click', function() {
		addLinkage(this, index);
	});
	
}

function createPickerModel(id, values, _opened, _change, _closed) {
	myApp.picker.create({
		inputEl: '#' + id,
		rotateEffect: false,
		renderToolbar: function() {
			return '<div class="toolbar">' +
				'<div class="toolbar-inner">' +
				'<div class="left">' +
				'<a href="#" class="link sheet-close popover-close">取消</a>' +
				'</div>' +
				'<div class="center">' +
				'<a href="#" class="link toolbar-randomize-link">选择设备</a>' +
				'</div>' +
				'<div class="right">' +
				'<a href="#" class="link sheet-close popover-close">确定</a>' +
				'</div>' +
				'</div>' +
				'</div>';
		},
		cols: [{
			textAlign: 'center',
			values: values
		}],
		on: {
			opened: _opened,
			change: _change,
			closed: _closed
		}
	});
}