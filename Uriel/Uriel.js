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

const className = "Uriel";
const VERSION = "0.2";
const VERSION_CODE = 101;

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
var DIP = PIXEL;
var randomId = parseInt(Math.floor(Math.random()*0xffffff));
function randomId2() {
	return parseInt(Math.floor(Math.random()*0xffffff));
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

Assets.mainColor = Color.parseColor("#117733");

var p = Color.parseColor('#aaaaaa');
var o = Color.parseColor('#00ff00');
Assets.launch1 = new NinePatchAssetCreator([
p,p,p,p,p,p,
p,o,p,p,p,p,
],6, 2, 8);

var p = Color.parseColor('#aaaaaa');
var o = Color.parseColor('#ff8800');
Assets.launch2 = new NinePatchAssetCreator([
p,p,p,p,p,p,
p,o,p,p,p,p,
],6, 2, 8);

var p = Color.parseColor('#aaaaaa');
var o = Color.parseColor('#ff0000');
Assets.launch3 = new NinePatchAssetCreator([
p,p,p,p,p,p,
p,o,p,p,p,p,
],6, 2, 8);



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
			print(e);
			return false;
		}}}));
	}
	if(onClickFunction !== null && onClickFunction !== undefined) {
		btn.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
			onClickFunction(view, event);
		}catch(e) {
			print(e);
		}}}));
	}
	if(onLongClickFunction !== null && onLongClickFunction !== undefined) {
		btn.setOnLongClickListener(View.OnLongClickListener({onLongClick: function(view, event) {try {
			return onLongClickFunction(view, event);
		}catch(e) {
			print(e);
			return false;
		}}}));
	}
	return btn;
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



