import graphicsSystem from './system/graphics';
import inputSystem from './system/input';
import movementSystem from './system/movement';
import badguy from './entity/badguy';
import tower from './entity/tower';
import level from './entity/level';
//tower is being created dynamically in input system

export default function game() {

	var entities = [level(), badguy()];
	var canvas = document.getElementById("canvas");
	var graphics = graphicsSystem(entities, canvas);
	var input = inputSystem(entities, canvas);
	var movement = movementSystem(entities);

	function run() {
		graphics.run();
		input.run();
		movement.run();
	}

	return Object.freeze ({
		run: run,
	});
	
}