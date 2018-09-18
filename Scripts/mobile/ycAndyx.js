var flag=false;
function ycAndyx(){
	var urlstr=myApp.views.main.history,leng=urlstr.length;
	var url=urlstr[leng-1].split("#")[1]
	var equip_no=url.split("&")[0];
	var name=url.split("&")[1];
$(".ios .ptr-preloader").css({zIndex:"99"})
$(".ios .ptr-preloader .preloader").css({top:"66px"})
$(".ios .ptr-preloader .ptr-arrow").css({top:"66px"})


//	$("#titleStats").text('测试2');
//	realShows(2, "测试2");
	
//		$("#ycAndyx .title").text('界面控制')
//		realShows(1005, "界面控制")
		$("#titleStats").text(name)
		realShows(equip_no, name)
//		refresh("txt")
	
	

	
	
//	$("#yxp").scroll(function(){
//		var hei=$(this).scrollTop();
//		scroll(hei)
//		
//	})
//	$("#ycp").scroll(function(){
//		var hei=$(this).scrollTop();
//		scroll(hei)
//	})
//	$("#set").scroll(function(){
//		var hei=$(this).scrollTop();
//		scroll(hei)
//	})
	
}

function refresh(txt){
//	myApp.ptr.create('.ptr-content');
	$("#titleStats").attr("noTab",txt);
	if(txt=="#ycp"){
		$("#ycp").bind("scroll",function(){
			var hei=$(this).scrollTop();
			allowScroll(hei)
		});
		$("#set").unbind("scroll");
		$("#yxp").unbind("scroll");
	}
	else if(txt=="#yxp"){
		$("#yxp").bind("scroll",function(){
			var hei=$(this).scrollTop();
			allowScroll(hei)
		});
		$("#ycp").unbind("scroll");
		$("#set").unbind("scroll");
	}else {
		$("#set").bind("scroll",function(){
			var hei=$(this).scrollTop();
			allowScroll(hei)
		});
		$("#ycp").unbind("scroll");
		$("#yxp").unbind("scroll");
	}
}

function allowScroll(hei){
	if(hei==0){
		myApp.ptr.create('.ptr-content');
		var $ptrContent = $$('.ptr-content');
		$ptrContent.on('ptr:refresh', function (e) {
		  setTimeout(function () {
		  	var id=$("#titleStats").attr("noTab");
		  	var eqiup_no=$("#titleStats").attr("equip_no")
		  	if(id=="#ycp"){
		  		serviceDatas("yc",eqiup_no)
			}else if(id=="#yxp"){
				serviceDatas("yx",eqiup_no)
			}else {
				tableFills(equip_no, "", "set");
			}
		    myApp.ptr.done();
		  }, 2000);
		});
	}else{
//		console.log(33)
		if(myApp.ptr.get('#ycAndyx .ptr-content')){
			
			myApp.ptr.get('#ycAndyx .ptr-content').destroy();
		}
	}
}
//获取设备信息
function realShows(equip_no, name) {
    var _urlCount = service + "/EquipItemCount";
    var _dataCount = "equip_no=" + equip_no + "&&userName=" + window.localStorage.userName;
    function _callBackCount(dataCount) {
        var dataCountStr = $$(dataCount).children("string").text();
        if (dataCountStr != "false") {
            var useraCount = JSON.parse(dataCountStr);
            var countAll = [];
            for (var i = 0; i < useraCount.length; i++) {
                countAll.push(parseInt(useraCount[i].count));
            }
            realHtmls(countAll, equip_no, name);
        }
    }
    JQajaxo("post", _urlCount, true, _dataCount, _callBackCount);
}
function realHtmls(countAll,equip_no,name){
	if(countAll[0]>0){
		var html='<a href="#ycp" class="tab-link " onclick="refresh(\'#ycp\')">模拟量</a>';
		
		$("#ycAndyx .tabCon").append(html);
		loadYc(equip_no)
	}else{
		$("#ycp").remove();
	}
	if(countAll[1]>0){
		var html='<a href="#yxp" class="tab-link"  onclick="refresh(\'#yxp\')">状态量</a>';
		$("#ycAndyx .tabCon").append(html);
		loadYx(equip_no)
	}else{
		$("#yxp").remove();
	}
	if(countAll[2]>0){
		var html='<a href="#set" class="tab-link "  onclick="refresh(\'#set\')">设置</a>';
		$("#ycAndyx .tabCon").append(html);
		loadSet(equip_no)
	}else{
		$("#set").remove();
	}
	
	$(".tabCon a").eq(0).addClass("tab-link-active");
	$("#tabs .tab").eq(0).addClass("tab-active");
	$("#titleStats").attr("noTab",$(".tabCon a").eq(0).attr("href"));
	refresh($(".tabCon a").eq(0).attr("href"))
}
var titleStatID;
function loadYc(equip_no){
	serviceDatas("yc",equip_no);
}

