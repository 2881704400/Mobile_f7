var toastCenter;
function eventQuery() {
    switchToolbar("configTool");
    toastCenter = myApp.toast.create({
      text: "没有数据",
      position: 'center',
      closeTimeout: 2000,
     });
    var startTimeModal = myApp.calendar.create({
            inputEl: '#timePicker',
            openIn: 'customModal',
            header: false,
            footer: true,
            monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            dateFormat: 'yyyy-mm-dd ',
            cssClass: "startTime",
            headerPlaceholder: "开始日期",
            toolbarCloseText: "确定",
            value: [new Date()],
        }),
        endTimeModal = myApp.calendar.create({
            inputEl: '#timePicker2',
            openIn: 'customModal',
            header: false,
            footer: true,
            monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            dateFormat: 'yyyy-mm-dd ',
            cssClass: "startTime",
            headerPlaceholder: "结束日期",
            toolbarCloseText: "确定",
            value: [new Date()],
        })
    $(".sureBtn,.hideShow").unbind();
    $(".hideShow").click(function() {
        $(".condition").css({
            height: "auto"
        })
        $(this).hide();
    })
    $(".sureBtn").click(function() {
        if ($("#timePicker").val() == "") {
            myApp.dialog.alert('请选择开始日期', "温馨提示");
            return;
        } else if ($("#timePicker2").val() == "") {
            myApp.dialog.alert('请选择结束日期', "温馨提示");
            return;
        } else {
            $(".condition").animate({
                height: "40px"
            }, 300, function() {
                $(".hideShow").show().text($("#timePicker").val() + "至  " + $("#timePicker2").val())
            })
            // getSetEvent();
        }
    })
    $(".sureBtn").click();

     $(".tabListQuery a").unbind();
     $(".tabListQuery a").bind("click",function(){
         $(this).addClass("tab-link-active").siblings().removeClass("tab-link-active");
	     var data = {
	        equip_no_list: equipArr.toString(),
	        times: $("#timePicker").val() + "00:00:00," + $("#timePicker2").val() + "23:59:59"
	     }
	     if(equipArr.length>0)
		 {
			var hrefConfig = $(".tabListQuery .tab-link-active").attr("href");
			if(hrefConfig == "#equipEventContent"){QueryEquipEvt(data);}
			else if(hrefConfig == "#setEventContent"){QuerySetupsEvt(data);}
			else if(hrefConfig == "#stsEventContent"){ getSetEvent();}
		 }
     });
    equipsArray.length = equipArr.length = 0;
    getData();
}
var equipsArray = [],
    equipArr = [];

function getData() {
    $.ajax({
        type: "post",
        url: "/GWService.asmx/EquipItemList",
        async: true,
        success: function(data) {
            var html = '<li class="all" onclick="selectEquipList(null,this)"><label class="ivu-checkbox-wrapper ivu-checkbox-wrapper-checked"  for="#checkConf_0"><span class="ivu-checkbox ivu-checkbox-checked"><span class="ivu-checkbox-inner"></span> <input type="checkbox" class="ivu-checkbox-input" id="checkConf_0"></span>全选</label></li>';
            $(data).find('string').each(function() {
                var dat = JSON.parse($(this).text())
                for (var i = 0; i < dat.length; i++) {
                    if (dat[i].value != "") {
                        equipsArray.push(dat[i].value);
                        html += `<li equip="${dat[i].value}" onclick="selectEquipList('${dat[i].value}',this)"><label class="ivu-checkbox-wrapper ivu-checkbox-wrapper-checked" for="#checkConf_'${(i+1)}'"><span class="ivu-checkbox ivu-checkbox-checked"><span class="ivu-checkbox-inner"></span> <input type="checkbox" class="ivu-checkbox-input" id="checkConf_'${(i+1)}'"></span>${dat[i].name}</label></li>`;
                    }
                }
                $(".equipListQuery").append(html);
            });
        }
    });
}


function selectEquipList(equipNo,dt){
   if($(dt).hasClass("all"))  //点击全选按钮
   {
   	  if($(dt).hasClass("check"))
   	  {
   	  	equipArr.length = 0;$(".equipListQuery li").removeClass("check").find("input").attr("checked",false);
   	  }
   	  else{
   	  	$(".all").addClass("check").find("input").attr("checked",true);
		$(".equipListQuery li").not(".all").each(function() {
			var equip = $(this).attr("equip");
			$(this).addClass("check").find("input").attr("checked",true);
			equipArr.push(equip);
		});
   	  }
   }
   else
   {
      if($(dt).hasClass("check"))
      {
      	   $(".all").removeClass("check").find("input").attr("checked",false);
      	   $(dt).removeClass("check").find("input").attr("checked",false);
      	   equipArr.remove(equipNo);
      }
      else
      {
      	equipArr.push(equipNo);
      	equipsArray.length == equipArr.length?$(".all").addClass("check").find("input").attr("checked",true):"";
        $(dt).addClass("check").find("input").attr("checked",true);
        
      }
   }
    getEvent();
}