function CustomProgressBar(type, max, text) {
	var that = this;
	switch(type) {
		
		case 0:
		this.bar = new ProgressBar(ctx);
		this.window = new PopupWindow(this.bar, DIP*0x30, DIP*0x30, false);
		this.window.setTouchable(false);
		uiThread(function() {try {
			that.window.showAtLocation(c.d, Gravity.CENTER, 0, 0);
		}catch(e) {
			showError(e);
		}});
		break;
		
		case 1:
		this.bar = new ProgressBar(ctx);
		this.bar.setLayoutParams(new c.l.LayoutParams(DIP*0x30, DIP*0x30));
		this.layout = new c.l(ctx);
		this.layout.setBackgroundColor(Color.argb(0x55, 0, 0, 0));
		this.layout.addView(this.bar);
		this.window = new PopupWindow(this.layout, c.ww, c.wh, false);
		this.window.setTouchable(true);
		uiThread(function() {try {
			that.window.showAtLocation(c.d, Gravity.CENTER, 0, 0);
		}catch(e) {
			showError(e);
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
			showError(e);
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
			showError(e);
		}});
		break;
		
		case 4:
		this.layout = new c.l(ctx);
		this.layout.setOrientation(c.l.VERTICAL);
		this.layout.setGravity(Gravity.CENTER);
		this.layout.setBackgroundColor(Color.argb(0xaa, 0, 0, 0));
		this.text = mcText(text, null, false, null, null, null, null, null, [0, DIP*0x10, 0, 0]);
		this.bar = new ProgressBar(ctx);
		var bar_p = new c.l.LayoutParams(DIP*0x30, DIP*0x30);
		this.bar.setLayoutParams(bar_p);
		this.layout.addView(this.bar);
		this.layout.addView(this.text);
		this.window = new PopupWindow(this.layout, c.ww, c.wh, true);
		this.window.setTouchable(true);
		uiThread(function() {try {
			that.window.showAtLocation(c.d, Gravity.BOTTOM, 0, 0);
		}catch(e) {
			showError(e);
		}});
		break;
		
		case 5:
		this.layout = new c.l(ctx);
		this.layout.setOrientation(c.l.HORIZONTAL);
		this.layout.setGravity(Gravity.CENTER);
		this.layout.setBackgroundColor(Color.argb(0xaa, 0, 0, 0));
		this.text = mcText(text, null, false, null, null, null, null, null, [DIP*0x10, 0, 0, 0]);
		this.bar = new ProgressBar(ctx);
		var bar_p = new c.l.LayoutParams(DIP*0x30, DIP*0x30);
		this.bar.setLayoutParams(bar_p);
		this.layout.addView(this.bar);
		this.layout.addView(this.text);
		this.window = new PopupWindow(this.layout, c.ww, c.wh, true);
		this.window.setTouchable(true);
		
		this.e_text = mcButton("Hide", null, true, null, null, null, null, null, null, null, null, function(view, event) {
			that.close();
			toast("Don't turn off Minecraft while Backup...");
		}, null);
		this.exit = new PopupWindow(this.e_text, c.w, c.w, false);
		
		uiThread(function() {try {
			that.window.showAtLocation(c.d, Gravity.BOTTOM, 0, 0);
			that.exit.showAtLocation(c.d, Gravity.BOTTOM | Gravity.RIGHT, 0, 0);
		}catch(e) {
			showError(e);
		}});
		break;
		
		case 6:
		this.layout = new c.l(ctx);
		this.layout.setOrientation(c.l.VERTICAL);
		this.layout.setGravity(Gravity.CENTER);
		this.layout.setBackgroundColor(Color.argb(0xaa, 0, 0, 0));
		this.text = mcText(text, null, false, null, null, null, null, null, [0, 0, 0, DIP*0x10]);
		this.bar = new ProgressBar(ctx, null, android.R.attr.progressBarStyleHorizontal);
		this.bar.setMax(max);
		var f = new ClipDrawable(new ColorDrawable(Color.parseColor("#80ff80")), Gravity.LEFT, ClipDrawable.HORIZONTAL);
		var b = new ColorDrawable(Color.parseColor("#808080"));
		var draw = this.bar.getProgressDrawable();
		draw.setDrawableByLayerId(android.R.id.progress, f);
		draw.setDrawableByLayerId(android.R.id.background, b);
		var bar_p = new c.l.LayoutParams(DIP*0x100, DIP*0x04);
		this.bar.setLayoutParams(bar_p);
		this.layout.addView(this.text);
		this.layout.addView(this.bar);
		this.window = new PopupWindow(this.layout, c.ww, c.wh, true);
		this.window.setTouchable(true);
		
		this.e_text = mcButton("Hide", null, true, null, null, null, null, null, null, null, null, function(view, event) {
			that.close();
			toast("Don't turn off Minecraft while Backup...");
		}, null);
		this.exit = new PopupWindow(this.e_text, c.w, c.w, false);
		
		uiThread(function() {try {
			that.window.showAtLocation(c.d, Gravity.TOP, 0, 0);
			that.exit.showAtLocation(c.d, Gravity.BOTTOM | Gravity.RIGHT, 0, 0);
		}catch(e) {
			showError(e);
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
			showError(e);
		}});
	},
	
	setProgress: function(value) {
		var that = this;
		uiThread(function() {try {
			that.bar.setProgress(value);
		}catch(e) {
			showError(e);
		}});
	},
	
	setText: function(text) {
		var that = this;
		uiThread(function() {try {
			that.text.setText(text);
		}catch(e) {
			showError(e);
		}});
	},
	
	close: function() {
		var that = this;
		uiThread(function() {try {
			if(that.window.isShowing()) {
				that.window.dismiss();
			}
			if(that.exit !== undefined && that.exit.isShowing()) {
				that.exit.dismiss();
			}
		}catch(e) {
			showError(e);
		}});
	}
}



function Uriel(setting) {
	this.TYPE = "ModPE_Script";
	this.NAME = "Uriel";
	this.CODE_NAME = "MapBackup";
	this.AUTHOR = "Semteul";
	this.GROUP = "if(team);";
	if(setting instanceof File) {
		this.settingFile = setting;
	}else if(setting instanceof string) {
		this.settingFile = new File(setting);
	}
	this.setting = null;
	this.defaultBackupDir = FILE_SD_CARD + "/games/com.mojang/minecraftWorldBackups";
	this.defaultSetting = {
		ButtonX: DIP*0x80,
		ButtonY: 0,
		BackupDir: this.defaultBackupDir,
		MaxAutoBackupSize: 256
	}
	this.button = null;
	this.buttonVis = false;
	this.menu = null;
	this.menuVis = false;
	this._onMove = false;
}

