var scheduleTimeAler, scheduleAlert, scheduleAlertSusscess;
function schedule() {
    switchToolbar("configTool");
    scheduleAlert = myApp.toast.create({
        text: "操作失败",
        position: 'center',
        closeTimeout: 2000,
    });
    scheduleAlertSusscess = myApp.toast.create({
        text: "操作成功",
        position: 'center',
        closeTimeout: 2000,
    });
    scheduleTimeAlert = function(txt) {
        return myApp.toast.create({
            text: txt,
            position: 'center',
            closeTimeout: 2000,
        })
    };
    //顶部菜单切换
    $(".subnavbarTabel>a").unbind();
    $(".subnavbarTabel>a").bind("click", function() {
        $(this).addClass("selectScheduleMenu").siblings().removeClass("selectScheduleMenu");
        //切换
        switchMenu(this);
        //顶部添加
        $($(this).attr("href") + "_nav").removeClass("displayNone").siblings().addClass("displayNone");
    });
    //人员数据请求
    schedule_public_username.length = 0;
    requestUser();
}
// ********************************************************************************
// 人员
var schedule_public_username = [];
function requestUser() {
    var disabled = "'disabled'";
    var jsonData = {
        "url": "/api/GWServiceWebAPI/get_AdministratorData",
        "data": {
            getDataTable: "0"
        },
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);
    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,
            html = "";
        $("#schedule_user ul").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                let telphoneUser = arrayLike[i].Telphone.toString().trim() == "" ? null : arrayLike[i].Telphone;
                let mobileTelUser = arrayLike[i].MobileTel.toString().trim() == "" ? null : arrayLike[i].MobileTel;
                let emailUser = arrayLike[i].EMail.toString().trim() == "" ? null : arrayLike[i].EMail;
                let ackLevelUser = arrayLike[i].AckLevel.toString().trim() == "" ? null : arrayLike[i].AckLevel;
                html += `<li class="swipeout bottomBorderLine">
                      <div class="item-content swipeout-content schedule-content row no-gap">
                        <img src="http://lorempixel.com/68/68/people/1/" width="34" height="34"/>
                        <div class="col-50">
                            <p>${arrayLike[i].Administrator}</p>
                            <p>报警级别: <label>${arrayLike[i].AckLevel}</label></p>
                        </div>
                        <div class="col-50"><a href="#" class="detailsBtn linkColor" onclick="newlyBuildUser('${arrayLike[i].Administrator}','${telphoneUser}','${mobileTelUser}','${emailUser}','${ackLevelUser}',1,${disabled})">详情</a>   </div>              
                      </div>
                      <div class="swipeout-actions-right">
                        <a href="#" class="delBtn" onclick="delUser(this,${arrayLike[i].Administrator})">删除</a>
                      </div>
                    </li>`;
                schedule_public_username.push(arrayLike[i].Administrator);
            }
        } else {
            requestUser();
            return false;
        }
        $("#schedule_user ul").append(html);
    }
    function _error(e) {
        console.log(e);
    }
}
//人员html
function newlyBuildUser(userName, telphone, telmobile, emailValue, ackLevel, index, status) {
    var html = '<div class="popup popup-aboutuser">' + '<h1>人员信息修改</h1>' + '<div class="popupContent list inline-labels no-hairlines-md">' + '<ul>' + '<li class="item-content item-input" style="padding-left: 0;">' + '<div class="item-inner">' + '<div class="item-title item-label">人员姓名</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="你的姓名" value = "' + userName.toString().trim() + '"  class="userName" ' + status + '>' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">' + '<div class="item-inner">' + '<div class="item-title item-label">电话号码</div>' + '<div class="item-input-wrap">' + '<input type="number" placeholder="你的电话号码" value = "' + telphone + '" class="telphone">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">' + '<div class="item-inner">' + '<div class="item-title item-label">短信号码</div>' + '<div class="item-input-wrap">' + '<input type="number" placeholder="你的电话号码" value = "' + telmobile + '" class="telmobile">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">' + '<div class="item-inner">' + '<div class="item-title item-label">电子邮箱</div>' + '<div class="item-input-wrap">' + '<input type="email" placeholder="你的电话号码" value = "' + emailValue + '" class="emailValue">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">' + '<div class="item-inner">' + '<div class="item-title item-label">报警级别</div>' + '<div class="item-input-wrap">' + '<input type="number" placeholder="报警级别" value = "' + ackLevel + '" class="ackLevel">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '</ul>' + '</div>' + '<div class="popupBtb row">' + '<a class="link popup-close col-50 button" href="#">返回</a>' + '<a class="link popup-close popupOpenBtn col-50 button" href="#" onclick="updateUser(this,' + index + ')">确认</a>' + '</div>' + '</div>';
    popupAlert(html);
}
//人员数据库表更新
function updateUser(that, index) {
    var dt = $(that).parent().parent();
    if (!dt.find("input.userName").val()) {
        scheduleAlert.open();
        return false;
    }
    let AdministratorUpdate = {
        getDataTable: "Administrator",
        Administrator: dt.find("input.userName").val(),
        Telphone: dt.find("input.telphone").val(),
        MobileTel: dt.find("input.telmobile").val(),
        EMail: dt.find("input.emailValue").val(),
        AckLevel: parseInt(dt.find("input.ackLevel").val()),
        ifName: "Administrator",
        ifValue: dt.find("input.userName").val()
    };
    if (index == 1) publicAjax(AdministratorUpdate, "/api/GWServiceWebAPI/updateEquipGroup", 1);
    else publicAjax(AdministratorUpdate, "/api/GWServiceWebAPI/insertEquipGroup", 1);
}
//人员表删除
function delUser(that, userName) {
    myApp.dialog.confirm("是否删除该人员", "提示", function() {
        var dt = $(that).parent().parent(),
            deleteJson = {
                getDataTable: "Administrator",
                ifName: "Administrator",
                ifValue: userName,
                type: "string"
            };
        publicAjax(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 1);
    });
}
//人员表公共请求
function publicAjax(jsonString, url, index) {
    var jsonData = {
        "url": url,
        "data": jsonString,
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);
    function _success(data) {
        let arrayLike = data.HttpStatus;
        if (arrayLike == 200 && data.HttpData.data != 0) {
            scheduleAlertSusscess.open();
            switch (index) {
                case 1:
                    requestUser();
                    break;
                case 2:
                    requestEquipGroup();
                    break;
                case 3:
                    requestAlmReport(requestEGAReport);
                    break;
                case 4:
                    requestWeekAlmReport();
                    break;
                case 5:
                    requestSpeAlmReport();
                    break;
                default:
                    break;
            }
        } else {
            scheduleAlert.open();
        }
    }

    function _error(e) {
        scheduleAlert.open();
    }
}
// ********************************************************************************
//设备分组
var that_parent, equipArray = new Array();
function requestEquipGroup() {
    var jsonData = {
        "url": "/api/GWServiceWebAPI/get_EquipGroupData",
        "data": {
            getDataTable: "0"
        },
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);

    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,
            html = "";
        $("#schedule_equip ul").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            equipArray.length = 0;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                html += `<li class="swipeout bottomBorderLine">
                  <div class="item-content swipeout-content schedule-content row no-gap" style="padding-left: 0;">
                    <div class="col-50 equipGroupInput" >
                        <span onclick="newlyBuildEquip(this)" equipcomb="${arrayLike[i].equipcomb}" group_no="${arrayLike[i].group_no}">${arrayLike[i].group_name}</span>
                        <div class="displayNone"><input type="text" value=""/></div>
                    </div>
                    <div class="col-50">
                      <a href="#" class="equipGroupModifyBtn linkColor" onclick="equipAlert(this,1)">修改</a>
                      <span class="displayNone">
                        <a href="#" class="equipGroupSaveBtn linkColor" onclick="equipAlert(this,2)">保存</a>
                        <a href="#" class="equipGroupCancelBtn linkColor" onclick="equipAlert(this,3)">取消</a>
                      </span>
                    </div>              
                  </div>
                  <div class="swipeout-actions-right">
                    <a href="#" class="delBtn" onclick="delEquip(this)">删除</a>
                  </div>
                </li>`;
                equipArray.push(arrayLike[i].group_no);
            }
        } else {
            requestEquipGroup();
            return false;
        }
        $("#schedule_equip ul").append(html);
    }

    function _error(e) {
        console.log(e);
    }
}
// 设备html
var currentArray = [];
function newlyBuildEquip(that) {
    currentArray.length = 0, that_parent = that;
    var jsonData = {
        "url": "/api/GWServiceWebAPI/get_EquipData",
        "data": {
            getDataTable: ""
        },
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);
    var coutResult;
    $(that).attr("equipcomb") ? coutResult = $(that).attr("equipcomb").split("#") : coutResult = "#";
    function _success(data) {
        let arrayLike = data.HttpData.data,
            code = data.HttpData.code;
        var item = "",
            html = '<div class="popup popup-aboutuser">' + '<h1 class="equipGroupTitle" group_no="' + $(that).attr("group_no") + '">' + $(that).text() + '</h1>' + '<div class="popupContent list inline-labels no-hairlines-md">' + '<div class="allSelect"><label class="item-checkbox item-content" onclick="allSelectEquip()">' + '<input type="checkbox" name="checkbox" >' + '<i class="icon icon-checkbox"></i>' + '<div class="item-inner">' + '<div class="item-title">全选</div>' + '</div>' + '</label></div>' + '<ul class="equipTypeSelect" style="padding-top: 60px;">';
        if (code == 200) {
            var AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                let checkboxSet = "";
                for (var j = 0; j < coutResult.length; j++) {
                    if (coutResult[j] == arrayLike[i].equip_no) {
                        currentArray.push(arrayLike[i].equip_no);
                        checkboxSet = "checked";
                    }
                }
                html += '<li class="">' + '<label class="item-checkbox item-content bottomBorderLine" onclick="actionString(this)" equip_no="' + arrayLike[i].equip_no + '">' + '<input type="checkbox" name="checkbox-' + i + '"  value="' + arrayLike[i].equip_nm + '" ' + checkboxSet + '>' + '<i class="icon icon-checkbox"></i>' + '<div class="item-inner">' + '<div class="item-title">' + arrayLike[i].equip_nm + '</div>' + '</div>' + '</label>' + '</li>';
            }
            popupAlert(html + '</ul>' + '</div>' + '<div class="popupBtb row">' + '<a class="link popup-close col-50 button" href="#">返回</a>' + '<a class="link col-50 button allComfirm" href="#" onclick="updateEquip(this,0,1)">确认</a>' + '</div>' + '</div>');
            // 判断是否全选
            if (currentArray.length == $(".equipTypeSelect li").length) $(".allSelect input").prop("checked", true);
            else $(".allSelect input").prop("checked", false);
        } else {
            newlyBuildEquip(that);
            return false;
        }
    }

    function _error(e) {
        console.log(e);
    }
}
function actionString(dt) {
    !$(dt).find("input").is(':checked') ? currentArray.push($(dt).attr("equip_no")) : currentArray.splice(currentArray.indexOf($(dt).attr("equip_no")), 1);
    if (currentArray.length == $(".equipTypeSelect li").length) $(".allSelect input").prop("checked", true);
    else $(".allSelect input").prop("checked", false);
}
//设备更新添加
function updateEquip(that, equipName, index) {
    if (index == 1) {
        let updateJson = {
            getDataTable: "EquipGroup",
            equipcomb: currentArray.length > 0 ? "#" + currentArray.join("#") : "#",
            group_name: $(".equipGroupTitle").text(),
            ifValue: $(".equipGroupTitle").attr("group_no")
        };
        publicAjax(updateJson, "/api/GWServiceWebAPI/updateEquipGroup", 2);
    } else {
        var NewLineVal, NewLineArray = [];
        $("#schedule_equip").find("li").each(function(index) {
            NewLineArray.push($(this).find("div.equipGroupInput span").attr("group_no"));
        });
        NewLineVal = NewLineArray.length == 0 ? 1 : Math.max.apply(null, NewLineArray) + 1;
        let insertJson = {
            getDataTable: "EquipGroup",
            groupName: "新增项目",
            groupNo: NewLineVal
        };
        publicAjax(insertJson, "/api/GWServiceWebAPI/insertEquipGroup", 2);
    }
}
//设备删除
function delEquip(that) {
    myApp.dialog.confirm("是否删除该分组", "提示", function() {
        let dt = $(that).parent().siblings();
        var deleteJson = {
            getDataTable: "EquipGroup",
            ifName: "group_no",
            ifValue: dt.find("div.col-50 span").attr("group_no"),
            type: "number"
        };
        publicAjax(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 2);
    });
}
//弹窗输入
function equipAlert(dt, index) {
    switch (index) {
        case 1:
            $(dt).addClass("displayNone").siblings().removeClass("displayNone");
            $(dt).parent().prev().find("div").removeClass("displayNone").siblings().addClass("displayNone");
            $(dt).parent().prev().find("div input").focus();
            break;
        case 2:
            let val = $(dt).parents("div.col-50").prev().find("div input").val(),
                tbject = $(dt).parents("div.col-50").prev().find("span");
            if (!val) {
                scheduleAlert.open();
                return false;
            }
            let updateJson = {
                getDataTable: "EquipGroup",
                equipcomb: "#",
                group_name: val,
                ifValue: tbject.attr("group_no")
            };
            publicAjax(updateJson, "/api/GWServiceWebAPI/updateEquipGroup", 2);
            break;
        case 3:
            $(dt).parent().addClass("displayNone").siblings().removeClass("displayNone");
            $(dt).parents("div.col-50").prev().find("span").removeClass("displayNone").siblings().addClass("displayNone");
            break;
        case 4:
            updateEquip(dt, "", 2);
            break;
        default:
            break;
    }
}
//获取最大序号
function getMaxNo() {
    if (equipArray.length == 0) return 1;
    else return Math.max.apply(null, equipArray) + 1;
}
//全选
function allSelectEquip() {
    currentArray.length = 0;
    if (!$(".allSelect").find("input").is(':checked')) {
        $(".equipTypeSelect li").each(function(i) {
            $(this).find("input").prop("checked", true);
            currentArray.push($(this).find("label").attr("equip_no"));
        });
    } else {
        $(".equipTypeSelect li").each(function(i) {
            $(this).find("input").prop("checked", false);
            currentArray.length = 0;
        });
    }
}
//处理equipcomb
var groupNOArray = [];
function allEquipCom(dt, value) {
    $(dt).parent().next().find("li").each(function(index) {
        groupNOArray.push($(this).find("label").attr("equip_no"));
    });
    if (value == 1) {
        $(that_parent).attr("equipcomb", "#");
    } else {
        $(that_parent).attr("equipcomb", "#" + groupNOArray.join("#") + "#");
    }
}
// ********************************************************************************
//管理范围
function requestAlmReport(almGroupObject) {
    var jsonData = {
        "url": "/api/GWServiceWebAPI/get_AlmReportData",
        "data": {
            getDataTable: "0"
        },
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);

    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,
            html = "";
        $("#schedule_administartor ul").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                html += `<li class="swipeout bottomBorderLine">
                  <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildAlmReport(this,1);" dataid = "${arrayLike[i].id}" datano="${arrayLike[i].group_no}">
                    <div class="col-50">${arrayLike[i].Administrator}</div>
                    <div class="col-50">${getEquipName(almGroupObject,arrayLike[i].group_no)}</div>              
                  </div>
                  <div class="swipeout-actions-right">
                    <a href="#" class="delBtn" onclick="delAlmReport(this)">删除</a>
                  </div>
                </li>`;
            }
        } else {
            requestAlmReport(almGroupName);
            return false;
        }

        $("#schedule_administartor ul").append(html);
    }

    function _error(e) {
        console.log(e);
    }
}
// 设备html
function newlyBuildAlmReport(that, index) {
    var userData = {
        "url": "/api/GWServiceWebAPI/get_AdministratorData",
        "data": {
            getDataTable: "0"
        },
        "success": user_success,
        "error": user_error,
    };
    $.fn.axpost(userData);

    function user_success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code;
        if (code == 200) {
            equipAjax(arrayLike);
        }
    }
    function user_error(e) {}
    function equipAjax(userResult) {
        var equipData = {
            "url": "/api/GWServiceWebAPI/get_EquipGroupData",
            "data": {
                getDataTable: "0"
            },
            "success": equip_success,
            "error": equip_error,
        };
        $.fn.axpost(equipData);

        function equip_success(data) {
            let arrayLike = data.HttpData.data;
            let code = data.HttpData.code;
            if (code == 200) {
                var histroyUserName = "",
                    histroyGroupName = "";
                if (index == 1) // 修改
                {
                    histroyUserName = $(that).find("div:eq(0)").text(), histroyGroupName = $(that).find("div:eq(1)").text();
                }
                //界面  
                viewHTML(that, histroyUserName, histroyGroupName, userResult, arrayLike, index);
            }
        }

        function equip_error(e) {}
    }
    function viewHTML(dt, oldUserName, oldGroupName, userName, groupName, no) {
        var html = '<div class="popup popup-aboutuser">' + '<h1>管理范围</h1>' + '<div class="popupContent list inline-labels no-hairlines-md">' + '<ul class="list">' + '<li class="item-content item-input"  style="padding-left: 0;margin-bottom: 30px;">'  + '<div class="item-inner" style="margin-left: 0;">' + '<div class="item-title item-label">人员姓名</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="请选择人员名称" value ="' + oldUserName + '" readonly="readonly" id="userInput">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">'  + '<div class="item-inner" style="margin-left: 0;">' + '<div class="item-title item-label">分组名称</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="请选择分组名称" value ="' + oldGroupName + '" readonly="readonly" id="groupInput">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '</ul>' + '</div>' + '<div class="popupBtb row">' + '<a class="link popup-close col-50 button" href="#">返回</a>' + '<a class="link col-50 button" href="#" onclick="updateAlmReport(this,' + $(dt).attr("dataid") + ',' + no + ')">确认</a>' + '</div>' + '</div>';
        popupAlert(html);
        var arrayUser = [],
            arrayGroup = [];
        userName.forEach(function(item, index) {
            arrayUser.push(item.Administrator);
        });
        groupName.forEach(function(item, index) {
            arrayGroup.push(item.group_name);
        })
        listInit("userInput", arrayUser);
        listInit("groupInput", arrayGroup);
    }
}
//设备更新添加
function updateAlmReport(that, parentId, index) {
    var weekID = getMaxId("schedule_administartor"); //获取新建id主键
    var dt = $(that).parent().prev();
    if (index == 1) {
        let updateJson = {
            getDataTable: "AlmReport",
            group_no: getEquipNO(requestEGAReport, dt.find("#groupInput").val()),
            Administrator: dt.find("#userInput").val(),
            ifValue: parentId,
        };
        publicAjax(updateJson, "/api/GWServiceWebAPI/updateEquipGroup", 3);
    } else {
        let insertJson = {
            getDataTable: "AlmReport",
            group_no: getEquipNO(requestEGAReport, dt.find("#groupInput").val()),
            Administrator: dt.find("#userInput").val(),
            ifValue: weekID
        };
        publicAjax(insertJson, "/api/GWServiceWebAPI/insertEquipGroup", 3);
    }
}
//最大ID添加1
function getMaxId(id) {
    var parentDt = $("#" + id).find("tbody"),
        arrayIndex = [];
    parentDt.find("tr").each(function(index) {
        arrayIndex.push($(this).attr("dataid"));
    });
    return arrayIndex.length == 0 ? 1 : Math.max.apply(null, arrayIndex) + 1;
}
//返回对应设备号的设备名称
function getEquipName(equipObject, equipno) {
    console.log(equipObject);
    var equipName = "";
    equipObject.forEach(function(ele, index) {
        if (ele.group_no == equipno) {
            equipName = ele.group_name;
        }
    });
    return equipName;
}
//返回对应设备名称的设备号
function getEquipNO(equipObject, equipName) {
    var equipName;
    equipObject.forEach(function(ele, index) {
        if (ele.group_name == equipName) equipName = ele.group_no;
        return equipName;
    });
    return equipName;
}
//请求设备分组
var requestEGAReport;
function requestEGAlmReport() {
    var equipData = {
        "url": "/api/GWServiceWebAPI/get_EquipGroupData",
        "data": {
            getDataTable: "0"
        },
        "success": equip_success,
        "error": equip_error,
    };
    $.fn.axpost(equipData);
    function equip_success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code;
        if (code == 200) {
            requestAlmReport(arrayLike);
            requestEGAReport = arrayLike;
        }
    }
    function equip_error(e) {}
}
//设备删除
function delAlmReport(that) {
    myApp.dialog.confirm("是否删除该管理范围", "提示", function() {
        let dt = $(that).parent().siblings();
        alert(dt.attr("dataid"));
        var deleteJson = {
            getDataTable: "AlmReport",
            ifName: "id",
            ifValue: dt.attr("dataid"),
            type: "number"
        };
        publicAjax(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 3);
    });
}
//弹窗输入
function almReportAlert(dt, index) {
    myApp.dialog.prompt('', '新的设备分组名', function(equipName) {
        if (!equipName) myApp.toast.create({
            text: '设备分组名不能为空',
            position: 'center',
            closeTimeout: 2000,
        }).open();
        else updateEquip(dt, equipName, index);
    });
}
// 设备分组选项选择
function almReportList(parentTaht, that) {
    var isFlag = false;
    var equipcombParentString = $(parentTaht).attr("equipcomb"),
        equipnoString = $(that).attr("equip_no");
    if (!equipcombParentString) {
        equipcombParentString = "#" + equipnoString + "#";
    } else {
        if (!$(that).find("input").is(':checked')) {
            if (equipcombParentString.indexOf("#" + equipnoString + "#") == -1) {
                equipcombParentString += equipnoString + "#";
            }
        } else {
            equipcombParentString = equipcombParentString.replace("#" + equipnoString + "#", "#");
        }
    }
    $(parentTaht).attr("equipcomb", equipcombParentString);
    updateEquip($(parentTaht).next().find("i.icon-f7_modify"), $(parentTaht).text(), 1);
}
// ********************************************************************************
//周排表
var jsondate = [];
function requestWeekAlmReport() {
    var jsonData = {
        "url": "/api/GWServiceWebAPI/get_WeekAlmReportData",
        "data": {
            getDataTable: "0"
        },
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);
    function _success(data) {
        let arrayLike = data.HttpData.data,
            code = data.HttpData.code,
            html = "";
        jsondate.length = 0;
        $("#schedule_specificDate ul").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                var sTime = formatDate(new Date(arrayLike[i].begin_time), "hh:mm"),
                    eTime = formatDate(new Date(arrayLike[i].end_time), "hh:mm");
                jsondate = [arrayLike[i].Administrator, weekReturn(arrayLike[i].week_day), arrayLike[i].week_day, sTime.toString(), eTime.toString()];
                html += `<li class="swipeout bottomBorderLine">
                  <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildWeekAlmReport(this,1)" dataid = "${arrayLike[i].id}" dataday="${arrayLike[i].week_day}">
                    <div class="col-25">${arrayLike[i].Administrator}</div>
                    <div class="col-25">${weekReturn(arrayLike[i].week_day)}</div>   
                    <div class="col-25">${formatDate(new Date(arrayLike[i].begin_time),"hh:mm")}</div>           
                    <div class="col-25">${formatDate(new Date(arrayLike[i].end_time),"hh:mm")}</div>
                  </div>
                  <div class="swipeout-actions-right">
                    <a href="#" class="delBtn" onclick="delWeekAlmReport(this)">删除</a>
                  </div>
                </li>`;
            }
        } else {
            requestUser();
            return false;
        }
        $("#schedule_specificDate ul").append(html);
    }
    function _error(e) {
        console.log(e);
    }
}
//周排表html
function newlyBuildWeekAlmReport(tThatParent, index) {
    var html = '<div class="popup popup-aboutuser week_WeekAlmReportUl">' + '<h1>周排表修改</h1>' + '<div class="popupContent list inline-labels no-hairlines-md">' + '<ul>' + '<li class="item-content item-input" style="padding-left: 0;">'  + '<div class="item-inner">' + '<div class="item-title item-label">人员姓名</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="选择人员" value = "' + getVal($(tThatParent).find("div:eq(0)").text(), index) + '"  class="week_userName" id="week_userName">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">'  + '<div class="item-inner">' + '<div class="item-title item-label" >星期</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="选择星期" value = "' + (index == 1 ? weekReturn(parseInt($(tThatParent).attr("dataday"))) : "") + '" class="week_week" id="week_week">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">'  + '<div class="item-inner">' + '<div class="item-title item-label">开始时间</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="输入开始时间(00:00)" value = "' + getVal($(tThatParent).find("div:eq(2)").text(), index) + '" class="week_stime">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">'  + '<div class="item-inner">' + '<div class="item-title item-label">结束时间</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="输入结束时间(00:00)" value = "' + getVal($(tThatParent).find("div:eq(3)").text(), index) + '" class="week_etime">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '</ul>' + '</div>' + '<div class="popupBtb row">' + '<a class="link popup-close col-50 button" href="#">返回</a>' + '<a class="link popupOpenBtn col-50 button" href="#" onclick="updateWeekAlmReport(this,' + index + ')" dataid = ' + $(tThatParent).attr("dataid") + '>确认</a>' + '</div>' + '</div>';
    popupAlert(html);
    let arrayWeek = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日", "每天"];
    listInit("week_userName", schedule_public_username);
    listInit("week_week", arrayWeek);
}
//返回值
function getVal(value, index) {
    if (index == 1) return value;
    else return "";
}
//周排表更新
function updateWeekAlmReport(that, index) {
    var reg = /^(20|21|22|23|[0-1]\d):[0-5]\d$/,
        weekID, dt, week_day;;
    if (!reg.test($(".week_stime").val()) || !reg.test($(".week_etime").val())) {
        scheduleTimeAlert("时间格式错误").open();
        return;
    }
    if (parseInt($(".week_stime").val().replace(":", "")) > parseInt($(".week_etime").val().replace(":", ""))) {
        scheduleTimeAlert("开始时间不能大于结束时间").open();
        return;
    }
    if (index == 1) {
        weekID = $(that).attr("dataid");
        dt = $(that).parent().parent();
        week_day = weekReturn(dt.find("input.week_week").val());
    } else {
        weekID = getMaxId("schedule_specificDate");
        dt = $(".week_WeekAlmReportUl");
        week_day = weekReturn(dt.find("input.week_week").val());
    } //获取新建id主键
    let WeekAlmReportInsert = {
        getDataTable: "WeekAlmReport",
        Administrator: dt.find("input.week_userName").val(),
        week_day: week_day,
        begin_time: dt.find("input.week_stime").val(),
        end_time: dt.find("input.week_etime").val(),
        ifValue: weekID
    };
    if (index == 1) publicAjax(WeekAlmReportInsert, "/api/GWServiceWebAPI/updateEquipGroup", 4);
    else publicAjax(WeekAlmReportInsert, "/api/GWServiceWebAPI/insertEquipGroup", 4);
}
//周排表删除
function delWeekAlmReport(that) {
    myApp.dialog.confirm("是否删除该周排表", "提示", function() {
        var dt = $(that).parent().siblings();
        var deleteJson = {
            getDataTable: "WeekAlmReport",
            ifName: "id",
            ifValue: $(dt).attr("dataid"),
            type: "number"
        };
        publicAjax(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 4);
    });
}
// ********************************************************************************
//特定排表
var spe_array = [];
function requestSpeAlmReport() {
    var jsonData = {
        "url": "/api/GWServiceWebAPI/get_SpeAlmReportData",
        "data": {
            getDataTable: "0"
        },
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);
    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,
            html = "";
        $("#schedule_weeklytable ul").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                let sTime = formatDate(new Date(arrayLike[i].begin_time), "yyyy/MM/dd hh:mm:ss");
                let eTime = formatDate(new Date(arrayLike[i].end_time), "yyyy/MM/dd hh:mm:ss");
                spe_array = [arrayLike[i].Administrator, sTime.toString(), eTime.toString()];
                html += `<li class="swipeout bottomBorderLine">
                  <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildSpeAlmReport(this,1)" dataid="${arrayLike[i].id}">
                    <div class="col-30">${arrayLike[i].Administrator}</div>
                    <div class="col-35">${sTime}</div>   
                    <div class="col-35">${eTime}</div>           
                  </div>
                  <div class="swipeout-actions-right">
                    <a href="#" class="delBtn" onclick="delSpeAlmReport(this)">删除</a>
                  </div>
                </li>`;
            }
        } else {
            requestUser();
            return false;
        }
        $("#schedule_weeklytable ul").append(html);
    }
    function _error(e) {
        console.log(e);
    }
}
//特定排表更新
function updateSpeAlmReport(that, index) {
    var weekID, dt, week_day;
    if (index == 1) {
        weekID = $(that).attr("dataid");
        dt = $(that).parent().parent();
        week_day = $(that).attr("dataWeek");
    } else {
        weekID = getMaxId("schedule_weeklytable");
        dt = $(".Spe_WeekAlmReportUl");
    } //获取新建id主键
    let WeekAlmReportInsert = {
        getDataTable: "SpeAlmReport",
        Administrator: dt.find("input.Spe_userName").val(),
        begin_time: dt.find("input.Spe_stime").val(),
        end_time: dt.find("input.Spe_etime").val(),
        ifValue: weekID
    };
    if (index == 1) publicAjax(WeekAlmReportInsert, "/api/GWServiceWebAPI/updateEquipGroup", 5);
    else publicAjax(WeekAlmReportInsert, "/api/GWServiceWebAPI/insertEquipGroup", 5);
}
//特定排表删除
function delSpeAlmReport(that) {
    myApp.dialog.confirm("是否删除该特定排表", "提示", function() {
        var dt = $(that).parent().siblings();
        let deleteJson = {
            getDataTable: "SpeAlmReport",
            ifName: "id",
            ifValue: $(dt).attr("dataid"),
            type: "number"
        };
        publicAjax(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 5);
    });
}

