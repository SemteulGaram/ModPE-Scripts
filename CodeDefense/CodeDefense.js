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

const className = "CodeDefense";
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



//마인크래프트 리소스
//NOT USE(TEXTURE PACK MISSING)
var mcpeCPC = ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);
var mcpeAssets = mcpeCPC.getAssets();
//spritesheet.png 파일 접근
var mcpeSS;
try{
	mcpeSS = ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png");
}catch(e) {
	//옛날 버전에 대한 호환성
	mcpeSS = mcpeAssets.open("images/gui/spritesheet.png");
}
var mcpeSS_BF = android.graphics.BitmapFactory.decodeStream(mcpeSS);
//touchgui.png 파일 접근
var mcpeTG;
try {
	mcpeTG = ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png");
}catch(e) {
	mcpeTG = mcpeAssets.open("images/gui/touchgui.png");
}
var mcpeTG_BF = android.graphics.BitmapFactory.decodeStream(mcpeTG);
//꽉찬배경 나인패치
var mcpeBGRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 0, 0, 16, 16);
var mcpeBG = android.graphics.Bitmap.createScaledBitmap(mcpeBGRaw, PIXEL*32, PIXEL*32, false);
var mcpeBG9 = function() {return ninePatch1(mcpeBG, PIXEL*12, PIXEL*12, PIXEL*24, PIXEL*24)}
//배경 나인패치
var mcpeBGTRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 34, 43, 14, 14);
var mcpeBGT = android.graphics.Bitmap.createScaledBitmap(mcpeBGTRaw, PIXEL*32, PIXEL*32, false);
var mcpeBGT9 = function() {return ninePatch1(mcpeBGT, PIXEL*12, PIXEL*12, PIXEL*22, PIXEL*22)}
//타이틀바 나인패치
var mcpeTitleBarRaw = android.graphics.Bitmap.createBitmap(mcpeTG_BF, 150, 26, 14, 25);
var mcpeTitleBar = android.graphics.Bitmap.createScaledBitmap(mcpeTitleBarRaw, PIXEL*28, PIXEL*50, false);
var mcpeTitleBar9 = function()  {return ninePatch1(mcpeTitleBar, PIXEL*8, PIXEL*8, PIXEL*20, PIXEL*22)}
//종료 버튼 나인패치
var mcpeExitRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 60, 0, 18, 18);
var mcpeExit = android.graphics.Bitmap.createScaledBitmap(mcpeExitRaw, 18*PIXEL, 18*PIXEL, false);
var mcpeExit9 = function() {return ninePatch1(mcpeExit, PIXEL*6, PIXEL*6, PIXEL*30, PIXEL*30)}
var mcpeExitB = new android.graphics.drawable.BitmapDrawable(ctx.getResources(), mcpeExit);
mcpeExitB.setAntiAlias(false);
//종료 버튼(클릭) 나인패치
var mcpeExitClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 78, 0, 18, 18);
var mcpeExitClick = android.graphics.Bitmap.createScaledBitmap(mcpeExitClickRaw, PIXEL*36, PIXEL*36, false);
var mcpeExitClick9 = function() {return ninePatch1(mcpeExitClick, PIXEL*6, PIXEL*6, PIXEL*32, PIXEL*32)}
//버튼 나인패치
var mcpeBtnRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,32,8,8);
var mcpeBtn = android.graphics.Bitmap.createScaledBitmap(mcpeBtnRaw, PIXEL*16, PIXEL*16, false);
var mcpeBtn9 = function() {return ninePatch1(mcpeBtn, PIXEL*6, PIXEL*4, PIXEL*14, PIXEL*14)}
//버튼(클릭) 나인패치
var mcpeBtnClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,8);
var mcpeBtnClick = android.graphics.Bitmap.createScaledBitmap(mcpeBtnClickRaw, PIXEL*16, PIXEL*16,false);
var mcpeBtnClick9 = function() {return ninePatch1(mcpeBtnClick, PIXEL*4, PIXEL*4, PIXEL*12, PIXEL*14)}
//미니버튼 나인패치
var mcpeMiniBtnRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,33,8,7);
var mcpeMiniBtn = android.graphics.Bitmap.createScaledBitmap(mcpeMiniBtnRaw, PIXEL*16, PIXEL*14, false);
var mcpeMiniBtn9 = function() {return ninePatch1(mcpeMiniBtn, PIXEL*2, PIXEL*2, PIXEL*12, PIXEL*14)}
//미니버튼(클릭) 나인패치
var mcpeMiniBtnClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,7);
var mcpeMiniBtnClick = android.graphics.Bitmap.createScaledBitmap(mcpeMiniBtnClickRaw, PIXEL*16, PIXEL*14, false);
var mcpeMiniBtnClick9 = function() {return ninePatch1(mcpeMiniBtnClick, PIXEL*4, PIXEL*4, PIXEL*12, PIXEL*12)}
//텍스트뷰 나인패치
var b = android.graphics.Color.parseColor("#6b6163");
var i = android.graphics.Color.parseColor("#3a393a");
var mcpeTextViewPixel = [
b,b,b,b,b,b,
b,b,b,b,b,b,
b,b,i,i,b,b,
b,b,i,i,b,b,
b,b,b,b,b,b,
b,b,b,b,b,b
];
var mcpeTextViewRaw = android.graphics.Bitmap.createBitmap(6, 6, android.graphics.Bitmap.Config.ARGB_8888);
mcpeTextViewRaw.setPixels(mcpeTextViewPixel, 0, 6, 0, 0, 6, 6);
var mcpeTextView = android.graphics.Bitmap.createScaledBitmap(mcpeTextViewRaw, PIXEL*6, PIXEL*6, false);
var mcpeTextView9 = function() {return ninePatch1(mcpeTextView, PIXEL*3, PIXEL*3, PIXEL*4, PIXEL*4)}

