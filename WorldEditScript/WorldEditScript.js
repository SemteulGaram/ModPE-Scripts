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

const CLASS_NAME = "WorldEditScript";
//Season . Release Number . Commits 
const VERSION = "0.0.1";
const VERSION_CODE = 100;

var TAG = "[" + "WES" + " " + VERSION + "] ";

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var PIXEL = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
var FILE_SD_CARD = android.os.Environment.getExternalStorageDirectory();
var FILE_MOD_DIR = new java.io.File(FILE_SD_CARD, "games/com.mojang/minecraftpe/mods");
var FILE_MAIN_DIR = new java.io.File(FILE_MOD_DIR, CLASS_NAME);
var FILE_FONT = new java.io.File(FILE_MOD_DIR, "minecraft.ttf");
var FILE_MAIN_DATA = new java.io.File(FILE_MAIN_DIR, "setting.json");
var FILE_TEST_DATA = new java.io.File(FILE_MAIN_DIR, "lastLog.txt");
var FILE_NO_MEDIA = new java.io.File(FILE_MAIN_DIR, ".nomedia");
function FILE_MAP_DIR() {return new java.io.File(FILE_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function FILE_MAP_DATA() {return new java.io.File(FILE_MAP_DIR(), CLASS_NAME + ".json")}
if(!(FILE_MAIN_DIR.exists())) {
	FILE_MAIN_DIR.mkdirs();
	FILE_NO_MEDIA.createNewFile();
}
var DIP = PIXEL * loadData(FILE_MAIN_DATA, "DIPS");
if(DIP == null || DIP == 0){
	DIP = PIXEL;
}
var onMap = false;



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



var ScriptColor = {
	normal: Color.parseColor("#aea9d1"),
	normalLight: Color.parseColor("#cdcae1"),
	normalDark: Color.parseColor("#7b7992"),
	warning: Color.parseColor("#f5dfb5"),
	warningLight: Color.parseColor("#faf8c4"),
	warningDark: Color.parseColor("#ab9f7c"),
	critical: Color.parseColor("#e6858f"),
	criticalLight: Color.parseColor("#f7b1b5"),
	criticalDark: Color.parseColor("#ca7d7a"),
	highlight: Color.parseColor("#b1b0ea")
};


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

var p = ScriptColor.normalLight;
var o = ScriptColor.normal;
var i = ScriptColor.normalDark;
Assets.boxNormal = new NinePatchAssetCreator([
p,p,p,p,p,o,
p,p,p,p,o,i,
p,p,o,o,i,i,
p,p,o,o,i,i,
p,o,i,i,i,i,
o,i,i,i,i,i
], 6, 6, PIXEL*2, 3, 3, 4, 4);

var p = ScriptColor.warningLight;
var o = ScriptColor.warning;
var i = ScriptColor.warningDark;
Assets.boxWarning = new NinePatchAssetCreator([
p,p,p,p,p,o,
p,p,p,p,o,i,
p,p,o,o,i,i,
p,p,o,o,i,i,
p,o,i,i,i,i,
o,i,i,i,i,i
], 6, 6, PIXEL*2, 3, 3, 4, 4);

var p = ScriptColor.criticalLight;
var o = ScriptColor.critical;
var i = ScriptColor.criticalDark;
Assets.boxCritical = new NinePatchAssetCreator([
p,p,p,p,p,o,
p,p,p,p,o,i,
p,p,o,o,i,i,
p,p,o,o,i,i,
p,o,i,i,i,i,
o,i,i,i,i,i
], 6, 6, PIXEL*2, 3, 3, 4, 4);

var p = ScriptColor.normalLight;
var o = ScriptColor.normal;
var i = ScriptColor.normalDark;
var u = Color.argb(0x55, 0, 0, 0);
Assets.windowNormal = new NinePatchAssetCreator([
p,p,p,p,p,p,p,p,o,
p,o,o,o,o,o,o,o,i,
p,o,o,o,o,o,o,o,i,
p,o,o,i,i,o,o,o,i,
p,o,o,i,u,p,o,o,i,
p,o,o,o,p,p,o,o,i,
p,o,o,o,o,o,o,o,i,
p,o,o,o,o,o,o,o,i,
o,i,i,i,i,i,i,i,i
], 9, 9, PIXEL*4, 5, 5, 5, 5);

var p = ScriptColor.warningLight;
var o = ScriptColor.warning;
var i = ScriptColor.warningDark;
var u = Color.argb(0x55, 0, 0, 0);
Assets.windowWarning = new NinePatchAssetCreator([
p,p,p,p,p,p,p,p,o,
p,o,o,o,o,o,o,o,i,
p,o,o,o,o,o,o,o,i,
p,o,o,i,i,o,o,o,i,
p,o,o,i,u,p,o,o,i,
p,o,o,o,p,p,o,o,i,
p,o,o,o,o,o,o,o,i,
p,o,o,o,o,o,o,o,i,
o,i,i,i,i,i,i,i,i
], 9, 9, PIXEL*4, 5, 5, 5, 5);

var p = ScriptColor.criticalLight;
var o = ScriptColor.critical;
var i = ScriptColor.criticalDark;
var u = Color.argb(0x55, 0, 0, 0);
Assets.windowCritical = new NinePatchAssetCreator([
p,p,p,p,p,p,p,p,o,
p,o,o,o,o,o,o,o,i,
p,o,o,o,o,o,o,o,i,
p,o,o,i,i,o,o,o,i,
p,o,o,i,u,p,o,o,i,
p,o,o,o,p,p,o,o,i,
p,o,o,o,o,o,o,o,i,
p,o,o,o,o,o,o,o,i,
o,i,i,i,i,i,i,i,i
], 9, 9, PIXEL*4, 5, 5, 5, 5);

var p = Color.WHITE;
Assets.wesButton = new NinePatchAssetCreator([
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,p,p,0,0,0,
], 8, 8, PIXEL*2, 4, 4, 5, 5);

var p = Color.WHITE;
var o = ScriptColor.highlight;
Assets.wesButtonClick = new NinePatchAssetCreator([
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,o,o,0,0,0,
0,0,0,p,p,0,0,0,
], 8, 8, PIXEL*2, 4, 4, 5, 5);

var p = ScriptColor.normal;
var o = Color.argb(0x55, 0, 0, 0);
Assets.toastNormal = new NinePatchAssetCreator([
p,p,p,
p,o,p,
p,p,p
], 3, 3, PIXEL*2, 2, 2, 2, 2);

var p = ScriptColor.warning;
Assets.toastWarning = new NinePatchAssetCreator([
p,p,p,
p,o,p,
p,p,p
], 3, 3, PIXEL*2, 2, 2, 2, 2);

var p = ScriptColor.critical;
Assets.toastCritical = new NinePatchAssetCreator([
p,p,p,
p,o,p,
p,p,p
], 3, 3, PIXEL*2, 2, 2, 2, 2);



function mcpeText(size, text, shadow) {
	var tv = new TextView(ctx);
	tv.setTransformationMethod(null);
	tv.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	if(shadow) {
		tv.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, Color.DKGRAY);
	}
	tv.setTextColor(Color.WHITE);
	tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, size);
	if(FILE_FONT.exists()) {
		tv.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	};
	tv.setPadding(0, 0, 0, 0);
	tv.setText(text);
	return tv;
}

function mcpeButton(size, text) {
	var btn = new Button(ctx);
	btn.setTransformationMethod(null);
	btn.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
	btn.setPadding(DIP*8, DIP*8, DIP*8, DIP*8);
	btn.setText(text);
	btn.setTextColor(Color.WHITE);
	btn.setTextSize(c.p, size);
	btn.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, Color.DKGRAY);
	if(FILE_FONT.exists()) {
		btn.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	}
	btn.setBackgroundDrawable(Assets.button_9());
	
	btn.setOnTouchListener(View.OnTouchListener({onTouch: function(view, event) {try {
		switch(event.action) {
			case MotionEvent.ACTION_DOWN:
			view.setBackgroundDrawable(Assets.buttonClick_9());
			view.setTextColor(Color.parseColor("#ffff50"));
			view.setPadding(DIP*8, DIP*12, DIP*8, DIP*8);
			break;
			case MotionEvent.ACTION_CANCEL:
			case MotionEvent.ACTION_UP:
			view.setBackgroundDrawable(Assets.button_9());
			view.setTextColor(Color.WHITE);
			view.setPadding(DIP*8, DIP*8, DIP*8, DIP*8);
			break;
		}
		return false;
	}catch(e) {
		showError(e);
		return false;
	}}}));
	
	return btn;
}

function mcpeDialog(title, layout, btnName, btnFunc, btn2Name, btn2Func) {
	var l = new c.r(ctx);
	l.setId(randomId());
	l.setBackgroundDrawable(Assets.background_9());
	
	var t = new c.r(ctx);
	t.setId(randomId());
	t.setBackgroundDrawable(Assets.title_9());
	t.setPadding(DIP*8, DIP*8, DIP*8, DIP*14);
	var t_p = new c.r.LayoutParams(c.m, c.w);
	t_p.addRule(c.r.ALIGN_PARENT_TOP, l.getId());
	t.setLayoutParams(t_p);
	
	var tt = mcpeText(DIP*32, title, true);
	var tt_p = new c.r.LayoutParams(c.w, c.w);
	tt_p.addRule(c.r.CENTER_IN_PARENT, t.getId());
	tt.setLayoutParams(tt_p);
	t.addView(tt);
	
	var tb = mcpeButton(DIP*16, btn2Name);
	var tb_p = new c.r.LayoutParams(DIP*70, DIP*34);
	tb_p.setMargins(0, 0, 0, 0);
	tb_p.addRule(c.r.ALIGN_PARENT_LEFT, t.getId());
	tb_p.addRule(c.r.ALIGN_PARENT_TOP, t.getId());
	tb.setLayoutParams(tb_p);
	t.addView(tb);
	
	var ta = mcpeButton(DIP*16, btnName);
	var ta_p = new c.r.LayoutParams(DIP*70, DIP*34);
	ta_p.setMargins(0, 0, 0, 0);
	ta_p.addRule(c.r.ALIGN_PARENT_RIGHT, t.getId());
	ta_p.addRule(c.r.ALIGN_PARENT_TOP, t.getId());
	ta.setLayoutParams(ta_p);
	t.addView(ta);
	
	var ct = new ScrollView(ctx);
	var ct_p = new c.r.LayoutParams(c.m, c.m);
	ct_p.setMargins(DIP*8, 0, DIP*8, DIP*8);
	ct_p.addRule(c.r.BELOW, t.getId());
	ct.setLayoutParams(ct_p);
	ct.addView(layout);
	
	l.addView(t);
	l.addView(ct);
	
	var w = new PopupWindow(l, DIP*300, DIP*240, false);
	
	uiThread(function() {try {
		w.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER, 0, 0);
		tb.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		w.dismiss();
		btn2Func();
	}catch(e) {
		showError(e);
	}}}));
	
	ta.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		w.dismiss();
		btnFunc();
	}catch(e) {
		showError(e);
	}}}));
	
	}catch(e) {
		showError(e);
	}});
}

function mcText(str, size, hasShadow, color, shadowColor, width, height, padding, margins) {
	var tv = new TextView(ctx);
	tv.setTransformationMethod(null);
	tv.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	if(FILE_FONT.exists()) {
		tv.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	};
	tv.setText(str);
	if(size === null) {
		tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*0x10);
	}else {
		tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, size);
	}
	if(color === null) {
		tv.setTextColor(Color.WHITE);
	}else {
		tv.setTextColor(color);
	}
	if(hasShadow) {
		if(shadowColor !== null) {
			tv.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, shadowColor);
		}else {
			tv.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, Color.DKGRAY);
		}
	}
	if(padding !== null) {
		tv.setPadding(padding[0], padding[1], padding[2], padding[3]);
	}
	var tv_p;
	if(width !== null && height !== null) {
		tv_p = new c.r.LayoutParams(width, height);
	}else {
		tv_p = new c.r.LayoutParams(c.w, c.w);
	}
	if(margins !== null) {
		tv_p.setMargins(margins[0], margins[1], margins[2], margins[3]);
	}
	tv.setLayoutParams(tv_p);
	return tv;
}

function mcButton(str, size, hasShadow, color, shadowColor, width, height, padding, margins, onTouchFunction, onClickFunction, onLongClickFunction) {
	
}



/**
 * Error report
 *
 * @since 2015-04
 * @author CodeInside
 *
 * @param {error} e
 */
 
var WarnType = {
 	RECOVERABLE: 0,
 	WARNING: 1,
 	CRITICAL: 2
};

function showError(e, type) {try {
	switch(type) {
		case WarnType.RECOVERABLE:
		var typeStr = "<Recoverable>";
		var typeColor = ChatColor.DARK_GRAY;
		break;
		case WarnType.WARNING:
		var typeStr = "<Warning>";
		var typeColor = ChatColor.RED;
		break;
		case WarnType.CRITICAL:
		var typeStr = "<Critical>";
		var typeColor = ChatColor.DARK_RED;
		break;
		case undefined:
		var typeStr = "<Unknown>";
		var typeColor = ChatColor.DARK_RED;
		break;
		default:
		var typeStr = "[" + type + "]";
		var typeColor = "";
	}
	
	if(!(onMap)) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
	android.widget.Toast.makeText(ctx, typeStr + " [" + CLASS_NAME + " ERROR LINE: " + e.lineNumber + "]" + "\n" + e, android.widget.Toast.LENGTH_LONG).show();
		}}));
	}else {
		var t = (e + "").split(" ");
		var c = "";
		var temp = "";
		for(var l = 0; l < t.length; l++) {
			if(temp.split("").length > 30) {
				c += ("\n" + typeColor);
				temp = "";
			}
			c += t[l] + " ";
			temp += t[l];
		}
		clientMessage(typeColor + typeStr + " [" + CLASS_NAME + " ERROR LINE: " + e.lineNumber + "]\n" + typeColor + c);
	}
}catch(e) {
	print("FATAL ERROR " + e.lineNumber + "\n" + e);
}};



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
	if(onMap) {
		net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat(ChatColor.YELLOW + TAG + str);
	}else {
		toast(TAG + str);
	}
	//clientMessage(ChatColor.YELLOW + /*"<" + Player.getName(Player.getEntity()) + "> + "*/ TAG + str);
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
 * Vecto(x, y, z) to Side(yaw, pitch)
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
 * Vector3
 *
 * @since 2015-09
 * @author CodeInside
 */
	
function Vector3(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

Vector3.prototype = {
	
	toString: function() {
		return "[Vector3 " + this.x + ":" + this.y + ":" + this.z + "]";
	},
	
	getX: function() {
		return this.x;
	},
	
	getY: function() {
		return this.y;
	},
	
	getZ: function() {
		return this.z;
	}
}



/**
 * Block
 *
 * @since 2015-09
 * @author CodeInside
 */
 
function Block(id, data, x, y, z) {
	this.id = id;
	this.data = data;
	this.x = x;
	this.y = y;
	this.z = z;
}

Block.prototype = {
	
	toString: function() {
		return "[Block " + this.id + ":" + this.data + "]";
	},
	
	getId: function() {
		return this.id;
	},
	
	getData: function() {
		return this.data;
	},
	
	getX: function() {
		return this.x;
	},
	
	getY: function() {
		return this.y;
	},
	
	getZ: function() {
		return this.z;
	}
}



/**
 * BlockImageLoader
 *
 * @author affogatoman
 * @since 2015-7-12
 */

/**
 * @namespace
 */
BlockTypes = {
    CUBE: 0,
    STAIR: 1,
    SLAB: 2,
    SNOW: 3,
    CARPET: 4,
    TRAPDOOR: 5,
    FENCE: 6,
    PATHGRASS: 7,
    STONEWALL: 8
};

/**
 * @namespace
 */
var BlockImageLoader = {};

BlockImageLoader.TGA = null;

BlockImageLoader.META = null;

BlockImageLoader.META_MAPPED = null;

/**
 * @param {Bitmap} tga
 */
BlockImageLoader.init = function(tga) {
    if(tga instanceof android.graphics.Bitmap)
        BlockImageLoader.TGA = tga;
    
    if(BlockImageLoader.META == null)
        BlockImageLoader.META = eval(new java.lang.String(ModPE.getBytesFromTexturePack("images/terrain.meta"))+'');
        
    if(BlockImageLoader.META_MAPPED == null)
        BlockImageLoader.META_MAPPED = BlockImageLoader.META.map(function(e) {
            return e.name;
        });
        
    if(BlockImageLoader.TGA == null)
        BlockImageLoader.TGA = net.zhuoweizhang.mcpelauncher.texture.tga.TGALoader.load(ModPE.openInputStreamFromTexturePack("images/terrain-atlas.tga"), false);
};

/**
 * @param {String} name
 * @param {Number} data
 * @returns {Bitmap}
 */
BlockImageLoader.getBlockBitmap = function(name, data) {
    if(BlockImageLoader.META_MAPPED.indexOf(name) < 0)
        return android.graphics.Bitmap.createBitmap(1, 1, android.graphics.Bitmap.Config.RGB_565);
    var uvs = BlockImageLoader.META[BlockImageLoader.META_MAPPED.indexOf(name)].uvs[data];
    var x = uvs[0]*BlockImageLoader.TGA.getWidth();
    var y = uvs[1]*BlockImageLoader.TGA.getHeight();
    var width = uvs[2]*BlockImageLoader.TGA.getWidth()-x;
    width = Math.ceil(width);
    var height = uvs[3]*BlockImageLoader.TGA.getHeight()-y;
    height = Math.ceil(height);
    return android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(BlockImageLoader.TGA, x, y, width, height), 32, 32, false);
};

