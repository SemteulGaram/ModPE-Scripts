/**
 * Copyright 2015 Semteul
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

const NAME = "Method";
const VERSION = "0.1";
const VERSION_CODE = 1;
const TAG = "[Method 0.1]";

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
var c = {};
c.mp = ViewGroup.LayoutParams.MATCH_PARENT;
c.wc = ViewGroup.LayoutParams.WRAP_CONTENT;
c.ai = java.lang.reflect.Array.newInstance;
c.rl = RelativeLayout;
c.ll = LinearLayout;
c.tp = TypedValue.COMPLEX_UNIT_PX;
c.sm = net.zhuoweizhang.mcpelauncher.ScriptManager;
c.ww = ctx.getScreenWidth();//ctx.getWindowManager().getDefaultDisplay().getWidth();
c.wh = ctx.getScreenHeight();//ctx.getWindowManager().getDefaultDisplay().getHeight();
c.dv = ctx.getWindow().getDecorView();
c.px = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());



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
	android.widget.Toast.makeText(ctx, "[" + NAME + " ERROR LINE: " + e.lineNumber + "]" + "\n" + e, android.widget.Toast.LENGTH_LONG).show();
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
		clientMessage(ChatColor.DARK_RED + "[" + NAME + " ERROR LINE: " + e.lineNumber + "]\n" + ChatColor.DARK_RED + c);
	}
}



var sFiles = {}
sFiles.sdcard = Environment.getExternalStorageDirectory();
sFiles.mcpe = new File(sFiles.sdcard, "games/com.mojang");
sFiles.world = new File(sFiles.mcpe, "minecraftWorlds");
sFiles.mod = new File(sFiles.mcpe, "minecraftpe/mods");
sFiles.font = new File(sFiles.mod, "minecraft.ttf");
sFiles.script = new File(sFiles.mod, NAME);
sFiles.setting = new File(sFiles.script, "setting.json");
sFiles.test = new File(sFiles.script, "log.txt");
sFiles.noMedia = new File(sFiles.script, ".nomedia");
sFiles.map = function() {return new File(mfiles.map, Level.getWorldDir())};
sFiles.mapMod = function() {return new File(sFiles.map, Level.getWorldDir() + "/mods")}
sFiles.mapSetting = function() {return new File(sFiles.map, Level.getWorldDir() + "/mods/" + NAME + ".json")}



var sAssets = {
	
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
		this.scaleBitmap = Bitmap.createScaledBitmap(this.raw, xSize*scale, ySize*scale, scaleType);
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



/**
 * sUtils
 * ㄴ io
 *   ㄴ copyFile √
 *   ㄴ setTexture √
 *   ㄴ readFile √
 *   ㄴ writeFile √
 *   ㄴ loadJSON √
 *   ㄴ saveJSON √
 *   ㄴ loadArticle √
 *   ㄴ saveArticle √
 *   ㄴ loadMcpeSetting √
 *   ㄴ saveMcpeSetting √
 * ㄴ convert
 *   ㄴ splitLines √
 *   ㄴ margeArray √
 *   ㄴ viewSide √
 *   ㄴ numberToString √
 *   ㄴ dataSizeToString √
 * ㄴ math
 *   ㄴ randomId
 * ㄴ vector
 *   ㄴ DerectionToVector √
 *   ㄴ VectorToDirection
 *   ㄴ absoluteRange √
 * ㄴ gui
 *   ㄴ mcText √
 *   ㄴ mcButton √
 * ㄴ net
 *   ㄴ download √
 *   ㄴ loadScriptServerData √
 *   ㄴ readContent √
 * ㄴ modPE
 *   ㄴ broadcast √
 * ㄴ android
 *   ㄴ battery √
 *   ㄴ visualizer √
 *   ㄴ bgs √
 *   ㄴ vibrate
 *   ㄴ screenshot (CAN'T FIX)
 *   ㄴ screenBitmap (CAN'T FIX)
 *   ㄴ screenBrightness √
 * (√: Need test)
 */
