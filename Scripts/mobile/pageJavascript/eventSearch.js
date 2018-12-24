var equip_list = null,
	realEquipList = "",
	timeFlag=0;;

function eventSearch() {
	switchToolbar("configTool");

	//初始化
	$("#eventSearchTimeId").val(getNowTime());
	$("#eventSearchEquipId").val("全部设备");
	$("#eventSearchTypeId").val("全部事件类型");
	
	//加载所有设备
	onEquipLists();

	var calendarModal = myApp.calendar.create({
		inputEl: '#eventSearchTimeId',
		openIn: 'customModal',
		toolbarCloseText: "确定",
		footer: true,
		dateFormat: 'yyyy/mm/dd',
		monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
		dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
		rangePicker: true
	});

	//事件类型选择
	/*var pickerModel = myApp.picker.create({
		inputEl: '#eventSearchTypeId',
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
			values: ['全部事件类型', '设备事件', '设置事件', '系统事件']
		}],
		on: {
			change: function(picker, values, displayValues) {
				$("#eventSearchTypeId").html(values);
			},
		}
	});*/
	
}

//加载所有设备
function onEquipLists() {
	var _url = service + "/EquipItemList";

	function _successf(data) {
		var resultJs = $(data).children("string").text();
		if(resultJs != "false") {
			equip_list = new Array();
			var usera = JSON.parse(resultJs);
			var allEquipList = ["全部设备"];
			equip_list[0] = new Array('全部设备', 'x');
			for(var i = 1; i < usera.length; i++) {
				var userb = usera[i];
				var userc = new Array(userb.name, userb.value);
				equip_list[i] = userc;
				allEquipList.push(userb.name);
				realEquipList += userb.value + ",";
			}
			if(realEquipList.length > 0) {
				realEquipList = realEquipList.substring(0, realEquipList.length - 1);
			}
			//设备选择
			myApp.picker.create({
				inputEl: '#eventSearchEquipId',
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
					values: allEquipList
				}],
				on: {
					change: function(picker, values, displayValues) {
						$("#eventSearchEquipId").html(values);
					},
				}
			});
//			searchEquipItems();
		}
	}
	JQajaxoNoCancel("post", _url, false, "", _successf);
}

function searchEquipItems() {
	myApp.dialog.progress();
	timeFlag=0;
	var searchTime = $("#eventSearchTimeId").val();
	var realSearchTime = "";
	if(searchTime) {
		var searchTimeArrs = searchTime.split(" - ");
		if(searchTimeArrs.length == 1) {
			realSearchTime += searchTimeArrs[0] + " 00:00:00";
		} else if(searchTimeArrs.length == 2) {
			realSearchTime += searchTimeArrs[0] + " 00:00:00," + searchTimeArrs[1] + " 23:59:59";
		} else {
			realSearchTime += getNowTime() + " 00:00:00";
		}
	}
	var searchEquip = $("#eventSearchEquipId").val();
	var realSearchEquip = "";
	for(var n = 0; n < equip_list.length; n++) {
		if(equip_list[n][0] == searchEquip) {
			realSearchEquip = equip_list[n][1];
			break;
		}
	}
	//	var searchType = $("#eventSearchTypeId").val();
	var searchTabType = $(".event-search-tabs .buttons-row").find("a").map(function() {
		if($(this).hasClass("tab-link-active")) {
			return $(this).html();
		}
	}).get().join("");

	var _url = "";
	var _data = "";
//	if(searchTabType == "设备事件") {
		_url = service + "/QueryEquipEvt";
		_data = "times=" + realSearchTime + "&&equip_no_list=" + realEquipList;

		function _successEqp(data) {
			var resultJs = $(data).children("string").text();
			var result = JSON.parse(resultJs);
			var strData = "";
			if(result&&result!="false"){
				for(var i = 0; i < result.length; i++) {
					strData += '<li>' +
						'		<span>' + result[i].time + '</span>' +
						'		<span>' + result[i].equip_nm + '</span>' +
						'		<span>' + result[i].event + '</span>' +
						'	</li>';
				}
			}else{
				strData="<li style='border-bottom:none;text-align:center;line-height:38px'>查无数据</li>";
			}
			$("#eventSearchEquipsId").html(strData);
			timeFlag++;
			if(timeFlag>=3){
				myApp.dialog.close();
			}
		}
		JQajaxoNoCancel("post", _url, true, _data, _successEqp);
//	} else if(searchTabType == "设置事件") {
		_url = service + "/QuerySetupsEvt";
		_data = "times=" + realSearchTime + "&&equip_no_list=" + realEquipList;

		function _successSet(data) {
			var resultJs = $(data).children("string").text();
			var result = JSON.parse(resultJs);
			var strData = "";
			if(result&&result!="false"){
				for(var i = 0; i < result.length; i++) {
					strData += '<li>' +
						'		<span>' + result[i].time + '</span>' +
						'		<span>' + result[i].equip_nm + '</span>' +
						'		<span>' + result[i].event + '</span>' +
						'		<span>' + result[i].operator + '</span>' +
						'	</li>';
				}
			}else{
				strData="<li style='border-bottom:none;text-align:center;line-height:38px'>查无数据</li>";
			}
			$("#eventSearchSetId").html(strData);
			timeFlag++;
			if(timeFlag>=3){
				myApp.dialog.close();
			}
		}
		JQajaxoNoCancel("post", _url, true, _data, _successSet);
//	} else {
		_url = service + "/QuerySystemEvt";
		_data = "times=" + realSearchTime;

		function _successSys(data) {
			var resultJs = $(data).children("string").text();
			var result = JSON.parse(resultJs);
			var strData = "";
			if(result&&result!="false"){
				for(var i = 0; i < result.length; i++) {
					strData += '<li>' +
						'		<span>' + result[i].time + '</span>' +
						'		<span>' + result[i].event + '</span>' +
						'	</li>';
				}
			}else{
				strData="<li style='border-bottom:none;text-align:center;line-height:38px'>查无数据</li>";
			}
			$("#eventSearchSystemId").html(strData);
			timeFlag++;
			if(timeFlag>=3){
				myApp.dialog.close();
			}
		}
		JQajaxoNoCancel("post", _url, true, _data, _successSys);
//	}
}

function getNowTime() {
	var date = new Date();
	var seperator1 = "/";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

//封装ajax
function JQajaxoNoCancel(_type, _url, _asycn, _data, _success) {
    var ajaxs = $.ajax({
        type: _type,
        url: _url,
        async: _asycn,
        data: _data,
        success: _success,
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                ajaxs.abort();
                myApp.dialog.create({
                    title: "系统提示",
                    text: '请求超时，请查看网络是否已连接！',
                    buttons: [{
                        text: '确定'
                    }]
                }).open();
            }
            XMLHttpRequest = null;
        },
        error: function() {
            myApp.dialog.create({
                title: "系统提示",
                text: '请求错误，请查看网络是否已连接！',
                buttons: [{
                    text: '确定'
                }]
            }).open();
        }
    });
}