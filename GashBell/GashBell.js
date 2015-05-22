var ScriptName = "GashBell";
var Version = "dev-v1";
var Author = "CodeInside";
var VersionCode = 100;
//ProjectName = "A Good Devil's King";

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
 
var TAG = "[" + ScriptName + "] ";
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
var _SD_CARD = android.os.Environment.getExternalStorageDirectory();
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")};
function _MAP_DATA() {return new java.io.File(_MAP_DIR(), ScriptName + ".data")};



function uiThread(fc) {
	return ctx.runOnUiThread(new java.lang.Runnable({run: fc}))
}
function thread(fc) {
	return new java.lang.Thread(new java.lang.Runnable( {run: fc}))
}
 
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
		clientMessage(ChatColor.DARK_RED + "[" + ScriptName + " ERROR LINE: " + e.lineNumber + "]\n" + ChatColor.DARK_RED + c);
	}
}
 
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
			toast(TAG + prototypeFile.getName() + " 리소스파일 적용 실패\n안드로이드가 아닌가요?");
		}
	}catch(e){
		toasts(prototypeFile.getName() + " 리소스파일이 없습니다");
	}
};

function getYaw(x, y, z) {
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

function getPitch(x, y, z) {
	return -1 * Math.atan(y / Math.sqrt(Math.pow(x, 2)+Math.pow(z, 2))) * 180 / Math.PI;
};

function rangeEnt(a, b) {
	return Math.sqrt(Math.pow(Entity.getX(a) - Entity.getX(b), 2) + Math.pow(Entity.getY(a) - Entity.getY(b), 2) + Math.pow(Entity.getZ(a) - Entity.getZ(b), 2));
};

function absRangeX(y, p) {
	return (-1 * Math.sin(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
};

function absRangeY(y, p) {
	return (Math.sin(-p / 180 * Math.PI));
};

function absRangeZ(y, p) {
	return (Math.cos(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
};

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
 * save/load Data
 *
 * @since 2015-02-11
 * @author CodeInside
 */

function saveData(file, article, value) {
	//읽기
	if(!file.exists()) {
		file.createNewFile()
	}
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return "Can't read"
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;
	var tempSaved = "";
	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//지금 새로 저장할 데이터는 읽지 않기
		if(tempReadString.split("¶")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	//읽어오기 완료
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//쓰기
	var fileOutputStream = new java.io.FileOutputStream(file);
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + "¶" + value);
	//쓰기 완료
	outputStreamWriter.close();
	fileOutputStream.close();
}

function loadData(file, article) {
	//읽기
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return "NoFile";
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;

	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//불러올 데이터 찾기
		if(tempReadString.split("¶")[0] == article){
			//찾았으면 끝내고 반환
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return tempReadString.split("¶")[1];
		}
	}
	//못 찾음
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//없으면 반환
	return null;
}


/**
 * load/save Minecraft Setting
 *
 * @since 2015-04-12
 * @author CodeInside
 */

function saveSetting(article, value) {
	//읽기
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;
	var tempSaved = "";
	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//지금 새로 저장할 데이터는 읽지 않기
		if(tempReadString.split(":")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	//읽어오기 완료
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//쓰기
	var fileOutputStream = new java.io.FileOutputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + ":" + value);
	//쓰기 완료
	outputStreamWriter.close();
	fileOutputStream.close();
	//this is not work
	net.zhuoweizhang.mcpelauncher.ScriptManager.requestGraphicsReset();
}

function loadSetting(article) {
	//읽기
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;

	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//불러올 데이터 찾기
		if(tempReadString.split(":")[0] == article){
			//찾았으면 끝내고 반환
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return tempReadString.split(":")[1];
		}
	}
	//못 찾음
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//없으면 반환
	return null;
}

setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/td11.png"), "mob/td11.png");
setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/td12.png"), "mob/td12.png");
setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/td13.png"), "mob/td13.png");
setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/ZAKERU.png"), "mob/ZAKERU.png");
setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/RASHIRUDO.png"), "mob/RASHIRUDO.png");
setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/RASHIRUDO1.png"), "mob/RASHIRUDO1.png");
setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/RASHIRUDO2.png"), "mob/RASHIRUDO2.png");
setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/RASHIRUDO3.png"), "mob/RASHIRUDO3.png");
setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/JIKERUDO.png"), "mob/JIKERUDO.png");

Block.defineBlock(252, "Light sources", [ ["missing_tile",0],["missing_tile",0],["missing_tile",0],["missing_tile",0], ["missing_tile",0],["missing_tile",0]], 0, false, 0);
//Block.setRenderLayer(252, 6);
Block.setRenderType(252, 5);
Block.setLightOpacity(252, 15);
Block.setDestroyTime(252, 0);
Block.setLightLevel(252, 15);
Block.setExplosionResistance(252, 1);
Block.setShape(252, 0, 0, 0, 0, 0, 0);
//Player.addItemCreativeInv(252, 5, 0);

var Skill = {};
var SkillDat = [];
var Affect = {};
var AffectDat = [];
var Effect = {};
var EffectDat = [];
var Models = {};
var GB_System = {};
var GB_SystemCache = {shildExceptionList: [], trash: [], blockTrash: [], smoothRotation: [], bdd: []};

Affect.shock = function(ent, duration, rate, power, range, shockInfection, shockInfRate) {
	for(var e = 0; e < AffectEnt.length; e++) {
		if(AffectDat[e].type === "shock" && AffectDat[e].ent === ent) {
			AffectDat[e].duration += duration;
			if(AffectDat[e].duration > 200) {
				AffectDat[e].duration = 200
			}
			if(AffectDat[e].power < power) {
				AffectDat[e].power = power
			}
			if(AffectDat[e].rate < (1/rate)) {
				AffectDat[e].rate = (1/rate)
			}
			if(!AffectDat[e].shockInfection && shockInfection) {
				AffectDat[e].shockInfection = shockInfection
			}
			if(AffectDat[e].shockInfRate < (1/shockInfRate)) {
				AffectDat[e].shockInfRate = (1/shockInfRate);
			}
			return;
		}
	}
	AffectDat.push({type: "shock", ent: ent, duration: duration, rate: 1/rate, tempRate: 1/rate, power: power, range: range, shockInfention: shockInfention, shockInfRate: 1/shockInfRate});
};

Affect.magnetic = function(ent, duration, range, rate, power) {
	for(var e = 0; e < AffectEnt.length; e++) {
		if(AffectDat[e].type === "magnatic" && AffectDat[e].ent === ent) {
			AffectDat[e].duration += duration;
			if(AffectDat[e].duration > 300) {
				AffectDat[e].duration = 300
			}
			if(AffectDat[e].range < range) {
				AffectDat[e].range = range
			}
			if(AffectDat[e].rate < 1/rate) {
				AffectDat[e].rate = 1/rate
			}
			if(AffectDat[e].power < power) {
				AffectDat[e].power = power
			}
			return;
		}
	}
	AffectDat.push({type: "magnatic", ent: ent, duration: duration, range: range, rate: 1/rate, tempRate: 1/rate, power: power});
}

Effect.shock = function(x, y, z, vX, vY, vZ, duration) {
	var p = Math.floor(Math.random() * 10);
	//TODO: more Shoke skin
	switch(p) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
		default:
			var skin = ["mob/td11.png", "mob/td12.png", "mob/td13.png"];
	}
	var e = Level.spawnMob(x, y, z, 11, skin[0]);
	Entity.setRenderType(e, Models.shock_R.renderType);
	Entity.setCollisionSize(e, 0, 0);
	EffectDat.push({type: "shock", duration: duration, maxDuration: duration, ent: e, skin: skin, mod: 1, vX: vX, vY: vY, vZ: vZ});
};

//The first spell
Skill.ZAKERU = function(x, y, z, yaw, pitch,  duration, speed, long, emissionType, isExplode, explodePower, isCatchFire, fireRate, fireSec, shock) {
	clientMessage(ChatColor.YELLOW + "ZAKERU!");
	//TODO: make activity about this skill
	SkillDat.push({type: "ZAKERU", ent: [], x: x, y: y, z: z, yaw: yaw, pitch: pitch, dur: duration, maxSpeed: speed, speed: speed, long: long, number: 1, emissionType: emissionType, isExplode: isExplode, explodePower: explodePower, isCatchFire: isCatchFire, fireRate: fireRate, fireSec: fireSec, shock: shock});
};
//shock = [isCatchShock, shockRate, shockPower, shockDuration, shockInfection, shockInfRate];

//The second spell
Skill.RASHIRUDO = function(x, y, z, yaw, duration, hp, minReverseVel, minReverseVelY, shock) {
	clientMessage(ChatColor.YELLOW + "RASHIRUDO!");
	var ax = absRangeX(yaw + 90, 0);
	var ay = absRangeY(yaw + 90, 0);
	var az = absRangeZ(yaw + 90, 0);
	ent = Level.spawnMob(x, y + 1, z, 11, "mob/RASHIRUDO.png");
	Entity.setRenderType(ent, Models.RASHIRUDO_R.renderType);
	Entity.setHealth(ent, 74,5);
	Entity.setCollisionSize(ent, 0, 0);
	GB_SystemCache.shildExceptionList.push(ent);
	for(var cy = 0; cy <= 5; cy++) {
		if(Level.getTile(x, y + cy, z) === 0) {
			Level.setTile(x, y + cy, z, 252, 0);
			GB_SystemCache.blockTrash.push([Math.floor(x), Math.floor(y + cy), Math.floor(z)]);
		}
	}
	saveData(_MAP_DATA(), "BLOCK_TRASH", JSON.stringify(GB_SystemCache.blockTrash))
	Skill.RASHIRUDO_Activity(ent, 2, 1, yaw, x, y + 4.5, z, x + (ax * 3.5), y + (ay * 3.5), z + (az * 3.5), x - (ax * 3.5), y - (ay * 3.5), z - (az * 3.5), x + (ax * 3.5), y + (ay * 3.5) + 9, z + (az * 3.5), x - (ax * 3.5), y - (ay * 3.5) + 9, z - (az * 3.5));
	SkillDat.push({type: "RASHIRUDO", ent: ent, mod: 1, skinType: 1, x: x, y: y, z: z, ax: ax, ay: ay, az: az, yaw: yaw, dur: duration, hp: hp, minVel: minReverseVel, minVelY: minReverseVelY, shock: shock});
};

//The third spell
Skill.JIKERUDO = function(x, y, z, vx, vy, vz, duration, speed, power, range, rate) {
	var magnet = Level.spawnMob(x, y, z, 11, "mob/JIKERUDO.png");
	Entity.setRenderType(magnet, Models.JIKERUDO_R.renderType);
	Entity.setHealth(magnet, 744);
	Entity.setCollisionSize(magnet, 0, 0);
	var horizonRing = Level.spawnMob(x, y, z, 11, "mob/JIKERUDO.png");
	Entity.setRenderType(horizonRing, Models.JIKERUDO_H_R.renderType);
	Entity.setHealth(horizonRing, 744);
	Entity.setCollisionSize(horizonRing, 0, 0);
	GB_SystemCache.smoothRotation.push([horizonRing, 0, 0]);
	var verticalRing = Level.spawnMob(x, y, z, 11, "mob/JIKERUDO.png");
	Entity.setRenderType(verticalRing, Models.JIKERUDO_V_R.renderType);
	Entity.setHealth(verticalRing, 744);
	Entity.setCollisionSize(verticalRing, 0, 0);
	GB_SystemCache.smoothRotation.push([verticalRing, 0, 0]);
	if(GB_System.instantSmoothRotationThread === null) {
		GB_System.instantSmoothRotationThread = new java.lang.Thread(GB_System.smoothRotation);
		GB_System.instantSmoothRotationThread.start();
	}
	SkillDat.push({type: "JIKERUDO", ent: [magnet, horizonRing, verticalRing], vx: vx, vy: vy, vz: vz, horizonYaw: 0, horizonPitch: 0, verticalYaw: 0, verticalPitch: 0, duration: duration, speed: speed, power: power, range: range, rate: rate, lastLoc: [0, 0, 0, false]});
};

//The fourth spell
Skill.BAOU_ZAKERUGA = function(x, y, z, targetEnt, speed, power, duration, long, rotateSpeed, shock) {
	
};
//shock = [isCatchShock, shockRate, shockPower, shockDuration, shockInfection, shockInfRate];

//second spell extend
Skill.RASHIRUDO_Activity = function(activator, minVel, addVelY, yaw, centerX, centerY, centerZ, sx1, sy1, sz1, sx2, sy2, sz2, ex1, ey1, ez1, ex2, ey2, ez2) {new java.lang.Thread(new java.lang.Runnable( {run: function() {try {
	while(Entity.getEntityTypeId(activator) > 0) {
		var ent = Entity.getAll();
		var target = [];
		for(var e = 0; e < ent.length; e++) {
			if(Math.sqrt(Math.pow(centerX - Entity.getX(ent[e]), 2), Math.pow(centerY - Entity.getY(ent[e]), 2), Math.pow(centerZ - Entity.getZ(ent[e]), 2)) < 0x20) {
				target.push(ent[e]);
			}
		}
		for(var e = 0; e < target.length; e++) {
			if(GB_SystemCache.shildExceptionList.indexOf(target[e]) !== -1) {
				continue;
			}
			var X = Entity.getX(target[e]);
			var Y = Entity.getY(target[e]);
			var Z = Entity.getZ(target[e]);
			var vectorX = Entity.getVelX(target[e]);
			var vectorY = Entity.getVelY(target[e]);
			var vectorZ = Entity.getVelZ(target[e]);
			var vectorYaw = getYaw(vectorX, vectorY, vectorZ);
			var vectorPitch = getPitch(vectorX, vectorY, vectorZ);
			var vectorSpeed = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2), Math.pow(vectorZ, 2)); //Velocity
			var relativeYaw1 = getYaw(sx1 - X, sy1 - Y, sz1 - Z); //left 방향의 yaw
			var relativeYaw2 = getYaw(sx2 - X, sy2 - Y, sz2 - Z); //right 방향의 yaw
			var relativePitch1 = getPitch(sx1 - X, sy1 - Y, sz1 - Z); //bottom 방향의 pitch
			var relativePitch2 = getPitch(sx2 - X, sy2 - Y, sz2 - Z); //top 방향의 pitch
			if(relativeYaw1 - relativeYaw2 > 180) {
				relativeYaw2 += 360; //yaw가 360~0도 사이에 끼어서 잘렸을때의 해결책
				if(relativeYaw2 - vectorYaw >= 360) {
					vectorYaw += 360; //그에 맞춰서 vector yaw도 변환
				}
			}
			if(relativeYaw2 - relativeYaw1 > 180) {
				relativeYaw1 += 360; //위와 동일 단 좌우 대칭
				if(relativeYaw1 - vectorYaw >= 360) {
					vectorYaw += 360
				}
			}
			if(Math.sqrt(Math.pow(centerX - X, 2) + Math.pow(centerY - Y, 2) + Math.pow(centerZ - Z, 2)) < ((vectorSpeed * 1) + 5)) { //접근속도가 빠를수록 통과버그 방지를 위해 좀 더 멀리서도 튕겨내기
				if(((relativeYaw1 >= relativeYaw2 && relativeYaw1 >= vectorYaw && vectorYaw >= relativeYaw2) || (relativeYaw1 < relativeYaw2 && relativeYaw1 <= vectorYaw && vectorYaw <= relativeYaw2)) && (relativePitch1 >= vectorPitch && relativePitch2 <= vectorPitch)) { //(타겟의 vector yaw가 실드방향일때 || 좌우대칭*) && 타겟의 vector pitch가 실드방향일때
					if(vectorSpeed < minVel) {// 최소 접근속도보다 느릴때
						Entity.setVelX(target[e], -(absX(vectorX, 0, vectorZ) * minVel));
						//Entity.setVelY(target[e], -(absY(vectorX, vectorY, vectorZ) * minVel) - addVelY);
						Entity.setVelY(target[e], 0.5); //수평 방향으로 날리기
						Entity.setVelZ(target[e], -(absZ(vectorX, 0, vectorZ) * minVel));
					}else {
						Entity.setVelX(target[e], -vectorX);
						Entity.setVelY(target[e], -vectorY - addVelY);
						Entity.setVelZ(target[e], -vectorZ);
					}
					GB_SystemCache.shildExceptionList.push(target[e]);
				}
			}
		}
		java.lang.Thread.sleep(50);
	}
}catch(e) {
	showError(e);
}}})).start()};

