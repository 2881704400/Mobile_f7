//移动端js主入口
var myApp = new Framework7({
    root: '#app',
    name: 'My App',
    id: 'com.myapp.gw',
    panel: {
        swipe: 'left',
        swipeOnlyClose: true,
    },
    dialog: {
        buttonOk: '确认',
        buttonCancel: '取消',
    },
    statusbar: {
        enabled: true,
        overlay: true,
        iosOverlaysWebView: true,
    },
    picker: {
        toolbarCloseText: '确认',
    },
    routes: [{
        path: '/home/',
        url: 'home.html',
    }, {
        path: '/snapshot/',
        url: 'snapshot.html',
    }, {
        path: '/equips/',
        url: 'equips.html',
    }, {
        path: '/systemConfig/',
        url: 'systemConfig.html',
    }, {
        path: '/eventQuery/',
        url: 'eventQuery.html',
    }, {
        path: '/eventSearch/',
        url: 'eventSearch.html',
    }, {
        path: '/schedule/',
        url: 'schedule.html',
    }, {
        path: '/equipLinkage/',
        url: 'equipLinkage.html',
    }, {
        path: '/UserInfor/',
        url: 'UserInfor.html',
    }, {
        path: '/setPage/',
        url: 'setPage.html',
    }, {
        path: '/snapShotDetail/',
        url: 'snapShotDetail.html',
    }, {
        path: '/RealTimeList/',
        content: '123',
    }, {
        path: '/resultEvent/',
        content: '123',
    }, {
        path: '/ycAndyx/',
        url: 'ycAndyx.html',
    }, {
        path: '/ycAndyx/',
        url: 'ycAndyx.html',
    }, {
        path: '/Video/',
        url: 'Video.html',
    }, {
        path: '/videoControl/',
        url: 'videoControl.html',
    }, {
        path: '/welcomeWords/',
        url: 'welcomeWords.html',
    }, {
        path: '/mettingPPT/',
        url: 'mettingPPT.html',
    }, {
        path: '/mettingDetails/',
        url: 'mettingDetails.html',
    }],
    on: {
        pageInit: function(page) {
            $("#voiceContainer").addClass("voiceContainer");
        },
        popupOpen: function(popup) {},
        init: function() {}
    },
});
var mainView = myApp.views.create('.view-main'); //web接口地址
var service = "/GWService.asmx",
    $$ = Framework7.$;
initLoads();

