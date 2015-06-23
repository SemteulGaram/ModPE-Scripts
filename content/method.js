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

const className = "test";
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
if(!(_MAIN_DIR.exists())) {
	_MAIN_DIR.mkdirs();
}
if(!(_MAIN_DATA.exists())) {
	_MAIN_DATA.createNewFile();
}
var DIP = PIXEL * loadData(_MAIN_DATA, "DIPS");
if(DIP == null || DIP == 0){
	DIP = PIXEL;
}



//NOT USE(TEXTURE PACK MISSING)
var mcpeCPC = ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);
var mcpeAssets = mcpeCPC.getAssets();
//spritesheet.png
var mcpeSS;
try{
	mcpeSS = ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png");
}catch(e) {
	//old version
	mcpeSS = mcpeAssets.open("images/gui/spritesheet.png");
}
var mcpeSS_BF = android.graphics.BitmapFactory.decodeStream(mcpeSS);
//touchgui.png
var mcpeTG;
try {
	mcpeTG = ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png");
}catch(e) {
	mcpeTG = mcpeAssets.open("images/gui/touchgui.png");
}
var mcpeTG_BF = android.graphics.BitmapFactory.decodeStream(mcpeTG);
var mcpeBGRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 0, 0, 16, 16);
var mcpeBG = android.graphics.Bitmap.createScaledBitmap(mcpeBGRaw, PIXEL*32, PIXEL*32, false);
var mcpeBG9 = function() {return ninePatch1(mcpeBG, PIXEL*12, PIXEL*12, PIXEL*24, PIXEL*24)}
var mcpeBGTRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 34, 43, 14, 14);
var mcpeBGT = android.graphics.Bitmap.createScaledBitmap(mcpeBGTRaw, PIXEL*32, PIXEL*32, false);
var mcpeBGT9 = function() {return ninePatch1(mcpeBGT, PIXEL*12, PIXEL*12, PIXEL*22, PIXEL*22)}
var mcpeTitleBarRaw = android.graphics.Bitmap.createBitmap(mcpeTG_BF, 150, 26, 14, 25);
var mcpeTitleBar = android.graphics.Bitmap.createScaledBitmap(mcpeTitleBarRaw, PIXEL*28, PIXEL*50, false);
var mcpeTitleBar9 = function()  {return ninePatch1(mcpeTitleBar, PIXEL*8, PIXEL*8, PIXEL*20, PIXEL*22)}
//醫낅즺 踰꾪듉 �섏씤�⑥튂
var mcpeExitRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 60, 0, 18, 18);
var mcpeExit = android.graphics.Bitmap.createScaledBitmap(mcpeExitRaw, 18*PIXEL, 18*PIXEL, false);
var mcpeExit9 = function() {return ninePatch1(mcpeExit, PIXEL*6, PIXEL*6, PIXEL*30, PIXEL*30)}
var mcpeExitB = new android.graphics.drawable.BitmapDrawable(ctx.getResources(), mcpeExit);
mcpeExitB.setAntiAlias(false);
//醫낅즺 踰꾪듉(�대┃) �섏씤�⑥튂
var mcpeExitClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 78, 0, 18, 18);
var mcpeExitClick = android.graphics.Bitmap.createScaledBitmap(mcpeExitClickRaw, PIXEL*36, PIXEL*36, false);
var mcpeExitClick9 = function() {return ninePatch1(mcpeExitClick, PIXEL*6, PIXEL*6, PIXEL*32, PIXEL*32)}
//踰꾪듉 �섏씤�⑥튂
var mcpeBtnRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,32,8,8);
var mcpeBtn = android.graphics.Bitmap.createScaledBitmap(mcpeBtnRaw, PIXEL*16, PIXEL*16, false);
var mcpeBtn9 = function() {return ninePatch1(mcpeBtn, PIXEL*6, PIXEL*4, PIXEL*14, PIXEL*14)}
//踰꾪듉(�대┃) �섏씤�⑥튂
var mcpeBtnClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,8);
var mcpeBtnClick = android.graphics.Bitmap.createScaledBitmap(mcpeBtnClickRaw, PIXEL*16, PIXEL*16,false);
var mcpeBtnClick9 = function() {return ninePatch1(mcpeBtnClick, PIXEL*4, PIXEL*4, PIXEL*12, PIXEL*14)}
//誘몃땲踰꾪듉 �섏씤�⑥튂
var mcpeMiniBtnRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,33,8,7);
var mcpeMiniBtn = android.graphics.Bitmap.createScaledBitmap(mcpeMiniBtnRaw, PIXEL*16, PIXEL*14, false);
var mcpeMiniBtn9 = function() {return ninePatch1(mcpeMiniBtn, PIXEL*2, PIXEL*2, PIXEL*12, PIXEL*14)}
//誘몃땲踰꾪듉(�대┃) �섏씤�⑥튂
var mcpeMiniBtnClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,7);
var mcpeMiniBtnClick = android.graphics.Bitmap.createScaledBitmap(mcpeMiniBtnClickRaw, PIXEL*16, PIXEL*14, false);
var mcpeMiniBtnClick9 = function() {return ninePatch1(mcpeMiniBtnClick, PIXEL*4, PIXEL*4, PIXEL*12, PIXEL*12)}
//�띿뒪�몃럭 �섏씤�⑥튂
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
			toast(TAG + prototypeFile.getName() + " can't find blocklauncher dir'");
		}
	}catch(e){
		toasts(prototypeFile.getName() + " is not exists");
	}
};



