var scheduleModifyChildpositionList;
function scheduleModifyChild() {
    scenalControlPro_init();
    equiplinkageStr.length = 0;
    //控制子项目点击事件
    $(".equipLinkage_edit_modify_childFirst>div").unbind();
    $(".equipLinkage_edit_modify_childFirst>div").bind("click",function(){
        $(this).addClass("selectedIcorlor").siblings().removeClass("selectedIcorlor");
        $("."+$(this).attr("div_attribute")).removeClass("displayNone").siblings().addClass("displayNone");
        $(".equipLinkage_edit_modify_childFirst").removeClass("displayNone");
    });
    scheduleModifyChildSuccessTooip = myApp.toast.create({text: "插入成功", position: 'center', closeTimeout: 2000, });
    // 获取位置参数
    var chatObjectChild = myApp.views.main.history,
    urlLengthChild = chatObjectChild.length - 1;
    scheduleModifyChildpositionList = chatObjectChild[urlLengthChild].split("?")[1];
    equiplinkageStr.push(scheduleModifyChildpositionList);
}
//确认控制项目
function comfirmScaneControl(){
    if(!$(".equipLinkage_edit_modify_childSecond").hasClass("displayNone"))
    {
        equiplinkageStr.push($(".equipLinkage_edit_modify_child_equip").find("option:selected").attr("combination"));
    }
    else
    {
        let str = $(".equipLinkage_edit_modify_child_time").val();
        if(!str)
           {
            myApp.dialog.alert("请输入正确的时长");
            return false;
           } 
        else
             equiplinkageStr.push(str);
    } 

    scheduleModifyChildSuccessTooip.open();
  
}