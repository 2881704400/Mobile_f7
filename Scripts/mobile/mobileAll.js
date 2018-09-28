//移动端js主入口
var myApp = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
        swipe: 'left',
        swipeOnlyClose: true,
    },
    statusbar: {
            enabled: true,
    overlay: true,
        iosOverlaysWebView: true,
    },
    // Add default routes
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
    }, 
    {
        path: '/schedule/',
        url: 'schedule.html',
    }, 
    {
        path: '/equipLinkage/',
        url: 'equipLinkage.html',
    }, 
    {
        path: '/UserInfor/',
        url: 'UserInfor.html',
    }, 
    {
        path: '/setPage/',
        url: 'setPage.html',
    },
    {
        path: '/snapShotDetail/',
        url: 'snapShotDetail.html',
    },
    {
        path: '/RealTimeList/',
        content: '123',
    }, {
        path: '/resultEvent/',
        content: '123',
    }, {
        path: '/ycAndyx/',
        url: 'ycAndyx.html',
    }
    ],
    on: {
        // each object key means same name event handler
        pageInit: function(page) {
            // do something on page init
            // console.log(page)
            $("#voiceContainer").addClass("voiceContainer");
        },
        popupOpen: function(popup) {
            // do something on popup open
        },
        init: function() {}
    },
});
var mainView = myApp.views.create('.view-main');
//web接口地址
var service = "/GWService.asmx";
var $$ = Framework7.$;
initLoads();

function initLoads() {
    loadNameMobile();
    
    setTimeout(function() {
        //$("html").height(window.screen.height);
        $("#app").css("visibility","visible");
    }, 3000);

    //语音记录选择
    if (!window.localStorage.voiceList) {
        window.localStorage.voiceList = "1";
    }   
    try {
        //myJavaFun.GetAppVersion(); //获取App版本信息
        //myJavaFun.GetSystemInfor(); //获取系统信息
    } catch (ex) {

    }
}
$$(document).on('ajaxError', function() {
    myApp.dialog.create({
        title: "",
        text: '请求出错，请查看网络是否已连接！',
        buttons: [{
            text: '确定'
        }]
    }).open();
});

function onPages() {
    if (!$(".navbar").hasClass("navbar-hidden")) {
        $(".navbar").addClass("navbar-hidden");
        $(".toolbar").addClass("toolbar-hidden");
    } else {
        $(".navbar").removeClass("navbar-hidden");
        $(".toolbar").removeClass("toolbar-hidden");
    }
}

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
                console.log("超时");
                // myApp.hideIndicator();
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
            // myApp.hideIndicator();
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

