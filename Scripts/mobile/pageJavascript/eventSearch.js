var equip_list = null,
	realEquipList = "",
	EqpEvtData = null,
	SetEvtData = null,
	SysEvtData = null;
var eventDetailPopup;

function eventSearch() {
	switchToolbar("configTool");

	//初始化
	$("#eventSearchTimeId").val(getNowTime() + " - " + getNowTime());
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
		rangePicker: true,
		on: {
			closed: function(e) {
				var value = $("#eventSearchTimeId").val();
				var searchTime = $("#eventSearchTimeId").val();
				var realSearchTime = "";
				if(searchTime) {
					var searchTimeArrs = searchTime.split(" - ");
					if(searchTimeArrs.length == 1) {
						realSearchTime += searchTimeArrs[0] + " - " + searchTimeArrs[0];
					}else{
						realSearchTime=searchTime;
					}
					$("#eventSearchTimeId").val(realSearchTime);
				}
			},
		}
	});

	eventDetailPopup = myApp.popup.create({
		content: '<div class="popup eventDetailPopup">' +
			'	<div class="navbar">' +
			'		<div class="navbar-inner">' +
			'			<div class="left hideMenu">' +
			'				<a class="back link" href="#">' +
			'					<i class="iconfont icon-back">' +
			'            </i>' +
			'				</a>' +
			'			</div>' +
			'			<div class="center sliding title eventDetailPopupTitle">' +
			'				设备事件详情' +
			'			</div>' +
			'			<div class="right">' +
			'				<a href="#" class="link popup-close">关闭</a>' +
			'			</div>' +
			'		</div>' +
			'	</div>' +
			'	<div class="page-content">' +
			'	<div class="list eventDetailList">' +
			'		<ul>' +
			'			<li class="item-content item-input">' +
			'				<div class="item-inner">' +
			'					<div class="item-title item-label">Name</div>' +
			'					<div class="item-input-wrap">' +
			'						<input type="text" name="name">' +
			'					</div>' +
			'				</div>' +
			'			</li>' +
			'		</ul>' +
			'	</div>' +
			'</div>' +
			'</div>'
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
			if(equip_list[n][0]=="全部设备"){
				realSearchEquip = realEquipList;
			}else{
				realSearchEquip = equip_list[n][1];
			}
			
			break;
		}
	}
	//	var searchType = $("#eventSearchTypeId").val();
	var searchTabType = $(".eventSearchSubNavBar .subnavbar-inner").find("a").map(function() {
		if($(this).hasClass("tab-link-active")) {
			return $(this).html();
		}
	}).get().join("");

	var _url = "";
	var _data = "";
	if(searchTabType == "设备事件") {
		_url = service + "/QueryEquipEvt";
		_data = "times=" + realSearchTime + "&&equip_no_list=" + realSearchEquip;

		function _successEqp(data) {
			var resultJs = $(data).children("string").text();
			var result = EqpEvtData = JSON.parse(resultJs);
			var resultLength = result.length > 20 ? 20 : result.length;
			var strData = "";
			if(result && result != "false") {
				for(var i = 0; i < resultLength; i++) {
					strData += "<li onclick='showEventDetail(0,\"" + result[i].time + "\",\"" + result[i].event + "\")'>" +
						'		<span>' + result[i].time + '</span>' +
						'		<span>' + result[i].equip_nm + '</span>' +
						'		<span>' + result[i].event + '</span>' +
						'	</li>';
				}
			} else {
				strData = "<li style='border-bottom:none;text-align:center;line-height:38px'>查无数据</li>";
			}
			$("#eventSearchEquipsId").html(strData);
			myApp.dialog.close();

			// Loading flag
			var allowInfinite = true;
			var lastItemIndex = $$('#eventSearchSetId li').length;
			var maxItems = EqpEvtData.length;
			var itemsPerLoad = 20;

			var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
			var nScrollTop = 0; //滚动到的当前位置
			var nDivHight = $("#tab1").height();
			$("#tab1").unbind('srcoll').bind('scroll', function() {
				nScrollHight = $(this)[0].scrollHeight;
				nScrollTop = $(this)[0].scrollTop;
				if(nScrollTop + nDivHight >= nScrollHight && allowInfinite) {
					myApp.dialog.progress();

					allowInfinite = false;

					setTimeout(function() {
						allowInfinite = true;
						if(lastItemIndex >= maxItems) {
							myApp.dialog.close();
							myApp.dialog.alert("没有更多数据了");
							return;
						}

						var html = '';
						for(var i = lastItemIndex; i <= lastItemIndex + itemsPerLoad; i++) {
							html += "<li onclick='showEventDetail(0,\"" + EqpEvtData[i].time + "\",\"" + EqpEvtData[i].event + "\")'>" +
								'		<span>' + EqpEvtData[i].time + '</span>' +
								'		<span>' + EqpEvtData[i].equip_nm + '</span>' +
								'		<span>' + EqpEvtData[i].event + '</span>' +
								'	</li>';
						}
						$$('#eventSearchSetId').append(html);
						lastItemIndex = $$('#eventSearchSetId li').length;
						myApp.dialog.close();
					}, 1000);
				}
			});
		}
		JQajaxoNoCancel("post", _url, true, _data, _successEqp);
	} else if(searchTabType == "设置事件") {
		_url = service + "/QuerySetupsEvt";
		_data = "times=" + realSearchTime + "&&equip_no_list=" + realSearchEquip;

		function _successSet(data) {
			var resultJs = $(data).children("string").text();
			var result = SetEvtData = JSON.parse(resultJs);
			var strData = "";
			var resultLength = result.length > 20 ? 20 : result.length;
			if(result && result != "false") {
				for(var i = 0; i < resultLength; i++) {
					strData += "<li onclick='showEventDetail(1,\"" + result[i].time + "\",\"" + result[i].event + "\")'>" +
						'		<span>' + result[i].time + '</span>' +
						'		<span>' + result[i].equip_nm + '</span>' +
						'		<span>' + result[i].event + '</span>' +
						'	</li>';
				}
			} else {
				strData = "<li style='border-bottom:none;text-align:center;line-height:38px'>查无数据</li>";
			}
			$("#eventSearchSetId").html(strData);
			myApp.dialog.close();

			// Loading flag
			var allowInfinite = true;
			var lastItemIndex = $$('#eventSearchSetId li').length;
			var maxItems = SetEvtData.length;
			var itemsPerLoad = 20;

			var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
			var nScrollTop = 0; //滚动到的当前位置
			var nDivHight = $("#tab2").height();
			$("#tab2").unbind('srcoll').bind('scroll', function() {
				nScrollHight = $(this)[0].scrollHeight;
				nScrollTop = $(this)[0].scrollTop;
				if(nScrollTop + nDivHight >= nScrollHight && allowInfinite) {
					myApp.dialog.progress();

					allowInfinite = false;

					setTimeout(function() {
						allowInfinite = true;
						if(lastItemIndex >= maxItems) {
							myApp.dialog.close();
							myApp.dialog.alert("没有更多数据了");
							return;
						}

						var html = '';
						for(var i = lastItemIndex; i <= lastItemIndex + itemsPerLoad; i++) {
							html += "<li onclick='showEventDetail(1,\"" + SetEvtData[i].time + "\",\"" + SetEvtData[i].event + "\")'>" +
								'		<span>' + SetEvtData[i].time + '</span>' +
								'		<span>' + SetEvtData[i].equip_nm + '</span>' +
								'		<span>' + SetEvtData[i].event + '</span>' +
								'	</li>';
						}
						$$('#eventSearchSetId').append(html);
						lastItemIndex = $$('#eventSearchSetId li').length;
						myApp.dialog.close();
					}, 1000);
				}
			});
		}
		JQajaxoNoCancel("post", _url, true, _data, _successSet);
	} else {
		_url = service + "/QuerySystemEvt";
		_data = "times=" + realSearchTime;

		function _successSys(data) {
			var resultJs = $(data).children("string").text();
			var result = SysEvtData = JSON.parse(resultJs);
			var resultLength = result.length > 20 ? 20 : result.length;
			var strData = "";
			if(result && result != "false") {
				for(var i = 0; i < resultLength; i++) {
					strData += "<li onclick='showEventDetail(2,\"" + result[i].time + "\",\"" + result[i].event + "\")'>" +
						'		<span>' + result[i].time + '</span>' +
						'		<span>' + result[i].event + '</span>' +
						'	</li>';
				}
			} else {
				strData = "<li style='border-bottom:none;text-align:center;line-height:38px'>查无数据</li>";
			}
			$("#eventSearchSystemId").html(strData);
			myApp.dialog.close();

			// Loading flag
			var allowInfinite = true;
			var lastItemIndex = $$('#eventSearchSystemId li').length;
			var maxItems = SysEvtData.length;
			var itemsPerLoad = 20;

			var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
			var nScrollTop = 0; //滚动到的当前位置
			var nDivHight = $("#tab3").height();
			$("#tab3").unbind('srcoll').bind('scroll', function() {
				nScrollHight = $(this)[0].scrollHeight;
				nScrollTop = $(this)[0].scrollTop;
				if(nScrollTop + nDivHight >= nScrollHight && allowInfinite) {
					allowInfinite = false;
					myApp.dialog.progress();

					setTimeout(function() {
						allowInfinite = true;
						if(lastItemIndex >= maxItems) {
							myApp.dialog.close();
							myApp.dialog.alert("没有更多数据了");
							return;
						}

						var html = '';
						for(var i = lastItemIndex; i <= lastItemIndex + itemsPerLoad; i++) {
							html += "<li onclick='showEventDetail(2,\"" + SysEvtData[i].time + "\",\"" + SysEvtData[i].event + "\")'>" +
								'		<span>' + SysEvtData[i].time + '</span>' +
								'		<span>' + SysEvtData[i].event + '</span>' +
								'	</li>';
						}
						$$('#eventSearchSystemId').append(html);
						lastItemIndex = $$('#eventSearchSystemId li').length;
						myApp.dialog.close();
					}, 1000);
				}
			});
		}
		JQajaxoNoCancel("post", _url, true, _data, _successSys);
	}
}

