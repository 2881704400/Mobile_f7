﻿var isVoices = false;
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
        $(".voice-container").html('<div class="pannel-chat-info">' + '	<div class="chart-content">' + '		<span>请告诉我，您想要进行的操作</span>' + '	</div>' + '</div>');
    });
    $$('.popup-voices').on('popup:close', function(e, popup) {
        $(".view-main").css({
            filter: 'blur(0px)'
        })
    });
    document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
    document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
    document.getElementById("videoContentBtnId").addEventListener('touchmove', onTouchMove);
    //记录选择
     if (!window.localStorage.voiceList) {window.localStorage.voiceList = "1";} 
     try {myJavaFun.VoiceOpen();myJavaFun.initMicrosoftSpeech();} catch (ex) {}
});

function changeContentBoxBg() {
    $(".voice-container .pannel-chat-info").each(function(i) {
        var len = $(".voice-container .pannel-chat-info").length;
        if (!$(this).find(".chart-content").hasClass("stay-right") && i < len - 1) {
            $(this).addClass("chart-content-old");
        }
    })
}

function onTouchStart(e) {
    e.preventDefault();
    var touch = e.touches[0];
    startY = touch.pageY; //刚触摸时的坐标
    cancelVoiceFlag = cancelFlag = false;
    $(".voice-container").html('<div class="pannel-chat-info">' + '	<div class="chart-content">' + '		<span>请告诉我，您想要进行的操作</span>' + '	</div>' + '</div>');
    $(".voice-arrow-cancel").show();
    $(".voice-arrow-box").show();
    $(".voice-arrow-dialog").hide();
    try {
        isVoices = true;
        if (window.localStorage.voiceList == "2" || window.localStorage.voiceList == "3") {
            myJavaFun.startMicrosoftSpeech();
        } else {
            myJavaFun.StartVoice(window.localStorage.voiceList);
        }
    } catch (ex) {}
    $(".voice-container").append('<div class="pannel-chat-info">' + '	<div class="chart-content stay-right">' + '		<div class="waveAnim"><i></i><i></i><i></i><i></i><i></i></div>' + '	</div>' + '</div>');
    $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
    changeContentBoxBg();
}

function onTouchMove(e) {
    e.preventDefault();
    var touch = e.touches[0];
    y = touch.pageY - startY; //滑动的距离
    var distance = aboveY + y;
    if (distance < -10 && distance > -200) {
        if (distance < -70 && !cancelFlag) {
            $(".voice-arrow-cancel").css({
                background: "rgba(255,255,255,1)",
                color: "rgba(112,112,112,1)"
            });
            $(".voice-arrow-box .voice-arrow-ani").each(function() {
                $(this).removeClass().addClass("voice-arrow-ani");
                $(this).css({
                    opacity: 1
                });
            });
            cancelVoiceFlag = cancelFlag = true;
        }
    }
}

function onTouchEnd(e) {

    if (cancelVoiceFlag || cancelFlag) {
        $(".voice-arrow-cancel").hide();
        $(".voice-arrow-box").hide();
        $(".voice-arrow-dialog").show();
        $(".voice-arrow-box").css({
            bottom: "70px",
            opacity: 1
        });
        $(".voice-arrow-cancel").css({
            background: "rgba(255,255,255,0)",
            color: "rgba(255,255,255,1)"
        });
        $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>指令已取消</span>");
        $(".voice-arrow-box .voice-arrow-ani").each(function() {
            var index = $(this).index();
            index = 3 - index;
            $(this).removeClass().addClass("voice-arrow-ani IndexIconAnimation" + index + "");
        });
        try {
            if (window.localStorage.voiceList == "2" || window.localStorage.voiceList == "3") {
                myJavaFun.stopMicrosoftSpeech();
            } else {
                myJavaFun.StopVoice();
            }
        } catch (ex) {
            isVoices = false;
            $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>无法使用此功能，请下载最新app！</span>");
            document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
            document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
            setTimeout(function() {
                if (isVoices == false) {
                    document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
                    document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
                }
            }, 3000);
        }
        cancelFlag = false;
        return;
    } else {
        $(".voice-arrow-cancel").hide();
        $(".voice-arrow-box").hide();
        $(".voice-arrow-dialog").show();
        $(".voice-arrow-box").css({
            bottom: "70px",
            opacity: 1
        });
        $(".voice-arrow-cancel").css({
            background: "rgba(255,255,255,0)",
            color: "rgba(255,255,255,1)"
        });
    }
    if (!isVoices) {
        return;
    }
    $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>正在识别..</span>");
    document.getElementById("videoContentBtnId").removeEventListener('touchstart', onTouchStart);
    document.getElementById("videoContentBtnId").removeEventListener('touchend', onTouchEnd);
    setTimeout(function() {
        try {
            if (window.localStorage.voiceList == "2" || window.localStorage.voiceList == "3") {
                myJavaFun.stopMicrosoftSpeech();
            } else {
                myJavaFun.StopVoice();
            }
        } catch (ex) {
            isVoices = false;
            $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>无法使用此功能，请下载最新app！</span>");
            $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
            changeContentBoxBg();
            document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
            document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
            setTimeout(function() {
                if (isVoices == false) {
                    document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
                    document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
                }
            }, 3000);
        }
    }, 50);
}

