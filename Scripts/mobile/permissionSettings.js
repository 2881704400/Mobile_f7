//页面访问权限
function isAddinModule_List(hr) {
    var shows = false;
    getWebUser.find("HomePage_List").find("string").each(function() {
        for (var i = 0; i < GWAddinModule.length; i++) {
            if (GWAddinModule[i][0] == $(this).text().trim().substring(2) && hr == GWAddinModule[i][2].split('.')[2]) {
               shows = true;
            }
        }
    });
    shows?$("#" + hr).show():$("#" + hr).hide();

}
//定制页面访问权限
function isEquipPages_List(hr) {
    var shows = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function() {
            $(this).find("Browse_Pages_List").find("int").each(function() {
                for (var i = 0; i < GWEquipPages.length; i++) {
                    if (GWEquipPages[i][0] == $(this).text()) {
                        if (hr == GWEquipPages[i][2].split('.')[2]) {
                            shows = true;
                        }
                    }
                }
            });
        });
    } else {
        shows = true;
    }
    return shows;
}
//权限设置
function authPage(dt){
        $.ajax({
        type: "post",
        url: service + "/QueryTableData",
        async: false,
        data: "tableName=GWAddinModule",
        success: function(dtGWAddinModule) {
            GWAddinModule = new Array();
            var datas = $(dtGWAddinModule).children("string").text();
            var usera = JSON.parse(datas);
            for (var i = 0, j = 0; i < usera.length; i++) {
                var userb = usera[i];
                if (userb.WebPage == "1" && userb.ClassName.split('.').length > 2) {
                    var userc = new Array(userb.ID, userb.Name, userb.ClassName, userb.HelpPath, userb.MultiScreens, userb.WebPage);
                    GWAddinModule[j++] = userc;
                }
            }
            IsAdministrator = $(dt).children("UserItem").find("IsAdministrator").text();
            isAddinModule_List("MessageTool");
            isAddinModule_List("RealTimeTool");
            isAddinModule_List("VoiceTool");
            isAddinModule_List("VideoTool");
        }
    });
}
//判断当前设备是否可查看
function Browse_Equip_List(equips) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function() {
            $(this).find("Browse_Equip_List").find("int").each(function() {
                if (equips == $(this).text()) {
                    equipBool = true;
                }
            });
        });
    } else {
        equipBool = true;
    }
    return equipBool;
}
//判断当前设备是否可查看(子集)
function Browse_SpecialEquip_List(equips, num) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function() {
            $(this).find("Browse_SpecialEquip_List").find("string").each(function() {
                if (equips == $(this).text().split('.')[0]) {
                    if (num != false) {
                        if ($(this).text().split('.')[1] == num) {
                            equipBool = true;
                        }
                    } else {
                        equipBool = true;
                    }
                }
            });
        });
    } else {
        equipBool = true;
    }
    return equipBool;
}
//查询用户可查看设备
function Browse_Equip_List_Get() {
    var equipList = '';
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function() {
            $(this).find("Browse_Equip_List").find("int").each(function() {
                equipList += $(this).text() + ',';
            });
        });
        equipList = equipList.substring(0, equipList.length - 1);
    } else {
        equipList = '';
    }
    return equipList;
}
//判断当前设备是否可控制
function Control_Equip_List(equips) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function() {
            $(this).find("Control_Equip_List").find("int").each(function() {
                if (equips == $(this).text()) {
                    equipBool = true;
                }
            });
        });
    } else {
        equipBool = true;
    }
    return equipBool;
}
//判断当前设备是否可控制（子集）
function Control_SetItem_List(equips, num) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function() {
            $(this).find("Control_SetItem_List").find("string").each(function() {
                if (equips == $(this).text().split('.')[0]) {
                    if (num != false) {
                        if ($(this).text().split('.')[1] == num) {
                            equipBool = true;
                        }
                    } else {
                        equipBool = true;
                    }
                }
            });
        });
    } else {
        equipBool = true;
    }
    return equipBool;
}
function pageLists() {
    $(".page_list").find("a").each(function() {
        if ($(this).attr("href") != "#") {
            var listName;
            try {
                listName = $(this).attr("href").split('/')[1].split('.')[0];
            } catch (ex) {
                listName = $(this).attr("pageName").split('.')[0];
            }
            var isep = isEquipPages_List(listName);
            if (!isep) {
                $(this).addClass("disabled");
            }
        }
    });
}