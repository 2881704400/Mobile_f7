var userAdmin = [];

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
		url: '/api/GWServiceWebAPI/get_DataByTableName',
		headers: {
			Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
		},
		data: {
			TableName: "Administrator"
		},
		success: function(dt) {
			if(dt.HttpStatus == 200 && dt.HttpData.data) {
				var resultData = dt.HttpData.data;
				for(var i = 0; i < resultData.length; i++) {
					userAdmin.push({
						Administrator: resultData[i].Administrator,
						MobileTel: resultData[i].MobileTel,
						allInfo: resultData[i].Administrator + "&&" + resultData[i].MobileTel
					});
				}
			}
		}
	});

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
				var countNum = 0;
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
							'<p>处理意见：<textarea class="advice-textarea" placeholder="请输入处理意见"></textarea></p>' +
							'<p>是否发送短信：&nbsp;&nbsp;<label class="toggle toggle-init color-blue" onclick="onProcsCheckBox(' + countNum + ')">' +
							'<input type="checkbox" class="isProcsInput"><span class="toggle-icon"></span></label><div class="procsContent list-block" style="height:auto;display:block"></div></p>' +
							"<p><a href='#' class=\"button button-big button-fill color-blue\" onclick='OnSureMessage(this)' values='" + result[i] + "' title=\"" + result[i].User_Confirmed + formatDate(result[i].Dt_Confirmed) + "\">请确认</a></p>" +
							'</div></div>' +
							'</li>';
						countNum++;
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
							'<p>处理意见：' + textareaAdviceMsg + '</p>' +
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

//选择是否发送短信
function onProcsCheckBox(countNum) {
	console.log(countNum, $("#snapShotDetailListId li").eq(countNum).find('.isProcsInput').is(':checked'))
	if(!$("#snapShotDetailListId li").eq(countNum).find('.isProcsInput').is(':checked')) {
		console.log(!$("#snapShotDetailListId li").eq(countNum).find(".procsContent ul").find("li").length)
		if(!$("#snapShotDetailListId li").eq(countNum).find(".procsContent ul").find("li").length) {
			var newRow = "<ul>";
			for(var i = 0; i < userAdmin.length; i++) {
				/*newRow += '<li>' +
					'  <label class="item-radio item-content">' +
					'    <input type="radio" name="demo-radio" value="Movies"/>' +
					'    <i class="icon icon-radio"></i>' +
					'    <div class="item-inner">' +
					'      <div class="item-title">' + userAdmin[i].Administrator + (userAdmin[i].MobileTel == null ? "" : userAdmin[i].MobileTel + '</div>' +
						'    </div>' +
						'  </label>' +
						'</li>'; */
				newRow += '<li><label class="item-checkbox item-content">' +
					'    <input type="checkbox" name="demo-checkbox" value="Books" checked="checked"/>' +
					'    <i class="icon icon-checkbox"></i>' +
					'    <div class="item-inner">' +
					'      <div class="item-title">' + userAdmin[i].Administrator + (userAdmin[i].MobileTel == null ? "" : "("+userAdmin[i].MobileTel+")") + '</div>' +
					'    </div>' +
					'  </label></li>';
			}
			newRow += "</ul>";
			console.log(newRow)
			$("#snapShotDetailListId li").eq(countNum).find(".procsContent").html(newRow);
			$("#snapShotDetailListId li").eq(countNum).find(".procsContent").show();
		}
	}
//	$("#snapShotDetailListId li").eq(countNum).find(".procsContent").toggle();
	/*if(!document.getElementById('isProcsInput').checked) {
		console.log(1)
		if(!$(".procsContent ul").find("li").length) {
			console.log(2)
			var newRow = $('<ul></ul>');
			for(var i = 0; i < userAdmin.length; i++) {
				var labels = '<label class="item-checkbox item-content">' +
					'    <input type="checkbox" name="demo-checkbox" value="Books" checked="checked"/>' +
					'    <i class="icon icon-checkbox"></i>' +
					'    <div class="item-inner">' +
					'      <div class="item-title">' + userAdmin[i].Administrator + '(' + userAdmin[i].MobileTel + ')</div>' +
					'    </div>' +
					'  </label>';
				newRow.append(lables);
			}
			$("#procsContent").html(newRow);
			console.log($("#procsContent").html())
		}
	}
	$("#procsContent").toggle();*/
}

function OnSureMessage(dt) {
	console.log(dt)
	/*阻止事件冒泡*/
	event.stopPropagation();
	var dynamicSheet = app.sheet.create({
		content: '<div class="sheet-modal">' +
			'<div class="toolbar">' +
			'<div class="toolbar-inner">' +
			'<div class="left"></div>' +
			'<div class="right">' +
			'<a class="link sheet-close">Done</a>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="sheet-modal-inner">' +
			'<div class="block">' +
			'<p>Sheet created dynamically.</p>' +
			'<p><a href="#" class="link sheet-close">Close me</a></p>' +
			'</div>' +
			'</div>' +
			'</div>',
		// Events
		on: {
			open: function(sheet) {
				console.log('Sheet open');
			},
			opened: function(sheet) {
				console.log('Sheet opened');
			},
		}
	});
}

function formatDate(time) {
	var newTime = time.replace("T", " ")
	return newTime.substring(0, 19);
}