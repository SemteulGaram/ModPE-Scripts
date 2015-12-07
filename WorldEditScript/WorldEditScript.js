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

const NAME = "WorldEdit script";
const NAME_CODE = "WorldEdit";
//Season . Release Number . Commits
const VERSION = "0.4.0";
const VERSION_CODE = 110;
const TAG = "[" + "WorldEdit" + " " + VERSION + "] ";

/**
 * TODOS
 *
 * LangSetting(MessageManager)
 * AssetsManager
 * DocumentMethod
 * HelpPage
 * WhiteList
 * ServerMessage
 * Schemathics
 * TaskManager
 * InfoPanel
 * QuickBar
 */

var File = java.io.File;
var BufferedInputStream = java.io.BufferedInputStream;
var BufferedOutputStream = java.io.BufferedOutputstream;
var BufferedReader = java.io.BufferedReader;
var BufferedWriter = java.io.BufferedWriter;
var FileInputStream = java.io.FileInputStream;
var FileOutputStream = java.io.FileOutputStream;
var InputStream = java.io.InputStream;
var OutputStream = java.io.OutputStream;
var InputStreamReader = java.io.InputStreamReader;
var OutputStreamWriter = java.io.OutputStreamWriter;

var Byte = java.lang.Byte;
var Int = java.lang.Integer;
var Float = java.lang.Float;
var Double = java.lang.Double;
var Boolean = java.lang.Boolean;
var Long = java.lang.Long;
var Short = java.lang.Short;
var Thread = java.lang.Thread;
var Runnable = java.lang.Runnable;
var System = java.lang.System;

var URL = java.net.URL;

var ArrayList = java.util.ArrayList;
var Calendar = java.util.Calendar;
var GregorianCalendar = java.util.GregorianCalendar;

var Activity = android.app.Activity;
var AlertDialog = android.app.AlertDialog;
var Context = android.content.Context;
var MediaPlayer = android.media.MediaPlayer;
var Environment = android.os.Environment;
var Process = android.os.Process;
var Handler = android.os.Handler;
var View = android.view.View;
var ViewGroup = android.view.ViewGroup;
var MotionEvent = android.view.MotionEvent;
var Gravity = android.view.Gravity;
var TypedValue = android.util.TypedValue;

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

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

//단축변수
var sg = {};
sg.mp = ViewGroup.LayoutParams.MATCH_PARENT;
sg.wc = ViewGroup.LayoutParams.WRAP_CONTENT;
sg.ai = java.lang.reflect.Array.newInstance;
sg.rl = RelativeLayout;
sg.ll = LinearLayout;
sg.fl = FrameLayout;
sg.rlp = RelativeLayout.LayoutParams;
sg.llp = LinearLayout.LayoutParams;
sg.flp = FrameLayout.LayoutParams;
sg.tp = TypedValue.COMPLEX_UNIT_PX;
sg.sm = net.zhuoweizhang.mcpelauncher.ScriptManager;
sg.ww = ctx.getScreenWidth();//ctx.getWindowManager().getDefaultDisplay().getWidth();
sg.wh = ctx.getScreenHeight();//ctx.getWindowManager().getDefaultDisplay().getHeight();
sg.dv = ctx.getWindow().getDecorView();
sg.px = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
sg.ct = System.currentTimeMillis;



/**
 * Error report
 *
 * @author SemteulGaram
 * @since 2015-04
 *
 * @param {Error} e
 */

function showError(e) {
	if(Level.getWorldName() === null) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
	android.widget.Toast.makeText(ctx, "[" + NAME + " ERROR LINE: " + e.lineNumber + "]" + "\n" + e.message, android.widget.Toast.LENGTH_LONG).show();
		}}));
	}else {
		var t = (e.message + "").split(" ");
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
		clientMessage(ChatColor.DARK_RED + "[" + NAME + " ERROR LINE: " + e.lineNumber + "]\n" + ChatColor.DARK_RED + c);
	}
}



var sgUrls = {}
sgUrls.font = "https://www.dropbox.com/s/y1o46b2jkbxwl3o/minecraft.ttf?dl=1";
sgUrls.logo = "https://www.dropbox.com/s/iqolfhsqwppu4bo/logo.ast?dl=1";



var sgFiles = {}
sgFiles.sdcard = Environment.getExternalStorageDirectory();
sgFiles.mcpe = new File(sgFiles.sdcard, "games/com.mojang");
sgFiles.world = new File(sgFiles.mcpe, "minecraftWorlds");
sgFiles.mod = new File(sgFiles.mcpe, "minecraftpe/mods");
sgFiles.font = new File(sgFiles.mod, "minecraft.ttf");
sgFiles.script = new File(sgFiles.mod, NAME_CODE);
sgFiles.setting = new File(sgFiles.script, "setting.json");
sgFiles.test = new File(sgFiles.script, "log.txt");
sgFiles.noMedia = new File(sgFiles.script, ".nomedia");
sgFiles.map = function() {return new File(mfiles.map, Level.getWorldDir())};
sgFiles.mapMod = function() {return new File(sgFiles.map, Level.getWorldDir() + "/mods")}
sgFiles.mapSetting = function() {return new File(sgFiles.map, Level.getWorldDir() + "/mods/" + NAME + ".json")}

sgFiles.assets = new File(sgFiles.script, "assets");
sgFiles.logo = new File(sgFiles.assets, "logo.ast");



var sgAssets = {

	customAssetCreator: function(pixel, width, height, scale, scaleType, left, top, right, bottom) {
		if (!(this instanceof arguments.callee)) return new arguments.callee(pixel, width, height, scale, left, top, right, bottom);

		this.pixel = pixel;
		this.rawBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
		this.rawBitmap.setPixels(this.pixel, 0, width, 0, 0, width, height);
		this.scaleBitmap = Bitmap.createScaledBitmap(this.rawBitmap, width*scale, height*scale, scaleType);
		this.ninePatch = function() {return ninePatch1(this.scaleBitmap, (top*(scale-1))+1, (left*(scale-1))+1, bottom*scale, right*scale)}
	},

	bitmapAssetCreator: function(bitmap, xPos, yPos, xSize, ySize, scale, scaleType, left, top, right, bottom) {
		if (!(this instanceof arguments.callee)) return new arguments.callee(bitmap, xPos, yPos, xSize, ySize, scale, scaleType, left, top, right, bottom);
		this.rawBitmap = Bitmap.createBitmap(bitmap, xPos, yPos, xSize, ySize);
		this.scaleBitmap = Bitmap.createScaledBitmap(this.rawBitmap, xSize*scale, ySize*scale, scaleType);
		this.ninePatch = function() {return ninePatch1(this.scaleBitmap, (top*(scale-1))+1, (left*(scale-1))+1, bottom*scale, right*scale)}
	}
}



function toastL(str) {
	ctx.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{
				android.widget.Toast.makeText(ctx, str, android.widget.Toast.LENGTH_LONG).show();
			}catch(e) {}
		}
	}
	));
}

function toast(str) {
	ctx.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{
				android.widget.Toast.makeText(ctx, str, android.widget.Toast.LENGTH_SHORT).show();
			}catch(e) {}
		}
	}
	));
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



var sgUtils =  {

	toString: function() {
		return "[object sgUtils]";
	},

	data: {}//Pointer storage
	//sgUtils.data["progress"] = value;
}

sgUtils.io = {

	toString: function() {
		return "[object sgUtils - I/O]";
	},

	/**
	 * Copy file
	 *
	 * @author SemteulGaram
	 * @since 2015-11-13
	 *
	 * @param {(File|String|InputStream)} input
	 * @param {(File|String)} output
	 * @param {boolean} mkDir
	 * @param getMax - sgUtils.data pointer
	 * @param getProgress - sgUtils.data pointer
	 * @return {true} success
	 */
	copyFile: function(input, output, mkDir, getMax, gerProgress) {
		if(input instanceof String) {
			input = new File(input);
			if(!input.exists()) {
				throw new Error("File not exists: " + file.getPath());
			}
			input = new FileInputStream(input);
		}else if(input instanceof File) {
			if(!input.exists()) {
				throw new Error("File not exists: " + file.getPath());
			}
			input = new FileInputStream(input);
		}else if(!(input instanceof InputStream)) {
			throw new Error("Illegal argument type");
		}

		if(output instanceof String) {
			output = new File(output);
		}else if(!(output instanceof File)) {
			throw new Error("Illegal argument type");
		}

		if(mkDir) {
			output.getParentFile().mkdirs();
		}

		var bis = new BufferdInputStream(input);
		var fos = new FileOutputStream(output)
		var bos = new BufferdOutputStream(fos);
		var buffer = new sg.ai(Byte.TYPE, 4096);
		if(getMax !== null && getMax !== undefined) {
			sgUtils.data[getMax] = input.available();
		}
		if(getProgress !== null && getProgress !== undefined) {
			sgUtils.data[getProgress] = 0;
		}
		var len;
		while((len = bis.read(buffer)) != null) {
			bos.write(buffer, 0, len);
		 if(getProgress !== null && getProgress !== undefined) {
				sgUtils.data[getProgress] += content;
			}
		}
		input.close();
		fos.close();
		bis.close();
		bos.close();
		return true;
	},

	/**
	 * Set texture (Android)
	 *
	 * @author SemteulGaram
	 * @since 2015-04
	 *
	 * @param {File} prototypeFile
	 * @param {string} innerPath - ex."images/mob/steve.png"
	 * @return {boolean} success
	 */
	setTexture: function(prototypeFile, innerPath){
		var bl = new File(sgFiles.sdCard, "Android/data/net.zhuoweizhang.mcpelauncher");
		var blPro = new File(sgFiles.sdCard, "Android/data/net.zhuoweizhang.mcpelauncher.pro");
		var ex = false;
		if(bl.exists()) {
			var dir = new File(bl, "files/textures/" + innerPath);
			dir.getParentFile().mkdirs();
			try {
				ex = this.copyFile(prototypeFile, dir, false);
			}catch(e) {}
		}
		if(blPro.exists()) {
			var dir = new File(blPro, "files/textures/" + innerPath);
			dir.getParentFile().mkdirs();
			try {
				ex = this.copyFile(prototypeFile, dir, false);
			}catch(e) {}
		}
		return ex;
	},

	/**
	 * Read file
	 *
	 * @author Semteul
	 * @since 2015-10-25
	 *
	 * @param {(File|string|InputStream)} file
	 * @return {string[]} lines
	 */
	readFile: function(file) {
		if(typeof file === "string") {
			file = new FileInputStream(new File(file));
		}else if(file instanceof File) {
			file = new FileInputStream(file);
		}else if(!(file instanceof InputStream)) {
			throw new Error("Illegal argument type");
		}

		var isr = new InputStreamReader(file);
		var br = new BufferedReader(isr);
		var content = [], line;

		while((line = br.readLine()) !== null) {
			content.push(line + "");
		}

		br.close();
		isr.close();
		file.close();

		return content;
	},

	/**
	 * Write file
	 *
	 * @author Semteul
	 * @since 2015-10-25
	 *
	 * @param {(File|string)} file
	 * @param {(string[]|string)} value
	 * @param {boolean} mkDir
	 * @return {boolean} success
	 */
	writeFile: function(file, value, mkDir) {
		if(typeof file === "string") {
			file = new File(file);
		}else if(!(file instanceof File)) {
			throw new Error("Illegal argument type");
		}

		if((!file.exists()) && mkDir) {
			file.getParentFile().mkdirs();
			file.createNewFile();
		}else if(!file.exists()) {
			throw new Error("File not exists: " + file.getPath());
		}

		if(typeof value === "string") {
			value = value.split(String.fromCharCode(10));
		}

		var fos = new FileOutputStream(file);
		var osw = new OutputStreamWriter(fos);

		while(value.length > 0) {
			osw.write(value.shift());
			if(value.length > 0) {
				osw.write(String.fromCharCode(10));
			}
		}

		osw.close();
		fos.close();

		return true;
	},

	/**
	 * Load JSON
	 *
	 * @author SemteulGaram
	 * @since 2015-09
	 *
	 * @param {(File|string|InputStream)} file
	 * @return {Object} value
	 */
	loadJSON: function(file) {
		var obj = this.readFile(file);
		obj.join(String.fromCharCode(10));
		return JSON.parse(obj);
	},

	/**
	 * Save JSON
	 *
	 * @author SemteulGaram
	 * @since 2015-09
	 *
	 * @param {(File|string|InputStream)} file
	 * @param {Object} obj
	 * @return {boolean} success
	 */
	saveJSON: function(file, obj) {
		return this.writeFile(file, JSON.stringify(obj));
	},

	/**
	 * Load Article
	 *
	 * @author SemteulGaram
	 * @since 2015-02
	 *
	 * @param {(File|string|InputStream)} file
	 * @param {string} article
	 * @return {string} value
	 */
	loadArticle: function(file, article) {
		var values = this.readFile(file);
		if(!(values instanceof Array)) {
			throw new Error("[sgUtils - I/O - readFile]'s return value isn't instance of Array");
		}
		for(var e = 0; e < values.length; e++) {
			var value = values[e].split("|");
			if(value[0] === article + "") {
				return values[e].subString(values[e].strPos("|")+1, values[e].length);
			}
		}
		return null;
	},

	/**
	 * Save Article
	 *
	 * @author SemteulGaram
	 * @since 2015-02
	 *
	 * @param {File|string|InputStream} file
	 * @param {string} article
	 * @param {string} value
	 * @return {boolean} success
	 */
	saveArticle: function(file, article, value) {
		var values = this.readFile(file);
		if(!(values instanceof Array)) {
			throw new Error("[sgUtils - I/O - readFile]'s return value isn't instance of Array");
		}
		var index = -1;
		for(var e = 0; e < values.length; e++) {
			var value = values[e].split("|");
			if(value[0] === article + "") {
				index = e;
			}
		}
		if(index === -1) {
			values.push(article + "|" + value);
		}else {
			values[index] = article + "|" + value;
		}
		return this.writeFile(file, values);
	},

	/**
	 * load Minecraft Setting
	 *
	 * @author SemteulGaram
	 * @since 2015-11-13
	 *
	 * @param {string} article
	 * @return {string} value
	 */
	loadMcpeSetting: function(article) {
		article += "";
		var file = new File(sgFiles.mcpe, "minecraftpe/options.txt");
		if(!file.exists()) {
			throw new Error("MCPE setting file isn't exists");
		}
		var values = this.readFile(file);
		var value = [];
		for(var e = 0; e < values.length; e++) {
			value = values[e].split(":");
			if(value[0] === article) {
				return value[1];
			}
		}
		return null;
	},

	/**
	 * Save Minecraft Setting
	 *
	 * @author SemteulGaram
	 * @since 2015-11-13
	 *
	 * @param {string} article
	 * @param {string} value
	 * @return {true} success
	 */
	saveMcpeSetting: function(article, value) {
		article += "";
		value += "";
		var file = new File(sgFiles.mcpe, "minecraftpe/options.txt");
		if(!file.exists()) {
			throw new Error("MCPE setting file isn't exists");
		}
		var values = this.readFile(file);
		var value = [];
		var index = -1;
		for(e = 0; e < values.length; e++) {
			value = values[e].split(":");
			if(value[0] === article) {
				index = e;
				break;
			}
		}
		if(index === -1) {
			values.push(article + ":" + value);
		}else {
			values[index] = article + ":" + value;
		}
		this.writeFile(file, values, false);
		try {
			sg.sm.requestGraphicsReset();
		}catch(e) {};
		return true;
	},

	/**
	 * Load Bitmap to Layout
	 *
	 * @author SemteulGaram
	 * @since 2015-11-27
	 *
	 * @param {File} imageFile
	 * @return {Bitmap|false} bitmap
	 */
	loadBitmapLayout: function(imageFile) {
		var lo = new sg.rl(ctx);
		lo.setGravity(Gravity.CENTER);
		if(!(imageFile instanceof File)) {
			var er = sgUtils.gui.mcFastText("This isn't instance of File\n\n" + imageFile, sg.px*0x8, false, Color.RED);
			er.setGravity(Gravity.CENTER);
			lo.addView(er);
		}else if(!imageFile.exists()) {
			var er = sgUtils.gui.mcFastText("Image not found\n\n" + imageFile.getPath(), sg.px*0x8, false, Color.RED);
			er.setGravity(Gravity.CENTER);
			lo.addView(er);
		}else {
			var bm = BitmapFactory.decodeFile(imageFile.getAbsolutePath());
			var iv = new ImageView(ctx);
			iv.setImageBitmap(bm);
			lo.addView(iv);
		}
		return lo;
	}
}



sgUtils.convert = {

	toString: function() {
		return "[object sgUtils - Convert]";
	},

	/**
	 * Split line
	 *
	 * @author SemteulGaram
	 * @since 2015-10-24
	 *
	 * @param {string} cutter
	 * @param {string} content
	 * @return {string}
	 */
	splitLine: function(cutter, content){
		return content.split(cutter).join(String.fromCharCode(10));
	},

	/**
	 * Marge Array
	 *
	 * @author SemteulGaram
	 * @since 2015-06
	 *
	 * @param {*[]} arr1
	 * @param {*[]} arr2
	 * @param {int} margeType - 0: Horizontal, 1: Vertical
	 * @param {int} width1
	 * @param {int} height1
	 * @param {int} width2
	 * @param {int} height2
	 * @param {*} fillBlank - null: extend array
	 * @return {*[]} margedArray
	 */
	margeArray: function(arr1, arr2, margeType, width1, height1, width2, height2, fillBlank) {
		var arr = [];
		switch(margeType) {
			case 0:
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
			case 1:
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
				throw new Error("Unknown margeType: " + margeType);
		}
		return arr;
	},

	/**
	 * View Side
	 *
	 * @author SemteulGaram
	 * @since 2015-04
	 *
	 * @param {float} yaw
	 * @return {string} direction
	 */
	viewSide: function(yaw) {
		var temp = sgUtils.math.leftOver(yaw, 0, 360);
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
	},

	/**
	 * NumberToString
	 *
	 * @author SenteulGaram
	 * @since 2015-09
	 *
	 * @param number
	 * @return {string}
	 */
	numberToString: function(number) {
		number += "";
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
	},

	/**
	 * DataSizeToString
	 *
	 * @author SemteulGaram
	 * @since 2015-09
	 *
	 * @param size
	 * @return {string}
	 */
 dataSizeToString: function(size) {
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
}



sgUtils.math = {

	toString: function() {
		return "[object sgUtils - Math]";
	},

	/**
	 * Random Id
	 *
	 * @author SemteulGaram
	 * @since 2015-10-27
	 *
	 * @param {(undefined|...int)} _repeat - don't touch
	 * @return {int} randomId
	 */
	randomId: function(_repeat) {
		if(_repeat === undefined) {
			_repeat = 0;
		}
		var num = parseInt(Math.floor(Math.random() * 0xffffff));
		if(sgUtils.data._randomId === undefined) {
			sgUtils.data._randomId = [];
		}
		if(sgUtils.data._randomId.indexOf(num) !== -1) {
			if(_repeat > 10) {
				throw new Error("Can't make a randomId: " + num);
			}
			return this.randomId(++_repeat);
		}
		sgUtils.data._randomId.push(num);
		return num;
	},

	/**
	 * Left Over
	 *
	 * @author SemteulGaram
	 * @since 2015-10-31
	 *
	 * @param value
	 * @param min
	 * @param max
	 * @return number
	 */
	leftOver: function(value, min, max) {
		var range = max - min;
		if(range < 1) throw new Error("'max - min' must over then 1");
		while(value < min) value += range;
		while(value >= max) value -= range;
		return value;
	},

	/**
	 * isNumber
	 *
	 * @author SemteulGaram
	 * @since 2015-11-23
	 *
	 * @param {string} number
	 * @return {boolean} isNumber
	 */
	 isNumber: function(number) {
		 return parseInt(number) == number;
	 }
}



sgUtils.vector = {

	toString: function() {
		return "[object sgUtils - Vector]";
	},

	/**
	 * Vector(x, y, z) to Direction(yaw, pitch)
	 *
	 * @author ToonRaOn(툰라온)
	 * @since 2015-01
	 * @from NaverCafe :::MCPE KOREA:::
	 *
	 * @param {double} x
	 * @param {double} y
	 * @param {double} z
	 * @return {float[]} direction - [yaw, pitch]
	 */
	vectorToDirection: function(x, y, z) {
		var lenH = Math.sqrt(Math.pow(x, 2)+Math.pow(z, 2));
		var sinH = x/lenH;
		var cosH = z/lenH;
		var tanH = x/z;
		var acosH = Math.acos(z/lenH)*180/Math.PI;
		var atanV = Math.atan(y/lenH);
		var yaw = 0;
		if(sinH > 0 && ((cosH > 0 && tanH > 0) || (cosH < 0 && tanH < 0))) {
			yaw = 360 - acosH;
		}else if(sinH < 0 && ((cosH < 0 && tanH > 0) || (cosH > 0 && tanH < 0))) {
			yaw = acosH;
		}else if(cosH === 1) {
			yaw = 0;
		}else if(sinH === 1) {
			yaw = 90;
		}else if(cosH === -1) {
			yaw = 180;
		}else if(sinH === -1) {
			yaw = 270;
		}else if(sinH === 0 && cosH === 1 && tanH === 0) {
			yaw = 0;
		}
		var pitch = -1*Math.atan(y/Math.sqrt(Math.pow(x, 2)+Math.pow(z, 2)))*180/Math.PI;
		return [yaw, pitch];
	},

	/**
	 * Direction(yaw, pitch) to Absolute range Vector(x, y, z)
	 *
	 * @author SemteulGaram
	 * @since 2015-01
	 *
	 * @param {float} yaw
	 * @param {float} pitch
	 * @return {double[]} vector3 - [x, y, z]
	 */
	directionToVector: function(yaw, pitch) {
		var x = -1*Math.sin(yaw/180*Math.PI)*Math.cos(pitch/180*Math.PI);
		var y = Math.sin(-pitch/180*Math.PI);
		var z = Math.cos(yaw/180*Math.PI)*Math.cos(pitch/180*Math.PI);
		return [x, y, z];
	},

	/**
	 * Absolute range x, y, z
	 *
	 * @author SemteulGaram
	 * @since 2015-01
	 *
	 * @param {double} x
	 * @param {double} y
	 * @param {double} z
	 * @return {double[]} vector3 - [x, y, z]
	 */
	absoluteRange: function(x, y, z) {
		var rx = x/Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2)+Math.pow(z, 2));
		var ry = y/Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2)+Math.pow(z, 2));
		var rz = z/Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2)+Math.pow(z, 2));
		return [rx, ry, rz];
	}
}



