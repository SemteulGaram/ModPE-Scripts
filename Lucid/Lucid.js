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

const className = "Lucid";
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
function _MAP_DATA() {return new java.io.File(_MAP_DIR(), className + ".json")}
var DIP = PIXEL * loadData(_MAIN_DATA, "DIPS");
if(DIP == null || DIP == 0){
	DIP = PIXEL;
}
if(!(_MAIN_DIR.exists())) {
	_MAIN_DIR.mkdirs();
}
if(!(_MAIN_DATA.exists())) {
	_MAIN_DATA.createNewFile();
}

var Assets = {};
Assets.warning = java.io.File(_MAIN_DIR, "assets01.res");
Assets.warning2 = java.io.File(_MAIN_DIR, "assets02.res");

function en_US() {
	this.multiWarningMsg = "Multiplay is not support";
	this.assetsCrash = "Resource crash. Please reboot Minecraft.";
}

function ko_KR() {
	this.multiWarningMsg = "멀티 플레이는 지원되지 않습니다";
	this.assetsCrash = "자료가 손상되었습니다. 마인크래프트를 재부팅 해 주세요.";
}

var lang = new en_US();

//====================
//Lucid function
//====================

var Lucid = {};
Lucid.isRunning = false;
Lucid.currentStage = 0;
Lucid.stageTicking = false;
Lucid.stageData = [];
//Lucid.stageData.push({name: "test Stage", init: function() {}, tick: function() {}, fin: function() {}, point: [], loc: [], ent: []});
//Lucid.stageData[Lucid.currentStage].point.push({x: 0, y: 0, z: 0, f: function() {}, b: function() {}, bn: "Active"});
//Lucid.stageData[Lucid.currentStage].loc.push({sx: 0, ex: 0, sy: 0, ey: 0, sz: 0, ez: 0, f: function() {}, b: function() {}, bn: "Active"});
//Lucid.stageData[Lucid.currentStage].ent.push({e: <object>, f: function() {}, b: function() {}, bn: "Active"});
Lucid.lastPointX = null;
Lucid.lastPointY = null;
Lucid.lastPointZ = null;
Lucid.lastLocX = null;
Lucid.lastLocY = null;
Lucid.lastLocZ = null;
Lucid.activeButton = null;
Lucid.activeWindow = null;
Lucid.activeIsShow = false;
Lucid.cache = {};
Lucid.cache.multiMsg = false;
var entitySpawnerData = [];
//[x, y, x, id, texture, rendering, function]
var setTileManagerData = [];
//[x, y, z, id, data]
var setTileSpeed = 1;
var bgmManagerData = [];
var screenColorData = [];
Lucid.lastColor = 0;

function findStageIdByName(stageName) {try {
	for(var e = 0; e < Lucid.stageData.length; e++) {
		if(Lucid.stageData[e].name === stageName) {
			return e;
		}
	}
	throw new ReferenceError(stageName + " stage is not in the Lucid.stageData");
}catch(e) {
	showError(e);
}}

function multiChecker() {try {
	var a = Entity.getAll();
	for(var e = 0; e < a.length; e++) {
		if(Player.isPlayer(a[e]) && !EntityFix.isEqual(a[e], Player.getEnity())) {
			warningPopup(lang.multiWarningMsg);
		}
	}
}catch(e) {
	showError(e);
}}

function screenColorLoad() {try {
	Lucid.screenFilter = new android.widget.RelativeLayout(ctx);
	var wd = new android.widget.PopupWindow(Lucid.screenFilter, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, false);
	uiThread(function() {try {
		wd.showAtLoction(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, 0, 0);
	}catch(e) {
		showError(e);
	}});
}catch(e) {
	showError(e);
}}

function screenColorManager() {try {
	if(screenColorData.length > 0) {
		var c = screenColorData.shift();
		var i = (c[0]) + (c[1]*1000) + (c[2]*1000000) + (c[3]*1000000000);
		if(Lucid.lastColor !== i) {
			uiThread(function() {try {
				Lucid.screenFilter.setBackgroundColor(android.graphics.Color.rgb(c[1], c[2], c[3]));
				Lucid.screenFilter.setAlpha(c[0]);
			}catch(e) {
				showError(e);
			}});
			Lucid.lastColor = i;
		}
	}
}catch(e) {
	showError(e);
}}

