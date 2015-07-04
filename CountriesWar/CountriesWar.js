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

const className = "CountriesWar";
const VERSION = "1.0";
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
if(!(FILE_MAIN_DATA.exists())) {
	FILE_MAIN_DATA.createNewFile();
}

var Byte = java.lang.Byte;
var Int = java.lang.Integer;
var Float = java.lang.Float;
var Double = java.lang.Double;
var Boolean = java.lang.Boolean;
var Long = java.lang.Long;
var Short = java.lang.Short;
var Context = android.content.Context;
var Thread = java.lang.Thread;
var Runnable = java.lang.Runnable;
var AlertDialog = android.app.AlertDialog;
var DialogInterface = android.content.DialogInterface;
var View = android.view.View;
var ViewGroup = android.view.ViewGroup;
var MotionEvent = android.view.MotionEvent;
var Gravity = android.view.Gravity;
var FrameLayout = android.widget.FrameLayout;
var RelativeLayout = android.widget.RelativeLayout;
var LinearLayout = android.widget.LinearLayout;
var ScrollView = android.widget.ScrollView;
var TextView = android.widget.TextView;
var EditText = android.widget.EditText;
var Button = android.widget.Button;
var ImageView = android.widget.ImageView;
var ProgressBar = android.widget.ProgressBar;
var PopupWindow = android.widget.PopupWindow;
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
var ArrayList = java.util.ArrayList;

var c = {};
c.m = ViewGroup.LayoutParams.MATCH_PARENT;
c.w = ViewGroup.LayoutParams.WRAP_CONTENT;
c.a = java.lang.reflect.Array.newInstance;
c.r = RelativeLayout;
c.l = LinearLayout;
c.p = android.util.TypedValue.COMPLEX_UNIT_PX;

var cw = {};
cw.team = [];
//{name: <string>, member: []}

function attackHook(attacker, victim) {
	if(Player.isPlayer(attaker) && findTeamIndexByPlayer(attaker) !== -1) {
		if(findTeamIndexByPlayer(attaker) === findTeamIndexByPlayer(victim)) {
			preventDefault();
		}
	}
}


function findTeamIndexByPlayer(player) {
	for(var e = 0; e < cw.team.length; e++) {
		for(var f = 0; f <cw.team[e].member.length; f++) {
			if(EntityFix.isEqual(player, EntityFix.findPlayer(cw.team[e].member[f].name))) {
				return e;
			}
		}
	}
	return -1;
}

function findTeamIndexByName(name) {
	for(var e = 0; e < cw.team.length; e++) {
		if(cw.team[e].name == name) {
			return e;
		}
	}
	return -1;
}

function mainBtnLoad() {
	cw.b = new Button(ctx);
	cw.b.setText("메뉴");
	cw.b.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		manuShow();
	}catch(e) {
		showError(e);
	}}}));
	cw.w = new PopupWindow(cw.b, c.w, c.w, false);
}

function mainBtnShow(vis) {
	uiThread(function() { try {
		if(vis) {
			cw.w.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT|Gravity.TOP, PIXEL*50, 0);
		}else {
			cw.w.dismiss();
		}
	}catch(e) {
		showError(e);
	}});
}
mainBtnLoad();
mainBtnShow(true);