sgUtils.gui = {

	toString: function() {
		return "[object sgUtils - GUI]";
	},

	/**
	 * mcFastText
	 * 마인크래프트 스타일의 텍스트뷰를 생성합니다
	 *
	 * @author SemteulGaram
	 * @since 2015-10-24
	 *
	 * @param {string|null} str
	 * @param {number|null} size
	 * @param {boolean|null} hasShadow
	 * @param {Color|null} color
	 * @param {Color|null} shadowColor
	 * @param {number|null} width
	 * @param {number|null} height
	 * @param {Array|null} padding
	 * @param {Array|null} margins
	 * @return {TextView}
	 */
	mcFastText: function(str, size, hasShadow, color, shadowColor, width, height, padding, margins) {
		var tv = new TextView(ctx);
		tv.setTransformationMethod(null);
		tv.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
		if(sgFiles.font.exists()) {
			tv.setTypeface(android.graphics.Typeface.createFromFile(sgFiles.font));
		};
		if(str !== null && str !== undefined) {
			tv.setText((str + ""));
		}
		if(size !== null && size !== undefined) {
			tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, size);
		}else {
			tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, sg.px*0x10);
		}
		if(color !== null && color !== undefined) {
			tv.setTextColor(color);
		}
		if(hasShadow) {
			if(shadowColor !== null && shadowColor !== undefined) {
				tv.setShadowLayer(1/0xffffffff, sg.px*1.3, sg.px*1.3, shadowColor);
			}else {
				tv.setShadowLayer(1/0xffffffff, sg.px*1.3, sg.px*1.3, Color.DKGRAY);
			}
		}
		if(padding !== null && padding !== undefined) {
			tv.setPadding(padding[0], padding[1], padding[2], padding[3]);
		}
		var tv_p;
		if(width !== null && height !== null && width !== undefined && height !== undefined) {
			tv_p = new sg.ll.LayoutParams(width, height);
		}else {
			tv_p = new sg.ll.LayoutParams(sg.wc, sg.wc);
		}
		if(margins !== null && margins !== undefined) {
			tv_p.setMargins(margins[0], margins[1], margins[2], margins[3]);
		}
		tv.setLayoutParams(tv_p);
		return tv;
	},

	/**
	 * mcFastButton
	 * 마인크래프트 스타일의 버튼을 생성합니다
	 *
	 * @author SemteulGaram
	 * @since 2015-10-24
	 *
	 * @param {string} str
	 * @param {number|null} size
	 * @param {boolean|null} hasShadow
	 * @param {Color|null} color
	 * @param {Color|null} shadowColor
	 * @param {number|null} width
	 * @param {number|null} height
	 * @param {Array|null} padding
	 * @param {Array|null} margins
	 * @param {Drawable|null} background
	 * @param {function|null} onTouchFunction - ex.function(view, event){return Boolean}
	 * @param {function|null} onClickFunction - function(view, event)
	 * @param {function|null} onLongClickFunction - function(view, event){return Boolean}
	 * @return {Button}
	 */
	mcFastButton: function(str, size, hasShadow, color, shadowColor, width, height, padding, margins, background, onTouchFunction, onClickFunction, onLongClickFunction) {
		var btn = new Button(ctx);
		btn.setTransformationMethod(null);	btn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
		if(sgFiles.font.exists()) {
			btn.setTypeface(android.graphics.Typeface.createFromFile(sgFiles.font));
		};
		if(str !== null && str !== undefined) {
			btn.setText((str + ""));
		}
		if(size !== null && size !== undefined) {
			btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, size);
		}else {
			btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, sg.px*0x10);
		}
		if(color !== null && color !== undefined) {
			btn.setTextColor(color);
		}
		if(hasShadow) {
			if(shadowColor !== null && shadowColor !== undefined) {
				btn.setShadowLayer(1/0xffffffff, sg.px*1.3, sg.px*1.3, shadowColor);
			}else {
					btn.setShadowLayer(1/0xffffffff, sg.px*1.3, sg.px*1.3, Color.DKGRAY);
			}
		}
		if(padding !== null && padding !== undefined) {
			btn.setPadding(padding[0], padding[1], padding[2], padding[3]);
		}
		var btn_p;
		if(width !== null && height !== null && width !== undefined && height !== undefined) {
			btn_p = new sg.ll.LayoutParams(width, height);
		}else {
			btn_p = new sg.ll.LayoutParams(sg.wc, sg.wc);
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
				showError(e);
				return false;
			}}}));
		}
		if(onClickFunction !== null && onClickFunction !== undefined) {
			btn.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
				onClickFunction(view, event);
			}catch(e) {
				showError(e);
			}}}));
		}
		if(onLongClickFunction !== null && onLongClickFunction !== undefined) {
					btn.setOnLongClickListener(View.OnLongClickListener({onLongClick: function(view, event) {try {
				return onLongClickFunction(view, event);
			}catch(e) {
				showError(e);
				return false;
			}}}));
		}
		return btn;
	},

	/**
	 * Custom Toast
	 *
	 * @author SemteulGaram
	 * @since 2015-11-13
	 *
	 * @param {string} text
	 * @param {(Drawable|null)} drawable
	 * @param {(long|null)} duration
	 * @param {(boolean|null)} isImportant
	 * @param {(number|null)} size
	 = @param {(Color|null)} textColor
	 */
	toast: function(text, drawable, duration, isImportent, size, textColor) {
		if(sgUtils.data._toast === undefined) {
			sgUtils.data._toast = [];
		}
		if(!duration) {
			duration = 3000;
		}
		var tv = sgUtils.gui.mcFastText(text, size, false, textColor, null, null, null, [sg.px*8, sg.px*8, sg.px*8, sg.px*8]);
		tv.setGravity(Gravity.CENTER);
		if(drawable !== null && drawable !== undefined) {
			tv.setBackgroundDrawable(drawable);
		}
		var wd = new PopupWindow(tv, sg.wc, sg.wc, false);
		wd.setTouchable(false);
		if(sgUtils.data._toast.length > 0 && !sgUtils.data._toast[0][2]) {
			var owd = sgUtils.data._toast[0][0];
			sgUtils.data._toast = [];
			uiThread(function() {try {
				if(owd.isShowing()) {
					owd.dismiss();
				}
			}catch(err) {}});
		}else {
			for(var e = 0; e < sgUtils.data._toast.length; e++) {
				if(!sgUtils.data._toast[e][2]) {
					sgUtils.data._toast.splice(e--, 1);
				}
			}
		}
		sgUtils.data._toast.push([wd, duration, isImportent, sgUtils.math.randomId()]);
		if(sgUtils.data._toast.length === 1) {
			this._toastActivity();
		}
	},

	_toastActivity: function() {
		var that = this;
		if(sgUtils.data._toast.length === 0) {
			return;
		}
		uiThread(function() {try {
			var cwd = sgUtils.data._toast[0][0];
			var cid = sgUtils.data._toast[0][3];
			cwd.showAtLocation(sg.dv, Gravity.CENTER|Gravity.BOTTOM, 0, sg.px*80);
			new Handler().postDelayed(new Runnable({run: function() {try {
				if(sgUtils.data._toast.length === 0) {
					return;
				}
				if(cid === sgUtils.data._toast[0][3]) {
					sgUtils.data._toast.splice(0, 1);
				}
				if(cwd.isShowing()) {
					cwd.dismiss();
				}
				that._toastActivity();
			}catch(err) {
				showError(err);
			}}}), sgUtils.data._toast[0][1]);
		}catch(err) {
			showError(err);
		}});
	},

	/**
	 * Custom Progress Bar
	 *
	 * @author SemteulGaram
	 * @since 2015-11-14
	 *
	 * @param {int} type
	 * @return {customProgressBar}
	 */
	progressBar: function(type) {
		if (!(this instanceof arguments.callee)) return new arguments.callee(type);
		var that = this;
		this.progressBar = null;
		this.textView = null;
		this.thread = null;
		this.rl = new sg.rl(ctx);
		this.wd = null;
		this.wdVis = false;
		this.getText = function() {
			if(this.textView === null) {
				throw new Error("This type of custom progress bar don't support 'text' parameter");
			}
			return this.textView.getText() + "";
		}

		this.getMax = function() {
			if(this.progressBar === null) {
				throw new Error("This type of custom progress bar don't support 'max' parameter");
			}
			return this.progressBar.getMax();
		}

		this.getProgress = function() {
			if(this.progressBar === null) {
				throw new Error("This type of custom progress bar don't support 'progress' parameter");
			}
			return this.progressBar.getProgress();
		}

		this.setText = function(text) {
			if(this.textView === null) {
				throw new Error("This type of custom progress bar don't support 'text' parameter");
			}
			uiThread(function() {try {
				that.textView.setText(text);
			}catch(err) {
				showError(err);
			}});
		}

		this.setMax = function(max) {
			if(this.progressBar === null) {
				throw new Error("This type of custom progress bar don't support 'max' parameter");
			}
			uiThread(function() {try {
				that.progressBar.setMax(max);
			}catch(err) {
				showError(err);
			}});
		}

		this.setProgress = function(progress) {
			if(this.progressBar === null) {
				throw new Error("This type of custom progress bar don't support 'progress' parameter");
			}
			uiThread(function() {try {
				that.progressBar.setProgress(progress);
			}catch(err) {
				showError(err);
			}});
		}

		this.isShowing = function() {
			return this.wdVis;
		}

		this.show = function() {
			this.wdVis = true;
			uiThread(function() {try {
				if(!that.wd.isShowing()) {
					that.wd.showAtLocation(sg.dv, Gravity.LEFT|Gravity.TOP, 0, 0);
				}
			}catch(err) {
				showError(err);
			}});
			if(this.thread !== null) {
				this.thread.start();
			}
		}

		this.close = function() {
			this.wdVis = false;
			uiThread(function() {try {
				if(that.wd.isShowing()) {
					that.wd.dismiss();
				}
			}catch(err) {
				showError(err);
			}});
			this.thread = null;
		}
		switch(type) {
			//뒷 부분이 터치가능한 배경이 투명한 원형 프로그래스 바
			case 0:
			this.progressBar = new ProgressBar(ctx);
			var pp = new sg.rl.LayoutParams(sg.px*40, sg.px*40);
			pp.addRule(sg.rl.CENTER_IN_PARENT);
			this.progressBar.setLayoutParams(pp);
			this.rl.addView(this.progressBar);
			this.wd = new PopupWindow(this.rl, sg.ww, sg.wh, false);
			this.wd.setTouchable(false);
			break;
			//뒷 부분이 터치 불가능한 배경이 어두운 원형 프로그래스 바
			case 1:
			this.progressBar = new ProgressBar(ctx);
			var pp = new sg.rl.LayoutParams(sg.px*30, sg.px*30);
			pp.addRule(sg.rl.CENTER_IN_PARENT);
			this.progressBar.setLayoutParams(pp);
			this.rl.addView(this.progressBar);
			this.rl.setBackgroundColor(Color.argb(0x88, 0, 0, 0));
			this.wd = new PopupWindow(this.rl, sg.ww, sg.wh, true);
			this.wd.setTouchable(true);
			break;
			//화면 하단의 초록색 가로 프로그래스바
			case 2:
			this.progressBar = new ProgressBar(ctx, null, android.R.attr.progressBarStyleHorizontal);
			var f = new ClipDrawable(new ColorDrawable(Color.parseColor("#80ff80")), Gravity.LEFT, ClipDrawable.HORIZONTAL);
			var b = new ColorDrawable(Color.parseColor("#808080"));
			var draw = this.progressBar.getProgressDrawable();
			draw.setDrawableByLayerId(android.R.id.progress, f);
			draw.setDrawableByLayerId(android.R.id.background, b);
			var pp = new sg.rl.LayoutParams(sg.ww, sg.px*4);
			pp.addRule(sg.rl.ALIGN_PARENT_BOTTOM);
			this.progressBar.setLayoutParams(pp);
			this.rl.addView(this.progressBar);
			this.wd = new PopupWindow(this.rl, sg.ww, sg.wh, false);
			this.wd.setTouchable(false);
			break;
			//터치 불가능 어두운 배경에 화면 중앙에 위쪽 텍스트와 아래쪽 초록색 프로그래스바
			case 3:
			var ll = new sg.ll(ctx);
			ll.setOrientation(sg.ll.VERTICAL);
			ll.setGravity(Gravity.CENTER);

			this.textView = sgUtils.gui.mcFastText(this.text, null, false, Color.WHITE, null, null, null, null, [0, 0, 0, sg.px*20]);
			ll.addView(this.textView);
			this.progressBar = new ProgressBar(ctx, null, android.R.attr.progressBarStyleHorizontal);
			var f = new ClipDrawable(new ColorDrawable(Color.parseColor("#80ff80")), Gravity.LEFT, ClipDrawable.HORIZONTAL);
			var b = new ColorDrawable(Color.parseColor("#808080"));
			var draw = this.progressBar.getProgressDrawable();
			draw.setDrawableByLayerId(android.R.id.progress, f);
			draw.setDrawableByLayerId(android.R.id.background, b);
			var pp = new sg.ll.LayoutParams(sg.px*0x100, sg.px*4);
			this.progressBar.setLayoutParams(pp);
			ll.addView(this.progressBar);
			var llp = new sg.rl.LayoutParams(sg.wc, sg.wc);
			llp.addRule(sg.rl.CENTER_IN_PARENT);
			ll.setLayoutParams(llp);
			this.rl.addView(ll);
			this.rl.setBackgroundColor(Color.argb(0x88, 0, 0, 0));
			this.wd = new PopupWindow(this.rl, sg.ww, sg.wh, true);
			this.wd.setTouchable(true);
			break;
			//터치 불가능 어두운 배경에 화면 중앙에 왼쪽 원형 프로그래스바 오른쪽 텍스트
			case 4:
			var ll = new sg.ll(ctx);
			ll.setOrientation(sg.ll.HORIZONTAL);
			ll.setGravity(Gravity.CENTER);

			this.progressBar = new ProgressBar(ctx);
			var pp = new sg.ll.LayoutParams(sg.px*40, sg.px*40);
			this.progressBar.setLayoutParams(pp);
			ll.addView(this.progressBar);
			this.textView = sgUtils.gui.mcFastText(this.text, null, false, Color.WHITE, null, null, null, null, [sg.px*20, 0, 0, 0]);
			ll.addView(this.textView);
			var llp = new sg.rl.LayoutParams(sg.wc, sg.wc);
			llp.addRule(sg.rl.CENTER_IN_PARENT);
			ll.setLayoutParams(llp);
			this.rl.addView(ll);
			this.rl.setBackgroundColor(Color.argb(0x88, 0, 0, 0));
			this.wd = new PopupWindow(this.rl, sg.ww, sg.wh, true);
			this.wd.setTouchable(true);
			break;
			//마인크래프트 상단팝업식 프로그래스창
			//(마인크래프트Assets 로드 필요)
			case 5:
			this.progressBar = new ProgressBar(ctx, null, android.R.attr.progressBarStyleHorizontal); //inVisible
			this.progressBar.setMax(1);
			this.progressBar.setProgress(0);
			var ll = new sg.ll(ctx);
			ll.setOrientation(sg.ll.HORIZONTAL);
			ll.setGravity(Gravity.CENTER);
			ll.setPadding(sg.px*16, sg.px*16, sg.px*16, sg.px*16);
			if(sgAssets.bg !== undefined) {
				ll.setBackgroundDrawable(sgAssets.bg.ninePatch());
			}
			var ll_p = new sg.rl.LayoutParams(sg.wc, sg.wc);
			ll_p.addRule(sg.rl.CENTER_HORIZONTAL);
			ll_p.addRule(sg.rl.ALIGN_PARENT_TOP);
			ll.setLayoutParams(ll_p);
			this.textView = sgUtils.gui.mcFastText("...", null, true, Color.WHITE);
			this.lt = sgUtils.gui.mcFastText("/", null, true, Color.WHITE);
			this._lt = "/";
			ll.addView(this.textView);
			ll.addView(this.lt);
			this.rl.addView(ll);
			this.wd = new PopupWindow(this.rl, sg.ww, sg.wh, false);
			this.wd.setTouchable(false);
			this.thread = new thread(function() {try {
				while(that.progressBar.getMax() !== that.progressBar.getProgress() && that.thread !== null) {
					uiThread(function() {try {
						switch(that._lt) {
							case "/":
							that._lt = "-";
							break;
							case "-":
							that._lt = "\\";
							break;
							case "\\":
							that._lt = " | ";
							break;
							default:
							that._lt = "/";
						}
						that.lt.setText(that._lt);
					}catch(err) {
						showError(err);
					}});
					sleep(100);
				}
				uiThread(function() {try {
					that.lt.setText("");
				}catch(err) {}});
			}catch(err) {
				showError(err);
			}});
			break;
			//빈공간
			case 6:
			throw new Error(":P Custom ProgressBar type 6 isn't ready yet");
			break;
			//오른쪽 하단의 좌.텍스트창 우.프로그래스바
			case 7:
			var ll = new sg.ll(ctx);
			ll.setOrientation(sg.ll.HORIZONTAL);
			ll.setPadding(sg.px*8, sg.px*8, sg.px*8, sg.px*8);
			ll.setGravity(Gravity.CENTER);
			ll.setBackgroundColor(Color.argb(0x88, 0, 0, 0));
			this.textView = sgUtils.gui.mcFastText("", null, false, Color.WHITE);
			this.textView.setGravity(Gravity.CENTER);
			this.progressBar = new ProgressBar(ctx);
			var p_p = new sg.ll.LayoutParams(sg.px*40, sg.px*40);
			this.progressBar.setLayoutParams(p_p);
			ll.addView(this.textView);
			ll.addView(this.progressBar);
			var ll_p = new sg.rl.LayoutParams(sg.wc, sg.wc);
			ll_p.addRule(sg.rl.ALIGN_PARENT_BOTTOM);
			ll_p.addRule(sg.rl.ALIGN_PARENT_RIGHT);
			ll.setLayoutParams(ll_p);
			this.rl.addView(ll);
			this.wd = new PopupWindow(this.rl, sg.ww, sg.wh, false);
			this.wd.setTouchable(false);
			break;
			default:
			throw new Error("Undefined custom progress bar type: " + type);
		}
	}
}



sgUtils.net = {

	toString: function() {
		return "[sgUtils - Net]";
	},

	/**
	 * Download file
	 *
	 * @author SemteulGaram
	 * @since 2015-01
	 *
	 * @param {File} path
	 * @param {string} url
	 * @param getMax - sgUtils.data pointer
	 * @param getProgress - sgUtils.data pointer
	 * @return {boolean} success
	 */
	download: function(path, url, getMax, getProgress) {
		try{
			var url = new URL(url);
			var urlConnect = url.openConnection();
			urlConnect.connect();
			var bis = new BufferedInputStream(url.openStream());
			if(getMax !== null || getMax !== undefined) {
				sgUtils.data[getMax] = urlConnect.getContentLength();
			}
			var fos = new FileOutputStream(path);
			var buffer = sg.ai(Byte.TYPE, 1024);
			var count = 0, content;
			while ((content = bis.read(buffer)) != -1) {
				fos.write(buffer, 0, content);
				count += parseInt(content);
				if(getProgress !== null || getProgress !== undefined) {
					sgUtils.data[getProgress] = count;
				}
			}
			fos.flush();
			fos.close();
			bis.close();
			return true;
		}catch(e){
			return false;
		}
	},

	/**
	 * Script server data
	 *
	 * @author SemteulGaram
	 * @since 2015-01
	 *
	 * =>loadScriptServerData
	 * @param {string} url
	 * @param savePointer - sgUtils.data pointer
	 * @return {boolean} success
	 *
	 * =>ReadContent
	 * @param savePointer - sgUtils.data pointer
	 * @param {string} article
	 * @return {string|null}
	 */
	loadScriptServerData: function(updateServerUrl, savePointer) {
		try{
			var url = new URL(updateServerUrl);
			var netStream = url.openStream();
			var br = new BufferedReader(new InputStreamReader(netStream));
			sgUtils.data[pointer] = [];
			var content;
			while ((content = br.readLine()) != null) {
				sUtil.data[savePointer].push(content);
			}
			br.close();
			return true;
		}catch(e) {
			return false;
		}
	},

	readContent: function(savePointer, article){
		var data = sgUtils.data[savePointer];
		var content;
		for(var e = 0; e < data.length; e++){
			if(data[e].split(":")[0] == article) {
				return data[e].subString(data[e].strPos(":")+1, data[e].length);
			}
		}
		return null;
	}
}



sgUtils.modPE = {

	toString: function() {
		return "[object sgUtils - ModPE]";
	},

	broadcast: function(str){
		sg.sm.nativeSendChat(str);
	},

	entityExtra: {
		isEqual: function(obj1, obj2) {
			return Entity.getUniqueId(obj1) === Entity.getUniqueId(obj2);
		},

		getAll: function() {
			var a = net.zhuoweizhang.mcpelauncher.ScriptManager.allentities;
			var entities = new Array(a.size());
			for(var n = 0; entities.length > n; n++){
				entities[n] = a.get(n);
			}
			return entities;
		},

		findEnt: function(uniqId) {
			var list = sgUtils.modPE.entityExtra.getAll();
			for(var e = 0; e < list.length; e++) {
				if(uniqId === Entity.getUniqueId(list[e])) {
					return list[e];
				}
			}
		},

		getRange: function(obj1, obj2) {try {
			return Math.sqrt(Math.pow(Entity.getX(obj1) - Entity.getX(obj2), 2) + Math.pow(Entity.getY(obj1) - Entity.getY(obj2), 2) + Math.pow(Entity.getZ(obj1) - Entity.getZ(obj2), 2));
		}catch(e) {
			return false;
		}},

		getNearEntitys: function(x, y, z) {
			var a = sgUtils.modPE.entityExtra.getAll();
			var r = [];
			var n = [];
			for(var e = 0; e < a.length; e++) {
				r.push(Math.sqrt(Math.pow(Entity.getX(a[e])-x, 2)+Math.pow(Entity.getY(a[e])-y, 2)+Math.pow(Entity.getZ(a[e])-z, 2)));
			}
			while(r.length > 0) {
				var i = r.indexOf(Math.min.apply(null, r));
				n.push(a[i]);
				r.splice(i, 1);
			}
			return n;
		}
	},

	playerExtra: {
		getOnlinePlayers: function() {
			var entitys = sgUtils.modPE.entityExtra.getAll();
			var list = [];
			for(var e = 0; e < entitys.length; e++) {
				if(Player.isPlayer(entitys[e])) {
					list.push(entitys[e]);
				}
			}
			return list;
		},

		isOnline: function(player) {
			var list = sgUtils.modPE.entityExtra.getAll();
			for(var e = 0; e < list.length; e++) {
				if(Player.isPlayer(list[e]) && sgUtils.modPE.entityExtra.isEqual(list[e], player)) {
					return true;
				}
			}
			return false;
		},

		getNearPlayers: function(x, y, z) {
			var a = sgUtils.modPE.entityExtra.getAll();
			var f = [];
			var r = [];
			var n = [];
			for(var e = 0; e < a.length; e++) {
				if(Player.isPlayer(a[e])) {
					f.push(a[e]);
					r.push(Math.sqrt(Math.pow(Entity.getX(a[e])-x, 2)+Math.pow(Entity.getY(a[e])-y, 2)+Math.pow(Entity.getZ(a[e])-z, 2)));
				}
			}
			while(r.length > 0) {
				var i = r.indexOf(Math.min.apply(null, r));
				n.push(f[i]);
				f.splice(i, 1);
				r.splice(i, 1);
			}
			return n;
		},

		getPlayer: function(name) {
			var list = sgUtils.modPE.entityExtra.getAll();
			for(var e = 0; e < list.length; e++) {
				if(Player.isPlayer(list[e]) && Player.getName(list[e]).toLowerCase() === (name+"").toLowerCase()) {
					return list[e];
				}
			}
			return false;
		}
	}
}



sgUtils.android = {

	toString: function() {
		return "[object sgUtils - Android]";
	},

	/**
	 * Battery Checker
  *
  * @author Semteul
  * @since 2015-04
  */
	battery: function() {
		if(!(this instanceof arguments.callee)) return new arguments.callee();
		var that = this;
		this.ifilter = new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED);

		this.isCharging = function() {
			var batteryStatus = ctx.registerReceiver(null, that.ifilter);
			var status = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_STATUS, -1);
			return status == android.os.BatteryManager.BATTERY_STATUS_CHARGING;
		}

		this.isFullCharging = function() {
			var batteryStatus = ctx.registerReceiver(null, that.ifilter);
			var status = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_STATUS, -1);
			return status == android.os.BatteryManager.BATTERY_STATUS_FULL;
		}

		this.plugType = function() {
			var batteryStatus = ctx.registerReceiver(null, that.ifilter);
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
		},

		this.level = function() {
			var batteryStatus = ctx.registerReceiver(null, that.ifilter);
		var level = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1);
			var scale = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1);
			return Math.round(level / scale * 100);
		},

		this.temp = function() {
			var batteryStatus = ctx.registerReceiver(null, that.ifilter);
			var temp = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_TEMPERATURE, -1);
			return parseInt(Math.round(temp)/10);
		},

		this.volt = function() {
			var batteryStatus = ctx.registerReceiver(null, that.ifilter);
			var volt = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_VOLTAGE, -1);
			return volt / 1000;
		},

		this.tec = function() {
			var batteryStatus = ctx.registerReceiver(null, that.ifilter);
			var tec = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_TECHNOLOGY, -1);
			return tec;
		},

		this.health = function() {
			var batteryStatus = ctx.registerReceiver(null, that.ifilter);
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
		}
	},

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

	//convert Java to Javascript by [Semteul]

	visualizer: function() {
		var that = this;
		//int
		this.TYPE_PCM = 0;
		this.TYPE_FFT = 1;
		//long
		this.MAX_IDLE_TIME_MS = 3000;
		//byte[]
		this.rawVizData;
		//int[]
		this.formattedVizData;
		//byte[]
		this.rawNullData = new sg.ai(Byte.TYPE, 0);
		//int[]
		this.formattedNullData = new sg.ai(Int.type, 0);
		//Visualizer
		this.visualizer;
		//int
		this.type;
		//long
		this.lastValidCaptrueTimeMs;

		this.range = new Array(2);
		// type, size - @int
		this.AudioCaptrue = function(type, size, session) {
			that.Type = type;
			that.range = android.media.audiofx.Visualizer.getCaptrueSizeRange();
		 	if(size < that.range[0]) {
				size = that.range[0];
			}
			if (size > VL.range[1]) {
				size = VL.range[1];
			}
			that.rawVizData = sg.ai(Byte.TYPE, size);
			that.formattedVizData = new Array(size);
			that.visualizer = null;
			try {
				that.visualizer = new android.media.audiofx.Visualizer(session);
				if(that.visualizer != null) {
					if(that.visualizer.getEnabled()) {
						that.visualizer.setEnabled(false);
					}
					that.visualizer.setCaptrueSize(that.rawVizData.length);
				}
			}catch(e) {
				showError(e);
			}
		}

		this.start = function() {
			if(that.visualizer != null) {
				try {
					if(!that.visualizer.getEnabled()) {
						that.visualizer.setEnabled(true);
						that.lastValidCaptrueTimeMs = java.lang.System.currentTimeMillis();
					}
				}catch(e) {
					showError(e);
				}
			}
		}

		this.stop = function() {
			if(that.visualizer != null) {
				try {
					if(that.visualizer.getEnabled()) {
						that.visualizer.setEnabled(false);
					}
				}catch(e) {
					showError(e);
				}
			}
		}

		this.release = function() {
			if(that.visualizer != null) {
				that.visualizer.release();
				that.visualizer = null;
			}
		}

		// return - @byte[]
		this.getRawData = function() {
			if(that.captrueData()) {
				return that.rawVizData;
			}else {
				return that.rawNullData;
			}
		}

		// num, den - @int
		// return - @byte[]
		this.getFormattedData = function(num, den) {
			if(that.captrueData()) {
				if(that.type === that.TYPE_PCM) {
					for(var i = 0; i < that.formattedVizData.length; i++) {
						//convert from unsigned 8 bit to signed 16 bit
						var tmp = (that.rawVizData[i] & 0xFF) - 128;
						// apply scaling factor
						that.formattedVizData[i] = (tmp*num)/den;
					}
				}else if(that.type === that.TYPE_FFT) {
					for (var i = 0; i < that.formattedVizData.length; i++) {
						// apply scaling factor
						that.formattedVizData[i] = (that.rawVizData[i]*num)/den;
					}
				}else {
					toast("Unknown AudioCaptrue Type");
					return that.formattedNullData;
				}
				return that.formattedVizData;
			} else {
				return that.formattedNullData;
			}
		}

		// return - boolen
		this.captrueData = function() {
			var status = android.media.audiofx.Visualizer.ERROR;
			var result = true;
			try {
				if(that.visualizer != null) {
					if(that.type === that.TYPE_PCM) {
						status = that.visualizer.getWaveForm(that.rawVizData);
					}else {
						status = that.visualizer.getFft(that.rawVizData);
					}
				}
			}catch(e) {
				showError(e);
			}finally {
				if (status !== android.media.audiofx.Visualizer.SUCCESS) {
					result = false;
				}else {
					// return idle state indication if silence lasts more than MAX_IDLE_TIME_MS
					//byte
					var nullValue = 0;
					if (that.type === that.TYPE_PCM) {
						nullValue = 0x80;
					}
					for(var i = 0; i < that.rawVizData.length; i++) {
						if (that.rawVizData[i] !== nullValue) break;
					}
					if(i === that.rawVizData.length) {
						if((java.lang.System.currentTimeMillis() - that.lastValidCaptrueTimeMs) > that.MAX_IDLE_TIME_MS) {
							result = false;
						}
					}else {
						that.lastValidCaptrueTimeMs = java.lang.System.currentTimeMillis();
					}
				}
			}
			return result;
		}

		this.mAudioCaptrue = null;
		this.mVisible = null;

		this.onVisibilityChanged = function(visible, type, size, audioSessionID) {
			mVisible = visible;
			if(visible) {
				if(that.mAudioCaptrue === null) {
					that.mAudioCaptrue = that.AudioCaptrue(type, size, audioSessionID);
					that.mVisData = new Array(size);
				}
				that.start();
			}else {
				if(that.mAudioCaptrue !== null) {
					that.stop();
					that.release();
					that.mAudioCaptrue = null;
				}
			}
		}
	},

	//ready
	//vis.onVisibilityChanged(visible, type, size, android.media.MediaPlayer().getAudioSessionId());

	//captrue
	//vis.mVizData = vis.getFormattedData(1, 1);

	/**
	 * Stereo BGS
	 *
	 * @author Semteul
	 * @since 2015-06
	 *
	 * @param (Int|nill) x
	 * @param (Int|null) y
	 * @param (Int|null) z
	 * @param (Object|null) ent
	 * @param (File) file <music>
	 * @param (Int) range <0~>
	 * @param (Float) airResistanse <0~1>
	 * @param (Float) vol <0~1>
	 * @param (Boolean) loop
	 * @param (Function|null) stopFunc
	 */
	bgs: function(x, y, z, ent, file, range, airResistance, vol, loop, stopFunc) {try {
		var controler = android.media.MediaPlayer();
		controler.setDataSource(file.getAbsolutePath());
		controler.setLooping(loop);
		if(ent !== null) {
			x = Entity.getX(ent);
			y = Entity.getY(ent);
			z = Entity.getZ(ent);
			}
		var v = sUtis.android._bgsMeasure(x, y, z, range, airResistance);
		controler.setVolume(v[0]*vol, v[1]*vol);
		controler.prepare();
		controler.start();
		if(sgUtils.data._bgs === null) {
			sgUtils.data._bgs = [];
		}
		sgUtils.data._bgs.push({x: x, y: y, z: z, ent: ent, ct: controler, file: file, session: controler.getAudioSessionId(), vol: vol, range: range, airResistance: airResistance, loop: loop, stopFunc: stopFunc});
		if(sgUtils.data._bgsThread === undefined || !sgUtils.data._bgsThread.isAlive()) {
			sgUtils.data._bgsThread = new thread(function() {try {
				while(true) {
					sgUtils.android._bgsManager();
					sleep(50);
				}
			}catch(e) {
				showError(e);
			}}).start();
		}
	}catch(e) {
		showError(e);
	}},

	//Private method
	_bgsManager: function() {try {
		for(var e = 0; e < sgUtils.data._bgs.length; e++) {
			if(!sgUtils.data._bgs[e].ct.isPlaying()) {
				sgUtils.data._bgs[e].ct.release();
				sgUtils.data._bgs.splice(e, 1);
				continue;
			}
			if(sgUtils.data._bgs[e].stopFunc !== null && sgUtils.data._bgs[e].stopFunc(e)) {
				sgUtils.data._bgs[e].ct.stop();
				sgUtils.data._bgs[e].ct.release();
				sgUtils.data._bgs.splice(e, 1);
				continue;
			}
			if(sgUtils.data._bgs[e].ent !== null && Entity.getHealth(sgUtils.data._bgs[e].ent) <= 0) {
				sgUtils.data._bgs[e].ent = null;
			}
			if(sgUtils.data._bgs[e].ent !== null) {
				sgUtils.data._bgs[e].x = Entity.getX(sgUtils.data._bgs[e].ent);
				sgUtils.data._bgs[e].y = Entity.getY(sgUtils.data._bgs[e].ent);
				sgUtils.data._bgs[e].z = Entity.getZ(sgUtils.data._bgs[e].ent);
			}
			var v = sgUtils.android._bgsMeasure(sgUtils.data._bgs[e].x, sgUtils.data._bgs[e].y, sgUtils.data._bgs[e].z, sgUtils.data._bgs[e].range, sgUtils.data._bgs[e].airResistance);
			sgUtils.data._bgs[e].ct.setVolume(v[0]*sgUtils.data._bgs[e].vol, v[1]*sgUtils.data._bgs[e].vol);
		}
	}catch(e) {
		showError(e);
	}},

	//Private method
	_stereoL: function(x, y, z, power) {
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
	},

	//Private method
	stereoR: function(x, y, z, power) {
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
	},

	//Private method
	_bgsMeasure: function(x, y, z, range, airResistance) {
		var distance = Math.sqrt(Math.pow(Player.getY() - y, 2) + Math.pow(Player.getX() - x, 2) + Math.pow(Player.getZ() - z, 2));
		if(distance < range) {
			return [sgUtils.android._stereoL(x, y, z, 3 * (range/distance)), sgUtils.android.stereoR(x, y, z, 3 * (range/distance))];
		}else {
			if(Math.sqrt(distance - range) * airResistance > 1.2) {
				return [0, 0];
			}
			var l = sgUtils.android._stereoL(x, y, z, 3) - (Math.sqrt(distance - range) * airResistance);
			var r = sgUtils.android._stereoR(x, y, z, 3) - (Math.sqrt(distance - range) * airResistance);
			if(l < 0) {
				l = 0;
			}
			if(r < 0) {
				r = 0;
			}
			return [l, r];
		}
	},

	/**
	 * Vibrator
	 *
	 * @author Semteul
	 * @since 2015-10-29
	 *
	 * @param <Long|Array|null> pattern
	 * @param <Int|null> repeat
	 * (-1: unlimited)
	 */
	vibrator: function(pattern, repeat) {
		if(sgUtils.data._vib === undefined) {
			sgUtils.data._vib = ctx.getSystemService(Context.VIBRATOR_SERVICE);
		}
		sgUtils.data._vib.cancel();
		if(repeat === undefined) {
			repeat = 1;
		}
		if(pattern === null || pattern === undefined) {
			sgUtils.data._vibThread = null;
			sgUtils.data._vibThreadId = null;
			return;
		}else if(typeof pattern === "number") {
			if(repeat === -1) {
				var id = sgUtils.math.randomId();
				sgUtils.data._vibThreadId = id;
				sgUtils.data._vibThread = thread(function() {try {
					while(true) {
						if(sgUtils.data._vibThreadId !== id) {
							return;
						}
						sgUtils.data._vib.vibrate(0xffff);
						sleep(0xffff);
					}
				}catch(e) {
					showError(e);
				}});
				sgUtils.data._vibThread.start();
			}else {
				sgUtils.data._vib.vibrate(pattern*repeat);
			}
		}else if(pattern instanceof Array) {
			var id = sgUtils.math.randomId();
			sgUtils.data._vibThreadId = id;
			sgUtils.data._vibThread = thread(function() {try {
				while(repeat-- !== 0) {
					for(var e = 0; e < pattern.length; e++) {
						if(sgUtils.data._vibThreadId !== id) {
							return;
						}
						if((e % 2) === 1) {
							sgUtils.data._vib.vibrate(pattern[e]);
						}
						sleep(pattern[e]);
					}
				}
			}catch(e) {
				showError(e);
			}});
			sgUtils.data._vibThread.start();
		}else {
			throw new Error("Illegal vibrator pattern type");
		}
	},

	/**
	 * Screenshot
	 *
	 * @author Semteul
	 * @since 2015-10-30
	 *
	 * @param <File> file
	 * @param <View|undefined> view
	 * (undefined = Full screen)
	 */
	//THIS METHOD ISN'T WORK ON FULL SCREEN
	screenshot: function(file, view) {
		if(view === undefined) {
			view = ctx.getWindow().getDecorView();
		}
		view.setDrawingCacheEnabled(true);
		//Bitmap
		var drawingCache = view.getDrawingCache();
		if(file.exists()) {
			file["delete"]();//file.delete();
		}
		file.getParentFile().mkdirs();
		file.createNewFile();

		var fos = new FileOutputStream(file);
		drawingCache.compress(Bitmap.CompressFormat.PNG, 100, fos);
		fos.close();
		view.setDrawingCacheEnabled(false);
	},

		/**
	 * ScreenBitmap
	 *
	 * @author Semteul
	 * @since 2015-10-30
	 *
	 * @param <View|undefined> view
	 * (undefined = Full screen)
	 * @return <Bitmap>
	 */
	//THIS METHOD ISN'T WORK ON FULL SCREEM
	screenBitmap: function(view) {
		if(view === undefined) {
			view = ctx.getWindow().getDecorView();
		}
		view.setDrawingCacheEnabled(true);
		//Bitmap
		var drawingCache = Bitmap.createBitmap(view.getDrawingCache());
		view.setDrawingCacheEnabled(false);
		return drawingCache;
	},

	/**
	 * Screen brightness
	 *
	 * @author Semteul
	 * @since 2015-10-30
	 *
	 * @param <Float> bright (0~1)
	 */
	screenBrightness: function(bright) {
		var p = ctx.getWindow().getAttributes();
		if(typeof p.screenBrightness === "number") {
			p.screenBrightness = bright;
			ctx.getWindow().setAttributes(p);
		}
	}
}



