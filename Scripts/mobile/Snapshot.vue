<template>
	<div class="snapashot">
		<div class="common-tab">
			<Tabs type="card" @on-click="updateCardInfo" :animated="false" v-model="tabPaneValue">
				<template v-for="(itemTab,indexTab) of btnInfo">
					<TabPane :label="itemTab.btnCount" extra="itemTab.ID" :name="itemTab.btnValue" icon="android-cancel" :class="{active : itemTab.isActive}" v-if="itemTab.btnStatus" :key="itemTab.spanId">
						<div class="common-table">
							<table>
								<thead>
									<tr>
										<th @click="setTableSortFunc(0)">类型
											<i v-if="tableSortType==0" v-show="tableSortDirection[0]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="tableSortType==0" v-show="tableSortDirection[0]==1" class="iconfont icon-triangle-top"></i></th>
										<th @click="setTableSortFunc(1)">时间
											<i v-if="tableSortType==1" v-show="tableSortDirection[1]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="tableSortType==1" v-show="tableSortDirection[1]==1" class="iconfont icon-triangle-top"></i></th>
										</th>
										<th @click="setTableSortFunc(2)">事件
											<i v-if="tableSortType==2" v-show="tableSortDirection[2]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="tableSortType==2" v-show="tableSortDirection[2]==1" class="iconfont icon-triangle-top"></i></th>
										</th>
										<th @click="setTableSortFunc(3)">确认
											<i v-if="tableSortType==3" v-show="tableSortDirection[3]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="tableSortType==3" v-show="tableSortDirection[3]==1" class="iconfont icon-triangle-top"></i></th>
										</th>
										<th @click="setTableSortFunc(4)">处理意见
											<i v-if="tableSortType==4" v-show="tableSortDirection[4]==0" class="iconfont icon-triangle-bottom"></i>
											<i v-if="tableSortType==4" v-show="tableSortDirection[4]==1" class="iconfont icon-triangle-top"></i></th>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,index) of tableInfo" :key="index">
										<td>
											<img v-if="item.Level=='故障'" src="@assets/img/infor/Errors.png" alt="" style="vertical-align: middle;" />
											<img v-if="item.Level=='警告'" src="@assets/img/infor/Warnings.png" alt="" style="vertical-align: middle;" />
											<img v-if="item.Level=='信息'" src="@assets/img/infor/Informations.png" alt="" style="vertical-align: middle;" />
											<img v-if="item.Level=='设置'" src="@assets/img/infor/Settings.png" alt="" style="vertical-align: middle;" />
											<img v-if="item.Level=='资产'" src="@assets/img/infor/Assets.png" alt="" style="vertical-align: middle;" /> {{item.Level}}
										</td>
										<td>{{item.formatTime}}</td>
										<td>
											<p :title="item.EventMsg">{{item.EventMsg}}</p>
										</td>
										<td><button @click="showModalFun(item.EventMsg,item.Time)" v-show="!item.bConfirmed">请确认</button>
											<i v-show="item.bConfirmed" class="iconfont icon-ok"></i></td>
										<td>{{item.Proc_advice_Msg}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</TabPane>
				</template>
			</Tabs>
		</div>

		<Modal v-model="sureModal" title="确认处理该事件吗？" @on-ok="sureModalFun" @on-cancel="cancel" class="modalAlert">
			<h1 v-model="EventMsg" :title="EventMsg">事件：<span>{{EventMsg}}</span></h1>
			<input type="hidden" v-model="Time" />
			<p>请输入处理意见（100字以内）：</p>
			<Input type="textarea" :rows="4" v-model="msgValue"></Input>
			<Checkbox label="是" style="margin: 10px 0;" v-model="isSendSms">是否发送短信？</Checkbox>
			<CheckboxGroup class="groupCheck" v-show="isSendSms" v-model="atorMobiles">
				<Checkbox v-for="(item,index) of atorMsgInfo" :key="index" class="groupCheckChild" :label="item.allInfo">{{item.MobileTel}}({{item.Administrator}})</Checkbox>
			</CheckboxGroup>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				btnInfo: [],
				tableInfo: [],
				atorMsgInfo: [],
				event_Level_list: '',
				msgValue: '',
				sureModal: false,
				isSendSms: false,
				atorMobiles: [],
				EventMsg: '',
				Time: '',
				tabPaneValue: '-1',
				timeInterval: null,
				tableSortType: 0,
				tableSortDirection: [0,0,0,0,0]
			}
		},
		mounted() {
			this.getAlarmConfig()
		},
		methods: {
			updateCardInfo() {
				this.getRealTimeEvent();
			},
			getIMG(level) {
				var url = "";
				if(level == "故障") {
					url = "./static/infor/Warnings.png";
				} else if(level == "警告") {
					url = "./static/infor/Warnings.png";
				} else if(level == "信息") {
					url = "./static/infor/Informations.png";
				} else if(level == "设置") {
					url = "./static/infor/Settings.png";
				} else if(level == "资产") {
					url = "./static/infor/Assets.png";
				}
				return url;
			},
			//设置表格排序
			setTableSortFunc(num) {
				let tableSortType = this.tableSortType= num;
				this.tableInfo.sort(this.tableSort);
				if(this.tableSortDirection[tableSortType]==0){
					this.tableSortDirection.splice(tableSortType,1,1)
				}else{
					this.tableSortDirection.splice(tableSortType,1,0)
				}
			},
			tableSort: function(a, b) {
				let tableSortType = this.tableSortType;
				let tableSortDirection = this.tableSortDirection;
				if(tableSortDirection[tableSortType] == 0) {
					if(tableSortType == "0") {
						return a.Level.localeCompare(b.Level);
					} else if(tableSortType == "1") {
						return a.Time.localeCompare(b.Time);
					} else if(tableSortType == "2") {
						return a.EventMsg.localeCompare(b.EventMsg);
					} else if(tableSortType == "3") {
						return a.bConfirmed-b.bConfirmed;
					} else if(tableSortType == "4") {
						return a.Proc_advice_Msg-b.Proc_advice_Msg;
					} else {
						return a.Level.localeCompare(b.Level);
					}
				} else {
					if(tableSortType == "0") {
						return b.Level.localeCompare(a.Level);
					} else if(tableSortType == "1") {
						return b.Time.localeCompare(a.Time);
					} else if(tableSortType == "2") {
						return b.EventMsg.localeCompare(a.EventMsg);
					} else if(tableSortType == "3") {
						return b.bConfirmed-a.bConfirmed;
					} else if(tableSortType == "4") {
						return b.Proc_advice_Msg-a.Proc_advice_Msg;
					} else {
						return b.Level.localeCompare(a.Level);
					}
				}
				
			},
			//获取事件的报警配置
			getAlarmConfig() {
				this.Axios.post('/api/event/alarm_config')
					.then(res => {
						let data = res.data.HttpData;
						if(data.code == 200) {
							let resultData = data.data;
							let listAddData = [{
								spanId: -1,
								spanName: "全部",
								btnStatus: true,
								btnValue: "-1",
								btnCount: "",
								isActive: true
							}];
							for(var i = 0; i < resultData.length; i++) {
								var btnStatus = resultData[i].IsShow == 1 ? true : false;
								var btnValue = [];
								for(var j = resultData[i].SnapshotLevelMin; j <= resultData[i].SnapshotLevelMax; j++) {
									btnValue += j + ",";
								}
								this.event_Level_list += btnValue;
								btnValue = btnValue.substring(0, btnValue.length - 1);
								listAddData.push({
									spanId: resultData[i].ID,
									spanName: resultData[i].SnapshotName,
									btnStatus: btnStatus,
									btnValue: btnValue,
									btnCount: "",
									isActive: false
								});
							}
							this.event_Level_list = this.event_Level_list.substring(0, this.event_Level_list.length - 1);
							this.btnInfo = listAddData;
							this.getRealTimeEventCount();
							this.timeInterval=setInterval(this.getRealTimeEventCount, 5000);
						}
					}).catch(err => {
						console.log(err)
					})
			},
			//获取当前实时报警事件的总数
			getRealTimeEventCount() {
				let btnInfoLevels = "";
				for(let i = 0; i < this.btnInfo.length; i++) {
					if(this.btnInfo[i].btnValue != "-1") {
						btnInfoLevels += this.btnInfo[i].btnValue + ";"
					}
				}
				btnInfoLevels = btnInfoLevels.substring(0, btnInfoLevels.length - 1);
				this.Axios.post('/api/event/real_evt_count', {
					levels: btnInfoLevels
				}).then(res => {
					let data = res.data.HttpData;
					if(data.code == 200) {
						this.getRealTimeEvent();
						let resultData = data.data;
						let resultDataArr = resultData.toString().split(",");
						let sumValue = 0;
						for(let i = 0; i < resultDataArr.length; i++) {
							this.btnInfo[i + 1].btnCount = this.btnInfo[i + 1].spanName + " " + resultDataArr[i];
							sumValue += parseInt(resultDataArr[i]);
						}
						this.btnInfo[0].btnCount = this.btnInfo[0].spanName + " " + sumValue;
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//获取当前系统报警的实时事件
			getRealTimeEvent() {
				var tabPaneValue = this.tabPaneValue;
				var levels = "";
				if(tabPaneValue == "-1") {
					levels = this.event_Level_list;
				} else {
					levels = tabPaneValue;
				}
				this.Axios.post('/api/event/real_evt', {
					levels: levels
				}).then(res => {
					let data = res.data.HttpData;
					if(data.code == 200) {
						let resultData = data.data;
						let tableListData = [];
						for(var i = 0; i < resultData.length; i++) {
							var strLevel = "";
							var btnInfo = this.btnInfo;
							for(var j = 0; j < btnInfo.length; j++) {
								var btnInfoArr = btnInfo[j].btnValue.split(",");
								for(var m = 0; m < btnInfoArr.length; m++) {
									if(btnInfoArr[m] == resultData[i].Level) {
										strLevel = btnInfo[j].spanName;
										break;
									}
								}
							}
							tableListData.push({
								EventMsg: resultData[i].EventMsg,
								Proc_advice_Msg: resultData[i].Proc_advice_Msg,
								Time: resultData[i].Time.replace("T", " "),
								formatTime: this.formatDate(resultData[i].Time),
								Level: strLevel,
								bConfirmed: resultData[i].bConfirmed,
								Equipno: resultData[i].Equipno,
								Ycyxno: resultData[i].Ycyxno
							});
						}
						this.tableInfo = tableListData;
						this.atorMsgDataFun();
					}
				}).catch(err => {
					console.log(err)
				})
			},
			atorMsgDataFun() {
				this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
					TableName: "Administrator"
				}).then(res => {
					let data = res.data.HttpData;
					if(data.code == 200) {
						let resultData = data.data;
						let atorMsgInfoData = [];
						for(var i = 0; i < resultData.length; i++) {
							atorMsgInfoData.push({
								Administrator: resultData[i].Administrator,
								MobileTel: resultData[i].MobileTel,
								allInfo: resultData[i].Administrator + "&&" + resultData[i].MobileTel
							});
						}
						this.atorMsgInfo = atorMsgInfoData;
					}
				}).catch(err => {
					console.log(err)
				})
			},
			showModalFun(EventMsg, Time) {
				this.EventMsg = EventMsg;
				this.Time = Time;
				this.msgValue = "";
				this.isSendSms = false;
				this.atorMobiles = [];
				this.sureModal = true;
			},
			sureModalFun() {
				let atorMobiles = this.atorMobiles;
				let atorMobilesArr = [];
				for(let i = 0; i < atorMobiles.length; i++) {
					if(atorMobiles[i] != "" && atorMobiles[i] != null) {
						atorMobilesArr.push(atorMobiles[i].split("&&")[1]);
					}

				}
				let Time = this.Time;
				let TimeArr = [];
				let strTimeArr = "";
				if(Time != "" && Time != null) {
					TimeArr = Time.split(".");
					strTimeArr = TimeArr[1].toString();
					if(strTimeArr.length >= 6) {
						strTimeArr = strTimeArr.substring(0, 6)
					} else {
						strTimeArr = strTimeArr + "000000".substring(0, 6 - strTimeArr.length)
					}
				}

				this.Axios.post('/api/event/confirm_evt', {
					msg: this.msgValue,
					shortmsg: this.isSendSms,
					tel: atorMobilesArr.toString(),
					evtname: this.EventMsg,
					time: TimeArr[0] + "." + strTimeArr,
					userName: this.$store.state.loginMsg
				}).then(res => {
					let data = res.data.HttpData;
					if(data.code == 200) {
						let resultData = data.data;
						this.getRealTimeEvent();
						this.cancel();
						this.$Message.success("操作成功");
					} else {
						this.$Message.error("操作失败");
					}
				}).catch(err => {
					console.log(err)
				})
			},
			formatDate(time) {
				var newTime = time.replace("T", " ")
				return newTime.substring(0, 19);
			},
			ok() {

			},
			cancel() {

			}
		},
		beforeDestroy() {
			if(this.timeInterval) { //如果定时器还在运行 或者直接关闭，不用判断
				clearInterval(this.timeInterval); //关闭
			}
		}
	}
</script>

<style lang="css" src="@assets/styles/timetask.css"></style>