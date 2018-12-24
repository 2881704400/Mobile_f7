function getJurisdictionData(){
    // 权限管理
    var JurisdictionArray = [];
  $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getJurisdictionData",{async:false})).done(function(n,l){
    let result = n.HttpData;
    if(result.code == 200)
    {
       $.ajax({
            type: "post",
            url: service + "/UserPermissions",
            data: "userName=" + window.localStorage.userName,
            success: function(usersDt) {
                $("#homeContents>ul").html("");
            	getWebUser = $(usersDt).children("UserItem");
                let resultControl = $(usersDt).find("HomePage_List").text().split("\n");
                                        
                resultControl.forEach(function(item_p,index_p) {
                    if(item_p.trim())
                    result.data.forEach(function(item,index){
                     if(item.ClassName && item.ClassName.indexOf("larmCenter.APP") == 1 && item.HelpPath == item_p.trim())
                     { 
                       JurisdictionArray.push(item);
                     }
                   });     
                });
                var html =""; 
                JurisdictionArray.forEach(function(item,index){
                    html +=functionalModule(item.MultiScreens);
                });
                $("#homeContents>ul").append(html);
                // 实现内容添加
                JurisdictionArray.forEach(function(item,index){
                    switch(item.MultiScreens)
                    {
                        case "home_snapShot": snashotData();break;
                        case "home_shortcutFunction": commonlyUsedFun("pptPattern_container ol", "50", pptPattern); commonlyUsedFun("jjPattern_container ol", "50", jjPattern);break;
                        case "home_control_btn": VideoBaner("KOvm_container", "swiper-paginationTrailer-KOvm", KOvm);break;
                        case "home_Commonlyused": commonlyUsedFun("commonlyUsed", "25", commonlyUsed);break;
                        case "": break;
                        default: break;
                    }
                });
            }
        });

    }
  }).fail(function(e){
   console.log(e);
  });
}
function functionalModule(className){
    var html = "";
    switch(className)
    {
        case "home_snapShot":
           html = `<li class="row home_snapShot statisticsTable no-gap">
                        <a class="col-20"><p>0</p>故障</a>
                        <a class="col-20"><p>0</p>警告</a>
                        <a class="col-20"><p>0</p>信息</a>
                        <a class="col-20"><p>0</p>设置</a>
                        <a class="col-20" style="border-right: 0;"><p>0</p>资产</a>
                    </li>`;
        break;
        case "home_shortcutFunction": 
            html = `<li class="row home_shortcutFunction">
               <dl class="functionMenu">
                  <dd class="row">
                      <div class="pptPattern_container col-50">
                            <h3>
                                <span>PPT</span>
                                <label>ppt幻灯片播放</label>
                            </h3>
                            <ol class="row"></ol>
                      </div>
                      <div class="jjPattern_container col-50">
                             <h3>
                                <span>讲解</span>
                                <label>视频讲解</label>
                             </h3>
                             <ol class="row"></ol>
                      </div>                                      
                  </dd>
               </dl>
            </li>`; 
        break;
        case "home_control_btn": 
           html = `<li class="row home_control_btn">
               <dl class="functionMenu">
                  <dd>
                      <div class="swiper-containerTrailer KOvm_container">
                        <div class="swiper-wrapper">
                        </div>
                        <div class="swiper-paginationTrailer swiper-paginationTrailer-KOvm"></div>
                      </div>
                  </dd>
               </dl>
            </li>`;
        break;
        case "home_Commonlyused": 
            html = `<li class="home_Commonlyused">
                <dl class="">
                  <dt></dt>
                  <dd>
                    <ol class="row commonlyUsed">                                   
                    </ol>
                  </dd>
               </dl>
            </li>`;
        break;
        case "": 

        break;
        case "": 

        break;
        default: break;
    }
   return html;
}





//*************************************************
//------------------视频配置 start---------------
//*************************************************
var map, infoPoint = [ //经纬度+设备号+通道号
    [113.960046, 22.535688, 2003, 1],
    [113.922468, 22.497125, 2003, 2]
];


