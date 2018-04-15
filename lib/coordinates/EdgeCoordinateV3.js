"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.renderSVG = renderSVG;
exports.drawOnCanvas = drawOnCanvas;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/prop-types */
function renderSVG(props) {
	var className = props.className;


	var edge = helper(props);
	if (edge === null) return null;
	var line = void 0,
	    coordinateBase = void 0,
	    coordinate = void 0;

	if ((0, _utils.isDefined)(edge.line)) {
		line = _react2.default.createElement("line", {
			className: "react-stockcharts-cross-hair", opacity: edge.line.opacity, stroke: edge.line.stroke,
			x1: edge.line.x1, y1: edge.line.y1,
			x2: edge.line.x2, y2: edge.line.y2 });
	}
	if ((0, _utils.isDefined)(edge.coordinateBase)) {
		var _edge$coordinateBase = edge.coordinateBase,
		    rectWidth = _edge$coordinateBase.rectWidth,
		    rectHeight = _edge$coordinateBase.rectHeight,
		    arrowWidth = _edge$coordinateBase.arrowWidth;

		var path = edge.orient === "left" ? "M0,0L0," + rectHeight + "L" + rectWidth + "," + rectHeight + "L" + (rectWidth + arrowWidth) + ",10L" + rectWidth + ",0L0,0L0,0" : "M0," + arrowWidth + "L" + arrowWidth + "," + rectHeight + "L" + (rectWidth + arrowWidth) + "," + rectHeight + "L" + (rectWidth + arrowWidth) + ",0L" + arrowWidth + ",0L0," + arrowWidth;

		coordinateBase = edge.orient === "left" || edge.orient === "right" ? _react2.default.createElement(
			"g",
			{ transform: "translate(" + edge.coordinateBase.edgeXRect + "," + edge.coordinateBase.edgeYRect + ")" },
			_react2.default.createElement("path", { d: path, key: 1, className: "react-stockchart-text-background",
				height: rectHeight, width: rectWidth,
				fill: edge.coordinateBase.fill, opacity: edge.coordinateBase.opacity })
		) : _react2.default.createElement("rect", { key: 1, className: "react-stockchart-text-background",
			x: edge.coordinateBase.edgeXRect,
			y: edge.coordinateBase.edgeYRect,
			height: rectHeight, width: rectWidth,
			fill: edge.coordinateBase.fill, opacity: edge.coordinateBase.opacity });

		coordinate = _react2.default.createElement(
			"text",
			{ key: 2,
				x: edge.coordinate.edgeXText,
				y: edge.coordinate.edgeYText,
				textAnchor: edge.coordinate.textAnchor,
				fontFamily: edge.coordinate.fontFamily,
				fontSize: edge.coordinate.fontSize,
				dy: ".32em", fill: edge.coordinate.textFill },
			edge.coordinate.displayCoordinate
		);

	}
	return _react2.default.createElement(
		"g",
		{ className: className },
		line,
		coordinateBase,
		coordinate
	);
}
/* eslint-enable react/prop-types */

