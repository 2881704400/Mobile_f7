function setPage(){
    switchToolbar("configTool");
    //初始化选择
    $("#voiceList").find("option").each(function () {
        if ($(this).attr("value") == window.localStorage.voiceList) {
            $(this).attr("selected", true);
             $("#voiceListName>.item-after").html($(this).html());
        } 
        else if(window.localStorage.voiceList == undefined)
        {
             $("#voiceList").find("option:eq(1)").attr("selected", true);
              $("#voiceListName>.item-after").html($(this).html());
        }
    });

    //用户
    $(".userClassName p").html(window.localStorage.userName);
    myApp.navbar.hide('.navbar');

    //切换背景
    var toggle = myApp.toggle.create({
      el: '.toggle',
      on: {
        change: function () {
            var hrefUrl ="";
            if (toggle.checked) {
              $(".whiteColor").each(function(index){
                 hrefUrl =$(this).attr("href").replace("white","back");
                 $(this).attr("href",hrefUrl);
              });window.localStorage.localBgColor = 1;
            }
            else
            {
               $(".whiteColor").each(function(index){
                 hrefUrl =$(this).attr("href").replace("back","white");
                 $(this).attr("href",hrefUrl);
              });window.localStorage.localBgColor = 0;
            }
        }
      }
    });
    if (window.localStorage.localBgColor == 1){toggle.checked = true;}
    else {toggle.checked = false;}

}


function onVoiceList() {
    window.localStorage.voiceList = $("#voiceList").find("option:selected").attr("value");
    getLanguageChoice(window.localStorage.voiceList);
}
function getLanguageChoice(val){
  switch(val)
  {
    case "0": //讯飞中文
      try {myJavaFun.SetVoiceMSLanguage("en_US");} catch (ex) {}
         
    break;
    case "1": //讯飞英文
      try {myJavaFun.SetVoiceMSLanguage("zh_CN");} catch (ex) {}
          
    break;
    case "2": //微软中文
      try {myJavaFun.SetVoiceMSLanguage("zh_CN");} catch (ex) {}
      
    break;
    case "3": //微软英文
      try {myJavaFun.SetVoiceMSLanguage("en_US");} catch (ex) {}
            
    break;
    default: break;
  }

}