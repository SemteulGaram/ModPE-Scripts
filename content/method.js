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
var FILE_SD_CARD = android.os.Environment.getExternalStorageDirectory();
var FILE_MOD_DIR = new java.io.File(FILE_SD_CARD, "games/com.mojang/minecraftpe/mods");
var FILE_MAIN_DIR = new java.io.File(FILE_MOD_DIR, className);
var FILE_FONT = new java.io.File(FILE_MOD_DIR, "minecraft.ttf");
var FILE_MAIN_DATA = new java.io.File(FILE_MAIN_DIR, "setting.json");
var FILE_TEST_DATA = new java.io.File(FILE_MAIN_DIR, "lastLog.txt");
var FILE_NO_MEDIA = new java.io.File(FILE_MAIN_DIR, ".nomedia");
function FILE_MAP_DIR() {return new java.io.File(FILE_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function FILE_MAP_DATA() {return new java.io.File(FILE_MAP_DIR(), className + ".json")}
if(!(FILE_MAIN_DIR.exists())) {
	FILE_MAIN_DIR.mkdirs();
	FILE_NO_MEDIA.createNewFile();
}
if(!(FILE_MAIN_DATA.exists())) {
	FILE_MAIN_DATA.createNewFile();
}
var DIP = PIXEL * loadData(FILE_MAIN_DATA, "DIPS");
if(DIP == null || DIP == 0){
	DIP = PIXEL;
}



var Byte = java.lang.Byte;
var Int = java.lang.Integer;
var Float = java.lang.Float;
var Double = java.lang.Double;
var Boolean = java.lang.Boolean;
var Long = java.lang.Long;
var Short = java.lang.Short;
var File = java.io.File;
var Context = android.content.Context;
var Activity = android.app.Activity;
var Handler = android.os.Handler
var Thread = java.lang.Thread;
var Runnable = java.lang.Runnable;
var Process = android.os.Process;
var AlertDialog = android.app.AlertDialog;
var View = android.view.View;
var ViewGroup = android.view.ViewGroup;
var MotionEvent = android.view.MotionEvent;
var Gravity = android.view.Gravity;
var FrameLayout = android.widget.FrameLayout;
var RelativeLayout = android.widget.RelativeLayout;
var LinearLayout = android.widget.LinearLayout;
var ScrollView = android.widget.ScrollView;
var HorizontalScrollView = android.widget.HorizontalScrollView;
var TextView = android.widget.TextView;
var Button = android.widget.Button;
var ImageView = android.widget.ImageView;
var ImageButton = android.widget.ImageButton;
var EditText = android.widget.EditText;
var ProgressBar = android.widget.ProgressBar;
var SeekBar = android.widget.SeekBar;
var NumberPicker = android.widget.NumberPicker;
var PopupWindow = android.widget.PopupWindow;
var Drawable = android.graphics.drawable;
var StateListDrawable = android.graphics.drawable.StateListDrawable;
var GradientDrawable = android.graphics.drawable.GradientDrawable;
var BitmapDrawable = android.graphics.drawable.BitmapDrawable;
var ColorDrawable = android.graphics.drawable.ColorDrawable;
var ClipDrawable = android.graphics.drawable.ClipDrawable;
var LayerDrawable = android.graphics.drawable.LayerDrawable;
var Bitmap = android.graphics.Bitmap;
var BitmapFactory = android.graphics.BitmapFactory;
var Color = android.graphics.Color;
var Canvas = android.graphics.Canvas;
var Paint = android.graphics.Paint;
var Path = android.graphics.Path;
var Shader = android.graphics.Shader;
var Matrix = android.graphics.Matrix;
var Typeface = android.graphics.Typeface;
var ArrayList = java.util.ArrayList;
var Calendar = java.util.Calendar;
var GregorianCalendar = java.util.GregorianCalendar;
var MediaPlayer = android.media.MediaPlayer;

var c = {};
c.m = ViewGroup.LayoutParams.MATCH_PARENT;
c.w = ViewGroup.LayoutParams.WRAP_CONTENT;
c.a = java.lang.reflect.Array.newInstance;
c.r = RelativeLayout;
c.l = LinearLayout;
c.p = android.util.TypedValue.COMPLEX_UNIT_PX;
c.s = net.zhuoweizhang.mcpelauncher.ScriptManager;
c.ww = ctx.getWindowManager().getDefaultDisplay().getWidth();
c.wh = ctx.getWindowManager().getDefaultDisplay().getHeight();
c.d = ctx.getWindow().getDecorView();



function NinePatchAssetCreator(pixel, width, height, scale, left, top, right, bottom) {
	this.pixel = pixel;
	this.rawBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
	this.rawBitmap.setPixels(this.pixel, 0, width, 0, 0, width, height);
	this.scaleBitmap = Bitmap.createScaledBitmap(this.rawBitmap, width*scale, height*scale, false);
	this.ninePatch = function() {return ninePatch1(this.scaleBitmap, (top*(scale-1))+1, (left*(scale-1))+1, bottom*scale, right*scale)}
}



var Assets = {};
//DO NOT USE(TEXTURE PACK MISSING)
Assets.mcpeCPC = ctx.createPackageContext("com.mojang.minecraftpe", Context.CONTEXT_IGNORE_SECURITY);
Assets.mcpe = Assets.mcpeCPC.getAssets();
//spritesheet.png
try{
	Assets.mcpeSS = ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png");
}catch(e) {
	//old version
	Assets.mcpeSS = mcpeAssets.open("images/gui/spritesheet.png");
}
Assets.mcpeSS_BF = BitmapFactory.decodeStream(Assets.mcpeSS);
//touchgui.png
try {
	Assets.mcpeTG = ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png");
}catch(e) {
	Assets.mcpeTG = mcpeAssets.open("images/gui/touchgui.png");
}
Assets.mcpeTG_BF = BitmapFactory.decodeStream(Assets.mcpeTG);

Assets.fullBackground_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 0, 0, 16, 16);
Assets.fullBackground = Bitmap.createScaledBitmap(Assets.fullBackground_raw, PIXEL*32, PIXEL*32, false);
Assets.fullBackground_9 = function() {return ninePatch1(Assets.fullBackground, PIXEL*12, PIXEL*12, PIXEL*24, PIXEL*24)}

Assets.background_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 34, 43, 14, 14);
Assets.background = Bitmap.createScaledBitmap(Assets.background_raw, PIXEL*28, PIXEL*28, false);
Assets.background_9 = function() {return ninePatch1(Assets.background, PIXEL*12, PIXEL*12, PIXEL*22, PIXEL*22)}

