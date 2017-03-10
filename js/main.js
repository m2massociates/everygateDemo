var marker;
var topic;
var client;
var connected = false;
var map;
var ambientLight;
var temperature;
var rpm;
var fuel;
var pedal;
var pressure;
var now = new Date();
var g_dev_id_1 = '';
var g_dev_id_2 = '';
var g_dev_id_3 = '';
var g_dev_id_4 = '';
var g_dev_id_5 = '';
var w = false;
$(document).ready(function(){
	loadCookieValues();
	$("form").submit(function(e){
        e.preventDefault();
		connect();
    });
	ambientLight = AmCharts.makeChart("chartdiv-1",{
		"type"	: "gauge",
		"theme"	: "light",
		"axes"	: [{
			"axisThickness"	: 1,
			"axisAlpha"		: 0.2,
			"tickAlpha"		: 0.2,
			"valueInterval"	: 20,
			"bands": [{
				"color"			: "#000000",
				"innerRadius"	: "95%",
				"startValue"	: 0,
				"endValue"		: 20,
			}, {
				"color"			: "#fdd400",
				"innerRadius"	: "95%",
				"startValue"	: 20,
				"endValue"		: 180,
			}, {
				"color"			: "#cc4748",
				"innerRadius"	: "95%",
				"startValue"	: 180,
				"endValue"		: 200,
			} ],
			"bottomText"		: "0 lux",
			"bottomTextYOffset"	: -20,
			"startValue"		: 0,
			"endValue"			: 200
		} ],
		"arrows": [{}],
	});
	temperature = AmCharts.makeChart("chartdiv-2",{
		"type"	: "gauge",
		"theme"	: "light",
		"axes"	: [{
			"axisThickness"	: 1,
			"axisAlpha"		: 0.2,
			"tickAlpha"		: 0.2,
			"valueInterval"	: 5,
			"bands": [{
				"color"			: "#006cc7",
				"innerRadius"	: "95%",
				"startValue"	: -5,
				"endValue"		: 5,
			}, {
				"color"			: "#84b761",
				"innerRadius"	: "95%",
				"startValue"	: 5,
				"endValue"		: 30,
			}, {
				"color"			: "#cc4748",
				"innerRadius"	: "95%",
				"startValue"	: 30,
				"endValue"		: 40,
			} ],
			"bottomText"		: "0 C",
			"bottomTextYOffset"	: -20,
			"startValue"		: -5,
			"endValue"			: 40
		} ],
		"arrows": [{}],
	});
	rpm = AmCharts.makeChart("chartdiv-3",{
		"type"	: "gauge",
		"theme"	: "light",
		"axes"	: [{
			"axisThickness"	: 1,
			"axisAlpha"		: 0.2,
			"tickAlpha"		: 0.2,
			"valueInterval"	: 2000,
			"bands": [{
				"color"			: "#006cc7",
				"innerRadius"	: "95%",
				"startValue"	: 0,
				"endValue"		: 2000,
			}, {
				"color"			: "#84b761",
				"innerRadius"	: "95%",
				"startValue"	: 2000,
				"endValue"		: 8000,
			}, {
				"color"			: "#cc4748",
				"innerRadius"	: "95%",
				"startValue"	: 8000,
				"endValue"		: 10000,
			} ],
			"bottomText"		: "0 RPM",
			"bottomTextYOffset"	: -20,
			"startValue"		: 0,
			"endValue"			: 10000
		} ],
		"arrows": [{}],
	});
	fuel = AmCharts.makeChart("chartdiv-4",{
		"type"	: "gauge",
		"theme"	: "light",
		"axes"	: [{
			"axisThickness"	: 1,
			"axisAlpha"		: 0.2,
			"tickAlpha"		: 0.2,
			"valueInterval"	: 100,
			"bands": [{
				"color"			: "#006cc7",
				"innerRadius"	: "95%",
				"startValue"	: 0,
				"endValue"		: 200,
			}, {
				"color"			: "#84b761",
				"innerRadius"	: "95%",
				"startValue"	: 200,
				"endValue"		: 800,
			}, {
				"color"			: "#cc4748",
				"innerRadius"	: "95%",
				"startValue"	: 800,
				"endValue"		: 1000,
			} ],
			"bottomText"		: "0 Lt",
			"bottomTextYOffset"	: -20,
			"startValue"		: 0,
			"endValue"			: 1000
		} ],
		"arrows": [{}],
	});
	pedal = AmCharts.makeChart("chartdiv-5",{
		"type"	: "gauge",
		"theme"	: "light",
		"axes"	: [{
			"axisThickness"	: 1,
			"axisAlpha"		: 0.2,
			"tickAlpha"		: 0.2,
			"valueInterval"	: 10,
			"bands": [{
				"color"			: "#006cc7",
				"innerRadius"	: "95%",
				"startValue"	: 0,
				"endValue"		: 20,
			}, {
				"color"			: "#84b761",
				"innerRadius"	: "95%",
				"startValue"	: 20,
				"endValue"		: 80,
			}, {
				"color"			: "#cc4748",
				"innerRadius"	: "95%",
				"startValue"	: 80,
				"endValue"		: 100,
			} ],
			"bottomText"		: "0 %",
			"bottomTextYOffset"	: -20,
			"startValue"		: 0,
			"endValue"			: 100
		} ],
		"arrows": [{}],
	});
	pressure = AmCharts.makeChart("chartdiv-6",{
		"type"	: "gauge",
		"theme"	: "light",
		"axes"	: [{
			"axisThickness"	: 1,
			"axisAlpha"		: 0.2,
			"tickAlpha"		: 0.2,
			"valueInterval"	: 0.2,
			"bands": [{
				"color"			: "#FE9A2E",
				"innerRadius"	: "95%",
				"startValue"	: 0,
				"endValue"		: 0.4,
			}, {
				"color"			: "#A4A4A4",
				"innerRadius"	: "95%",
				"startValue"	: 0.4,
				"endValue"		: 1.6,
			}, {
				"color"			: "#8A0808",
				"innerRadius"	: "95%",
				"startValue"	: 1.6,
				"endValue"		: 2,
			} ],
			"bottomText"		: "0 ATM",
			"bottomTextYOffset"	: -20,
			"startValue"		: 0,
			"endValue"			: 2
		} ],
		"arrows": [{}],
	});
	$("._estimote_telemetry_json").click(function(){
		$(':checkbox[name=domainList]').prop('checked', this.checked);
	})
})
function connect(){
	if($('#remeber').is(":checked")){storeValues();}
	if(connected == true)return;
	client = new Messaging.Client($("#hostname").val(), parseInt($("#port").val()), "myclientid_" + parseInt(Math.random() * 100, 10));
	var options = {
		timeout				: parseInt($("#timeout").val()),
		userName			: $("#userName").val(),
		password			: $("#password").val(),
		keepAliveInterval	: parseInt($("#keepAliveInterval").val()),
		cleanSession		: $("#cleanSession").val() == "true" ? true : false,
		useSSL				: $("#useSSL").val() == "true" ? true : false,
		onSuccess			: function (){
			/* Gets Called if the connection has sucessfully been established */
			// console.log('Connected');
			$("#connection_result").show();
			$("#connect_btn").hide();
			$("#disconnect_btn").show();
			topic = $("#topic").val()
			client.subscribe(topic, {qos: parseInt($("#qos").val())});
			connected = true;
		},
		onFailure			: function (message) {
			/* Gets Called if the connection could not be established */
			// console.log('Connection failed: ' + message.errorMessage );
			alert('Connection failed: ' + message.errorMessage);
			// client.connect(options);
		}
	};
	client.connect(options);
	client.onConnectionLost = function (responseObject) {
		/* Gets  called if the websocket/mqtt connection gets disconnected for any reason 	*
		 * Depending on your scenario you could implement a reconnect logic here 			*/
		// console.log('Connection lost: ' + responseObject.errorMessage);
		alert('Connection lost: ' + responseObject.errorMessage);
	};
	client.onMessageArrived = function (message) {
		/* trying to decompress message */
		try {
			var compressedJSON = message.payloadBytes;
			var json = JSON.parse(bin2string(pako.inflate(compressedJSON)));
		}
		catch(err) {
			// console.log(err)
			// console.log("asd="+message)
			// console.log("onMessageArrived:"+message.payloadString);
			// return;
			var json = JSON.parse(message.payloadString);
		}
		// console.log('json: ' + json)
		var spl = message.destinationName.split("/");
		var dev = spl[1];
			 if(spl[2] == 'location')			{_location(dev,json)}
		else if(spl[2] == 'diagnostics')		{_diagnostics(dev,json)}
		else if(spl[2] == 'ble')				{_ble(dev,json)}
		else if(spl[2] == 'nfc')				{_nfc(dev,json)}
		else if(spl[2] == 'status')				{_status(dev,json)}
		else if(spl[2] == 'user_data')			{_user_data(dev,json)}
		else if(spl[2] == 'estimote_telemetry')	{_estimote_telemetry(dev,json)}
		else if(spl[2] == 'lvcan')				{_lv_can(dev,json)}
		else if(spl[2] == 'estimote_gpo')		{_estimote_gpo(dev,json)}
	};
}
function disconnect(){
	g_dev_id_1 = '';
	g_dev_id_2 = '';
	g_dev_id_3 = '';
	g_dev_id_4 = '';
	g_dev_id_5 = '';

	$("#select_dev_id_1").html('');
	$("#select_dev_id_2").html('');
	$("#select_dev_id_3").html('');
	$("#select_dev_id_4").html('');
	$("#select_dev_id_5").html('');
	$("#digInputDiv").hide();
	$("#digOutputDiv").hide();
	$("#connection_result").hide();
	$("#connect_btn").show();
	$("#disconnect_btn").hide();

	$("#user_data").empty();
	$("#status").empty();
	$("#imei_state").empty();
	$("#imei_status").empty();
	$("#time_state").empty();
	$("#wifi_state").empty();
	$("#data_state").empty();
	$("#GPS_state").empty();
	$("#bluetooth_state").empty();
	$("#nfc_state").empty();
	$("#airplane_state").empty();
	$("#json").empty();
	$("#nfc").empty()
	$("#dig_input_res_div").empty();

	var value = 0;
	if(ambientLight){
		if(ambientLight.arrows){
			if(ambientLight.arrows[0]){
				if(ambientLight.arrows[0].setValue){
					ambientLight.arrows[0].setValue(value);
					ambientLight.axes[0].setBottomText(value+" lux");
				}
			}
		}
	}
	var value = -5;
	if(temperature){
		if(temperature.arrows){
			if(temperature.arrows[0]){
				if(temperature.arrows[0].setValue){
					temperature.arrows[0].setValue(value);
					temperature.axes[0].setBottomText(value+" C");
				}
			}
		}
	}
	var value = 0;
	if(rpm){
		if(rpm.arrows){
			if(rpm.arrows[0]){
				if(rpm.arrows[0].setValue){
					rpm.arrows[0].setValue(value);
					rpm.axes[0].setBottomText(value+" RPM");
				}
			}
		}
	}
	var value = 0;
	if(fuel){
		if(fuel.arrows){
			if(fuel.arrows[0]){
				if(fuel.arrows[0].setValue){
					fuel.arrows[0].setValue(value);
					fuel.axes[0].setBottomText(value+" Lt");
				}
			}
		}
	}
	var value = 0;
	if(pedal){
		if(pedal.arrows){
			if(pedal.arrows[0]){
				if(pedal.arrows[0].setValue){
					pedal.arrows[0].setValue(value);
					pedal.axes[0].setBottomText(value+" %");
				}
			}
		}
	}
	var value = 0;
	if(pressure){
		if(pressure.arrows){
			if(pressure.arrows[0]){
				if(pressure.arrows[0].setValue){
					pressure.arrows[0].setValue(value);
					pressure.axes[0].setBottomText(value+" ATM");
				}
			}
		}
	}
	$("#btn-1").pulsate("destroy");
	$("#btn-2").pulsate("destroy");
	if(typeof marker!= 'undefined'){marker.setMap(null);}
	connected = false;
	client.unsubscribe(topic);
	client.disconnect();

}
function publishMsg(){
	var spl		= $("#topic").val().split("/");
	var topic 	= spl[0]+"/"+spl[1]+"/estimote_gpo";
	
	var payload = '{"'+g_dev_id_5+'":{"'+$("#dig_output_s").val()+'":'+$("#dig_output_v").val()+'}}';
	var qos	 	= parseInt($("#qos").val());
	// console.log(topic)
	// console.log(payload)

	var message = new Messaging.Message(payload);
		message.destinationName = topic;
		message.qos = qos;
	client.send(message);
	// console.log("done");
}
function bin2string(array){
	var result = "";
	for(var i = 0; i < array.length; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}
function initMap(){
	map = new google.maps.Map(document.getElementById('location'),{
		zoom: 4,
		center: {lat: 51.618294, lng: -0.176939}
	});
}
function fullscreen(div){
	w = !w;
	var divs = ['location','diagnostics','ble','nfc','user_data','telemetry_1','telemetry_2','telemetry_3','json','lv_can','dig_input','dig_output'];
	for(i = 0; i < divs.length; i++){
		$("#"+divs[i]+"_div").removeClass('col-md-12').addClass('col-md-3').css({"height":"450px"});
		$("#"+divs[i]).css({"height":"390px"});

		if(divs[i] == div){
			if(w){
				$("#"+divs[i]+"_div").removeClass('col-md-3').addClass('col-md-12').css({"height":"620px"});
				$("#"+divs[i]).css({"height":"550px"});
				$("#"+divs[i]+"_div").show()
				if(divs[i] == 'location'){
					initMap();
				}
			}
		}else{
			if(w){
				$("#"+divs[i]+"_div").hide()
			}else{
				$("#"+divs[i]+"_div").show()
			}
			if(divs[i] == 'location'){
				initMap();
			}
		}
	}
}
function _location(dev,json){
	if(now.getTime() > json[0]['time']) return;
	if($('#_location_json').is(":checked")){_raw_json(dev,json);}

	var bounds = new google.maps.LatLngBounds();
	bounds.extend(new google.maps.LatLng(parseFloat(json[0]['latitude']),parseFloat(json[0]['longitude'])));

	if(typeof marker!= 'undefined'){marker.setMap(null);}
	marker = new google.maps.Marker({
		position: {lat: parseFloat(json[0]['latitude']), lng: parseFloat(json[0]['longitude'])},
		map: map
	});
	var tt = new Date(json[0]['time']);
	var contentString = 
		'<div id="content">'+
            '<h5 id="firstHeading" class="firstHeading">imei: '+dev+'</h5>'+
            '<div id="bodyContent">'+
				'time: '		+tt							+'<br />'+
				'latitude: '	+json[0]['latitude']		+'<br />'+
				'longitude: '	+json[0]['longitude']		+'<br />'+
				'altitude: '	+json[0]['altitude']		+'<br />'+
				'bearing: '		+json[0]['bearing']			+'<br />'+
				'speed: '		+json[0]['speed']			+'<br />'+
				'accuracy: '	+json[0]['accuracy']		+'<br />'+
				'battery: '		+json[0]['io']['battery']	+'<br />'+
            '</div>'+
		'</div>';

	var infowindow = new google.maps.InfoWindow({content: contentString});
	marker.addListener('click', function(){infowindow.open(map, marker);});
	map.fitBounds(bounds);
	new google.maps.event.trigger(marker,'click');
	if(map.getZoom() != 16) map.setZoom(16);
}
function _diagnostics(dev,json){
	if(now.getTime() > json[0]['time']) return;
	if($('#_diagnostics_json').is(":checked")){_raw_json(dev,json);}

	var tt = new Date(json[0]['time']);

	$("#time_state").html('<span style="color:green">'+tt+'</span>');

	airplane_state = json[0]['airplane_mode'];
	if(airplane_state){
		$("#airplane_state").html('<span style="color:green">enable</span>');
	}else{
		$("#airplane_state").html('<span style="color:red">disable</span>');
	}

	bluetooth_state = json[0]['bluetooth'];
	if(bluetooth_state != 0){
		$("#bluetooth_state").html('<span style="color:green">enable</span>');
	}else{
		$("#bluetooth_state").html('<span style="color:red">disable</span>');
	}

	connection = json[0]['connection'];
	if(connection["type"] == "MOBILE"){
		data_state = true;
	}else{
		data_state = false;
	}
	if(connection["type"] == "WIFI"){
		wifi_state = true;
	}else{
		wifi_state = false;
	}
	if(data_state){
		$("#data_state").html('<span style="color:green">enable</span>');
	}else{
		$("#data_state").html('<span style="color:red">disable</span>');
	}
	if(wifi_state){
		$("#wifi_state").html('<span style="color:green">enable</span>');
	}else{
		$("#wifi_state").html('<span style="color:red">disable</span>');
	}

	_location = json[0]['location'];
	if(_location["gps"] == true){
		GPS_state = true;
	}else{
		GPS_state = false;
	}
	if(GPS_state){
		$("#GPS_state").html('<span style="color:green">enable</span>');
	}else{
		$("#GPS_state").html('<span style="color:red">disable</span>');
	}

	nfc_state = json[0]['nfc'];
	if(nfc_state != 0){
		$("#nfc_state").html('<span style="color:green">enable</span>');
	}else{
		$("#nfc_state").html('<span style="color:red">disable</span>');
	}
}
function _ble(dev,json){
	if(now.getTime() > json[0]['time']) return;
	if($('#_ble_json').is(":checked")){_raw_json(dev,json);}
	var mac = json[0]['mac'];
	if(mac == "EE:1D:AD:89:F2:07"){
		jQuery('#btn-1').pulsate({color: "#bf1c56"});
	}else if(mac == "EE:12:81:18:63:65"){
		jQuery('#btn-2').pulsate({color: "#bf1c56"});
	}
	setTimeout(function(){
		$("#btn-1").pulsate("destroy");
		$("#btn-2").pulsate("destroy");
	},5000)
}
function _nfc(dev,json){
	if(now.getTime() > json[0]['time']) return;
	if($('#_nfc_json').is(":checked")){_raw_json(dev,json);}
	var id = json[0]['id'];
	if(id == '04a750425f1d80'){
		$("#nfc").empty().html('<img style="width:300px" src="imgs/big.png?0.1">')
	}
	else if(id == '04b262f1d02580'){
		$("#nfc").empty().html('<img style="width:200px" src="imgs/small.png?0.1">')
	}
	else if(id == '048b245ae22280'){
		$("#nfc").empty().html('<img style="width:300px" src="imgs/box.png?0.1">')
	}
}
function _status(dev,json){
	var _status = json['online'];
	var html = (_status) ? '<b style="color:green;"> ONLINE<b>' : '<b style="color:red"> OFFLINE</b>'
	$("#imei_state").html(dev);
	$("#imei_status").html(html);
}
function _user_data(dev,json){
	if(now.getTime() > json[0]['time']) return;
	if($('#_user_data_json').is(":checked")){_raw_json(dev,json);}
	var tt = new Date(json[0]['time']);
	var html  = '';
		html += 'imei: ' + dev + '<br />';
		html += 'time: ' + tt + '<br />';
	for(i = 0; i < json[0]['fields'].length; i++){
		if(typeof json[0]['fields'][i]["value"] === "boolean" && (json[0]['fields'][i]["value"] == true || json[0]['fields'][i]["value"] == false)){
			if(json[0]['fields'][i]["value"] == true){
				html += json[0]['fields'][i]["id"]+' <i class="glyphicon glyphicon-arrow-right"></i> <i class="glyphicon glyphicon-check" style="color:green;"></i><br />';
			}else{
				html += json[0]['fields'][i]["id"]+' <i class="glyphicon glyphicon-arrow-right"></i> <i class="glyphicon glyphicon-unchecked" style="color:red;"></i><br />';
			}
		}else{
			html += json[0]['fields'][i]["id"]+' <i class="glyphicon glyphicon-arrow-right"></i> '+json[0]['fields'][i]["value"]+'<br />';
		}
	}
	$("#user_data").html(html + '<hr />');
}
function _estimote_telemetry(dev,json){
	if(now.getTime() > json[0]['time']) return;
	if($('._estimote_telemetry_json').is(":checked")){_raw_json(dev,json);}
	var sel_val = '';
	for(i = 0; i < json[0]['estimotes'].length; i++){
		sel_val += '<option value="'+json[0]['estimotes'][i]["deviceId"]+'">'+json[0]['estimotes'][i]["deviceId"]+'</option>';
		if(json[0]['estimotes'][i]["deviceId"] == g_dev_id_1){
			break;
		}
	}
	if(g_dev_id_1 == ''){
		sel_val = '<select style="width:200px;" onchange="if(this.value != -1){g_dev_id_1 = this.value}"><option value="-1">select an ID</option>'+sel_val+'</select>';
		$("#select_dev_id_1").html(sel_val);
	}
	if(i != json[0]['estimotes'].length){
		var value = json[0]['estimotes'][i]["ambientLight"].toFixed(2);
		if(value > 200) value = 200;
		if(ambientLight){
			if(ambientLight.arrows){
				if(ambientLight.arrows[0]){
					if(ambientLight.arrows[0].setValue){
						ambientLight.arrows[0].setValue(value);
						ambientLight.axes[0].setBottomText(value+" lux");
					}
				}
			}
		}
	}

	var sel_val = '';
	for(i = 0; i < json[0]['estimotes'].length; i++){
		sel_val += '<option value="'+json[0]['estimotes'][i]["deviceId"]+'">'+json[0]['estimotes'][i]["deviceId"]+'</option>';
		if(json[0]['estimotes'][i]["deviceId"] == g_dev_id_2){
			break;
		}
	}
	if(g_dev_id_2 == ''){
		sel_val = '<select style="width:200px;" onchange="if(this.value != -1){g_dev_id_2 = this.value}"><option value="-1">select an ID</option>'+sel_val+'</select>';
		$("#select_dev_id_2").html(sel_val);
	}
	if(i != json[0]['estimotes'].length){
		var value = json[0]['estimotes'][i]["temperature"].toFixed(2);
		if(value > 40) value = 40;
		if(temperature){
			if(temperature.arrows){
				if(temperature.arrows[0]){
					if(temperature.arrows[0].setValue){
						temperature.arrows[0].setValue(value);
						temperature.axes[0].setBottomText(value+" C");
					}
				}
			}
		}
	}

	var sel_val = '';
	for(i = 0; i < json[0]['estimotes'].length; i++){
		sel_val += '<option value="'+json[0]['estimotes'][i]["deviceId"]+'">'+json[0]['estimotes'][i]["deviceId"]+'</option>';
		if(json[0]['estimotes'][i]["deviceId"] == g_dev_id_3){
			break;
		}
	}
	if(g_dev_id_3 == ''){
		sel_val = '<select style="width:200px;" onchange="if(this.value != -1){g_dev_id_3 = this.value;}"><option value="-1">select an ID</option>'+sel_val+'</select>';
		$("#select_dev_id_3").html(sel_val);
	}
	if(i != json[0]['estimotes'].length){
		var value = json[0]['estimotes'][i]["pressure"].toFixed(2);
		value = (0.00001*value).toFixed(2);
		if(value > 2) value = 2;
		if(pressure){
			if(pressure.arrows){
				if(pressure.arrows[0]){
					if(pressure.arrows[0].setValue){
						pressure.arrows[0].setValue(value);
						pressure.axes[0].setBottomText(value+" ATM");
					}
				}
			}
		}
	}

	var sel_val = '';
	for(i = 0; i < json[0]['estimotes'].length; i++){
		sel_val += '<option value="'+json[0]['estimotes'][i]["deviceId"]+'">'+json[0]['estimotes'][i]["deviceId"]+'</option>';
		if(json[0]['estimotes'][i]["deviceId"] == g_dev_id_4){
			break;
		}
	}
	if(g_dev_id_4 == ''){
		sel_val = '<select style="width:200px;" onchange="if(this.value != -1){g_dev_id_4 = this.value;$(\'#digInputDiv\').show()}"><option value="-1">select an ID</option>'+sel_val+'</select>';
		$("#select_dev_id_4").html(sel_val);
	}
	if(i != json[0]['estimotes'].length){
		value = json[0]['estimotes'][i]["gpio"][parseInt($("#dig_input_s").val())];
		if(value == 1){
			$("#dig_input_res_div").empty().html('<img src="imgs/door_opened.png" style="height:280px;">');
		}else if(value == 0){
			$("#dig_input_res_div").empty().html('<img src="imgs/door_closed.png" style="height:280px;">');
		}
	}

	var sel_val = '';
	for(i = 0; i < json[0]['estimotes'].length; i++){
		sel_val += '<option value="'+json[0]['estimotes'][i]["deviceId"]+'">'+json[0]['estimotes'][i]["deviceId"]+'</option>';
		if(json[0]['estimotes'][i]["deviceId"] == g_dev_id_5){
			break;
		}
	}
	if(g_dev_id_5 == ''){
		sel_val = '<select style="width:200px;" onchange="if(this.value != -1){g_dev_id_5 = this.value;$(\'#digOutputDiv\').show()}"><option value="-1">select an ID</option>'+sel_val+'</select>';
		$("#select_dev_id_5").html(sel_val);
	}
	if(i != json[0]['estimotes'].length){
		value = json[0]['estimotes'][i]["gpio"][parseInt($("#dig_output_s").val())];
		if(value == 1){
			$("#dig_output_res_div").empty().html('<img src="imgs/led-on.png" style="height:280px;">');
		}else if(value == 0){
			$("#dig_output_res_div").empty().html('<img src="imgs/led-off.png" style="height:280px;">');
		}
	}
}
function _lv_can(dev,json){
	if(now.getTime() > json[0]['time']) return;
	if($('#_lv_can_json').is(":checked")){_raw_json(dev,json);}

	var value = json[0]["engineRPM"].toFixed(2);
	if(rpm){
		if(rpm.arrows){
			if(rpm.arrows[0]){
				if(rpm.arrows[0].setValue){
					rpm.arrows[0].setValue(value);
					rpm.axes[0].setBottomText(value+" RPM");
				}
			}
		}
	}

	var value = json[0]["fuelLevelLt"].toFixed(2);
	if(fuel){
		if(fuel.arrows){
			if(fuel.arrows[0]){
				if(fuel.arrows[0].setValue){
					fuel.arrows[0].setValue(value);
					fuel.axes[0].setBottomText(value+" Lt");
				}
			}
		}
	}

	var value = json[0]["accelerationPedalPosition"].toFixed(2);
	if(pedal){
		if(pedal.arrows){
			if(pedal.arrows[0]){
				if(pedal.arrows[0].setValue){
					pedal.arrows[0].setValue(value);
					pedal.axes[0].setBottomText(value+" %");
				}
			}
		}
	}
}
function _estimote_gpo(dev,json){
	if($("#_estimote_publish_json").is(":checked")){_raw_json(dev,json)}
}
function _raw_json(dev,json){
	$("#json").prepend('imei:'+dev+'<br />'+JSON.stringify(json,null,2)+ '<hr />');
}