function getEvent() {
    if ($("#timePicker").val() == "") {
        myApp.dialog.alert('请选择开始日期', "温馨提示");
    } else if ($("#timePicker2").val() == "") {
        myApp.dialog.alert('请选择结束日期', "温馨提示");
    } else {

	 	$(".tabListQuery a.tab-link-active").click();
    }
}

function QueryEquipEvt(data) {
    $("#equipEventContent ul").html("");
    $.ajax({
        type: "post",
        url: "/GWService.asmx/QueryEquipEvt",
        async: true,
        data: data,
        success: function(res) {
            var str = $(res).find("string").text();
           
            if(str == "false")
            {
               toastCenter.open();
            }
            else
            {
              var dat = JSON.parse(str),html="";
              for (var i = 0; i < dat.length; i++) {
                html += `<li class="accordion-item">
                                    <a href="#" class="item-content item-link">
                                        <div class="item-inner">
                                          <div class="item-title">${dat[i].event}</div>
                                          <div class="item-after"></div>
                                        </div>
                                    </a>
                                  <div class="accordion-item-content">
                                    <div class="block">
                                      
                                      <div class="row  eventList">
                                        <div class="col-35 name">设备名称：</div>
                                        <div class="col-65 con">${dat[i].equip_nm}</div>
                                      </div>
                                       <div class="row  eventList">
                                        <div class="col-35  name">设备事件：</div>
                                        <div class="col-65 con">${dat[i].event}</div>
                                      </div>
                                       <div class="row  eventList">
                                        <div class="col-35  name">时间：</div>
                                        <div class="col-65 con">${dat[i].time}</div>
                                      </div>                                      
                                    </div>
                                  </div>
                                </li>`
              }
               $("#equipEventContent>div").html("<ul>"+html+"</ul>");
            }
        }
    });
}

function QuerySetupsEvt(data) {
    $("#setEventContent ul").html("")
    $.ajax({
        type: "post",
        url: "/GWService.asmx/QuerySetupsEvt",
        async: true,
        data: data,
        success: function(res) {
            var str = $(res).find("string").text();
             if(str == "false")
            {
                toastCenter.open();
            }
            else
            {
              var dat = JSON.parse(str),html="";
              for (var i = 0; i < dat.length; i++) {
                  html += `<li class="accordion-item">
                      <a href="#" class="item-content item-link">
                          <div class="item-inner">
                            <div class="item-title">${dat[i].event}</div>
                            <div class="item-after"></div>
                          </div>
                      </a>
                      <div class="accordion-item-content">
                        <div class="block">
                          <div class="row  eventList">
                            <div class="col-35  name">设备名称：</div>
                            <div class="col-65 con">${dat[i].equip_nm}</div>
                          </div>
                           <div class="row  eventList">
                            <div class="col-35  name">设置事件：</div>
                            <div class="col-65 con">${dat[i].event}</div>
                          </div>
                           <div class="row  eventList">
                            <div class="col-35  name">时间：</div>
                            <div class="col-65 con">${dat[i].time}</div>
                          </div>  
                        </div>
                      </div>
                    </li>`
                 
              } $("#setEventContent>div").append("<ul>"+html+"</ul>");
            }

         }
    });
}

function getSetEvent() {
    var start = $("#timePicker").val(),
        end = $("#timePicker2").val();
    $("#stsEventContent ul").html("")
    $.ajax({
        type: "post",
        url: "/GWService.asmx/QuerySystemEvt",
        async: true,
        data: {
            times: start + " 00:00:00," + end + " 23:59:59"
        },
        success: function(res) {
            var str = $(res).find("string").text();
            if(str == "false")
            {
                toastCenter.open();
            }
            else
            {
            var dat = JSON.parse(str),html="";
            for (var i = 0; i < dat.length; i++) {
                html += `<li class="accordion-item">
							    	<a href="#" class="item-content item-link">
								        <div class="item-inner">
								          <div class="item-title">${dat[i].event}</div>
								          <div class="item-after"></div>
								        </div>
							    	</a>
							       <div class="accordion-item-content">
							        <div class="block">
							          <div class="row  eventList">
							          	<div class="col-35  name">系统事件：</div>
							          	<div class="col-65 con">${dat[i].event}</div>
							          </div>
                           <div class="row  eventList">
                            <div class="col-35  name">时间：</div>
                            <div class="col-65 con">${dat[i].time}</div>
                          </div>                          
							        </div>
							      </div>
							    </li>`;
               
            } $("#stsEventContent>div").append("<ul>"+html+"</ul>");
          }
        }
    });
}
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