// 常用
var commonlyUsed =[
    {
        name: '列表视频',
        href: '/Video/',
        icon: 'iconfont icon-f7_video',
        equipNo: '',
        setNo: '',
        value: null,
    },
    {
        name: '地图监控',
        href: '/videoControl/',
        icon: 'iconfont icon-f7_control',
        equipNo: '',
        setNo: '',
        value: null,
    },
    {
        name: 'PPT',
        href: '/mettingPPT/',
        icon: 'iconfont icon-f7_ppt',
        equipNo: '',
        setNo: '',
        value: null,
    },
    {
        name: '欢迎词',
        href: '/welcomeWords/',
        icon: 'iconfont icon-f7_welcome',
        equipNo: '',
        setNo: '',
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

//*********************************************
// *************  富士康选择配置   ************
// 1、
// 2、
//*********************************************
var equipCommand =[
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01001',
        className: "equipG01",
        equipNo: '400',
        setNo: '5',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01002',
        className: "equipG02",
        equipNo: '400',
        setNo: '6',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01003',
        className: "equipG03",
        equipNo: '400',
        setNo: '7',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01004',
        className: "equipG04",
        equipNo: '400',
        setNo: '8',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01005',
        className: "equipG05",
        equipNo: '400',
        setNo: '9',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01006',
        className: "equipG06",
        equipNo: '400',
        setNo: '10',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01007',
        className: "equipG07",
        equipNo: '400',
        setNo: '11',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01008',
        className: "equipG08",
        equipNo: '400',
        setNo: '12',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01009',
        className: "equipG09",
        equipNo: '400',
        setNo: '13',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01010',
        className: "equipG10",
        equipNo: '400',
        setNo: '14',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01011',
        className: "equipG11",
        equipNo: '400',
        setNo: '15',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01012',
        className: "equipG12",
        equipNo: '400',
        setNo: '16',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01013',
        className: "equipG13",
        equipNo: '400',
        setNo: '17',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01014',
        className: "equipG14",
        equipNo: '400',
        setNo: '18',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01015',
        className: "equipG15",
        equipNo: '400',
        setNo: '19',
        value_0: ''
     },
    {  
        title:"设备管理",
        name: '日钢成型机 M_G01016',
        className: "equipG16",
        equipNo: '400',
        setNo: '20',
        value_0: ''
     },                                                                      
];

var equipCommandPHM =[
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01001',
        className: "equipG01",
        equipNo: '400',
        setNo: '21',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01002',
        className: "equipG02",
        equipNo: '400',
        setNo: '22',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01003',
        className: "equipG03",
        equipNo: '400',
        setNo: '23',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01004',
        className: "equipG04",
        equipNo: '400',
        setNo: '24',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01005',
        className: "equipG05",
        equipNo: '400',
        setNo: '25',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01006',
        className: "equipG06",
        equipNo: '400',
        setNo: '26',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01007',
        className: "equipG07",
        equipNo: '400',
        setNo: '27',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01008',
        className: "equipG08",
        equipNo: '400',
        setNo: '28',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01009',
        className: "equipG09",
        equipNo: '400',
        setNo: '29',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01010',
        className: "equipG10",
        equipNo: '400',
        setNo: '30',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01011',
        className: "equipG11",
        equipNo: '400',
        setNo: '31',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01012',
        className: "equipG12",
        equipNo: '400',
        setNo: '32',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01013',
        className: "equipG13",
        equipNo: '400',
        setNo: '33',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01014',
        className: "equipG14",
        equipNo: '400',
        setNo: '34',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01015',
        className: "equipG15",
        equipNo: '400',
        setNo: '35',
        value_0: ''
     },
    { 
        title: "PHM管理", 
        name: '日钢成型机 M_G01016',
        className: "equipG16",
        equipNo: '400',
        setNo: '36',
        value_0: ''
     },                                                                      
];