var indexAll = 0,msgArray=[]; //1更新\2插入
function scheduleModify() {
    var chatObject = myApp.views.main.history,
    urlLength = chatObject.length - 1,
    receiveUser = chatObject[urlLength].split("?")[1];
    msgArray.length = 0;
    msgArray = receiveUser.split("&");
    if(isArray("index",msgArray) == 1)
        indexAll = 1;
    else
        indexAll = 2;
     $(".scheduleModify").html(isArray("title",msgArray));
     switch(isArray("table",msgArray))
     {
        case "schedule_user": 
             $(".scheduleModifyContainer_user").removeClass("displayNone").siblings().addClass("displayNone");
             if(indexAll == 1)
             {
                $(".schedule1_username").attr("disabled",true).val(isArray("schedule1_username",msgArray));
                $(".schedule1_hpone").val(isArray("schedule1_hpone",msgArray));
                $(".schedule1_msm").val(isArray("schedule1_msm",msgArray));
                $(".schedule1_email").val(isArray("schedule1_email",msgArray));
                $(".schedule1_level").val(isArray("schedule1_level",msgArray));
            }
        break;
        case "schedule_equip":
            $(".scheduleModifyContainer_equipgroup").removeClass("displayNone").siblings().addClass("displayNone");
            newlyBuildEquip(isArray("equipcomb",msgArray));
         break;
        case "schedule_administartor": 
            $(".scheduleModifyContainer_administartor").removeClass("displayNone").siblings().addClass("displayNone");
             aminitsrator_view();
        break;
        case "schedule_specificDate": 
            $(".scheduleModifyContainer_specificDate").removeClass("displayNone").siblings().addClass("displayNone");
            newlyBuildWeekAlmReport_view();
        break;
        case "schedule_weeklytable":
            $(".scheduleModifyContainer_weeklytable").removeClass("displayNone").siblings().addClass("displayNone");
            newlyBuildSpeAlmReport_view();
         break;
        default: 

        break;
     }
}
function isArray(str,arrayStr){
   for(var i= 0;i<arrayStr.length;i++)
   {
      if(str == arrayStr[i].split("=")[0])
      {
        return arrayStr[i].split("=")[1];
      }
   }
}
// ********************************************************************************
//人员数据库表更新
function updateUserModify(that) {
    var dt = $(that).siblings("ul");
    let AdministratorUpdate = {
        getDataTable: "Administrator",
        Administrator: dt.find("input.schedule1_username").val(),
        Telphone: dt.find("input.schedule1_hpone").val(),
        MobileTel: dt.find("input.schedule1_msm").val(),
        EMail: dt.find("input.schedule1_email").val(),
        AckLevel: parseInt(dt.find("input.schedule1_level").val()),
        ifName: "Administrator",
        ifValue: dt.find("input.schedule1_username").val()
    };
    if (indexAll == 1) publicAjaxModify(AdministratorUpdate, "/api/GWServiceWebAPI/updateEquipGroup", 1);
    else publicAjaxModify(AdministratorUpdate, "/api/GWServiceWebAPI/insertEquipGroup", 1);
}

