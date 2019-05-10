var toastCenterLinkage, toastCenterLinkageSuccess;

function equipLinkage() {
    switchToolbar("configTool");
    myApp.dialog.progress('<a style="font-size: 1rem">加载中...</a>');
    initAddList(); //联动设置
    toastCenterLinkage = myApp.toast.create({
        text: "操作失败",
        position: 'center',
        closeTimeout: 2000,
    });
    toastCenterLinkageSuccess = myApp.toast.create({
        text: "操作成功",
        position: 'center',
        closeTimeout: 2000,
    });
}
//左侧添加菜单
function transformReportingObstaciesMenu1() {
    $(".scheduleRightBottomBtn").hasClass("transformReportingMenu") ? $(".scheduleRightBottomBtn").removeClass("transformReportingMenu") : $(".scheduleRightBottomBtn").addClass("transformReportingMenu");
}
//初始化列表
var linkage_init, setparm_init;
var listAdd = [],
    linkageEquips = [];

function initAddList() {
    $("#equipLinkage_set ul").html("");
    $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getEquipList"), AlarmCenterContext.post("/api/GWServiceWebAPI/getSetparmList", {
        findEquip: false
    }), AlarmCenterContext.post("/api/GWServiceWebAPI/getLinkageList")).done(function(n, l, h) {
        let nObject = n.HttpData,
            lObject = l.HttpData,
            hObject = h.HttpData;
        if (nObject.code == 200 && lObject.code == 200 && hObject.code == 200) {
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
            setparm_init = lObject;
            linkage_init = hObject;
            equipLinkList();
        }
        myApp.dialog.close();
    }).fail(function(e) {
        toastCenterLinkage.open();
        myApp.dialog.close();
    });
}
//公共请求
var publicFirstData;
//列表处理
var tableNameNoYcp, tableNameNoYxp, ycpData_table_5, yxpData_table_6, ycpData_table_7, yxpData_table_8, ycpData_table_9, yxpData_table_10,
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
        var ycpData_table_type = 'ycp',
            yxpData_table_type = 'yxp';
        var equip_ycp_nos = "";
        var yc_ycp_nos = "";
        var equip_yxp_nos = "";
        var yc_yxp_nos = "";
        data.forEach(function(item, index) {
            if (item.iycyx_type === "c" || item.iycyx_type === "C") {
                ycpData_table == 'ycp' ? ycpData_table += (' where (equip_no =' + item.iequip_no + ' and yc_no =' + item.iycyx_no + ')') : ycpData_table += (' or (equip_no =' + item.iequip_no + ' and yc_no =' + item.iycyx_no + ')');
                equip_ycp_nos += item.iequip_no + ",";
                yc_ycp_nos += item.iequip_no + ",";
            } else if (item.iycyx_type === "x" || item.iycyx_type === "X") {
                yxpData_table == 'yxp' ? yxpData_table += (' where (equip_no =' + item.iequip_no + ' and yx_no =' + item.iycyx_no + ')') : yxpData_table += (' or (equip_no =' + item.iequip_no + ' and yx_no =' + item.iycyx_no + ')');
                equip_yxp_nos += item.iequip_no + ",";
                yc_yxp_nos += item.iequip_no + ",";
            }
        });
        if (equip_ycp_nos.length > 0) {
            equip_ycp_nos = equip_ycp_nos.substring(0, equip_ycp_nos.length - 1);
            yc_ycp_nos = yc_ycp_nos.substring(0, yc_ycp_nos.length - 1);
        }
        if (equip_yxp_nos.length > 0) {
            equip_yxp_nos = equip_yxp_nos.substring(0, equip_yxp_nos.length - 1);
            yc_yxp_nos = yc_yxp_nos.substring(0, yc_yxp_nos.length - 1);
        }
        if (ycpData_table != "ycp" && yxpData_table != "yxp") {
            $.when($.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/get_DataForListStr", {
                data: {
                    "tType": ycpData_table_type,
                    "equip_nos": equip_ycp_nos,
                    "yc_nos": yc_ycp_nos
                },
                async: false
            }), $.fn.XmlRequset.httpPost("/api/GWServiceWebAPI/get_DataForListStr", {
                data: {
                    "tType": yxpData_table_type,
                    "equip_nos": equip_yxp_nos,
                    "yc_nos": yc_yxp_nos
                },
                async: false
            })).done(function(n, l) {
                if (n.HttpData.code == 200 && n.HttpData.code == 200) {
                    ycpData_table_5 = n.HttpData;
                    yxpData_table_6 = l.HttpData;
                    notEqualToYCPYXP();
                } else {}
            }).fail(function(e) {});
        } else if (ycpData_table != "ycp") {
            $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/get_DataForListStr", {
                "tType": ycpData_table_type,
                "equip_nos": equip_ycp_nos,
                "yc_nos": yc_ycp_nos
            })).done(function(n) {
                if (n.HttpData.code == 200) {
                    ycpData_table_7 = data;
                    notEqualToYCP();
                }
            }).fail(function(e) {});
        } else if (yxpData_table != "yxp") {
            $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/get_DataForListStr", {
                "tType": yxpData_table_type,
                "equip_nos": equip_yxp_nos,
                "yc_nos": yc_yxp_nos
            })).done(function(n) {
                if (n.HttpData.code == 200) {
                    yxpData_table_8 = data;
                    notEqualToYXP();
                }
            }).fail(function(e) {});
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
        let ycpData = ycpRt.data,
            yxpData = yxpRt.data;
        publicFun(ycpData, yxpData);
    }
}
//不等于ycp 
function notEqualToYCP() {
    let ycpRt = ycpData_table_7;
    let ycpData = ycpRt,
        yxpData = null;
    publicFun(ycpData, yxpData);
}
//不等于yxp
function notEqualToYXP() {
    let yxpRt = yxpData_table_8;
    let ycpData = null,
        yxpData = yxpRt;
    publicFun(ycpData, yxpData);
}
var equipLinkage_public_list = [];

