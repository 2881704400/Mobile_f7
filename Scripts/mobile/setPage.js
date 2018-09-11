function setPage(){

    //选择
    $("#voiceList").find("option").each(function () {
        if ($(this).attr("value") == window.localStorage.voiceList) {
            $(this).attr("selected", true);
             $("#voiceListName>.item-after").html($(this).html());
        } 
        else if(window.localStorage.voiceList == undefined)
        {
             $("#voiceList").find("option:eq(0)").attr("selected", true);
              $("#voiceListName>.item-after").html($(this).html());
        }
    });

    //用户
    $(".userClassName p").html(window.localStorage.userName);
}


function onVoiceList() {
    window.localStorage.voiceList = $("#voiceList").find("option:selected").attr("value");
}