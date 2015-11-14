var colors = require('colors');

function World() {
	this.grid = {};
}

World.prototype.print = function(xFrom, xTo, yFrom, yTo) {
	for (var x = xFrom; x < xTo; x++) {
		for (var y = yFrom; y < yTo; y++) {
			if (this.getCellAt(x, y).live) {
				process.stdout.write('0'.green);
			} else {
				process.stdout.write('0'.black);
			}
		}
		process.stdout.write('|\n|');
	}
}

World.prototype.createLifeAt = function(x, y) {
	this.grid[x] = this.grid[x] || {};
	this.grid[x][y] = this.grid[x][y] || new Cell();
	this.grid[x][y].live = true;
}

World.prototype.getCellAt = function(x, y) {
	this.grid[x] = this.grid[x] || {};
	this.grid[x][y] = this.grid[x][y] || new Cell();
	
	return this.grid[x][y];
}

World.prototype.tick = function() {
	
	var instructions = [];
	
	var xKeys = Object.keys(this.grid);
	xKeys.forEach((x) => {
		var yKeys = Object.keys(this.grid[x]);
		yKeys.forEach((y) => {
			x = parseInt(x);
			y = parseInt(y);
			
			var topLeftNeighbour = this.getCellAt(x-1, y+1);
			var topNeighbour = this.getCellAt(x, y+1);
			var topRightNeighbour = this.getCellAt(x+1, y+1);
			var rightNeighbour = this.getCellAt(x+1,y);
			var bottomRightNeighbour = this.getCellAt(x+1,y-1);
			var bottomNeighbour = this.getCellAt(x,y-1);
			var bottomLeftNeighbour = this.getCellAt(x-1,y-1);
			var leftNeighbour = this.getCellAt(x-1,y);
			
			var neighbours = [];
			neighbours.push(
				topLeftNeighbour, 
				topNeighbour, 
				topRightNeighbour, 
				rightNeighbour, 
				bottomRightNeighbour,
				bottomNeighbour,
				bottomLeftNeighbour,
				leftNeighbour
			);
			
			var numberOfAliveNeighbours = 0;
			neighbours.forEach((neighbour) => {
				if (neighbour.live) numberOfAliveNeighbours += 1;
			});
			
			instructions.push({
				cell: this.getCellAt(x,y),
				neighbours: numberOfAliveNeighbours
			});
		});
	});
	
	instructions.forEach((instruction) => {
		instruction.cell.tick(instruction.neighbours);
	});
}

function Cell() {
	this.live = false;
}

Cell.prototype.tick = function(numberOfLiveNeighbours) {
	if (numberOfLiveNeighbours < 2) {
		this.live = false;
	}
	
	if (numberOfLiveNeighbours > 3) {
		this.live = false;
	}
	
	if (numberOfLiveNeighbours === 3) {
		this.live = true;
	}
}

module.exports = {
	World: World,
	Cell: Cell
}