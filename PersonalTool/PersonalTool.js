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

const className = "test";

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var PIXEL = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
var _SD_CARD = android.os.Environment.getExternalStorageDirectory();
var _MOD_DIR = new java.io.File(_SD_CARD, "games/com.mojang/minecraftpe/mods");
var _MAIN_DIR = new java.io.File(_MOD_DIR, className);
var _FONT = new java.io.File(_MOD_DIR, "minecraft.ttf");
var _MAIN_DATA = new java.io.File(_MAIN_DIR, "setting.json");
var _TEST_DATA = new java.io.File(_MAIN_DIR, "lastLog.txt");
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function _MAP_DATA() {return new java.io.File(_MAP_DIR(), className + ".data")}
var DIP = PIXEL * loadData(_MOD_DATA, "DIPS");
if(DIP == null){
	DIP = PIXEL;
}


var web1 = "https://raw.githubusercontent.com/CI-CodeInside/ModPE-Script/master/content/key1";