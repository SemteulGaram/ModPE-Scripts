const NAME = "ScriptAutoLoad";
const NAME_SHORT = "SAL2";
const NAME_CODE = "scriptautoload2";
const VERSION = "2.0.0";
const VERSION_CODE = 200;
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
var Looper = android.os.Looper;
var InputType = android.text.InputType;
var View = android.view.View;
var ViewGroup = android.view.ViewGroup;
var MotionEvent = android.view.MotionEvent;
var Gravity = android.view.Gravity;
var SurfaceView = android.view.SurfaceView;
var SurfaceHolder = android.view.SurfaceHolder;
var aAnimation = android.view.animation;
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
var px = sg.px;



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
	if(sgUtils.D.error === undefined) {
		sgUtils.D.error = [];

		var layout = new sg.rl(ctx);
		layout.setBackgroundColor(sgColors.re500);

		var title = new sg.rl(ctx);
		title.setId(sgUtils.math.randomId());
		title.setBackgroundColor(sgColors.re800);
		var titleP = new sg.rlp(sg.mp, sg.px*0x30);
		titleP.addRule(sg.rl.ALIGN_PARENT_TOP);
		title.setLayoutParams(titleP);

		var titleExit = sgUtils.gui.button("Ignore", sg.px*0x10, false, sgColors.re500, null, Gravity.CENTER, null, null, null, [sg.px*0x2, sg.px*0x2, sg.px*0x2, sg.px*0x2], null, sgColors.re50, null, function(view) {
			sgUtils.D.errorLayout[0].dismiss();
		});
		titleExit.setId(sgUtils.math.randomId());
		var titleExitP = new sg.rlp(sg.px*0x40, sg.mp);
		titleExitP.addRule(sg.rl.ALIGN_PARENT_RIGHT);
		titleExit.setLayoutParams(titleExitP);
		title.addView(titleExit);

		var titleText = sgUtils.gui.textView(NAME + " Error", sg.px*0x10, false, sgColors.re50, null, Gravity.CENTER, null, null, null, [sg.px*0x2, sg.px*0x2, sg.px*0x2, sg.px*0x2]);
		var titleTextP = new sg.rlp(sg.mp, sg.wc);
		titleTextP.addRule(sg.rl.CENTER_VERTICAL);
		titleTextP.addRule(sg.rl.LEFT_OF, titleExit.getId());
		titleText.setLayoutParams(titleTextP);
		title.addView(titleText);

		layout.addView(title);

		var contentScroll = new ScrollView(ctx);
		var contentScrollP = new sg.rlp(sg.mp, sg.wc);
		contentScrollP.addRule(sg.rl.BELOW, title.getId());
		contentScroll.setLayoutParams(contentScrollP);
		var contentLayout = new sg.ll(ctx);
		contentLayout.setOrientation(sg.ll.VERTICAL);

		var contentText = sgUtils.gui.textView("", sg.px*0xa, false, sgColors.re50, null, Gravity.LEFT, null, null, null, [sg.px*0x2, sg.px*0x2, sg.px*0x2, sg.px*0x2]);

		contentLayout.addView(contentText);
		contentScroll.addView(contentLayout);
		layout.addView(contentScroll);

		var wd = new PopupWindow(layout, sg.wc, sg.wc, false);

		sgUtils.D.errorLayout = [wd, titleText, contentText];
	}
	sgUtils.D.error.push(err);

	uiThread(function() {try {
		var index = sgUtils.D.error.length;
		sgUtils.D.errorLayout[1].setText(NAME + " Error " + index);
		sgUtils.D.errorLayout[2].setText(getSgErrorMsg(10) + '');
		if(!sgUtils.D.errorLayout[0].isShowing()) {
			sgUtils.D.errorLayout[0].showAtLocation(sg.dv, Gravity.CENTER, 0, 0);
		}
	}catch(err) {
		toast(err + '');
	}});
}catch(err) {
	toast(err + '');
}}