/**
 * Make cube-shaped image with three images
 * 
 * @param {Array} left
 * @param {Array} right
 * @param {Array} top
 * @param {Number} renderType
 * @param {Boolean} hasNoShadow
 * @returns {Bitmap}
 */
BlockImageLoader.create = function(left, right, top, renderType, hasNoShadow) {
    if(BlockImageLoader.TGA == null || BlockImageLoader.META == null)
        throw new Error("BlockImageLoader hasn't been initialized");
    
    if(!Array.isArray(left) || !Array.isArray(right) || !Array.isArray(top))
        throw new Error("Illegal argument type");
    
    var temp = android.graphics.Bitmap.createBitmap(51, 57, android.graphics.Bitmap.Config.ARGB_8888);
    left = BlockImageLoader.getBlockBitmap(left[0], left[1]);
    right = BlockImageLoader.getBlockBitmap(right[0], right[1]);
    top = BlockImageLoader.getBlockBitmap(top[0], top[1]);
    
    switch(renderType) {
        case BlockTypes.CUBE:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 32);
            break;
        
        case BlockTypes.STAIR:
            temp = BlockImageLoader.createStair(left, right, top, temp, hasNoShadow);
            break;
        
        case BlockTypes.SLAB:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 16);
            break;
        
        case BlockTypes.SNOW:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 4);
            break;
        
        case BlockTypes.CARPET:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 2);
            break;
        
        case BlockTypes.TRAPDOOR:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 6);
            break;
            
        case BlockTypes.FENCE:
            temp = BlockImageLoader.createFence(left, right, top, temp, hasNoShadow);
            break;
            
        case BlockTypes.PATHGRASS:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 30);
            break;
            
        case BlockTypes.STONEWALL:
            temp = BlockImageLoader.createWall(left, right, top, temp, hasNoShadow);
            break;
        
        default:
            temp = android.graphics.Bitmap.createScaledBitmap(left, 64, 64, false);
            break;
    }
    
    return temp;
};

/**
 * @param {Bitmap} left
 * @param {Bitmap} right
 * @param {Bitmap} top
 * @param {Bitmap} temp
 * @param {Boolean} hasNoShadow
 * @param {Number} height
 * @returns {Bitmap}
 */
BlockImageLoader.createCube = function(left, right, top, temp, hasNoShadow, height) {
    var createCubeLeft = function(src) {
        src = android.graphics.Bitmap.createBitmap(src, 0, 32-height, 32, height);
        src = android.graphics.Bitmap.createScaledBitmap(src, 25, height, false);
        var mSrc = [0, 0, 25, 0, 25, height, 0, height];
        var mDst = [0, 0, 25, 12, 25, 12+height, 0, height];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(mSrc, 0, mDst, 0, 4);
        return android.graphics.Bitmap.createBitmap(src, 0, 0, src.getWidth(), src.getHeight(), mtrx, false);
    };
    
    var createCubeRight = function(src) {
        src = android.graphics.Bitmap.createBitmap(src, 0, 32-height, 32, height);
        src = android.graphics.Bitmap.createScaledBitmap(src, 26, height, false);
        var mSrc = [0, 0, 26, 0, 26, height, 0, height];
        var mDst = [0, 12, 26, 0, 26, height, 0, 12+height]
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(mSrc, 0, mDst, 0, 4);
        return android.graphics.Bitmap.createBitmap(src, 0, 0, src.getWidth(), src.getHeight(), mtrx, false);
    };
    
    var createCubeTop = function(src) {
        var mSrc = [0, 0, 32, 0, 32, 32, 0, 32];
        var mDst = [0, 13.5, 25, 0, 51, 13.5, 25, 26];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(mSrc, 0, mDst, 0, 4);
        return android.graphics.Bitmap.createBitmap(src, 0, 0, src.getWidth(), src.getHeight(), mtrx, false);
    };
    
    left = createCubeLeft(left);
    right = createCubeRight(right);
    top = createCubeTop(top);
    
    var canv = new android.graphics.Canvas(temp);
    var p = new android.graphics.Paint();
    if(hasNoShadow != false)
        p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-65, 255-65, 255-65), android.graphics.PorterDuff.Mode.MULTIPLY));
    canv.drawBitmap(left, 0, temp.getHeight()-left.getHeight(), p);
    if(hasNoShadow != false)
        p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
    canv.drawBitmap(right, 25, temp.getHeight()-right.getHeight(), p);
    canv.drawBitmap(top, 0, 32-height, null);
    return temp;
};

/**
 * @param {Bitmap} left
 * @param {Bitmap} right
 * @param {Bitmap} top
 * @param {Bitmap} temp
 * @param {Boolean} hasNoShadow
 * @returns {Bitmap}
 */
BlockImageLoader.createStair = function(left, right, top, temp, hasNoShadow) {
    var createLeft = function(left) {
        left = android.graphics.Bitmap.createScaledBitmap(left, 25, 32, false);
        var src = [0, 0, 25, 0, 25, 32, 0, 32];
        var dst = [0, 0, 25, 12, 25, 44, 0, 32];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        return android.graphics.Bitmap.createBitmap(left, 0, 0, left.getWidth(), left.getHeight(), mtrx, false);
    };
    
    var createRight = function(right) {
        right = android.graphics.Bitmap.createScaledBitmap(right, 26, 32, false);
        var first = android.graphics.Bitmap.createBitmap(right, 0, 0, 26, 16);
        var src = [0, 0, 26, 0, 26, 16, 0, 16];
        var dst = [0, 13, 26, 0, 26, 16, 0, 29];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        first = android.graphics.Bitmap.createBitmap(first, 0, 0, first.getWidth(), first.getHeight(), mtrx, false);
        
        var second = android.graphics.Bitmap.createBitmap(right, 0, 16, 26, 16);
        second = android.graphics.Bitmap.createBitmap(second, 0, 0, second.getWidth(), second.getHeight(), mtrx, false);
        
        return [first, second];
    };
    
    var createTop = function(top) {
        top = android.graphics.Bitmap.createScaledBitmap(top, 32, 32, false);
        var first = android.graphics.Bitmap.createBitmap(top, 0, 0, 32, 16);
        var src = [0, 0, 32, 0, 32, 16, 0, 16];
        var dst = [0, 13.5, 26, 0, 38.25, 6.5, 12.75, 19.5];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        first = android.graphics.Bitmap.createBitmap(first, 0, 0, first.getWidth(), first.getHeight(), mtrx, false);
        
        var second = android.graphics.Bitmap.createBitmap(top, 0, 16, 32, 16);
        second = android.graphics.Bitmap.createBitmap(second, 0, 0, second.getWidth(), second.getHeight(), mtrx, false);
        
        return [first, second];
    };
    
    left = createLeft(left);
    right = createRight(right);
    top = createTop(top);
    
    var canvas = new android.graphics.Canvas(temp);
    var p = new android.graphics.Paint();
    if(hasNoShadow != false)
        p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-65, 255-65, 255-65), android.graphics.PorterDuff.Mode.MULTIPLY));
    canvas.drawBitmap(left, 0, temp.getHeight()-left.getHeight(), p);
    if(hasNoShadow != false)
        p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
    canvas.drawBitmap(right[0], 13, 6, p);
    canvas.drawBitmap(right[1], 25, temp.getHeight()-right[1].getHeight(), p);
    canvas.drawBitmap(top[0], 0, 0, null);
    canvas.drawBitmap(top[1], 13, 22, null);
    
    return temp;
};

/**
 * @param {Bitmap} left
 * @param {Bitmap} right
 * @param {Bitmap} top
 * @param {Bitmap} temp
 * @param {Boolean} hasNoShadow
 * @returns {Bitmap}
 */
BlockImageLoader.createFence = function(left, right, top, temp, hasNoShadow) {
    var createVert = function(left, right, top) {
        left = android.graphics.Bitmap.createBitmap(left, 12, 0, 8, 32);
        left = android.graphics.Bitmap.createScaledBitmap(left, 6, 32, false);
        var src = [0, 0, 6, 0, 6, 32, 0, 32];
        var dst = [0, 0, 6, 3, 6, 35, 0, 32];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        left = android.graphics.Bitmap.createBitmap(left, 0, 0, left.getWidth(), left.getHeight(), mtrx, false);
        
        right = android.graphics.Bitmap.createBitmap(right, 12, 0, 8, 32);
        right = android.graphics.Bitmap.createScaledBitmap(right, 6, 32, false);
        src = [0, 0, 6, 0, 6, 32, 0, 32];
        dst = [0, 3, 6, 0, 6, 32, 0, 35];
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        right = android.graphics.Bitmap.createBitmap(right, 0, 0, right.getWidth(), right.getHeight(), mtrx, false);
        
        top = android.graphics.Bitmap.createBitmap(top, 12, 12, 8, 8);
        top = android.graphics.Bitmap.createScaledBitmap(top, 6, 6, false);
        src = [0, 0, 6, 0, 6, 6, 0, 5];
        dst = [0, 3, 6.5, 0, 12, 3, 3, 6.5];
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        top = android.graphics.Bitmap.createBitmap(top, 0, 0, top.getWidth(), top.getHeight(), mtrx, false);
        
        var temp = android.graphics.Bitmap.createBitmap(12, 38, android.graphics.Bitmap.Config.ARGB_8888);
        var canvas = new android.graphics.Canvas(temp);
        var p = android.graphics.Paint();
        if(hasNoShadow != false)
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-65, 255-65, 255-65), android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(left, 0, 3, p);
        if(hasNoShadow != false)
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(right, 6, 3, p);
        canvas.drawBitmap(top, 0, 0, null);
        
        return temp;
    };
    
    var createHorz = function(left, right, top, type) {
        left = android.graphics.Bitmap.createBitmap(left, 0, 2+type*16, 32, 4);
        var src = [0, 0, 32, 0, 32, 4, 0, 4];
        var dst = [0, 0, 32, 16, 32, 20, 0, 4];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        left = android.graphics.Bitmap.createBitmap(left, 0, 0, left.getWidth(), left.getHeight(), mtrx, false);
        
        right = android.graphics.Bitmap.createBitmap(right, 15, 2+type*16, 3, 4);
        src = [0, 0, 3, 0, 3, 4, 0, 4];
        dst = [0, 2, 3, 0, 3, 4, 0, 6];
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        right = android.graphics.Bitmap.createBitmap(right, 0, 0, right.getWidth(), right.getHeight(), mtrx, false);
        
        top = android.graphics.Bitmap.createBitmap(top, 15, 0, 2, 32);
        top = android.graphics.Bitmap.createScaledBitmap(top, 2, 35, false);
        src = [0, 0, 2, 0, 2, 35, 0, 35];
        dst = [0, 2, 5, 0, 35, 15, 32, 17];
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        top = android.graphics.Bitmap.createBitmap(top, 0, 0, top.getWidth(), top.getHeight(), mtrx, false);
        
        var temp = android.graphics.Bitmap.createBitmap(35, 22, android.graphics.Bitmap.Config.ARGB_8888);
        var canvas = new android.graphics.Canvas(temp);
        var p = android.graphics.Paint();
        if(hasNoShadow != false)
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-65, 255-65, 255-65), android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(left, 0, 2, p);
        if(hasNoShadow != false)
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(right, 32, 16, p);
        canvas.drawBitmap(top, 0, 1, null);
        
        return temp;
    };
    
    var vert = createVert(left, right, top);
    var horz1 = createHorz(left, right, top, 0);
    var horz2 = createHorz(left, right, top, 1);
    
    var canvas = new android.graphics.Canvas(temp);
    canvas.drawBitmap(vert, 10, 5, null);
    canvas.drawBitmap(vert, temp.getWidth()-vert.getWidth()-10, temp.getHeight()-vert.getHeight()-5, null);
    canvas.drawBitmap(horz1, 8, 6, null);
    canvas.drawBitmap(horz2, 8, 21, null);
    
    return temp;
};

/**
 * @param {Bitmap} left
 * @param {Bitmap} right
 * @param {Bitmap} top
 * @param {Bitmap} temp
 * @param {Boolean} hasNoShadow
 * @returns {Bitmap}
 */
BlockImageLoader.createWall = function(left, right, top, temp, hasNoShadow) {
    var createVert = function(left, right, top) {
        left = android.graphics.Bitmap.createBitmap(left, 8, 0, 16, 32);
        left = android.graphics.Bitmap.createScaledBitmap(left, 13, 32, false);
        var src = [0, 0, 13, 0, 13, 32, 0, 32];
        var dst = [0, 0, 13, 6, 13, 38, 0, 32];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        left = android.graphics.Bitmap.createBitmap(left, 0, 0, left.getWidth(), left.getHeight(), mtrx, false);
        
        right = android.graphics.Bitmap.createScaledBitmap(right, 13, 32, false);
        src = [0, 0, 13, 0, 13, 32, 0, 32];
        dst = [0, 6, 13, 0, 13, 32, 0, 38];
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        right = android.graphics.Bitmap.createBitmap(right, 0, 0, right.getWidth(), right.getHeight(), mtrx, false);
        
        top = android.graphics.Bitmap.createBitmap(top, 8, 8, 16, 16);
        top = android.graphics.Bitmap.createScaledBitmap(top, 13, 13, false);
        src = [0, 0, 13, 0, 13, 13, 0, 13];
        dst = [0, 6.5, 13.5, 0, 26, 6.5, 13.5, 13];
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        top = android.graphics.Bitmap.createBitmap(top, 0, 0, top.getWidth(), top.getHeight(), mtrx, false);
        
        var temp = android.graphics.Bitmap.createBitmap(26, 44, android.graphics.Bitmap.Config.ARGB_8888);
        var canvas = new android.graphics.Canvas(temp);
        var p = new android.graphics.Paint();
        if(hasNoShadow != false)
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-65, 255-65, 255-65), android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(left, 0, 6, p);
        if(hasNoShadow != false)
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(right, 13, 6, p);
        canvas.drawBitmap(top, 0, 0, null);
        
        return temp;
    };
    
    var createHorzRight = function(right) {
        right = android.graphics.Bitmap.createBitmap(right, 8, 8, 16, 24);
        right = android.graphics.Bitmap.createScaledBitmap(right, 11, 24, false);
        var src = [0, 0, 11, 0, 11, 24, 0, 24];
        var dst = [0, 6, 11, 0, 11, 24, 0, 30];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        right = android.graphics.Bitmap.createBitmap(right, 0, 0, right.getWidth(), right.getHeight(), mtrx, false);
        
        return right;
    };
    
    var createHorzTop = function(top) {
        top = android.graphics.Bitmap.createBitmap(top, 8, 0, 16, 32);
        var src = [0, 32, 0, 0, 16, 0, 16, 32];
        var dst = [0, 6.5, 11, 0, 21, 5, 10, 11.5];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        top = android.graphics.Bitmap.createBitmap(top, 0, 0, top.getWidth(), top.getHeight(), mtrx, false);
        
        return top;
    };
    
    var vert = createVert(left, right, top);
    var rightHorz = createHorzRight(right);
    var topHorz = createHorzTop(top);
    
    var canvas = new android.graphics.Canvas(temp);
    var p = new android.graphics.Paint();
    canvas.drawBitmap(vert, temp.getWidth()-vert.getWidth(), 0, null);
    if(hasNoShadow != false)
        p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
    canvas.drawBitmap(rightHorz, 26, 18, p);
    canvas.drawBitmap(topHorz, 16, 13, null);
    canvas.drawBitmap(vert, 0, temp.getHeight()-vert.getHeight(), null);
    
    return temp;
};

