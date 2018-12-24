var equipHtml=[
	 {lable:"设备号",key:"equip_no"},{lable:"设备名称",key:"equip_nm"},{lable:"关联界面",key:"related_pic"},{lable:"设备属性",key:"equip_detail"},
	 {lable:"通讯刷新周期",key:"acc_cyc"},{lable:"故障处理意见",key:"proc_advice"},{lable:"故障提示",key:"out_of_contact"},{lable:"故障恢复提示",key:"contacted"},
	 {lable:"报警声音文件",key:"event_wav"},{lable:"通讯端口",key:"local_addr"},{lable:"设备地址",key:"equip_addr"},{lable:"通讯参数",key:"communication_param"},
	 {lable:"通讯时间参数",key:"communication_time_param"},{lable:"报警升级周期（分钟）",key:"AlarmRiseCycle"},{lable:"模板设备号",key:"raw_equip_no"},
	 {lable:"附表名称",key:"tabname"},{lable:"属性",key:"attrib"},{lable:"安全时段",key:"SafeTime"},{lable:"关联视频",key:"related_video"},
	 {lable:"资产编号",key:"ZiChanID"},{lable:"预案号",key:"PlanNo"},
	 {lable:"是否显示报警",key:"alarm",type:"showAlarm,sheet-alarm",value:1},
	 {lable:"是否记录报警",key:"alarm",type:"markAlarm,sheet-alarm",value:2}
	
]
var ychtml=[
	{lable:"设备号",key:"equip_no"},{lable:"模拟量编号",key:"yc_no"},{lable:"模拟量名称",key:"yc_nm"},{lable:"单位",key:"unit"},
	{lable:"属性值",key:"val_trait"},{lable:"下限值",key:"val_min"},{lable:"上限值",key:"val_max"},{lable:"最小值",key:"physic_min"},
	{lable:"最大值",key:"physic_max"},{lable:"操作命令",key:"main_instruction"},{lable:"操作参数",key:"minor_instruction"},
	{lable:"处理意见",key:"proc_advice"},{lable:"报警级别",key:"lvl_level"},{lable:"声音文件",key:"wave_file"},{lable:"报警屏蔽",key:"alarm_shield"},
	{lable:"安全时段",key:"SafeTime"},{lable:"回复下限值",key:"restore_min"},{lable:"回复上限值",key:"restore_max"},{lable:"实测最小值",key:"yc_min"},
	{lable:"实测最大值",key:"yc_max"},{lable:"越下限事件",key:"outmin_evt"},{lable:"越上限事件",key:"outmax_evt"},{lable:"曲线记录阈值",key:"curve_limit"},
	{lable:"报警升级周期",key:"AlarmRiseCycle"},{lable:"起始安全时段",key:"safe_bgn"},{lable:"结束安全时段",key:"safe_end"},{lable:"越线滞纳时间（秒）",key:"alarm_acceptable_time"},
	{lable:"恢复滞纳时间（秒）",key:"alarm_repeat_time"},{lable:"重复报警时间（分钟）",key:"restore_acceptable_time"},{lable:"关联界面",key:"related_pic"},{lable:"关联视频",key:"related_video"},
	{lable:"资产编号",key:"ZiChanID"},{lable:"预案号",key:"PlanNo"},{lable:"是否曲线记录",key:"curve_rcd",type:"curve_rcd,sheet-alarm"},{lable:"是否比例变换",key:"mapping",type:"mapping,sheet-alarm"},
	{lable:"是否显示报警",key:"alarm",type:"showAlarm,sheet-alarm",value:0},
	 {lable:"是否记录报警",key:"alarm",type:"markAlarm,sheet-alarm",value:1}
	
]
var yxhtml=[
	{lable:"设备号",key:"equip_no"},{lable:"模拟量编号",key:"yx_no"},{lable:"状态量名称",key:"yx_nm"},{lable:"0-1事件",key:"evt_01"},
	{lable:"1-0事件",key:"evt_10"},{lable:"处理意见0-1",key:"proc_advice_r"},{lable:"处理意见1-0",key:"proc_advice_d"},{lable:" 0-1级别",key:"level_r"},
	{lable:"1-0级别",key:"level_d"},{lable:"初始状态",key:"initval"},{lable:"属性值",key:"val_trait"},{lable:"操作命令",key:"main_instruction"},
	{lable:"操作参数",key:"minor_instruction"},{lable:"越线滞纳时间（秒）",key:"alarm_acceptable_time"},{lable:"恢复滞纳时间（秒）",key:"alarm_repeat_time"},{lable:"重复报警时间（分钟）",key:"restore_acceptable_time"},
	{lable:"声音文件",key:"wave_file"},{lable:"报警屏蔽",key:"alarm_shield"},{lable:"报警升级周期（分钟）",key:"AlarmRiseCycle"},{lable:"安全时段",key:"SafeTime"},
	{lable:"关联页面",key:"related_pic"},{lable:"关联视频",key:"related_video"},{lable:"资产编号",key:"ZiChanID"},{lable:"预案号",key:"PlanNo"},
	{lable:"是否取反",key:"inversion",type:"inversion,sheet-alarm"},
	{lable:"是否显示报警",key:"alarm",type:"showAlarm,sheet-alarm",value:0},
	 {lable:"是否记录报警",key:"alarm",type:"markAlarm,sheet-alarm",value:1}
]
var sethtml=[
	{lable:"设备号",key:"equip_no"},{lable:"设置号",key:"set_no"},{lable:"设置名称",key:"set_nm"},{lable:"值",key:"value"},
	{lable:"设置类型",key:"set_type"},{lable:"动作",key:"action"},{lable:"操作命令",key:"main_instruction"},{lable:" 操作参数",key:"minor_instruction"},
	{lable:"是否记录",key:"record",type:"record,sheet-alarm"},{lable:"是否可执行",key:"canexecution",type:"canexecution,sheet-alarm"}
]

