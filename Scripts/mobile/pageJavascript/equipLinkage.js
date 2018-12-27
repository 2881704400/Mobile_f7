﻿var toastCenterLinkage,toastCenterLinkageSuccess;
function equipLinkage() {
    switchToolbar("configTool");
    $(".subnavbarTabel>a").unbind();
    $(".subnavbarTabel>a").bind("click", function() {
        $(this).addClass("selectScheduleMenu").siblings().removeClass("selectScheduleMenu");
        $($(this).attr("href")).removeClass("displayNone").siblings("section").addClass("displayNone");
        $($(this).attr("href") + "_nav").removeClass("displayNone").siblings().addClass("displayNone"); //切换添加
        if($(this).attr("href") == "#equipLinkage_set")
            {
                setTimeout(function(){initAddList();},1000);
                myApp.dialog.progress();
            }
        else
            {
                myApp.dialog.progress();
                setTimeout(function(){initSceneList();},1500);
            }
    });
    // 初始化设备
    myApp.dialog.progress();
    initAddList();//联动设置
    toastCenterLinkage = myApp.toast.create({text: "操作失败", position: 'center', closeTimeout: 2000, });
    toastCenterLinkageSuccess = myApp.toast.create({text: "操作成功", position: 'center', closeTimeout: 2000, });
}
//初始化列表
var linkage_init, setparm_init;
var listAdd = [],linkageEquips = [];
function initAddList() {
    $("#equipLinkage_set ul").html("");
    $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getEquipList"),AlarmCenterContext.post("/api/GWServiceWebAPI/getSetparmList",{findEquip: false}),AlarmCenterContext.post("/api/GWServiceWebAPI/getLinkageList")).done(function(n,l,h){
        let nObject = n.HttpData,lObject = l.HttpData,hObject = h.HttpData;
        if(nObject.code == 200 && lObject.code == 200 && hObject.code == 200)
        {
                linkageEquips = nObject.data.filter((equip, index) => {
                if (lObject.data.some(parm => {
                            return equip.equip_no === parm.equip_no
                        })) {
                        return equip
                    }
                }).map(equip => {
                    return {
                        value: equip.equip_no,
                        label: equip.equip_nm,
                        loading: false,
                        children: []
                    }
                });
                listAdd = nObject.data.map(item => {
                    return {
                        value: item.equip_no,
                        label: item.equip_nm,
                        loading: false,
                        children: []
                    }
                })
                setparm_init = lObject; linkage_init = hObject;
                equipLinkList();
        }
    }).fail(function(e){
      toastCenterLinkage.open();
    });

}
//公共请求
var publicFirstData;
// function equipLinkPublicAjax(jsonString, url, index) {
//     var jsonData = {
//         "url": url,
//         "data": jsonString,
//         "success": _success,
//         "error": _error,
//     };
//     $.fn.axpost(jsonData);
//     function _success(data) {
//         let arrayLike = data.HttpStatus;
//         if (arrayLike == 200 && data.HttpData.data) {
//             switch (index) {
//                 case 1:
//                     // publicFirstData = data.HttpData.data;
//                     // tiggerEquip(data.HttpData.data);
//                     break;
//                 case 2:
//                     // linkEquip(data.HttpData.data);
//                     break;
//                 case 3:
//                     // linkage_init = data.HttpData;
//                     // equipLinkList();
//                     // equipLinkPublicAjax({
//                     //     findEquip: false
//                     // }, "/api/GWServiceWebAPI/getSetparmList", 4);
//                     break;
//                 case 4:
//                     // setparm_init = data.HttpData;
//                     // equipLinkList();
//                     break;
//                 case 5:
//                     ycpData_table_5 = data.HttpData;
//                     break;
//                 case 6:
//                     yxpData_table_6 = data.HttpData;
//                     notEqualToYCPYXP();
//                     break;
//                 case 7:
//                     // ycpData_table_7 = data.HttpData;
//                     // notEqualToYCP();
//                     break;
//                 case 8:
//                     // yxpData_table_8 = data.HttpData;
//                     // notEqualToYXP();
//                     break;
//                 case 9:
//                     // ycpData_table_9=data.HttpData;
//                     // equipLinkPublicAjax({
//                     //      equip_nos: link_listInit_no
//                     // }, "/api/GWServiceWebAPI/getYxp", 10);
//                     break;
//                 case 10: 
//                    // yxpData_table_10 = data.HttpData;
//                    // writeContent();
//                     break;
//                 case 11: 
//                   // loadLinkageEquips(data.HttpData.data);
//                 break;
//                 // case 12: $("#equipLinkage_set tbody").html("");initTableList();break;
//                 // case 13: $("#equipLinkage_set tbody").html("");initTableList();break;
//                 // case 14:  $("#equipLinkage_set tbody").html("");initTableList();break;
//             }
//         }
//         else{
//             toastCenterLinkage.open();
//         }
//     }
//     function _error(e) {}
// }
//触发设备
// function tiggerEquip(data) {
//     listAdd = data.map(item => {
//         return {
//             value: item.equip_no,
//             label: item.equip_nm,
//             loading: false,
//             children: []
//         }
//     })
//     equipLinkPublicAjax({findEquip: false}, "/api/GWServiceWebAPI/getSetparmList", 2);
// }
//联动设备
// function linkEquip(data) {    
//     linkageEquips = publicFirstData.filter((equip, index) => {
//         if (data.some(parm => {
//                 return equip.equip_no === parm.equip_no
//             })) {
//             return equip
//         }
//     }).map(equip => {
//         return {
//             value: equip.equip_no,
//             label: equip.equip_nm,
//             loading: false,
//             children: []
//         }
//     })
//     initTableList();
// }
//列表处理
var tableNameNoYcp, tableNameNoYxp, ycpData_table_5, yxpData_table_6, ycpData_table_7, yxpData_table_8, ycpData_table_9,yxpData_table_10,
    typeList = [{
        value: "X",
        label: "状态量报警",
        children: []
    }, {
        value: "x",
        label: "状态量恢复",
        children: []
    }, {
        value: "C",
        label: "模拟量越线",
        children: []
    }, {
        value: "c",
        label: "模拟量恢复",
        loading: false,
        children: []
    }, {
        value: "E",
        label: "设备通讯故障",
        children: []
    }, {
        value: "e",
        label: "设备通讯恢复",
        children: []
    }, {
        value: "S",
        label: "设备状态故障",
        children: []
    }, {
        value: "s",
        label: "设备状态恢复",
        children: []
    }];

