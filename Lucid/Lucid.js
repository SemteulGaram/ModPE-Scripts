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

const className = "Lucid";
const VERSION = "SNAPSHOT_0.1";
const VERSION_CODE = 100;

var TAG = "[" + className + " " + VERSION + "] ";

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var PIXEL = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
var _SD_CARD = android.os.Environment.getExternalStorageDirectory();
var _MOD_DIR = new java.io.File(_SD_CARD, "games/com.mojang/minecraftpe/mods");
var _MAIN_DIR = new java.io.File(_MOD_DIR, className);
var _FONT = new java.io.File(_MOD_DIR, "minecraft.ttf");
var _MAIN_DATA = new java.io.File(_MAIN_DIR, "setting.json");
var _TEST_DATA = new java.io.File(_MAIN_DIR, "lastLog.txt");
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function _MAP_DATA() {return new java.io.File(_MAP_DIR(), className + ".json")}
var DIP = PIXEL * loadData(_MAIN_DATA, "DIPS");
if(DIP == null || DIP == 0){
	DIP = PIXEL;
}
if(!(_MAIN_DIR.exists())) {
	_MAIN_DIR.mkdirs();
}
if(!(_MAIN_DATA.exists())) {
	_MAIN_DATA.createNewFile();
}

var Assets = {};
Assets.warning1 = new java.io.File(_MAIN_DIR, "assets01.res");
Assets.warning2 = new java.io.File(_MAIN_DIR, "assets02.res");
Assets.mus1 = new java.io.File(_MAIN_DIR, "assets03.res");

function en_US() {
	this.multiWarningMsg = "Multiplay is not support";
	this.assetsCrash = "Resource crash. Please reboot Minecraft.";
}

function ko_KR() {
	this.multiWarningMsg = "멀티 플레이는 지원되지 않습니다";
	this.assetsCrash = "자료가 손상되었습니다. 마인크래프트를 재부팅 해 주세요.";
}

var lang = new en_US();

//====================
//Lucid function
//====================

var Lucid = {};
Lucid.isRunning = false;
Lucid.currentStage = 0;
Lucid.stageTicking = false;
Lucid.stageData = [{name: "idle", init: null, tick: null, fin: null, point: [{x: null, y: null, z: null, f: function() {clientMessage(Player.getX())}, b: function() {print(Player.getZ())}, bn: "Active"}], loc: [], ent: []}];
//Lucid.stageData.push({name: "test Stage", init: function() {}, tick: function() {}, fin: function() {}, point: [], loc: [], ent: []});
//Lucid.stageData[Lucid.currentStage].point.push({x: 0, y: 0, z: 0, f: function() {}, b: function() {}, bn: "Active"});
//Lucid.stageData[Lucid.currentStage].loc.push({sx: 0, ex: 0, sy: 0, ey: 0, sz: 0, ez: 0, f: function() {}, b: function() {}, bn: "Active"});
//Lucid.stageData[Lucid.currentStage].ent.push({e: <object>, f: function() {}, b: function() {}, bn: "Active"});
Lucid.lastPointX = null;
Lucid.lastPointY = null;
Lucid.lastPointZ = null;
Lucid.lastLocX = null;
Lucid.lastLocY = null;
Lucid.lastLocZ = null;
Lucid.activeButton = null;
Lucid.activeWindow = null;
Lucid.activeIsShow = false;
Lucid.cache = {};
Lucid.cache.multiMsg = false;
var entitySpawnerData = [];
//[x, y, x, id, texture, rendering, function]
var setTileManagerData = [];
//[x, y, z, id, data]
var setTileSpeed = 1;
var bgsData = [];
var screenColorData = [];
Lucid.lastColor = 0;

function findStageIdByName(stageName) {try {
	for(var e = 0; e < Lucid.stageData.length; e++) {
		if(Lucid.stageData[e].name === stageName) {
			debug("findStageIdByName", "name: " + stageName + " index: " + e);
			return e;
		}
	}
	throw new ReferenceError(stageName + " stage is not in the Lucid.stageData");
}catch(e) {
	debug("findStageIdByName", "errorLine: " + e.lineNumber);
	showError(e);
}}

