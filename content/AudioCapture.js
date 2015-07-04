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
/*package com.android.musicvis;
import android.util.Log;
import android.media.audiofx.Visualizer;
import java.util.Arrays;*/
var VL = {};
//byte[]
VL.mRawVizData;
//int[]
VL.mFormattedVizData;
//byte[]
VL.mRawNullData = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 0);
//int[]
VL.mFormattedNullData = new Array(0);
//Visualizer
VL.mVisualizer;
//int
VL.mType;
//long
VL.MAX_IDLE_TIME_MS = 3000;
//long
VL.mLastValidCaptureTimeMs;
//int
VL.TYPE_PCM = 0;
VL.TYPE_FFT = 1;
// type, size - @int
VL.AudioCapture = function(type, size, session) {
	VL.mType = type;
	VL.range = new Array(2);
	VL.range = android.media.audiofx.Visualizer.getCaptureSizeRange();
 	if (size < VL.range[0]) {
		size = VL.range[0];
		}
	if (size > VL.range[1]) {
		size = VL.range[1];
	}
	VL.mRawVizData = java.lang.reflect.Array.		newInstance(java.lang.Byte.TYPE, size);
	VL.mFormattedVizData = new Array(size);
	VL.mVisualizer = null;
	try {
		VL.mVisualizer = new android.media.audiofx.Visualizer(session);
		if (VL.mVisualizer != null) {
			if (VL.mVisualizer.getEnabled()) {
				VL.mVisualizer.setEnabled(false);
			}
			VL.mVisualizer.setCaptureSize(VL.mRawVizData.length);
		}
	}/* catch (UnsupportedOperationException e) {
            Log.e("AudioCapture", "Visualizer cstor UnsupportedOperationException");
        } catch (IllegalStateException e) {
            Log.e("AudioCapture", "Visualizer cstor IllegalStateException");
        } catch (RuntimeException e) {
            Log.e("AudioCapture", "Visualizer cstor RuntimeException");
        }*/catch(e) {
		debug(e.lineNumber + " " + e);
	}
}

VL.start = function() {
	if (VL.mVisualizer != null) {
		try {
			if (!VL.mVisualizer.getEnabled()) {
				VL.mVisualizer.setEnabled(true);
				VL.mLastValidCaptureTimeMs = java.lang.System.currentTimeMillis();
			}
		}/* catch (IllegalStateException e) {
                Log.e("AudioCapture", "start() IllegalStateException");
            }*/catch(e) {
			debug(e.lineNumber + " " + e);
		}
	}
}

VL.stop = function() {
	if (VL.mVisualizer != null) {
		try {
			if (VL.mVisualizer.getEnabled()) {
				VL.mVisualizer.setEnabled(false);
			}
		}/* catch (IllegalStateException e) {
                Log.e("AudioCapture", "stop() IllegalStateException");
            }*/catch(e) {
			debug(e.lineNumber + " " + e);
		}
	}
}

VL.release = function() {
	if (VL.mVisualizer != null) {
		VL.mVisualizer.release();
		VL.mVisualizer = null;
  }
}

// return - @byte[]
VL.getRawData = function() {
	if (VL.captureData()) {
		return VL.mRawVizData;
	} else {
		return VL.mRawNullData;
	}
}

// num, den - @int
// return - @byte[]
VL.getFormattedData = function(num, den) {
	if (VL.captureData()) {
		if (VL.mType == VL.TYPE_PCM) {
			for (var i = 0; i < VL.mFormattedVizData.length; i++) {
				// convert from unsigned 8 bit to signed 16 bit
				var tmp = (VL.mRawVizData[i] & 0xFF) - 128;
				// apply scaling factor
				VL.mFormattedVizData[i] = (tmp * num) / den;
			}
		} else {
			for (var i = 0; i < VL.mFormattedVizData.length; i++) {
				// apply scaling factor
				VL.mFormattedVizData[i] = (VL.mRawVizData[i] * num) / den;
			}
		}
		return VL.mFormattedVizData;
	} else {
		return VL.mFormattedNullData;
	}
}