GB_System.affectManager = function() {try {
	for(var e = 0; e < AffectDat.length; e++) {
		var t = AffectData[e];
		switch(t.type) {
			case "shock":
				if(--t.tempRate < 1) {
					t.tempRate = t.rate;
					var x = Entity.getX(t.ent);
					var y = Entity.getY(t.ent);
					var z = Entity.getZ(t.ent);
					var vx = Math.random();
					var vy = Math.random();
					var vz = Math.random();
					var dmg = Level.spawnMob(x, y+0.5, z, 80, "");
					Entity.setVelY(dmg, t.power * (-1));
					Entity.setRenderType(dmg, 0);
					GB_SystemCache.trash.push([dmg, 2]);
					Effect.shock(x+vx, y+vy, z+vz, vx/10, vy/10, vz/10, 6);
				}
				//TODO: shock Infection
				if(--t.duration < 0) {
					AffectDat.splice(e, 1)
				}else {
					AffectDat[e] = t
				}
				break;
			case "magnatic":
				
				break;
			default:
				clientMessage(TAG + "Unknown Affect type: " + t.type);
				AffectDat.splice(e, 1);
				break;
		}
	}
}catch(e) {
	showError(e);
}};

GB_System.effectManager = function() {try {
	for(var e = 0; e < EffectDat.length; e++) {
		var t = EffectDat[e];
		switch(t.type) {
			case "shock":
				Entity.setHealth(t.ent, 744);
				Entity.setVelX(t.ent, t.vX);
				Entity.setVelY(t.ent, t.vY);
				Entity.setVelZ(t.ent, t.vZ);
				Entity.setRot(t.ent, Math.floor(Math.random() * 360), 0);
				if(t.maxDuration*2/3 >= t.duration && t.mod < 2) {
					Entity.setMobSkin(t.ent, t.skin[1]);
					t.mod = 2;
					clientMessage("t2");
				}else if(t.maxDuration/3 >= t.duration && t.mod < 3){
					Entity.setMobSkin(t.ent, t.skin[2]);
					t.mod = 3;
					clientMessage("t3");
				}
				if(--t.duration < 1) {
					Entity.remove(t.ent);
					EffectDat.splice(e, 1);
				}else {
					EffectDat[e] = t;
					clientMessage(t.duration);
				}
				break;
			default:
				clientMessage(TAG+"Unknown type: "+t.type);
				EffectDat.splice(e, 1);
				break;
		}
	}
}catch(e) {
	showError(e);
}};