function equipLinkList() {
    let rt = linkage_init,
        parmRt = setparm_init;
    if (rt.code === 200 && parmRt.code === 200) {
        var data = rt.data,parmData = parmRt.data
        var ycpData_table = 'ycp',yxpData_table = 'yxp';
        var ycpData_table_type = 'ycp',yxpData_table_type = 'yxp';
        var equip_ycp_nos="";
        var yc_ycp_nos="";
        var equip_yxp_nos="";
        var yc_yxp_nos="";
        data.forEach(function(item,index){
            if (item.iycyx_type === "c" || item.iycyx_type === "C"){
              ycpData_table == 'ycp'?ycpData_table += (' where (equip_no ='+ item.iequip_no+' and yc_no ='+ item.iycyx_no+')'):ycpData_table += (' or (equip_no ='+ item.iequip_no+' and yc_no ='+ item.iycyx_no+')');
                                    equip_ycp_nos+=item.iequip_no+",";
                                    yc_ycp_nos+=item.iequip_no+",";
            } else if (item.iycyx_type === "x" || item.iycyx_type === "X") {

              yxpData_table == 'yxp'?yxpData_table += (' where (equip_no ='+ item.iequip_no+' and yx_no ='+ item.iycyx_no+')'):yxpData_table += (' or (equip_no ='+ item.iequip_no+' and yx_no ='+ item.iycyx_no+')');
              equip_yxp_nos+=item.iequip_no+",";
                                    yc_yxp_nos+=item.iequip_no+",";
            }
        });
        if(equip_ycp_nos.length>0){
        equip_ycp_nos=equip_ycp_nos.substring(0,equip_ycp_nos.length-1);
        yc_ycp_nos=yc_ycp_nos.substring(0,yc_ycp_nos.length-1);
        }
        if(equip_yxp_nos.length>0){
        equip_yxp_nos=equip_yxp_nos.substring(0,equip_yxp_nos.length-1);
        yc_yxp_nos=yc_yxp_nos.substring(0,yc_yxp_nos.length-1);
        }
        if(ycpData_table != "ycp" && yxpData_table != "yxp")
        {
             $.when($.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/get_DataForListStr",{
             data:{"tType": ycpData_table_type,"equip_nos": equip_ycp_nos,"yc_nos": yc_ycp_nos},
            async:false
             }),$.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/get_DataForListStr",{
            data:{"tType": yxpData_table_type,"equip_nos": equip_yxp_nos,"yc_nos": yc_yxp_nos},
            async:false
             })).done(function(n,l){
                 if(n.HttpData.code == 200 && n.HttpData.code == 200)
                 {
                    ycpData_table_5 = n.HttpData;
                    yxpData_table_6 = l.HttpData;
                    notEqualToYCPYXP();
                 }
                 else
                 {

                 }
             }).fail(function(e){

             });
        }
        else if(ycpData_table != "ycp")
        {
            $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/get_DataForListStr",{"tType": ycpData_table_type,"equip_nos": equip_ycp_nos,"yc_nos": yc_ycp_nos})).done(function(n){
              if(n.HttpData.code == 200)
              {
                 ycpData_table_7 = data.HttpData;notEqualToYCP();
              }
            }).fail(function(e){

            });

            // equipLinkPublicAjax({"tType": ycpData_table_type,"equip_nos": equip_ycp_nos,"yc_nos": yc_ycp_nos}, "/api/GWServiceWebAPI/get_DataForListStr", 7);              
        }  
        else if(yxpData_table != "yxp")
        {
            $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/get_DataForListStr",{"tType": yxpData_table_type,"equip_nos": equip_yxp_nos,"yc_nos": yc_yxp_nos})).done(function(n){
              if(n.HttpData.code == 200)
              {
                    yxpData_table_8 = data.HttpData;notEqualToYXP();
              }
            }).fail(function(e){

            });
             // equipLinkPublicAjax({"tType": yxpData_table_type,"equip_nos": equip_yxp_nos,"yc_nos": yc_yxp_nos}, "/api/GWServiceWebAPI/get_DataForListStr", 8);              
        }                             
        else
        {
           publicFun(null,null);
        } 
    }
}
// 不等于ycp yxp
function notEqualToYCPYXP() {
    let ycpRt = ycpData_table_5,
        yxpRt = yxpData_table_6;
    if (ycpRt.code === 200 && yxpRt.code === 200) {
        let ycpData = ycpRt.data,yxpData = yxpRt.data;  
        publicFun(ycpData,yxpData);
    }
}
//不等于ycp
function notEqualToYCP() {
    let ycpRt = ycpData_table_7;
    if (ycpRt.code === 200) {
        let ycpData = ycpRt.data,yxpData = null;
        publicFun(ycpData, yxpData);
    }
}
//不等于yxp
function notEqualToYXP() {
    let yxpRt = yxpData_table_8;
    if (yxpRt.code === 200) {
        let ycpData = null,yxpData = yxpRt.data;
        publicFun(ycpData, yxpData);
    }
}
var equipLinkage_public_list = [];
function publicFun(ycpData, yxpData) {
    var html = "";
    equipLinkage_public_list = linkage_init.data.map(row => {
        let result = {}
        result.id = row.ID
        result.originalData = row
        result.delayTime = row.delay
        result.optCode = row.value
        result.remarks = row.ProcDesc
        linkageEquips.forEach(item => {
            if (row.oequip_no === item.value) {
                result.linkageEquip = item.label
            }
        })
        setparm_init.data.forEach(item => {
            if (row.oequip_no === item.equip_no && row.oset_no === item.set_no) {
                result.linkageOpt = item.set_nm
            }
        })
        listAdd.forEach(item => {
            result.equipName = (item.value === row.iequip_no) ? item.label : result.equipName
        })
        typeList.forEach(item => {
            if (item.value === row.iycyx_type) {
                result.cType = item.label
            }
        })
        if (row.iycyx_type === "c" || row.iycyx_type === "C") {
            if(ycpData)
            ycpData.forEach(item => {
                if (row.iequip_no === item.equip_no && row.iycyx_no === item.yc_no) {
                    result.cCurren = item.yc_nm
                }
            })
        } else if (row.iycyx_type === "x" || row.iycyx_type === "X") {
            if(yxpData)
            yxpData.forEach(item => {
                if (row.iequip_no === item.equip_no && row.iycyx_no === item.yx_no) {
                    result.cCurren = item.yx_nm
                }
            })
        } else {
            result.cCurren = "无"
        }
        // html += '<tr onclick=\'newlyBuildLinkage("'+result.equipName+'","'+result.cType+'","'+result.cCurren+'",'+result.delayTime+',"'+result.linkageEquip+'","'+result.linkageOpt+'","'+result.optCode+'","'+result.remarks+'",'+result.id+',1)\' TrID='+result.id+'>' + '<td>' + result.equipName + '</td>' + '<td>' + result.cType + '</td>' + '<td>' + result.cCurren + '</td>' + '<td>' + result.delayTime + '</td>' + '<td>' + result.linkageEquip + '</td>' + '<td>' + (result.linkageOpt ? result.linkageOpt : '空') + '</td>' + '<td>' + (result.optCode ? result.optCode : '空') + '</td>' + '<td>' + result.remarks + '</td>' + '</tr>';

        html += `<li class="swipeout bottomBorderLine">
          <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildLinkage(this,'${result.equipName}','${result.cType}','${result.cCurren}','${result.delayTime}','${result.linkageEquip}','${result.linkageOpt}','${result.optCode}','${result.remarks}',${result.id},1)" TrID="${result.id}">
            <div class="col-33">${result.equipName}</div>
            <div class="col-33">${result.linkageEquip}</div> 
            <div class="col-33">${result.remarks}</div> 
          </div>
          <div class="swipeout-actions-right">
            <a href="#" class="delBtn" onclick="deleteLinkage(this)">删除</a>
          </div>
        </li>`;

        return result;
    })
    myApp.dialog.close();
    $("#equipLinkage_set ul").append(html);
}
//联动设置添加
var equipTiggerType=[],equipTiggerSpot=[],equipTiggerLink=[],equipTiggerCom=[],dtParent;
function newlyBuildLinkage(dt,equipName,cType,cSpot,delayTime,linkageEquip,linkageOpt,optCode,remarks,ID,index){
    dtParent = dt;
var html = '<div class="popup popup-aboutuser">'+
      '<h1>设备联动</h1>'+
      '<div class="popupContent list inline-labels no-hairlines-md">'+
            '<ul>'+
              '<li class="item-content item-input" style="padding-left: 0;">'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">触发设备</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="text" placeholder="选择触发设备" value = "'+(equipName !=" "?equipName:"")+'"  class="equipTiggerName" id="equipTiggerName" >'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+
              '<li class="item-content item-input" style="padding-left: 0;">'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">触发类型</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="text" placeholder="选择触发类型" value = "'+(cType !=" "?cType:"")+'"  class="equipTiggerType" id="equipTiggerType" >'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+
              '<li class="item-content item-input" style="padding-left: 0;">'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">触发点</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="text" placeholder="选择触发点" value = "'+(cSpot !=" "?cSpot:"")+'"  class="equipTiggerSpot" id="equipTiggerSpot" >'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+                                       
              '<li class="item-content item-input" style="padding-left: 0;">'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">延时(ms)</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="number" placeholder="输入延迟时间" value = "'+(delayTime !=" "?delayTime:0)+'" class="equipTiggerTime" id="equipTiggerTime">'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+
              '<li class="item-content item-input" style="padding-left: 0;">'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">联动设备</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="text" placeholder="选择联动设备" value = "'+(linkageEquip !=" "?linkageEquip:"")+'" class="equipTigger_Link" id="equipTigger_Link">'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+
              '<li class="item-content item-input" style="padding-left: 0;">'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">联动命令</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="text" placeholder="选择联动命令" value = "'+(linkageOpt !=" "?linkageOpt:"")+'" class="equipTiggerCom" id="equipTiggerCom">'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+              
              '<li class="item-content item-input" style="padding-left: 0;">'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">备注信息</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="text" placeholder="输入备注信息" value = "'+(remarks !=" "?remarks:"")+'" class="equipTiggerInfo" id="equipTiggerInfo">'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+                                      
            '</ul>'+            
      '</div>'+
       '<div class="popupBtb row">'+
        '<a class="link popup-close col-50 button" href="#">返回</a>'+
        '<a class="link popupOpenBtn col-50 button" href="#" onclick="addLinkage(this,'+index+')" dataID='+ID+'>确认</a>'+
        // '<a class="link col-33 button" href="#" onclick="deleteLinkage(this)" dataID='+ID+'>删除</a>'+
      '</div>'+
    '</div>';console.log(dt,equipName,cType,cSpot,delayTime,linkageEquip,linkageOpt,optCode,remarks,ID,index)
    myApp.router.navigate("/equipLinkageModify/?"+equipName+"&"+cType+"&"+cSpot+"&"+delayTime+"&"+linkageEquip+"&"+linkageOpt+"&"+optCode+"&"+remarks+"&"+ID+"&"+index+"");
//  link_popupAlert(html);
    setTimeout(function(){
    	link_listInit_equip("equipTiggerName",listAdd.map(item => {return item.label;})); //触发设备
	    link_listInit_equip("equipTigger_Link",linkageEquips.map(item => {return item.label;})); //联动设备
	   try{link_listInit_no = listAdd.filter((equip, index) => {if ( equip.label === $("#equipTiggerName").val()) {return equip;}})[0].value;}
	   catch(e){link_listInit_no ="";}
	   // link_listInit_no?equipLinkPublicAjax({equip_nos: link_listInit_no}, "/api/GWServiceWebAPI/getYcp", 9):"";
	   // equipLinkPublicAjax({equip_nos: linkageEquips.filter((item,index) => {if(item.label == $("#equipTigger_Link").val()) return item; else return [{value:""}];})[0].value}, "/api/real/get_setparm", 11);
	   if(link_listInit_no)
	        $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getYcp",{equip_nos: link_listInit_no}),AlarmCenterContext.post("/api/GWServiceWebAPI/getYxp",{equip_nos: link_listInit_no})).done(function(n,l){
	          if(n.HttpData.code == 200 && l.HttpData.code == 200)
	          {
	                ycpData_table_9=n.HttpData;yxpData_table_10 = l.HttpData;writeContent();
	          }
	        }).fail(function(e){});
	
	
	    $.when(AlarmCenterContext.post("/api/real/get_setparm",{equip_nos: linkageEquips.filter((item,index) => {if(item.label == $("#equipTigger_Link").val()) return item; else return [{value:""}];})[0].value})).done(function(n,l){
	      if(n.HttpData.code == 200)
	      {
	           loadLinkageEquips(n.HttpData.data);
	      }
	    }).fail(function(e){});
    },1000);



}
//确认
function updateEquipLink(dt){
   // alert($("#equipTiggerName").val());
}
//列表联动
function writeContent(){
   let ycpRt = ycpData_table_9,yxpRt = yxpData_table_10,item = typeList.filter((dt,index) =>{
      if(dt.label == $("#equipTiggerType").val())
        return dt;
   }),childrenContent;
    if (ycpRt.code === 200 || yxpRt.code === 200) {
      let ycpData = ycpRt.data,yxpData = yxpRt.data;equipTiggerType = typeList;
        
      if (!ycpData || !ycpData.length) {
        equipTiggerType = equipTiggerType.filter((child, index) => {
          return index !== 2 && index !== 3;
        });
      } else {
        equipTiggerType.map((child, index) => {
          if (index === 2 || index === 3) {
            child.children = ycpData.map(yc => {
              return {
                value: yc.yc_no,
                label: yc.yc_nm
              }
            })
          }
        })
      }
      if (!yxpData || !yxpData.length) {
        equipTiggerType = equipTiggerType.filter((item, index) => {
          return index !== 0 && index !== 1;
        });
      } else {
        equipTiggerType.map((child, index) => {
          if (index === 0 || index === 1) {
            child.children = yxpData.map(yx => {
              return {
                value: yx.yx_no,
                label: yx.yx_nm
              }
            })
          }
        })
      }
      try{link_listInit_type.destroy();}catch(e){}
      Init_type_fun("equipTiggerType",equipTiggerType.map(item => {return item.label;})); //触发类型
    } else {}
}
var equipTiggerCommand;
function loadLinkageEquips(data) {
    equipTiggerCommand = data;
    try{link_listInit_com.destroy();}catch(e){}
    try{Init_com_fun("equipTiggerCom",data.map(item=>{return item.set_nm}));}catch(e){}
}
// 插入或者更新记录 
function addLinkage(dt,index) { //index = 1 更新，index = 2 插入  
      console.log(dt,index)
      let equipLink_cType = getObject(equipTiggerType,"equipTiggerType",2);
      let equipLink_spot = getObject(equipTiggerType,"equipTiggerType",1);
      let equipLink_linkEquipNo = getObject(linkageEquips,"equipTigger_Link",2);
      let equipLink_linkNo = getObject(equipTiggerCommand,"equipTiggerCom",3);
      var equipLink_cNo;
      try{
        equipLink_cNo = equipLink_spot[0].children.filter((item,index) =>{if(item.label == $(".equipTiggerSpot").val()) return item;})[0].value;
      }catch(e){}
      if(!link_listInit_no) {toastCenterLinkage.open();return false;}
      var reqData = {
        id: $(dt).attr("dataID") || 1,
        equipNo: link_listInit_no,
        cType: equipLink_cType.length>0?equipLink_cType[0].value:"",
        cNo: equipLink_cNo?equipLink_cNo:0,
        delay: $(".equipTiggerTime").val(),
        linkEquipNo: equipLink_linkEquipNo.length>0?equipLink_linkEquipNo[0].value:"",
        linkNo: equipLink_linkNo.length>0?equipLink_linkNo[0].set_no:"",
        optCode: '""',
        remarks: $(".equipTiggerInfo").val() || ""
      } 
      if(index == 1) 
      {
        $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/updateLinkage",reqData)).done(function(n){
            if(n.HttpData.code == 200)
              { 
                 // $(dtParent).parents("li").remove();
                 initAddList();
                  toastCenterLinkageSuccess.open();              
              }
        }).fail(function(e){
            toastCenterLinkage.open();
        });
      }
      else
      {
        $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/addLinkage",reqData)).done(function(n){
            if(n.HttpData.code == 200)
              {
                // console.log($("#equipLinkage_set ul")[0].scrollHeight);
                 initAddList();
                 $("#equipLinkage_set ul").animate({scrollTop: $("#equipLinkage_set ul")[0].scrollHeight+'px'}, 50);
                 toastCenterLinkageSuccess.open();       
              }
        }).fail(function(e){
            toastCenterLinkage.open();
        });
      }

}
//删除
function deleteLinkage(dt) {
    let val = parseInt($(dt).parent().siblings().attr("trid"));
     myApp.dialog.confirm("是否删除该项","提示",function(){
       myApp.popup.close();
       // equipLinkPublicAjax({id: $(dt).parent().siblings().attr("trid")}, "/api/GWServiceWebAPI/deleteLinkage", 14);

        $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/deleteLinkage",{id: val})).done(function(n){
            if(n.HttpData.code == 200)
              {
                toastCenterLinkageSuccess.open();
                $(dt).parents("li").remove();
              }
        }).fail(function(e){
            toastCenterLinkage.open();
        });


   });
}
//动态创建弹窗
var popupLinkage;
function link_popupAlert(html){
  popupLinkage = myApp.popup.create({
  content: html,
  on: {
    opened: function (e) {
    }
  }
}).open();
}
//触发设备
function link_listInit_equip(id,equipArray){
   myApp.picker.create({
      inputEl: '#'+id,
      cols: [{textAlign: 'center',values: equipArray,
         onChange: function (picker, country) {
            switch(id){
                case "equipTiggerName": 
                    link_listInit_no = listAdd.filter((equip, index) => {if ( equip.label === country) {return equip;}})[0].value;
                    // link_listInit_no?equipLinkPublicAjax({equip_nos: link_listInit_no}, "/api/GWServiceWebAPI/getYcp", 9):"";
                       if(link_listInit_no)
                            $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getYcp",{equip_nos: link_listInit_no}),AlarmCenterContext.post("/api/GWServiceWebAPI/getYxp",{equip_nos: link_listInit_no})).done(function(n,l){
                              if(n.HttpData.code == 200 && l.HttpData.code == 200)
                              {
                                    ycpData_table_9=n.HttpData;yxpData_table_10 = l.HttpData;writeContent();
                              }
                            }).fail(function(e){});
                    $(".equipTiggerType,.equipTiggerSpot").val("");
                break;
                case "equipTigger_Link": 
                    $(".equipTiggerCom").val("");
                    // equipLinkPublicAjax({equip_nos: linkageEquips.filter((item,index) => {if(item.label == country) return item;})[0].value}, "/api/real/get_setparm", 11);
                    $.when(AlarmCenterContext.post("/api/real/get_setparm",{equip_nos: linkageEquips.filter((item,index) => {if(item.label == country) return item;})[0].value})).done(function(n,l){
                      if(n.HttpData.code == 200)
                      {
                           loadLinkageEquips(n.HttpData.data);
                      }
                    }).fail(function(e){});                    
                break;
                case "": break;
            }
         }
       }],
    }); 
}
//触发类型 
var link_listInit_type;
function Init_type_fun(id,equipArray){
 link_listInit_type =  myApp.picker.create({
      inputEl: '#'+id,
      cols: [{textAlign: 'center',values: equipArray,
      onChange: function (picker, country) { 
        $(".equipTiggerSpot").val("");
        let getType = equipTiggerType.filter((item,index) => {if(item.children.length>0 && item.label == country) return item;});
        try{link_listInit_spot.destroy();}catch(e){}
        try{Init_spot_fun("equipTiggerSpot",getType[0].children.map(item =>{return item.label}));}catch(e){}
       }
      }],
    }); 
}
//触发点
var link_listInit_spot;
function Init_spot_fun(id,equipArray){
 link_listInit_spot =  myApp.picker.create({
      inputEl: '#'+id,
      cols: [{textAlign: 'center',values: equipArray}],
    }); 
}
//触发命令
var link_listInit_com;
function Init_com_fun(id,equipArray){
 link_listInit_com =  myApp.picker.create({
      inputEl: '#'+id,
      cols: [{textAlign: 'center',values: equipArray}],
    }); 
}
//获取最大ID
function getMaxID(){
    var arrayID = [];
    $("#equipLinkage_set tbody tr").each(function(item){arrayID.push($(this).attr("TrID"));});
    if(arrayID.length>0)
        return  Math.max.apply(null, arrayID) + 1;
    else
        return 1; 
}
//获取存在条件对象
function getObject(arrayObject,className,index){
    if(index == 1)
      return arrayObject.filter((item,index) => {if(item.children.length>0 && item.label == $("."+className).val()) return item;});
    else if(index == 2)
      return arrayObject.filter((item,index) => {if(item.label == $("."+className).val()) return item;});
    else if(index == 3)
      return arrayObject.filter((item,index) => {if(item.set_nm == $("."+className).val()) return item;}); 
}