BlockImageLoader.init();



//======================
//WORLD EDIT SCRIPT SIDE
//======================

var WorkType = {
	SYNCHRONIZATION: 0,
	ASYNCHRONOUS: 1
}

var EditType = {
	FILL: 0,
	CLEAN: 1,
	REPLACE: 2,
	WALL: 3,
	SPHERE: 4,
	HEMISPHERE: 5,
	CIRCLE: 6,
	SEMICIRCLE: 7
}

var ContentType = {
	REDIRECT_MENU: 0,
	FUNCTION: 1,
	TOGGLE: 2
}

var MenuType = {
	MAIN: 0,
	EDIT: 1,
	TOOL: 2,
	INFO: 3,
	QUICK: 4,
	HELP: 5,
	SETTING: 6,
	CIRCULAR: 7
}

function WorldEditScript(setting) {
	this.TYPE = "ModPE_Script";
	this.CODE_NAME = "WorldEdit";
	this.VERSION = "0.0.1";
	this.VERSIONCODE = "101";
	this.AUTHOR = "CodeInside";
	this.GROUP = "if(team);";
	this.TAG = "[WES 0.0.1]";
	this.defaultSettingFile = new java.io.File(FILE_SD_CARD, "games/com.mojang/minecraftpe/mods/WorldEditScript/setting.json");
	if(setting instanceof File) {
		this.settingFile = setting;
	}else if(setting instanceof string) {
		this.settingFile = new File(setting);
	}else {
		this.settingFile = this.defaultSettingFile;
	}
	this.setting = null;
	this.defaultSetting = {
		ButtonX: c.ww - (DIP*0x30),
		ButtonY: c.wh - (DIP*0x30),
		ButtonVis: true,
		Whitelist: [],
		WorkType: WorkType.SYNCHRONIZATION,
		HollowCircular: false
	}
	this.editorGroup = new EditorGroup(this);
	this.button = null;
	this.buttonVis = false;
	this.menu = null;
	this.menuVis = false;
	this.menus = [];
	this.currentMenu = null;
	this.blockImages = null;
	this.blockImagesData = [];
	this.asynceBuffer = [];
	this._selectMenuVis = false;
	this._onMove = false;
	this._onWork = false;
	this._workTick = 200;
}

WorldEditScript.prototype = {
	
	toString: function() {
		return "[WorldEdit object]";
	},
	
	init: function() {
		this.editorGroup.init();
	},
	
	loadSetting: function() {
		if(this.settingFile.exists()) {
			this.setting = loadJSON(this.settingFile);
			if(this.setting === false || this.setting === null || this.setting === undefined || this.setting.toString() !== "[object Object]") {
				toast("MSG SETTING FILE CRASH");
				this.settingFile.delete();
				this.saveSetting();
			}
		}else {
			toast("MSG WELCOME");
			this.saveSetting();
		}
	},
	
	saveSetting: function() {
		if(!(this.settingFile.exists())) {
			this.settingFile.createNewFile();
			this.setting = this.defaultSetting;
		}
		if(!(saveJSON(this.settingFile, this.setting))) {
			clientMessage("MSG CAN'T SAVE");
		}
	},
	
	get: function(article) {
		if(this.setting === null) {
			this.loadSetting();
		}
		if(this.setting[article] === undefined) {
			msg("MSG SETTING FILE CRASH TRY TO RECOVER (" + article + ")");
			this.setting[article] = this.defaultSetting[article];
			return this.setting[article];
		}
		return this.setting[article];
	},
	
	set: function(article, value) {
		if(this.setting === null) {
			this.loadSetting();
		}
		if(this.setting[article] === undefined) {
			msg("WARNING system try to save undefined article '" + article + "'");
		}
		this.setting[article] = value;
	},
	
	isButtonVisible: function() {
		return this.buttonVis;
	},
	
	setButtonVisible: function(bool) {
		var that = this;
		if(bool) {
			if(!(this.buttonVis)) {
				if(this.button === null) {
					this.buildButton();
				}
				uiThread(function() {try {
					that.button.showAtLocation(c.d, Gravity.LEFT|Gravity.TOP, that.get("ButtonX"), that.get("ButtonY"));
					that.buttonVis = true;
				}catch(e) {
					showError(e, WarnType.CRITICAL);
				}});
			}else {
				return false;
			}
		}else {
			if(this.buttonVis) {
				uiThread(function() {try {
					that.button.dismiss();
					that.buttonVis = false;
				}catch(e) {
					showError(e, WarnType.CRITICAL);
				}});
			}else {
				return false;
			}
		}
	},
	
	isMenuVisible: function() {
		return this.menuVis;
	},
	
	setMenuVisible: function(bool) {
		var that = this;
		if(bool) {
			if(!(this.menuVis)) {
				if(this.menu === null) {
					this.buildMenu();
				}
				uiThread(function() {try {
					that.menu.showAtLocation(c.d, Gravity.RIGHT|Gravity.TOP, 0, 0);
					that.menuVis = true;
				}catch(e) {
					showError(e, WarnType.CRITICAL);
				}});
			}else {
				return false;
			}
		}else {
			if(this.menuVis) {
				uiThread(function() {try {
					that.menu.dismiss();
					that.menuVis = false;
				}catch(e) {
					showError(e, WarnType.CRITICAL);
				}});
			}else {
				return false;
			}
		}
	},
	
	buildButton: function() {
		var loading = new CustomProgressBar(0, 0);
		var that = this;
		var btn = new ImageButton(ctx);
		btn.setImageBitmap(BlockImageLoader.create(["piston_side", 0], ["piston_side", 0], ["piston_top_normal", 0], BlockTypes.CUBE, true));
		btn.setImageAlpha(0xaa);
		btn.setOnTouchListener(View.OnTouchListener({onTouch: function(view, event) {try {
			switch(event.action) {
				case MotionEvent.ACTION_DOWN:
  	   	that.relX = event.getX();
				that.relY = event.getY();
				that.absX = event.getRawX();
				that.absY = event.getRawY();
				that.viewX = that.absX - that.relX;
				that.viewY = that.absY - that.relY;
				that.width = that.button.getWidth();
				that.height = that.button.getHeight();
				break;
				case MotionEvent.ACTION_MOVE:
				if(that._onMove) {
					var x = event.getRawX() - that.absX + that.viewX;
					var y = event.getRawY() - that.absY + that.viewY;
					that.button.update(x, y, that.width, that.height);
				}
				break;
				case MotionEvent.ACTION_UP:
				if(that._onMove) {
					that._onMove = false;
					var x = event.getRawX() - that.absX + that.viewX;
					var y = event.getRawY() - that.absY + that.viewY;
					that.button.update(x, y, that.width, that.height);
					that.set("ButtonX", x);
					that.set("ButtonY", y);
					that.saveSetting();
				}
				break;
			}
		}catch(e) {
			showError(e, WarnType.RECOVERABLE);
		}
		return false;
		}}));
		btn.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
			if(!(that.menuVis) || that.currentMenu === null) {
				if(that.menu === null) {
					that.buildMenu();
				}
				that.setMenu(that.menus[MenuType.MAIN]);
				that.setMenuVisible(true);
			}
		}catch(e) {
			showError(e, WarnType.RECOVERABLE);
		}}}));
		btn.setOnLongClickListener(View.OnLongClickListener({onLongClick: function(view, event) {try {
			that._onMove = true;
		}catch(e) {
			showError(e, WarnType.RECOVERABLE);
		}
		return true;
		}}));
		this.buttonImage = btn;
		this.button = new PopupWindow(btn, DIP*0x30, DIP*0x30, false);
		this.buttonVis = false;
		loading.close();
	},
	
	buildMenu: function() {
		var that = this;
		var loading = new CustomProgressBar(0, 0);
		
		this.layout = new c.r(ctx);
		this.layout_d = new GradientDrawable();
		this.layout_d.setColor(Color.argb(0x80, 0x00, 0x00, 0x00));
		this.layout.setBackgroundDrawable(this.layout_d);
		this.title = new c.r(ctx);
		this.title.setId(randomId());
		this.title.setBackgroundDrawable(Assets.boxNormal.ninePatch());
		this.title_p = new c.r.LayoutParams(c.m, DIP*0x30);
		this.title.setLayoutParams(this.title_p);
		this.t_name = mcpeText(DIP*16, "", true);
		this.t_name_p = new c.r.LayoutParams(c.w, c.w);
		this.t_name_p.addRule(c.r.CENTER_IN_PARENT);
		this.t_name.setLayoutParams(this.t_name_p);
		this.title.addView(this.t_name);
	
		this.t_exit = new ImageView(ctx);
		this.t_exit_p = new c.r.LayoutParams(DIP*0x1c, DIP*0x1c);
		this.t_exit_p.setMargins(DIP*0x0a, DIP*0x0a, DIP*0x0a, DIP* 0x0a);
		this.t_exit_p.addRule(c.r.CENTER_VERTICAL);
		this.t_exit_p.addRule(c.r.ALIGN_PARENT_LEFT);
		this.t_exit.setLayoutParams(this.t_exit_p);
		this.t_exit.setBackgroundDrawable(Assets.boxNormal.ninePatch());
		this.t_exit.setOnClickListener(View.OnClickListener({onClick: function(view, event){ try{
			that.currentMenu.close();
		}catch(e) {
			showError(e);
		}}}));
		this.title.addView(this.t_exit);
		this.layout.addView(this.title);
	
		this.scroll = new ScrollView(ctx);
		this.scroll_p = new c.r.LayoutParams(c.m, c.m);
		this.scroll_p.addRule(c.r.BELOW, this.title.getId());
		this.scroll.setLayoutParams(this.scroll_p);
		this.layout.addView(this.scroll);
	
		this.menu = new PopupWindow(this.layout, DIP*0xf0, c.wh, false);
		
		
		
		this.menus[MenuType.MAIN] = new WES_Menu(this, "World Edit Script");
		
		
	
		this.menus[MenuType.EDIT] = new WES_Menu(this, "WorldEdit");
		this.menus[MenuType.MAIN].addMenu(ContentType.REDIRECT_MENU, "WorldEdit", this.menus[MenuType.EDIT]);
		
			this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "Give selection tool", function() {
			Entity.setCarriedItem(Player.getEntity(), 271, 1, 0);
			toasts("MSG GIVE TOOL");
		});
	
		this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "Set Pos1", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				toasts("MSG ERROR CANT FIND PLAYER");
				return;
			}
			var x = Math.floor(Player.getX());
			var y = Math.floor(Player.getY() - 1);
			var z = Math.floor(Player.getZ());
			editor.setPos1(new Vector3(x, y, z));
			toasts("MSG SET POS1");
		});
	
		this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "Set Pos2", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				toasts("MSG ERROR CANT FIND PLAYER");
				return;
			}
			var x = Math.floor(Player.getX());
			var y = Math.floor(Player.getY() - 1);
			var z = Math.floor(Player.getZ());
			editor.setPos2(new Vector3(x, y, z));
			toasts("MSG SET POS2");
		});
		
		this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "Set Block1", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				toasts("MSG ERROR CANT FIND PLAYER");
				return;
			}
			var t = new WES_BlockSelect(that, "Set Block1...", "Confirm", function(id, data) {
				editor.setBlock1(new Block(id, data));
				msg("MSG SET BLOCK1", editor.getOwner());
			}, "Cancel", function() {});
			t.setVisible(true);
		});
		
		this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "Set Block2", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				toasts("MSG ERROR CANT FIND PLAYER");
				return;
			}
			var t = new WES_BlockSelect(that, "Set Block2...", "Confirm", function(id, data) {
				editor.setBlock2(new Block(id, data));
				msg("MSG SET BLOCK2", editor.getOwner());
			}, "Cancel", function() {});
			t.setVisible(true);
		});
	
		this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "Fill", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				toasts("MSG ERROR CANT FIND PLAYER");
				return;
			}
			editor.run(EditType.FILL);
		});
		
		this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "Clean", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				toasts("MSG ERROR CANT FIND PLAYER");
				return;
			}
			editor.run(EditType.CLEAN);
		});
		
		this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "Replace", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				toasts("MSG ERROR CANT FIND PLAYER");
				return;
			}
			editor.run(EditType.REPLACE);
		});
		
		this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "Wall", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				toasts("MSG ERROR CANT FIND PLAYER");
				return;
			}
			editor.run(EditType.WALL);
		});
		
		this.menus[MenuType.CIRCULAR] = new WES_Menu(this, "Circular");
		this.menus[MenuType.EDIT].addMenu(ContentType.REDIRECT_MENU, "Circular", this.menus[MenuType.CIRCULAR]);
		
		this.menus[MenuType.CIRCULAR].addMenu(ContentType.TOGGLE, "HollowCircular", function(bool) {
			if(bool === true) {
				that.set("HollowCircular", true);
				that.saveSetting();
				return "HollowCircular";
			}else if(bool === false) {
				that.set("HollowCircular", false);
				that.saveSetting();
				return "HollowCircular";
			}else {
				return that.get("HollowCircular")
			}
		});
		
		this.menus[MenuType.CIRCULAR].addMenu(ContentType.FUNCTION, "Sphere", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				toasts("MSG ERROR CANT FIND PLAYER");
				return;
			}
			editor.run(EditType.SPHERE);
		});
		
		this.menus[MenuType.CIRCULAR].addMenu(ContentType.FUNCTION, "Hemi Sphere", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				toasts("MSG ERROR CANT FIND PLAYER");
				return;
			}
			editor.run(EditType.HEMI_SPHERE);
		});
		
		
		
	
		this.menus[MenuType.TOOL] = new WES_Menu(this, "Tool");
		this.menus[MenuType.MAIN].addMenu(ContentType.REDIRECT_MENU, "Tool", this.menus[MenuType.TOOL]);
		
		
		
	
		this.menus[MenuType.INFO] = new WES_Menu(this, "Info Panel");
		this.menus[MenuType.MAIN].addMenu(ContentType.REDIRECT_MENU, "Info Panel", this.menus[MenuType.INFO]);
		
		
		
	
		this.menus[MenuType.QUICK] = new WES_Menu(this, "Quick Bar");
		this.menus[MenuType.MAIN].addMenu(ContentType.REDIRECT_MENU, "Quick Bar", this.menus[MenuType.QUICK]);
		
		
		
	
		this.menus[MenuType.HELP] = new WES_Menu(this, "Help");
		this.menus[MenuType.MAIN].addMenu(ContentType.REDIRECT_MENU, "Help", this.menus[MenuType.HELP]);
		
		
		
	
		this.menus[MenuType.SETTING] = new WES_Menu(this, "Setting");
		this.menus[MenuType.MAIN].addMenu(ContentType.REDIRECT_MENU, "Setting", this.menus[MenuType.SETTING]);
		
		this.menus[MenuType.SETTING].addMenu(ContentType.TOGGLE, "Show Button", function(bool) {
			if(bool === true) {
				that.set("ButtonVis", true);
				that.setButtonVisible(true);
				that.saveSetting();
				return "Show Button"
			}else if(bool === false) {
				that.set("ButtonVis", false);
				that.setButtonVisible(false);
				that.saveSetting();
				return "Show Button"
			}else {
				return that.setting.buttonVis
			}
		});
	
		this.menus[MenuType.SETTING].addMenu(ContentType.TOGGLE, (that.get("WorkType") == WorkType.SYNCHRONIZATION) ? "WorkType: Synchronization" : "WorkType: Asynchronous", function(bool) {
			if(bool === true) {
				that.set("WorkType", WorkType.SYNCHRONIZATION);
				that.saveSetting();
				return "WorkType: Synchronization";
			}else if(bool === false) {
				that.set("WorkType", WorkType.ASYNCHRONOUS);
				that.saveSetting();
				return "WorkType: Asynchronous";
			}else {
				return that.get("WorkType") == WorkType.SYNCHRONIZATION;
			}
		});
		
		this.menus[MenuType.SETTING].addMenu(ContentType.TOGGLE, "HollowCircular", function(bool) {
			if(bool === true) {
				that.set("HollowCircular", true);
				that.saveSetting();
				return "HollowCircular";
			}else if(bool === false) {
				that.set("HollowCircular", false);
				that.saveSetting();
				return "HollowCircular";
			}else {
				return that.get("HollowCircular")
			}
		});
	
	
		this.menus[MenuType.MAIN].addMenu(ContentType.FUNCTION, "TEST", function() {
			var t = new WES_BlockSelect(that, "test", "Confirm", function() {}, "Cancel", function() {});
			t.setVisible(true);
		});
		
		loading.close();
	},
	
	setMenu: function(menu) {
		var that = this;
		this.currentMenu = menu;
		uiThread(function() { try{
			that.scroll.removeAllViews();
			that.t_name.setText(that.currentMenu.getName());
			that.scroll.addView(that.currentMenu.getLayout());
		}catch(e) {
			showError(e, WarnType.WARNING);
		}});
	}
}