function manuShow() {
	cw.d = AlertDialog.Builder(ctx);
	cw.d.setTitle("CountriesWar");
	
	cw.ds = new ScrollView(ctx);
	
	cw.dl = c.l(ctx);
	cw.dl.setOrientation(c.l.VERTICAL);
	
	cw.db1 = new Button(ctx);
	cw.db1.setText("팀 목록");
	cw.db1.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		teamList();
	}catch(e) {
		showError(e);
	}}}));
	cw.dl.addView(cw.db1);
	
	cw.db2 = new Button(ctx);
	cw.db2.setText("팀 생성");
	cw.db2.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		newTeam();
	}catch(e) {
		showError(e);
	}}}));
	cw.dl.addView(cw.db2);
	
	cw.db3 = new Button(ctx);
	cw.db3.setText("플레이어 목록");
	cw.db3.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		print("준비중");
	}catch(e) {
		showError(e);
	}}}));
	cw.dl.addView(cw.db3);
	
	cw.db4 = new Button(ctx);
	cw.db4.setText("킥");
	cw.db4.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		print("준비중");
	}catch(e) {
		showError(e);
	}}}));
	cw.dl.addView(cw.db4);
	
	cw.db5 = new Button(ctx);
	cw.db5.setText("밴");
	cw.db5.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		print("준비중");
	}catch(e) {
		showError(e);
	}}}));
	cw.dl.addView(cw.db5);
	
	cw.db6 = new Button(ctx);
	cw.db6.setText("아이템 지급");
	cw.db6.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		print("준비중");
	}catch(e) {
		showError(e);
	}}}));
	cw.dl.addView(cw.db6);
	
	cw.ds.addView(cw.dl);
	
	cw.d.setView(cw.ds);
	cw.d.create().show();
}

function newTeam() {
	cw.nd = new AlertDialog.Builder(ctx);
	cw.nd.setTitle("팀 생성");
	
	cw.net = new EditText(ctx);
	cw.net.setHint("팀 이름");
	
	cw.nd.setPositiveButton("생성", new DialogInterface.OnClickListener({onClick: function() {try {
		var name = cw.net.getText() + "";
		if(name == "") {
			toast(TAG + "팀명은 [공백] 일 수 없습니다");
		}else if(findTeamIndexByName(name) !== -1) {
			toast(TAG + "이미 존재하는 팀명입니다");
		}else {
			cw.team.push({name: name, member: []});
			toast(TAG + name + " 팀이 생성되었습니다");
		}
	}catch(e) {
		showError(e);
	}}}));
	cw.nd.setView(cw.net);
	cw.nd.create().show();
}

function teamList() {
	cw.ld = AlertDialog.Builder(ctx);
	cw.ld.setTitle("팀 목록");
	
	cw.ls = new ScrollView(ctx);
	
	cw.ll = new c.l(ctx);
	cw.ll.setOrientation(c.l.VERTICAL);
	
	for(var e = 0; e < cw.team.length; e++) {
		var b = new Button(ctx);
		b.setText(cw.team[e].name);
		b.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
			teamInfo(view.getText()+"");
		}catch(e) {
			showError(e);
		}}}));
		cw.ll.addView(b);
	}
	
	if(cw.team.length === 0) {
		var t = new TextView(ctx);
		t.setText("팀 생성 버튼을 눌러서 팀을 추가합니다");
		cw.ll.addView(t);
	}
	
	cw.ls.addView(cw.ll);
	cw.ld.setView(cw.ls);
	cw.ld.create().show();
}

function teamInfo(name) {
	cw.index = findTeamIndexByName(name);
	if(cw.index === -1) {
		toast(TAG + "삭제된 팀입니다");
		return;
	}
	
	cw.id = new AlertDialog.Builder(ctx);
	cw.id.setTitle(cw.team[cw.index].name + " 팀의 정보");
	
	cw.is = new ScrollView(ctx);
	
	cw.il = new c.l(ctx);
	cw.il.setOrientation(c.l.VERTICAL);
	
	cw.i1 = new Button(ctx);
	cw.i1.setText("팀원 목록");
	cw.i1.setOnClickListener(View.OnClickListener({onClick: function() {try {
		print("not able");
	}catch(e) {
		showError(e);
	}}}));
	cw.il.addView(cw.i1);
	
	cw.i2 = new Button(ctx);
	cw.i2.setText("플레이어 추가");
	cw.i2.setOnClickListener(View.OnClickListener({onClick: function() {try {
		addPlayer();
	}catch(e) {
		showError(e);
	}}}));
	cw.il.addView(cw.i2);
	
	cw.i3 = new Button(ctx);
	cw.i3.setText("플레이어 추방");
	cw.i3.setOnClickListener(View.OnClickListener({onClick: function() {try {
		removePlayer();
	}catch(e) {
		showError(e);
	}}}));
	cw.il.addView(cw.i3);
	
	cw.i4 = new Button(ctx);
	cw.i4.setText("-준비중-");
	cw.i4.setOnClickListener(View.OnClickListener({onClick: function() {try {
		
	}catch(e) {
		showError(e);
	}}}));
	cw.il.addView(cw.i4);
	
	cw.is.addView(cw.il);
	cw.id.setNegativeButton("팀 삭제", new DialogInterface.OnClickListener({onClick: function() {try {
		var name = cw.team[cw.index].name;
		cw.team.splice(cw.index, 1);
		toast(TAG + name + " 팀이 삭제되었습니다");
	}catch(e) {
		showError(e);
	}}}));
	cw.id.setView(cw.is);
	cw.id.create().show();
}

