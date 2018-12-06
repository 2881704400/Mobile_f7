var getcolor;

function welcomeWords() {
    var focusValue;
    //close
    $(".weicomeClose").unbind();
    $(".weicomeClose").bind('click', function(event) {
        get_no(this, WORDcommand.closewel.equipNo, WORDcommand.closewel.setNo, "");
    });
    $('.fontBackground input[type="number"]').unbind();
    $('.fontBackground input[type="number"]').bind('focus', function(event) {
        focusValue = $(this).val();
        $(this).val("");
    });
    $('.fontBackground input[type="number"]').bind('blur', function(event) {
        if ($(this).val() == "") $(this).val(focusValue);
    });
    $("#centerChcek").unbind();
    $("#centerChcek").bind("click", function() {
        if ($(this).is(":checked")) {
            $(".canvasLeft").attr("disabled", "disabled");
        } else {
            $(".canvasLeft").removeAttr("disabled");
        }
    });
    // ===============================================
    // =================初始化图片====================
    // ===============================================
    var UrlSplit = location.href.split("/Views")[0].replace("http://", "").split(":");
    var IpValue = UrlSplit[0],
        portValue = UrlSplit[1];
    var url1 = WORDcommand.backgroundImage.url,
        fileName1 = ".png|.jpg|.JPG",
        _urlChild1 = "/GWService.asmx/GetFileStructure",
        setHtml = "";
    var groupPhotoArray = new Array();
    var typeEnd = new Array();
    $.ajax({
        type: 'post',
        url: _urlChild1,
        data: {
            filePath: url1,
            fileName: fileName1,
        },
        success: function(data) {
            var dt = $(data).find("string").html();
            var result = JSON.parse(dt);
            if (result != "" && result != undefined && result != null) {
                for (var i = 0; i < result.length; i++) {
                    groupPhotoArray[i] = getNmae(result[i]).split(".")[0]; //获得数字名称
                    typeEnd[i] = getNmae(result[i]).split(".")[getNmae(result[i]).split(".").length - 1]; //获取第一个文件名最后一个后缀
                    if (i == 0) setHtml += '<div class="swiper-slide selectBorder" onclick="bannerActive_wel(this)" Indexid=' + i + ' set_no="1" set_equip="10005" set_id="1" ><img src="http://' + IpValue + ":" + (portValue == "" ? 80 : portValue) + "/BGImages/" + groupPhotoArray[i] + "." + typeEnd[i] + '"></div>';
                    else setHtml += '<div class="swiper-slide" onclick="bannerActive_wel(this)" Indexid=' + i + ' set_no="1" set_equip="10005" set_id="1"><img src="http://' + IpValue + ":" + (portValue == "" ? 80 : portValue) + "/BGImages/" + groupPhotoArray[i] + "." + typeEnd[i] + '"></div>';
                }
                $(".setBackground").html(setHtml);
                bannerList("swiper-3", "swiper-pagination", 10, 3);
            }
        }
    }).done(function() {
        $.ajax({
            type: 'post',
            url: "/GWService.asmx/GetDataTableFromSQL",
            data: {
                sql: "select top 1 *  from WelcomingSpeech where Type=0 order by ID desc",
                userName: window.localStorage.userName,
            },
            success: function(data) {
                console.log(data);
                var dt = $(data).find("siginalVal").html();
                var result = JSON.parse(dt);
                if (result != "" && result != null && result != undefined) {
                    $(".wecomeButtom div.selectBorder").removeClass("selectBorder"); //背景设置
                    $(".wecomeButtom .swiper-slide[Indexid=" + result.BackgroundImg + "]").addClass("selectBorder"); //背景设置
                    $(".canvasFont").val(result.FontSize); //字体大小
                    $(".welcomeInput").val(result.Text); //文本内容
                    $(".canvasLeft").val(result.CanvasLeft); //左侧距离
                    $(".canvasTop").val(result.CanvasTop); //顶端距离
                    $(".activeSkin").css("background", result.FontColor); //字体颜色
                    $(".welcomeInput").css("color", result.FontColor); //字体颜色
                    $("#fontFamily option[data-font='" + result.FontFamily + "']").attr("selected", true);
                    if (result.FontWeight != "normal") //字体粗体
                    {
                        $(".icon-bgy15").addClass("textStyle_selected");
                    }
                    if (result.FontStyle != "normal") //字体斜体 
                    {
                        $(".icon-bgy14").addClass("textStyle_selected");
                    }
                    if (result.center != "") {
                        $("#centerChcek").prop("checked", true);
                        $(".canvasLeft").attr("disabled", "disabled");
                    }
                }
            }
        });
    });
    // 排序
    function groupPhotoInit(number) {
        return number.sort(NumAscSort);
    }
    // 升序
    function NumAscSort(a, b) {
        return a - b;
    }
    // 降序
    function NumDescSort(a, b) {
        return b - a;
    }
    //提取名称
    function getNmae(name) {
        return name.split("\\")[name.split("\\").length - 1];
    }
    // banner
    function bannerList(class1, class2, number3, number4) {
        var mySwiper3 = myApp.swiper.create('.' + class1, {
            pagination: '.' + class1 + ' .' + class2,
            spaceBetween: number3,
            slidesPerView: number4
        });
    }
    $(".welcomeHeaderPhone").height($(window).width() / 32 * 9);
    $(".views").height($(window).height());
    //排版选择
    $(".textStyle div:eq(0) a").unbind();
    $(".textStyle div:eq(0) a").bind("click", function() {
        $(this).addClass("textStyle_selected").siblings().removeClass("textStyle_selected");
    });
    $(".textStyle div:eq(1) a").unbind();
    $(".textStyle div:eq(1) a").bind("click", function() {
        $(this).addClass("textStyle_selected1").siblings().removeClass("textStyle_selected1");
    });
    //粗体，斜体
    $("a.icon-bgy15").unbind();
    $("a.icon-bgy15").bind('click', function() {
        if ($(this).hasClass("textStyle_selected")) {
            $(this).removeClass("textStyle_selected");
            $(".welcomeHeader span").css("fontWeight", "normal");
        } else {
            $(this).addClass("textStyle_selected");
            $(".welcomeHeader span").css("fontWeight", "bold");
        }
    });
    $("a.icon-bgy14").unbind();
    $("a.icon-bgy14").bind('click', function() {
        if ($(this).hasClass("textStyle_selected")) {
            $(this).removeClass("textStyle_selected");
            $(".welcomeHeader span").css("fontStyle", "normal");
        } else {
            $(this).addClass("textStyle_selected");
            $(".welcomeHeader span").css("fontStyle", "italic");
        }
    });
    // ===============================================
    // ===================动画控制====================
    // ===============================================
    $(".activeSkin").unbind();
    $(".activeSkin").bind('click', function() {
        if ($("#SelectSkin").hasClass("displayNone")) weicomeInitAnimation();
        else $("#SelectSkin").addClass("displayNone");
    });
    $("#colorSkin a").unbind();
    $("#colorSkin a").bind('click', function() {
        getcolor = $(this).find("i").css("backgroundColor");
        $(".activeSkin").css("background", getcolor);
        $(".welcomeInput").css("color", getcolor);
        $("#SelectSkin").addClass("displayNone");
    });
    // ===============================================
    // ===================欢迎保存====================
    // ===============================================
    var objoriginal = new Object();
    $("#saveWord").bind('click', function() {
        activeSave(this, 0);
    });

    function activeSave(that, number) {
        objoriginal.Text = $(".welcomeInput").val(); //欢迎词
        var welcomeVal = tramsformData(objoriginal.Text);
        objoriginal.FontSize = $(".canvasFont").val(); //字体大小
        getcolor = $(".publicInputEdit").css("color"); //字体颜色
        if (getcolor == "" || getcolor == undefined) {
            getcolor = "white";
            objoriginal.FontColor = getcolor.toString();
        } else objoriginal.FontColor = getcolor.toString();
        //objoriginal.FontColor = colorRGB2Hex(getcolor); 
        objoriginal.FontFamily = $("#fontFamily").find("option:selected").attr("data-font"); //字体类型
        objoriginal.FontStyle = $(".setStyle a.icon-bgy14").hasClass("textStyle_selected") ? "italic" : "normal"; //粗体，斜体
        objoriginal.FontWeight = $(".setStyle a.icon-bgy15").hasClass("textStyle_selected") ? "bold" : "normal"; //粗体，斜体
        objoriginal.CanvasLeft = parseInt($(".canvasLeft").val()); //左边距 600
        objoriginal.CanvasTop = parseInt($(".canvasTop").val()); //顶边距  300
        getcolor = null;
        // 背景图片
        var fileNameURL = $(".selectBorder").find("img").attr("src");
        if (fileNameURL == undefined) fileNameURL = $(".setBackground div:eq(0)").find("img").attr("src");
        var fileName = fileNameURL.split("/")[fileNameURL.split("/").length - 1]; //name
        objoriginal.BackgroundImg = $(".selectBorder").attr("indexid");
        //是否居中
        if ($("#centerChcek").prop("checked")) objoriginal.center = "positionClass";
        else objoriginal.center = "";
        var allHTML = "<html>" + "<head>" + "<meta charset=\"utf-8\">" + "<meta http-equiv=\"Expires\" content=\"0\">" + "<meta http-equiv=\"Pragma\" content=\"no-cache\">" + "<meta http-equiv=\"Cache-control\" content=\"no-cache\">" + "<meta http-equiv=\"Cache\" content=\"no-cache\">" + "<title>欢迎词</title>" + "<style type=\"text/css\">" + "*{margin: 0;padding: 0;}" + "html,body{width: 100%;height: 100%;position: relative;overflow: hidden;}" + ".a123 span{  font-family:" + objoriginal.FontFamily + ";position: absolute;white-space: pre;}" + ".positionClass{width: 100% !important;left: 0% !important;display: inline-block;text-align: center;}" + "</style>" + "</head>" + "<body>" + "<div style=\"width: 100%;height: 100%;background: url(" + fileNameURL + ") no-repeat center center/100%;\" class=\"a123\">" + "<span class=\"" + objoriginal.center + "\" style=\"font-size: " + objoriginal.FontSize + "px;color: " + objoriginal.FontColor + "; left: " + objoriginal.CanvasLeft + "px; top: " + objoriginal.CanvasTop + "px; font-weight: " + objoriginal.FontWeight + "; font-style: " + objoriginal.FontStyle + "; \">" + welcomeVal + "</span>" + "</div>" + "</body>" + "</html>";
        console.log("insert into WelcomingSpeech(JSONContent,BGImage,Type,siginalVal) values('" + allHTML + "','" + fileName + "','" + number + "','" + JSON.stringify(objoriginal) + "')");
        var ajaxVar = $.ajax({
            type: "POST",
            url: "/GWService.asmx/ExecuteSQL",
            timeout: 5000,
            data: {
                sql: "insert into WelcomingSpeech(JSONContent,BGImage,Type,siginalVal) values('" + allHTML + "','" + fileName + "','" + number + "','" + JSON.stringify(objoriginal) + "')",
                userName: window.localStorage.userName,
            },
            success: function(data) {
                $(that).attr("disabled", false);
                if ($(that).attr("id") == "viewsSave") {
                    get_no(that,WORDcommand.Priviewwel.equipNo, WORDcommand.Priviewwel.setNo, "");
                } else if ($(that).attr("id") == "saveWord") {
                    var dt = $(data).find('int').text(); //返回受影响行数
                    console.log(dt);
                    if (dt == 1) {
                        alertMsgSuccess.open();
                    } else alertMsgError.open();
                }
            }
        });
    }
    // ===============================================
    // ===================预览========================
    // ===============================================
    $("#viewsSave").unbind();
    $("#viewsSave").bind("click", function() {
        activeSave(this, 1);
    });
}
var fontWeight, fontHeight;
// ===============================================
// =====================动画函数==================
// ===============================================
function weicomeInitAnimation() { //可优化
    weicomeTestAnim("SelectSkin", "flipInX", 200);
}
//动画调用
function weicomeTestAnim(thatId, x, time) {
    setTimeout(function() {
        $('#' + thatId).removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('#' + thatId).removeClass(x + ' animated');
        });
    }, time);
};
//格式转换
function tramsformData(dataVal) {
    var lengthVal = dataVal.length;
    var stringVal = "";
    for (var i = 0; i < lengthVal; i++) {
        if (dataVal.charCodeAt(i) == 10) stringVal += "<br />";
        else if (dataVal.charCodeAt(i) == 32) stringVal += "&nbsp;&nbsp;";
        else stringVal += dataVal.charAt(i);
    }
    return stringVal;
}
//RGB转16进制 
function colorRGB2Hex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}
//active banner
function bannerActive_wel(that) {
    $(that).addClass("selectBorder").siblings().removeClass("selectBorder");
    $(".welcomeHeader").css("background", "url(" + $(that).find("img").attr("src") + ") no-repeat center center/100% 100%");
}