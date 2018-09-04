function videoControl() {
    var myIcon,script;
    // if(!document.getElementById("videoControl_1"))
    //    asyncLoading();
    // else
    //    initBaiduMap();
    // function asyncLoading() 
    // {
    //     script = document.createElement("script");
    //     script.type = "text/javascript";
    //     script.id = "videoControl_1";
    //     script.src = "http://api.map.baidu.com/api?v=2.0&ak=rfoFCQF6wWFKVgnW7M9dihXscceje5cs&callback=initBaiduMap";
    //     document.body.appendChild(script);
    // }
    myIcon = new BMap.Icon("../../Image/Camera.png", new BMap.Size(40, 60));   
    initBaiduMap();
    function initBaiduMap() {
        // myIcon = new BMap.Icon("../../Image/Camera.png", new BMap.Size(40, 60));      
        map = new BMap.Map("container", {
            enableMapClick: false
        });
        for (var i = 0; i < infoPoint.length; i++) {
            map.centerAndZoom(new BMap.Point(infoPoint[i][0], infoPoint[i][1]), 13);
            var top_left_control = new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_TOP_LEFT
            });
            map.addControl(top_left_control);
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.MapTypeControl());
            map.enableScrollWheelZoom(); // 启用滚轮放大缩小。
            map.enableKeyboard(); // 启用键盘操作
            map.disableDoubleClickZoom(); // 禁用双击放大
            AddMarker(infoPoint[i]);
        }
    }
    //添加标注
    function AddMarker(infoPoint) {
        var stringValue = infoPoint[0] + "," + infoPoint[1];
        var marker = new BMap.Marker(StringToPoint(stringValue), {
            icon: myIcon
        });
        marker.addEventListener("click", function() {
            equipVideo(infoPoint[2], infoPoint[3], "");
        }, false);
        map.addOverlay(marker);
    }
}
//处理经纬度数据
function returnFloat(element) {
    return parseFloat(element, 10)
}
//字符串转经纬度
function StringToPoint(Data) {
    var PointData = Data.split(',').map(returnFloat);
    return new BMap.Point(PointData[0], PointData[1]);
}
//字符串转数组
function StringToArray(Data) {
    var PointData = Data.split(',').map(returnFloat);
    return [PointData[0], PointData[1]];
}
//在调用前确保服务可连接
function ConnectService() {
    var ajaxVar = $.ajax({
        type: "POST",
        url: "/GWService.asmx/ConnectService",
        timeout: 5000,
        data: {
            user_name: "admin",
        },
        success: function(data) {
            var dt = $(data).find('string').text();
            GetDataFromSQL();
        },
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') { //超时
                ajaxVar.abort();
                console.log("超时");
                XMLHttpRequest = null;
            }
        },
        error: function() {
            console.log("连接服务器错误");
        }
    });
}
//在调用前请确保数据库中有表以及相应字段和数据
function GetDataFromSQL() {
    $.ajax({
        type: "post",
        url: "/GWService.asmx/GetDataTableFromSQL", //调用数据库接口
        async: false,
        data: {
            sql: "select * from GWWebMapMarker", //SQL语句
            userName: "admin"
        },
        success: function(data) {
            if ($(data).find('shen').length > 0) {
                var markerInfo;
                $(data).find('shen').each(function(i) {
                    markerInfo = new Object();
                    markerInfo.Name = $(this).children('MarkerName').text();
                    markerInfo.LngLat = $(this).children('Position').text();
                    AddMarker(markerInfo);
                })
            } else {
                alert("未找到数据");
            }
        }
    });
}
// *******************************video***************************************
function equipVideo(equip_no, ID, dll) {
    console.log(equip_no + "," + ID + "," + dll);
    var _url = service + "/VideoConfigs";
    var _data = "data=equip";

    function _sccess(data) {
        var result = $$(data).children("string").text();
        if (result != "false") {
            var newRow = "";
            var usera = JSON.parse(result);
            for (var i = 0; i < usera.length; i++) {
                var userb = usera[i];
                var jsonStringParent = JSON.stringify(userb); //111
                if (userb.equip_no == equip_no) {
                    videoListLi(equip_no, ID, dll, jsonStringParent);
                }
            }
        }
    }
    JQajaxo("post", _url, true, _data, _sccess);
}
//添加节点   GW_VideoInfo
function videoListLi(equip_no, ID, dll, jsonStringParent) {
    console.log(2);
    var _url = service + "/VideoConfigs";
    var _data = "data=" + equip_no;

    function _sccess(data) {
        var result = $(data).children("string").text();
        if (result != "false") {
            var usera = JSON.parse(result);
            for (var i = 0; i < usera.length; i++) {
                var userb = usera[i];
                var jsonStringChild = JSON.stringify(userb); //222
                if (userb.ID == ID) videoListClick(jsonStringParent, jsonStringChild, dll);
            }
        }
    }
    JQajaxo("post", _url, true, _data, _sccess);
}
//节点事件
function videoListClick(jsonStringParent, jsonStringChild, dll) {
    if (dll == 'HikYun.NET.dll') {
        var address = '';
        var equip_no = $(dt).attr('equip_no');
        var ids = $(dt).attr('ids');
        var accessToken = $(dt).parent().parent().attr('accessToken');
        var appkey = $(dt).parent().parent().attr('appkey');
        var appsecret = $(dt).parent().parent().attr('appsecret');
        var ChannelType = $(dt).attr('ChannelType');
        var ChannelNum = $(dt).attr('ChannelNum');
        var datas = {
            'accessToken': accessToken,
            'appkey': appkey,
            'appsecret': appsecret,
            'ChannelNum': ChannelNum,
            'ChannelType': ChannelType,
            'cameraName': titleName
        }
        var jsonString = JSON.stringify(datas);
        try {
            myJavaFun.HikYunVideoShow(jsonString);
        } catch (ex) {
            alert('请更新APP客户端或者使用APP客户端打开！');
        }
    }
    if (dll == 'Hik8700.NET.dll') {
        var equip = jsonStringParent;
        var video = jsonStringChild;
        var json = '{"equip":' + equip + ',"video":' + video + '}';
        try {
            myJavaFun.Hik8700VideoShow(json);
        } catch (ex) {
            alert('请更新APP客户端或者使用APP客户端打开！');
        }
    } else {
        var equip = jsonStringParent;
        var video = jsonStringChild;
        var json = '{"equip":' + equip + ',"video":' + video + '}';
        // console.log(json);
        try {
            myJavaFun.VideoShow(json);
        } catch (ex) {
            alert('请更新APP客户端或者使用APP客户端打开！');
        }
    }
}