if(!sgFiles.font.exists()) {
	sgFiles.font.getParentFile().mkdirs();
	thread(function() {try {
		sgUtils.net.download(sgFiles.font, sgUrls.font);
	}catch(err) {}}).start();
}



function loadMcpeAssets() {try {
	sgAssets.mcpeCPC = ctx.createPackageContext("com.mojang.minecraftpe", Context.CONTEXT_IGNORE_SECURITY);
	sgAssets.nativeAssets = sgAssets.mcpeCPC.getAssets();
	try {
		sgAssets.SS = ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png");
		sgAssets.TG = ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png");
	}catch(e) {
		print("Resource load fail");
		sgAssets.SS = sgAssets.nativeAssets.open("images/gui/spritesheet.png");
		sgAssets.TG = sgAssets.nativeAssets.open("images/gui/touchgui.png");
	}
	sgAssets.SS_BF = BitmapFactory.decodeStream(sgAssets.SS);
	sgAssets.TG_BF = BitmapFactory.decodeStream(sgAssets.TG);

	sgAssets.fullBg = sgAssets.bitmapAssetCreator(sgAssets.SS_BF, 0, 0, 16, 16, sg.px*2, false, 5, 5, 12, 12);

	sgAssets.bg = sgAssets.bitmapAssetCreator(sgAssets.SS_BF, 34, 43, 14, 14, sg.px*2, false, 4, 4, 11, 11);
	/*
	sgAssets.title_l = new sgAssets.bitmapAssetCreator(sgAssets.TG_BF, 150, 26, 2, 25, sg.px*2, false);
	sgAssets.title_c = new sgAssets.bitmapAssetCreator(sgAssets.TG_BF, 153, 26, 8, 25, sg.px*2, false);
	sgAssets.title_r = new sgAssets.bitmapAssetCreator(sgAssets.TG_BF, 162, 26, 2, 25, sg.px*2, false);
	sgAssets.title_b = new sgAssets.bitmapAssetCreator(sgAssets.TG_BF, 153, 52, 8, 3, sg.px*2, false);
	sgAssets.title_la = new sg.ai(Int.TYPE, 50);
	sgAssets.title_ca = new sg.ai(Int.TYPE, 200);
	sgAssets.title_ra = new sg.ai(Int.TYPE, 50);
	sgAssets.title_ba = new sg.ai(Int.TYPE, 24);
	sgAssets.title_l.rawBitmap.getPixels(sgAssets.title_la, 0, 2, 0, 0, 2, 25);
	sgAssets.title_c.rawBitmap.getPixels(sgAssets.title_ca, 0, 8, 0, 0, 8, 25);
	sgAssets.title_r.rawBitmap.getPixels(sgAssets.title_ra, 0, 2, 0, 0, 2, 25);
	sgAssets.title_b.rawBitmap.getPixels(sgAssets.title_ba, 0, 8, 0, 0, 8, 3);
	sgAssets.title_p1 = sgUtils.convert.margeArray(sgAssets.title_l, sgAssets.title_c, 0, 2, 25, 8, 25, null);
	sgAssets.title_p2 = sgUtils.convert.margeArray(sgAssets.title_p1, sgAssets.title_r, 0, 10, 25, 2, 25, null);
	sgAssets.title_p3 = sgUtils.convert.margeArray(sgAssets.title_p2, sgAssets.title_b, 1, 12, 25, 8, 3, null);
	sgAssets.title = new sgAssets.customAssetCreator(sgAssets.title_p3, 12, 28, sg.px*2, false, 3, 3, 9, 22);
	*/
	sgAssets.exit = new sgAssets.bitmapAssetCreator(sgAssets.SS_BF, 60, 0, 18, 18, sg.px*2, false);
	sgAssets.exit_c = new sgAssets.bitmapAssetCreator(sgAssets.SS_BF, 78, 0, 18, 18, sg.px*2, false);

	sgAssets.button = new sgAssets.bitmapAssetCreator(sgAssets.SS_BF, 8, 32, 8, 8, sg.px*2, false, 1, 2, 7, 6);

	sgAssets.button_c = new sgAssets.bitmapAssetCreator(sgAssets.SS_BF, 0, 32, 8, 8, sg.px*2, false, 1, 2, 7, 6);

	var b = Color.parseColor("#6b6163");
	var i = Color.parseColor("#3a393a");
	sgAssets.textView = new sgAssets.customAssetCreator([
	b,b,b,b,b,b,
	b,b,b,b,b,b,
	b,b,i,i,b,b,
	b,b,i,i,b,b,
	b,b,b,b,b,b,
	b,b,b,b,b,b
	], 6, 6, sg.px*2, false, 3, 3, 4, 4);

	sgAssets.bg32 = Bitmap.createScaledBitmap(BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/bg32.png")), sg.px*64, sg.px*64, false)
}catch(e) {
	showError(e);
}}



var sgColors = {
	main: Color.parseColor("#348893"),
	mainBr: Color.parseColor("#3cbca4"),
	mainDk: Color.parseColor("#31878b"),
	warning: Color.parseColor("#ffab00"),
	critical: Color.parseColor("#ab0000")
}



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



var p = Color.WHITE;
sgAssets.weButton = new sgAssets.customAssetCreator([
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,p,p,0,0,0,
], 8, 8, sg.px*2, false, 4, 4, 5, 5);

var p = Color.WHITE;
var o = sgColors.mainBr;
sgAssets.weButtonClick = new sgAssets.customAssetCreator([
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,
0,0,0,o,o,0,0,0,
0,0,0,p,p,0,0,0,
], 8, 8, sg.px*2, false, 4, 4, 5, 5);

var p = sgColors.main;
sgAssets.weExit = new sgAssets.customAssetCreator([
p,0,0,0,p,
0,p,0,p,0,
0,0,p,0,0,
0,p,0,p,0,
p,0,0,0,p
], 5, 5, sg.px*4, false);

var p = sgColors.mainDk;
var o = Color.argb(0x55, 0, 0, 0);
sgAssets.toast = new sgAssets.customAssetCreator([
p,p,p,
p,o,p,
p,p,p
], 3, 3, sg.px*2, false, 2, 2, 2, 2);

var p = sgColors.warning;
sgAssets.toastWarning = new sgAssets.customAssetCreator([
p,p,p,
p,o,p,
p,p,p
], 3, 3, sg.px*2, false, 2, 2, 2, 2);

var p = sgColors.critical;
sgAssets.toastCritical = new sgAssets.customAssetCreator([
p,p,p,
p,o,p,
p,p,p
], 3, 3, sg.px*2, false, 2, 2, 2, 2);

sgAssets.bg32 = Bitmap.createScaledBitmap(BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/bg32.png")), sg.px*64, sg.px*64, false);



/**
 * BlockImageLoader
 *
 * @author affogatoman
 * @since 2015-07-12
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



function highlightBlocks(ary, id, data) {
	if(id === undefined) {
		id = 41;
		data = 0;
	}else if(data === undefined) {
		data = 0;
	}
	this.backup = [];
	for(var e = 0; e < ary.length; e++) {
		var x = ary[e][0];
		var y = ary[e][1];
		var z = ary[e][2];
		var oid = Level.getTile(x, y, z);
		var odata = Level.getData(x, y, z);
		if(oid === id && odata === data) {
			continue;
		}
		this.backup.push([x, y, z, oid, odata]);
		Level.setTile(x, y, z, id, data);
	}
}

highlightBlocks.prototype = {

	close: function() {
		for(var e = 0; e < this.backup.length; e++) {
			Level.setTile(this.backup[e][0], this.backup[e][1], this.backup[e][2], this.backup[e][3], this.backup[e][4]);
		}
	}
}

function areaHighlight(x1, y1, z1, x2, y2, z2) {
	var sx = x1 < x2 ? x1 : x2;
	var sy = y1 < y2 ? y1 : y2;
	var sz = z1 < z2 ? z1 : z2;
	var ex = x1 > x2 ? x1 : x2;
	var ey = y1 > y2 ? y1 : y2;
	var ez = z1 > z2 ? z1 : z2;

	var blocks = [];

	blocks.push([sx, sy, sz]);
	blocks.push([sx, sy, ez]);
	blocks.push([sx, ey, sz]);
	blocks.push([sx, ey, ez]);
	blocks.push([ex, sy, sz]);
	blocks.push([ex, sy, ez]);
	blocks.push([ex, ey, sz]);
	blocks.push([ex, ey, ez]);
	if(sx !== ex) {
		blocks.push([sx+1, sy, sz]);
		blocks.push([sx+1, sy, ez]);
		blocks.push([sx+1, ey, sz]);
		blocks.push([sx+1, ey, ez]);
		blocks.push([ex-1, sy, sz]);
		blocks.push([ex-1, sy, ez]);
		blocks.push([ex-1, ey, sz]);
		blocks.push([ex-1, ey, ez]);
	}
	if(sy !== ey) {
		blocks.push([sx, sy+1, sz]);
		blocks.push([sx, sy+1, ez]);
		blocks.push([sx, ey-1, sz]);
		blocks.push([sx, ey-1, ez]);
		blocks.push([ex, sy+1, sz]);
		blocks.push([ex, sy+1, ez]);
		blocks.push([ex, ey-1, sz]);
		blocks.push([ex, ey-1, ez]);
	}
	if(sz !== ez) {
		blocks.push([sx, sy, sz+1]);
		blocks.push([sx, sy, ez-1]);
		blocks.push([sx, ey, sz+1]);
		blocks.push([sx, ey, ez-1]);
		blocks.push([ex, sy, sz+1]);
		blocks.push([ex, sy, ez-1]);
		blocks.push([ex, ey, sz+1]);
		blocks.push([ex, ey, ez-1]);
	}

	return new highlightBlocks(blocks);
}

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
	this.id = parseInt(id);
	this.data = parseInt(data);
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.z = parseInt(z);
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
 * Piece
 *
 * @author CodeInside
 * @since 2015-10-12
 */
function Piece(xSize, ySize, zSize, piece) {
	this.xs = xSize;
	this.ys = ySize;
	this.zs = zSize;
	this.piece = piece;
	if((xSize*ySize*zSize) != piece.length) {
		throw new Error("warning not match size " + (xSize*ySize*zSize) + "!=" + piece.length);
	}
}

Piece.prototype = {

	toStrng: function() {
		return "[Piece " + xSize + ":" + ySize + ":" + zSize + "]";
	},

	getSizeX: function() {
		return this.xs
	},

	getSizeY: function() {
		return this.ys
	},

	getSizeZ: function() {
		return this.zs
	},

	getBlock: function(x, y, z) {
		var index = (z*this.ys*this.xs) + (y*this.xs) + x;
		if(index >= this.piece.length) {
			throw new Error("Null pointer error(Not index: " + index + "/" + this.piece.length);
		}
		return this.piece[index];
	},

	rotation: function(axis, rot) {
		var buffer = [];
		switch(axis) {
			case "x":
			switch(rot) {
				case 1:
				for(var y = this.ys-1; y >= 0; y--) {
				for(var z = 0; z < this.zs; z++) {
				for(var x = 0; x < this.xs; x++) {
					var t = this.getBlock(x, y, z);
					buffer.push(t);
				}
				}
				}
				var temp = this.ys;
				this.ys = this.zs;
				this.zs = temp;
				this.piece = buffer;
				break;

				case 2:
				for(var z = this.zs-1; z >= 0; z--) {
				for(var y = this.ys-1; y >= 0; y--) {
				for(var x = 0; x < this.xs; x++) {
					buffer.push(this.getBlock(x, y, z));
				}
				}
				}
				this.piece = buffer;
				break;

				case 3:
				for(var y = 0; y < this.ys; y++) {
				for(var z = this.zs-1; z >= 0; z--) {
				for(var x = 0; x < this.xs; x++) {
					buffer.push(this.getBlock(x, y, z));
				}
				}
				}
				var temp = this.ys;
				this.ys = this.zs;
				this.zs = temp;
				this.piece = buffer;
				break;

				default:
				throw new Error("Unknown rotation type: " + rot);
			}
			break;

			case "y":
			switch(rot) {
				case 1:
				for(var x = 0; x < this.xs; x++) {
				for(var y = 0; y < this.ys; y++) {
				for(var z = this.zs-1; z >= 0; z--) {
					buffer.push(this.getBlock(x, y, z));
				}
				}
				}
				var temp = this.xs;
				this.xs = this.zs;
				this.zs = temp;
				this.piece = buffer;
				break;

				case 2:
				for(var z = this.zs-1; z >= 0; z--) {
				for(var y = 0; y < this.ys; y++) {
				for(var x = this.xs-1; x >= 0; x--) {
					buffer.push(this.getBlock(x, y, z));
				}
				}
				}
				this.piece = buffer;
				break;

				case 3:
				for(var x = this.xs-1; x >= 0; x--) {
				for(var y = 0; y < this.ys; y++) {
				for(var z = 0; z < this.zs; z++) {
					buffer.push(this.getBlock(x, y, z));
				}
				}
				}
				var temp = this.xs;
				this.xs = this.zs;
				this.zs = temp;
				this.piece = buffer;
				break;

				default:
				throw new Error("Unknown rotation type: " + rot);
			}
			break;

			case "z":
			switch(rot) {
				case 1:
				for(var z = 0; z < this.zs; z++) {
				for(var x = 0; x < this.xs; x++) {
				for(var y = this.ys-1; y >= 0; y--) {
					buffer.push(this.getBlock(x, y, z));
				}
				}
				}
				var temp = this.xs;
				this.xs = this.ys;
				this.ys = temp;
				this.piece = buffer;
				break;

				case 2:
				for(var z = 0; z < this.zs; z++) {
				for(var y = this.ys-1; y >= 0; y--) {
				for(var x = this.xs-1; x >= p; x--) {
					buffer.push(this.getBlock(x, y, z));
				}
				}
				}
				this.piece = buffer;
				break;

				case 3:
				for(var z = 0; z < this.zs; z++) {
				for(var x = this.xs-1; x >= 0; x--) {
				for(var y = 0; y < this.ys; y++) {
					buffer.push(this.getBlock(x, y, z));
				}
				}
				}
				var temp = this.xs;
				this.xs = this.ys;
				this.ys = temp;
				this.piece = buffer;
				break;

				default:
				throw new Error("Unknown rotation type: " + rot);
			}
			break;

			default:
			throw new Error("Axis must be instance of 'x', 'y', 'z'");
		}
	},

	flip: function(axis) {
		var buffer = [];
		switch(axis) {
			case "x":
			for(var z = 0; z < this.zs; z++) {
			for(var y = 0; y < this.ys; y++) {
			for(var x = this.xs-1; x >= 0; x--) {
				buffer.push(this.getBlock(x, y, z));
			}
			}
			}
			this.piece = buffer;
			break;

			case "y":
			for(var z = 0; z < this.zs; z++) {
			for(var y = this.ys-1; y >= 0; y--) {
			for(var x = 0; x < this.xs; x++) {
				buffer.push(this.getBlock(x, y, z));
			}
			}
			}
			this.piece = buffer;
			break;

			case "z":
			for(var z = this.zs-1; z >= 0; z--) {
			for(var y = 0; y < this.ys; y++) {
			for(var x = 0; x < this.xs; x++) {
				buffer.push(this.getBlock(x, y, z));
			}
			}
			}
			this.piece = buffer;
			break;

			default:
			throw new Error("ERROR AXIS MUST BE INSTANCE OF 'x', 'y', 'z'");
		}
	}
}


var lang = "en_EU";
function msg(key, direct, target, replacement) {
	if(replacement === undefined) {
		replacement = [];
	}
	var msgstr = findMessage(key);
	for(var e = 0; e < replacement.length; e++) {
		msgstr = msgstr.split("{%" + replacement[e][0] + "}").join(replacement[e][1]);
	}
	if(direct !== true) {
		return msgstr;
	}
	var tempName = Entity.getNameTag(Player.getEntity());
	Entity.setNameTag(Player.getEntity(), "");
	if(target === undefined) {
		sgUtils.modPE.broadcast(ChatColor.GRAY + "[" + findMessage("tag") + " " + VERSION + "] " + ChatColor.YELLOW + msgstr);
	}else if(tempName.toLowerCase() === target.toLowerCase()) {
		we_toast(msgstr);
	}else {
		sgUtils.modPE.broadcast(ChatColor.GRAY + "[" + findMessage("tag") + " " + VERSION + "]" + target + "> " + ChatColor.YELLOW + msgstr);
	}
	Entity.setNameTag(Player.getEntity(), tempName);
}

function findMessage(key) {
	key = key + "";
	if(messageContainer[lang] !== undefined) {
		if(messageContainer[lang][key] !== undefined) {
			return messageContainer[lang][key];
		}
	}
	
	if(messageContainer["en_EU"][key] !== undefined) {
		return messageContainer["en_EU"][key];
	}else {
		return key;
	}
}



//======================
//WORLD EDIT SCRIPT SIDE
//======================

var messageContainer = {
	en_EU: {
		tag: "WorldEdit",
		start: "Start",
		stop: "Stop",
		cancel: "Calcel",
		save: "Save",
		load: "Load",
		next: "Next",
		prev: "Previous",
		fill: "Fill",
		clear: "Clear",
		replace: "Replace",
		wall: "Wall",
		circular: "Circular",
		hollow_circular: "Hollow circular",
		circle: "Circle",
		hollow_circle: "Hollow circle",
		semi_circle: "Semi-circle",
		hollow_semi_circle: "Hollow semi-circle",
		sphere: "Sphere",
		hollow_sphere: "Hollow sphere",
		hemi_sphere: "Hemi-Sphere",
		hollow_hemi_sphere: "Hollow hemi-sphere",
		copy: "Copy",
		cut: "Cut",
		paste: "Paste",
		flip: "Flip",
		rotation: "Rotation",
		axis: "Axis",
		direction: "Direction",
		backup: "Backup",
		restore: "Restore",
		id: "Id",
		damage: "Damage",
		edit: "Edit",
		tool: "Tool",
		setting: "Setting",
		about: "About",
		btn_vis: "Main button visible",
		menu_loc: "Menu location",
		auto_back: "Auto backup",
		work_type: "Work type",
		sync: "Sync",
		async: "Async",
		async_work_speed: "Async work speed",
		warning: "Warning",
		cirtical: "Critical",
		error: "Error",
		unknown: "Unknown",
		
		msg_preparing: "Preparing...",
		msg_backuping: "Backup...",
		msg_working: "Working...",
		msg_pos1: "Pos1 set X:{%x} Y:{%y} Z:{%z}",
		msg_pos2: "Pos2 set X:{%x} Y:{%y} Z:{%z}",
		msg_type_radi: "Type radious...",
		msg_select_block: "'{%w}'select block...",
		msg_select_axis: "Select axis...",
		msg_select_direction: "Select direction...",
		msg_select_degree: "Select degree...",
		msg_select_radi: "Select radious...",
		msg_axis: "Axis '{%a}' selected...",
		msg_direction: "Direction '{%d}' selected...",
		msg_degree: "Degree '{%d}' selected...",
		msg_cancel: "'{%w}' work canceled",
		msg_request: "'{%w}' work requested",
		msg_async_start: "Async edit start... do not turn off",
		msg_async_work: "Async editing... {%l}left",
		msg_async_end: "Async edit finish",
		 
		warn_no_player: "Can't find player: {%p}",
		warn_no_pos: "Please set 'Pos1' first",
		warn_no_pos2: "Please set 'pos1' or 'pos2' first",
		warn_no_copy: "복사된 블럭이 없습니다",
		warn_no_backup: "백업된 블럭이 없습니다",
		warn_unknown_block: "Please type right type of Block",
		warn_unknown_radious: "반지름은 자연수만 가능합니다",
		warn_unknown_axis: "기준 축은 'X', 'Y', 'Z' 중 하나만 가능합니다",
		warn_unknown_direction: "방향은 'X+', 'X-', 'Y+', 'Y-', 'Z+', 'Z-' 중 하나만 가능합니다",
		warn_unknown_type_degree: "각도는 '90', '180', '270' 중 하나만 가능합니다",
		warn_lang_need_reboot: "언어 변경후에는 재부팅하시길 권장합니다",
		warn_paste: "정말로 해당지역에 붙여넣기 하시겠습니까?",
		warn_already_working: "이미 처리중인 작업이 있습니다",
		warn_no_permisson: "No permission",

		cmd_usage: "Usage: ",
		cmd_help: "help",
		cmd_help_usage: "@help",
		cmd_help_desc: "월드에딧의 명령어들을 보여줍니다",
		cmd_commands: "Commands: ",
		cmd_help_usage2: "@help <명령어>",
		cmd_help_desc2: "월드에딧의 명령어에 대한 도움말을 보여줍니다",
		cmd_pos1: "pos1",
		cmd_pos1_usage: "@Pos1",
		cmd_pos1_desc: "현재 자신의 위치를 위치1로 지정합니다",
		cmd_pos2: "pos2",
		cmd_pos2_usage: "@Pos2",
		cmd_pos2_desc: "현재 자신의 위치를 위치2로 지정합니다",
		cmd_fill: "fill",
		cmd_fill_usage: "@Fill <Id:Damage>",
		cmd_fill_desc: "위치1,2 사이의 공간을 블럭아이디, 데미지값으로 채웁니다",
		cmd_clear: "clear",
		cmd_clear_usage: "@Clear",
		cmd_clear_desc: "위치1,2 사이의 공간을 위에서부터 비워나갑니다",
		cmd_replace: "replace",
		cmd_replace_usage: "@Replace <Id:Damage> <Id2:Damage2>",
		cmd_replace_desc: "위치1,2 사이의 공간에 있는 아이디, 데미지값의 블럭을 아이디2, 데미지값2의 블럭으로 대체합니다",
		cmd_wall: "wall",
		cmd_wall_usage: "@Wall <Id:Damage>",
		cmd_wall_desc: "위치1,2 사이의 공간에 4면의 벽을 세웁니다",
		cmd_circle: "circle",
		cmd_circle_usage: "@Circle <Id:Damage> <Radious> <Axis>",
		cmd_circle_desc: "위치1을 아이디, 데미지값의 블럭으로 만들어진 기준축 중심의 반지름 사이즈의 원을 생성합니다",
		cmd_hollow_circle: "hollowcircle",
		cmd_hollow_circle_usage: "@HollowCircle <Id:Damage> <Radious> <Axis>",
		cmd_hollow_circle_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 기준축 중심의 반지름 사이즈의 속이 빈 원을 만듭니다",
		cmd_semi_circle: "semicircle",
		cmd_semi_circle_usage: "@SemiCircle <Id:Damage> <Radious> <Axis> <Direction>",
		cmd_semi_circle_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 기준축 중심에서 지정된 방향으로 반지름 사이즈의 원을 생성합니다",
		cmd_hollow_semi_circle: "hollowsemicircle",
		cmd_hollow_semi_circle_usage: "@HollowSemiCircle <Id:Damage> <Radious> <Axis> <Direction>",
		cmd_hollow_semi_circle_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 기준축 중심에서 지정된 방향으로 반지름 사이즈의 속이 빈 반원을 생성합니다",
		cmd_sphere: "sphere",
		cmd_sphere_usage: "@Sphere <Id:Damage> <Radious>",
		cmd_sphere_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 반지름 사이즈의 구를 생성합니다",
		cmd_hollow_sphere: "hollowsphere",
		cmd_hollow_sphere_usage: "@HollowSphere <Id:Damage> <Radious>",
		cmd_hollow_sphere_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 반지름 사이즈의 속이 빈 구를 생성합니다",
		cmd_hemi_sphere: "hemisphere",
		cmd_hemi_sphere_usage: "@HemiSphere <Id:Damage> <Radious> <Direction>",
		cmd_hemi_sphere_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 지정된 방향의 반지름 사이즈의 반구를 생성합니다",
		cmd_hollow_hemi_sphere: "hollowhemisphere",
		cmd_hollow_hemi_sphere_usage: "HollowHemiSphere <Id:Damage> <Radious> <Direction>",
		cmd_hollow_hemi_sphere_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 지정된 방향의 반지름 사이즈의 속이 빈 반구를 생성합니다",
		cmd_copy: "copy",
		cmd_copy_usage: "@Copy",
		cmd_copy_desc: "위치1,2 사이의 영역을 복사합니다",
		cmd_cut: "cut",
		cmd_cut_usage: "@Cut",
		cmd_cut_desc: "위치1,2 사이의 영역을 잘라냅니다",
		cmd_paste: "paste",
		cmd_paste_usage: "@Paste",
		cmd_paste_desc: "위치1을 기준으로 현재 복사된 영역을 붙여넣기합니다",
		cmd_flip: "flip",
		cmd_flip_usage: "@Flip <Axis>",
		cmd_flip_desc: "복사된 영역을 기준축 방향으로 대칭합니다",
		cmd_rotation: "rotation",
		cmd_rotation_usage: "@Rotation <Axis> <Degree>",
		cmd_rotation_desc: "복사된 영역을 기준축으로 각도만큼 회전시킵니다"
	},

	ko_KR: {
		tag: "월드에딧",
		start: "시작",
		stop: "중지",
		cancel: "취소",
		save: "저장",
		load: "불러오기",
		next: "다음",
		prev: "이전",
		fill: "채우기",
		clear: "비우기",
		replace: "바꾸기",
		wall: "벽",
		circular: "원형",
		hollow_circular: "속 빈 원형",
		circle: "원",
		hollow_circle: "빈원",
		semi_circle: "반원",
		hollow_semi_circle: "빈반원",
		sphere: "구",
		hollow_sphere: "빈구",
		hemi_sphere: "반구",
		hollow_hemi_sphere: "빈반구",
		copy: "복사",
		cut: "잘라내기",
		paste: "붙여넣기",
		flip: "대칭",
		rotation: "회전",
		axis: "축",
		direction: "방향",
		backup: "백업",
		restore: "복원",
		id: "아이디",
		damage: "데미지",
		edit: "에딧",
		tool: "도구",
		setting: "설정",
		about: "대하여...",
		btn_vis: "메인버튼 보이기",
		menu_loc: "메뉴 위치",
		auto_back: "자동 백업",
		work_type: "작업 타입",
		sync: "동기",
		async: "비동기",
		async_work_speed: "비동기 작업 속도",
		warning: "경고",
		cirtical: "심각",
		error: "에러",
		unknown: "알 수 없음",
		
		msg_preparing: "준비 중...",
		msg_backuping: "백업 중...",
		msg_working: "작업 중...",
		msg_pos1: "위치1 지정됨 X:{%x} Y:{%y} Z:{%z}",
		msg_pos2: "위치2 지정됨 X:{%x} Y:{%y} Z:{%z}",
		msg_type_radi: "반지름 입력...",
		msg_select_block: "'{%w}'작업할 블럭 선택...",
		msg_select_axis: "기준 축 선택...",
		msg_select_direction: "방향 선택...",
		msg_select_degree: "각도 선택...",
		msg_select_radi: "반지름 선택...",
		msg_axis: "기준 축 '{%a}' 선택됨...",
		msg_direction: "방향 '{%d}' 선택됨...",
		msg_degree: "각도 '{%d}'도 로 선택됨...",
		msg_cancel: "'{%w}' 작업 취소됨",
		msg_request: "'{%w}' 작업 요청됨",
		msg_async_start: "비동기 작업 시작됨... 전원을 종료하지 마세요",
		msg_async_work: "비동기 에딧중... {%l}개 남음",
		msg_async_end: "비동기 에딧 완료",
		 
		warn_no_player: "플레이어를 찾을 수 없습니다: {%p}",
		warn_no_pos: "위치1을 지정해 주세요",
		warn_no_pos2: "위치1,2 지정해 주세요",
		warn_no_copy: "복사된 영역이 없습니다",
		warn_no_backup: "백업된 영역이 없습니다",
		warn_unknown_block: "제대로 된 형식의 블럭을 입력시켜주세요",
		warn_unknown_radious: "반지름은 자연수만 가능합니다",
		warn_unknown_axis: "기준 축은 'X', 'Y', 'Z' 중 하나만 가능합니다",
		warn_unknown_direction: "방향은 'X+', 'X-', 'Y+', 'Y-', 'Z+', 'Z-' 중 하나만 가능합니다",
		warn_unknown_type_degree: "각도는 '90', '180', '270' 중 하나만 가능합니다",
		warn_lang_need_reboot: "언어 변경후에는 재부팅하시길 권장합니다",
		warn_paste: "정말로 해당지역에 붙여넣기 하시겠습니까?",
		warn_already_working: "이미 처리중인 작업이 있습니다",
		warn_no_permisson: "권한이 없습니다",

		cmd_usage: "사용법: ",
		cmd_help: "도움말",
		cmd_help_usage: "@도움말",
		cmd_help_desc: "월드에딧의 명령어들을 보여줍니다",
		cmd_commands: "명령어: ",
		cmd_help_usage2: "@도움말 <명령어>",
		cmd_help_desc2: "월드에딧의 명령어에 대한 도움말을 보여줍니다",
		cmd_pos1: "위치1",
		cmd_pos1_usage: "@위치1",
		cmd_pos1_desc: "현재 자신의 위치를 위치1로 지정합니다",
		cmd_pos2: "위치2",
		cmd_pos2_usage: "@위치2",
		cmd_pos2_desc: "현재 자신의 위치를 위치2로 지정합니다",
		cmd_fill: "채우기",
		cmd_fill_usage: "@채우기 <아이디:데미지값>",
		cmd_fill_desc: "위치1,2 사이의 공간을 블럭아이디, 데미지값으로 채웁니다",
		cmd_clear: "비우기",
		cmd_clear_usage: "@비우기",
		cmd_clear_desc: "위치1,2 사이의 공간을 위에서부터 비워나갑니다",
		cmd_replace: "바꾸기",
		cmd_replace_usage: "@바꾸기 <아이디:데미지값> <아이디2:데미지값2>",
		cmd_replace_desc: "위치1,2 사이의 공간에 있는 아이디, 데미지값의 블럭을 아이디2, 데미지값2의 블럭으로 대체합니다",
		cmd_wall: "벽",
		cmd_wall_usage: "@벽 <아이디:데미지값>",
		cmd_wall_desc: "위치1,2 사이의 공간에 4면의 벽을 세웁니다",
		cmd_circle: "원",
		cmd_circle_usage: "@원 <아이디:데미지값> <반지름> <기준축>",
		cmd_circle_desc: "위치1을 아이디, 데미지값의 블럭으로 만들어진 기준축 중심의 반지름 사이즈의 원을 생성합니다",
		cmd_hollow_circle: "빈원",
		cmd_hollow_circle_usage: "@빈원 <아이디:데미지값> <반지름> <기준축>",
		cmd_hollow_circle_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 기준축 중심의 반지름 사이즈의 속이 빈 원을 만듭니다",
		cmd_semi_circle: "반원",
		cmd_semi_circle_usage: "@반원 <아이디:데미지값> <반지름> <기준축> <방향>",
		cmd_semi_circle_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 기준축 중심에서 지정된 방향으로 반지름 사이즈의 원을 생성합니다",
		cmd_hollow_semi_circle: "빈반원",
		cmd_hollow_semi_circle_usage: "@빈반원 <아이디:데미지값> <반지름> <기준축> <방향>",
		cmd_hollow_semi_circle_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 기준축 중심에서 지정된 방향으로 반지름 사이즈의 속이 빈 반원을 생성합니다",
		cmd_sphere: "구",
		cmd_sphere_usage: "@구 <아이디:데미지값> <반지름>",
		cmd_sphere_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 반지름 사이즈의 구를 생성합니다",
		cmd_hollow_sphere: "빈구",
		cmd_hollow_sphere_usage: "@빈구 <아이디:데미지값> <반지름>",
		cmd_hollow_sphere_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 반지름 사이즈의 속이 빈 구를 생성합니다",
		cmd_hemi_sphere: "반구",
		cmd_hemi_sphere_usage: "@반구 <아이디:데미지값> <반지름> <방향>",
		cmd_hemi_sphere_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 지정된 방향의 반지름 사이즈의 반구를 생성합니다",
		cmd_hollow_hemi_sphere: "빈반구",
		cmd_hollow_hemi_sphere_usage: "@빈반구 <아이디:데미지값> <반지름> <방향>",
		cmd_hollow_hemi_sphere_desc: "위치1을 중심으로 아이디, 데미지값의 블럭으로 만들어진 지정된 방향의 반지름 사이즈의 속이 빈 반구를 생성합니다",
		cmd_copy: "복사",
		cmd_copy_usage: "@복사",
		cmd_copy_desc: "위치1,2 사이의 영역을 복사합니다",
		cmd_cut: "잘라내기",
		cmd_cut_usage: "@잘라내기",
		cmd_cut_desc: "위치1,2 사이의 영역을 잘라냅니다",
		cmd_paste: "붙여넣기",
		cmd_paste_usage: "@붙여넣기",
		cmd_paste_desc: "위치1을 기준으로 현재 복사된 영역을 붙여넣기합니다",
		cmd_flip: "대칭",
		cmd_flip_usage: "@대칭 <기준축>",
		cmd_flip_desc: "복사된 영역을 기준축 방향으로 대칭합니다",
		cmd_rotation: "회전",
		cmd_rotation_usage: "@회전 <기준축> <각도>",
		cmd_rotation_desc: "복사된 영역을 기준축으로 각도만큼 회전시킵니다"
	}
}

function WorldEdit() {
	if (!(this instanceof arguments.callee)) return new arguments.callee();

	this.contentType = {
		REDIRECT_MENU: 0,
		RUN_FUNCTION: 1,
		TOGGLE: 2
	}

	this.langName = ["Minecraft setting", "English", "한국어"];
	this.langType = [null, "en_EU", "ko_KR"];

	this.settingFile = sgFiles.setting;
	this.defaultSetting = {
		Type: "ModPE_Script_WorldEdit",
		BtnX: 0,
		BtnY: Math.floor(sg.wh/5),
		BtnVis: 1,
		MenuLoc: 0,
		WorkType: 0,
		WorkSpeed: 8,
		SafeMode: 1,
		WhiteList: [],
		HollowCircular: 0,
		Lang: 0
	}
	this.setting = null;
	this.button = null;
	this.menu = null;
	this.currentMenu = null;
	this.mainMenu = null;
	this.loadingLayout = null;
	this.loading = null;

	this.readyInit = false;

	this.editorGroup = new we_editorGroup(this);

	//type -1: No image
	//type -2: Custom image
	this.blockData = [
["0:0", -1, [], false, "Air"],
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
["5:1", BlockTypes.CUBE, [["planks", 1]], true],
["5:2", BlockTypes.CUBE, [["planks", 2]], true],
["5:3", BlockTypes.CUBE, [["planks", 3]], true],
["5:4", BlockTypes.CUBE, [["planks", 4]], true],
["5:5", BlockTypes.CUBE, [["planks", 5]], true],
["6:0", BlockTypes.GRASS, [["sapling", 0]], false],
["6:1", BlockTypes.GRASS, [["sapling", 2]], false],
["6:2", BlockTypes.GRASS, [["sapling", 1]], false],
["6:3", BlockTypes.GRASS, [["sapling", 3]], false],
["6:4", BlockTypes.GRASS, [["sapling", 3]], false],
["6:5", BlockTypes.GRASS, [["sapling", 4]], false],
["7:0", BlockTypes.CUBE, [["bedrock", 0]], true],
["8:0", BlockTypes.PATHGRASS, [["flowing_water", 0]], false, "Flow"],
["9:0", BlockTypes.PATHGRASS, [["still_water", 0]], true, "Still"],
["10:0", BlockTypes.PATHGRASS, [["flowing_lava", 0]], false, "Flow"],
["11:0", BlockTypes.PATHGRASS, [["still_lava", 0]], true, "Still"],
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
["43:0", BlockTypes.CUBE, [["stone_slab", 1], ["stone_slab", 1], ["stone_slab", 0]], true, "Double slab"],
["43:1", BlockTypes.CUBE, [["sandstone", 0], ["sandstone", 0], ["sandstone", 3]], true, "Double slab"],
["43:2", BlockTypes.CUBE, [["planks", 0]], true, "Double slab"],
["43:3", BlockTypes.CUBE, [["cobblestone", 0]], true, "Double slab"],
["43:4", BlockTypes.CUBE, [["brick", 0]], true, "Double slab"],
["43:5", BlockTypes.CUBE, [["stonebrick", 0]], true, "Double slab"],
["43:6", BlockTypes.CUBE, [["quartz_block", 0]], true, "Double slab"],
["43:7", BlockTypes.CUBE, [["nether_brick", 0]], true, "Double slab"],
["44:0", BlockTypes.SLAB, [["stone_slab", 1], ["stone_slab", 1], ["stone_slab", 0]], true],
["44:1", BlockTypes.SLAB, [["sandstone", 0], ["sandstone", 0], ["sandstone", 3]], true],
["44:2", BlockTypes.SLAB, [["planks", 0]], true],
["44:3", BlockTypes.SLAB, [["cobblestone", 0]], true],
["44:4", BlockTypes.SLAB, [["brick", 0]], true],
["44:5", BlockTypes.SLAB, [["stonebrick", 0]], true],
["44:6", BlockTypes.SLAB, [["quartz_block", 0]], true],
["44:7", BlockTypes.SLAB, [["nether_brick", 0]], true],
["45:0", BlockTypes.CUBE, [["brick", 0]], true],
["46:0", BlockTypes.CUBE, [["tnt", 0], ["tnt", 0], ["tnt", 1]], true],
["47:0", BlockTypes.CUBE, [["bookshelf", 0], ["bookshelf", 0], ["planks", 0]], true],
["48:0", BlockTypes.CUBE, [["cobblestone_mossy", 0]], true],
["49:0", BlockTypes.CUBE, [["obsidian", 0]], true],
["50:0", BlockTypes.GRASS, [["torch_on", 0]], false],
["51:0", BlockTypes.GRASS, [["fire", 0]], false, "Fire"],
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
["63:0", -1, [], false, "Sign"],
["64:0", BlockTypes.GRASS, [["door", 1]], false],
["65:0", BlockTypes.GRASS, [["ladder", 0]], false],
["66:0", BlockTypes.GRASS, [["rail_normal", 0]], false],
["67:0", BlockTypes.STAIR, [["cobblestone", 0]], true],
//FIXME wallsign
["68:0", -1, [], false, "Wall sign"],
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
["95:0", -1, [], false, "Invisible Bedrock"],
["96:0", BlockTypes.TRAPDOOR, [["trapdoor", 0]], true],
["97:0", BlockTypes.CUBE, [["stone", 0]], false, "Silverfish"],
["97:1", BlockTypes.CUBE, [["cobblestone", 0]], false, "Silverfish"],
["97:2", BlockTypes.CUBE, [["stonebrick", 0]], false, "Silverfish"],
["97:3", BlockTypes.CUBE, [["stonebrick", 1]], false, "Silverfish"],
["97:4", BlockTypes.CUBE, [["stonebrick", 2]], false, "Silverfish"],
["97:5", BlockTypes.CUBE, [["stonebrick", 3]], false, "Silverfish"],
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
["107:0", BlockTypes.GRASS, [["planks", 0]], false, "Fence gate"],
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
["144:0", -1, [], false, "Head"],
["145:0", BlockTypes.GRASS, [["anvil_top_damaged_x", 0]], false, "Anvil"],
["145:1", BlockTypes.GRASS, [["anvil_top_damaged_x", 1]], false, "Anvil"],
["145:2", BlockTypes.GRASS, [["anvil_top_damaged_x", 2]], false, "Anvil"],
["152:0", BlockTypes.CUBE, [["redstone_block", 0]], true],
["153:0", BlockTypes.CUBE, [["quartz_ore", 0]], true],
["155:0", BlockTypes.CUBE, [["quartz_block", 1]], true],
["155:1", BlockTypes.CUBE, [["quartz_block", 3], ["quartz_block", 3], ["quartz_block", 4]], true],
["155:2", BlockTypes.CUBE, [["quartz_block", 5]], true],
["156:0", BlockTypes.STAIR, [["quartz_block", 1]], true],
["157:0", BlockTypes.CUBE, [["planks", 0]], true, "Double slab"],
["157:1", BlockTypes.CUBE, [["planks", 1]], true, "Double slab"],
["157:2", BlockTypes.CUBE, [["planks", 2]], true, "Double slab"],
["157:3", BlockTypes.CUBE, [["planks", 3]], true, "Double slab"],
["157:4", BlockTypes.CUBE, [["planks", 4]], true, "Double slab"],
["157:5", BlockTypes.CUBE, [["planks", 5]], true, "Double slab"],
["158:0", BlockTypes.SLAB, [["planks", 0]], true],
["158:1", BlockTypes.SLAB, [["planks", 1]], true],
["158:2", BlockTypes.SLAB, [["planks", 2]], true],
["158:3", BlockTypes.SLAB, [["planks", 3]], true],
["158:4", BlockTypes.SLAB, [["planks", 4]], true],
["158:5", BlockTypes.SLAB, [["planks", 5]], true],
["158:8", BlockTypes.SLAB, [["planks", 0]], true, "Upper"],
["158:9", BlockTypes.SLAB, [["planks", 1]], true, "Upper"],
["158:10", BlockTypes.SLAB, [["planks", 2]], true, "Upper"],
["158:11", BlockTypes.SLAB, [["planks", 3]], true, "Upper"],
["158:12", BlockTypes.SLAB, [["planks", 4]], true, "Upper"],
["158:13", BlockTypes.SLAB, [["planks", 5]], true, "Upper"],
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
["183:0", BlockTypes.GRASS, [["planks", 1]], false, "Fence gate"],
["184:0", BlockTypes.GRASS, [["planks", 2]], false, "Fence gate"],
["185:0", BlockTypes.GRASS, [["planks", 3]], false, "Fence gate"],
["186:0", BlockTypes.GRASS, [["planks", 4]], false, "Fence gate"],
["187:0", BlockTypes.GRASS, [["planks", 5]], false, "Fence gate"],
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
	this.blockImagesData = null;
	this.blockImagesLayout = null;
	this.currentSelectedBlock = null;
	this.blockIdLayout = null;

	this.synchronizationSetTileRequest = [];
	this.asynchronousSetTileRequest = [];
	this.modTickWorking = false;
	this.modTickMsgTick = 0;

	sgUtils.data.isProcessing = false;
	sgUtils.data.progress = [0, 1];
}

WorldEdit.prototype = {

	toString: function() {
		return "[object WorldEdit]";
	},

	init: function() {
		//각종 변수 초기화 및 등록
		if(this.loading !== null) {
			this.loading.close();
		}
		this.loading = new sgUtils.gui.progressBar(7);
		this.loading.setText("Load WorldEdit script...");
		this.loading.show();
		//TODO 더 나은방식으로 자원관리하기
		if(!sgFiles.logo.exists()) {
			thread(function() {try {
				sgFiles.assets.mkdirs();
				sgFiles.noMedia.createNewFile();
				sgUtils.net.download(sgFiles.logo, sgUrls.logo);
			}catch(err) {showError(err)}}).start();
		}
		//설정 불러오기
		this.loadSetting();
		//언어 설정
		this.loadLang();
		this.asynchEditSpeed = parseInt(this.setting.WorkSpeed);
		//메뉴와 버튼 빌드
		this.buildButton();
		this.buildMenu();
		//메뉴 내부에서 나타나는 프로그래스바 미리 그리기
		this.loadingLayout = new sg.rl(ctx);
		var pb = new ProgressBar(ctx);
		var pb_p = new sg.rl.LayoutParams(sg.px*40, sg.px*40);
		pb_p.addRule(sg.rl.CENTER_IN_PARENT);
		pb.setLayoutParams(pb_p);
		this.loadingLayout.addView(pb);
		//블럭 이미지를 보관할 레이아웃 미리 생성
		this.blockImagesLayout = new sg.ll(ctx);
		this.blockImagesLayout.setOrientation(sg.ll.VERTICAL);
		this.blockImagesLayout.setGravity(Gravity.CENTER);
		//블럭 아이디를 입력할 레이아웃
		this.blockIdLayout = new sg.ll(ctx);
		this.blockIdLayout.setOrientation(sg.ll.HORIZONTAL);
		this.blockIdLayout.setGravity(Gravity.CENTER);
		this.blockIdLayout.setPadding(sg.px*4, 0, sg.px*4, 0);
		var idTitle = sgUtils.gui.mcFastText(msg("id") + ":", sg.px*0x10, false, Color.WHITE);
		idTitle.setGravity(Gravity.CENTER);
		var idt_p = new sg.llp(sg.px*30, sg.wc);
		idTitle.setLayoutParams(idt_p);
		idTitle.setGravity(Gravity.CENTER);
		var damageTitle = sgUtils.gui.mcFastText(msg("damage") + ":", sg.px*0x10, false, Color.WHITE);
		damageTitle.setGravity(Gravity.CENTER);
		var dgt_p = new sg.llp(sg.px*90, sg.wc);
		damageTitle.setLayoutParams(dgt_p);
		damageTitle.setGravity(Gravity.CENTER);
		this.idEditText = new EditText(ctx);
		var idet_p = new sg.llp(Math.floor((sg.ww-(sg.px*140))/2), sg.wc);
		this.idEditText.setLayoutParams(idet_p);
		this.idEditText.setBackgroundColor(Color.WHITE);
		this.idEditText.setTextColor(sgColors.main);
		this.idEditText.setGravity(Gravity.CENTER|Gravity.RIGHT);
		this.idEditText.setPadding(sg.px*4, sg.px*4, sg.px*4, sg.px*4);
		if(sgFiles.font.exists()) {
			this.idEditText.setTypeface(android.graphics.Typeface.createFromFile(sgFiles.font));
		}
		this.idEditText.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, sg.px*0x10);
		this.damageEditText = new EditText(ctx);
		var dget_p = new sg.llp(Math.floor((sg.ww-(sg.px*140))/2), sg.wc);
		this.damageEditText.setLayoutParams(dget_p);
		this.damageEditText.setBackgroundColor(Color.WHITE);
		this.damageEditText.setTextColor(sgColors.main);
		this.damageEditText.setGravity(Gravity.CENTER|Gravity.RIGHT);
		this.damageEditText.setPadding(sg.px*4, sg.px*4, sg.px*4, sg.px*4);
		if(sgFiles.font.exists()) {
			this.damageEditText.setTypeface(android.graphics.Typeface.createFromFile(sgFiles.font));
		}
		this.damageEditText.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, sg.px*0x10);
		this.blockIdLayout.addView(idTitle);
		this.blockIdLayout.addView(this.idEditText);
		this.blockIdLayout.addView(damageTitle);
		this.blockIdLayout.addView(this.damageEditText);
		//에딧 그룹의 화이트 리스트 불러오기
		this.editorGroup.init();
		//블럭 이미지 빌드
		this.buildBlockImages();
		//로딩 끝
		this.readyInit = true;
		//우측 하단의 로딩창 닫기
		this.loading.close();
		this.loading = null;
	},

	loadSetting: function() {
		if(!this.settingFile.exists()) {
			this.saveSetting();
			return;
		}
		this.setting = sgUtils.io.loadJSON(this.settingFile);
		try {
			if(this.setting.Type !== "ModPE_Script_WorldEdit") {
				throw new Error("");
			}
		}catch(err) {
			this.settingFile.delete();
			this.saveSetting();
		}
	},

	saveSetting: function() {
		if(!this.settingFile.exists()) {
			this.settingFile.getParentFile().mkdirs();
			this.settingFile.createNewFile();
			this.setting = this.defaultSetting;
		}
		if(!sgUtils.io.saveJSON(this.settingFile, this.setting)) {
			we_toast("[ERROR] Can't save setting File", 2, 5000, true);
		}
	},

	get: function(article) {
		if(this.setting === null) {
			this.loadSetting();
		}
		var value = this.setting[article];
		if(value === undefined) {
			we_toast("[Warning] try to read undefined setting article: " + article, 1, 5000, true);
			value = this.defaultSetting[article];
		}
		return value;
	},

	set: function(article, value, save) {
		if(this.setting === null) {
			this.loadSetting();
		}
		if(this.setting[article] === undefined) {
			we_toast("[Warning] try to save undefined setting article: " + article, 2, 5000, true);
		}
		this.setting[article] = value;
		if(save) {
			this.saveSetting();
		}
		return true;
	},

	loadLang: function() {
		var type =  parseInt(this.get("Lang"));
		if(type === 0) {
			lang = sgUtils.io.loadMcpeSetting("game_language");
		}else {
			lang = this.langType[type];
		}
	},

	getLocalEditor: function() {
		return this.editorGroup.getEditor();
	},

	isButtonVisible: function() {
		if(this.button === null) {
			return false;
		}else {
			return this.button.isShowing();
		}
	},

	buildButton: function() {
		var that = this;
		if(this.isButtonVisible()) {
			this.setButtonVisible(false);
		}
		this.buttonI = new ImageButton(ctx);
		this.buttonI.setPadding(sg.px*4, sg.px*4, sg.px*4, sg.px*4);
		this.buttonI.setImageBitmap(BlockImageLoader.create(["piston_side", 0], ["piston_side", 0], ["piston_top_normal", 0], BlockTypes.CUBE, true));
		this.buttonI.setBackgroundColor(0);
		this.buttonI.setOnTouchListener(View.OnTouchListener({onTouch: function(view, event) {try {
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
				that._onMove = false;
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
					that.set("BtnX", x);
					that.set("BtnY", y, true);
				}
				break;
			}
		}catch(err) {
			showError(err);
		}
		return false;
		}}));
		this.buttonI.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
				that.setMenuVisible(true);
			}catch(err) {
				showError(err);
			}}}));
		this.buttonI.setOnLongClickListener(View.OnLongClickListener({onLongClick: function(view, event) {try {
			that._onMove = true;
		}catch(err) {
			showError(err);
		}
		return true;
		}}));
		this.button = new PopupWindow(this.buttonI, sg.wc, sg.wc, false);
	},

	setButtonVisible: function(vis) {
		var that = this;
		if(this.button === null) {
			this.buildButton();
		}
		uiThread(function() {try {
			if(vis) {
				if(!that.isButtonVisible()) {
					that.button.showAtLocation(sg.dv, Gravity.LEFT|Gravity.TOP, that.get("BtnX"), that.get("BtnY"));
				}
			}else {
				if(that.isButtonVisible()) {
					that.button.dismiss();
				}
			}
		}catch(err) {
			showError(err);
		}});
	},

	isMenuVisible: function() {
		if(this.menu === null) {
			return false;
		}else {
			return this.menu.isShowing();
		}
	},

	buildMenu: function() {
		var that = this;
		//메뉴 최상위 레이아웃
		this.m_rl = new sg.rl(ctx);
		this.m_rl.setId(sgUtils.math.randomId());
		//메뉴 제목 레이아웃
		this.m_title = new sg.rl(ctx);
		this.m_title.setId(sgUtils.math.randomId());
		//메뉴 내용물 레이아웃
		this.m_scroll = new ScrollView(ctx);
		this.m_scroll.setId(sgUtils.math.randomId());
		//제목 레이아웃 위치 설정
		var m_title_p = new sg.rl.LayoutParams(sg.mp, sg.px*0x30);
		m_title_p.addRule(sg.rl.ALIGN_PARENT_TOP);
		this.m_title.setLayoutParams(m_title_p);
		//내용물 레이아웃 위치 설정
		var m_scroll_p = new sg.rl.LayoutParams(sg.mp, sg.mp);
		m_scroll_p.addRule(sg.rl.BELOW, this.m_title.getId());
		this.m_scroll.setLayoutParams(m_scroll_p);
		//색 설정
		this.m_rl.setBackgroundColor(Color.argb(0x55, 0, 0, 0));
		this.m_title.setBackgroundColor(sgColors.main);
		//제목 레이아웃 뒤로버튼
		this.m_t_back = new ImageButton(ctx);
		this.m_t_back.setId(sgUtils.math.randomId());
		this.m_t_back.setImageBitmap(sgAssets.weExit.scaleBitmap);
		var m_t_back_p = new sg.rl.LayoutParams(sg.px*0x30, sg.px*0x30);
		m_t_back_p.addRule(sg.rl.ALIGN_PARENT_RIGHT);
		this.m_t_back.setLayoutParams(m_t_back_p);
		this.m_t_back.setBackgroundColor(Color.WHITE);
		this.m_t_back.setOnClickListener(View.OnClickListener({onClick: function(event, view) {try {
			that.backMenu();
		}catch(err) {
			showError(err);
		}}}));
		//제목 레이아웃 텍스트뷰
		this.m_t_text = sgUtils.gui.mcFastText("---", sg.px*0x10, false, Color.WHITE);
		this.m_t_text.setId(sgUtils.math.randomId());
		this.m_t_text.setGravity(Gravity.CENTER);
		var m_t_text_p = new sg.rl.LayoutParams(sg.mp, sg.mp);
		m_t_text_p.addRule(sg.rl.LEFT_OF, this.m_t_back.getId());
		this.m_t_text.setLayoutParams(m_t_text_p);
		//메뉴 상속
		this.m_title.addView(this.m_t_back);
		this.m_title.addView(this.m_t_text);
		this.m_rl.addView(this.m_title);
		this.m_rl.addView(this.m_scroll);
		//메뉴 팝업 윈도우
		this.menu = new PopupWindow(this.m_rl, sg.px*0x100, sg.wh, false);

		//메뉴 내용물들 빌드
		this.mainMenu = new we_menu(msg("tag"));
		//메인 메뉴 하위메뉴
		var mm_edit = new we_menu(msg("edit"));
		var mm_tool =  new we_menu(msg("tool"));
		var mm_setting = new we_menu(msg("setting"));
		//에딧메뉴 하위 메뉴
		var mme_circular = new we_menu(msg("circular"));
		var mme_copy = new we_menu(msg("copy"));

		//메인메뉴 목록
		this.mainMenu.addMenu(this.contentType.REDIRECT_MENU, msg("edit"), mm_edit);
		this.mainMenu.addMenu(this.contentType.REDIRECT_MENU, msg("setting"), mm_setting);
		this.mainMenu.addMenu(this.contentType.RUN_FUNCTION, msg("about"), this.about);
		//에딧메뉴 목록
		mm_edit.addMenu(this.contentType.RUN_FUNCTION, msg("restore"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.RESTORE);
		});
		mm_edit.addMenu(this.contentType.RUN_FUNCTION, msg("fill"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.FILL);
		});
		mm_edit.addMenu(this.contentType.RUN_FUNCTION, msg("clear"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.CLEAR);
		});
		mm_edit.addMenu(this.contentType.RUN_FUNCTION, msg("replace"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.REPLACE);
		});
		mm_edit.addMenu(this.contentType.RUN_FUNCTION, msg("wall"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.WALL);
		});
		mm_edit.addMenu(this.contentType.REDIRECT_MENU, msg("circular"), mme_circular);
		mm_edit.addMenu(this.contentType.REDIRECT_MENU, msg("copy"), mme_copy);
		//원형 생성 에딧메뉴 목록
		mme_circular.addMenu(this.contentType.TOGGLE, msg("hollow_circular"), function(bool) {
			if(bool === undefined) {
				return that.get("HollowCircular") == 1;
			}else if(bool) {
				that.set("HollowCircular", 1, true);
			}else {
				that.set("HollowCircular", 0, true);
			}
		});
		mme_circular.addMenu(this.contentType.RUN_FUNCTION, msg("sphere"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.SPHERE);
		});
		mme_circular.addMenu(this.contentType.RUN_FUNCTION, msg("hemi_sphere"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.HEMI_SPHERE);
		});
		mme_circular.addMenu(this.contentType.RUN_FUNCTION, msg("circle"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.CIRCLE);
		});
		mme_circular.addMenu(this.contentType.RUN_FUNCTION, msg("semi_circle"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.SEMI_CIRCLE);
		});
		//복사 에딧메뉴 목록
		mme_copy.addMenu(this.contentType.RUN_FUNCTION, msg("copy"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.COPY);
		});
		mme_copy.addMenu(this.contentType.RUN_FUNCTION, msg("cut"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.CUT);
		});
		mme_copy.addMenu(this.contentType.RUN_FUNCTION, msg("paste"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.PASTE);
		});
		mme_copy.addMenu(this.contentType.RUN_FUNCTION, msg("flip"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.FLIP);
		});
		mme_copy.addMenu(this.contentType.RUN_FUNCTION, msg("rotation"), function() {
			we_initEdit(parseInt(that.get("SafeMode")), parseInt(that.get("WorkType")), that.getLocalEditor(), EditType.ROTATION);
		});
		//설정메뉴 목록
		mm_setting.addMenu(this.contentType.RUN_FUNCTION, "Language:\n" + this.langName[parseInt(this.get("Lang"))], function(view) {
			var langIndex = parseInt(that.get("Lang"));
			if(++langIndex >= that.langType.length) {
				langIndex = 0;
			}
			that.set("Lang", langIndex, true);
			//현재 설정 변경
			that.loadLang();
			//재부팅 후 적용됩니다
			we_toast(msg("warn_lang_need_reboot"), 1, 5000);
			uiThread(function() {try {
				view.setText("Language:\n" + that.langName[langIndex]);
			}catch(err) {
				showError(err);
			}});
		});
		mm_setting.addMenu(this.contentType.TOGGLE, msg("btn_vis"), function(bool) {
			if(bool === undefined) {
				return that.get("BtnVis") == 1;
			}else if(bool) {
				that.set("BtnVis", 1, true);
			}else {
				that.set("BtnVis", 0, true);
			}
		});
		mm_setting.addMenu(this.contentType.RUN_FUNCTION, msg("menu_loc"), function() {
			switch(that.get("MenuLoc")) {
				case 0:
				that.set("MenuLoc", 1, true);
				break;
				case 1:
				that.set("MenuLoc", 2, true);
				break;
				default:
				that.set("MenuLoc", 0, true);
			}
			that.setMenuVisible(false);
			that.setMenuVisible(true);
		});
		mm_setting.addMenu(this.contentType.TOGGLE, msg("auto_back"), function(bool) {
			if(bool === undefined) {
				return that.get("SafeMode") == 1;
			}else if(bool) {
				that.set("SafeMode", 1, true);
			}else {
				that.set("SafeMode", 0, true);
			}
		});
		mm_setting.addMenu(this.contentType.TOGGLE, msg("work_type") + ":\n" + (that.get("WorkType") == 0 ? msg("sync") : msg("async")), function(bool) {
			if(bool === undefined) {
				return that.get("WorkType") == 1;
			}else if(bool) {
				that.set("WorkType", 1, true);
				return msg("work_type") + ":\n" + msg("async");
			}else {
				that.set("WorkType", 0, true);
				return msg("work_type") + ":\n" + msg("sync");
			}
		});
		mm_setting.addMenu(this.contentType.RUN_FUNCTION, msg("async_work_speed") + ": " + that.get("WorkSpeed"), function(view) {
			var np = new NumberPicker(ctx);
			var np_p = new sg.rlp(sg.px*0x100, sg.wc);
			np.setLayoutParams(np_p);
			np.setMinValue(0x1);
			np.setMaxValue(0x100);
			np.setValue(parseInt(that.get("WorkSpeed")));
			var dl = new we_dialog(msg("async_work_speed"), np, msg("save"), function() {
				this.close();
				that.set("WorkSpeed", parseInt(np.getValue()), true);
				that.asynchEditSpeed = parseInt(that.setting.WorkSpeed);
				uiThread(function() {try {
					view.setText(msg("async_work_speed") + ": " + that.get("WorkSpeed"));
				}catch(err) {
					showError(err);
				}});
			}, msg("cancel"), function(view) {
				this.close();
			}, Gravity.CENTER, true);
			dl.show();
		});

		//기본 메뉴로 전환
		this.changeMenu(this.mainMenu);
	},

	setMenuVisible: function(vis) {
		var that = this;
		if(this.menu === null) {
			this.buildMenu();
		}
		//메뉴 정렬 위치
		var grvs = parseInt(this.get("MenuLoc"));
		var grv;
		switch(grvs) {
			case 1:
			grv = Gravity.LEFT;
			break;
			case 2:
			grv = Gravity.CENTER;
			break;
			case 0:
			default:
			grv = Gravity.RIGHT;
		}
		uiThread(function() {try {
			if(vis) {
				if(!that.isMenuVisible()) {

					that.menu.showAtLocation(sg.dv, grv, 0, 0);
				}
			}else {
				if(that.isMenuVisible()) {
					that.menu.dismiss();
				}
			}
		}catch(err) {
			showError(err);
		}});
	},

	changeMenu: function(menu) {
		var that = this;
		thread(function() {try {
			that.currentMenu = menu;
			uiThread(function() {try {
				that.m_scroll.removeAllViews();
				that.m_t_text.setText(menu.getName());
				that.m_scroll.addView(that.loadingLayout);
			}catch(err) {
				showError(err);
			}});
			var layout = menu.getLayout();
			uiThread(function() {try {
				that.m_scroll.removeAllViews();
				that.m_scroll.addView(layout);
			}catch(err) {
				showError(err);
			}});
		}catch(err) {
			showError(err);
		}}).start();
	},

	backMenu: function() {
		if(this.currentMenu.getParentMenu() === null) {
			this.setMenuVisible(false);
		}else {
			this.changeMenu(this.currentMenu.getParentMenu());
		}
	},

	getBlockDataIndex: function(id, data) {
		if(data === undefined) {
			data = 0;
		}
		var key = id + ":" + data;
		for(var e = 0; e < this.blockData.length; e++) {
			if(this.blockData[e][0] === key) {
				return e;
			}
		}
		data = 0;
		key = id + ":" + data;
		for(var e = 0; e < this.blockData.length; e++) {
			if(this.blockData[e][0] === key) {
				return e;
			}
		}
		return -1;
	},

	getBlockDataImage: function(index) {
		if(index < 0 && index >= this.blockData.length) {
			return Bitmap.createBitmap(51, 57, Bitmap.Config.ARGB_8888);
		}
		var dat = this.blockData[index];
		if(dat[1] === -1) {
			return Bitmap.createBitmap(51, 57, Bitmap.Config.ARGB_8888);
		}else if(dat[1] === -2) {
			return dat[2];
		}else if(dat[2].length === 1) {
			return BlockImageLoader.create(dat[2][0], dat[2][0], dat[2][0], dat[1], dat[3]);
		}else {
			return BlockImageLoader.create(dat[2][0], dat[2][1], dat[2][2], dat[1], dat[3]);
		}
	},

	getBlockDataDescription: function(index) {
		if(index < 0 && index >= this.blockData.length) {
			return false;
		}
		var dat = this.blockData[index];
		if(dat[4] === undefined) {
			return false;
		}
		return dat[4];
	},

	buildBlockImages: function() {
		var that = this;
		//블럭 이미지 레이아웃 정보를 저장하는 배열
		this.blockImagesData = [];
		uiThread(function() {try {
			that.blockImagesLayout.removeAllViews();
		}catch(err) {
			showError(err);
		}});
		//가로의 한줄 배열
		var crtLayout = new sg.ll(ctx);
		var crtLayout_p = new sg.llp(sg.wc, sg.wc);
		crtLayout.setLayoutParams(crtLayout_p);
		crtLayout.setOrientation(sg.ll.HORIZONTAL);
		crtLayout.setGravity(Gravity.LEFT);
		var max = Math.floor((sg.ww - (sg.px*16))/(sg.px*0x30));
		var crt = 0;
		var temp = [];
		for(var e = 0; e < this.blockData.length; e++) {try {

			//각 블럭의 메인레이아웃
			var rl = new sg.rl(ctx);
			var rl_p = new sg.llp(sg.px*0x30, sg.px*0x30);
			rl.setLayoutParams(rl_p);
			rl.setPadding(sg.px*4, sg.px*4, sg.px*4, sg.px*4);
			//블럭 이미지뷰
			var imgV = new ImageView(ctx);
			imgV.setImageBitmap(this.getBlockDataImage(e));
			var imgV_p = new sg.rlp(sg.mp, sg.mp);
			imgV_p.addRule(sg.rl.CENTER_IN_PARENT);
			imgV.setLayoutParams(imgV_p);
			//블럭 아이디 텍스트뷰(항상 최상단이여야함)
			var idV = sgUtils.gui.mcFastText(this.blockData[e][0], sg.px*0xa, true, Color.WHITE);
			idV.setTag([e]);
			var idV_p = new sg.rlp(sg.mp, sg.mp);
			idV_p.addRule(sg.rl.ALIGN_PARENT_TOP);
			idV_p.addRule(sg.rl.ALIGN_PARENT_LEFT);
			idV.setLayoutParams(idV_p);
			//각각의 블럭이미지를 클릭했을때
			idV.setOnClickListener(View.OnClickListener({onClick: function(view) {try {
				if(that.currentSelectedBlock !== null) {
					that.blockImagesData[that.currentSelectedBlock][0].setBackgroundColor(Color.TRANSPARENT);
				}
				that.currentSelectedBlock = view.getTag()[0];
				that.blockImagesData[that.currentSelectedBlock][0].setBackgroundColor(sgColors.mainBr);
				var keys = (view.getText() + "").split(":")
				that.idEditText.setText(keys[0]);
				that.damageEditText.setText(keys[1]);
			}catch(err) {
				showError(err);
			}}}));

			rl.addView(imgV);
			//블럭 세부 설명 텍스트뷰
			var des = this.getBlockDataDescription(e);
			if(des !== false) {
				var desV = sgUtils.gui.mcFastText(des, sg.px*0x8, true, Color.YELLOW);
				var desV_p = new sg.rlp(sg.wc, sg.wc);
				desV_p.addRule(sg.rl.ALIGN_PARENT_BOTTOM);
				desV_p.addRule(sg.rl.ALIGN_PARENT_RIGHT);
				desV_p.setMargins(0, 0, sg.px*0x4, sg.px*0x8);
				desV.setLayoutParams(desV_p);
				desV.setGravity(Gravity.RIGHT);
				rl.addView(desV);
			}
			rl.addView(idV);
			this.blockImagesData[e] = [rl, imgV, idV, desV];
			crtLayout.addView(rl);
			if(++crt >= max) {
				crt = 0;
				temp.push(crtLayout);
				uiThread(function() {try {
					while(temp.length > 0) {
						that.blockImagesLayout.addView(temp.shift());
					}
				}catch(err) {
					showError(err);
				}});
				crtLayout = new sg.ll(ctx);
				crtLayout_p = new sg.llp(sg.wc, sg.wc);
				crtLayout.setLayoutParams(crtLayout_p);
				crtLayout.setOrientation(sg.ll.HORIZONTAL);
				crtLayout.setGravity(Gravity.LEFT);
			}
		}catch(err) {
			we_toast("Error occur on load BlockImage(" + this.blockData[e][0] + ")", 1);
		}}
		if(crt !== 0) {
			uiThread(function() {try {
				that.blockImagesLayout.addView(crtLayout);
			}catch(err) {
				showError(err);
			}});
		}
	},

	synchSetTileRequest: function(ary){
		if(!(ary instanceof Array)) {
			throw new Error("Unknown setTile request");
		}
		this.synchronizationSetTileRequest = this.synchronizationSetTileRequest.concat(ary);
	},

	asynchSetTileRequest: function(ary){
		if(!(ary instanceof Array)) {
			throw new Error("Unknown setTile request");
		}
		this.asynchronousSetTileRequest = this.asynchronousSetTileRequest.concat(ary);
	},

	about: function() {
		//최상위 레이아웃
		var lo = new sg.rl(ctx);
		//마인크래프트식 배경
		var lo_d = new BitmapDrawable(sgAssets.bg32);
		lo_d.setTileModeXY(Shader.TileMode.REPEAT, Shader.TileMode.REPEAT);
		lo.setBackgroundDrawable(lo_d);

		//나가기 버튼
		var ex = new ImageButton(ctx);
		var ex_p = new sg.rlp(sg.px*0x30, sg.px*0x30);
		ex_p.addRule(sg.rl.ALIGN_PARENT_LEFT);
		ex_p.addRule(sg.rl.ALIGN_PARENT_TOP);
		ex.setLayoutParams(ex_p);
		ex.setBackgroundDrawable(sgAssets.toast.ninePatch());
		ex.setImageBitmap(sgAssets.weExit.scaleBitmap);
		ex.setOnClickListener(View.OnClickListener({onClick: function(view) {try {
			wd.dismiss();
		}catch(err) {
			showError(err);
		}}}));
		lo.addView(ex);

		//로고와 스크립트 타이틀 레이아웃
		var lg = new sg.ll(ctx);
		var lg_p = new sg.rlp(sg.wc, sg.wc);
		lg_p.addRule(sg.rl.CENTER_IN_PARENT);
		lg.setLayoutParams(lg_p);
		lg.setOrientation(sg.ll.VERTICAL);
		lg.setGravity(Gravity.CENTER);

		//메인 로고 이미지뷰
		var iv = sgUtils.io.loadBitmapLayout(sgFiles.logo);
		iv.setId(sgUtils.math.randomId());
		var iv_p = new sg.llp(sg.mp, sg.px*0x100);
		iv.setLayoutParams(iv_p);
		lg.addView(iv);

		//메인 타이틀 레이아웃
		var tlo = new sg.ll(ctx);
		tlo.setOrientation(sg.ll.HORIZONTAL);
		tlo.setGravity(Gravity.BOTTOM);
		var tlo_p = new sg.llp(sg.wc, sg.wc);
		tlo_p.setMargins(sg.px*0xa, sg.px*0xa, sg.px*0xa, sg.px*0xa);
		tlo.setLayoutParams(tlo_p);

		//메인 스크립트 제목 텍스트뷰
		var tst = sgUtils.gui.mcFastText(NAME, sg.px*0x20, false, Color.WHITE, null, null, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4]);
		tlo.addView(tst);

		//메인 스크립트 버전 텍스트뷰
		var tsv = sgUtils.gui.mcFastText(VERSION, sg.px*0x10, false, Color.YELLOW, null, null, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4]);
		tlo.addView(tsv);

		//네임 스페이스
		var ns = sgUtils.gui.mcFastText("SemteulGaram©", sg.px*0x10, false, Color.WHITE, null, null, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4]);
		var ns_p = new sg.rlp(sg.wc, sg.wc);
		ns_p.addRule(sg.rl.ALIGN_PARENT_BOTTOM);
		ns_p.addRule(sg.rl.ALIGN_PARENT_LEFT);
		ns.setLayoutParams(ns_p);
		lo.addView(ns);

		//여분의 공간
		var es = sgUtils.gui.mcFastText("BETA Version", sg.px*0x10, false, Color.WHITE, null, null, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4]);
		var es_p = new sg.rlp(sg.wc, sg.wc);
		es_p.addRule(sg.rl.ALIGN_PARENT_BOTTOM);
		es_p.addRule(sg.rl.ALIGN_PARENT_RIGHT);
		es.setLayoutParams(es_p);
		lo.addView(es);

		lg.addView(tlo);
		lo.addView(lg);

		//팝업윈도우
		var wd = new PopupWindow(lo, sg.ww, sg.wh, true);
		uiThread(function() {try {
			wd.showAtLocation(sg.dv, 0, 0, 0);
		}catch(err) {
			showError(err);
		}})
	}
}