Assets.title_left_raw = Bitmap.createBitmap(Assets.mcpeTG_BF, 150, 26, 2, 25);
Assets.title_left_pixel = new c.a(Int.TYPE, 50);
Assets.title_right_raw = Bitmap.createBitmap(Assets.mcpeTG_BF, 162, 26, 2, 25);
Assets.title_right_pixel = new c.a(Int.TYPE, 50);
Assets.title_center_raw = Bitmap.createBitmap(Assets.mcpeTG_BF, 153, 26, 8, 25);
Assets.title_center_pixel = new c.a(Int.TYPE, 200);
Assets.title_bottom_raw = Bitmap.createBitmap(Assets.mcpeTG_BF, 153, 52, 8, 3);
Assets.title_bottom_pixel = new c.a(Int.TYPE, 24);
Assets.title_left_raw.getPixels(Assets.title_left_pixel, 0, 2, 0, 0, 2, 25);
Assets.title_right_raw.getPixels(Assets.title_right_pixel, 0, 2, 0, 0, 2, 25);
Assets.title_center_raw.getPixels(Assets.title_center_pixel, 0, 8, 0, 0, 8, 25);
Assets.title_bottom_raw.getPixels(Assets.title_bottom_pixel, 0, 8, 0, 0, 8, 3);
Assets.title_pixel = margeArray(Assets.title_left_pixel, Assets.title_center_pixel, "HORIZONTAL", 2, 25, 8, 25, null);
Assets.title_pixel = margeArray(Assets.title_pixel, Assets.title_right_pixel, "HORIZONTAL", 10, 25, 2, 25, null);
Assets.title_pixel = margeArray(Assets.title_pixel, Assets.title_bottom_pixel, "VERTICAL", 12, 25, 8, 3, null);
Assets.title_raw = Bitmap.createBitmap(12, 28, Bitmap.Config.ARGB_8888);
Assets.title_raw.setPixels(Assets.title_pixel, 0, 12, 0, 0, 12, 28);
Assets.title = Bitmap.createScaledBitmap(Assets.title_raw, PIXEL*24, PIXEL*56, false);
Assets.title_9 = function() {
	return ninePatch1(Assets.title, PIXEL*5, PIXEL*5, PIXEL*46, PIXEL*20);
}

