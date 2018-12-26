
//首页
$(document).on("page:beforein", ".page[data-page='home']", function (e) {
    onHomePage();
});

//实时快照
$(document).on("page:beforein", ".page[data-page='snapshot']", function (e) {
    initPageJS('snapshot', '/Scripts/mobile/pageJavascript/');
});

//实时快照详情页
$(document).on("page:beforein", ".page[data-page='snapShotDetail']", function (e) {
    initPageJS('snapShotDetail', '/Scripts/mobile/pageJavascript/');
});

//语音
$(document).on("page:beforein", ".page[data-page='voice']", function (e) {
    initPageJS('voice', '/Scripts/mobile/pageJavascript/');
});

//设备列表
$(document).on("page:beforein", ".page[data-page='equips']", function (e) {
    initPageJS('equips', '/Scripts/mobile/pageJavascript/');
});

//配置导航
$(document).on("page:beforein", ".page[data-page='systemConfig']", function (e) {
	
    initPageJS('systemConfig', '/Scripts/mobile/pageJavascript/');
	
});

//事件查询
$(document).on("page:beforein", ".page[data-page='eventSearch']", function (e) {
    initPageJS('eventSearch', '/Scripts/mobile/pageJavascript/');
});

//事件查询-详情
$(document).on("page:beforein", ".page[data-page='equipSearchDetail']", function (e) {
    initPageJS('equipSearchDetail', '/Scripts/mobile/pageJavascript/');
});

//报警排表
$(document).on("page:beforein", ".page[data-page='schedule']", function (e) {
    initPageJS('schedule', '/Scripts/mobile/pageJavascript/');
});

//设备联动
$(document).on("page:beforein", ".page[data-page='equipLinkage']", function (e) {
    initPageJS('equipLinkage', '/Scripts/mobile/pageJavascript/');
});


// 个人信息
$(document).on("page:beforein", ".page[data-page='UserInfor']", function (e) {
    initPageJS('UserInfor', '/Scripts/mobile/pageJavascript/');
});


// 设置
$(document).on("page:beforein", ".page[data-page='setPage']", function (e) {
    initPageJS('setPage', '/Scripts/mobile/pageJavascript/');
});
// 遥测和遥信
$(document).on("page:beforein", ".page[data-page='ycAndyx']", function (e) {
    initPageJS('ycAndyx', '/Scripts/mobile/pageJavascript/');
});

// 视频列表
$(document).on("page:beforein", ".page[data-page='Video']", function (e) {
    initPageJS('Video', '/Scripts/mobile/pageJavascript/');
});
//地图视频
$(document).on("page:beforein", ".page[data-page='videoControl']", function (e) {
    initPageJS('videoControl', '/Scripts/mobile/pageJavascript/');
});
// PPT
$(document).on("page:beforein", ".page[data-page='mettingPPT']", function (e) {
    initPageJS('mettingPPT', '/Scripts/mobile/pageJavascript/');
});
$(document).on("page:beforein", ".page[data-page='mettingDetails']", function (e) {
    initPageJS('mettingDetails', '/Scripts/mobile/pageJavascript/');
});
// 欢迎词
$(document).on("page:beforein", ".page[data-page='welcomeWords']", function (e) {
    initPageJS('welcomeWords', '/Scripts/mobile/pageJavascript/');
});