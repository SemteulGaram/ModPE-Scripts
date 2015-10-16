Parallel world
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

const className = "ParallelWorld";
const VERSION = "0.0.1";
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



function ParallelWorld(settingFile) {
	this.TYPE = "ModPE_Script";
	this.NAME = "Parallel World";
	this.CODE_NAME = "MapBackup";
	this.AUTHOR = "Semteul";
	this.GROUP = "if(team);";
	if(setting instanceof File) {
		this.settingFile = setting;
	}else if(setting instanceof string) {
		this.settingFile = new File(setting);
	}
	this.setting = null;
	this.defaultBackupDir = FILE_SD_CARD + "/games/com.mojang/minecraftWorldsBackup";
	this.defaultSetting = {
		ButtonX: c.ww - DIP*0x80,
		ButtonY: Math.floor(c.wh/4),
		BackupDir:this.defauptBackupDir,
		MaxAutoBackupSize: 256
	}
	this.button = null;
	this.buttonVis = false;
}

ParallelWorld.prototype = {
	
	init: function() {
		
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
			toast("첫 부팅을 환영합니다...\n설정파일을 생성중입니다");
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
	}
}

function

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
			showError(e, WarnType.WARNING);
		}});
		break;
		
		case 1:
		this.bar = new ProgressBar(ctx);
		this.bar.setLayoutParams(new LayoutParams(DIP*0x30, DIP*0x30));
		this.layout = new c.l(ctx);
		this.layout.setBackgroundColor(Color.argb(0x55, 0, 0, 0));
		this.layout.addView(this.bar);
		this.window = new PopupWindow(this.layout, c.ww, c.wh, false);
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
			showError(e, WarnType.WARNING);
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
			WES_Toast("작업 도중 다른 작업을 하면 에딧에 실패할 수도 있습니다", 2, 8000);
		}, null);
		this.exit = new PopupWindow(this.e_text, c.w, c.w, false);
		
		uiThread(function() {try {
			that.window.showAtLocation(c.d, Gravity.BOTTOM, 0, 0);
			that.exit.showAtLocation(c.d, Gravity.BOTTOM | Gravity.RIGHT, 0, 0);
		}catch(e) {
			showError(e, WarnType.WARNING);
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
			WES_Toast("작업 도중 다른 작업을 하면 에딧에 실패할 수도 있습니다", 2, 8000);
		}, null);
		this.exit = new PopupWindow(this.e_text, c.w, c.w, false);
		
		uiThread(function() {try {
			that.window.showAtLocation(c.d, Gravity.TOP, 0, 0);
			that.exit.showAtLocation(c.d, Gravity.BOTTOM | Gravity.RIGHT, 0, 0);
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
	
	setText: function(text) {
		var that = this;
		uiThread(function() {try {
			that.text.setText(text);
		}catch(e) {
			showError(e, WarnType.RECOVERABLE);
		}});
	},
	
	close: function() {
		if(!(this.window.isShowing())) return false;
		var that = this;
		uiThread(function() {try {
			that.window.dismiss();
			if(that.exit !== undefined && that.exit.isShowing()) {
				that.exit.dismiss();
			}
		}catch(e) {
			showError(e, WarnType.WARNING);
		}});
	}
}