function WES_Toast(str, type, duration, color) {
	if(duration === undefined || duration === null) duration = 3000;
	if(color === undefined || color === null) color = Color.WHITE;
	var layout = mcpeText(DIP*12, str);
	layout.setGravity(Gravity.CENTER);
	layout.setPadding(DIP*4, DIP*4, DIP*4, DIP*4);
	layout.setTextColor(color);
	switch(type) {
		case 1:
		layout.setBackgroundDrawable(Assets.toastWarning.ninePatch());
		break;
		case 2:
		layout.setBackgroundDrawable(Assets.toastCritical.ninePatch());
		break;
		case 0:
		default:
		layout.setBackgroundDrawable(Assets.toastNormal.ninePatch());
		break;
	}
	var wd = new PopupWindow(layout, c.w, c.w, false);
	uiThread(function() { try{
		wd.showAtLocation(c.d, Gravity.CENTER|Gravity.BOTTOM, 0, DIP*0x40);
		new Handler().postDelayed(new java.lang.Runnable({run: function() {try {
			wd.dismiss();
		}catch(e) {
			print(e);
		}}}), duration);
	}catch(e) {
		print(e);
	}});
}



function CustomProgressBar(type, max) {
	var that = this;
	switch(type) {
		
		case 0:
		this.bar = new ProgressBar(ctx);
		this.window = new PopupWindow(this.bar, DIP*0x40, DIP*0x40, false);
		this.window.setTouchable(false);
		uiThread(function() {try {
			that.window.showAtLocation(c.d, Gravity.CENTER, 0, 0);
		}catch(e) {
			showError(e, WarnType.WARNING);
		}});
		break;
		
		case 1:
		this.bar = new ProgressBar(ctx);
		this.bar.setLayoutParams(new LayoutParams(0x40, 0x40));
		this.layout = new c.l(ctx);
		this.layout.setBackgroundColor(Color.argb(0x55, 0, 0, 0));
		this.layout.addView(this.bar);
		this.window = new PopupWindow(this.layout, c.ww, c.wh, false);th
		this.window.setTouchable(true);
		uiThread(function() {try {
			that.window.showAtLocation(c.d, Gravity.CENTER, 0, 0);
		}catch(e) {
			showError(e, WarnType.WARNING);
		}});
		break;
		
		case 2:
		this.bar = new ProgressBar(ctx, null, android.R.attr.progressBarStyleHorizontal);
		this.bar.setMax(max);
		this.window = new PopupWindow(this.bar, c.m, c.w, false);
		this.window.setTouchable(false);
		uiThread(function() {try {
			that.window.showAtLocation(c.d, Gravity.BOTTOM, 0, 0);
		}catch(e) {
			showError(e, WarnType.WARNING);
		}});
		break;
		
		case 3:
		this.bar = new ProgressBar(ctx, null, android.R.attr.progressBarStyleHorizontal);
		this.bar.setMax(max);
		var f = new ClipDrawable(new ColorDrawable(Color.parseColor("#80ff80")), Gravity.LEFT, ClipDrawable.HORIZONTAL);
		var b = new ColorDrawable(Color.parseColor("#808080"));
		var draw = this.bar.getProgressDrawable();
		draw.setDrawableByLayerId(android.R.id.progress, f);
		draw.setDrawableByLayerId(android.R.id.background, b);
		this.window = new PopupWindow(this.bar, c.m, DIP*0x04, false);
		this.window.setTouchable(false);
		uiThread(function() {try {
			that.window.showAtLocation(c.d, Gravity.BOTTOM, 0, 0);
		}catch(e) {
			showError(e, WarnType.WARNING);
		}});
		break;
	}
}

CustomProgressBar.prototype = {
	setMax: function(value) {
		var that = this;
		uiThread(function() {try {
			that.bar.setMax(value);
		}catch(e) {
			showError(e, WarnType.RECOVERABLE);
		}});
	},
	
	setProgress: function(value) {
		var that = this;
		uiThread(function() {try {
			that.bar.setProgress(value);
		}catch(e) {
			showError(e, WarnType.RECOVERABLE);
		}});
	},
	
	close: function() {
		var that = this;
		uiThread(function() {try {
			that.window.dismiss();
		}catch(e) {
			showError(e, WarnType.WARNING);
		}});
	}
}


function EditorGroup(parent) {
	this._parent = parent;
	this.editors = [];
	this.whitelist = [];
}

EditorGroup.prototype = {
	
	toString: function() {
		return "[EditorGroup: " + this.whitelist + "]";
	},
	
	init: function() {
		this.whitelist = this._parent.get("Whitelist");
	},
	
	get: function(name) {
		var index = this.getEditorIndex(name);
		if(index === -1) {
			return false;
		}
		return this.editors[index];
	},
	
	isAllow: function(name) {
		//if Server owner
		if(name.toLowerCase() === Player.getName(Player.getEntity()).toLowerCase()) {
			return true;
		}
		//check whitelist
		for(var e = 0; e < this._parent.whitelist.length; e++) {
			if(this._parent.whitelist[e].toLowerCase() === name.toLowerCase()) {
				return true;
			}
		}
		return false;
	},

	getEditorIndex: function(name) {
		if(!(this.isAllow(name))) {
			return -1;
		}
		for(var e = 0; e < this.editors.length; e++) {
			if(this.editors[e].isOwner(name)) {
				return e;
			}
		}
		this.editors.push(new Editor(this._parent, name));
		return this.editors.length - 1;
	},
	
	setWhitelist: function(name) {
		this.whitelist.push(name);
		this._parent.set("Whitelist", this.whitelist);
		this._parent.saveSetting();
	},
	
	removeWhitelist: function(name) {
		var index = this.getEditorIndex(name);
		this.editor.splice(index, 1);
		for(var e = 0; e < this.whitelist.length; e++) {
			if(this.whitelist[e].toLowerCase() === name.toLowerCase()) {
				this.whitelist.splice(e, 1);
				this._parent.set("Whitelist", this.whitelist);
				this._parent.saveSetting();
			}
		}
	}
}

function Editor(parent, owner) {
	this._parent = parent;
	this.owner = owner;
	this.pos1 = null;
	this.pos2 = null;
	this.block1 = null;
	this.block2 = null;
}