function multiChecker() {try {
	var a = Entity.getAll();
	for(var e = 0; e < a.length; e++) {
		if(Player.isPlayer(a[e]) && !EntityFix.isEqual(a[e], Player.getEnity())) {
			debug("multiChecker", "ban: " + Player.getName(a[e]));
			Entity.setHealth(a[e], 0);
		}
	}
}catch(e) {
	debug("multiChecker", "errorLine: " + e.lineNumber);
	showError(e);
}}

function screenColorLoad() {try {
	Lucid.screenFilter = new android.widget.RelativeLayout(ctx);
	var wd = new android.widget.PopupWindow(Lucid.screenFilter, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, false);
	wd.setTouchable(false);
	uiThread(function() {try {
		wd.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, 0, 0);
		debug("screenColorLoad", "loaded");
	}catch(e) {
		debug("screenColorLoad-ui", "errorLine: " + e.lineNumber);
		showError(e);
	}});
}catch(e) {
	debug("screenColorLoad", "errorLine: " + e.lineNumber);
	showError(e);
}}

function screenColorManager() {try {
	if(screenColorData.length > 0) {
		var c = screenColorData.shift();
		var i = (c[0]) + (c[1]*1000) + (c[2]*1000000) + (c[3]*1000000000);
		if(Lucid.lastColor !== i) {
			uiThread(function() {try {
				Lucid.screenFilter.setBackgroundColor(android.graphics.Color.rgb(c[1], c[2], c[3]));
				Lucid.screenFilter.setAlpha(c[0]);
			}catch(e) {
				debug("screenColorManager-ui", "errorLine: " + e.lineNumber);
				showError(e);
			}});
			Lucid.lastColor = i;
		}
	}
}catch(e) {
	debug("screenColorManager", "errorLine: " + e.lineNumber);
	showError(e);
}}

function warningPopup(str) {try {
	var sf = [];
	for(var e = 0; e < 120; e++) {
		sf[e] = Math.floor(Math.abs(Math.sin(e/60*Math.PI))*200);
	}
	var ll = new android.widget.LinearLayout(ctx);
	ll.setOrientation(1);
	var ll_g = new android.graphics.drawable.GradientDrawable();
	ll_g.mutate().setColor(android.graphics.Color.RED);
	ll_g.mutate().setAlpha(0);
	ll.setBackgroundDrawable(ll_g);
	ll.setGravity(android.view.Gravity.CENTER);
	
	if(Assets.warning.exists()) {
		var iv = new android.widget.ImageView(ctx);
		var iv_b = android.graphics.BitmapFactory.decodeFile(Assets.warning.getAbsolutePath());
		var iv_b2 = android.graphics.Bitmap.createScaledBitmap(iv_b, PIXEL*150, PIXEL*120, false);
		iv.setImageBitmap(iv_b2);
		ll.addView(iv);
	}
	
	var tv = new android.widget.TextView(ctx);
	tv.setGravity(android.view.Gravity.CENTER);
	tv.setText(str);
	tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*15);
	tv.setShadowLayer(1, DIP/2, DIP/2, android.graphics.Color.DKGRAY);
	ll.addView(tv);
	
	var wd = new android.widget.PopupWindow(ll, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, false);
	wd.setTouchable(false);
	debug("warningPopup", "show: " + str);
	uiThread(function() {try {
		wd.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, 0, 0);
	}catch(e) {
		debug("warningPopup-ui1", "errorLine: " + e.lineNumber);
		showError(e);
	}});
	thread(function() {try {
		while(sf.length > 0) {
			uiThread(function() {try {
				ll_g.mutate().setAlpha(sf.shift() + 55);
				ll.setBackgroundDrawable(ll_g);
			}catch(e) {
				debug("warningPopup-ui2", "errorLine: " + e.lineNumber);
				showError(e);
			}});
			sleep(50);
		}
		uiThread(function() {try {
			wd.dismiss();
		}catch(e) {
			debug("warningPopup-ui3", "errorLine: " + e.lineNumber);
			showError(e);
		}});
	}catch(e) {
		debug("warningPopup-thread", "errorLine: " + e.lineNumber);
		showError(e);
	}}).start();
}catch(e) {
	debug("warningPopup", "errorLine: " + e.lineNumber);
	showError(e);
}}