// return - boolen
VL.captureData = function() {
	var status = android.media.audiofx.Visualizer.ERROR;
	var result = true;
	try {
		if (VL.mVisualizer != null) {
			if (VL.mType == VL.TYPE_PCM) {
				status = VL.mVisualizer.getWaveForm(VL.mRawVizData);
			} else {
				status = VL.mVisualizer.getFft(VL.mRawVizData);
			}
		}
	}/* catch (IllegalStateException e) {
		Log.e("AudioCapture", "captureData() IllegalStateException: "+this);
	}*/catch(e) {
		debug(e.lineNumber + " " + e);
	} finally {
		if (status != android.media.audiofx.Visualizer.SUCCESS) {
			/*Log.e("AudioCapture", "captureData() :  "+this+" error: "+ status);*/
			debug("AudioCapture: captureData() :  "+this+" error: "+ status)
			result = false;
		} else {
			// return idle state indication if silence lasts more than MAX_IDLE_TIME_MS
			//byte
			var nullValue = 0;
			//int
			var i;
			if (VL.mType == VL.TYPE_PCM) {
				nullValue = 0x80;
			}
			for (i = 0; i < VL.mRawVizData.length; i++) {
				if (VL.mRawVizData[i] != nullValue) break;
			}
			if (i == VL.mRawVizData.length) {
				if ((java.lang.System.currentTimeMillis() - VL.mLastValidCaptureTimeMs) > VL.MAX_IDLE_TIME_MS) {
					result = false;
				}
			} else {
				VL.mLastValidCaptureTimeMs = java.lang.System.currentTimeMillis();
			}
		}
	}
	return result;
}

var ms = android.media.MediaPlayer();
var pt = "sdcard/test.mp3";

function newLevel() {
	ms.reset();
	ms.setDataSource(pt);
	ms.prepare();
	onVisibilityChanged(true, ms.getAudioSessionId());
	show();
}

function procCmd(str) {
	ms.start();
}

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var PIXEL = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
/*var DIP = FOUR * loadData(_MOD_DATA, "DIPS");
if(DIP + "" === "NaN"){
	DIP = FOUR;
}*/
/*var _SD_CARD = android.os.Environment.getExternalStorageDirectory();
var _MAIN_MOD_DIR = new java.io.File(_SD_CARD +  "games/com.mojang/minecraftpe/mods");
var _MOD_DIR = new java.io.File(_MAIN_MOD_DIR, ScriptName);
var _FONT = new java.io.File(_MAIN_MOD_DIR, "minecraft.ttf");
var _MOD_DATA = new java.io.File(_MOD_DIR, "setting.json");
var _MOD_TEST = new java.io.File(_MOD_DIR, "test.txt");
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function _MAP_STEP_DATA() {return new java.io.File(_MAP_DIR(), ScriptName + ".data")}
*/