function we_toast(txt, type, duration, isImportent, size, color) {
	var drawableType;
	switch(type) {
		case 1:
		drawableType = sgAssets.toastWarning.ninePatch();
		break;
		case 2:
		drawableType = sgAssets.toastCritical.ninePatch();
		break;
		default:
		drawableType = sgAssets.toast.ninePatch();
	}
	sgUtils.gui.toast(txt, drawableType, duration, isImportent, size, color);
}



function we_menu(name) {
	var that = this;
	this.name = name;
	this.menus = [];
	this.parentMenu = null;
}

we_menu.prototype = {

	toString: function() {
		return "['" + this.name + "' Menu]";
	},

	isEqual: function(menu) {
		if(menu instanceof we_menu) {
			return this.name === menu.name;
		}else {
			return false;
		}
	},

	getParentMenu: function() {
		return this.parentMenu;
	},

	setParentMenu: function(menu) {
		if(!(menu instanceof we_menu)) {
			throw new TypeError("The parameter 'menu' is must instance of we_menu");
		}
		this.parentMenu = menu;
	},

	getName: function() {
		return this.name;
	},

	getLayout: function() {
		var that = this;
		//반환할 레이아웃
		var ll = new sg.ll(ctx);
		ll.setOrientation(sg.ll.VERTICAL);
		for(var e = 0; e < this.menus.length; e++) {
			var con = this.menus[e];
			//메뉴에 들어갈 버튼들 빌드
			switch(con[0]) {
				//REDIRECT_MENU
				case 0:
				var btn = sgUtils.gui.mcFastButton(con[1], sg.px*0x10, false, Color.WHITE, null, null, null, [sg.px*4, sg.px*8, sg.px*4, sg.px*8], null, sgAssets.weButton.ninePatch(), null, function(view) {try {
					thread(function() {try {
						main.changeMenu(view.getTag());
					}catch(err) {
						showError(err);
					}}).start();
				}catch(err) {
					showError(err);
				}}, null);
				break;
				//RUN_FUNCTION
				case 1:
				var btn = sgUtils.gui.mcFastButton(con[1], sg.px*0x10, false, Color.WHITE, null, null, null, [sg.px*4, sg.px*8, sg.px*4, sg.px*8], null, sgAssets.weButton.ninePatch(), null, function(view) {try {
					var func = view.getTag();
					thread(function() {try {
						func(view);
					}catch(err) {
						showError(err);
					}}).start();
				}catch(err) {
					showError(err);
				}}, null);
				break;
				//TOGGLE
				case 2:
				//현재 토글의 상태 (true, false)
				var btn = sgUtils.gui.mcFastButton(con[1], sg.px*0x10, false, Color.WHITE, null, null, null, [sg.px*4, sg.px*8, sg.px*4, sg.px*8], null, con[2]() ? sgAssets.weButtonClick.ninePatch() : sgAssets.weButton.ninePatch(), null, function(view) {try {
					var func = view.getTag();
					if(func()) {
						var text = func(false);
						view.setBackgroundDrawable(sgAssets.weButton.ninePatch());
						if(text !== undefined) {
							view.setText(text)
						}
					}else {
						var text = func(true);
						view.setBackgroundDrawable(sgAssets.weButtonClick.ninePatch());
						if(text !== undefined) {
							view.setText(text)
						}
					}
				}catch(err) {
					showError(err);
				}}, null);
				break;
			}
			btn.setTag(con[2]);
			var btn_p = new sg.ll.LayoutParams(sg.mp, sg.wc);
			btn.setLayoutParams(btn_p);
			ll.addView(btn);
		}
		return ll;
	},

	addMenu: function(type, name, content) {
		//부모 등록
		if(type === 0) {
			content.setParentMenu(this);
		}
		this.menus.push([type, name, content]);
	}
}



