function schedule() {
    switchToolbar("configTool");
    //顶部菜单切换
    $(".subnavbarTabel>a").unbind();
    $(".subnavbarTabel>a").bind("click", function() {
        $(this).addClass("selectScheduleMenu").siblings().removeClass("selectScheduleMenu");
        $($(this).attr("href")).removeClass("displayNone").siblings().addClass("displayNone");
        //切换
        switchMenu(this);
        //顶部添加
        $($(this).attr("href")+"_nav").removeClass("displayNone").siblings().addClass("displayNone");
    });
    //人员数据请求
    requestUser();
}

// ********************************************************************************
// 人员
var schedule_public_username = [];
function requestUser() {
	var disabled = "'disabled'";
    var jsonData = {
        "url": "/api/GWServiceWebAPI/SelectData?tableName=Administrator",
        "success": _success,
        "error": _error,
    };
    $.fn.axget(jsonData);
    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,html="";
        $("#schedule_user table tbody").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
            	let telphoneUser = arrayLike[i].Telphone.toString().trim() ==""?null:arrayLike[i].Telphone;
            	let mobileTelUser = arrayLike[i].MobileTel.toString().trim() ==""?null:arrayLike[i].MobileTel;
            	let emailUser = arrayLike[i].EMail.toString().trim() ==""?null:arrayLike[i].EMail;
            	let ackLevelUser = arrayLike[i].AckLevel.toString().trim() ==""?null:arrayLike[i].AckLevel;
                html += '<tr onclick="newlyBuildUser('+arrayLike[i].Administrator+','+telphoneUser+','+mobileTelUser+','+emailUser+','+ackLevelUser+',1,'+disabled+')">'+
                        '<td>'+arrayLike[i].Administrator+'</td>'+
                        '<td>'+arrayLike[i].Telphone+'</td>'+
                        '<td>'+arrayLike[i].MobileTel+'</td>'+
                        '<td>'+arrayLike[i].EMail+'</td>'+
                        '<td>'+arrayLike[i].AckLevel+'</td>'+
                        '</tr>';
             schedule_public_username.push(arrayLike[i].Administrator); 
            }
        } else {
            requestUser();
            return false;
        }
        $("#schedule_user table tbody").append(html);
    }
    function _error(e) {
        console.log(e);
    }
}
 //人员html
    function newlyBuildUser(userName,telphone,telmobile,emailValue,ackLevel,index,status){
         
    	var html = '<div class="popup popup-aboutuser">'+
            '<h1>人员信息修改</h1>'+
            '<div class="popupContent list inline-labels no-hairlines-md">'+
                  '<ul>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">人员姓名</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="text" placeholder="你的姓名" value = "'+userName.toString().trim()+'"  class="userName" '+status+'>'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">电话号码</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="number" placeholder="你的电话号码" value = "'+telphone+'" class="telphone">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">短信号码</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="number" placeholder="你的电话号码" value = "'+telmobile+'" class="telmobile">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">电子邮箱</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="email" placeholder="你的电话号码" value = "'+emailValue+'" class="emailValue">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">报警级别</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="number" placeholder="报警级别" value = "'+ackLevel+'" class="ackLevel">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+                                        
                  '</ul>'+            
            '</div>'+
             '<div class="popupBtb row">'+
              '<a class="link popup-close col-33 button" href="#">退出</a>'+
              '<a class="link popup-close popupOpenBtn col-33 button" href="#" onclick="updateUser(this,'+index+')">确认</a>'+
              '<a class="link popup-close col-33 button" href="#" onclick="delUser(this)">删除</a>'+
            '</div>'+
          '</div>';

          popupAlert(html);
    }
//人员数据库表更新

