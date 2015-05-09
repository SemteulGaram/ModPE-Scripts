var ScriptName = "GashBell";
var Version = "dev-v1";
var Author = "CodeInside";
var VersionCode = 100;

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
 
function setTexture(prototypeFile, innerPath){
	try{
		var dir = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/net.zhuoweizhang.mcpelauncher.pro/files/textures/images/" + innerPath);
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

setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/td11.png"), "mob/td11.png");
setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/td12.png"), "mob/td12.png");
setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/td13.png"), "mob/td13.png");
setTexture(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/ZAKERU.png"), "mob/ZAKERU.png");

var Skill = {};
var SkillDat = [];
var Affect = {};
var Effect = {};
var EffectDat = [];
var Models = {};
var GB_System = {};

Effect.shock = function(x, y, z, vX, vY, vZ, duration) {
	var p = Math.floor(Math.random() * 10);
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
	var e = Level.spawnMob(x, y, z, 39, skin[0]);
	Entity.setRenderType(e, Models.shock_R.renderType);
	Entity.setCollisionSize(e, 0, 0);
	Entity.setRot(e, Math.floor(Math.random() * 360, 0));
	EffectDat.push({dur: duration, maxDur: duration, ent: e, skin: skin, mod: 1, vX: vX, vY: vY, vZ: vZ});
};

Skill.ZAKERU = function(x, y, z, yaw, pitch,  duration, speed, long, emissionType, isExplode, explodePower, isCatchFire, fireRate, fireSec, isCatchShock, shockAmount, shockPower, shockDelay, shockSec, shockInfection, isFlexible, flexibleExplodeRate) {
	clientMessage(ChatColor.YELLOW + "ZAKERU!");
	SkillDat.push({type: "ZAKERU", ent: [], x: x, y: y, z: z, yaw: yaw, pitch: pitch, dur: duration, maxSpeed: speed, speed: speed, long: long, number: 1, emissionType: emissionType, isExplode: isExplode});
}

GB_System.skillManager = function() {
	for(var e = 0; e < SkillDat.length; e++) {
		var t = SkillDat[e];
		switch(t.type) {
			case "ZAKERU":
				for(var f = 0; f < t.ent.length; f++) {
					Entity.setVelX(t.ent[f][0], 0);
					Entity.setVelY(t.ent[f][0], 0);
					Entity.setVelZ(t.ent[f][0], 0);
					Entity.setRot(t.ent[f][0], t.yaw, 0);
					Entity.setHealth(t.ent[f][0], 744);
					if(Math.random() < 0.5) {
						Effect.shock(Entity.getX(t.ent[f][0]), Entity.getY(t.ent[f][0]), Entity.getZ(t.ent[f][0]), Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5, Math.ceil(Math.random() * 6));
					}
					t.ent[f][1]--;
					if(t.ent[f][1] < 1) {
						Entity.remove(t.ent[f][0]);
						t.ent.splice(f, 1);
					};
				}
				if(t.number < t.long && t.speed-- < 1) {
					t.speed = t.maxSpeed;
					var ent = Level.spawnMob(t.x + (absRangeX(t.yaw, t.pitch) * t.number), t.y + (absRangeY(t.yaw, t.pitch) * t.number), t.z + (absRangeZ(t.yaw, t.pitch) * t.number), 39, "mob/ZAKERU.png");
					Entity.setHealth(ent, 40);
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
							Level.explode(Entity.getX(ent), Entity.getY(ent), Entity.getZ(ent), 1);
					}
					t.ent.push([ent, t.dur]);
					t.number++;
				}
				SkillDat[e] = t;
				if(t.number === t.long && t.ent.length === 0) {
					SkillDat.splice(e, 1);
				}
				break;
		}
	}
};

GB_System.effectManager = function() {
	for(var e = 0; e < EffectDat.length; e++) {
		var t = EffectDat[e];
		Entity.setHealth(t.ent, 744);
		Entity.setVelX(t.ent, t.vX);
		Entity.setVelY(t.ent, t.vY);
		Entity.setVelZ(t.ent, t.vZ);
		t.dur--;
		if(t.maxDur*2/3 > t.dur && t.mod < 2) {
			Entity.setMobSkin(t.ent, t.skin[1]);
			t.mod = 2;
		}else if(t.maxDur/3 > t.dur && t.mod < 3){
			Entity.setMobSkin(t.ent, t.skin[2]);
			t.mod = 3;
		}
		EffectDat[e] = t;
		if(t.dur < 1) {
			Entity.remove(t.ent);
			EffectDat.splice(e, 1);
		}
	};
};

GB_System.trash = function() {
	
};

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
	body.addBox(-16, 0, 0, 32, 32, 0, 0);
};
Models.shock(Models.shock_R);

Models.ZAKERU16_R = Renderer.createHumanoidRenderer();
Models.ZAKERU16 = function(renderer) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	body.setTextureOffset(0, 0, false);
	body.addBox(-4, 12, -4, 8, 8, 8, 4);
};
Models.ZAKERU16(Models.ZAKERU16_R);

Models.ZAKERU32_R = Renderer.createHumanoidRenderer();
Models.ZAKERU32 = function(renderer) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	body.setTextureOffset(0, 0, false);
	body.addBox(-4, 12, -4, 8, 8, 8, 12);
};
Models.ZAKERU32(Models.ZAKERU32_R);

Models.ZAKERU48_R = Renderer.createHumanoidRenderer();
Models.ZAKERU48 = function(renderer) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	body.setTextureOffset(0, 0, false);
	body.addBox(-4, 12, -4, 8, 8, 8, 20);
};
Models.ZAKERU48(Models.ZAKERU48_R);

Models.ZAKERU64_R = Renderer.createHumanoidRenderer();
Models.ZAKERU64 = function(renderer) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	body.setTextureOffset(0, 0, false);
	body.addBox(-4, 12, -4, 8, 8, 8, 28);
};
Models.ZAKERU64(Models.ZAKERU64_R);

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
	}
};

function modTick() {
	GB_System.skillManager();
	GB_System.effectManager();
	GB_System.trash();
};

function entityAddedHook(ent) {
	if(Entity.getHealth(ent) === 744) {
		Entity.remove(ent);
	};
}