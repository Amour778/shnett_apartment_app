(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/bind/bind"],{"061f":function(e,t,r){"use strict";(function(e){var n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=r("4694"),a={data:function(){return{lsDisabled:!1,UserInfoArray:{user_id:"",user_name:"",user_cardid:"",user_tel:"",user_point:"",date_entry:"",user_sex:"",user_type:"",user_wechat_apartment:"",user_main:""},SubmitButtonDisabled:this.SubmitButtonDisabled,modalName:null,selectApartmentBtnText:"无数据",networkList:[]}},onLoad:function(e){n=this,n.UserInfoArray.user_wechat_apartment=e.openid},mounted:function(){n=this;var t=new Date,r="-",s=t.getFullYear(),a=t.getMonth()+1,o=t.getDate();a>=1&&a<=9&&(a="0"+a),o>=0&&o<=9&&(o="0"+o),n.UserInfoArray.date_entry=s+r+a+r+o;var u={url:"queryAllNetworkInfo",setUpUrl:!0,type:"get",sCallback:function(t){1==t.code?e.showToast({title:"获取网点数据异常",icon:"none"}):0==t.data.length?e.showToast({title:"网点数据为空",icon:"none"}):(n.selectApartmentBtnText="选择网点",n.selectApartmentBtnDisabled=!1,n.networkList=t.data)}};n.$base.request(u,n)},methods:{formSubmitBind:function(t){var r=[{name:"user_id",checkType:"string",checkRule:"6,12",errorMsg:"工号应为6-12个字符"},{name:"user_name",checkType:"string",checkRule:"2,10",errorMsg:"姓名应为2-10个字符"},{name:"user_cardid",checkType:"string",checkRule:"18",errorMsg:"请输入18位身份证号码"},{name:"user_tel",checkType:"phoneno",checkRule:"",errorMsg:"请输入11位手机号码"},{name:"user_point",checkType:"notnull",checkRule:"",errorMsg:"所属网点不可为空"},{name:"user_sex",checkType:"in",checkRule:"0,1",errorMsg:"请选择性别"},{name:"user_type",checkType:"in",checkRule:"0,1,2",errorMsg:"请选择新工类型"}],a=t.detail.value;console.log(a.user_id);var o=s.check(a,r);if(o){var u={url:"bindUserInfoByUserInputs",setUpUrl:!0,data:{date_entry:a.date_entry,user_cardid:a.user_cardid,user_id:a.user_id,user_main:a.user_main,user_name:a.user_name,user_point:a.user_point,user_sex:a.user_sex,user_tel:a.user_tel,user_type:a.user_type,user_wechat_apartment:a.user_wechat_apartment},type:"get",sCallback:function(t){console.log(t),console.log(t.message),0==t.code?e.redirectTo({url:"/pages/login/login",success:function(){e.showToast({title:t.message,icon:"none"})}}):e.showToast({title:t.messsage,icon:"none"})}};n.$base.request(u,n)}else e.showToast({title:s.error,icon:"none"})},getTempUserId:function(){var t={url:"getTemporaryGenerationUserId",setUpUrl:!0,type:"post",sCallback:function(t){console.log(t),0==t.code?(n.UserInfoArray.user_id=t.message,n.lsDisabled=!0):e.showToast({title:"获取临时工号异常",icon:"none"})},eCallback:function(){}};n.$base.request(t,n)},SetUserSex:function(e){n.UserInfoArray.user_sex=e.detail.value},SetUserType:function(e){n.UserInfoArray.user_type=e.detail.value},DateEntryChange:function(e){n.UserInfoArray.date_entry=e.detail.value},showModal:function(e){this.modalName=e.currentTarget.dataset.target},hideModal:function(e){this.modalName=null},searchIcon:function(e){for(var t=e.detail.value.toLowerCase(),r=n.networkList,s=0;s<r.length;s++){var a=t,o=r[s].apa_name.toLowerCase();-1!=o.search(a)?r[s].isShow=!0:r[s].isShow=!1}n.networkList=r},clickItem:function(e,t){n.UserInfoArray.user_main=t.split("-")[0],n.UserInfoArray.user_point=t.split("-")[1],n.hideModal()}}};t.default=a}).call(this,r("543d")["default"])},7634:function(e,t,r){"use strict";r.r(t);var n=r("e24d"),s=r("bd98");for(var a in s)"default"!==a&&function(e){r.d(t,e,function(){return s[e]})}(a);r("8e24");var o=r("2877"),u=Object(o["a"])(s["default"],n["a"],n["b"],!1,null,null,null);t["default"]=u.exports},"8e24":function(e,t,r){"use strict";var n=r("eed9"),s=r.n(n);s.a},bd98:function(e,t,r){"use strict";r.r(t);var n=r("061f"),s=r.n(n);for(var a in n)"default"!==a&&function(e){r.d(t,e,function(){return n[e]})}(a);t["default"]=s.a},e24d:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},s=[];r.d(t,"a",function(){return n}),r.d(t,"b",function(){return s})},eed9:function(e,t,r){}},[["6517","common/runtime","common/vendor"]]]);