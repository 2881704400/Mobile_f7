function snapShotDetail() {
	//获取父页面参数
	var chatObject = myApp.views.main.history,
		urlLength = chatObject.length - 1;
	var chatValue = chatObject[urlLength].split("?")[1].split("&");
	var chatTitleName = chatValue[0];
	var chatList = chatValue[1];
	$("#snapShotDetailTitleId").html(chatTitleName)

	loadMessage(chatList);
}

function loadMessage(chatList) {
	console.log(chatList)
	$.ajax({
		type: 'post',
		url: '/api/event/real_evt',
		headers: {
			Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
		},
		data: {
			levels: chatList
		},
		success: function(dt) {
			if(dt.HttpStatus == 200 && dt.HttpData.data) {
				var result = dt.HttpData.data;
				console.log(result);
				let tableListData = [];
				var strSureData = "";
				var strData = "";
				for(var i = 0; i < result.length; i++) {
					var textareaEventMsg = "";
					if(result[i].EventMsg.length > 200) {
						textareaEventMsg = "<textarea>" + result[i].EventMsg + "</textarea>";
					} else {
						textareaEventMsg = result[i].EventMsg;
					}

					var textareaAdviceMsg = "";
					if(result[i].Proc_advice_Msg.length > 200) {
						textareaAdviceMsg = "<textarea>" + result[i].Proc_advice_Msg + "</textarea>";
					} else {
						textareaAdviceMsg = result[i].Proc_advice_Msg;
					}

					var isSureSpan = "";
					if(result[i].bConfirmed == false) {
						isSureSpan = "<span class='span-color-notsure'>未确认</span>";
						strData += '<li class="accordion-item">' +
							'<a href="#" class="item-link item-content">' +
							'	<div class="item-inner">' +
							'		<div class="item-title-row">' +
							'			<div class="item-subtitle">' + formatDate(result[i].Time) + '</div>' +
							'			<div class="item-after">' + isSureSpan + '</div>' +
							'		</div>' +
							'		<div class="item-text">' + result[i].EventMsg + '</div>' +
							'	</div>' +
							'</a>' +
							'<div class="accordion-item-content content-container">' +
							'<div class="content-container-block">' +
							'<p>时间：' + formatDate(result[i].Time) + '</p>' +
							'<p>事件：' + textareaEventMsg + '</p>' +
							'<p>处理意见：' + textareaAdviceMsg + '</p>' +
							"<p><a href='#' class=\"button button-big button-fill color-blue\" onclick='OnSureMessage(this)' values='" + result[i] + "' title=\"" + result[i].User_Confirmed + formatDate(result[i].Dt_Confirmed) + "\">请确认</a></p>" +
							'</div></div>' +
							'</li>';
					} else {
						isSureSpan = "<span class='span-color-sure'>已确认</span>";
						strSureData += '<li class="accordion-item">' +
							'<a href="#" class="item-link item-content">' +
							'	<div class="item-inner">' +
							'		<div class="item-title-row">' +
							'			<div class="item-subtitle">' + formatDate(result[i].Time) + '</div>' +
							'			<div class="item-after">' + isSureSpan + '</div>' +
							'		</div>' +
							'		<div class="item-text">' + result[i].EventMsg + '</div>' +
							'	</div>' +
							'</a>' +
							'<div class="accordion-item-content content-container">' +
							'<div class="content-container-block">' +
							'<p>时间：' + formatDate(result[i].Time) + '</p>' +
							'<p>事件：' + textareaEventMsg + '</p>' +
							'<p>处理意见：' + textareaAdviceMsg + '</p>'+
							"<p>确认人：" + result[i].User_Confirmed + '</p><p>确认时间：' + formatDate(result[i].Dt_Confirmed) + "</p>" +
							'</div></div>' +
							'</li>';
					}
				}
				$("#snapShotDetailListId").html(strData + strSureData);
			}
		}
	});
}

function OnSureMessage(dt) {
	console.log(dt)
	/*阻止事件冒泡*/
	event.stopPropagation();
	myApp.pickerModal('.picker-snapshotMessage');
	/*var isProcs = "发送短信&nbsp;&nbsp;<label class=\"label-switch\" onclick='onProcsCheckBox()'><input id='isProcsInput' type=\"checkbox\" name=\"switch\" value=\"yes\"><div class=\"checkbox\"></div></label>";
    var buttons = [
        {
            text: "<div class='modalTitles'>" + $(dt).attr("title") + "</div>",
            label: true
        },
        {
            text: "<p class='mgSection'>请输入处理意见(100字以内)：</p>",
            label: true
        },
        {
            text: "<p class='mgSection'><textarea id=\"actualText\" values='" + $(dt).attr("values") + "'></textarea></p>",
            label: true
        },
        {
            text: "<div class='mgSection'><div style='margin-bottom:6px;'>" + isProcs + "</div><div id='procsContent' class='procsContent list-block' style='display:none;'></div></div>",
            label: true
        },
        {
            text: "确定",
            bold: true,
            onClick: onProcsOK
        },
        {
            text: "取消",
            bold: true,
            color: 'red',
        },
    ];
    myApp.actions(buttons);*/
}

//确定
function onProcsOK() {
	var textMessage = $("#actualText").val();
	var isProcs = "false";
	var telStrs = "";
	if(document.getElementById("isProcsInput").checked) {
		isProcs = "true";
		$("#procsContent ul li").each(function(i) {
			if(document.getElementById("procsContent_" + i).checked) {
				var liStr = $(this).find("span").text().split('(')[0];
				telStrs += liStr + ",";
			}
		})
		telStrs = telStrs.substring(0, telStrs.length - 1);
	}
	var userNam = "";
	if(window.localStorage.userName != "" && window.localStorage.userName != null) {
		userNam = window.localStorage.userName;
	} else {
		userNam = window.sessionStorage.userName;
	}
	var numbs = parseInt($("#actualText").attr('values'));
	var _url = service + "/EventConfirm";
	var _data = "procMsg=" + textMessage + "&&isMsg=" + isProcs + "&&telStr=" + telStrs + "&&procName=" + evtName[numbs][1] + "&&procTime=" + evtName[numbs][0] + "&&userName=" + userNam;

	function _successf(data) {
		var resultJs = $(data).children("string").text();
		if(resultJs = "true") {
			SnapshotData();
		}
	}

	function _errors() {
		SnapshotData();
	}
	ajaxService("post", _url, true, _data, _successf, _errors);

	myApp.closeModal('.picker-info');
}

function formatDate(time) {
	var newTime = time.replace("T", " ")
	return newTime.substring(0, 19);
}