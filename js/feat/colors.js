onMessageAdd(6, function(mut, name, message, id) {
	if(options.colornames &&
	(options.colornamesover || getRanks(mut).length == 0)) {
		var old = parseInt(name, 36); // Turn name into a number.
		
		var num1 = bigInt(Math.floor(old * 548.624373957303)); // Turn them into bigInts.
		var num2 = bigInt(Math.floor(old * 716.518575271835));
		var num3 = bigInt(Math.floor(old * 897.341595790817));
		
		var part1 = num1.minus(num1.divide(192).times(192)).plus(64); // Saw the colors at 192 and add 64.
		var color1 = part1.toString(16);
		
		var part2 = num2.minus(num2.divide(192).times(192)).plus(64);
		var color2 = part2.toString(16);
		
		var part3 = num3.minus(num3.divide(192).times(192)).plus(64);
		var color3 = part3.toString(16);
		
		addColor(mut, "#" + color1 + color2 + color3); // Add combined color.
	}
});
