var isTFault = true;
var setHtml="";
var isNsys = true;
function mettingDetails() {
$(".modalDiv").addClass("displayNone");
/*=============================退出视频提示 start==========================================*/ 
if(!$("#mettingDetails").hasClass("page-on-left"))
removeURL1();
$("#back2,#homeTool,#MessageTool,#RealTimeTool,#VoiceTool").unbind();
$("#back2,#homeTool,#MessageTool,#RealTimeTool,#VoiceTool").bind("click",clickMetting);
function clickMetting(){
  if($("#mettingDetails").hasClass("page-current"))
  {
      var thisValue1 = $(this).attr("id");
      var thisURL1 = $(this).attr("href");
      myApp.dialog.confirm('确认关闭正在播放PPT?',"信息提示",
        function () {  //yes
          addURL1();
          toURL1(thisValue1);
           //发送PPT关闭命令
           $(".closeFile").click();  //上面2个命令应该放在发送成功回调跳转
        },
        function () { //no
          addURL1();
          toURL1(thisValue1);
        }
      );
   }
}
function removeURL1(){
  $("#homeTool").attr("href","")
  $("#MessageTool").attr("href","")
  $("#RealTimeTool").attr("href","")
  $("#VoiceTool").attr("href","")
}
function addURL1(){
  $("#homeTool").attr("href","/home/")
  $("#MessageTool").attr("href","/Message/")
  $("#RealTimeTool").attr("href","/RealTime/")
  $("#VoiceTool").attr("href","/Voice/")
}
function toURL1(thisValue){
    switch(thisValue){
      case "back2": myApp.router.back();  break;
      case "homeTool":  myApp.router.navigate('/home/');  break;
      case "MessageTool":  myApp.router.navigate('/Message/');  break;
      case "RealTimeTool":  myApp.router.navigate('/RealTime/');  break;
      case "VoiceTool":  myApp.router.navigate('/Voice/');  break;
      default: ;
    }
}
i=1;
$(".closeFile,.setScreenSizeChild").unbind();
$(".closeFile,.setScreenSizeChild").bind('click',function(){
GetSetParmItem_ppt(this,PPTcommand.closePPT.equipNo, PPTcommand.closePPT.setNo,"","");
if($(this).hasClass("setScreenSizeChild"))
{$(this).addClass("displayNone").siblings().removeClass("displayNone");}
});
/*=============================init==========================================*/ 
$(".detailsTiTle").html(window.localStorage.pptUsername);
setHtml="";
ajaxRequst();
$(".mettingDetailsBottom div a").unbind();
$(".mettingDetailsBottom div a").bind("click",function(){
   var dt = this;
   isPage(dt);
});
document.getElementById("startPage").addEventListener('touchstart', addbackground);
document.getElementById("startPage").addEventListener('touchend', removebackground);
document.getElementById("prePage").addEventListener('touchstart', addbackground);
document.getElementById("prePage").addEventListener('touchend', removebackground);
document.getElementById("nextPage").addEventListener('touchstart', addbackground);
document.getElementById("nextPage").addEventListener('touchend', removebackground);
document.getElementById("endPage").addEventListener('touchstart', addbackground);
document.getElementById("endPage").addEventListener('touchend', removebackground);
}
function getWidth() { //宽度+外边距
    widthIndex = $(".mettingDetails_index").find("div.selectBorder").css("width");
    onlyWidth = $(".mettingDetails_index").find("div.selectBorder").outerWidth(true); //每个的宽度
    return onlyWidth;
}
function addbackground(){//设置单击背景图片
  var tClass = $(this).attr("id");
  switch(tClass){
      case "startPage": $(".mettingDetailsBottom div").css("background","url(/Image/phone/startPage.png) no-repeat center/auto 100%"); break;
      case "prePage":$(".mettingDetailsBottom div").css("background","url(/Image/phone/prePage.png) no-repeat center/auto 100%"); break;
      case "nextPage":$(".mettingDetailsBottom div").css("background","url(/Image/phone/nextPage.png) no-repeat center/auto 100%"); break;
      case "endPage":$(".mettingDetailsBottom div").css("background","url(/Image/phone/endPage.png) no-repeat center/auto 100%"); break;
      default: break;
  }
}
function removebackground(){
  $(".mettingDetailsBottom div").css("background","url(/Image/phone/indexPage.png) no-repeat center/auto 100%");
}
//==============================================执行命令========================================================
function isPage(that){
var indexid="";
//初始化切换图片
var lenIndex=0,widthIndex=0,translate=0,onlyWidth=0,sumWidth=0;
lenIndex = $(".mettingDetails_index>div").length;
  if($(that).hasClass("startPage"))
  {
     $(".mettingDetails_index").css('transform','translate3d(0px, 0px, 0px)');
     $(".mettingDetails_index>div:eq(0)").addClass("selectBorder").siblings().removeClass("selectBorder");
  }
  else if($(that).hasClass("prePage"))
  {
    lenIndex = $(".mettingDetails_index>div").length;
    Indexid = parseInt($(".selectBorder").attr("Indexid")); //当前所选
    $(".mettingDetails_index").css('transform',"translate3d("+(getWidth()*(1-Indexid)+getWidth())+"px, 0px, 0px)");
    $(".mettingDetails_index div[indexid='"+(Indexid-1)+"']").addClass("selectBorder").siblings().removeClass("selectBorder");
  }
  else if($(that).hasClass("nextPage"))
  {
    lenIndex = $(".mettingDetails_index>div").length;
    Indexid = parseInt($(".selectBorder").attr("Indexid")); //当前所选
    if(Indexid<=lenIndex-5)
     $(".mettingDetails_index").css('transform',"translate3d("+getWidth()*Indexid*-1+"px, 0px, 0px)");
    $(".mettingDetails_index div[indexid='"+(Indexid+1)+"']").addClass("selectBorder").siblings().removeClass("selectBorder");
  }
  else if($(that).hasClass("endPage"))
  {
    lenIndex = $(".mettingDetails_index>div").length;
    widthIndex=$(".mettingDetails_index").find("div.selectBorder").css("width"); //每个的宽度
    sumWidth =(parseInt(widthIndex.substring(0,widthIndex.length-2))+9)*(lenIndex-5)*-1;
    if(lenIndex>5)
      $(".mettingDetails_index").css('transform',"translate3d("+sumWidth+"px, 0px, 0px)");
      $(".mettingDetails_index>div:eq('"+(lenIndex-1)+"')").addClass("selectBorder").siblings().removeClass("selectBorder");
  }
  else if($(that).hasClass("setScreenSizeChild"))
  {
    $(that).removeClass("displayNone").siblings("a").addClass("displayNone");
  }
  $(".setviewPng").attr("src",$(".selectBorder img").attr("src"));
  //记录页数
  window.localStorage.savePage= parseInt($(".selectBorder").attr("Indexid"));
  //跳转至该页
  get_noNull(that,$(".selectBorder").attr("Indexid"),$(".selectBorder").attr("Indexid"));
  isTFault = true;
}
//================================================初始化==========================================================
function ajaxRequst(){
 for(var l=1;l<=parseInt(window.localStorage.sessionValue);l++){
      if(l==1)
       setHtml +='<div class="swiper-slide selectBorder" onclick="bannerActive(this)" Indexid='+l+' set_no='+PPTcommand.setPage.setNo+' set_equip='+PPTcommand.setPage.equipNo+' set_id='+PPTcommand.setPage.setNo+'> <span style="display: inline-block;width:42px; height:42px" class=" preloader preloader-white"></span></div>';    
      else
       setHtml +='<div class="swiper-slide" onclick="bannerActive(this)" Indexid='+l+' set_no='+PPTcommand.setPage.setNo+' set_equip='+PPTcommand.setPage.equipNo+' set_id='+PPTcommand.setPage.setNo+'> <span style="display: inline-block;width:42px; height:42px" class=" preloader preloader-white"></span></div>';      
}
$(".mettingDetails_index").html(setHtml);
  var mySwiper3 = myApp.swiper.create('.swiper-3', {
      pagination:'.swiper-3 .swiper-pagination',
      spaceBetween: 10,
      slidesPerView: 5
  });
 for(var i=1;i<=parseInt(window.localStorage.sessionValue);i++){  //缩略图长度
     requestAjax(i,false);
  }
}
function requestAjax(j,k){
  setTimeout(function(){
   $.ajax({                  
      type: "get",                 
      url: "http://"+PPTcommand.setIp.set_ip+":3333/api/file/"+i,               
      timeout: 5000,
      async: false,                  
      data: "",                  
      success: function (data) {   
          if(data)
          {
            var urlRe ="/PPTImages/"+window.localStorage.sessionFilename+"/"+j+".jpg";
            $(".mettingDetails_index div[indexid='"+j+"']").html('<img src='+urlRe+' onerror="requestAjax('+j+',true)" />');
            $(".setviewPng").attr("src",$(".mettingDetails_index div[indexid='1']").find("img").attr("src"));
          }
          else
          {
             requestAjax(j,true);
          }
          if( window.localStorage.historyis == 1)
          {
             historyInit();
          }
        } //end success          
      });//end ajax
  },500);
}
//================================================初始化历史记录==========================================================
function historyInit(){
  if(window.localStorage.pptUsername == window.localStorage.HistorypptUsername)
  {
      //跳转
     $(".mettingDetails_index").css('transform',"translate3d("+(getWidth()*(1-window.localStorage.savePage)+getWidth())+"px, 0px, 0px)");
     $(".mettingDetails_index>div:eq('"+(window.localStorage.savePage-1)+"')").addClass("selectBorder").siblings().removeClass("selectBorder");
     setTimeout(function(){$(".setviewPng").attr("src",$(".selectBorder img").attr("src"));},1000);
  }
  //保存名字
  window.localStorage.HistorypptUsername=window.localStorage.pptUsername;
  
}