var systemToastCenter;
var selectEquiId=[],videoList={},acessList={};
function systemConfig(){
	switchToolbar("configTool");

//	calendarRange.open()
//	myApp.sheet.open('.sheet-config')
//	myApp.popup.open(".popup-condition")
//	myApp.sheet.open('.sheet-alarm')
//	myApp.sheet.open('.sheet-zichan')
//	myApp.sheet.open('.sheet-video')
//	myApp.sheet.open('.sheet-paln')
//myApp.popup.open(".popup-config");
	var searchbar=myApp.searchbar.create({
		el:'.searchbar',
		searchContainer:'.eq-list',
		searchIn:'.item-title'
	})

	selectEquiId=[9,10,21];
	getEquipList();
	getAccessList();
	getlinkVideoList();
	getPlanList();
	getAlarmWayList();
	getEquipSelect(selectEquiId);
	getYcSelect(selectEquiId);
	getYxSelect(selectEquiId);
	getSetSelect(selectEquiId);
	
//	$(".sheet-alarm .eq-list ul li").each(function(){
//		$(this).click(function(){
//			var val= $(this).find("input").val();
//			var check=$(this).find("input").prop("checked");
//			
//			if(val==0&&val!=canEdict){
//				alarmCode-=edictAlarmCode;
//				canEdict=val;
//				$("#"+edictDom).val("否");
//			}
//			if(val==1&&val!=canEdict){
//				alarmCode-=edictAlarmCode;
//				canEdict=val;
//				$("#"+edictDom).val("是");
//			}
//			
//			console.log(alarmCode);
//		})
//		
//		
//	})
}