function ajaxService(_type, _url, _asycn, _data, _success, _error) {
    var ajaxs = $.ajax({
        type: _type,
        url: _url,
        timeout: 5000,
        async: _asycn,
        data: _data,
        success: _success,
        error: _error,
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                ajaxs.abort();
                console.log("超时");
                // myApp.hideIndicator();
                myApp.dialog.create({
                    title: "系统提示",
                    text: '请求超时，请查看网络是否已连接！',
                    buttons: [{
                        text: '确定'
                    }]
                }).open();
            }
            XMLHttpRequest = null;
        }
    });
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
                $("#app").css("visibility","visible");
                console.log("连接成功！");
                $.ajax({
                    type: "post",
                    url: service + "/UserPermissions",
                    data: "userName=" + window.localStorage.userName,
                    success: function(usersDt) {
                        getWebUser = $(usersDt).children("UserItem");

                        authPage(dt);
                    }
                });
            }
        },
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                ajaxs.abort();
                console.log("超时");
                // myApp.hideIndicator();
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
            console.log("重连成功！");
            if (fun != null) {
                fun();
            }
        }
    }
    JQajaxo("post", _url, true, _data, _success);
}
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
            var urlSearch = location.search.split('?')[1];
            var terminal = getValueByKey(urlSearch, "terminal");
            var ac_appkey = getValueByKey(urlSearch, "appkey");
            var ac_infokey = getValueByKey(urlSearch, "infokey");
            var service_url = getValueByKey(urlSearch, "service_url");
            var jsonString = {
                "terminalString": terminal,
                "ac_appkeyString": ac_appkey,
                "ac_infokeyString": ac_infokey,
                "service_urlString": service_url
            };
            window.localStorage.ac_appkey = ac_appkey;
            window.localStorage.terminal = terminal;
            window.localStorage.ac_infokey = ac_infokey;
            window.localStorage.service_url = service_url;
            myJavaFuntion.SetCookie(JSON.stringify(jsonString));
        } catch (ex) {
            window.localStorage.terminal = '';
            window.localStorage.ac_appkey = '';
            window.localStorage.ac_infokey = '';
            window.localStorage.service_url = '';
        }
    } else {
        myJavaFuntion.GetCookie();
    }
    setTimeout(function() {
        var jsonData = {
            "url": "/api/GWServiceWebAPI/getClientTypeInfo",
            "success": _success,
            "error": _error,
            "complete": _complete
        };
        jQuery.axpost(jsonData);
        function _success(dt) {
            var codeString = dt.HttpData;
            if (codeString.code == 200) {
                window.localStorage.userName = codeString.data.userName;
            } else {
                window.localStorage.userName = '';
            }
        }
        function _error(e) {
            window.localStorage.userName = '';
            myJavaFuntion.OpenLocalUrl("login");
            console.log(e);
        }
        function _complete(XMLHttpRequest, status) {
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
        // $.ajax({
        //     type: "POST",
        //     url: "/api/server/getClientTypeInfo",
        //     timeout: 5000,
        //     dataType: "json",
        //     headers: {
        //         Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey //签名由getkey接口获取
        //     },
        //     success: function(dt) {
        //         var codeString = dt.HttpData;
        //         if (codeString.code == 200) {
        //             window.localStorage.userName = codeString.data.userName;
        //         } else {
        //             window.localStorage.userName = '';
        //         }
        //     },
        //     error:function(e){
        //         window.localStorage.userName = '';
        //         console.log(e);
        //     },
        //     complete: function(XMLHttpRequest, status) {
        //         if (window.localStorage.userName !="" && window.localStorage.userName != null) {
        //             $("#userName").html("我(" + window.localStorage.userName + ")");
        //             InitEnsure();
        //             AppShows();
        //             onHomePage();
        //         }
        //         else{
        //             myJavaFun.OpenLocalUrl("login");
        //         }
        //     }
        // });
    }, 100);
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
//app显示
function AppShows() {
    $("#appCacheClearLi").show();
    $("#appRichScan").show();
}
//获取App版本信息
function BackAppVersion(versionCode, versionName) {
    window.localStorage.versionCode = versionCode;
    window.localStorage.versionName = versionName;
}
//获取系统信息
function BackSystemInfor(phoneName, phoneModel, phoneVersion) {
    window.localStorage.phoneName = phoneName;
    window.localStorage.phoneModel = phoneModel;
    window.localStorage.phoneVersion = phoneVersion;
    try {
        myJavaFun.GetPushID(); //获取推送ID
    } catch (ex) {}
}
//获取推送ID
function BackPushID(data) {
    $.ax({
        type: 'post',
        url: '/api/jpush/add_push_id',
        data: {
            id: data,
            phoneName: window.localStorage.phoneName,
            phoneModel: window.localStorage.phoneModel,
            phoneVersion: window.localStorage.phoneVersion
        },
        success: function(dt) {
            if (dt.HttpStatus == 200 && dt.HttpData.code == 200) {
                console.log('添加推送成功');
            } else {
                alert('错误码：' + dt.HttpData.code + '\n错误信息：' + dt.HttpData.message);
            }
        }
    });
}
//百度SDK位置信息回调
function locationDBData(dt) {
    window.testIframe.gpsBack(dt);
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
        myApp.dialog.create({
            title: "",
            text: '清空成功！',
            buttons: [{
                text: '确定',
                onClick: function() {
                    location.reload();
                }
            }]
        }).open();
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

function toolbarActive(ids) {
    $(".toolbar-inner").find("a").each(function() {
        if ($(this).hasClass("active")) {
            var cls = $(this).find("i").attr("cls");
            $(this).find("i").removeClass("icon-" + cls + "_a");
            $(this).find("i").addClass("icon-" + cls + "_b");
            $(this).removeClass("active");
        }
    });
    if (ids != '') {
        $("#" + ids).addClass("active");
        var cls = $("#" + ids).find("i").attr("cls");
        $("#" + ids).find("i").removeClass("icon-" + cls + "_b");
        $("#" + ids).find("i").addClass("icon-" + cls + "_a");
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
        console.log(pages[0])
        //mainView.router.loadPage(pages[0] + ".html");
        mainView.router.back()
    }
}
/* 
 * formatMoney(s,type) 
 * 功能：金额按千位逗号分割 
 * 参数：s，需要格式化的金额数值. 
 * 参数：type,判断格式化后的金额是否需要小数位. 
 * 返回：返回格式化后的数值字符串. 
 */
function formatMoney(s, type) {
    if (/[^0-9\.]/.test(s)) return "0";
    if (s == null || s == "") return "0";
    s = s.toString().replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s)) s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    if (type == 0) { // 不带小数位(默认是有小数位)  
        var a = s.split(".");
        if (a[1] == "00") {
            s = a[0];
        }
    }
    return s;
}
//首页
// $$(document).on("page:beforein", ".page[data-page='home']", function(e) {
//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == 'home') {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {
//         onHomePage();
//         $("#homeContents").show();
//         toolbarActive('homeTool');
//     }
// });
// $$(document).on("pageBeforeAnimation", function(e) {
//     if (e.target.id == "home") {
//         onHomePage();
//         $("#homeContents").show();
//     }
// });
// //设置
// $$(document).on("page:beforein", ".page[data-page='SetUp']", function(e) {
//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == "home") {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {
//         initPageJS('SetUp', '');
//     }
// });
// //实时快照
// $$(document).on("page:beforein", ".page[data-page='message']", function(e) {
//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == "home") {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {
//         initPageJS('Message', '');
//     }
// });
// //实时数据
// $$(document).on("page:beforein", ".page[data-page='RealTime']", function(e) {
//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == "home") {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {
//         initPageJS('RealTime', '');
//     }
// });
// //语音控制
// $$(document).on("page:beforein", ".page[data-page='Voice']", function(e) {
//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == "home") {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {
//         initPageJS('Voice', '');
//     }
// });
// //实时视频
// $$(document).on("page:beforein", ".page[data-page='Video']", function(e) {
//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == "home") {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {
//         initPageJS('Video', '');
//     }
// });
// //扫一扫
// $$(document).on("page:beforein", ".page[data-page='RichScan']", function(e) {
//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == "home") {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {
//         initPageJS('RichScan', '');
//     }
// });
// //PPT
// $$(document).on("page:beforein", ".page[data-page='mettingPPT']", function(e) {
//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == "home") {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {
//         initPageJS('mettingPPT', '');
//     }
// });
// //PPT详情
// $$(document).on("page:beforein", ".page[data-page='mettingDetails']", function(e) {
//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == "home") {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {
//         initPageJS('mettingDetails', '');
//     }
// });
// //欢迎词
// $$(document).on("page:beforein", ".page[data-page='welcomeWords']", function(e) {
//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == "home") {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {
//         initPageJS('welcomeWords', '');
//     }
// });
// //视频监控
// $$(document).on("page:beforein", ".page[data-page='videoControl']", function(e) {