function updateUser(that,index){
    var dt = $(that).parent().parent();
	let AdministratorUpdate = {
        tableName: "Administrator",
        Administrator: dt.find("input.userName").val(),
        Telphone: dt.find("input.telphone").val(),
        MobileTel: dt.find("input.telmobile").val(),
        EMail: dt.find("input.emailValue").val(),
        AckLevel: parseInt(dt.find("input.ackLevel").val()),
        ifName: "Administrator",
        ifValue: dt.find("input.userName").val()
      };
      if(index == 1)
        publicAjax(AdministratorUpdate,"/api/GWServiceWebAPI/updateEquipGroup",1);
      else
      publicAjax(AdministratorUpdate,"/api/GWServiceWebAPI/insertEquipGroup",1);
}
//人员表删除
function delUser(that){
	var dt = $(that).parent().parent();
	var deleteJson = {
          tableName: "Administrator",
          ifName: "Administrator",
          ifValue: dt.find("input.userName").val(),
          type: "string"
     };
     publicAjax(deleteJson,"/api/GWServiceWebAPI/deleteEquipGroup",1);
}
//人员表公共请求
function publicAjax(jsonString,url,index){
	 var jsonData = {
        "url": url,
        "data": jsonString,
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);
    function _success(data) {
        let arrayLike = data.HttpStatus;
        if (arrayLike == 200) {
        	switch(index){
        		case 1: requestUser();break;
        		case 2: requestEquipGroup();break;
        		case 3: requestAlmReport(requestEGAReport);break;
        		case 4: requestWeekAlmReport();break;
        		case 5: requestUser();break;
        	}
           
        } 
    }
    function _error(e) {
        
    }
}
// ********************************************************************************
//设备分组
var that_parent,equipArray = new Array();
function requestEquipGroup(){
    var jsonData = {
        "url": "/api/GWServiceWebAPI/SelectData?tableName=EquipGroup",
        "success": _success,
        "error": _error,
    };
    $.fn.axget(jsonData);
    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,html="";
        $("#schedule_equip table tbody").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            equipArray.length = 0;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                html += '<tr>'+
                        '<td onclick="newlyBuildEquip(this)" equipcomb="'+arrayLike[i].equipcomb+'" group_no="'+arrayLike[i].group_no+'">'+arrayLike[i].group_name+'</td>'+
                        '<td>'+
                        '<i class="iconfont icon-f7_modify" onclick="equipAlert(this,1)"></i><i class="iconfont icon-f7_delete" onclick="delEquip(this)"></i>'+
                        '</td>'+
                        '</tr>';
                equipArray.push(arrayLike[i].group_no);
            }
        } else {
            requestEquipGroup();
            return false;
        }
        $("#schedule_equip table tbody").append(html);
    }
    function _error(e) {
        console.log(e);
    }
}