GB_System.skillManager = function() {try {
	for(var e = 0; e < SkillDat.length; e++) {
		var t = SkillDat[e];
		switch(t.type) {
			case "ZAKERU":
				//TODO: Change skill type (static -> flexible);
				for(var f = 0; f < t.ent.length; f++) {
					Entity.setVelY(t.ent[f][0], 0);
					Entity.setRot(t.ent[f][0], Math.round(t.yaw), 0);
					Entity.setVelX(t.ent[f][0], 0);
					Entity.setVelZ(t.ent[f][0], 0);
					Entity.setHealth(t.ent[f][0], 744);
					if(Math.random() < 0.3) {
						Effect.shock(Entity.getX(t.ent[f][0]) + (Math.random() * 4 - 2), Entity.getY(t.ent[f][0]) + (Math.random() * 4 - 2), Entity.getZ(t.ent[f][0]) + (Math.random() * 4 - 2), (Math.random() % 0.2) - 0.1, (Math.random() % 0.2) - 0.1, (Math.random() % 0.2) - 0.1, 6);
					}
					t.ent[f][1]--;
					if(t.ent[f][1] < 1) {
						Entity.remove(t.ent[f][0]);
						if(t.ent[f][5]) {
							Level.setTile(t.ent[f][2], t.ent[f][3], t.ent[f][4], 0, 0);
						}
						t.ent.splice(f, 1);
					};
				}
				if(t.number < t.long && t.speed-- < 1) {
					t.speed = t.maxSpeed;
					var ent = Level.spawnMob(t.x + (absRangeX(t.yaw, t.pitch) * t.number * 2), t.y + (absRangeY(t.yaw, t.pitch) * t.number * 2), t.z + (absRangeZ(t.yaw, t.pitch) * t.number * 2), 11, "mob/ZAKERU.png");
					Entity.setHealth(ent, 745);
					Entity.setCollisionSize(ent, 0, 0);
					switch(t.number) {
						case 1:
						case 2:
							Entity.setRenderType(ent, Models.ZAKERU16_R.renderType);
							break;
						case 3:
						case 4:
							Entity.setRenderType(ent, Models.ZAKERU32_R.renderType);
							break;
						case 5:
						case 6:
							Entity.setRenderType(ent, Models.ZAKERU48_R.renderType);
							break;
						default:
							Entity.setRenderType(ent, Models.ZAKERU64_R.renderType);
							//Level.explode(Math.round(Entity.getX(ent)*100)/100, Math.round(Entity.getY(ent)*100)/100, Math.round(Entity.getZ(ent)*100)/100, 3);
					}
					var x = Entity.getX(ent);
					var y = Entity.getY(ent);
					var z = Entity.getZ(ent);
					var ex = Level.getTile(x, y, z) === 0;
					if(ex) {
						Level.setTile(x, y, z, 252, 0);
						GB_SystemCache.blockTrash.push([Math.floor(x), Math.floor(y), Math.floor(z)]);
						saveData(_MAP_DATA(), "BLOCK_TRASH", JSON.stringify(GB_SystemCache.blockTrash))
					}
					t.ent.push([ent, t.dur, x, y, z, ex]);
					t.number++;
				}
				SkillDat[e] = t;
				if(t.number === t.long && t.ent.length === 0) {
					SkillDat.splice(e, 1);
				}
				break;
			case "RASHIRUDO":
				if(t.mod === 1) {
					Entity.setRot(t.ent, Math.round(t.yaw), 0);
					Entity.setVelX(t.ent, absRangeX(t.yaw, 0)/100);
					Entity.setVelZ(t.ent, absRangeZ(t.yaw, 0)/100);
					Entity.setPosition(t.ent, t.x, Entity.getY(t.ent), t.z);
					Entity.setHealth(t.ent, 744);
					if(t.y + 8.7 + 0.2 < Entity.getY(t.ent)) {
						Entity.setVelY(t.ent, -0.5);
					}else if(t.y + 8.7 - 0.2 > Entity.getY(t.ent)) {
						Entity.setVelY(t.ent, 0.5);
					}
					if(Math.sqrt(Math.pow(t.x - Entity.getX(t.ent), 2) + Math.pow(t.y + 8 - Entity.getY(t.ent), 2) + Math.pow(t.z - Entity.getZ(t.ent), 2)) < 0.2) {
						t.mod = 2;
					}
				}else if(t.mod === 2) {
					Entity.setRot(t.ent, Math.round(t.yaw), 0);
					Entity.setVelY(t.ent, 0);
					Entity.setVelX(t.ent, absRangeX(t.yaw, 0)/100);
					Entity.setVelZ(t.ent, absRangeZ(t.yaw, 0)/100);
					Entity.setPosition(t.ent, t.x, t.y + 8.7, t.z);
					t.dur--;
					Entity.setHealth(t.ent, 744);
				};
				switch(t.skinType) {
					case 1:
						Entity.setMobSkin(t.ent, "mob/RASHIRUDO1.png");
						t.skinType = 2;
						break;
					case 2:
						Entity.setMobSkin(t.ent, "mob/RASHIRUDO2.png");
						t.skinType = 3;
						break;
					case 3:
						Entity.setMobSkin(t.ent, "mob/RASHIRUDO3.png");
						t.skinType = 1;
						break;
					default:
						Entity.setMobSkin(t.ent, "mob/RASHIRUDO.png");
				}
				SkillDat[e] = t;
				if(t.dur  < 1) {
					Entity.remove(t.ent);
					for(var cy = 0; cy <= 5; cy++) {
						if(Level.getTile(t.x, t.y + cy, t.z) === 252) {
							Level.setTile(t.x, t.y + cy, t.z, 0, 0)
						}
					}
					SkillDat.splice(e, 1);
				}
				break;
			case "JIKERUDO":
				Entity.setVelX(t.ent[0], t.vx*t.speed);
				Entity.setVelY(t.ent[0], t.vy*t.speed);
				Entity.setVelZ(t.ent[0], t.vz*t.speed);
				Entity.setPosition(t.ent[1], Entity.getX(t.ent[0]), Entity.getY(t.ent[0]), Entity.getZ(t.ent[0]));
				var vx = Entity.getVelX(t.ent[0]);
				var vy = Entity.getVelY(t.ent[0]);
				var vz = Entity.getVelZ(t.ent[0])
				t.horizonYaw += 90*t.speed;
				t.horizonYaw %= 360;
				t.horizonPitch -= 30*t.speed;
				if(t.horizonPitch < -90) {
					t.horizonPitch += 180;
				}
				t.verticalYaw -= 30*t.speed;
				if(t.verticalYaw < 0) {
					t.verticalYaw += 360;
				}
				t.verticalPitch += 90*t.speed;
				if(t.verticalPitch > 90) {
					t.verticalPitch -= 180;
				}
				Entity.setVelX(t.ent[1], absRangeX(t.horizonYaw, 0)/100);
				Entity.setVelY(t.ent[1], 0);
				Entity.setVelZ(t.ent[1], absRangeZ(t.horizonYaw, 0)/100);
				Entity.setPosition(t.ent[2], Entity.getX(t.ent[0]), Entity.getY(t.ent[0]), Entity.getZ(t.ent[0]));
				Entity.setVelX(t.ent[2], absRangeX(t.verticalYaw, 0)/100);
				Entity.setVelY(t.ent[2], 0);
				Entity.setVelZ(t.ent[2], absRangeZ(t.verticalYaw, 0)/100);
				Entity.setRot(t.ent[1], t.horizonYaw, t.horizonPitch);
				Entity.setRot(t.ent[2], t.verticalYaw, t.verticalPitch);
				for(var f = 0; f < GB_SystemCache.smoothRotation.length; f++) {
					switch(GB_SystemCache.smoothRotation[f][0]) {
						case t.ent[1]:
							GB_SystemCache.smoothRotation[f][1] = t.horizonYaw;
							GB_SystemCache.smoothRotation[f][2] = t.horizonPitch;
							break;
						case t.ent[2]:
							GB_SystemCache.smoothRotation[f][1] = t.verticalYaw;
							GB_SystemCache.smoothRotation[f][2] = t.verticalPitch;
							break;
					}
				}
				SkillDat[e] = t;
				t.speed *= 0.99;
				var x = Entity.getX(t.ent[0]);
				var y = Entity.getY(t.ent[0]) + 1;
				var z = Entity.getZ(t.ent[0]);
				var ex = Level.getTile(x, y, z) === 0;
				if(ex) {
					Level.setTile(x, y, z, 252, 0);
					GB_SystemCache.bdd.push([Math.floor(x), Math.floor(y), Math.floor(z), 10]);
					GB_SystemCache.blockTrash.push([Math.floor(x), Math.floor(y), Math.floor(z)]);
					saveData(_MAP_DATA(), "BLOCK_TRASH", JSON.stringify(GB_SystemCache.blockTrash))
				}
				t.lastLoc = [x, y, z, ex];
				var rx = (Math.random() * 10) - 5;
				var ry = (Math.random() * 10) - 5;
				var rz = (Math.random() * 10) - 5;
				Level.addParticle(ParticleType.cloud, x + rx, y + ry, z + rz, -rx/10 + (t.vx*t.speed), -ry/10 + (t.vy*t.speed), -rz/10 + (t.vz*t.speed), 1)
				if(--t.duration < 0) {
					Entity.remove(t.ent[0]);
					Entity.remove(t.ent[1]);
					Entity.remove(t.ent[2]);
					SkillDat.splice(e, 1);
				}
				break;
			default:
				clientMessage("Unknown Skill Type: " + t.type);
				SkillDat.splice(e, 1);
		}
	}
}catch(e) {
	showError(e);
}};

