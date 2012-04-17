(function(jQuery) {
	jQuery.fn.dimension = function() {
		return {width: this.outerWidth(), height: this.outerHeight()};
	};
	
//	jQuery.fn.collidesWith = function(target) {
//		var src=jQuery(this);
//		var x1=src.offset().left,y1=src.offset().top,w=src.outerWidth(),h=src.outerHeight();
//		var xp1=target.offset().left,yp1=target.offset().top,wp=target.outerWidth(),hp=target.outerHeight();
//		var x2=x1+w,y2=y1+h,xp2=xp1+wp,yp2=yp1+hp;
//		if(xp1>=x1 && xp1<=x2 ) {
//			if(yp1>=y1 && yp1<=y2) {
//				return true;
//			}
//			else if(y1>=yp1 && y1<=yp2) {
//				return true;
//			}
//		}
//		else if(x1>=xp1 && x1<=xp2) {
//			if(yp1>=y1 && yp1<=y2) {
//				return true;
//			}
//			else if(y1>=yp1 && y1<=yp2) {
//				return true;
//			}
//		}
//		return false;
//	};
	
	jQuery.fn.elementWithinElement = function(elemPossiblyCovering) {
		var elemPossiblyCovered = jQuery(this).get(0);
		elemPossiblyCovering = jQuery(elemPossiblyCovering).get(0);
		
		var top = elemPossiblyCovered.offsetTop;
		var left = elemPossiblyCovered.offsetLeft;
		var width = elemPossiblyCovered.offsetWidth;
		var height = elemPossiblyCovered.offsetHeight;

		while (elemPossiblyCovered.offsetParent) {
			elemPossiblyCovered = elemPossiblyCovered.offsetParent;
			top += elemPossiblyCovered.offsetTop;
			left += elemPossiblyCovered.offsetLeft;
		}

		return (top >= elemPossiblyCovering.offsetTop
			&& left >= elemPossiblyCovering.offsetLeft
			&& (top + height) <= (elemPossiblyCovering.offsetTop + elemPossiblyCovering.offsetHeight) && (left + width) <= (elemPossiblyCovering.offsetLeft + elemPossiblyCovering.offsetWidth));
	};
	
})(jQuery); 