// 设备html
function newlyBuildEquip(that){
    that_parent = that;
    var jsonData = {
        "url": "/api/GWServiceWebAPI/SelectData?tableName=Equip",
        "success": _success,
        "error": _error,
    };
    $.fn.axget(jsonData);
    var coutResult="#";
    if($(that).attr("equipcomb"))
      coutResult = $(that).attr("equipcomb").split("#");
    else
      coutResult = coutResult.split("#");

    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code;
        var html='<div class="popup popup-aboutuser">'+
			        '<h1>设备分组</h1>'+
			        '<div class="popupContent list inline-labels no-hairlines-md">'+
			          '<ul class="equipTypeSelect">';
        if (code == 200) {
            var AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
            	let checkboxSet = "";
            	for(var j=0;j<coutResult.length;j++)
            	{   
            		if(coutResult[j] == arrayLike[i].equip_no)
            		{
            			checkboxSet = "checked"
            		}
            	}
				html += '<li>'+
			           '<label class="item-checkbox item-content" onclick="actionString(this)" equip_no="'+arrayLike[i].equip_no+'">'+
			            '<input type="checkbox" name="checkbox-'+i+'"  value="'+arrayLike[i].equip_nm+'" '+checkboxSet+'>'+
			            '<i class="icon icon-checkbox"></i>'+
			            '<div class="item-inner">'+
			              '<div class="item-title">'+arrayLike[i].equip_nm+'</div>'+
			            '</div>'+
			            '</label>'+  
			           '</li>';
            } 
            popupAlert(html+ '</ul>'+            
			        '</div>'+
			         '<div class="popupBtb row">'+
			          '<a class="link col-33 button allClear" href="#" onclick="allSelectEquip(this)">取消</a>'+
			          '<a class="link col-33 button allComfirm" href="#" onclick="allSelectEquip(this)">全选</a>'+
			          '<a class="link popup-close col-33 button" href="#">退出</a>'+
			        '</div>'+
			      '</div>');
        } else {
            newlyBuildEquip(that);
            return false;
        }
     
    }
    function _error(e) {
        console.log(e);
    }

}	     
function actionString(that_child){
	 equipList(that_parent,that_child);
}  
//设备更新添加
function updateEquip(that,equipName,index){
    if(index ==1)
     {  let dt = $(that).parent().siblings();
	     let updateJson = {
	        tableName: "EquipGroup",
	        equipcomb: dt.attr("equipcomb"),
	        group_name: equipName,
	        ifValue: dt.attr("group_no")
	      };
     	  publicAjax(updateJson,"/api/GWServiceWebAPI/updateEquipGroup",2);
     } 
    else
      {
		let insertJson = {
			tableName: "EquipGroup",
			groupName: equipName,
			groupNo: getMaxNo()
		};
		publicAjax(insertJson,"/api/GWServiceWebAPI/insertEquipGroup",2);
      }
}
//设备删除
function delEquip(that){
	let dt = $(that).parent().siblings();
	var deleteJson = {
	  tableName: "EquipGroup",
	  ifName: "group_no",
	  ifValue: dt.attr("group_no"),
	  type: "number"
	};
	publicAjax(deleteJson,"/api/GWServiceWebAPI/deleteEquipGroup",2);
}
//弹窗输入
function equipAlert(dt,index){
  myApp.dialog.prompt('','新的设备分组名', function (equipName) {
  	if(!equipName)
  		myApp.toast.create({
		  text: '设备分组名不能为空',
		  position: 'center',
		  closeTimeout: 2000,
		}).open();
  	else
     updateEquip(dt,equipName,index);
  });
}
//获取最大序号
function getMaxNo(){
   if(equipArray.length == 0)
    return 1;
   else return Math.max.apply(null, equipArray) + 1;
}
// 设备分组单选
function equipList(parentTaht,that){
	var isFlag = false;
	var equipcombParentString = $(parentTaht).attr("equipcomb"),equipnoString = $(that).attr("equip_no");
    if(!equipcombParentString)
    {
    	equipcombParentString = "#" + equipnoString + "#";
    }
    else
    {
    	if(!$(that).find("input").is(':checked')) //选中
    	{
    		if(equipcombParentString.indexOf("#" + equipnoString + "#") == -1)
    		  { equipcombParentString += equipnoString + "#";}
      }
      else
      {equipcombParentString = equipcombParentString.replace("#" + equipnoString + "#","#");}
    }
    $(parentTaht).attr("equipcomb",equipcombParentString);
    updateEquip($(parentTaht).next().find("i.icon-f7_modify"),$(parentTaht).text(),1);
}
//全选
function allSelectEquip(dt){

   if($(dt).hasClass("allClear"))
   {
    $(".equipTypeSelect li input").attr("checked",false);
    //equipcomb 取消
    allEquipCom(dt,1);
    updateEquip($(that_parent).next().find("i.icon-f7_modify"),$(that_parent).text(),1);
   }
   else
   {
    $(".equipTypeSelect li input").attr("checked",true);
    //equipcomb 全选
    allEquipCom(dt,2);
    updateEquip($(that_parent).next().find("i.icon-f7_modify"),$(that_parent).text(),1);
   }
    
}
//处理equipcomb
function allEquipCom(dt,value){
  var groupNOArray = [];
  $(dt).parent().prev().find("li").each(function(index){
      groupNOArray.push($(this).find("label").attr("equip_no"));
  });
  if(value == 1)
  {
     $(that_parent).attr("equipcomb","#");
  }
  else
  {
    // alert("#"+groupNOArray.join("#")+"#");
     $(that_parent).attr("equipcomb","#"+groupNOArray.join("#")+"#");
  }
}
// ********************************************************************************
//管理范围
function requestAlmReport(almGroupObject){
    var jsonData = {
        "url": "/api/GWServiceWebAPI/SelectData?tableName=AlmReport",
        "success": _success,
        "error": _error,
    };
    $.fn.axget(jsonData);
    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,html="";
        $("#schedule_administartor table tbody").html("");
        if (code == 200) {  
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                html += '<tr onclick="newlyBuildAlmReport(this,1);" dataid = "'+arrayLike[i].id+'" datano="'+arrayLike[i].group_no+'">'+
                        '<td>'+arrayLike[i].Administrator+'</td>'+
                        '<td>'+getEquipName(almGroupObject,arrayLike[i].group_no)+'</td>'+
                        '</tr>';
                        // alert(getEquipName(almGroupObject,arrayLike[i].group_no));
            }
        } else {
            requestAlmReport(almGroupName);
            return false;
        }
        $("#schedule_administartor table tbody").append(html);
    }
    function _error(e) {
        console.log(e);
    }
}
// 设备html
function newlyBuildAlmReport(that,index){
	
    var userData = {
        "url": "/api/GWServiceWebAPI/SelectData?tableName=Administrator",
        "success": user_success,
        "error": user_error,
    };
    $.fn.axget(userData);
    function user_success(data){
    	let arrayLike = data.HttpData.data;
        let code = data.HttpData.code;
        if (code == 200) {
          equipAjax(arrayLike);
        }
    }
    function user_error(e){}
    function equipAjax(userResult){
    	var equipData = {
        "url": "/api/GWServiceWebAPI/SelectData?tableName=EquipGroup",
        "success": equip_success,
        "error": equip_error,
	    };
	    $.fn.axget(equipData);
	    function equip_success(data){
	    	let arrayLike = data.HttpData.data;
	        let code = data.HttpData.code;
	        if (code == 200) {
	        	var histroyUserName="",histroyGroupName="";
	        	if(index == 1)  // 修改
                 { histroyUserName = $(that).find("td:eq(0)").text(),histroyGroupName = $(that).find("td:eq(1)").text();}
               //界面  
               viewHTML(that,histroyUserName,histroyGroupName,userResult,arrayLike,index);
	        }
	    }
	    function equip_error(e){}
    }

    function viewHTML(dt,oldUserName,oldGroupName,userName,groupName,no){
        var html =  '<div class="popup popup-aboutuser">'+
			        '<h1>管理范围</h1>'+
			        '<div class="popupContent list inline-labels no-hairlines-md">'+
			          '<ul class="list">'+
		        '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">人员姓名</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="text" placeholder="请选择人员名称" value ="'+oldUserName+'" readonly="readonly" id="userInput">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">分组名称</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="text" placeholder="请选择分组名称" value ="'+oldGroupName+'" readonly="readonly" id="groupInput">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+
                    '</ul>'+            
			        '</div>'+
			         '<div class="popupBtb row">'+
			          '<a class="link popup-close col-33 button" href="#">退出</a>'+
			          '<a class="link popup-close col-33 button" href="#" onclick="delAlmReport(this,'+$(dt).attr("dataid")+')">删除</a>'+
			          '<a class="link popup-close col-33 button" href="#" onclick="updateAlmReport(this,'+$(dt).attr("dataid")+','+no+')">确认</a>'+
			        '</div>'+
			      '</div>';	

            popupAlert(html);	
            var arrayUser = [],arrayGroup=[];
            userName.forEach(function(item,index){
            	arrayUser.push(item.Administrator);
            });
            groupName.forEach(function(item,index){
            	arrayGroup.push(item.group_name);
            })   
            listInit("userInput",arrayUser);
			      listInit("groupInput",arrayGroup);  		          
    }
}	     