function getSetSelect(arr){
	var str=arr.toString();
	$.when(AlarmCenterContext.setSetConfig(str)).done(function(e){
		console.log(e);
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				var html='<li class="swipeout" onclick="loadInfor(3,'+valueStr+')">'+
					        '<div class="item-content  swipeout-content">'+
						        '<div class="item-inner">'+
						          '<div class="item-title">'+value.set_nm+'</div>'+
						        '</div>'+
						      '</div>'+
						      '<div class="swipeout-actions-right">'+
						        '<a href="#"  class="swipeout-delete">编辑</a>'+
						      '</div>'+							    	
						'</li>';
				$("#set").append(html)
			}
		}
	})
}
function getYxSelect(arr){
	var str=arr.toString();
	$.when(AlarmCenterContext.setYxConfig(str)).done(function(e){
		console.log(e);
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				var html='<li class="swipeout" onclick="loadInfor(2,'+valueStr+')">'+
					        '<div class="item-content  swipeout-content">'+
						        '<div class="item-inner">'+
						          '<div class="item-title">'+value.yx_nm+'</div>'+
						        '</div>'+
						      '</div>'+
						      '<div class="swipeout-actions-right">'+
						        '<a href="#"  class="swipeout-delete">编辑</a>'+
						      '</div>'+							    	
						'</li>';
				$("#yxp").append(html)
			}
		}
	})
}
function getYcSelect(arr){
	var str=arr.toString();
	$.when(AlarmCenterContext.setYcConfig(str)).done(function(e){
		console.log(e);
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				var html='<li class="swipeout" onclick="loadInfor(1,'+valueStr+')">'+
					        '<div class="item-content  swipeout-content">'+
						        '<div class="item-inner">'+
						          '<div class="item-title">'+value.yc_nm+'</div>'+
						        '</div>'+
						      '</div>'+
						      '<div class="swipeout-actions-right">'+
						        '<a href="#"  class="swipeout-delete">编辑</a>'+
						      '</div>'	+									    	
						'</li>';
				$("#ycp").append(html);
			}
		}
	})
}
//var edictData;
function getEquipSelect(arr){
	var str=arr.toString();
	$.when(AlarmCenterContext.setEquipConfig(str)).done(function(e){
		console.log(e);
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				var html='<li class="swipeout" onclick="loadInfor(0,'+valueStr+')">'+
					        '<div class="item-content  swipeout-content">'+
						        '<div class="item-inner">'+
						          '<div class="item-title">'+value.equip_nm+'</div>'+
						        '</div>'+
						      '</div>'+
						      '<div class="swipeout-actions-right">'+
						        '<a href="#"  class="swipeout-delete">编辑</a>'+
						      '</div>'	+									    	
						'</li>';
				$("#equipTable").append(html);
			}
		}
	})
}
var alarmCode=0,updateAlarmCode=0,canEdict,edictDom,edictType;
var canexecution,record,inversion,mapping,curve_rcd;
function loadInfor(deal,str){
	console.log(str);
	alarmCode=str.alarm_scheme;
	edictType=deal;
//	updateAlarmCode=str.alarm_scheme;
//	$(".popup-config .inforList").html("");
	
	myApp.popup.open(".popup-config");
	$(".popup-config .inforList ul").html("");
	$(".popup-config .edictList ul").html("");
	if(deal==0){
		for(var i=0;i<equipHtml.length;i++){
			var value=equipHtml[i];
			var boolStr=value.type;
			
			loadInforHtml(value.lable,str[value.key],boolStr,value.key,value.value,'.popup-config .inforList ul');
			loadEdictHtml(value.lable,str[value.key],value.key,value.value,value.type,'.popup-config .edictList ul');
		}
	}else if(deal==1){
		for(var i=0;i<ychtml.length;i++){
			var value=ychtml[i];
			var boolStr=value.type;
			loadInforHtml(value.lable,str[value.key],boolStr,value.key,value.value,'.popup-config .inforList ul');
			loadEdictHtml(value.lable,str[value.key],value.key,value.value,value.type,'.popup-config .edictList ul');
		}
	}else if(deal==2){
		for(var i=0;i<yxhtml.length;i++){
			var value=yxhtml[i];
			var boolStr=value.type;
			loadInforHtml(value.lable,str[value.key],boolStr,value.key,value.value,'.popup-config .inforList ul');
			loadEdictHtml(value.lable,str[value.key],value.key,value.value,value.type,'.popup-config .edictList ul');
		}
	}else{
		for(var i=0;i<sethtml.length;i++){
			var value=sethtml[i];
			var boolStr=value.type;
			loadInforHtml(value.lable,str[value.key],boolStr,value.key,value.value,'.popup-config .inforList ul');
			loadEdictHtml(value.lable,str[value.key],value.key,value.value,value.type,'.popup-config .edictList ul');
		}
	}
	
}
function loadInforHtml(label,key,boolStr,id,value,dom){
	var html="";
	var boolArr;
//	$(dom).html("")
	if(boolStr){
		boolArr=boolStr.split(",");
	}
//	console.log(value);
//	videoList={},acessList={}
	if(id=="related_video"){
		html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">'+videoList[key]+'</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
	}else if(id=="ZiChanID"){
		html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">'+acessList[key]+'</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
	}
	else if(id=="curve_rcd"){
		if(key){
			html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">是</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
		}else{
			html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">否</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
		}
	}
	else if(id=="mapping"){
		if(key){
			html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">是</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
		}else{
			html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">否</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
		}
	}
	else if(id=="inversion"){
		if(key){
			html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">是</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
		}else{
			html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">否</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
		}
	}
	else if(id=="record"){
		if(key){
			html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">是</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
		}else{
			html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">否</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
		}
	}
	else if(id=="canexecution"){
		if(key){
			html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">是</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
		}else{
			html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">否</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
		}
	}
	else if(id=="alarm"){

		if((alarmCode & value) > 0){
			html='<li>'+
			      '<div class="item-content">'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			          '<div class="item-after">是</div>'+
			        '</div>'+
			      '</div>'+
			    '</li>';
		}else{
			html='<li>'+
			      '<div class="item-content">'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			          '<div class="item-after">否</div>'+
			        '</div>'+
			      '</div>'+
			    '</li>';
		}
	}
	else if(id=="alarmWay"){

		if((alarmCode & value) > 0){

			html='<li>'+
			      '<div class="item-content">'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			          '<div class="item-after">是</div>'+
			        '</div>'+
			      '</div>'+
			    '</li>';
		}else{

			html='<li>'+
			      '<div class="item-content">'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			          '<div class="item-after">否</div>'+
			        '</div>'+
			      '</div>'+
			    '</li>';
		}
	}
	else{
		html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">'+key+'</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
	}
	
	$(dom).append(html);
}
function loadEdictHtml(label,key,id,value,type,dom){
//	console.log(label,key,dom)
//	$(dom).html("")
	var html="",alrmId;
	if(type){
		alrmId=type.split(",")[0];
	}
	if(id=="equip_no"||id=="yc_no"||id=="yx_no"||id=="set_no"){
		html='<li class="item-content item-input">'+
			      '<div class="item-inner">'+
			        '<div class="item-title item-label">'+label+'</div>'+
			        '<div class="item-input-wrap">'+
			          '<input type="text" id="'+id+'" disabled   placeholder="'+label+'" value="'+key+'">'+
			          '<span class="input-clear-button"></span>'+
			        '</div>'+
			      '</div>'+
				'</li>';
	}else if(id=="related_video"){

		html='<li class="item-content item-input" onclick="showVideoSheet(this,\''+key+'\')">'+
			      '<div class="item-inner">'+
			        '<div class="item-title item-label">'+label+'</div>'+
			        '<div class="item-input-wrap">'+
			          '<input type="text" id="'+id+'" upval="'+key+'" readonly placeholder="'+label+'" value="'+videoList[key]+'">'+
			          '<span class="input-clear-button"></span>'+
			        '</div>'+
			      '</div>'+
				'</li>';
	}else if(id=="ZiChanID"){
		html='<li class="item-content item-input" onclick="showZiChanSheet(this,\''+key+'\')">'+
			      '<div class="item-inner">'+
			        '<div class="item-title item-label">'+label+'</div>'+
			        '<div class="item-input-wrap">'+
			          '<input type="text" id="'+id+'" upval="'+key+'" readonly placeholder="'+label+'" value="'+acessList[key]+'">'+
			          '<span class="input-clear-button"></span>'+
			        '</div>'+
			      '</div>'+
				'</li>';
		
	}else if(id=="PlanNo"){
		html='<li class="item-content item-input"  onclick="showPlanSheet(this,\''+key+'\')">'+
			      '<div class="item-inner">'+
			        '<div class="item-title item-label">'+label+'</div>'+
			        '<div class="item-input-wrap">'+
			          '<input type="text" id="'+id+'" upval="'+key+'"  readonly  placeholder="'+label+'" value="'+key+'">'+
			          '<span class="input-clear-button"></span>'+
			        '</div>'+
			      '</div>'+
				'</li>';
	}
	else if(id=="curve_rcd"){
		if(key){
			html='<li onclick="edictCur(dom)>'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="1" ckecked />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';
		}else{
			html='<li  onclick="edictCur(dom)>'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="0"  />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';
		}
		curve_rcd=key;
	}else if(id=="mapping"){
		if(key){
			html='<li onclick="edictMap(this)>'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="1" ckecked />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}else{
			html='<li  onclick="edictMap(this)>'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'"  type="checkbox" name="demo-checkbox" value="0"  />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}
		mapping=key;
	}
	else if(id=="inversion"){
		if(key){
			html='<li onclick="edictInver(this,1)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="1"  checked />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}else{
			html='<li  onclick="edictInver(this,1)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="0"   />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}
		inversion=key;
	}
	else if(id=="record"){
		if(key){
			html='<li  onclick="edictRecord(this,1)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="1"  checked />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}else{
			html='<li  onclick="edictRecord(this,0)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="0"   />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}
		record=key;
	}
	else if(id=="canexecution"){
		if(key){
			html='<li>'+
			      '<label class="item-checkbox item-content" onclick="edictCanexe(this,1)">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="1"  checked />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}else{
			html='<li>'+
			      '<label class="item-checkbox item-content"  onclick="edictCanexe(this,0)">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="0"  />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}
		canexecution=key;
	}
	
	else if(id=="alarm"){

		if((alarmCode & value) > 0){
			html='<li onclick="edictAlarmCode(this,'+value+')">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="alarm"  type="checkbox" name="demo-checkbox" value="'+value+'"  checked />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}else{
			html='<li  onclick="edictAlarmCode(this,'+value+')">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="alarm"  type="checkbox" name="demo-checkbox"  value="'+value+'"   />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}
	}
	else if(id=="alarmWay"){

		if((alarmCode & value) > 0){
			html='<li  onclick="edictAlarmCode(this,'+value+')">'+
			      '<label class="item-checkbox item-content">'+
			        '<input   type="checkbox" name="demo-checkbox"   value="'+value+'" checked  />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}else{
			html='<li  onclick="edictAlarmCode(this,'+value+')">'+
			      '<label class="item-checkbox item-content">'+
			        '<input   type="checkbox" name="demo-checkbox"   value="'+value+'"   />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}
	}
	else{
		html='<li class="item-content item-input">'+
			      '<div class="item-inner">'+
			        '<div class="item-title item-label">'+label+'</div>'+
			        '<div class="item-input-wrap">'+
			          '<input type="text" id="'+id+'"    placeholder="'+label+'" value="'+key+'">'+
			          '<span class="input-clear-button"></span>'+
			        '</div>'+
			      '</div>'+
				'</li>';
	}

	
	$(dom).append(html);
}




function edictCur(dom){
	var check=$(dom).find("input").prop("checked");
	if(check){
		curve_rcd=false;
	}else{
		curve_rcd=true;
	}
}
function edictMap(dom){
	var check=$(dom).find("input").prop("checked");
	if(check){
		mapping=false;
	}else{
		mapping=true;
	}
}
function edictInver(dom,deal){
	var check=$(dom).find("input").prop("checked");
	if(check){
		inversion=false;
	}else{
		inversion=true;
	}
}
function edictRecord(dom,deal){
	var check=$(dom).find("input").prop("checked");
	if(check){
		record=false;
	}else{
		record=true;
	}
}
function edictCanexe(dom,deal){
	var check=$(dom).find("input").prop("checked");
	if(check){
		canexecution=false;
	}else{
		canexecution=true;
	}
}
function edictAlarmCode(dom,code){
	var check=$(dom).find("input").prop("checked");
	console.log(check)
	if(check){
		/*减*/
		alarmCode-=code;
	}else{
		/*加*/
		alarmCode+=code;
	}
	console.log(alarmCode);
}
function showVideoSheet(dom,videoid){
	$(".sheet-video .eq-list li").each(function(){
		var id=$(this).find("input").val();
		if(id==videoid){
			$(this).find("input").prop("checked",true);
			
		}else{
			$(this).find("input").prop("checked",false);
		}
	})
	
	myApp.sheet.open('.sheet-video')
}
function showZiChanSheet(dom,zichanid){
	$(".sheet-zichan .eq-list li").each(function(){
		var id=$(this).find("input").val();
		if(id==zichanid){
			$(this).find("input").prop("checked",true)
			
		}else{
			$(this).find("input").prop("checked",false)
		}
	})
	myApp.sheet.open('.sheet-zichan')
}
function showPlanSheet(dom,plan){
	console.log(plan)
	$(".sheet-paln .eq-list li").each(function(){
		var id=$(this).find("input").val();
		if(id==plan){
			$(this).find("input").prop("checked",true)
			
		}else{
			$(this).find("input").prop("checked",false)
		}
	})
	myApp.sheet.open('.sheet-paln')
}

function loadInforEdict(dom){
	$(dom).parents(".inforList").hide();
	$(dom).parents(".inforList").siblings(".edictList").show();
}
function cancelInforEdict(dom){
	$(dom).parents(".edictList").hide();
	$(dom).parents(".edictList").siblings(".inforList").show();
}
function loadPopupInfor(){
	myApp.popup.close(".popup-config")
	$(".inforList").show();
	$(".edictList").hide();
}
function getEquipList(){
	$.when(AlarmCenterContext.getEquipList()).done(function(e) {

		var dat=JSON.parse(e.d),lg=dat.length;
		if(lg&&lg>0){
			for(var i=0;i<lg;i++){
				var value=dat[i];
				if(value.value!=""){
					var html='<li onclick="selectEquip(\''+value.value+'\',this)">'+
								'<label class="item-checkbox item-content">'+
							       ' <input type="checkbox" name="demo-checkbox" value="'+value.value+'" />'+
							        '<i class="icon icon-checkbox"></i>'+
							        '<div class="item-inner">'+
							          '<div class="item-title">'+value.name+'</div>'+
							       ' </div>'+
						        '</label>'+
							'</li>';
					$(".popup-condition .eq-list ul").append(html)
				}
				
			}
		}else{
			var html='<li>'+
							'<label class="item-checkbox item-content">'+
						        '<div class="item-inner">'+
						         '暂无设备数据可加载'
						       ' </div>'+
					        '</label>'+
						'</li>';
			$(".popup-condition .eq-list ul").append(html)
		}

	});

}
function getAccessList(){
	$.when(AlarmCenterContext.getAccess()).done(function(e){
		console.log(e)
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				acessList[value.ZiChanID]=value.ZiChanName;
				var html='<li onclick="selectZichan(\''+value.ZiChanID+'\',\''+value.ZiChanName+'\')">'+
	    					'<label class="item-radio item-content">'+
					        '<input type="radio" name="demo-radio" value="'+value.ZiChanID+'"  />'+
					        '<i class="icon icon-radio"></i>'+
					        '<div class="item-inner">'+
					          '<div class="item-title">'+value.ZiChanName+'</div>'+
					        '</div>'+
					      '</label>'+
	    				'</li>';
	    		$(".sheet-zichan ul").append(html);
			}
			console.log(acessList);
		}
		
		
	})
	
}
function selectZichan(zichan,name){
	$("#ZiChanID").val(name);
	$("#ZiChanID").attr("upVal",zichan);
	
}
function getlinkVideoList(){
	$.when(AlarmCenterContext.getLinkVideo()).done(function(e){
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var videoId=value.EquipNum+","+value.ID;
				videoList[videoId]=value.ChannelName;
				var html='<li onclick="selectVideo(\''+videoId+'\',\''+value.ChannelName+'\')">'+
	    					'<label class="item-radio item-content" >'+
					        '<input type="radio" name="demo-radio" value="'+value.EquipNum+','+value.ID+'"  />'+
					        '<i class="icon icon-radio"></i>'+
					        '<div class="item-inner">'+
					          '<div class="item-title">'+value.ChannelName+'</div>'+
					        '</div>'+
					      '</label>'+
	    				'</li>';
	    		$(".sheet-video ul").append(html);
			}
			console.log(videoList)
		}
	})
}
function selectVideo(video,name){
	$("#related_video").val(name);
	$("#related_video").attr("upVal",video)
}
function getPlanList(){
	$.when(AlarmCenterContext.getPlan()).done(function(e){
		console.log(e)
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var html='<li onclick="selectPlan(\''+value.PlanNo+'\')">'+
	    					'<label class="item-radio item-content">'+
					        '<input type="radio" name="demo-radio" value="'+value.PlanNo+'"  />'+
					        '<i class="icon icon-radio"></i>'+
					        '<div class="item-inner">'+
					          '<div class="item-title">'+value.PlanNo+'</div>'+
					        '</div>'+
					      '</label>'+
	    				'</li>';
	    		$(".sheet-paln ul").append(html);
			}
		}
	})
}
function selectPlan(plan){
	$("#PlanNo").val(plan);
	
}
function getAlarmWayList(){
	$.when(AlarmCenterContext.getAlarmWay()).done(function(e){
		console.log(e);
		if(e.HttpData.code=200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var obj={
					lable:value.Proc_name,
					key:"alarmWay",
					type:"alarmWay"+i+",sheet-alarm,alarmway",
					value:value.Proc_Code
				}
				equipHtml.push(obj);
				ychtml.push(obj);
				yxhtml.push(obj);
			}
		}
	})
}