function userPointedBlockData() {try {
	var x = Player.getPointedBlockX();
	var y = Player.getPointedBlockY();
	var z = Player.getPointedBlockZ();
	if(Lucid.lastPointX !== x || Lucid.lastPointY !== y || Lucid.lastPointZ !== z) {
		Lucid.lastPointX = x;
		Lucid.lastPointY = y;
		Lucid.lastPointZ = z;
		activeButtonDismiss();
		for(var e = 0; e < Lucid.stageData[Lucid.currentStage].point.length; e++) {
			if(Lucid.stageData[Lucid.currentStage].point[e].x === x && Lucid.stageData[Lucid.currentStage].point[e].z === z && Lucid.stageData[Lucid.currentStage].point[e].y === y) {
				Lucid.stageData[Lucid.currentStage].point[e].f();
				activeButton(Lucid.stageData[Lucid.currentStage].point[e].bn, Lucid.stageData[Lucid.currentStage].point[e].b);
			}
		}
	}
}catch(e) {
	debug("userPointedBlockData", "errorLine: " + e.lineNumber);
	showError(e);
}}

function userPointedEntData() {try {
	var ent = Player.getPointedEntity();
	if(!EntityFix.isEqual(Lucid.lastPointEnt, ent)) {
		Lucid.lastPointEnt = ent;
		activeButtonDismiss();
		for(var e = 0; e < Lucid.stageData[Lucid.currentStage].point.length; e++) {
			if(Lucid.stageData[Lucid.currentStage].ent[e].e === ent) {
				Lucid.stageData[Lucid.currentStage].ent[e].f();
				activeButton(Lucid.stageData[Lucid.currentStage].ent[e].bn, Lucid.stageData[Lucid.currentStage].ent[e].b);
			}
		}
	}
}catch(e) {
	debug("userPointedEntData", "errorLine: " + e.lineNumber);
	showError(e);
}}

function userLocationData() {try {
	var x = Math.floor(Player.getX());
	var y = Math.floor(Player.getY());
	var z = Math.floor(Player.getZ());
	if(Lucid.lastLocX !== x || Lucid.lastLocY !== y || Lucid.lastLocZ !== z) {
		Lucid.lastLocX = x;
		Lucid.lastLocY = y;
		Lucid.lastLocZ = z;
		activeButtonDismiss();
		for(var e = 0; e < Lucid.stageData[Lucid.currentStage].loc.length; e++) {
			if(Lucid.stageData[Lucid.currentStage].loc[e].sx <= x && Lucid.stageData[Lucid.currentStage].loc[e].ex >= x && Lucid.stageData[Lucid.currentStage].loc[e].sz <= z && Lucid.stageData[Lucid.currentStage].loc[e].ez >= z && Lucid.stageData[Lucid.currentStage].loc[e].sy <= y && Lucid.stageData[Lucid.currentStage].loc[e].ey >= y) {
				Lucid.stageData[Lucid.currentStage].loc[e].f();
				activeButton(Lucid.stageData[Lucid.currentStage].loc[e].bn, Lucid.stageData[Lucid.currentStage].loc[e].b);
			}
		}
	}
}catch(e) {
	debug("userLocationData", "errorLine: " + e.lineNumber);
	showError(e);
}}

function activeButtonLoad() {try {
	if(Lucid.activeWindow == null) {
		Lucid.activeButton = new android.widget.Button(ctx);
		Lucid.activeButton.setText("Active");
		Lucid.activeButton.setTextColor(android.graphics.Color.WHITE);
		Lucid.activeButton.setTextSize(DIP*16);
		
		Lucid.activeWindow = new android.widget.PopupWindow(Lucid.activeButton, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, false);
		debug("activeButtonLoad", "loaded");
	}
}catch(e) {
	debug("activeButtonLoad", "errorLine: " + e.lineNumber);
	showError(e);
}}

function activeButton(text, func) {
	activeButtonDismiss();
	uiThread(function() {try {
		Lucid.activeButton.setText(text);
		Lucid.activeButton.setOnClickListener(android.view.View.OnClickListener({
			onClick: func
		}));
		Lucid.activeWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER|android.view.Gravity.BOTTOM, 0, PIXEL*100);
		Lucid.activeIsShow = true;
	}catch(e) {
		debug("activeButton-ui", "errorLine: " + e.lineNumber);
		showError(e);
	}});
}

