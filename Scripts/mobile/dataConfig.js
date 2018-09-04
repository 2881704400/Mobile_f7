//*********************************************
// ***************首页列表配置******************
//*********************************************
var KOvm =[
    {
        name: '返回软件',
        equipNo: '300',
        setNo: '10'
    },
    {
        name: '智能建筑',
        equipNo: '300',
        setNo: '2'
    },
    {
        name: '数据中心',
        equipNo: '300',
        setNo: '3'
    },
    {
        name: '智能交通',
        equipNo: '300',
        setNo: '4'
    },
    {
        name: '打开PPT',
        equipNo: '300',
        setNo: '7'
    },
    {
        name: 'PPT首页',
        equipNo: '1005',
        setNo: '6008'
    },
    {
        name: 'PPT上一页',
        equipNo: '1005',
        setNo: '7001'
    },
    {
        name: 'PPT下一页',
        equipNo: '1005',
        setNo: '7002'
    },
    {
        name: '智能电网',
        equipNo: '300',
        setNo: '11'
    },
    {
        name: '能源系统',
        equipNo: '300',
        setNo: '17'
    },
    {
        name: '智慧监狱',
        equipNo: '300',
        setNo: '18'
    },
    {
        name: '戒毒所模式',
        equipNo: '300',
        setNo: '25'
    },
    {
        name: '智慧城管',
        equipNo: '300',
        setNo: '81'
    },
    {
        name: '智慧公交',
        equipNo: '300',
        setNo: '82'
    },
    {
        name: '城市3D',
        equipNo: '1005',
        setNo: '1412'
    },
    {
        name: '智慧环保',
        equipNo: '300',
        setNo: '84'
    },
    {
        name: '智慧影院',
        equipNo: '300',
        setNo: '85'
    },
    {
        name: '大数据',
        equipNo: '300',
        setNo: '86'
    },
    {
        name: '智慧电梯',
        equipNo: '300',
        setNo: '92'
    },
    {
        name: '智慧小镇',
        equipNo: '300',
        setNo: '98'
    },  
    {
        name: '智慧城市',
        equipNo: '300',
        setNo: '99'
    },
    {
        name: '智慧工厂',
        equipNo: '300',
        setNo: '100'
    },                                         
    {
        name: '停车场',
        equipNo: '300',
        setNo: '87'
    },
    {
        name: '定位找车',
        equipNo: '300',
        setNo: '10078'
    },
    {
        name: '定位36990',
        equipNo: '300',
        setNo: '90'
    },
    {
        name: '定位58019',
        equipNo: '300',
        setNo: '89'
    },
    {
        name: '灯光全开',
        equipNo: '300',
        setNo: '15'
    },
    {
        name: '灯光全关',
        equipNo: '300',
        setNo: '14'
    },
    {
        name: '欢迎词',
        equipNo: '300',
        setNo: '10112'
    },
    {
        name: '消防报警',
        equipNo: '300',
        setNo: '10107'
    },
    {
        name: '消防恢复正常',
        equipNo: '300',
        setNo: '6'
    },
    {
        name: '防区报警',
        equipNo: '300',
        setNo: '10106'
    },
    {
        name: '空调报警',
        equipNo: '300',
        setNo: '10105'
    },
    {
        name: '总部前台监控',
        equipNo: '1005',
        setNo: '1500'
    },
    {
        name: '总部会议室监控',
        equipNo: '1005',
        setNo: '1000'
    },
    {
        name: '展厅监控',
        equipNo: '300',
        setNo: '10096'
    },
    {
        name: '欢迎模式',
        equipNo: '300',
        setNo: '10112'
    },
    {
        name: '开始讲解',
        equipNo: '1007',
        setNo: '1'
    },
    {
        name: '停止讲解',
        equipNo: '1007',
        setNo: '2'
    },
{
        name: '暂停讲解',
        equipNo: '1007',
        setNo: '3'
    },
{
        name: '继续讲解',
        equipNo: '300',
        setNo: '10115'
    },
    {
        name: '小镇现场演示',
        equipNo: '300',
        setNo: '10093'
    },
    {
        name: '小镇宣传片',
        equipNo: '300',
        setNo: '10094'
    }
];
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