Assets.exit_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 60, 0, 18, 18);
Assets.exit = Bitmap.createScaledBitmap(Assets.exit_raw, 18*PIXEL, 18*PIXEL, false);
Assets.exit_9 = function() {return ninePatch1(Assets.exit, PIXEL*6, PIXEL*6, PIXEL*30, PIXEL*30)}

Assets.exitClick_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 78, 0, 18, 18);
Assets.exitClick = Bitmap.createScaledBitmap(Assets.exitClick_raw, PIXEL*36, PIXEL*36, false);
Assets.exitClick_9 = function() {return ninePatch1(Assets.exitClick, PIXEL*6, PIXEL*6, PIXEL*32, PIXEL*32)}

Assets.button_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,8,32,8,8);
Assets.button = Bitmap.createScaledBitmap(Assets.button_raw, PIXEL*16, PIXEL*16, false);
Assets.button_9 = function() {return ninePatch1(Assets.button, PIXEL*6, PIXEL*4, PIXEL*14, PIXEL*14)}

Assets.buttonClick_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,0,32,8,8);
Assets.buttonClick = Bitmap.createScaledBitmap(Assets.buttonClick_raw, PIXEL*16, PIXEL*16, false);
Assets.buttonClick_9 = function() {return ninePatch1(Assets.buttonClick, PIXEL*4, PIXEL*4, PIXEL*12, PIXEL*14)}

Assets.miniButton_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,8,33,8,7);
Assets.miniButton = Bitmap.createScaledBitmap(Assets.miniButton_raw, PIXEL*16, PIXEL*14, false);
Assets.miniButton_9 = function() {return ninePatch1(Assets.miniButton, PIXEL*2, PIXEL*2, PIXEL*12, PIXEL*14)}

Assets.miniButtonClick_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,0,32,8,7);
Assets.miniButtonClick = Bitmap.createScaledBitmap(Assets.miniButtonClick_raw, PIXEL*16, PIXEL*14, false);
Assets.miniButtonClick_9 = function() {return ninePatch1(Assets.miniButtonClick, PIXEL*4, PIXEL*4, PIXEL*12, PIXEL*12)}


var b = Color.parseColor("#6b6163");
var i = Color.parseColor("#3a393a");
Assets.textView_pixel = [
b,b,b,b,b,b,
b,b,b,b,b,b,
b,b,i,i,b,b,
b,b,i,i,b,b,
b,b,b,b,b,b,
b,b,b,b,b,b
];
Assets.textView_raw = Bitmap.createBitmap(6, 6, Bitmap.Config.ARGB_8888);
Assets.textView_raw.setPixels(Assets.textView_pixel, 0, 6, 0, 0, 6, 6);
Assets.textView = Bitmap.createScaledBitmap(Assets.textView_raw, PIXEL*6, PIXEL*6, false);
Assets.textView_9 = function() {return ninePatch1(Assets.textView, PIXEL*3, PIXEL*3, PIXEL*4, PIXEL*4)}

Assets.bg32 = Bitmap.createScaledBitmap(BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/bg32.png")), PIXEL*64, PIXEL*64, false);



function mcText(str, size, hasShadow, color, shadowColor, width, height, padding, margins) {
	var tv = new TextView(ctx);
	tv.setTransformationMethod(null);
	tv.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	if(FILE_FONT.exists()) {
		tv.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	};
	if(str !== null && str !== undefined) {
		tv.setText((str + ""));
	}
	if(size !== null && size !== undefined) {
		tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, size);
	}else {
		tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*0x10);
	}
	if(color !== null && color !== undefined) {
		tv.setTextColor(color);
	}else {
		tv.setTextColor(Color.WHITE);
	}
	if(hasShadow) {
		if(shadowColor !== null && shadowColor !== undefined) {
			tv.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, shadowColor);
		}else {
			tv.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, Color.DKGRAY);
		}
	}
	if(padding !== null && padding !== undefined) {
		tv.setPadding(padding[0], padding[1], padding[2], padding[3]);
	}
	var tv_p;
	if(width !== null && height !== null && width !== undefined && height !== undefined) {
		tv_p = new c.l.LayoutParams(width, height);
	}else {
		tv_p = new c.l.LayoutParams(c.w, c.w);
	}
	if(margins !== null && margins !== undefined) {
		tv_p.setMargins(margins[0], margins[1], margins[2], margins[3]);
	}
	tv.setLayoutParams(tv_p);
	return tv;
}

