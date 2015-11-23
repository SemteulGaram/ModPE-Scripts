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

const NAME = "WorldEditScript";
//Season . Release Number . Commits
const VERSION = "0.1.4";
const VERSION_CODE = 104;
const TAG = "[" + "WES" + " " + VERSION + "] ";

var File = java.io.File;
var BufferdInputStream = java.io.BufferedInputStream;
var BufferdOutputStream = java.io.BufferedOutputstream;
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
sg.rlp = RelativeLayout.LayoutParams;
sg.llp = LinearLayout.LayoutParams;
sg.tp = TypedValue.COMPLEX_UNIT_PX;
sg.sm = net.zhuoweizhang.mcpelauncher.ScriptManager;
sg.ww = ctx.getScreenWidth();//ctx.getWindowManager().getDefaultDisplay().getWidth();
sg.wh = ctx.getScreenHeight();//ctx.getWindowManager().getDefaultDisplay().getHeight();
sg.dv = ctx.getWindow().getDecorView();
sg.px = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());



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



var sgFiles = {}
sgFiles.sdcard = Environment.getExternalStorageDirectory();
sgFiles.mcpe = new File(sgFiles.sdcard, "games/com.mojang");
sgFiles.world = new File(sgFiles.mcpe, "minecraftWorlds");
sgFiles.mod = new File(sgFiles.mcpe, "minecraftpe/mods");
sgFiles.font = new File(sgFiles.mod, "minecraft.ttf");
sgFiles.script = new File(sgFiles.mod, NAME);
sgFiles.setting = new File(sgFiles.script, "setting.json");
sgFiles.test = new File(sgFiles.script, "log.txt");
sgFiles.noMedia = new File(sgFiles.script, ".nomedia");
sgFiles.map = function() {return new File(mfiles.map, Level.getWorldDir())};
sgFiles.mapMod = function() {return new File(sgFiles.map, Level.getWorldDir() + "/mods")}
sgFiles.mapSetting = function() {return new File(sgFiles.map, Level.getWorldDir() + "/mods/" + NAME + ".json")}



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
			content.push(line);
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

		this.show = function() {
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
			var lname = name.toLowerCase();
			var list = sgUtils.modPE.entityExtra.getAll();
			for(var e = 0; e < list.length; e++) {
				if(Player.isPlayer(list[e]) && Player.getName(list[e]).toLowerCase() === lname) {
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
		this.lastValidCaptureTimeMs;

		this.range = new Array(2);
		// type, size - @int
		this.AudioCapture = function(type, size, session) {
			that.Type = type;
			that.range = android.media.audiofx.Visualizer.getCaptureSizeRange();
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
					that.visualizer.setCaptureSize(that.rawVizData.length);
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
						that.lastValidCaptureTimeMs = java.lang.System.currentTimeMillis();
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
			if(that.captureData()) {
				return that.rawVizData;
			}else {
				return that.rawNullData;
			}
		}

		// num, den - @int
		// return - @byte[]
		this.getFormattedData = function(num, den) {
			if(that.captureData()) {
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
					toast("Unknown AudioCapture Type");
					return that.formattedNullData;
				}
				return that.formattedVizData;
			} else {
				return that.formattedNullData;
			}
		}

		// return - boolen
		this.captureData = function() {
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
						if((java.lang.System.currentTimeMillis() - that.lastValidCaptureTimeMs) > that.MAX_IDLE_TIME_MS) {
							result = false;
						}
					}else {
						that.lastValidCaptureTimeMs = java.lang.System.currentTimeMillis();
					}
				}
			}
			return result;
		}

		this.mAudioCapture = null;
		this.mVisible = null;

		this.onVisibilityChanged = function(visible, type, size, audioSessionID) {
			mVisible = visible;
			if(visible) {
				if(that.mAudioCapture === null) {
					that.mAudioCapture = that.AudioCapture(type, size, audioSessionID);
					that.mVisData = new Array(size);
				}
				that.start();
			}else {
				if(that.mAudioCapture !== null) {
					that.stop();
					that.release();
					that.mAudioCapture = null;
				}
			}
		}
	},

	//ready
	//vis.onVisibilityChanged(visible, type, size, android.media.MediaPlayer().getAudioSessionId());

	//capture
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