function activeButtonDismiss() {
	if(Lucid.activeIsShow) {
		uiThread(function() {try {
			Lucid.activeWindow.dismiss();
		}catch(e) {
			debug("activeButtonDismiss-ui", "errorLine: " + e.lineNumber);
			showError(e);
		}})
		Lucid.activeIsShow = false;
	}
}

function bgs(x, y, z, file, range, power, vol, loop, stopLoopFunc) {try {
	var controler = android.media.MediaPlayer();
	controler.setDataSource(file.getAbsolutePath());
	controler.setLooping(loop);
	controler.setVolume(bgsL(x, y, z, range, power)*vol, bgsR(x, y, z, range, power)*vol);
	controler.prepare();
	controler.start();
	bgsData.push({x: x, y: y, z: z, ct: controler, file: file, session: controler.getAudioSessionId(), vol: vol, range: range, power: power, loop: loop, stopLoop: stopLoopFunc});
}catch(e) {
	debug("bgs", "errorLine: " + e.lineNumber);
	showError(e);
}}

function bgsManager() {try {
	for(var e = 0; e < bgsData.length; e++) {
		if(!bgsData[e].ct.isPlaying()) {
			bgsData[e].ct.release();
			bgsData.splice(e, 1);
			continue;
		}
		bgsData[e].ct.setVolume(bgsL(bgsData[e].x, bgsData[e].y, bgsData[e].z, bgsData[e].range, bgsData[e].power)*bgsData[e].vol, bgsR(bgsData[e].x, bgsData[e].y, bgsData[e].z, bgsData[e].range, bgsData[e].power)*bgsData[e].vol);
	}
}catch(e) {
	debug("bgsManager", "errorLine: " + e.lineNumber);
	showError(e);
}}

function stereoL(x, y, z, power) {
	var e = locToYaw(Player.getX() - x, Player.getY() - y, Player.getZ() - z);
	var t = e - Entity.getYaw(Player.getEntity()) + 180 - 135;
	if(t > 0) {
		t %= 360;
	}else {
		while(t < 0) {
			t += 360;
		}
	}
	return 1 - (Math.sin(t*Math.PI/180)/power);
}

function stereoR(x, y, z, power) {
	var e = locToYaw(Player.getX() - x, Player.getY() - y, Player.getZ() - z);
	var t = e - Entity.getYaw(Player.getEntity()) + 180 - 45;
	if(t > 0) {
		t %= 360;
	}else {
		while(t < 0) {
			t += 360;
		}
	}
	return 1 - (Math.sin(t*Math.PI/180)/power);
}

function bgsL(x, y, z, range, power) {
	var distance = Math.sqrt(Math.pow(Player.getY() - y, 2) + Math.pow(Player.getX() - x, 2) + Math.pow(Player.getZ() - z, 2));
	if(distance < range) {
		return stereoL(x, y, z, 3 * (range/distance));
	}else {
		if((distance - range) * power > 1) {
			return 0;
		}
		var r = stereoL(x, y, z, 3) - ((distance - range) * power);
		if(r < 0) {
			return 0;
		}
		return r;
	}
}

function bgsR(x, y, z, range, power) {
	var distance = Math.sqrt(Math.pow(Player.getY() - y, 2) + Math.pow(Player.getX() - x, 2) + Math.pow(Player.getZ() - z, 2));
	if(distance < range) {
		return stereoR(x, y, z, 3 * (range/distance));
	}else {
		if((distance - range) * power > 1) {
			return 0;
		}
		var r = stereoR(x, y, z, 3) - ((distance - range) * power);
		if(r < 0) {
			return 0;
		}
		return r;
	}
}

function setTileManager() {
	for(var e = 0; e < setTileSpeed; e++) {
		if(setTileManagerData.length > 0) {
			var d = setTileManagerData.shift();
			Level.setTile(d[0], d[1], d[2], d[3], d[4]);
		}
	}
}

function entitySpawner() {
	for(var e = 0; e < entitySpawnerData.length; e++) {
		var d = entitySpawnerData[e];
		var ent = Level.spawnMob(d[0], d[1], d[2], d[3], d[4]);
		if(d[5] !== null) {
			ent.setRenderType(d[5]);
		}
		d[6](ent);
	}
	entitySpawnerData = [];
}