function helper(props) {
	var displayCoordinate = props.coordinate,
	    show = props.show,
	    type = props.type,
	    orient = props.orient,
	    edgeAt = props.edgeAt,
	    hideLine = props.hideLine,
		title = props.title,
		price = props.price,
		isEdge = props.isEdge,
		isPriceHighlight = props.isPriceHighlight,
		islowHighlight = props.islowHighlight,
		highlightPrice = props.highlightPrice,
		highlightTitle = props.highlightTitle,
		highlightColorGradient = props.highlightColorGradient,
		lineStrokeDasharray = props.lineStrokeDasharray;
	var fill = props.fill,
	    opacity = props.opacity,
	    fontFamily = props.fontFamily,
	    fontSize = props.fontSize,
	    textFill = props.textFill,
	    lineStroke = props.lineStroke,
		lineOpacity = props.lineOpacity,
		shadowColor = props.shadowColor,
		shadowBlur = props.shadowBlur;
	var stroke = props.stroke,
	    strokeOpacity = props.strokeOpacity,
	    strokeWidth = props.strokeWidth;
	var arrowWidth = props.arrowWidth,
	    rectWidth = props.rectWidth,
	    rectHeight = props.rectHeight,
	    rectRadius = props.rectRadius;
	var x1 = props.x1,
	    y1 = props.y1,
	    x2 = props.x2,
	    y2 = props.y2,
	    dx = props.dx;



	if (!show) return null;

	if(isPriceHighlight)
	rectWidth = 50;



	var coordinateBase = void 0,
	    coordinate = void 0;
	if ((0, _utils.isDefined)(displayCoordinate)) {
		var textAnchor = "middle"; // TODO: Below it is necessary to implement logic for the possibility of alignment from the right or from the left.

		var edgeXRect = void 0,
		    edgeYRect = void 0,
		    edgeXText = void 0,
		    edgeYText = void 0;

		if (type === "horizontal") {
			edgeXRect = dx + (orient === "right" ? edgeAt + 1 : edgeAt - rectWidth - 1);
			edgeYRect = y1 - rectHeight / 2;
			edgeXText = dx + (orient === "right" ? edgeAt + rectWidth / 2 : edgeAt - rectWidth / 2);
			edgeYText = y1;
		} else {
			var dy = orient === "bottom" ? strokeWidth - 1 : -strokeWidth + 1;
			edgeXRect = x1 - rectWidth / 2;
			edgeYRect = (orient === "bottom" ? edgeAt : edgeAt - rectHeight) + dy;
			edgeXText = x1;
			edgeYText = (orient === "bottom" ? edgeAt + rectHeight / 2 : edgeAt - rectHeight / 2) + dy;
		}

		coordinateBase = {
			edgeXRect: edgeXRect, edgeYRect: edgeYRect, rectHeight: rectHeight, rectWidth: rectWidth, rectRadius: rectRadius, fill: fill, opacity: opacity, arrowWidth: arrowWidth, stroke: stroke, strokeOpacity: strokeOpacity, strokeWidth: strokeWidth
		};
		coordinate = {
			edgeXText: edgeXText, edgeYText: edgeYText, textAnchor: textAnchor, fontFamily: fontFamily, fontSize: fontSize, textFill: textFill, displayCoordinate: displayCoordinate
		};
	}

	var line = hideLine ? undefined : {
		opacity: lineOpacity,
		stroke: lineStroke,
		shadowColor: shadowColor,
		shadowBlur: shadowBlur,
		fill: fill,
		title: title,
		price: price,
		isEdge: isEdge,
		isPriceHighlight: isPriceHighlight,
		highlightPrice: highlightPrice,
		highlightTitle: highlightTitle,
		highlightColorGradient: highlightColorGradient,
		islowHighlight : islowHighlight,
		strokeDasharray: lineStrokeDasharray,
		x1: x1, y1: y1, x2: x2, y2: y2
	};

	return {
		coordinateBase: coordinateBase, coordinate: coordinate, line: line, orient: orient
	};
}

