function eventQuery(){
	switchToolbar("configTool");
	
	var startTimeModal = myApp.calendar.create({
	  inputEl: '#timePicker',
	  openIn: 'customModal',
	  header: false,
	  footer: true,
	  monthNames:['01','02','03','04','05','06','07','08','09','10','11','12'],
	  dateFormat: 'yyyy-mm-dd ',
	  cssClass:"startTime",
	  headerPlaceholder:"开始日期",
	  toolbarCloseText:"确定",
	  value: [new Date()],
	}),endTimeModal = myApp.calendar.create({
	  inputEl: '#timePicker2',
	  openIn: 'customModal',
	  header: false,
	  footer: true,
	  monthNames:['01','02','03','04','05','06','07','08','09','10','11','12'],
	  dateFormat: 'yyyy-mm-dd ',
	  cssClass:"startTime",
	  headerPlaceholder:"结束日期",
	  toolbarCloseText:"确定",
	  value: [new Date()],
	})

	$(".sureBtn,.hideShow").unbind();
	$(".hideShow").click(function(){
		$(".condition").css({height:"auto"})
		$(this).hide()
	})
	$(".sureBtn").click(function(){
		if($("#timePicker").val()==""){
			 myApp.dialog.alert('请选择开始日期',"温馨提示");
			 return;
		}else if($("#timePicker2").val()==""){
			 myApp.dialog.alert('请选择结束日期',"温馨提示");
			 return;
		}else{
			$(".condition").animate({height:"40px"},300,function(){
				$(".hideShow").show().text($("#timePicker").val()+"至  "+$("#timePicker2").val())
			})
			getSetEvent()
		}
	})
	$(".sureBtn").click();
	getData();
}
var equipsArray=[],equipArr=[];
function getData(){
	$.ajax({
		type:"post",
		url:"/GWService.asmx/EquipItemList",
		async:true,
		success: function (data) {
            var html = '<li id="all" onclick="addallEquip(this)"><label class="ivu-checkbox-wrapper ivu-checkbox-wrapper-checked" id="checkConf_0"><span class="ivu-checkbox ivu-checkbox-checked"><span class="ivu-checkbox-inner"></span> <input type="checkbox" class="ivu-checkbox-input"></span>全选</label></li>';
	        $(data).find('string').each(function() {
	        	var dat=JSON.parse($(this).text())
	        	for(var i=0;i<dat.length;i++){
	        		if(dat[i].value!=""){
	        			equipsArray.push(dat[i].value);
	        			html +=`<li equip="${dat[i].value}" onclick="addEquip('${dat[i].value}',this)"><label class="ivu-checkbox-wrapper ivu-checkbox-wrapper-checked" id="checkConf_0"><span class="ivu-checkbox ivu-checkbox-checked"><span class="ivu-checkbox-inner"></span> <input type="checkbox" class="ivu-checkbox-input"></span>${dat[i].name}</label></li>`;
	        		}
	        	}
	        	$(".equipList").append(html);
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
	addCla()

}
function addallEquip(dom){
	var hasCla=$(dom).hasClass("check");
	if(hasCla){
		$(dom).removeClass("check");
		equipArr=[];
	}else{
		$(dom).addClass("check");
		equipArr=[];
		for(var i=0;i<equipsArray.length;i++){
			equipArr.push(equipsArray[i])
		}
	}
	addCla()
}
function addCla(){
	console.log(equipArr)
	if(equipArr.length==equipsArray.length){
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
	getEvent()
}
function getEvent(){
	
	if($("#timePicker").val()==""){
		 myApp.dialog.alert('请选择开始日期',"温馨提示");
	}else if($("#timePicker2").val()==""){
		 myApp.dialog.alert('请选择结束日期',"温馨提示");
	}else{
		var data={
			equip_no_list:equipArr.toString(),
			times:$("#timePicker").val()+"00:00:00,"+$("#timePicker2").val()+"23:59:59"
		}
		QueryEquipEvt(data);
		QuerySetupsEvt(data);
	}
//	console.log(data)
	
}
function QueryEquipEvt(data){
	$("#tab-1 ul").html("")
	$.ajax({
		type:"post",
		url:"/GWService.asmx/QueryEquipEvt",
		async:true,
		data:data,
		success:function(res){
			var str=$(res).find("string").text();
			var dat=JSON.parse(str)
			for(var i=0;i<dat.length;i++){
				var html=`<li class="accordion-item">
							    	<a href="#" class="item-content item-link">
								        <div class="item-inner">
								          <div class="item-title">${dat[i].event}</div>
								          <div class="item-after">${dat[i].time}</div>
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
							        </div>
							      </div>
							    </li>`
				$("#tab-1 ul").append(html)
			}
			console.log(dat)
		}
	});
}
function QuerySetupsEvt(data){
	$("#tab-2 ul").html("")
	$.ajax({
		type:"post",
		url:"/GWService.asmx/QuerySetupsEvt",
		async:true,
		data:data,
		success:function(res){
			var str=$(res).find("string").text();
			var dat=JSON.parse(str);
			for(var i=0;i<dat.length;i++){
				var html=`<li class="accordion-item">
							    	<a href="#" class="item-content item-link">
								        <div class="item-inner">
								          <div class="item-title">${dat[i].event}</div>
								          <div class="item-after">${dat[i].time}</div>
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
							        </div>
							      </div>
							    </li>`
				$("#tab-2 ul").append(html)
			}
		}
	});
}
function getSetEvent(){
	var start=$("#timePicker").val(),
		end=$("#timePicker2").val();
	$("#tab-3 ul").html("")
	$.ajax({
		type:"post",
		url:"/GWService.asmx/QuerySystemEvt",
		async:true,
		data:{
			times:start+" 00:00:00,"+end+" 23:59:59"
		},
		success:function(res){
			var str=$(res).find("string").text();
			var dat=JSON.parse(str)
			for(var i=0;i<dat.length;i++){
				var html=`<li class="accordion-item">
							    	<a href="#" class="item-content item-link">
								        <div class="item-inner">
								          <div class="item-title">${dat[i].event}</div>
								          <div class="item-after">${dat[i].time}</div>
								        </div>
								        
							    	</a>
							       <div class="accordion-item-content">
							        <div class="block">
							          <div class="row  eventList">
							          	<div class="col-35  name">系统事件：</div>
							          	<div class="col-65 con">${dat[i].event}</div>
							          </div>
							        </div>
							      </div>
							    </li>`;
				$("#tab-3 ul").append(html)
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