GB_System.instantSmoothRotationThread = null;

GB_System.smoothRotation = new java.lang.Runnable({run: function() {try {
	while(java.lang.Thread.currentThread() === GB_System.instantSmoothRotationThread) {
		if(GB_SystemCache.smoothRotation.length <= 0) {
			GB_System.instantSmoothRotationThread = null;
		}
		for(var e = 0; e < GB_SystemCache.smoothRotation.length; e++) {
			if(Entity.getEntityTypeId(GB_SystemCache.smoothRotation[e][0]) > 0) {
				Entity.setRot(GB_SystemCache.smoothRotation[e][0], GB_SystemCache.smoothRotation[e][1], GB_SystemCache.smoothRotation[e][2]);
			}else {
				GB_SystemCache.smoothRotation.splice(e, 1);
			}
		}
		java.lang.Thread.sleep(1);
	}
}catch(e) {
	showError(e);
}}});

GB_System.blockTrash = function() {
	try{
		var t = JSON.parse(loadData(_MAP_DATA(), "BLOCK_TRASH"));
	}catch(e) {
		var t = [];
	}
	for(var e = 0; e < t.length; e++) {
		if(Level.getTile(t[e][0], t[e][1], t[e][2]) === 252) {
			Level.setTile(t[e][0], t[e][1], t[e][2], 0, 0)
		}else {
			t.splice(e, 1);
			continue
		}
	}
	GB_SystemCache.blockTrash = t;
	saveData(_MAP_DATA(), "BLOCK_TRASH", JSON.stringify(GB_SystemCache.blockTrash));
};