//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == "home") {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {

//         initPageJS('videoControl', ''); 
//     }

// });
// //个人信息
// $$(document).on("page:beforein", ".page[data-page='UserInfor']", function(e) {
//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == "home") {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {
//         initPageJS('UserInfor', '');
//     }
// });
// //实时视频
// $$(document).on("page:beforein", ".page[data-page='EventSelect']", function(e) {
//     if ($(this).hasClass("page-on-left")) {
//         var ids = $(this).next().attr("id");
//         if (ids == "home") {
//             toolbarActive('homeTool');
//         } else {
//             initPageJS(ids, '');
//         }
//     } else {
//         initPageJS('EventSelect', '/Scripts/mobile/left/');
//     }
// });
window.onresize = function() {
    onResizeCustomized();
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
//微信分享id
var wxShareStr = "wxd2a573967e43f6c6";
//div分享到微信
function divShareToWX(byID) {
    myJavaFun.AppShare('', wxShareStr);
}
//图表分享到微信
function chartShareToWX(myChart) {
    myJavaFun.AppShare('', wxShareStr);
}
var classObj = {
    ToUnicode: function(str) {
        return escape(str).replace(/%/g, "\\").toLowerCase();
    },
    UnUnicode: function(str) {
        return unescape(str.replace(/\\/g, "%"));
    }
}
//扫一扫返回结果
function onRichScanCallback(dt) {
    var _url = service + "/ExecuteRichScan";
    var _data = "userName=" + window.localStorage.userName + "&&data=" + dt;

    function _success(data) {
        var str = $(data).children("string").text();
        if (str != "false") {
            realShow(str);
        }
    }
    JQajaxo("post", _url, true, _data, _success);
}
/**
 * JS获取n至m随机整数
 */
function rd(n, m) {
    var c = m - n + 1;
    return Math.floor(Math.random() * c + n);
}

function TimeJSONToString2(dt) {
    var timeDate = new Date(dt * 1000).format("yyyy-MM-dd hh:mm:ss");
    return timeDate.toLocaleString();
}
//日期格式化
Date.prototype.format = function(fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function evil(fn) {
    var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}
//获取几天之后的日期
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    return y + "-" + m + "-" + d;
}
//时间格式化
function newDate(date) {
    var s = date;
    var ps = s.split(" ");
    var pd;
    if (ps[0].indexOf('-') > 0) {
        pd = ps[0].split("-");
    } else {
        pd = ps[0].split("/");
    }
    var pt = ps.length > 1 ? ps[1].split(":") : [0, 0, 0];
    var st = new Date(pd[0], pd[1] - 1, pd[2], pt[0], pt[1], pt[2]);
    return st;
}
//计算时间差
function dateCost(data1, data2) {
    var s1 = data1.getTime(),
        s2 = data2.getTime();
    var total = (s2 - s1) / 1000;
    var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
    var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
    var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
    var min = parseInt(afterHour / 60); //计算整数分
    var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数
    return day + "," + hour + "," + min + "," + afterMin;
}
//发送命令
function get_no(dt, set_equip, set_no, values) {
    if (!$(dt).hasClass("Conference_selectedBG") && !$(dt).hasClass("Conference_selectedCO")) {
        var set_equipOld, set_noOld, valuesOld, main_instrOld, mino_instrOld;
        if (set_equip == "") {
            set_equipOld = $(dt).attr("set_equip");
            set_noOld = $(dt).attr("set_no");
        } else {
            set_equipOld = set_equip;
            set_noOld = set_no;
        }
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
                console.log(dt.find("main_instruction").html(), dt.find("minor_instruction").html(), dt.find("value").html());
                if (dt.find("equip_no").html() != "") {
                    if (values == "") onSetCommand11(dt, set_equipOld, dt.find("main_instruction").html(), dt.find("minor_instruction").html(), dt.find("value").html());
                    else onSetCommand11(dt, set_equipOld, dt.find("main_instruction").html(), dt.find("minor_instruction").html(), values);
                } else {
                    alertMsgError.open();
                }
            }
        });
    }
}