//人员表公共请求
function publicAjaxModify(jsonString, url, index) {
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
var currentArray = [];
function newlyBuildEquip(str) {
    currentArray.length = 0;
    console.log(str);
    var jsonData = {
        "url": "/api/GWServiceWebAPI/get_EquipData",
        "data": {
            getDataTable: ""
        },
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);
    var coutResult;str ? coutResult = str : coutResult = "#";
    function _success(data) {
        let arrayLike = data.HttpData.data,
            code = data.HttpData.code;
        var item = "",
            html =  '<div class="allSelect"><label class="item-checkbox item-content" onclick="allSelectEquip()">' + '<input type="checkbox" name="checkbox" >' + '<i class="icon icon-checkbox"></i>' + '<div class="item-inner">' + '<div class="item-title">全选</div>' + '</div>' + '</label></div>' + '<ul class="equipTypeSelect">';
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
            $(".scheduleModifyContainer_equipgroup>div").append(html + '</ul>');
            // 判断是否全选
            console.log(currentArray.length +"=="+ $(".equipTypeSelect li").length);
            console.log(currentArray);
            if (currentArray.length == $(".equipTypeSelect li").length) $(".allSelect input").prop("checked", true);
            else $(".allSelect input").prop("checked", false);
        } else {
            newlyBuildEquip(that);
            return false;
        }
    }

    function _error(e) {
        // console.log(e);
    }
}
function actionString(dt) {
    !$(dt).find("input").is(':checked') ? currentArray.push($(dt).attr("equip_no")) : currentArray.splice(currentArray.indexOf($(dt).attr("equip_no")), 1);
    if (currentArray.length == $(".equipTypeSelect li").length) $(".allSelect input").prop("checked", true);
    else $(".allSelect input").prop("checked", false);
}
//设备更新添加
function updateEquip(that) {

    var dt = $(that).siblings("div");
    if (indexAll == 1) {
        let updateJson = {
            getDataTable: "EquipGroup",
            equipcomb: currentArray.length > 0 ? "#" + currentArray.join("#") : "#",
            group_name: isArray("currentTxt",msgArray),
            ifValue: isArray("group_no",msgArray)
        };
        publicAjaxModify(updateJson, "/api/GWServiceWebAPI/updateEquipGroup", 2);
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
        publicAjaxModify(insertJson, "/api/GWServiceWebAPI/insertEquipGroup", 2);
    }
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
function aminitsrator_view() {

    $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/get_AdministratorData", {getDataTable: "0"}),AlarmCenterContext.post("/api/GWServiceWebAPI/get_EquipGroupData", {getDataTable: "0"})).done(function(n,l){
         var n_result = n.HttpData,l_result = l.HttpData;
         if(n_result.code == 200 && l_result.code == 200)
         {
            $(".scheduleModifyContainer_administartor_user,.scheduleModifyContainer_administartor_group").html("");
            var n_html="",l_html="";
            n_result.data.forEach(function(item,index){
                if(indexAll == 1)
                {
                   if(isArray("username",msgArray) == item.Administrator)
                      n_html += `<option value="male" selected>${item.Administrator}</option>`;
                    else
                       n_html += `<option value="male">${item.Administrator}</option>`;  
                }
                else
                {
                    if(index == 0)
                      n_html += `<option value="male" selected>${item.Administrator}</option>`;
                    else
                       n_html += `<option value="male">${item.Administrator}</option>`;                    
                }

            });
            l_result.data.forEach(function(item,index){
                if(indexAll == 1)
                {
                    if(isArray("groupname",msgArray) == item.group_name)
                      l_html += `<option value="${item.group_name}" selected group_no="${item.group_no}">${item.group_name}</option>`;
                    else
                       l_html += `<option value="${item.group_name}" group_no="${item.group_no}">${item.group_name}</option>`;   
                }
                else
                {
                    if(index == 0)
                      l_html += `<option value="${item.group_name}" selected group_no="${item.group_no}">${item.group_name}</option>`;
                    else
                       l_html += `<option value="${item.group_name}" group_no="${item.group_no}">${item.group_name}</option>`;                    
                }

            });
            $(".scheduleModifyContainer_administartor_user").html(n_html);
            $(".scheduleModifyContainer_administartor_group").html(l_html);

         }
         else
         {
            scheduleAlert.open();
         }
    }).fail(function(e){

    });
}
//设备更新添加
function updateAlmReport(that) {
    var weekID = getMaxId("schedule_administartor"); //获取新建id主键
    var dt = $(that).parent().prev();
    if (indexAll == 1) {
        let updateJson = {
            getDataTable: "AlmReport",
            group_no: $(".scheduleModifyContainer_administartor_group ").find("option:selected").attr("group_no"),
            Administrator: $(".scheduleModifyContainer_administartor_user").find("option:selected").text(),
            ifValue: isArray("dataid",msgArray),
        };
        publicAjaxModify(updateJson, "/api/GWServiceWebAPI/updateEquipGroup", 3);
    } else {
        let insertJson = {
            getDataTable: "AlmReport",
            group_no: $(".scheduleModifyContainer_administartor_group").find("option:selected").attr("group_no"),
            Administrator: $(".scheduleModifyContainer_administartor_user").find("option:selected").text(),
            ifValue: weekID
        };
        publicAjaxModify(insertJson, "/api/GWServiceWebAPI/insertEquipGroup", 3);
    }
}
//最大ID添加1
function getMaxId(id) {
    var parentDt = $("#" + id).find("ul"),
        arrayIndex = [];
    parentDt.find("li").each(function(index) {
        arrayIndex.push($(this).attr("dataid"));
    });
    return arrayIndex.length == 0 ? 1 : Math.max.apply(null, arrayIndex) + 1;
}