GB_System.trash = function() {try {
	for(var e = 0; e < GB_SystemCache.trash.length; e++) {
		if(GB_SystemCache.trash[1]-- <= 0) {
			Entity.remove(GB_SystemCache.trash[0]);
			GB_SystemCache.trash.splice(e, 1);
		}
	}
}catch(e) {
	showError(e);
}};

GB_System.blockDelayDelete = function() {try {
	for(var e = 0; e < GB_SystemCache.bdd.length; e++) {
		if(GB_SystemCache.bdd[e][3]-- <= 0) {
			Level.setTile(GB_SystemCache.bdd[e][0], GB_SystemCache.bdd[e][1], GB_SystemCache.bdd[e][2], 0, 0);
			GB_SystemCache.bdd.splice(e, 1);
		}
	}
}catch(e) {
	showError(e);
}};

Models.shock_R = Renderer.createHumanoidRenderer();
Models.shock = function(renderer) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	body.setTextureOffset(0, 0, true);
	body.addBox(-16, 0, 24, 33, 32, 0, 24);
	//body.addBox(-16, -16*32, 16*64, 32, 32, 0, 16*64);
};
Models.shock(Models.shock_R);

Models.ZAKERU16_R = Renderer.createHumanoidRenderer();
Models.ZAKERU32_R = Renderer.createHumanoidRenderer();
Models.ZAKERU48_R = Renderer.createHumanoidRenderer();
Models.ZAKERU64_R = Renderer.createHumanoidRenderer();
Models.ZAKERU = function(renderer, size) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	body.setTextureOffset(0, 0, false);
	body.addBox(-4, 12, -4, 8, 8, 8, (size / 2 - 4));
};
Models.ZAKERU(Models.ZAKERU16_R, 16);
Models.ZAKERU(Models.ZAKERU32_R, 32);
Models.ZAKERU(Models.ZAKERU48_R, 48);
Models.ZAKERU(Models.ZAKERU64_R, 64);