function mcButton(str, size, hasShadow, color, shadowColor, width, height, padding, margins, background, onTouchFunction, onClickFunction, onLongClickFunction) {
	var btn = new Button(ctx);
	btn.setTransformationMethod(null);
	btn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	if(FILE_FONT.exists()) {
		btn.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	};
	if(str !== null && str !== undefined) {
		btn.setText((str + ""));
	}
	if(size !== null && size !== undefined) {
		btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, size);
	}else {
		btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*0x10);
	}
	if(color !== null && color !== undefined) {
		btn.setTextColor(color);
	}else {
		btn.setTextColor(Color.WHITE);
	}
	if(hasShadow) {
		if(shadowColor !== null && shadowColor !== undefined) {
			btn.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, shadowColor);
		}else {
			btn.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, Color.DKGRAY);
		}
	}
	if(padding !== null && padding !== undefined) {
		btn.setPadding(padding[0], padding[1], padding[2], padding[3]);
	}
	var btn_p;
	if(width !== null && height !== null && width !== undefined && height !== undefined) {
		btn_p = new c.l.LayoutParams(width, height);
	}else {
		btn_p = new c.l.LayoutParams(c.w, c.w);
	}
	if(margins !== null && margins !== undefined) {
		btn_p.setMargins(margins[0], margins[1], margins[2], margins[3]);
	}
	btn.setLayoutParams(btn_p);
	if(background !== null && background !== undefined) {
		btn.setBackgroundDrawable(background);
	}else {
		//btn.setBackgroundDrawable(Assets.button_9());
	}
	if(onTouchFunction !== null && onTouchFunction !== undefined) {
		btn.setOnTouchListener(View.OnTouchListener({onTouch: function(view, event) {try {
			return onTouchFunction(view, event);
		}catch(e) {
			showError(e, WarnType.WARNING);
			return false;
		}}}));
	}
	if(onClickFunction !== null && onClickFunction !== undefined) {
		btn.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
			onClickFunction(view, event);
		}catch(e) {
			showError(e, WarnType.WARNING);
		}}}));
	}
	if(onLongClickFunction !== null && onLongClickFunction !== undefined) {
		btn.setOnLongClickListener(View.OnLongClickListener({onLongClick: function(view, event) {try {
			return onLongClickFunction(view, event);
		}catch(e) {
			showError(e, WarnType.WARNING);
			return false;
		}}}));
	}
	return btn;
}



/**
 * Error report
 *
 * @since 2015-04
 * @author CodeInside
 *
 * @param {error} e
 */