function selectEquip(value,dom){
	var check=$(dom).find("input").prop("checked");
	console.log(check)
	if(check){
		/*删除*/
		selectEquiId.remove(value);
	}else{
		/*添加*/
		selectEquiId.push(value);
	}
	console.log(selectEquiId)
}
function loadConfig(){
	if(selectEquiId.length==0){
		myApp.dialog.alert('请选择设备', "温馨提示");
		return;
	}
	
}

function lookOtherInfor(type){
	myApp.popup.open(".popup-config")
}

function upInforEdict(){
	var updateObj={},val,uploadJson=[];
//	$(".edictList ul li").each(function(){
//			var idStr=$(this).find("input").attr("id");
//			if(idStr){
//			    val=$(this).find("input").val();
//				if(idStr=="equip_no"){
//					updateObj={
//						id:"'"+$("#equip_no").val()+"'",
//						"listName":idStr,
//						"vlaue":"'"+val+"'"
//					}
//				}
//				else if(idStr=="canexecution"){
//					updateObj={
//						id:"'"+$("#equip_no").val()+"'",
//						"listName":idStr,
//						"vlaue":"'"+canexecution+"'"
//					}
//				}else if(idStr=="record"){
//					updateObj={
//						id:"'"+$("#equip_no").val()+"'",
//						"listName":idStr,
//						"vlaue":"'"+record+"'"
//					}
//				}else if(idStr=="inversion"){
//					updateObj={
//						id:"'"+$("#equip_no").val()+"'",
//						"listName":idStr,
//						"vlaue":"'"+inversion+"'"
//					}
//				}else if(idStr=="mapping"){
//					updateObj={
//						id:"'"+$("#equip_no").val()+"'",
//						"listName":idStr,
//						"vlaue":"'"+mapping+"'"
//					}
//				}else if(idStr=="curve_rcd"){
//					updateObj={
//						id:"'"+$("#equip_no").val()+"'",
//						"listName":idStr,
//						"vlaue":"'"+curve_rcd+"'"
//					}
//				}
//				else if(idStr=="ZiChanID"){
//					var upval=$(this).find("input").attr("upval");
//					updateObj={
//						id:"'"+$("#equip_no").val()+"'",
//						"listName":idStr,
//						"vlaue":"'"+upval+"'"
//					}
//				}
//				else if(idStr=="related_video"){
//					var upval=$(this).find("input").attr("upval");
//					updateObj={
//						id:"'"+$("#equip_no").val()+"'",
//						"listName":idStr,
//						"vlaue":"'"+upval+"'"
//					}
//				}else if(idStr=="alarm"){
//					return
//				}
//				else{
//					updateObj={
//						id:"'"+$("#equip_no").val()+"'",
//						"listName":idStr,
//						"vlaue":"'"+val+"'"
//					}
//				}
//				uploadJson.push(updateObj);
//
//			}
//
//		})
		if(edictType==0){
			$(".edictList ul li").each(function(){
			var idStr=$(this).find("input").attr("id");
			if(idStr){
			    val=$(this).find("input").val();
				if(idStr=="equip_no"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				else if(idStr=="canexecution"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+canexecution+"'"
					}
				}else if(idStr=="record"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+record+"'"
					}
				}else if(idStr=="inversion"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+inversion+"'"
					}
				}else if(idStr=="mapping"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+mapping+"'"
					}
				}else if(idStr=="curve_rcd"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+curve_rcd+"'"
					}
				}
				else if(idStr=="ZiChanID"){
					var upval=$(this).find("input").attr("upval");
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}
				else if(idStr=="related_video"){
					var upval=$(this).find("input").attr("upval");
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}else if(idStr=="alarm"){
					return
				}
				else{
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				uploadJson.push(updateObj);

			}

		})
			uploadJson.push({
				"id":$("#equip_no").val(),
				"listName":"alarm_scheme",
				"vlaue":"'"+alarmCode+"'"
				
			})

			console.log(JSON.stringify(uploadJson))
			$.when(AlarmCenterContext.updEquipConfig(JSON.stringify(uploadJson))).done(function(e){
				console.log(e)
			})
			
		}else if(edictType==1){
			$(".edictList ul li").each(function(){
			var idStr=$(this).find("input").attr("id");
			if(idStr){
			    val=$(this).find("input").val();
				if(idStr=="equip_no"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				else if(idStr=="canexecution"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+canexecution+"'"
					}
				}else if(idStr=="record"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+record+"'"
					}
				}else if(idStr=="inversion"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+inversion+"'"
					}
				}else if(idStr=="mapping"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+mapping+"'"
					}
				}else if(idStr=="curve_rcd"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+curve_rcd+"'"
					}
				}
				else if(idStr=="ZiChanID"){
					var upval=$(this).find("input").attr("upval");
					
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}
				else if(idStr=="related_video"){
					var upval=$(this).find("input").attr("upval");
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}else if(idStr=="alarm"){
					return
				}
				else{
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				uploadJson.push(updateObj);

			}

		})
			uploadJson.push({
				id:"'"+$("#equip_no").val()+"'",
				yc_no:$("#yc_no").val(),
				listName:"alarm_scheme",
				vlaue:"'"+alarmCode+"'"
				
			})
			$.when(AlarmCenterContext.updYcConfig(JSON.stringify(uploadJson))).done(function(e){
				console.log(e)
			})
			
		}else if(edictType==2){
			$(".edictList ul li").each(function(){
			var idStr=$(this).find("input").attr("id");
			if(idStr){
			    val=$(this).find("input").val();
				if(idStr=="equip_no"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				else if(idStr=="canexecution"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+canexecution+"'"
					}
				}else if(idStr=="record"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+record+"'"
					}
				}else if(idStr=="inversion"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+inversion+"'"
					}
				}else if(idStr=="mapping"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+mapping+"'"
					}
				}else if(idStr=="curve_rcd"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+curve_rcd+"'"
					}
				}
				else if(idStr=="ZiChanID"){
					var upval=$(this).find("input").attr("upval");
					
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}
				else if(idStr=="related_video"){
					var upval=$(this).find("input").attr("upval");
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}else if(idStr=="alarm"){
					return
				}
				else{
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				uploadJson.push(updateObj);

			}

		})
			uploadJson.push({
				id:"'"+$("#equip_no").val()+"'",
				yx_no:$("#yx_no").val(),
				listName:"alarm_scheme",
				vlaue:"'"+alarmCode+"'"
				
			})
			$.when(AlarmCenterContext.updYxConfig(JSON.stringify(uploadJson))).done(function(e){
				console.log(e)
			})
			
		}else{
			$.when(AlarmCenterContext.updSetConfig(JSON.stringify(uploadJson))).done(function(e){
				console.log(e)
			})
			
		}	
//		console.log(uploadJson)

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