function we_editorGroup(worldEdit) {
	this._parent = worldEdit;
	this.editors = [];
}

we_editorGroup.prototype = {

	toString: function() {
		return "[object we_editorGroup]";
	},

	init: function() {

	},

	isAllow: function(name) {
		var lcName = name.toLowerCase();
		var wl = this._parent.get("WhiteList");
		var allow = false;
		if(Player.getName(Player.getEntity()).toLowerCase() === lcName) {
			allow = true;
		}else {
			for(var e = 0; e < wl.length; e++) {
				if(wl[e].toLowerCase() === lcName) {
					allow = true;
					break;
				}
			}
		}
		return allow;
	},

	getEditor: function(name) {
		if(name === undefined) {
			name = Player.getName(Player.getEntity());
		}
		if(!this.isAllow(name)) {
			return false;
		}
		for(var e = 0; e < this.editors.length; e++) {
			if(this.editors[e].isOwner(name)) {
				return this.editors[e];
			}
		}
		this.editors.push(new we_editor(this, name));
		return this.editors[this.editors.length - 1];
	}
}



function we_editor(editorGroup, name) {
	this._parent = editorGroup;
	this.owner = name;
	this.pos1 = null;
	this.pos2 = null;
	this.backup = null;
	this.backupPos = null;
	this.copy = null;
	this.tempBlocks = null;
}