//设备更新添加
function updateAlmReport(that,parentId,index){
	var weekID = getMaxId("schedule_administartor"); //获取新建id主键
	var dt = $(that).parent().prev();
    if(index ==1)
     {    
	      let updateJson = {
	        tableName: "AlmReport",
	        group_no: getEquipNO(requestEGAReport,dt.find("#groupInput").val()),
	        Administrator: dt.find("#userInput").val(),
	        ifValue: parentId,
	      };
     	  publicAjax(updateJson,"/api/GWServiceWebAPI/updateEquipGroup",3);
     } 
    else
      {
		  let insertJson = {
	        tableName: "AlmReport",
	        group_no: getEquipNO(requestEGAReport,dt.find("#groupInput").val()),
	        Administrator: dt.find("#userInput").val(),
	        ifValue: weekID
	      };
		  publicAjax(insertJson,"/api/GWServiceWebAPI/insertEquipGroup",3);
      }
}

//最大ID添加1
function getMaxId(id){

   var parentDt = $("#"+id).find("tbody"),arrayIndex = [];
   parentDt.find("tr").each(function(index){
   	   arrayIndex.push($(this).attr("dataid"));
   });
   return  arrayIndex.length ==0?1:Math.max.apply(null, arrayIndex) + 1;
}
//返回对应设备号的设备名称
function getEquipName(equipObject,equipno) {
	console.log(equipObject);
      var equipName="";
      equipObject.forEach(function(ele, index) {
        if (ele.group_no == equipno) 
        	{equipName = ele.group_name;}
      });
      return equipName;
    }
