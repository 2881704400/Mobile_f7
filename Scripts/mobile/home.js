//首页事件
function onHomePage() {
    authorizationName();
    switchToolbar("homeTool");

    //图表
    // snapshotChart("purchase_Bar");
    // equipsChart("purchase_ring");
    // ycpChart("purchase_circular");
    // 配置
    getJurisdictionData();

}
//授权名称
function authorizationName() {
    var ajaxVar = $.ajax({
        type: "POST",
        url: "/GWService.asmx/GetName2SFService",
        timeout: 5000,
        data: {
            userName: window.localStorage.userName,
        },
        success: function(data) {
            var dt = $(data).find('string').text();
            if (dt) {
                $(".auth_name_get").text(dt);
                window.localStorage.auth_name_title = dt;
            } else {
                tipsInformtion("获取授权名失败,是否退出登陆界面?", exitLogin);
            }
        },
        error: function(e) {
            tipsInformtion("获取授权名失败,是否退出登陆界面?", exitLogin);
        }
    });
}
//提示窗口
function tipsInformtion(tipsStr, tipsEvent) {
    myApp.dialog.create({
        title: "信息提示",
        text: tipsStr,
        buttons: [{
            text: '取消'
        }, {
            text: '确定',
            onClick: function() {
                tipsEvent();
            }
        }]
    }).open();
}
//轮播
function VideoBaner(className, slistName, jsonString) {
    $(".KOvm_container>div,.wiper-paginationTrailer-KOvm").html("");
    var countTrailer = jsonString.length;
    var xhTrailer = 0;
    for (var i = 0; i < countTrailer; i++) {
        var htmlTrailerChild = "<li class=\"col-25\">" + "<a href=\"#\"  id=\"homeBtn" + (i + 1) + "\" class=\"homeBtn\" set_equip=\"" + jsonString[i].equipNo + "\" set_no=\"" + jsonString[i].setNo + "\" onclick=\"get_no_set(this," + jsonString[i].value + ")\">" + "<i class=\"" + jsonString[i].icon + "\"></i>" + "<p class=\"p-ellipsis1\">" + jsonString[i].name + "</p>" + "</a>" + "<a href=\"#\"  class=\"homeBtn displayNone\">" + "<i class=\"" + jsonString[i].icon + "\"></i>" + "<p class=\"p-ellipsis1\">" + jsonString[i].name + "</p>" + "</a>" + "<img src=\"#\" style=\"display:none;\"></li>";
        if (i % 8 == 0 || i == 0) {
            xhTrailer++;
            var htmlTrailer = "<div class=\"swiper-slide\" dataID='" + xhTrailer + "'>" + "<ul class=\"row\" >" + htmlTrailerChild + "</ul></div>";
            $("." + className + " .swiper-wrapper").append(htmlTrailer);
        } else {
            $("." + className + " .swiper-wrapper .swiper-slide[dataID=" + xhTrailer + "] ul").append(htmlTrailerChild);
        }
    }
    var swiper = new Swiper('.' + className, {
        pagination: {
            el: '.' + slistName,
        },
    });
}
//常用
function commonlyUsedFun(className, classListName, jsonString) {
    $("." + className).html("");
    var countTrailer = jsonString.length;
    var htmlTrailerChild = "",
        xhTrailer = 0;
    for (var i = 0; i < countTrailer; i++) {
        htmlTrailerChild += "<li class=\"col-" + classListName + "\">" + "<a href=\"" + jsonString[i].href + "\"  id=\"homeBtn" + (i + 1) + "\" class=\"homeBtn\" set_equip=\"" + jsonString[i].equipNo + "\" set_no=\"" + jsonString[i].setNo + "\" onclick=\"get_no_set(this," + jsonString[i].value + ")\">" + "<i class=\"" + jsonString[i].icon + "\"></i>" + "<p class=\"p-ellipsis1\">" + jsonString[i].name + "</p>" + "</a>" + "<a href=\"#\"  class=\"homeBtn displayNone\">" + "<i class=\"" + jsonString[i].icon + "\"></i>" + "<p class=\"p-ellipsis1\">" + jsonString[i].name + "</p>" + "</a>" + "</li>";
    }
    $("." + className).append(htmlTrailerChild);
}
//实时快照 
var event_Level_list_home, btnInfoNames_home = [],
    btnInfoLevels_home = [];

