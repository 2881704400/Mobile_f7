
var AlarmCenterContext = {

    projectName: "AlarmCenter",
    //单个设备实时状态
    getYCStatus: function (equipno, ycno) {
        return this.get("/api/DataCenter/YCStatus?equipno="+equipno+"&ycno="+ycno);
    },
     //获取指定设备所有状态
    getAllYCStatus: function (equipno) {
        return this.get("/api/DataCenter/YCStatus?equipno="+equipno)
    },
     //获取设备的当前状态
    getEquipById: function (equipno) {
        return this.get("/api/DataCenter/EquipStatus?equipno="+equipno);
    },
     //设置命令
    setCommand: function (equipno,set_no) {
        return this.post("/api/DataCenter/SetParmControl",{equipno: equipno,set_no: set_no});
    }, 
     //设置命令-需要传值
    setCommandValue: function (equipno,set_no,value) {
        return this.post("/api/DataCenter/SetParmControl",{equipno: equipno,set_no: set_no,value:value});
    },        
    get: function (url, data) {
        var i = $.Deferred();
        $.ajax({
            url: url,
            data: data,
            type: "GET",
            headers: headers,
            // contentType: "application/json; charset=UTF-8",
            dataType: "JSON",
            headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey,
            },             
            timeout: 3e4,
            success: function (e) {
                i.resolveWith(this, [e])
            },
            error: function (e, n) {
                i.rejectWith(this, ["网络异常，请稍候重试"]),
                    console.log(JSON.stringify(e), n)
            }
        });
        return i.promise()
    },
    post: function (url, data) {
        var i = $.Deferred();
        return $.ajax({
            url: url,
            data: data,
            type: "POST",
            dataType: "JSON",
            headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey,
            },              
            // contentType: "application/json;charset=UTF-8",
            timeout: 3e4,
            success: function (e) {
                i.resolveWith(this, [e])
            },
            error: function (e, n) {
                i.rejectWith(this, ["网络异常，请稍候重试"]),
                    console.log(JSON.stringify(e), n)
            }
        }), i.promise();
    }
}

// 示例
// $.when(AlarmCenterContext.getYCStatus(1,1)).done(function(n,l){
//   console.log(n);
// }).fail(function(e){

// });