//返回对应设备名称的设备号
function getEquipNO(equipObject,equipName) {
      var equipName;
      equipObject.forEach(function(ele, index) {
        if (ele.group_name == equipName) equipName = ele.group_no;
        return equipName;
      });
      return equipName;
    }
//请求设备分组
var requestEGAReport;
function requestEGAlmReport(){
	var equipData = {
    "url": "/api/GWServiceWebAPI/SelectData?tableName=EquipGroup",
    "success": equip_success,
    "error": equip_error,
    };
    $.fn.axget(equipData);
    function equip_success(data){
    	let arrayLike = data.HttpData.data;
        let code = data.HttpData.code;
        if (code == 200) {
        	requestAlmReport(arrayLike);
            requestEGAReport = arrayLike;
        }
    }
    function equip_error(e){}
}
//设备删除
function delAlmReport(that,index){
	let dt = $(that).parent().prev();
	var deleteJson = {
          tableName: "AlmReport",
          ifName: "id",
          ifValue: index,
          type: "number"
	};
	publicAjax(deleteJson,"/api/GWServiceWebAPI/deleteEquipGroup",3);
}
//弹窗输入
function almReportAlert(dt,index){
  myApp.dialog.prompt('','新的设备分组名', function (equipName) {
  	if(!equipName)
  		myApp.toast.create({
		  text: '设备分组名不能为空',
		  position: 'center',
		  closeTimeout: 2000,
		}).open();
  	else
     updateEquip(dt,equipName,index);
  });
}

// 设备分组选项选择
function almReportList(parentTaht,that){
	var isFlag = false;
	var equipcombParentString = $(parentTaht).attr("equipcomb"),equipnoString = $(that).attr("equip_no");
    console.log(equipcombParentString+","+equipnoString);
    if(!equipcombParentString)
    {
    	equipcombParentString = "#" + equipnoString + "#";
    }
    else
    {
    	if(!$(that).find("input").is(':checked'))
    	{
    		if(equipcombParentString.indexOf("#" + equipnoString + "#") == -1)
    		  { equipcombParentString += equipnoString + "#";}
        }
        else
        {equipcombParentString = equipcombParentString.replace("#" + equipnoString + "#","#");}
    }
    $(parentTaht).attr("equipcomb",equipcombParentString);
    
    updateEquip($(parentTaht).next().find("i.icon-f7_modify"),$(parentTaht).text(),1);
}
// ********************************************************************************
//周排表
var jsondate=[];
function requestWeekAlmReport(){
    var jsonData = {
        "url": "/api/GWServiceWebAPI/SelectData?tableName=WeekAlmReport",
        "success": _success,
        "error": _error,
    };
    $.fn.axget(jsonData);
    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,html="";
        jsondate.length = 0;
        $("#schedule_specificDate table tbody").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
              var sTime = formatDate(new Date(arrayLike[i].begin_time),"hh:mm"),eTime = formatDate(new Date(arrayLike[i].end_time),"hh:mm");
              jsondate = [arrayLike[i].Administrator,weekReturn(arrayLike[i].week_day),arrayLike[i].week_day,sTime.toString(),eTime.toString()];
                html += '<tr onclick="newlyBuildWeekAlmReport(this,1)" dataid = "'+arrayLike[i].id+'" dataday="'+arrayLike[i].week_day+'">'+
                        '<td>'+arrayLike[i].Administrator+'</td>'+
                        '<td>'+weekReturn(arrayLike[i].week_day)+'</td>'+
                        '<td>'+formatDate(new Date(arrayLike[i].begin_time),"hh:mm")+'</td>'+
                        '<td>'+formatDate(new Date(arrayLike[i].end_time),"hh:mm")+'</td>'+
                        '</tr>';
            }
        } else {
            requestUser();
            return false;
        }
        $("#schedule_specificDate table tbody").append(html);
    }

    function _error(e) {
        console.log(e);
    }
}
 //周排表html
    function newlyBuildWeekAlmReport(tThatParent,index){

      var html = '<div class="popup popup-aboutuser week_WeekAlmReportUl">'+
            '<h1>周排表修改</h1>'+
            '<div class="popupContent list inline-labels no-hairlines-md">'+
                  '<ul>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">人员姓名</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="text" placeholder="选择人员" value = "'+getVal($(tThatParent).find("td:eq(0)").text(),index)+'"  class="week_userName" id="week_userName">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label" >星期</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="text" placeholder="选择星期" value = "'+getVal($(tThatParent).attr("dataday"),index)+'" class="week_week" id="week_week">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">开始时间</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="text" placeholder="选择开始时间" value = "'+getVal($(tThatParent).find("td:eq(2)").text(),index)+'" class="week_stime">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">结束时间</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="text" placeholder="选择结束时间" value = "'+getVal($(tThatParent).find("td:eq(3)").text(),index)+'" class="week_etime">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+                                       
                  '</ul>'+            
            '</div>'+
             '<div class="popupBtb row">'+
              '<a class="link popup-close col-33 button" href="#">退出</a>'+
              '<a class="link popup-close popupOpenBtn col-33 button" href="#" onclick="updateWeekAlmReport(this,'+index+')" dataWeek='+jsondate[2]+' dataid = '+$(tThatParent).attr("dataid")+'>确认</a>'+
              '<a class="link popup-close col-33 button" href="#" onclick="delWeekAlmReport(this)" dataid = '+$(tThatParent).attr("dataid")+'>删除</a>'+
            '</div>'+
          '</div>';
          popupAlert(html);
          let arrayWeek = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日","每天"];
          listInit("week_userName",schedule_public_username); 
          listInit("week_week",arrayWeek); 
    }