//周排表html
function newlyBuildWeekAlmReport_view() {
    $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/get_AdministratorData", {getDataTable: "0"})).done(function(n){
         var n_result = n.HttpData;
         if(n_result.code == 200 )
         {
            $(".scheduleModifyContainer_specificDate_username").html("");
            var n_html="";
            n_result.data.forEach(function(item,index){
                if(indexAll == 1)
                {
                   if(isArray("username",msgArray) == item.Administrator)
                      n_html += `<option value="${item.Administrator}" selected>${item.Administrator}</option>`;
                    else
                       n_html += `<option value="${item.Administrator}">${item.Administrator}</option>`;  
                }
                else
                {
                    if(index == 0)
                      n_html += `<option value="${item.Administrator}" selected>${item.Administrator}</option>`;
                    else
                       n_html += `<option value="${item.Administrator}">${item.Administrator}</option>`;                    
                }

            });
            $(".scheduleModifyContainer_specificDate_wk").find("option:contains('"+isArray("week",msgArray)+"')").attr("selected",true);
            $(".scheduleModifyContainer_specificDate_username").html(n_html);
            $(".scheduleModifyContainer_specificDate_stime").val(isArray("stime",msgArray)?isArray("stime",msgArray):"00:00");
            $(".scheduleModifyContainer_specificDate_etime").val(isArray("etime",msgArray)?isArray("etime",msgArray):"00:00");
         }
         else
         {
            scheduleAlert.open();
         }
    }).fail(function(e){

    });
}
//周排表更新
function updateWeekAlmReport(that) {
    var reg = /^(20|21|22|23|[0-1]\d):[0-5]\d$/,
        weekID, dt, week_day;
    if (!reg.test($(".scheduleModifyContainer_specificDate_stime").val()) || !reg.test($(".scheduleModifyContainer_specificDate_stime").val())) {
        scheduleTimeAlert("时间格式错误").open();
        return;
    }
    if (parseInt($(".scheduleModifyContainer_specificDate_stime").val().replace(":","")) > parseInt($(".scheduleModifyContainer_specificDate_stime").val().replace(":", ""))) {
        scheduleTimeAlert("开始时间不能大于结束时间").open();
        return;
    }
    if (indexAll == 1) {
        weekID = isArray("dataid",msgArray);
        // dt = $(that).parent().parent();
        week_day =$(".scheduleModifyContainer_specificDate_wk").find("option:selected").val();
    } else {
        weekID = getMaxId("schedule_specificDate");
        // dt = $(".week_WeekAlmReportUl");
        week_day =$(".scheduleModifyContainer_specificDate_wk").find("option:selected").val();
    } //获取新建id主键
    let WeekAlmReportInsert = {
        getDataTable: "WeekAlmReport",
        Administrator: $(".scheduleModifyContainer_specificDate_username").find("option:selected").text(),
        week_day: week_day,
        begin_time: $(".scheduleModifyContainer_specificDate_stime").val(),
        end_time: $(".scheduleModifyContainer_specificDate_etime").val(),
        ifValue: weekID
    };
    if (indexAll == 1) publicAjaxModify(WeekAlmReportInsert, "/api/GWServiceWebAPI/updateEquipGroup", 4);
    else publicAjaxModify(WeekAlmReportInsert, "/api/GWServiceWebAPI/insertEquipGroup", 4);
}
//特定排表更新
function updateSpeAlmReport(that) {
    var weekID, dt, week_day;
    if (indexAll == 1) {
        weekID = isArray("dataid",msgArray);
    } else {
        weekID = getMaxId("schedule_weeklytable");
    } //获取新建id主键
    let WeekAlmReportInsert = {
        getDataTable: "SpeAlmReport",
        Administrator: $(".scheduleModifyContainer_weeklytable_username").val(),
        begin_time: $(".scheduleModifyContainer_weeklytable_stime").val(),
        end_time: $(".scheduleModifyContainer_weeklytable_etime").val(),
        ifValue: weekID
    };
    if (indexAll == 1) publicAjaxModify(WeekAlmReportInsert, "/api/GWServiceWebAPI/updateEquipGroup", 5);
    else publicAjaxModify(WeekAlmReportInsert, "/api/GWServiceWebAPI/insertEquipGroup", 5);
}
function newlyBuildSpeAlmReport_view() {
    
    $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/get_AdministratorData", {getDataTable: "0"})).done(function(n){
         var n_result = n.HttpData;
         if(n_result.code == 200 )
         {
            $(".scheduleModifyContainer_weeklytable_username").html("");
            var n_html="";
            n_result.data.forEach(function(item,index){
                if(indexAll == 1)
                {
                   if(isArray("username",msgArray) == item.Administrator)
                      n_html += `<option value="${item.Administrator}" selected>${item.Administrator}</option>`;
                    else
                       n_html += `<option value="${item.Administrator}">${item.Administrator}</option>`;  
                }
                else
                {
                    if(index == 0)
                      n_html += `<option value="${item.Administrator}" selected>${item.Administrator}</option>`;
                    else
                       n_html += `<option value="${item.Administrator}">${item.Administrator}</option>`;                    
                }

            });
            $(".scheduleModifyContainer_weeklytable_username").html(n_html);
            $(".scheduleModifyContainer_weeklytable_stime").val(isArray("stime",msgArray));
            $(".scheduleModifyContainer_weeklytable_etime").val(isArray("etime",msgArray));


         }
         else
         {
            scheduleAlert.open();
         }
    }).fail(function(e){

    });
    if (indexAll == 2) {
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
    // listInit("Spe_userName", schedule_public_username);
}
