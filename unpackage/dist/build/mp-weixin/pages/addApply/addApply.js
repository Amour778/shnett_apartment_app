(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/addApply/addApply"],{"02f2":function(e,t,n){},"3d0e":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return o})},"5ebb":function(e,t,n){"use strict";(function(e){var a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=e.getStorageSync("USERID");console.log("USERID="+o);var c=n("4694"),i={data:function(){return{AddApplyInfo:{user_id:"",user_intention:"",check_in_type:"",in_reason:"",date_check_in:"",date_move_out:"",apply_type:0},subscribeText:"点击授权订阅",subscribeDisabled:!1,apa_name:"",modalName:null,apartmentList:[],selectApartmentBtnDisabled:!0,selectApartmentBtnText:"无数据",SubmitButtonDisabled:this.SubmitButtonDisabled}},onLoad:function(){},mounted:function(){a=this;var t=e.getStorageSync("USERID");a.AddApplyInfo.user_id=t;var n=new Date,o="-",c=n.getFullYear(),i=n.getMonth()+1,s=n.getDate();i>=1&&i<=9&&(i="0"+i),s>=0&&s<=9&&(s="0"+s),a.AddApplyInfo.date_check_in=c+o+i+o+s,a.AddApplyInfo.date_move_out=a.AddApplyInfo.date_check_in;var r={url:"checkUserIsHaveAApplyNotAdopt",setUpUrl:!0,type:"get",data:{user_id:t},sCallback:function(t){if(console.log(t),1==t.code)e.showModal({content:"获取已提交但未审批的申请数据异常",confirmText:"确定",showCancel:!1,success:function(t){t.confirm&&e.navigateBack({delta:1})}});else if(0==t.code&&0!=t.info)return void e.showModal({content:"存在未审批的请求("+t.info+")，请等待审批结束",confirmText:"确定",showCancel:!1,success:function(t){t.confirm&&e.navigateBack({delta:1})}})}};a.$base.request(r,a);r={url:"queryAllApartmentInfoForList",setUpUrl:!0,type:"get",sCallback:function(t){1==t.code?e.showToast({title:"获取公寓数据异常",icon:"none"}):0==t.data.length?e.showToast({title:"公寓数据为空",icon:"none"}):(a.selectApartmentBtnText="选择公寓",a.selectApartmentBtnDisabled=!1,a.apartmentList=t.data)}};a.$base.request(r,a)},methods:{subscribe:function(e){wx.requestSubscribeMessage({tmplIds:["JS2pyrbT1miKHnSfHbLwtha0GbioKnqtkA2cJ-ksEf4"],success:function(e){for(var t in e)"JS2pyrbT1miKHnSfHbLwtha0GbioKnqtkA2cJ-ksEf4"==t&&(console.log("ever:"+t+",res:"+e[t]),"accept"==e[t]&&(a.subscribeText="已订阅本次推送",a.subscribeDisabled="disabled")),0}})},formSubmitToAddApply:function(t){var n=[{name:"user_id",checkType:"string",checkRule:"6,12",errorMsg:"工号应为6-12个字符"},{name:"in_reason",checkType:"notnull",checkRule:"",errorMsg:"入住事由不可为空"},{name:"date_check_in",checkType:"notnull",checkRule:"",errorMsg:"入住日期不可为空"},{name:"date_move_out",checkType:"notnull",checkRule:"",errorMsg:"结束日期不可为空"},{name:"check_in_type",checkType:"in",checkRule:"0,1",errorMsg:"请选择住宿类型"},{name:"user_intention",checkType:"notnull",checkRule:"",errorMsg:"请选择公寓意向"}],o=t.detail.value,i=c.check(o,n);if(i){var s={url:"addApplyInfoToIn",setUpUrl:!0,type:"get",data:{user_id:o.user_id,user_intention:o.user_intention,check_in_type:o.check_in_type,in_reason:o.in_reason,date_check_in:o.date_check_in,date_move_out:o.date_move_out,apply_type:o.apply_type},sCallback:function(t){console.log(t),1==t.code?e.showToast({title:t.message,icon:"none"}):e.redirectTo({url:"../main/main",success:function(){e.showToast({title:t.message,icon:"none"})}})}};a.$base.request(s,a)}else e.showToast({title:c.error,icon:"none"})},SetCheckInType:function(e){a.AddApplyInfo.check_in_type=e.detail.value},showTheApartmentData:function(e){if(console.log(e),a.AddApplyInfo.user_intention="",e.value){var t=[];a.apartmentList.forEach(function(n){n.apa_name.indexOf(e.value)>-1&&t.push(n)}),e.callback(t)}else e.callback(a.apartmentList)},selectedTheApartmentData:function(e){a.AddApplyInfo.user_intention=e.apa_id},DateCheckIn:function(e){a.AddApplyInfo.date_check_in=e.detail.value},DateExpireChange:function(e){a.AddApplyInfo.date_move_out=e.detail.value},showModal:function(e){this.modalName=e.currentTarget.dataset.target},hideModal:function(e){this.modalName=null},searchIcon:function(e){for(var t=e.detail.value.toLowerCase(),n=a.apartmentList,o=0;o<n.length;o++){var c=t,i=n[o].apa_name.toLowerCase();-1!=i.search(c)?n[o].isShow=!0:n[o].isShow=!1}a.apartmentList=n},clickItem:function(e,t){a.apa_name=e,a.AddApplyInfo.user_intention=t,a.hideModal()}}};t.default=i}).call(this,n("543d")["default"])},c2ae:function(e,t,n){"use strict";n.r(t);var a=n("3d0e"),o=n("c9bf");for(var c in o)"default"!==c&&function(e){n.d(t,e,function(){return o[e]})}(c);n("c8f2");var i=n("2877"),s=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,null,null);t["default"]=s.exports},c8f2:function(e,t,n){"use strict";var a=n("02f2"),o=n.n(a);o.a},c9bf:function(e,t,n){"use strict";n.r(t);var a=n("5ebb"),o=n.n(a);for(var c in a)"default"!==c&&function(e){n.d(t,e,function(){return a[e]})}(c);t["default"]=o.a}},[["bffc","common/runtime","common/vendor"]]]);