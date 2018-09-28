function systemConfig(){
	switchToolbar("configTool");
	getDataSet()
}
var equips=[],equipArr=[],equipData,ycpData,yxpData,setData;
function getDataSet(){
	$.ajax({
		type:"post",
		url:"/GWService.asmx/EquipItemList",
		async:true,
		success: function (data) {
	        $(data).find('string').each(function() {
	        	var dat=JSON.parse($(this).text())
	        	for(var i=0;i<dat.length;i++){
	        		if(dat[i].value!=""){
	        			equips.push(dat[i].value);
	        			var html=`<li equip="${dat[i].value}" onclick="addEquip('${dat[i].value}',this)">${dat[i].name}</li>`;
	        			$(".equipList").append(html);
	        		}
	        	}
//	        	$(".equipList").prepend(`<li id="all" onclick="addallEquip(this)">全选</li>`);
	            console.log(equips);
	        });
 
    	}
	});
}
function addEquip(equip,dom){
	if(equipArr.indexOf(equip)!=-1){
		equipArr.remove(equip);
	}else{
		equipArr.push(equip);
	}
	addCla();
	removeClass()

}
function removeClass(){
	$(".tabList a").each(function(){
		$(this).removeClass("tab-link-active")
	})
	$(".eventWrap .tab").each(function(){
		$(this).removeClass("tab-active")
	})
}
function addallEquip(dom){
	var hasCla=$(dom).hasClass("check");
	if(hasCla){
		$(dom).removeClass("check");
		equipArr=[];
	}else{
		$(dom).addClass("check");
		equipArr=[];
		for(var i=0;i<equips.length;i++){
			equipArr.push(equips[i])
		}
	}
	addCla()
}
function addCla(){
	console.log(equipArr)
	console.log(equips)
	if(equipArr.length==equips.length){
		$("#all").addClass("check")
	}else{
		$("#all").removeClass("check")
	}
	$(".equipList li").not("#all").each(function(){
		var equip=$(this).attr("equip");
		if(equipArr.indexOf(equip)!=-1){
			$(this).addClass("check")
		}else{
			$(this).removeClass("check")
		}
	})
	
//	getEvent()
	var equip=equipArr.toString();
// 	getEquip(equip);
// 	getYc(equip);
// 	getYx(equip);
// 	getSet(equip);
}
function getEquip(){
	var equip=equipArr.toString()
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
	});
}
function getYc(){
	$("#tab-2 .progressbar-infinite").css({display:"block"});
	var equip=equipArr.toString()
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
			var dat=JSON.parse($(res).find("string").text());
//			console.log(dat);
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
	});
}
function getYx(){
	$("#tab-3 .progressbar-infinite").css({display:"block"});
	
	var equip=equipArr.toString()
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
			var dat=JSON.parse($(res).find("string").text());
//			console.log(dat);
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
	});
}
function getSet(){
	$("#tab-4 .progressbar-infinite").css({display:"block"});
	var equip=equipArr.toString()
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
							          	<div class="col-35  name">操作命令：</div>
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
//			console.log(dat);
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