Editor.prototype = {
	
	isOwner: function(owner) {
		return owner.toLowerCase() === this.owner.toLowerCase();
	},
	
	getOwner: function() {
		return PlayerExtra.getPlayer(this.owner);
	},
	
	getPos1: function() {
		return this.pos1;
	},
	
	getPos2: function() {
		return this.pos2;
	},
	
	getBlock1: function() {
		return this.block1;
	},
	
	getBlock2: function() {
		return this.block2;
	},
	
	setPos1: function(vector) {
		if(!(vector instanceof Vector3)) {
			throw new TypeError("The parameter 'vector' must be instance of Vector3.");
		}
		this.pos1 = vector;
	},

 	setPos2: function(vector) {
		if(!(vector instanceof Vector3)) {
			throw new TypeError("The parameter 'vector' must be instance of Vector3.");
		}
		this.pos2 = vector;
	},
	
	setBlock1: function(block) {
		 if(!(block instanceof Block)) {
			throw new TypeError("The parameter 'block' must be instance of Block.");
		}
		this.block1 = block;
	},
	
	setBlock2: function(block) {
		 if(!(block instanceof Block)) {
			throw new TypeError("The parameter 'block' must be instance of Block.");
		}
		this.block2 = block;
	},
	
	run: function(type) {
		var that = this;
		switch(type) {
			
			case EditType.FILL:
			var player = this.getOwner();
			if(player === false) {
				msg("MSG ERROR CANT FIND PLAYER: " + this.owner);
			}
			if(!(this.pos1 instanceof Vector3)) {
				msg("TODO PLEASE SET POS1", player);
				return;
			}
			if(!(this.pos2 instanceof Vector3)) {
				msg("TODO PLEASE SET POS2", player);
				return;
			}
			if(!(this.block1 instanceof Block)) {
				msg("TODO PLEASE SET BLOCK1", player);
				return;
			}
			
			var x1 = this.pos1.x;
			var y1 = this.pos1.y;
			var z1 = this.pos1.z;
			var x2 = this.pos2.x;
			var y2 = this.pos2.y;
			var z2 = this.pos2.z;
			
			var sx = (x1 < x2) ? x1 : x2;
			var sy = (y1 < y2) ? y1 : y2;
			var sz = (z1 < z2) ? z1 : z2;
			var ex = (x1 > x2) ? x1 : x2;
			var ey = (y1 > y2) ? y1 : y2;
			var ez = (z1 > z2) ? z1 : z2;
			
			var id = this.block1.id;
			var data = this.block1.data;
			
			if(this._parent.get('WorkType') === WorkType.SYNCHRONIZATION) {
				thread(function() {try {
					for(var y = sy; y <= ey; y++) {
					for(var z = sz; z <= ez; z++) {
					for(var x = sx; x <= ex; x++) {
						Level.setTile(x, y, z, id, data);
						sleep(1);
					}
					}
					}
				}catch(e) {
					showError(e, WarnType.WARNING);
				}}).start();
			}else if(this._parent.setting.WorkType === WorkType.ASYNCHRONOUS) {
				thread(function() {try {
					for(var y = sy; y <= ey; y++) {
					for(var z = sz; z <= ez; z++) {
					for(var x = sx; x <= ex; x++) {
						that._parent.asynceBuffer.push([x, y, z, id, data]);
						sleep(1);
					}
					}
					}
				}catch(e) {
					showError(e, WarnType.WARNING);
				}}).start();
			}else {
				throw new Error("Unknown WorkType: " + this._parent.setting.WorkType);
			}
			break;
			
			
			
			case EditType.CLEAN:
			var player = this.getOwner();
			if(player === false) {
				msg("MSG ERROR CANT FIND PLAYER: " + this.owner);
			}
			if(!(this.pos1 instanceof Vector3)) {
				msg("TODO PLEASE SET POS1", player);
				return;
			}
			if(!(this.pos2 instanceof Vector3)) {
				msg("TODO PLEASE SET POS2", player);
				return;
			}
			
			var x1 = this.pos1.x;
			var y1 = this.pos1.y;
			var z1 = this.pos1.z;
			var x2 = this.pos2.x;
			var y2 = this.pos2.y;
			var z2 = this.pos2.z;
			
			var sx = (x1 < x2) ? x1 : x2;
			var sy = (y1 < y2) ? y1 : y2;
			var sz = (z1 < z2) ? z1 : z2;
			var ex = (x1 > x2) ? x1 : x2;
			var ey = (y1 > y2) ? y1 : y2;
			var ez = (z1 > z2) ? z1 : z2;
			
			if(this._parent.get('WorkType') === WorkType.SYNCHRONIZATION) {
				thread(function() {try {
					for(var y = ey; y >= sy; y--) {
					for(var z = sz; z <= ez; z++) {
					for(var x = sx; x <= ex; x++) {
						Level.setTile(x, y, z, 0, 0);
						sleep(1);
					}
					}
					}
				}catch(e) {
					showError(e, WarnType.WARNING);
				}}).start();
			}else if(this._parent.setting.WorkType === WorkType.ASYNCHRONOUS) {
				thread(function() {try {
					for(var y = ey; y >= sy; y--) {
					for(var z = sz; z <= ez; z++) {
					for(var x = sx; x <= ex; x++) {
						that._parent.asynceBuffer.push([x, y, z, 0, 0]);
						sleep(1);
					}
					}
					}
				}catch(e) {
					showError(e, WarnType.WARNING);
				}}).start();
			}else {
				throw new Error("Unknown WorkType: " + this._parent.setting.WorkType);
			}
			break;
			
			
			
			case EditType.REPLACE:
			var player = this.getOwner();
			if(player === false) {
				msg("MSG ERROR CANT FIND PLAYER: " + this.owner);
			}
			if(!(this.pos1 instanceof Vector3)) {
				msg("TODO PLEASE SET POS1", player);
				return;
			}
			if(!(this.pos2 instanceof Vector3)) {
				msg("TODO PLEASE SET POS2", player);
				return;
			}
			if(!(this.block1 instanceof Block)) {
				msg("TODO PLEASE SET BLOCK1", player);
				return;
			}
			if(!(this.block2 instanceof Block)) {
				msg("TODO PLEASE SET BLOCK2", player);
				return;
			}
			
			var x1 = this.pos1.x;
			var y1 = this.pos1.y;
			var z1 = this.pos1.z;
			var x2 = this.pos2.x;
			var y2 = this.pos2.y;
			var z2 = this.pos2.z;
			
			var sx = (x1 < x2) ? x1 : x2;
			var sy = (y1 < y2) ? y1 : y2;
			var sz = (z1 < z2) ? z1 : z2;
			var ex = (x1 > x2) ? x1 : x2;
			var ey = (y1 > y2) ? y1 : y2;
			var ez = (z1 > z2) ? z1 : z2;
			
			var id1 = this.block1.id;
			var data1 = this.block1.data;
			var id2 = this.block2.id;
			var data2 = this.block2.data;
			
			if(this._parent.get('WorkType') === WorkType.SYNCHRONIZATION) {
				thread(function() {try {
					for(var y = sy; y <= ey; y++) {
					for(var z = sz; z <= ez; z++) {
					for(var x = sx; x <= ex; x++) {
						if(Level.getTile(x, y, z) == id1 && Level.getData(x, y, z) == data1) {
							Level.setTile(x, y, z, id2, data2);
							sleep(1);
						}
					}
					}
					}
				}catch(e) {
					showError(e, WarnType.WARNING);
				}}).start();
			}else if(this._parent.setting.WorkType === WorkType.ASYNCHRONOUS) {
				thread(function() {try {
					for(var y = sy; y <= ey; y++) {
					for(var z = sz; z <= ez; z++) {
					for(var x = sx; x <= ex; x++) {
						if(Level.getTile(x, y, z) == id1 && Level.getData(x, y, z) == data1) {
							that._parent.asynceBuffer.push([x, y, z, id2, data2]);
							sleep(1);
						}
					}
					}
					}
				}catch(e) {
					showError(e, WarnType.WARNING);
				}}).start();
			}else {
				throw new Error("Unknown WorkType: " + this._parent.setting.WorkType);
			}
			break;
			
			
			
			case EditType.WALL:
			var player = this.getOwner();
			if(player === false) {
				msg("MSG ERROR CANT FIND PLAYER: " + this.owner);
			}
			if(!(this.pos1 instanceof Vector3)) {
				msg("TODO PLEASE SET POS1", player);
				return;
			}
			if(!(this.pos2 instanceof Vector3)) {
				msg("TODO PLEASE SET POS2", player);
				return;
			}
			if(!(this.block1 instanceof Block)) {
				msg("TODO PLEASE SET BLOCK1", player);
				return;
			}
			
			var x1 = this.pos1.x;
			var y1 = this.pos1.y;
			var z1 = this.pos1.z;
			var x2 = this.pos2.x;
			var y2 = this.pos2.y;
			var z2 = this.pos2.z;
			
			var sx = (x1 < x2) ? x1 : x2;
			var sy = (y1 < y2) ? y1 : y2;
			var sz = (z1 < z2) ? z1 : z2;
			var ex = (x1 > x2) ? x1 : x2;
			var ey = (y1 > y2) ? y1 : y2;
			var ez = (z1 > z2) ? z1 : z2;
			
			var id = this.block1.id;
			var data = this.block1.data;
			
			if(this._parent.get('WorkType') === WorkType.SYNCHRONIZATION) {
				thread(function() {try {
					for(var x = sx; true; x = ex) {
					for(var y = sy; y <= ey; y++) {
					for(var z = sz; z <= ez; z++) {
						Level.setTile(x, y, z, id, data);
						sleep(1);
					}
					}
					if(x === ex) break;
					}
					for(var z = sz; true; z = ez) {
					for(var y = sy; y <= ey; y++) {
					for(var x = sx; x <= ex; x++) {
						Level.setTile(x, y, z, id, data);
						sleep(1);
					}
					}
					if(z === ez) break;
					}
				}catch(e) {
					showError(e, WarnType.WARNING);
				}}).start();
			}else if(this._parent.setting.WorkType === WorkType.ASYNCHRONOUS) {
				thread(function() {try {
					for(var x = sx; true; x = ex) {
					for(var y = sy; y <= ey; y++) {
					for(var z = sz; z <= ez; z++) {
						that._parent.asynceBuffer.push([x, y, z, id, data]);
						sleep(1);
					}
					}
					if(x === ex) break;
					}
					for(var z = sz; true; z = ez) {
					for(var y = sy; y <= ey; y++) {
					for(var x = sx; x <= ex; x++) {
						that._parent.asynceBuffer.push([x, y, z, id, data]);
						sleep(1);
					}
					}
					if(z === ez) break;
					}
				}catch(e) {
					showError(e, WarnType.WARNING);
				}}).start();
			}else {
				throw new Error("Unknown WorkType: " + this._parent.setting.WorkType);
			}
			break;
			
			
			
			case EditType.SPHERE:
			var player = this.getOwner();
			if(player === false) {
				msg("MSG ERROR CANT FIND PLAYER: " + this.owner);
			}
			if(!(this.pos1 instanceof Vector3)) {
				msg("TODO PLEASE SET POS1", player);
				return;
			}
			if(!(this.block1 instanceof Block)) {
				msg("TODO PLEASE SET BLOCK1", player);
				return;
			}
			
			var type = this._parent.get("HollowCircular");
			
			var cx = this.pos1.x;
			var cy = this.pos1.y;
			var cz = this.pos1.z;
			
			var id = this.block1.id;
			var data = this.block1.data;
			
			var np = new NumberPicker(ctx);
			np.setMinValue(0x01);
			np.setMaxValue(0xff);
			
			var dl = new WES_Dialog("Radius...", 0, np, "Generate", function() {try {
				var radi = np.getValue();
				if(that._parent.get('WorkType') === WorkType.SYNCHRONIZATION) {
					thread(function() {try {
						for(var y = -(radi+1); y <= (radi+1); y++) {
						for(var z = -(radi+1); z <= (radi+1); z++) {
						for(var x = -(radi+1); x <= (radi+1); x++) {
							if(type) {
								if(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2) && Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) >= (Math.pow(radi-1, 2))) {
									Level.setTile(cx + x, cy + y, cz + z, id, data);
									sleep(1);
								}
							}else {
								if(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2)) {
									Level.setTile(cx + x, cy + y, cz + z, id, data);
									sleep(1);
								}
							}
						}
						}
						}
					}catch(e) {
						showError(e, WarnType.WARNING);
					}}).start();
				}else if(that._parent.setting.WorkType === WorkType.ASYNCHRONOUS) {
					thread(function() {try {
						for(var y = -(radi+1); y <= (radi+1); y++) {
						for(var z = -(radi+1); z <= (radi+1); z++) {
						for(var x = -(radi+1); x <= (radi+1); x++) {
							if(type) {
								if(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2) && Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) >= (Math.pow(radi-1, 2))) {
									that._parent.asynceBuffer.push([cx + x, cy + y, cz + z, id, data]);
									sleep(1);
								}
							}else {
								if(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2)) {
									that._parent.asynceBuffer.push([cx + x, cy + y, cz + z, id, data]);
									sleep(1);
								}
							}
						}
						}
						}
					}catch(e) {
						showError(e, WarnType.WARNING);
					}}).start();
				}else {
					throw new Error("Unknown WorkType: " + this._parent.setting.WorkType);
				}
				this.setVisible(false);
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}, "Cancel", function() {this.setVisible(false)}, true);
			
			dl.setVisible(true);
			break;
			
			
			
			case EditType.HEMI_SPHERE:
			var player = this.getOwner();
			if(player === false) {
				msg("MSG ERROR CANT FIND PLAYER: " + this.owner);
			}
			if(!(this.pos1 instanceof Vector3)) {
				msg("TODO PLEASE SET POS1", player);
				return;
			}
			if(!(this.block1 instanceof Block)) {
				msg("TODO PLEASE SET BLOCK1", player);
				return;
			}
			
			var type = this._parent.get("HollowCircular");
			
			var cx = this.pos1.x;
			var cy = this.pos1.y;
			var cz = this.pos1.z;
			
			var id = this.block1.id;
			var data = this.block1.data;
			
			var radi = null;
			
			var np = new NumberPicker(ctx);
			np.setMinValue(0x01);
			np.setMaxValue(0xff);
			
			var direction = null;
			
			var lo = new c.l(ctx);
			lo.setOrientation(c.l.VERTICAL);
			var xp = mcpeText(DIP*0x10, "X+", true);
			xp.setBackgroundDrawable(Assets.boxNormal.ninePatch());
			xp.setGravity(Gravity.CENTER);
			xp.setPadding(DIP*0x08, DIP*0x08, DIP*0x08, DIP*0x08);
			xp.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
				direction = "X+";
				WES_Toast("MSG SET X+");
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}}));
			lo.addView(xp);
			var xm = mcpeText(DIP*0x10, "X-", true);
			xm.setBackgroundDrawable(Assets.boxNormal.ninePatch());
			xm.setGravity(Gravity.CENTER);
			xm.setPadding(DIP*0x08, DIP*0x08, DIP*0x08, DIP*0x08);
			xm.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
				direction = "X-";
				WES_Toast("MSG SET X-");
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}}));
			lo.addView(xm);
			var yp = mcpeText(DIP*0x10, "Y+", true);
			yp.setBackgroundDrawable(Assets.boxNormal.ninePatch());
			yp.setGravity(Gravity.CENTER);
			yp.setPadding(DIP*0x08, DIP*0x08, DIP*0x08, DIP*0x08);
			yp.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
				direction = "Y+";
				WES_Toast("MSG SET Y+");
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}}));
			lo.addView(yp);
			var ym = mcpeText(DIP*0x10, "Y-", true);
			ym.setBackgroundDrawable(Assets.boxNormal.ninePatch());
			ym.setGravity(Gravity.CENTER);
			ym.setPadding(DIP*0x08, DIP*0x08, DIP*0x08, DIP*0x08);
			ym.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
				direction = "Y-";
				WES_Toast("MSG SET Y-");
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}}));
			lo.addView(ym);
			var zp = mcpeText(DIP*0x10, "Z+", true);
			zp.setBackgroundDrawable(Assets.boxNormal.ninePatch());
			zp.setGravity(Gravity.CENTER);
			zp.setPadding(DIP*0x08, DIP*0x08, DIP*0x08, DIP*0x08);
			zp.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
				direction = "Z+";
				WES_Toast("MSG SET Z+");
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}}));
			lo.addView(zp);
			var zm = mcpeText(DIP*0x10, "Z-", true);
			zm.setBackgroundDrawable(Assets.boxNormal.ninePatch());
			zm.setGravity(Gravity.CENTER);
			zm.setPadding(DIP*0x08, DIP*0x08, DIP*0x08, DIP*0x08);
			zm.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
				direction = "Z-";
				WES_Toast("MSG SET Z-");
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}}));
			lo.addView(zm);
			
			var dl2 = new WES_Dialog("Direction...", 0, lo, "Generate", function() {try {
				switch(direction) {
					case "X+":
					var xpa = true;
					var xma = false;
					var ypa = true;
					var yma = true;
					var zpa = true;
					var zma = true;
					break;
					case "X-":
					var xpa = false;
					var xma = true;
					var ypa = true;
					var yma = true;
					var zpa = true;
					var zma = true;
					break;
					case "Y+":
					var xpa = true;
					var xma = true;
					var ypa = true;
					var yma = false;
					var zpa = true;
					var zma = true;
					break;
					case "Y-":
					var xpa = true;
					var xma = true;
					var ypa = false;
					var yma = true;
					var zpa = true;
					var zma = true;
					break;
					case "Z+":
					var xpa = true;
					var xma = true;
					var ypa = true;
					var yma = true;
					var zpa = true;
					var zma = false;
					break;
					case "Z-":
					var xpa = true;
					var xma = true;
					var ypa = true;
					var yma = true;
					var zpa = false;
					var zma = true;
					break;
					default:
					msg("MSG PLEASE SET DIRECTION", Player.getEntity());
					return false;
				}
				if(that._parent.get('WorkType') === WorkType.SYNCHRONIZATION) {
					thread(function() {try {
						clientMessage(xpa+" "+xma+" "+ypa+" "+yma+" "+zpa+" "+zma);
						for(var y = -(radi+1); y <= (radi+1); y++) {
							clientMessage("y" + (!ypa && y > 0) + " " + (!yma && y < 0));
							if(!ypa && y > 0) continue;
							if(!yma && y < 0) continue;
						for(var z = -(radi+1); z <= (radi+1); z++) {
							if(!zpa && z > 0) continue;
							if(!zma && z < 0) continue;
						for(var x = -(radi+1); x <= (radi+1); x++) {
							if(!xpa && x > 0) continue;
							if(!xma && x < 0) continue;
							if(type) {
								if(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2) && Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) >= (Math.pow(radi-1, 2))) {
									Level.setTile(cx + x, cy + y, cz + z, id, data);
									sleep(1);
								}
							}else {
								if(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2)) {
									Level.setTile(cx + x, cy + y, cz + z, id, data);
									sleep(1);
								}
							}
						}
						}
						}
					}catch(e) {
						showError(e, WarnType.WARNING);
					}}).start();
				}else if(that._parent.setting.WorkType === WorkType.ASYNCHRONOUS) {
					thread(function() {try {
						for(var y = -(radi+1); y <= (radi+1); y++) {
							if(!ypa && y > 0) continue;
							if(!yma && y < 0) continue;
						for(var z = -(radi+1); z <= (radi+1); z++) {
							if(!zpa && z > 0) continue;
							if(!zma && z < 0) continue;
						for(var x = -(radi+1); x <= (radi+1); x++) {
							if(!xpa && x > 0) continue;
							if(!xma && x < 0) continue;
							if(type) {
								if(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2) && Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) >= (Math.pow(radi-1, 2))) {
									that._parent.asynceBuffer.push([cx + x, cy + y, cz + z, id, data]);
									sleep(1);
								}
							}else {
								if(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2)) {
									that._parent.asynceBuffer.push([cx + x, cy + y, cz + z, id, data]);
									sleep(1);
								}
							}
						}
						}
						}
					}catch(e) {
						showError(e, WarnType.WARNING);
					}}).start();
				}else {
					throw new Error("Unknown WorkType: " + this._parent.setting.WorkType);
				}
				this.setVisible(false);
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}, "Cancel", function() {this.setVisible(false)}, false);
			
			var dl = new WES_Dialog("Radius...", 0, np, "Next", function() {try {
				radi = np.getValue();
				dl2.setVisible(true);
				this.setVisible(false);
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}, "Cancel", function() {this.setVisible(false)}, true);
			
			
			
			dl.setVisible(true);
			break;
			
			
			
			default:
			throw new Error("Unknown EditType: " + type);
		}
	}
}



function WES_Menu(script, name) {
	var that = this;
	this._parent = script;
	this.name = name;
	this.menus = [];
	this.parent = null;
	
	this.layout = new c.l(ctx);
	this.layout.setOrientation(c.l.VERTICAL);
}

WES_Menu.prototype = {
	
	toString: function() {
		return "['" + this.name + "' Menu]";
	},
	
	isEqual: function(menu) {
		if(menu instanceof WES_Menu) {
			return this.name === menu.name;
		}else {
			return false;
		}
	},
	
	getParent: function() {
		return this.parent;
	},
	
	setParent: function(menu) {
		if(!(menu instanceof WES_Menu)) {
			throw new TypeError("The parameter 'menu' is must instance of WES_Menu");
		}
		this.parent = menu;
	},
	
	getName: function() {
		return this.name;
	},
	
	getLayout: function() {
		return this.layout;
	},
	
	addMenu: function(type, name, content) {
		if(type !== ContentType.REDIRECT_MENU && type !== ContentType.FUNCTION && type !== ContentType.TOGGLE) {
			throw new TypeError("Unknown type parameter 'type'");
		}
		var that = this;
		if(type === ContentType.REDIRECT_MENU) {
			content.setParent(this);
		}
		var btn = mcpeText(DIP*10, name);
		var id = randomId();
		btn.setId(id);
		btn.setGravity(Gravity.CENTER);
		var btn_p = new c.l.LayoutParams(DIP*0xf0, DIP*0x30);
		btn.setLayoutParams(btn_p);	
		switch(type) {
			case ContentType.REDIRECT_MENU:
			case ContentType.FUNCTION:
			btn.setBackgroundDrawable(Assets.wesButton.ninePatch());
			break;
			case ContentType.TOGGLE:
			if(content()) {
				btn.setBackgroundDrawable(Assets.wesButtonClick.ninePatch());
			}else {
				btn.setBackgroundDrawable(Assets.wesButton.ninePatch());
			}
			break;
		}
		btn.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
			that.runMenu(view.getId());
		}catch(e) {
			showError(e, WarnType.RECOVERABLE);
		}}}));
		uiThread(function() { try{
			that.layout.addView(btn);
		}catch(e) {
			showError(e, WarnType.WARNING);
		}});
		this.menus.push([type, name, content, btn, id]);
	},
	
	removeMenu: function(id) {
		var index = this.getMenuIndex(id);
		if(index >= 0) {
			this.menus.splice(index, 1);
			return true;
		}else {
			return false;
		}
	},
	
	getMenuIndex: function(id) {
		for(var e = 0; e < this.menus.length; e++) {
			if(this.menus[e][4] == id) {
				return e;
			}
		}
		return -1;
	},
	
	runMenu: function(id) {try {
		var index = this.getMenuIndex(id);
		if(index === -1) {
			throw new ReferenceError("The menu '" + id + "' isn't in Menu.");
		}
		var ctn = this.menus[index];
		switch(ctn[0]) {
			case ContentType.REDIRECT_MENU:
			this._parent.setMenu(ctn[2]);
			break;
			case ContentType.FUNCTION:
			ctn[2]();
			break;
			case ContentType.TOGGLE:
			if(ctn[2]()) {
				uiThread(function() { try{
					ctn[3].setText(ctn[2](false));
					ctn[3].setBackgroundDrawable(Assets.wesButton.ninePatch());
				}catch(e) {
					showError(e, WarnType.RECOVERABLE);
				}});
			}else {
				uiThread(function() { try{
					ctn[3].setText(ctn[2](true));
					ctn[3].setBackgroundDrawable(Assets.wesButtonClick.ninePatch());
				}catch(e) {
					showError(e, MenuType.RECOVERABLE);
				}});
			}
			break;
			default:
			throw new ReferenceError("This '" + ctn[1] + "' menu type is unknown.");
		}
	}catch(e) {
		showError(e, WarnType.WARNING);
	}},
	
	close: function() {
		if(this.parent === null) {
			this._parent.currentMenu = null;
			this._parent.setMenuVisible(false);
		}else {
			this._parent.setMenu(this.parent);
		}
	}
}