function newLevel(str) {
	activeButtonLoad();
	screenColorLoad();
	Lucid.isRunning = true;
	Lucid.x = Player.getX();
	Lucid.y = Player.getY();
	Lucid.z = Player.getZ();
}

function leaveGame() {
	Lucid.isRunning = false;
}

var lag = [];
function modTick() {
	lag = [];
	lag.push(Date.now());
	userPointedBlockData();
	lag.push(Date.now());
	userPointedEntData();
	lag.push(Date.now());
	userLocationData();
	lag.push(Date.now());
	bgsManager();
	lag.push(Date.now());
	if(debugging) {
		ModPE.showTipMessage("Pblock:" + (lag[1]-lag[0])/1000 + "\nPent:" + (lag[2]-lag[1])/1000 + "\nloc:" + (lag[3]-lag[2])/1000 + "\nbgs:" + (lag[4]-lag[3])/1000);
	}
}

function procCmd(str) {
	if(str == "b") {
		warningPopup("점멸 경고창 활성화");
	}else {
		//activeButton(str, null);
		bgs(Player.getX(), Player.getY(), Player.getZ(), Assets.mus1, 5, 0.1, 1, false, function() {print("not able")});
	}
}

function entityAddedHook(ent) {
	if(Player.isPlayer(ent) && !EntityFix.isEqual(ent, Player.getEntity())) {
		debug("entityAddedHook", "warning: " + Player.getName(ent));
		warningPopup(lang.multiWarningMsg);
	}
}

//====================
//sub function
//====================

EntityFix = {};

EntityFix.isEqual = function(obj1, obj2) {
	return Entity.getUniqueId(obj1) === Entity.getUniqueId(obj2);
}

EntityFix.findEnt = function(uniqId) {
	var list = Entity.getAll();
	var max = list.length;
	for(var e = 0; e < max; e++) {
		if(uniqId === Entity.getUniqueId(list[e])) {
			return list[e];
		}
	}
}

/**
 * Location(x, y, z) to Vector(yaw, pitch)
 *
 * @since 2015-01-??
 * @author ToonRaOn
 */

function locToYaw(x, y, z) {
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
};

function locToPitch(x, y, z) {
	return -1 * Math.atan(y / Math.sqrt(Math.pow(x, 2)+Math.pow(z, 2))) * 180 / Math.PI;
};



/**
 * Entity range
 *
 * @since 2015-01-??
 * @author CodeInside
 */

function rangeEnt(a, b) {
	return Math.sqrt(Math.pow(Entity.getX(a) - Entity.getX(b), 2) + Math.pow(Entity.getY(a) - Entity.getY(b), 2) + Math.pow(Entity.getZ(a) - Entity.getZ(b), 2));
};



/**
 * Vector(yaw, pitch) to Location(x, y, z)
 *
 * @since 2015-01-??
 * @author CodeInside
 */