function newlyBuildSpeAlmReport(tThatParent, index) {
    var html = '<div class="popup popup-aboutuser Spe_WeekAlmReportUl">' + '<h1>特定排表修改</h1>' + '<div class="popupContent list inline-labels no-hairlines-md">' + '<ul>' + '<li class="item-content item-input" style="padding-left: 0;">'  + '<div class="item-inner">' + '<div class="item-title item-label">人员姓名</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="选择人员" value = "' + getVal($(tThatParent).find("div:eq(0)").text(), index) + '"  class="Spe_userName" id="Spe_userName">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">'  + '<div class="item-inner">' + '<div class="item-title item-label">开始时间</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="输入开始时间" value = "' + getVal($(tThatParent).find("div:eq(1)").text(), index) + '" class="Spe_stime" id="Spe_stime">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">'  + '<div class="item-inner">' + '<div class="item-title item-label">结束时间</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="输入结束时间" value = "' + getVal($(tThatParent).find("div:eq(2)").text(), index) + '" class="Spe_etime" id="Spe_etime">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '</ul>' + '</div>' + '<div class="popupBtb row">' + '<a class="link popup-close col-50 button" href="#">返回</a>' + '<a class="link popupOpenBtn col-50 button" href="#" onclick="updateSpeAlmReport(this,' + index + ')" dataid = ' + (index == 1 ? $(tThatParent).attr("dataid") : getMaxId("schedule_weeklytable")) + '>确认</a>' + '</div>' + '</div>';
    popupAlert(html);
    if (index == 2) {
        myApp.calendar.create({
            inputEl: '#Spe_stime',
            openIn: 'customModal',
            header: false,
            footer: true,
            monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            dateFormat: 'yyyy/mm/dd 00:00:00',
            cssClass: "startTime",
            headerPlaceholder: "结束日期",
            toolbarCloseText: "确定",
            value: [new Date()],
        })
        myApp.calendar.create({
            inputEl: '#Spe_etime',
            openIn: 'customModal',
            header: false,
            footer: true,
            monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            dateFormat: 'yyyy/mm/dd 00:00:00',
            cssClass: "startTime",
            headerPlaceholder: "结束日期",
            toolbarCloseText: "确定",
            value: [new Date()],
        })
    } else {
        myApp.calendar.create({
            inputEl: '#Spe_stime',
            openIn: 'customModal',
            header: false,
            footer: true,
            monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            dateFormat: 'yyyy/mm/dd 00:00:00',
            cssClass: "startTime",
            headerPlaceholder: "结束日期",
            toolbarCloseText: "确定",
            // value: [new Date()],
        })
        myApp.calendar.create({
            inputEl: '#Spe_etime',
            openIn: 'customModal',
            header: false,
            footer: true,
            monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            dateFormat: 'yyyy/mm/dd 00:00:00',
            cssClass: "startTime",
            headerPlaceholder: "结束日期",
            toolbarCloseText: "确定",
            // value: [new Date()],
        })
    }
    listInit("Spe_userName", schedule_public_username);
}
//switchMenu
function switchMenu(dt) {
    let idObj = $(dt).attr("href")
     $(idObj).removeClass("displayNone").siblings("section").addClass("displayNone");
    switch (idObj) {
        case "#schedule_user":
            requestUser();
            break;
        case "#schedule_equip":
            requestEquipGroup();
            break;
        case "#schedule_administartor":
            requestEGAlmReport();
            break;
        case "#schedule_specificDate":
            requestWeekAlmReport();
            break;
        case "#schedule_weeklytable":
            requestSpeAlmReport();
            break;
    }
}
//字符串处理
function weekReturn(week) {
    var weekString;
    switch (week) {
        case 0:
            weekString = "每天";
            break;
        case 2:
            weekString = "星期一";
            break;
        case 3:
            weekString = "星期二";
            break;
        case 4:
            weekString = "星期三";
            break;
        case 5:
            weekString = "星期四";
            break;
        case 6:
            weekString = "星期五";
            break;
        case 7:
            weekString = "星期六";
            break;
        case 1:
            weekString = "星期日";
            break;
        case "每天":
            weekString = 0;
            break;
        case "星期一":
            weekString = 2;
            break;
        case "星期二":
            weekString = 3;
            break;
        case "星期三":
            weekString = 4;
            break;
        case "星期四":
            weekString = 5;
            break;
        case "星期五":
            weekString = 6;
            break;
        case "星期六":
            weekString = 7;
            break;
        case "星期日":
            weekString = 1;
            break;
        default:
            break;
    }
    return weekString;
}
//日期转化
function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};
//删除当前控制项
function scheduleDelControl() {
    myApp.dialog.confirm("是否删除该项", "提示", function() {});
}