(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/applyCheckOutInfo/applyCheckOutInfo"],{"127e":function(n,e,o){"use strict";o.r(e);var a=o("541e"),t=o("dfde");for(var l in t)"default"!==l&&function(n){o.d(e,n,function(){return t[n]})}(l);o("e4fe");var p=o("2877"),s=Object(p["a"])(t["default"],a["a"],a["b"],!1,null,null,null);e["default"]=s.exports},"541e":function(n,e,o){"use strict";var a=function(){var n=this,e=n.$createElement;n._self._c},t=[];o.d(e,"a",function(){return a}),o.d(e,"b",function(){return t})},d110:function(n,e,o){},dfde:function(n,e,o){"use strict";o.r(e);var a=o("f760"),t=o.n(a);for(var l in a)"default"!==l&&function(n){o.d(e,n,function(){return a[n]})}(l);e["default"]=t.a},e4fe:function(n,e,o){"use strict";var a=o("d110"),t=o.n(a);t.a},f760:function(n,e,o){"use strict";(function(n){var o,a;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{ApplyInfo:{user_id:"",user_name:"",user_tel:"",user_point:"",user_sex:"",user_type:"",id:"",apa_name:"",roo_name:"",bed_name:"",date_move_out:"",out_reason:"",sta:"",apply_remarks:""},staIsOne:!1,showRemarks:!1}},mounted:function(){o=this},onLoad:function(e){o=this,o.applyInfoId=e.id,a=e.apply_type;e.sta;null!=o.applyInfoId&&""!=o.applyInfoId&&"undefined"!=typeof o.applyInfoId?o.getApplyInfoById():n.showModal({content:"获取申请流程的ID异常",confirmText:"确定",showCancel:!1,success:function(e){e.confirm&&n.navigateBack({delta:1})}})},methods:{navigatorToApproval:function(){n.navigateTo({url:"../approval/approval?id="+o.applyInfoId+"&date_check_in="+o.ApplyInfo.date_check_in+"&date_move_out="+o.ApplyInfo.date_move_out})},agree:function(e){var a={url:"applicationForExaminationAndApprovalByApplyIdToCheckout",setUpUrl:!0,type:"get",data:{id:o.ApplyInfo.id,user_id:o.ApplyInfo.user_id,bed_id:o.ApplyInfo.bed_id,sta:1,apply_remarks:null},sCallback:function(e){1==e.code?n.showToast({title:e.message,icon:"none"}):0==e.code?n.navigateBack({delta:1,success:function(){n.showToast({title:e.message,icon:"none"})}}):n.showToast({title:"返回的数据异常",icon:"none"})}};o.$base.request(a,o)},reject:function(e){if(o.showRemarks=!0,""==o.ApplyInfo.apply_remarks||null==o.ApplyInfo.apply_remarks||"null"==o.ApplyInfo.apply_remarks)n.showToast({title:"请输入驳回备注",icon:"none"});else{var a={url:"applicationForExaminationAndApprovalByApplyIdToCheckout",setUpUrl:!0,type:"get",data:{id:o.ApplyInfo.id,sta:2,apply_remarks:o.ApplyInfo.apply_remarks},sCallback:function(e){1==e.code?n.showToast({title:e.message,icon:"none"}):0==e.code?n.navigateBack({delta:1,success:function(){n.showToast({title:e.message,icon:"none"})}}):n.showToast({title:"返回的数据异常",icon:"none"})}};o.$base.request(a,o)}},getApplyInfoById:function(){var e={url:"queryApplyInfoById",setUpUrl:!0,type:"get",data:{id:o.applyInfoId,apply_type:a},sCallback:function(e){if(console.log(e),1==e.code)n.showModal({content:"获取数据ID异常:"+e.info,confirmText:"确定",showCancel:!1,success:function(e){e.confirm&&n.navigateBack({delta:1})}});else{if(0==e.count)return void n.showModal({content:"获取数据ID异常",confirmText:"确定",showCancel:!1,success:function(e){e.confirm&&n.navigateBack({delta:1})}});o.ApplyInfo=e.info[0],o.temp_admin_arrange=o.ApplyInfo.admin_arrange.split("_")[1],o.ApplyInfo.admin_arrange=o.ApplyInfo.admin_arrange.split("_")[0];var a=n.getStorageSync("USERROLE");console.log("USERROLE",a),1==a?0==o.ApplyInfo.sta&&(o.staIsOne=!0):1==o.ApplyInfo.sta&&(o.staIsOne=!1)}}};o.$base.request(e,o)}},onPullDownRefresh:function(){o.getApplyInfoById()}};e.default=t}).call(this,o("543d")["default"])}},[["978e","common/runtime","common/vendor"]]]);