//返回值
function getVal(value,index){
  if(index == 1)
    return value;
  else
    return "";
}
//周排表更新
function updateWeekAlmReport(that,index){
      var weekID,dt,week_day;
       
      if(index==1)
        {weekID = $(that).attr("dataid");dt= $(that).parent().parent();week_day=$(that).attr("dataWeek");}
      else
        {weekID = getMaxId("schedule_specificDate");dt= $(".week_WeekAlmReportUl");week_day=weekReturn(dt.find("input.week_week").val()); }//获取新建id主键
      let WeekAlmReportInsert = {
        tableName: "WeekAlmReport",
        Administrator: dt.find("input.week_userName").val(),
        week_day: week_day,
        begin_time: dt.find("input.week_stime").val(),
        end_time: dt.find("input.week_etime").val(),
        ifValue: weekID
      };
      if(index == 1)
        publicAjax(WeekAlmReportInsert,"/api/GWServiceWebAPI/updateEquipGroup",4);
      else
        publicAjax(WeekAlmReportInsert,"/api/GWServiceWebAPI/insertEquipGroup",4);
}
//周排表删除
function delWeekAlmReport(that){
  var dt = $(that).parent().parent();
  var deleteJson = {
          tableName: "WeekAlmReport",
          ifName: "id",
          ifValue: $(that).attr("dataid"),
          type: "number"
        };
     publicAjax(deleteJson,"/api/GWServiceWebAPI/deleteEquipGroup",4);
}

