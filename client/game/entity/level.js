import makeLevelMapComponent from '../component/map';
import makeLevelGraphicComponent from '../component/terrain-graphic';

export default function makeLevel() {

	var level = {};
	var graphics = makeLevelGraphicComponent({
		entityOfComponent: level,
		dirt: 'assets/img/maptiles/dirt-noborder.png',
		grass: 'assets/img/maptiles/grass-noborder.png',
	});
	var map = makeLevelMapComponent().map

	var components = {
		graphics: graphics,
		map: map
	};

	level.getMap = function() {
		return components.map
	};


	level.getComponentKeys = function() {
		return Object.keys(components);
	};

	level.draw = function(ctx) {
		components.graphics.drawMap(ctx, level.getMap())
	};

	return Object.freeze(level);
	
}