//*************************************************
//------------------视频配置 start---------------
//*************************************************
var map, infoPoint = [ //经纬度+设备号+通道号
    [113.960046, 22.535688, 2003, 1],
    [113.922468, 22.497125, 2003, 2]
];
// *************************************************
// ------------------视频配置 end-----------------  Android
// *************************************************
var myJavaFuntion = function() {};
myJavaFuntion.StartVoice = function(a) {
    try {
        window.webkit.messageHandlers.StartVoice.postMessage(a);
    } catch (ex) {
        try {
            myJavaFun.StartVoice(a);
        } catch (ex) {}
    }
};
myJavaFuntion.StopVoice = function() {
    try {
        window.webkit.messageHandlers.StopVoice.postMessage('');
    } catch (ex) {
        try {
            myJavaFun.StopVoice();
        } catch (ex) {
            myJavaFun.StopVoice();
        }
    }
};
myJavaFuntion.StopVice = function() {
    try {
        window.webkit.messageHandlers.StopVice.postMessage('');
    } catch (ex) {
        try {
            myJavaFun.StopVice();
        } catch (ex) {
            myJavaFun.StopVice();
        }
    }
};
myJavaFuntion.StartVice = function() {
    try {
        window.webkit.messageHandlers.StartVice.postMessage('');
    } catch (ex) {
        try {
            myJavaFun.StartVice();
        } catch (ex) {}
    }
};
myJavaFuntion.AppCacheClear = function() {
    try {
        window.webkit.messageHandlers.AppCacheClear.postMessage('');
    } catch (ex) {
        try {
            myJavaFun.AppCacheClear();
        } catch (ex) {}
    }
};
myJavaFuntion.OpenLocalUrl = function(url) {
    try {
        window.webkit.messageHandlers.OpenLocalUrl.postMessage(url);
    } catch (ex) {
        try {
            myJavaFun.OpenLocalUrl(url);
        } catch (ex1) {
            if(window.localStorage.terminal != "Mobile.App")
               window.location.href = "/Views/login.html";
            else
                myApp.dialog.alert("退出登陆异常");
        }
    }
};
myJavaFuntion.AppShare = function(url) {
    try {
        window.webkit.messageHandlers.AppShare.postMessage(url);
    } catch (ex) {
        try {
            myJavaFun.AppShare(url);
        } catch (ex) {}
    }
};
myJavaFuntion.RichScan = function() {
    try {
        window.webkit.messageHandlers.RichScan.postMessage('');
    } catch (ex) {
        try {
            myJavaFun.RichScan();
        } catch (ex) {}
    }
};
myJavaFuntion.AppShare2 = function() {
    try {
        window.webkit.messageHandlers.AppShare2.postMessage('');
    } catch (ex) {}
};
myJavaFuntion.VideoShow = function(json) {
    try {
        window.webkit.messageHandlers.VideoShow.postMessage(json);
    } catch (ex) {
        try {
            myJavaFun.VideoShow(json);
        } catch (ex) {myJavaFun.VideoShow(json);}
    }
};
myJavaFuntion.HikYunVideoShow = function(json) {
    try {
        window.webkit.messageHandlers.HikYunVideoShow.postMessage(json);
    } catch (ex) {
        try {
            myJavaFun.HikYunVideoShow(json);
        } catch (ex) {}
    }
};
myJavaFuntion.Hik8700VideoShow = function(json) {
    try {
        window.webkit.messageHandlers.Hik8700VideoShow.postMessage(json);
    } catch (ex) {}
};
myJavaFuntion.setOrientation = function() {
    try {
        window.webkit.messageHandlers.setOrientation.postMessage('');
    } catch (ex) {}
};
myJavaFuntion.GetCookie = function() {
    try {
        window.webkit.messageHandlers.GetCookie.postMessage('');
    } catch (ex) {}
};
GetCookieCallback = function(cookie) {
    var cookie_json = JSON.parse(cookie);
    window.localStorage.terminal = cookie_json.terminalString;
    window.localStorage.ac_appkey = cookie_json.ac_appkeyString;
    window.localStorage.ac_infokey = cookie_json.ac_infokeyString;
    window.localStorage.service_url = cookie_json.service_urlString;
};
myJavaFuntion.SetCookie = function(cookie) {
    try {
        window.webkit.messageHandlers.SetCookie.postMessage(cookie);
    } catch (ex) {}
};
myJavaFuntion.OpenMapNav = function(url) {
    try {
        window.webkit.messageHandlers.OpenMapNav.postMessage(url);
    } catch (ex) {
        try {
            myJavaFun.OpenMapNav(url);
        } catch (ex) {}
    }
};
myJavaFuntion.OpenApp = function(url) {
    try {
        window.webkit.messageHandlers.OpenApp.postMessage(url);
    } catch (ex) {
        try {
            myJavaFun.OpenApp(url);
        } catch (ex) {}
    }
};

