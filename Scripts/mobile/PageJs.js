
//首页
$(document).on("page:beforein", ".page[data-page='home']", function (e) {
    onHomePage();
});

//实时快照
$(document).on("page:beforein", ".page[data-page='snapshot']", function (e) {
    initPageJS('snapshot', '/Scripts/mobile/');
});

//实时快照详情页
$(document).on("page:beforein", ".page[data-page='snapShotDetail']", function (e) {
    initPageJS('snapShotDetail', '/Scripts/mobile/');
});

//语音
$(document).on("page:beforein", ".page[data-page='voice']", function (e) {
    initPageJS('voice', '/Scripts/mobile/');
});

//设备列表
$(document).on("page:beforein", ".page[data-page='equips']", function (e) {
    initPageJS('equips', '/Scripts/mobile/');
});

//配置导航
$(document).on("page:beforein", ".page[data-page='systemConfig']", function (e) {
    initPageJS('systemConfig', '/Scripts/mobile/');
});

//事件查询
$(document).on("page:beforein", ".page[data-page='eventQuery']", function (e) {
    initPageJS('eventQuery', '/Scripts/mobile/');
});

//报警排表
$(document).on("page:beforein", ".page[data-page='schedule']", function (e) {
    initPageJS('schedule', '/Scripts/mobile/');
});

//设备联动
$(document).on("page:beforein", ".page[data-page='equipLinkage']", function (e) {
    initPageJS('equipLinkage', '/Scripts/mobile/');
});


// 个人信息
$(document).on("page:beforein", ".page[data-page='UserInfor']", function (e) {
    initPageJS('UserInfor', '/Scripts/mobile/');
});


// 设置
$(document).on("page:beforein", ".page[data-page='setPage']", function (e) {
    initPageJS('setPage', '/Scripts/mobile/');
});