Uriel.prototype = {
	
	toString: function() {
		return "[Uriel " + VERSION + "]";
	},
	
	init: function() {
		this.getDir();
	},
	
	loadSetting: function() {
		if(this.settingFile.exists()) {
			this.setting = loadJSON(this.settingFile);
			if(this.setting === false || this.setting === null || this.setting === undefined || this.setting.toString() !== "[object Object]") {
				toast("설정파일 손상!\n복구 시도중입니다...");
				this.settingFile.delete();
				this.saveSetting();
			}
		}else {
			this.saveSetting();
		}
	},
	
	saveSetting: function() {
		if(!(this.settingFile.exists())) {
			this.settingFile.createNewFile();
			this.setting = this.defaultSetting;
		}
		if(!(saveJSON(this.settingFile, this.setting))) {
			toast("경고! 저장불가능\n저장장치를 확인하세요.");
		}
	},
	
	get: function(article) {
		if(this.setting === null) {
			this.loadSetting();
		}
		if(this.setting[article] === undefined) {
			toast("설정 데이터 손상.\n해당 데이터를 벅구중입니다 (" + article + ")");
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
			toast("알 수 없는 자료 저장시도 (" + article + ")");
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
					showError(e);
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
					showError(e);
				}});
			}else {
				return false;
			}
		}
	},
	
	getDir: function() {
		var file = new File(this.get("BackupDir"));
		if(!file.exists()) {
			file.mkdirs();
		}
		return file;
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
				this.setMenu(Menus.main);
				uiThread(function() {try {
					that.menu.showAtLocation(c.d, Gravity.RIGHT|Gravity.TOP, 0, 0);
					that.menuVis = true;
				}catch(e) {
					showError(e);
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
					showError(e);
				}});
			}else {
				return false;
			}
		}
	},
	
	buildButton: function() {
		var that = this;
		var load = new CustomProgressBar(0, 0);
		var btn = new ImageButton(ctx);
		var mcFolder = new File(FILE_SD_CARD, "games/com.mojang");
		var total = mcFolder.getTotalSpace();
		var free = mcFolder.getFreeSpace();
		var sc = (free/total < 0.05);
		if(sc) {
			btn.setImageBitmap(Assets.launch3.scaleBitmap);
		}else {
			btn.setImageBitmap(Assets.launch1.scaleBitmap);
		}
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
			showError(e);
		}
		return false;
		}}));
		btn.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
			if(!(that.menuVis) || that.currentMenu === null) {
				if(that.menu === null) {
					that.buildMenu();
				}
				that.setMenuVisible(true);
			}
		}catch(e) {
			showError(e);
		}}}));
		btn.setOnLongClickListener(View.OnLongClickListener({onLongClick: function(view, event) {try {
			that._onMove = true;
		}catch(e) {
			showError(e);
		}
		return true;
		}}));
		this.buttonImage = btn;
		this.button = new PopupWindow(btn, DIP*0x40, DIP*0x20, false);
		this.buttonVis = false;
		load.close();
	},
	
	buildMenu: function() {
		var that = this;
		var lo = new c.r(ctx);
		lo.setBackgroundColor(Color.argb(0xaa, 0, 0, 0));
		
		var lo2 = new c.r(ctx);
		lo2.setId(randomId+1);
		var lo2_p = new c.r.LayoutParams(c.ww, c.w);
		lo2_p.addRule(c.r.ALIGN_PARENT_TOP);
		lo2.setLayoutParams(lo2_p);
		lo2.setBackgroundColor(Assets.mainColor);
		
		var back = mcButton("Back", null, false, Assets.mainColor, null, null, null, [DIP*0x08, DIP*0x08, DIP*0x08, DIP*0x08], null, null, null, function(view, event) {
			that.menuClose();
		}, null);
		var back_p = new c.r.LayoutParams(c.w, c.w);
		back_p.addRule(c.r.ALIGN_PARENT_LEFT);
		back.setLayoutParams(back_p);
		back.setBackgroundColor(Color.WHITE);
		
		lo2.addView(back);
		
		var title = new mcText(this.NAME, null, false, Color.WHITE);
		var title_p = new c.r.LayoutParams(c.w, c.w);
		title_p.addRule(c.r.CENTER_IN_PARENT);
		title.setLayoutParams(title_p);
		
		lo2.addView(title);
		
		var sl = new ScrollView(ctx);
		sl.setId(randomId+2);
		var sl_p = new c.r.LayoutParams(c.m, c.m);
		sl_p.addRule(c.r.BELOW, lo2.getId());
		sl.setLayoutParams(sl_p);
		
		lo.addView(lo2);
		lo.addView(sl);
		
		this.menuTitle = title;
		this.menuLayout = sl;
		this.menu = new PopupWindow(lo, c.ww, c.wh, true);
	},
	
	setMenu: function(menu) {
		var that = this;
		if(menu instanceof Menu) {
			this.currentMenu = menu;
			uiThread(function() {try {
				that.menuTitle.setText(that.currentMenu.name);
				that.menuLayout.removeAllViews();
				that.menuLayout.addView(that.currentMenu.getLayout());
			}catch(e) {
				showError(e);
			}});
		}else {
			this.currentMenu = null;
			this.setMenuVisible(false);
		}
	},
	
	menuClose: function() {
		if(this.currentMenu.getParent() === null) {
			this.setMenuVisible(false);
		}else {
			this.setMenu(this.currentMenu.getParent());
		}
	}
}