//do not use "new"
function WES_Button(size, name, type, width, height, padding, margins, onClickFunction) {
	var btn = mcpeText(size, name, true);
	if(width !== null && height !== null) {
		var btn_p = c.l.LayoutParams(width, height);
	}else {
		var btn_p = c.l.LayoutParams(
	}
	btn.setGravity(Gravity.CENTER);
	if(padding !=== null) {
		btn.setPadding(padding[0], padding[0], padding[0], padding[0]);
	}else {
		btn.setPadding(DIP*0x08, DIP*0x08, DIP*0x08, DIP*0x08);
	}
	btn.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		onClickFunction(view, event);
	}catch(e) {
		showError(e, WarnType.WARNING);
	}}}));
	switch(type) {
		case 1:
		btn.setBackgroundDrawable(Assets.boxWarning.ninePatch());
		break;
		case 2:
		btn.setBackgroundDrawable(Assets.boxCritical.ninePatch());
		break;
		case 0:
		default:
		btn.setBackgroundDrawable(Assets.boxNormal.ninePatch());
		break;
	}
	return btn;
}



function WES_Dialog(name, type, layout, confirmTxt, confirmFunc, cancelTxt, cancelFunc, focus) {
	this.vis = false;
	this.name = name;
	this.type = type;
	this.confirmTxt = confirmTxt;
	this.confirmFunc = confirmFunc;
	this.cancelTxt = cancelTxt;
	this.cancelFunc = cancelFunc;
	this.focus = focus;
	this.childLayout = layout === undefined ? null : layout;
	this.wd = null;
}

WES_Dialog.prototype = {
	
	isVisible: function() {
		return this.vis;
	},
	
	setVisible: function(bool) {
		var that = this;
		if(bool) {
			if(!(this.vis)) {
				if(this.wd === null) {
					this.build();
				}
				uiThread(function() {try {
					that.wd.showAtLocation(c.d, Gravity.CENTER, 0, 0);
					that.vis = true;
				}catch(e) {
					showError(e, WarnType.WARNING);
				}});
			}
		}else {
			if(this.vis) {
				uiThread(function() {try {
					that.wd.dismiss();
					that.vis = false;
				}catch(e) {
					showError(e, WarnType.WARNING);
				}});
			}
		}
	},
	
	build: function() {
		
		var that = this;
		
		this.layout = new c.r(ctx);
		this.layout_d = new GradientDrawable();
		this.layout_d.setColor(Color.argb(0x55, 0, 0, 0));
		this.layout_d.setCornerRadius(DIP*5);
		this.layout.setBackgroundDrawable(this.layout_d);
		this.title = new c.r(ctx);
		this.title.setId(randomId());
		this.title_p = new c.r.LayoutParams(c.m, DIP*0x30);
		this.title_p.addRule(c.r.ALIGN_PARENT_TOP);
		this.title.setLayoutParams(this.title_p);
		this.t_text = mcpeText(DIP*0x10, this.name, true);
		this.t_text_p = new c.r.LayoutParams(c.w, c.w);
		this.t_text_p.addRule(c.r.CENTER_IN_PARENT);
		this.t_text.setLayoutParams(this.t_text_p);
		this.t_text.setGravity(Gravity.CENTER);
		this.title.addView(this.t_text);
	
		this.t_confirm = mcpeText(DIP*0x0a, this.confirmTxt, true);
		this.t_confirm.setGravity(Gravity.CENTER);
		this.t_confirm.setPadding(DIP*0x06, DIP*0x02, DIP*0x06, DIP*0x02);
		this.t_confirm_p = new c.r.LayoutParams(c.w, DIP*0x1c);
		this.t_confirm_p.setMargins(DIP*0x0a, DIP*0x0a, DIP*0x0a, DIP*0x0a);
		this.t_confirm_p.addRule(c.r.ALIGN_PARENT_RIGHT);
		this.t_confirm.setLayoutParams(this.t_confirm_p);
		this.t_confirm.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
			that.confirm();
		}catch(e) {
			showError(e);
		}}}));
		this.title.addView(this.t_confirm);
	
	 	this.t_cancel = mcpeText(DIP*0x0a, this.cancelTxt, true);
		this.t_cancel.setGravity(Gravity.CENTER);
		this.t_cancel.setPadding(DIP*0x06, DIP*0x02, DIP*0x06, DIP*0x02);
		this.t_cancel_p = new c.r.LayoutParams(c.w, DIP*0x1c);
		this.t_cancel_p.setMargins(DIP*0x0a, DIP*0x0a, DIP*0x0a, DIP*0x0a);
		this.t_cancel_p.addRule(c.r.ALIGN_PARENT_LEFT);
		this.t_cancel.setLayoutParams(this.t_cancel_p);
		this.t_cancel.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
			that.cancel();
		}catch(e) {
			showError(e);
		}}}));
		this.title.addView(this.t_cancel);
	
		switch(this.type) {
			case 1:
			this.title.setBackgroundDrawable(Assets.boxWarning.ninePatch());
			this.t_confirm.setBackgroundDrawable(Assets.boxWarning.ninePatch());
			this.t_cancel.setBackgroundDrawable(Assets.boxWarning.ninePatch());
			break;
			case 2:
			this.title.setBackgroundDrawable(Assets.boxCritical.ninePatch());
			this.t_confirm.setBackgroundDrawable(Assets.boxCritical.ninePatch());
			this.t_cancel.setBackgroundDrawable(Assets.boxCritical.ninePatch());
			break;
			case 0:
			default:
			this.title.setBackgroundDrawable(Assets.boxNormal.ninePatch());
			this.t_confirm.setBackgroundDrawable(Assets.boxNormal.ninePatch());
			this.t_cancel.setBackgroundDrawable(Assets.boxNormal.ninePatch());
		}
		this.layout.addView(this.title);
		
		this.scroll = new ScrollView(ctx);
		this.scroll_p = new c.r.LayoutParams(c.m, c.w);
		this.scroll_p.setMargins(DIP*0x08, DIP*0X04, DIP*0X08, DIP*0X08);
		//뷰의 자식에게 자동으로 사이즈를 맞추게 한 설정을 부모(화면 전체)사이즈로 강제로 맞춰서 나를 한참이나 *먹인 앞으로 절대 사용하지 말아야 할 메소드
		//this.scroll_p.addRule(c.r.ALIGN_PARENT_BOTTOM);
		this.scroll_p.addRule(c.r.BELOW, this.title.getId());
		this.scroll.setLayoutParams(this.scroll_p);
		this.scroll.addView(this.childLayout);
		this.layout.addView(this.scroll);
		
		this.wd = new PopupWindow(this.layout, c.w, c.w, this.focus);
	},
	
	confirm: function() {
		try {
			return this.confirmFunc();
		}catch(e) {
			msg("ERROR NO CONFRIM FUNCTION", Player.getEntity());
			return false;
		}
	},
	
	cancel: function() {
		try {
			return this.cancelFunc();
		}catch(e) {
			msg("ERROR NO CANCEL FUNCTION", Player.getEntity());
			return false;
		}
	},
	
	setLayout: function(view) {
		this.childView = view;
		uiThread(function() {try {
			this.scroll.removeAllView();
			this.scroll.addView(view);
		}catch(e) {
			showError(e, WarnType.WARNING);
		}});
	}
}



function WES_BlockSelect(script, name, confirmTxt, confirmFunc, cancelTxt, cancelFunc) {
	var that = this;
	this._parent = script;
	this.vis = false;
	this.name = name;
	this.confirmTxt = confirmTxt;
	this.confirmFunc = confirmFunc;
	this.cancelTxt = cancelTxt;
	this.cancelFunc = cancelFunc;
	
	this.layout = new c.r(ctx);
	this.layout.setId(randomId());
	this.layout.setBackgroundDrawable(Assets.windowNormal.ninePatch());
	this.titleLayout = new c.r(ctx);
	this.titleLayout.setId(randomId());
	this.titleLayout.setBackgroundDrawable(Assets.boxNormal.ninePatch());
	this.titleLayout_p = new c.r.LayoutParams(c.ww, DIP*0x30);
	this.titleLayout_p.addRule(c.r.ALIGN_PARENT_TOP);
	this.titleLayout.setLayoutParams(this.titleLayout_p);
	
	this.title = mcpeText(DIP*0x10, this.name, true);
	this.title_p = new c.r.LayoutParams(c.w, c.w);
	this.title_p.addRule(c.r.CENTER_IN_PARENT);
	this.title.setLayoutParams(this.title_p);
	this.titleLayout.addView(this.title);
	
	this.titleConfirm = mcpeText(DIP*0x0a, this.confirmTxt, true);
	this.titleConfirm.setBackgroundDrawable(Assets.boxWarning.ninePatch());
	this.titleConfirm.setGravity(Gravity.CENTER);
	this.titleConfirm.setPadding(DIP*0x06, DIP*0x02, DIP*0x06, DIP*0x02);
	this.titleConfirm_p = new c.r.LayoutParams(c.w, DIP*0x1c);
	this.titleConfirm_p.setMargins(DIP*0x0a, DIP*0x0a, DIP*0x0a, DIP*0x0a);
	this.titleConfirm_p.addRule(c.r.ALIGN_PARENT_RIGHT);
	this.titleConfirm.setLayoutParams(this.titleConfirm_p);
	this.titleConfirm.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		that.confirm();
	}catch(e) {
		showError(e);
	}}}));
	this.titleLayout.addView(this.titleConfirm);
	
	 	this.titleCancel = mcpeText(DIP*0x0a, this.cancelTxt, true);
	this.titleCancel.setBackgroundDrawable(Assets.boxCritical.ninePatch());
	this.titleCancel.setGravity(Gravity.CENTER);
	this.titleCancel.setPadding(DIP*0x06, DIP*0x02, DIP*0x06, DIP*0x02);
	this.titleCancel_p = new c.r.LayoutParams(c.w, DIP*0x1c);
	this.titleCancel_p.setMargins(DIP*0x0a, DIP*0x0a, DIP*0x0a, DIP*0x0a);
	this.titleCancel_p.addRule(c.r.ALIGN_PARENT_LEFT);
	this.titleCancel.setLayoutParams(this.titleCancel_p);
	this.titleCancel.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		that.cancel();
	}catch(e) {
		showError(e);
	}}}));
	this.titleLayout.addView(this.titleCancel);
	
	this.layout.addView(this.titleLayout);
	
	this.direct = new c.l(ctx);
	this.direct.setId(randomId());
	this.direct.setOrientation(c.l.HORIZONTAL);
	this.direct_p = new c.r.LayoutParams(c.m, DIP*20);
	this.direct_p.setMargins(DIP*0x0c, DIP*0x02, DIP*0x0c, DIP*0x02);
	this.direct_p.addRule(c.r.BELOW, this.titleLayout.getId());
	this.direct.setLayoutParams(this.direct_p);
	
	this.direct_idTv = new mcpeText(DIP*0x10, "Id:");
	this.direct_idTv.setGravity(Gravity.CENTER);
	this.direct_idTv_p = new c.l.LayoutParams(DIP*0x20, c.m);
	this.direct_idTv.setLayoutParams(this.direct_idTv_p);
	this.direct.addView(this.direct_idTv);
	
	this.direct_id = new EditText(ctx);
	this.direct_id.setBackgroundDrawable(Assets.textView_9());
	this.direct_id.setPadding(DIP*0x04, DIP*0x04, DIP*0x04, DIP*0x04);
	this.direct_id.setGravity(Gravity.CENTER|Gravity.RIGHT);
	this.direct_id.setTextColor(Color.WHITE);
	this.direct_id.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*0x0a);
	if(FILE_FONT.exists()) {
		this.direct_id.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	}
	this.direct_id_p = new c.l.LayoutParams((c.ww - (DIP*0x20 + DIP*0x80))/2, c.m);
	this.direct_id.setLayoutParams(this.direct_id_p);
	this.direct.addView(this.direct_id);
	
 	this.direct_dataTv = new mcpeText(DIP*0x10, "Damage:");
	this.direct_dataTv.setGravity(Gravity.CENTER);
	this.direct_dataTv_p = new c.l.LayoutParams(DIP*0x60, c.m);
	this.direct_dataTv.setLayoutParams(this.direct_dataTv_p);
	this.direct.addView(this.direct_dataTv);
	
	this.direct_data = new EditText(ctx);
	this.direct_data.setBackgroundDrawable(Assets.textView_9());
	this.direct_data.setPadding(DIP*0x04, DIP*0x04, DIP*0x04, DIP*0x04);
	this.direct_data.setGravity(Gravity.CENTER|Gravity.RIGHT);
	this.direct_data.setTextColor(Color.WHITE);
	this.direct_data.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*0x0a);
	if(FILE_FONT.exists()) {
		this.direct_data.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	}
	this.direct_data_p = new c.l.LayoutParams((c.ww - (DIP*0x20 + DIP*0x80))/2, c.m);
	this.direct_data.setLayoutParams(this.direct_data_p);
	this.direct.addView(this.direct_data);
	
	this.layout.addView(this.direct);
	
	this.scroll = new ScrollView(ctx);
	this.scroll_p = new c.r.LayoutParams(c.m, c.m);
	this.scroll_p.setMargins(DIP*0x10, 0, DIP*0x10, DIP*0x10);
	this.scroll_p.addRule(c.r.BELOW, this.direct.getId());
	this.scroll.setLayoutParams(this.scroll_p);
	
	this.s_l = new c.l(ctx);
	this.s_l.setOrientation(c.l.VERTICAL);
	this.s_l.setGravity(Gravity.CENTER);
	
	this.scroll.addView(this.s_l);
	
	this.layout.addView(this.scroll);
	
	this.wd = new PopupWindow(this.layout, c.ww, c.wh, true);
}

WES_BlockSelect.prototype = {
	
	toString: function() {
		return "['" + this.name + "' - BlockSelectWindow]";
	},
	
	isVisible: function() {
		return this.vis;
	},
	
	setVisible: function(bool) {
		var that = this;
		if(bool) {
			if(!(that.vis) && !(this._parent._selectMenuVis)) {
				this._parent._selectMenuVis = true;
				uiThread(function() {try {
					if(that._parent.blockImages === null) {
						that._parent.blockImages = new c.l(ctx);
						that._parent.blockImages.setOrientation(c.l.VERTICAL);
						that._parent.blockImages.setGravity(Gravity.CENTER);
						that._parent.blockImagesData = [];
						that.s_l.addView(that._parent.blockImages);
						loadBlockImages(that);
					}else {
						reloadBlockImages(that);
						that.s_l.addView(that._parent.blockImages);
					}
					that.wd.showAtLocation(ctx.getWindow().getDecorView(), Gravity.TOP | Gravity.RIGHT, 0, 0);
					that.vis = true;
				}catch(e) {
					showError(e);
				}});
			}
		}else {
			if(that.vis) {
				that._parent._selectMenuVis = false;
				uiThread(function() {try {
					that.wd.dismiss();
					that.s_l.removeAllViews();
					that.vis = false;
				}catch(e) {
					showError(e);
				}});
			}
		}
	},
	
	confirm: function() {
		var id = this.direct_id.getText() + "";
		var data = this.direct_data.getText() + "";
		if(id == "") {
			WES_Toast("블럭을 선택하거나 아이디, 데이터를 입력해 주세요", 1);
			return false;
		}
		if(data == "") {
			data = "0";
		}
		this.confirmFunc(id, data);
		this.setVisible(false);
	},
	
	cancel: function() {
		this.cancelFunc();
		this.setVisible(false);
	}
}