function loadYx(equip_no){
	serviceDatas("yx",equip_no);
}
function loadSet(equip_no){
	tableFills(equip_no, "", "set");

}

function serviceDatas(tabList, equip) {
	titleStatID = 'titleStats';//设备状态
    var expression = '$E(' + equip + ')';
    var _urlExpre = service + "/ExpressionEval";
    var _dataExpre = "expression=" + expression + "&&userName=" + window.localStorage.userName;
    function _successExpre(data) {
        var text = $(data).text();
        var textAlarm = '';
        switch (text) {
            case '0': textAlarm = '未通讯'; break;
            case '1': textAlarm = '正常'; break;
            case '2': textAlarm = '有报警'; break;
            case '3': textAlarm = '正在进行设置'; break;
            case '4': textAlarm = '正在初始化'; break;
            case '5': textAlarm = '撤防';
        }
        $('#' + titleStatID).attr('equip_no', equip);
        $('#' + titleStatID).attr('textAlarm', text);
        tableFills(equip, text, tabList);//第一次载入数据
//      if (tabList != null) {
//          tableFills(equip, text, tabList);//第一次载入数据
//      }
//      else {
//          refreshDatas();//刷新数据
//      }
    }
    JQajaxo("post", _urlExpre, true, _dataExpre, _successExpre);
}
function tableFills(equip, alarm, tabList) {
    var _url = service + "/GetRealTimeData";
//  var tabListID = [];
    if(tabList=="yc"){
    	var _dataYcp = "equip_no=" + equip + "&&table_name=ycp";
    	JQajaxo("post", _url, true, _dataYcp, _successfYcp);
    	function _successfYcp(data){
	    	var resultJs = $(data).children("string").text();
	        if (resultJs != "false") {
	            jsonTodata(resultJs, "ycp", alarm);
	        }
	    }
    }
    if(tabList=="yx"){
    	var _dataYxp = "equip_no=" + equip + "&&table_name=yxp";
        JQajaxo("post", _url, true, _dataYxp, _successfYxp);
        function _successfYxp(data){
	    	var resultJs = $(data).children("string").text();
	        if (resultJs != "false") {
	            jsonTodata(resultJs, "yxp", alarm);
	        }
	    }
    }
    if(tabList=="set"){
    	setTodata(equip);
    }

}
function jsonTodata(data, tableName, alarm) {
    var usera = JSON.parse(data);
    
    if (tableName == "ycp") {
        $("#" + tableName ).html("");
        for (var i = 0; i < usera.length; i++) {
			dataCurve[i] = [usera[i].m_YCValue, usera[i].m_Unit]
            var alarmImg = '';
            if (alarm != '0') {
                if (usera[i].m_IsAlarm == 'False' || usera[i].m_IsAlarm == false) {
                    alarmImg = 'comOk';
                }
                else {
                    alarmImg = 'alarm';
                }
            }
            else {
                alarmImg = 'alarm';
            }
			var newRow=`<div class="itemOne" id="m_alarmycps_${i}">
			        		<p class="name">${usera[i].m_YCNm}</p>
			        		<ul>
			        			<li class="sta">
			        				<i class="iconfont icon-dian ${alarmImg}"></i>
			        			</li>
			        			<li class="sta">
			        				丨
			        			</li>
			        			<li id="valueycps_${i}">
			        				实时值 &nbsp;<span>${usera[i].m_YCValue}${usera[i].m_Unit}</span>
			        			</li>
			        			<li class="sta">
			        				丨
			        			</li>
			        			<li class="link" style="color:#3498db;" onclick="curveBox(${i},'${usera[i].m_YCNm}',this)">
			        				实时曲线
			        			</li>
			        		</ul>
			        	</div>`
//			 var newRow = `<div class="row">
//			        			<div class="col-15 state">
//				        			<i class="iconfont icon-dian ${alarmImg}"></i>
//				        		</div>
//				        		<div class="col-35 name">
//				        			${usera[i].m_YCNm}
//				        		</div>
//				        		<div class="col-25">
//				        			${usera[i].m_YCValue}${usera[i].m_Unit}
//				        		</div>
//				        		<div class="col-25 chart">
//				        			<i class="iconfont icon-tubiaofenxi"></i>
//				        		</div>
//			        		</div>`;
            if (alarmImg == 'alarm') {
//              $("#" + tableName + " .tabContent").prepend(newRow);
                 $("#" + tableName ).prepend(newRow);
            }
            else {
//              $("#" + tableName + " .tabContent").append(newRow);
                $("#" + tableName ).append(newRow);
                
            }
        }
    }
    else {
        $("#" + tableName ).html("");
        for (var j = 0; j < usera.length; j++) {
            var alarmImg = '';
            if (alarm != '0') {
                if (usera[j].m_IsAlarm == 'False' || usera[j].m_IsAlarm  == false) {
                    alarmImg = 'comOk';
                }
                else {
                    alarmImg = 'alarm';
                }
            }
            else {
                alarmImg = 'alarm';
            }
            var newRow =`<div class="itemOne" id="m_alarmyxps_${j}">
			        		<p class="name">${usera[j].m_YXNm}</p>
			        		<ul>
			        			<li class="sta">
			        				<i class="iconfont icon-dian ${alarmImg}"></i>
			        			</li>
			        			<li class="sta">
			        				丨
			        			</li>
			        			<li id="valueyxps_${j}">
			        				实时状态 &nbsp;<span>${usera[j].m_YXState}</span>
			        			</li>
			        		</ul>
			        	</div>`;
//			var newRow =`
//					<div class="row">
//	        			<div class="col-15 state">
//		        			<i class="iconfont icon-dian ${alarmImg}"></i>
//		        		</div>
//		        		<div class="col-45 name">
//		        			${usera[j].m_YXNm}
//		        		</div>
//		        		<div class="col-40">
//		        			${usera[j].m_YXState}
//		        		</div>
//			        </div>
//			` ;

            if (alarmImg == 'alarm') {
//              $("#" + tableName + " .tabContent").prepend(newRow);
                 $("#" + tableName ).prepend(newRow);
            }
            else {
//              $("#" + tableName + " .tabContent").append(newRow);
                 $("#" + tableName ).append(newRow);
            }
        }
    }
}
//获取设置表数据
function setTodata(equip) {
//  $("#" + tabLists).parent().addClass("tableAuto3");
    if (Control_Equip_List(equip) || Control_SetItem_List(equip, false)) {
        var _url = service + "/GetSystemConfig";
        var _dataSet = "equip_no_list=" + equip + "&&table_name=SetParm";
        JQajaxo("post", _url, true, _dataSet, _successfSet);
        function _successfSet(data) {
            $("#set .tabContent").html("");
            var resultJs = $(data).children("string").text();
            if (resultJs != "false" && resultJs != "") {
                jsonTobtn(resultJs, equip);
            }
        }
    }
    else {
        // $("#tableSeLi").hide();
    }
}
//创建设置表按钮
function jsonTobtn(data, confarr) {
	$("#set ").html("");
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.set_nm, userb.main_instruction, userb.minor_instruction, userb.value, userb.set_type);
        var set_nos1 = Control_Equip_List(confarr);
        var set_nos2 = Control_SetItem_List(confarr, userb.set_no);
        if (set_nos1 || set_nos2) {
        	 var newRow =`<div class="itemOne link" onclick="onSetClickBtn(${confarr},'${userc[1]}','${userc[2]}','${userc[3]}','${userc[0]}','${userc[4]}')">
			        		<p class="name">PC大屏-安诺地图首页</p>
			        	</div>`
//      	 var newRow =`
//      	 		<p class="row" onclick="onSetClickBtn(${confarr},'${userc[1]}','${userc[2]}','${userc[3]}','${userc[0]}','${userc[4]}')">
//						<button class="col button button-big">${userc[0]}</button>
//					</p>`;
//          var newRow = "<tr><td><a href='#' class=\"button button-big button-fill color-green\" onclick=\"onSetClickBtn(" + confarr + ",'" + userc[1] + "','" + userc[2] + "','" + userc[3] + "','" + userc[0] + "','" + userc[4] + "')\">" + userc[0] + "</a></td></tr>";
            $("#set ").append(newRow);
        }
    }
}
function onSetClickBtn(str_1, str_2, str_3, str_4, btnName, str_5){
	if (str_5 == "V") {
        myApp.dialog.create({
            title: btnName,
            text: "设置值：<br><input type=\"text\" class=\"modal-text-input\" id=\"setValues\" value=\"" + str_4 + "\">",
            buttons: [
              {
                  text: '取消'
              },
              {
                  text: '确定',
                  onClick: function () {
                      if ($("#setValues").val() != "") {
                          onSetCommand(str_1, str_2, str_3, $("#setValues").val(), btnName);
                      }
                  }
              }
            ]
        }).open();
    }
    else {
        myApp.dialog.create({
            title: btnName,
            text: '确定进行操作吗？',
            buttons: [
              {
                  text: '取消'
              },
              {
                  text: '确定',
                  onClick: function () {
                      onSetCommand(str_1, str_2, str_3, str_4, btnName);
                  }
              }
            ]
        }).open();
    }
}
//设置命令-确定
function onSetCommand(str_1, str_2, str_3, str_4, dt) {
    var vals = "";
    if (str_4 == "") {
        vals = $("#setValues").val();
    }
    else {
        vals = str_4;
    }
    var userName = window.localStorage.userName;
    if (userName == null || userName == "") {
        userName = window.sessionStorage.userName;
    }
    var _url = service + "/SetupsCommand";
    var _dataSet = "equip_no=" + encodeURIComponent(str_1) + "&&main_instruction=" + encodeURIComponent(str_2) + "&&minor_instruction=" + encodeURIComponent(str_3) + "&&value=" + encodeURIComponent(vals) + "&&user_name=" + encodeURIComponent(userName);
    JQajaxo("post", _url, true, _dataSet, _successfSet);
    function _successfSet(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            setTimeout(function () {
                refreshDatas();
//              allEquipSatatus();
            }, 3500);
        }
    }
}
//曲线点
var curveDrop = -9;
//遥测表曲线值
var dataCurve = new Array();
//动态数据
var dynamicCurve;
function curveBox(number,nameCurve,dts){
	var curveHeight = 300;//曲线高度
//  if ($(window).width() > 768) {
//      curveHeight = 400;
//  }
     myApp.request.get("plug/popoverCurve.html", "", function (data) {
     	var popoverHTML=data;
     	myApp.popover.create({
                targetEl: "#ycp",
                content: popoverHTML,
        }).open();
     	$("#poverCurveTitle").html(nameCurve);
     	 Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $(".poverCurve").css({"top":"50%","left":"50%","transform":"translate(-50%,-50%)"})
        $('#highcharts').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                height: curveHeight,
                events: {
                    load: function () {
                        clearInterval(dynamicCurve);
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        var yVals = 0;
                        if (!isNaN(yVals)) {
                            yVals = parseFloat(dataCurve[number][0]);
                        } else {
                            yVals = 0;
                        }
                        var x = (new Date()).getTime(), // current time
                           // y = parseInt(10 * Math.random());//Math.random()*10;
                            y = yVals;
                        series.addPoint([x, y], true, true);
                        dynamicCurve = setInterval(function () {
                            if ($("#poverCurveTitle").length < 1) {
                                clearInterval(dynamicCurve);
                                return;
                            }
                            refreshDatas();
                            var yVals = 0;
                            if (!isNaN(yVals)) {
                                yVals = parseFloat(dataCurve[number][0]);
                            } else {
                                yVals = 0;
                            }
                            var x = (new Date()).getTime(), // current time
                               // y = parseInt(10 * Math.random());//Math.random()*10;
                                y = yVals;
                            series.addPoint([x, y], true, true);
                        }, 3000);
                    }
                },
                backgroundColor: 'none'
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 120,
                style: {
                    color: '#000'
                },
                labels: {
                    style: {
                        color: '#000'
                    }
                },
            },
            yAxis: {
                title: {
                    text: '',
                    style: {
                        color: '#000'
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                labels: {
                    style: {
                        color: '#000'
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: '当前值：',
                data: (function () {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
                    for (i = curveDrop, j = 0; i <= 0; i++, j++) {
                        data.push({
                            x: time + i * 1000,
                            y: null
                            //y: parseInt(100 * Math.random())
                        });
                    }
                    return data;
                })()
            }]
        });
     })
  
   
}
//刷新遥测表，遥信表数据
function refreshDatas() {
    var equip_no = $('#' + titleStatID).attr('equip_no');
    if (equip_no == undefined) {
        return;
    }
    var alarm = $('#' + titleStatID).attr('textAlarm');
    var _url = service + "/GetRealTimeData";
    var _dataYcp = "equip_no=" + equip_no + "&&table_name=ycp";
    JQajaxo("post", _url, true, _dataYcp, _successfYcp);
    var _dataYxp = "equip_no=" + equip_no + "&&table_name=yxp";
    JQajaxo("post", _url, true, _dataYxp, _successfYxp);
    function _successfYcp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            ycpToHtml(resultJs);
        }
    }
    function _successfYxp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            yxpToHtml(resultJs);
        }
    }