Models.RASHIRUDO_R = Renderer.createHumanoidRenderer();
Models.RASHIRUDO = function(renderer, size) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	
	var cY = -22 + (8 * 16);
	body.setTextureOffset(32, 0, true);
	body.addBox(-8, 0 + cY, (size / 2), 16, 16, 0, (size / 2) - 4);
	body.addBox(-8, (-size / 2) + 4 + cY, (size /2) - 0.1, 16, 16, 0, (size / 2) - 4);
	
	body.addBox(-8, 0 + cY, (size / 2) - 8, 16, 16, 0, (size / 2) - 4);
	body.addBox(-8, (-size / 2) + 4 + cY, (size /2) - 7.9, 16, 16, 0, (size / 2) - 4);
	body.setTextureOffset(0, 0, false);
	for(var e = 1; e < size * 3 / 20; e++) {
		body.addBox(-0.5 - 48 - 2, 48 - (10 * (e - 1)) + cY, -0.5, 1, 1, 1, 4.5);
		body.addBox(-0.5 + 48 + 2, 48 - (10 * (e - 1)) + cY, -0.5, 1, 1, 1, 4.5);
	}
	
	//Modeling-Creator part
	var X = -1;
	var Y = -12;
	var Z = -3;
	var B = [[-13.5,14.5,-1.5,1.5],[-9.5,14.5,-1.5,1.5],[-5.5,14.5,-1.5,1.5],[-13.5,10.5,-1.5,1.5],[-9.5,10.5,-1.5,1.5],[-5.5,10.5,-1.5,1.5],[-9.5,6.5,-1.5,1.5],[-5.5,6.5,-1.5,1.5],[-1.5,6.5,-1.5,1.5],[-9.5,2.5,-1.5,1.5],[-5.5,2.5,-1.5,1.5],[-1.5,2.5,-1.5,1.5],[2.5,2.5,-1.5,1.5],[6.5,2.5,-1.5,1.5],[-5.5,-1.5,-1.5,1.5],[6.5,-1.5,-1.5,1.5],[-5.5,-5.5,-1.5,1.5],[6.5,-5.5,-1.5,1.5],[-5.5,-9.5,-1.5,1.5],[-1.5,-9.5,-1.5,1.5],[2.5,-9.5,-1.5,1.5],[6.5,-9.5,-1.5,1.5],[10.5,-9.5,-1.5,1.5],[2.5,-13.5,-1.5,1.5],[6.5,-13.5,-1.5,1.5],[10.5,-13.5,-1.5,1.5],[6.5,-17.5,-1.5,1.5],[10.5,-17.5,-1.5,1.5],[14.5,-17.5,-1.5,1.5],[6.5,-21.5,-1.5,1.5],[10.5,-21.5,-1.5,1.5],[14.5,-21.5,-1.5,1.5]];
	body.setTextureOffset(0, 2, false);
	for(var e = 0; e < 32; e++) {body.addBox(B[e][0]+X, B[e][1]+Y+cY, B[e][2]+Z, 1, 1, 1, B[e][3])};
	
	var X = 3;
	var Y = -12;
	var Z = 5;
	var B = [[10.5,14.5,-1.5,1.5],[6.5,14.5,-1.5,1.5],[2.5,14.5,-1.5,1.5],[10.5,10.5,-1.5,1.5],[6.5,10.5,-1.5,1.5],[2.5,10.5,-1.5,1.5],[6.5,6.5,-1.5,1.5],[2.5,6.5,-1.5,1.5],[-1.5,6.5,-1.5,1.5],[6.5,2.5,-1.5,1.5],[2.5,2.5,-1.5,1.5],[-1.5,2.5,-1.5,1.5],[-5.5,2.5,-1.5,1.5],[-9.5,2.5,-1.5,1.5],[2.5,-1.5,-1.5,1.5],[-9.5,-1.5,-1.5,1.5],[2.5,-5.5,-1.5,1.5],[-9.5,-5.5,-1.5,1.5],[2.5,-9.5,-1.5,1.5],[-1.5,-9.5,-1.5,1.5],[-5.5,-9.5,-1.5,1.5],[-9.5,-9.5,-1.5,1.5],[-13.5,-9.5,-1.5,1.5],[-5.5,-13.5,-1.5,1.5],[-9.5,-13.5,-1.5,1.5],[-13.5,-13.5,-1.5,1.5],[-9.5,-17.5,-1.5,1.5],[-13.5,-17.5,-1.5,1.5],[-17.5,-17.5,-1.5,1.5],[-9.5,-21.5,-1.5,1.5],[-13.5,-21.5,-1.5,1.5],[-17.5,-21.5,-1.5,1.5]];
	for(var e = 0; e < 32; e++) {body.addBox(B[e][0]+X, B[e][1]+Y+cY, B[e][2]+Z, 1, 1, 1, B[e][3])};
	
	body.setTextureOffset(0, 4, false);
	body.addBox(-0.5, -16 + cY, -2.5, 1, 1, 1, 5.5);
	body.addBox(-0.5, -16 + cY, 1.5, 1, 1, 1, 5.5);
};
Models.RASHIRUDO(Models.RASHIRUDO_R, 96);