var sUtils =  {
	
	toString: function() {
		return "[Semteul Utils]";
	},
	
	data: {}//Pointer storage
	//sUtils.data["progress"] = value;
}

sUtils.io = {
	
	toString: function() {
		return "[Semteul Utils - I/O]";
	},
	
	/**
	 * Copy file
	 * 
	 * @param <FIle|String|InputStream> input
	 * @param <File|String>	output
	 * @return <Boolean> success
	 */
	copyFile: function(input, output, getMax, gerProgress) {
		try {
			if(input instanceof String) {
				input = new FileInputStream(new File(input));
			}else if(input instanceof File) {
				input = new FileInputStream(input);
			}else if(!(input instanceof InputStream)) {
				throw new Error("Illegal argument type");
			}
			
			if(output instanceof String) {
				output = new File(output);
			}else if(!(output instanceof File)) {
				throw new Error("Illegal argument type");
			}
			
			if(!input.exists()) return false;
			output.getParentFile().mkdirs();
		
			var bis = new BufferdInputStream(input);
			var fos = new FileOutputStream(output)
			var bos = new BufferdOutputStream(fos);
			var buffer = new c.ai(Byte.TYPE, 4096);
			if(getMax !== null && getMax !== undefined) {
				sUtils.data[getMax] = input.available();
			}
			if(getProgress !== null && getProgress !== undefined) {
				sUtils.data[gerProgress] = 0;
			}
			var len;
			while((len = bis.read(buffer)) != null) {
				bos.write(buffer, 0, len);
			 if(getProgress !== null && getProgress !== undefined) {
					sUtils.data[getProgress] += content;
				}
			}
			input.close();
			fos.close();
			bis.close();
			bos.close();
			return true;
		}catch(e) {
			return false;
		}
	},
	
	/**
	 * Set texture
	 *
	 * @author Semteul
	 * @since 2015-04
	 *
	 * @param {File} prototypeFile
	 * @param {String} innerPath
	 */
	setTexture: function(prototypeFile, innerPath){
		try{
			var bl = new File(sFiles.sdCard, "Android/data/net.zhuoweizhang.mcpelauncher");
			var blPro = new File(sFiles.sdCard, "Android/data/net.zhuoweizhang.mcpelauncher.pro");
			var ex = false;
			if(bl.exists()) {
				var dir = new File(bl, "files/textures/images/" + innerPath);
				dir.getParentFile().mkdirs(); 
				if(this.copyFile(prototypeFile, dir)) ex = true;
			}
			if(blPro.exists()) {
				var dir = new File(blPro, "files/textures/images/" + innerPath);
				dir.getParentFile().mkdirs(); 
				if(this.copyFile(prototypeFile, dir)) ex = true;
			}
			if(!ex) {
				toastL(prototypeFile.getName() + " can't find blocklauncher dir'");
			}
		}catch(e){
			toastL(prototypeFile.getName() + " is not exists");
		}
	},
	
	/**
	 * Read file
	 * 
	 * @author Semteul
	 * @since 2015-10-25
	 * 
	 * @param <File|String|InputStream> file
	 * @return <String[]> lines
	 */
	readFile: function(file) {
		if(file instanceof String) {
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
	 * @param <File|String> file
	 * @param <String[]|string> value
	 * @param <Boolean> create
	 * @return <Boolean> success
	 */
	writeFile: function(file, value, create) {
		if(file instanceof String) {
			file = new File(file);
		}else if(!(file instanceof File)) {
			throw new Error("Illegal argument type");
		}
		
		if((!file.exists()) && create) {
			file.getParentFile().mkdirs();
			file.createNewFile();
		}else if(!file.exists()) {
			throw new Error("File not exists: " + file.getPath());
		}
		
		if(value instanceof String) {
			value = value.split(String.fromCharCode(10));
		}
		
		var fos = new FileOutputStream(file);
		var osw = new OutputStreamWriter(fos);
		
		while(value.length < 1) {
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
	 * Save JSON
	 *
	 * @author CodeInside
	 * @since 2015-09
	 * 
	 * @param <File|String|InputStream> file
	 * @return <Object>
	 */
	loadJSON: function(file) {
		var obj = this.readFile(file);
		obj.join(String.fromCharCode(10));
		return JSON.parse(obj);
	},

	/**
	 * Save JSON
	 *
	 * @author CodeInside
	 * @since 2015-09
	 * 
	 * @param <File|String|InputStream> file
	 * @param <Object> obj
	 * @return <Boolean> success
	 */
	saveJSON: function(file, obj) {
		return this.writeFile(file, JSON.stringify(obj));
	},



	/**
	 * Load Article
	 *
	 * @author Semteul
	 * @since 2015-02
	 *
	 * @param <File|String|InputStream> file
	 * @param <String> article
	 * @return <String> value
	 */
	loadArticle: function(file, article) {
		var values = this.readFile(file);
		if(!(values instanceof Array)) {
			throw new Error("Values isn't instance of Array");
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
	 * @author Semteul
	 * @since 2015-02
	 *
	 * @param <File|String|InputStream> file
	 * @param <String> article
	 * @param <String> value
	 * @return <Boolean> success
	 */
	saveArticle: function(file, article, value) {
		var values = this.readFile(file);
		if(!(values instanceof Array)) {
			throw new Error("Values isn't instance of Array");
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
 * load/save Minecraft Setting
 *
 * @since 2015-04
 * @author CodeInside
 */

/*
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
*/
}
	
	
	
sUtils.convert = {
	
	toString: function() {
		return "[Semteul Utils - Convert]";
	},
	
	/**
	 * Split line
	 * 
	 * @author Semteul
	 * @since 2015-10-24
	 * 
	 * @param <String> content
	 * @return <String>
	 */
	splitLine: function(content){
		var lines = content.split("|"); 
		var str = "";
		for(var e = 0; e < lines.length; e++){
			str += lines[e]+"\n";
		}
		return str;
	},
	
	/**
	 * Marge Array
	 *
	 * @author Semteul
	 * @since 2015-06
	 *
	 * @param (Array) arr1
	 * @param (Array) arr2
	 * @param (Int) margeType <0: Horizontal, 1: Vertical>
	 * @param (Int) width1
	 * @param (Int) height1
	 * @param (Int) width2
	 * @param (Int) height2
	 * @param (...) fillBlank
	 * @return (Array) 
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
	 * @author Semteul
	 * @since 2015-04
	 * 
	 * @param <Float> yaw
	 * @return <String>
	 */
	viewSide: function(yaw) {
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
	},
	
	/**
	 * NumberToString
	 *
	 * @author Senteul
	 * @since 2015-09
	 */
	numberToString: function(number) {
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
	},
	
	/**
	 * DataSizeToString
	 *
	 * @author Semteul
	 * @since 2015-09
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
	
	
	
sUtils.math = {
	
	toString: function() {
		return "[Semteul Utils - Math]";
	},
	
	/**
	 * Random Id
	 *
	 * @author Semteul
	 * @since 2015-10-27
	 *
	 * @param <undefined|Int> _repeat (Do not touch)
	 * @return <Int> randomId
	 */
	randomId: function(_repeat) {
		if(_repeat === undefined) {
			_repeat = 0;
		}
		var num = parseInt(Math.floor(Math.random() * 0xffffff));
		if(sUtils.data._randomId === undefined) {
			sUtils.data._randomId = [];
		}
		if(sUtils.data._randomId.indexOf(num) !== -1) {
			if(_repeat > 10) {
				throw new Error("Can't make a randomId: " + num);
			}
			return this.randomId(++_repeat);
		}
		sUtils.data._randomId.push(num);
		return num;
	},
	
		/**
	 * Left Over
	 *
	 * @author Semteul
	 * @since 2015-10-31
	 *
	 * @param <Number> value
	 * @param <Number> min
	 * @param <Number> max
	 * @return <Number>
	 */
	leftOver: function(value, min, max) {
		var range = (max + 1) - min;
		if(range < 1) throw new Error("'(max + 1) - min' must over then 1");
		while(value < min) value += range;
		while(value > max) value -= range;
		return value;
	}
}
	
	
	
sUtils.vector = {
	
	toString: function() {
		return "[Semteul Utils - Vector]";
	},
	
	/**
	 * Vector(x, y, z) to Direction(yaw, pitch)
	 *
	 * @author ToonRaOn(툰라온)
	 * @since 2015-01
	 * @from NaverCafe :::MCPE KOREA:::
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
	 * @author Semteul
	 * @since 2015-01
	 * 
	 * @param <Float> yaw
	 * @param <Float> pitch
	 * @return <Double[3]> Vector3
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
	 * @author Semteul
	 * @since 2015-01
	 * 
	 * @param <Double> x
	 * @param <Double> y
	 * @param <Double> z
	 * @return <Double[3]> Vector3
	 */
	absoluteRange: function(x, y, z) {
		var rx = x/Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2)+Math.pow(z, 2));
		var ry = y/Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2)+Math.pow(z, 2));
		var rz = z/Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2)+Math.pow(z, 2));
		return [rx, ry, rz];
	}
}
	
	
	
sUtils.gui = {
	
	toString: function() {
		return "[Semteul Utils - GUI]";
	},
	
	/**
	 * mcText
	 * 마인크래프트 스타일의 텍스트뷰를 생성합니다
	 * 
	 * @author Semteul
	 * @since 2015-10-24
	 *
	 * @param {String} str
	 * @param {Int|Float|null} size
	 * @param {Boolean|null} hasShadow
	 * @param {Color|null} color
	 * @param {Color|null} shadowColor
	 * @param {Int|Float|null} width
	 * @param {Int|Float|null} height
	 * @param {Array|null} padding
	 * @param {Array|null} margins
	 * @return {TextView}
	 */
	mcText: function(str, size, hasShadow, color, shadowColor, width, height, padding, margins) {
		var tv = new TextView(ctx);
		tv.setTransformationMethod(null);
		tv.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
		if(sFiles.font.exists()) {
			tv.setTypeface(android.graphics.Typeface.createFromFile(sFiles.font));
		};
		if(str !== null && str !== undefined) {
			tv.setText((str + ""));
		}
		if(size !== null && size !== undefined) {
			tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, size);
		}else {
			tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, c.px*0x10);
		}
		if(color !== null && color !== undefined) {
			tv.setTextColor(color);
		}
		if(hasShadow) {
			if(shadowColor !== null && shadowColor !== undefined) {
				tv.setShadowLayer(1/0xffffffff, c.px*1.3, c.px*1.3, shadowColor);
			}else {
				tv.setShadowLayer(1/0xffffffff, c.px*1.3, c.px*1.3, Color.DKGRAY);
			}
		}
		if(padding !== null && padding !== undefined) {
			tv.setPadding(padding[0], padding[1], padding[2], padding[3]);
		}
		var tv_p;
		if(width !== null && height !== null && width !== undefined && height !== undefined) {
			tv_p = new c.ll.LayoutParams(width, height);
		}else {
			tv_p = new c.ll.LayoutParams(c.wc, c.wc);
		}
		if(margins !== null && margins !== undefined) {
			tv_p.setMargins(margins[0], margins[1], margins[2], margins[3]);
		}
		tv.setLayoutParams(tv_p);
		return tv;
	},
	
	/**
	 * mcButton
	 * 마인크래프트 스타일의 버튼을 생성합니다
	 * 
	 * @author Semteul
	 * @since 2015-10-24
	 *
	 * @param {String} str
	 * @param {Int|Float|null} size
	 * @param {Boolean|null} hasShadow
	 * @param {Color|null} color
	 * @param {Color|null} shadowColor
	 * @param {Int|Float|null} width
	 * @param {Int|Float|null} height
	 * @param {Array|null} padding
	 * @param {Array|null} margins
	 * @param {Drawable|null} background
	 * @param {function(view, event){return Boolean}|null} onTouchFunction
	 * @param {function(view, event)|null} onClickFunction
	 * @param {function(view, event){return Boolean}|null} onLongClickFunction
	 * @return {Button}
	 */
	mcButton: function(str, size, hasShadow, color, shadowColor, width, height, padding, margins, background, onTouchFunction, onClickFunction, onLongClickFunction) {
		var btn = new Button(ctx);
		btn.setTransformationMethod(null);	btn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
		if(sFiles.font.exists()) {
			btn.setTypeface(android.graphics.Typeface.createFromFile(sFiles.font));
		};
		if(str !== null && str !== undefined) {
			btn.setText((str + ""));
		}
		if(size !== null && size !== undefined) {
			btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, size);
		}else {
			btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, c.px*0x10);
		}
		if(color !== null && color !== undefined) {
			btn.setTextColor(color);
		}
		if(hasShadow) {
			if(shadowColor !== null && shadowColor !== undefined) {
				btn.setShadowLayer(1/0xffffffff, c.px*1.3, c.px*1.3, shadowColor);
			}else {
					btn.setShadowLayer(1/0xffffffff, c.px*1.3, c.px*1.3, Color.DKGRAY);
			}
		}
		if(padding !== null && padding !== undefined) {
			btn.setPadding(padding[0], padding[1], padding[2], padding[3]);
		}
		var btn_p;
		if(width !== null && height !== null && width !== undefined && height !== undefined) {
			btn_p = new c.ll.LayoutParams(width, height);
		}else {
			btn_p = new c.ll.LayoutParams(c.wc, c.wc);
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
	}
}
	
	
	