var r = android.graphics.Color.parseColor("#ff0000");
var y = android.graphics.Color.parseColor("#ffff00");
var w = android.graphics.Color.parseColor("#ffffff");
var mcpeVisPixel = [
0,0,0,0,0,0,0,
0,r,r,r,r,r,0,
0,r,r,r,r,r,0,
0,r,r,r,r,r,0,
0,0,0,0,0,0,0,
0,y,y,y,y,y,0,
0,y,y,y,y,y,0,
0,y,y,y,y,y,0,
0,0,0,0,0,0,0,
0,y,y,y,y,y,0,
0,y,y,y,y,y,0,
0,y,y,y,y,y,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0
];
var mcpeVisRaw = android.graphics.Bitmap.createBitmap(7, 41, android.graphics.Bitmap.Config.ARGB_8888);
mcpeVisRaw.setPixels(mcpeVisPixel, 0, 7, 0, 0, 7, 41);
var mcpeVis = android.graphics.Bitmap.createScaledBitmap(mcpeVisRaw, PIXEL*7, PIXEL*41, false);
var mcpeVis9 = function() {return ninePatch1(mcpeVis, PIXEL*0, PIXEL*0, PIXEL*7, PIXEL*41)}

var w = android.graphics.Color.parseColor("#ffffff");
var mcpeH_VisPixel = [
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,
0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,
0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0/*,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0*/
];
var mcpeH_VisRaw = android.graphics.Bitmap.createBitmap(37, 4, android.graphics.Bitmap.Config.ARGB_8888);
mcpeH_VisRaw.setPixels(mcpeH_VisPixel, 0, 37, 0, 0, 37, 4);
var mcpeH_Vis = android.graphics.Bitmap.createScaledBitmap(mcpeH_VisRaw, PIXEL*37, PIXEL*4, false);
var mcpeH_Vis9 = function() {return ninePatch1(mcpeH_Vis, PIXEL*0, PIXEL*0, PIXEL*37, PIXEL*4)}
var mcpeH_VisArray = [];
for(var e = 0; e < 12; e++) {
	mcpeH_VisArray.push(android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeH_VisRaw, 0, 0, 4 + 3*e, 4), PIXEL*(24 + 18*e), PIXEL*24, false));
}
var mcpeH_VisNull = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeH_VisRaw, 0, 0, 1, 4), PIXEL*6, PIXEL*24, false);
/*
var A = android.graphics.Color.parseColor("#d4cdc8");
var B = android.graphics.Color.parseColor("#bcb1aa");
var C = android.graphics.Color.parseColor("#868686");
var D = android.graphics.Color.parseColor("#28272a");
var E = android.graphics.Color.parseColor("#28272a");
var F = android.graphics.Color.parseColor("#8a7b76");
var G = android.graphics.Color.parseColor("#e9e5e1");
var H = android.graphics.Color.parseColor("#3a3a3a");


var mcpeBtnBG_EMPTY = [
B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,C,
B,B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,C,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,D,D,
C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,D
]

[
B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,C,
B,B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,C,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,G,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,G,G,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,G,H,H,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,H,H,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,H,H,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,H,H,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,H,H,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,H,F,F,F,F,F,F,F,F,D,D,
B,C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,D,D,
C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,D
]

[
B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,C,
B,B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,C,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,G,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,G,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,G,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,H,F,F,F,D,D,
B,C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,D,D,
C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,D
]*/



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