function StartVoiceXF() {
    try {
        myJavaFun.StartViceXF(parseInt(window.localStorage.XFOffline));
    } catch (ex) {
        //		$("#voiceMessage_xf1").html("无法使用此功能！");
    }
}

function callbackVoiceXFMessage(dt) {
	
    if (cancelVoiceFlag) {
        return;
    }
    $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>" + dt + "</span>");
    $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').show();
    $("#waveAnim").hide();
    isVoices = false;
    document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
    document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
}

function callbackVoiceXFData(dt) {

    var voiceString = dt;
    if (cancelVoiceFlag) {
        return;
    }
    var _url = "/api/Voice/voice_string";
    var _data = {
        data_string: dt
    }
    ajaxServiceSendVoice("post", _url, true, _data, _successf, _error);
    function _successf(dt) {
        if (dt.HttpStatus == 200 && dt.HttpData.data) {
            var result = dt.HttpData.data;
            if (result == "") {
                $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(window.localStorage.voiceList=="1"?"<span>未识别！</span>":"<span> Unidentified！</span>");
            } else {
                result = result.replace("未识别语音,内容---", "");
                result = result.replace("。", "");
                $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>" + result + "</span>");
                setTimeout(function() {
                    $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + (window.localStorage.voiceList=="2"?"<span>好的，开始执行：":"<span>Okay, let's get started：") + result + '..</span>' + ' </div>' + '</div>');
                    $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' + result + (window.localStorage.voiceList=="2"?"已执行</span>":" executed</span>") + '</div>' + '</div>');
                    $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
                    changeContentBoxBg();
                }, 500);
            }
        } else {
            if (!voiceString) {
                $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(window.localStorage.voiceList=="1"?"<span>您好像没有说话哦！</span>":"<span>You don't seem to be talking！</span>");
            } else {
                $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>" + voiceString + "</span>");
                setTimeout(function() {
                    $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + (window.localStorage.voiceList=="1"?"<span>好的，开始执行：":"<span>Okay, let's get started：") + voiceString + '..</span>' + ' </div>' + '</div>');
                    $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' + voiceString + (window.localStorage.voiceList=="1"?"指令异常，执行失败！</span>":" Instruction exception, execution failure!") + ' </div>' + '</div>');
                    $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
                    changeContentBoxBg();
                }, 500);
            }
        }
        isVoices = false;
        document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
        document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
    }

    function _error(qXHR, textStatus, errorThrown) {
        $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>服务器出错！</span>");
        isVoices = false;
        document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
        document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
        setTimeout(function() {
            if (isVoices == false) {
                $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>按住说话</span>");
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
//接收回调数据并上传至服务器
// function callbackVoiceBuffer(dt) {
//     var voiceString = dt;
//     if (!isVoices) {
//         return;
//     }
//     var _url = service + "/VoiceControlByte";
//     var _data = "audioData=" + dt + "&&userName=" + window.localStorage.userName;
//     ajaxServiceSendVoice("post", _url, true, _data, _successf, _error);
//     function _successf(dt) {
//         if (dt.HttpStatus == 200 && dt.HttpData.data) {
//             var result = dt.HttpData.data;
//             if (result == "") {
//                 $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>未识别！</span>");
//             } else {
//                 result = result.replace("未识别语音,内容---", "");
//                 result = result.replace("。", "");
//                 $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>" + result + "</span>");
//                 setTimeout(function() {
//                     $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>好的，开始执行：' + result + '..</span>' + '	</div>' + '</div>');
//                     $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' + result + '已执行</span>' + '	</div>' + '</div>');
//                     $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
//                     changeContentBoxBg();
//                 }, 500);
//             }
//         } else {
//             if (!voiceString) {
//                 $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>您好像没有说话哦！</span>");
//             } else {
//                 $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>" + voiceString + "</span>");
//                 setTimeout(function() {
//                     $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>好的，开始执行：' + voiceString + '..</span>' + '	</div>' + '</div>');
//                     $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' + voiceString + '指令异常，执行失败！</span>' + '	</div>' + '</div>');
//                     $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
//                     changeContentBoxBg();
//                 }, 500);
//             }
//         }
//         isVoices = false;
//         document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
//         document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
//     }

//     function _error(qXHR, textStatus, errorThrown) {
//         $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>服务器出错！</span>");
//         isVoices = false;
//         document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
//         document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
//         setTimeout(function() {
//             if (isVoices == false) {
//                 $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>按住说话</span>");
//             }
//         }, 3000);
//     }
// }

function microsoftSpeech(dt) {
    var dt = JSON.parse(dt),
        result = dt.message.toString().trim();

    if(dt.status == 200)
    {
        // result = result.replace("未识别语音,内容---", "");
        result = result.replace("。", "");
        $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>" + result + "</span>");
        setTimeout(function() {
            $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + (window.localStorage.voiceList=="2"?"<span>好的，开始执行：":"<span>Okay, let's get started：") + result + '..</span>' + ' </div>' + '</div>');
            $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' + result + (window.localStorage.voiceList=="2"?"已执行</span>":" executed</span>") + '</div>' + '</div>');
            $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
            changeContentBoxBg();
        }, 500);        
    }
    else if(dt.status == 202)
    {
        $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(window.localStorage.voiceList=="2"?"<span>您好像没有说话哦！</span>":"<span>You don't seem to be talking！</span>");
    }
    else
    {
         $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>" + result + "</span>");
        setTimeout(function() {
            $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + (window.localStorage.voiceList=="2"?"<span>好的，开始执行：":"<span>Okay, let's get started：") + result + '..</span>' + ' </div>' + '</div>');
            $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' + result + (window.localStorage.voiceList=="2"?"指令异常，执行失败！</span>":" Instruction exception, execution failure!") + ' </div>' + '</div>');
            $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
            changeContentBoxBg();
        }, 500);       
    }

    // if (result) {
    //     if (result == "") {
    //         $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>未识别！</span>");
    //     } else {
    //         result = result.replace("未识别语音,内容---", "");
    //         result = result.replace("。", "");
    //         $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>" + result + "</span>");
    //         setTimeout(function() {
    //             $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>好的，开始执行：' + result + '..</span>' + '	</div>' + '</div>');
    //             $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' + result + '已执行</span>' + '	</div>' + '</div>');
    //             $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
    //             changeContentBoxBg();
    //         }, 500);
    //     }
    // } else {
    //     if (!result) {
    //         $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>您好像没有说话哦！</span>");
    //     } else {
    //         $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>" + result + "</span>");
    //         setTimeout(function() {
    //             $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>好的，开始执行：' + result + '..</span>' + '	</div>' + '</div>');
    //             $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' + result + '指令异常，执行失败！</span>' + '	</div>' + '</div>');
    //             $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
    //             changeContentBoxBg();
    //         }, 500);
    //     }
    // }
    isVoices = false;
    document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
    document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
}