//柱形表
function snapshotChart(id) {
    var myChart = echarts.init(document.getElementById(id));
    function randomData() {

        var now = new Date();//获取当前时间
        xdata.push([now.getHours(),now.getMinutes(),now.getSeconds()].join(":"));
        value =Math.round(50+Math.random()*10-25);
        return {
            name: now.toString(),
            value: value,

        }
    }

    var data = [],xdata =[];
    var now = new Date();
    var oldTime = now.getTime();

    for(var i=0;i<5;i++){
        var newTime = new Date(oldTime+5000*i);
        xdata.push([newTime.getHours(),newTime.getMinutes(),newTime.getSeconds()].join(":")); 
        data.push({name: newTime.toString(),value: 0});
    }

    var option = {
        title: {
            text: ''
        },
        tooltip: {
            
            trigger: 'axis',
            formatter: function (params) {
                var params = params[0];
                return  params.value+"%";
            },
            axisPointer: {
                animation: false
            },
           label: {
               backgroundColor: '#6a7985'
           }        
        },
        legend: {
            data:['设备故障率'],
            right: 0,
        },
        grid: {
            top: '15%',
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
        },    
        xAxis:  [
                {
                    //设置类别
                    type: 'category',
                    //数值起始和结束两端空白策略
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#666',//左边线的颜色
                            width: '1'//坐标线的宽度
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#666'//x轴刻度数值颜色
                        }
                    },
                    data: xdata
                }
        ],
        yAxis: {
            name: '百分比(%)',
            type: 'value',
            // max: 100,
            boundaryGap: [0, '100%'],
            axisLine:{
                show: false,onZero: false
            }, 
            axisTick:{
            show: false,
            },
            // splitLine: {
            //     show: false
            // },
            // axisLabel: {
            //     formatter: '{value}'+'%'
            // }
        },
        series: [{
            name: '设备故障率',
            type: 'line',
            showSymbol: true,
            hoverAnimation: false,
            barWidth : '50%',
            itemStyle : {
                normal : {
                    label: {
                      show: true,
                      position: 'top',
                      textStyle: {
                        color: '#666'
                      }
                   },
                    lineStyle:{
                        width: 1,
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'red' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'red' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    }, 
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#F90A0A' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#F3DEDE' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    },                    
                 },
            },
            symbolSize: 7,      
            data: data
        }]
    };

    setInterval(function () {
        data.push(randomData());
       if(xdata.length>6)
        {
            xdata.shift();
            data.shift();
        }
        
        myChart.setOption({
             xAxis: [
                {
                        type: 'category',
                        boundaryGap: false,
                        data: xdata
                }
                ],
            series: [{

                data: data
            }]
        });
    }, 5000);    
    myChart.setOption(option);
    $(window).resize(function() {
        myChart.resize();
    });
}


//环形图
function equipsChart(id) {
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        title: {
            text: '测点',
            subtext: '391',
            top: 'center',
            left: 'center',
            textStyle: {
                fontSize: 12,
                fontWeight: '100',
                color: '#414141' // 主标题文字颜色
            },
            subtextStyle: {
                fontSize: 12,
                fontWeight: '100',
                color: '#414141' // 主标题文字颜色
            },
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['正常测点','报警测点']
        },        
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [{
            name: '',
            type: 'pie',
            radius: ['42%', '58%'],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            legendHoverLink: false,
            silent: true,
            label: {
                normal: {
                    show: true,
                    position: 'outside',
                    formatter: "{c}",
                    textStyle: {
                        color: 'rgb(102,102,102)',
                        fontSize: 11,
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 2,
                    borderColor: '#ffffff',
                }
            },
            labelLine: {
                normal: {
                    show: false,
                    length: 10,
                    length2: 0,
                }
            },
            color: ['#FB7C8A', '#91C7AE'],
            data: [{
                    value: 12,
                    name: '报警测点'
                },
                {
                    value: 107,
                    name: '正常测点'
                }
            ]
        }]
    };
    myChart.setOption(option);
        $(window).resize(function() {
        myChart.resize();
    });
}


//圆饼图
function ycpChart(id, sumnum) {
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        title: {
            text: '',
            bottom: '10',
            left: 'center',
            textStyle: {
                fontSize: 12,
                fontWeight: '400',
                color: 'rgb(102,102,102)' // 主标题文字颜色
            },

        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['连接设备','未连设备']
        },         
        // tooltip: {
        //     show: false,
        //     trigger: 'item',
        //     formatter: "{a} <br/>{b} : {c} ({d}%)"
        // },
        series: [{
            type: 'pie',
            radius: '58%',
            center: ['50%', '55%'],
            clockwise: true,
            legendHoverLink: false,
            silent: true,
            data: [{
                value: 111,
                name: '连接设备'
            }, {
                value: 40,
                name: '未连设备'
            }],
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: "{c}",
                    /*formatter: function(params) {
                        return params.name+"\n"+params.value
                    },*/
                    textStyle: {
                        color: 'white',
                        fontSize: 12,
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false,
                    length: 0,
                    length2: 2,
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 2,
                    borderColor: '#ffffff',
                },
                emphasis: {
                    borderWidth: 0,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            z: 2
        }],
        color: ['#91C7AE', '#ccc'],
    };
    myChart.setOption(option);
        $(window).resize(function() {
        myChart.resize();
    });
}


