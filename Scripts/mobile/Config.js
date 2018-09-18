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
var Purchase_Bar_dataAxis = ['故障', '警告', '信息', '设置', '资产'];
var Purchase_Bar_data = [11, 22, 33, 0, 1];
var Purchase_Bar_yMax = Math.max.apply(null,Purchase_Bar_data)*1.2;
var Purchase_Bar_dataShadow = [];

for (var i = 0; i < Purchase_Bar_data.length; i++) {
    Purchase_Bar_dataShadow.push(Purchase_Bar_yMax);
}

var option = {
    title : {
        text: '',
        subtext: '',
        x:'center',
        textStyle:{
            color: '#fff',
            fontSize: 18,
            fontWeight: 200,

        }, top: '8%'
    },
    grid: {
            top: '5%',
            left: '-5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },          
    xAxis: {
        data: Purchase_Bar_dataAxis,
        axisLabel: {
            inside: false,
            color: 'white',
            textStyle: {
                fontSize: 14,
                color: '#414141'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false, 
            lineStyle:{color: '#fff',width: 1,}    
        },

        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: 'white',
            textStyle: {
                color: '#fff'
            }
        },
        splitLine: {show: false,}
           
    },
    dataZoom: [
        {
            type: 'inside',
            disabled: true,
        }
    ],
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.15)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            barWidth:"40%",
            data: Purchase_Bar_dataShadow,
            animation: false
        },
        {
            type: 'bar',
            barWidth:"40%",
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle:{
                     color: "#414141"
                    }
                }

        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#C2D3FF'},
                        {offset: 0.8, color: '#85a3f3'},
                        {offset: 1, color: '#648EFF'}
                    ]
                )
            },
        },
        data: Purchase_Bar_data
        }
    ]
};
myChart.setOption(option);
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
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            show: false,
            orient: 'vertical',
            x: 'left',
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
                    formatter: "{b} \n {c}个",
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
            color: ['#F8827D', '#A0A0A0', '#98F8AF'],
            data: [{
                    value: 12,
                    name: '报警'
                },
                {
                    value: 11,
                    name: '关闭'
                },
                {
                    value: 107,
                    name: '正常'
                }
            ]
        }]
    };
    myChart.setOption(option);
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
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
            type: 'pie',
            radius: '58%',
            center: ['50%', '55%'],
            clockwise: true,
            legendHoverLink: false,
            silent: true,
            data: [{
                value: 18,
                name: '故障设备'
            }, {
                value: 10,
                name: '正常设备'
            }],
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: "{c}个",
                    /*formatter: function(params) {
                        return params.name+"\n"+params.value
                    },*/
                    textStyle: {
                        color: 'rgb(102,102,102)',
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
                    borderWidth: 4,
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
        }, {
            type: 'pie',
            radius: '58%',
            center: ['50%', '55%'],
            clockwise: true,
            legendHoverLink: false,
            silent: true,
            data: [{
                value: 6,
                name: '故障设备'
            }, {
                value: 22,
                name: '正常设备'
            }],
            label: {
                normal: {
                    show: true,
                    position: 'outside',
                    formatter: "{b}",
                    /*formatter: function(params) {
                        return params.name+"\n"+params.value
                    },*/
                    textStyle: {
                        color: 'rgb(102,102,102)',
                        fontSize: 11,
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false,
                    length: 4,
                    length2: 2,
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 4,
                    borderColor: '#ffffff',
                },
                emphasis: {
                    borderWidth: 0,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            z: 1
        }],
        color: ['#F8827D', '#98F8AF'],
    };
    myChart.setOption(option);
}


// 常用
var commonlyUsed =[
    {
        name: '返回软件',
        icon: '/Image/infor/SetParm.png',
        equipNo: '300',
        setNo: '10',
        value: null,
    },
    {
        name: '欢迎模式',
        icon: '/Image/infor/Info.png',
        equipNo: '300',
        setNo: '10',
        value: null,
    },
    {
        name: '合影模式',
        icon: '/Image/infor/Warn.png',
        equipNo: '300',
        setNo: '10',
        value: null,
    },
    {
        name: '离开模式',
        icon: '/Image/infor/Fatal.png',
        equipNo: '300',
        setNo: '10',
        value: null,
    },                    
    ];

