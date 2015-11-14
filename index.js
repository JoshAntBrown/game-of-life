var colors = require('colors');
var gameOfLife = require('./gameoflife'),
	World = gameOfLife.World;

var world = new World();
		
world.createLifeAt('0', '0');
world.createLifeAt('1', '0');
world.createLifeAt('2', '0');

world.createLifeAt('-1', '-1');
world.createLifeAt('-1', '-2');
// world.createLifeAt('3', '0');
// world.createLifeAt('3', '1');
// world.createLifeAt('3', '2');
// world.createLifeAt('2', '2');


function tick() {
	process.stdout.write("\u001b[2J\u001b[0;0H");
	world.print(-20, 20, -40, 40);
	console.log('-');
	world.tick();
	tick();
}
tick();