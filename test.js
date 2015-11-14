/* global describe */
var chai = require('chai'),
	expect = chai.expect;
	
var	gameOfLife = require('./gameoflife'),
	World = gameOfLife.World,
	Cell = gameOfLife.Cell;

describe('World', () => {
	it('should have a grid', () => {
		var world = new World();
		
		expect(world.grid).to.not.equal(undefined);
	});
	
	it('should be able to mark any cell as live', () => {
		var world = new World();
		
		world.createLifeAt('0','1');
		
		expect(world.grid['0']['1'].live).to.equal(true);
	});
	
	it('should kill a single cell on its own', () => {
		var world = new World();
		
		world.createLifeAt('-100', '100');
		var cell = world.getCellAt('-100', '100');
		
		world.tick();
		
		expect(cell.live).to.equal(false);
	});
	
	it('should kill a single cell with one neighbour', () => {
		var world = new World();
		
		world.createLifeAt('-100', '100');
		world.createLifeAt('-101', '100');
		var cell = world.getCellAt('-100', '100');
		
		world.tick();
		
		expect(cell.live).to.equal(false);
	});
	
	it('should live on with two neighbours', () => {
		var world = new World();
		
		world.createLifeAt('0', '0');
		world.createLifeAt('1', '0');
		world.createLifeAt('2', '0');
		var cell = world.getCellAt('1', '0');
		
		world.tick();
		
		expect(cell.live).to.equal(true);
	});
});

describe('Cell', () => {
	it('should have a state of liveness that defaults to dead', () => {
		var cell = new Cell();
		
		expect(cell.live).to.equal(false);
	});
	
	it('should die with fewer than two neighbours', () => {
		var cell = new Cell();
		cell.live = true;
		
		cell.tick(1);
		
		expect(cell.live).to.equal(false);
	});
	
	it('should live on with two neighbours', () => {
		var cell = new Cell();
		cell.live = true;
		
		cell.tick(2);
		
		expect(cell.live).to.equal(true);
	});
	
	it('should live on with three neighbours', () => {
		var cell = new Cell();
		cell.live = true;
		
		cell.tick(3);
		
		expect(cell.live).to.equal(true);
	});
	
	it('should die with more than three neighbours', () => {
		var cell = new Cell();
		cell.live = true;
		
		cell.tick(4);
		
		expect(cell.live).to.equal(false);
	});
	
	it('should come alive with exactly 3 neighbours', () => {
		var cell = new Cell();
		cell.live = false;
		
		cell.tick(3);
		
		expect(cell.live).to.equal(true);
	});
	
});