function Menu(parent, name) {
	this._parent = parent;
	this.name = name;
	this.parent = null;
	this.layout = null;
}

Menu.prototype = {
	
	toString: function() {
		return "[" + this.name + " Menu]";
	},
	
	setParent: function(menu) {
		this.parent = menu
	},
	
	getParent: function() {
		return this.parent;
	},
	
	getLayout: function() {
		if(this.layout === null) {
			this.build();
		}
		return this.layout;
	},
	
	build: function() {
		throw new Error("This method is abstract.");
		//Make this.layout 
	}
}



function WorldDir(folder) {
	this.folder = folder;
	this.maps = [];
	this.refresh();
}

WorldDir.prototype = {
	
	refresh: function() {
		this.maps = [];
		var mapFolders = this.folder.listFiles();
		for(var e = 0; e < mapFolders.length; e++) {
			var levelName = new File(mapFolders[e], "levelname.txt");
			if(levelName.exists()) {
				this.maps.push([readLine(levelName), mapFolders[e]]);
			}
		}
	},
	
	getLayout: function() {
		var that = this;
		var lo = new c.l(ctx);
		lo.setOrientation(c.l.VERTICAL);
		
		thread(function() {try {
			for(var e = 0; e < that.maps.length; e++) {
				var worldName = that.maps[e][0];
				var worldFile = that.maps[e][1];
				
				var name = mcText(worldName, DIP*16);
				name.setId(randomId2());
				var name_p = new c.r.LayoutParams(c.w, c.w);
				name_p.addRule(c.r.ALIGN_PARENT_TOP);
				name_p.addRule(c.r.ALIGN_PARENT_LEFT);
				name_p.setMargins(DIP*8, DIP*8, 0, 0);
				name.setLayoutParams(name_p);
				
				var size = mcText(dataSizeToString(getDirSize(worldFile)), DIP*12, false, Color.GRAY);
				var size_p = new c.r.LayoutParams(c.w, c.w);
				size_p.addRule(c.r.BELOW, name.getId());
				size_p.addRule(c.r.ALIGN_PARENT_LEFT);
				size_p.setMargins(DIP*8, DIP*8, 0, 0);
				size.setLayoutParams(size_p);
				
				var backup = new mcButton("Backup", DIP*10, false, Color.WHITE, null, null, null, null, null, null, null, function(view, event) {
					Backup(view.getTag()[0], view.getTag()[1]);
				}, null);
				backup.setTag([worldName, worldFile]);
				backup.setBackgroundColor(Assets.mainColor);
				var backup_p = new c.r.LayoutParams(c.w, c.w);
				backup_p.setMargins(0, DIP*8, DIP*8, DIP*8);
				backup_p.addRule(c.r.ALIGN_PARENT_RIGHT);
				backup.setLayoutParams(backup_p);
				
				var lo2 = new c.r(ctx);
				var lo2_p = new c.l.LayoutParams(c.m, DIP*48);
				lo2_p.setMargins(0, 0, 0, DIP*4);
				lo2.setLayoutParams(lo2_p);
				
				var wait = true;
				
				uiThread(function() {try {
					lo2.addView(name);
					lo2.addView(size);
					lo2.addView(backup);
					lo.addView(lo2);
					wait = false;
				}catch(e) {
					showError(e);
				}});
				while(wait) sleep(1);
			}
		}catch(e) {
			showError(e);
		}}).start();
		
		return lo;
	}
}



