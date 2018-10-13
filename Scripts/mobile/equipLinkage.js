function equipLinkage() {
    switchToolbar("configTool");
    //顶部菜单切换
    $(".subnavbarTabel>a").unbind();
    $(".subnavbarTabel>a").bind("click", function() {
        $(this).addClass("selectScheduleMenu").siblings().removeClass("selectScheduleMenu");
        $($(this).attr("href")).removeClass("displayNone").siblings().addClass("displayNone");
        //切换
        equipLlinkswitchMenu(this);
        //顶部添加
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
                    break;
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
    equipLinkPublicAjax("", "/api/GWServiceWebAPI/getEquipList", 2);
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
var tableNameNoYcp, tableNameNoYxp, ycpData_table_5, yxpData_table_6, ycpData_table_7, yxpData_table_8,
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
            publicFun(null, null, 4);
        }
    }
}
// 不等于ycp yxp
function notEqualToYCPYXP() {
    let ycpRt = ycpData_table_5,
        yxpRt = yxpData_table_6;
    if (ycpRt.code === 200 && yxpRt.code === 200) {
        let ycpData = ycpRt.data,
            yxpData = yxpRt.data;
        publicFun(ycpData, yxpData, 1);
    }
}
//不等于ycp
function notEqualToYCP() {
    let ycpRt = ycpData_table_7;
    if (ycpRt.code === 200) {
        let ycpData = ycpRt.data;
        publicFun(ycpData, null, 2);
    }
}
//不等于yxp
function notEqualToYXP() {
    let yxpRt = yxpData_table_8;
    if (yxpRt.code === 200) {
        let yxpData = yxpRt.data;
        publicFun(null, yxpData, 3);
    }
}
var equipLinkage_public_list = [];

function publicFun(ycpData, yxpData, number) {
    let html = "";
    equipLinkage_public_list = linkage_init.data.map(row => {
        let result = {}
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
            ycpData.forEach(item => {
                if (row.iequip_no === item.equip_no && row.iycyx_no === item.yc_no) {
                    result.cCurren = item.yc_nm
                }
            })
        } else if (row.iycyx_type === "x" || row.iycyx_type === "X") {
            yxpData.forEach(item => {
                if (row.iequip_no === item.equip_no && row.iycyx_no === item.yx_no) {
                    result.cCurren = item.yx_nm
                }
            })
        } else {
            result.cCurren = "无"
        }
        html += '<tr>' + '<td>' + result.equipName + '</td>' + '<td>' + result.cType + '</td>' + '<td>' + result.cCurren + '</td>' + '<td>' + result.delayTime + '</td>' + '<td>' + result.linkageEquip + '</td>' + '<td>' + (result.linkageOpt ? result.linkageOpt : '空') + '</td>' + '<td>' + (result.optCode ? result.optCode : '空') + '</td>' + '<td>' + result.remarks + '</td>' + '</tr>';
        return result;
    })
    $("#equipLinkage_set tbody").append(html);
}

//联动设置添加
function newlyBuildLinkage(userName,telphone,telmobile,emailValue,ackLevel,index,status){
var html = '<div class="popup popup-aboutuser">'+
      '<h1>设备联动</h1>'+
      '<div class="popupContent list inline-labels no-hairlines-md">'+
            '<ul>'+
              '<li class="item-content item-input">'+
                '<div class="item-media">'+
                  '<i class="icon demo-list-icon"></i>'+
                '</div>'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">触发设备(点)</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="text" placeholder="选择触发设备和触发点" value = ""  class="equipTigger" id="equipTigger" '+status+'>'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+
              '<li class="item-content item-input">'+
                '<div class="item-media">'+
                  '<i class="icon demo-list-icon"></i>'+
                '</div>'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">延迟时间</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="number" placeholder="输入延迟时间" value = "0" class="telphone">'+
                    '<span class="input-clear-button"></span>'+
                  '</div>'+
                '</div>'+
              '</li>'+
              '<li class="item-content item-input">'+
                '<div class="item-media">'+
                  '<i class="icon demo-list-icon"></i>'+
                '</div>'+
                '<div class="item-inner">'+
                  '<div class="item-title item-label">联动和操作</div>'+
                  '<div class="item-input-wrap">'+
                    '<input type="number" placeholder="选择联动和操作" value = "" class="telmobile">'+
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
                    '<input type="email" placeholder="输入备注信息" value = "" class="emailValue">'+
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
    link_popupAlert(html);
    //动态加载 触发设备-触发点的选择
    // this.Axios.post("/api/GWServiceWebAPI/getYcp", reqData),
    // this.Axios.post("/api/GWServiceWebAPI/getYxp", reqData)
    equipLinkPublicAjax({
        equip_nos: item.value
      }, "/api/GWServiceWebAPI/getYcp", 9);

    var equipArray = [["哈哈哈","111","2222","3333"],["222"],["4444"]];
    link_listInit("equipTigger",equipArray);
    // console.log(listAdd);
}

    //动态创建弹窗
    function link_popupAlert(html){
      var popup = myApp.popup.create({
      content: html,
      on: {
        opened: function (e) {
           //     console.log($(e.params.content).find("a.popupOpenBtn").prop("disabled",true));
            // // if(index == 2)
            // //   $(html).find("a.popupOpenBtn").prop("disabled",true);
          }
      }
    }).open();
    }


    //下拉列表初始化
    function link_listInit(id,equipArray){
        let listData = [];
        for(var i=0;i<equipArray.length;i++)
        {
           listData.push({textAlign: 'center',values: equipArray[i] });
        }
        myApp.picker.create({
          inputEl: '#'+id,
          cols: listData
        }); 
    }