//마인크래프트 리소스
//NOT USE(TEXTURE PACK MISSING)
var mcpeCPC = ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);
var mcpeAssets = mcpeCPC.getAssets();
//spritesheet.png 파일 접근
var mcpeSS;
try{
	mcpeSS = ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png");
}catch(e) {
	//옛날 버전에 대한 호환성
	mcpeSS = mcpeAssets.open("images/gui/spritesheet.png");
}
var mcpeSS_BF = android.graphics.BitmapFactory.decodeStream(mcpeSS);
//touchgui.png 파일 접근
var mcpeTG;
try {
	mcpeTG = ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png");
}catch(e) {
	mcpeTG = mcpeAssets.open("images/gui/touchgui.png");
}
var mcpeTG_BF = android.graphics.BitmapFactory.decodeStream(mcpeTG);
//꽉찬배경 나인패치
var mcpeBGRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 0, 0, 16, 16);
var mcpeBG = android.graphics.Bitmap.createScaledBitmap(mcpeBGRaw, PIXEL*32, PIXEL*32, false);
var mcpeBG9 = function() {ninePatch1(mcpeBG, PIXEL*12, PIXEL*12, PIXEL*24, PIXEL*24)}
//배경 나인패치
var mcpeBGTRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 34, 43, 14, 14);
var mcpeBGT = android.graphics.Bitmap.createScaledBitmap(mcpeBGTRaw, PIXEL*32, PIXEL*32, false);
var mcpeBGT9 = function() {ninePatch1(mcpeBGT, PIXEL*12, PIXEL*12, PIXEL*22, PIXEL*22)}
//타이틀바 나인패치
var mcpeTitleBarRaw = android.graphics.Bitmap.createBitmap(mcpeTG_BF, 150, 26, 14, 25);
var mcpeTitleBar = android.graphics.Bitmap.createScaledBitmap(mcpeTitleBarRaw, PIXEL*28, PIXEL*50, false);
var mcpeTitleBar9 = function()  {ninePatch1(mcpeTitleBar, PIXEL*8, PIXEL*8, PIXEL*20, PIXEL*22)}
//종료 버튼 나인패치
var mcpeExitRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 60, 0, 18, 18);
var mcpeExit = android.graphics.Bitmap.createScaledBitmap(mcpeExitRaw, 18*PIXEL, 18*PIXEL, false);
var mcpeExit9 = function() {ninePatch1(mcpeExit, PIXEL*6, PIXEL*6, PIXEL*30, PIXEL*30)}
var mcpeExitB = new android.graphics.drawable.BitmapDrawable(ctx.getResources(), mcpeExit);
mcpeExitB.setAntiAlias(false);
/*//종료 버튼(클릭) 나인패치
var mcpeExitClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 78, 0, 18, 18);
var mcpeExitClick = android.graphics.Bitmap.createScaledBitmap(mcpeExitClickRaw, dp(36), dp(36), false);
var mcpeExitClick9 = function() {ninePatch1(mcpeExitClick, dp(6), dp(6), dp(32), dp(32))}
//버튼 나인패치
var mcpeBtnRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,32,8,8);
var mcpeBtn = android.graphics.Bitmap.createScaledBitmap(mcpeBtnRaw,dp(16),dp(16),false);
var mcpeBtn9 = function() {ninePatch1(mcpeBtn,dp(6),dp(4),dp(14),dp(14))}
//버튼(클릭) 나인패치
var mcpeBtnClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,8);
var mcpeBtnClick = android.graphics.Bitmap.createScaledBitmap(mcpeBtnClickRaw,dp(16),dp(16),false);
var mcpeBtnClick9 = function() {ninePatch1(mcpeBtnClick,dp(4),dp(4),dp(12),dp(14))}
//미니버튼 나인패치
var mcpeMiniBtnRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,33,8,7);
var mcpeMiniBtn = android.graphics.Bitmap.createScaledBitmap(mcpeMiniBtnRaw,dp(16),dp(14),false);
var mcpeMiniBtn9 = function() {ninePatch1(mcpeMiniBtn,dp(2),dp(2),dp(12),dp(14))}
//미니버튼(클릭) 나인패치
var mcpeMiniBtnClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,7);
var mcpeMiniBtnClick = android.graphics.Bitmap.createScaledBitmap(mcpeMiniBtnClickRaw,dp(16),dp(14),false);
var mcpeMiniBtnClick9 = function() {ninePatch1(mcpeMiniBtnClick,dp(4),dp(4),dp(12),dp(12))}
//텍스트뷰 나인패치
var b = android.graphics.Color.parseColor("#6b6163");
var i = android.graphics.Color.parseColor("#3a393a");
var mcpeTextViewPixel = [
b,b,b,b,b,b,
b,b,b,b,b,b,
b,b,i,i,b,b,
b,b,i,i,b,b,
b,b,b,b,b,b,
b,b,b,b,b,b
];
var mcpeTextViewRaw = android.graphics.Bitmap.createBitmap(6, 6, android.graphics.Bitmap.Config.ARGB_8888);
mcpeTextViewRaw.setPixels(mcpeTextViewPixel, 0, 6, 0, 0, 6, 6);
var mcpeTextView = android.graphics.Bitmap.createScaledBitmap(mcpeTextViewRaw, dp(6), dp(6), false);
var mcpeTextView9 = function() {ninePatch1(mcpeTextView, dp(3), dp(3), dp(4), dp(4))}*/