//
    function ycpToHtml(data) {
        var usera = JSON.parse(data);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.m_IsAlarm, userb.m_YCValue, userb.m_AdviceMsg, userb.m_YCNm, userb.m_Unit);
            dataCurve[i] = new Array(userb.m_YCValue, userb.m_Unit);
            var alarmImg = '';
            if (alarm != '0') {
                if (userc[0] == 'False' || userc[0] == false) {
                    alarmImg = 'comOk';
                }
                else {
                    alarmImg = 'alarm';
                }
            }
            else {
                alarmImg = 'alarm';
            }
            
            $('#m_alarmycps_' + i).find("i").addClass(alarmImg);
            $("#valueycps_" + i).find("span").html(userc[1] + userc[4]);
            
            if (alarmImg == 'alarm') {//有报警置顶
                var dom = $("#valueycps_" + i).parents(".itemOne");
                var doms = dom.parent();
                dom.remove();
                doms.prepend(dom);
            }
        }
    }
//
    function yxpToHtml(data) {
        var usera = JSON.parse(data);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.m_IsAlarm, userb.m_YXState, userb.m_AdviceMsg);
            var alarmImg = '';
            if (alarm != '0') {
                if (userc[0] == 'False' || userc[0] == false) {
                    alarmImg = 'comOk';
                }
                else {
                    alarmImg = 'alarm';
                }
            }
            else {
                alarmImg = 'alarm';
            }
            $('#m_alarmyxps_' + i).find('i').addClass(alarmImg);
            $("#valueyxps_" + i).find("span").html(userc[1]);
            if (alarmImg == 'HaveAlarm') {
                var dom = $("#valueyxps_" + i).parents(".itemOne");
                var doms = dom.parent();
                dom.remove();
                doms.prepend(dom);
            }
        }
    }
}