// 常用
var commonlyUsed =[
    {
        name: '列表视频',
        href: '/Video/',
        icon: 'iconfont icon-f7_video',
        equipNo: '300',
        setNo: '10',
        value: null,
    },
    {
        name: '地图监控',
        href: '/videoControl/',
        icon: 'iconfont icon-f7_control',
        equipNo: '300',
        setNo: '10',
        value: null,
    },
    {
        name: 'PPT',
        href: '/mettingPPT/',
        icon: 'iconfont icon-f7_ppt',
        equipNo: '300',
        setNo: '10',
        value: null,
    },
    {
        name: '欢迎词',
        href: '/welcomeWords/',
        icon: 'iconfont icon-f7_welcome',
        equipNo: '300',
        setNo: '10',
        value: null,
    },                    
    ];

// 列表数据模型
var KOvm =[

    {
        name: '智能建筑',
        icon: 'iconfont icon-f7_icon_jz',
        equipNo: '300',
        setNo: '2',
        value: null,
    },
    {
        name: '乐从环保首页',
        icon: 'iconfont icon-f7_icon_hb',
        equipNo: '300',
        setNo: '31',
        value: null,
    },
    {
        name: '乐从河流监测',
        icon: 'iconfont icon-f7_icon_hl',
        equipNo: '300',
        setNo: '32',
        value: null,
    },
    {
        name: '乐从河流报警',
        icon: 'iconfont icon-f7_icon_bj',
        equipNo: '300',
        setNo: '33',
        value: null,
    },
    {
        name: '开闸排污',
        icon: 'iconfont icon-f7_icon_pw',
        equipNo: '300',
        setNo: '34',
        value: null,
    },
    {
        name: '数据中心',
        icon: 'iconfont icon-f7_icon_dj',
        equipNo: '300',
        setNo: '3',
        value: null,
    },
    {
        name: '智能交通',
        icon: 'iconfont icon-f7_icon_jt',
        equipNo: '300',
        setNo: '4',
        value: null,
    },
    {
        name: '智能电网',
        icon: 'iconfont icon-f7_icon_dw',
        equipNo: '300',
        setNo: '11',
        value: null,
    },
    {
        name: '能源系统',
        icon: 'iconfont icon-f7_icon_dsj1',
        equipNo: '300',
        setNo: '17',
        value: null,
    },
    {
        name: '智慧监狱',
        icon: 'iconfont icon-f7_icon_jy',
        equipNo: '300',
        setNo: '18',
        value: null,
    },
    {
        name: '戒毒所模式',
        icon: 'iconfont icon-f7_icon_jd',
        equipNo: '300',
        setNo: '25',
        value: null,
    },
    {
        name: '智慧城管',
        icon: 'iconfont icon-f7_icon_cg',
        equipNo: '300',
        setNo: '81',
        value: null,
    },
    {
        name: '智慧公交',
        icon: 'iconfont icon-f7_icon_gj',
        equipNo: '300',
        setNo: '82',
        value: null,
    },
    {
        name: '城市3D',
        icon: 'iconfont icon-f7_icon_3d3d',
        equipNo: '300',
        setNo: '83',
        value: null,
    },
    {
        name: '智慧环保',
        icon: 'iconfont icon-f7_icon_hbxx',
        equipNo: '300',
        setNo: '84',
        value: null,
    },
    {
        name: '智慧影院',
        icon: 'iconfont icon-f7_icon_3d',
        equipNo: '300',
        setNo: '85',
        value: null,
    },
    {
        name: '大数据',
        icon: 'iconfont icon-f7_icon_dj',
        equipNo: '300',
        setNo: '86',
        value: null,
    },
    {
        name: '智慧电梯',
        icon: 'iconfont icon-f7_icon_dt',
        equipNo: '300',
        setNo: '92',
        value: null,
    },
    {
        name: '智慧工厂',
        icon: 'iconfont icon-f7_icon_xz',
        equipNo: '300',
        setNo: '100',
        value: null,
    },
    {
        name: '智慧小镇',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '98',
        value: null,
    },  
    {
        name: '智慧城市',
        icon: 'iconfont icon-f7_icon_xz',
        equipNo: '300',
        setNo: '99',
        value: null,
    },  
    {
        name: '城市管控',
        icon: 'iconfont icon-f7_icon_gk',
        equipNo: '300',
        setNo: '2000',
        value: null,
    },
     {
        name: '智慧照明',
        icon: 'iconfont icon-f7_icon_zm',
        equipNo: '300',
        setNo: '101',
        value: null,
    },                      
    {
        name: '欢迎词',
        icon: 'iconfont icon-f7_welcome',
        equipNo: '300',
        setNo: '10112',
        value: null,
    },
    {
        name: '消防报警',
        icon: 'iconfont icon-f7_icon_xf',
        equipNo: '300',
        setNo: '10107',
        value: null,
    },
    {
        name: '消防恢复正常',
        icon: 'iconfont icon-f7_icon_hf',
        equipNo: '300',
        setNo: '6',
        value: null,
    },
    {
        name: '防区报警',
        icon: 'iconfont icon-f7_icon_fq',
        equipNo: '300',
        setNo: '10106',
        value: null,
    },
    {
        name: '空调报警',
        icon: 'iconfont icon-f7_icon_kt',
        equipNo: '300',
        setNo: '10105',
        value: null,
    },
    {
        name: '总部前台监控',
        icon: 'iconfont icon-f7_icon_jk',
        equipNo: '1005',
        setNo: '1500',
        value: null,
    },
    {
        name: '总部会议室监控',
        icon: 'iconfont icon-f7_icon_hys',
        equipNo: '1005',
        setNo: '1000',
        value: null,
    },
    {
        name: '展厅监控',
        icon: 'iconfont icon-f7_icon_jk',
        equipNo: '300',
        setNo: '10096',
        value: null,
    },
    {
        name: '欢迎模式',
        icon: 'iconfont icon-f7_icon_xf',
        equipNo: '300',
        setNo: '10112',
        value: null,
    },

    {
        name: '小镇现场演示',
        icon: 'iconfont icon-f7_icon_xz',
        equipNo: '300',
        setNo: '10093',
        value: null,
    }
];