//==============================
//-NinePatch JS
//Copyright짰 2015 affogatoman(colombia2)
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
		if(tempReadString.split("¶")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	var fileOutputStream = new java.io.FileOutputStream(file);
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + "¶" + value);
	outputStreamWriter.close();
	fileOutputStream.close();
	return true;
}

function loadData(file, article) {
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
		if(tempString.split("¶")[0] == article){
			str = tempString.split("¶")[1];
			if(tempString.split("¶")[2] == "n") {
				do {
					tempRead = bufferedReader.readLine();
					tempString = tempRead + "";
					str += "\n" + tempString.split("¶")[0];
				}while(tempString.split("¶")[1] == "n");
			}
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return str;
		}
	}
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	return null;
}



/**
 * load/save Minecraft Setting
 *
 * @since 2015-04-12
 * @author CodeInside
 */

function saveSetting(article, value) {
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;
	var tempSaved = "";
	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		if(tempReadString.split(":")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	var fileOutputStream = new java.io.FileOutputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + ":" + value);
	outputStreamWriter.close();
	fileOutputStream.close();
	//this is not work
	net.zhuoweizhang.mcpelauncher.ScriptManager.requestGraphicsReset();
}

function loadSetting(article) {
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;

	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		if(tempReadString.split(":")[0] == article){
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return tempReadString.split(":")[1];
		}
	}
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	return null;
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



/**
 * View Side
 *
 * @since 2015-04-13
 * @author CodeInside
 */