sUtils.net = {
	
	toString: function() {
		return "[Semteul Utils - Net]";
	},
	
	/**
	 * Download file
	 *
	 * @author Semteul
	 * @since 2015-01
	 * 
	 * @param <File> path
	 * @param <String> url
	 * @param <sUtils.data pointer|null> getMax
	 * @param <sUtils.data pointer|null> getProgress
	 * @return <Boolean> success
	 */
	download: function(path, url, getMax, getProgress) {
		try{
			var url = new URL(url);
			var urlConnect = url.openConnection();
			urlConnect.connect();
			var bis = new BufferedInputStream(url.openStream());
			if(getMax !== null || getMax !== undefined) {
				sUtils.data[getMax] = urlConnect.getContentLength();
			}
			var fos = new FileOutputStream(path);
			var buffer = c.ai(Byte.TYPE, 1024);
			var count = 0, content;
			while ((content = bis.read(buffer)) != -1) {
				fos.write(buffer, 0, content);
				count += parseInt(content);
				if(getProgress !== null || getProgress !== undefined) {
					sUtils.data[getProgress] = count;
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
	 * @author Semteul
	 * @since 2015-01
	 * 
	 * =>loadScriptServerData
	 * @param <String> url
	 * @param <sUtils.data pointer|null> pointer
	 * @return <Boolean> success
	 * 
	 * =>ReadContent
	 * @param <sUtils.data pointer|null> pointer
	 * @param <String> article
	 * @return <String|null>
	 */
	loadScriptServerData: function(updateServerUrl, pointer) {
		try{
			var url = new URL(updateServerUrl);
			var netStream = url.openStream();
			var br = new BufferedReader(new InputStreamReader(netStream));
			sUtils.data[pointer] = [];
			var content;
			while ((content = br.readLine()) != null) {
				sUtil.data[pointer].push(content);
			}
			br.close();
			return true;
		}catch(e) {
			return false;
		}
	},

	readContent: function(pointer, article){
		var data = sUtils.data[pointer];
		var content;
		for(var e = 0; e < data.length; e++){
			if(data[e].split(":")[0] == article) {
				return data[e].subString(data[e].strPos(":"), data[e].length);
			}
		}
		return null;
	}
}



sUtils.modPE = {
	
	toString: function() {
		return "[Semteul Utils - ModPE]";
	},
	
	broadcast: function(str){
		c.sm.nativeSendChat(str);
		//clientMessage("<" + Player.getName(Player.getEntity()) + "> " + str);
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
			var list = sUtils.modPE.entityExtra.getAll();
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
			var a = sUtils.modPE.entityExtra.getAll();
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
			var entitys = sUtils.modPE.entityExtra.getAll();
			var list = [];
			for(var e = 0; e < entitys.length; e++) {
				if(Player.isPlayer(entitys[e])) {
					list.push(entitys[e]);
				}
			}
			return list;
		},
		
		isOnline: function(player) {
			var list = sUtils.modPE.entityExtra.getAll();
			for(var e = 0; e < list.length; e++) {
				if(Player.isPlayer(list[e]) && sUtils.modPE.entityExtra.isEqual(list[e], player)) {
					return true;
				}
			}
			return false;
		},
		
		getNearPlayers: function(x, y, z) {
			var a = sUtils.modPE.entityExtra.getAll();
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
		}
	}
}



sUtils.android = {
	
	toString: function() {
		return "[Semteul Utils - Android]";
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
		this.rawNullData = new c.ai(Byte.TYPE, 0);
		//int[]
		this.formattedNullData = new c.ai(Int.type, 0);
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
			that.rawVizData = c.ai(Byte.TYPE, size);
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
		if(sUtils.data._bgs === null) {
			sUtils.data._bgs = [];
		}
		sUtils.data._bgs.push({x: x, y: y, z: z, ent: ent, ct: controler, file: file, session: controler.getAudioSessionId(), vol: vol, range: range, airResistance: airResistance, loop: loop, stopFunc: stopFunc});
		if(sUtils.data._bgsThread === undefined || !sUtils.data._bgsThread.isAlive()) {
			sUtils.data._bgsThread = new thread(function() {try {
				while(true) {
					sUtils.android._bgsManager();
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
		for(var e = 0; e < sUtils.data._bgs.length; e++) {
			if(!sUtils.data._bgs[e].ct.isPlaying()) {
				sUtils.data._bgs[e].ct.release();
				sUtils.data._bgs.splice(e, 1);
				continue;
			}
			if(sUtils.data._bgs[e].stopFunc !== null && sUtils.data._bgs[e].stopFunc(e)) {
				sUtils.data._bgs[e].ct.stop();
				sUtils.data._bgs[e].ct.release();
				sUtils.data._bgs.splice(e, 1);
				continue;
			}
			if(sUtils.data._bgs[e].ent !== null && Entity.getHealth(sUtils.data._bgs[e].ent) <= 0) {
				sUtils.data._bgs[e].ent = null;
			}
			if(sUtils.data._bgs[e].ent !== null) {
				sUtils.data._bgs[e].x = Entity.getX(sUtils.data._bgs[e].ent);
				sUtils.data._bgs[e].y = Entity.getY(sUtils.data._bgs[e].ent);
				sUtils.data._bgs[e].z = Entity.getZ(sUtils.data._bgs[e].ent);
			}
			var v = sUtils.android._bgsMeasure(sUtils.data._bgs[e].x, sUtils.data._bgs[e].y, sUtils.data._bgs[e].z, sUtils.data._bgs[e].range, sUtils.data._bgs[e].airResistance);
			sUtils.data._bgs[e].ct.setVolume(v[0]*sUtils.data._bgs[e].vol, v[1]*sUtils.data._bgs[e].vol);
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
			return [sUtils.android._stereoL(x, y, z, 3 * (range/distance)), sUtils.android.stereoR(x, y, z, 3 * (range/distance))];
		}else {
			if(Math.sqrt(distance - range) * airResistance > 1.2) {
				return [0, 0];
			}
			var l = sUtils.android._stereoL(x, y, z, 3) - (Math.sqrt(distance - range) * airResistance);
			var r = sUtils.android._stereoR(x, y, z, 3) - (Math.sqrt(distance - range) * airResistance);
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
		if(sUtils.data._vib === undefined) {
			sUtils.data._vib = ctx.getSystemService(Context.VIBRATOR_SERVICE);
		}
		sUtils.data._vib.cancel();
		if(repeat === undefined) {
			repeat = 1;
		}
		if(pattern === null || pattern === undefined) {
			sUtils.data._vibThread = null;
			sUtils.data._vibThreadId = null;
			return;
		}else if(typeof pattern === "number") {
			if(repeat === -1) {
				var id = sUtils.math.randomId();
				sUtils.data._vibThreadId = id;
				sUtils.data._vibThread = thread(function() {try {
					while(true) {
						if(sUtils.data._vibThreadId !== id) {
							return;
						}
						sUtils.data._vib.vibrate(0xffff);
						sleep(0xffff);
					}
				}catch(e) {
					showError(e);
				}});
				sUtils.data._vibThread.start();
			}else {
				sUtils.data._vib.vibrate(pattern*repeat);
			}
		}else if(pattern instanceof Array) {
			var id = sUtils.math.randomId();
			sUtils.data._vibThreadId = id;
			sUtils.data._vibThread = thread(function() {try {
				while(repeat-- !== 0) {
					for(var e = 0; e < pattern.length; e++) {
						if(sUtils.data._vibThreadId !== id) {
							return;
						}
						if((e % 2) === 1) {
							sUtils.data._vib.vibrate(pattern[e]);
						}
						sleep(pattern[e]);
					}
				}
			}catch(e) {
				showError(e);
			}});
			sUtils.data._vibThread.start();
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
	sAssets.mcpeCPC = ctx.createPackageContext("com.mojang.minecraftpe", Context.CONTEXT_IGNORE_SECURITY);
	sAssets.nativeAssets = sAssets.mcpeCPC.getAssets();
	try {
		sAssets.SS = ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png");
		sAssets.TG = ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png");
	}catch(e) {
		print("Resource load fail");
		sAssets.SS = sAssets.nativeAssets.open("images/gui/spritesheet.png");
		sAssets.TG = sAssets.nativeAssets.open("images/gui/touchgui.png");
	}
	sAssets.SS_BF = BitmapFactory.decodeStream(sAssets.SS);
	sAssets.TG_BF = BitmapFactory.decodeStream(sAssets.TG);
	
	sAssets.fullBg = sAssets.bitmapAssetCreator(sAssets.SS_BF, 0, 0, 16, 16, c.px*2, false, 5, 5, 12, 12);
	
	sAssets.bg = sAssets.bitmapAssetCreator(sAssets.SS_BF, 34, 43, 14, 14, c.px*2, false, 4, 4, 11, 11);
	
	sAssets.title_l = new sAssets.bitmapAssetCreator(sAssets.TG_BF, 150, 26, 2, 25, c.px*2, false);
	sAssets.title_c = new sAssets.bitmapAssetCreator(sAssets.TG_BF, 153, 26, 8, 25, c.px*2, false);
	sAssets.title_r = new sAssets.bitmapAssetCreator(sAssets.TG_BF, 162, 26, 2, 25, c.px*2, false);
	sAssets.title_b = new sAssets.bitmapAssetCreator(sAssets.TG_BF, 153, 52, 8, 3, c.px*2, false);
	sAssets.title_la = new c.ai(Int.TYPE, 50);
	sAssets.title_ca = new c.ai(Int.TYPE, 200);
	sAssets.title_ra = new c.ai(Int.TYPE, 50);
	sAssets.title_ba = new c.ai(Int.TYPE, 24);
	sAssets.title_l.rawBitmap.getPixels(sAssets.title_la, 0, 2, 0, 0, 2, 25);
	sAssets.title_c.rawBitmap.getPixels(sAssets.title_ca, 0, 8, 0, 0, 8, 25);
	sAssets.title_r.rawBitmap.getPixels(sAssets.title_ra, 0, 2, 0, 0, 2, 25);
	sAssets.title_b.rawBitmap.getPixels(sAssets.title_ba, 0, 3, 0, 0, 3, 25);
	sAssets.title_p1 = sUtils.convert,margeArray(sAssets.title_l, sAssets.title_c, 0, 2, 25, 8, 25, null);
	sAssets.title_p2 = sUtils.convert.margeArray(sAssets.title_p1, sAssets.title_r, 0, 10, 25, 2, 25, null);
	sAssets.title_p3 = sUtils.convert.margeArray(sAssets.title_p2, sAssets.title_b, 1, 12, 25, 8, 3, null);
	sAssets.title = new sAssets.customAssetCreator(sAssets.title_p3, 12, 28, c.px*2, false, 3, 3, 9, 22);
	
	sAssets.exit = new sAssets.bitmapAssetCreator(sAssets.SS_BF, 60, 0, 18, 18, c.px*2, false);
	sAssets.exit_c = new sAssets.bitmapAssetCreator(sAssets.SS_BF, 78, 0, 18, 18, c.px*2, false);
	
	sAssets.button = new sAssets.bitmapAssetCreator(sAssets.SS_BF, 8, 32, 8, 8, c.px*2, false, 1, 2, 7, 6);
	
	sAssets.button_c = new sAssets.bitmapAssetCreator(sAssets.SS_BF, 0, 32, 8, 8, c.px*2, false, 1, 2, 7, 6);
	
	var p = Color.parseColor("#6b6163");
	var o = Color.parseColor("#3a393a");
	sAssets.textView = new sAssets.customAssetCreator([
	b,b,b,b,b,b,
	b,b,b,b,b,b,
	b,b,i,i,b,b,
	b,b,i,i,b,b,
	b,b,b,b,b,b,
	b,b,b,b,b,b
	], 6, 6, c.px*2, false, 3, 3, 4, 4);
	
	sAssets.bg32 = Bitmap.createScaledBitmap(BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/bg32.png")), c.px*64, c.px*64, false)
}catch(e) {
	showError(e);
}}



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

tts.setPitch(3);
tts.setLanguage(java.util.Locale.KOREAN);
tts.setSpeechRate(1.5);

function ttsIt(str, pitch, speed) {
	tts.setPitch(pitch);
	tts.setSpeechRate(speed);
	tts.speak(str, android.speech.tts.TextToSpeech.QUEUE_FLUSH, null);
}



//TEST AREA

var vt = null;
function modTick() {
	var yh = Player.getY();
	if(yh > 60) {
		if(vt !== 1) {
			vt = 1;
			sUtils.android.vibrator(1, -1);
		}
	}else if(yh > 40) {
		if(vt !== 2) {
			vt = 2;
			sUtils.android.vibrator([0, 80, 80], -1);
		}
	}else if(yh > 20) {
		if(vt !== 3) {
			vt = 3;
			sUtils.android.vibrator([0, 80, 80, 80, 760], -1);
		}
	}else {
		if(vt !== 4) {
			vt = 4;
			sUtils.android.vibrator([0, 80, 920], -1);
		}
	}
}

//==========



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