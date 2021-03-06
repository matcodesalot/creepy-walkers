import makeProjectile from '../entity/projectile';

export default function collisionSystem(entities) {
	function run() {
		setInterval(tick, 1000/4);
	}

	function cleanProjectiles() {
		entities.forEach(function(entity,index) {
			if(entity.getComponentKeys().includes("projectileLocation")) {
				entities.splice(entities.indexOf(entity), 1);
			}
		});
	}

	function tick() {
	     entities.forEach(function(entityA, index) {
		    if(entityA.getComponentKeys().includes("collision")) {
		    	var slicedEntities = entities.slice(index + 1, entities.length);
		    	slicedEntities.forEach(function(entityB) {
		    		if(entityB.getComponentKeys().includes("collision")) {
		    			if (entityA.onCollision(entityB)) {
		    				//if badguy is in range of tower
		    				if((entityA.getEntityType() === "tower" && entityB.getEntityType() === "badguy") || (entityA.getEntityType() === "badguy" && entityB.getEntityType() === "tower")) {
		    					var projectile;
		    					//shoot the projectile
		    					if(entityA.getComponentKeys().includes("towerLocation")) {
		    						projectile = makeProjectile({x: entityA.getXLocation(), y: entityA.getYLocation()}, {x: entityB.getXLocation() + 0.5, y: entityB.getYLocation() + 0.5});
		    						entities.push(projectile);
		    					}
		    					if(entityB.getComponentKeys().includes("towerLocation")) {
		    						projectile = makeProjectile({x: entityB.getXLocation(), y: entityB.getYLocation()}, {x: entityA.getXLocation() + 0.5, y: entityA.getYLocation() + 0.5});
		    						entities.push(projectile);
		    					}
		    				}
		    				if((entityA.getEntityType() === "projectile" && entityB.getEntityType() === "badguy") || (entityA.getEntityType() === "badguy" && entityB.getEntityType() === "projectile")) {
		    					if(entityA.getComponentKeys().includes("health")) {
		    						entityA.reduceHealth(1);
		    						entities.splice(entities.indexOf(entityB), 1);
		    					}
		    					if(entityB.getComponentKeys().includes("health")) {
		    						entityB.reduceHealth(1);
		    						entities.splice(entities.indexOf(entityA), 1);
		    					}
		    				}
		    			}
		    		}
		    	});
		    }
		});
    }

    return Object.freeze({
    	run: run,
    	tick: tick,
    });
}