function newLevel(str) {
	onMap = true;
	main.loadSetting();
	if(main.get("ButtonVis")) {
		main.setButtonVisible(true);
	}else {
		WES_Toast("버튼이 보이지 않게 설정 되어 있습니다", 1);
	}
}

function leaveGame() {
	thread(function() {try {
		onMap = false;
		main.saveSetting();
		main.setButtonVisible(false);
		if(main.currentMenu !== null) {
			main.setMenuVisible(false);
			main.currentMenu = null;
		}
	}catch(e) {
		showError(e, WarnType.WARNING);
	}}).start();
}

function modTick() {
	if(main.asynceBuffer.length > 0) {
		main._onWork = true;
		try {
			var w = main.asynceBuffer.shift();
			Level.setTile(w[0], w[1], w[2], w[3], w[4]);
		}catch(e) {
			showError(e);
		}
		if(++main._workTick >= 200) {
			main._workTick = 0;
			msg("MSG NOW WORKING... LEFT: " + main.asynceBuffer.length);
		}
	}else {
		if(main._onWork) {
			main._onWork = false;
			main._workTick = 200;
			msg("MSG JOB FINISH");
		}
	}
}

function useItem(x, y, z, itemId, blockId, side) {
	if(Player.getCarriedItem() === 271) {
		preventDefault();
		highlightBlock(x, y, z);
		var editor = main.editorGroup.get(Player.getName(Player.getEntity()));
		if(editor === false) {
			WES_Toast('MSG ERROR CANT FIND PLAYER', 2);
			return;
		}
		editor.setPos1(new Vector3(x, y, z));
		WES_Toast("MSG POS1 SET");
	}
}

function startDestroyBlock(x, y, z, side) {
	if(Player.getCarriedItem() === 271) {
		highlightBlock(x, y, z);
		var editor = main.editorGroup.get(Player.getName(Player.getEntity()));
		if(editor === false) {
			WES_Toast('MSG ERROR CANT FIND PLAYER', 2);
			return;
		}
		editor.setPos2(new Vector3(x, y, z));
		WES_Toast("MSG POS2 SET");
	}
}

function destroyBlock(x, y, z, side) {
	if(Player.getCarriedItem() === 271) {
		preventDefault();
	}
}



var main = new WorldEditScript(FILE_MAIN_DATA);
main.init();



function highlightBlock(x, y, z) {
	var temp = {
		id: Level.getTile(x, y, z),
		data: Level.getData(x, y, z)
	}
	
	if(temp.id === 41) {
		return;
	}
	
	thread(function() {try {
		Level.setTile(x, y, z, 41, 0);
		sleep(1000);
		Level.setTile(x, y, z, temp.id, temp.data);
	}catch(e) {
		showError(e);
	}}).start();
}

function msg(str, target) {
	if(target === undefined) {
		broadcast(str);
	}else if(EntityExtra.isEqual(Player.getEntity(), target)) {
		toast(str);
	}else {
		broadcast("(" + Player.getName(target) + ") " + str);
	}
}

var blockData = ["0:0", "1:0", "1:1", "1:2", "1:3", "1:4", "1:5", "1:6", "2:0", "3:0", "4:0", "5:0", "6:0", "6:1", "6:2", "6:3", "6:4", "6:5", "7:0", "8:0", "9:0", "10:0", "11:0", "12:0", "12:1", "13:0", "14:0", "15:0", "16:0", "17:0", "17:1", "17:2", "17:3", "18:0", "18:1", "18:2", "18:3", "19:0", "20:0", "21:0", "22:0", "24:0", "24:1", "24:2", "26:0", "27:0", "30:0", "31:0", "32:0", "35:0", "35:1", "35:2", "35:3", "35:4", "35:5", "35:6", "35:7", "35:8", "35:9", "35:10", "35:11", "35:12", "35:13", "35:14", "35:15", "37:0", "38:0", "38:1", "38:2", "38:3", "38:4", "38:5", "38:6", "38:7", "38:8", "39:0", "40:0", "41:0", "42:0", "43:0", "43:1", "43:2", "43:3", "43:4", "43:5", "43:6", "43:7", "44:0", "44:1", "44:2", "44:3", "44:4", "44:5", "44:6", "44:7", "45:0", "46:0", "47:0", "48:0", "49:0", "50:0", "51:0", "52:0", "53:0", "54:0", "56:0", "57:0", "58:0", "59:0", "60:0", "60:1", "61:0", "62:0", "63:0", "64:0", "65:0", "66:0", "67:0", "68:0", "71:0", "73:0", "74:0", "78:0", "79:0", "80:0", "81:0", "82:0", "83:0", "85:0", "86:0", "87:0", "88:0", "89:0", "90:0", "91:0", "92:0", "95:0", "96:0", "97:0", "97:1", "97:2", "97:3", "97:4", "97:5", "98:0", "98:1", "98:2", "98:3", "99:0", "100:0", "101:0", "102:0", "103:0", "104:0", "105:0", "106:0", "107:0", "108:0", "109:0", "110:0", "111:0", "112:0", "113:0", "114:0", "115:0", "116:0", "117:0", "120:0", "120:15", "121:0", "126:0", "127:0", "128:0", "129:0", "133:0", "134:0", "135:0", "136:0", "139:0", "139:1", "140:0", "141:0", "142:0", "144:0", "145:0", "145:1", "145:2", "152:0", "153:0", "155:0", "155:1", "155:2", "156:0", "157:0", "158:0", "159:0", "159:1", "159:2", "159:3", "159:4", "159:5", "159:6", "159:7", "159:8", "159:9", "159:10", "159:11", "159:12", "159:13", "159:14", "159:15", "161:0", "161:1", "162:0", "162:1", "163:0", "164:0", "170:0", "171:0", "171:1", "171:2", "171:3", "171:4", "171:5", "171:6", "171:7", "171:8", "171:9", "171:10", "171:11", "171:12", "171:13", "171:14", "171:15", "172:0", "173:0", "174:0", "175:0", "175:1", "175:2", "175:3", "175:4", "175:5", "183:0", "184:0", "185:0", "186:0", "187:0", "198:0", "243:0", "244:0", "245:0", "246:0", "247:0", "247:1", "247:2", "248:0", "249:0"];