function onSetCommand11(dt, equip_no, main_instr, mino_instr, valueset) {
    console.log(equip_no + "," + main_instr + "," + mino_instr + "," + valueset);
    var ajaxVar = $.ajax({
        type: "POST",
        url: "/GWService.asmx/SetupsCommand",
        timeout: 5000,
        data: {
            equip_no: equip_no,
            main_instruction: main_instr,
            minor_instruction: mino_instr,
            value: valueset,
            user_name: window.localStorage.userName
        },
        success: function(data) {
            alertMsgSuccess.open();
            console.log("success");
        }
    });
}
var alertMsgSuccess = myApp.notification.create({
    title: '系统提示',
    titleRightText: '',
    subtitle: '<br />',
    text: '操作成功',
    closeTimeout: 2000,
});
var alertMsgError = myApp.notification.create({
    title: '系统提示',
    titleRightText: '',
    subtitle: '<br />',
    text: '操作失败或没有该命令配置',
    closeTimeout: 1000,
});
//判断是否在视口内部
$.fn.isOnScreen = function() {
    var win = $(window);
    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height(); //375
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

function _errorfSet(that) {
    if ($(that).hasClass("volumebtn1") || $(that).hasClass("volumebtn2") || $(that).hasClass("volumebtn3") || $(that).hasClass("volumebtn4")) {} else if ($(that).attr("id") == "viewsSave") //照相
        $(that).attr("disabled", false);
    else {
        $(that).removeClass("displayNone").siblings("a").addClass("displayNone");
    }
    $(".tooipSpan").addClass("displayNone");
    alertMsgError.open();
}
//提取名称
function getNmae(name) {
    return name.split("\\")[name.split("\\").length - 1];
}


//引入javascript
function loadJs(url,callback,id){
        var script=document.createElement('script');
        script.type="text/javascript";
        script.src = url;
        script.id = id+"_1";
        document.body.appendChild(script);
        
        if(typeof(callback)!="undefined"){
            if(script.readyState){
                script.onreadystatechange=function(){
                    if(script.readyState == "loaded" || script.readyState == "complete"){
                        script.onreadystatechange=null;
                        callback();
                    }
                }
            }else{
                script.onload=function(){
                  callback();
                }
            }
        }
}

//退出登陆
function exitLogin(){ 
    try {
          myJavaFun.OpenLocalUrl("login");
        }
        catch(e){
            if(window.localStorage.terminal != "Mobile.App")
               window.location.href = "/Views/login.html";
            else
                myApp.dialog.alert("退出登陆异常");
        }
}

//切换底部工具栏
function switchToolbar(id){
    //$(".toolbar .animation-no").removeClass("active");
    $("#"+id).addClass("active").siblings().removeClass("active");
}

//系统配置
function systemConfig(id){
  //switchToolbar(id);
}

//语音信息提示
function voiceTooip(txt){
    return myApp.toast.create({
      text: txt,
      position: 'center',
      closeTimeout: 3000,
    });
}

