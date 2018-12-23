function eventSearch() {
	switchToolbar("configTool");

	var calendarModal = myApp.calendar.create({
		inputEl: '#eventSearchTimeId',
		openIn: 'customModal',
		toolbarCloseText: "确定",
		footer: true,
		dateFormat: 'yyyy/mm/dd',
		monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
		dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
		rangePicker: true
	});
	
	//设备选择
	var pickerModel = myApp.picker.create({
		inputEl: '#eventSearchEquipId',
		rotateEffect: true,
		renderToolbar: function() {
			return '<div class="toolbar">' +
				'<div class="toolbar-inner">' +
				'<div class="left">' +
				'<a href="#" class="link sheet-close popover-close">取消</a>' +
				'</div>' +
				'<div class="center">' +
				'<a href="#" class="link toolbar-randomize-link">选择设备</a>' +
				'</div>' +
				'<div class="right">' +
				'<a href="#" class="link sheet-close popover-close">确定</a>' +
				'</div>' +
				'</div>' +
				'</div>';
		},
		cols: [{
			textAlign: 'center',
			values: ['高速模式', '低速模式']
		}],
		on: {
			change: function(picker, values, displayValues) {
				$("#eventSearchEquipId").html(values);
			},
		}
	});
	
	//事件类型选择
	var pickerModel = myApp.picker.create({
		inputEl: '#eventSearchTypeId',
		rotateEffect: true,
		renderToolbar: function() {
			return '<div class="toolbar">' +
				'<div class="toolbar-inner">' +
				'<div class="left">' +
				'<a href="#" class="link sheet-close popover-close">取消</a>' +
				'</div>' +
				'<div class="center">' +
				'<a href="#" class="link toolbar-randomize-link">选择设备</a>' +
				'</div>' +
				'<div class="right">' +
				'<a href="#" class="link sheet-close popover-close">确定</a>' +
				'</div>' +
				'</div>' +
				'</div>';
		},
		cols: [{
			textAlign: 'center',
			values: ['全部', '设备事件', '设置事件', '系统事件']
		}],
		on: {
			change: function(picker, values, displayValues) {
				$("#eventSearchTypeId").html(values);
			},
		}
	});

}