(function(abmash) {
	// constants
	var directionType = {
		CLOSETO: "CLOSETO",
		CLOSETOLABEL: "CLOSETOLABEL",
		CLOSETOCLICKABLELABEL: "CLOSETOCLICKABLELABEL",
		ABOVE: "ABOVE",
		BELOW: "BELOW",
		LEFTOF: "LEFTOF",
		RIGHTOF: "RIGHTOF",
	};
	var distanceType = {
		topLeft: 1,
		top: 2,
		topRight: 3,
		left: 4,
		center: 5,
		right: 6,
		bottomLeft: 7,
		bottom: 8,
		bottomRight: 9,
		average: 10,
	};
	var calculationType = {
		min: 1,
		average: 2,
	};

	// closeness query
	var options = {};
	
    jQuery.fn.extend({
    	closeTo: function(referenceElements, options) {
    		return abmash.elementsInDirection(jQuery.extend({
		    	sources: this,
		    	targets: jQuery(referenceElements),
		    	directionType: directionType.CLOSETO,
		    	distanceType: distanceType.center,
		    	calculationType: calculationType.min,
		    	directionHasToMatchAllTargets: false,
		    }, options));
    	},
    	closeToLabel: function(referenceElements, options) {
    		return abmash.elementsInDirection(jQuery.extend({
		    	sources: this,
		    	targets: jQuery(referenceElements),
		    	directionType: directionType.CLOSETOLABEL,
		    	distanceType: distanceType.topLeft,
		    	calculationType: calculationType.min,
		    	directionHasToMatchAllTargets: false,
		    }, options));
    	},
    	closeToClickableLabel: function(referenceElements, options) {
    		return abmash.elementsInDirection(jQuery.extend({
		    	sources: this,
		    	targets: jQuery(referenceElements),
		    	directionType: directionType.CLOSETOCLICKABLELABEL,
		    	distanceType: distanceType.center,
		    	calculationType: calculationType.min,
		    	directionHasToMatchAllTargets: false,
		    }, options));
    	},
    	above: function(referenceElements, options) {
    		return abmash.elementsInDirection(jQuery.extend({
		    	sources: this,
		    	targets: jQuery(referenceElements),
		    	directionType: directionType.ABOVE,
		    	distanceType: distanceType.bottomLeft,
		    	calculationType: calculationType.min,
		    	directionHasToMatchAllTargets: false,
		    }, options));
    	},
    	below: function(referenceElements, options) {
    		return abmash.elementsInDirection(jQuery.extend({
		    	sources: this,
		    	targets: jQuery(referenceElements),
		    	directionType: directionType.BELOW,
		    	distanceType: distanceType.topLeft,
		    	calculationType: calculationType.min,
		    	directionHasToMatchAllTargets: false,
		    }, options));
    	},
    	leftOf: function(referenceElements, options) {
    		return abmash.elementsInDirection(jQuery.extend({
		    	sources: this,
		    	targets: jQuery(referenceElements),
		    	directionType: directionType.LEFTOF,
		    	distanceType: distanceType.right,
		    	calculationType: calculationType.min,
		    	directionHasToMatchAllTargets: false,
		    }, options));
    	},
    	rightOf: function(referenceElements, options) {
    		return abmash.elementsInDirection(jQuery.extend({
		    	sources: this,
		    	targets: jQuery(referenceElements),
		    	directionType: directionType.RIGHTOF,
		    	distanceType: distanceType.left,
		    	calculationType: calculationType.min,
		    	directionHasToMatchAllTargets: false,
		    }, options));
    	},
    	aboveAll: function(referenceElements, options) {
    		return abmash.elementsInDirection(jQuery.extend({
		    	sources: this,
		    	targets: jQuery(referenceElements),
		    	directionType: directionType.ABOVE,
		    	distanceType: distanceType.bottomLeft,
		    	calculationType: calculationType.average,
		    	directionHasToMatchAllTargets: true,
		    }, options));
    	},
    	belowAll: function(referenceElements, options) {
    		return abmash.elementsInDirection(jQuery.extend({
		    	sources: this,
		    	targets: jQuery(referenceElements),
		    	directionType: directionType.BELOW,
		    	distanceType: distanceType.topLeft,
		    	calculationType: calculationType.average,
		    	directionHasToMatchAllTargets: true,
		    }, options));
    	},
    	leftOfAll: function(referenceElements, options) {
    		return abmash.elementsInDirection(jQuery.extend({
		    	sources: this,
		    	targets: jQuery(referenceElements),
		    	directionType: directionType.LEFTOF,
		    	distanceType: distanceType.right,
		    	calculationType: calculationType.average,
		    	directionHasToMatchAllTargets: true,
		    }, options));
    	},
    	rightOfAll: function(referenceElements, options) {
    		return abmash.elementsInDirection(jQuery.extend({
		    	sources: this,
		    	targets: jQuery(referenceElements),
		    	directionType: directionType.RIGHTOF,
		    	distanceType: distanceType.left,
		    	calculationType: calculationType.average,
		    	directionHasToMatchAllTargets: true,
		    }, options));
    	},
    });
    
    jQuery.extend(abmash, {
    	elementsInDirection: function(closenessOptions) {
			var result = [];
			
    		// use default options if not specified
		    options = jQuery.extend({
		    	sources: jQuery(),
		    	targets: jQuery(),
		    	directionType: directionType.CLOSETO,
		    	distanceType: distanceType.average,
		    	calculationType: calculationType.min,
		    	minDistance: 0,
		    	maxDistance: 0,
		    	inBounds: false,
		    	directionHasToMatchAllTargets: false,
		    	limit: false,
		    	limitPerTarget: false,
		    }, closenessOptions);
		    
		    options.sources = jQuery(options.sources).distinctDescendants();
		    options.targets = jQuery(options.targets)./*filter(function() {
		    	var target = jQuery(this);
		    	var isSourceElement = false;
		    	jQuery.each(options.sources, function() {
		    		var source = jQuery(this);
		    		if(target.get(0) == source.get(0)) isSourceElement = true;
		    	});
		    	return !isSourceElement; 
		    }).*/distinctDescendants();
		    
//		    abmash.highlight(options.sources.get());
//			abmash.highlight(options.targets.get());
		    
			result = abmash.checkElementLocations();
			
//			jQuery(result).css('background-color', 'yellow');
			// now sort the result set
			result = result.length > 0 ? result.sort(sortByCloseness) : [];
			
			// reduce the result set to the closest elements if a limit is given
			if(options.limit && options.limit > 0) result = result.splice(0, options.limit);
			
			return jQuery(result);
    	},
		
    	checkElementLocations: function() {
			var matches = {};
			var allDistances = {};
			var targetDistances = {};
    		
			jQuery.each(options.sources, function() {
				var source = jQuery(this);

				// the html document's root element cannot be taken for closeness calculations
				if(source.get(0) == document) {
					return false;
				}
				
				// no targets - empty result
				if(options.targets.get().length == 0) {
					return false;
				}
				
				// check all source-target-combinations
				var allTargetsMatching = true;;
				jQuery.each(options.targets, function() {
					var target = jQuery(this);
					var comparison = abmash.compareElements(source, target);
//					abmash.highlight(source.get());
//					abmash.highlight(target.get());
//					alert(comparison.toSource());
					// target is close to source element
					if(comparison.match) {
						if(typeof matches[target.getPath()] == "undefined") {
							matches[target.getPath()] = [];
						}
						matches[target.getPath()].push(source);
						
						// save distances for sorting
						if(typeof targetDistances[target.getPath()] == "undefined") {
							targetDistances[target.getPath()] = {};
						}
						targetDistances[target.getPath()][source.getPath()] = comparison.distance;
						
						if(typeof allDistances[source.getPath()] == "undefined") {
							allDistances[source.getPath()] = comparison.distance;
						} else {
							allDistances[source.getPath()] = Math.min(comparison.distance, allDistances[source.getPath()]);
						}
					} else {
						// there is at least on target element which is not close to this source element
						allTargetsMatching = false;
					}
				});
				
				if(options.directionHasToMatchAllTargets && !allTargetsMatching) {
					// if one target does not match the direction/distance predicates,
					// return an empty result 
					matches = {};
					return false;
				}
			});
			
			// construct result set
//			alert(options.toSource());
//			alert(matches.toSource());
			var result = [];
			
			jQuery.each(matches, function(targetPath, targetMatches) {
				// sort by distance to this target
				targetMatches = targetMatches.sort(function(firstElement, secondElement) {
			    	var firstDistance = targetDistances[targetPath][firstElement.getPath()];
			    	var secondDistance = targetDistances[targetPath][secondElement.getPath()];
					return firstDistance - secondDistance;
				});
				
				var matchesFound = 0;
					
//				alert(targetPath);
//				jQuery.each(targetMatches, function() {
//					var match = this;
//					abmash.highlight(match);
//				});
				
				jQuery.each(targetMatches, function() {
					var match = this;
					// limit per target dependent on sorted distances
					if(options.limitPerTarget && matchesFound >= options.limitPerTarget) {
						return false;
					}
					result.push(match);
					matchesFound++;
				});
			});
//			abmash.highlight(result);
			
			// unique
			result = result.unique();
			
			// sort by distance globally for all targets
			result = result.sort(function(firstElement, secondElement) {
		    	var firstDistance = allDistances[firstElement.getPath()];
		    	var secondDistance = allDistances[secondElement.getPath()];
		    	return firstDistance - secondDistance;
			});

		    return result;
		},
		
		compareElements: function(source, target) {
			if(source.get(0) == target.get(0)) return false;
			
		    var coords = calculateCoordinates(source, target);
			var distance = getDistance(source, target);
			var distanceIsInRange = true;
			
			if((options.minDistance > 0 && distance < options.minDistance) ||
			   (options.maxDistance > 0 && distance > options.maxDistance)) {
				distanceIsInRange = false;
			}
			
			var directionMatches = true;
			
//			abmash.highlight(source);
//			abmash.highlight(target);
//			alert(coords.toSource());
			
			if(options.directionType == directionType.CLOSETOLABEL) {
				directionMatches = abmash.isBelow(coords) || abmash.isRightOf(coords);
			}
			
			if(options.directionType == directionType.CLOSETOCLICKABLELABEL) {
				directionMatches = abmash.isBelow(coords) || abmash.isLeftOf(coords) || abmash.isRightOf(coords);
			}
			
			if(options.directionType == directionType.ABOVE) {
				directionMatches = abmash.isAbove(coords) && (!options.inBounds || abmash.isInHorizontalBounds(coords));
			}
			
			if(options.directionType == directionType.BELOW) {
				directionMatches = abmash.isBelow(coords) && (!options.inBounds || abmash.isInHorizontalBounds(coords));
//				alert(directionMatches);
//				abmash.highlight(source);
			}
			
			if(options.directionType == directionType.LEFTOF) {
				directionMatches = abmash.isLeftOf(coords) && (!options.inBounds || abmash.isInVerticalBounds(coords));
			}
			
			if(options.directionType == directionType.RIGHTOF) {
				directionMatches = abmash.isRightOf(coords) && (!options.inBounds || abmash.isInVerticalBounds(coords));
			}
			
			return {
				distance: distance,
				distanceIsInRange: distanceIsInRange,
				directionMatches: directionMatches,
				match: directionMatches && distanceIsInRange,
			};
		},
		
		isAbove: function(coords) {
			return coords.bottomSource <= coords.topTarget;
		},
		
		isBelow: function(coords) {
			return coords.topSource >= coords.bottomTarget;
		},
		
		isLeftOf: function(coords) {
			return coords.rightSource <= coords.leftTarget;
		},
		
		isRightOf: function(coords) {
			return coords.leftSource >= coords.rightTarget;
		},
		
		isInHorizontalBounds: function(coords) {
			return !isLeftOf(coords) && !isRightOf(coords);
		},
		
		isInVerticalBounds: function(coords) {
			return !isAbove(coords) && !isBelow(coords);
		},
		
    });
    
    function sortByCloseness(firstElement, secondElement) {
    	// TODO collision needed?
    	if(jQuery(firstElement).elementWithinElement(secondElement)) {
    		return 1;
    	}
    	if(jQuery(secondElement).elementWithinElement(firstElement)) {
    		return -1;
    	}
    	
    	var firstDistance = calculateDistance(firstElement);
    	var secondDistance = calculateDistance(secondElement);
		
		return firstDistance - secondDistance;
	}
    
    function calculateDistance(element) {
    	// zero or maxint depending on closeness matching 
    	var distance = options.directionHasToMatchAllTargets ? 0 : 9007199254740992;
    	
		var totalWeight = 0; 
    	jQuery.each(options.targets, function() {
		    var target = jQuery(this);
		    var dist = getDistance(element, target);
		    // TODO higher weight for first targets
			var weight = getWeight(target);
			totalWeight += weight;
			
			if(options.directionHasToMatchAllTargets) {
				distance += dist * weight;
			} else {
				distance = Math.min(distance, dist * weight);
			}
    	});
    	
    	// total distance
    	distance /= totalWeight;
    	distance = options.directionHasToMatchAllTargets ? distance / jQuery(options.targets).get().length : distance;
    	
    	// distance gets higher for bigger elements
    	distance *= Math.sqrt(jQuery(element).dimension().width * jQuery(element).dimension().height);
    	
    	// distance is correlated to element weight
    	distance /= abmash.getElementWeight(element);
    	
    	return distance;
    }
    
    function getDistance(source, target) {
		// get coordinates
		var coords = calculateCoordinates(source, target);
		
		// calculate euclidean distances
		var distanceTopLeft = euclideanDistance(coords.diffLeft, coords.bottomSource - coords.topTarget);
		var distanceTop = euclideanDistance(coords.diffCenterX, coords.bottomSource - coords.topTarget);
		var distanceTopRight = euclideanDistance(coords.diffRight, coords.bottomSource - coords.topTarget);
		var distanceLeft = euclideanDistance(coords.rightSource - coords.leftTarget, coords.diffCenterY);
		var distanceCenter = euclideanDistance(coords.diffCenterX, coords.diffCenterY);
		var distanceRight = euclideanDistance(coords.leftSource - coords.rightTarget, coords.diffCenterY);
		var distanceBottomLeft = euclideanDistance(coords.diffLeft, coords.topSource - coords.bottomTarget);
		var distanceBottom = euclideanDistance(coords.diffCenterX, coords.topSource - coords.bottomTarget);
		var distanceBottomRight = euclideanDistance(coords.diffRight, coords.topSource - coords.bottomTarget);
		
		if(options.distanceType == distanceType.topLeft) return distanceTopLeft;
		else if(options.distanceType == distanceType.top) return distanceTop;
		else if(options.distanceType == distanceType.topRight) return distanceTopRight;
		else if(options.distanceType == distanceType.left) return distanceLeft;
		else if(options.distanceType == distanceType.center) return distanceCenter;
		else if(options.distanceType == distanceType.right) return distanceRight;
		else if(options.distanceType == distanceType.bottomLeft) return distanceBottomLeft;
		else if(options.distanceType == distanceType.bottom) return distanceBottom;
		else if(options.distanceType == distanceType.bottomRight) return distanceBottomRight;
		// TODO if TYPABLE then distanceTopLeft
		else return (distanceTopLeft + distanceCenter + distanceBottomRight) / 3;
		
		// TODO this should throw an error
		return;
	}
    
    function getWeight(target) {
    	// TODO weights
//		for (ElementType elementType: element.getTypes()) {
//			switch (elementType) {
//			case TYPABLE:
//			case CHOOSABLE:
//			case DATEPICKER:
//				if (element.getTagName().equals("label")) {
//					weight *= 3;
//				}
//				// TODO more weight on exact matches
//			case IMAGE:
//				// TODO font-weight 400 as constant. research if 400 is default everywhere
//				String fontWeight;
//				if ((fontWeight = element.getCssValue("font-weight")) != null) {
//					weight *= Double.parseDouble(fontWeight) / 400;
//				}
//				if (element.getTagName().equals("strong")) {
//					weight *= 2.0;
//				}
//				if (element.getTagName().equals("li")) {
//					weight *= 1.5;
//				}
//				break;
//			default:
//				break;
//			}		
//		}
    	return 1;
    }
    
    function calculateCoordinates(source, target) {
		source = jQuery(source);
		target = jQuery(target);
		
		coords = {
			topSource: source.offset().top,
		    leftSource: source.offset().left,
			topTarget: target.offset().top,
			leftTarget: target.offset().left,
		};
		
		coords = jQuery.extend(coords, {
			bottomSource: coords.topSource + source.height(),
		    rightSource: coords.leftSource + source.width(),
			bottomTarget: coords.topTarget + target.height(),
			rightTarget: coords.leftTarget + target.width(),
		});
		
		coords = jQuery.extend(coords, {
			centerXSource: coords.leftSource + (coords.rightSource - coords.leftSource) / 2,
			centerYSource: coords.topSource + (coords.bottomSource - coords.topSource) / 2,
			centerXTarget: coords.leftTarget + (coords.rightTarget - coords.leftTarget) / 2,
			centerYTarget: coords.topTarget + (coords.bottomTarget - coords.topTarget) / 2,
		});
		
		coords = jQuery.extend(coords, {
			diffLeft: coords.leftTarget - coords.leftSource,
			diffRight: coords.rightTarget - coords.rightSource,
			diffCenterX: coords.centerXTarget - coords.centerXSource,
			diffCenterY: coords.centerYTarget - coords.centerYSource,
		});
		
		return coords;
	}
    
    function euclideanDistance(x, y) {
    	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
	
})(window.abmash = window.abmash || {});