//初始化场景设置
var sceneData = [],controlEquipList,setList,equipList;
function initSceneList() {
    $("#equipLinkage_edit ul").html("");
        $.when($.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/getSetparmList",{
                data:{findEquip: false},
                async:false
            }),$.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/getEquipList",{
                data:{},
                async:false
        })).done(function(n,l){
            let rt = n.HttpData,equipRt = l.HttpData;
            if (n.HttpData.code ==200 && l.HttpData.code ==200) {
                myApp.dialog.close();
                setList = rt.data, equipList = equipRt.data; 
                //可控设备
                controlEquipList = setList.filter(item => {
                  return item.set_type
                }).map(item => {return item});
                //过滤出场景
                sceneData = setList.filter(item => {
                  return item.set_type === "J"
                }).map(item => { 
              var valueString = item.value,eqset_no=[],setParm_no=[],html=htmlHeader=htmlContent=htmlFooter="";
              if(valueString)
               valueString.indexOf("+") !=-1?eqset_no = valueString.split("+"):eqset_no.push(valueString);
              if(eqset_no.length>0)
              {
                for(var i=0;i<eqset_no.length;i++)
                { 
                  var equip_no_flg = true;
                  if(eqset_no[i].indexOf(",") != -1)
                    { equip_no_flg = true;}
                  else
                    {equip_no_flg = false;}

                  htmlContent += '<div class="row childrenEquipControl" combination="'+eqset_no[i]+'">'+
                        '<div class="leftTaskName col-60">'+
                          '<b>'+(i+1)+'.</b>'+
                          '<a href="#">'+(equip_no_flg?filterFun(equipList,eqset_no[i].split(",")[0],null):(eqset_no[i]?"间隔操作":""))+'</a>:<strong>'+(equip_no_flg?filterFun(setList,eqset_no[i].split(",")[0],eqset_no[i].split(",")[1]):(eqset_no[i]?"延时间隔"+eqset_no[i]+"毫秒":""))+'</strong>'+
                        '</div>'+
                        '<div class="rightBtnModul col-40 row no-gap">'+
                            '<a href="#" class="col-33" onclick="sceneAlert(this,\'该项前面插入\',\'before\')"><i class="iconfont icon-f7_top_jt"></i></a>'+
                            '<a href="#" class="col-33" onclick="sceneAlert(this,\'该项后面插入\',\'after\')"><i class="iconfont icon-f7_bottom_jt"></i></a>'+
                            '<a href="#" class="col-33" onclick="currentControl(this)"><i class="iconfont icon-f7_delete"></i></a>'+
                        '</div>'+
                  '</div>';                 
                  }
              }
                htmlHeader = '<li class="accordion-item bottomBorderLine"><a href="#" class="item-content item-link">'+
                    '<div class="item-inner">'+
                      '<div class="item-title">'+item.set_nm+'</div>'+
                    '</div></a>'+
                  '<div class="accordion-item-content">'+
                    '<div class="block">'+
                       '<ul class="sceneList">'+
                        '<li class="row">'+
                           '<div class="sceneHeader row">'+
                            '<span class="col-25">场景名称</span>'+
                            '<span class="col-75"><input type="text" value="'+item.set_nm+'"/></span>'+
                           '</div>'+
                           '<div class="sceneContent row">'+
                            '<span class="col-25">'+
                                '<label>场景控制项</label>'+
                            '</span>'+
                            '<span class="col-75">';
                htmlFooter = '</span>'+
                           '</div>'+
                        '</li>'+
                      '</ul>'+
                    '</div>'+
                    '<div class="sceneBtn"><a href="#" class="addSceneControl" onclick="sceneAlert(this,\'增加控制项\',\'append\')" dataArgs='+JSON.stringify(controlEquipList)+'>新增控制</a><a href="#" class="saveScene" onclick="submitScene(this,'+item.equip_no+','+item.set_no+')" >保存场景</a><a href="#" class="delScene" onclick="deleteScene('+item.equip_no+','+item.set_no+')">删除场景</a></div>'+
                  '</div>'+
                '</li>';
                html = htmlHeader+htmlContent+htmlFooter;
                $("#equipLinkage_edit>ul").append(html);
                // $("#equipLinkage_edit>ul").animate({scrollTop: $("#equipLinkage_edit>ul")[0].scrollHeight+'px'}, 50);
                return item;
                })
         }
        }).fail(function(e){
             myApp.dialog.close();
        });
}