function BackupDir(folder) {
	this.folder = folder;
	this.maps = [];
	this.refresh();
}

BackupDir.prototype = {
	
	refresh: function() {
		this.maps = [];
		var mapFolders = this.folder.listFiles();
		for(var e = 0; e < mapFolders.length; e++) {
			if(mapFolders[e].isDirectory()) {
				this.maps.push([mapFolders[e].getName(), mapFolders[e]]);
			}
		}
	}
}



var main = new Uriel(FILE_MAIN_DATA);
main.init();

thread(function() {try {
	if(!FILE_FONT.exists()) {
		toast("Download resource...");
		if(!downloadFile(FILE_FONT, "https://www.dropbox.com/s/y1o46b2jkbxwl3o/minecraft.ttf?dl=1", null)) {
			toast("Connection error");
		}
	}
	leaveGame();
}catch(e) {
	showError(e);
}}).start();

var Menus = {
	main: new Menu(main, main.NAME),
	backup: new Menu(main, "Backup"),
	restore: new Menu(main, "Restore")
}

Menus.backup.setParent(Menus.main);
Menus.restore.setParent(Menus.main);

Menus.main.build = function() {
	var that = this;
	
	var lo3 = new c.l(ctx);
	lo3.setOrientation(c.l.VERTICAL);
	lo3.setGravity(Gravity.CENTER);
	
	var mcFolder = new File(FILE_SD_CARD, "games/com.mojang");
	var total = mcFolder.getTotalSpace();
	var free = mcFolder.getFreeSpace();
	var len = getDirSize(mcFolder);
	
	var graph = getStorageSpaceGraph(mcFolder, c.ww - DIP*80, DIP*40, Color.parseColor("#777777"), Color.parseColor("#22ff44"), Color.parseColor("#119944"));
	var graph_p = new c.l.LayoutParams(c.w, c.w);
	graph_p.setMargins(0, DIP*8, 0, 0);
	graph.setLayoutParams(graph_p);
	
	lo3.addView(graph);
	
	lo3.addView(mcText("Total: " + dataSizeToString(total) + "     Used: " + dataSizeToString(total-free) + "     Free: " + dataSizeToString(free) + "     Minecraft: " + dataSizeToString(len), DIP*10, false, null, null, null, null, null, [0, DIP*4, 0, DIP*4]));
	
	var lo4 = new c.l(ctx);
	lo4.setOrientation(c.l.HORIZONTAL);
	lo4.setGravity(Gravity.CENTER);
	var lo4_p = new c.l.LayoutParams(c.m, c.w);
	lo4_p.setMargins(0, DIP*16, 0, DIP*16);
	lo4.setLayoutParams(lo4_p);
	
	var backup = new mcButton("Backup", DIP*12, false, Color.WHITE, null, DIP*96, DIP*32, null, [DIP*8, 0, DIP*8, 0], null, null, function(view, event) {
		that._parent.setMenu(Menus.backup);
	}, null);
	backup.setBackgroundColor(Assets.mainColor);
	
	lo4.addView(backup);
	
	var restore = new mcButton("Restore", DIP*12, false, Color.WHITE, null, DIP*96, DIP*32, null, [DIP*8, 0, DIP*8, 0], null, null, function(view, event) {
		that._parent.setMenu(Menus.restore);
	}, null);
	restore.setBackgroundColor(Assets.mainColor);
	
	lo4.addView(restore);
	
	lo3.addView(lo4);
	
	this.layout = lo3;
}

Menus.backup.build = function() {
	var t = new WorldDir(new File(FILE_SD_CARD, "games/com.mojang/minecraftWorlds"));
	this.layout = t.getLayout();
}

Menus.restore.build = function() {
	this.layout = mcText("Coming soon...");
}



function newLevel() {
	main.setButtonVisible(false);
}

function leaveGame() {
	main.setButtonVisible(true);
}

function chatReceiveHook(str, sender) {
	main.setButtonVisible(false);
}


/**
 * 파일이나 디렉토리(내부의 모든 디렉토리 및 파일을 포함한)를 압축합니다
 *
 * @since 2015-03-08
 * @param {String|File} inputPath - 압축을 할 파일 및 폴더
 * @param {String|File} outputPath - 출력할 zip 파일
 * @return {Int} - [
 *     1 = 성공
 *     0 = 입력경로에 파일이 존재하지 않음
 *     -1 = 출력경로의 폴더가 존재하지 않음
 *     -2 = 입력경로의 파일들을 읽는데 실패함
 * ]
 */
