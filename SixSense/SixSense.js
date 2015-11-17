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

const NAME = "SixSense";
const VERSION = "0.1";
const VERSION_CODE = 1;
const TAG = "[SixSense 0.1]";

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



var sUtils =  {
	
	toString: function() {
		return "[Semteul Utils]";
	},
	
	data: {}//Pointer storage
	//sUtils.data["progress"] = value;
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
	}
}

sUtils.modPE = {
	
	toString: function() {
		return "[Semteul Utils - ModPE]";
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
				r[e] = (Math.sqrt(Math.pow(Entity.getX(a[e])-x, 2)+Math.pow(Entity.getY(a[e])-y, 2)+Math.pow(Entity.getZ(a[e])-z, 2)));
			}
			while(r.length > 0) {
				var i = r.indexOf(Math.min.apply(null, r));
				n.push(a[i]);
				r.splice(i, 1);
				a.splice(i, 1);
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
	}
}

var run = false;
var mode = 0;

function newLevel() {
	if(!sFiles.script.exists()) {
		clientMessage(ChatColor.GRAY + "SixSense Script - Semteul");
		clientMessage(ChatColor.GRAY + "스크립트가 정상적으로 적용되었습니다");
		sFiles.script.mkdirs();
	}
	run = true;
	thread(function() {try {
		var runVib = function(range) {
			var tm = 0;
			if(range > 12) {
				tm = 4;
			}else if(range > 8) {
				tm = 3;
			}else if(range > 4) {
				tm = 2;
			}else if(range > 0) {
				tm = 1;
			}
			if(mode !== tm) {
				mode = tm;
				switch(tm) {
					case 0:
					sUtils.android.vibrator(null);
					break;
					case 1:
					sUtils.android.vibrator(1, -1);
					break;
					case 2:
					sUtils.android.vibrator([0, 100, 100], -1);
					break;
					case 3:
					sUtils.android.vibrator([0, 100, 100, 100, 700], -1);
					break;
					case 4:
					sUtils.android.vibrator([0, 100, 900], -1);
				}
			}
		}
		var work = false;
		while(run) {
			var ents = sUtils.modPE.entityExtra.getNearEntitys(Player.getX(), Player.getY(), Player.getZ());
			work = false;
			for(var e = 0; e < ents.length; e++) {
				if(sUtils.modPE.entityExtra.isEqual(Player.getEntity(), ents[e])) {
					continue;
				}
				var entType = Entity.getEntityTypeId(ents[e]);
				if(entType < 32 || entType >= 64) {
					continue;
				}
				var rr = sUtils.modPE.entityExtra.getRange(Player.getEntity(), ents[e]);
				if(rr > 16) {
					break;
				}
				var rv = [Entity.getX(ents[e]) - Player.getX(), Entity.getY(ents[e]) - Player.getY(), Entity.getZ(ents[e]) - Player.getZ()];
				var rd = sUtils.vector.vectorToDirection(rv[0], rv[1], rv[2]);
				var ey = Entity.getYaw(ents[e]);
				var py = Entity.getYaw(Player.getEntity());
				var isWatch = sUtils.math.leftOver(rd[0] - py, 0, 359);
				var isEWatch = sUtils.math.leftOver(rd[0] - ey, 0, 359);
				if(rr > 6 && (rd[1] > 45 || rd[1] < -45)) {
					continue;//enemy in the underground
				}
				if(isEWatch > 200 || isEWatch < 160) {
					continue;//enemy isn't watch you
				}
				if(isWatch > 340 || isWatch < 20) {
					continue; //you watch enemy
				}
				work = true;
				runVib(rr);
			}
			if(!work) {
				runVib(-1);
			}
			if(mode === 0) {
				sleep(1000);
			}else {
				sleep(200);
			}
		}
	}catch(e) {
		showError(e);
	}}).start();
}

function leaveGame() {
	run = false;
	sUtils.android.vibrator(null);
}