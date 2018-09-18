//首页事件
function onHomePage() {
	
    authorizationName();
    
    switchToolbar("homeTool");
    //图表
    $("#purchase_Bar").width(window.screen.width);

    snapshotChart("purchase_Bar");
    equipsChart("purchase_ring");
    ycpChart("purchase_circular");
    //场景按钮
    commonlyUsedFun("commonlyUsed","25",commonlyUsed);//常用
    VideoBaner("KOvm_container","swiper-paginationTrailer-KOvm",KOvm);//场景
    commonlyUsedFun("pptPattern_container ol","50",pptPattern);//PPT
    commonlyUsedFun("jjPattern_container ol","50",jjPattern);//讲解
}
//界面尺寸变化事件
function onResizeCustomized() {
    if ($(".view-main").attr("data-page") == "Voice") {
        var heightWindow = $(".page-content").height();
        if (heightWindow < 500) {
            $(".voiceDivs").css("height", "100%");
            $(".voiceDivs").css("bottom", "40px");
            $(".voiceDivs").css("position", "relative");
        } else {
            $(".voiceDivs").css("height", "300px");
            $(".voiceDivs").css("bottom", "60px");
            $(".voiceDivs").css("position", "absolute");
        }
    }
}


//授权名称
function authorizationName(){
    var ajaxVar = $.ajax({
        type: "POST",
        url: "/GWService.asmx/GetName2SFService",
        timeout: 5000,
        data: {
            userName: window.localStorage.userName,
        },
        success: function(data) {
            var dt = $(data).find('string').text();
            if(dt) {
                $(".auth_name_get").text(dt);
                window.localStorage.auth_name_title = dt;
            } else {
               tipsInformtion("获取授权名失败,是否退出登陆界面?",exitLogin);
            }
        },
        error: function(e){
            tipsInformtion("获取授权名失败,是否退出登陆界面?",exitLogin);
        }
    });
  
}

//提示窗口
function tipsInformtion(tipsStr,tipsEvent){
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
function VideoBaner(className,slistName,jsonString) {
    var countTrailer = jsonString.length;
    var xhTrailer = 0;
    for (var i = 0; i < countTrailer; i++) {
        var htmlTrailerChild = "<li class=\"col-25\">" + "<a href=\"#\"  id=\"homeBtn" + (i + 1) + "\" class=\"homeBtn\" set_equip=\""+jsonString[i].equipNo+"\" set_no=\""+jsonString[i].setNo+"\" onclick=\"setCommand_1(this,"+jsonString[i].value+")\">" + "<i class=\""+jsonString[i].icon+"\"></i>" + "<p class=\"p-ellipsis1\">" + jsonString[i].name + "</p>" + "</a>" + "<a href=\"#\"  class=\"homeBtn displayNone\">" + "<i class=\""+jsonString[i].icon+"\"></i>" + "<p class=\"p-ellipsis1\">" + jsonString[i].name + "</p>" + "</a>" + "<img src=\"#\" style=\"display:none;\"></li>";
        if (i % 8 == 0 || i == 0) {
            xhTrailer++;
            var htmlTrailer = "<div class=\"swiper-slide\" dataID='" + xhTrailer + "'>" + "<ul class=\"row\" >" + htmlTrailerChild + "</ul></div>";
            $("."+className+" .swiper-wrapper").append(htmlTrailer);
        } else {
            $("."+className+" .swiper-wrapper .swiper-slide[dataID=" + xhTrailer + "] ul").append(htmlTrailerChild);
        }
    }
     var swiper = new Swiper('.'+className, {
      pagination: {
        el: '.'+slistName,
      },
    });
}


//常用
function commonlyUsedFun(className,classListName,jsonString) {
    $("."+className).html("");
    var countTrailer = jsonString.length;
    var htmlTrailerChild="",xhTrailer = 0;
    for (var i = 0; i < countTrailer; i++) {
        htmlTrailerChild += "<li class=\"col-"+classListName+"\">" + "<a href=\"#\"  id=\"homeBtn" + (i + 1) + "\" class=\"homeBtn\" set_equip=\""+jsonString[i].equipNo+"\" set_no=\""+jsonString[i].setNo+"\" onclick=\"setCommand_1(this,"+jsonString[i].value+")\">" + "<img src=\""+jsonString[i].icon+"\" />" + "<p class=\"p-ellipsis1\">" + jsonString[i].name + "</p>" + "</a>" + "<a href=\"#\"  class=\"homeBtn displayNone\">" + "<img src=\""+jsonString[i].icon+"\" />" + "<p class=\"p-ellipsis1\">" + jsonString[i].name + "</p>" + "</a>"+"</li>";
    }
    $("."+className).append(htmlTrailerChild);
}
