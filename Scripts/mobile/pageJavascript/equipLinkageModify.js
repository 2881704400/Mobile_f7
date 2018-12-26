function equipLinkageModify() {
    var chatObject = myApp.views.main.history,
    urlLength = chatObject.length - 1,
    receiveUser = chatObject[urlLength].split("?")[1],msgArray=[];
    receiveUser?msgArray = receiveUser.split("&"):"";

    var index="";
    if(receiveUser){
    	var receiveUserArr=receiveUser.split("&");
    	var equipName=receiveUserArr[0];
    	var cType=receiveUserArr[1];
    	var cSpot=receiveUserArr[2];
    	var delayTime=receiveUserArr[3];
    	var linkageEquip=receiveUserArr[4];
    	var linkageOpt=receiveUserArr[5];
    	var optCode=receiveUserArr[6];
    	var remarks=receiveUserArr[7];
    	var ID=receiveUserArr[8];
    	index=receiveUserArr[9];
    	if(equipName!=" "&&equipName!="undefined"){
    		$("#equipTiggerName").val(equipName);
    	}
    	if(cType!=" "&&cType!="undefined"){
    		$("#equipTiggerType").val(cType);
    	}
    	if(cSpot!=" "&&cSpot!="undefined"){
    		$("#equipTiggerSpot").val(cSpot);
    	}
    	if(delayTime!=" "&&delayTime!="undefined"){
    		$("#equipTiggerTime").val(delayTime);
    	}
    	if(linkageEquip!=" "&&linkageEquip!="undefined"){
    		$("#equipTigger_Link").val(linkageEquip);
    	}
    	if(linkageOpt!=" "&&linkageOpt!="undefined"){
    		$("#equipTiggerCom").val(linkageOpt);
    	}
    	if(remarks!=" "&&remarks!="undefined"){console.log(remarks)
    		$("#equipTiggerInfo").val(remarks);
    	}
    }
    
    $("#equipLinkageModifyId").unbind('click').bind('click',function(){
    	$("#equipLinkageModifyId").attr("dataID",index)
    	addLinkage(this,'+index+');
    });
}
