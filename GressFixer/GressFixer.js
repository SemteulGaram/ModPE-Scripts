var x1, x2, z1, z2;
function procCmd(cmd) {
	switch(cmd) {
		case "복구영역1":
		x1 = Math.floor(Player.getX());
		z1 = Math.floor(Player.getZ());
		clientMessage("복구영역1 지정됨");
		break;
		case "복구영역2":
		x2 = Math.floor(Player.getX());
		z2 = Math.floor(Player.getZ());
		clientMessage("복구영역2 지정됨");
		break;
		case "복구":
		if(x1 == null || x2 == null) {
			clientMessage("복구영역을 지정해주세요");
			return;
		}
		var xc = Math.floor(Player.getX());
		var zc = Math.floor(Player.getZ());
		var color = Level.getGrassColor(xc, zc);
		var ix = Math.min(x1, x2);
		var iz = Math.min(z1, z2);
		var ax = Math.max(x1, x2);
		var az = Math.max(z1, z2);
		clientMessage("복구 작업 진행중...");
		for(var x = ix; x <= ax; x++) {
			for(var z = iz; z <= az; z++) {
				Level.setGrassColor(x, z, color);
			}
		}
		clientMessage("복구 완료...!");
		break;
	}
	
}