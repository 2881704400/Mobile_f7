var toastCenterLinkage,toastCenterLinkageSuccess,sceneFlag,removeSceneControl = [],equiplinkageStr = [];
function sceneEdit_en() {
    switchToolbar("configTool");
    myApp.dialog.progress('<a style="font-size: 1rem">Loading...</a>');
    // initAddList();//联动设置
    toastCenterLinkage = myApp.toast.create({text: "operation failed", position: 'center', closeTimeout: 2000, });
    toastCenterLinkageSuccess = myApp.toast.create({text: "Successful operation", position: 'center', closeTimeout: 2000, });

    //初始化场景名称
    initSceneList_en();
    sceneFlag = true;
    window.localStorage.sceneName = "";
    equiplinkageStr.length = removeSceneControl.length = 0;
}
// //左侧添加菜单
function transformReportingObstaciesMenu_scene_en(){

   $(".scheduleRightBottomBtn").hasClass("transformReportingMenu")?$(".scheduleRightBottomBtn").removeClass("transformReportingMenu"):$(".scheduleRightBottomBtn").addClass("transformReportingMenu");

}

//初始化场景设置
function initSceneList_en() {
    var sceneDataList = [],controlEquipList,setList,equipList;
    $("#equipLinkage_edit ul").html("");
    $.when($.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/getSetparmList",{
            data:{findEquip: false},
            async:false
        }),$.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/getEquipList",{
            data:{},
            async:false
    })).done(function(n,l){
        let rt = n.HttpData,equipRt = l.HttpData;
        if (n.HttpData.code ==200 && l.HttpData.code ==200) {
            myApp.dialog.close();
            setList = rt.data, equipList = equipRt.data; 
            //可控设备
            controlEquipList = setList.filter(item => {
              return item.set_type
            }).map(item => {return item});
            //过滤出场景
             var htmlHeader ="";
            sceneDataList = setList.filter(item => {
              return item.set_type === "J"
            }).map(item => { 

                      htmlHeader +=`<li class="swipeout bottomBorderLine">
                          <div class="item-content swipeout-content schedule-content row no-gap" onclick="scanelEdit_en(this,1)" equip_no="${item.equip_no}" set_no="${item.set_no}" combination="${item.value}">
                              <a href="#" class="item-link item-content">
                                <div class="item-inner">
                                  <div class="item-title">${item.set_nm} </div>
                                </div>
                            </a>    
                          </div>
                          <div class="swipeout-actions-right">
                            <a href="#" class="delBtn" onclick="deleteScene_en(this,${item.equip_no},${item.set_no})">Delete</a>
                          </div>
                        </li>`;

                    return item;
            });
            $("#equipLinkage_edit>ul").append(htmlHeader);
            myApp.dialog.close();
     }
    }).fail(function(e){
         myApp.dialog.close();
    });
}
//场景URL
function scanelEdit_en(that,status){
    if(status == 1)
      myApp.router.navigate("/mobile-en/scheduleModify_en/?title=Scene editing&index=1&table=equipLinkage_edit_modify&equip_no="+$(that).attr("equip_no")+"&set_no="+$(that).attr("set_no")+"&combination="+$(that).attr("combination")+"&currentTxt="+$(that).find(".item-title").text()); 
    else
      myApp.router.navigate("/mobile-en/scheduleModify_en/?title=Scene editing&index=2&table=equipLinkage_edit_modify"); 
}

//删除场景
function deleteScene_en(dt,equipNo,setNo) {
    let myApp_en = new Framework7({dialog: {buttonOk: 'confirm', buttonCancel: 'cancel', }, statusbar: {enabled: true, overlay: true, iosOverlaysWebView: true, }, });
    myApp_en.dialog.confirm("Whether to delete the current scenario","Tips",function(){
      let reqData = {equipNo: equipNo, setNo: setNo}
      $.when($.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/deleteScene",{
                data:reqData,
                async:false
            })).done(function(n){
             $(dt).parents("li").remove();
             toastCenterLinkageSuccess.open();
        }).fail(function(e){});
    });
}
//新增场景控制
function sceneControl_en(dt,txtTitle){
 myApp_em.dialog.prompt(txtTitle,"Tips", function (name) {
       addScene(name);
    });   
}