Models.JIKERUDO_R = Renderer.createHumanoidRenderer();
Models.JIKERUDO = function(renderer) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	head.setTextureOffset(0, 0, false);
	head.addBox(-4, -4, -4, 8, 8, 8, 4);
};
Models.JIKERUDO(Models.JIKERUDO_R);

Models.JIKERUDO_H_R = Renderer.createHumanoidRenderer();
Models.JIKERUDO_H = function(renderer) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	head.setTextureOffset(0, 16, false);
	for(var e = 0; e < 360; e += 5) {
		head.addBox(-1+(Math.sin(e*Math.PI/180)*20), -1+(Math.cos(e*Math.PI/180)*20), -1, 2, 2, 2, 0)
	}
};
Models.JIKERUDO_H(Models.JIKERUDO_H_R);

Models.JIKERUDO_V_R = Renderer.createHumanoidRenderer();
Models.JIKERUDO_V = function(renderer) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	head.setTextureOffset(0, 16, false);
	for(var e = 0; e < 360; e += 5) {
		head.addBox(-1+(Math.sin(e*Math.PI/180)*20), -1, -1+(Math.cos(e*Math.PI/180)*20), 2, 2, 2, 0)
	}
};
Models.JIKERUDO_V(Models.JIKERUDO_V_R);