function warningPopup(str) {try {
	var sf = [];
	for(var e = 0; e < 120; e++) {
		sf[e] = Math.floor(Math.abs(Math.sin(e/60*Math.PI))*200);
	}
	var ll = new android.widget.LinearLayout(ctx);
	ll.setOrientation(1);
	var ll_g = new android.graphics.drawable.GradientDrawable();
	ll_g.mutate().setColor(android.graphics.Color.RED);
	ll_g.mutate().setAlpha(0);
	ll.setBackgroundDrawable(ll_g);
	ll.setGravity(android.view.Gravity.CENTER);
	
	if(Assets.warning.exists()) {
		var iv = new android.widget.ImageView(ctx);
		var iv_b = android.graphics.BitmapFactory.decodeFile(Assets.warning.getAbsolutePath());
		var iv_b2 = android.graphics.Bitmap.createScaledBitmap(iv_b, PIXEL*300, PIXEL*240, false);
		iv.setImageBitmap(iv_b2);
		ll.addView(iv);
	}
	
	var tv = new android.widget.TextView(ctx);
	tv.setGravity(android.view.Gravity.CENTER);
	tv.setText(str);
	tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*15);
	tv.setShadowLayer(1, DIP/2, DIP/2, android.graphics.Color.DKGRAY);
	ll.addView(tv);
	
	var wd = new android.widget.PopupWindow(ll, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, false);
	uiThread(function() {try {
		wd.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, 0, 0);
	}catch(e) {
		showError(e);
	}});
	thread(function() {try {
		while(sf.length > 0) {
			uiThread(function() {try {
				ll_g.mutate().setAlpha(sf.shift() + 55);
				ll.setBackgroundDrawable(ll_g);
			}catch(e) {
				showError(e);
			}});
			sleep(50);
		}
		uiThread(function() {try {
			wd.dismiss();
		}catch(e) {
			showError(e);
		}});
	}catch(e) {
		showError(e);
	}}).start();
}catch(e) {
	showError(e);
}}

function userPointedBlockData() {
	
}

function activeButtonLoad() {try {
	if(Lucid.activeWindow == null) {
		Lucid.activeButton = new android.widget.Button(ctx);
		Lucid.activeButton.setText("Active");
		Lucid.activeButton.setTextColor(android.graphics.Color.WHITE);
		Lucid.activeButton.setTextSize(DIP*16);
		
		Lucid.activeWindow = new android.widget.PopupWindow(Lucid.activeButton, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, false);
	}
}catch(e) {
	showError(e);
}}

function activeButton(text, func) {
	activeButtonDismiss();
	uiThread(function() {try {
		Lucid.activeButton.setText(text);
		Lucid.activeWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER|android.view.Gravity.BOTTOM, 0, PIXEL*100);
	}catch(e) {
		showError(e);
	}});
}

function activeButtonDismiss() {
	if(Lucid.activeIsShow) {
		uiThread(function() {try {
			Lucid.activeWindow.dismiss();
		}catch(e) {
			showError(e);
		}})
		Lucid.activeIsShow = false;
	}
}

function setTileManager() {
	for(var e = 0; e < setTileSpeed; e++) {
		if(setTileManagerData.length > 0) {
			var d = setTileManagerData.shift();
			Level.setTile(d[0], d[1], d[2], d[3], d[4]);
		}
	}
}

function entitySpawner() {
	for(var e = 0; e < entitySpawnerData.length; e++) {
		var d = entitySpawnerData[e];
		var ent = Level.spawnMob(d[0], d[1], d[2], d[3], d[4]);
		if(d[5] !== null) {
			ent.setRenderType(d[5]);
		}
		d[6](ent);
	}
	entitySpawnerData = [];
}

function newLevel(str) {
	activeButtonLoad();
}

function procCmd(str) {
	if(str == "b") {
		warningPopup("비둘기 조심");
	}else {
		activeButton(str, null);
	}
}

//====================
//sub function
//====================

EntityFix = {};

EntityFix.isEqual = function(obj1, obj2) {
	return Entity.getUniqueId(obj1) === Entity.getUniqueId(obj2);
}

