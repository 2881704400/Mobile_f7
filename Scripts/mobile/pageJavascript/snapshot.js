var event_Level_list,btnInfoNames = [],btnInfoLevels = [],timeInterval;
function snapshot() {
    switchToolbar("snapshotTool");
    var snapashot_ptr = $$('.snapashot-page-content');
    snapashot_ptr.on("ptr:refresh", refreshpg);
    initData();
}
//获取事件的报警配置
function initData() {
    $.ajax({
        type: 'post',
        url: '/api/event/alarm_config',
        headers: {
            Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
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
                        event_Level_list += btnValue;
                        btnValue = btnValue.substring(0, btnValue.length - 1);
                        btnInfoNames.push(resultData[i].SnapshotName)
                        btnInfoLevels.push(btnValue);
                    }
                }
                event_Level_list = event_Level_list.substring(0, event_Level_list.length - 1);
                getRealTimeEventCount();
                //timeInterval = setInterval(getRealTimeEventCount, 5000);
            }
        }
    });
}
//获取当前实时报警事件的总数
function getRealTimeEventCount() {
    var strBtnInfoLevels = "";
    for (var i = 0; i < btnInfoLevels.length; i++) {
        strBtnInfoLevels += btnInfoLevels[i] + "/";
    }
    if (strBtnInfoLevels.length > 0) {
        strBtnInfoLevels = strBtnInfoLevels.substring(0, strBtnInfoLevels.length - 1);
        $.ajax({
            type: 'post',
            url: '/api/event/real_evt_count',
            headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
            },
            data: {
                levels: strBtnInfoLevels
            },
            success: function(dt) {
                if (dt.HttpStatus == 200 && dt.HttpData.data) {
                    var resultData = dt.HttpData.data;
                    var resultDataArr = resultData.toString().split(",");
                    var strData = "";
                    for (var i = 0; i < resultDataArr.length; i++) {
                        strData += '<li>' + '<a href="/snapShotDetail/?' + btnInfoNames[i] + '&' + btnInfoLevels[i] + '" class="item-link item-content">' + '	<div class="item-media"><i class="iconfont icon-web-cuowu"></i></div>' + '	<div class="item-inner" id="snapShotDetail_0">' + '		<div class="item-title">' + btnInfoNames[i] + '</div>' + '		<div class="item-after"><span class="badge">' + resultDataArr[i] + '</span></div>' + '	</div>' + '</a>' + '</li>';
                    }
                    $("#snapshotMenuListId").html(strData);
                }
            }
        });
    }
}

function refreshpg(e) {
    setTimeout(function() {
        getRealTimeEventCount();
        // 加载完毕需要重置
        myApp.ptr.done();
        myApp.toast.create({
            text: '数据加载成功!',
            position: 'center',
            closeTimeout: 500,
        }).open();
    }, 2000);
}