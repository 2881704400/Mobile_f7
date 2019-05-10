function setPage() {
    try {
        myJavaFun.GetAppVersion();
    } catch (e) {}
    //语音初始化 
    $("#voiceList").find("option").each(function() {
        if ($(this).attr("value") == window.localStorage.voiceType) {
            $(this).attr("selected", true);
            $("#voiceListName>.item-after").html($(this).html());
        }
    });
    //语言初始化 
    $("#languageList").find("option:eq(0)").attr("selected", true);
    $("#languageListName>.item-after").html("中文");
    //用户
    $(".userClassName p").html(window.localStorage.userName);
    // myApp.navbar.hide('.navbar');
    //切换背景
    var toggle = myApp.toggle.create({
        el: '.toggle',
        on: {
            change: function() {
                var hrefUrl = "";
                if (toggle.checked) {
                    $(".whiteColor").each(function(index) {
                        hrefUrl = $(this).attr("href").replace("white", "back");
                        $(this).attr("href", hrefUrl);
                    });
                    window.localStorage.localBgColor = 1;
                } else {
                    $(".whiteColor").each(function(index) {
                        hrefUrl = $(this).attr("href").replace("back", "white");
                        $(this).attr("href", hrefUrl);
                    });
                    window.localStorage.localBgColor = 0;
                }
            }
        }
    });
    if (window.localStorage.localBgColor == 1) {
        toggle.checked = true;
    } else {
        toggle.checked = false;
    }
}

function onVoiceList() {
    window.localStorage.voiceType = $("#voiceList").find("option:selected").attr("value");
    var selValue = 0;
    var keysValue = "5c258342-d64f4e3f41f34ebc8368527df54c0425"; //讯飞-微软
    $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/insertLanguageStatus?userName=" + window.localStorage.userName + "&languageType=" + selValue + "&voiceType=" + window.localStorage.voiceType + "&Reserve1=" + keysValue + "&Reserve2=" + keysValue + "&Reserve3=" + keysValue)).done(function(n) {
        var result = n.HttpData.data;
        if (result && n.HttpData.code == 200) {}
    }).fail(function(e) {});
}

function selectLanguage() {
    var selText = $("#languageList").find("option:selected").text();
    tranformAlert("提示", "是否切换为英文?", "确认", "取消", confirmFunction, cancelFunction);
}

function confirmFunction() { //确认
    var selValue = 1; //1为英文 0为中文
    var keysValue = "5c258342-d64f4e3f41f34ebc8368527df54c0425"; //讯飞-微软
    $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/insertLanguageStatus?userName=" + window.localStorage.userName + "&languageType=" + selValue + "&voiceType=" + window.localStorage.voiceType + "&Reserve1=" + keysValue + "&Reserve2=" + keysValue + "&Reserve3=" + keysValue)).done(function(n) {
        var result = n.HttpData.data;
        if (result && n.HttpData.code == 200 && selValue == 1) {
            tranformMenu(selValue);
            myApp.router.navigate("/mobile-en/setPage_en/");
        } else {
            tranformMenu(selValue);
            myApp.router.navigate("/setPage/");
        }
        window.localStorage.languageList = 1;
    }).fail(function(e) {
        tranformMenu(selValue);
        myApp.router.navigate("/setPage/");
    });
}

function cancelFunction() { //取消
    $("#languageList").find("option:eq(0)").attr("selected", true);
    $("#languageListName>.item-after").html("中文");
    window.localStorage.languageList = 0;
    myApp.router.navigate("/setPage/");
}