function drawOnCanvas(ctx, props) {
	var fontSize = props.fontSize,
	    fontFamily = props.fontFamily;


	ctx.font = fontSize + "px " + fontFamily;
	ctx.textBaseline = "middle";
	var width = Math.round(ctx.measureText(props.coordinate).width + 10);

	var edge = helper(_extends({}, props, { rectWidth: width }));

	if (edge === null) return;


	if ((0, _utils.isDefined)(edge.line) && edge.line.isPriceHighlight == undefined) {
		var dashArray = (0, _utils.getStrokeDasharray)(edge.line.strokeDasharray).split(",").map(function (d) {
			return +d;
		});
		ctx.setLineDash(dashArray);
		ctx.strokeStyle = edge.line.stroke; //(0, _utils.hexToRGBA)(edge.line.stroke, edge.line.opacity);
		ctx.lineWidth = 2;
		ctx.shadowBlur = edge.line.shadowBlur;
		ctx.shadowColor = edge.line.shadowColor;
			if(edge.line.x1 < edge.line.x2 ) {
				for (var a=0; a<2; a++) {
					ctx.beginPath();
					ctx.moveTo(edge.line.x1, edge.line.y1);
					ctx.lineTo(edge.line.x2, edge.line.y2);
					ctx.stroke();
			}
		}
	}


	if ((0, _utils.isDefined)(edge.coordinateBase)) {
		var _edge$coordinateBase2 = edge.coordinateBase,
			rectWidth = _edge$coordinateBase2.rectWidth,
		    rectHeight = _edge$coordinateBase2.rectHeight,
		    rectRadius = _edge$coordinateBase2.rectRadius,
		    arrowWidth = _edge$coordinateBase2.arrowWidth;



		ctx.fillStyle = (0, _utils.hexToRGBA)(edge.coordinateBase.fill, edge.coordinateBase.opacity);
		if ((0, _utils.isDefined)(edge.coordinateBase.stroke)) {
			ctx.strokeStyle = (0, _utils.hexToRGBA)(edge.coordinateBase.stroke, edge.coordinateBase.strokeOpacity);
			ctx.lineWidth = edge.coordinateBase.strokeWidth;
		}

		var x = edge.coordinateBase.edgeXRect;
		var y = edge.coordinateBase.edgeYRect;
		var halfHeight = rectHeight / 2;


		if(edge.line.isPriceHighlight)//Thin line above or below box
		{
			ctx.beginPath();
			var grd=ctx.createLinearGradient(x - 105, 0, (x - 105) + 150, 0);
			var lineYPos = edge.line.islowHighlight ? y - 2 : y + 30;

			ctx.fillStyle = edge.line.highlightColorGradient[0];
			roundRect(ctx, x - 105, lineYPos, 155, 7, 0)
			ctx.fill();
		}


		ctx.beginPath();
		if (edge.orient === "right" && !edge.line.isEdge && !edge.line.isPriceHighlight) {
			x -= arrowWidth;
		    //ctx.moveTo(x, y + halfHeight);
			ctx.shadowBlur = edge.line.shadowBlur;
			ctx.shadowColor = edge.line.shadowColor;
			ctx.fillStyle = edge.line.fill;
			roundRect(ctx, x, y,rectWidth, rectHeight, 4)
			// ctx.lineTo(x + arrowWidth, y);
			// ctx.lineTo(x + rectWidth + arrowWidth, y);
			// ctx.lineTo(x + rectWidth + arrowWidth, y + rectHeight);
			// ctx.lineTo(x + arrowWidth, y + rectHeight);
			//ctx.closePath();
		} else if (edge.orient === "left" && !edge.line.isEdge && !edge.line.isPriceHighlight) {
			x += arrowWidth;
			ctx.moveTo(x, y);
			ctx.lineTo(x + rectWidth, y);
			ctx.lineTo(x + rectWidth + arrowWidth, y + halfHeight);
			ctx.lineTo(x + rectWidth, y + rectHeight);
			ctx.lineTo(x, y + rectHeight);
			ctx.closePath();
		} else if(!edge.line.isPriceHighlight){//last price box
			/* ctx.shadowBlur = edge.line.shadowBlur;
				 ctx.shadowColor = edge.line.shadowColor;*/
			/* var grd=ctx.createLinearGradient(x - 105, 0, (x - 105) + 155, 0);
				 grd.addColorStop(0,edge.line.highlightColorGradient[0]);

				 grd.addColorStop(1,edge.line.highlightColorGradient[1]);*/
			ctx.fillStyle = "#26705E";
			ctx.shadowBlur = false;
			ctx.shadowColor = "#26705E";
			/* ctx.fillStyle = grd*/
			roundRect(ctx, x - 1.5, y + 2, 56, 17, 0)
		} else if(edge.line.isPriceHighlight){//price highlight
			var grd=ctx.createLinearGradient(x - 105, 0, (x - 105) + 155, 0);
			grd.addColorStop(0,edge.line.highlightColorGradient[0]);
			grd.addColorStop(1,edge.line.highlightColorGradient[1]);
			ctx.fillStyle = grd;
			roundRect(ctx, x - 105, y, 155, 35, 0)//SquareBox
		}
		ctx.fill();


		if ((0, _utils.isDefined)(edge.coordinateBase.stroke)) {
			ctx.stroke();
		}


		if(!edge.line.isEdge && !edge.line.isPriceHighlight){//Price coordinate text.
			ctx.fillStyle = edge.coordinate.textFill;
			ctx.textAlign = edge.coordinate.textAnchor === "middle" ? "center" : edge.coordinate.textAnchor;
			ctx.textBaseline = "bottom";
			ctx.font = '6pt Ubuntu, Arial, Helvetica Neue, Helvetica, Arial, sans-serif';
			ctx.fillText(edge.line.title, edge.coordinate.edgeXText, edge.coordinate.edgeYText - 1);
			ctx.textBaseline = "hanging";
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.font = '8pt Ubuntu, Arial, Helvetica Neue, Helvetica, Arial, sans-serif';
			ctx.fillText(edge.line.price, edge.coordinate.edgeXText, edge.coordinate.edgeYText + 0.5);
		} else if(!edge.line.isPriceHighlight){//Edge coordinate text (current price along y axis.)
			/* ctx.fillStyle = "#56b3e2";*/

			let textY = edge.coordinate.edgeYText - 4;
			ctx.fillStyle = "white";
			ctx.textAlign = edge.coordinate.textAnchor === "middle" ? "center" : edge.coordinate.textAnchor;
			ctx.font = '8pt Ubuntu, sans-serif';
			ctx.textBaseline = "hanging";
			ctx.fillText(edge.coordinate.displayCoordinate, edge.coordinate.edgeXText - 4, textY);


		} else if(edge.line.isPriceHighlight){//price highlight
			ctx.fillStyle = "white";
			ctx.font = '500 11px Ubuntu Helvetica Neue, Helvetica, Arial, sans-serif';
			ctx.fillText(edge.line.highlightTitle, edge.coordinate.edgeXText - 105, edge.coordinate.edgeYText - 2);
			ctx.fillStyle = "white";
			ctx.font = '600 15.5px Ubuntu Helvetica Neue, Helvetica, Arial, sans-serif';
			ctx.fillText(edge.line.highlightPrice, edge.coordinate.edgeXText - 105, edge.coordinate.edgeYText + 11);
		}
	}

}

function roundRect(ctx, x, y, width, height, radius) {
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
}

// export default EdgeCoordinate;
//# sourceMappingURL=EdgeCoordinateV3.js.map
