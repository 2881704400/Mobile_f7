function mettingPPT() {
   
   if($("#Filelist>ul>li").html()==" " || $("#Filelist>ul>li").html()==undefined)
     {fileStuctureChild("","");}
  //文件选择
  $(".listTitle span").unbind();
  $(".listTitle span").bind('click',function(){
     writeResh();
     $(this).addClass("selectUD").siblings().removeClass("selectUD");
     if($(this).attr("dataset") == 1)
     {
         fileStuctureChild("","");//刷新C盘列表
     }
     else
     {
         fileStuctureChild("u",""); //刷新U盘列表
     }
  });
   isFilePPT();
   // 刷新
   $(".modalDiv").addClass("displayNone");
   $(".icon-refresh").unbind();
   $(".icon-refresh").bind('click',function(){
     writeResh();
      if($(".selectUD").attr("dataset") == 1)
     {
         fileStuctureChild("","");//刷新C盘列表
     }
     else
     {
         fileStuctureChild("u",""); //刷新U盘列表
     }
   });
}
//刷新隐藏
$(".modalDiv").addClass("displayNone");
// ===============================================
// ===========判断pdf或者ppt更换图标==============
// ===============================================
$.extend({
  // 点击进入
  setFounction:function(that){
     window.localStorage.storageI = $(that).text();
     window.localStorage.dataURL = $(that).attr("data-url");
  }
})
// ===============================================
// =====================文件结构==================
// ===============================================
var stringFile;
function fileStuctureChild(url,objectList)
{
    $(objectList).next().html("");
    var _urlChild ="/GWService.asmx/GetFileStructure";
    var _dataSetChild = "filePath=" + url + "&&fileName="+"";
    JQajaxo("post", _urlChild, true, _dataSetChild, _sccessChild);
    function _sccessChild(data) {  
      $(".modalDiv").addClass("displayNone");
      var result = $$(data).children("string").text();
      if (result != "false" && result !="null") {
          stringFile =JSON.parse(result); //console.log($.trim(stringFile[0]).split("\\")[2]);
          //继续查询每项列表下的子目录
          for(var i=0;i<stringFile.length;i++)
          { 
           if($.trim(stringFile[i]).split("\\")[2] !="") //排除 D:\PPT\ 格式文件夹
           {
             if(isStucture(stringFile[i]) && stringFile[i] !="" ) //如果为文件夹
              {
                  var contentHtml = '<li><a href="#" class="item-content item-link fileListActive"  data-url="'+stringFile[i]+'" onclick="opeChildFile(this)"><i class="iconfont icon-file"></i>'+getNmae(stringFile[i])+'<b class="iconfont icon-rightDire"></b></a><ul></ul></li>';   
              }
              else if(stringFile[i] !="")
              {
                 var contentHtml = '<li><a href="#" class="item-content item-link fileListActive"  data-url='+stringFile[i]+' set_no='+PPTcommand.openPPT.setNo+' set_equip='+PPTcommand.openPPT.equipNo+' set_id='+PPTcommand.openPPT.setNo+' onclick="setMenu(this)"><i class="iconfont icon-word"></i>'+getNmae(stringFile[i])+'</a></li>';
              }
              if(objectList == "")
                $("#Filelist>ul").append(contentHtml);
              else
                 {$(objectList).next().append(contentHtml);}
           }
          }
      }
    }
}
//文件夹 true
function isStucture(stringFile){
   if(stringFile.length>4)
   {
        if(stringFile.substr(-4) == ".pdf" || stringFile.substr(-4) == ".ppt" || stringFile.substr(-5) == ".pptx" || stringFile.substr(-4) == ".xls" || stringFile.substr(-4) == ".xslx" )
          {return false;}
        else
          {return true;}
   }
   else
   {
    return true;
   }
}
// ===============================================
// ===================菜单控制====================
// ===============================================
function opeChildFile(that){
  $(that).next().html("");
  // 右边图标
  if($(that).hasClass("isSingle"))
  {
    $(that).removeClass("isSingle");
    $(that).find("b").removeClass("icon-bottomDire").addClass("icon-rightDire");
  }
  else
  {
    $(that).addClass("isSingle");
    $(that).find("b").removeClass("icon-rightDire").addClass("icon-bottomDire");
    var urlAc = $(that).attr("data-url");
     if(isStucture(urlAc))
     {
        fileStuctureChild(urlAc,that);$(".modalDiv").removeClass("displayNone");
     }
  }
  
}
function setMenu(that){
   GetSetParmItem_mettingppt(that,PPTcommand.returnSoft.equipNo, PPTcommand.returnSoft.setNo,"","");
}
// ===============================================
// ===================清除重写====================
// ===============================================
function writeResh(){$("#Filelist>ul").html("");}
// ===============================================
// ==============初始化历史记录=================
// ===============================================
function isFilePPT(){
     if(window.localStorage.storageI != undefined && window.localStorage.storageI != "")
     {
        $(".pptActive").find("a").remove();
        $(".pptActive").append('<a href="#" class="item-content item-link historyPPT" data-url=""  set_no='+PPTcommand.openPPT.setNo+' set_equip='+PPTcommand.openPPT.equipNo+' set_id='+PPTcommand.openPPT.setNo+' onclick="setMenu(this)"></i><i class="iconfont icon-word"></i>'+window.localStorage.storageI+"</a>");
        $(".pptActive a").attr("data-url",window.localStorage.dataURL);
        
     }
}


