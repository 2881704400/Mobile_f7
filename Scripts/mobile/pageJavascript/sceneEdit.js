var toastCenterLinkage,toastCenterLinkageSuccess,sceneFlag,removeSceneControl = [],equiplinkageStr = [];
function sceneEdit() {
    switchToolbar("configTool");
    // 初始化设备
    myApp.dialog.progress('<a style="font-size: 1rem">加载中...</a>');
    toastCenterLinkage = myApp.toast.create({text: "操作失败", position: 'center', closeTimeout: 2000, });
    toastCenterLinkageSuccess = myApp.toast.create({text: "操作成功", position: 'center', closeTimeout: 2000, });
    initSceneList();
    sceneFlag = true;
    window.localStorage.sceneName = "";
    equiplinkageStr.length = removeSceneControl.length = 0;
}
// //左侧添加菜单
function transformReportingObstaciesMenu_scene(){
   $(".scheduleRightBottomBtn").hasClass("transformReportingMenu")?$(".scheduleRightBottomBtn").removeClass("transformReportingMenu"):$(".scheduleRightBottomBtn").addClass("transformReportingMenu");
}
//初始化场景设置
function initSceneList() {
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
                    <div class="item-content swipeout-content schedule-content row no-gap" onclick="scanelEdit(this,1)" equip_no="${item.equip_no}" set_no="${item.set_no}" combination="${item.value}">
                        <a href="#" class="item-link item-content">
                          <div class="item-inner">
                            <div class="item-title">${item.set_nm}</div>
                          </div>
                      </a>    
                    </div>
                    <div class="swipeout-actions-right">
                      <a href="#" class="delBtn" onclick="deleteScene(this,${item.equip_no},${item.set_no})">删除</a>
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
function scanelEdit(that,status){
    window.localStorage.sceneName = "";
    if(status == 1)
      myApp.router.navigate("/scheduleModify/?title=场景编辑&index=1&table=equipLinkage_edit_modify&equip_no="+$(that).attr("equip_no")+"&set_no="+$(that).attr("set_no")+"&combination="+$(that).attr("combination")+"&currentTxt="+$(that).find(".item-title").text()); 
    else
      myApp.router.navigate("/scheduleModify/?title=场景编辑&index=2&table=equipLinkage_edit_modify"); 
}

//删除场景
function deleteScene(dt,equipNo,setNo) {

    myApp.dialog.confirm("是否删除当前场景","提示",function(){
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
function sceneControl(dt,txtTitle){
 myApp.dialog.prompt(txtTitle,"提示", function (name) {
       addScene(name);
    });   
}



