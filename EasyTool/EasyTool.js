var mine = [1,4,14,15,16,21,22,24,41,42,43,44,45,48,49,56,57,73,74,87,97,98,101,112,121,129,133,152,155,159,172,173];

function destroyBlock(x, y, z, side) {
	var ci = Player.getCarriedItem();
	var bi = Level.getTile(x, y, z);
	var bd = Level.getData(x ,y, z);
	clientMessage(ci + " " + bi + " " + side);
	if((ci === 258 || ci === 271 || ci === 275 || ci === 279 || ci === 283) && (bi === 17 || bi === 162)) {
		new java.lang.Thread(new java.lang.Runnable({run: function() {try {
			chopLink(x, y, z);
		}catch(e) {
			clientMessage(e.lineNumber);
			clientMessage(e);
		}}})).start();
	}
	if((ci === 257 || ci === 270 || ci === 274 || ci === 278 || ci === 282) && (mine.indexOf(bi) !== -1)) {
		if(side === 0 || side === 1) {
			for(var mx = x-1; mx <= x+1; mx++) {
				for(var mz = z-1; mz <= z+1; mz++) {
					var my = y;
					var bi = Level.getTile(mx, my, mz);
					var bd = Level.getData(mx, my, mz);
					if(mine.indexOf(bi) !== -1) {
						if(bi === 1 && bd === 0) {
							Level.destroyBlock(mx, my, mz, false);
							Level.dropItem(mx+0.5, my+0.5, mz+0.5, 1, 4, 1, 0);
						}else if(bi === 16) {
							Level.destroyBlock(mx, my, mz, false);
							Level.dropItem(mx+0.5, my+0.5, mz+0.5, 1, 263, 1, 0);
						}else {
							Level.destroyBlock(mx, my, mz, true);
						}
					}
				}
			}
		}else if(side === 2 || side === 3) {
			for(var mx = x-1; mx <= x+1; mx++) {
				for(var my = y-1; my <= y+1; my++) {
					var mz = z;
					var bi = Level.getTile(mx, my, mz);
					var bd = Level.getData(mx, my, mz);
					if(mine.indexOf(bi) !== -1) {
						if(bi === 1 && bd === 0) {
							Level.destroyBlock(mx, my, mz, false);
							Level.dropItem(mx+0.5, my+0.5, mz+0.5, 1, 4, 1, 0);
						}else if(bi === 16) {
							Level.destroyBlock(mx, my, mz, false);
							Level.dropItem(mx+0.5, my+0.5, mz+0.5, 1, 263, 1, 0);
						}else {
							Level.destroyBlock(mx, my, mz, true);
						}
					}
				}
			}
		}else if(side === 4 || side === 5) {
			for(var my = y-1; my <= y+1; my++) {
				for(var mz = z-1; mz <= z+1; mz++) {
					var mx = x;
					var bi = Level.getTile(mx, my, mz);
					var bd = Level.getData(mx, my, mz);
					if(mine.indexOf(bi) !== -1) {
						if(bi === 1 && bd === 0) {
							Level.destroyBlock(mx, my, mz, false);
							Level.dropItem(mx+0.5, my+0.5, mz+0.5, 1, 4, 1, 0);
						}else if(bi === 16) {
							Level.destroyBlock(mx, my, mz, false);
							Level.dropItem(mx+0.5, my+0.5, mz+0.5, 1, 263, 1, 0);
						}else {
							Level.destroyBlock(mx, my, mz, true);
						}
					}
				}
			}
		}
	}
}

function chopLink(x, y, z) {
	java.lang.Thread.sleep(100);
	for(var my = y; my <= y+1; my++) {
		for(var mx = x-1; mx <= x+1; mx++) {
			for(var mz = z-1; mz <= z+1; mz++) {
				var bi = Level.getTile(mx, my, mz);
				if(bi === 17 || bi === 162) {
					Level.destroyBlock(mx, my, mz, true);
					chopLink(mx, my, mz);
				}
			}
		}
	}
}