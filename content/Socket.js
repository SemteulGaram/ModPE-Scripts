var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

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
var NumberPicker = android.wjidget.NumberPicker;
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

function sleep(int){
	java.lang.Thread.sleep(int);
}

function uiThread(fc) {
	return ctx.runOnUiThread(new java.lang.Runnable({run: fc}))
}

function thread(fc) {
	return new java.lang.Thread(new java.lang.Runnable( {run: fc}))
}




var log, svpe;

function selectLevelHook() {
	log.w("selectLevelHook#");
}
function newLevel() {
	log.w("newLevel#");
	svpe.setType(1);
}
function leaveGame() {
	log.w("leaveGame#");
	svpe.setType(0);
}
function modTick() {
	ModPE.showTipMessage("Test On Running");
}
function procCmd(cmd) {
	log.w("procCmd#"+cmd);
}
function chatHook(str) {
	log.w("chatHook#"+str);
}
function chatReceiveHook(str, sender) {
	log.w("chatReceiveHook#"+str+"/"+sender);
	svpe.addChatCode(str);
}
function serverMessageReceiveHook(str) {
	log.w("serverMessageReceiveHook#"+str);
}
function attackHook(attacker, victim) {
	log.w("attackHook#"+attacker+"/"+victim);
}
function deathHook(murderer, victim) {
	log.w("deathHook#"+murderer+"/"+victim);
}
function entityAddedHook(entity) {
	log.w("entityAddedHook#"+entity);
	if(Player.isPlayer(entity)) {
		log.w("Player Detected");
		svpe.sendIdentity(entity);
	}
}
function entityRemovedHook(entity) {
	log.w("entityRemovedHook#"+entity);
}
function useItem(x, y, z, itemId, blockId, side) {
	log.w("useItem#"+x+"/"+y+"/"+z+"/"+itemId+"/"+blockId+"/"+side);
}
function startDestroyBlock(x, y, z, side) {
	log.w("startDestroyBlock#"+x+"/"+y+"/"+z+"/"+side);
}
function destroyBlock(x, y, z, side) {
	log.w("destroyBlock#"+x+"/"+y+"/"+z+"/"+side);
}
function levelEventHook(ent, eventType, x, y, z, data) {
	log.w("levelEventHook#"+ent+"/"+eventType+"/"+x+"/"+y+"/"+z+"/"+data);
}
function blockEventHook(x, y, z, type, data) {
	log.w("blockEventHook#"+x+"/"+y+"/"+z+"/"+type+"/"+data);
}

function LogPE(textSize, maxWidth, maxLength) {
	this.msgs = [];
	var tv = new TextView(ctx);
	this.maxWd = maxWidth;
	this.max = maxLength;
	tv.setBackgroundColor(Color.argb(0x55, 0, 0, 0));
	tv.setPadding(0x8, 0x8, 0x8, 0x8);
	tv.setMaxWidth(this.maxWd);
	tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, textSize);
	var wd = new PopupWindow(tv, c.w, c.w, false);
	wd.setTouchable(false);
	uiThread(function() {try {
		wd.showAtLocation(c.d, Gravity.RIGHT|Gravity.TOP, 0, 0x40);
	}catch(e) {
		print(e);
	}});
	this.textView = tv;
	this.wd = wd;
}

LogPE.prototype = {
	
	toString: function() {
		return "[LogPE Object]";
	},
	
	write: function(str) {
		var that = this;
		this.msgs.push(str+"");
		if(this.msgs.length > this.max) {
			this.msgs.splice(0, this.msgs.length - this.max);
		}
		var msg = "";
		for(var e = 0; true; e++) {
			if(e+1 >= this.msgs.length) {
				msg += this.msgs[e];
				break;
			}
			msg += this.msgs[e] + "\n";
		}
		uiThread(function() {try {
			that.textView.setText(msg);
		}catch(e) {
			print(e);
		}});
	},
	
	w: function(v) {
		this.write(v);
	}
}



function ServerPE(port) {
	this.port = port;
	this.type = 0;//0 = Temp Client, 1 = Server
}

ServerPE.prototype = {
	
	toString: function() {
		return "[ServerPE " + this.port + "]";
	},
	
	getType: function() {
		return this.type;
	},
	
	setType: function(type) {
		this.type = type;
	},
	
	addData: function(str) {
		try {
			var datas = str.split("|");
		}catch(e) {
			log.w("addData: " + e);
			return false;
		}
		if(datas[1] !== "SocketTest") {
			log.w("Not type of SocketTest: " + datas[1]);
			return false;
		}
		clientMessage(datas[2]);
	},
	
	addChatCode: function(str) {
		try {
			var datas = str.split("|");
		}catch(e) {
			log.w("addCharCode_1: " + e);
			return false;
		}
		try {
			if(Player.getName(Player.getEntity()) === datas[0]) {
				log.w("addChatCode->addData");
				this.addData(datas[0] + "|" + codeToString(datas[1]));
			}
		}catch(e) {
			log.w("addChatCode_2: " + e);
			return false;
		}
	},
	
	sendIdentity: function(ent) {
		if(this.type !== 1) return;
		try {
			net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat(Player.getName(ent) + "|" + stringToCode("SocketTest|Test Message7201"));
		}catch(e) {
			log.w("sendIdentity_1: " + e);
			return false;
		}
	}
}



log = new LogPE(0x10, 0x200, 30);
svpe = new ServerPE(7201);

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
		if(c == "E") {
			break;
		}
		str += t;
	}
	return str;
}