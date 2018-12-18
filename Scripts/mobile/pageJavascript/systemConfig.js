﻿var systemToastCenter;
function systemConfig(){
	switchToolbar("configTool");
	systemToastCenter = myApp.toast.create({
      text: "没有数据",
      position: 'center',
      closeTimeout: 1000,
     });
	var searchbar = myApp.searchbar.create({
	  el: '.searchbar',
	  searchContainer: '.list',
	  searchIn: 'li',
	  
	});
     $(".tabListConfig a").unbind();
     $(".tabListConfig a").bind("click",function(){
         $(this).addClass("tab-link-active").siblings().removeClass("tab-link-active");
         if(equipArrCon.length>0)
		 {
		 	var hrefConfig = $(".tabListConfig .tab-link-active").attr("href");
		 	if(hrefConfig == "#tab-1"){getEquip();}
		 	 else if(hrefConfig == "#tab-2"){getYc();}
		 		else if(hrefConfig == "#tab-3"){getYx();}
		 			else if(hrefConfig == "#tab-4"){getSet();}
		 }
     });
    equipsCon.length = equipArrCon.length = 0;
	getDataSet();
}
var equipsCon=[],equipArrCon=[],equipData,ycpData,yxpData,setData;
function getDataSet(){
	$.ajax({
		type:"post",
		url:"/GWService.asmx/EquipItemList",
		async:true,
		success: function (data) {
			var html ='<li class="allConfig" onclick="selectEquipListConfig(null,this)"><label class="ivu-checkbox-wrapper ivu-checkbox-wrapper-checked"  for="#checkConf_0"><span class="ivu-checkbox ivu-checkbox-checked"><span class="ivu-checkbox-inner"></span> <input type="checkbox" class="ivu-checkbox-input" id="checkConfig_0"></span>全选</label></li>';
	        $(data).find('string').each(function() {
	        	var dat=JSON.parse($(this).text())
	        	for(var i=0;i<dat.length;i++){
	        		if(dat[i].value!=""){
	        			equipsCon.push(dat[i].value);
	        			 html += `<li equip="${dat[i].value}" onclick="selectEquipListConfig('${dat[i].value}',this)"><label class="ivu-checkbox-wrapper ivu-checkbox-wrapper-checked" for="#checkConfig_'${(i+1)}'"><span class="ivu-checkbox ivu-checkbox-checked"><span class="ivu-checkbox-inner"></span> <input type="checkbox" class="ivu-checkbox-input" id="checkConfig_'${(i+1)}'"></span>${dat[i].name}</label></li>`;
	        		}
	        	}
	        	$(".equipListConfig").append(html);
	        });
    	}
	});
}
//设置
function selectEquipListConfig(equipNo,dt){
	
   if($(dt).hasClass("allConfig"))  //点击全选按钮
   {
   	  if($(dt).hasClass("check"))
   	  {
   	  	equipArrCon.length = 0;$(".equipListConfig li").removeClass("check").find("input").attr("checked",false);
   	  }
   	  else{
   	  	$(".allConfig").addClass("check").find("input").attr("checked",true);
		$(".equipListConfig li").not(".allConfig").each(function() {
			var equip = $(this).attr("equip");
			$(this).addClass("check").find("input").attr("checked",true);
			equipArrCon.push(equip);
		});
   	  }
   }
   else
   {
      if($(dt).hasClass("check"))
      {
      	   $(".allConfig").removeClass("check").find("input").attr("checked",false);
      	   $(dt).removeClass("check").find("input").attr("checked",false);
      	   equipArrCon.remove(equipNo);
      }
      else
      {
      	equipArrCon.push(equipNo);
      	equipsCon.length == equipArrCon.length?$(".allConfig").addClass("check").find("input").attr("checked",true):"";
        $(dt).addClass("check").find("input").attr("checked",true);
      }
   }
   //发送请求
	if(equipArrCon.length>0)
	 {
	 	$(".tabListConfig a.tab-link-active").click();
	 }
}

