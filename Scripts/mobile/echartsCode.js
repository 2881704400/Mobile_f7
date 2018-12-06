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