function zip(input, output){
	//입력경로의 문법 확인
	if(input instanceof java.io.File){
		var inputPath = input;
	}else if(input instanceof String){
		var inputPath = new java.io.File(input);
	}else{
		throw new Error("Illegal argument type");
 }
 
 //입력경로의 파일|폴더 존재 확인
	if(!inputPath.exists()){
		return 0;
	}
	
	//출력경로의 문법 확인
	if(output instanceof java.io.File){
		var outputPath = output;
	}else if(output instanceof String){
		var outputPath = new java.io.File(output);
	}else{
		throw new Error("Illegal argument type");
	}
	
	//출력경로의 존재
	if(!outputPath.getParentFile().exists()) {
		return -1;
	}
	
	//압축할 파일목록
	var fileList = [];
	
	//폴더 내부의 파일을 모두 목록에 집어넣기
	function getFiles(dir){
		try{
			if(dir.isFile()) {
				fileList.push(dir.getAbsolutePath());
				return;
			}
			var files = dir.listFiles();
			for(var e in files){
				//재귀 함수
				getFiles(files[e]);
			}
		}catch(e){
			return -2;
		}
	};
	
	//모든 파일을 등록
	getFiles(inputPath);
	
	//압축 개시
	var fos = new java.io.FileOutputStream(outputPath);
	var zos = new java.util.zip.ZipOutputStream(fos);
	for(var e in fileList){
		//파일의 절대경로로부터 상대경로를 구해서 ZipEntry생성
		var ze = new java.util.zip.ZipEntry(fileList[e].substring(inputPath.getAbsolutePath().length()+1, fileList[e].getAbsolutePath().length()));
		//ZipOutputStream의 새로운 Entry의 경로 등록
		zos.putNextEntry(ze);
		var fis = new java.io.FileInputStream(fileList[e]);
		//1024바이트씩 읽어오기
		var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
		var content;
		while((content = fis.read(buffer)) > 0){
			//ZipOutputStream에다가 파일 쓰기
			zos.write(buffer, 0, content);
		}
		//다음 파일로
		zos.closeEntry();
		fis.close();
	}
	//닫기
	zos.close();
	fos.close();
	return 1;
}

/**
 * 주어진 압축 파일을 압축 해제 합니다
 *
 * @since 2015-10-16
 * @author Semteul
 * @param {String|File} input - zip 파일의 경로 혹은 파일 객체
 * @param {String|File} output - 압축을 풀 폴더의 경로
 * @return [
 *     1 = 성공
 *     0 = 압축파일이 아닙니다
 * ]
 */
function unZip(input, output) {
	
	if(input instanceof java.io.File) {
		input = input;
	}else if(input instanceof String) {
		input = new java.io.File(input);
	}else {
		throw new Error("Illegal argument type");
	}
	
	if(output instanceof java.io.File) {
		output = output;
	}else if(output instanceof String) {
		output = new java.io.File(output);
	}else {
		throw new Error("Illegal argument type");
	}
	
	output.getParentFile().mkdirs();
	
	try {
		var zip = new java.util.zip.ZipFile(input);
	}catch(e) {
		return 0;
	}
	var entries = zip.entries();
	var entrie, outputFile, bis, bos, buf, count;
	
	while(entries.hasNextElement()) {
		entrie = entries.nextElement();
		outputFile = new java.io.File(output, entrie.getName());
		bis = new java.io.BufferedInputStream(zip.getInputStream(entrie));
   bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(outputFile));
   buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
   count = 0;
		while((count = bis.read(buf)) >= 0){
			bos.write(buf, 0, count);
		}
		bis.close();
		bos.close();
  }
  zip.close();
  return 1;
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