//添加场景
function addScene(titleName) {
    if (sceneData.some(item => {
    return item.set_nm === titleName
    })) {
      tooitp("不能有相同的场景名称");
     return false;}
    let setNo = 1,
      equipNo = 0
    if (sceneData.filter(equip => equip.communication_drv === 'GWChangJing.NET.dll').length > 0) {
      equipNo = sceneData.filter(equip => equip.communication_drv === 'GWChangJing.NET.dll')[0].equip_no
    }
    sceneData.forEach(item => {
      setNo += (sceneData.some(scene => {
        return scene.set_no === setNo
      })) ? 1 : 0
    })
    let reqData = {
      title: titleName,
      equipNo: equipNo,
      setNo: setNo
    }
    $.when($.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/addScene",{
    data:reqData,
    async:false
        })).done(function(n){
     initSceneList();
    }).fail(function(e){});
}
//提示
function tooitp(txt){
 try{myApp.notification.destroy(toast); } catch(e){}
 var toast = myApp.notification.create({
    title: '系统提示',
    titleRightText: '',
    subtitle: '<br />',
    text: txt,
    closeTimeout: 1000,
 }).open();
}
//保存场景
function submitScene(dt,equipNo,setNo) {
  let sceneName = $(dt).parent().prev().find("input").val(),dataStr="";
  $(dt).parent().prev().find("div.childrenEquipControl").each(function(item){
    dataStr += ($(this).attr("combination")+"+");
  });
  try{dataStr = dataStr.substr(0,dataStr.length-1);}
  catch(e){}
  let reqData = {equipNo: equipNo, setNo: setNo, sceneName: sceneName, dataStr: dataStr }
  $.when($.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/updateScene",{
            data:reqData,
            async:false
        })).done(function(n){
     initSceneList();
    }).fail(function(e){});
}
//删除场景
function deleteScene(equipNo,setNo) {
    myApp.dialog.confirm("是否删除当前场景","提示",function(){
      let reqData = {equipNo: equipNo, setNo: setNo}
      $.when($.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/deleteScene",{
                data:reqData,
                async:false
            })).done(function(n){
         initSceneList();
        }).fail(function(e){});
    });
}
//新增场景控制
function sceneControl(dt,txtTitle){
 myApp.dialog.prompt(txtTitle,"提示", function (name) {
       addScene(name);
    });   
}
//弹窗
var html_ul_li;
function sceneAlert(dt,txtTitle,positionargs){
    var  html ="";
    try{
        controlEquipList.forEach(function(item,index){
           equipList.forEach(function(itemchild,indexchild){
            if(item.equip_no == itemchild.equip_no)
               html += "<option combination='"+item.equip_no+","+item.set_no+"' combinationVal='"+item.value+"'  value="+item.set_nm+">"+item.set_nm+"</option>";
           });
        });        
    }
    catch(e){}
    myApp.dialog.confirm('<div>'+
             '<div class="equipAlertHeader">'+
                '<label class="ivu-radio-wrapper ivu-radio-wrapper-checked" ><span class="ivu-radio ivu-radio-checked"><span class="ivu-checkbox-inner"></span> <input type="radio" name="equipCon" class="ivu-radio-input" id="checkEquip_1" checked></span> 设备控制</label>'+
                '<label class="ivu-radio-wrapper ivu-radio-wrapper-checked" ><span class="ivu-radio ivu-radio-checked"><span class="ivu-radio-inner"></span> <input type="radio" name="equipCon" class="ivu-radio-input" id="checkEquip_2"></span> 延迟设置</label>'+                     
            '</div>'+    
            '<div class="equipAlertContent">'+
                '<div class="row"><label class="col-40">选择设备</label><select class="equipOption col-60" autofocus>'+
                html+
                '</select></div>'+
                '<div class="row displayNone"><label class="col-40">时长(ms)</label><input type="number" value="0" class="equipIntervalTime col-60"/></div>'+                 
            '</div>'+ 
          '</div>'

        ,txtTitle, function (name) {
            let equipName_time,equipName_Value;
            if($("#checkEquip_1").is(":checked"))
            {
                equipName_time =$(".equipOption").find("option:selected").attr("combination");
            }
            else
            {
                equipName_time = $(".equipIntervalTime").val();
            }
          var childrenEl="",index=0; 
          if(positionargs == 'append'){
            childrenEl= $(dt).parent().prev().find("div.sceneContent span.col-75");
            index = childrenEl.find("div.childrenEquipControl").length+1;
          }else{
            childrenEl= $(dt).parent().parent();
            index = $(dt).parents("span.col-75").find("div.childrenEquipControl").length+1;
          }
          html_ul_li = '<div class="row childrenEquipControl" combination="'+equipName_time+'">'+
                '<div class="leftTaskName col-60">'+
                  '<b>'+index+'.</b>'+
                  '<a href="#">'+($("#checkEquip_1").is(":checked")?filterFun(equipList,equipName_time.split(",")[0],null):"间隔操作")+'</a>:<strong>'+($("#checkEquip_1").is(":checked")?filterFun(setList,equipName_time.split(",")[0],equipName_time.split(",")[1]):"延时间隔"+equipName_time+"毫秒")+'</strong>'+
                '</div>'+
                '<div class="rightBtnModul col-40 row no-gap">'+
                    '<a href="#" class="col-33" onclick="sceneAlert(this,\'该项前面插入\',\'before\')"><i class="iconfont icon-f7_top_jt"></i></a>'+
                    '<a href="#" class="col-33" onclick="sceneAlert(this,\'该项后面插入\',\'after\')"><i class="iconfont icon-f7_bottom_jt"></i></a>'+
                    '<a href="#" class="col-33" onclick="currentControl(this)"><i class="iconfont icon-f7_delete"></i></a>'+
                '</div>'+
          '</div>'; 
         positionargs == 'append'?childrenEl.append(html_ul_li):(positionargs == 'before'?childrenEl.before(html_ul_li):childrenEl.after(html_ul_li));
    });
    $("#checkEquip_1,#checkEquip_2").unbind();
    $("#checkEquip_1,#checkEquip_2").bind("change",function(){
       $(this).attr("id") == "checkEquip_1"?$(".equipAlertContent>div:eq(0)").removeClass("displayNone").siblings().addClass("displayNone"):$(".equipAlertContent>div:eq(1)").removeClass("displayNone").siblings().addClass("displayNone");
    });
}
//删除当前控制项
function currentControl(dt){
    myApp.dialog.confirm("是否删除当前控制项","提示",function(){
         $(dt).parent().parent().remove();
    });
  
}

//过滤函数
function filterFun(obj,selecet_equip_no,selecet_set_no){
  if(selecet_set_no == null)
      return  obj.filter(item => {
                      return item.equip_no == selecet_equip_no;
                    }).map(item => { 
                          return "" || item.equip_nm;
                    });
  else
      return  obj.filter(item => {
                      return item.equip_no == selecet_equip_no && item.set_no == selecet_set_no;
                    }).map(item => {
                          return "" || item.set_nm;
                    });    
}