//获取结果集合
function GetSetParmItem_mettingppt(a,equip_no,set_no,values,slideIndex) {
    if (Control_Equip_List(equip_no) || Control_SetItem_List(equip_no, false)) {
        var _url = "/GWServices.asmx/GetSetParmItem";
        var _dataSet = "equip_no=" + equip_no + "&&set_no=" + set_no;
        JQajaxo("post", _url, true, _dataSet, _successfSet);
        function _successfSet(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs != "false" && resultJs != "") 
               {   
                  var userResultJs =JSON.parse(resultJs);
                  if(values =="")
                     onSetCommand_mettingppt(a,equip_no, userResultJs[0].main_instruction, userResultJs[0].minor_instruction, userResultJs[0].value, userResultJs[0].set_nm,slideIndex);
                  else
                     onSetCommand_mettingppt(a,equip_no, userResultJs[0].main_instruction, userResultJs[0].minor_instruction, values, userResultJs[0].set_nm,slideIndex); 
              }
              else
              {
                _errorfSet(a);
              }
        }

    }
}
//设置命令-确定
function onSetCommand_mettingppt(a,str_1, str_2, str_3, str_4, text,slideIndex) { //equip_no,main_instruction,minor_instruction,value,set_nm
    var vals = str_4;
    var userName = window.localStorage.userName;
    if (userName == null || userName == "") {userName = window.sessionStorage.userName;}
    var _url = "/GWService.asmx/SetupsCommand";
    var _dataSet = "equip_no=" + encodeURIComponent(str_1) + "&&main_instruction=" + encodeURIComponent(str_2) + "&&minor_instruction=" + encodeURIComponent(str_3) + "&&value=" + encodeURIComponent(vals) + "&&user_name=" + encodeURIComponent(userName);
    JQajaxo("post", _url, true, _dataSet, _successfSet);
    function _successfSet(data) {
      setTimeout(function(){
         $(".modalDiv").removeClass("displayNone");
         //辨别点击历史记录或者普通记录
         if($(a).hasClass("historyPPT"))
         {
           window.localStorage.historyis = 1;
         }
         else
         {
           window.localStorage.historyis = 0;
         }
        //点击的是文件,则保存点击记录
         if(!isStucture($(a).text()) && $(a).text() !=""){
            $.setFounction(a);
         }
         get_no_ppt(a,$(a).attr("data-url"),""); //传入url生成缩略图
         window.localStorage.pptUsername = $(a).attr("data-url").split("\\")[$(a).attr("data-url").split("\\").length-1].split(".")[0];  //ppt名称
      },1000);
    }
}