function getEquip(){
	var equip=equipArrCon.toString();
	$("#equipTable").html("");
	$("#tab-1 .progressbar-infinite").css({display:"block"});
	$.ajax({
		type:"post",
		url:"/GWService.asmx/GetSystemConfig",
		async:true,
		data:{
			 table_name:"Equip",
			 equip_no_list:equip
		},
		success:function(res){
			if($(res).find("string").text() == "false")
			{
				systemToastCenter.open();
			}
		    else
		    {
				var dat=JSON.parse($(res).find("string").text());
				for(var i=0;i<dat.length;i++){
				var html=`<li class="accordion-item">
				    	<a href="#" class="item-content item-link">
					        <div class="item-inner">
					          <div class="item-title">${dat[i].equip_nm}</div>
					        </div>
				    	</a>
				       <div class="accordion-item-content" >
				        <div class="block">
				          <div class="row  eventList">
				          	<div class="col-35  name">设备号：</div>
				          	<div class="col-65 con">${dat[i].equip_no}</div>
				          </div>
				          <div class="row  eventList">
				          	<div class="col-35  name">设备属性：</div>
				          	<div class="col-65 con">${dat[i].equip_detail}</div>
				          </div>
				          <div class="row  eventList">
				          	<div class="col-35  name">故障提示：</div>
				          	<div class="col-65 con">${dat[i].out_of_contact}</div>
				          </div>
				          <div class="row  eventList">
				          	<div class="col-35  name">报警文件：</div>
				          	<div class="col-65 con">${dat[i].event_wav}</div>
				          </div>
				          <div class="row  eventList">
				          	<div class="col-35  name">通讯端口：</div>
				          	<div class="col-65 con">${dat[i].local_addr}</div>
				          </div>
				          <div class="row  eventList">
				          	<div class="col-35  name">通讯地址：</div>
				          	<div class="col-65 con">${dat[i].equip_addr}</div>
				          </div>
				          
				        </div>
				      </div>
				</li>`
				$("#equipTable").append(html);
				}
				$("#tab-1 .progressbar-infinite").hide();
		    }

		}
	});
}
function getYc(){
	$("#tab-2 .progressbar-infinite").css({display:"block"});
	var equip=equipArrCon.toString()
	$("#ycp").html("");
	$.ajax({
		type:"post",
		url:"/GWService.asmx/GetSystemConfig",
		async:true,
		data:{
			 table_name:"ycp",
			  equip_no_list:equip
		},
		success:function(res){
			if($(res).find("string").text() == "false")
			{
				systemToastCenter.open();
			}
		    else
		    {
				var dat=JSON.parse($(res).find("string").text());
				for(var i=0;i<dat.length;i++){
					var html=`<li class="accordion-item">
								    	<a href="#" class="item-content item-link">
									        <div class="item-inner">
									          <div class="item-title">${dat[i].yc_nm}</div>
									        </div>
								    	</a>
								       <div class="accordion-item-content" >
								        <div class="block">
								          <div class="row  eventList">
								          	<div class="col-35  name">设备号：</div>
								          	<div class="col-65 con">${dat[i].equip_no}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">测点号：</div>
								          	<div class="col-65 con">${dat[i].yc_no}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">最小值：</div>
								          	<div class="col-65 con">${dat[i].physic_min}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">最大值：</div>
								          	<div class="col-65 con">${dat[i].physic_max}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">下限值：</div>
								          	<div class="col-65 con">${dat[i].val_min}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">上限值：</div>
								          	<div class="col-65 con">${dat[i].val_max}</div>
								          </div>
								          
								        </div>
								      </div>
								    </li>`
					$("#ycp").append(html);
				}
				$("#tab-2 .progressbar-infinite").hide();
			}
		}
	});
}
function getYx(){
	$("#tab-3 .progressbar-infinite").css({display:"block"});
	
	var equip=equipArrCon.toString()
	$("#yxp").html("");
	$.ajax({
		type:"post",
		url:"/GWService.asmx/GetSystemConfig",
		async:true,
		data:{
			 table_name:"yxp",
			  equip_no_list:equip
		},
		success:function(res){
			if($(res).find("string").text() == "false")
			{
				systemToastCenter.open();
			}
		    else
		    {
				var dat=JSON.parse($(res).find("string").text());
				for(var i=0;i<dat.length;i++){
					var html=`<li class="accordion-item">
								    	<a href="#" class="item-content item-link">
									        <div class="item-inner">
									          <div class="item-title">${dat[i].yx_nm}</div>
									        </div>
								    	</a>
								       <div class="accordion-item-content" >
								        <div class="block">
								          <div class="row  eventList">
								          	<div class="col-35  name">设备号：</div>
								          	<div class="col-65 con">${dat[i].yx_nm}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">测点号：</div>
								          	<div class="col-65 con">${dat[i].yx_no}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">0-1事件：</div>
								          	<div class="col-65 con">${dat[i].evt_01}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">1-0事件：</div>
								          	<div class="col-65 con">${dat[i].evt_10}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">操作命令：</div>
								          	<div class="col-65 con">${dat[i].main_instruction}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">操作参数：</div>
								          	<div class="col-65 con">${dat[i].minor_instruction}</div>
								          </div>
								          
								        </div>
								      </div>
								    </li>`;
					$("#yxp").append(html);
				}
				$("#tab-3 .progressbar-infinite").hide();
			}
		}
	});
}
function getSet(){
	$("#tab-4 .progressbar-infinite").css({display:"block"});
	var equip=equipArrCon.toString()
	$("#set").html("");
	$.ajax({
		type:"post",
		url:"/GWService.asmx/GetSystemConfig",
		async:true,
		data:{
			 table_name:"SetParm",
			  equip_no_list:equip
		},
		success:function(res){
			if($(res).find("string").text() == "false")
			{
				systemToastCenter.open();
			}
		    else
		    {
				var dat=JSON.parse($(res).find("string").text());
				for(var i=0;i<dat.length;i++){
					var html=`<li class="accordion-item">
								    	<a href="#" class="item-content item-link">
									        <div class="item-inner">
									          <div class="item-title">${dat[i].set_nm}</div>
									        </div>
								    	</a>
								       <div class="accordion-item-content" >
								        <div class="block">
								          <div class="row  eventList">
								          	<div class="col-35  name">设备号：</div>
								          	<div class="col-65 con">${dat[i].equip_no}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">设置号：</div>
								          	<div class="col-65 con">${dat[i].set_no}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">设置类型：</div>
								          	<div class="col-65 con">${dat[i].set_type}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35 name">操作命令：</div>
								          	<div class="col-65 con">${dat[i].main_instruction}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">操作参数：</div>
								          	<div class="col-65 con">${dat[i].minor_instruction}</div>
								          </div>
								          <div class="row  eventList">
								          	<div class="col-35  name">动作：</div>
								          	<div class="col-65 con">${dat[i].action}</div>
								          </div>
								          
								        </div>
								      </div>
								    </li>`
					$("#set").append(html);
				}
				$("#tab-4 .progressbar-infinite").hide();
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