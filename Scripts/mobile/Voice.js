
//监听
document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
try {
    myJavaFun.VoiceOpen();
}
catch (ex) {

}
var isVoices = false;

//按住开始说话
function onTouchStart() {
    myApp.toast.close();
    $(".voiceDivs").addClass("voicePanel");
    $(this).addClass("voiceActive");
    $("#voiceMessage").hide();
    $("#waveAnim").show();
    try {
        isVoices = true;
        if (window.localStorage.voiceList == "0") {
            myJavaFun.StartVice();
        }
        else {
            myJavaFun.StartVoice(window.localStorage.voiceList);
        }
    } catch (ex) {
        // $("#voiceMessage").html("无法使用此功能，请下载最新app！");
        //voiceTooip("无法使用此功能，请下载最新app！").open();
    }
}

//释放手指并识别语音
function onTouchEnd() {
    $(".voiceDivs").removeClass("voicePanel");
    if (!isVoices) {
        return;
    }
    if ($(this).hasClass("voiceActive")) {
        $(this).removeClass("voiceActive");
        $("#voiceMessage").show();
        // $("#voiceMessage").html("正在识别…");
        voiceTooip("正在识别…").open();
        $("#waveAnim").hide();
    }

    document.getElementById("voiceBtn").removeEventListener('touchstart', onTouchStart);
    document.getElementById("voiceBtn").removeEventListener('touchend', onTouchEnd);
    setTimeout(function () {
        try {
            if (window.localStorage.voiceList == "0") {
                myJavaFun.StopVice();
            }
            else {
                myJavaFun.StopVoice();
            }
        } catch (ex) {
            isVoices = false;
            // $("#voiceMessage").html("无法使用此功能，请下载最新app！");
            voiceTooip("无法使用此功能，请下载最新app！").open();
            document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
            document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
            setTimeout(function () {
                if (isVoices == false) {
                    // $("#voiceMessage").html("按住说话");
                    //voiceTooip("按住说话").open();
                    document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
                    document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
                }
            }, 3000);
        }
    }, 50);
}

//接收回调数据并上传至服务器
function callbackVoiceBuffer(dt) {
    var _url = service + "/VoiceControlByte";
    var _data = "audioData=" + dt + "&&userName=" + window.localStorage.userName;
    ajaxService("post", _url, true, _data, _successf, _error);
    function _successf(data) {
        var rets = $(data).children("string").text();
        if (rets == "") {
            // $("#voiceMessage").html("未识别！");
            voiceTooip("未识别！").open();
        }
        else {
            // $("#voiceMessage").html(rets);
            voiceTooip(rets).open();
        }
        isVoices = false;
        document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
    }
    function _error(qXHR, textStatus, errorThrown) {
        // $("#voiceMessage").html("服务器出错！");
        voiceTooip("服务器出错！").open();
        isVoices = false;
        document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
        setTimeout(function () {
            if (isVoices == false) {
                // $("#voiceMessage").html("按住说话");
                voiceTooip("按住说话").open();
            }
        }, 3000);
    }
}

function StartVoiceXF() {
    try {
        $("#voiceBtn_xf").unbind();
        $("#voiceBtn_xf").addClass("disabled");
        $("#waveAnim_xf").show();
        $("#voiceMessage_xf1").hide();
        $("#voiceMessage_xf2").hide();
        myJavaFun.StartViceXF(parseInt(window.localStorage.XFOffline));
    }
    catch (ex) {
        $("#waveAnim_xf").hide();
        $("#voiceMessage_xf1").html("无法使用此功能！");
        $("#voiceBtn_xf").removeClass("disabled");
        $("#voiceMessage_xf1").show();
        $("#voiceMessage_xf2").html("");
        $("#voiceMessage_xf2").show();
    }
}
function callbackVoiceXFMessage(dt) {
    // $("#voiceMessage").html(dt);
    voiceTooip(dt).open();
    $("#voiceMessage").show();
    $("#waveAnim").hide();
    isVoices = false;
    document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
    document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
}
function callbackVoiceXFData(dt) {
    var _url = service + "/VoiceControlString";
    var _data = "audioData=" + dt + "&&userName=" + window.localStorage.userName;
    ajaxService("post", _url, true, _data, _successf, _error);
    function _successf(data) {
        var rets = $(data).children("string").text();
        if (rets == "") {
            // $("#voiceMessage").html("处理：未识别！");
            voiceTooip("处理：未识别！").open();
        }
        else {
            // $("#voiceMessage").html("处理：" + rets);
            voiceTooip("处理：" + rets).open();
        }
        isVoices = false;
        document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
    }
    function _error(qXHR, textStatus, errorThrown) {
        // $("#voiceMessage").html("服务器出错！");
        voiceTooip("服务器出错！").open();
        isVoices = false;
        document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
        setTimeout(function () {
            if (isVoices == false) {
                // $("#voiceMessage").html("按住说话");
                voiceTooip("按住说话").open();
            }
        }, 3000);
    }
}