function addPlayer() {
	cw.ad = new AlertDialog.Builder(ctx);
	cw.ad.setTitle(cw.team[cw.index].name + " 팀에 플레이어 추가");
	
	cw.as = new ScrollView(ctx);
	
	cw.al = new c.l(ctx);
	cw.al.setOrientation(c.l.VERTICAL);
	
	var list = Entity.getAll();
	for(var e = 0; e < list.length; e++) {
		if(Player.isPlayer(list[e])) {
			var b = new Button(ctx);
			b.setText(Player.getName(list[e]));
			b.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
				var t = findTeamIndexByPlayer(EntityFix.findPlayer(view.getText()+""));
				if(t !== -1) {
					toast(TAG + view.getText() + " 플레이어는 이미 " + cw.team[t].name + " 팀 소속입니다");
					return;
				}
				cw.team[cw.index].member.push({name: view.getText()+"", exp: 0, level: 1});
				view.setTextColor(Color.YELLOW);
				toast(TAG + view.getText() + " 님이 " + cw.team[cw.index].name + "팀에 추가되었습니다");
			}catch(e) {
				showError(e);
			}}}));
			cw.al.addView(b);
		}
	}
	cw.as.addView(cw.al);
	cw.ad.setView(cw.as);
	cw.ad.create().show();
}

function removePlayer() {
	cw.rd = new AlertDialog.Builder(ctx);
	cw.rd.setTitle(cw.team[cw.index].name + " 팀에서 플레이어 제거");
	
	cw.rs = new ScrollView(ctx);
	
	cw.rl = new c.l(ctx);
	cw.rl.setOrientation(c.l.VERTICAL);
	
	for(var e = 0; e < cw.team[cw.index].member.length; e++) {
		var b = new Button(ctx);
		b.setText(cw.team[cw.index].member[e].name);
		b.setTextColor(Color.RED);
		b.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
			for(var e = 0; e < cw.team[cw.index].member.length; e++) {
				if(cw.team[cw.index].member[e].name == view.getText()+"") {
					cw.team[cw.index].member.splice(e, 1);
					view.setTextColor(Color.GRAY);
					toast(TAG + view.getText() + " 플레이어가 " + cw.team[cw.index].name + " 팀에서 제외되었습니다");
					return;
				}
			}
			toast(TAG + "이미 제외된 플레이어입니다");
		}catch(e) {
			showError(e);
		}}}));
		cw.rl.addView(b);
	}
	
	cw.rs.addView(cw.rl);
	cw.rd.setView(cw.rs);
	cw.rd.create().show();
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

function broadcast(str){
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

EntityFix = {};

EntityFix.getId = function(obj1) {
	return Entity.getUniqueId(obj1);
}

EntityFix.isEqual = function(obj1, obj2) {try {
	return Entity.getUniqueId(obj1) === Entity.getUniqueId(obj2);
}catch(e) {
	return false;
}}

EntityFix.findEnt = function(uniqId) {
	var list = Entity.getAll();
	var max = list.length;
	for(var e = 0; e < max; e++) {
		if(uniqId === Entity.getUniqueId(list[e])) {
			return list[e];
		}
	}
}

EntityFix.findPlayer = function(name) {
	var list = Entity.getAll();
	var max = list.length;
	for(var e = 0; e < max; e++) {
		if(Player.isPlayer(list[e]) && Player.getName(list[e]) === name) {
			return list[e];
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