// 列表数据模型
var KOvm =[

    {
        name: '智能建筑',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '2',
        value: null,
    },
    {
        name: '乐从环保首页',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '31',
        value: null,
    },
    {
        name: '乐从河流监测',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '32',
        value: null,
    },
    {
        name: '乐从河流报警',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '33',
        value: null,
    },
    {
        name: '开闸排污',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '34',
        value: null,
    },
    {
        name: '数据中心',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '3',
        value: null,
    },
    {
        name: '智能交通',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '4',
        value: null,
    },
    {
        name: '智能电网',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '11',
        value: null,
    },
    {
        name: '能源系统',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '17',
        value: null,
    },
    {
        name: '智慧监狱',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '18',
        value: null,
    },
    {
        name: '戒毒所模式',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '25',
        value: null,
    },
    {
        name: '智慧城管',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '81',
        value: null,
    },
    {
        name: '智慧公交',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '82',
        value: null,
    },
    {
        name: '城市3D',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '83',
        value: null,
    },
    {
        name: '智慧环保',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '84',
        value: null,
    },
    {
        name: '智慧影院',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '85',
        value: null,
    },
    {
        name: '大数据',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '86',
        value: null,
    },
    {
        name: '智慧电梯',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '92',
        value: null,
    },
    {
        name: '智慧工厂',
        icon: 'iconfont icon-f7_equipList',
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
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '99',
        value: null,
    },  
    {
        name: '城市管控',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '2000',
        value: null,
    },
     {
        name: '智慧照明',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '101',
        value: null,
    },                      
    {
        name: '欢迎词',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '10112',
        value: null,
    },
    {
        name: '消防报警',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '10107',
        value: null,
    },
    {
        name: '消防恢复正常',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '6',
        value: null,
    },
    {
        name: '防区报警',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '10106',
        value: null,
    },
    {
        name: '空调报警',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '10105',
        value: null,
    },
    {
        name: '总部前台监控',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '1005',
        setNo: '1500',
        value: null,
    },
    {
        name: '总部会议室监控',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '1005',
        setNo: '1000',
        value: null,
    },
    {
        name: '展厅监控',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '10096',
        value: null,
    },
    {
        name: '欢迎模式',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '10112',
        value: null,
    },

    {
        name: '小镇现场演示',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '10093',
        value: null,
    }
];



//PPT
var pptPattern =[
    {
        name: '打开PPT',
        icon: '/Image/home/ppt.png',
        equipNo: '300',
        setNo: '7',
        value: null,
    },
    {
        name: '首页',
        icon: '/Image/home/ppt_home.png',
        equipNo: '300',
        setNo: '8',
        value: null,
    },
    {
        name: '上一页',
        icon: '/Image/home/ppt_prev.png',
        equipNo: '1005',
        setNo: '7001',
        value: null,
    },
    {
        name: '下一页',
        icon: '/Image/home/ppt_next.png',
        equipNo: '1005',
        setNo: '7002',
        value: null,
    },                    
    ];

//讲解模式

var jjPattern =[
    {
        name: '开始讲解',
        icon: '/Image/home/jj.png',
        equipNo: '1007',
        setNo: '1',
        value: null,
    },
    {
        name: '停止讲解',
        icon: '/Image/home/stop_1.png',
        equipNo: '1007',
        setNo: '2',
        value: null,
    },
    {
            name: '暂停讲解',
            icon: '/Image/home/stop_0.png',
            equipNo: '1007',
            setNo: '3',
            value: null,
    },
    {
        name: '继续讲解',
        icon: '/Image/home/jx.png',
        equipNo: '300',
        setNo: '10116',
        value: null,
    },                   
    ];
    //