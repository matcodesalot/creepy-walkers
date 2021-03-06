export default function badGuyMovementComponent(spec) {
    var entity = spec.entity;
    var path = spec.path;
    var finishedPath = false;
    var creepStarted = false;
    var colDelta = 0;
    var rowDelta = 0;
    var currentCoordinate;
    var nextCoordinate;
    var currentCoordinateIndex = 0;

    function moveBadGuy() {
        if(!finishedPath) {
		    if(!creepStarted) {
				currentCoordinate = path[0];
				creepStarted = true;
				nextCoordinate = path[1];
			}

			//check if the creep has reached the next coordinate
			if(Math.round(entity.getXLocation() * 100) / 100 === nextCoordinate.x && Math.round(entity.getYLocation() * 100) / 100 === nextCoordinate.y) {
				currentCoordinateIndex++;
				if(path[currentCoordinateIndex] == path[113]) {
					finishedPath = true;
					entity.madeItToEnd();
				}
				currentCoordinate = nextCoordinate;
				nextCoordinate = path[currentCoordinateIndex];
			}

			//calculate where to move next
			//checks which direction creep needs to go
			if(!finishedPath) {
				if(nextCoordinate.y > currentCoordinate.y) {
					colDelta = .025;
				}else if(nextCoordinate.y < currentCoordinate.y) {
					colDelta = -.025;
				}else {
					colDelta = 0;
				}

				if(nextCoordinate.x > currentCoordinate.x) {
					rowDelta = .025;
				}else if(nextCoordinate.x < currentCoordinate.x) {
					rowDelta = -.025;
				}else {
					rowDelta = 0;
				}
			}
			entity.changeXLocation(rowDelta);
			entity.changeYLocation(colDelta);
		}
    }

    return Object.freeze ({
	    moveBadGuy: moveBadGuy,
    });
}