function getSgErrorMsg(count) {
	var str = "";
	var index = sgUtils.D.error.length;

	for(var e = 0; e < count; e++) {
		if(index < 1) {
			break;
		}
		var err = sgUtils.D.error[index - 1];
		if(err instanceof Error) {
			str += "No." + index + " [JavaScript] " + err.name + "\n" + err.message + "\n" + err.stack + "\n\n";
		}else if(err instanceof java.lang.Error) {
			var sts = '\n' + err.toString();
			var st = err.getStackTrace();
			for(var e = 0; e < st.length; e++) {
				sts += "\n" + st[e].toString();
			}
			str += "No." + index + " [Java]" + sts + "\n\n";
		}else {
			str += "No." + index + " [Undefined]\n" + err + "\n\n";
		}
		index--;
	}
	return str;
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
		if (!(this instanceof arguments.callee)) {var oNew=Object.create(arguments.callee.prototype);arguments.callee.apply(oNew, arguments);return oNew}
		if(pixel instanceof Array) {
			var tmp = new sg.ai(Int.TYPE, pixel.length);
			for(var e = 0; e < pixel.length; e++) {
				var v = parseInt(pixel[e]);
				tmp[e] = v ? v : 0;
			}
			pixel = tmp;
		}
		this.pixel = pixel;
		this.rawBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
		this.rawBitmap.setPixels(this.pixel, 0, width, 0, 0, width, height);
		this.scaleBitmap = Bitmap.createScaledBitmap(this.rawBitmap, width*scale, height*scale, scaleType);
		this.ninePatch = function() {return ninePatch1(this.scaleBitmap, (top*(scale-1))+1, (left*(scale-1))+1, bottom*scale, right*scale)}
	},

	bitmapAssetCreator: function(bitmap, xPos, yPos, xSize, ySize, scale, scaleType, left, top, right, bottom) {
		if (!(this instanceof arguments.callee)) {var oNew=Object.create(arguments.callee.prototype);arguments.callee.apply(oNew, arguments);return oNew}
		this.rawBitmap = Bitmap.createBitmap(bitmap, xPos, yPos, xSize, ySize);
		this.scaleBitmap = Bitmap.createScaledBitmap(this.rawBitmap, xSize*scale, ySize*scale, scaleType);
		this.ninePatch = function() {return ninePatch1(this.scaleBitmap, (top*(scale-1))+1, (left*(scale-1))+1, bottom*scale, right*scale)}
	},

	underline: function(underlineColor, backgroundColor) {
		var p = underlineColor, o = backgroundColor;
		return new this.customAssetCreator([
		o,o,o,o,o,o,o,o,
		o,o,o,o,o,o,o,o,
		o,o,o,o,o,o,o,o,
		o,o,o,o,o,o,o,o,
		o,o,o,o,o,o,o,o,
		o,o,o,o,o,o,o,o,
		o,o,o,o,o,o,o,o,
		o,o,o,p,p,o,o,o
		], 8, 8, sg.px*2, false, 4, 4, 5, 5);
	},

	underlineHighlight: function(underlineColor, backgroundColor, highlightColor) {
		var p = underlineColor, o = backgroundColor, i = highlightColor;
		return new this.customAssetCreator([
		o,o,o,o,o,o,o,o,
		o,o,o,o,o,o,o,o,
		o,o,o,o,o,o,o,o,
		o,o,o,o,o,o,o,o,
		o,o,o,o,o,o,o,o,
		o,o,o,o,o,o,o,o,
		o,o,o,i,i,o,o,o,
		o,o,o,p,p,o,o,o
		], 8, 8, sg.px*2, false, 4, 4, 5, 5);
	},

	stroke: function(strokeColor, backgroundColor) {
		var p = strokeColor, o = backgroundColor;
		return new this.customAssetCreator([
		p,p,p,
		p,o,p,
		p,p,p
		], 3, 3, sg.px*2, false, 2, 2, 2, 2);
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

	D: {},
	//Pointer storage
	//sgUtils.D["progress"] = value;

	C: {}
	//MCPE callback (Not use)
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
	 * @param getMax - sgUtils.D pointer
	 * @param getProgress - sgUtils.D pointer
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
			sgUtils.D[getMax] = input.available();
		}
		if(getProgress !== null && getProgress !== undefined) {
			sgUtils.D[getProgress] = 0;
		}
		var len;
		while((len = bis.read(buffer)) != null) {
			bos.write(buffer, 0, len);
		 if(getProgress !== null && getProgress !== undefined) {
				sgUtils.D[getProgress] += parseInt(len);
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
	 * @param {(String|null|undefined)} getTotalMax - 전체 파일의 갯수 sgUtils.D pointer
	 * @param {(String|null|undefined)} getTotalProgress - 작업완료한 파일의 갯수 sgUtils.D pointer
	 * @param {(String|null|undefined)} getCrtMax - 현재 작업중인 파일의 크기 sgUtils.D pointer
	 * @param {(String|null|undefined)} getCrtProgress - 현재 진행중인 파일의 작업완료 크기 sgUtils.D pointer
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
			sgUtils.D[getTotalMax] = fileList.length;
		}
		if(getTotalProgress !== undefined && getTotalProgress !== null) {
			sgUtils.D[getTotalProgress] = 0;
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
				sgUtils.D[getCrtMax] = fis.available();
			}
			if(getCrtProgress !== undefined && getCrtProgress !== null) {
				sgUtils.D[getCrtProgress] = 0;
			}
			//1024바이트씩 읽어오기
			var buffer = sg.ai(Byte.TYPE, 1024);
			var content;
			while((content = fis.read(buffer)) > 0){
				//ZipOutputStream에다가 파일 쓰기
				zos.write(buffer, 0, content);
				if(getCrtProgress !== undefined && getCrtProgress !== null) {
					sgUtils.D[getCrtProgress] += parseInt(content);
				}
			}
			//다음 파일로
			zos.closeEntry();
			fis.close();
			if(getTotalProgress !== undefined && getTotalProgress !== null) {
				sgUtils.D[getTotalProgress]++;
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
		if (!(this instanceof arguments.callee)) {
			var oNew = Object.create(arguments.callee.prototype);
			arguments.callee.apply(oNew, arguments);
			return oNew
		}

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



//Script auto load 2 code

const SCRIPT_DATA_TYPE = {
		READY_SAVE: 0,
		READY_RUN: 1
}

const SCRIPT_STATE = {
	NOT_LOAD: 0,
	LOADED: 1,
	NO_FILE: 2,
	CAN_NOT_READ: 3
}

const DEFAULT_SETTING = {
	type: "ModPE-SAL2",
	version: VERSION_CODE,
	autoload_enable: true,
	dismiss_button_when_enter_game: true,
	script_list: [], // Type: {path, autoload}
	main_button_top_margins: 20,
	main_button_horizontal_loc: 0,
	main_menu_loc: 0
}

var settingData;
var scriptList; //Type: {id, path, autoload, state}

function main() { //Start point of Script
	this.setting = new Setting(sgUtils.setting);
	try {
		this.scriptManager = new ScriptManager(this.setting.get("script_list"));
	}catch(e) {
		toast("스크립트를 로드하는중에 문제가 발생했습니다.");
		this.scriptManager = new ScriptManager([]);
	}
}


//@param [[path, autoload](, [path, autoload]...)] settingScriptData
function ScriptManager(settingScriptData) {
	if(typeof settingScriptData !== "object")
		throw new TypeException("settingScriptData param must instance of array");
	this.nativeData = settingScriptData;
	this.scriptList = null;
}

ScriptManager.prototype = {

	toString: function() {
		return "[object ScriptManager]";
	},

	init: function() {
		this.scriptList = [];
		for(var i = 0; i < this.nativeData.length; i++) {
			this.scriptList.push(
				new Script(SCRIPT_DATA_TYPE.READY_SAVE, this.nativeData[i]));
		}
	},

	autoloadScripts: function() {
		if(this.scriptList === null) return;
		for(var i = 0; i < this.scriptList.length; i++) {
			if(this.scriptList[i].isAutoload() && this.scriptList[i].isValid()) {
				this.scriptList[i].load();
			}
		}
	},

	saveScripts: function() {
		if(this.scriptList === null) return;

	}
}



function Script(type, data) {
	switch(type) {
	case SCRIPT_DATA_TYPE.READY_SAVE:
		this.script = this.staticParseRun(data);
		break;
	case SCRIPT_DATA_TYPE.READY_RUN:
	default:
		this.script = data;
		break;
	}
}

Script.prototype = {

	toString: function() {
		return "[object Script (" + this.script + ")]";
	},

	staticParseRun: function(data) {
		data.id = new File(data.path).getName()
			+ sgUtils.math.randomId(0, 0xffffffff).toString(16);
		var tmpFile = new File(data.path);
		data.state = tmpFile.exists() ? (tmpFile.canRead() ? SCRIPT_STATE.NOT_LOAD
		 : SCRIPT_STATE.CAN_NOT_READ) : SCRIPT_STATE.NO_FILE;
		return data;
	},

	staticParseSave: function(data) {return {path: data.path, autoload: data.autoload}},

	isValid: function() {return this.exists() && this.canRead()},

	exists: function() {return new File(this.script.path).exists()},

	canRead: function() {return new File(this.script.path).canRead()},

	load: function() {
		var file = new File(this.script.path);
		if(!file.exists()) {
			toast(TAG + " " + file.getName() + " 파일 없음");
		}else if(!file.canRead()){
			toast(TAG + " " + file.getName() + " 파일 읽기 불가");
		}else {
			try {
		    net.zhuoweizhang.mcpelauncher.ScriptManager.loadScript(
					new java.io.FileReader(file), this.script.id);
		  }catch(err) {
		    toast(TAG + " " + file.getName() + " 스크립트 로드에 실패."); //TODO: show error
		  }
		}
	},

	unload: function() {net.zhuoweizhang.mcpelauncher.ScriptManager.removeScript(this.script.id)}
}

function Setting(settingFile) {

	this.file = settingFile;
	this.data = null;

	if(this.file.exists()) {
		this.file.getParentFile().mkDirs();
		new File(this.file.getParentFile(), ".nomedia").createNewFile();
		this.reset();
	}

	this.load();
}



Setting.prototype = {

	get: function(article) {
		return this.data[article];
	},

	set: function(article, value) {
		this.data[article] = value;
	}

	load: function() {
		try {
			salSet = sgUtils.io.loadJSON(this);
		}catch(err) {
			toast(TAG + " 설정값 파일 손상됨.\n설정이 초기화 됩니다.");
			this.reset();
			this.load();
		}
	},

	save: function() {
	  sgUtils.io.saveJSON(this.file, this.data, true);
	},

	reset: function() {
	  this.file.delete();
	  this.file.createNewFile();
	  sgUtils.io.saveJSON(this.file, DEFAULT_SETTING);
	}
}



function SAL_Layout(scriptManager) {
	this.layoutRoot = this;
	this.sm = scriptManager;
	this.mainButton = null;
	this.mainMenu = null;
}

SAL_Layout.prototype = {

	toString: function() {
		return "[object SAL_Layout]";
	},

	mainButton: {
		build: function() {
			//Load button location
			this.topMargins = main.setting.get("main_button_top_margins");
			this.horizontalLoc = main.setting.get("main_button_horizontal_loc") == 0;

			//Setting layout
			this.rootLayout = new RelativeLayout(ctx);

			this.button = new ImageButton(ctx);
			this.button.setPadding(0, 0, 0, 0);
			this.button.setBackgroundColor(Color.RED);
			//this.button.setBackground(); //Background Drawable
			this.button.setLayoutParams(new sg.rlp(px*20, px*80));
			this.button.setGravity(Gravity.CENTER);

			this.button.setOnClickListener(new View.OnClickListener({
				onClick: function(view) {
					layoutRoot.mainMenu.toggle();
				}
			}));

			this.window = new PopupWindow(this.rootLayout, px*20, px*80);
			this.aniRun = false;
		},

		show: function(visible) {
			if(!this.window) this.build();
			var that = this;

			uiThread(function() {try {
				if(visible && !that.window.isShowing()) {
					that.window.showAtLocation(sg.dv, Gravity.LEFT|Gravity.TOP,
						that.leftMargins, that.horizontalLoc ? 0, sg.ww - px*20);
				}else if(!visible && that.window.isShowing()) {
					that.window.dismiss();
				}
			}catch(e) {
				sgError(e);
			}});
		},

		toggle: function() {
			if(this.window === undefined || !this.window.isShowing()) this.show(true)
			else this.show(false);
		}
	},

	mainMenu: {
		build: function() {
			//Fullscreen method
			ctx.getWindow().addFlags(
                android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN |
								andriod.view.WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN);
			sg.dv.setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
              | View.SYSTEM_UI_FLAG_FULLSCREEN);

			this.menuLoc = main.setting.get("main_menu_loc") == 0;

			this.rootLayout = new LinearLayout(ctx);

			this.titleLayout = new RelativeLayout(ctx);
			this.menuLayout = new LinearLayout(ctx);

			this.window = new PopupWindow();

			this.aniRun = false;

			//Build animation
			if(this.menuLoc) {
				this.startAni = new aAnimation.TranslateAnimation(
					aAnimation.Animation.RELATIVE_TO_SELF, -1,
					aAnimation.Animation.RELATIVE_TO_SELF, 0,
					aAnimation.Animation.RELATIVE_TO_SELF, 0,
					aAnimation.Animation.RELATIVE_TO_SELF, 0);
				this.startAni.setDuration(300);
				this.startAni.setFillBefore(true);
				this.startAni.setAnimationListener(new aAnimation.Animation.AnimationListener() {
					onAnimationStart: function(ani) {
						aniRun = true;
					},

					onAnimationEnd: function(ani) {
						aniRun = false;
					}
				});
			}else {

			}

		},

		show: function(visible) {
			if(this.aniRun) return;
			if(!this.window) this.build();
			var that = this;

			uiThread(function() {try {
				if(visible && !that.window.isShowing()) {
					//Show and animate
					that.window.showAtLocation(sg.dv, Gravity.LEFT|Gravity.TOP,
						that.leftMargins, that.horizontalLoc ? 0, sg.ww - px*100);
					that.rootLayout.startAnimation(that.startAni);
				}else if(!visible && that.window.isShowing()) {
					//Remove window after animate
					that.rootLayout.startAnimation(that.endAni);
					new Handler().postDelayed(new Runnable({
						run: function() {
							that.window.dismiss();
						}
					}), 300);
				}
			}catch(e) {
				sgError(e);
			}});
		},

		toggle: function() {
			if(this.window === undefined || !this.window.isShowing()) this.show(true)
			else this.show(false);
		}
	}
}