function procCmd(str) {
	var cmd = str.split(" ");
	switch(cmd[0]) {
		case "t":
			var e = Level.spawnMob(Player.getX(), Player.getY(), Player.getZ(), 11, "mob/ZAKERU.png");
			Entity.setHealth(e, 2);
			Entity.setRenderType(e, Models.ZAKERU32_R.renderType);
			break;
		case "t2":
			Effect.shock(Player.getX(), Player.getY(), Player.getZ(), cmd[1], cmd[2], cmd[3], cmd[4]);
			break;
		case "t3":
			Skill.ZAKERU(Player.getX(), Player.getY(), Player.getZ(), Entity.getYaw(Player.getEntity()), Entity.getPitch(Player.getEntity()), 20, 1, 20)
			break;
		case "t4":
			var e = Level.spawnMob(Player.getX(), Player.getY(), Player.getZ(), 11, "mob/RASHIRUDO.png");
			Entity.setRenderType(e, Models.RASHIRUDO_R.renderType);
			break;
		case "t5":
			var yaw = Entity.getYaw(Player.getEntity());
			var x = Player.getX() + (absRangeX(yaw, 0) * 5);
			var y = Player.getY() + (absRangeY(yaw, 0) * 5) + 3;
			var z = Player.getZ() + (absRangeZ(yaw, 0) * 5);
			for(var cy = Math.floor(y); Level.getTile(x, cy, z) === 0 && Math.floor(y) - cy < 10; cy--);
			if(Level.getTile(x, y, z) !== 0 || cy === 0) {
				clientMessage("No space!");
				return;
			}
			Skill.RASHIRUDO(x, cy + 1, z, yaw, 600, 100, 2, 0.5, [true, 0.2, 2, 6, true, 20]);
			break;
		case "t6":
			Level.explode(Player.getX(), Player.getY(), Player.getZ(), 3);
			break;
		case "t7":
			Player.addItemInventory(252, 64, 0);
			break;
		case "t8":
			Skill.JIKERUDO(Player.getX(), Player.getY(), Player.getZ());
			break;
		case "t9":
			Skill.JIKERUDO(Player.getX() + (absRangeX(Entity.getYaw(Player.getEntity()), 0) * 3), Player.getY() - 1, Player.getZ() + (absRangeZ(Entity.getYaw(Player.getEntity()), 0) * 3), absRangeX(Entity.getYaw(Player.getEntity()), Entity.getPitch(Player.getEntity())), absRangeY(Entity.getYaw(Player.getEntity()), Entity.getPitch(Player.getEntity())), absRangeZ(Entity.getYaw(Player.getEntity()), Entity.getPitch(Player.getEntity())), 200, 0.3, "power", "range", "rate");
			break;
	}
};

function newLevel(str) {
	GB_SystemCache.shildExceptionList.push(Player.getEntity());
	GB_System.blockTrash();
};

function leaveGame() {
	GB_SystemCache.shildExceptionList = [];
};

function modTick() {
	GB_System.affectManager();
	GB_System.effectManager();
	GB_System.skillManager();
	GB_System.trash();
	GB_System.blockDelayDelete();
};

function entityAddedHook(ent) {
	if(Entity.getHealth(ent) === 744) {
		Entity.remove(ent);
	}
};

function entityRemovedHook(ent) {
	if(GB_SystemCache.shildExceptionList.indexOf(ent) !== -1) {
		GB_SystemCache.shildExceptionList.splice(GB_SystemCache.shildExceptionList.indexOf(ent), 1);
	};
};

function useItem(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {
	if(Level.getTile(x, y, z) === 252) {
		Level.setTile(x, y, z, 0, 0)
	}
	if(Level.getTile(x+1, y, z) === 252) {
		Level.setTile(x+1, y, z, 0, 0)
	}
	if(Level.getTile(x-1, y, z) === 252) {
		Level.setTile(x-1, y, z, 0, 0)
	}
	if(Level.getTile(x, y+1, z) === 252) {
		Level.setTile(x, y+1, z, 0, 0)
	}
	if(Level.getTile(x, y-1, z) === 252) {
		Level.setTile(x, y-1, z, 0, 0)
	}
	if(Level.getTile(x, y, z+1) === 252) {
		Level.setTile(x, y, z+1, 0, 0)
	}
	if(Level.getTile(x, y, z-1) === 252) {
		Level.setTile(x, y, z-1, 0, 0)
	}
};

function destroyBlock(x, y, z, side) {
	if(Level.getTile(x, y, z) === 252) {
		Level.setTile(x, y, z, 0, 0)
	}
	if(Level.getTile(x+1, y, z) === 252) {
		Level.setTile(x+1, y, z, 0, 0)
	}
	if(Level.getTile(x-1, y, z) === 252) {
		Level.setTile(x-1, y, z, 0, 0)
	}
	if(Level.getTile(x, y+1, z) === 252) {
		Level.setTile(x, y+1, z, 0, 0)
	}
	if(Level.getTile(x, y-1, z) === 252) {
		Level.setTile(x, y-1, z, 0, 0)
	}
	if(Level.getTile(x, y, z+1) === 252) {
		Level.setTile(x, y, z+1, 0, 0)
	}
	if(Level.getTile(x, y, z-1) === 252) {
		Level.setTile(x, y, z-1, 0, 0)
	}
};