function initLoads() {
	myApp.dialog.progress();

    loadNameMobile();
    setTimeout(function() {
        $("#app").css("visibility", "visible");
    }, 1500);
    //语音记录选择
    if (!window.localStorage.voiceList) {
        window.localStorage.voiceList = "1";
    }
    try {
        //myJavaFun.GetAppVersion(); //获取App版本信息
        //myJavaFun.GetSystemInfor(); //获取系统信息
    } catch (ex) {}
}
var IsAdministrator, getWebUser, GWAddinModule, GWEquipPages;
//连接服务器
function InitEnsure() {
    var ajaxs = $.ajax({
        type: "post",
        timeout: 10000,
        url: service + "/ConnectService",
        data: "user_name=" + window.localStorage.userName,
        success: function(dt) {
            var analyze = $(dt).children("string").text();
            if (analyze != "" || analyze != "false") {
                $("#app").css("visibility", "visible");
                /*$.ajax({
                    type: "post",
                    url: service + "/UserPermissions",
                    data: "userName=" + window.localStorage.userName,
                    success: function(usersDt) {
                        getWebUser = $(usersDt).children("UserItem");
                        // authPage(dt);//权限设置
                    }
                });*/
            }
        },
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
        	myApp.dialog.close();
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
        }
    });
}
//重连服务器
function initEnsureChonglian(fun) {
    var _url = service + "/GetName2SFService";
    var _data = "userName=" + window.localStorage.userName;

    function _success(data) {
        var analyze = $(data).children("string").text();
        if (analyze != "" || analyze != "false") {
            if (fun != null) {
                fun();
            }
        }
    }
    JQajaxo("post", _url, true, _data, _success);
}
//解析
function getValueByKey(str, key) {
    var urlSearchSplit = str.split('&');
    for (var i = 0; i < urlSearchSplit.length; i++) {
        var stringSplitValue = urlSearchSplit[i].split('=');
        if (stringSplitValue[0].toLowerCase() === key.toLowerCase()) {
            return stringSplitValue[1]
        }
    }
    return '';
}
//载入界面
function loadNameMobile() {
    if (location.search) {
        try {
            var urlSearch = location.search.split('?')[1],
                terminal = getValueByKey(urlSearch, "terminal"),
                ac_appkey = getValueByKey(urlSearch, "appkey"),
                ac_infokey = getValueByKey(urlSearch, "infokey"),
                service_url = getValueByKey(urlSearch, "service_url"),
                jsonString = {
                    "terminalString": terminal,
                    "ac_appkeyString": ac_appkey,
                    "ac_infokeyString": ac_infokey,
                    "service_urlString": service_url
                };
            window.localStorage.ac_appkey = ac_appkey, window.localStorage.terminal = terminal, window.localStorage.ac_infokey = ac_infokey, window.localStorage.service_url = service_url;
            myJavaFuntion.SetCookie(JSON.stringify(jsonString));
        } catch (ex) {
            window.localStorage.terminal = '', window.localStorage.ac_appkey = '', window.localStorage.ac_infokey = '', window.localStorage.service_url = '';
        }
    } else {
        myJavaFuntion.GetCookie();
    }
    setTimeout(function() {
        $.ajax({
            type: "POST",
            url: "/api/GWServiceWebAPI/getClientTypeInfo",
            timeout: 5000,
            dataType: "json",
            headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey //签名由getkey接口获取
            },
            success: function(dt) {
                var codeString = dt.HttpData;
                if (codeString.code == 200) {
                    window.localStorage.userName = codeString.data.userName;
                } else {
                    window.localStorage.userName = '';
                }
            },
            error: function(e) {
                window.localStorage.userName = '';
                myJavaFuntion.OpenLocalUrl("login");
                console.log(e);
            },
            complete: function(XMLHttpRequest, status) {
                if (window.localStorage.userName != "" && window.localStorage.userName != null) {
                    $("#userName").html("我(" + window.localStorage.userName + ")");
                    InitEnsure();
                    AppShows();
                    onHomePage();
                    $(".voiceDivs,.toolbar").removeClass("displayNone");
                } else {
                    myJavaFuntion.OpenLocalUrl("login");
                }
            }
        });
    }, 100);
}
//app显示
function AppShows() {
    $("#appCacheClearLi").show();
    $("#appRichScan").show();
}
//清空缓存
function onAppCacheClear() {
    myApp.dialog.create({
        title: "清空",
        text: '是否清空缓存，重新加载？',
        buttons: [{
            text: '取消'
        }, {
            text: '确定',
            onClick: function() {
                myJavaFun.AppCacheClear();
            }
        }]
    }).open();
}

function AppCacheClearCallback(dt) {
    if (dt == "true") {
        location.reload();
    } else {
        myApp.dialog.create({
            title: "",
            text: '清空失败！',
            buttons: [{
                text: '确定'
            }]
        }).open();
    }
}
//注销事件
function onUserLogout() {
    myApp.dialog.create({
        cssClass: "exit",
        title: "注销",
        text: '确定要注销当前账户吗？',
        buttons: [{
            text: '取消'
        }, {
            text: '确定',
            onClick: function() {
                window.localStorage.userName = "";
                window.localStorage.userPWD = "";
                myJavaFuntion.OpenLocalUrl("login");
            }
        }]
    }).open();
}
//关于事件
function onAbout() {
    var _url = "/api/server/version";

    function _success(data) {
        var version = data.HttpData.data;
        var versionNameHTML = '';
        if (window.localStorage.versionName != "" && window.localStorage.versionName != null) {
            versionNameHTML = '<br/>App版本：v' + window.localStorage.versionName;
        }
        myApp.dialog.create({
            title: "关于",
            text: 'API版本：v' + version + versionNameHTML,
            buttons: [{
                text: '确定'
            }]
        }).open();
    }
    JQajaxo("get", _url, true, "", _success);
}

function backss() {
    var mainView = myApp.addView('.view-main');
    var pages = new Array();
    $(".page").each(function(i) {
        pages[i] = $(this).attr("data-page");
    });
    if (pages.length == 2) {
        mainView.router.back()
    }
}
//执行子界面方法
function initPageJS(dt, ext) { //ext扩展界面地址
    if ($("#" + dt + "_id").length == 0) {
        var pagejs = document.createElement("script");
        pagejs.id = dt + "_id";
        if (ext == "") {
            pagejs.setAttribute("src", "/Scripts/mobile/" + dt + ".js?v" + Math.random());
        } else {
            pagejs.setAttribute("src", ext + dt + ".js?v" + Math.random());
        }
        document.body.appendChild(pagejs);
        pagejs.onload = function() {
            evil(dt + "()");
        }
    } else {
        evil(dt + "()");
    }
}

function evil(fn) {
    var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}
