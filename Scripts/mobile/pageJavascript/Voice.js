var isVoices = false;
var cancelFlag = false;
var cancelVoiceFlag = false;
var startX, //触摸时的坐标   
    startY,
    x, //滑动的距离 
    y,
    aboveY = 0; //设一个全局变量记录上一次内部块滑动的位置    
$(function() {

    $$('.popup-voices').on('popup:open', function(e, popup) {
        $(".view-main").css({
            filter: 'blur(8px)'
        })
        //打开语音时，初始化界面内容
        document.getElementById("videoContentBtnId").removeEventListener('touchstart', onTouchStart);
        document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
        try{ myJavaFun.StartAIUI();}catch(e){}
        
        $(".voice-container").html('<div class="pannel-chat-info">' + ' <div class="chart-content">' + initAlert() + '  </div>' + '</div>');
        modifyZnUs();
    });
    $$('.popup-voices').on('popup:close', function(e, popup) {
        try{ myJavaFun.StopAIUI();}catch(e){}
        $(".view-main").css({filter: 'blur(0px)'});
    });
    //记录选择
    if (!window.localStorage.voiceList) {
        window.localStorage.voiceList = "1";
    }
});
function changeContentBoxBg() {
    $(".voice-container .pannel-chat-info").each(function(i) {
        var len = $(".voice-container .pannel-chat-info").length;
        if (!$(this).find(".chart-content").hasClass("stay-right") && i < len - 1) {
            $(this).addClass("chart-content-old");
        }
    })
}
var is_flag_voice = true;
function onTouchStart(e) {
    is_flag_voice = false;
    document.getElementById("videoContentBtnId").removeEventListener('touchstart', onTouchStart);
    $(".voice-container").html('<div class="pannel-chat-info">' + ' <div class="chart-content">' + initAlert() + '  </div>' + '</div>');
    try {
      myJavaFun.AIUIWakeup();
    } catch (ex) {
       $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(window.localStorage.languageList == "0" ? "<span>无法使用此功能，请下载最新app！</span>" : "<span>Unable to use this feature, please download the latest app!</span>");  
       document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
    }
}

function StartVoiceXF() {
    try {
        myJavaFun.StartViceXF(parseInt(window.localStorage.XFOffline));
    } catch (ex) {}
}
function callbackVoiceXFMessage(dt) {
    if (cancelVoiceFlag) {
        return;
    }
    $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(window.localStorage.languageList == "0" ? "<span>您好像没有说话哦！</span>" : "<span>You don't seem to be talking！</span>");
    $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').show();
    $("#waveAnim").hide();
    isVoices = false;
    document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
    document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
}
function callbackVoiceXFData(dt) { //index  1为连续语音，0为手动语音 
    var voiceString = dt;
    if (cancelVoiceFlag) {
        return;
    }
    var _url = "/api/Voice/voice_string";
    var _data = {
        data_string: dt,
        userName: window.localStorage.userName
    }
    ajaxServiceSendVoice("post", _url, true, _data, _successf, _error);

    function _successf(dt) {
        if (dt.HttpStatus == 200 && dt.HttpData.data) {
            var result = dt.HttpData.data;
            result = result.replace("未识别语音,内容","");
            result = result.replace("已处理语音,内容", "");
            result = result.replace("---", "");
            result = result.replace("。", "");
            $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html((window.localStorage.languageList == "0"?"<span>已处理语音,内容---":"<span>Processed voice, content---") + result + "</span>");
            setTimeout(function() {
                $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' +  (window.localStorage.languageList == "0" ? "本次语音结束</span>" : "The end of the speech</span>") + '</div>' + '</div>');
                $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
                changeContentBoxBg();
                if(is_flag_voice)
                   {initVoiceAnimation();} 
                else
                    is_flag_voice = true;
            }, 500);
        } else {
            is_flag_voice = true;
            $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(window.localStorage.languageList == "0" ? "<span>您好像没有说话哦！</span>" : "<span>You don't seem to be talking！</span>");
        }
       
        document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
    }
    function _error(qXHR, textStatus, errorThrown) {
        $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>服务器出错！</span>");
        isVoices = false;
        document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
        setTimeout(function() {
            if (isVoices == false) {
                $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>按下说话</span>");
            }
        }, 3000);
    }
}


function ajaxServiceSendVoice(_type, _url, _asycn, _data, _success, _error) {
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
function microsoftSpeech(dt) {
    var dt = JSON.parse(dt),
        result = dt.message.toString().trim();
    if (dt.status == 200) {
        // result = result.replace("未识别语音,内容---", "");
        result = result.replace("。", "");
        $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html((window.localStorage.languageList == "0"?"<span>已处理语音,内容---":"<span>Processed voice, content---") + result + "</span>");
        setTimeout(function() {
            // $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + (window.localStorage.languageList == "0" ? "<span>好的，开始执行：" : "<span>Okay, let's get started：") + result + '..</span>' + ' </div>' + '</div>');
            $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' +  (window.localStorage.languageList == "0" ? "本次语音结束</span>" : " End of speech</span>") + '</div>' + '</div>');
            $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
            changeContentBoxBg();
        }, 500);
    } else if (dt.status == 202) {
        $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(window.localStorage.languageList == "0" ? "<span>您好像没有说话哦！</span>" : "<span>You don't seem to be talking！</span>");
    } else {
        $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>" + result + "</span>");
        setTimeout(function() {
            // $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + (window.localStorage.languageList == "0" ? "<span>好的，开始执行：" : "<span>Okay, let's get started：") + result + '..</span>' + ' </div>' + '</div>');
            $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' + result + (window.localStorage.languageList == "0" ? "指令异常，执行失败！</span>" : " Instruction exception, execution failure!") + ' </div>' + '</div>');
            $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
            changeContentBoxBg();
        }, 500);
    }
    isVoices = false;
    document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
    document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
}
//初始化提示语句
function initAlert() {
    if (window.localStorage.languageList == "0") {
        return '<span>请告诉我，您想要进行的操作</span>';
    } else return '<span>Please tell me what you want to do.</span>';
}
//指令提示
function initInstructions() {
    if (window.localStorage.languageList == "0") return '<span>指令已取消</span>';
    else return '<span>Instruction cancelled.</span>';
}
//识别提示
function initIdentifying() {
    if (window.localStorage.languageList == "0") return '<span>正在识别..</span>';
    else return '<span>Identifying...</span>';
}


//封装动画
function initVoiceAnimation(){
    document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
    if(!$(".voice-container").find("div.stay-right>div").hasClass("waveAnim"))
      { 
        $(".voice-container").append('<div class="pannel-chat-info clear">' + '<div class="chart-content stay-right">' + '<div class="waveAnim"><i></i><i></i><i></i><i></i><i></i></div>' + ' </div>' + '</div>');
        $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
        changeContentBoxBg();  
     } 

    // $(".voice-container").append('<div class="pannel-chat-info clear">' + '<div class="chart-content stay-right">' + '<div class="waveAnim"><i></i><i></i><i></i><i></i><i></i></div>' + ' </div>' + '</div>');
}