function showEventDetail(type, time, event) {
	eventDetailPopup.open();
	var strData = "";
	if(type == 0) {
		for(var i = 0; i < EqpEvtData.length; i++) {
			if(EqpEvtData[i].time == time && EqpEvtData[i].event == event) {
				strData += '<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">时间</div>' +
					'					<div class="item-input-wrap">' +
					'						<input type="text" name="name" readonly value="' + time + '">' +
					'					</div>' +
					'				</div>' +
					'			</li>' +
					'<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">设备名称</div>' +
					'					<div class="item-input-wrap">' +
					'						<input type="text" name="name" readonly value="' + EqpEvtData[i].equip_nm + '">' +
					'					</div>' +
					'				</div>' +
					'			</li>' +
					'<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">设备事件</div>' +
					'					<div class="item-input-wrap">' +
					'						<textareareadonly>"' + event + '"</textarea>' +
					'					</div>' +
					'				</div>' +
					'			</li>';
				break;
			}
		}
		$(".eventDetailPopupTitle").html("设备事件详情");
		$(".eventDetailList").html(strData);
	} else if(type == 1) {
		for(var i = 0; i < SetEvtData.length; i++) {
			if(SetEvtData[i].time == time && SetEvtData[i].event == event) {
				strData += '<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">时间</div>' +
					'					<div class="item-input-wrap">' +
					'						<input type="text" name="name" readonly value="' + time + '">' +
					'					</div>' +
					'				</div>' +
					'			</li>' +
					'<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">设备名称</div>' +
					'					<div class="item-input-wrap">' +
					'						<input type="text" name="name" readonly value="' + SetEvtData[i].equip_nm + '">' +
					'					</div>' +
					'				</div>' +
					'			</li>' +
					'<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">操作人</div>' +
					'					<div class="item-input-wrap">' +
					'						<input type="text" name="name" readonly value="' + SetEvtData[i].operator + '">' +
					'					</div>' +
					'				</div>' +
					'			</li>' +
					'<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">设备事件</div>' +
					'					<div class="item-input-wrap">' +
					'						<textarea readonly>"' + event + '"</textarea>' +
					'					</div>' +
					'				</div>' +
					'			</li>';
				break;
			}
		}
		$(".eventDetailPopupTitle").html("设置事件详情");
		$(".eventDetailList").html(strData);
	} else {
		for(var i = 0; i < SysEvtData.length; i++) {
			if(SysEvtData[i].time == time && SysEvtData[i].event == event) {
				strData += '<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">时间</div>' +
					'					<div class="item-input-wrap">' +
					'						<input type="text" name="name" readonly value="' + time + '">' +
					'					</div>' +
					'				</div>' +
					'			</li>' +
					'<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">设备事件</div>' +
					'					<div class="item-input-wrap">' +
					'						<textarea readonly>"' + event + '"</textarea>' +
					'					</div>' +
					'				</div>' +
					'			</li>';
				break;
			}
		}
		$(".eventDetailPopupTitle").html("系统事件详情");
		$(".eventDetailList").html(strData);
	}
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
			if(status == 'timeout') { //超时,status还有success,error等值的情况
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