we_editor.prototype = {

	toString: function() {
		return "[object we_editor(" + this.owner + ")]";
	},

	isOnline: function() {
		return sgUtils.modPE.playerExtra.getPlayer(this.owner) !== false;
	},

	isOwner: function(name) {
		return name.toLowerCase() === this.owner.toLowerCase();
	},

	getOwner: function() {
		return sgUtils.modPE.playerExtra.getPlayer(this.owner);
	},

	getName: function() {
		return this.owner;
	},

	getPos1: function() {
		return this.pos1;
	},

	getPos2: function() {
		return this.pos2;
	},

	getBackup: function() {
		return this.backup;
	},

	getCopy: function() {
		return this.copy;
	},

	getTempBlocks: function() {
		return this.tempBlocks;
	},

	setPos1: function(pos) {
		if(!(pos instanceof Vector3)) {
			throw new TypeError("Parameter 'pos' must instance of Vector3");
		}
		this.pos1 = pos;
	},

	setPos2: function(pos) {
		if(!(pos instanceof Vector3)) {
			throw new TypeError("Parameter 'pos' must instance of Vector3");
		}
		this.pos2 = pos;
	},

	setBackup: function(data) {
		this.backup = data;
	},

	setCopy: function(piece, pos) {
		if(!(piece instanceof Piece)) {
			throw new TypeError("Parameter 'piece' must instance of Piece");
		}
		this.copy = piece;
	},

	setTempBlocks: function(tempData) {
		this.tempBlocks = tempData;
	}
}



var EditType = {
	FILL: 0x00,
	CLEAR: 0x01,
	REPLACE: 0x02,
	WALL: 0x03,
	SPHERE: 0x10,
	HEMI_SPHERE: 0x11,
	CIRCLE: 0x12,
	SEMI_CIRCLE: 0x13,
	COPY: 0x20,
	CUT: 0x21,
	PASTE: 0x22,
	ROTATION: 0x23,
	FLIP: 0x24,
	BACKUP: 0x30,
	RESTORE: 0x31
	//PLACE_TEMP_BLOCKS: 0xff 사용 금지
}

//we_initEdit에서 예외처리, GUI작업을 진행
//we_edit에서 블럭 분석/설치, 요청작업을 진행
function we_initEdit(safeMode, workType, editor, editType, editDetail) {
	var that = this;
	if(!editor.isOnline()) {
		msg("warn_cant_find_player", true, editor.getName());
		return;
	}
	if(sgUtils.data.isProcessing) {
		msg("warn_already_working", true, editor.getName());
		return;
	}

	//현재 작업 상태
	var atv_m = 0;
	//작업 이름
	var workName = msg("unknown");
	//작업 타입
	var type = null;
	//작업 쓰레드 준비
	var loading = null;
	var atv = thread(function() {try{
		//로컬작업일 경우 로딩 프로그래스바 쓰레드 생성
		if(editor.getName().toLowerCase() === (Player.getName(Player.getEntity())+"").toLowerCase()) {
			loading = new sgUtils.gui.progressBar(3, true);
			loading.setText(msg("msg_preparing"));
			thread(function() {try {
				loading.show();
				var pgt;
				//작업 상태가 3가 되면 종료
				while(atv_m !== 3 && loading.isShowing()) {
					pgt = "(" + sgUtils.convert.numberToString(sgUtils.data.progress[0]) + "/" + sgUtils.convert.numberToString(sgUtils.data.progress[1]) + ")";
					if(atv_m === 0) {
						loading.setText(msg("msg_preparing") + pgt);
						loading.setMax(sgUtils.data.progress[1]);
						loading.setProgress(sgUtils.data.progress[0]);
					}else if(atv_m === 1) {
						loading.setText(msg("msg_backuping") + pgt);
						loading.setMax(sgUtils.data.progress[1]);
						loading.setProgress(sgUtils.data.progress[0]);
					}else if(atv_m === 2) {
						loading.setText(msg("msg_working", false, null, [["w", workName]]) + pgt);
						loading.setMax(sgUtils.data.progress[1]);
						loading.setProgress(sgUtils.data.progress[0]);
					}
					sleep(0x80);
				}
				//로딩창 닫기
				loading.close();
			}catch(err) {
				showError(err);
			}}).start();
		}
		//정보
		var blocks = we_edit(type, editor, editDetail);
		if(!Array.isArray(blocks) || blocks.length === 0) {
			atv_m = 3;
			return;
		}else {
			atv_m = 1;
			editor.setTempBlocks(blocks);
		}

		if(safeMode === 1) {
			//백업
			we_edit(EditType.BACKUP, editor);
		}
		atv_m = 2;

		//에딧
		if(loading !== null) {
			_loadingScreen = loading;
		};
		if(workType === 0) {
			main.synchSetTileRequest(editor.getTempBlocks());
		}else {
			main.asynchSetTileRequest(editor.getTempBlocks());
		}
	}catch(err) {
		showError(err);
	}});
	//작업 현황을 알 수 없는 작업 쓰레드 준비
	var uatv = thread(function() {try{
		//로컬작업일 경우 로딩 프로그래스바 쓰레드 생성
		if(editor.getName().toLowerCase() === (Player.getName(Player.getEntity())+"").toLowerCase()) {
			loading = new sgUtils.gui.progressBar(4, true);
			loading.setText(msg("msg_preparing"));
			thread(function() {try {
				loading.show();
				var pgt;
				//작업 상태가 1이 되면 종료
				while(atv_m !== 1 && loading.isShowing()) {
					if(atv_m === 0) {
						loading.setText(msg("msg_working", false, null, [["w", workName]]));
					}
					sleep(0x80);
				}
				//로딩창 닫기
				loading.close();
			}catch(err) {
				showError(err);
			}}).start();
		}
		//정보
		var blocks = we_edit(type, editor, editDetail);
		if(!Array.isArray(blocks) || blocks.length === 0) {
			atv_m = 1;
			return;
		}else {
			editor.setTempBlocks(blocks);
		}

		if(safeMode === 1) {
			//백업
			we_edit(EditType.BACKUP, editor);
		}

		//에딧
		if(loading !== null) {
			_loadingScreen = loading;
		}
		if(workType === 0) {
			main.synchSetTileRequest(editor.getTempBlocks());
		}else {
			main.asynchSetTileRequest(editor.getTempBlocks());
		}
	}catch(err) {
		showError(err);
	}});

	switch(editType) {

		//EditDetail: [FilledBlock]
		case EditType.FILL:
		//예외 처리
		if(editor.getPos1() === null || editor.getPos2() === null) {
			msg("warn_no_pos2", true, editor.getName());
			return;
		}
		workName = msg("fill");
		type = EditType.FILL;

		if(editDetail === undefined) {//추가 정보가 없으면(로컬)
			var bs = new we_blockSelect(msg("msg_select_block", false, null, [["w", msg("fill")]]), msg("start"), function(id, data) {
				//긍정 버튼을 누를때
				this.close();
				editDetail = [new Block(id, data)];
				//액티브 스타트!
				atv.start();
			}, msg("cancel"), function() {
				//부정 버튼을 누를때
				this.close();
			});
			bs.show();
		}else {//추가 정보가 있으면(서버원)
			//액티브 스타트!
			atv.start();
		}
		break;



		//EditDetail: []
		case EditType.CLEAR:
		//예외 처리
		if(editor.getPos1() === null || editor.getPos2() === null) {
			msg("warn_no_pos2", true, editor.getName());
			return;
		}
		workName = msg("clear");
		type = EditType.CLEAR;

		//추가정보 없이 액티브 스타트!
		atv.start();
		break;



		//EditDetail: [fromReplaceBlock, toReplaceBlock]
		case EditType.REPLACE:
		//예외 처리
		if(editor.getPos1() === null || editor.getPos2() === null) {
			msg("warn_no_pos2", true, editor.getName());
			return;
		}
		workName = msg("replace");
		type = EditType.REPLACE;

		if(editDetail === undefined) {//추가 정보가 없으면(로컬)
			//bs(블럭선택)창이 먼저 뜨고나서 bs2(블럭선택)창이 뜹니다
			//bs = 바꿀 블럭 선택 / bs2 = 바꿔질 블럭 선택
			var bs2 = new we_blockSelect(msg("msg_select_block", false, null, [["w", msg("replace2")]]), msg("start"), function(id, data) {
				//긍정 버튼을 누를때
				this.close();
				editDetail.push(new Block(id, data));
				//액티브 스타트!
				atv.start();
			}, msg("cancel"), function() {
				//정 버튼을 누를때
				this.close();
			});
			var bs = new we_blockSelect(msg("msg_select_block", false, null, [["w", msg("replace3")]]), msg("next"), function(id, data) {
				//긍정버튼을 누를때
				this.close();
				editDetail = [new Block(id, data)];
				//다음 창 보이기
				bs2.show();
			}, msg("cancel"), function() {
				//부정 버튼을 누를때
				this.close();
			});
			//bs부터 띄우기
			bs.show();
		}else {//추가 정보가 있으면(서버원)
			//액티브 스타트!
			atv.start();
		}
		break;



		//EditDetail: [FilledBlock]
		case EditType.WALL:
		//예외 처리
		if(editor.getPos1() === null || editor.getPos2() === null) {
			msg("warn_no_pos2", true, editor.getName());
			return;
		}
		workName = msg("wall");
		type = EditType.WALL;

		if(editDetail === undefined) {//추가 정보가 없으면(로컬)
			var bs = new we_blockSelect(msg("msg_select_block", false, null, [["w", msg("wall")]]), msg("start"), function(id, data) {
				//긍정 버튼을 누를때
				this.close();
				editDetail = [new Block(id, data)];
				//액티브 스타트!
				atv.start();
			}, msg("cancel"), function() {
				//부정 버튼을 누를때
				this.close();
			});
			bs.show();
		}else {//추가 정보가 있으면(서버원)
			//액티브 스타트!
			atv.start();
		}
		break;



		//EditDetail: [isHollow, FilledBlock, radious]
		case EditType.SPHERE:
		//예외 처리
		if(editor.getPos1() === null) {
			msg("warn_no_pos", true, editor.getName());
			return;
		}
		workName = msg("sphere");
		type = EditType.SPHERE;

		if(editDetail === undefined) {//추가 정보가 없으면(로컬)
			//bs(블럭 선택창)이 먼저 나타나고 dl(반지름 입력)이 나중에 나타납니다
			var bs = new we_blockSelect(msg("msg_select_block", false, null, [["w", msg("sphere")]]), msg("next"), function(id, data) {
				//긍정 버튼을 누를때
				this.close();
				editDetail = [main.get("HollowCircular") == 1, new Block(id, data)];
				dl.show();
			}, msg("cancel"), function() {
				//부정 버튼을 누를때
				this.close();
			});

			var np = new NumberPicker(ctx);
			np.setMinValue(0x01);
			np.setMaxValue(0x100);
			var np_p = new sg.rlp(sg.px*0x100, sg.wc);
			np.setLayoutParams(np_p);
			var dl = new we_dialog(msg("msg_type_radi"), np, msg("start"), function() {
				this.close();
				editDetail[2] = parseInt(np.getValue());
				//액티브 스타트!
				atv.start();
			}, msg("cancel"), function() {
				this.close();
			}, Gravity.CENTER, true);

			bs.show();
		}else {//추가 정보가 있으면(서버원)
			//액티브 스타트!
			atv.start();
		}
		break;



		//EditDetail: [isHollow, FilledBlock, radious, direction]
		case EditType.HEMI_SPHERE:
		//예외 처리
		if(editor.getPos1() === null) {
			msg("warn_no_pos1", true, editor.getName());
			return;
		}
		workName = msg("hemi_sphere");
		type = EditType.HEMI_SPHERE;

		if(editDetail === undefined) {//추가 정보가 없으면(로컬)
			//bs(블럭 선택창)이 먼저 나타나고 dl(반지름 선택)이 그 다음 dl2(방향 선택)이 마지막입니다
			var bs = new we_blockSelect(msg("msg_select_block", false, null, [["w", msg("hemi_sphere")]]), msg("next"), function(id, data) {
				//긍정 버튼을 누를때
				this.close();
				editDetail = [main.get("HollowCircular") == 1, new Block(id, data)];
				//반지름 선택창을 띄우기
				dl.show();
			}, msg("cancel"), function() {
				//부정 버튼을 누를때
				this.close();
			});

			var np = new NumberPicker(ctx);
			np.setMinValue(0x01);
			np.setMaxValue(0x100);
			var np_p = new sg.rlp(sg.px*0x100, sg.wc);
			np.setLayoutParams(np_p);
			var dl = new we_dialog(msg("msg_type_radi"), np, msg("next"), function() {
				this.close();
				editDetail[2] = parseInt(np.getValue());
				//방향 선택창 띄우기
				dl2.show();
			}, msg("cancel"), function() {
				this.close();
			}, Gravity.CENTER, true);

			var sv = new ScrollView(ctx);
			var lo = new sg.ll(ctx);
			lo.setOrientation(sg.ll.VERTICAL);
			var b1 =  new sgUtils.gui.mcFastButton("X+", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[3] = "x+";
				we_toast(msg("msg_direction", false, null, [["d", "X+"]]));
				dl2.close();
				//액티브 스타트!
				atv.start();
			});
			b1.setBackgroundColor(Color.WHITE);
			var b2 =  new sgUtils.gui.mcFastButton("X-", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[3] = "x-";
				we_toast(msg("msg_direction", false, null, [["d", "X-"]]));
				dl2.close();
				//액티브 스타트!
				atv.start();
			});
			b2.setBackgroundColor(Color.WHITE);
			var b3 =  new sgUtils.gui.mcFastButton("Y+", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[3] = "y+";
				we_toast(msg("msg_direction", false, null, [["d", "Y+"]]));
				dl2.close();
				//액티브 스타트!
				atv.start();
			});
			b3.setBackgroundColor(Color.WHITE);
			var b4 =  new sgUtils.gui.mcFastButton("Y-", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[3] = "y-";
				we_toast(msg("msg_direction", false, null, [["d", "Y-"]]));
				dl2.close();
				//액티브 스타트!
				atv.start();
			});
			b4.setBackgroundColor(Color.WHITE);
			var b5 =  new sgUtils.gui.mcFastButton("Z+", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[3] = "z+";
				we_toast(msg("msg_direction", false, null, [["d", "Z+"]]));
				dl2.close();
				//액티브 스타트!
				atv.start();
			});
			b5.setBackgroundColor(Color.WHITE);
			var b6 =  new sgUtils.gui.mcFastButton("Z-", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[3] = "z-";
				we_toast(msg("msg_direction", false, null, [["d", "Z-"]]));
				dl2.close();
				//으아아 붙여넣기
				atv.start();
			});
			b6.setBackgroundColor(Color.WHITE);
			lo.addView(b1);
			lo.addView(b2);
			lo.addView(b3);
			lo.addView(b4);
			lo.addView(b5);
			lo.addView(b6);
			sv.addView(lo);
			var dl2 = new we_dialog(msg("msg_select_direction"), sv, null, null, msg("cancel"), function() {this.close()}, Gravity.CENTER, true);

			bs.show();
		}else {//추가 정보가 있으면(서버원)
			//액티브 스타트!
			atv.start();
		}
		break;



		//EditDetail: [isHollow, FilledBlock, radious, direction]
		case EditType.CIRCLE:
		//예외 처리
		if(editor.getPos1() === null) {
			msg("msg_no_pos1", true, editor.getName());
			return;
		}
		workName = msg("circle");
		type = EditType.CIRCLE;

		if(editDetail === undefined) {//추가 정보가 없으면(로컬)
			//bs(블럭 선택창)이 먼저 dl(반지름 선택창)이 다음 dl3(축 선택창)이 마지막입니다
			var bs = new we_blockSelect(msg("msg_select_block", false, null, [["w", msg("circle")]]), msg("next"), function(id, data) {
				//긍정 버튼을 누를때
				this.close();
				editDetail = [main.get("HollowCircular") == 1, new Block(id, data)];
				dl.show();
			}, msg("cancel"), function() {
				//부정 버튼을 누를때
				this.close();
			});

			var np = new NumberPicker(ctx);
			np.setMinValue(0x01);
			np.setMaxValue(0x100);
			var np_p = new sg.rlp(sg.px*0x100, sg.wc);
			np.setLayoutParams(np_p);
			var dl = new we_dialog(msg("msg_select_radi"), np, msg("start"), function() {
				this.close();
				editDetail[2] = parseInt(np.getValue());
				//축 선택창 띄우기
				dl3.show();
			}, msg("cancel"), function() {
				this.close();
			}, Gravity.CENTER, true);

			var sv2 = new ScrollView(ctx);
			var lo2 = new sg.ll(ctx);
			lo2.setOrientation(sg.ll.VERTICAL);
			var b7 =  new sgUtils.gui.mcFastButton("X", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[3] = "x";
				we_toast(msg("msg_axis", false, null, [["a", "X"]]));
				dl3.close();
				//액티브 스타트!
				atv.start();
			});
			b7.setBackgroundColor(Color.WHITE);
			var b8 =  new sgUtils.gui.mcFastButton("Y", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[3] = "y";
				we_toast(msg("msg_axis", false, null, [["a", "Y"]]));
				dl3.close();
				//액티브 스타트!
				atv.start();
			});
			b8.setBackgroundColor(Color.WHITE);
			var b9 =  new sgUtils.gui.mcFastButton("Z", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[3] = "z";
				we_toast(msg("msg_axis", false, null, [["a", "Z"]]));
				dl3.close();
				//액티브 스타트!
				atv.start();
			});
			b9.setBackgroundColor(Color.WHITE);
			lo2.addView(b7);
			lo2.addView(b8);
			lo2.addView(b9);
			sv2.addView(lo2);
			var dl3 =  new we_dialog(msg("msg_select_axis"), sv2, null, null, msg("cancel"), function() {this.close()}, Gravity.CENTER, true);

			bs.show();
		}else {//추가 정보가 있으면(서버원)
			//액티브 스타트!
			atv.start();
		}
		break;


		//EditDetail: [isHollow, FilledBlock, radious, axis, direction]
		case EditType.SEMI_CIRCLE:
		//예외 처리
		if(editor.getPos1() === null) {
			msg(msg("msg_no_pos1"), true, editor.getName());
			return;
		}
		workName = msg("semi_circle");
		type = EditType.SEMI_CIRCLE;

		if(editDetail === undefined) {//추가 정보가 없으면(로컬)
			//bs(블럭 선택창)이 먼저 dl(반지름 선택창)이 다음은 dl3(축 선택창)이 다음은 dl2(방향 선택창)이 마지막입니다
			var bs = new we_blockSelect(msg("msg_select_block", false, null, [["w", msg("semi_circle")]]), msg("next"), function(id, data) {
				//긍정 버튼을 누를때
				this.close();
				editDetail = [main.get("HollowCircular") == 1, new Block(id, data)];
				dl.show();
			}, msg("cancel"), function() {
				//부정 버튼을 누를때
				this.close();
			});

			var np = new NumberPicker(ctx);
			np.setMinValue(0x01);
			np.setMaxValue(0x100);
			var np_p = new sg.rlp(sg.px*0x100, sg.wc);
			np.setLayoutParams(np_p);
			var dl = new we_dialog(msg("msg_select_radi"), np, msg("next"), function() {
				this.close();
				editDetail[2] = parseInt(np.getValue());
				//축 선택창 띄우기
				dl3.show();
			}, msg("cancel"), function() {
				this.close();
			}, Gravity.CENTER, true);

			var sv2 = new ScrollView(ctx);
			var lo2 = new sg.ll(ctx);
			lo2.setOrientation(sg.ll.VERTICAL);
			var b7 =  new sgUtils.gui.mcFastButton("X", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[3] = "x";
				we_toast(msg("msg_axis", false, null, [["a", "X"]]));
				dl3.close();
				lo.addView(b3);
				lo.addView(b4);
				lo.addView(b5);
				lo.addView(b6);
				//방향 선택창 보이기
				dl2.show();
			});
			b7.setBackgroundColor(Color.WHITE);
			var b8 =  new sgUtils.gui.mcFastButton("Y", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[3] = "y";
				we_toast(msg("msg_axis", false, null, [["a", "Y"]]));
				dl3.close();
				lo.addView(b1);
				lo.addView(b2);
				lo.addView(b5);
				lo.addView(b6);
				//방향 선택창 보이기
				dl2.show();
			});
			b8.setBackgroundColor(Color.WHITE);
			var b9 =  new sgUtils.gui.mcFastButton("Z", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[3] = "z";
				we_toast(msg("msg_axis", false, null, [["a", "Z"]]));
				dl3.close();
				lo.addView(b1);
				lo.addView(b2);
				lo.addView(b3);
				lo.addView(b4);
				//방향 선택창 보이기
				dl2.show();
			});
			b9.setBackgroundColor(Color.WHITE);
			lo2.addView(b7);
			lo2.addView(b8);
			lo2.addView(b9);
			sv2.addView(lo2);
			var dl3 =  new we_dialog(msg("msg_select_axis"), sv2, null, null, msg("cancel"), function() {this.close()}, Gravity.CENTER, true);

			var sv = new ScrollView(ctx);
			var lo = new sg.ll(ctx);
			lo.setOrientation(sg.ll.VERTICAL);
			var b1 =  new sgUtils.gui.mcFastButton("X+", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[4] = "x+";
				we_toast(msg("msg_direction", false, null, [["d", "X+"]]));
				dl2.close();
				//액티브 스타트!
				atv.start();
			});
			b1.setBackgroundColor(Color.WHITE);
			var b2 =  new sgUtils.gui.mcFastButton("X-", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[4] = "x-";
				we_toast(msg("msg_direction", false, null, [["d", "X-"]]));
				dl2.close();
				//액티브 스타트!
				atv.start();
			});
			b2.setBackgroundColor(Color.WHITE);
			var b3 =  new sgUtils.gui.mcFastButton("Y+", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[4] = "y+";
				we_toast(msg("msg_direction", false, null, [["d", "Y+"]]));
				dl2.close();
				//액티브 스타트!
				atv.start();
			});
			b3.setBackgroundColor(Color.WHITE);
			var b4 =  new sgUtils.gui.mcFastButton("Y-", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[4] = "y-";
				we_toast(msg("msg_direction", false, null, [["d", "Y-"]]));
				dl2.close();
				//액티브 스타트!
				atv.start();
			});
			b4.setBackgroundColor(Color.WHITE);
			var b5 =  new sgUtils.gui.mcFastButton("Z+", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[4] = "z+";
				we_toast(msg("msg_direction", false, null, [["d", "Z+"]]));
				dl2.close();
				//액티브 스타트!
				atv.start();
			});
			b5.setBackgroundColor(Color.WHITE);
			var b6 =  new sgUtils.gui.mcFastButton("Z-", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[4] = "z-";
				we_toast(msg("msg_direction", false, null, [["d", "Z-"]]));
				dl2.close();
				//으아아 붙여넣기
				atv.start();
			});
			b6.setBackgroundColor(Color.WHITE);
			sv.addView(lo);
			var dl2 = new we_dialog(msg("msg_select_direction"), sv, null, null, msg("cancel"), function() {this.close()}, Gravity.CENTER, true);

			bs.show();
		}else {//추가 정보가 있으면(서버원)
			//액티브 스타트!
			atv.start();
		}
		break;



		//EditDetail: []
		case EditType.COPY:
		//예외 처리
		if(editor.getPos1() === null || editor.getPos2() === null) {
			msg("warn_no_pos2", true, editor.getName());
			return;
		}
		workName = msg("copy");
		type = EditType.COPY;
		//복사만 할때는 백업을 하지 않습니다
		safeMode = 0;

		//액티브 스타트!
		atv.start();
		break;



		//EditDetail: []
		case EditType.CUT:
		//예외 처리
		if(editor.getPos1() === null || editor.getPos2() === null) {
			msg("warn_no_pos2", true, editor.getName());
			return;
		}
		workName = msg("cut");
		type = EditType.CUT;

		//액티브 스타트!
		atv.start();
		break;



		//EditDetail: []
		case EditType.PASTE:
		//예외 처리
		if(editor.getPos1() === null) {
			msg("warn_no_pos1", true, editor.getName());
			return;
		}
		//예외 처리
		if(editor.getCopy() === null) {
			msg("warn_no_copy", true, editor.getName());
			return;
		}
		workName = msg("paste");
		type = EditType.PASTE;
		//붙여넣기 영역 홀로그램
		var pos = editor.getPos1();
		var cp = editor.getCopy();
		var holo = areaHighlight(pos.getX(), pos.getY(), pos.getZ(), pos.getX()+cp.getSizeX()-1, pos.getY()+cp.getSizeY()-1, pos.getZ()+cp.getSizeZ()-1);
		//로컬? 서버원?
		if(editor.getName().toLowerCase() === (Player.getName(Player.getEntity())+"").toLowerCase()) {
			var tv = sgUtils.gui.mcFastText(msg("warn_paste"), sg.px*0x10, false, Color.WHITE, null, null, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4]);
			tv.setGravity(Gravity.CENTER);
			var dl = new we_dialog(msg("warning"), tv, msg("start"), function() {
				this.close();
				holo.close();
				//액티브 스타트!
				atv.start();
			}, msg("cancel"), function() {
				this.close();
				holo.close();
			}, Gravity.TOP, false);
			dl.show();
		}else {
			msg("warn_paste", true, editor.getName());
			msg("msg_command_queue_info", true, editor.getName());
			sgUtils.data.commandQueue[editor.getName().toLowerCase()] = function(bool) {
				if(bool) {
					holo.close();
					msg("msg_request", true, editor.getName(), [["w", msg("paste")]]);
					//액티브 스타트!
					atv.start();
				}else {
					holo.close();
					msg("msg_cancel", true, editor.getName(), [["w", msg("paste")]]);
				}
			}
		}


		break;



		//EditDetail: [axis]
		case EditType.FLIP:
		//예외 처리
		if(editor.getCopy() === null) {
			msg("msg_no_copy", true, editor.getName());
			return;
		}
		workName = msg("flip");
		type = EditType.FLIP;

		if(editDetail === undefined) {//추가 정보가 없으면(로컬)
			//dl3(축 선택창)이 유일
			var sv2 = new ScrollView(ctx);
			var lo2 = new sg.ll(ctx);
			lo2.setOrientation(sg.ll.VERTICAL);
			var b7 =  new sgUtils.gui.mcFastButton("X", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail = ["x"];
				we_toast(msg("msg_axis", false, null, [["a", "X"]]));
				dl3.close();
				//액티브 스타트!
				uatv.start();
			});
			b7.setBackgroundColor(Color.WHITE);
			var b8 =  new sgUtils.gui.mcFastButton("Y", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail = ["y"];
				we_toast(msg("msg_axis", false, null, [["a", "Y"]]));
				dl3.close();
				//액티브 스타트!
				uatv.start();
			});
			b8.setBackgroundColor(Color.WHITE);
			var b9 =  new sgUtils.gui.mcFastButton("Z", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail = ["z"];
				we_toast(msg("msg_axis", false, null, [["a", "Z"]]));
				dl3.close();
				//액티브 스타트!
				uatv.start();
			});
			b9.setBackgroundColor(Color.WHITE);
			lo2.addView(b7);
			lo2.addView(b8);
			lo2.addView(b9);
			sv2.addView(lo2);
			var dl3 =  new we_dialog(msg("msg_select_axis"), sv2, null, null, msg("cancel"), function() {this.close()}, Gravity.CENTER, true);

			dl3.show();
		}else {//추가 정보가 있으면(서버원)
			//액티브 스타트!
			uatv.start();
		}
		break;



		//EditDetail: [axis, degree]
		case EditType.ROTATION:
		//예외 처리
		if(editor.getCopy() === null) {
			msg("msg_no_copy", true, editor.getName());
			return;
		}
		workName = msg("rotation");
		type = EditType.ROTATION;

		if(editDetail === undefined) {//추가 정보가 없으면(로컬)
			//dl3(축 선택창)이 다음은 dl2(방향 선택창)이 마지막입니다
			var sv2 = new ScrollView(ctx);
			var lo2 = new sg.ll(ctx);
			lo2.setOrientation(sg.ll.VERTICAL);
			var b7 =  new sgUtils.gui.mcFastButton("X", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail = ["x"];
				we_toast(msg("msg_axis", false, null, [["a", "X"]]));
				dl3.close();
				//방향 선택창 보이기
				dl2.show();
			});
			b7.setBackgroundColor(Color.WHITE);
			var b8 =  new sgUtils.gui.mcFastButton("Y", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail = ["y"];
				we_toast(msg("msg_axis", false, null, [["a", "Y"]]));
				dl3.close();
				//방향 선택창 보이기
				dl2.show();
			});
			b8.setBackgroundColor(Color.WHITE);
			var b9 =  new sgUtils.gui.mcFastButton("Z", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail = ["z"];
				we_toast(msg("msg_axis", false, null, [["a", "Z"]]));
				dl3.close();
				//방향 선택창 보이기
				dl2.show();
			});
			b9.setBackgroundColor(Color.WHITE);
			lo2.addView(b7);
			lo2.addView(b8);
			lo2.addView(b9);
			sv2.addView(lo2);
			var dl3 =  new we_dialog(msg("msg_select_axis"), sv2, null, null, msg("cancel"), function() {this.close()}, Gravity.CENTER, true);

			var sv = new ScrollView(ctx);
			var lo = new sg.ll(ctx);
			lo.setOrientation(sg.ll.VERTICAL);
			var b1 =  new sgUtils.gui.mcFastButton("90", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[1] = 1;
				we_toast(msg("msg_rotation", false, null, [["d", "90"]]));
				dl2.close();
				//액티브 스타트!
				uatv.start();
			});
			b1.setBackgroundColor(Color.WHITE);
			var b2 =  new sgUtils.gui.mcFastButton("180", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[1] = 2;
				we_toast(msg("msg_rotation", false, null, [["d", "180"]]));
				dl2.close();
				//액티브 스타트!
				uatv.start();
			});
			b2.setBackgroundColor(Color.WHITE);
			var b3 =  new sgUtils.gui.mcFastButton("270", null, false, sgColors.main, null, sg.px*0x100, sg.px*0x30, null, [sg.px*4, sg.px*4, sg.px*4, sg.px*4], null, null, function(view) {
				editDetail[1] = 3;
				we_toast(msg("msg_rotation", false, null, [["d", "270"]]));
				dl2.close();
				//액티브 스타트!
				uatv.start();
			});
			b3.setBackgroundColor(Color.WHITE);
			lo.addView(b1);
			lo.addView(b2);
			lo.addView(b3);
			sv.addView(lo);
			var dl2 = new we_dialog(msg("msg_select_rotation"), sv, null, null, msg("cancel"), function() {this.close()}, Gravity.CENTER, true);

			dl3.show();
		}else {//추가 정보가 있으면(서버원)
			//액티브 스타트!
			uatv.start();
		}
		break;



		//EditDetail: []
		//정상적인 방법으로는 호출될 일 없음 (다른 에딧 작업하면서 자동으로 작업됨)
		case EditType.BACKUP:
		//누군가 잉여력 넘치는 방법으로 호출했다면 작동해주는게 인지상정(테스트 안해봐서 안될지도?)
		//예외 처리
		if(editor.getPos1() === null || editor.getPos2() === null) {
			msg("warn_no_pos1", true, editor.getName());
			return;
		}
		workName = msg("unknown") + " " + msg("backup");
		type = EditType.BACKUP;

		//액티브 스타트!
		atv.start();
		break;



		//EditDetail: []
		case EditType.RESTORE:
		//예외 처리
		if(editor.getBackup() === null) {
			msg("warn_no_backup", true, editor.getName());
			return;
		}
		workName = msg("restore");
		type = EditType.RESTORE;

		//액티브 스타트!
		atv.start();
		break;
	}
}

