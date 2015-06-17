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
Assets.warning = java.io.File(_MAIN_DIR, "warning.png");

function en_US() {
	this.multiWarningMsg = "Multiplay is not support";
}

function ko_KR() {
	this.multiWarningMsg = "멀티 플레이는 지원되지 않습니다";
}

var lang = new en_US();

//====================
//Lucid function
//====================

var Lucid = {};
Lucid.isRunning = false;
Lucid.currentStage = 0;
Lucid.stageTicking = false;
Lucid.stageData = [];
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
Lucid.currentButton = null;
Lucid.cache = {};
Lucid.cache.multiMsg = false;
var entitySpawnerData = [];
var setTileManagerData = [];
var bgmManagerData = [];
var colorFilterData = [];

function findStageIdByName(stageName) {
	for(var e = 0; e < Lucid.stageData.length; e++) {
		if(Lucid.stageData[e].name === stageName) {
			return e;
		}
	}
	throw new ReferenceError(stageName + " stage is not in the Lucid.stageData");
}

function multiChecker() {
	var a = Entity.getAll();
	for(var e = 0; e < a.length; e++) {
		if(Player.isPlayer(a[e]) && !EntityFix.isEqual(a[e], Player.getEnity())) {
			warningPopup(lang.multiWarningMsg);
		}
	}
}

function screenColorFilterManager() {
	
}

function warningPopup(str) {
	var sf = [];
	for(var e = 0; e < 100; e++) {
		sf[e] = Math.floor(Math.abs(Math.sin(e/20*Math.PI))*255);
	}
	var ll = new android.widget.LinearLayout(ctx);
	ll.setOrientation(1);
	ll.setBackgroundColor(android.graphics.Color.RED);
	ll.setAlpha(0);
	ll.setGravity(android.view.Gravity.CENTER);
	
	if(Assets.warning.exists()) {
		var iv = new android.widget.ImageView(ctx);
		var iv_b = android.graphics.BitmapFactory.decodeFile(Assets.warning.getAbsolutePath());
		var iv_b2 = android.graphics.Bitmap.createScaledBitmap(iv_b, PIXEL*240, PIXEL*240, false);
		iv.setImageBitmap(iv_b2);
		ll.addView(iv);
	}
	
	var tv = new android.widget.TextView(ctx);
	tv.setText(str);
	tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*15);
	tv.setShadowLayer(1, DIP/2, DIP/2, android.graphics.Color.DKGRAY);
	ll.addView(tv);
	
	var wd = new android.widget.PopupWindow(ll, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, false);
	uiThread(function() {try {
		wd.showAtLoction(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, 0, 0);
		while(sf.length > 0) {
			ll.setAlpha(sf.shift());
			java.lang.Thread.sleep(50);
		}
		wd.dismiss();
	}catch(e) {
		showError(e);
	}});
}

function procCmd(str) {
	warningPopup(TAG);
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