function vectorToX(y, p) {
	return (-1 * Math.sin(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
};

function vectorToY(y, p) {
	return (Math.sin(-p / 180 * Math.PI));
};

function vectorToZ(y, p) {
	return (Math.cos(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
};



/**
 * Absolute range x, y, z
 *
 * @since 2015-01-??
 * @author CodeInside
 */

function absX(x, y, z) {
	return x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

function absY(x, y, z) {
	return y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

function absZ(x, y, z) {
	return z / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

/**
 * Error report
 *
 * @since 2015-04-??
 * @author CodeInside
 *
 * @param {error} e
 */

function showError(e) {
	if(Level.getWorldName() === null) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
	android.widget.Toast.makeText(ctx, TAG + "\n" + e, android.widget.Toast.LENGTH_LONG).show();
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
 * debug
 *
 * @since 2014-12
 * @author CodeInside
 */
 
var debugging = true;
function debug(title, str) {
	if(debugging) {
		if(!Lucid.isRunning) {
			 ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		android.widget.Toast.makeText(ctx, TAG + "(" + title + ")" + str, android.widget.Toast.LENGTH_SHORT).show();
			}}));
		}else {
			clientMessage(ChatColor.GREEN + TAG + "(" + title + ")" + str);
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

function sendChat(str){
	net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat(str);
	clientMessage("<" + Player.getName(Player.getEntity()) + "> " + str);
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
function multiThread(fc) {
	if(Level.getWorldDir() !== null) {
		new java.lang.Thread(new java.lang.Runnable( {run: fc})).start()
	}else {
		uiThread(fc)
	}
}



/**
 * Download file
 *
 * @since 2015-01-10
 * @author CodeInside
 */

function downloadFile(path, url) {
	try{
		var tempApiUrl = new java.net.URL(url);
		var tempApiUrlConn = tempApiUrl.openConnection();
		tempApiUrlConn.connect();

		var tempBis = new java.io.BufferedInputStream(tempApiUrl.openStream());
		var tempFos = new java.io.FileOutputStream(path);
		var tempData = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
		var tempTotal = 0, tempCount;
		while ((tempCount = tempBis.read(tempData)) != -1) {
			tempTotal += tempCount;
			tempFos.write(tempData, 0, tempCount);
		}
		tempFos.flush();
		tempFos.close();
		tempBis.close();
		return true;
	}catch(e){
		debug(e.lineNumber + " " + e);
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
 * @since 2015-04-01
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
			toast(TAG + prototypeFile.getName() + " ë¦¬ì†ŒìŠ¤íŒŒì¼ ì ìš© ì‹¤íŒ¨\nì•ˆë“œë¡œì´ë“œê°€ ì•„ë‹Œê°€ìš”?");
		}
	}catch(e){
		toasts(prototypeFile.getName() + " ë¦¬ì†ŒìŠ¤íŒŒì¼ì´ ì—†ìŠµë‹ˆë‹¤");
	}
};

/**
 * save/load Data
 *
 * @since 2015-02-11
 * @author CodeInside
 */

function saveData(file, article, value) {
	//ì½ê¸°
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
		//ì§€ê¸ˆ ìƒˆë¡œ ì €ìž¥í•  ë°ì´í„°ëŠ” ì½ì§€ ì•Šê¸°
		if(tempReadString.split("¶")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	//ì½ì–´ì˜¤ê¸° ì™„ë£Œ
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//ì“°ê¸°
	var fileOutputStream = new java.io.FileOutputStream(file);
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + "¶" + value);
	//ì“°ê¸° ì™„ë£Œ
	outputStreamWriter.close();
	fileOutputStream.close();
}

function loadData(file, article) {
	//ì½ê¸°
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
		//ë¶ˆëŸ¬ì˜¬ ë°ì´í„° ì°¾ê¸°
		if(tempString.split("¶")[0] == article){
			str = tempString.split("¶")[1];
			if(tempString.split("¶")[2] == "n") {
				do {
					tempRead = bufferedReader.readLine();
					str += "\n" + tempRead.split("¶")[0];
				}while (tempString.split("¶")[1] == "n");
			}
			//ì°¾ì•˜ìœ¼ë©´ ëë‚´ê³  ë°˜í™˜
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return str;
		}
	}
	//ëª» ì°¾ìŒ
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//ì—†ìœ¼ë©´ ë°˜í™˜
	return null;
}



/**
 * load/save Minecraft Setting
 *
 * @since 2015-04-12
 * @author CodeInside
 */

function saveSetting(article, value) {
	//ì½ê¸°
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;
	var tempSaved = "";
	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//ì§€ê¸ˆ ìƒˆë¡œ ì €ìž¥í•  ë°ì´í„°ëŠ” ì½ì§€ ì•Šê¸°
		if(tempReadString.split(":")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	//ì½ì–´ì˜¤ê¸° ì™„ë£Œ
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//ì“°ê¸°
	var fileOutputStream = new java.io.FileOutputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + ":" + value);
	//ì“°ê¸° ì™„ë£Œ
	outputStreamWriter.close();
	fileOutputStream.close();
	//this is not work
	net.zhuoweizhang.mcpelauncher.ScriptManager.requestGraphicsReset();
}

function loadSetting(article) {
	//ì½ê¸°
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;

	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//ë¶ˆëŸ¬ì˜¬ ë°ì´í„° ì°¾ê¸°
		if(tempReadString.split(":")[0] == article){
			//ì°¾ì•˜ìœ¼ë©´ ëë‚´ê³  ë°˜í™˜
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return tempReadString.split(":")[1];
		}
	}
	//ëª» ì°¾ìŒ
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//ì—†ìœ¼ë©´ ë°˜í™˜
	return null;
}