function broadcast(str){
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
		return false;
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
		return false;
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString, str;

	while((tempRead = bufferedReader.readLine()) != null){
		tempString = tempRead + "";
		//불러올 데이터 찾기
		if(tempString.split("¶")[0] == article){
			str = tempString.split("¶")[1];
			if(tempString.split("¶")[2] == "n") {
				do {
					tempRead = bufferedReader.readLine();
					tempString = tempRead + "";
					str += "\n" + tempString.split("¶")[0];
				}while(tempString.split("¶")[1] == "n");
			}
			//찾았으면 끝내고 반환
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return str;
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



function newLevel(str) {
	if(loadData(_MAP_DATA(), "CODE") === "DEFENSE") {
		Ld.running = true;
		Ld.playing = false;
		if(Ld.btnAlive == false) {
			uiThread(function() {try {
				Ld.wd.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, ctx.getWindowManager().getDefaultDisplay().getWidth() - DIP*80, DIP*30);
				Ld.btnAlive = true;
			}catch(e) {
				showError(e);
			}});
		}
	}
}

function leaveGame() {
	Ld.running = false;
	Ld.playing = false;
	if(Ld.btnAlive) {
		Ld.wd.dismiss();
		Ld.btnAlive = false;
	}
}

function procCmd(str) {
	var cmd = str.split(" ");
	//GET OUT OF MY SCRIPT FOOL COMMEDS THERE IS JUST ONLY BUTTON IN HERE
	if(cmd[0] === "mod") {
		broadcast(TAG + "by CodeInside");
	}
}

function modTick() {

}



var Ld = {};
Ld.running = false;
Ld.playing = false;
Ld.btnAlive = false;

Ld.defense = function(file) {
	
}

Ld.btn = new android.widget.Button(ctx);
Ld.btn.setTransformationMethod(null);
Ld.btn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
Ld.btn.setGravity(android.view.Gravity.CENTER);
Ld.btn.setPadding(0, 0, 0, 0);
Ld.btn.setText("Defense");
Ld.btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*11);
Ld.btn.setTextColor(android.graphics.Color.rgb(30, 150, 255));
Ld.btn.setShadowLayer(1, DIP/2, DIP/2, android.graphics.Color.GRAY);

Ld.btn_d = new android.graphics.drawable.GradientDrawable();
Ld.btn_d.mutate().setStroke(DIP*2, android.graphics.Color.BLUE);
Ld.btn_d.mutate().setGradientType(android.graphics.drawable.GradientDrawable.RADIAL_GRADIENT);
Ld.btn_d.mutate().setGradientRadius(DIP*35);
Ld.btn_d.mutate().setColor(android.graphics.Color.WHITE);
Ld.btn_d.setCornerRadius(DIP*15);
Ld.btn.setBackgroundDrawable(Ld.btn_d);

Ld.btn.setOnTouchListener(new android.view.View.OnTouchListener({ onTouch: function(view, event) {
	switch(event.action) {
		case android.view.MotionEvent.ACTION_DOWN:
			Ld.eventX = event.getX();
			Ld.eventY = event.getY();
			Ld.eventDrag = false;
			break;
		case android.view.MotionEvent.ACTION_MOVE:
			Ld.eventLX = event.getRawX() - Ld.eventX;
			Ld.eventLY = event.getRawY() - Ld.eventY;
			if(Ld.eventDrag) {
				uiThread(function() {try {
					Ld.wd.update(Ld.eventLX, Ld.eventLY, Ld.wd.getWidth(), Ld.wd.getHeight(), true);
				}catch(e) {
					showError(e);
				}});
			}
			break;
		case android.view.MotionEvent.ACTION_UP:
			if(Ld.eventDrag) {
				saveData(_MAIN_DATA, "WINDOW_X", Ld.eventLX);
				saveData(_MAIN_DATA, "WINDOW_Y", Ld.eventLY);
			}
			break;
	}
	return false;
}}));
Ld.btn.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		
	}catch(e) {
		showError(e);
	}}}));
Ld.btn.setOnLongClickListener(new android.view.View.OnLongClickListener({onLongClick: function(view, event) {try {
	Ld.eventDrag = true;
	return true;
}catch(e) {
	showError(e);
	return true;
}}}));

Ld.btn_p = new android.widget.RelativeLayout.LayoutParams(DIP*70, DIP*30);
Ld.btn.setLayoutParams(Ld.btn_p);

Ld.wd = new android.widget.PopupWindow(Ld.btn, DIP*70, DIP*30, false);