function Backup(name, file) {
	var dl = new AlertDialog.Builder(ctx);
	dl.setTitle("Backup...");
	var et = new EditText(ctx);
	et.setText(name + "_" + getDate());
	dl.setView(et);
	dl.setNegativeButton("Cancel", null);
	dl.setPositiveButton("Backup", new android.content.DialogInterface.OnClickListener({onClick: function() {try {
		var zipFile = new File(main.get("BackupDir") + "/" + name + "/" + et.getText() + ".zip");
		zipFile.getParentFile().mkdirs();
		thread(function() {try {
			var load = new CustomProgressBar(5, 0, "'" + name + "' backup...");
			if(zip(file, zipFile) !== 1) {
				toast("Fail to zip...");
			}else {
				toast("Backup success");
			}
			load.close();
		}catch(e) {
			showError(e);
		}}).start();
	}catch(e) {
		showError(e);
	}}}));
	uiThread(function() {try {
		dl.create().show();
	}catch(e) {
		showError(e);
	}});
}

function Restore(file) {
	var name = file.getName();
	var pattern = /.\_\d{2,2}\-\d{2,2}\-\d{2,2}\-\d{2,2}\-\d{2,2}\-\d{2,2}\.zip/;
	if(pattern.test(name)) {
		name = name.substring(0, name.length-21);
	}
	var worldFolder = new File(FILE_SD_CARD + "/games/com.mojang/minecraftWorlds/" + name);
	var num = 1;
	while(worldFolder.exists()) {
		worldFolder = new File(FILE_SD_CARD + "/games/com.mojang/minecraftWorlds/" + name + "(" + (++num) + ")");
	}
	var dl = new AlertDialog.Builder(ctx);
	dl.setTitle("Restore...");
	var tv = mcText("The previous map won't deleted.\n\nAre you sure?");
	dl.setView(tv);
	dl.setNegativeButton("Cancel", null);
	dl.setPositiveButton("Restore", new android.content.DialogInterface.OnClickListener({onClick: function() {try {
		thread(function() {try {
			var load = new CustomProgressBar(5, 0, "'" + name + "' restore...");
			if(unZip(file, worldFolder) !== 1) {
				toast("Fail to unZip...");
			}else {
				toasts("Restore success");
				toasts("Minecraft is going to restart when window close");
			}
			load.close();
		}catch(e) {
			showError(e);
		}}).start();
	}catch(e) {
		showError(e);
	}}}));
	uiThread(function() {try {
		dl.create().show();
	}catch(e) {
		showError(e);
	}});
}



function getStorageSpaceGraph(path, width, height, colorBg, color1, color2) {
	var total = path.getTotalSpace();
	var free = path.getFreeSpace();
	var len = getDirSize(path);
	var gp1_r = (total-free)/total;
	var gp2_r = (total-(free+len))/total;
	
	var lo = new c.r(ctx);
	
	var bg = new ImageView(ctx);
	bg.setBackgroundColor(colorBg);;
	bg.setLayoutParams(new c.l.LayoutParams(width, height));
	
	var gp1 = new ImageView(ctx);
	gp1.setBackgroundColor(color1);;
	gp1.setLayoutParams(new c.l.LayoutParams(width*gp1_r, height));
	
	var gp2 = new ImageView(ctx);
	gp2.setBackgroundColor(color2);;
	gp2.setLayoutParams(new c.l.LayoutParams(width*gp2_r, height));
	
	lo.addView(bg);
	lo.addView(gp1);
	lo.addView(gp2);
	
	return lo;
}

function getDirSize(path) {
	if(path.isDirectory()) {
		var files = path.listFiles();
		var size = 0;
		for(var e = 0; e < files.length; e++) {
			size += getDirSize(files[e]);
		}
		return size;
	}else {
		return path.length();
	}
}

function readLine(file) {
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return false;
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	try {
		var r = bufferedReader.readLine();
	}catch(e) {
		var r = false;
	}
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	return r;
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

function getDate() {
	var gc = GregorianCalendar;
	var cal = new gc();
	var year = cal.get(gc.YEAR);
	var month = cal.get(gc.MONTH)+1;
	var day = cal.get(gc.DAY_OF_MONTH);
	var hour = cal.get(gc.HOUR_OF_DAY);
	var min = cal.get(gc.MINUTE);
	var sec = cal.get(gc.SECOND);
	if(month < 10) month = "0" + month;
	if(day < 10) day = "0" + day;
	if(hour < 10) hour = "0" + hour;
	if(min < 10) min = "0" + min;
	if(sec < 10) sec = "0" + sec;
	return year+"-"+month+"-"+day+"-"+hour+"-"+min+"-"+sec;
}