//type -1: No image
//type -2: Custom image
var blockImageData = [
["0:0", -1, [], false],
["1:0", BlockTypes.CUBE, [["stone", 0]], true],
["1:1", BlockTypes.CUBE, [["stone", 1]], true],
["1:2", BlockTypes.CUBE, [["stone", 2]], true],
["1:3", BlockTypes.CUBE, [["stone", 3]], true],
["1:4", BlockTypes.CUBE, [["stone", 4]], true],
["1:5", BlockTypes.CUBE, [["stone", 5]], true],
["1:6", BlockTypes.CUBE, [["stone", 6]], true],
["2:0", BlockTypes.CUBE, [["grass", 3], ["grass", 3], ["grass", 2]], true],
["3:0", BlockTypes.CUBE, [["dirt", 0]], true],
["4:0", BlockTypes.CUBE, [["cobblestone", 0]], true],
["5:0", BlockTypes.CUBE, [["planks", 0]], true],
["6:0", BlockTypes.GRASS, [["sapling", 0]], false],
["6:1", BlockTypes.GRASS, [["sapling", 1]], false],
["6:2", BlockTypes.GRASS, [["sapling", 2]], false],
["6:3", BlockTypes.GRASS, [["sapling", 3]], false],
["6:4", BlockTypes.GRASS, [["sapling", 3]], false],
["6:5", BlockTypes.GRASS, [["sapling", 4]], false],
["7:0", BlockTypes.CUBE, [["bedrock", 0]], true],
["8:0", BlockTypes.PATHGRASS, [["flowing_water", 0]], false],
["9:0", BlockTypes.PATHGRASS, [["still_water", 0]], true],
["10:0", BlockTypes.PATHGRASS, [["flowing_lava", 0]], false],
["11:0", BlockTypes.PATHGRASS, [["still_lava", 0]], true],
["12:0", BlockTypes.CUBE, [["sand", 0]], true],
["12:1", BlockTypes.CUBE, [["sand", 1]], true],
["13:0", BlockTypes.CUBE, [["gravel", 0]], true],
["14:0", BlockTypes.CUBE, [["gold_ore", 0]], true],
["15:0", BlockTypes.CUBE, [["iron_ore", 0]], true],
["16:0", BlockTypes.CUBE, [["coal_ore", 0]], true],
["17:0", BlockTypes.CUBE, [["log", 0], ["log", 0], ["log", 1]], true],
["17:1", BlockTypes.CUBE, [["log", 2], ["log", 2], ["log", 3]], true], 
["17:2", BlockTypes.CUBE, [["log", 4], ["log", 4], ["log", 5]], true],
["17:3", BlockTypes.CUBE, [["log", 6], ["log", 6], ["log", 7]], true],
["18:0", BlockTypes.CUBE, [["leaves_opaque", 0]], true],
["18:1", BlockTypes.CUBE, [["leaves_opaque", 1]], true], 
["18:2", BlockTypes.CUBE, [["leaves_opaque", 2]], true],
["18:3", BlockTypes.CUBE, [["leaves_opaque", 3]], true],
["19:0", BlockTypes.CUBE, [["sponge", 0]], true],
["20:0", BlockTypes.CUBE, [["glass", 0]], true],
["21:0", BlockTypes.CUBE, [["lapis_ore", 0]], true],
["22:0", BlockTypes.CUBE, [["lapis_block", 0]], true],
["24:0", BlockTypes.CUBE, [["sandstone", 0], ["sandstone", 0], ["sandstone", 3]], true],
["24:1", BlockTypes.CUBE, [["sandstone", 1], ["sandstone", 1], ["sandstone", 3]], true],
["24:2", BlockTypes.CUBE, [["sandstone", 2], ["sandstone", 2], ["sandstone", 3]], true],
["26:0", BlockTypes.GRASS, [["bed", 0]], false],
["27:0", BlockTypes.GRASS, [["rail_golden", 0]], false],
["30:0", BlockTypes.GRASS, [["web", 0]], false],
["31:0", BlockTypes.GRASS, [["tallgrass", 0]], false],
["32:0", BlockTypes.GRASS, [["tallgrass", 1]], false],
["35:0", BlockTypes.CUBE, [["wool", 0]], true],
["35:1", BlockTypes.CUBE, [["wool", 1]], true],
["35:2", BlockTypes.CUBE, [["wool", 2]], true],
["35:3", BlockTypes.CUBE, [["wool", 3]], true],
["35:4", BlockTypes.CUBE, [["wool", 4]], true],
["35:5", BlockTypes.CUBE, [["wool", 5]], true],
["35:6", BlockTypes.CUBE, [["wool", 6]], true],
["35:7", BlockTypes.CUBE, [["wool", 7]], true],
["35:8", BlockTypes.CUBE, [["wool", 8]], true],
["35:9", BlockTypes.CUBE, [["wool", 9]], true],
["35:10", BlockTypes.CUBE, [["wool", 10]], true],
["35:11", BlockTypes.CUBE, [["wool", 11]], true],
["35:12", BlockTypes.CUBE, [["wool", 12]], true],
["35:13", BlockTypes.CUBE, [["wool", 13]], true],
["35:14", BlockTypes.CUBE, [["wool", 14]], true],
["35:15", BlockTypes.CUBE, [["wool", 15]], true],
["37:0", BlockTypes.GRASS, [["flower1", 0]], false],
["38:0", BlockTypes.GRASS, [["flower2", 0]], false],
["38:1", BlockTypes.GRASS, [["flower2", 1]], false],
["38:2", BlockTypes.GRASS, [["flower2", 2]], false],
["38:3", BlockTypes.GRASS, [["flower2", 3]], false],
["38:4", BlockTypes.GRASS, [["flower2", 4]], false],
["38:5", BlockTypes.GRASS, [["flower2", 5]], false],
["38:6", BlockTypes.GRASS, [["flower2", 6]], false],
["38:7", BlockTypes.GRASS, [["flower2", 7]], false],
["38:8", BlockTypes.GRASS, [["flower2", 8]], false],
["39:0", BlockTypes.GRASS, [["mushroom_brown", 0]], false],
["40:0", BlockTypes.GRASS, [["mushroom_red", 0]], false],
["41:0", BlockTypes.CUBE, [["gold_block", 0]], true],
["42:0", BlockTypes.CUBE, [["iron_block", 0]], true],
["43:0", BlockTypes.CUBE, [["stone_slab", 1], ["stone_slab", 1], ["stone_slab", 0]], true],
["43:1", BlockTypes.CUBE, [["sandstone", 0], ["sandstone", 0], ["sandstone", 3]], true],
["43:2", BlockTypes.CUBE, [["planks", 0]], true],
["43:3", BlockTypes.CUBE, [["cobblestone", 0]], true],
["43:4", BlockTypes.CUBE, [["brick", 0]], true],
["43:5", BlockTypes.CUBE, [["stonebrick", 0]], true],
["43:6", BlockTypes.CUBE, [["stone_slab", 0]], true],
["43:7", BlockTypes.CUBE, [["quartz_block", 0]], true],
["44:0", BlockTypes.SLAB, [["stone_slab", 1], ["stone_slab", 1], ["stone_slab", 0]], true],
["44:1", BlockTypes.SLAB, [["sandstone", 0], ["sandstone", 0], ["sandstone", 3]], true],
["44:2", BlockTypes.SLAB, [["planks", 0]], true],
["44:3", BlockTypes.SLAB, [["cobblestone", 0]], true],
["44:4", BlockTypes.SLAB, [["brick", 0]], true],
["44:5", BlockTypes.SLAB, [["stonebrick", 0]], true],
["44:6", BlockTypes.SLAB, [["stone_slab", 0]], true],
["44:7", BlockTypes.SLAB, [["quartz_block", 0]], true],
["45:0", BlockTypes.CUBE, [["brick", 0]], true],
["46:0", BlockTypes.CUBE, [["tnt", 0], ["tnt", 0], ["tnt", 1]], true],
["47:0", BlockTypes.CUBE, [["bookshelf", 0], ["bookshelf", 0], ["planks", 0]], true],
["48:0", BlockTypes.CUBE, [["cobblestone_mossy", 0]], true],
["49:0", BlockTypes.CUBE, [["obsidian", 0]], true],
["50:0", BlockTypes.GRASS, [["torch_on", 0]], false],
["51:0", BlockTypes.GRASS, [["fire", 0]], false],
["52:0", BlockTypes.CUBE, [["mob_spawner", 0]], true],
["53:0", BlockTypes.STAIR, [["planks", 0]], true],
["54:0", BlockTypes.CUBE, [["chest_inventory", 1], ["chest_inventory", 2], ["chest_inventory", 0]], true],
["56:0", BlockTypes.CUBE, [["diamond_ore", 0]], true],
["57:0", BlockTypes.CUBE, [["diamond_block", 0]], true],
["58:0", BlockTypes.CUBE, [["crafting_table", 1], ["crafting_table", 2], ["crafting_table", 0]], true],
["59:0", BlockTypes.GRASS, [["wheat", 7]], false],
["60:0", BlockTypes.PATHGRASS, [["dirt", 0], ["dirt", 0], ["farmland", 0]], false],
["60:1", BlockTypes.PATHGRASS, [["dirt", 0], ["dirt", 0], ["farmland", 1]], false],
["61:0", BlockTypes.CUBE, [["furnace", 0], ["furnace", 2], ["furnace", 3]], true],
["62:0", BlockTypes.CUBE, [["furnace", 1], ["furnace", 2], ["furnace", 3]], false],
//FIXME sign
["63:0", -1, [], false],
["64:0", BlockTypes.GRASS, [["door", 1]], false],
["65:0", BlockTypes.GRASS, [["ladder", 0]], false],
["66:0", BlockTypes.GRASS, [["rail_normal", 0]], false],
["67:0", BlockTypes.STAIR, [["cobblestone", 0]], true],
//FIXME wallsign
["68:0", -1, [], false],
["71:0", BlockTypes.GRASS, [["door", 3]], false],
["73:0", BlockTypes.CUBE, [["redstone_ore", 0]], true],
["74:0", BlockTypes.CUBE, [["redstone_ore", 0]], false],
["78:0", BlockTypes.SNOW, [["snow", 0]], true],
["79:0", BlockTypes.CUBE, [["ice", 0]], true],
["80:0", BlockTypes.CUBE, [["snow", 0]], true],
["81:0", BlockTypes.GRASS, [["cactus", 0]], false],
["82:0", BlockTypes.CUBE, [["clay", 0]], true],
["83:0", BlockTypes.GRASS, [["reeds", 0]], false],
["85:0", BlockTypes.FENCE, [["planks", 0]], true],
["86:0", BlockTypes.CUBE, [["pumpkin", 2], ["pumpkin", 1], ["pumpkin", 0]], true],
["87:0", BlockTypes.CUBE, [["netherrack", 0]], true],
["88:0", BlockTypes.CUBE, [["soul_sand", 0]], true],
["89:0", BlockTypes.CUBE, [["glowstone", 0]], false],
["90:0", BlockTypes.GRASS, [["portal", 0]], false],
["91:0", BlockTypes.CUBE, [["pumpkin", 3], ["pumpkin", 1], ["pumpkin", 0]], false],
["92:0", BlockTypes.GRASS, [["cake_top", 0]], false],
["95:0", -1, [], false],
["96:0", BlockTypes.TRAPDOOR, [["trapdoor", 0]], true],
["97:0", BlockTypes.CUBE, [["stone", 0]], false],
["97:1", BlockTypes.CUBE, [["cobblestone", 0]], false],
["97:2", BlockTypes.CUBE, [["stonebrick", 0]], false],
["97:3", BlockTypes.CUBE, [["stonebrick", 1]], false],
["97:4", BlockTypes.CUBE, [["stonebrick", 2]], false],
["97:5", BlockTypes.CUBE, [["stonebrick", 3]], false],
["98:0", BlockTypes.CUBE, [["stonebrick", 0]], true],
["98:1", BlockTypes.CUBE, [["stonebrick", 1]], true],
["98:2", BlockTypes.CUBE, [["stonebrick", 2]], true],
["98:3", BlockTypes.CUBE, [["stonebrick", 3]], true],
["99:0", BlockTypes.CUBE, [["mushroom_block", 0]], true],
["100:0", BlockTypes.CUBE, [["mushroom_block", 1]], true],
["101:0", BlockTypes.GRASS, [["iron_bars", 0]], false],
["102:0", BlockTypes.GRASS, [["glass", 0]], false],
["103:0", BlockTypes.CUBE, [["melon", 0], ["melon", 0], ["melon", 1]], true],
["104:0", BlockTypes.GRASS, [["pumpkin_stem", 0]], false],
["105:0", BlockTypes.GRASS, [["melon_stem", 0]], false],
["106:0", BlockTypes.GRASS, [["vine", 0]], false],
//FIXME fencegate
["107:0", BlockTypes.GRASS, [["planks", 0]], false],
["108:0", BlockTypes.STAIR,
[["brick", 0]], true],
["109:0", BlockTypes.STAIR, [["stonebrick", 0]], true],
["110:0", BlockTypes.CUBE, [["mycelium", 0], ["mycelium", 0], ["mycelium", 1]], true],
["111:0", BlockTypes.GRASS, [["waterlily", 0]], false],
["112:0", BlockTypes.CUBE, [["nether_brick", 0]], true],
["113:0", BlockTypes.FENCE, [["nether_brick", 0]], true],
["114:0", BlockTypes.STAIR, [["nether_brick", 0]], true],
["115:0", BlockTypes.GRASS, [["nether_wart", 2]], false],
["116:0", BlockTypes.GRASS, [["enchanting_table_side", 0]], false],
["117:0", BlockTypes.GRASS, [["brewing_stand", 0]], false],
["120:0", BlockTypes.GRASS, [["endframee", 1]], false],
["120:15", BlockTypes.GRASS, [["endframee", 0]], false],
["121:0", BlockTypes.CUBE, [["end_stone", 0]], true],
["126:0", BlockTypes.GRASS, [["cake_top", 0]], false],
["127:0", BlockTypes.GRASS, [["cocoa", 2]], false],
["128:0", BlockTypes.STAIR, [["sandstone", 0], ["sandstone", 0], ["sandstone", 3]], true],
["129:0", BlockTypes.CUBE, [["emerald_ore", 0]], true],
["133:0", BlockTypes.CUBE, [["emerald_block", 0]], true],
["134:0", BlockTypes.STAIR, [["planks", 1]], true],
["135:0", BlockTypes.STAIR, [["planks", 2]], true],
["136:0", BlockTypes.STAIR, [["planks", 3]], true],
["139:0", BlockTypes.STONEWALL, [["cobblestone", 0]], true],
["139:1", BlockTypes.STONEWALL, [["cobblestone_mossy", 0]], true],
["140:0", BlockTypes.GRASS, [["flower_pot", 0]], false],
["141:0", BlockTypes.GRASS, [["carrots", 3]], false],
["142:0", BlockTypes.GRASS, [["potatoes", 3]], false],
//FIXME HEADS
["144:0", -1, [], false],
["145:0", BlockTypes.GRASS, [["anvil_top_damaged_x", 0]], false],
["145:1", BlockTypes.GRASS, [["anvil_top_damaged_x", 1]], false],
["145:2", BlockTypes.GRASS, [["anvil_top_damaged_x", 2]], false],
["152:0", BlockTypes.CUBE, [["redstone_block", 0]], true],
["153:0", BlockTypes.CUBE, [["quartz_ore", 0]], true],
["155:0", BlockTypes.CUBE, [["quartz_block", 1]], true],
["155:1", BlockTypes.CUBE, [["quartz_block", 3], ["quartz_block", 3], ["quartz_block", 4]], true],
["155:2", BlockTypes.CUBE, [["quartz_block", 5]], true],
["156:0", BlockTypes.STAIR, [["quartz_block", 1]], true],
["157:0", BlockTypes.CUBE, [["planks", 0]], true],
["158:0", BlockTypes.SLAB, [["planks", 0]], true],
["159:0", BlockTypes.CUBE, [["stained_clay", 0]], true],
["159:1", BlockTypes.CUBE, [["stained_clay", 1]], true],
["159:2", BlockTypes.CUBE, [["stained_clay", 2]], true],
["159:3", BlockTypes.CUBE, [["stained_clay", 3]], true],
["159:4", BlockTypes.CUBE, [["stained_clay", 4]], true],
["159:5", BlockTypes.CUBE, [["stained_clay", 5]], true],
["159:6", BlockTypes.CUBE, [["stained_clay", 6]], true],
["159:7", BlockTypes.CUBE, [["stained_clay", 7]], true],
["159:8", BlockTypes.CUBE, [["stained_clay", 8]], true],
["159:9", BlockTypes.CUBE, [["stained_clay", 9]], true],
["159:10", BlockTypes.CUBE, [["stained_clay", 10]], true],
["159:11", BlockTypes.CUBE, [["stained_clay", 11]], true],
["159:12", BlockTypes.CUBE, [["stained_clay", 12]], true],
["159:13", BlockTypes.CUBE, [["stained_clay", 13]], true],
["159:14", BlockTypes.CUBE, [["stained_clay", 14]], true],
["159:15", BlockTypes.CUBE, [["stained_clay", 15]], true],
["161:0", BlockTypes.CUBE, [["leaves_opaque2", 0]], true],
["161:1", BlockTypes.CUBE, [["leaves_opaque2", 1]], true],
["162:0", BlockTypes.CUBE, [["log2", 0], ["log2", 0], ["log2", 1]], true],
["162:1", BlockTypes.CUBE, [["log2", 2], ["log2", 2], ["log2", 3]], true],
["163:0", BlockTypes.STAIR, [["planks", 4]], true],
["164:0", BlockTypes.STAIR, [["planks", 5]], true],
["170:0", BlockTypes.CUBE, [["hayblock", 1], ["hayblock", 1], ["hayblock", 0]], true],
["171:0", BlockTypes.CARPET, [["wool", 0]], true],
["171:1", BlockTypes.CARPET, [["wool", 1]], true],
["171:2", BlockTypes.CARPET, [["wool", 2]], true],
["171:3", BlockTypes.CARPET, [["wool", 3]], true],
["171:4", BlockTypes.CARPET, [["wool", 4]], true],
["171:5", BlockTypes.CARPET, [["wool", 5]], true],
["171:6", BlockTypes.CARPET, [["wool", 6]], true],
["171:7", BlockTypes.CARPET, [["wool", 7]], true],
["171:8", BlockTypes.CARPET, [["wool", 8]], true],
["171:9", BlockTypes.CARPET, [["wool", 9]], true],
["171:10", BlockTypes.CARPET, [["wool", 10]], true],
["171:11", BlockTypes.CARPET, [["wool", 11]], true],
["171:12", BlockTypes.CARPET, [["wool", 12]], true],
["171:13", BlockTypes.CARPET, [["wool", 13]], true],
["171:14", BlockTypes.CARPET, [["wool", 14]], true],
["171:15", BlockTypes.CARPET, [["wool", 15]], true],
["172:0", BlockTypes.CUBE, [["hardened_clay", 0]], true],
["173:0", BlockTypes.CUBE, [["coal_block", 0]], true],
["174:0", BlockTypes.CUBE, [["ice_packed", 0]], true],
["175:0", BlockTypes.GRASS, [["sunflower_additional", 0]], false],
["175:1", BlockTypes.GRESS, [["double_plant_top", 1]], false],
["175:2", BlockTypes.GRESS, [["double_plant_top", 2]], false],
["175:3", BlockTypes.GRESS, [["double_plant_top", 3]], false],
["175:4", BlockTypes.GRESS, [["double_plant_top", 4]], false],
["175:5", BlockTypes.GRESS, [["double_plant_top", 5]], false],
//FIXME fencegate
["183:0", BlockTypes.GRASS, [["planks", 1]], false],
["184:0", BlockTypes.GRASS, [["planks", 2]], false],
["185:0", BlockTypes.GRASS, [["planks", 3]], false],
["186:0", BlockTypes.GRASS, [["planks", 4]], false],
["187:0", BlockTypes.GRASS, [["planks", 5]], false],
["198:0", BlockTypes.PATHGRASS, [["grass_path", 1], ["grass_path", 1], ["grass_path", 0]], true],
["243:0", BlockTypes.CUBE, [["dirt", 2], ["dirt", 2], ["dirt", 1]], true],
["244:0", BlockTypes.GRASS, [["beetroot", 3]], false],
["245:0", BlockTypes.CUBE, [["stonecutter", 1], ["stonecutter", 0], ["stonecutter", 2]], true],
["246:0", BlockTypes.CUBE, [["glowing_obsidian", 0]], false],
["247:0", BlockTypes.CUBE, [["reactor_core", 0]], true],
["247:1", BlockTypes.CUBE, [["reactor_core", 1]], true],
["247:2", BlockTypes.CUBE, [["reactor_core", 2]], true],
["248:0", BlockTypes.CUBE, [["missing_tile", 0]], true],
["249:0", BlockTypes.CUBE, [["missing_tile", 0]], true]
];

function getBlockDataIndex(id, data) {
	var key = id + ":" + data;
	for(var e = 0; e < blockImageData.length; e++) {
		if(blockImageData[e][0] === key) {
			return e;
		}
	}
	key = id + ":" + 0;
	for(var e = 0; e < blockImageData.length; e++) {
		if(blockImageData[e][0] === key) {
			return e;
		}
	}
	return -1;
}

function loadBlockImage(id, data) {
	var index = getBlockDataIndex(id, data);
	if(index === -1) {
		return android.graphics.Bitmap.createBitmap(51, 57, android.graphics.Bitmap.Config.ARGB_8888);
	}
	switch(blockImageData[index][1]) {
		//No image
		case -1:
		return android.graphics.Bitmap.createBitmap(51, 57, android.graphics.Bitmap.Config.ARGB_8888);
		//Custom
		case -2:
		return blockImageData[index][2][0];
		//Normal
		default:
		if(blockImageData[index][2].length === 1) {
			return BlockImageLoader.create(blockImageData[index][2][0], blockImageData[index][2][0], blockImageData[index][2][0], blockImageData[index][1], blockImageData[index][3]);
		}else {
			return BlockImageLoader.create(blockImageData[index][2][0], blockImageData[index][2][1], blockImageData[index][2][2], blockImageData[index][1], blockImageData[index][3]);
		}
	}
}

function getBlockSelectLayout(that, key) {
	var block = key.split(":");
	var layout = new c.r(ctx);
	var layout_p = new c.l.LayoutParams(DIP*0x40, DIP*0x40);
	layout.setLayoutParams(layout_p);
	
	var image = new ImageView(ctx);
	var image_p = new c.r.LayoutParams(c.m, c.m);
	image.setLayoutParams(image_p);
	image.setPadding(DIP*0x08, DIP*0x08, DIP*0x08, DIP*0x08);
	image.setImageBitmap(loadBlockImage(block[0], block[1]));
	layout.addView(image);
	
	var txt = mcpeText(DIP*0x08, key);
	var txt_p = new c.r.LayoutParams(c.m, c.m);
	txt_p.addRule(c.r.ALIGN_PARENT_LEFT);
	txt_p.addRule(c.r.ALIGN_PARENT_TOP);
	txt.setLayoutParams(txt_p);
	txt.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		that.direct_id.setText(block[0]);
		that.direct_data.setText(block[1]);
	}catch(e) {
		showError(e);
	}}}));
	layout.addView(txt);
	
	return [layout, image, txt];
}

function loadBlockImages(that) {thread(function() {try {
	var loading = new CustomProgressBar(3, blockData.length);
	
	var max = Math.floor((c.ww - DIP*0x18)/(DIP*0x40));
	var current = 0;
	var currentLayout = new c.l(ctx);
	currentLayout.setOrientation(c.l.HORIZONTAL);
	currentLayout.setGravity(Gravity.CENTER);
	for(var e = 0; e < blockData.length; e++) {
		if(max == current++) {
			current = 1;
			var last = currentLayout;
			uiThread(function() {try {
				that._parent.blockImages.addView(last);
			}catch(e) {
				showError(e);
			}});
			currentLayout = new c.l(ctx);
			currentLayout.setOrientation(c.l.HORIZONTAL);
			currentLayout.setGravity(Gravity.CENTER);
		}
		var l = getBlockSelectLayout(that, blockData[e]);
		that._parent.blockImagesData[e] = l;
		currentLayout.addView(l[0]);
		uiThread(function() {try {
			loading.setProgress(e+1);
		}catch(e) {
			showError(e);
		}});
	}
	uiThread(function() {try {
		that._parent.blockImages.addView(currentLayout);
	}catch(e) {
		showError(e);
	}});
	loading.close();
}catch(e) {
	showError(e);
}}).start();
}

function reloadBlockImages(that) {thread(function() {try {
	var loading = new CustomProgressBar(3, that._parent.blockImagesData.length);
	uiThread(function() {try {
	for(var e = 0; e < that._parent.blockImagesData.length; e++) {
			that._parent.blockImagesData[e][2].setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
				var block = (view.getText() + "").split(":");
				that.direct_id.setText(block[0]);
				that.direct_data.setText(block[1]);
			}catch(e) {
				toast("Please wait...");
			}}}));
		loading.setProgress(e+1);
	}
	}catch(e) {
		showError(e, WarnType.WARNING);
	}});
	loading.close();
}catch(e) {
	showError(e, WarnType.CRITICAL);
}}).start()}

function stringToCode(str) {
	var chars = str + "";
	var code = "";
	for(var e = 0; e < chars.length; e++) {
		code += chars.charCodeAt(e).toString(35) + "z";
	}
	return code + "E";
}

function codeToString(code) {
	var t = code.split(String.fromCharCode(122));
	var str = "";
	for(var e = 0; e < t.length-1; e++) {
		var c = String.fromCharCode(parseInt(t[e], 35));
		if(t == "E") {
			break;
		}
		str += t;
	}
	return str;
}