function publicFun(ycpData, yxpData) {
    var html = "";
    equipLinkage_public_list = linkage_init.data.map((row, index) => {
        let result = {}
        result.id = row.ID;
        result.originalData = row;
        result.delayTime = row.delay;
        result.optCode = row.value;
        result.remarks = row.ProcDesc;
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
            if (ycpData) ycpData.forEach(item => {
                if (row.iequip_no === item.equip_no && row.iycyx_no === item.yc_no) {
                    result.cCurren = item.yc_nm
                }
            })
        } else if (row.iycyx_type === "x" || row.iycyx_type === "X") {
            if (yxpData) yxpData.forEach(item => {
                if (row.iequip_no === item.equip_no && row.iycyx_no === item.yx_no) {
                    result.cCurren = item.yx_nm
                }
            })
        } else {
            result.cCurren = "无"
        }
        html += `<li class="swipeout bottomBorderLine">
          <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildLinkage(this,1)" TrID="${result.id}" TrRow = '${index}'>
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
    $("#equipLinkage_set ul").html(html);
}
//联动设置添加
var equipTiggerType = [],
    equipTiggerSpot = [],
    equipTiggerLink = [],
    equipTiggerCom = [],
    dtParent;

function newlyBuildLinkage(dt, index) {
    dtParent = dt;
    var result = $(dtParent).attr("TrRow") ? equipLinkage_public_list[$(dtParent).attr("TrRow")] : {
        id: "",
        equipName: "",
        cType: "",
        cCurren: "",
        delayTime: 0,
        linkageEquip: "",
        linkageOpt: "",
        remarks: ""
    };
   //var html = '<div class="popup popup-aboutuser">' + '<h1>设备联动</h1>' + '<div class="popupContent list inline-labels no-hairlines-md">' + '<ul>' + '<li class="item-content item-input" style="padding-left: 0;">' + '<div class="item-inner">' + '<div class="item-title item-label">触发设备</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="选择触发设备" value = "' + (result.equipName ? result.equipName : "") + '"  class="equipTiggerName" id="equipTiggerName" >' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">' + '<div class="item-inner">' + '<div class="item-title item-label">触发类型</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="选择触发类型" value = "' + (result.cType ? result.cType : "") + '"  class="equipTiggerType" id="equipTiggerType" >' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">' + '<div class="item-inner">' + '<div class="item-title item-label">触发点</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="选择触发点" value = "' + (result.cCurren ? result.cCurren : "") + '"  class="equipTiggerSpot" id="equipTiggerSpot" >' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">' + '<div class="item-inner">' + '<div class="item-title item-label">延时(ms)</div>' + '<div class="item-input-wrap">' + '<input type="number" placeholder="输入延迟时间" value = "' + (result.delayTime ? result.delayTime : 0) + '" class="equipTiggerTime" id="equipTiggerTime">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">' + '<div class="item-inner">' + '<div class="item-title item-label">联动设备</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="选择联动设备" value = "' + (result.linkageEquip ? result.linkageEquip : "") + '" class="equipTigger_Link" id="equipTigger_Link">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">' + '<div class="item-inner">' + '<div class="item-title item-label">联动命令</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="选择联动命令" value = "' + (result.linkageOpt ? result.linkageOpt : "") + '" class="equipTiggerCom" id="equipTiggerCom">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '<li class="item-content item-input" style="padding-left: 0;">' + '<div class="item-inner">' + '<div class="item-title item-label">备注信息</div>' + '<div class="item-input-wrap">' + '<input type="text" placeholder="输入备注信息" value = "' + (result.remarks ? result.remarks : "") + '" class="equipTiggerInfo" id="equipTiggerInfo">' + '<span class="input-clear-button"></span>' + '</div>' + '</div>' + '</li>' + '</ul>' + '</div>' + '<div class="popupBtb row">' + '<a class="link popup-close col-50 button" href="#">返回</a>' + '<a class="link popupOpenBtn col-50 button" href="#" onclick="addLinkage(this,' + index + ')" dataID=' + result.id + '>确认</a>' + '</div>' + '</div>';
    myApp.router.navigate("/equipLinkageModify/?" + result.equipName + "&" + result.cType + "&" + result.cCurren + "&" + result.delayTime + "&" + result.linkageEquip + "&" + result.linkageOpt + "&" + result.optCode + "&" + result.remarks + "&" + result.id + "&" + index + "");
    
    setTimeout(function() {
        link_listInit_equip("equipTiggerName", listAdd.map(item => {
            return item.label;
        }), result.equipName, index); //触发设备
        link_listInit_equip("equipTigger_Link", linkageEquips.map(item => {
            return item.label;
        }), result.linkageEquip, index); //联动设备
        try {
            link_listInit_no = listAdd.filter((equip, index) => {
                if (equip.label === $("#equipTiggerName").val()) {
                    return equip;
                }
            })[0].value;
        } catch (e) {
            link_listInit_no = "";
        }
        if (link_listInit_no) $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getYcp", {
            equip_nos: link_listInit_no
        }), AlarmCenterContext.post("/api/GWServiceWebAPI/getYxp", {
            equip_nos: link_listInit_no
        })).done(function(n, l) {
            if (n.HttpData.code == 200 && l.HttpData.code == 200) {
                ycpData_table_9 = n.HttpData;
                yxpData_table_10 = l.HttpData;
                writeContent();
            }
        }).fail(function(e) {});
        $.when(AlarmCenterContext.post("/api/real/get_setparm", {
            equip_nos: linkageEquips.filter((item, index) => {
                if (item.label == $("#equipTigger_Link").val()) return item;
                else return [{
                    value: ""
                }];
            })[0].value
        })).done(function(n, l) {
            if (n.HttpData.code == 200) {
                loadLinkageEquips(n.HttpData.data);
            }
        }).fail(function(e) {});
    }, 50);
}
//确认
function updateEquipLink(dt) {}
//列表联动
function writeContent() {
    let ycpRt = ycpData_table_9,
        yxpRt = yxpData_table_10,
        item = typeList.filter((dt, index) => {
            if (dt.label == $("#equipTiggerType").val()) return dt;
        }),
        childrenContent;
    if (ycpRt.code === 200 || yxpRt.code === 200) {
        let ycpData = ycpRt.data,
            yxpData = yxpRt.data;
        equipTiggerType = typeList;
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
        try {
            link_listInit_type.destroy();
        } catch (e) {}
        Init_type_fun("equipTiggerType", equipTiggerType.map(item => {
            return item.label;
        })); //触发类型
    } else {}
}

var equipTiggerCommand;
function loadLinkageEquips(data) {
    equipTiggerCommand = data;
    try {
        link_listInit_com.destroy();
    } catch (e) {}
    try {
        Init_com_fun("equipTiggerCom", data.map(item => {
            return item.set_nm
        }));
    } catch (e) {}
}
// 插入或者更新记录 
function addLinkage(dt, index) { //index = 1 更新，index = 2 插入
    let equipLink_cType = getObject(equipTiggerType, "equipTiggerType", 2);
    let equipLink_spot = getObject(equipTiggerType, "equipTiggerType", 1);
    let equipLink_linkEquipNo = getObject(linkageEquips, "equipTigger_Link", 2);
    let equipLink_linkNo = getObject(equipTiggerCommand, "equipTiggerCom", 3);
    var equipLink_cNo;
    try {
        equipLink_cNo = equipLink_spot[0].children.filter((item, index) => {
            if (item.label == $(".equipTiggerSpot").val()) return item;
        })[0].value;
    } catch (e) {}
    if (!link_listInit_no) {
        toastCenterLinkage.open();
        return false;
    }
    var reqData = {
        id: $(dt).attr("dataID") || 1,
        equipNo: link_listInit_no,
        cType: equipLink_cType.length > 0 ? equipLink_cType[0].value : "''",
        cNo: equipLink_cNo ? equipLink_cNo : 0,
        delay: $(".equipTiggerTime").val(),
        linkEquipNo: equipLink_linkEquipNo.length > 0 ? equipLink_linkEquipNo[0].value : "''",
        linkNo: equipLink_linkNo.length > 0 && equipLink_linkNo ? equipLink_linkNo[0].set_no : "null",
        optCode: '""',
        remarks: $(".equipTiggerInfo").val() || ""
    }
    if (index == 1) {
        $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/updateLinkage", reqData)).done(function(n) {
            if (n.HttpData.code == 200) {
                initAddList();
                toastCenterLinkageSuccess.open();
                myApp.router.back();
            }
        }).fail(function(e) {
            toastCenterLinkage.open();
        });
    } else {
        $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/addLinkage", reqData)).done(function(n) {
            if (n.HttpData.code == 200) {
                initAddList();
                $("#equipLinkage_set ul").animate({
                    scrollTop: $("#equipLinkage_set ul")[0].scrollHeight + 'px'
                }, 50);
                toastCenterLinkageSuccess.open();
                myApp.router.back();
            }
        }).fail(function(e) {
            toastCenterLinkage.open();
        });
    }
}
//删除
function deleteLinkage(dt) {
    let val = parseInt($(dt).parent().siblings().attr("trid"));
    myApp.dialog.confirm("是否删除该项", "提示", function() {
        myApp.popup.close();
        $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/deleteLinkage", {
            id: val
        })).done(function(n) {
            if (n.HttpData.code == 200) {
                toastCenterLinkageSuccess.open();
                $(dt).parents("li").remove();
            }
        }).fail(function(e) {
            toastCenterLinkage.open();
        });
    });
}
//动态创建弹窗
var popupLinkage;

function link_popupAlert(html) {
    popupLinkage = myApp.popup.create({
        content: html,
        on: {
            opened: function(e) {}
        }
    }).open();
}
//触发设备
function link_listInit_equip(id, equipArray, equipNameValue, equipNameType) {
    if (equipNameType == 1) {
        myApp.picker.create({
            inputEl: '#' + id,
            value: [equipNameValue],
            cols: [{
                textAlign: 'center',
                values: equipArray,
                onChange: function(picker, country) {
                    switch (id) {
                        case "equipTiggerName":
                            link_listInit_no = listAdd.filter((equip, index) => {
                                if (equip.label === country) {
                                    return equip;
                                }
                            })[0].value;
                            if (link_listInit_no) $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getYcp", {
                                equip_nos: link_listInit_no
                            }), AlarmCenterContext.post("/api/GWServiceWebAPI/getYxp", {
                                equip_nos: link_listInit_no
                            })).done(function(n, l) {
                                if (n.HttpData.code == 200 && l.HttpData.code == 200) {
                                    ycpData_table_9 = n.HttpData;
                                    yxpData_table_10 = l.HttpData;
                                    writeContent();
                                }
                            }).fail(function(e) {});
                            $(".equipTiggerType,.equipTiggerSpot").val("");
                            break;
                        case "equipTigger_Link":
                            $(".equipTiggerCom").val("");
                            $.when(AlarmCenterContext.post("/api/real/get_setparm", {
                                equip_nos: linkageEquips.filter((item, index) => {
                                    if (item.label == country) return item;
                                })[0].value
                            })).done(function(n, l) {
                                if (n.HttpData.code == 200) {
                                    loadLinkageEquips(n.HttpData.data);
                                }
                            }).fail(function(e) {});
                            break;
                        case "":
                            break;
                    }
                }
            }],
        });
    } else {
        myApp.picker.create({
            inputEl: '#' + id,
            cols: [{
                textAlign: 'center',
                values: equipArray,
                onChange: function(picker, country) {
                    switch (id) {
                        case "equipTiggerName":
                            link_listInit_no = listAdd.filter((equip, index) => {
                                if (equip.label === country) {
                                    return equip;
                                }
                            })[0].value;
                            if (link_listInit_no) $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getYcp", {
                                equip_nos: link_listInit_no
                            }), AlarmCenterContext.post("/api/GWServiceWebAPI/getYxp", {
                                equip_nos: link_listInit_no
                            })).done(function(n, l) {
                                if (n.HttpData.code == 200 && l.HttpData.code == 200) {
                                    ycpData_table_9 = n.HttpData;
                                    yxpData_table_10 = l.HttpData;
                                    writeContent();
                                }
                            }).fail(function(e) {});
                            $(".equipTiggerType,.equipTiggerSpot").val("");
                            break;
                        case "equipTigger_Link":
                            $(".equipTiggerCom").val("");
                            $.when(AlarmCenterContext.post("/api/real/get_setparm", {
                                equip_nos: linkageEquips.filter((item, index) => {
                                    if (item.label == country) return item;
                                })[0].value
                            })).done(function(n, l) {
                                if (n.HttpData.code == 200) {
                                    loadLinkageEquips(n.HttpData.data);
                                }
                            }).fail(function(e) {});
                            break;
                        case "":
                            break;
                    }
                }
            }],
        });
    }
}
//触发类型 
var link_listInit_type;

function Init_type_fun(id, equipArray) {
    link_listInit_type = myApp.picker.create({
        inputEl: '#' + id,
        cols: [{
            textAlign: 'center',
            values: equipArray,
            onChange: function(picker, country) {
                $(".equipTiggerSpot").val("");
                let getType = equipTiggerType.filter((item, index) => {
                    if (item.children.length > 0 && item.label == country) return item;
                });
                try {
                    link_listInit_spot.destroy();
                } catch (e) {}
                try {
                    Init_spot_fun("equipTiggerSpot", getType[0].children.map(item => {
                        return item.label
                    }));
                } catch (e) {}
            }
        }],
    });
}
//触发点
var link_listInit_spot;

function Init_spot_fun(id, equipArray) {
    link_listInit_spot = myApp.picker.create({
        inputEl: '#' + id,
        cols: [{
            textAlign: 'center',
            values: equipArray
        }],
    });
}
//触发命令
var link_listInit_com;

function Init_com_fun(id, equipArray) {
    link_listInit_com = myApp.picker.create({
        inputEl: '#' + id,
        cols: [{
            textAlign: 'center',
            values: equipArray
        }],
    });
}
//获取最大ID
function getMaxID() {
    var arrayID = [];
    $("#equipLinkage_set tbody tr").each(function(item) {
        arrayID.push($(this).attr("TrID"));
    });
    if (arrayID.length > 0) return Math.max.apply(null, arrayID) + 1;
    else return 1;
}
//获取存在条件对象
function getObject(arrayObject, className, index) {
    if (index == 1) return arrayObject.filter((item, index) => {
        if (item.children.length > 0 && item.label == $("." + className).val()) return item;
    });
    else if (index == 2) return arrayObject.filter((item, index) => {
        if (item.label == $("." + className).val()) return item;
    });
    else if (index == 3) return arrayObject.filter((item, index) => {
        if (item.set_nm == $("." + className).val()) return item;
    });
}