var alertMsgSuccess = myApp.notification.create({
        title: '系统提示',
        titleRightText: '',
        subtitle: '<br />',
        text: '操作成功',
        closeTimeout: 2000,
    }),
    alertMsgError = myApp.notification.create({
        title: '系统提示',
        titleRightText: '',
        subtitle: '<br />',
        text: '操作失败或没有该命令配置',
        closeTimeout: 1000,
    });
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
//退出登陆
function exitLogin() {
    try {
        myJavaFun.OpenLocalUrl("login");
    } catch (e) {
        if (window.localStorage.terminal != "Mobile.App") window.location.href = "/Views/login.html";
        else myApp.dialog.alert("退出登陆异常");
    }
}
//切换底部工具栏
function switchToolbar(id) {
    $("#" + id).addClass("active").siblings().removeClass("active");
}
//语音信息提示
function voiceTooip(txt) {
    return myApp.toast.create({
        text: txt,
        position: 'center',
        closeTimeout: 3000,
    });
}
//下拉列表初始化
function listInit(id, value) {
    myApp.picker.create({
        inputEl: '#' + id,
        cols: [{
            textAlign: 'center',
            values: value
        }]
    });
}
//动态创建弹窗
var popup;

function popupAlert(html) {
    popup = myApp.popup.create({
        content: html,
        on: {
            opened: function(e) {}
        }
    }).open();
}
//封装ajax
function JQajaxo(_type, _url, _asycn, _data, _success) {
    var ajaxs = $.ajax({
        type: _type,
        url: _url,
        timeout: 5000,
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
//发送命令
// function get_no(dt, set_equip, set_no, values) {
//     var set_equipOld, set_noOld, valuesOld, main_instrOld, mino_instrOld;
//     if (set_equip == "") {
//         set_equipOld = $(dt).attr("set_equip");
//         set_noOld = $(dt).attr("set_no");
//     } else {
//         set_equipOld = set_equip;
//         set_noOld = set_no;
//     }
//     var ajaxVar = $.ajax({
//         type: "POST",
//         url: "/GWService.asmx/GetDataTableFromSQL",
//         timeout: 5000,
//         data: {
//             sql: "select * from setParm where equip_no =" + set_equipOld + " and set_no=" + set_noOld,
//             userName: window.localStorage.userName,
//         },
//         success: function(data) {
//             var dt = $(data).find('DataTable'); //返回XML格式的DataTable
//             if (dt.find("equip_no").html() != "") {
//                 if (values == "") onSetCommand(dt, set_equipOld, dt.find("main_instruction").html(), dt.find("minor_instruction").html(), dt.find("value").html());
//                 else onSetCommand(dt, set_equipOld, dt.find("main_instruction").html(), dt.find("minor_instruction").html(), values);
//             } else {
//                 alertMsgError.open();
//             }
//         }
//     });
// }
function get_no_set(dt,values) {
    var set_equipOld="", set_noOld="";
    try{
        set_equipOld = $(dt).attr("set_equip");
        set_noOld = $(dt).attr("set_no");
    }
    catch(e){
        // myApp.dialog.alert("请先绑定功能设备号");
    }
    if(set_equipOld.trim() || set_equipOld.trim() =="") return false;
    var ajaxVar = $.ajax({
        type: "POST",
        url: "/GWService.asmx/GetDataTableFromSQL",
        timeout: 5000,
        data: {
            sql: "select * from setParm where equip_no =" + set_equipOld + " and set_no=" + set_noOld,
            userName: window.localStorage.userName,
        },
        success: function(data) {
            var dt = $(data).find('DataTable'); //返回XML格式的DataTable
            if (dt.find("equip_no").html() != "") {
                if (values == "") onSetCommand(dt, set_equipOld, dt.find("main_instruction").html(), dt.find("minor_instruction").html(), dt.find("value").html());
                else onSetCommand(dt, set_equipOld, dt.find("main_instruction").html(), dt.find("minor_instruction").html(), values);
            } else {
                alertMsgError.open();
            }
        }
    });
}
function onSetCommand(dt, equip_no, main_instr, mino_instr, valueset) {
    var ajaxVar = $.ajax({
        type: "POST",
        url: "/GWService.asmx/SetupsCommand",
        timeout: 5000,
        data: {
            equip_no: equip_no,
            main_instruction: main_instr || "-",
            minor_instruction: mino_instr || "-",
            value: valueset,
            user_name: window.localStorage.userName
        },
        success: function(data) {
            alertMsgSuccess.open();
        }
    });
}
//切换背景
if (window.localStorage.localBgColor == 1) {
    $(".whiteColor").each(function(index) {
        hrefUrl = $(this).attr("href").replace("white", "back");
        $(this).attr("href", hrefUrl);
    });
} else {
    $(".whiteColor").each(function(index) {
        hrefUrl = $(this).attr("href").replace("back", "white");
        $(this).attr("href", hrefUrl);
    });
}

