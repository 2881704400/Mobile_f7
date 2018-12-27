

var systemToastCenter;
var selectEquiId=[],videoList={},acessList={};

function systemConfig(){
	switchToolbar("configTool");
	$$(".sheet-modal").on('sheet:open',function(e,sheet){
		$(".popup-config .page-content .list ul").css({overflow:"hidden"})
	})
	$$(".sheet-modal").on('sheet:close',function(e,sheet){
		$(".popup-config .page-content .list ul").css({overflow:"auto"})
	})
//	console.log(myApp.views)
//	console.log(myApp.routes)
//	console.log(myApp.params)
//	console.log(myApp.router)
//	console.log(myApp.views.view)
//	console.log(myApp.views.main.router.currentRoute.query)
//	calendarRange.open()
//	myApp.sheet.open('.sheet-config')
//	myApp.popup.open(".popup-condition")
//	myApp.sheet.open('.sheet-alarm')
//	myApp.sheet.open('.sheet-zichan')
//	myApp.sheet.open('.sheet-video')
//	myApp.sheet.open('.sheet-paln')
//	myApp.popup.open(".popup-config");

//	myApp.searchbar.destroy('.searchbar')
	var id=myApp.views.main.router.currentRoute.query.equipId;
	var name=myApp.views.main.router.currentRoute.query.equipName;
	
//	console.log(myApp.views.main.router.currentRoute.query)
	selectEquiId=[id];	
	
	getEquipSelect(selectEquiId);
}
function loadData(type){
//	console.log(type)
	if(type==0){
		getEquipSelect(selectEquiId);
	}else if(type==1){
		getYcSelect(selectEquiId);
	}else if(type==2){
		getYxSelect(selectEquiId);
	}else{
		getSetSelect(selectEquiId);
	}	
}

function getEquipSelect(arr){
	var str=arr.toString();
	$.when(AlarmCenterContext.setEquipConfig(str)).done(function(e){
//		console.log(e);
		$("#equipTable").html("");
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
//				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				var html='<li >'+
								'<a href="/sysConfigEdict/?setType=0&equipId='+value.equip_no+'&equipName='+value.equip_nm+'" >'+value.equip_nm+'</a>'+
				
//					        '<div class="item-content  swipeout-content">'+
//						        '<div class="item-inner">'+
//						          '<div class="item-title">'+value.equip_nm+'</div>'+
//						        '</div>'+
//						      '</div>'+
						      								    	
						'</li>';
				$("#equipTable").append(html);
			}
		}
//		myApp.dialog.close()
	})
}
function getSetSelect(arr){
	var str=arr.toString();
	$.when(AlarmCenterContext.setSetConfig(str)).done(function(e){
//		console.log(e);
		$("#set").html("")
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				var html='<li >'+
							'<a href="/sysConfigEdict/?setType=3&equipId='+value.equip_no+' &equipName='+value.set_nm+'&setId='+value.set_no+'" >'+value.set_nm+'</a>'+
//					        '<div class="item-content  swipeout-content">'+
//						        '<div class="item-inner">'+
//						          '<div class="item-title">'+value.set_nm+'</div>'+
//						        '</div>'+
//						      '</div>'+  					    	
						'</li>';
				$("#set").append(html)
			}
		}
//		myApp.dialog.close()
	})
}
function getYxSelect(arr){
	var str=arr.toString();
	$.when(AlarmCenterContext.setYxConfig(str)).done(function(e){
//		console.log(e);
		$("#yxp").html("")
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				var html='<li  >'+
							'<a href="/sysConfigEdict/?setType=2&equipId='+value.equip_no+' &equipName='+value.yx_nm+'&yxId='+value.yx_no+'" >'+value.yx_nm+'</a>'+
//					        '<div class="item-content  swipeout-content">'+
//						        '<div class="item-inner">'+
//						          '<div class="item-title">'+value.yx_nm+'</div>'+
//						        '</div>'+
//						      '</div>'+					    	
						'</li>';
				$("#yxp").append(html)
			}
		}
//		myApp.dialog.close()
	})
}
function getYcSelect(arr){
	var str=arr.toString();
	$.when(AlarmCenterContext.setYcConfig(str)).done(function(e){
//		console.log(e);
		$("#ycp").html("");
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
//				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				var html='<li >'+
							'<a href="/sysConfigEdict/?setType=1&equipId='+value.equip_no+' &equipName='+value.yc_nm+'&ycId='+value.yc_no+'" >'+value.yc_nm+'</a>'+
//					        '<div class="item-content  swipeout-content">'+
//						        '<div class="item-inner">'+
//						          '<div class="item-title">'+value.yc_nm+'</div>'+
//						        '</div>'+
//						      '</div>'+
						      									    	
						'</li>';
				$("#ycp").append(html);
			}
		}
		myApp.dialog.close()
	})
}
//var edictData;

var alarmCode=0,updateAlarmCode=0,canEdict,edictDom,edictType;
var canexecution,record,inversion,mapping,curve_rcd;

function loadInforHtml(label,key,boolStr,id,value,dom){
	var html="";
	var boolArr;
//	$(dom).html("")
	if(boolStr){
		boolArr=boolStr.split(",");
	}
	if(key==""||key=="null"){
		key="无"
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
	else if(id=="curve_rcd"||id=="mapping"||id=="inversion"||id=="record"||id=="canexecution"){
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








function loadConfig(){
	if(selectEquiId.length==0){
		myApp.dialog.alert('请选择设备', "温馨提示");
		return;
	}else{
		getEquipSelect(selectEquiId);
		myApp.popup.close(".popup-condition")
		
	}
	
}

function lookOtherInfor(type){
	myApp.popup.open(".popup-config")
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