var r = android.graphics.Color.parseColor("#ff0000");
var y = android.graphics.Color.parseColor("#ffff00");
var w = android.graphics.Color.parseColor("#ffffff");
var mcpeVisPixel = [
0,0,0,0,0,0,0,
0,r,r,r,r,r,0,
0,r,r,r,r,r,0,
0,r,r,r,r,r,0,
0,0,0,0,0,0,0,
0,y,y,y,y,y,0,
0,y,y,y,y,y,0,
0,y,y,y,y,y,0,
0,0,0,0,0,0,0,
0,y,y,y,y,y,0,
0,y,y,y,y,y,0,
0,y,y,y,y,y,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,w,w,w,w,w,0,
0,0,0,0,0,0,0
];
var mcpeVisRaw = android.graphics.Bitmap.createBitmap(7, 41, android.graphics.Bitmap.Config.ARGB_8888);
mcpeVisRaw.setPixels(mcpeVisPixel, 0, 7, 0, 0, 7, 41);
var mcpeVis = android.graphics.Bitmap.createScaledBitmap(mcpeVisRaw, PIXEL*7, PIXEL*41, false);
var mcpeVis9 = function() {ninePatch1(mcpeVis, PIXEL*0, PIXEL*0, PIXEL*7, PIXEL*41)}

var w = android.graphics.Color.parseColor("#ffffff");
var mcpeH_VisPixel = [
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,
0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,
0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0,w,w,0/*,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0*/
];
var mcpeH_VisRaw = android.graphics.Bitmap.createBitmap(37, 4, android.graphics.Bitmap.Config.ARGB_8888);
mcpeH_VisRaw.setPixels(mcpeH_VisPixel, 0, 37, 0, 0, 37, 4);
var mcpeH_Vis = android.graphics.Bitmap.createScaledBitmap(mcpeH_VisRaw, PIXEL*37, PIXEL*4, false);
var mcpeH_Vis9 = function() {ninePatch1(mcpeH_Vis, PIXEL*0, PIXEL*0, PIXEL*37, PIXEL*4)}
var mcpeH_VisArray = [];
for(var e = 0; e < 12; e++) {
	mcpeH_VisArray.push(android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeH_VisRaw, 0, 0, 4 + 3*e, 4), PIXEL*(24 + 18*e), PIXEL*24, false));
}
var mcpeH_VisNull = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeH_VisRaw, 0, 0, 1, 4), PIXEL*6, PIXEL*24, false);

var visa = [];

