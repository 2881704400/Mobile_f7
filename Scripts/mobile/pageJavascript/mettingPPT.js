﻿function mettingPPT() {
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
//点击的是文件,则保存点击记录
$.extend({
  // 点击进入
  setFounction:function(that){
     window.localStorage.storageI = $(that).text();
     window.localStorage.dataURL = $(that).attr("data-url");
  }
})
// 文件结构处理
var stringFile;
function fileStuctureChild(url,objectList)
{
    $(objectList).next().html("");
    var _urlChild ="/GWService.asmx/GetFileStructure";
    var _dataSetChild = "filePath=" + url + "&&fileName="+"";
    JQajaxo("post", _urlChild, true, _dataSetChild, _sccessChild);
    function _sccessChild(data) {  
      $(".modalDiv").addClass("displayNone");
      var result = $$(data).children("string").text(),contentHtml="";
      if (result != "false" && result !="null") {
          stringFile =JSON.parse(result);
          //继续查询每项列表下的子目录
          for(var i=0;i<stringFile.length;i++)
          { 
           if($.trim(stringFile[i]).split("\\")[2] !="") //排除 D:\PPT\ 格式文件夹
           {
             if(isStucture(stringFile[i]) && stringFile[i] !="" ) //如果为文件夹
              {
                   contentHtml = '<li class="bottomBorderLine"><a href="#" class="item-content item-link fileListActive"  data-url="'+stringFile[i]+'" onclick="opeChildFile(this)"><i class="iconfont icon-file"></i>'+getSubstrNmae(stringFile[i])+'<b class="iconfont icon-rightDire"></b></a><ul></ul></li>';   
              }
              else if(stringFile[i] !="")
              {
                  contentHtml = '<li class="bottomBorderLine"><a href="#" class="item-content item-link fileListActive"  data-url='+stringFile[i]+' set_no='+PPTcommand.openPPT.setNo+' set_equip='+PPTcommand.openPPT.equipNo+' set_id='+PPTcommand.openPPT.setNo+' onclick=\"setMenu(this,null,null)\"><i class="iconfont icon-word"></i>'+getSubstrNmae(stringFile[i])+'</a></li>';
              }
              if(objectList == "")
                $("#Filelist>ul").append(contentHtml);
              else
                { $(objectList).next().append(contentHtml); }
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
//提取名称
function getSubstrNmae(name) {
    return name.split("\\")[name.split("\\").length - 1];
}
// 菜单
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
// 清除重写
function writeResh(){$("#Filelist>ul").html("");}
//历史记录
function isFilePPT(){
     if(window.localStorage.storageI != undefined && window.localStorage.storageI != "")
     {
        $(".pptActive").find("a").remove();
        $(".pptActive").append('<a href="#" class="item-content item-link historyPPT" data-url=""  set_no='+PPTcommand.openPPT.setNo+' set_equip='+PPTcommand.openPPT.equipNo+' set_id='+PPTcommand.openPPT.setNo+' onclick=\"setMenu(this,null,null)\"></i><i class="iconfont icon-word"></i>'+window.localStorage.storageI+'</a>');
        $(".pptActive a").attr("data-url",window.localStorage.dataURL);
     }
}

function setMenu(that,value,slideIndex){
     myApp.dialog.progress();
    if (Control_Equip_List(PPTcommand.returnSoft.equipNo) || Control_SetItem_List(PPTcommand.returnSoft.equipNo, false)) {
        var _url = "/GWServices.asmx/GetSetParmItem";
        var _dataSet = "equip_no=" + PPTcommand.returnSoft.equipNo + "&&set_no=" + PPTcommand.returnSoft.setNo;
        JQajaxo("post", _url, true, _dataSet, _successfSet);
        function _successfSet(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs != "false" && resultJs != "") 
               {   
                  var userResultJs =JSON.parse(resultJs);
                  if(value =="")
                     openFileCommand(that,PPTcommand.returnSoft.equipNo, userResultJs[0].main_instruction, userResultJs[0].minor_instruction, userResultJs[0].value, userResultJs[0].set_nm,slideIndex);
                  else
                     openFileCommand(that,PPTcommand.returnSoft.equipNo, userResultJs[0].main_instruction, userResultJs[0].minor_instruction, value, userResultJs[0].set_nm,slideIndex); 
              }
              else
              {
               alertMsgError.open(); myApp.dialog.close();
              }
        }
    }
}
//设置命令-确定
function openFileCommand(dt,equip_no, main_instruction, minor_instruction, value, set_nm,slideIndex) { //equip_no,main_instruction,minor_instruction,value,set_nm
    var userName = window.localStorage.userName;
    if (userName == null || userName == "") {userName = window.sessionStorage.userName;}
    var _url = "/GWService.asmx/SetupsCommand";
    var _dataSet = "equip_no=" + encodeURIComponent(equip_no) + "&&main_instruction=" + encodeURIComponent(main_instruction) + "&&minor_instruction=" + encodeURIComponent(minor_instruction) + "&&value=" + encodeURIComponent(value) + "&&user_name=" + encodeURIComponent(userName);
    JQajaxo("post", _url, true, _dataSet, _successfSet);
    function _successfSet(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {  
          if(!value)
          {
            // setTimeout(function(){
               $(".modalDiv").removeClass("displayNone");
               //辨别点击历史记录或者普通记录
               $(dt).hasClass("historyPPT")?window.localStorage.historyis = 1:window.localStorage.historyis = 0;
              //点击的是文件,则保存点击记录
               if(!isStucture($(dt).text()) && $(dt).text() !=""){
                  $.setFounction(dt);
               }
               setMenu(dt,$(dt).attr("data-url"),""); //传入url生成缩略图
               window.localStorage.pptUsername = $(dt).attr("data-url").split("\\")[$(dt).attr("data-url").split("\\").length-1].split(".")[0];  //ppt名称
            // },1000);            
          }
           else
            {
                 if($(dt).parents("div.page-content").hasClass("mettingPPTContent")) //ppt列表
                 {
                  if(window.localStorage.historyis == 1)
                    {
                        setMenu($(".selectBorder"),window.localStorage.savePage,window.localStorage.savePage);
                    }
                   var setTimeout = setInterval(function(){
                       $.ajax({                  
                        type: "get",                 
                        url: "http://"+PPTcommand.setIp.set_ip+":3333/api/data",                
                        timeout: 5000,                  
                        data:"",                  
                        success: function (data) {  
                            if(data[1] != -1)
                            {  
                              window.localStorage.sessionFilename = data[0];//data[1];
                              window.localStorage.sessionValue = data[1];//data[1];
                              $(".modalDiv").addClass("displayNone");
                              clearInterval(setTimeout);   
                               myApp.router.navigate('/mettingDetails/'); 
                            }
                          },
                          error: function(error){console.log(error)}             
                         });
                    },500);
                  }
                  if($(dt).parents("div.page-content").hasClass("mettingDetailsContent")){ //ppt详情
                      $(".mettingDetails_index").find("div:eq("+(slideIndex-1)+")").addClass("selectBorder").siblings().removeClass("selectBorder");
                      var src= $(".mettingDetails_index>div:eq("+(slideIndex-1)+")").find("img").attr("src");
                      $(".setviewPng").attr('src',src); 
                  }              
            }
        }else{ myApp.dialog.close();}
    }
}

