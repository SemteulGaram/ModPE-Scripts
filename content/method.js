/**
 * Copyright 2015 SemteulGaram
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
const NAME_CODE = "method";
const VERSION = "0.0.1";
const VERSION_CODE = 1;
const TAG = "[" + NAME + " " + VERSION + "]";



var ByteBuffer = java.nio.ByteBuffer;
var ByteOrder = java.nio.ByteOrder;

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
var Throwable = java.lang.Throwable;

var URL = java.net.URL;

var ArrayList = java.util.ArrayList;
var Calendar = java.util.Calendar;
var GregorianCalendar = java.util.GregorianCalendar;

var ZipFile = java.util.zip.ZipFile;
var ZipEntry = java.util.zip.ZipEntry;
var ZipOutputStream = java.util.zip.ZipOutputStream;

var NoSuchMethodError = java.lang.NoSuchMethodError;
var UnknownError = java.lang.UnknownError;

var R = android.R;
var Activity = android.app.Activity;
var AlertDialog = android.app.AlertDialog;
var Context = android.content.Context;
var MediaPlayer = android.media.MediaPlayer;
var Environment = android.os.Environment;
var Process = android.os.Process;
var Handler = android.os.Handler;
var InputType = android.text.InputType;
var View = android.view.View;
var ViewGroup = android.view.ViewGroup;
var MotionEvent = android.view.MotionEvent;
var Gravity = android.view.Gravity;
var SurfaceView = android.view.SurfaceView;
var SurfaceHolder = android.view.SurfaceHolder;
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
var Camera = android.graphics.Camera;

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

var GL10 = javax.microedition.khronos.opengles.GL10;
var GLU = android.opengl.GLU;
var GLUtils = android.opengl.GLUtils;
var GLSurfaceView = android.opengl.GLSurfaceView;

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



function sgError(err) {try {
	if(sgUtils.data.error === undefined) {
		sgUtils.data.error = [];

		var layout = new sg.rl(ctx);
		layout.setBackgroundColor(sgColor.re500);

		var title = new sg.rl(ctx);
		title.setId(sgUtils.math.randomId());
		title.setBackgroundColor(sgColor.re800);
		var titleP = new sg.rlp(sg.mp, sg.px*0x30);
		titleP.addRule(sg.rl.ALIGN_PARENT_TOP);
		title.setLayoutParams(titleP);

		var titleExit = sgUtils.gui.button("Ignore", sg.px*0x10, false, sgColors.re500, null, Gravity.CENTER, null, null, null, [sg.px*0x2, sg.px*0x2, sg.px*0x2, sg.px*0x2], null, sgColors.re50, null, function(view) {
			sgUtils.errorLayout[0].dismiss();
		});
		titleExit.setId(sgUtils.math.randomId());
		var titleExitP = new sg.rlp(sg.px*0x40, sg.mp);

		var titleText = sgUtils.gui.textView(NAME + " Error", sg.px*0x10, false, sgColors.re50, null, Gravity.CENTER, null, null, null, [sg.px*0x2, sg.px*0x2, sg.px*0x2, sg.px*0x2]);
		var titleTextP = new sg.rlp(sg.mp, sg.wc);
		titleTextP.addRule(sg.rl.CENTER_VERTICAL);
		titleTextP.addRule(sg.rl.LEFT_OF, titleExit.getId());
		titleText.setLayoutParams(titleTextP);

		var contentScroll = new ScrollView(ctx);
		var contentScrollP = new sg.rl(sg.mp, sg.wc);
		contentScrollP.addRule(sg.rl.BELOW, title.getId());
		contentScroll.setLayoutParams(contentScrollP);
		var contentLayout = new sg.ll(ctx);
		contentLayout.setOrientation(sg.ll.VERTICAL);

		var contentText = sgUtils.gui.textView("", sg.px*0x8, false, sgColor.re50, null, Gravity.LEFT, null, null, null, [sg.px*0x2, sg.px*0x2, sg.px*0x2, sg.px*0x2]);

		contentLayout.addView(contentText);
		contentScroll.addView(contentLayout);
		layout.addView(contentScroll);

		sgUtils.data.errorLayout = [wd, titleText, contentText];
	}

	sgUtils.data.error.push(err);

	var index = sgUtils.data.error.length;

	uiThread(function() {try {
		sgUtils.data.errorLayout[1].setText(NAME + " Error " + index);
		sgUtils.data.errorLayout[2].setText(getSgErrorMsg(10));
		if(!sgUtils.data.errorLayout[0].isShowing()) {
			sgUtils.data.errorLayout[0].showAtLocation(sg.dv, Gravity.CENTER, 0, 0);
		}
	}catch(err) {
		toast(err);
	}});
}catch(err) {
	toast(err);
}

function getSgErrorMsg(count) {
	var str = "";
	var index = sgUtils.data.error.length;

	for(var e = 0; e < count; e++) {
		if(index < 1) {
			break;
		}
		var err = sgUtils.data.error[index - 1];
		if(err instanceof Error) {
			str += "No." + (index--) + " [JavaScript#" + err.lineNumber + "] " + err.name + "\n" + err.message + "\n\n";
		}else if(err instanceof java.lang.Error) {
			var sts = "";
			var st = err.getStackTrace();
			for(var e = 0; e < st.length; e++) {
				sts += st[e].getFileName()  + "/" + st[e].getClassName() + "/" + st[e].getMethodName() + "[#" + st[e].getLineNumber + "]" + "\n" + st[e].toString() "\n";
			}
			str += "No." + (index--) + " [Java]\n" + sts + "\n\n";
		}else {
			str += "No." + (index--) + " [Undefined]\n" + err + "\n\n";
		}
	}
}



var sgUrls = {
	font: "https://www.dropbox.com/s/y1o46b2jkbxwl3o/minecraft.ttf?dl=1"
}



var sgFiles = {}
sgFiles.native = ctx.getFilesDir();
sgFiles.nativeMod = new File(sgFiles.native, "mods");
sgFiles.nativeData = new File(sgFiles.nativeMod, NAME_CODE);
sgFiles.nativeSetting = new File(sgFiles.nativeData, "setting.json");
sgFiles.sdcard = Environment.getExternalStorageDirectory();
sgFiles.mcpe = new File(sgFiles.sdcard, "games/com.mojang");
sgFiles.world = new File(sgFiles.mcpe, "minecraftWorlds");
sgFiles.mod = new File(sgFiles.mcpe, "minecraftpe/mods");
sgFiles.font = new File(sgFiles.nativeMod, "minecraft.ttf");
sgFiles.script = new File(sgFiles.mod, NAME_CODE);
sgFiles.setting = new File(sgFiles.script, "setting.json");
sgFiles.test = new File(sgFiles.script, "log.txt");
sgFiles.noMedia = new File(sgFiles.script, ".nomedia");
sgFiles.map = function() {return new File(mfiles.map, Level.getWorldDir())};
sgFiles.mapMod = function() {return new File(sgFiles.map, Level.getWorldDir() + "/mods")}
sgFiles.mapData = function() {return new File(sgFiles.mapMod(), NAME_CODE)}
sgFiles.mapSetting = function() {return new File(sgFiles.mapData(), "setting.json")}



var sgColors = {
	re50: Color.parseColor("#FFEBEE"),
	re100: Color.parseColor("#FFCDD2"),
	re200: Color.parseColor("#EF9A9A"),
	re300: Color.parseColor("#E57373"),
	re400: Color.parseColor("#EF5350"),
	re500: Color.parseColor("#F44336"),
	re600: Color.parseColor("#E53935"),
	re700: Color.parseColor("#D32F2F"),
	re800: Color.parseColor("#C62828"),
	re900: Color.parseColor("#B71C1C"),
	reA100: Color.parseColor("#FF8A80"),
	reA200: Color.parseColor("#FF5252"),
	reA400: Color.parseColor("#FF1744"),
	reA700: Color.parseColor("#D50000"),
	lg50: Color.parseColor("#F1F8E9"),
	lg100: Color.parseColor("#DCEDC8"),
	lg200: Color.parseColor("#C5E1A5"),
	lg300: Color.parseColor("#AED581"),
	lg400: Color.parseColor("#9CCC65"),
	lg500: Color.parseColor("#8BC34A"),
	lg600: Color.parseColor("#7CB342"),
	lg700: Color.parseColor("#689F38"),
	lg800: Color.parseColor("#558B2F"),
	lg900: Color.parseColor("#33691E"),
	lgA100: Color.parseColor("#CCFF90"),
	lgA200: Color.parseColor("#B2FF59"),
	lgA400: Color.parseColor("#76FF03"),
	lgA700: Color.parseColor("#64DD17")
}



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
 * SemteulGaram Utils
 *
 * sgUtils
 * ㄴ io
 *   ㄴ copyFile √
 *   ㄴ setTexture √
 *   ㄴ readFile
 *   ㄴ writeFile
 *   ㄴ loadJSON
 *   ㄴ saveJSON
 *   ㄴ loadArticle √
 *   ㄴ saveArticle √
 *   ㄴ loadMcpeSetting
 *   ㄴ saveMcpeSetting √
 *   ㄴ zip √
 *   ㄴ unZip √
 *   ㄴ loadZipAsset
 * ㄴ convert
 *   ㄴ splitLines √
 *   ㄴ margeArray √
 *   ㄴ viewSide √
 *   ㄴ numberToString
 *   ㄴ dataSizeToString
 *   ㄴ getCharCodes
 *   ㄴ sort
 *   ㄴ filter
 * ㄴ math
 *   ㄴ randomId
 *   ㄴ leftOver
 *   ㄴ isNumber
 * ㄴ vector
 *   ㄴ DerectionToVector
 *   ㄴ VectorToDirection
 *   ㄴ absoluteRange
 * ㄴ gui
 *   ㄴ textView
 *   ㄴ button
 *   ㄴ mcFastText
 *   ㄴ mcFastButton
 *   ㄴ customToast
 *   ㄴ customProgressBar
 *   ㄴ loadBitmapLayout
 *   ㄴ document √
 * ㄴ net
 *   ㄴ download √
 *   ㄴ loadServerData √
 * ㄴ modPE
 *   ㄴ broadcast
 * ㄴ android
 *   ㄴ battery √
 *   ㄴ visualizer √
 *   ㄴ bgs √
 *   ㄴ vibrate
 *   ㄴ screenshot (CAN'T FIX)
 *   ㄴ screenBitmap (CAN'T FIX)
 *   ㄴ screenBrightness √
 *   ㄴ explore
 * (√: Need test)
 */
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
				sgUtils.data[getProgress] += parseInt(len);
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
	 * @param {String} innerPath - ex."images/mob/steve.png"
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
	 * @author SemteulGaram
	 * @since 2015-10-25
	 *
	 * @param {(File|String|InputStream)} file
	 * @return {String[]} lines
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
	 * @author SemteulGaram
	 * @since 2015-10-25
	 *
	 * @param {(File|String)} file
	 * @param {(String[]|String)} value
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
	 * @param {(File|String|InputStream)} file
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
	 * @param {(File|String|InputStream)} file
	 * @param {Object} obj
 	 * @param {boolean} mkDir
	 * @return {boolean} success
	 */
	saveJSON: function(file, obj, mkDir) {
		return this.writeFile(file, JSON.stringify(obj), mkDir);
	},

	/**
	 * Load Article
	 *
	 * @author SemteulGaram
	 * @since 2015-02
	 *
	 * @param {(File|String|InputStream)} file
	 * @param {String} article
	 * @return {String} value
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
	 * @param {(File|String|InputStream)} file
	 * @param {String} article
	 * @param {String} value
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
	 * @param {String} article
	 * @return {String} value
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
	 * @param {String} article
	 * @param {String} value
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
	 * Zip
	 * 파일이나 디렉토리(내부의 모든 디렉토리 및 파일을 포함한)를 압축합니다
	 *
	 * @author SemteulGaram
	 * @since 2015-03-08
	 * @param {(String|File)} inputPath - 압축을 할 파일 및 폴더
	 * @param {(String|File)} outputPath - 출력할 zip 파일
	 * @param {(String|null|undefined)} getTotalMax - 전체 파일의 갯수 sgUtils.data pointer
	 * @param {(String|null|undefined)} getTotalProgress - 작업완료한 파일의 갯수 sgUtils.data pointer
	 * @param {(String|null|undefined)} getCrtMax - 현재 작업중인 파일의 크기 sgUtils.data pointer
	 * @param {(String|null|undefined)} getCrtProgress - 현재 진행중인 파일의 작업완료 크기 sgUtils.data pointer
	 * @return {Int} - [
	 * 	1 = 성공
	 * 	0 = 입력경로에 파일이 존재하지 않음
	 * 	-1 = 입력경로의 파일들을 읽는데 실패함
	 * ]
	 */
	zip: function(input, output, getTotalMax, getTotalProgress, getCrtMax, getCrtProgress) {
		//입력경로의 문법 확인
		if(input instanceof File){
			var inputPath = input;
		}else if(input instanceof String){
			var inputPath = new File(input);
		}else{
			throw new Error("Illegal argument type");
	 }

	 //입력경로의 파일|폴더 존재 확인
		if(!inputPath.exists()){
			return 0;
		}

		//출력경로의 문법 확인
		if(output instanceof File){
			var outputPath = output;
		}else if(output instanceof String){
			var outputPath = new File(output);
		}else{
			throw new Error("Illegal argument type");
		}

		//출력경로의 존재안하면 생성
		if(!outputPath.getParentFile().exists()) {
			outputPath.mkdirs();
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
				return -1;
			}
		}

		//모든 파일을 등록
		getFiles(inputPath);
		if(getTotalMax !== undefined && getTotalMax !== null) {
			sgUtils.data[getTotalMax] = fileList.length;
		}
		if(getTotalProgress !== undefined && getTotalProgress !== null) {
			sgUtils.data[getTotalProgress] = 0;
		}

		//압축 개시
		var fos = new FileOutputStream(outputPath);
		var zos = new ZipOutputStream(fos);
		for(var e in fileList){
			//파일의 절대경로로부터 상대경로를 구해서 ZipEntry생성
			var ze = new ZipEntry(fileList[e].substring(inputPath.getAbsolutePath().length()+1, fileList[e].getAbsolutePath().length()));
			//ZipOutputStream의 새로운 Entry의 경로 등록
			zos.putNextEntry(ze);
			var fis = new FileInputStream(fileList[e]);
			if(getCrtMax !== undefined && getCrtMax !== null) {
				sgUtils.data[getCrtMax] = fis.available();
			}
			if(getCrtProgress !== undefined && getCrtProgress !== null) {
				sgUtils.data[getCrtProgress] = 0;
			}
			//1024바이트씩 읽어오기
			var buffer = sg.ai(Byte.TYPE, 1024);
			var content;
			while((content = fis.read(buffer)) > 0){
				//ZipOutputStream에다가 파일 쓰기
				zos.write(buffer, 0, content);
				if(getCrtProgress !== undefined && getCrtProgress !== null) {
					sgUtils.data[getCrtProgress] += parseInt(content);
				}
			}
			//다음 파일로
			zos.closeEntry();
			fis.close();
			if(getTotalProgress !== undefined && getTotalProgress !== null) {
				sgUtils.data[getTotalProgress]++;
			}
		}
		//닫기
		zos.close();
		fos.close();
		return 1;
	},

	/**
	 * UnZip
	 * 주어진 압축 파일을 압축 해제 합니다
	 *
	 * @author SemteulGaram
	 * @since 2015-10-16
	 * @param {(String|File)} input - zip 파일의 경로 혹은 파일 객체
	 * @param {(String|File)} output - 압축을 풀 폴더의 경로
	 * @return [
	 * 	1 = 성공
	 * 	0 = 압축파일이 아닙니다
	 * ]
	 */
	unZip: function(input, output) {

		if(input instanceof File) {
			input = input;
		}else if(input instanceof String) {
			input = new File(input);
		}else {
			throw new Error("Illegal argument type");
		}

		if(output instanceof File) {
			output = output;
		}else if(output instanceof String) {
			output = new File(output);
		}else {
			throw new Error("Illegal argument type");
		}

		output.getParentFile().mkdirs();

		try {
			var zip = new ZipFile(input);
			var entries = zip.entries();
		}catch(e) {
			return 0;
		}

		var entrie, outputFile, bis, bos, buf, count;

		while(entries.hasNextElement()) {
			entrie = entries.nextElement();
			outputFile = new File(output, entrie.getName());
			bis = new BufferedInputStream(zip.getInputStream(entrie));
	   bos = new BufferedOutputStream(new FileOutputStream(outputFile));
			buf = sg.ai(Byte.TYPE, 1024);
			count = 0;
			while((count = bis.read(buf)) >= 0){
				bos.write(buf, 0, count);
			}
			bis.close();
			bos.close();
		}
		zip.close();
		return 1;
	},

	/**
	 * LoadZipAsset
	 * 압축파일에서 자료를 빼옵니다
	 *
	 * @author SemteulGaram
	 * @since 2015-12-06
	 *
	 * @param {(File|String)} file
	 * return this
	 */
	loadZipAsset: function(file) {
		if (!(this instanceof arguments.callee)) return new arguments.callee(file);

		/**
		 * @param {String} innerPath
		 * @return {(InputStream|number)} -
		 * 	0 = This is not zip file OR This zip is closed
		 * 	-1 = Something wrong on read zip file
		 * 	-2 = unknown innerPath
		 */
		this.getStream = function(innerPath) {
			if(this.zf === null) {
				return 0;
			}
			try {
				var ent = this.zf.entries();
				var entrie;
				while(ent.hasMoreElements()) {
					entrie = ent.nextElement();
					if(entrie.getName() == innerPath) {
						return this.zf.getInputStream(entrie);
					}ent.getNextElement
				}
				return -2;
			}catch(err) {
				showError(err);
				return -1;
			}
		}

		this.close = function() {
			this.zf.close();
			this.zf = null;
		}

		//파일 인식
		if(file instanceof File) {
			this.file = file
		}else if(input instanceof String) {
			this.file = new File(file);
		}else {
			throw new Error("Illegal argument type");
		}

		try {
			this.zf = new ZipFile(file);
		}catch(e) {
			this.zf = null;
		}
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
	 * @param {String} cutter
	 * @param {String} content
	 * @return {String}
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
	 * @param {number} yaw
	 * @param {number} type
	 * @return {string} direction
	 */
	viewSide: function(yaw, type) {
		var temp = sgUtils.math.leftOver(yaw, 0, 360);
		switch(type) {
			case 1:
			if((temp >= 0 && temp < 11.25) || (temp >= 348.75 && temp < 360))
				return "북";
			else if(temp >= 11.25 && temp < 33.75)
				return "북북동";
			else if(temp >= 33.75 && temp < 56.25)
				return "북동";
			else if(temp >= 56.25 && temp < 78.75)
				return "북동동";
			else if(temp >= 78.75 && temp < 101.25)
				return "동";
			else if(temp >= 101.25 && temp < 123.75)
				return "남동동";
			else if(temp >= 123.75 && temp < 146.25)
				return "남동";
			else if(temp >= 146.25 && temp < 168.75)
				return "남남동";
			else if(temp >= 168.75 && temp < 191.25)
				return "남";
			else if(temp >= 191.25 && temp < 213.75)
				return "남남서";
			else if(temp >= 213.75 && temp < 236.25)
				return "남서";
			else if(temp >= 236.25 && temp < 258.75)
				return "남서서";
			else if(temp >= 258.75 && temp < 281.25)
				return "서";
			else if(temp >= 281.25 && temp < 303.75)
				return "북서서";
			else if(temp >= 303.75 && temp < 326.25)
				return "북서";
			else if(temp >= 326.25 && temp < 348.75)
				return "북북서";
			break;

			default:
			if((temp >= 0 && temp < 45) || (temp >= 315 && temp < 360))
				return "Z+";
			else if(temp >= 45 && temp < 135)
				return "X-";
			else if(temp >= 135 && temp < 225)
				return "Z-";
			else if(temp >= 225 && temp < 315)
				return "X+";
		}
		return "NaY";
	},

	/**
	 * NumberToString
	 *
	 * @author SenteulGaram
	 * @since 2015-09
	 *
	 * @param number
	 * @return {String}
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
	 * @return {String}
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
	},

	/**
	 * Get CharCodes
	 *
	 * @author SemteulGaram
	 * @since 2015-12-19
	 *
	 * @param {String[]} str
	 * @return {Int[]}
	 */
	getCharCodes: function(str) {
		str = str + "";
		var sResult = [];
		for(var e = 0; e < str.length; e++) {
			sResult.push(str.charCodeAt(e));
		}
		return sResult;
	},

	/**
	 * Sort
	 *
	 * @author SemteulGaram
	 * @since 2015-12-19
	 *
	 * @param {(String[]|File[])} elements
	 * @param {int} sortType - [
	 * 	0: CharCode
	 * 	1: Alphabet
	 * 	]
	 * @return {(String[]|File[])}
	 */
	sort: function(elements, sortType) {
		var sResult = []; //최종결과
		var _sort = function(ary, pos) { //내부 재귀함수
			while(ary.length > 0) { //없어질때까지 반복
				var tempCode = [];
				var tempIndex = [];
				var min = null;
				for(var e = 0; e < ary.length; e++) {
					if(ary[e][0][pos] === undefined) { //파일 이름길이가 끝이면 그냥 최종결과로 넘기기
						sResult.push(ary[e][1]);
						ary.splice(e, 1);
						e--;
						continue;
					}else if(min === null) { //만약 루프의 처음이면 최초 설정
						min = ary[e][0][pos];
						tempCode.push(ary[e]);
						tempIndex.push(e);
					}else if(min === ary[e][0][pos]) { //등록된 값이랑 같은 코드의 문자열이면
						tempCode.push(ary[e]);
						tempIndex.push(e);
					}else if(min > ary[e][0][pos]) { //등록된 값보다 작은(우선순위의) 코드의 문자열이면
						min = ary[e][0][pos];
						tempCode = []; //초기화 후 우선순위 먼저 등록
						tempIndex = [];
						tempCode.push(ary[e]);
						tempIndex.push(e);
					}
				}
				for(var e = tempIndex.length - 1; e >= 0; e--) { //뒤에서부터 반복 (그래야 인덱스가 안꼬임)
					ary.splice(tempIndex[e], 1); //사용된 번호들을 삭제
				}
				tempIndex = [];
				if(tempCode.length === 0) {
					if(ary.length !== 0) {
						throw new Error("Sort Error: Unknown error"); //Never happen
					}
				}else if(tempCode.length === 1) { //결과가 하나면 최종결과에 등록
					sResult.push(tempCode[0][1]);
					tempCode = [];
				}else { //결과가 여러개면
					_sort(tempCode, pos + 1); //재귀함수
					tempCode = [];
				}
			}
		}
		var dat = [], name;
		switch(sortType) {

			case 1:
			for(var e = 0; e < elements.length; e++) {
				if(elements[e] instanceof File) {
					name = (elements[e].getName() + "").toLowerCase();
				}else {
					name = (elements[e] + "").toLowerCase();
				}
				dat.push([sgUtils.convert.getCharCodes(name), elements[e]]);
			}
			_sort(dat, 0);
			break;

			default:
			for(var e = 0; e < elements.length; e++) {
				if(elements[e] instanceof File) { //문자열로 변환
					name = elements[e].getName() + "";
				}else {
					name = elements[e] + "";
				}
				dat.push([sgUtils.convert.getCharCodes(name), elements[e]]); //배열에 Char 배열과 내용물들을 등록
			}
			_sort(dat, 0);
		}
		return sResult;
	},

	/**
	 * Filter
	 *
	 * @author SemteulGaram
	 * @since 2015-12-27
	 *
	 * @param {(String[]|File[])} list
	 * @param {Int} type -
	 * {
	 * 1: Contain
	 * 2: Contain in front
	 * 3: Contain in Back
 	 * }
	 * @param {String} str
	 */
	filter: function(list, type, str) {

		var names = [];
		var result = [];

		for(var e = 0; e < list.length; e++) {
			if(list[e] instanceof File) {
				names[e] = list[e].getName();
			}else {
				names[e] = list[e] + "";
			}
		}

		switch(type) {
			case 1:
				for(var e = 0; e < names.length; e++) {
					if(names[e].indexOf(str) >= 0) {
						result.push(list[e]);
					}
				}
				break;
			case 2:
				for(var e = 0; e < names.length; e++) {
					if(names[e].indexOf(str) === 0) {
						result.push(list[e]);
					}
				}
				break;
			case 3:
				for(var e = 0; e < names.length; e++) {
					var index = names[e].indexOf(str);
					if(index >= 0 && index === (names[e].length - str.length)) {
						result.push(list[e]);
					}
				}
				break;
			default: throw new Error("sgUtils.convert.filter - type parameter is unknown: " + type);
		}

		return result;
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
	 * @param {String} number
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
	 * TextView
	 * 메소드 하나로 끝내는 텍스트뷰 생성
	 *
	 * @author SemteulGaram
	 * @since 2015-12-27
	 *
	 * @param {(String|null)} str
	 * @param {(number|null)} size
	 * @param {(boolean|null)} hasShadow
	 * @param {(Color|null)} color
	 * @param {(Color|null)} shadowColor
	 * @param {(Int|null)} gravity
	 * @param {(File|null)} font
	 * @param {(number|null)} width
	 * @param {(number|null)} height
	 * @param {(Array|null)} padding
	 * @param {(Array|null)} margins
	 * @param {(Drawable|Color|null)} background
	 * @return {TextView}
	 */
	textView: function(str, size, hasShadow, color, shadowColor, gravity, font, width, height, padding, margins, background) {
		var tv = new TextView(ctx);
		tv.setTransformationMethod(null);
		tv.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
		if(font !== null && font !== undefined) {
			if(font.exists()) {
				tv.setTypeface(android.graphics.Typeface.createFromFile(font));
			}
		}
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
		if(gravity !== null && gravity !== undefined) {
			tv.setGravity(gravity);
		}
		if(background instanceof Drawable) {
			tv.setBackground(background);
		}else if(background instanceof Color) {
			tv.setBackgroundColor(background);
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
	 * Button
	 * 메소드 하나로 끝내는 버튼 생성
	 *
	 * @author SemteulGaram
	 * @since 2015-10-24
	 *
	 * @param {String} str
	 * @param {(number|null)} size
	 * @param {(boolean|null)} hasShadow
	 * @param {(Color|null)} color
	 * @param {(Color|null)} shadowColor
	 * @param {(Int|null)} gravity
	 * @param {(File|null)} font
	 * @param {(number|null)} width
	 * @param {(number|null)} height
	 * @param {(Array|null)} padding
	 * @param {(Array|null)} margins
	 * @param {(Drawable|Color|null)} background
	 * @param {(function|null)} onTouchFunction - ex.function(view, event){return Boolean}
	 * @param {(function|null)} onClickFunction - ex.function(view)
	 * @param {(function|null)} onLongClickFunction - ex.function(view){return Boolean}
	 * @return {Button}
	 */
	button: function(str, size, hasShadow, color, shadowColor, gravity, font, width, height, padding, margins, background, onTouchFunction, onClickFunction, onLongClickFunction) {
		var btn = new Button(ctx);
		btn.setTransformationMethod(null);	btn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
		if(font !== null && font !== undefined) {
			if(font.exists()) {
				tv.setTypeface(android.graphics.Typeface.createFromFile(font));
			}
		}
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
		if(gravity !== null && gravity !== undefined) {
			btn.setGravity(gravity);
		}
		if(background instanceof Drawable) {
			btn.setBackground(background);
		}else if(background instanceof Color) {
			btn.setBackgroundColor(background);
		}
		if(onTouchFunction !== null && onTouchFunction !== undefined) {
			btn.setOnTouchListener(View.OnTouchListener({onTouch: function(view, event) {try {
				return onTouchFunction(view, event);
			}catch(err) {
				showError(err);
				return false;
			}}}));
		}
		if(onClickFunction !== null && onClickFunction !== undefined) {
			btn.setOnClickListener(View.OnClickListener({onClick: function(view) {try {
				onClickFunction(view);
			}catch(err) {
				showError(err);
			}}}));
		}
		if(onLongClickFunction !== null && onLongClickFunction !== undefined) {
					btn.setOnLongClickListener(View.OnLongClickListener({onLongClick: function(view) {try {
				return onLongClickFunction(view);
			}catch(err) {
				showError(err);
				return false;
			}}}));
		}
		return btn;
	},

	/**
	 * mcFastText
	 * 마인크래프트 스타일의 텍스트뷰를 생성합니다
	 *
	 * @author SemteulGaram
	 * @since 2015-10-24
	 *
	 * @param {(String|null)} str
	 * @param {(number|null)} size
	 * @param {(boolean|null)} hasShadow
	 * @param {(Color|null)} color
	 * @param {(Color|null)} shadowColor
	 * @param {(number|null)} width
	 * @param {(number|null)} height
	 * @param {(Array|null)} padding
	 * @param {(Array|null)} margins
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
	 * @param {String} str
	 * @param {(number|null)} size
	 * @param {(boolean|null)} hasShadow
	 * @param {(Color|null)} color
	 * @param {(Color|null)} shadowColor
	 * @param {(number|null)} width
	 * @param {(number|null)} height
	 * @param {(Array|null)} padding
	 * @param {(Array|null)} margins
	 * @param {(Drawable|null)} background
	 * @param {(function|null)} onTouchFunction - ex.function(view, event){return Boolean}
	 * @param {(function|null)} onClickFunction - function(view, event)
	 * @param {(function|null)} onLongClickFunction - function(view, event){return Boolean}
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
	 * @param {String} text
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
	},

	/**
	 * Load Bitmap to Layout
	 *
	 * @author SemteulGaram
	 * @since 2015-11-27
	 *
	 * @param {(File|String|InputStream)} image
	 * @return {RelativeLayout} bitmap
	 */
	loadBitmapLayout: function(image) {
		var lo = new sg.rl(ctx);
		lo.setGravity(Gravity.CENTER);

		if(image instanceof String) {
			image = new File(image);
		}

		if(image instanceof File) {
			if(!image.exists()) {
				var er = sgUtils.gui.mcFastText("Image not found\n\n" + imageFile.getPath(), sg.px*0x8, false, Color.RED);
				er.setGravity(Gravity.CENTER);
				lo.addView(er);
			}else {
				var bm = BitmapFactory.decodeFile(image.getAbsolutePath());
				var iv = new ImageView(ctx);
				iv.setImageBitmap(bm);
				lo.addView(iv);
			}
		}else if(image instanceof InputStream) {
			var bm = BitmapFactory.decodeStream(image);
			var iv = new ImageView(ctx);
			iv.setImageBitmap(bm);
			lo.addView(iv);
		}else {
			var er = sgUtils.gui.mcFastText("This isn't instance of Image\n\n" + image, sg.px*0x8, false, Color.RED);
			er.setGravity(Gravity.CENTER);
			lo.addView(er);
		}
		return lo;
	},

	/**
	 * Document
	 * 간단한 레이아웃 생성
	 *
	 * @author SemteulGaram
	 * @since 2015-12-07
	 *
	 * @param {String[]} documents
	 * @return {LinearLayout} layout
	 */
	document: function(documents, gravity, padding) {
		if(gravity === undefined) {
			gravity = Gravity.LEFT;
		}
		if(padding === undefined) {
			padding = [0, 0, 0, 0];
		}

		var layout = new sg.ll(ctx);
		layout.setOrientation(sg.ll.VERTICAL);
		layout.setGravity(gravity);

		var doc;
		while((doc = documents.shift()) !== undefined) {
			if(!Array.isArray(doc)) {
				doc = doc.split("|");
			}
			switch(doc[0]) {
				case "t"://Text
				var size = sg.px*0x10, color = Color.WHITE, shadow = false;
				if(doc.length > 2) {
					size = parseInt(doc[2]);
					color = Color.parseColor(doc[3]);
					shadow = doc[4] == true;
				}
				var tv = new sgUtils.gui.mcFastText(doc[1], size, shadow, color, null, null, null, padding);
				layout.addView(tv);
				break;
				case "i"://Image(path, File, InputStream)
				var iv = sgUtils.gui.loadBitmapLayout(doc[1]);
				iv.setPadding(padding[0], padding[1], padding[2], padding[3]);
				layout.addView(iv);
				break;
				default:
				continue;
			}
		}
		return layout;
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
	 * @param {String} url
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
	 * Server data
	 *
	 * @author SemteulGaram
	 * @since 2015-01
	 *
	 * @param {String} serverUrl
	 * @return {(boolean|string)} success
	 */
	loadServerData: function(serverUrl) {
		try{
			var url = new URL(serverUrl);
			var netStream = url.openStream();
			var br = new BufferedReader(new InputStreamReader(netStream));
			var dat = "";
			var content;
			while ((content = br.readLine()) != null) {
				if (dat !== "") {
					dat += "\n";
				}
				dat += content;
			}
			br.close();
			return dat;
		}catch(err) {
			return false;
		}
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
  * @author SemteulGaram
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

	//convert Java to Javascript by [SemteulGaram]

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
	 * @author SemteulGaram
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
	 * @author SemteulGaram
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
	 * @author SemteulGaram
	 * @since 2015-10-30
	 *
	 * @param <File> file
	 * @param <View|undefined> view
	 * (undefined = Full screen)
	 */
	//THIS METHOD ISN'T WORK ON FULL SCREEN
	screenshot: function(file, view) {
		throw new NoSuchMethodError("This method isn't implement");
	},

	/**
	 * ScreenBitmap
	 *
	 * @author SemteulGaram
	 * @since 2015-10-30
	 *
	 * @param <View|undefined> view
	 * (undefined = Full screen)
	 * @return <Bitmap>
	 */
	//THIS METHOD ISN'T WORK ON FULL SCREEM
	screenBitmap: function(view) {
		throw new NoSuchMethodError("This method isn't implement");
	},

	/**
	 * Screen brightness
	 *
	 * @author SemteulGaram
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
	},

	explore: function(dir, rootDir, fileFilter) {

		this.getName = function() {
			return this.currentDir.getName();
		}

		this.getDir = function() {
			return this.currentDir;
		}

		this.getFileList = function() {
			return sgUtils.convert.sort(this.currentDir.getFileList(), 1);
		}

		this.goParent = function() {
			if(this.currentDir.getAbsolutePath() == this.rootDir.getAbsolutePath()) {
				return false;
			}
			this.currentDir = this.currentDir.getParentFile();
			return true;
		}

		this.move = function(dir) {
			if(!dir.isDirectory()) {
				return false;
			}
			this.currentDir = dir;
			return true;
		}

		this.currentDir = dir;
		this.rootDir = rootDir;
		this.filter = fileFilter;
	}
}

sgUtils.openGL = {

	toString: function() {
		return "[sgUtils - OpenGL]";
	},

	getFloatBuffer: function(ary) {
		var buffer = new ByteBuffer.allocateDirect(ary.length*4);
		buffer.order(ByteOrder.nativeOrder());
		var buffer = buffer.asFloatBuffer();
		buffer.put(ary);
		buffer.position(0);
		return buffer;
	},

	getByteBuffer: function(ary) {
		var buffer = new ByteBuffer.allocateDirect(ary.length);
		buffer.put(array);
		buffer.position(0);
		return buffer;
	},

	area: function() {

		//Type 0
		this.addNative: function(vertexAry, indiceAry, colorAry) {
			this.blocks.push([0, vertexAry, indiceAry, colorAry]);
			this.ready = false;
		}
		/*
		this.addBlock = function(x, y, z) {
			this.removeBlock(x, y, z);
			this.blocks.push([x, y, z]);
		}

		this.removeBlock = function(x, y, z) {
			var index = this.getIndex(x, y, z);
			if(index !== -1) {
				this.blocks.splice(index, 1);
			}
		}

		this.searchBlock = function(type, value) {
			var result = [];
			switch(type) {
				case "x":
				case 0:
				type = 0;
				case "y":
				case 1:
				type = 1;
				case "z":
				case 2:
				type = 2;
				break;
				default:
				throw new Error("Unknown sgUtils.openGL.area.searchBlock - type");
			}

			for(var e = 0; e < this.blocks.length; e++) {
				if(this.blocks[e][type] === value) {
					result.push(e);
				}
			}
			return result;
		}

		this.getIndex = function(x, y, z) {
			return this.blocks.indexOf([x, y, z]);
		}
		*/
		this.getVertices = function() {
			if(!this.ready) {
				this.build();
			}
			return this.vertices;
		}

   this.getIndices = function() {
   	if(!this.ready) {
				this.build();
			}
			return this.indeces;
   }

   this.getColors = function() {
   	if(!this.ready) {
				this.build();
			}
			return this.colors;
   }

   this.geyIndicesLength = function() {
   	if(!this.ready) {
   		this.build();
   	}
   	return this.idcAry.length;
   }

   this.build = function() {
   	var vtx = [];
   	var idc = [];
   	var clr = [];
   	for(var e = 0; e < this.blocks.length; e++) {
   		var bl = this.blocks[e];
   		switch(bl[0]) {
   			case 0:
   			vtx.concat(bl[1]);
   			idc.concat(bl[2]);
   			clr.concat(bl[3]);
   			break;
   			default: throw new Error("Unknown sgUtils.openGL.area.build - type (index: " + e + ")");
   		}
   	}
   	this.vtxAry = vtx;
   	this.idcAry = idc;
   	this.clrAry = clr;
   	this.vertexs = sgUtils.openGL.getFloatBuffer(vtx);
   	this.indices = sgUtils.openGL.getByteBuffer(idc);
   	this.colors = sgUtils.openGL.getFloatBuffer(clr);
   	this.ready = true;
   }

		this.ready = false;
		this.blocks = [];
		this.vertexs = null;
		this.indices = null;
		this.colors = null;
		this.vtxAry = [];
		this.incAry = [];
		this.clrAry = [];
	},

	camera: function(area) {
		if(!(area instanceof sgUtils.openGL.area)) {
			throw new Error("sgUtils.openGL.camera - area parameter must instance of sgUtils.openGL.area");
		}

		this.rot = function(x, y, z) {
			this.xRot = x;
			this.yRot = y;
			this.zRot = z;
		}

		this.move = function(x, y, z) {

		}

		this.area = area;
		this.xRot = 0;
		this.yRot = 0;
		this.zRot = 0;
	}
}

function onActivityResult(requestCode, resultCode, data) {
	if (requestCode == 1) {
		if (resultCode != Activity.RESULT_OK) {
			toast("user_cancel");
			return;
		}
		toast("user_pass");
		sgUtils.data._mediaProjection = sgUtils.data._mediaProjectionService.getMediaProjection(resultCode, data);
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
	sgAssets.title_b.rawBitmap.getPixels(sgAssets.title_ba, 0, 3, 0, 0, 3, 25);
	sgAssets.title_p1 = sgUtils.convert,margeArray(sgAssets.title_l, sgAssets.title_c, 0, 2, 25, 8, 25, null);
	sgAssets.title_p2 = sgUtils.convert.margeArray(sgAssets.title_p1, sgAssets.title_r, 0, 10, 25, 2, 25, null);
	sgAssets.title_p3 = sgUtils.convert.margeArray(sgAssets.title_p2, sgAssets.title_b, 1, 12, 25, 8, 3, null);
	sgAssets.title = new sgAssets.customAssetCreator(sgAssets.title_p3, 12, 28, sg.px*2, false, 3, 3, 9, 22);

	sgAssets.exit = new sgAssets.bitmapAssetCreator(sgAssets.SS_BF, 60, 0, 18, 18, sg.px*2, false);
	sgAssets.exit_c = new sgAssets.bitmapAssetCreator(sgAssets.SS_BF, 78, 0, 18, 18, sg.px*2, false);

	sgAssets.button = new sgAssets.bitmapAssetCreator(sgAssets.SS_BF, 8, 32, 8, 8, sg.px*2, false, 1, 2, 7, 6);

	sgAssets.button_c = new sgAssets.bitmapAssetCreator(sgAssets.SS_BF, 0, 32, 8, 8, sg.px*2, false, 1, 2, 7, 6);

	var p = Color.parseColor("#6b6163");
	var o = Color.parseColor("#3a393a");
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
/*
thread(function() {try {
	sleep(3000);
	sgUtils.gui.toast("Hello");
	sleep(1000);
	sgUtils.gui.toast("World", null, null, true);
	sleep(500);
	sgUtils.gui.toast(":p");
	ctx.scriptErrorCallback("System", new java.lang.Error("관리자가 이탈했습니다"));
}catch(err) {
	showError(err);
}});
uiThread(function() {try {
	var za = sgUtils.io.loadZipAsset(new File(sgFiles.sdcard, "test.zip"));
	var bm = za.getStream("image.png");
	if(typeof bm === "number") {
		sgUtils.gui.toast(bm);
	}else {
		var wd = new PopupWindow(sgUtils.gui.loadBitmapLayout(bm), sg.wc, sg.wc, false);
		//wd.showAtLocation(sg.dv, 0, 0, 0);
	}
}catch(err) {
	showError(err);
}});

var cDir = new sgUtils.android.explore(sgFiles.sdcard, sgFiles.sdcard, null);

function procCmd(cmd) {
	if(cmd === "/") {
		if(cDir.goParent()) {
			clientMessage("PATH: " + (cDir.getDir().getAbsolutePath()));
		}else {
			clientMessage("This is root");
		}
		return;
	}
	var file = new File(cDir.getDir(), cmd);
	if(file.exists()) {
		if(cDir.move(file)) {
			clientMessage("PATH: " + (cDir.getDir().getAbsolutePath()));
		}else {
			clientMessage("Can't");
		}
		return;
	}else {
		clientMessage("no exists");
	}
}


var vt = null;
function modTick() {
	var yh = Player.getY();
	if(yh > 60) {
		if(vt !== 1) {
			vt = 1;
			sgUtils.android.vibrator(1, -1);
		}
	}else if(yh > 40) {
		if(vt !== 2) {
			vt = 2;
			sgUtils.android.vibrator([0, 80, 80], -1);
		}
	}else if(yh > 20) {
		if(vt !== 3) {
			vt = 3;
			sgUtils.android.vibrator([0, 80, 80, 80, 760], -1);
		}
	}else {
		if(vt !== 4) {
			vt = 4;
			sgUtils.android.vibrator([0, 80, 920], -1);
		}
	}
}*/

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