EntityFix.findEnt = function(uniqId) {
	var list = Entity.getAll();
	var max = list.length;
	for(var e = 0; e < max; e++) {
		if(uniqId === Entity.getUniqueId(list[e])) {
			return list[e];
		}
	}
}

/**
 * Error report
 *
 * @since 2015-04-??
 * @author CodeInside
 *
 * @param {error} e
 */

function showError(e) {
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

function sendChat(str){
	net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat(str);
	clientMessage("<" + Player.getName(Player.getEntity()) + "> " + str);
}

function sleep(int){
	java.lang.Thread.sleep(int);
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
};



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
			toast(TAG + prototypeFile.getName() + " ë¦¬ì†ŒìŠ¤íŒŒì¼ ì ìš© ì‹¤íŒ¨\nì•ˆë“œë¡œì´ë“œê°€ ì•„ë‹Œê°€ìš”?");
		}
	}catch(e){
		toasts(prototypeFile.getName() + " ë¦¬ì†ŒìŠ¤íŒŒì¼ì´ ì—†ìŠµë‹ˆë‹¤");
	}
};

/**
 * save/load Data
 *
 * @since 2015-02-11
 * @author CodeInside
 */

function saveData(file, article, value) {
	//ì½ê¸°
	if(!file.exists()) {
		file.createNewFile()
	}
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return false;
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;
	var tempSaved = "";
	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//ì§€ê¸ˆ ìƒˆë¡œ ì €ìž¥í•  ë°ì´í„°ëŠ” ì½ì§€ ì•Šê¸°
		if(tempReadString.split("¶")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	//ì½ì–´ì˜¤ê¸° ì™„ë£Œ
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//ì“°ê¸°
	var fileOutputStream = new java.io.FileOutputStream(file);
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + "¶" + value);
	//ì“°ê¸° ì™„ë£Œ
	outputStreamWriter.close();
	fileOutputStream.close();
}

function loadData(file, article) {
	//ì½ê¸°
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return false;
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString, str;

	while((tempRead = bufferedReader.readLine()) != null){
		tempString = tempRead + "";
		//ë¶ˆëŸ¬ì˜¬ ë°ì´í„° ì°¾ê¸°
		if(tempString.split("¶")[0] == article){
			str = tempString.split("¶")[1];
			if(tempString.split("¶")[2] == "n") {
				do {
					tempRead = bufferedReader.readLine();
					str += "\n" + tempRead.split("¶")[0];
				}while (tempString.split("¶")[1] == "n");
			}
			//ì°¾ì•˜ìœ¼ë©´ ëë‚´ê³  ë°˜í™˜
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return str;
		}
	}
	//ëª» ì°¾ìŒ
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//ì—†ìœ¼ë©´ ë°˜í™˜
	return null;
}



/**
 * load/save Minecraft Setting
 *
 * @since 2015-04-12
 * @author CodeInside
 */

function saveSetting(article, value) {
	//ì½ê¸°
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;
	var tempSaved = "";
	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//ì§€ê¸ˆ ìƒˆë¡œ ì €ìž¥í•  ë°ì´í„°ëŠ” ì½ì§€ ì•Šê¸°
		if(tempReadString.split(":")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	//ì½ì–´ì˜¤ê¸° ì™„ë£Œ
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//ì“°ê¸°
	var fileOutputStream = new java.io.FileOutputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + ":" + value);
	//ì“°ê¸° ì™„ë£Œ
	outputStreamWriter.close();
	fileOutputStream.close();
	//this is not work
	net.zhuoweizhang.mcpelauncher.ScriptManager.requestGraphicsReset();
}

function loadSetting(article) {
	//ì½ê¸°
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;

	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//ë¶ˆëŸ¬ì˜¬ ë°ì´í„° ì°¾ê¸°
		if(tempReadString.split(":")[0] == article){
			//ì°¾ì•˜ìœ¼ë©´ ëë‚´ê³  ë°˜í™˜
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return tempReadString.split(":")[1];
		}
	}
	//ëª» ì°¾ìŒ
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//ì—†ìœ¼ë©´ ë°˜í™˜
	return null;
}