function msg(str, target) {
	if(target === undefined) {
		sgUtils.modPE.broadcast(Chat.Color.YELLOW + str);
	}else if(Player.getName(Player.getEntity()).toLowerCase() === target.toLowerCase()) {
		we_toast(str);
	}else {
		sgUtils.modPE.broadcast("(" + ChatColor.AQUA + target + ChatColor.WHITE + ") " + ChatColor.YELLOW + str);
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



//======================
//WORLD EDIT SCRIPT SIDE
//======================

function WorldEdit() {
	if (!(this instanceof arguments.callee)) return new arguments.callee();

	this.contentType = {
		REDIRECT_MENU: 0,
		RUN_FUNCTION: 1,
		TOGGLE: 2
	}

	this.settingFile = sgFiles.setting;
	this.defaultSetting = {
		Type: "ModPE_Script_WorldEdit",
		BtnX: 0,
		BtnY: Math.floor(sg.wh/5),
		BtnVis: 1,
		MenuLoc: 0,
		WorkType: 0,
		WhiteList: [],
		HollowCircular: 0
	}
	this.setting = null;
	this.button = null;
	this.menu = null;
	this.currentMenu = null;
	this.mainMenu = null;
	this.loadingLayout = null;

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
["6:1", BlockTypes.GRASS, [["sapling", 1]], false],
["6:2", BlockTypes.GRASS, [["sapling", 2]], false],
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
	
	sgUtils.data.isProcessing = false;
	sgUtils.data.progress = [0, 1];
}

WorldEdit.prototype = {

	toString: function() {
		return "[object WorldEdit]";
	},

	init: function() {
		//각종 변수 초기화 및 등록
		var loading = new sgUtils.gui.progressBar(7);
		loading.setText("Load WorldEdit script...");
		loading.show();
		//설정 불러오기
		this.loadSetting();
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
		var idTitle = sgUtils.gui.mcFastText("Id:", sg.px*0x10, false, Color.WHITE);
		var idt_p = new sg.llp(sg.px*30, sg.wc);
		idTitle.setLayoutParams(idt_p);
		idTitle.setGravity(Gravity.CENTER);
		var damageTitle = sgUtils.gui.mcFastText(" Damage:", sg.px*0x10, false, Color.WHITE);
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
		loading.close();
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
		this.mainMenu = new we_menu("WorldEdit");
		//메인 메뉴 내용물
		var mm_edit = new we_menu("Edit");
		var mm_tool =  new we_menu("Tool");
		var mm_setting = new we_menu("Setting");
		//에딧메뉴 내용물
		var mme_circular = new we_menu("Circular");

		//메인메뉴 목록
		this.mainMenu.addMenu(this.contentType.REDIRECT_MENU, "Edit", mm_edit);
		this.mainMenu.addMenu(this.contentType.REDIRECT_MENU, "Tool", mm_tool);
		this.mainMenu.addMenu(this.contentType.REDIRECT_MENU, "Setting", mm_setting);
		//에딧메뉴 목록
		mm_edit.addMenu(this.contentType.RUN_FUNCTION, "Fill", function() {
			we_initEdit(that, that.getLocalEditor(), EditType.FILL);
		});
		mm_edit.addMenu(this.contentType.RUN_FUNCTION, "Clear", function() {
			we_initEdit(that, that.getLocalEditor(), EditType.CLEAR);
		});
		mm_edit.addMenu(this.contentType.RUN_FUNCTION, "Replace", function() {
			we_initEdit(that, that.getLocalEditor(), EditType.REPLACE);
		});
		mm_edit.addMenu(this.contentType.RUN_FUNCTION, "Wall", function() {
			we_initEdit(that, that.getLocalEditor(), EditType.WALL);
		});
		mm_edit.addMenu(this.contentType.REDIRECT_MENU, "Circular", mme_circular);
		//원형 에딧메뉴 목록
		mme_circular.addMenu(this.contentType.TOGGLE, "Hollow Circular", function(bool) {
			if(bool === undefined) {
				return that.get("HollowCircular") == 1;
			}else if(bool) {
				that.set("HollowCircular", 1);
			}else {
				that.set("HollowCircular", 0);
			}
		});
		//설정메뉴 목록
		mm_setting.addMenu(this.contentType.TOGGLE, "Button Visible", function(bool) {
			if(bool === undefined) {
				return that.get("BtnVis") == 1;
			}else if(bool) {
				that.set("BtnVis", 1, true);
			}else {
				that.set("BtnVis", 0, true);
			}
		});
		mm_setting.addMenu(this.contentType.RUN_FUNCTION, "Menu Location", function() {
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
						func();
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
				var btn = sgUtils.gui.mcFastButton(con[1], sg.px*0x10, false, Color.WHITE, null, null, null, [sg.px*4, sg.px*8, sg.px*4, sg.px*8], null, con[2] ? sgAssets.weButtonClick.ninePatch() : sgAssets.weButton.ninePatch(), null, function(view) {try {
					var func = view.getTag();
					if(func()) {
						func(false);
						view.setBackgroundDrawable(sgAssets.weButton.ninePatch());
					}else {
						func(true);
						view.setBackgroundDrawable(sgAssets.weButtonClick.ninePatch());
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

	getBackupPos: function() {
		return this.backupPos;
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

	setBackup: function(piece, pos) {
		if(!(piece instanceof Piece)) {
			throw new TypeError("Parameter 'piece' must instance of Piece");
		}
		if(!(pos instanceof Vector3)) {
			throw new TypeError("Parameter 'pos' must instance of Vector3");
		}
		this.backup = piece;
		this.backupPos = pos;
	}
}



var EditType = {
	FILL: 0x00,
	CLEAR: 0x01,
	REPLACE: 0x02,
	WALL: 0x03,
	SPHERE: 0x10,
	HEMISPHERE: 0x11,
	CIRCLE: 0x12,
	SEMICIRCLE: 0x13,
	COPY: 0x20,
	CUT: 0x21,
	PASTE: 0x22,
	ROTATION: 0x23,
	FLIP: 0x24,
	BACKUP: 0x30,
	RESTORE: 0x31
}

function we_initEdit(worldEdit, editor, editType, editDetail) {
	var that = this;
	if(!editor.isOnline()) {
		msg("Can't find player entity", editor.getName());
		return;
	}
	if(sgUtils.data.isProcessing) {
		msg("현재 진행중인 작업이 있습니다\n작업이 끝날때까지 기다려주세요...", editor.getName());
		return;
	}

	var workType =  worldEdit.get("WorkType");

	switch(editType) {

		//EditDetail: [FilledBlock]
		case EditType.FILL:
		//현재 작업 상태
		var atv_m = 0;
		//작업
		var atv = thread(function() {try{
			//로컬작업일 경우 로딩 프로그래스바 쓰레드 생성
			if(editor.getName().toLowerCase() === (Player.getName(Player.getEntity())+"").toLowerCase()) {
				thread(function() {try {
					var loading = new sgUtils.gui.progressBar(3, true);
					loading.setText("준비 중...");
					loading.show();
					var pgt;
					//작업 상태가 2가 되면 종료
					while(atv_m !== 2) {
						if(atv_m === 0) {
							pgt = "(" + sgUtils.convert.numberToString(sgUtils.data.progress[0]) + "/" + sgUtils.convert.numberToString(sgUtils.data.progress[1]) + ")";
							loading.setText("백업 중... " + pgt);
							loading.setMax(sgUtils.data.progress[1]);
							loading.setProgress(sgUtils.data.progress[0]);
						}else if(atv_m === 1) {
							pgt = "(" + sgUtils.convert.numberToString(sgUtils.data.progress[0]) + "/" + sgUtils.convert.numberToString(sgUtils.data.progress[1]) + ")";
							loading.setText("'채우기' 에딧 중... " + pgt);
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
			//백업
			if(!we_edit(workType, EditType.BACKUP, editor)) {
				atv_m = 2;
				return;
			}
			atv_m = 1;
			//에딧
			if(!we_edit(workType, EditType.FILL, editor, editDetail)) {
				atv_m = 2;
				return;
			}
			atv_m = 2;
		}catch(err) {
			showError(err);
		}});
		
		if(editDetail === undefined) {
			var bs = new we_blockSelect("Select 'Fill' block...", "Run", function(id, data) {
				//FIXME 더 좋은 방법은 없습니까?
				if(((id-1)+"") === "NaN" || ((data-1)+"") === "NaN") {
					msg("형식에 맞지 않는 입력입니다", editor.getName());
					return;
				}
				this.close();
				editDetail = [new Block(id, data)];
				//엑티브 스타트!
				atv.start();
			}, "Cancel", function() {
				//블럭 선택창 닫기
				this.close();
			});
			bs.show();
		}else {
			if(!(editDetail[0] instanceof Block)) {
				throw new Error("editDetail[0] must instance of Block");
			}
			//엑티브 스타트!
			atv.start();
		}
		break;



		//EditDetail: []
		case EditType.CLEAR:
		//현재 작업 상태
		var atv_m = 0;
		//작업
		var atv = thread(function() {try{
			//로컬작업일 경우 로딩 프로그래스바 쓰레드 생성
			if(editor.getName().toLowerCase() === (Player.getName(Player.getEntity())+"").toLowerCase()) {
				thread(function() {try {
					var loading = new sgUtils.gui.progressBar(3, true);
					loading.setText("준비 중...");
					loading.show();
					var pgt;
					//작업 상태가 2가 되면 종료
					while(atv_m !== 2) {
						if(atv_m === 0) {
							pgt = "(" + sgUtils.convert.numberToString(sgUtils.data.progress[0]) + "/" + sgUtils.convert.numberToString(sgUtils.data.progress[1]) + ")";
							loading.setText("백업 중... " + pgt);
							loading.setMax(sgUtils.data.progress[1]);
							loading.setProgress(sgUtils.data.progress[0]);
						}else if(atv_m === 1) {
							pgt = "(" + sgUtils.convert.numberToString(sgUtils.data.progress[0]) + "/" + sgUtils.convert.numberToString(sgUtils.data.progress[1]) + ")";
							loading.setText("'비우기' 에딧 중... " + pgt);
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
			//백업
			if(!we_edit(workType, EditType.BACKUP, editor)) {
				atv_m = 2;
				return;
			}
			atv_m = 1;
			//에딧
			if(we_edit(workType, EditType.CLEAR, editor)) {
				atv_m = 2;
				return;
			}
			atv_m = 2;
		}catch(err) {
			showError(err);
		}});
		//추가정보 없이 액티브 스타트!
		atv.start();
		break;



		//EditDetail: [fromReplaceBlock, toReplaceBlock]
		case EditType.REPLACE:
		break;



		//EditDetail: [FilledBlock]
		case EditType.WALL:
		break;



		//EditDetail: [isHollow, FilledBlock]
		case EditType.SPHERE:
		break;



		//EditDetail: [isHollow, FilledBlock, direction]
		case EditType.HEMISPHERE:
		break;



		//EditDetail: [isHollow, FilledBlock, direction]
		case EditType.CIRCLE:
		break;


		//EditDetail: [isHollow, FilledBlock, direction]
		case EditType.SEMICIRCLE:
		break;



		//EditDetail: []
		case EditType.COPY:
		break;



		//EditDetail: []
		case EditType.CUT:
		break;



		//EditDetail: []
		case EditType.PASTE:
		break;



		//EditDetail: [axis]
		case EditType.FLIP:
		break;



		//EditDetail: [axis, degree]
		case EditType.ROTATION:
		break;



		//EditDetail: []
		case EditType.BACKUP:
		break;



		//EditDetail: []
		case EditType.RESTORE:
		break;
	}
}

function we_edit(workType, editType, editor, detail) {
	var that = this;
	sgUtils.data.isProcessing = true;
	switch(editType) {

		//EditDetail: [FilledBlock]
		case EditType.FILL:
		var pos1 = editor.getPos1();
		var pos2 = editor.getPos2();
		//위치가 지정되어 있는가?
		if(pos1 === null || pos2 === null) {
			msg("위치1, 2를 지정해 주세요", editor.getName());
			sgUtils.data.isProcessing = false;
			return false;
		}
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
		var blocks = [];
		for(var cy = sy; cy <= ey; cy++) {
			for(var cz = sz; cz <= ez; cz++) {
				for(var cx = sx; cx <= ex; cx++) {
					if(workType === 0) {
						Level.setTile(cx, cy, cz, bid, bdata);
					}else {
						blocks.push([cx, cy, cz, bid, bdata]);
					}
					sgUtils.data.progress[0]++;
				}
			}
		}
		break;



		//EditDetail: []
		case EditType.CLEAR:
		break;



		//EditDetail: [fromReplaceBlock, toReplaceBlock]
		case EditType.REPLACE:
		break;



		//EditDetail: [FilledBlock]
		case EditType.WALL:
		break;



		//EditDetail: [isHollow, FilledBlock]
		case EditType.SPHERE:
		break;



		//EditDetail: [isHollow, FilledBlock, direction]
		case EditType.HEMISPHERE:
		break;



		//EditDetail: [isHollow, FilledBlock, direction]
		case EditType.CIRCLE:
		break;


		//EditDetail: [isHollow, FilledBlock, direction]
		case EditType.SEMICIRCLE:
		break;



		//EditDetail: []
		case EditType.COPY:
		break;



		//EditDetail: []
		case EditType.CUT:
		break;



		//EditDetail: []
		case EditType.PASTE:
		break;



		//EditDetail: [axis]
		case EditType.FLIP:
		break;



		//EditDetail: [axis, degree]
		case EditType.ROTATION:
		break;



		//EditDetail: []
		case EditType.BACKUP:
		var pos1 = editor.getPos1();
		var pos2 = editor.getPos2();
		//위치가 지정되어 있는가?
		if(pos1 === null || pos2 === null) {
			msg("위치1, 2를 지정해 주세요", editor.getName());
			sgUtils.data.isProcessing = false;
			return false;
		}
		//더 작은 값을 시작값(s) 큰값을 끝값(e)으로 지정
		var sx = (pos1.getX() < pos2.getX()) ? pos1.getX() : pos2.getX();
		var sy = (pos1.getY() < pos2.getY()) ? pos1.getY() : pos2.getY();
		var sz = (pos1.getZ() < pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var ex = (pos1.getX() > pos2.getX()) ? pos1.getX() : pos2.getX();
		var ey = (pos1.getY() > pos2.getY()) ? pos1.getY() : pos2.getY();
		var ez = (pos1.getZ() > pos2.getZ()) ? pos1.getZ() : pos2.getZ();
		var max = (ex-sx+1)*(ey-sy+1)*(ez-sz+1);
		sgUtils.data.progress = [0, max];
		
		var blocks = [];
		for(var cy = sy; cy <= ey; cy++) {
			for(var cz = sz; cz <= ez; cz++) {
				for(var cx = sx; cx <= ex; cx++) {
					blocks.push([cx, cy, cz, Level.getTile(cx, cy, cz), Level.getData(cx, cy, cz)]);
					sgUtils.data.progress[0]++;
				}
			}
		}
		editor.setBackup(new Piece(ex-sx+1, ey-sy+1, ez-sz+1, blocks), new Vector3(sx, sy, sz));
		break;



		//EditDetail: []
		case EditType.RESTORE:
		break;
	}
	sgUtils.data.isProcessing = false;
	return true;
}



function we_blockSelect(title, confirmText, confirmFunc, cancelTxt, cancelFunc) {
	var that = this;
	this.name = title;
	this
	this.cfText = confirmText;
	this.ccText = cancelTxt;
	this.cfFunc = confirmFunc;//if you want close this window confirmFunc or cancelFunc must contain 'this.close()'
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
				if(((id-1)+"") === "NaN") {
					we_toast("정확한 블럭 아이디를 입력해 주세요");
					return;
				}
				if(((damage-1)+"") === "NaN") {
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
				that.ccFunc(view);
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
	sleep(500);
	main.init();
}catch(err) {
	showError(err);
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

function useItem(x, y, z, itemId, blockId, side) {
	if(Player.getCarriedItem() === 271) {
		preventDefault();
		highlightBlock(x, y, z);
		var editor = main.getLocalEditor();
		if(editor === false) {
			we_toast("플레이어를 찾을 수 없습니다\nError: ui1", 2, 5000, true);
			return;
		}
		editor.setPos1(new Vector3(x, y, z));
		we_toast("위치1 지정됨\nx:" + x + " y:" + y + " z:" + z);
	}
}

function startDestroyBlock(x, y, z, side) {
	if(Player.getCarriedItem() === 271) {
		highlightBlock(x, y, z);
		var editor = main.getLocalEditor();
		if(editor === false) {
			we_toast("플레이어를 찾을 수 없습니다\nError: sdb1", 2, 5000, true);
			return;
		}
		editor.setPos2(new Vector3(x, y, z));
		we_toast("위치2 지정됨\nx:" + x + " y:" + y + " z:" + z);
	}
}

function destroyBlock(x, y, z, side) {
	if(Player.getCarriedItem() === 271) {
		preventDefault();
	}
}

function chatReceiveHook(str, sender) {
	if(str.substring(0, 1) === "@") {
		var cmd = str.substring(1, str.length).split(" ");
		if(!main.editorGroup.isAllow(sender)) {
			msg("해당 유저는 월드에딧 권한이 없습니다", sender);
			return;
		}
		var editor = main.editorGroup.getEditor(sender);
		var player = editor.getOwner();
		switch(cmd[0]) {
			case "pos1":
			var x = Math.floor(Entity.getX(player));
			var y = Math.floor(Entity.getY(player));
			var z = Math.floor(Entity.getZ(player));
			editor.setPos1(new Vector3(x, y, z));
			msg("위치1이 지정됨 X:" + x + " Y:" + y + " Z: " + z, sender);
			break;
			case "pos2":
			var x = Math.floor(Entity.getX(player));
			var y = Math.floor(Entity.getY(player));
			var z = Math.floor(Entity.getZ(player));
			editor.setPos2(new Vector3(x, y, z));
			msg("위치2이 지정됨 X:" + x + " Y:" + y + " Z: " + z, sender);
			break;
		}
	}
}



//XXXXXX

/*
var WorkType = {
	SYNCHRONIZATION: 0,
	ASYNCHRONOUS: 1
}



var ContentType = {
	REDIRECT_MENU: 0,
	FUNCTION: 1,
	TOGGLE: 2
}

var MenuType = {
	MAIN: 0x00,
	EDIT: 0x01,
	TOOL: 0x02,
	INFO: 0x03,
	QUICK: 0x04,
	HELP: 0x05,
	SETTING: 0x06,
	CIRCULAR: 0x07,
	COPY: 0x08,
	POS: 0x09
}

function WorldEditScript(setting) {
	this.TYPE = "ModPE_Script";
	this.defaultSettingFile = new File(sgFiles.script, "setting.json");
	if(setting instanceof File) {
		this.settingFile = setting;
	}else if(setting instanceof string) {
		this.settingFile = new File(setting);
	}else {
		this.settingFile = this.defaultSettingFile;
	}
	this.setting = null;
	this.defaultSetting = {
		ButtonX: 0,
		ButtonY: Math.floor(c.wh/3),
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
	this.blockImageWork = false;
	this.asynceBuffer = [];
	this._selectMenuVis = false;
	this._onMove = false;
	this._onWork = false;
	this._workTick = 200;
}

WorldEditScript.prototype = {

	toString: function() {
		return "[object WorldEditScript]";
	},

	init: function() {
		this.editorGroup.init();
	},

	loadSetting: function() {
		if(this.settingFile.exists()) {
			this.setting = loadJSON(this.settingFile);
			if(this.setting === false || this.setting === null || this.setting === undefined || this.setting.toString() !== "[object Object]") {
				WES_Toast("설정파일 손상!\n복구 시도중입니다...", 2, 8000);
				this.settingFile.delete();
				this.saveSetting();
			}
		}else {
			WES_Toast("월드에딧 스크립트의 첫 부팅을 환영합니다...\n설정파일을 생성중입니다", 0, 8000);
			this.saveSetting();
		}
	},

	saveSetting: function() {
		if(!(this.settingFile.exists())) {
			this.settingFile.createNewFile();
			this.setting = this.defaultSetting;
		}
		if(!(saveJSON(this.settingFile, this.setting))) {
			WES_Toast("경고! 저장불가능\n저장장치를 확인하세요.", 2, 8000);
		}
	},

	get: function(article) {
		if(this.setting === null) {
			this.loadSetting();
		}
		if(this.setting[article] === undefined) {
			WES_Toast("설정 데이터 손상.\n해당 데이터를 벅구중입니다 (" + article + ")", 2, 8000);
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
			msg("알 수 없는 자료 저장시도 (" + article + ")", 2, 8000);
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



		this.menus[MenuType.EDIT] = new WES_Menu(this, "에딧");
		this.menus[MenuType.MAIN].addMenu(ContentType.REDIRECT_MENU, "에딧", this.menus[MenuType.EDIT]);

		this.menus[MenuType.POS] = new WES_Menu(this, "위치/블럭 지정");
		this.menus[MenuType.EDIT].addMenu(ContentType.REDIRECT_MENU, "위치/블럭 지정", this.menus[MenuType.POS]);

			this.menus[MenuType.POS].addMenu(ContentType.FUNCTION, "아이템: 위치 선택 도구", function() {
			Entity.setCarriedItem(Player.getEntity(), 271, 1, 0);
			WES_Toast("'위치 선택 도구' 지급됨");
		});

		this.menus[MenuType.POS].addMenu(ContentType.FUNCTION, "위치1 지정", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			var x = Math.floor(Player.getX());
			var y = Math.floor(Player.getY() - 1);
			var z = Math.floor(Player.getZ());
			editor.setPos1(new Vector3(x, y, z));
			WES_Toast("위치1 지정됨\nx:" + x + " y:" + y + " z:" + z);
		});

		this.menus[MenuType.POS].addMenu(ContentType.FUNCTION, "위치2 지정", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			var x = Math.floor(Player.getX());
			var y = Math.floor(Player.getY() - 1);
			var z = Math.floor(Player.getZ());
			editor.setPos2(new Vector3(x, y, z));
			WES_Toast("위치2 지정됨\nx:" + x + " y:" + y + " z:" + z);
		});

		this.menus[MenuType.POS].addMenu(ContentType.FUNCTION, "블럭1 지정", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			if(that.blockImageWork) {
				WES_Toast("이미지 빌드중입니다\n잠시만 기다리세요", 2, 5000);
				return;
			}
			var t = new WES_BlockSelect(that, "블럭1 지정...", "선택", function(id, data) {
				editor.setBlock1(new Block(id, data));
				WES_Toast("블럭1 지정됨 " + id + ":" + data);
			}, "취소", function() {});
			t.setVisible(true);
		});

		this.menus[MenuType.POS].addMenu(ContentType.FUNCTION, "블럭2 지정", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			if(that.blockImageWork) {
				WES_Toast("이미지 빌드중입니다\n잠시만 기다리세요", 2, 5000);
				return;
			}
			var t = new WES_BlockSelect(that, "블럭2 지정...", "확인", function(id, data) {
				editor.setBlock2(new Block(id, data));
				WES_Toast("블럭2 지정됨 " + id + ":" + data);
			}, "취소", function() {});
			t.setVisible(true);
		});

		this.menus[MenuType.COPY] = new WES_Menu(this, "복사/변형");
		this.menus[MenuType.EDIT].addMenu(ContentType.REDIRECT_MENU, "복사/변형", this.menus[MenuType.COPY]);

		this.menus[MenuType.COPY].addMenu(ContentType.FUNCTION, "복사", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			editor.run(EditType.COPY);
		});

		this.menus[MenuType.COPY].addMenu(ContentType.FUNCTION, "잘라내기", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			editor.run(EditType.CUT);
		});

		this.menus[MenuType.COPY].addMenu(ContentType.FUNCTION, "붙여넣기", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			editor.run(EditType.PASTE);
		});

		this.menus[MenuType.COPY].addMenu(ContentType.FUNCTION, "회전", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			editor.run(EditType.ROTATION);
		});

		this.menus[MenuType.COPY].addMenu(ContentType.FUNCTION, "대칭", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			editor.run(EditType.FLIP);
		});

		this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "채우기", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			editor.run(EditType.FILL);
		});

		this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "비우기", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			editor.run(EditType.CLEAR);
		});

		this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "바꾸기", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			editor.run(EditType.REPLACE);
		});

		this.menus[MenuType.EDIT].addMenu(ContentType.FUNCTION, "벽 생성", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			editor.run(EditType.WALL);
		});

		this.menus[MenuType.CIRCULAR] = new WES_Menu(this, "원형");
		this.menus[MenuType.EDIT].addMenu(ContentType.REDIRECT_MENU, "원형 생성", this.menus[MenuType.CIRCULAR]);

		this.menus[MenuType.CIRCULAR].addMenu(ContentType.TOGGLE, "설정: 내부를 비우기", function(bool) {
			if(bool === true) {
				that.set("HollowCircular", true);
				that.saveSetting();
				return "설정: 내부를 비우기";
			}else if(bool === false) {
				that.set("HollowCircular", false);
				that.saveSetting();
				return "설정: 내부를 비우기";
			}else {
				return that.get("HollowCircular")
			}
		});

		this.menus[MenuType.CIRCULAR].addMenu(ContentType.FUNCTION, "구 생성", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			editor.run(EditType.SPHERE);
		});

		this.menus[MenuType.CIRCULAR].addMenu(ContentType.FUNCTION, "반구 생성", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			editor.run(EditType.HEMI_SPHERE);
		});

		this.menus[MenuType.CIRCULAR].addMenu(ContentType.FUNCTION, "원 생성", function() {
			var editor = that.editorGroup.get(Player.getName(Player.getEntity()));
			if(editor === false) {
				WES_Toast("플레이어를 찾을 수 없습니다");
				return;
			}
			editor.run(EditType.CIRCLE);
		});



		this.menus[MenuType.TOOL] = new WES_Menu(this, "도구");
		this.menus[MenuType.MAIN].addMenu(ContentType.REDIRECT_MENU, "도구", this.menus[MenuType.TOOL]);




		this.menus[MenuType.INFO] = new WES_Menu(this, "정보패널");
		this.menus[MenuType.MAIN].addMenu(ContentType.REDIRECT_MENU, "정보패널", this.menus[MenuType.INFO]);




		this.menus[MenuType.QUICK] = new WES_Menu(this, "퀵바");
		this.menus[MenuType.MAIN].addMenu(ContentType.REDIRECT_MENU, "퀵바", this.menus[MenuType.QUICK]);




		this.menus[MenuType.HELP] = new WES_Menu(this, "도움말");
		this.menus[MenuType.MAIN].addMenu(ContentType.REDIRECT_MENU, "도움말", this.menus[MenuType.HELP]);

		this.menus[MenuType.HELP].addMenu(ContentType.FUNCTION, "에딧하는 방법", function() {
			var doc = new WES_Document([
			"s|이 도움말에서는 다양한 에딧의 방법을 다룹니다",
			"s|채우기|" + DIP*0x18 + "|" + Color.YELLOW,
			"i|" + FILE_MAIN_DIR + "/help1.img",
			"s|채우고 싶은 영역의 두 꼭짓점을\n'위치1', '위치2'로 지정한 다음에 \n'블럭1'에 원하는 블럭을 선택하고 \n'채우기'를 선택하면 두 꼭짓점 사이의 공간이 해당 블럭으로 채워집니다\n----------",
			"s|비우기|" + DIP*0x18 + "|" + Color.YELLOW,
			"s|두 꼭짓점을 지정한 다음 '비우기'를 누르면\n해당 영역의 위쪽 부터 아래쪽으로 제거해 나갑니다\n물이나 모래등을 제거할때 효과적입니다\n----------",
			"s|바꾸기|" + DIP*0x18 + "|" + Color.YELLOW,
			"s|두 꼭짓점을 지정한 다음\n'블럭1'에다 바꿀 블럭을\n'블럭2'에다 바꾸고 싶은 블럭을 지정하고\n'바꾸기'를 누르면 해당 영역에 있는 블럭1들이 블럭2로 바뀝니다\n--------",
			"s|벽 생성|" + DIP*0x18 + "|" + Color.YELLOW,
			"i|" + FILE_MAIN_DIR + "/help2.img",
			"s|두 꼭짓점 사이에 블럭1로 구성된 벽을 생성합니다\n--------",
			"s|구 생성|" + DIP*0x18 + "|" + Color.YELLOW,
			"i|" + FILE_MAIN_DIR + "/help3.img",
			"s|'위치1'을 중심으로\n지정한 반지름 크기의 구를 생성합니다\n또한 '설정: 내부를 비우기'를 통해서 속이 빈 구를 생성할 수 있습니다\n--------",
			"s|반구 생성|" + DIP*0x18 + "|" + Color.YELLOW,
			"i|" + FILE_MAIN_DIR + "/help4.img",
			"s|'위치1'을 중심으로\n지정한 반지름 크기와\n지정한 방향에 따라서 반구를 생성합니다\n또한 '설정: 내부를 비우기'를 통해서 속이 빈 반구를 생성할 수 있습니다\n--------",
			"s|원 생성|" + DIP*0x18 + "|" + Color.YELLOW,
			"i|" + FILE_MAIN_DIR + "/help5.img",
			"s|'위치1'을 중심으로\n지정한 반지름 크기와\n지정한 방향의 원을 생성합니다\n또한 '설정: 내부를 비우기'를 통해서 속이 빈 원을 생성할 수 있습니다\n--------"
			], false);
			var dl = new WES_Dialog("기초적인 에딧 도움말", 0, doc.getLayout(), null, null, "닫기", function() {this.setVisible(false)}, true);
			dl.setVisible(true);
		});

		this.menus[MenuType.HELP].addMenu(ContentType.FUNCTION, "버전에 대해서...", function() {
			var doc = new WES_Document([
			"s|죄송합니다... 전 이 버전이 망했다고 생각해요... 처음부터 다시 만들생각입니다... (170,000자를 다시 쓸 생각하니 몸서리가...)",
			"s|그러한 이유로 이 버전에 자세한 픽스나 자세한 설명은 하지 않을껍니다"
			], false);
			var dl = new WES_Dialog("기초적인 에딧 도움말", 0, doc.getLayout(), null, null, "닫기", function() {this.setVisible(false)}, true);
			dl.setVisible(true);
		});




		this.menus[MenuType.SETTING] = new WES_Menu(this, "설정");
		this.menus[MenuType.MAIN].addMenu(ContentType.REDIRECT_MENU, "설정", this.menus[MenuType.SETTING]);

		this.menus[MenuType.SETTING].addMenu(ContentType.TOGGLE, "버튼 보이기", function(bool) {
			if(bool === true) {
				that.set("ButtonVis", true);
				that.setButtonVisible(true);
				that.saveSetting();
				return "버튼 보이기"
			}else if(bool === false) {
				that.set("ButtonVis", false);
				that.setButtonVisible(false);
				that.saveSetting();
				return "버튼 보이기"
			}else {
				return that.setting.buttonVis
			}
		});

		this.menus[MenuType.SETTING].addMenu(ContentType.TOGGLE, (that.get("WorkType") == WorkType.SYNCHRONIZATION) ? "작업방식: Synchronization" : "작업모드: Asynchronous", function(bool) {
			if(bool === true) {
				that.set("WorkType", WorkType.SYNCHRONIZATION);
				that.saveSetting();
				return "작업모드: Synchronization";
			}else if(bool === false) {
				that.set("WorkType", WorkType.ASYNCHRONOUS);
				that.saveSetting();
				return "작업모드: Asynchronous";
			}else {
				return that.get("WorkType") == WorkType.SYNCHRONIZATION;
			}
		});

		this.menus[MenuType.MAIN].addMenu(ContentType.FUNCTION, "정보", function() {that.about()});



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
	},

	about: function() {
		var layout = new c.r(ctx);
		var layout_d = new BitmapDrawable(Assets.bg32);
		layout_d.setTileModeXY(Shader.TileMode.REPEAT, Shader.TileMode.REPEAT);
		layout.setBackgroundDrawable(layout_d);

		var image = new ImageView(ctx);
		image.setId(randomId());
		var image_p = new c.r.LayoutParams(DIP*0x80, DIP*0x80);
		image_p.addRule(c.r.CENTER_IN_PARENT);
		image.setLayoutParams(image_p);
		image.setImageBitmap(BlockImageLoader.create(["piston_side", 0], ["piston_side", 0], ["piston_top_normal", 0], BlockTypes.CUBE, true));
		layout.addView(image);

		var txt1 = mcText("World", DIP*0x30);
		txt1.setGravity(Gravity.CENTER);
		var txt1_p = new c.r.LayoutParams(c.m, c.w);
		txt1_p.addRule(c.r.CENTER_VERTICAL);
		txt1_p.addRule(c.r.LEFT_OF, image.getId());
		txt1.setLayoutParams(txt1_p);
		layout.addView(txt1);

		var txt2 = mcText("Edit", DIP*0x30);
		txt2.setGravity(Gravity.CENTER);
		var txt2_p = new c.r.LayoutParams(c.m, c.w);
		txt2_p.addRule(c.r.CENTER_VERTICAL);
		txt2_p.addRule(c.r.RIGHT_OF, image.getId());
		txt2.setLayoutParams(txt2_p);
		layout.addView(txt2);

		var txt3 = mcText(VERSION, DIP*0x20, false, Color.parseColor("#ffff55"));
		var txt3_p = new c.r.LayoutParams(c.w, c.w);
		txt3_p.addRule(c.r.CENTER_HORIZONTAL);
		txt3_p.addRule(c.r.BELOW, image.getId());
		txt3.setLayoutParams(txt3_p);
		layout.addView(txt3);

		var txt4 = mcText("author: Semteul", DIP*0x10);
		var txt4_p = new c.r.LayoutParams(c.w, c.w);
		txt4_p.addRule(c.r.ALIGN_PARENT_BOTTOM);
		txt4_p.addRule(c.r.ALIGN_PARENT_RIGHT);
		txt4.setLayoutParams(txt4_p);
		layout.addView(txt4);

		var window = new PopupWindow(layout, c.ww, c.wh, true);
		uiThread(function() {
			window.showAtLocation(c.d, 0, 0, 0);
			//TODO
			WES_Toast("제작자가 귀차니즘에 빠져서 나가기 버튼을 안 만들었습니다.\n알아서 강제종료해주세요.(에?", 0, 10000);
		});
	}
}



function WES_Document(strs, shadow) {
	this.strs = strs;
	this.shadow = shadow === undefined ? false : shadow;
	this.isBuild = false;
}

WES_Document.prototype = {

	build: function() {
		this.mainLayout = new c.l(ctx);
		this.layout = this.mainLayout;
		this.layout.setGravity(Gravity.CENTER);
		this.layout.setOrientation(c.l.VERTICAL);

		this.isMainLayout = true;

		for(var e = 0; e < this.strs.length; e++) {
			var document = this.strs[e].split("|");
			switch(document[0]) {

				case "s"://Text
				if(document.length > 3) {
					var txt = mcText(document[1], document[2], this.shadow, document[3]);
				}else if(document.length > 2) {
					var txt = mcText(document[1], document[2], this.shadow);
				}else {
					var txt = mcText(document[1], null, this.shadow);
				}
				this.layout.addView(txt);
				break;

				case "i"://Image
				var file = new File(document[1]);
				if(!(file.exists() && file.isFile() && file.canRead())) {
					this.layout.addView(mcText("Image load fail.\n'" + file.getName() + "'", null, this.shadow, Color.RED));
					break;
				}
				var bitmap = BitmapFactory.decodeStream(java.io.FileInputStream(file));
				var image = new ImageView(ctx);
				if(document.length > 2) {
					bitmap = Bitmap.createScaledBitmap(bitmap, parseInt(document[2]), parseInt(document[3]), document[4] === "true");
				}
				image.setImageBitmap(bitmap);
				this.layout.addView(image);
				break;
				default:
				throw new Error("Unknown document type: " + document[0]);
			}
		}
		if(this.isMainLayout) {
			this.mainLayout = this.layout;
		}else {
			this.mainLayout.addView(this.layout);
		}
		this.isBuild = true;
	},

	getLayout: function() {
		if(this.isBuild) {
			return this.mainLayout;
		}else {
			this.build();
			return this.mainLayout;
		}
	},

	isBuild: function() {
		this.isBuild;
	}
}



function WES_InfoPanel(name, repeatDelay, func) {
	this.name = name;
	this.repeatDelay = repeatDelay;
	this.delay = 0;
	this.func = func;
}

WES_InfoPanel.prototype = {

	toString: function() {
		return "[" + this.name + " InfoPanel]";
	},

	run: function() {
		if(--this.delay < 1) {
			this.delay = this.repeatDelay;
			this.func();
		}
	},

	forceRun: function() {
		this.func();
	}
}



function WES_TaskManager(name, delay) {
	this.name = name;
	this.thread = null;
	this.delay = delay;
	this.task = [];
}

WES_TaskManager.prototype = {

	toString: function() {
		return "[" + this.name + " TaskManager]";
	},

	check: function() {
		var that = this;
		if(!this.thread.isAlive()) {
			this.thread = thread(function() {try {
				while(that.task.length > 0) {
					for(var e = 0; e < that.task.length; e++) {
						that.task[e].run();
					}
				}
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}).start();
		}
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
	this.copy = null;
	this.backup = null;
	this.backupX = null;
	this.backupY = null;
	this.backupZ = null;
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
		var player = this.getOwner();
		if(player === false) {
			msg("플레이어를 찾을 수 없음: " + this.owner);
		}
		switch(type) {

			case EditType.FILL:
			if(!(this.pos1 instanceof Vector3)) {
				msg("위치1을 지정해주세요", player);
				return;
			}
			if(!(this.pos2 instanceof Vector3)) {
				msg("위치2를 지정해주세요", player);
				return;
			}
			if(!(this.block1 instanceof Block)) {
				msg("블럭1을 지정해주세요", player);
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
					var size = (ex-sx+1) * (ey-sy+1) * (ez-sz+1);
					var load = new CustomProgressBar(6, size, "'채우기'작업중...(0/" + numberToString(size) + ")");
					var pg = 0;
					thread(function() {try {
						while(true) {
							if(size === pg) {
								load.setProgress(pg);
								load.setText("'채우기'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
								sleep(1000);
								load.close();
								break;
							}
							load.setProgress(pg);
							load.setText("'채우기'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
							sleep(100);
						}
					}catch(e) {
						showError(e, WarnType.RECOVERABLE);
					}}).start();
					for(var y = sy; y <= ey; y++) {
					for(var z = sz; z <= ez; z++) {
					for(var x = sx; x <= ex; x++) {
						Level.setTile(x, y, z, id, data);
						pg++;
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



			case EditType.CLEAR:
			if(!(this.pos1 instanceof Vector3)) {
				msg("위치1을 지정해주세요", player);;
				return;
			}
			if(!(this.pos2 instanceof Vector3)) {
				msg("위치1을 지정해주세요", player);
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
					var size = (ex-sx+1) * (ey-sy+1) * (ez-sz+1);
					var load = new CustomProgressBar(6, size, "'비우기'작업중...(0/" + numberToString(size) + ")");
					var pg = 0;
					thread(function() {try {
						while(true) {
							if(size === pg) {
								load.setProgress(pg);
								load.setText("'비우기'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
								sleep(1000);
								load.close();
								break;
							}
							load.setProgress(pg);
							load.setText("'비우기'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
							sleep(100);
						}
					}catch(e) {
						showError(e, WarnType.RECOVERABLE);
					}}).start();
					for(var y = ey; y >= sy; y--) {
					for(var z = sz; z <= ez; z++) {
					for(var x = sx; x <= ex; x++) {
						Level.setTile(x, y, z, 0, 0);
						pg++;
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
			if(!(this.pos1 instanceof Vector3)) {
				msg("위치1을 지정해주세요", player);
				return;
			}
			if(!(this.pos2 instanceof Vector3)) {
				msg("위치2를 지정해주세요", player);
				return;
			}
			if(!(this.block1 instanceof Block)) {
				msg("블럭1을 지정해주세요", player);
				return;
			}
			if(!(this.block2 instanceof Block)) {
				msg("블럭2를 지정해주세요", player);
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
					var size = (ex-sx+1) * (ey-sy+1) * (ez-sz+1);
					var load = new CustomProgressBar(6, size, "'바꾸기'작업중...(0/" + numberToString(size) + ")");
					var pg = 0;
					thread(function() {try {
						while(true) {
							if(size === pg) {
								load.setProgress(pg);
								load.setText("'바꾸기'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
								sleep(1000);
								load.close();
								break;
							}
							load.setProgress(pg);
							load.setText("'바꾸기'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
							sleep(100);
						}
					}catch(e) {
						showError(e, WarnType.RECOVERABLE);
					}}).start();
					for(var y = sy; y <= ey; y++) {
					for(var z = sz; z <= ez; z++) {
					for(var x = sx; x <= ex; x++) {
						if(Level.getTile(x, y, z) == id1 && Level.getData(x, y, z) == data1) {
							Level.setTile(x, y, z, id2, data2);
						}
						pg++;
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
			if(!(this.pos1 instanceof Vector3)) {
				msg("위치1을 지정해주세요", player);
				return;
			}
			if(!(this.pos2 instanceof Vector3)) {
				msg("위치2를 지정해주세요", player);
				return;
			}
			if(!(this.block1 instanceof Block)) {
				msg("블럭2을 지정해주세요", player);
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
					var load = new CustomProgressBar(5, null, "'벽 생성'작업중...");
					for(var x = sx; true; x = ex) {
					for(var y = sy; y <= ey; y++) {
					for(var z = sz; z <= ez; z++) {
						Level.setTile(x, y, z, id, data);
					}
					}
					if(x === ex) break;
					}
					for(var z = sz; true; z = ez) {
					for(var y = sy; y <= ey; y++) {
					for(var x = sx; x <= ex; x++) {
						Level.setTile(x, y, z, id, data);
					}
					}
					if(z === ez) break;
					}
					load.close();
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
			if(!(this.pos1 instanceof Vector3)) {
				msg("위치1을 지정해주세요", player);
				return;
			}
			if(!(this.block1 instanceof Block)) {
				msg("블럭1을 지정해주세요", player);
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

			var dl = new WES_Dialog("반지름...", 0, np, "생성", function() {try {
				var radi = np.getValue();
				if(that._parent.get('WorkType') === WorkType.SYNCHRONIZATION) {
					thread(function() {try {
						var size = Math.pow(((radi+1)*2)+1, 3);
						var load = new CustomProgressBar(6, size, "'구 생성'작업중...(0/" + numberToString(size) + ")");
						var pg = 0;
						thread(function() {try {
							while(true) {
								if(size === pg) {
									load.setProgress(pg);
									load.setText("'구 생성'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
									sleep(1000);
									load.close();
									break;
								}
								load.setProgress(pg);
								load.setText("'구 생성'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
								sleep(100);
							}
						}catch(e) {
							showError(e, WarnType.RECOVERABLE);
						}}).start();
						for(var y = -(radi+1); y <= (radi+1); y++) {
						for(var z = -(radi+1); z <= (radi+1); z++) {
						for(var x = -(radi+1); x <= (radi+1); x++) {
							if(type) {
								if(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2) && Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) >= (Math.pow(radi-1, 2))) {
									Level.setTile(cx + x, cy + y, cz + z, id, data);
								}
							}else {
								if(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2)) {
									Level.setTile(cx + x, cy + y, cz + z, id, data);
								}
							}
							pg++;
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
			}}, "취소", function() {this.setVisible(false)}, true);

			dl.setVisible(true);
			break;



			case EditType.HEMI_SPHERE:
			if(!(this.pos1 instanceof Vector3)) {
				msg("위치1을 지정해주세요", player);
				return;
			}
			if(!(this.block1 instanceof Block)) {
				msg("블럭1을 지정해주세요", player);
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

			var radi = null;

			var direction = null;

			var lo = new c.l(ctx);
			lo.setOrientation(c.l.VERTICAL);
			var xp = mcButton("X+", null, true, null, null, c.m,DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				direction = "X+";
				WES_Toast("X+ 방향으로 설정됨");
			}, null);
			lo.addView(xp);
			var xm = mcButton("X-", null, true, null, null, c.m,DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				direction = "X-";
				WES_Toast("X- 방향으로 설정됨");
			}, null);
			lo.addView(xm);
			var yp = mcButton("Y+", null, true, null, null, c.m,DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				direction = "Y+";
				WES_Toast("Y+ 방향으로 설정됨");
			}, null);
			lo.addView(yp);
			var ym = mcButton("Y-", null, true, null, null, c.m,DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				direction = "Y-";
				WES_Toast("Y- 방향으로 설정됨");
			}, null);
			lo.addView(ym);
			var zp = mcButton("Z+", null, true, null, null, c.m,DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				direction = "Z+";
				WES_Toast("Z+ 방향으로 설정됨");
			}, null);
			lo.addView(zp);
			var zm = mcButton("Z-", null, true, null, null, c.m,DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				direction = "Z-";
				WES_Toast("Z- 방향으로 설정됨");
			}, null);
			lo.addView(zm);

			var dl2 = new WES_Dialog("방향...", 0, lo, "생성", function() {try {
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
					msg("방향을 설정해주세요", Player.getEntity());
					return false;
				}
				if(that._parent.get('WorkType') === WorkType.SYNCHRONIZATION) {
					thread(function() {try {
						var size = Math.pow(((radi+1)*2)+1, 3);
						var load = new CustomProgressBar(6, size, "'반구 생성'작업중...(0/" + numberToString(size) + ")");
						var pg = 0;
						thread(function() {try {
							while(true) {
								if(size === pg) {
									load.setProgress(pg);
									load.setText("'반구 생성'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
									sleep(1000);
									load.close();
									break;
								}
								load.setProgress(pg);
								load.setText("'반구 생성'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
								sleep(100);
							}
						}catch(e) {
							showError(e, WarnType.RECOVERABLE);
						}}).start();
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
									Level.setTile(cx + x, cy + y, cz + z, id, data);
								}
							}else {
								if(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2)) {
									Level.setTile(cx + x, cy + y, cz + z, id, data);
								}
							}
							pg++;
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
			}}, "취소", function() {this.setVisible(false)}, false);

			var dl = new WES_Dialog("반지름...", 0, np, "다음", function() {try {
				radi = np.getValue();
				dl2.setVisible(true);
				this.setVisible(false);
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}, "취소", function() {this.setVisible(false)}, true);

			dl.setVisible(true);
			break;



			case EditType.CIRCLE:
			if(!(this.pos1 instanceof Vector3)) {
				msg("위치1을 지정해주세요", player);
				return;
			}
			if(!(this.block1 instanceof Block)) {
				msg("블럭1을 지정해주세요", player);
				return;
			}

			var type = this._parent.get("HollowCircular");

			var cx = this.pos1.x;
			var cy = this.pos1.y;
			var cz = this.pos1.z;

			var id = this.block1.id;
			var data = this.block1.data;

			var radi = null;
			var axis = null;

			var np = new NumberPicker(ctx);
			np.setMinValue(0x01);
			np.setMaxValue(0xff);

			var lo = new c.l(ctx);
			lo.setOrientation(c.l.VERTICAL);
			var xa = mcButton("X-Axis", null, true, null, null, c.m, DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				axis = "X";
				WES_Toast("X축 기준으로 설정됨");
			}, null);
			lo.addView(xa);
			var ya = mcButton("Y-Axis", null, true, null, null, c.m, DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				axis = "Y";
				WES_Toast("Y축 기준으로 설정됨");
			}, null);
			lo.addView(ya);
			var za = mcButton("Z-Axis", null, true, null, null, c.m, DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				axis = "Z";
				WES_Toast("Z축 기준으로 설정됨");
			}, null);
			lo.addView(za);

			var dl2 = new WES_Dialog("기준 축...", 0, lo, "생성", function() {try {
				if(axis === null) {
					WES_Toast("기준 축을 설정해 주세요");
					return false;
				}
				if(that._parent.get('WorkType') === WorkType.SYNCHRONIZATION) {
					thread(function() {try {
						var size = Math.pow(((radi+1)*2)+1, 2);
						var load = new CustomProgressBar(6, size, "'원 생성'작업중...(0/" + numberToString(size) + ")");
						var pg = 0;
						thread(function() {try {
							while(true) {
								if(size === pg) {
									load.setProgress(pg);
									load.setText("'원 생성'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
									sleep(1000);
									load.close();
									break;
								}
								load.setProgress(pg);
								load.setText("'원 생성'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
								sleep(100);
							}
						}catch(e) {
							showError(e, WarnType.RECOVERABLE);
						}}).start();
						switch(axis) {
							case "X":
							for(var y = -(radi+1); y <= (radi+1); y++) {
							for(var z = -(radi+1); z <= (radi+1); z++) {
								if(type) {
									if(Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2) && Math.pow(y, 2) + Math.pow(z, 2) >= (Math.pow(radi-1, 2))) {
										Level.setTile(cx, cy + y, cz + z, id, data);
									}
								}else {
									if(Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2)) {
										Level.setTile(cx, cy + y, cz + z, id, data);
									}
								}
								pg++;
							}
							}
							break
							case "Y":
							for(var x = -(radi+1); x <= (radi+1); x++) {
							for(var z = -(radi+1); z <= (radi+1); z++) {
								if(type) {
									if(Math.pow(x, 2) + Math.pow(z, 2) < Math.pow(radi, 2) && Math.pow(x, 2) + Math.pow(z, 2) >= (Math.pow(radi-1, 2))) {
										Level.setTile(cx + x, cy, cz + z, id, data);
									}
								}else {
									if(Math.pow(x, 2) + Math.pow(z, 2) < Math.pow(radi, 2)) {
										Level.setTile(cx + x, cy, cz + z, id, data);
									}
								}
								pg++;
							}
							}
							break;
							case "Z":
							for(var y = -(radi+1); y <= (radi+1); y++) {
							for(var x = -(radi+1); x <= (radi+1); x++) {
								if(type) {
									if(Math.pow(y, 2) + Math.pow(x, 2) < Math.pow(radi, 2) && Math.pow(y, 2) + Math.pow(x, 2) >= (Math.pow(radi-1, 2))) {
										Level.setTile(cx + x, cy + y, cz, id, data);
									}
								}else {
									if(Math.pow(y, 2) + Math.pow(x, 2) < Math.pow(radi, 2)) {
										Level.setTile(cx + x, cy + y, cz, id, data);
									}
								}
								pg++;
							}
							}
							break;
							default:
							throw new Error("Unknown Axis");
						}
					}catch(e) {
						showError(e, WarnType.WARNING);
					}}).start();
				}else if(that._parent.setting.WorkType === WorkType.ASYNCHRONOUS) {
					thread(function() {try {
						switch(axis) {
							case "X":
							for(var y = -(radi+1); y <= (radi+1); y++) {
							for(var z = -(radi+1); z <= (radi+1); z++) {
								if(type) {
									if(Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2) && Math.pow(y, 2) + Math.pow(z, 2) >= (Math.pow(radi-1, 2))) {
										that._parent.asynceBuffer.push([cx, cy + y, cz + z, id, data]);
										sleep(1);
									}
								}else {
									if(Math.pow(y, 2) + Math.pow(z, 2) < Math.pow(radi, 2)) {
										that._parent.asynceBuffer.push([cx, cy + y, cz + z, id, data]);
										sleep(1);
									}
								}
							}
							}
							break
							case "Y":
							for(var x = -(radi+1); x <= (radi+1); x++) {
							for(var z = -(radi+1); z <= (radi+1); z++) {
								if(type) {
									if(Math.pow(x, 2) + Math.pow(z, 2) < Math.pow(radi, 2) && Math.pow(x, 2) + Math.pow(z, 2) >= (Math.pow(radi-1, 2))) {
										that._parent.asynceBuffer.push([cx + x, cy, cz + z, id, data]);
										sleep(1);
									}
								}else {
									if(Math.pow(x, 2) + Math.pow(z, 2) < Math.pow(radi, 2)) {
										that._parent.asynceBuffer.push([cx + x, cy, cz + z, id, data]);
										sleep(1);
									}
								}
							}
							}
							break;
							case "Z":
							for(var y = -(radi+1); y <= (radi+1); y++) {
							for(var x = -(radi+1); x <= (radi+1); x++) {
								if(type) {
									if(Math.pow(y, 2) + Math.pow(x, 2) < Math.pow(radi, 2) && Math.pow(y, 2) + Math.pow(x, 2) >= (Math.pow(radi-1, 2))) {
										that._parent.asynceBuffer.push([cx + x, cy + y, cz, id, data]);
										sleep(1);
									}
								}else {
									if(Math.pow(y, 2) + Math.pow(x, 2) < Math.pow(radi, 2)) {
										that._parent.asynceBuffer.push([cx + x, cy + y, cz, id, data]);
										sleep(1);
									}
								}
							}
							}
							break;
							default:
							throw new Error("Unknown Axis");
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
			}}, "취소", function() {this.setVisible(false)}, false);

			var dl = new WES_Dialog("반지름...", 0, np, "다음", function() {try {
				radi = np.getValue();
				dl2.setVisible(true);
				this.setVisible(false);
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}, "취소", function() {this.setVisible(false)}, true);

			dl.setVisible(true);
			break;



			case EditType.COPY:
			if(!(this.pos1 instanceof Vector3)) {
				msg("위치1을 지정해주세요", player);
				return;
			}
			if(!(this.pos2 instanceof Vector3)) {
				msg("위치2를 지정해주세요", player);
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

			thread(function() {try {
				var size = (ex-sx+1) * (ey-sy+1) * (ez-sz+1);
				var load = new CustomProgressBar(6, size, "'복사'작업중...(0/" + numberToString(size) + ")");
				var pg = 0;
				thread(function() {try {
					while(true) {
						if(size === pg) {
							load.setProgress(pg);
							load.setText("'복사'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
							sleep(1000);
							load.close();
							break;
						}
						load.setProgress(pg);
						load.setText("'복사'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
						sleep(100);
					}
				}catch(e) {
					showError(e, WarnType.RECOVERABLE);
				}}).start();
				var buffer = [];
				for(var z = sz; z <= ez; z++) {
				for(var y = sy; y <= ey; y++) {
				for(var x = sx; x <= ex; x++) {
					buffer.push([Level.getTile(x, y, z), Level.getData(x, y, z)]);
					pg++;
				}
				}
				}
				that.copy = new Piece((ex-sx+1), (ey-sy+1), (ez-sz+1), buffer);
				WES_Toast("복사 성공");
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}).start();
			break;



			case EditType.CUT:
			if(!(this.pos1 instanceof Vector3)) {
				msg("위치1을 지정해주세요", player);
				return;
			}
			if(!(this.pos2 instanceof Vector3)) {
				msg("위치2를 지정해주세요", player);
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

			thread(function() {try {
				var size = (ex-sx+1) * (ey-sy+1) * (ez-sz+1);
				var load = new CustomProgressBar(6, size, "'잘라내기'작업중...(0/" + numberToString(size) + ")");
				var pg = 0;
				thread(function() {try {
					while(true) {
						if(size === pg) {
							load.setProgress(pg);
							load.setText("'잘라내기'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
							sleep(1000);
							load.close();
							break;
						}
						load.setProgress(pg);
						load.setText("'잘라내기'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
						sleep(100);
					}
				}catch(e) {
					showError(e, WarnType.RECOVERABLE);
				}}).start();
				var buffer = [];
				for(var z = sz; z <= ez; z++) {
				for(var y = sy; y <= ey; y++) {
				for(var x = sx; x <= ex; x++) {
					buffer.push([Level.getTile(x, y, z), Level.getData(x, y, z)]);
					pg++;
				}
				}
				}
				that.copy = new Piece((ex-sx+1), (ey-sy+1), (ez-sz+1), buffer);
				that.run(EditType.CLEAR);
				WES_Toast("잘라내기 성공");
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}).start();
			break;



			case EditType.PASTE:
			if(!(this.copy instanceof Piece)) {
				msg("복사된 블럭이 없습니다", player);
				return;
			}
			if(!(this.pos1 instanceof Vector3)) {
				msg("위치1을 지정해주세요", player);
				return;
			}

			var cx = this.pos1.x;
			var cy = this.pos1.y;
			var cz = this.pos1.z;

			var highlight = areaHighlight(cx, cy, cz, cx+this.copy.getSizeX()-1, cy+this.copy.getSizeY()-1, cz+this.copy.getSizeZ()-1);

			var text = mcText("정말로 해당지역에 붙여넣기 하시겠습니까?", null, false, null, null, c.w, c.w);
			text.setGravity(Gravity.CENTER);

			main.setMenuVisible(false);

			var dl = new WES_Dialog("주의!", 1, text, "진행", function() {
				highlight.close();
				if(that._parent.get('WorkType') === WorkType.SYNCHRONIZATION) {
					thread(function() {try {
						var size = that.copy.getSizeX()*that.copy.getSizeY()*that.copy.getSizeZ();;
						var load = new CustomProgressBar(6, size, "'붙여넣기'작업중...(0/" + numberToString(size) + ")");
						var pg = 0;
						thread(function() {try {
							while(true) {
								if(size === pg) {
									load.setProgress(pg);
									load.setText("'붙여넣기'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
									sleep(1000);
									load.close();
									break;
								}
								load.setProgress(pg);
								load.setText("'붙여넣기'작업중...(" + numberToString(pg) + "/" + numberToString(size) + ")");
								sleep(100);
							}
						}catch(e) {
							showError(e, WarnType.RECOVERABLE);
						}}).start();
						for(var y = 0; y < that.copy.getSizeY(); y++) {
						for(var z = 0; z < that.copy.getSizeZ(); z++) {
						for(var x = 0; x < that.copy.getSizeX(); x++) {
							var block = that.copy.getBlock(x, y, z);
							Level.setTile(cx+x, cy+y, cz+z, block[0], block[1]);
							pg++;
						}
						}
						}
					}catch(e) {
						showError(e, WarnType.WARNING);
					}}).start();
				}else if(that._parent.setting.WorkType === WorkType.ASYNCHRONOUS) {
					thread(function() {try {
						for(var y = 0; y < that.copy.getSizeY(); y++) {
						for(var z = 0; z < that.copy.getSizeZ(); z++) {
						for(var x = 0; x < that.copy.getSizeX(); x++) {
							var block = that.copy.getBlock(x, y, z);
							that._parent.asynceBuffer.push([cx+x, cy+y, cz+z, block[0], block[1]]);
						sleep(1);
						}
						}
						}
					}catch(e) {
						showError(e, WarnType.WARNING);
					}}).start();
				}else {
					throw new Error("Unknown WorkType: " + that._parent.setting.WorkType);
				}
				this.setVisible(false);
				main.setMenuVisible(true);
			}, "취소", function() {highlight.close();this.setVisible(false);main.setMenuVisible(true)}, false, Gravity.TOP);

			dl.setVisible(true);
			break;



			case EditType.ROTATION:
			if(!(this.copy instanceof Piece)) {
				msg("복사된 블럭이 없습니다");
				return;
			}

			var axis = null;
			var rot = null;

			var lo = new c.l(ctx);
			lo.setOrientation(c.l.VERTICAL);
			var ax = mcButton("X축", null, true, null, null, c.m, DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				axis = "x";
				WES_Toast("X축 방향으로 설정됨");
			}, null);
			lo.addView(ax);
			var ay = mcButton("Y축", null, true, null, null, c.m, DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				axis = "y";
				WES_Toast("Y축 방향으로 설정됨");
			}, null);
			lo.addView(ay);
			var az = mcButton("Z축", null, true, null, null, c.m, DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				axis = "z";
				WES_Toast("Z축 방향으로 설정됨");
			}, null);
			lo.addView(az);

			var lo2 = new c.l(ctx);
			lo2.setOrientation(c.l.VERTICAL);
			var d1 = mcButton("90도", null, true, null, null, c.m, DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				rot = 1;
				WES_Toast("90도 회전으로 설정됨");
			}, null);
			lo2.addView(d1);
			var d2 = mcButton("180도", null, true, null, null, c.m, DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				rot = 2;
				WES_Toast("180도 회전으로 설정됨");
			}, null);
			lo2.addView(d2);
			var d3 = mcButton("270도", null, true, null, null, c.m, DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				rot = 3;
				WES_Toast("270도 회전으로 설정됨");
			}, null);
			lo2.addView(d3);

			var dl2 = new WES_Dialog("회전...", 0, lo2, "시작", function() {try {
				if(rot === null) {
					WES_Toast("회전할 각도를 지정해주세요");
					return false;
				}
				thread(function() {try {
					var load = new CustomProgressBar(5, null, "'회전'작업중...");
					that.copy.rotation(axis, rot);
					load.close();
				}catch(e) {
					showError(e, WarnType.WARNING);
				}}).start();
				this.setVisible(false);
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}, "취소", function() {this.setVisible(false)}, true);

			var dl = new WES_Dialog("회전 축...", 0, lo, "다음", function() {try {
				if(axis === null) {
					WES_Toast("회전할 축을 지정해주세요");
					return false;
				}
				dl2.setVisible(true);
				this.setVisible(false);
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}, "취소", function() {this.setVisible(false)}, true);

			dl.setVisible(true);
			break;



			case EditType.FLIP:
			if(!(this.copy instanceof Piece)) {
				msg("복사된 블럭이 없습니다");
				return;
			}

			var axis = null;

			var lo = new c.l(ctx);
			lo.setOrientation(c.l.VERTICAL);
			var ax = mcButton("X축", null, true, null, null, c.m, DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				axis = "x";
				WES_Toast("X축으로 지정되었습니다");
			}, null);
			lo.addView(ax);
			var ay = mcButton("Y축", null, true, null, null, c.m, DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				axis = "y";
				WES_Toast("Y축으로 지정되었습니다");
			}, null);
			lo.addView(ay);
			var az = mcButton("Z축", null, true, null, null, c.m, DIP*0x28, null, null, Assets.boxNormal.ninePatch(), null, function(view, event) {
				axis = "z";
				WES_Toast("Z축으로 지정되었습니다");
			}, null);
			lo.addView(az);

			var dl = new WES_Dialog("대칭 축...", 0, lo, "시작", function() {try {
				if(axis === null) {
					WES_Toast("대칭축을 설정해주세요");
					return false;
				}
				thread(function() {try {
					var load = new CustomProgressBar(5, null, "'대칭'작업중...");
					that.copy.flip(axis);
					load.close();
				}catch(e) {
					showError(e, WarnType.WARNING);
				}}).start();
				this.setVisible(false);
			}catch(e) {
				showError(e, WarnType.WARNING);
			}}, "취소", function() {this.setVisible(false)}, true);

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



function WES_Dialog(name, type, layout, confirmTxt, confirmFunc, cancelTxt, cancelFunc, focus, gravity) {
	this.vis = false;
	this.name = name;
	this.type = type;
	this.confirmTxt = confirmTxt;
	this.confirmFunc = confirmFunc;
	this.cancelTxt = cancelTxt;
	this.cancelFunc = cancelFunc;
	this.focus = focus;
	this.gravity = gravity === undefined ? null : gravity;
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
					if(that.gravity === null) {
						that.wd.showAtLocation(c.d, Gravity.CENTER, 0, 0);
					}else {
						that.wd.showAtLocation(c.d, that.gravity, 0, 0);
					}
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

		if(this.confirmTxt !== null) {
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
		}

		if(this.cancelTxt !== null) {
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
		}

		switch(this.type) {
			case 1:
			this.title.setBackgroundDrawable(Assets.boxWarning.ninePatch());
			if(this.confirmTxt !== null)
				this.t_confirm.setBackgroundDrawable(Assets.boxWarning.ninePatch());
			if(this.cancelTxt !== null)
				this.t_cancel.setBackgroundDrawable(Assets.boxWarning.ninePatch());
			break;
			case 2:
			this.title.setBackgroundDrawable(Assets.boxCritical.ninePatch());
			if(this.confirmTxt !== null)
				this.t_confirm.setBackgroundDrawable(Assets.boxCritical.ninePatch());
			if(this.cancelTxt !== null)
				this.t_cancel.setBackgroundDrawable(Assets.boxCritical.ninePatch());
			break;
			case 0:
			default:
			this.title.setBackgroundDrawable(Assets.boxNormal.ninePatch());
			if(this.confirmTxt !== null)
				this.t_confirm.setBackgroundDrawable(Assets.boxNormal.ninePatch());
			if(this.cancelTxt !== null)
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
			showError(e, WarnType.WARNING);
			return false;
		}
	},

	cancel: function() {
		try {
			return this.cancelFunc();
		}catch(e) {
			showError(e, WarnType.WARNING);
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
		WES_Toast("위치1 지정됨\nx:" + x + " y:" + y + " z:" + z);
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
		WES_Toast("위치2 지정됨\nx:" + x + " y:" + y + " z:" + z);
	}
}

function destroyBlock(x, y, z, side) {
	if(Player.getCarriedItem() === 271) {
		preventDefault();
	}
}

function chatReceiveHook(str, sender) {
	if(str.subString(0, 1) === "@") {
		var cmd = str.subString(1, str.length).split(" ");
		if(!main.editorGroup.isAllow(sender)) {
			broadcast(sender + " 유저는 월드에딧 권한이 없습니다");
			return;
		}
		var editor = main.editorGroup.get(sender);
		var player = editor.getOwner();
		switch(cmd[0]) {
			case "pos1":
			editor.setPos1(new Vector3(Entity.getX(player), Entity.getY(player), Entity.getZ(player)));
			msg("위치1이 지정되었습니다", player);
			break;
			case "pos2":
			editor.setPos2(new Vector3(Entity.getX(player), Entity.getY(player), Entity.getZ(player)));
			msg("위치2이 지정되었습니다", player);
			break;
		}
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
		this.backup.push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
	}
	for(var e = 0; e < ary.length; e++) {
		var x = ary[e][0];
		var y = ary[e][1];
		var z = ary[e][2];
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

function msg(str, target) {
	if(target === undefined) {
		broadcast(str);
	}else if(EntityExtra.isEqual(Player.getEntity(), target)) {
		toast(str);
	}else {
		broadcast("(" + Player.getName(target) + ") " + str);
	}
}

var blockData = ["0:0", "1:0", "1:1", "1:2", "1:3", "1:4", "1:5", "1:6", "2:0", "3:0", "4:0", "5:0", "5:1", "5:2", "5:3", "5:4", "5:5", "6:0", "6:1", "6:2", "6:3", "6:4", "6:5", "7:0", "8:0", "9:0", "10:0", "11:0", "12:0", "12:1", "13:0", "14:0", "15:0", "16:0", "17:0", "17:1", "17:2", "17:3", "18:0", "18:1", "18:2", "18:3", "19:0", "20:0", "21:0", "22:0", "24:0", "24:1", "24:2", "26:0", "27:0", "30:0", "31:0", "32:0", "35:0", "35:1", "35:2", "35:3", "35:4", "35:5", "35:6", "35:7", "35:8", "35:9", "35:10", "35:11", "35:12", "35:13", "35:14", "35:15", "37:0", "38:0", "38:1", "38:2", "38:3", "38:4", "38:5", "38:6", "38:7", "38:8", "39:0", "40:0", "41:0", "42:0", "43:0", "43:1", "43:2", "43:3", "43:4", "43:5", "43:6", "43:7", "44:0", "44:1", "44:2", "44:3", "44:4", "44:5", "44:6", "44:7", "45:0", "46:0", "47:0", "48:0", "49:0", "50:0", "51:0", "52:0", "53:0", "54:0", "56:0", "57:0", "58:0", "59:0", "60:0", "60:1", "61:0", "62:0", "63:0", "64:0", "65:0", "66:0", "67:0", "68:0", "71:0", "73:0", "74:0", "78:0", "79:0", "80:0", "81:0", "82:0", "83:0", "85:0", "86:0", "87:0", "88:0", "89:0", "90:0", "91:0", "92:0", "95:0", "96:0", "97:0", "97:1", "97:2", "97:3", "97:4", "97:5", "98:0", "98:1", "98:2", "98:3", "99:0", "100:0", "101:0", "102:0", "103:0", "104:0", "105:0", "106:0", "107:0", "108:0", "109:0", "110:0", "111:0", "112:0", "113:0", "114:0", "115:0", "116:0", "117:0", "120:0", "120:15", "121:0", "126:0", "127:0", "128:0", "129:0", "133:0", "134:0", "135:0", "136:0", "139:0", "139:1", "140:0", "141:0", "142:0", "144:0", "145:0", "145:1", "145:2", "152:0", "153:0", "155:0", "155:1", "155:2", "156:0", "157:0", "157:1", "157:2", "157:3", "157:4", "157:5", "158:0", "158:1", "158:2", "158:3", "158:4", "158:5", "158:8", "158:9", "158:10", "158:11", "158:12", "158:13", "159:0", "159:1", "159:2", "159:3", "159:4", "159:5", "159:6", "159:7", "159:8", "159:9", "159:10", "159:11", "159:12", "159:13", "159:14", "159:15", "161:0", "161:1", "162:0", "162:1", "163:0", "164:0", "170:0", "171:0", "171:1", "171:2", "171:3", "171:4", "171:5", "171:6", "171:7", "171:8", "171:9", "171:10", "171:11", "171:12", "171:13", "171:14", "171:15", "172:0", "173:0", "174:0", "175:0", "175:1", "175:2", "175:3", "175:4", "175:5", "183:0", "184:0", "185:0", "186:0", "187:0", "198:0", "243:0", "244:0", "245:0", "246:0", "247:0", "247:1", "247:2", "248:0", "249:0"];

//type -1: No image
//type -2: Custom image
var blockImageData = [
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
["6:1", BlockTypes.GRASS, [["sapling", 1]], false],
["6:2", BlockTypes.GRASS, [["sapling", 2]], false],
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

function loadBlockDescription(id, data) {
	var index = getBlockDataIndex(id, data);
	if(index === -1) {
		return false;
	}
	if(blockImageData[index][4] === null) {
		return false;
	}
	return blockImageData[index][4];
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

	var description = loadBlockDescription(block[0], block[1]);
	if(description !== false) {
		var info = mcText(description, DIP*0x08, true, Color.YELLOW);
		info.setGravity(Gravity.RIGHT);
		var info_p = new c.r.LayoutParams(c.w, c.w);
		info_p.setMargins(0, 0, DIP*0x02, DIP*0x08);
		info_p.addRule(c.r.ALIGN_PARENT_RIGHT);
		info_p.addRule(c.r.ALIGN_PARENT_BOTTOM);
		info.setLayoutParams(info_p);
		layout.addView(info);
	}

	var txt = mcText(key, DIP*0x08, true);
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
	that._parent.blockImageWork = true;

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
	that._parent.blockImageWork = false;
}catch(e) {
	showError(e);
	loading.close();
	that._parent.blockImageWork = false;
}}).start();
}

function reloadBlockImages(that) {thread(function() {try {
	//var loading = new CustomProgressBar(3, that._parent.blockImagesData.length);
	uiThread(function() {try {
	for(var e = 0; e < that._parent.blockImagesData.length; e++) {
			that._parent.blockImagesData[e][2].setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
				var block = (view.getText() + "").split(":");
				that.direct_id.setText(block[0]);
				that.direct_data.setText(block[1]);
			}catch(e) {
				toast("Please wait...");
			}}}));
	}
	}catch(e) {
		showError(e, WarnType.WARNING);
	}});
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
}*/