//PPT
var pptPattern =[
    {
        name: '打开PPT',
        icon: 'iconfont icon-f7_ppt',
        equipNo: '300',
        setNo: '7',
        value: null,
    },
    {
        name: '关闭',
        icon: 'iconfont icon-f7_c_l',
        equipNo: '300',
        setNo: '8',
        value: null,
    },
    {
        name: '上一页',
        icon: 'iconfont icon-f7_prev',
        equipNo: '1005',
        setNo: '7001',
        value: null,
    },
    {
        name: '下一页',
        icon: 'iconfont icon-f7_next',
        equipNo: '1005',
        setNo: '7002',
        value: null,
    },                    
    ];

//讲解模式

var jjPattern =[
    {
        name: '开始讲解',
        icon: 'iconfont icon-f7_jj',
        equipNo: '1007',
        setNo: '1',
        value: null,
    },
    {
        name: '停止讲解',
        icon: 'iconfont icon-f7_s_t',
        equipNo: '1007',
        setNo: '2',
        value: null,
    },
    {
            name: '暂停讲解',
            icon: 'iconfont icon-f7_stop_0',
            equipNo: '1007',
            setNo: '3',
            value: null,
    },
    {
        name: '继续讲解',
        icon: 'iconfont icon-f7_j_x',
        equipNo: '300',
        setNo: '10116',
        value: null,
    },                   
    ];

//*********************************************
// ***************  欢迎词配置   ***************
//*********************************************
var WORDcommand ={
    "backgroundImage":{  
        name: '背景图片',
        url: 'D:\\AlarmCenter\\Web\\BGImages',  //注意，图片路径以localhost读取,如果设置路径和文件路径不一致，可能导致出显示取错误
     },
     "Priviewwel":{
        name: '预览欢迎词',
        equipNo: '1005',
        setNo: '4022'        
     },
     "closewel":{
        name:"关闭欢迎词",
        equipNo: '1005',
        setNo: '4021'        
     },     
};

//*********************************************
// ***************  PPT配置   *****************
// 1、盘符读取路径为D:\PPT，在Web.config中
// 2、
//*********************************************
var PPTcommand ={
    "returnSoft":{  
        name: '返回软件',
        equipNo: '300',
        setNo: '10'
     },
     "openPPT":{
        name: '打开PPT',
        equipNo: '4001',
        setNo: '1'        
     },
     "closePPT":{
        name:"关闭PPT",
        equipNo: '4001',
        setNo: '7'        
     },     
     "setIp":{
        name: '设置插件IP',
        set_ip: window.localStorage.service_url,    //设置为固定IP，则为  '192.168.0.165'  样式   
     },
     "setPage":{
        name:"设置跳页",
        equipNo: '4001',
        setNo: '4'        
     },
};