function showError(e) {
	if(Level.getWorldName() === null) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
	android.widget.Toast.makeText(ctx, "[" + className + " ERROR LINE: " + e.lineNumber + "]" + "\n" + e, android.widget.Toast.LENGTH_LONG).show();
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



/**
 * Download file
 *
 * @since 2015-01
 * @author CodeInside
 * 
 * @param <File> path
 * @param <String> url
 * @param <ProgressBar|Null> progressBar
 */

function downloadFile(path, url, progressBar) {
	try{
		var tempApiUrl = new java.net.URL(url);
		var tempApiUrlConn = tempApiUrl.openConnection();
		tempApiUrlConn.connect();
		var tempBis = new java.io.BufferedInputStream(tempApiUrl.openStream());
		if(progressBar !== null) {
			progressBar.setMax(tempApiUrlConn.getContentLength());
		}
		var tempFos = new java.io.FileOutputStream(path);
		var tempData = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
		var tempTotal = 0, tempCount;
		while ((tempCount = tempBis.read(tempData)) != -1) {
			tempFos.write(tempData, 0, tempCount);
			tempTotal += tempCount;
			if(progressBar !== null) {
				progressBar.setProgress(tempTotal);
			}
		}
		tempFos.flush();
		tempFos.close();
		tempBis.close();
		return true;
	}catch(e){
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
 * @since 2015-04
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
//Copyright® 2015 affogatoman(colombia2)
//==============================
/**
 * Nine Patch
 *
 * @since 2015
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
 * Marge Array
 *
 * @since 2015-06
 * @author CodeInside
 *
 * @param (Array) arr1
 * @param (Array) arr2
 * @param (String) margeType <HORIZONTAL, VERTICAL>
 * @param (Int) width1
 * @param (Int) height1
 * @param (Int) width2
 * @param (Int) height2
 * @param (...) fillBlank
 * @return (Array) 
 */
function margeArray(arr1, arr2, margeType, width1, height1, width2, height2, fillBlank) {
	var arr = [];
	switch(margeType) {
		case "HORIZONTAL":
			var maxHeight = height1 >= height2 ? height1 : height2;
			for(var e = 0; e < maxHeight; e++) {
				if(e < height1) {
					for(var f = 0; f < width1; f++) {
						arr.push(arr1[(e*width1) + f]);
					}
				}else {
					for(var f = 0; f < width1; f++) {
						if(fillBlank === null) {
							arr.push(arr1[(width1*(height1-1)) + f]);
						}else {
							arr.push(fillBlank);
						}
					}
				}
				if(e < height2) {
					for(var f = 0; f < width2; f++) {
						arr.push(arr2[(e*width2) + f]);
					}
				}else {
					for(var f = 0; f < width2; f++) {
						if(fillBlank === null) {
							arr.push(arr2[(width2*(height2-1)) + f]);
						}else {
							arr.push(fillBlank);
						}
					}
				}
			}
			break;
		case "VERTICAL":
			var maxWidth = width1 >= width2 ? width1 : width2;
			for(var e = 0; e < height1 + height2; e++) {
				for(var f = 0; f < maxWidth; f++) {
					if(e < height1) {
						if(f < width1) {
							arr.push(arr1[(e*width1) + f]);
						}else {
							if(fillBlank === null) {
								arr.push(arr1[((e+1)*width1) - 1]);
							}else {
								arr.push(fillBlank);
							}
						}
					}else {
						if(f < width2) {
							arr.push(arr2[((e-height1)*width2) + f]);
						}else {
							if(fillBlank === null) {
								arr.push(arr2[((e-height1+1)*width2) - 1]);
							}else {
								arr.push(fillBlank);
							}
						}
					}
				}
			}
			break;
		default:
			print("Unknown margeType: " + margeType);
	}
	return arr;
}

/**
 * Vector(x, y, z) to Side(yaw, pitch)
 *
 * @since 2015-01
 * @author ToonRaOn
 */

function vectorToYaw(x, y, z) {
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
}

function vectorToPitch(x, y, z) {
	return -1 * Math.atan(y / Math.sqrt(Math.pow(x, 2)+Math.pow(z, 2))) * 180 / Math.PI;
}



/**
 * Side(yaw, pitch) to Vector(x, y, z)
 *
 * @since 2015-01
 * @author CodeInside
 */

function sideToX(y, p) {
	return (-1 * Math.sin(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
}

function sideToY(y, p) {
	return (Math.sin(-p / 180 * Math.PI));
}

function sideToZ(y, p) {
	return (Math.cos(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
}



/**
 * Absolute range x, y, z
 *
 * @since 2015-01
 * @author CodeInside
 */

function absX(x, y, z) {
	return x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
}

function absY(x, y, z) {
	return y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
}

function absZ(x, y, z) {
	return z / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
}



/**
 * save/load JSON
 *
 * @since 2015-09
 * @author CodeInside
 */

function loadJSON(file) {
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return false;
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	try {
		var r = JSON.parse(bufferedReader.readLine());
	}catch(e) {
		var r = false;
	}
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	return r;
}

function saveJSON(file, array) {
	try {
		var fileOutputStream = new java.io.FileOutputStream(file);
		var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
		outputStreamWriter.write(JSON.stringify(array));
		outputStreamWriter.close();
		fileOutputStream.close();
	}catch(e) {
		return false;
	}
	return true;
}



/**
 * save/load Data
 *
 * @since 2015-02
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
 * @since 2015-04
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



var EntityExtra = {};

EntityExtra.isEqual = function(obj1, obj2) {
	return Entity.getUniqueId(obj1) === Entity.getUniqueId(obj2);
}

EntityExtra.findEnt = function(uniqId) {
	var list = EntityExtra.getAll();
	var max = list.length;
	for(var e = 0; e < max; e++) {
		if(uniqId === Entity.getUniqueId(list[e])) {
			return list[e];
		}
	}
}

EntityExtra.getAll = function() {
	var a = net.zhuoweizhang.mcpelauncher.ScriptManager.allentities;
	var entities = new Array(a.size());
		for(var n = 0; entities.length > n; n++){
			entities[n] = a.get(n);
		}
		return entities;
}

EntityExtra.getRange = function(obj1, obj2) {try {
	return Math.sqrt(Math.pow(Entity.getX(obj1) - Entity.getX(obj2), 2) + Math.pow(Entity.getY(obj1) - Entity.getY(obj2), 2) + Math.pow(Entity.getZ(obj1) - Entity.getZ(obj2), 2));
}catch(e) {
	return null;
}};



var PlayerExtra = {};

PlayerExtra.isOnline = function(player) {
	var list = EntityExtra.getAll();
	for(var e = 0; e < list.length; e++) {
		if(Player.isPlayer(list[e]) && EntityExtra.isEqual(list[e], player)) {
			return true;
		}
	}
	return false;
}

PlayerExtra.getOnlinePlayers = function() {
	var entitys = EntityExtra.getAll();
	var list = [];
	for(var e = 0; e < entitys.length; e++) {
		if(Player.isPlayer(entitys[e])) {
			list.push(entitys[e]);
		}
	}
	return list;
}

PlayerExtra.getPlayer = function(name) {
	var list = EntityExtra.getAll();
	for(var e = 0; e < list.length; e++) {
		if(Player.isPlayer(list[e]) && Player.getName(list[e]).toLowerCase() === name.toLowerCase()) {
			return list[e];
		}
	}
	return false;
}

PlayerExtra.getNearPlayers = function() {
	var a = EntityExtra.getAll();
	var f = [];
	var r = [];
	var n = [];
	for(var e = 0; e < a.length; e++) {
		if(Player.isPlayer(a[e]) && !EntityFix.isEqual(a[e], Player.getEntity())) {
			f.push(a[e]);
			r.push(EntityExtra.getRange(a[e], Player.getEntity()));
		}
	}
	while(r.length > 0) {
		var i = r.indexOf(Math.min.apply(null, r));
		n.push(f[i]);
		f.splice(i, 1);
		r.splice(i, 1);
	}
	return n;
}



/**
 * NumberToString
 *
 * @since 2015-09
 * @author CodeInside
 */
 
function numberToString(number) {
	number = number + "";
	try{
		var t = number.split(".");
		var r1 = t[0].split("");
		var r2 = t[1];
	}catch(e) {
		var r1 = number.split("");
		var r2 = undefined;
	}
	var r3 = "";
	while(r1.length > 0) {
		if(r1.length > 3) {
			r3 = r1.pop() + r3;
			r3 = r1.pop() + r3;
			r3 = "," + r1.pop() + r3;
		}else {
			r3 = r1.pop() + r3;
		}
	}
	if(r2 === undefined) {
		return r3;
	}else {
		return r3 + "." + r2;
	}
}



/**
 * DataSizeToString
 *
 * @since 2015-09
 * @author CodeInside
 */
 
function dataSizeToString(size) {
	if(size < 1000) {
		return size + "B";
	}else if(size < 1024000) {
		return parseInt(Math.round(size*100/1024), 10)/100 + "KB";
	}else if(size < 1048576000) {
		return parseInt(Math.round(size*100/1048576), 10)/100 + "MB";
	}else if(size < 1073741824000) {
		return parseInt(Math.round(size*100/1073741824), 10)/100 + "GB";
	}else if(size < 1099511627776000) {
		return parseInt(Math.round(size*100/1099511627776), 10)/100 + "TB";
	}else {
		return numberToString(parseInt(Math.round(size*100/(1099511627776*1024)), 10)/100) + "PB";
	}
}



function randomId() {
	return parseInt(Math.floor(Math.random() * 0xffffff));
}



function coordinatify(type, value) {
	switch(type) {
		case 0:
		return parseInt(Math.floor(value));
		case 1:
		if(value < 0x00) {
			return 0x00;
		}else if(value > 0xff) {
			return 0xff;
		} 
		default:
		return value;
	}
}



/**
 * View Side
 *
 * @since 2015-04
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
 * @since 2015-04
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
	return status == android.os.BatteryManager.BATTERY_STATUS_FULL;
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
		case android.os.BatteryManager.BATTERY_HEALTH_UNKNOWNLURE:
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

VL.onVisibilityChanged = function(visible, type, size, audioSessionID) {
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
 * Stereo BGS
 *
 * @since 2015-06
 * @author CodeInside
 *
 * @param (Int|Null) x
 * @param (Int|Null) y
 * @param (Int|Null) z
 * @param (Object|Null) ent
 * @param (File) file <music>
 * @param (Int) range <0~>
 * @param (Float) airResistanse <0~1>
 * @param (Float) vol <0~1>
 * @param (Boolean) loop
 * @param (Function|Null) stopFunc
 */
//IT IS VERY UNSTABLR, IT NEED A TEST

var bgsData = [];

function bgs(x, y, z, ent, file, range, airResistance, vol, loop, stopFunc) {try {
	var controler = android.media.MediaPlayer();
	controler.setDataSource(file.getAbsolutePath());
	controler.setLooping(loop);
	if(ent !== null) {
		x = Entity.getX(ent);
		y = Entity.getY(ent);
		z = Entity.getZ(ent);
	}
	var v = bgsMeasure(x, y, z, range, airResistance);
	controler.setVolume(v[0]*vol, v[1]*vol);
	controler.prepare();
	controler.start();
	bgsData.push({x: x, y: y, z: z, ent: ent, ct: controler, file: file, session: controler.getAudioSessionId(), vol: vol, range: range, airResistance: airResistance, loop: loop, stopFunc: stopFunc});
}catch(e) {
	showError(e);
}}

function bgsManager() {try {
	for(var e = 0; e < bgsData.length; e++) {
		if(!bgsData[e].ct.isPlaying()) {
			bgsData[e].ct.release();
			bgsData.splice(e, 1);
			continue;
		}
		if(bgsData[e].stopFunc !== null && bgsData[e].stopFunc(e)) {
			bgsData[e].ct.stop();
			bgsData[e].ct.release();
			bgsData.splice(e, 1);
			continue;
		}
		if(bgsData[e].ent !== null && Entity.getHealth(bgsData[e].ent) <= 0) {
			 bgsData[e].ent = null;
		}
		if(bgsData[e].ent !== null) {
			bgsData[e].x = Entity.getX(bgsData[e].ent);
			bgsData[e].y = Entity.getY(bgsData[e].ent);
			bgsData[e].z = Entity.getZ(bgsData[e].ent);
		}
		var v = bgsMeasure(bgsData[e].x, bgsData[e].y, bgsData[e].z, bgsData[e].range, bgsData[e].airResistance);
		bgsData[e].ct.setVolume(v[0]*bgsData[e].vol, v[1]*bgsData[e].vol);
	}
}catch(e) {
	showError(e);
}}

function stereoL(x, y, z, power) {
	var e = locToYaw(Player.getX() - x, Player.getY() - y, Player.getZ() - z);
	var t = e - Entity.getYaw(Player.getEntity()) + 180 - 10;
	if(t > 0) {
		t %= 360;
	}else {
		while(t < 0) {
			t += 360;
		}
	}
	if(t >= 0 && t <= 180) {
		return 1 - (Math.sin(t*Math.PI/180)/power);
	}else {
		return 1;
	}
}

function stereoR(x, y, z, power) {
	var e = locToYaw(Player.getX() - x, Player.getY() - y, Player.getZ() - z);
	var t = e - Entity.getYaw(Player.getEntity()) + 180 - 170;
	if(t > 0) {
		t %= 360;
	}else {
		while(t < 0) {
			t += 360;
		}
	}
	if(t >= 0 && t <= 180) {
		return 1 - (Math.sin(t*Math.PI/180)/power);
	}else {
		return 1;
	}
}

function bgsMeasure(x, y, z, range, airResistance) {
	var distance = Math.sqrt(Math.pow(Player.getY() - y, 2) + Math.pow(Player.getX() - x, 2) + Math.pow(Player.getZ() - z, 2));
	if(distance < range) {
		return [stereoL(x, y, z, 3 * (range/distance)), stereoR(x, y, z, 3 * (range/distance))];
	}else {
		if(Math.sqrt(distance - range) * airResistance > 1.2) {
			return [0, 0];
		}
		var l = stereoL(x, y, z, 3) - (Math.sqrt(distance - range) * airResistance);
		var r = stereoR(x, y, z, 3) - (Math.sqrt(distance - range) * airResistance);
		if(l < 0) {
			l = 0;
		}
		if(r < 0) {
			r = 0;
		}
		return [l, r];
	}
}

/*
function bgsR(x, y, z, range, airResistance) {
	var distance = Math.sqrt(Math.pow(Player.getY() - y, 2) + Math.pow(Player.getX() - x, 2) + Math.pow(Player.getZ() - z, 2));
	if(distance < range) {
		return stereoR(x, y, z, 3 * (range/distance));
	}else {
		if(Math.sqrt(distance - range) * power > 1) {
			return 0;
		}
		var r = stereoR(x, y, z, 3) - (Math.sqrt(distance - range) * airResistance);
		if(r < 0) {
			return 0;
		}
		return r;
	}
}
*/



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



function priceToString(price) {
	
}

function dataSizeToString(size) {
	if(size < 1000) {
		return size + "B";
	}else if(size < 1024000) {
		return parseInt(Math.round(size*100/1024), 10)/100 + "KB";
	}else if(size < 1048576000) {
		return parseInt(Math.round(size*100/1048576), 10)/100 + "MB";
	}else if(size < 1073741824000) {
		return parseInt(Math.round(size*100/1073741824), 10)/100 + "GB";
	}else if(size < 1099511627776000) {
		return parseInt(Math.round(size*100/1099511627776), 10)/100 + "TB";
	}else {
		return parseInt(Math.round(size*100/(1099511627776*1024)), 10)/100 + "PB";
	}
}

/*
android.os.Process.setThreadPriority(android.os.Process.THREAD_PRIORITY_BACKGROUND);
*/

/*
Level.addParticle에 쓰이는 파티클 목록

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

 

Level.playSound에 쓰이는 소리파일 목록

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



Entity.getEntityTypeId에 쓰이는 엔티티 타입 아이디 목록

플레이어 - 0
닭 - 10
소 - 11
돼지 - 12
양 - 13
늑대 - 14
주민 - 15
버섯소 - 16
좀비 - 32
크리퍼 - 33
스켈레톤 - 34
거미 - 35
좀비피그맨 - 36
슬라임 - 37
엔더맨 - 38
좀벌레 - 39
떨어진 아이템 - 64
점화된 TNT - 65
떨어지는 블럭 - 66
화살 - 80
던져진 눈덩이 - 81
던져진 달걀 - 82
그림 - 83
마인카트 - 84



Entity.getRenderType에 쓰이는 엔티티 렌더링 타입 아이디 목록

투명화 - 0
투명화 - 1
새하얀 블록 - 2
플레이어 - 3
팅김 - 4
닭 - 5
소 - 6
버섯소 - 7
돼지 - 8
양 - 9
늑대 - 10
주민 - 11
투명화 - 12
좀비 - 13
스켈레톤 - 14
거미 - 15
좀벌레 - 16
크리퍼 - 17
슬라임 - 18
엔더맨 - 19
화살 - 20
팅김 - 21
달걀 - 22
눈덩이 - 23
팅김 - 24
팅김 - 25
마인카트 - 26



ChatColor 색깔 목록

검은색 - ChatColor.BLACK
짙은 파란색 - ChatColor.DARK_BLUE
짙은 초록색 - ChatColor.DARK_GREEN
짙은 청록색 - ChatColor.DARK_AQUA
암적색- ChatColor.DARK_RED
어두운 보라색 - ChatColor.DARK_PURPLE
금색 - ChatColor.GOLD
회색 - ChatColor.GRAY
짙은 회색 - ChatColor.DARK_GRAY
파란색 - ChatColor.BLUE
초록색 ChatColor.GREEN
청록색 - ChatColor.AQUA
빨간색 - ChatColor.RED
밝은 보라색 - ChatColor.LIGHT_PURPLE
노란색 - ChatColor.YELLOW
하얀색 - ChatColor.WHITE



Block.getRenderType에 쓰이는 블럭 렌더링 타입 아이디 목록

표지판 - (-1)
일반적인 정육먼체 블럭, 덮인 눈, 트랩도어, 케이크, 양털 카펫 - 0
사탕수수, 1칸 잔디, 거미줄, 1칸 고사리 - 1
토치 - 2
불 - 3
유체 - 4
농작물 - 6
문 - 7
사다리 - 8
레일 - 9
계단 - 10
나무 울타리 - 11
선인장 - 13
침대 - 14
유리판, 철판 - 18
덩굴 - 20
울타리 문 - 21
창고 - 22
릴리패드 - 23
엔더 포탈 - 26
나무, 건초 더미 등 옆으로 눕힐 수 있는 블럭 - 31
돌 울타리 - 32
2칸 잔디를 포함한 모든 2칸짜리 식물 - 40
위에 적은 렌더링 1에 들어가지않는 모든 1칸짜리 식물, 균류 - 65



Items.meta 불필요한 문자열 삭제본

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



Terrain.meta 불필요한 문자열 삭제본

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