function modTick() {
	mVizData = VL.getFormattedData(1, 0.2);
	
	uiThread(function() {try {
		VL.ll.removeAllViews();
		for(var e = 0; e < 16; e++) {
			var t = Math.floor(mVizData[e]/5);
			if(t > 11) t = 11;
			var visp = new android.widget.ImageView(ctx);
			visp.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT));
			//visp.setGravity(android.view.Gravity.RIGHT);
			if(t >= 0) {
				visp.setImageBitmap(mcpeH_VisArray[t]);
			}else {
				visp.setImageBitmap(mcpeH_VisNull);
			}
			VL.ll.addView(visp);
			/*switch(t) {
				case 0:
					break;
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					break;
				case 5:
					break;
				case 6:
					break;
				case 7:
					break;
				case 8:
					break;
				case 9:
					break;
				case 10:
					break;
				case 11:
					break;
				default:
					
					break;
			}*/
		}
	}catch(e) {
		print(e);
	}});
	
	clientMessage("AC: " + mVizData[0]);
	visa.push(Math.abs(mVizData[0]));
	while(visa.length >= 3) {
		visa.shift();
	}
	var t = 0;
	for(var e = 0; e < visa.length; e++) {
		t += visa[e];
	}
	t /= 1;
	
	if(t < 10)
	ModPE.showTipMessage(ChatColor.AQUA + "    O");
	else if(t < 20)
	ModPE.showTipMessage(ChatColor.AQUA + "    OOO");
	else if(t < 30)
	ModPE.showTipMessage(ChatColor.AQUA + "    OOOOO");
	else if(t < 40) 
	ModPE.showTipMessage(ChatColor.AQUA + "    OOOOOOO");
	else if(t < 50)
	ModPE.showTipMessage(ChatColor.AQUA + "    OOOOOOOOO");
	else if(t < 60)
	ModPE.showTipMessage(ChatColor.AQUA + "    OOOOOOOOOOO");
	else if(t < 70)
	ModPE.showTipMessage(ChatColor.AQUA + "    OOOOOOOOOOOOO");
	else if(t < 80)
	ModPE.showTipMessage(ChatColor.YELLOW + "    OOOOOOOOOOOOOOO");
	else if(t < 90)
	ModPE.showTipMessage(ChatColor.YELLOW + "    OOOOOOOOOOOOOOOOO");
	else if(t < 100)
	ModPE.showTipMessage(ChatColor.YELLOW + "    OOOOOOOOOOOOOOOOOOO");
	else if(t < 110)
	ModPE.showTipMessage(ChatColor.YELLOW + "    OOOOOOOOOOOOOOOOOOOOO");
	else if(t < 120)
	ModPE.showTipMessage(ChatColor.RED + "    OOOOOOOOOOOOOOOOOOOOOOO");
	else if(t < 130)
	ModPE.showTipMessage(ChatColor.RED + "    OOOOOOOOOOOOOOOOOOOOOOOOO");
	else if(t < 140)
	ModPE.showTipMessage(ChatColor.RED + "    OOOOOOOOOOOOOOOOOOOOOOOOOOO");
	else if(t < 150)
	ModPE.showTipMessage(ChatColor.RED + "    OOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
};

function uiThread(fc) {
	return ctx.runOnUiThread(new java.lang.Runnable({run: fc}))
}

function graph(mVisData) {
	uiThread(function() {try{
	VL.bm = new android.graphics.Bitmap.createBitmap(300, 200,android.graphics.Bitmap.Config.ARGB_8888);
	VL.cv = new android.graphics.Canvas(VL.bm);
	var p = android.graphics.Paint();
	p.setColor(android.graphics.Color.BLUE) 
	VL.cv.drawLines(mVisData, p);
	VL.iv.setImageBitmap(VL.bm);
	}catch(e) {
		debug(e.lineNumber + " " + e);
	}});
}

function show() {
uiThread(function() {try{	VL.wd.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT|android.view.Gravity.TOP, 0, 0);	}catch(e) {
		debug(e.lineNumber + " " + e);
	}});
}


VL.ll = new android.widget.LinearLayout(ctx);
VL.ll.setOrientation(1);
VL.ll.setGravity(android.view.Gravity.RIGHT);
VL.ll.setPadding(0, 0, 0, 0);

VL.wd = android.widget.PopupWindow(VL.ll, 500, ctx.getWindowManager().getDefaultDisplay().getHeight(), false);
VL.wd.setTouchable(false);

var mAudioCapture, mVisible;
var mVisData = new Array(16);

function onVisibilityChanged(visible, audioSessionID) {
	mVisible = visible;
	if (visible) {
		if (mAudioCapture == null) {
			VL.AudioCapture(VL.TYPE_PCM, 16, audioSessionID);
			debug("session: " + ms.getAudioSessionId());
		}
		VL.start();
	} else {
		if (mAudioCapture != null) {
			VL.stop();
			VL.release();
			mAudioCapture = null;
		}
	}
}

var debuging = true;
function debug(a) {
	if(debuging) clientMessage(ChatColor.GRAY + "[Debug] " + a);
}