function viewSide(yaw) {
	var temp = yaw % 360;
	if((temp >= 0 && temp < 11.25) || (temp >= 348.75 && temp < 360))
		return "遺�(Z+)";
	else if(temp >= 11.25 && temp < 33.75)
		return "遺곷턿��";
	else if(temp >= 33.75 && temp < 56.25)
		return "遺곷룞";
	else if(temp >= 56.25 && temp < 78.75)
		return "遺곷룞��";
	else if(temp >= 78.75 && temp < 101.25)
		return "��(-X)";
	else if(temp >= 101.25 && temp < 123.75)
		return "�⑤룞��";
	else if(temp >= 123.75 && temp < 146.25)
		return "�⑤룞";
	else if(temp >= 146.25 && temp < 168.75)
		return "�⑤궓��";
	else if(temp >= 168.75 && temp < 191.25)
		return "��(Z-)";
	else if(temp >= 191.25 && temp < 213.75)
		return "�⑤궓��";
	else if(temp >= 213.75 && temp < 236.25)
		return "�⑥꽌";
	else if(temp >= 236.25 && temp < 258.75)
		return "�⑥꽌��";
	else if(temp >= 258.75 && temp < 281.25)
		return "��(X+)";
	else if(temp >= 281.25 && temp < 303.75)
		return "遺곸꽌��";
	else if(temp >= 303.75 && temp < 326.25)
		return "遺곸꽌";
	else if(temp >= 326.25 && temp < 348.75)
		return "遺곷턿��";
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
	return혻status == android.os.BatteryManager.BATTERY_STATUS_FULL;
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



/*
 * Copyright (C) 2010 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//convert Java to Javascript by [CodeInside]

var VL = {};
//byte[]
VL.mRawVizData;
//int[]
VL.mFormattedVizData;
//byte[]
VL.mRawNullData = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 0);
//int[]
VL.mFormattedNullData = new Array(0);
//Visualizer
VL.mVisualizer;
//int
VL.mType;
//long
VL.MAX_IDLE_TIME_MS = 3000;
//long
VL.mLastValidCaptureTimeMs;
//int
VL.TYPE_PCM = 0;
VL.TYPE_FFT = 1;
// type, size - @int
VL.AudioCapture = function(type, size, session) {
	VL.mType = type;
	VL.range = new Array(2);
	VL.range = android.media.audiofx.Visualizer.getCaptureSizeRange();
 	if (size < VL.range[0]) {
		size = VL.range[0];
		}
	if (size > VL.range[1]) {
		size = VL.range[1];
	}
	VL.mRawVizData = java.lang.reflect.Array.		newInstance(java.lang.Byte.TYPE, size);
	VL.mFormattedVizData = new Array(size);
	VL.mVisualizer = null;
	try {
		VL.mVisualizer = new android.media.audiofx.Visualizer(session);
		if (VL.mVisualizer != null) {
			if (VL.mVisualizer.getEnabled()) {
				VL.mVisualizer.setEnabled(false);
			}
			VL.mVisualizer.setCaptureSize(VL.mRawVizData.length);
		}
	}catch(e) {
		showError(e);
	}
}

VL.start = function() {
	if (VL.mVisualizer != null) {
		try {
			if (!VL.mVisualizer.getEnabled()) {
				VL.mVisualizer.setEnabled(true);
				VL.mLastValidCaptureTimeMs = java.lang.System.currentTimeMillis();
			}
		}catch(e) {
			showError(e);
		}
	}
}

VL.stop = function() {
	if (VL.mVisualizer != null) {
		try {
			if (VL.mVisualizer.getEnabled()) {
				VL.mVisualizer.setEnabled(false);
			}
		}catch(e) {
			showError(e);
		}
	}
}

VL.release = function() {
	if (VL.mVisualizer != null) {
		VL.mVisualizer.release();
		VL.mVisualizer = null;
  }
}

// return - @byte[]
VL.getRawData = function() {
	if (VL.captureData()) {
		return VL.mRawVizData;
	} else {
		return VL.mRawNullData;
	}
}

// num, den - @int
// return - @byte[]
VL.getFormattedData = function(num, den) {
	if (VL.captureData()) {
		if (VL.mType == VL.TYPE_PCM) {
			for (var i = 0; i < VL.mFormattedVizData.length; i++) {
				// convert from unsigned 8 bit to signed 16 bit
				var tmp = (VL.mRawVizData[i] & 0xFF) - 128;
				// apply scaling factor
				VL.mFormattedVizData[i] = (tmp * num) / den;
			}
		}else if(VL.mType == VL.TYPE_FFT) {
			for (var i = 0; i < VL.mFormattedVizData.length; i++) {
				// apply scaling factor
				VL.mFormattedVizData[i] = (VL.mRawVizData[i] * num) / den;
			}
		}else {
			toast("Unknown AudioCapture Type");
			return VL.mFormattedNullData;
		}
		return VL.mFormattedVizData;
	} else {
		return VL.mFormattedNullData;
	}
}

// return - boolen
VL.captureData = function() {
	var status = android.media.audiofx.Visualizer.ERROR;
	var result = true;
	try {
		if (VL.mVisualizer != null) {
			if (VL.mType == VL.TYPE_PCM) {
				status = VL.mVisualizer.getWaveForm(VL.mRawVizData);
			} else {
				status = VL.mVisualizer.getFft(VL.mRawVizData);
			}
		}
	}catch(e) {
		showError(e);
	}finally {
		if (status != android.media.audiofx.Visualizer.SUCCESS) {
			result = false;
		} else {
			// return idle state indication if silence lasts more than MAX_IDLE_TIME_MS
			//byte
			var nullValue = 0;
			//int
			var i;
			if (VL.mType == VL.TYPE_PCM) {
				nullValue = 0x80;
			}
			for (i = 0; i < VL.mRawVizData.length; i++) {
				if (VL.mRawVizData[i] != nullValue) break;
			}
			if (i == VL.mRawVizData.length) {
				if ((java.lang.System.currentTimeMillis() - VL.mLastValidCaptureTimeMs) > VL.MAX_IDLE_TIME_MS) {
					result = false;
				}
			} else {
				VL.mLastValidCaptureTimeMs = java.lang.System.currentTimeMillis();
			}
		}
	}
	return result;
}

var mAudioCapture, mVisible;

function onVisibilityChanged(visible, type, size, audioSessionID) {
	mVisible = visible;
	if (visible) {
		if (mAudioCapture == null) {
			mAudioCapture = VL.AudioCapture(type, size, audioSessionID);
			mVisData = new Array(size);
		}
		VL.start();
	} else {
		if (mAudioCapture != null) {
			VL.stop();
			VL.release();
			mAudioCapture = null;
		}
	}
}

//ready
//onVisibilityChanged(visible, type, size, android.media.MediaPlayer().getAudioSessionId());

//capture
//mVizData = VL.getFormattedData(1, 1);



/**
 * TextToSpeach
 *
 * @since 2015-04
 * @author Dark
 */

var tts = new android.speech.tts.TextToSpeech (ctx, new android.speech.tts.TextToSpeech.OnInitListener ( {
	onInit: function (status) {
		//tts.setLanguage(java.util.Locale.KOREAN);
	}
}), "com.samsung.SMT");

//var GearVoice = new android.speech.tts.Voice("GearVoice",혻java.util.Locale.KOREAN, android.speech.tts.Voice.QUALITY_NORMAL, android.speech.tts.Voice.LATENCY_NORMAL, false,혻"gear");

tts.setPitch(3);
tts.setLanguage(java.util.Locale.KOREAN);
tts.setSpeechRate(1.5);
//tts.setVoice(GearVoice);
//toast(tts.getEngines() + "");

function ttsIt(str, pitch, speed) {
	tts.setPitch(pitch);
	tts.setSpeechRate(speed);
	tts.speak(str, android.speech.tts.TextToSpeech.QUEUE_FLUSH, null);
}

/*
Level.addParticle�� �곗씠�� �뚰떚�는좊ぉ濡�

ParticleType.blockcrack
ParticleType.crit
ParticleType.smoke
ParticleType.cloud
ParticleType.flame
ParticleType.lava
ParticleType.redstone
ParticleType.itemcrack
ParticleType.snowballpoof
ParticleType.mobFlame
ParticleType.heart

혻

Level.playSound�� �곗씠�� �뚮━�뚯씪 紐⑸줉

step.cloth
step.grass
step.gravel
step.sand
step.stone
step.wood
fire.fire
fire.ignite
random.splash
random.explode
random.break
random.burp
random.chestclosed
random.chestopen
random.click
random.door_close
random.door_open
random.hurt
random.glass
random.bow
random.bowhit
random.eat
random.fuse
mob.sheep
mob.pig
mob.pigdeath
mob.cow
mob.cowhurt
mob.chicken
mob.chickenhurt
mob.zombie
mob.zombiedeath
mob.zombiehurt
mob.skeleton
mob.skeletonhurt
mob.spider
mob.spiderdeath
mob.zombiepig.zpig
mob.zombiepig.zpigangry
mob.zombiepig.zpigdeath
mob.zombiepig.zpighurt
mob.creeper
mob.creeperdeath
damage.fallbig
damage.fallsmall



Entity.getEntityTypeId�� �곗씠�� �뷀떚�� ���� �꾩씠�붋좊ぉ濡�

�뚮젅�댁뼱 - 0
�� - 10
�� - 11
�쇱� - 12
�� - 13
�묐� - 14
二쇰� - 15
踰꾩꽢�� - 16
醫�鍮� - 32
�щ━�� - 33
�ㅼ펷�덊넠 - 34
嫄곕� - 35
醫�鍮꾪뵾洹몃㎤ - 36
�щ씪�� - 37
�붾뜑留� - 38
醫�踰뚮젅 - 39
�⑥뼱吏� �꾩씠�� - 64
�먰솕�� TNT - 65
�⑥뼱吏��� 釉붾윮 - 66
�붿궡 - 80
�섏졇吏� �덈뜦�� - 81
�섏졇吏� �ш� - 82
洹몃┝ - 83
留덉씤移댄듃 - 84



Entity.getRenderType�� �곗씠�� �뷀떚�� �뚮뜑留겶좏��� �꾩씠�붋좊ぉ濡�

�щ챸�� - 0
�щ챸�� - 1
�덊븯�� 釉붾줉혻- 2
�뚮젅�댁뼱 - 3
�낃� - 4
�� - 5
�� - 6
踰꾩꽢�� - 7
�쇱� - 8
�� - 9
�묐� - 10
二쇰� - 11
�щ챸�붋�-혻12
醫�鍮꽷�- 13
�ㅼ펷�덊넠 - 14
嫄곕� - 15
醫�踰뚮젅 - 16
�щ━�� - 17
�щ씪�� - 18
�붾뜑留� - 19
�붿궡 - 20
�낃� - 21
�ш� - 22
�덈뜦�� - 23
�낃� - 24
�낃� - 25
留덉씤移댄듃 - 26



ChatColor �됯퉼 紐⑸줉

寃����� -혻ChatColor.BLACK
吏숈� �뚮��� -혻ChatColor.DARK_BLUE
吏숈�혻珥덈줉�� -혻ChatColor.DARK_GREEN
吏숈�혻泥�줉�� -혻ChatColor.DARK_AQUA
�붿쟻��-혻ChatColor.DARK_RED
�대몢�� 蹂대씪�� -혻ChatColor.DARK_PURPLE
湲덉깋 -혻ChatColor.GOLD
�뚯깋 -혻ChatColor.GRAY
吏숈� �뚯깋 -혻ChatColor.DARK_GRAY
�뚮��� -혻ChatColor.BLUE
珥덈줉�됀잺hatColor.GREEN
泥�줉�� -혻ChatColor.AQUA
鍮④컙�� -혻ChatColor.RED
諛앹� 蹂대씪�� -혻ChatColor.LIGHT_PURPLE
�몃��� -혻ChatColor.YELLOW
�섏��� -혻ChatColor.WHITE



Block.getRenderType�� �곗씠�� 釉붾윮 �뚮뜑留겶좏��� �꾩씠�붋좊ぉ濡�

�쒖��� - (-1)
�쇰컲�곸씤 �뺤쑁癒쇱껜 釉붾윮, ��씤 ��, �몃옪�꾩뼱,혻耳��댄겕, �묓꽭 移댄렖혻- 0
�ы깢�섏닔, 1移� �붾뵒, 嫄곕�以�, 1移맞좉퀬�щ━혻- 1
�좎튂 - 2
遺� - 3
�좎껜 - 4
�띿옉臾� - 6
臾� - 7
�щ떎由� - 8
�덉씪 - 9
怨꾨떒 - 10
�섎Т혻�명�由� - 11
�좎씤�� - 13
移⑤� - 14
�좊━��, 泥좏뙋혻- 18
�⑷뎬 - 20
�명�由� 臾� - 21
李쎄퀬 - 22
由대━�⑤뱶 - 23
�붾뜑 �ы깉 - 26
�섎Т, 嫄댁큹 �붾� �� �놁쑝濡� �뺥옄 �� �덈뒗 釉붾윮혻- 31
�� �명�由� - 32
2移� �붾뵒瑜� �ы븿�� 紐⑤뱺 2移몄쭨由� �앸Ъ혻- 40
�꾩뿉 �곸� �뚮뜑留� 1�� �ㅼ뼱媛�吏��딅뒗혻紐⑤뱺혻1移몄쭨由� �앸Ъ, 洹좊쪟혻- 65



Items.meta 遺덊븘�뷀븳 臾몄옄�� ��젣蹂�

apple
apple_golden
arrow
axe
bed
beef_cooked
beef_raw
blaze_powder
blaze_rod
boat
bone
book_enchanted
book_normal
book_writable
book_written
boots
bowl
bow_pulling
bow_standby
bread
brewing_stand
brick
bucket
cake
carrot
carrot_golden
carrot_on_a_stick
beetroot
cauldron
charcoal
chestplate
chicken_cooked
chicken_raw
clay_ball
coal
comparator
cookie
diamond
diamond_horse_armor
door_iron
door_wood
dye_powder
egg
emerald
empty_armor_slot_boots
empty_armor_slot_chestplate
empty_armor_slot_helmet
empty_armor_slot_leggings
ender_eye
ender_pearl
experience_bottle
feather
fireball
fireworks
fireworks_charge
fireworks_charge_overlay
fishing_rod_cast
fishing_rod_uncast
fish_cooked
fish_raw
flint
flint_and_steel
flower_pot
ghast_tear
glowstone_dust
gold_horse_armor
gold_ingot
gold_nugget
gunpowder
helmet
hoe
hopper
iron_horse_armor
iron_ingot
item_frame
lead
leather
leggings
magma_cream
map_empty
map_filled
melon
melon_speckled
minecart_chest
minecart_furnace
minecart_hopper
minecart_normal
minecart_tnt
mushroom_stew
beetroot_soup
name_tag
netherbrick
nether_star
nether_wart
painting
paper
pickaxe
porkchop_cooked
porkchop_raw
potato
potato_baked
potato_poisonous
potion_bottle_drinkable
potion_bottle_empty
potion_bottle_splash
potion_overlay
pumpkin_pie
quartz
quiver
record_11
record_13
record_blocks
record_cat
record_chirp
record_far
record_mall
record_mellohi
record_stal
record_strad
record_wait
record_ward
redstone_dust
reeds
repeater
rotten_flesh
ruby
saddle
seeds_melon
seeds_pumpkin
seeds_wheat
seeds_beetroot
shears
shovel
sign
skull_creeper
skull_skeleton
skull_steve
skull_wither
skull_zombie
slimeball
snowball
spawn_egg
spider_eye
spider_eye_fermented
stick
string
sugar
sword
wheat
clock_item
compass_item



Terrain.meta 遺덊븘�뷀븳 臾몄옄�� ��젣蹂�

grass
stone
cobblestone
cobblestone_mossy
stonebrick
bedrock
obsidian
clay
sand
sandstone
gravel
dirt
planks
stone_slab
brick
tnt
bookshelf
web
flower
flower
double_plant_bottom
double_plant_top
double_plant_carried
sunflower_additional
sapling
log
log
iron_block
gold_block
diamond_block
coal_block
lapis_block
emerald_block
redstone_block
quartz_block
mushroom_red
mushroom_brown
gold_ore
iron_ore
coal_ore
lapis_ore
diamond_ore
redstone_ore
emerald_ore
quartz_ore
tallgrass
crafting_table
furnace
stonecutter
sponge
glass
leaves
leaves_opaque
leaves
leaves_opaque
mob_spawner
snow
ice
ice_packed
cactus
reeds
jukebox_side
jukebox_top
waterlily
mycelium
torch_on
redstone_torch_on
redstone_torch_off
door
ladder
trapdoor
iron_bars
farmland
wheat
lever
pumpkin
netherrack
nether_brick
nether_wart
soul_sand
glowstone
piston_top_sticky
piston_top_normal
piston_side
piston_inner
piston_bottom
melon
melon_stem
pumpkin_stem
rail_normal
rail_normal_turned
rail_golden
rail_golden_powered
rail_detector
rail_detector_powered
rail_activator
rail_activator_powered
bed
cauldron_top
cauldron_inner
cauldron_side
cauldron_bottom
brewing_stand_base
brewing_stand
cake_bottom
cake_inner
cake_top
cake_side
mushroom_block
vine
repeater_off
repeater_on
glass_pane_top
end_stone
endframee
redstone_dust_cross
redstone_dust_cross_overlay
redstone_dust_line
redstone_dust_line_overlay
redstone_lamp_off
redstone_lamp_on
enchanting_table_bottom
enchanting_table_side
enchanting_table_top
dragon_egg
hayblock
cocoa
trip_wire
trip_wire_source
command_block
itemframe_background
flower_pot
carrots
potatoes
beetroot
anvil_top_damaged_x
reactor_core
glowing_obsidian
destroy
chest_inventory
missing_tile
wool
hardened_clay
stained_clay
fire
still_water
still_lava
flowing_water
flowing_lava
*/