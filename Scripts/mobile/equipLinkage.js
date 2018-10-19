function equipLinkage() {
    switchToolbar("configTool");
    $(".subnavbarTabel>a").unbind();
    $(".subnavbarTabel>a").bind("click", function() {
        $(this).addClass("selectScheduleMenu").siblings().removeClass("selectScheduleMenu");
        $($(this).attr("href")).removeClass("displayNone").siblings().addClass("displayNone");
        equipLlinkswitchMenu(this);
        $($(this).attr("href") + "_nav").removeClass("displayNone").siblings().addClass("displayNone");
    });
    // 初始化设备
    initAddList();
}
//switchMenu
function equipLlinkswitchMenu(dt) {
    switch ($(dt).attr("href")) {
        case "#equipLinkage_set":
            break;
        case "#equipLinkage_edit":
            break;
    }
}
//初始化列表
var linkage_init, setparm_init;
function initTableList() {equipLinkPublicAjax("", "/api/GWServiceWebAPI/getLinkageList", 3);}
var listAdd = [],linkageEquips = [];
function initAddList() {equipLinkPublicAjax("", "/api/GWServiceWebAPI/getEquipList", 1);}
//公共请求
var publicFirstData;
function equipLinkPublicAjax(jsonString, url, index) {
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
            switch (index) {
                case 1:
                    publicFirstData = data.HttpData.data;
                    tiggerEquip(data.HttpData.data);
                    break;
                case 2:
                    linkEquip(data.HttpData.data);
                    break;
                case 3:
                    linkage_init = data.HttpData;
                    equipLinkPublicAjax({
                        findEquip: false
                    }, "/api/GWServiceWebAPI/getSetparmList", 4);
                    break;
                case 4:
                    setparm_init = data.HttpData;
                    equipLinkList();
                    break;
                case 5:
                    ycpData_table_5 = data.HttpData;
                    equipLinkPublicAjax({
                        "TableName": tableNameNoYxp
                    }, "/api/GWServiceWebAPI/get_DataByTableName", 6);
                    break;
                case 6:
                    yxpData_table_6 = data.HttpData;
                    notEqualToYCPYXP();
                    break;
                case 7:
                    ycpData_table_7 = data.HttpData;
                    notEqualToYCP();
                    break;
                case 8:
                    yxpData_table_8 = data.HttpData;
                    notEqualToYXP();
                    break;
                case 9:
                    ycpData_table_9=data.HttpData;
                    equipLinkPublicAjax({
                         equip_nos: link_listInit_no
                    }, "/api/GWServiceWebAPI/getYxp", 10);
                    break;
                case 10: 
                   yxpData_table_10 = data.HttpData;
                   writeContent();
                    break;
                case 11: loadLinkageEquips(data.HttpData.data);break;
                case 12: $("#equipLinkage_set tbody").html("");initTableList();break;
                case 13: $("#equipLinkage_set tbody").html("");initTableList();break;
                case 14: $("#equipLinkage_set tbody").html("");initTableList();break;
            }
        }
    }
    function _error(e) {}
}
//触发设备
function tiggerEquip(data) {
    listAdd = data.map(item => {
        return {
            value: item.equip_no,
            label: item.equip_nm,
            loading: false,
            children: []
        }
    })
    equipLinkPublicAjax({findEquip: false}, "/api/GWServiceWebAPI/getSetparmList", 2);
}
//联动设备
function linkEquip(data) {    
    linkageEquips = publicFirstData.filter((equip, index) => {
        if (data.some(parm => {
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
    })
    initTableList();
}
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
        var data = rt.data,
            parmData = parmRt.data
        var ycpData_table = 'ycp',
            yxpData_table = 'yxp';
        data.forEach(function(item, index) {
            if (item.iycyx_type === "c" || item.iycyx_type === "C") {
                ycpData_table == 'ycp' ? ycpData_table += (' where (equip_no =' + item.iequip_no + ' and yc_no =' + item.iycyx_no + ')') : ycpData_table += (' or (equip_no =' + item.iequip_no + ' and yc_no =' + item.iycyx_no + ')');
            } else if (item.iycyx_type === "x" || item.iycyx_type === "X") {
                yxpData_table == 'yxp' ? yxpData_table += (' where (equip_no =' + item.iequip_no + ' and yc_no =' + item.iycyx_no + ')') : yxpData_table += (' or (equip_no =' + item.iequip_no + ' and yc_no =' + item.iycyx_no + ')');
            }
        });
        if (ycpData_table != "ycp" && yxpData_table != "yxp") {
            tableNameNoYcp = ycpData_table, tableNameNoYxp = yxpData_table;
            equipLinkPublicAjax({
                "TableName": ycpData_table
            }, "/api/GWServiceWebAPI/get_DataByTableName", 5);
        } else if (ycpData_table != "ycp") {
            equipLinkPublicAjax({
                "TableName": ycpData_table
            }, "/api/GWServiceWebAPI/get_DataByTableName", 7);
        } else if (yxpData_table != "yxp") {
            equipLinkPublicAjax({
                "TableName": yxpData_table
            }, "/api/GWServiceWebAPI/get_DataByTableName", 8);
        } else { 
            publicFun(null, null);
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
    let html = "";
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
        html += '<tr onclick=\'newlyBuildLinkage("'+result.equipName+'","'+result.cType+'","'+result.cCurren+'",'+result.delayTime+',"'+result.linkageEquip+'","'+result.linkageOpt+'","'+result.optCode+'","'+result.remarks+'",'+result.id+',1)\' TrID='+result.id+'>' + '<td>' + result.equipName + '</td>' + '<td>' + result.cType + '</td>' + '<td>' + result.cCurren + '</td>' + '<td>' + result.delayTime + '</td>' + '<td>' + result.linkageEquip + '</td>' + '<td>' + (result.linkageOpt ? result.linkageOpt : '空') + '</td>' + '<td>' + (result.optCode ? result.optCode : '空') + '</td>' + '<td>' + result.remarks + '</td>' + '</tr>';
        return result;
    })
    $("#equipLinkage_set tbody").append(html);
}

//联动设置添加
var equipTiggerType=[],equipTiggerSpot=[],equipTiggerLink=[],equipTiggerCom=[];
function newlyBuildLinkage(equipName,cType,cSpot,delayTime,linkageEquip,linkageOpt,optCode,remarks,ID,index){
var html = '<div class="popup popup-aboutuser">'+
      '<h1>设备联动</h1>'+
      '<div class="popupContent list inline-labels no-hairlines-md">'+
            '<ul>'+
              '<li class="item-content item-input">'+
                '<div class="item-media">'+
                  '<i class="icon demo-list-icon"></i>'+
                '</div>'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">触发设备</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="text" placeholder="选择触发设备" value = "'+(equipName !=" "?equipName:"")+'"  class="equipTiggerName" id="equipTiggerName" >'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+
              '<li class="item-content item-input">'+
                '<div class="item-media">'+
                  '<i class="icon demo-list-icon"></i>'+
                '</div>'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">触发类型</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="text" placeholder="选择触发类型" value = "'+(cType !=" "?cType:"")+'"  class="equipTiggerType" id="equipTiggerType" >'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+
              '<li class="item-content item-input">'+
                '<div class="item-media">'+
                  '<i class="icon demo-list-icon"></i>'+
                '</div>'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">触发点</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="text" placeholder="选择触发点" value = "'+(cSpot !=" "?cSpot:"")+'"  class="equipTiggerSpot" id="equipTiggerSpot" >'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+                                       
              '<li class="item-content item-input">'+
                '<div class="item-media">'+
                  '<i class="icon demo-list-icon"></i>'+
                '</div>'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">延时(ms)</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="number" placeholder="输入延迟时间" value = "'+(delayTime !=" "?delayTime:0)+'" class="equipTiggerTime" id="equipTiggerTime">'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+
              '<li class="item-content item-input">'+
                '<div class="item-media">'+
                  '<i class="icon demo-list-icon"></i>'+
                '</div>'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">联动设备</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="text" placeholder="选择联动设备" value = "'+(linkageEquip !=" "?linkageEquip:"")+'" class="equipTigger_Link" id="equipTigger_Link">'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+
              '<li class="item-content item-input">'+
                '<div class="item-media">'+
                  '<i class="icon demo-list-icon"></i>'+
                '</div>'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">联动命令</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="text" placeholder="选择联动命令" value = "'+(linkageOpt !=" "?linkageOpt:"")+'" class="equipTiggerCom" id="equipTiggerCom">'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+              
              '<li class="item-content item-input">'+
                '<div class="item-media">'+
                  '<i class="icon demo-list-icon"></i>'+
                '</div>'+
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
        '<a class="link popup-close col-33 button" href="#">退出</a>'+
        '<a class="link popup-close popupOpenBtn col-33 button" href="#" onclick="addLinkage(this,'+index+')" dataID='+ID+'>确认</a>'+
        '<a class="link popup-close col-33 button" href="#" onclick="deleteLinkage(this)" dataID='+ID+'>删除</a>'+
      '</div>'+
    '</div>';
    link_popupAlert(html);
    link_listInit_equip("equipTiggerName",listAdd.map(item => {return item.label;})); //触发设备
    link_listInit_equip("equipTigger_Link",linkageEquips.map(item => {return item.label;})); //联动设备

   link_listInit_no = listAdd.filter((equip, index) => {if ( equip.label === $("#equipTiggerName").val()) {return equip;}})[0].value;
   link_listInit_no?equipLinkPublicAjax({equip_nos: link_listInit_no}, "/api/GWServiceWebAPI/getYcp", 9):"";
   equipLinkPublicAjax({equip_nos: linkageEquips.filter((item,index) => {if(item.label == $("#equipTigger_Link").val()) return item;})[0].value}, "/api/real/get_setparm", 11);

}
//确认
function updateEquipLink(dt){
   alert($("#equipTiggerName").val());
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
      let equipLink_cType = getObject(equipTiggerType,"equipTiggerType",2);
      let equipLink_spot = getObject(equipTiggerType,"equipTiggerType",1);
      let equipLink_linkEquipNo = getObject(linkageEquips,"equipTigger_Link",2);
      let equipLink_linkNo = getObject(equipTiggerCommand,"equipTiggerCom",3);
      var equipLink_cNo;
      try{
        equipLink_cNo = equipLink_spot[0].children.filter((item,index) =>{if(item.label == $(".equipTiggerSpot").val()) return item;})[0].value;
      }catch(e){}
      
      let reqData = {
        id: $(dt).attr("dataID"),
        equipNo: link_listInit_no,
        cType: equipLink_cType[0].value,
        cNo: equipLink_cNo?equipLink_cNo:0,
        delay: $(".equipTiggerTime").val(),
        linkEquipNo: equipLink_linkEquipNo[0].value,
        linkNo: equipLink_linkNo[0].set_no,
        optCode: '""',
        remarks: $(".equipTiggerInfo").val()
      } 
      if(index == 1) 
      {
        equipLinkPublicAjax(reqData, "/api/GWServiceWebAPI/updateLinkage", 12);
      }
      else
      {
         equipLinkPublicAjax(reqData, "/api/GWServiceWebAPI/addLinkage", 13);
      }
    }
//删除
function deleteLinkage(dt) {
    equipLinkPublicAjax({
            id: $(dt).attr("dataID")
          }, "/api/GWServiceWebAPI/deleteLinkage", 14);
    }
//动态创建弹窗
function link_popupAlert(html){
  var popup = myApp.popup.create({
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
                    link_listInit_no?equipLinkPublicAjax({equip_nos: link_listInit_no}, "/api/GWServiceWebAPI/getYcp", 9):"";
                    $(".equipTiggerType,.equipTiggerSpot").val("");
                break;
                case "equipTigger_Link": 
                    $(".equipTiggerCom").val("");
                    equipLinkPublicAjax({equip_nos: linkageEquips.filter((item,index) => {if(item.label == country) return item;})[0].value}, "/api/real/get_setparm", 11);
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
    if(index == 3)
    console.log(arrayObject);
    if(index == 1)
      return arrayObject.filter((item,index) => {if(item.children.length>0 && item.label == $("."+className).val()) return item;});
    else if(index == 2)
      return arrayObject.filter((item,index) => {if(item.label == $("."+className).val()) return item;});
    else if(index == 3)
      return arrayObject.filter((item,index) => {if(item.set_nm == $("."+className).val()) return item;}); 
}
//初始化场景设置
function initSceneList() {
    this.sceneLoading = true
    this.Axios.all([this.Axios.post('/api/GWServiceWebAPI/getSetparmList', {
        findEquip: false
    }), this.Axios.post('/api/GWServiceWebAPI/getEquipList')]).then(this.Axios.spread((res, equipRes) => {
        let rt = res.data.HttpData,
            equipRt = equipRes.data.HttpData
        if (rt.code === 200 && equipRt.code === 200) {
            this.setList = rt.data
            this.equipList = equipRt.data
            this.sceneData = this.setList.filter(item => {
                return item.set_type === "J"
            }).map(item => {
                let keyArr = []
                if (item.value !== null) {
                    keyArr = item.value.split('+').map(key => {
                        return key.split(',')
                    })
                } else {
                    keyArr = [
                        ['']
                    ]
                }
                this.$set(item, 'childKey', keyArr)
                this.$set(item, 'children', [])
                item.childKey.forEach(k => {
                    if (k.length < 2) {
                        if (k[0] !== '') {
                            let time = parseInt(k[0])
                            item.children.push({
                                isDelay: true,
                                time: time,
                                set_nm: '延时间隔' + time + '毫秒'
                            })
                        }
                    } else {
                        this.setList.forEach(equip => {
                            let equipNo = parseInt(k[0]),
                                setNo = parseInt(k[1])
                            if (equip.equip_no === equipNo && equip.set_no === setNo) {
                                item.children.push(equip)
                            }
                        })
                    }
                })
                item.children.map(child => {
                    if (child.isDelay) {
                        child.parentEquip = {
                            equip_nm: '间隔操作'
                        }
                    } else {
                        this.equipList.forEach(equip => {
                            if (equip.equip_no === child.equip_no) {
                                child.parentEquip = equip
                            }
                        })
                    }
                    return child
                })
                return item
            })
            this.insertForm.insertList = this.setList.map(equip => {
                equip.value = equip.equip_no + '-' + equip.set_no + '-' + equip.set_type
                this.$set(equip, 'label', equip.set_nm)
                if (!equip.parentEquip) {
                    equip.parentEquip = this.equipList.filter(item => {
                        return equip.equip_no === item.equip_no
                    })[0]
                }
                return equip
            })
            // 过滤目前不可操作设备
            this.insertForm.insertList = this.insertForm.insertList.filter(equip => {
                if (this.equipList.some(eqp => {
                        return equip.equip_no === eqp.equip_no
                    })) {
                    return equip
                }
            })
        } else {
            this.$Message.warning('初始化数据失败，请重试！')
            console.log(rt, equipRt)
        }
        this.sceneLoading = false
    })).catch(err => {
        console.log(err)
    })
}

// function test(){
//     $.when($.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/getEquipList",{
//             data:{},
//             async:false
//         }),$.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/getSetparmList",{
//             data:{findEquip: false},
//             async:false
//     })).done(function(n,l){
//         if(n.HttpData.code ==200 && l.HttpData.code ==200){
//                 console.log(n);
//        console.log(l);   
//    }
//     }).fail(function(e){

//     });
// }