function snashotData() {
    $.ajax({
        type: 'post',
        url: '/api/event/alarm_config',
        headers: {
            Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey //签名由getkey接口获取
        },
        data: {},
        success: function(dt) {
            if (dt.HttpStatus == 200 && dt.HttpData.data) {
                var resultData = dt.HttpData.data;
                var strData = "";
                for (var i = 0; i < resultData.length; i++) {
                    if (resultData[i].IsShow == 1) {
                        var btnStatus = resultData[i].IsShow == 1 ? true : false;
                        var btnValue = [];
                        for (var j = resultData[i].SnapshotLevelMin; j <= resultData[i].SnapshotLevelMax; j++) {
                            btnValue += j + ",";
                        }
                        event_Level_list_home += btnValue;
                        btnValue = btnValue.substring(0, btnValue.length - 1);
                        btnInfoNames_home.push(resultData[i].SnapshotName)
                        btnInfoLevels_home.push(btnValue);
                    }
                }
                snashotCount(btnInfoLevels_home);
            }
        }
    });
}

function snashotCount(btnInfoLevels_home) {
    var strBtnInfoLevels = "";
    for (var i = 0; i < btnInfoLevels_home.length; i++) {
        strBtnInfoLevels += btnInfoLevels_home[i] + "/";
    }
    if (strBtnInfoLevels.length > 0) {
        strBtnInfoLevels = strBtnInfoLevels.substring(0, strBtnInfoLevels.length - 1);
        $.ajax({
            type: 'post',
            url: '/api/event/real_evt_count',
            headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey //签名由getkey接口获取
            },
            data: {
                levels: strBtnInfoLevels
            },
            success: function(dt) {
                if (dt.HttpStatus == 200 && dt.HttpData.data) {
                    var resultData = dt.HttpData.data;
                    var resultDataArr = resultData.toString().split(",");
                    for (var i = 0; i < resultDataArr.length; i++) {
                        $(".statisticsTable a:eq(" + i + ")").attr("href", "/snapShotDetail/?" + btnInfoNames_home[i] + '&' + btnInfoLevels_home[i]).find("p").text(resultDataArr[i]);
                    }
                }
            }
        });
    }
}
//配置界面
function configPage(){
    $.fn.home_fsk_btn(equipCommand);
    $(".home_fsk_btn_title a:eq(0)").html(equipCommand[0].title);
    $(".home_fsk_btn_title a:eq(1)").html(equipCommandPHM[0].title);
    $(".home_fsk_btn_title a").unbind();
    $(".home_fsk_btn_title a").bind("click", function() {
    $(".home_fsk_btn ul").html("");
    $(this).addClass("selectTab").siblings().removeClass("selectTab");
    let dataid = $(this).attr("data-id");
    if (dataid == 1) {
        $.fn.home_fsk_btn(equipCommand);
    } else {
        $.fn.home_fsk_btn(equipCommandPHM);
    }
    });
}
$.fn.extend({
    home_fsk_btn: function(stringJson) {
        var html = '';
        stringJson.forEach(function(item, index) {
            html += `<li class="col-33"><a class="btn btn-border-o ${item.className}" set_equip="${item.equipNo}" set_no="${item.setNo}" ><p>${item.name}</p></a></li>`;
        });
        $(".home_fsk_btn ul").append(html);
        $(".home_fsk_btn li a").unbind();
        $(".home_fsk_btn li a").bind("click", function() {
            $(this).addClass("selectBtb").parent().siblings().find("a").removeClass("selectBtb");
            // 发送命令
            get_no(this, "", "", "");
        });
    },
});