// ********************************************************************************
//特定排表
var spe_array = [];
function requestSpeAlmReport(){
    var jsonData = {
        "url": "/api/GWServiceWebAPI/SelectData?tableName=SpeAlmReport",
        "success": _success,
        "error": _error,
    };
    $.fn.axget(jsonData);
    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,html="";
        $("#schedule_weeklytable table tbody").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                let sTime = formatDate(new Date(arrayLike[i].begin_time),"yyyy/MM/dd hh:mm:ss");
                let eTime = formatDate(new Date(arrayLike[i].end_time),"yyyy/MM/dd hh:mm:ss");
                spe_array = [arrayLike[i].Administrator,sTime.toString(),eTime.toString()];
                html += '<tr onclick="newlyBuildSpeAlmReport(this,1)" dataid='+arrayLike[i].id+'>'+
                        '<td >'+arrayLike[i].Administrator+'</td>'+
                        '<td>'+sTime+'</td>'+
                        '<td>'+eTime+'</td>'+
                        '</tr>';
            }
        } else {
            requestUser();
            return false;
        }
        $("#schedule_weeklytable table tbody").append(html);
    }
    function _error(e) {
        console.log(e);
    }
}
//特定排表更新
function updateSpeAlmReport(that,index){
      var weekID,dt,week_day;
      if(index==1)
        {weekID = $(that).attr("dataid");dt= $(that).parent().parent();week_day=$(that).attr("dataWeek");}
      else
        {weekID = getMaxId("schedule_weeklytable");dt= $(".Spe_WeekAlmReportUl"); }//获取新建id主键

      let WeekAlmReportInsert = {
        tableName: "SpeAlmReport",
        Administrator: dt.find("input.Spe_userName").val(),
        begin_time: dt.find("input.Spe_stime").val(),
        end_time: dt.find("input.Spe_etime").val(),
        ifValue: weekID
      };
      if(index == 1)
        publicAjax(WeekAlmReportInsert,"/api/GWServiceWebAPI/updateEquipGroup",5);
      else
        publicAjax(WeekAlmReportInsert,"/api/GWServiceWebAPI/insertEquipGroup",5);
}
//特定排表删除
function delSpeAlmReport(that){
  var WeekAlmReport = this.SpeAlmReport,
        deleteJson = {
          tableName: "SpeAlmReport",
          ifName: "id",
          ifValue: $(that).attr("dataid"),
          type: "number"
        };
     publicAjax(WeekAlmReport,"/api/GWServiceWebAPI/deleteEquipGroup",5);
}
 function newlyBuildSpeAlmReport(tThatParent,index){
      var html = '<div class="popup popup-aboutuser Spe_WeekAlmReportUl">'+
            '<h1>周排表修改</h1>'+
            '<div class="popupContent list inline-labels no-hairlines-md">'+
                  '<ul>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">人员姓名</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="text" placeholder="选择人员" value = "'+getVal($(tThatParent).find("td:eq(0)").text(),index)+'"  class="Spe_userName" id="Spe_userName">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">开始时间</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="text" placeholder="输入开始时间" value = "'+getVal($(tThatParent).find("td:eq(1)").text(),index)+'" class="Spe_stime">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+
                    '<li class="item-content item-input">'+
                      '<div class="item-media">'+
                        '<i class="icon demo-list-icon"></i>'+
                      '</div>'+
                      '<div class="item-inner">'+
                        '<div class="item-title item-label">结束时间</div>'+
                        '<div class="item-input-wrap">'+
                          '<input type="text" placeholder="输入结束时间" value = "'+getVal($(tThatParent).find("td:eq(2)").text(),index)+'" class="Spe_etime">'+
                          '<span class="input-clear-button"></span>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+                                       
                  '</ul>'+            
            '</div>'+
             '<div class="popupBtb row">'+
              '<a class="link popup-close col-33 button" href="#">退出</a>'+
              '<a class="link popup-close popupOpenBtn col-33 button" href="#" onclick="updateWeekAlmReport(this,'+index+')" dataid = '+$(tThatParent).attr("dataid")+'>确认</a>'+
              '<a class="link popup-close col-33 button" href="#" onclick="delSpeAlmReport(this)" dataid = '+$(tThatParent).attr("dataid")+'>删除</a>'+
            '</div>'+
          '</div>';
          popupAlert(html);
          listInit("Spe_userName",schedule_public_username); 
    }



//switchMenu
function switchMenu(dt){
   switch($(dt).attr("href")){
   	case "#schedule_user": requestUser();break;
   	case "#schedule_equip": requestEquipGroup();break;
   	case "#schedule_administartor": requestEGAlmReport();break;
   	case "#schedule_specificDate": requestWeekAlmReport();break;
   	case "#schedule_weeklytable": requestSpeAlmReport();break;
   }
}

//字符串处理

function weekReturn(week) {
      var weekString;
      switch (week) {
        case 0:
          weekString = "每天";
          break;
        case 2:
          weekString = "星期一";
          break;
        case 3:
          weekString = "星期二";
          break;
        case 4:
          weekString = "星期三";
          break;
        case 5:
          weekString = "星期四";
          break;
        case 6:
          weekString = "星期五";
          break;
        case 7:
          weekString = "星期六";
          break;
        case 1:
          weekString = "星期日";
          break;
        case "每天": weekString = 0;break;
        case "星期一": weekString = 2;break;
        case "星期二": weekString = 3;break;
        case "星期三": weekString = 4;break;
        case "星期四": weekString = 5;break;
        case "星期五": weekString = 6;break;
        case "星期六": weekString = 7;break;
        case "星期日": weekString = 1;break;
        default:
          break;
      }
      return weekString;
    }


    //日期转化
    function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
    };
    for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
    let str = o[k] + '';
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
    }
    return fmt;
    };
    
    function padLeftZero (str) {
    return ('00' + str).substr(str.length);
    };




   