function storeValues(){
	setCookie("field1", $('#hostname').val());
	setCookie("field2", $('#port').val());
	setCookie("field3", $('#qos').val());
	setCookie("field4", $('#userName').val());
	setCookie("field5", $('#password').val());
	setCookie("field6", $('#keepAliveInterval').val());
	setCookie("field7", $('#timeout').val());
	setCookie("field8", $('#useSSL').val());
	setCookie("field9", $('#cleanSession').val());
	setCookie("field10",$('#topic').val());
	return true;
}
function setCookie(name, value){
	$.cookie(name,value,{expires: 30});
}
function loadCookieValues(){
	if(field1 = $.cookie("field1")) $('#hostname').val(field1);
	if(field2 = $.cookie("field2")) $('#port').val(field2);
	if(field3 = $.cookie("field3")) $('#qos').val(field3);
	if(field4 = $.cookie("field4")) $('#userName').val(field4);
	if(field5 = $.cookie("field5")) $('#password').val(field5);
	if(field6 = $.cookie("field6")) $('#keepAliveInterval').val(field6);
	if(field7 = $.cookie("field7")) $('#timeout').val(field7);
	if(field8 = $.cookie("field8")) $('#useSSL').val(field8);
	if(field9 = $.cookie("field9")) $('#cleanSession').val(field9);
	if(field10= $.cookie("field10"))$('#topic').val(field10);
}
function clearCookies(){
	deleteCookie("field1");
	deleteCookie("field2");
	deleteCookie("field3"); 
	deleteCookie("field4");
	deleteCookie("field5");
	deleteCookie("field6");
	deleteCookie("field7");
	deleteCookie("field8");
	deleteCookie("field9");
	deleteCookie("field10");
}
function deleteCookie(name){
	$.cookie(name, "",{expires: -1});
}