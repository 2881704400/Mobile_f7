function getJurisdictionData(){
    myApp.dialog.progress((window.localStorage.languageList == 1?'<a style="font-size: 1rem">Loading...</a>':'<a style="font-size: 1rem">加载中...</a>'));
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
                 myApp.dialog.close();
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
                        case "home_sysMenu": commonlyUsedFun("sysFourMenu", "25", sysFourMenu);break;
                        default: break;
                    }
                });
            }
        });
    }
  }).fail(function(e){
      // myApp.router.navigate("/home/"); 
  });
}
function functionalModule(className){
    var html = "";
    switch(className)
    {
        case "home_snapShot":
           html = `<li class="row home_snapShot statisticsTable no-gap">
                        <a class="col-20"><p>0</p>${window.localStorage.languageList == 1?"fault":"故障"}</a>
                        <a class="col-20"><p>0</p>${window.localStorage.languageList == 1?"warning":"警告"}</a>
                        <a class="col-20"><p>0</p>${window.localStorage.languageList == 1?"information":"信息"}</a>
                        <a class="col-20"><p>0</p>${window.localStorage.languageList == 1?"Setup":"设置"}</a>
                        <a class="col-20" style="border-right: 0;"><p>0</p>${window.localStorage.languageList == 1?"Assets":"资产"}</a>
                    </li>`;
        break;
        case "home_shortcutFunction": 
            html = `<li class="row home_shortcutFunction">
               <dl class="functionMenu">
                  <dd class="row">
                      <div class="pptPattern_container col-50">
                            <h3>
                                <span>PPT</span>
                                <label>${window.localStorage.languageList == 1?"PPT Slide Play":"ppt幻灯片播放"}</label>
                            </h3>
                            <ol class="row"></ol>
                      </div>
                      <div class="jjPattern_container col-50">
                             <h3>
                                <span>${window.localStorage.languageList == 1?"explain":"讲解"}</span>
                                <label>${window.localStorage.languageList == 1?"Video Explanation":"视频讲解"}</label>
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
                      <div class="swiper-containerTrailer KOvm_container swiper-init swiper-container" data-space-between="50" >
                        <div class="swiper-paginationTrailer swiper-paginationTrailer-KOvm swiper-pagination"></div>
                        <div class="swiper-wrapper" style="margin-bottom: 5%;"></div>
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
        case "home_sysMenu": 
			html = `<li class="home_Commonlyused">
                <dl class="">
                  <dt></dt>
                  <dd>
                    <ol class="row sysFourMenu">                                   
                    </ol>
                  </dd>
               </dl>
            </li>`;
        break;
        case "": 

        break;
        default: break;
    }
   return html;
}

// 地图视频配置
var map, infoPoint = [ //经纬度+设备号+通道号
    [113.960046, 22.535688, 20005, 2],
    [113.922468, 22.497125, 20005, 1]
];

// 系统四菜单 
var sysFourMenu =[
    {
        name: '事件查询',
        name_en: 'Event query',
        href_zh: '/eventSearch/',
        href_en: '/mobile-en/eventSearch_en/',
<<<<<<< HEAD
        color: '#4284FE,#2e57a2',
=======
        color: '#4284FE,#4284FE',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-xintubiao-',
        equipNo: '',
        setNo: '',
        value: null,
    },
    {
        name: '系统配置',
        name_en: 'system configuration',
        href_zh: '/equipConfigList/',
        href_en: '/mobile-en/equipConfigList_en/',
<<<<<<< HEAD
        color: '#e499b1,#FF4582',
=======
        color: '#FF4582,#FF4582',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-navicon-xtpz',
        equipNo: '',
        setNo: '',
        value: null,
    },
    {
        name: '报警排表',
        name_en: 'Alarm schedule',
        href_zh: '/schedule/',
        href_en: '/mobile-en/schedule_en/',
<<<<<<< HEAD
        color: '#dc9597,#e23037',
=======
        color: '#FF4F55,#FF4F55',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-paibiao',
        equipNo: '',
        setNo: '',
        value: null,
    },
    {
        name: '设备联动',
        name_en: 'Equipment linkage',
        href_zh: '/equipLinkage/',
        href_en: '/mobile-en/equipLinkage_en/',
<<<<<<< HEAD
        color: '#7a9ae0,#3464ca',
=======
        color: '#3961B6,#3961B6',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-app_icons--',
        equipNo: '',
        setNo: '',
        value: null,
    },                    
];

// 常用
var commonlyUsed =[
    {
        name: '列表视频',
        name_en: 'List video',
        href_zh: '/Video/',
        href_en: '/mobile-en/Video_en/',
<<<<<<< HEAD
        color: '#ecdaa5,#d8ac31',
=======
        color: '#FFBC01,#FFBC01',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-f7_video',
        equipNo: '',
        setNo: '',
        value: null,
    },
    {
        name: '地图监控',
        name_en: 'Map monitoring',
        href_zh: '/videoControl/',
        href_en: '/mobile-en/videoControl_en/',
<<<<<<< HEAD
        color: '#81d1f3,#62D1FF',
=======
        color: '#62D1FF,#62D1FF',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-f7_control',
        equipNo: '',
        setNo: '',
        value: null,
    },
    {
        name: 'PPT',
        name_en: 'PPT',
        href_zh: '/mettingPPT/',
        href_en: '/mobile-en/mettingPPT_en/',
<<<<<<< HEAD
        color: '#c695e6,#5d3477',
=======
        color: '#8354A2,#8354A2',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-f7_ppt',
        equipNo: '',
        setNo: '',
        value: null,
    },
    {
        name: '欢迎词',
        name_en: 'Welcome speech',
        href_zh: '/welcomeWords/',
        href_en: '/mobile-en/welcomeWords_en/',
<<<<<<< HEAD
        color: '#e0a8bb,#F53173',
=======
        color: '#F53173,#F53173',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-f7_welcome',
        equipNo: '',
        setNo: '',
        value: null,
    },                    
];

// 列表数据模型
var KOvm =[
    {
        name: '返回软件',
        name_en: 'Return software',
        icon: 'iconfont icon-f7_home',
        equipNo: '300',
        setNo: '10',
<<<<<<< HEAD
        color: '#8bc3ef,#3c81b7',
=======
        color: '#6db0e4,#065ea2',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '智能建筑',
        name_en: 'Intelligent building',
        icon: 'iconfont icon-f7_icon_jz',
        equipNo: '300',
        setNo: '2',
<<<<<<< HEAD
        color: '#d49ca8,#f50538',
=======
        color: '#DB5874,#DB5874',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '乐从环保首页',
        name_en: 'Lecong environmental protection',
        icon: 'iconfont icon-f7_icon_hb',
        equipNo: '300',
        setNo: '31',
<<<<<<< HEAD
        color: '#d7b1ea,#a40df3',
=======
        color: '#BC7ADE,#BC7ADE',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '乐从河流监测',
        name_en: 'Lecong River Monitoring',
        icon: 'iconfont icon-f7_icon_hl',
        equipNo: '300',
        setNo: '32',
<<<<<<< HEAD
        color: '#96d2e6,#00BAF9',
=======
        color: '#00BAF9,#00BAF9',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '乐从河流报警',
        name_en: 'Lecong River Alarm',
        icon: 'iconfont icon-f7_icon_bj',
        equipNo: '300',
        setNo: '33',
<<<<<<< HEAD
        color: '#f5999e,#F22834',
=======
        color: '#F22834,#F22834',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '开闸排污',
        name_en: 'Sluice discharge',
        icon: 'iconfont icon-f7_icon_pw',
        equipNo: '300',
        setNo: '34',
<<<<<<< HEAD
        color: '#f1d499,#f3ac1e',
=======
        color: '#FAB427,#FAB427',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '数据中心',
        name_en: 'Data center',
        icon: 'iconfont icon-f7_icon_dj',
        equipNo: '300',
        setNo: '3',
<<<<<<< HEAD
        color: '#eca7a0,#FC6758',
=======
        color: '#FC6758,#FC6758',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '智能交通',
        name_en: 'Intelligent Transportation',
        icon: 'iconfont icon-f7_icon_jt',
        equipNo: '300',
        setNo: '4',
<<<<<<< HEAD
        color: '#b8e29d,#55a91f',
=======
        color: '#73DC30,#73DC30',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '智能电网',
        name_en: 'Smart grid',
        icon: 'iconfont icon-f7_icon_dw',
        equipNo: '300',
        setNo: '11',
<<<<<<< HEAD
        color: '#efd29c,#e29b12',
=======
        color: '#ECB752,#ECB752',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '能源系统',
        name_en: 'energy system',
        icon: 'iconfont icon-f7_icon_dsj1',
        equipNo: '300',
        setNo: '17',
<<<<<<< HEAD
        color: '#d0f3b2,#6cde08',
=======
        color: '#2C3D1D,#2C3D1D',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '智慧监狱',
        name_en: 'Wisdom prison',
        icon: 'iconfont icon-f7_icon_jy',
        equipNo: '300',
        setNo: '18',
<<<<<<< HEAD
        color: '#a6dbe0,#22bbca',
=======
        color: '#03B8C9,#03B8C9',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '戒毒所模式',
        name_en: 'Drug Rehabilitation Center Model',
        icon: 'iconfont icon-f7_icon_jd',
        equipNo: '300',
        setNo: '25',
<<<<<<< HEAD
        color: '#ecd5a7,#FBB730',
=======
        color: '#FBB730,#FBB730',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '智慧城管',
        name_en: 'Smart City Administration',
        icon: 'iconfont icon-f7_icon_cg',
        equipNo: '300',
        setNo: '81',
<<<<<<< HEAD
        color: '#bacea3,#7cbd31',
=======
        color: '#96D054,#96D054',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '智慧公交',
        name_en: 'Smart bus',
        icon: 'iconfont icon-f7_icon_gj',
        equipNo: '300',
        setNo: '82',
<<<<<<< HEAD
        color: '#a6f1ed,#16cdea',
=======
        color: '#6BD61F,#6BD61F',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '城市3D',
        name_en: 'City 3D',
        icon: 'iconfont icon-f7_icon_3d3d',
        equipNo: '300',
        setNo: '83',
<<<<<<< HEAD
        color: '#e09c96,#e81c08',
=======
        color: '#F66B5D,#F66B5D',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '智慧环保',
        name_en: 'Wisdom and environmental protection',
        icon: 'iconfont icon-f7_icon_hbxx',
        equipNo: '300',
        setNo: '84',
<<<<<<< HEAD
        color: '#ecdc93,#e8c118',
=======
        color: '#DEBF39,#DEBF39',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '智慧影院',
        name_en: 'Smart cinema',
        icon: 'iconfont icon-f7_icon_3d',
        equipNo: '300',
        setNo: '85',
<<<<<<< HEAD
        color: '#eaafc5,#FE2F7D',
=======
        color: '#FE2F7D,#FE2F7D',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '大数据',
        name_en: 'Big data',
        icon: 'iconfont icon-f7_icon_dj',
        equipNo: '300',
        setNo: '86',
<<<<<<< HEAD
        color: '#a4cce8,#1095f3',
=======
        color: '#0294FB,#0294FB',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '智慧电梯',
        name_en: 'Intelligent elevator',
        icon: 'iconfont icon-f7_icon_dt',
        equipNo: '300',
        setNo: '92',
<<<<<<< HEAD
        color: '#de98aa,#e00f44',
=======
        color: '#F84371,#F84371',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '智慧工厂',
        name_en: 'Smart factory',
        icon: 'iconfont icon-f7_icon_xz',
        equipNo: '300',
        setNo: '100',
<<<<<<< HEAD
        color: '#9fd9de,#03B8C9',
=======
        color: '#03B8C9,#03B8C9',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '智慧小镇',
        name_en: 'Smart Town',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '98',
<<<<<<< HEAD
        color: '#ec9da6,#ec263c',
=======
        color: '#F24F61,#F24F61',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },  
    {
        name: '智慧城市',
        name_en: 'Smart city',
        icon: 'iconfont icon-f7_icon_xz',
        equipNo: '300',
        setNo: '99',
<<<<<<< HEAD
        color: '#d3b4ea,#9e2aea',
=======
        color: '#B363E8,#B363E8',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },  
    {
        name: '城市管控',
        name_en: 'City management and control',
        icon: 'iconfont icon-f7_icon_gk',
        equipNo: '300',
        setNo: '2000',
<<<<<<< HEAD
        color: '#e8cea1,#FBB132',
=======
        color: '#FBB132,#FBB132',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
     {
        name: '智慧照明',
        name_en: 'Intelligent lighting',
        icon: 'iconfont icon-f7_icon_zm',
        equipNo: '300',
        setNo: '101',
<<<<<<< HEAD
        color: '#98b3ec,#0a52ea',
=======
        color: '#3961B6,#3961B6',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },                      
    {
        name: '欢迎词',
        name_en: 'Welcome speech',
        icon: 'iconfont icon-f7_welcome',
        equipNo: '300',
        setNo: '10112',
<<<<<<< HEAD
        color: '#86bfe8,#2093e8',
=======
        color: '#399AE0,#399AE0',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '消防报警',
        name_en: 'Fire alarm',
        icon: 'iconfont icon-f7_icon_xf',
        equipNo: '300',
        setNo: '10107',
<<<<<<< HEAD
        color: '#8ed5ec,#0baee4',
=======
        color: '#46B5DA,#46B5DA',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '消防恢复正常',
        name_en: 'Fire Protection returned to normal',
        icon: 'iconfont icon-f7_icon_hf',
        equipNo: '300',
        setNo: '6',
<<<<<<< HEAD
        color: '#b5a1ec,#460de0',
=======
        color: '#7746FC,#7746FC',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '防区报警',
        name_en: 'Defense alarm',
        icon: 'iconfont icon-f7_icon_fq',
        equipNo: '300',
        setNo: '10106',
<<<<<<< HEAD
        color: '#23407d,#3961B6',
=======
        color: '#3961B6,#3961B6',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '空调报警',
        name_en: 'Air conditioning alarm',
        icon: 'iconfont icon-f7_icon_kt',
        equipNo: '300',
        setNo: '10105',
<<<<<<< HEAD
        color: '#dec9a8,#FCB540',
=======
        color: '#FCB540,#FCB540',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '总部前台监控',
        name_en: 'Headquarters Front Desk Monitoring',
        icon: 'iconfont icon-f7_icon_jk',
        equipNo: '1005',
        setNo: '1500',
<<<<<<< HEAD
        color: '#d3f3b5,#82d632',
=======
        color: '#7FD929,#7FD929',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '总部会议室监控',
        name_en: 'Headquarters conference room monitoring',
        icon: 'iconfont icon-f7_icon_hys',
        equipNo: '1005',
        setNo: '1000',
<<<<<<< HEAD
        color: '#e99bef,#e420d5',
=======
        color: '#3961B6,#3961B6',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '展厅监控',
        name_en: 'Exhibition hall monitoring',
        icon: 'iconfont icon-f7_icon_jk',
        equipNo: '300',
        setNo: '10096',
<<<<<<< HEAD
        color: '#f1c7a4,#ea7815',
=======
        color: '#80D831,#80D831',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '欢迎模式',
        name_en: 'Welcome mode',
        icon: 'iconfont icon-f7_icon_xf',
        equipNo: '300',
        setNo: '10112',
<<<<<<< HEAD
        color: '#93aeea,#1b60f1',
=======
        color: '#3961B6,#3961B6',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
    {
        name: '小镇现场演示',
        name_en: 'Town Live Demonstration',
        icon: 'iconfont icon-f7_icon_xz',
        equipNo: '300',
        setNo: '10093',
<<<<<<< HEAD
        color: '#a2d3e4,#12afe8',
=======
        color: '#0BBAFA,#0BBAFA',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        value: null,
    },
];



//首页PPT
var pptPattern =[
    {
        name: '打开PPT',
        name_en: 'Open PPT',
<<<<<<< HEAD
        color: '#9cd5ea,#1892bd',
=======
        color: '#0BBAFA,#0BBAFA',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-f7_ppt',
        equipNo: '4001',
        setNo: '1',
        value: 'D:\/PPT\/123.pptx',
    },
    {
        name: '关闭',
        name_en: 'Close PPT',
<<<<<<< HEAD
         color: '#9cd5ea,#1892bd',
=======
         color: '#0BBAFA,#0BBAFA',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-f7_c_l',
        equipNo: '4001',
        setNo: '7',
        value: null,
    },
    {
        name: '上一页',
        name_en: 'Previous page',
<<<<<<< HEAD
         color: '#9cd5ea,#1892bd',
=======
         color: '#0BBAFA,#0BBAFA',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-f7_prev',
        equipNo: '4001',
        setNo: '2',
        value: null,
    },
    {
        name: '下一页',
        name_en: 'Next page',
<<<<<<< HEAD
         color: '#9cd5ea,#1892bd',
=======
         color: '#0BBAFA,#0BBAFA',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-f7_next',
        equipNo: '4001',
        setNo: '3',
        value: null,
    },                    
    ];

//讲解模式
var jjPattern =[
    {
        name: '开始讲解',
        name_en: 'explain',
<<<<<<< HEAD
        color: '#e4c586,#e89e08',
=======
        color: '#FAB427,#FAB427',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-f7_jj',
        equipNo: '1007',
        setNo: '1',
        value: null,
    },
    {
        name: '停止讲解',
        name_en: 'Stop',
<<<<<<< HEAD
        color: '#e4c586,#e89e08',
=======
        color: '#FAB427,#FAB427',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-f7_s_t',
        equipNo: '1007',
        setNo: '2',
        value: null,
    },
    {
        name: '暂停讲解',
        name_en: 'suspend',
<<<<<<< HEAD
        color: '#e4c586,#e89e08',
=======
        color: '#FAB427,#FAB427',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-f7_stop_0',
        equipNo: '1007',
        setNo: '3',
        value: null,
    },
    {
        name: '继续讲解',
        name_en: 'Continue',
<<<<<<< HEAD
        color: '#e4c586,#e89e08',
=======
        color: '#FAB427,#FAB427',
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
        icon: 'iconfont icon-f7_j_x',
        equipNo: '1007',
        setNo: '4',
        value: null,
    },                   
    ];

// 欢迎词
var WORDcommand ={
    "backgroundImage":{  
        name: '背景图片',
        name_en: 'Background picture',
<<<<<<< HEAD
        url: 'D:\\AlarmCenter\\ganwei_mobile_f7\\Image\\bg',  //注意，图片路径以localhost读取,如果设置路径和文件路径不一致，可能导致出显示取错误
=======
        url: 'D:\\AlarmCenter\\AlarmCenterWeb2.0\\BGImages',  //注意，图片路径以localhost读取,如果设置路径和文件路径不一致，可能导致出显示取错误
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
     },
     "Priviewwel":{
        name: '预览欢迎词',
        name_en: 'Preview Welcome Speech',
        equipNo: '1005',
        setNo: '4022'        
     },
     "closewel":{
        name:"关闭欢迎词",
        name_en: 'Close the Welcome Speech',
        equipNo: '1005',
        setNo: '4021'        
     },     
};

// PPT配置
var PPTcommand ={
    "returnSoft":{  
        name: '返回软件',
        name_en: 'Return software',
        equipNo: '300',
        setNo: '10108'
     },
     "openPPT":{
        name: '打开PPT',
        name_en: 'Open PPT',
        equipNo: '4001',
        setNo: '1'        
     },
     "closePPT":{
        name:"关闭PPT",
        name_en: 'CLose PPT',
        equipNo: '4001',
        setNo: '7'        
     },     
     "setIp":{
        name: '设置插件IP',
        name_en: 'Setting up plug-in IP',
        set_ip: '192.168.0.152',//window.localStorage.service_url,    //设置为固定IP，则为  '192.168.0.165'  样式   
     },
     "setPage":{
        name:"设置跳页",
        name_en: 'Setting up page hopping',
        equipNo: '4001',
        setNo: '4'        
     },
};

// 语言
var selLanguageZH =[
     {
        "name":"设置页面",
        "url": "/setPage/",
        "id":"setPageTool",
     },
     {
         "name":"首页",
         "url":"/home/",
         "id":"homeTool",
     },
     {
         "name":"实时快照",
         "url":"/snapshot/",
         "id":"snapshotTool",
     },
     {
         "name":"设备列表",
         "url":"/equips/",
         "id":"equipsTool",
     },
     {
         "name":"系统",
         "url":"#",
         "id":"configTool",
     },
     {
         "name":"事件查询",
         "url":"/eventSearch/",
         "id":"eventSearchTool",
     },
     {
         "name":"系统配置",
         "url":"/equipConfigList/",
         "id":"equipConfigListTool",
     },
     {
         "name":"报警排表",
         "url":"/schedule/",
         "id":"scheduleTool",
     },
     {
         "name":"设备联动",
         "url":"/equipLinkage/",
         "id":"equipLinkageTool",
     }, 
     {
         "name":"语音界面",
         "voiceheader": "语音控制",
         "voicecontainer": "请告诉我，您想要进行的操作.",
         "voicearrowcancel": "取消指令",
         "voicearrowdialog": "长按说话..",
         "id":"voiceAlarm",
     },                                  
<<<<<<< HEAD
     ],selLanguageEN =[
=======
],selLanguageEN =[
>>>>>>> b50f1a6585bf4b01fd46e456cbc8591121d365d6
     {
        "name":"设置页面",
        "url": "/mobile-en/setPage_en/",
        "id":"setPageTool",
     },
     {
         "name":"home",
         "url": "/home/",//"/mobile-en/home_en/",
         "id":"homeTool",
     },
     {
         "name":"snapshot",
         "url":"/mobile-en/snapshot_en/",
         "id":"snapshotTool",
     },
     {
         "name":"device list",
         "url":"/mobile-en/equips_en/",
         "id":"equipsTool",
     },
     {
         "name":"system",
         "url":"#",
         "id":"configTool",
     },
     {
         "name":"event query",
         "url":"/mobile-en/eventSearch_en/",
         "id":"eventSearchTool",
     },
     {
         "name":"system configuration",
         "url":"/mobile-en/equipConfigList_en/",
         "id":"equipConfigListTool",
     },
     {
         "name":"alarm schedule",
         "url":"/mobile-en/schedule_en/",
         "id":"scheduleTool",
     },
     {
         "name":"equipment linkage",
         "url":"/mobile-en/equipLinkage_en/",
         "id":"equipLinkageTool",
     }, 
     {
         "name":"voice view",
         "voiceheader": "Voice control",
         "voicecontainer": "Please tell me what you want to do.",
         "voicearrowcancel": "Cancel",
         "voicearrowdialog": "Long pressed speech..",
         "id":"voiceAlarm",
     }, 
];