//we_initEdit에서 예외처리, GUI작업을 진행
//we_edit에서 블럭 분석, 요청작업을 진행
function we_edit(editType, editor, detail) {
	var that = this;
	sgUtils.data.isProcessing = true;
	var blocks = null;

	switch(editType) {

		//EditDetail: [FilledBlock]
		case EditType.FILL:
		var pos1 = editor.getPos1();
		var pos2 = editor.getPos2();

		//더 작은 값을 시작값(s) 큰값을 끝값(e)으로 지정
		var sx = (pos1.getX() < pos2.getX()) ? pos1.getX() : pos2.getX();
		var sy = (pos1.getY() < pos2.getY()) ? pos1.getY() : pos2.getY();
		var sz = (pos1.getZ() < pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var ex = (pos1.getX() > pos2.getX()) ? pos1.getX() : pos2.getX();
		var ey = (pos1.getY() > pos2.getY()) ? pos1.getY() : pos2.getY();
		var ez = (pos1.getZ() > pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var max = (ex-sx+1)*(ey-sy+1)*(ez-sz+1);
		sgUtils.data.progress = [0, max];

		var bid = detail[0].getId();
		var bdata = detail[0].getData();
		blocks = [];
		for(var fy = sy; fy<= ey; fy++) {
			for(var fz = sz; fz <= ez; fz++) {
				for(var fx = sx; fx <= ex; fx++) {
					blocks.push([fx, fy, fz, bid, bdata]);
					sgUtils.data.progress[0]++;
				}
			}
		}
		break;



		//EditDetail: []
		case EditType.CLEAR:
		var pos1 = editor.getPos1();
		var pos2 = editor.getPos2();

		//더 작은 값을 시작값(s) 큰값을 끝값(e)으로 지정
		var sx = (pos1.getX() < pos2.getX()) ? pos1.getX() : pos2.getX();
		var sy = (pos1.getY() < pos2.getY()) ? pos1.getY() : pos2.getY();
		var sz = (pos1.getZ() < pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var ex = (pos1.getX() > pos2.getX()) ? pos1.getX() : pos2.getX();
		var ey = (pos1.getY() > pos2.getY()) ? pos1.getY() : pos2.getY();
		var ez = (pos1.getZ() > pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var max = (ex-sx+1)*(ey-sy+1)*(ez-sz+1);
		sgUtils.data.progress = [0, max];

		blocks = [];
		for(var fy = ey; fy >= sy; fy--) {
			for(var fz = sz; fz <= ez; fz++) {
				for(var fx = sx; fx <= ex; fx++) {
					blocks.push([fx, fy, fz, 0, 0]);
					sgUtils.data.progress[0]++;
				}
			}
		}
		break;



		//EditDetail: [fromReplaceBlock, toReplaceBlock]
		case EditType.REPLACE:
		var pos1 = editor.getPos1();
		var pos2 = editor.getPos2();

		//더 작은 값을 시작값(s) 큰값을 끝값(e)으로 지정
		var sx = (pos1.getX() < pos2.getX()) ? pos1.getX() : pos2.getX();
		var sy = (pos1.getY() < pos2.getY()) ? pos1.getY() : pos2.getY();
		var sz = (pos1.getZ() < pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var ex = (pos1.getX() > pos2.getX()) ? pos1.getX() : pos2.getX();
		var ey = (pos1.getY() > pos2.getY()) ? pos1.getY() : pos2.getY();
		var ez = (pos1.getZ() > pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var max = (ex-sx+1)*(ey-sy+1)*(ez-sz+1);
		sgUtils.data.progress = [0, max];

		var bid = detail[0].getId();
		var bdata = detail[0].getData();
		var bid2 = detail[1].getId();
		var bdata2 = detail[1].getData();
		blocks = [];
		for(var fy = sy; fy <= ey; fy++) {
			for(var fz = sz; fz <= ez; fz++) {
				for(var fx = sx; fx <= ex; fx++) {
					sgUtils.data.progress[0]++;
					if(Level.getTile(fx, fy, fz) !== bid || Level.getData(fx, fy, fz) !== bdata) {
						continue;
					}
					blocks.push([fx, fy, fz, bid2, bdata2]);
				}
			}
		}
		break;



		//EditDetail: [FilledBlock]
		case EditType.WALL:
		var pos1 = editor.getPos1();
		var pos2 = editor.getPos2();

		//더 작은 값을 시작값(s) 큰값을 끝값(e)으로 지정
		var sx = (pos1.getX() < pos2.getX()) ? pos1.getX() : pos2.getX();
		var sy = (pos1.getY() < pos2.getY()) ? pos1.getY() : pos2.getY();
		var sz = (pos1.getZ() < pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var ex = (pos1.getX() > pos2.getX()) ? pos1.getX() : pos2.getX();
		var ey = (pos1.getY() > pos2.getY()) ? pos1.getY() : pos2.getY();
		var ez = (pos1.getZ() > pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var max = ((ex-sx+1)*(ey-sy+1)*2) + ((ez-sz+1)*(ey-sy+1)*2);
		sgUtils.data.progress = [0, max];

		var bid = detail[0].getId();
		var bdata = detail[0].getData();
		blocks = [];
		for(var fy = sy; fy <= ey; fy++) {
			for(var fz = sz; fz <= ez; fz += (ez-sz)) {
				for(var fx = sx; fx <= ex; fx++) {
					blocks.push([fx, fy, fz, bid, bdata]);
					sgUtils.data.progress[0]++;
				}
			}
			for(var fx = sx; fx <= ex; fx += (ex-sx)) {
				for(var fz = sz; fz <= ez; fz++) {
					blocks.push([fx, fy, fz, bid, bdata]);
					sgUtils.data.progress[0]++;
				}
			}
		}
		break;



		//EditDetail: [isHollow, FilledBlock, radious]
		case EditType.SPHERE:
		var pos1 = editor.getPos1();

		//반지름 사이즈에 맞게 크기를 재설정
		var cx = pos1.getX();
		var cy = pos1.getY();
		var cz = pos1.getZ();
		var rel = detail[2]-1;
		var max = Math.pow((rel*2)+1, 3);
		sgUtils.data.progress = [0, max];

		var bid = detail[1].getId();
		var bdata = detail[1].getData();
		blocks = [];
		for(var fy = -rel; fy <= rel; fy++) {
			for(var fz = -rel; fz <= rel; fz++) {
				for(var fx = -rel; fx <= +rel; fx++) {
					sgUtils.data.progress[0]++;
					if(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) < Math.pow((detail[2]-0.5), 2)) {
						//속이 빈 원 옵션 체크
						if(detail[0] && !(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) >= (Math.pow((detail[2]-1.5), 2)))) {
							continue;
						}
						blocks.push([cx + fx, cy + fy, cz + fz, bid, bdata]);
					}
				}
			}
		}
		break;



		//EditDetail: [isHollow, FilledBlock, radious, direction]
		case EditType.HEMI_SPHERE:
		var pos1 = editor.getPos1();

		//반지름 사이즈에 맞게 크기를 재설정
		var cx = pos1.getX();
		var cy = pos1.getY();
		var cz = pos1.getZ();
		var rel = detail[2]-1;
		var max = Math.pow((rel*2)+1, 3);
		sgUtils.data.progress = [0, max];

		//방향 (속도 향상을 위해 문자열을 숫자로 전환)
		var dire;
		switch(detail[3]) {
			case "x+":
			dire = 0;
			break;
			case "x-":
			dire = 1;
			break;
			case "y+":
			dire = 2;
			break;
			case "y-":
			dire = 3;
			break;
			case "z+":
			dire = 4;
			break;
			case "z-":
			dire = 5;
			break;
			default://예외 처리 했을탠데...
			throw new Error("Unknown direction type: " + detail[3]);
		}

		var bid = detail[1].getId();
		var bdata = detail[1].getData();
		blocks = [];
		for(var fy = -rel; fy <= rel; fy++) {
			for(var fz = -rel; fz <= rel; fz++) {
				for(var fx = -rel; fx <= rel; fx++) {
					sgUtils.data.progress[0]++;
					switch(dire) {
						case 0:
						if(fx < 0) continue;
						break;
						case 1:
						if(fx > 0) continue;
						break;
						case 2:
						if(fy < 0) continue;
						break;
						case 3:
						if(fy > 0) continue;
						break;
						case 4:
						if(fz < 0) continue;
						break;
						case 5:
						if(fz > 0) continue;
						break;
					}
					if(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) < Math.pow((detail[2]-0.5), 2)) {
						//속이 빈 원 옵션 체크
						if(detail[0] && !(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) >= (Math.pow((detail[2]-1.5), 2)))) {
							continue;
						}
						blocks.push([cx + fx, cy + fy, cz + fz, bid, bdata]);
					}
				}
			}
		}
		break;



		//EditDetail: [isHollow, FilledBlock, radious, axis]
		case EditType.CIRCLE:
		var pos1 = editor.getPos1();

		//반지름 사이즈에 맞게 크기를 재설정
		var cx = pos1.getX();
		var cy = pos1.getY();
		var cz = pos1.getZ();
		var rel = detail[2]-1;
		var max = Math.pow((rel*2)+1, 2);
		sgUtils.data.progress = [0, max];

		var bid = detail[1].getId();
		var bdata = detail[1].getData();
		blocks = [];
		//원을 그릴 기준이 될 축
		switch(detail[3]) {
			case "x":
			var fx = 0;
			for(var fy = -rel; fy <= rel; fy++) {
				for(var fz = -rel; fz <= rel; fz++) {
					sgUtils.data.progress[0]++;
					if(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) < Math.pow((detail[2]-0.5), 2)) {
						//속이 빈 원 옵션 체크
						if(detail[0] && !(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) >= (Math.pow((detail[2]-1.5), 2)))) {
							continue;
						}
						blocks.push([cx + fx, cy + fy, cz + fz, bid, bdata]);
					}
				}
			}
			break;
			case "y":
			var fy = 0;
			for(var fx = -rel; fx <= rel; fx++) {
				for(var fz = -rel; fz <= rel; fz++) {
					sgUtils.data.progress[0]++;
					if(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) < Math.pow((detail[2]-0.5), 2)) {
						//속이 빈 원 옵션 체크
						if(detail[0] && !(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) >= (Math.pow((detail[2]-1.5), 2)))) {
							continue;
						}
						blocks.push([cx + fx, cy + fy, cz + fz, bid, bdata]);
					}
				}
			}
			break;
			case "z":
			var fz = 0;
			for(var fx = -rel; fx <= rel; fx++) {
				for(var fy = -rel; fy <= rel; fy++) {
					sgUtils.data.progress[0]++;
					if(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) < Math.pow((detail[2]-0.5), 2)) {
						//속이 빈 원 옵션 체크
						if(detail[0] && !(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) >= (Math.pow((detail[2]-1.5), 2)))) {
							continue;
						}
						blocks.push([cx + fx, cy + fy, cz + fz, bid, bdata]);
					}
				}
			}
			break;
			default:
			throw new Error("Unknown edit-circle-axis type: " + detail[3]);
		}
		break;


		//EditDetail: [isHollow, FilledBlock, radious, axis, direction]
		case EditType.SEMI_CIRCLE:
		var pos1 = editor.getPos1();

		//반지름 사이즈에 맞게 크기를 재설정
		var cx = pos1.getX();
		var cy = pos1.getY();
		var cz = pos1.getZ();
		var rel = detail[2]-1;
		var max = Math.pow((rel*2)+1, 2);
		sgUtils.data.progress = [0, max];

		//원을 그릴 방향 (속도 향상을 위해 문자열을 숫자로 전환)
		var dire;
		switch(detail[4]) {
			case "x+":
			dire = 0;
			break;
			case "x-":
			dire = 1;
			break;
			case "y+":
			dire = 2;
			break;
			case "y-":
			dire = 3;
			break;
			case "z+":
			dire = 4;
			break;
			case "z-":
			dire = 5;
			break;
			default://예외 처리 했을탠데...
			throw new Error("Unknown edit-semiCircle-direction type: " + detail[4]);
		}

		var bid = detail[1].getId();
		var bdata = detail[1].getData();
		blocks = [];
		//원을 그릴 기준이 될 축
		switch(detail[3]) {
			case "x":
			var fx = 0;
			for(var fy = -rel; fy <= rel; fy++) {
				for(var fz = -rel; fz <= rel; fz++) {
					sgUtils.data.progress[0]++;
					//원을 그릴 축에서의 반원의 방향
					switch(dire) {
						case 2://y+
						if(fy < 0) continue;
						break;
						case 3://y-
						if(fy > 0) continue;
						break;
						case 4://z+
						if(fz < 0) continue;
						break;
						case 5://z-
						if(fz > 0) continue;
						break;
					}
					if(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) < Math.pow((detail[2]-0.5), 2)) {
						//속이 빈 원 옵션 체크
						if(detail[0] && !(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) >= (Math.pow((detail[2]-1.5), 2)))) {
							continue;
						}
						blocks.push([cx + fx, cy + fy, cz + fz, bid, bdata]);
					}
				}
			}
			break;
			case "y":
			var fy = 0;
			for(var fx = -rel; fx <= rel; fx++) {
				for(var fz = -rel; fz <= rel; fz++) {
					sgUtils.data.progress[0]++;
					//원을 그릴 축에서의 반원의 방향
					switch(dire) {
						case 0://x+
						if(fx < 0) continue;
						break;
						case 1://x-
						if(fx > 0) continue;
						break;
						case 4://z+
						if(fz < 0) continue;
						break;
						case 5://z-
						if(fz > 0) continue;
						break;
					}
					if(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) < Math.pow((detail[2]-0.5), 2)) {
						//속이 빈 원 옵션 체크
						if(detail[0] && !(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) >= (Math.pow((detail[2]-1.5), 2)))) {
							continue;
						}
						blocks.push([cx + fx, cy + fy, cz + fz, bid, bdata]);
					}
				}
			}
			break;
			case "z":
			var fz = 0;
			for(var fx = -rel; fx <= rel; fx++) {
				for(var fy = -rel; fy <= rel; fy++) {
					sgUtils.data.progress[0]++;
					//원을 그릴 축에서의 반원의 방향
					switch(dire) {
						case 0://x+
						if(fx < 0) continue;
						break;
						case 1://x-
						if(fx > 0) continue;
						break;
						case 2://z+
						if(fy < 0) continue;
						break;
						case 3://z-
						if(fy > 0) continue;
						break;
					}
					if(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) < Math.pow((detail[2]-0.5), 2)) {
						//속이 빈 원 옵션 체크
						if(detail[0] && !(Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2) >= (Math.pow((detail[2]-1.5), 2)))) {
							continue;
						}
						blocks.push([cx + fx, cy + fy, cz + fz, bid, bdata]);
					}
				}
			}
			break;
			default:
			throw new Error("Unknown edit-semiCircle-aixs type: " + detail[3]);
		}
		break;



		//EditDetail: []
		case EditType.COPY:
		var pos1 = editor.getPos1();
		var pos2 = editor.getPos2();

		//더 작은 값을 시작값(s) 큰값을 끝값(e)으로 지정
		var sx = (pos1.getX() < pos2.getX()) ? pos1.getX() : pos2.getX();
		var sy = (pos1.getY() < pos2.getY()) ? pos1.getY() : pos2.getY();
		var sz = (pos1.getZ() < pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var ex = (pos1.getX() > pos2.getX()) ? pos1.getX() : pos2.getX();
		var ey = (pos1.getY() > pos2.getY()) ? pos1.getY() : pos2.getY();
		var ez = (pos1.getZ() > pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var max = (ex-sx+1)*(ey-sy+1)*(ez-sz+1);
		sgUtils.data.progress = [0, max];

		var sblocks = [];
		for(var cz = sz; cz <= ez; cz++) {
			for(var cy = sy; cy <= ey; cy++) {
				for(var cx = sx; cx <= ex; cx++) {
					sblocks.push(new Block(Level.getTile(cx, cy, cz), Level.getData(cx, cy, cz)));
					sgUtils.data.progress[0]++;
				}
			}
		}
		editor.setCopy(new Piece(ex-sx+1, ey-sy+1, ez-sz+1, sblocks));
		break;



		//EditDetail: []
		case EditType.CUT:
		var pos1 = editor.getPos1();
		var pos2 = editor.getPos2();

		//더 작은 값을 시작값(s) 큰값을 끝값(e)으로 지정
		var sx = (pos1.getX() < pos2.getX()) ? pos1.getX() : pos2.getX();
		var sy = (pos1.getY() < pos2.getY()) ? pos1.getY() : pos2.getY();
		var sz = (pos1.getZ() < pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var ex = (pos1.getX() > pos2.getX()) ? pos1.getX() : pos2.getX();
		var ey = (pos1.getY() > pos2.getY()) ? pos1.getY() : pos2.getY();
		var ez = (pos1.getZ() > pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var max = (ex-sx+1)*(ey-sy+1)*(ez-sz+1);
		sgUtils.data.progress = [0, max];

		var sblocks = [];
		blocks = [];
		for(var cz = sz; cz <= ez; cz++) {
			for(var cy = sy; cy <= ey; cy++) {
				for(var cx = sx; cx <= ex; cx++) {
					sblocks.push(new Block(Level.getTile(cx, cy, cz), Level.getData(cx, cy, cz)));
					blocks.push([cx, cy, cz, 0, 0]);
					sgUtils.data.progress[0]++;
				}
			}
		}
		editor.setCopy(new Piece(ex-sx+1, ey-sy+1, ez-sz+1, sblocks));
		break;



		//EditDetail: []
		case EditType.PASTE:
		var pos1 = editor.getPos1();

		var sx = pos1.getX()
		var sy = pos1.getY();
		var sz = pos1.getZ();

		//조각 정보
		var piece =  editor.getCopy();
		var px = piece.getSizeX();
		var py = piece.getSizeY();
		var pz = piece.getSizeZ();

		blocks = [];
		for(var ry = 0; ry < py; ry++) {
			for(var rz = 0; rz < pz; rz++) {
				for(var rx = 0; rx < px; rx++) {
					var block = piece.getBlock(rx, ry, rz);
					blocks.push([sx+rx, sy+ry, sz+rz, block.getId(), block.getData()]);
				}
			}
		}
		break;



		//EditDetail: [axis]
		case EditType.FLIP:
		var piece = editor.getCopy();
		//뒤집기 요청
		piece.flip(detail[0]);
		break;



		//EditDetail: [axis, degree]
		case EditType.ROTATION:
		var piece = editor.getCopy();
		//뒤집기 요청
		piece.rotation(detail[0], detail[1]);
		break;



		//EditDetail: []
		case EditType.BACKUP:
		var tempData = editor.getTempBlocks();

		var max = tempData.length;
		sgUtils.data.progress = [0, max];

		blocks = [];
		for(var e = 0; e < max; e++) {
			blocks.push([tempData[e][0], tempData[e][1], tempData[e][2], Level.getTile(tempData[e][0], tempData[e][1], tempData[e][2]), Level.getData(tempData[e][0], tempData[e][1], tempData[e][2])]);
			sgUtils.data.progress[0]++;
		}
		//백업할 조각이랑 위치정보를 저장
		editor.setBackup(blocks);
		break;



		//EditDetail: []
		case EditType.RESTORE:
		//백업된 조각 불러오기
		var backupData = editor.getBackup();

		var max = backupData.length;
		sgUtils.data.progress = [0, max];

		//복원할 블럭 등록 시작
		blocks = [];
		for(var e = 0; e < max; e++) {
			blocks.push([backupData[e][0], backupData[e][1], backupData[e][2], backupData[e][3], backupData[e][4]]);
			sgUtils.data.progress[0]++;
		}
		break;



		default:
		throw new Error("Unknown EditType");
	}
	sgUtils.data.isProcessing = false;
	return blocks;
}


//잡일 처리를 gui로 하기위한 틀
function we_dialog(title, layout, confirmText, confirmFunc, cancelTxt, cancelFunc, gravity, focus) {
	var that = this;
	this.name = title;
	this.cfText = confirmText;
	this.ccText = cancelTxt;
	this.cfFunc = confirmFunc;//버튼을 누를때 창을 닫기 위해 'this.close()' 호출 필수
	this.ccFunc = cancelFunc;

	this.nativeLayout = layout;
	this.wd = null;
	this.layoutData = null;
	this.gravity = gravity;
	this.focus = focus;
}

we_dialog.prototype = {

		toString: function() {
			return "[object we_dialog(" + this.name + ")]";
		},

		build: function() {
			var that = this;
			//main Layout
			var rl = new sg.rl(ctx);
			rl.setBackgroundDrawable(sgAssets.toast.ninePatch());

			//title Part
			var title = new sg.rl(ctx);
			title.setId(sgUtils.math.randomId());
			var title_p = new sg.rlp(sg.mp, sg.px*0x30);
			title_p.addRule(sg.rl.ALIGN_PARENT_TOP);
			title.setLayoutParams(title_p);
			title.setBackgroundColor(sgColors.main);
			var t_text = sgUtils.gui.mcFastText(this.name, sg.px*0x10, false, Color.WHITE, null, null, null, [sg.px*2, sg.px*2, sg.px*2, sg.px*2]);
			var t_text_p = new sg.rlp(sg.wc, sg.wc);
			t_text_p.addRule(sg.rl.CENTER_IN_PARENT);
			t_text.setLayoutParams(t_text_p);
			title.addView(t_text);
			//confirm
			var cf = null;
			//cancel
			var cc = null;
			//confirm Button
			if(this.cfText !== null) {
				cf = sgUtils.gui.mcFastButton(this.cfText, sg.px*0xa, false, sgColors.main, null, null, null, [sg.px*8, sg.px*8, sg.px*8, sg.px*8], null, null, null, function(view) {
					that.cfFunc();
				});
				var cf_p = new sg.rlp(sg.wc, sg.mp);
				cf_p.addRule(sg.rl.CENTER_VERTICAL);
				cf_p.addRule(sg.rl.ALIGN_PARENT_RIGHT);
				cf.setLayoutParams(cf_p);
				cf.setBackgroundColor(Color.WHITE);
				title.addView(cf);
			}
			//cancel Button
			if(this.ccText !== null) {
				cc = sgUtils.gui.mcFastButton(this.ccText, sg.px*0xa, false, sgColors.main, null, null, null, [sg.px*8, sg.px*8, sg.px*8, sg.px*8], null, null, null, function(view) {
					that.ccFunc();
				});
				var cc_p = new sg.rlp(sg.wc, sg.mp);
				cc_p.addRule(sg.rl.CENTER_VERTICAL);
				cc_p.addRule(sg.rl.ALIGN_PARENT_LEFT);
				cc.setLayoutParams(cc_p);
				cc.setBackgroundColor(Color.WHITE);
				title.addView(cc);
			}
			rl.addView(title);

			//content layout
			var scroll = new ScrollView(ctx);
			var scroll_p = new sg.rlp(sg.wc, sg.wc);
			scroll_p.addRule(sg.rl.BELOW, title.getId());
			scroll_p.addRule(sg.rl.CENTER_HORIZONTAL);
			scroll.setLayoutParams(scroll_p);
			scroll.setPadding(sg.px*2, 0, sg.px*2, sg.px*2);
			scroll.addView(this.nativeLayout);
			rl.addView(scroll);

			this.layoutData = [rl, title, scroll, t_text, cf, cc];

			this.wd = new PopupWindow(rl, sg.wc, sg.wc, this.focus == true);
		},

		show: function() {
			var that = this;
			if(this.wd === null) {
				this.build();
			}
			if(this.wd.isShowing()) {
				return;
			}
			uiThread(function() {try {
				that.wd.showAtLocation(sg.dv, that.gravity, 0, 0);
			}catch(err) {
				showError(err);
			}});
		},

		close: function() {
			var that = this;
			if(this.wd === null) {
				return;
			}
			if(!this.wd.isShowing()) {
				return;
			}
			uiThread(function() {try {
				that.wd.dismiss();
			}catch(err) {
				showError(err);
			}});
		}
}



//단지 블럭 선택창만을 위한 메서드(we_dialog의 열화 카피판[근데 we_dialog보다 이 레이아웃이 먼저 만들어짐<어째서?>])
function we_blockSelect(title, confirmText, confirmFunc, cancelTxt, cancelFunc) {
	var that = this;
	this.name = title;
	this.cfText = confirmText;
	this.ccText = cancelTxt;
	this.cfFunc = confirmFunc;//버튼을 누를때 창을 닫기 위해 'this.close()' 호출 필수
	this.ccFunc = cancelFunc;

	this.wd = null;
	this.layoutData = null;
}

we_blockSelect.prototype = {

	toString: function() {
		return "[object we_blockSelect(" + this.name + ")]";
	},

	build: function() {
		var that = this;
		//main Layout
		var rl = new sg.rl(ctx);
		rl.setBackgroundDrawable(sgAssets.toast.ninePatch());

		//title Part
		var title = new sg.rl(ctx);
		title.setId(sgUtils.math.randomId());
		var title_p = new sg.rlp(sg.mp, sg.px*0x30);
		title_p.addRule(sg.rl.ALIGN_PARENT_TOP);
		title.setLayoutParams(title_p);
		title.setBackgroundColor(sgColors.main);
		var t_text = sgUtils.gui.mcFastText(this.name, sg.px*0x10, false, Color.WHITE, null, null, null, [sg.px*2, sg.px*2, sg.px*2, sg.px*2]);
		var t_text_p = new sg.rlp(sg.wc, sg.wc);
		t_text_p.addRule(sg.rl.CENTER_IN_PARENT);
		t_text.setLayoutParams(t_text_p);
		title.addView(t_text);
		//confirm
		var cf = null;
		//cancel
		var cc = null;
		//confirm Button
		if(this.cfText !== null) {
			cf = sgUtils.gui.mcFastButton(this.cfText, sg.px*0xa, false, sgColors.main, null, null, null, [sg.px*8, sg.px*8, sg.px*8, sg.px*8], null, null, null, function(view) {
				var id = main.idEditText.getText() + "";
				var damage = main.damageEditText.getText() + "";
				if(parseInt(id) != id) {
					we_toast(msg("warn_unknown_block"));
					return;
				}
				if(parseInt(damage) != damage) {
					damage = 0;
				}
				that.cfFunc(id, damage);
			});
			var cf_p = new sg.rlp(sg.wc, sg.mp);
			cf_p.addRule(sg.rl.CENTER_VERTICAL);
			cf_p.addRule(sg.rl.ALIGN_PARENT_RIGHT);
			cf.setLayoutParams(cf_p);
			cf.setBackgroundColor(Color.WHITE);
			title.addView(cf);
		}
		//cancel Button
		if(this.ccText !== null) {
			cc = sgUtils.gui.mcFastButton(this.ccText, sg.px*0xa, false, sgColors.main, null, null, null, [sg.px*8, sg.px*8, sg.px*8, sg.px*8], null, null, null, function(view) {
				that.ccFunc();
			});
			var cc_p = new sg.rlp(sg.wc, sg.mp);
			cc_p.addRule(sg.rl.CENTER_VERTICAL);
			cc_p.addRule(sg.rl.ALIGN_PARENT_LEFT);
			cc.setLayoutParams(cc_p);
			cc.setBackgroundColor(Color.WHITE);
			title.addView(cc);
		}
		rl.addView(title);

		//id, damage editText layout
		var bid = new sg.rl(ctx);
		bid.setId(sgUtils.math.randomId());
		var bid_p = new sg.rlp(sg.wc, sg.wc);
		bid_p.addRule(sg.rl.BELOW, title.getId());
		bid.setLayoutParams(bid_p);
		bid.setPadding(0, sg.px*8, 0, sg.px*8);
		bid.addView(main.blockIdLayout);
		rl.addView(bid);

		//content layout
		var scroll = new ScrollView(ctx);
		var scroll_p = new sg.rlp(sg.mp, sg.mp);
		scroll_p.addRule(sg.rl.BELOW, bid.getId());
		scroll.setLayoutParams(scroll_p);
		scroll.setPadding(sg.px*2, 0, sg.px*2, sg.px*2);
		var s_layout =  new sg.ll(ctx);
		var s_layout_p = new sg.rlp(sg.mp, sg.wc);
		s_layout.setLayoutParams(s_layout_p);
		s_layout.setOrientation(sg.ll.VERTICAL);
		s_layout.setGravity(Gravity.CENTER);
		s_layout.addView(main.blockImagesLayout);
		scroll.addView(s_layout);
		rl.addView(scroll);

		this.layoutData = [rl, title, scroll, t_text, cf, cc, bid, s_layout];

		this.wd = new PopupWindow(rl, sg.ww, sg.wh, true);
	},

	show: function() {
		var that = this;
		if(this.wd === null) {
			this.build();
		}
		if(this.wd.isShowing()) {
			return;
		}
		uiThread(function() {try {
			that.wd.showAtLocation(sg.dv, 0, 0, 0);
		}catch(err) {
			showError(err);
		}});
	},

	close: function() {
		var that = this;
		if(this.wd === null) {
			return;
		}
		if(!this.wd.isShowing()) {
			return;
		}
		uiThread(function() {try {
			that.layoutData[6].removeAllViews();
			that.layoutData[7].removeAllViews();
			that.wd.dismiss();
		}catch(err) {
			showError(err);
		}});
	}
}



var main = new WorldEdit();
thread(function() {try {
	main.init();
}catch(err) {
		//Retry (Support Jellybean)
	uiThread(function() {try {
		main.init();
	}catch(err) {
		showError(err);
	}});
}}).start();



function newLevel() {
	//맵 진입시 버튼 활성화
	main.setButtonVisible(true);
}

function leaveGame() {
	//맵 퇴장시 버튼과 메뉴 비활성화
	main.setButtonVisible(false);
	main.setMenuVisible(false);
}

var _loadingScreen = null;
function modTick() {

	if(main.asynchronousSetTileRequest.length > 0) {
		if(!main.modTickWorking) {
			msg("msg_async_start", true);
			main.modTickWorking = true;
			main.modTickMsgTick = 200;
		}
		if(++main.modTickMsgTick >= 200) {
			main.modTickMsgTick = 0;
			msg("msg_async_work", true, undefined, [["l", ChatColor.AQUA + sgUtils.convert.numberToString(main.asynchronousSetTileRequest.length) + ChatColor.YELLOW]]);
		}
		for(var e = 0; e < main.asynchEditSpeed; e++) {
			if(main.asynchronousSetTileRequest.length === 0) break;
			var tempData = main.asynchronousSetTileRequest.shift();
			Level.setTile(tempData[0], tempData[1], tempData[2], tempData[3], tempData[4]);
		}
		if(main.asynchronousSetTileRequest.length === 0) {
			msg("msg_async_end", true);
			main.modTickWorking = false;
		}
	}
	if(main.synchronizationSetTileRequest.length > 0) {
		sgUtils.data.progress = [0, main.synchronizationSetTileRequest.length];
		for(var e = 0; e < main.synchronizationSetTileRequest.length; e++) {
			Level.setTile(main.synchronizationSetTileRequest[e][0], main.synchronizationSetTileRequest[e][1], main.synchronizationSetTileRequest[e][2], main.synchronizationSetTileRequest[e][3], main.synchronizationSetTileRequest[e][4]);
			sgUtils.data.progress[0]++;
		}
		main.synchronizationSetTileRequest = [];
	}
	if(_loadingScreen !== null) {
		uiThread(function() {try {
			_loadingScreen.close();
			_loadingScreen = null;
		}catch(err) {}});
	}
}

function useItem(x, y, z, itemId, blockId, side) {
	if(Player.getCarriedItem() === 271) {
		preventDefault();
		highlightBlock(x, y, z);
		var editor = main.getLocalEditor();
		if(editor === false) {
			msg("warn_no_player", true, undefined, [["p", editor.getName()]]);
			return;
		}
		editor.setPos1(new Vector3(x, y, z));
		we_toast(msg("msg_pos1", false, null, [["x", x], ["y", y], ["z", z]]));
	}
}

var _destroyBlockHook = sg.ct();
function startDestroyBlock(x, y, z, side) {
	if(Player.getCarriedItem() === 271) {
		highlightBlock(x, y, z);
		var editor = main.getLocalEditor();
		if(editor === false) {
			msg("warn_no_player", true, undefined, [["p", editor.getName()]]);
			return;
		}
		editor.setPos2(new Vector3(x, y, z));
		we_toast(msg("msg_pos2", false, null, [["x", x], ["y", y], ["z", z]]));
		_destroyBlockHook = sg.ct();
	}
}

function destroyBlock(x, y, z, side) {
	if(Player.getCarriedItem() === 271) {
		preventDefault();
		if(sg.ct() - _destroyBlockHook > 100) {
			highlightBlock(x, y, z);
			var editor = main.getLocalEditor();
			if(editor === false) {
				msg("warn_no_player", true, undefined, [["p", editor.getName()]]);
				return;
			}
			editor.setPos2(new Vector3(x, y, z));
			we_toast(msg("msg_pos2", false, null, [["x", x], ["y", y], ["z", z]]));
		}
		_destroyBlockHook = sg.ct();
	}
}

sgUtils.data.commandQueue = {};
function chatReceiveHook(str, sender) {
	if(str.substring(0, 1) === "@") {
		var cmd = str.substring(1, str.length).split(" ");
		if(!main.editorGroup.isAllow(sender)) {
			msg("warn_no_permission", true, sender);
			return;
		}
		var editor = main.editorGroup.getEditor(sender);
		var player = editor.getOwner();
		var isHollow = false;
		switch(cmd[0].toLowerCase()) {



			case msg("cmd_pos1"):
			var x = Math.floor(Entity.getX(player));
			var y = Math.floor(Entity.getY(player));
			var z = Math.floor(Entity.getZ(player));
			editor.setPos1(new Vector3(x, y, z));
			msg("msg_pos1", true, sender, [["x", x], ["y", y], ["z", z]]);
			break;



			case msg("cmd_pos2"):
			var x = Math.floor(Entity.getX(player));
			var y = Math.floor(Entity.getY(player));
			var z = Math.floor(Entity.getZ(player));
			editor.setPos2(new Vector3(x, y, z));
			msg("msg_pos2", true, sender, [["x", x], ["y", y], ["z", z]]);
			break;



			case msg("cmd_fill"):
			if(cmd.length < 2) {
				msg(msg("cmd_usage") + msg("cmd_fill_usage"), true, sender);
				return;
			}
			var block = cmd[1].split(":");
			if(block.length === 0) {
				block[1] = 0;
			}
			if(parseInt(block[0]) != block[0] || parseInt(block[0]) != block[0], block[0] >= 0x80 || block[0] < 0 || block[1] >= 0x10 || block[1] < 0) {
				msg("warn_unknown_block", true, sender);
				return;
			}
			we_initEdit(1, 1, editor, EditType.FILL, [new Block(block[0], block[1])]);
			msg("msg_request", true, sender, [["w", msg("fill")]]);
			break;



			case msg("cmd_clear"):
			we_initEdit(1, 1, editor, EditType.CLEAR);
			msg("msg_request", true, sender, [["w", msg("clear")]]);
			break;



			case msg("cmd_replace"):
			if(cmd.length < 3) {
				msg(msg("cmd_usage") + msg("cmd_replace_usage"), true, sender);
				return;
			}
			var block1 = cmd[1].split(":");
			if(block1.length === 0) {
				block1[1] = 0;
			}
			var block2 = cmd[1].split(":");
			if(block2.length === 0) {
				block2[1] = 0;
			}
			if(parseInt(block1[0]) != block1[0] || parseInt(block1[0]) != block1[0], block1[0] >= 0x80 || block1[0] < 0 || block1[1] >= 0x10 || block1[1] < 0) {
				msg("warn_unknown_block", true, sender);
				return;
			}
			if(parseInt(block2[0]) != block2[0] || parseInt(block2[0]) != block2[0], block2[0] >= 0x80 || block2[0] < 0 || block2[1] >= 0x10 || block2[1] < 0) {
				msg("warn_unknown_block", true, sender);
				return;
			}
			we_initEdit(1, 1, editor, EditType.REPLACE, [new Block(block1[0], block1[1], new Block(block2[0], block2[1]))]);
			msg("msg_request", true, sender, [["w", msg("replace")]]);
			break;



			case msg("wall"):
			if(cmd.length < 2) {
				msg(msg("cmd_usage") + msg("cmd_wall_usage"), true, sender);
				return;
			}
			var block = cmd[1].split(":");
			if(block.length === 0) {
				block[1] = 0;
			}
			if(parseInt(block[0]) != block[0] || parseInt(block[0]) != block[0], block[0] >= 0x80 || block[0] < 0 || block[1] >= 0x10 || block[1] < 0) {
				msg("warn_unknown_block", true, sender);
				return;
			}
			we_initEdit(1, 1, editor, EditType.WALL, [new Block(block[0], block[1])]);
			msg("msg_request", true, sender, [["w", msg("wall")]]);
			break;



			case msg("cmd_hollow_sphere"):
			if(cmd.length < 3) {
				msg(msg("cmd_usage") + msg("cmd_hollow_sphere_usage"), true, sender);
				return;
			}
			isHollow = true;
			case msg("cmd_sphere"):
			if(cmd.length < 3) {
				msg(msg("cmd_usage") + msg("cmd_sphere_usage"), true, sender);
				return;
			}
			var block = cmd[1].split(":");
			if(block.length === 0) {
				block[1] = 0;
			}
			if(parseInt(block[0]) != block[0] || parseInt(block[0]) != block[0], block[0] >= 0x80 || block[0] < 0 || block[1] >= 0x10 || block[1] < 0) {
				msg("warn_unknown_block", true, sender);
				return;
			}
			if(parseInt(cmd[2]) != cmd[2] || cmd[2] < 1) {
				msg("warn_unknown_radious", true, sender);
				return;
			}
			we_initEdit(1, 1, editor, EditType.SPHERE, [isHollow, new Block(block[0], block[1]), cmd[2]]);
			if(isHollow) {
				msg("msg_request", true, sender, [["w", msg("hollow_sphere")]]);
			}else {
				msg("msg_request", true, sender, [["w", msg("sphere")]]);
			}
			break;



			case msg("cmd_hollow_hemi_sphere"):
			if(cmd.length < 4) {
				msg(msg("cmd_usage") + msg("cmd_hollow_hemi_sphere_usage"), true, sender);
				return;
			}
			isHollow = true;
			case msg("cmd_hemi_sphere"):
			if(cmd.length < 4) {
				msg(msg("cmd_usage") + msg("cmd_hemi_sphere_usage"), true, sender);
				return;
			}
			var block = cmd[1].split(":");
			if(block.length === 0) {
				block[1] = 0;
			}
			if(parseInt(block[0]) != block[0] || parseInt(block[0]) != block[0], block[0] >= 0x80 || block[0] < 0 || block[1] >= 0x10 || block[1] < 0) {
				msg("warn_unknown_block", true, sender);
				return;
			}
			if(parseInt(cmd[2]) != cmd[2] || cmd[2] < 1) {
				msg("warn_unknown_radi", true, sender);
				return;
			}
			var drc = cmd[3].toLowerCase();
			if(drc !== "x+" && drc !== "x-" && drc !== "y+" && drc !== "y-" && drc !== "z+" && drc !== "z-") {
				msg("warn_unknown_direction", true, sender);
				return;
			}
			we_initEdit(1, 1, editor, EditType.HEMI_SPHERE, [isHollow, new Block(block[0], block[1]), cmd[2], drc]);
			if(isHollow) {
				msg("msg_request", true, sender, [["w", msg("hollow_hemi_sphere")]]);
			}else {
				msg("msg_request", true, sender, [["w", msg("hemi_sphere")]]);
			}
			break;



			case msg("cmd_hollow_circle"):
			if(cmd.length < 4) {
				msg(msg("cmd_usage") + msg("cmd_hollow_circle_usage"), true, sender);
				return;
			}
			isHollow = true;
			case msg("cmd_circle"):
			if(cmd.length < 4) {
				msg(msg("cmd_usage") + msg("cmd_circle_usage"), true, sender);
				return;
			}
			var block = cmd[1].split(":");
			if(block.length === 0) {
				block[1] = 0;
			}
			if(parseInt(block[0]) != block[0] || parseInt(block[0]) != block[0], block[0] >= 0x80 || block[0] < 0 || block[1] >= 0x10 || block[1] < 0) {
				msg("warn_unknown_block", true, sender);
				return;
			}
			if(parseInt(cmd[2]) != cmd[2] || cmd[2] < 1) {
				msg("warn_unknown_radious", true, sender);
				return;
			}
			var axis = cmd[3].toLowerCase();
			if(axis !== "x" && axis !== "y" && axis !== "z") {
				msg("warn_unknown_axis", true, sender);
				return;
			}
			we_initEdit(1, 1, editor, EditType.CIRCLE, [isHollow, new Block(block[0], block[1]), cmd[2], axis]);
			if(isHollow) {
				msg("msg_request", true, sender, [["w", msg("hollow_circle")]]);
			}else {
				msg("msg_request", true, sender, [["w", msg("circle")]]);
			}
			break;



			case msg("cmd_hollow_semi_circle"):
			if(cmd.length < 5) {
				msg(msg("cmd_usage") + msg("cmd_hollow_semi_circle_usage"), true, sender);
				return;
			}
			case msg("cmd_semi_circle"):
			if(cmd.length < 5) {
				msg(msg("cmd_usage") + msg("cmd_semi_circle_usage"), true, sender);
				return;
			}
			var block = cmd[1].split(":");
			if(block.length === 0) {
				block[1] = 0;
			}
			if(parseInt(block[0]) != block[0] || parseInt(block[0]) != block[0], block[0] >= 0x80 || block[0] < 0 || block[1] >= 0x10 || block[1] < 0) {
				msg("warn_unknown_block", true, sender);
				return;
			}
			if(parseInt(cmd[2]) != cmd[2] || cmd[2] < 1) {
				msg("warn_unknown_radious", true, sender);
				return;
			}
			var axis = cmd[3].toLowerCase();
			if(axis !== "x" && axis !== "y" && axis !== "z") {
				msg("warn_unknown_axis", true, sender);
				return;
			}
			var drc = cmd[4].toLowerCase();
			if(drc !== "x+" && drc !== "x-" && drc !== "y+" && drc !== "y-" && drc !== "z+" && drc !== "z-") {
				msg("warn_unknown_direction", true, sender);
				return;
			}
			//TODO 예외처리가 남았습니다! 기준축에 따라서 선택가능한 방향이 제한적입니다!
			we_initEdit(1, 1, editor, EditType.SEMI_CIRCLE, [isHollow, new Block(block[0], block[1]), cmd[2], axis, drc]);
			if(isHollow) {
				msg("msg_request", true, sender, [["w", msg("hollow_semi_circle")]]);
			}else {
				msg("msg_request", true, sender, [["w", msg("semi_circle")]]);
			}
			break;



			case msg("cmd_copy"):
			we_initEdit(0, 1, editor, EditType.COPY);
			msg("msg_request", true, sender, [["w", msg("copy")]]);
			break;



			case msg("cmd_cut"):
			we_initEdit(1, 1, editor, EditType.CUT);
			msg("msg_request", true, sender, [["w", msg("cut")]]);
			break;



			case msg("cmd_paste"):
			we_initEdit(1, 1, editor, EditType.PASTE);
			msg("msg_request", true, sender, [["w", msg("paste")]]);
			break;



			case msg("cmd_flip"):
			if(cmd.length < 2) {
				msg(msg("cmd_usage") + msg("cmd_flip_usage"), true, sender);
				return;
			}
			var axis = cmd[1].toLowerCase();
			if(axis !== "x" && axis !== "y" && axis !== "z") {
				msg("warn_unknown_axis", true, sender);
				return;
			}
			we_initEdit(0, 1, editor, EditType.FLIP, [axis]);
			msg("msg_request", true, sender, [["w", msg("flip")]]);
			break;



			case msg("cmd_rotation"):
			if(cmd.length < 3) {
				msg(msg("cmd_usage") + msg("cmd_rotation_usage"), true, sender);
				return;
			}
			var axis = cmd[1].toLowerCase();
			if(axis !== "x" && axis !== "y" && axis !== "z") {
				msg("warn_unknown_axis", true, sender);
				return;
			}
			var dgr = parseInt(cmd[2]);
			if(dgr !== 90 && dgr !== 180 && dgr !== 270) {
				msg("warn_unknown_degree", true, sender);
				return;
			}
			we_initEdit(0, 1, editor, EditType.ROTATION, [axis, parseInt(Math.floor(dgr/90))]);
			msg("msg_request", true, sender, [["w", msg("rotation")]]);
			break;



			case msg("cmd_help"):
			switch(cmd[1]) {
				case msg("cmd_help"):
				msg(msg("cmd_usage") + msg("cmd_help_usage"), true, sender);
				msg("cmd_help_desc", true, sender);
				break;

				case msg("cmd_pos1"):
				msg(msg("cmd_usage") + msg("cmd_pos1_usage"), true, sender);
				msg("cmd_pos1_desc", true, sender);
				break;

				case msg("cmd_pos2"):
				msg(msg("cmd_usage") + msg("cmd_pod2_usage"), true, sender);
				msg("cmd_pos2_desc", true, sender);
				break;

				case msg("cmd_fill"):
				msg(msg("cmd_usage") + msg("cmd_fill_usage"), true, sender);
				msg("cmd_fill_desc", true, sender);
				break;

				case msg("cmd_clear"):
				msg(msg("cmd_usage") + msg("cmd_clear_usage"), true, sender);
				msg("cmd_clear_desc", true, sender);
				break;

				case msg("cmd_replace"):
				msg(msg("cmd_usage") + msg("cmd_replace_usage"), true, sender);
				msg("cmd_replace_desc", true, sender);
				break;

				case msg("cmd_wall"):
				msg(msg("cmd_usage") + msg("cmd_wall_usage"), true, sender);
				msg("cmd_wall_desc", true, sender);
				break;

				case msg("cmd_sphere"):
				msg(msg("cmd_usage") + msg("cmd_sphere_usage"), true, sender);
				msg("cmd_sphere_desc", true, sender);
				break;

				case msg("cmd_hollow_sphere"):
				msg(msg("cmd_usage") + msg("cmd_hollow_sphere_usage"), true, sender);
				msg("cmd_hollow_sphere_desc", true, sender);
				break;

				case msg("cmd_hemi_sphere"):
				msg(msg("cmd_usage") + msg("cmd_hemi_sphere_usage"), true, sender);
				msg("cmd_hemi_sphere_desc", true, sender);
				break;

				case msg("cmd_hollow_hemi_sphere"):
				msg(msg("cmd_usage") + msg("cmd_hollow_hemi_sphere_usage"), true, sender);
				msg("cmd_hollow_hemi_sphere_desc", true, sender);
				break;

				case msg("cmd_circle"):
				msg(msg("cmd_usage") + msg("cmd_circle_usage"), true, sender);
				msg("cmd_circle_desc", true, sender);
				break;

				case msg("cmd_hollow_circle"):
				msg(msg("cmd_usage") + msg("cmd_hollow_circle_usage"), true, sender);
				msg("cmd_hollow_circle_desc", true, sender);
				break;

				case msg("cmd_semi_circle"):
				msg(msg("cmd_usage") + msg("cmd_semi_circle_usage"), true, sender);
				msg("cmd_semi_circle_desc", true, sender);
				break;

				case msg("cmd_hollow_semi_circle"):
				msg(msg("cmd_usage") + msg("cmd_hollow_semi_circle_usage"), true, sender);
				msg("cmd_hollow_semi_circle_desc", true, sender);
				break;

				case msg("cmd_copy"):
				msg(msg("cmd_usage") + msg("cmd_copy_usage"), true, sender);
				msg("cmd_copy_desc", true, sender);
				break;

				case msg("cmd_cut"):
				msg(msg("cmd_usage") + msg("cmd_cut_usage"), true, sender);
				msg("cmd_cut_desc", true, sender);
				break;

				case msg("cmd_paste"):
				msg(msg("cmd_usage") + msg("cmd_paste_usage"), true, sender);
				msg("cmd_paste_desc", true, sender);
				break;

				case msg("cmd_flip"):
				msg(msg("cmd_usage") + msg("cmd_flip_usage"), true, sender);
				msg("cmd_flip_desc", true, sender);
				break;

				case msg("cmd_rotation"):
				msg(msg("cmd_usage") + msg("cmd_rotation_usage"), true, sender);
				msg("cmd_rotation_desc", true, sender);
				break;

				default:
				var cmds = [msg("cmd_help"), msg("cmd_pos1"), msg("cmd_pos2"), msg("cmd_fill"), msg("cmd_clear"), msg("cmd_replace"), msg("cmd_wall"), msg("cmd_sphere"), msg("cmd_hollow_sphere"), msg("cmd_hemi_sphere"), msg("cmd_hollow_hemi_sphere"), msg("cmd_circle"), msg("cmd_hollow_circle"), msg("cmd_semi_circle"), msg("cmd_hollow_semi_circle"), msg("cmd_copy"), msg("cmd_cut"), msg("cmd_paste"), msg("cmd_flip"), msg("cmd_rotation")];
				msg(msg("cmd_commands") + cmds.join(", "), true, sender);
				msg("cmd_help_usage2", true, sender);
				msg("cmd_help_desc2", true, sender);
			}
			break;



			case msg("cmd_yes"):
			if(sgUtils.data.commandQueue[sender.toLowerCase()] !== undefined) {
				sgUtils.data.commandQueue[sender.toLowerCase()](true);
				sgUtils.data.commandQueue[sender.toLowerCase()] = undefined;
			}
			break;



			case msg("cmd_no"):
			if(sgUtils.data.commandQueue[sender.toLowerCase()] !== undefined) {
				sgUtils.data.commandQueue[sender.toLowerCase()](false);
				sgUtils.data.commandQueue[sender.toLowerCase()] = undefined;
			}
			break;



			default:
				msg(msg("cmd_usage") + msg("cmd_help_usage"), true, sender);
		}
	}
}